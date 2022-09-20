'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const auth_controller_1 = __importDefault(
  require('../controllers/auth.controller')
);
const authController = new auth_controller_1.default();
const authRoutes = (app) => {
  app.post('/register', authController.register);
  app.post('/login', authController.login);
};
exports.default = authRoutes;
