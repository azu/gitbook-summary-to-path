// LICENSE : MIT
"use strict";
var fs = require("fs");
var path = require("path");
var gitbookParsers = require("gitbook-parsers");
function getFilePathListAsync(summaryFilePath) {
    var extension = path.extname(summaryFilePath);
    var summaryDir = path.dirname(summaryFilePath);
    var content = fs.readFileSync(summaryFilePath, "utf-8");
    var parser = gitbookParsers.get(extension);
    return parser.summary(content)
        .then(function (summary) {
            return summary.chapters.filter(function (ch) {
                return ch.exists;
            }).map(function (ch) {
                return path.resolve(summaryDir, ch.path);
            });
        });
}

module.exports = {
    getFilePathListAsync: getFilePathListAsync
};
