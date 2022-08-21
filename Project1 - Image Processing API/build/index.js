"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const host = 'localhost';
const port = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, './../public/')));
app.use('/api', index_1.default);
app.get('/', (req, res) => {
    return res.send(`<img src="./images/fjord.png" alt="${__dirname}" />`);
});
app.listen(port, host, () => console.log(`Server listening on http://${host}:${port}`));
exports.default = app;
