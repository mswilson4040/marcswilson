"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var download = require("download-git-repo");
var MongoClient = require("mongodb/lib/mongo_client");
var environment_1 = require("../environments/environment");
var csv = require("csvtojson");
var MlbStatsDb = /** @class */ (function () {
    function MlbStatsDb() {
        this.init();
    }
    MlbStatsDb.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var errorOccurred, removeDBStep, cloneRepoStep, ex_1, dropDBStep, createDBStep;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errorOccurred = false;
                        console.log("Step 1/12: Removing BaseballDatabank local repo");
                        return [4 /*yield*/, this.removeDatabankRepo()];
                    case 1:
                        removeDBStep = _a.sent();
                        errorOccurred = removeDBStep === true ? false : removeDBStep;
                        if (errorOccurred) {
                            console.log("Error removing databank repo");
                        }
                        else {
                            console.log("Step 1/12: Finished removing BaseballDatabank local repo");
                        }
                        console.log("Step 2/12: Cloning baseball databank repo");
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        console.log("Step 2/12: About to clone repo");
                        return [4 /*yield*/, this.cloneRepository()];
                    case 3:
                        cloneRepoStep = _a.sent();
                        console.log("Step 2/12: done cloning baseball databank repo");
                        errorOccurred = cloneRepoStep === true ? false : cloneRepoStep;
                        if (errorOccurred) {
                            console.log("Step 2/12: Failed - Error cloning baseball databank");
                        }
                        else {
                            console.log("Step 2/12: Finished cloning baseball databank");
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        console.log(ex_1.message);
                        return [3 /*break*/, 5];
                    case 5:
                        console.log("Step 3/12: Dropping mlbstatsdb");
                        return [4 /*yield*/, this.dropDatabase()];
                    case 6:
                        dropDBStep = _a.sent();
                        errorOccurred = dropDBStep === true ? false : dropDBStep;
                        if (errorOccurred) {
                            console.log("Step 3/12: Failed - Error droping mlbstatsdb");
                        }
                        else {
                            console.log("Step 3/12: mlbstatsdb has been dropped");
                        }
                        console.log("Step 4/12: Creating database");
                        return [4 /*yield*/, this.createDatabase()];
                    case 7:
                        createDBStep = _a.sent();
                        console.log("after createdbstep " + createDBStep);
                        errorOccurred = createDBStep === true ? false : createDBStep;
                        if (errorOccurred) {
                            console.log("Step 4/12: Failed - Error creating database");
                        }
                        else {
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MlbStatsDb.prototype.removeDatabankRepo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('removeDatabankRepo entered');
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        console.log('About to Remove baseballdatabank');
                        fs.remove('baseballdatabank', function (err) {
                            console.log('fs remove finished');
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(true);
                            }
                        });
                    })];
            });
        });
    };
    MlbStatsDb.prototype.cloneRepository = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.removeDatabankRepo().then(function (res) {
                            if (res) {
                                try {
                                    download('chadwickbureau/baseballdatabank', 'baseballdatabank', function (err) {
                                        if (!err) {
                                            resolve(true);
                                        }
                                        else {
                                            reject(err);
                                        }
                                    });
                                }
                                catch (ex) {
                                    reject(ex);
                                }
                            }
                            else {
                                reject(null);
                            }
                        });
                    })];
            });
        });
    };
    MlbStatsDb.prototype.dropDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        MongoClient.connect(environment_1.environment.DATABASE.CONNECTION_STRING + "/chadwickdb", function (err, _db) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                _db.dropDatabase({}, function (dropErr, result) {
                                    if (dropErr) {
                                        reject(dropErr);
                                        _db.close();
                                    }
                                    else {
                                        resolve(true);
                                        _db.close();
                                    }
                                });
                            }
                        });
                    })];
            });
        });
    };
    MlbStatsDb.prototype.createDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.getCsvFiles().then(function (files) {
                            var testFiles = files.splice(0, 5);
                            var promises = files.map(function (f) { return __awaiter(_this, void 0, void 0, function () {
                                var name;
                                return __generator(this, function (_a) {
                                    name = this.getCollectionNameFromFile(f);
                                    if (name) {
                                        return [2 /*return*/, this.createCollection(name, f)];
                                    }
                                    return [2 /*return*/];
                                });
                            }); });
                            Promise.all(promises).then(function (results) {
                                console.log("All promises completed: " + results.length);
                                resolve(true);
                            }, function (error) {
                            }).catch(function (error) {
                                reject(error);
                            });
                        }, function (error) {
                            reject(error);
                        });
                    })];
            });
        });
    };
    MlbStatsDb.prototype.createCollection = function (collectionName, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        MongoClient.connect(environment_1.environment.DATABASE.CONNECTION_STRING + "/chadwickdb", function (err, db) {
                            if (!err) {
                                var data_1 = [];
                                console.log("creating " + collectionName + " collection");
                                db.createCollection(collectionName, function (colError, result) {
                                    if (!colError) {
                                        // TODO: CSV to JSON here...
                                        var csvPath = "baseballdatabank/core/" + fileName;
                                        console.log('csvpath', csvPath);
                                        csv().fromFile(csvPath).on('json', function (jsonObj) {
                                            if (jsonObj) {
                                                console.log(jsonObj);
                                                data_1.push(jsonObj);
                                            }
                                            else {
                                                console.error('REJECTED');
                                                reject(true);
                                            }
                                        }).on('done', function (error) {
                                            console.log("csv process complete for " + collectionName + ". record count: " + data_1.length);
                                            if (error) {
                                                console.log("Something bad happened!!!!!");
                                                reject(error);
                                                db.close();
                                            }
                                            else {
                                                var collection = db.collection(collectionName);
                                                var batch = collection.initializeOrderedBulkOp();
                                                for (var i = 0; i < data_1.length; i++) {
                                                    batch.insert(data_1[i]);
                                                }
                                                console.log("batch command about to execute " + collectionName);
                                                batch.execute(function (bulkError, bulkResult) {
                                                    if (bulkError) {
                                                        console.log("Bulk Error!");
                                                        db.close();
                                                        reject(bulkError);
                                                    }
                                                    else {
                                                        console.log("Bulk process done for " + collectionName);
                                                        db.close();
                                                        resolve(bulkResult);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        reject(colError);
                                        db.close();
                                    }
                                });
                            }
                            else {
                                reject(err);
                            }
                        });
                    })];
            });
        });
    };
    MlbStatsDb.prototype.getCollectionNameFromFile = function (fileName) {
        var name = '';
        if (fileName.endsWith('.csv')) {
            fileName = fileName.replace('.csv', '');
            //name = fileName.endsWith('s') ? fileName.toLowerCase() : `${fileName.toLowerCase()}s`;
            //return name;
            return fileName.toLowerCase();
        }
        return null;
    };
    MlbStatsDb.prototype.getCsvFiles = function () {
        var files = [];
        return new Promise(function (resolve, reject) {
            fs.readdir('baseballdatabank/core', function (err, _files) {
                if (!err) {
                    for (var i = 0; i < _files.length; i++) {
                        if (_files[i].endsWith('.csv')) {
                            files.push(_files[i]);
                        }
                    }
                    resolve(files);
                }
                else {
                    reject(err);
                }
            });
        });
    };
    return MlbStatsDb;
}());
exports.MlbStatsDb = MlbStatsDb;
new MlbStatsDb();
//# sourceMappingURL=chadwick-extract.js.map