"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const doImgProcessing = (fn, w, h) => {
    return new Promise((resolve, reject) => {
        (0, sharp_1.default)(path_1.default.join(__dirname, `./../../../../public/images/${fn}.png`))
            .resize(w, h)
            .png()
            .toFile(path_1.default.join(__dirname, `./../../../../public/resized-images/${fn}-${w}-${h}.png`))
            .then(() => {
            resolve(`${fn}-${w}-${h}`);
        })
            .catch((err) => {
            reject(`Error: ${err.message}`);
        });
    });
};
exports.default = doImgProcessing;
