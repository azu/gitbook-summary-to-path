// LICENSE : MIT
"use strict";
var fs = require("fs");
var path = require("path");
var gitbookParsers = require("gitbook-parsers");
function traverseArticles(articles, pushFile) {
    articles.forEach(function (article) {
        if (article.exists) {
            pushFile(article.path);
        }
        traverseArticles(article.articles, pushFile);
    });

}
function traverseFiles(chapters, pushFile) {
    chapters.forEach(function (ch) {
        if (ch.exists) {
            pushFile(ch.path);
        }
        traverseArticles(ch.articles, pushFile);
    });
}
function getFilePathListAsync(summaryFilePath) {
    var extension = path.extname(summaryFilePath);
    var summaryDir = path.dirname(summaryFilePath);
    var content = fs.readFileSync(summaryFilePath, "utf-8");
    var parser = gitbookParsers.get(extension);
    var files = [];
    var pushFile = function (filePath) {
        files.push(path.resolve(summaryDir, filePath));
    };
    return parser.summary(content)
        .then(function (summary) {
            traverseFiles(summary.chapters, pushFile);
        }).then(function () {
            return files;
        });
}

module.exports = {
    getFilePathListAsync: getFilePathListAsync
};
