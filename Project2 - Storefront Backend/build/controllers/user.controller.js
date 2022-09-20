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
const getCurrentUser_1 = require('../services/JWT/getCurrentUser');
class UserController {
  constructor() {
    this.userStore = new UserStore_1.UserStore();
    this.index = (_req, _res) =>
      __awaiter(this, void 0, void 0, function* () {
        (0, getCurrentUser_1.getCurrentUser)(_req, _res)
          .then((user) => {
            if (user) {
              (0, getCurrentUser_1.getUserRole)(_req)
                .then((role) =>
                  __awaiter(this, void 0, void 0, function* () {
                    if (role == 'Moderator' || role == 'Admin') {
                      const users = yield this.userStore.getUsers();
                      return _res.status(200).json(users);
                    } else return _res.status(403).json('Forbidden.');
                  })
                )
                .catch((err) => {
                  throw new Error(`${err.message}`);
                });
            } else {
              return _res.status(401).json('Unuthorized');
            }
          })
          .catch((error) => {});
      });
    this.getUser = (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        const user = yield this.userStore.getUser(parseInt(req.params.id));
        res.json(user);
      });
    this.create = (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        const user = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        };
        if (yield this.userStore.checkIfExists(user.username)) {
          return res.status(400).send('User already exists');
        }
        yield this.userStore
          .createUser(user)
          .then((result) => {
            res.status(200).send(result);
          })
          .catch((err) => {
            res.status(400).send(err);
            throw new Error(err.message);
          });
      });
    this.destroy = (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        const deleted = yield this.userStore.deleteUser(req.body.id);
        res.json(deleted);
      });
    this.getMaxId = (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        const maxId = yield this.userStore.getMaxId();
        res.json(maxId);
      });
    this.updateUser = (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        try {
          const user = {
            id: req.body.id,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
          };
          const result = yield this.userStore.updateUser(user);
          res.status(200).send(result);
        } catch (err) {
          res.status(400).send(err);
          throw new Error(`${err}`);
        }
      });
  }
}
exports.default = UserController;
