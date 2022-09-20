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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRole = exports.getCurrentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserStore_1 = require("../../stores/UserStore/UserStore");
const userStore = new UserStore_1.UserStore();
function getCurrentUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader)
                res.status(401).send("You must provide token");
            else {
                const token = authorizationHeader.split(' ')[1];
                jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        reject(res.status(400).send(`Invalid token: ${err.message}`));
                    else {
                        let tokenObj = JSON.parse(JSON.stringify(result));
                        const user = yield userStore.getUser(tokenObj.user.id);
                        console.log(user);
                        resolve(user);
                    }
                }));
            }
        });
    });
}
exports.getCurrentUser = getCurrentUser;
function getUserRole(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader)
                reject("You must provide token");
            else {
                const token = authorizationHeader.split(' ')[1];
                jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        reject(`Invalid token: ${err.message}`);
                    else {
                        let tokenObj = JSON.parse(JSON.stringify(result));
                        const user = yield userStore.getUser(tokenObj.user.id);
                        if (user)
                            resolve(user.role || "No role found");
                        else
                            reject("User must be logged in");
                    }
                }));
            }
        });
    });
}
exports.getUserRole = getUserRole;
