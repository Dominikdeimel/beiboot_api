"use strict";
exports.__esModule = true;
exports.color = exports.random = exports.name = exports.birthtime = void 0;
var Color_1 = require("./Color");
exports.birthtime = function (source) {
    return source.sort(function (a, b) {
        return a.birthtime > b.birthtime ? 1 : b.birthtime > a.birthtime ? -1 : 0;
    });
};
exports.name = function (data) {
    return data.sort(function (a, b) {
        var textA = a.filename.toUpperCase();
        var textB = b.filename.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
};
exports.random = function (data) {
    return data
        .sort(function () { return Math.random() - 0.5; });
};
exports.color = function (data) {
    return data
        .map(function (img) { return ({ color: new Color_1.Color(img.mainColor), meta: img }); })
        .sort(function (l, r) { return l.color.hue - r.color.hue; })
        .map(function (v) { return v.meta; });
};
