'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
const UserStore_1 = require('../stores/UserStore/UserStore');
const store = new UserStore_1.UserStore();
class UserController {
  constructor() {
    this.index = (_req, _res) =>
      __awaiter(this, void 0, void 0, function* () {
        const users = yield store.getUsers();
        _res.json(users);
      });
    this.getUser = (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        const user = yield store.getUser(parseInt(req.params.id));
        res.json(user);
      });
    this.create = (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        try {
          const user = {
            username: req.body.name,
            email: req.body.email,
            password: req.body.password
          };
          const newUser = yield store.createUser(user);
          res.json(newUser);
        } catch (err) {
          res.status(400);
          res.json(err);
        }
      });
    this.destroy = (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        const deleted = yield store.deleteUser(req.body.id);
        res.json(deleted);
      });
    this.getMaxId = (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        const maxId = yield store.getMaxId();
        res.json(maxId);
      });
  }
}
exports.default = UserController;
