// LICENSE : MIT
"use strict";
import { readFileSync } from "fs";
import { extname, dirname, resolve } from "path";
import markdown from '@honkit/markdown-legacy';

/**
 * Traverse the articles and push each file to the provided function
 * @param {object[]} articles
 * @param {function} pushFile
 */
function traverseArticles(articles, pushFile) {
    articles.forEach(function (article) {
        if ("title" in article && "ref" in article) {
            pushFile(article.ref);
        }
        traverseArticles(article.articles, pushFile);
    });
}

/**
 * Traverse the chapters and push each file to the provided function
 * @param {object[]} chapters
 * @param {function} pushFile
 */
function traverseFiles(chapters, pushFile) {
    chapters.forEach(function (chapter) {
        if ("title" in chapter && "ref" in chapter) {
            pushFile(chapter.ref);
        }
        traverseArticles(chapter.articles, pushFile);
    });
}

/**
 * Get the list of chapters from the summary file
 * @param {string} summaryFilePath
 * @returns {Promise<object[]>}
 */
export async function getChapterListAsync(summaryFilePath) {
    var content = readFileSync(summaryFilePath, "utf-8");
    var files = [];
    var pushChapter = function (chapter) {
        files.push(chapter);
    };
    const summary = markdown
        .summary(content)
    traverseFiles(summary.parts, pushChapter);
    return files;
}

/**
 * Get the list of file paths from the summary file
 * @param {string} summaryFilePath
 * @returns {Promise<string[]>}
 */
export function getFilePathListAsync(summaryFilePath) {
    var summaryDir = dirname(summaryFilePath);
    return getChapterListAsync(summaryFilePath).then(function (chapters) {
        return chapters.map(function (chapter) {
            return resolve(summaryDir, chapter);
        });
    });
}
