import express from 'express';
import UserController from '../controllers/user.controller';
import {
  verifyAuthentication,
  verifyAuthorization
} from '../middlewares/tokenVerification';

const userController = new UserController();

const userRoutes = (app: express.Application) => {
  app.get('/users', userController.index);
  app.get('/users/:id', userController.getUser);
  app.post('/users', verifyAuthentication, userController.create);
  app.delete('/users', verifyAuthentication, userController.destroy);
  app.put(
    '/users/update',
    verifyAuthorization('Admin'),
    userController.updateUser
  );
  app.get('/maxId', userController.getMaxId);
};

export default userRoutes;
