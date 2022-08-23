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
        const dirPath = path_1.default.join(__dirname, './../../../../public'); // Path to the images directory
        // Create a new directory if it doesn't exist
        if (!fs_1.default.existsSync(`${dirPath}/resized-images`)) {
            fs_1.default.mkdir(`${dirPath}/resized-images`, (err) => {
                return err;
            });
        }
        // check if it exists already, and get it from the resized-images directory
        if (fs_1.default.existsSync(`${dirPath}/resized-images/${fn}-${w}-${h}.png`)) {
            resolve(`${fn}-${w}-${h}`);
        }
        // If it doesn't exist, create it with sharp
        else {
            // Create a new image with new dimensions, and return only the image name
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
        }
    });
};
exports.default = doImgProcessing;
