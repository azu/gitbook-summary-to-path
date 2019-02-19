// LICENSE : MIT
"use strict";
var fs = require("fs");
var path = require("path");
var gitbookParsers = require("gitbook-parsers");

function traverseArticles(articles, pushFile) {
    articles.forEach(function(article) {
        if (article.exists) {
            pushFile(article);
        }
        traverseArticles(article.articles, pushFile);
    });

}

function traverseFiles(chapters, pushFile) {
    chapters.forEach(function(chapter) {
        if (chapter.exists) {
            pushFile(chapter);
        }
        traverseArticles(chapter.articles, pushFile);
    });
}

function getChapterListAsync(summaryFilePath) {
    var extension = path.extname(summaryFilePath);
    var summaryDir = path.dirname(summaryFilePath);
    var content = fs.readFileSync(summaryFilePath, "utf-8");
    var parser = gitbookParsers.get(extension);
    var files = [];
    var pushChapter = function(chapter) {
        files.push(chapter);
    };
    return parser.summary(content)
        .then(function(summary) {
            traverseFiles(summary.chapters, pushChapter);
        }).then(function() {
            return files;
        });
}

function getFilePathListAsync(summaryFilePath) {
    var summaryDir = path.dirname(summaryFilePath);
    return getChapterListAsync(summaryFilePath).then(function(chapters) {
        return chapters.map(function(chapter) {
            return path.resolve(summaryDir, chapter.path);
        });
    });
}


module.exports = {
    getFilePathListAsync: getFilePathListAsync,
    getChapterListAsync: getChapterListAsync
};
