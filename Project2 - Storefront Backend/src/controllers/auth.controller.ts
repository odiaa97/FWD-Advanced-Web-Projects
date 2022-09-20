import { Request, Response } from 'express';
import { Auth } from '../stores/AuthStore/authenticateStore';
import { User } from '../models/user';
import { getCurrentUser } from '../services/JWT/getCurrentUser';

const auth = new Auth();

class AuthController {
  getCurrentUser(req: Request, res: Response) {
    getCurrentUser(req, res)
      .then((currentUser) => {
        res.status(200).json(currentUser);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  login = async (req: Request, res: Response) => {
    try {
      const userBody = req.body;
      const token = await auth.login(userBody.username, userBody.password);
      if (token) return res.json({ 'Access Token: ': token });
      return res.status(400).send('Invalid username or password');
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  register = async (req: Request, res: Response) => {
    const user: User = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      role: req.body.role
    };
    if (!(await auth.checkIfUserExists(user.username)))
      return res.status(400).json('User already exists');
    auth
      .register(user)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
}

export default AuthController;
