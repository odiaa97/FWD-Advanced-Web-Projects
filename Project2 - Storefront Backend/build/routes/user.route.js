'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const user_controller_1 = __importDefault(
  require('../controllers/user.controller')
);
const tokenVerification_1 = require('../middlewares/tokenVerification');
const userController = new user_controller_1.default();
const userRoutes = (app) => {
  app.get('/users', userController.index);
  app.get('/users/:id', userController.getUser);
  app.post(
    '/users',
    tokenVerification_1.verifyAuthentication,
    userController.create
  );
  app.delete(
    '/users',
    tokenVerification_1.verifyAuthentication,
    userController.destroy
  );
  app.put(
    '/users/update',
    (0, tokenVerification_1.verifyAuthorization)('Admin'),
    userController.updateUser
  );
  app.get('/maxId', userController.getMaxId);
};
exports.default = userRoutes;
