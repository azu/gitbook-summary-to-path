#!/usr/bin/env node
import { getFilePathListAsync } from "../lib/gitbook-summary-to-path.js";
import { resolve } from "path";
const argumentFilePath = process.argv[2] || resolve(process.cwd(), "SUMMARY.md");
getFilePathListAsync(argumentFilePath)
  .then(function (pathList) {
    pathList.forEach(function (filePath) {
      console.log(filePath);
    });
  })
  .catch(function (error) {
    console.error(error, error.stack);
  });
