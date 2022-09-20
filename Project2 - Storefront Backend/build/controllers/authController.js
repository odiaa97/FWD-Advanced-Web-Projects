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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const authenticate_1 = require('../stores/Auth/authenticate');
const UserStore_1 = require('../stores/UserStore/UserStore');
const auth = new authenticate_1.Auth();
const userStore = new UserStore_1.UserStore();
const tokenSecret = process.env.TOKEN_SECRET;
class AuthController {
  constructor() {
    this.login = (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        const user = {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email
        };
        try {
          const newUser = yield userStore.createUser(user);
          var token = jsonwebtoken_1.default.sign(
            { user: newUser },
            tokenSecret
          );
          res.json(token);
        } catch (err) {
          throw new Error(`Error in routes/authRoutes: ${err}`);
        }
      });
  }
}
exports.default = AuthController;
