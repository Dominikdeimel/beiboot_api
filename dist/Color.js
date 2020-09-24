"use strict";
exports.__esModule = true;
exports.Color = void 0;
var Color = /** @class */ (function () {
    function Color(hex) {
        this.hex = hex;
        /* Get the RGB values to calculate the Hue. */
        this.red = parseInt(hex.substring(0, 2), 16) / 255;
        this.green = parseInt(hex.substring(2, 4), 16) / 255;
        this.blue = parseInt(hex.substring(4, 6), 16) / 255;
        /* Getting the Max and Min values for Chroma. */
        var maxChroma = Math.max(this.red, this.green, this.blue);
        var minChroma = Math.min(this.red, this.green, this.blue);
        /* Variables for HSV value of hex color. */
        this.chroma = maxChroma - minChroma;
        this.hue = 0;
        this.val = maxChroma;
        this.sat = 0;
        if (this.val > 0) {
            /* Calculate Saturation only if Value isn't 0. */
            this.sat = this.chroma / this.val;
            if (this.sat > 0) {
                if (this.red == maxChroma) {
                    this.hue = 60 * (((this.green - minChroma) - (this.blue - minChroma)) / this.chroma);
                    if (this.hue < 0) {
                        this.hue += 360;
                    }
                }
                else if (this.green == maxChroma) {
                    this.hue = 120 + 60 * (((this.blue - minChroma) - (this.red - minChroma)) / this.chroma);
                }
                else if (this.blue == maxChroma) {
                    this.hue = 240 + 60 * (((this.red - minChroma) - (this.green - minChroma)) / this.chroma);
                }
            }
        }
        this.luma = 0.3 * this.red + 0.59 * this.green + 0.11 * this.blue;
    }
    return Color;
}());
exports.Color = Color;
