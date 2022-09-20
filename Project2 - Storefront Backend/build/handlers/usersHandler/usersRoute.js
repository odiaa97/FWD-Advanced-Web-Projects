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
const user_1 = require('../../models/user');
const store = new user_1.UserStore();
const index = (_req, _res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const users = yield store.getUsers();
    _res.json(users);
  });
const show = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.getUser(req.body.id);
    res.json(user);
  });
const create = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email
      };
      const newUser = yield store.createUser(user);
      res.json(newUser);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  });
const destroy = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield store.deleteUser(req.body.id);
    res.json(deleted);
  });
const getMaxId = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const maxId = yield store.getMaxId();
    res.json(maxId);
  });
const userRoutes = (app) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
  app.delete('/users', destroy);
  app.get('/maxId', getMaxId);
};
exports.default = userRoutes;
