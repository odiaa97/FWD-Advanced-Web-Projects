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
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
const tokenSecret = process.env.TOKEN_SECRET;
class Auth {
  register(user) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const conn = yield db_config_1.default.connect();
        const sql =
          'INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *;';
        const hash = bcrypt_1.default.hashSync(
          `${user.password}${pepper}`,
          Number(saltRounds)
        );
        const result = yield conn.query(sql, [
          user.username,
          hash,
          user.email,
          user.role
        ]);
        const returnUser = {
          id: result.rows[0].id,
          username: result.rows[0].username,
          email: result.rows[0].email,
          role: result.rows[0].role
        };
        conn.release();
        return returnUser;
      } catch (err) {
        throw new Error(`unable create user (${user.username}): ${err}`);
      }
    });
  }
  login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const getUserQuery = `SELECT * FROM users WHERE username='${username}';`;
        const conn = yield db_config_1.default.connect();
        const result = yield conn.query(getUserQuery);
        if (result.rows.length) {
          const user = result.rows[0];
          if (
            bcrypt_1.default.compareSync(`${password}${pepper}`, user.password)
          ) {
            const token = jsonwebtoken_1.default.sign(
              { user: result.rows[0] },
              tokenSecret
            );
            return token;
          } else {
            return 'Invalid username or password';
          }
        }
        conn.release();
        return 'User not found';
      } catch (error) {
        throw new Error(`invalid password: ${error}`);
      }
    });
  }
  checkIfUserExists(username) {
    return __awaiter(this, void 0, void 0, function* () {
      const checkIfUserExitsSql = `SELECT * FROM users WHERE username = '${username}'`;
      const conn = yield db_config_1.default.connect();
      const userExist = yield conn.query(checkIfUserExitsSql);
      if (userExist.rowCount > 0) return false;
      else return true;
    });
  }
}
exports.Auth = Auth;
