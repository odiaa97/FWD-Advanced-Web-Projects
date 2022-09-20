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
Object.defineProperty(exports, "__esModule", { value: true });
const authenticateStore_1 = require("../stores/AuthStore/authenticateStore");
const getCurrentUser_1 = require("../services/JWT/getCurrentUser");
const auth = new authenticateStore_1.Auth();
const tokenSecret = process.env.TOKEN_SECRET;
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class AuthController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userBody = req.body;
                const token = yield auth.login(userBody.username, userBody.password);
                if (token)
                    return res.json({ "Access Token: ": token });
                return res.status(400).send("Invalid username or password");
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = { username: req.body.username, password: req.body.password, email: req.body.email, role: req.body.role };
            if (!(yield auth.checkIfUserExists(user.username)))
                return res.status(400).json("User already exists");
            auth.register(user)
                .then((result) => {
                res.status(200).send(result);
            })
                .catch(err => {
                res.status(400).send(err);
            });
        });
    }
    getCurrentUser(req, res) {
        (0, getCurrentUser_1.getCurrentUser)(req, res)
            .then(currentUser => {
            res.status(200).json(currentUser);
        })
            .catch(err => {
            throw new Error(err.message);
        });
    }
}
exports.default = AuthController;
