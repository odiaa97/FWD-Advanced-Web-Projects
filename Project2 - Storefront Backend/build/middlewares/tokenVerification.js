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
exports.verifyAuthorization = exports.verifyAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const UserStore_1 = require('../stores/UserStore/UserStore');
const userStore = new UserStore_1.UserStore();
const verifyAuthentication = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) res.status(401).send('You must provide token');
    else {
      const token = authorizationHeader.split(' ')[1]; // Bearer ey.....
      const decoded = jsonwebtoken_1.default.verify(
        token,
        process.env.TOKEN_SECRET
      ); //invalid malformed
      next();
    }
  } catch (error) {
    res.status(401).send('Something went wrong in validating token' + error);
  }
};
exports.verifyAuthentication = verifyAuthentication;
const verifyAuthorization = (role) => {
  return function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader)
          res.status(401).send('You must provide token');
        else {
          const token = authorizationHeader.split(' ')[1];
          jsonwebtoken_1.default.verify(
            token,
            process.env.TOKEN_SECRET,
            (err, result) => {
              if (err) return res.status(401).send(err.message);
              else {
                let tokenObj = JSON.parse(JSON.stringify(result));
                userStore
                  .getUser(req.body.id)
                  .then((userResult) => {
                    if (
                      userResult.username === tokenObj.username ||
                      role === tokenObj.role
                    ) {
                      next();
                    } else {
                      res.status(403).send('Authorization error');
                    }
                  })
                  .catch((err) => {
                    res.status(403).send(err.message);
                    throw new Error(err.message);
                  });
              }
            }
          );
        }
      } catch (error) {
        res
          .status(401)
          .send('Something went wrong in validating token' + error);
      }
    });
  };
};
exports.verifyAuthorization = verifyAuthorization;
