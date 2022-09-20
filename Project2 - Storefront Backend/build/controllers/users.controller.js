"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const UserStore_1 = require("../stores/UserStore/UserStore");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_decorator_1 = __importDefault(require("../services/JWT/auth.decorator"));
const store = new UserStore_1.UserStore();
class UserController {
    constructor() {
        this.index = (_req, _res) => __awaiter(this, void 0, void 0, function* () {
            jsonwebtoken_1.default.verify(_req.body.token, process.env.TOKEN_SECRET, (err, token) => {
                if (err) {
                    _res.status(401);
                    _res.json(`Invalid token: ${err}`);
                }
            });
            const users = yield store.getUsers();
            _res.json(users);
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield store.getUser(parseInt(req.params.id));
            res.json(user);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = {
                    username: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                };
                const newUser = yield store.createUser(user);
                res.json(newUser);
            }
            catch (err) {
                res.status(400);
                res.json(err);
            }
        });
        this.destroy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const deleted = yield store.deleteUser(req.body.id);
            res.json(deleted);
        });
        this.getMaxId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const maxId = yield store.getMaxId();
            res.json(maxId);
        });
    }
}
__decorate([
    (0, auth_decorator_1.default)()
], UserController.prototype, "index", void 0);
exports.default = UserController;
