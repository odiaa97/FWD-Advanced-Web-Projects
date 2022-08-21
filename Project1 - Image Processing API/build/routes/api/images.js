"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const images = express_1.default.Router();
images.get('/', (req, res) => {
    if (!req.query.filename && !req.query.width && !req.query.height)
        return res.status(200).send('Images API endpoint');
    if (!req.query.filename && (req.query.width || req.query.height))
        return res
            .status(400)
            .send({ message: 'Bad Requst: Please enter a filename' });
    if (req.query.filename && (!req.query.width || !req.query.height))
        return res
            .status(200)
            .send(`<img src=./images/${req.query.filename}.png />`);
    if (req.query.filename && req.query.width && req.query.height) {
        try {
            if (!parseInt(req.query.width))
                return res
                    .status(400)
                    .send('Bad Request: Please, enter a valid width');
            if (!parseInt(req.query.height))
                return res
                    .status(400)
                    .send('Bad Request: Please, enter a valid height');
            const intWidth = parseInt(req.query.width);
            const intheight = parseInt(req.query.height);
            (0, sharp_1.default)(path_1.default.join(__dirname, `./../../../public/images/${req.query.filename}.png`))
                .resize(intWidth, intheight)
                .png()
                .toFile(path_1.default.join(__dirname, `./../../../public/resized-images/${req.query.filename}-${req.query.width}-${req.query.height}.png`))
                .then(() => {
                res.send(`<img src=./resized-images/${req.query.filename}-${req.query.width}-${req.query.height}.png />`);
            })
                .catch((err) => {
                console.log({ error: err });
                return res.status(500).send({ error: err.message });
            });
        }
        catch (error) {
            console.log('ERROR: ', error);
            return res.status(400).send(error);
        }
    }
    else
        return res.status(200).send('Images API endpoint returned');
});
images.use(express_1.default.static(path_1.default.join(__dirname, './../../../public')));
exports.default = images;
