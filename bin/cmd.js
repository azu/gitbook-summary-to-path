#!/usr/bin/env node
var getFilePathListAsync = require('../').getFilePathListAsync;
var path = require("path");
var argumentFilePath = process.argv[2] || path.resolve(process.cwd(), "SUMMARY.md");
getFilePathListAsync(argumentFilePath).then(function (pathList) {
    pathList.forEach(function (filePath) {
        console.log(filePath);
    });
}).catch(function (error) {
    console.error(error, error.stack);
});