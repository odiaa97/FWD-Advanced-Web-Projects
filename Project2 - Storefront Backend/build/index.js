"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("./models/user");
const app = (0, express_1.default)();
const port = 3000;
const host = '127.0.0.1';
const userStore = new user_1.UserStore();
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Hello, world!');
});
app.listen(port, host, () => {
    const user = {
        id: 20,
        name: 'John updated',
        email: 'John@example.com'
    };
    console.log(`Server listening on ${host}:${port}`);
    userStore.deleteAllUsers()
        .then(() => {
        console.log("All Users deleted successfully.");
    })
        .catch(err => console.error(err));
    userStore.createUser(user);
    //userStore.deleteUser(20);
    userStore.updateUser(user);
    userStore.fetchAllUsersPromise()
        .then((result) => {
        if (result.length > 0)
            console.log("Fteching data from database...");
        console.log(result);
    })
        .catch((error) => {
        console.error(error);
    });
});
exports.default = app;
