import express from 'express';
import AuthController from '../controllers/auth.controller';

const authController = new AuthController();

const authRoutes = (app: express.Application) => {
  app.post('/register', authController.register);
  app.post('/login', authController.login);
};

export default authRoutes;
