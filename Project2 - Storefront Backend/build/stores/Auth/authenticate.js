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
exports.Auth = void 0;
const bcrypt_1 = __importDefault(require('bcrypt'));
const db_config_1 = __importDefault(require('../../db_config'));
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class Auth {
  register(u) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const conn = yield db_config_1.default.connect();
        const sql =
          'INSERT INTO users (username, password) VALUES($1, $2) RETURNING *';
        const hash = bcrypt_1.default.hashSync(
          u.password + pepper,
          parseInt(saltRounds)
        );
        const result = yield conn.query(sql, [u.username, hash]);
        const user = result.rows[0];
        conn.release();
        return user;
      } catch (err) {
        throw new Error(`unable create user (${u.username}): ${err}`);
      }
    });
  }
  login(u) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const conn = yield db_config_1.default.connect();
        const sql = `SELECT * FROM users WHERE username = '${u.username}`;
        const result = yield conn.query(sql);
        if (result.rows.length) {
          const user = result.rows[0];
          const encryptedPassword = result.rows[0].password;
          if (bcrypt_1.default.compareSync(u.password, encryptedPassword)) {
            return user;
          }
          return undefined;
        }
      } catch (err) {
        throw new Error(`Error while login: ${err}`);
      }
    });
  }
}
exports.Auth = Auth;
