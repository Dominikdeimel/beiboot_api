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
exports.ImageStore = void 0;
var path = require("path");
var fs_1 = require("fs");
var sharp = require("sharp");
var ImageSorter_1 = require("./ImageSorter");
var ImageStore = /** @class */ (function () {
    function ImageStore() {
    }
    ImageStore.listImages = function (sorter) {
        if (sorter === void 0) { sorter = ImageSorter_1.random; }
        return __awaiter(this, void 0, void 0, function () {
            var imageData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getImageData()];
                    case 1:
                        imageData = _a.sent();
                        return [2 /*return*/, sorter(imageData)];
                }
            });
        });
    };
    ImageStore.getImageData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileList, data, _i, fileList_1, filename, imgPath, file, fileContent, content, stat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.readdir(path.join(__dirname, '../data/'))];
                    case 1:
                        fileList = _a.sent();
                        data = [];
                        _i = 0, fileList_1 = fileList;
                        _a.label = 2;
                    case 2:
                        if (!(_i < fileList_1.length)) return [3 /*break*/, 8];
                        filename = fileList_1[_i];
                        imgPath = path.join(__dirname, "../data/" + filename + "/original");
                        return [4 /*yield*/, fs_1.promises.open(imgPath, 'r')];
                    case 3:
                        file = _a.sent();
                        return [4 /*yield*/, fs_1.promises.readFile(path.join(__dirname, "../data/" + filename + "/metadata.json"), { encoding: 'utf8' })];
                    case 4:
                        fileContent = _a.sent();
                        content = JSON.parse(fileContent);
                        return [4 /*yield*/, file.stat()];
                    case 5:
                        stat = _a.sent();
                        return [4 /*yield*/, file.close()];
                    case 6:
                        _a.sent();
                        data.push({
                            filename: filename,
                            path: imgPath,
                            birthtime: stat.birthtime,
                            colors: content.hexcodes,
                            mainColor: content.hexcodes[0]
                        });
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 2];
                    case 8: return [2 /*return*/, data];
                }
            });
        });
    };
    ImageStore.loadImg = function (tag, size, square, sharpen, blur) {
        return __awaiter(this, void 0, void 0, function () {
            var imgPath, buffer, e_1, original;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        imgPath = path.join(__dirname, "../data/" + tag + "/");
                        if (size !== undefined)
                            imgPath += "" + size + (square ? '-square' : '');
                        else
                            imgPath += square ? 'square' : 'original';
                        imgPath += "" + (sharpen ? '-sharp' : '') + (blur ? '-blur' : '');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 7]);
                        return [4 /*yield*/, fs_1.promises.access(imgPath)];
                    case 2:
                        _a.sent();
                        buffer = fs_1.promises.readFile(imgPath);
                        return [3 /*break*/, 7];
                    case 3:
                        e_1 = _a.sent();
                        return [4 /*yield*/, fs_1.promises.readFile(path.join(__dirname, "../data/" + tag + "/original"))];
                    case 4:
                        original = _a.sent();
                        return [4 /*yield*/, this.convertImg(original, size, square, sharpen, blur)];
                    case 5:
                        buffer = _a.sent();
                        return [4 /*yield*/, fs_1.promises.writeFile(imgPath, buffer)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, buffer];
                }
            });
        });
    };
    ImageStore.convertImg = function (buffer, size, square, sharpen, blur) {
        if (square === void 0) { square = false; }
        if (sharpen === void 0) { sharpen = false; }
        if (blur === void 0) { blur = false; }
        return __awaiter(this, void 0, void 0, function () {
            var sharpImg, metadata, targetEdge;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sharp(buffer)];
                    case 1:
                        sharpImg = _a.sent();
                        return [4 /*yield*/, sharpImg.metadata()];
                    case 2:
                        metadata = _a.sent();
                        if (square) {
                            targetEdge = Math.min(metadata.width, metadata.height);
                            sharpImg = sharpImg
                                .extract({
                                left: Math.floor(Math.max(0, (metadata.width - targetEdge) / 2)),
                                top: Math.floor(Math.max(0, (metadata.height - targetEdge) / 2)),
                                width: targetEdge,
                                height: targetEdge
                            });
                        }
                        if (size !== undefined) {
                            sharpImg = sharpImg
                                .resize(size, null);
                        }
                        if (metadata.orientation !== undefined) {
                            sharpImg = this.applyExifOrientation(metadata.orientation, sharpImg);
                        }
                        if (sharpen) {
                            sharpImg = sharpImg
                                .sharpen();
                        }
                        if (blur) {
                            sharpImg = sharpImg
                                .blur();
                        }
                        return [4 /*yield*/, sharpImg
                                .toFormat('jpeg', { quality: 100 })
                                .toBuffer()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ImageStore.applyExifOrientation = function (orientation, sharpImg) {
        var tmp = sharpImg;
        // noinspection FallThroughInSwitchStatementJS
        switch (orientation) {
            case 2:
                tmp = tmp.flip();
                break;
            case 3:
                tmp = tmp.flip();
            case 4:
                tmp = tmp.flop();
                break;
            case 5:
                tmp = tmp.flip();
            case 6:
                tmp = tmp.rotate(90);
                break;
            case 7:
                tmp = tmp.flip();
            case 8:
                tmp = tmp.rotate(270);
                break;
        }
        return tmp;
    };
    return ImageStore;
}());
exports.ImageStore = ImageStore;
