"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const doImgProcessing = (fn, w, h) => {
    return new Promise((resolve, reject) => {
        const dirPath = path_1.default.join(__dirname, './../../../../public');
        if (!fs_1.default.existsSync(`${dirPath}/resized-images`)) {
            fs_1.default.mkdir(`${dirPath}/resized-images`, (err) => { return err; });
        }
        (0, sharp_1.default)(`${dirPath}\\images\\${fn}.png`)
            .resize(w, h)
            .png()
            .toFile(`${dirPath}/resized-images/${fn}-${w}-${h}.png`)
            .then(() => {
            resolve(`${fn}-${w}-${h}`);
        })
            .catch((err) => {
            reject(`Error: ${err.message}`);
        });
    });
};
exports.default = doImgProcessing;
