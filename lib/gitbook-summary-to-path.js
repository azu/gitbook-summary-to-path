// LICENSE : MIT
"use strict";
import { readFileSync } from "fs";
import { extname, dirname, resolve } from "path";
import * as parses from "gitbook-parsers";
const get = parses.default.get;
/**
 * Traverse the articles and push each file to the provided function
 * @param {object[]} articles
 * @param {function} pushFile
 */
function traverseArticles(articles, pushFile) {
  articles.forEach(function (article) {
    if (article.exists) {
      pushFile(article);
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
    if (chapter.exists) {
      pushFile(chapter);
    }
    traverseArticles(chapter.articles, pushFile);
  });
}

/**
 * Get the list of chapters from the summary file
 * @param {string} summaryFilePath
 * @returns {Promise<object[]>}
 */
export function getChapterListAsync(summaryFilePath) {
  var extension = extname(summaryFilePath);
  var summaryDir = dirname(summaryFilePath);
  var content = readFileSync(summaryFilePath, "utf-8");
  var parser = get(extension);
  var files = [];
  var pushChapter = function (chapter) {
    files.push(chapter);
  };
  return parser
    .summary(content)
    .then(function (summary) {
      traverseFiles(summary.chapters, pushChapter);
    })
    .then(function () {
      return files;
    });
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
      return resolve(summaryDir, chapter.path);
    });
  });
}
