// LICENSE : MIT
"use strict";

import {getFilePathListAsync} from '../';
var fixtureDir = __dirname + "/fixtures";
var assert = require("power-assert");
describe("#getFilePathListAsync", function () {
    it("should return array of file path", function () {
        return getFilePathListAsync(fixtureDir + "/SUMMARY.md").then(function (pathList) {
            var README = pathList[0];
            var jQuery = pathList[1];
            assert.equal(README, fixtureDir + "/README.md");
            assert.equal(jQuery, fixtureDir + "/jQuery.md");
        });
    });
});
