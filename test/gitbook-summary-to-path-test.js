// LICENSE : MIT
import {
  getFilePathListAsync,
  getChapterListAsync,
} from "../lib/gitbook-summary-to-path.js";
import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
const __dirname = new URL(".", import.meta.url).pathname;
const fixtureDir = path.join(__dirname, "fixtures");
describe("gitbook-summary-to-path", () => {
  describe("#getFilePathListAsync", function () {
    it("should return array of file path", function () {
      return getFilePathListAsync(fixtureDir + "/SUMMARY.md").then(function (
        pathList
      ) {
        var README = pathList[0];
        var jQuery = pathList[1];
        var nest1 = pathList[2];
        var nest2 = pathList[3];
        assert.equal(README, fixtureDir + "/README.md");
        assert.equal(jQuery, fixtureDir + "/jQuery.md");
        assert.equal(nest1, fixtureDir + "/nest1.md");
        assert.equal(nest2, fixtureDir + "/nest2.md");
      });
    });
  });
  describe("#getChapterListAsync", function () {
    it("should return array of chapters", function () {
      return getChapterListAsync(fixtureDir + "/SUMMARY.md").then(function (
        pathList
      ) {
        assert.deepStrictEqual(pathList, [
            "README.md",
            "jQuery.md",
            "nest1.md",
            "nest2.md",
        ]);
      });
    });
  });
});
