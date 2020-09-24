"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
exports.__esModule = true;
var ImageStore_1 = require("./ImageStore");
var ImageSorter_1 = require("./ImageSorter");
var express = require("express");
var Config_1 = require("./Config");
var cors = require("cors");
var fs_1 = require("fs");
var shortId = require("shortid");
var sharp = require("sharp");
var path = require("path");
var image_size_1 = require("image-size");
var vibrant = require("node-vibrant");
var BackendApplication = /** @class */ (function () {
    function BackendApplication() {
        this._app = express();
        this._config = new Config_1.Config();
    }
    BackendApplication.prototype.start = function () {
        this.initializeServer();
        this.initializeEndpoints();
        this._app.listen(3000, function () {
            console.log('Listening on port 3000');
        });
    };
    BackendApplication.getMetadata = function (buffer, id) {
        return __awaiter(this, void 0, void 0, function () {
            var imagePath, palette, hexcodes, swatch, colors, dimensions, mode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        imagePath = path.join(__dirname, "../data/" + id + "/original");
                        return [4 /*yield*/, vibrant.from(path.join(__dirname, "../data/" + id + "/original")).getSwatches()];
                    case 1:
                        palette = _a.sent();
                        hexcodes = [];
                        for (swatch in palette) {
                            hexcodes.push({
                                name: swatch,
                                color: palette[swatch].getHex(),
                                population: palette[swatch].getPopulation(),
                                rgb: palette[swatch].getRgb(),
                                hsl: palette[swatch].getHsl()
                            });
                        }
                        hexcodes.sort(function (a, b) { return (b.population - a.population); });
                        colors = {
                            image: id,
                            path: "http://localhost:3000/image/" + id,
                            hexcodes: hexcodes
                        };
                        dimensions = image_size_1.imageSize(buffer);
                        if (dimensions.height > dimensions.width) {
                            mode = 'portrait';
                        }
                        else if (dimensions.height < dimensions.width) {
                            mode = 'landscape';
                        }
                        else
                            mode = 'square';
                        dimensions['mode'] = mode;
                        return [2 /*return*/, Object.assign({}, colors, dimensions)];
                }
            });
        });
    };
    BackendApplication.getSortedImageList = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var sorter;
            return __generator(this, function (_a) {
                sorter = undefined;
                switch (type) {
                    case "birthtime":
                        sorter = ImageSorter_1.birthtime;
                        break;
                    case "alphabetically":
                        sorter = ImageSorter_1.name;
                        break;
                    case "colors":
                        sorter = ImageSorter_1.color;
                        break;
                    case "random":
                        sorter = ImageSorter_1.random;
                }
                return [2 /*return*/, ImageStore_1.ImageStore.listImages(sorter)];
            });
        });
    };
    BackendApplication.getListInMode = function (mode) {
        return __awaiter(this, void 0, void 0, function () {
            var directory, list, i, imageData, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.readdir(path.join(__dirname, '../data'))];
                    case 1:
                        directory = _c.sent();
                        list = [];
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < directory.length)) return [3 /*break*/, 5];
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs_1.promises.readFile(path.join(__dirname, "../data/" + directory[i] + "/metadata.json"))];
                    case 3:
                        imageData = _b.apply(_a, [_c.sent()]);
                        if (imageData.mode === mode) {
                            list.push(imageData);
                        }
                        _c.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, list];
                }
            });
        });
    };
    BackendApplication.prototype.initializeServer = function () {
        this._app.use(cors());
        this._app.use(express.raw({
            type: '*/*', limit: '4gb'
        }));
    };
    BackendApplication.prototype.initializeEndpoints = function () {
        var _this = this;
        this._app.post('/', function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var e_1, err_1, id, buffer, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 4]);
                            return [4 /*yield*/, fs_1.promises.access(path.join(__dirname, '../data'))];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            e_1 = _a.sent();
                            return [4 /*yield*/, fs_1.promises.mkdir(path.join(__dirname, '../data'))];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, sharp(req.body)];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            err_1 = _a.sent();
                            res.sendStatus(415);
                            return [2 /*return*/];
                        case 7:
                            id = shortId.generate();
                            return [4 /*yield*/, fs_1.promises.mkdir(path.join(__dirname, "../data/" + id))];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, ImageStore_1.ImageStore.convertImg(req.body)];
                        case 9:
                            buffer = _a.sent();
                            return [4 /*yield*/, fs_1.promises.writeFile(path.join(__dirname, "../data/" + id + "/original"), buffer)];
                        case 10:
                            _a.sent();
                            return [4 /*yield*/, BackendApplication.getMetadata(buffer, id)];
                        case 11:
                            response = _a.sent();
                            return [4 /*yield*/, fs_1.promises.writeFile(path.join(__dirname, "../data/" + id + "/metadata.json"), JSON.stringify(response))];
                        case 12:
                            _a.sent();
                            res.end();
                            return [2 /*return*/];
                    }
                });
            });
        });
        this._app.get('/image/:tag', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tagParam, sizeParam, square, sharpen, blur, size, result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tagParam = req.params['tag'];
                        sizeParam = req.query['size'];
                        square = 'square' in req.query;
                        sharpen = 'sharpen' in req.query;
                        blur = 'blur' in req.query;
                        if (!(sizeParam !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._config.getImageSize(sizeParam)];
                    case 1:
                        size = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, ImageStore_1.ImageStore.loadImg(tagParam, size, square, sharpen, blur)];
                    case 3:
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        res.sendStatus(404);
                        return [2 /*return*/];
                    case 5:
                        res.set('Content-Type', 'image/jpeg');
                        res.send(result);
                        return [2 /*return*/];
                }
            });
        }); });
        this._app.get('/colors/:tag', function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var tag, data, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            tag = req.params['tag'];
                            _b = (_a = JSON).parse;
                            return [4 /*yield*/, fs_1.promises.readFile(path.join(__dirname, "../data/" + tag + "/metadata.json"), { encoding: 'utf8' })];
                        case 1:
                            data = _b.apply(_a, [_c.sent()]);
                            res.send(data.hexcodes);
                            return [2 /*return*/];
                    }
                });
            });
        });
        this._app["delete"]('/imageList', function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var directoryList, _i, directoryList_1, dir, imageDirEntries, _a, imageDirEntries_1, imageDirEntry;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, fs_1.promises.readdir(path.join(__dirname, '../data'))];
                        case 1:
                            directoryList = _b.sent();
                            _i = 0, directoryList_1 = directoryList;
                            _b.label = 2;
                        case 2:
                            if (!(_i < directoryList_1.length)) return [3 /*break*/, 10];
                            dir = directoryList_1[_i];
                            return [4 /*yield*/, fs_1.promises.readdir(path.join(__dirname, "../data/" + dir))];
                        case 3:
                            imageDirEntries = _b.sent();
                            _a = 0, imageDirEntries_1 = imageDirEntries;
                            _b.label = 4;
                        case 4:
                            if (!(_a < imageDirEntries_1.length)) return [3 /*break*/, 7];
                            imageDirEntry = imageDirEntries_1[_a];
                            return [4 /*yield*/, fs_1.promises.unlink(path.join(__dirname, "../data/" + dir + "/" + imageDirEntry))];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6:
                            _a++;
                            return [3 /*break*/, 4];
                        case 7: return [4 /*yield*/, fs_1.promises.rmdir(path.join(__dirname, "../data/" + dir))];
                        case 8:
                            _b.sent();
                            _b.label = 9;
                        case 9:
                            _i++;
                            return [3 /*break*/, 2];
                        case 10:
                            res.send('all images deleted');
                            return [2 /*return*/];
                    }
                });
            });
        });
        this._app["delete"]('/imageList/:img', function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var img, fileList, _i, fileList_1, imgFile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            img = req.params.img;
                            return [4 /*yield*/, fs_1.promises.readdir(path.join(__dirname, "../data/" + img))];
                        case 1:
                            fileList = _a.sent();
                            _i = 0, fileList_1 = fileList;
                            _a.label = 2;
                        case 2:
                            if (!(_i < fileList_1.length)) return [3 /*break*/, 5];
                            imgFile = fileList_1[_i];
                            return [4 /*yield*/, fs_1.promises.unlink(path.join(__dirname, "../data/" + img + "/" + imgFile))];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [4 /*yield*/, fs_1.promises.rmdir(path.join(__dirname, "../data/" + img))];
                        case 6:
                            _a.sent();
                            res.send('image deleted');
                            return [2 /*return*/];
                    }
                });
            });
        });
        this._app.get('/api/imageData', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var sort, skip, order, sortedImages, count, responseImages, response;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sort = (_a = req.query['sort']) !== null && _a !== void 0 ? _a : 'random';
                        skip = req.query['skip'] !== undefined ? parseInt(req.query['skip']) : 0;
                        order = (_b = req.query['order']) !== null && _b !== void 0 ? _b : 'asc';
                        return [4 /*yield*/, BackendApplication.getSortedImageList(sort)];
                    case 1:
                        sortedImages = _c.sent();
                        count = req.query['count'] !== undefined ? parseInt(req.query['count']) : sortedImages.length;
                        responseImages = BackendApplication.selectForPagination(sortedImages, count, skip);
                        if (order === 'desc')
                            responseImages.reverse();
                        response = {
                            sort: sort,
                            order: order,
                            count: count,
                            skip: skip,
                            images: responseImages
                        };
                        return [4 /*yield*/, BackendApplication.storeResponse(response)];
                    case 2:
                        _c.sent();
                        res.send(response);
                        return [2 /*return*/];
                }
            });
        }); });
        this._app.get('/random', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var mode, listInMode, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mode = (_a = req.query['mode']) !== null && _a !== void 0 ? _a : 'landscape';
                        return [4 /*yield*/, BackendApplication.getListInMode(mode)];
                    case 1:
                        listInMode = _b.sent();
                        result = listInMode[Math.floor(Math.random() * listInMode.length)];
                        res.send(result);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    BackendApplication.storeResponse = function (images) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = JSON.stringify(images);
                        return [4 /*yield*/, fs_1.promises.writeFile(path.join(__dirname, '../imageData.json'), data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BackendApplication.selectForPagination = function (source, count, skip) {
        return source.slice(skip, count);
    };
    return BackendApplication;
}());
var app = new BackendApplication();
app.start();
