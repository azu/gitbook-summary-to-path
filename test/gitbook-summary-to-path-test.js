// LICENSE : MIT
import {getFilePathListAsync, getChapterListAsync} from '../lib/gitbook-summary-to-path.js';
import assert from 'node:assert';
import path from 'node:path';
const __dirname = new URL('.', import.meta.url).pathname;
const fixtureDir = path.join(__dirname, "fixtures");
describe("gitbook-summary-to-path", () => {
    describe("#getFilePathListAsync", function () {
        it("should return array of file path", function () {
            return getFilePathListAsync(fixtureDir + "/SUMMARY.md").then(function (pathList) {
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
        it("should return array of chaper", function () {
            return getChapterListAsync(fixtureDir + "/SUMMARY.md").then(function (pathList) {
                assert.deepStrictEqual(pathList, [{
                    "path": "README.md",
                    "title": "Introduction",
                    "level": "0",
                    "articles": [],
                    "exists": true,
                    "external": false,
                    "introduction": true
                }, {
                    "path": "jQuery.md",
                    "title": "jQuery",
                    "level": "1",
                    "articles": [{
                        "path": "nest1.md",
                        "title": "nest1",
                        "level": "1.1",
                        "articles": [{
                            "path": "nest2.md",
                            "title": "nest2",
                            "level": "1.1.1",
                            "articles": [],
                            "exists": true,
                            "external": false,
                            "introduction": false
                        }],
                        "exists": true,
                        "external": false,
                        "introduction": false
                    }],
                    "exists": true,
                    "external": false,
                    "introduction": false
                }, {
                    "path": "nest1.md",
                    "title": "nest1",
                    "level": "1.1",
                    "articles": [{
                        "path": "nest2.md",
                        "title": "nest2",
                        "level": "1.1.1",
                        "articles": [],
                        "exists": true,
                        "external": false,
                        "introduction": false
                    }],
                    "exists": true,
                    "external": false,
                    "introduction": false
                }, {
                    "path": "nest2.md",
                    "title": "nest2",
                    "level": "1.1.1",
                    "articles": [],
                    "exists": true,
                    "external": false,
                    "introduction": false
                }])
            });
        });
    })

});
