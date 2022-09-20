import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserStore } from '../stores/UserStore/UserStore';
import { getUserRole, getCurrentUser } from '../services/JWT/getCurrentUser';

class UserController {
  userStore = new UserStore();

  index = async (_req: Request, _res: Response) => {
    getCurrentUser(_req, _res)
      .then((user) => {
        if (user) {
          getUserRole(_req)
            .then(async (role) => {
              if (role == 'Moderator' || role == 'Admin') {
                const users = await this.userStore.getUsers();
                return _res.status(200).json(users);
              } else return _res.status(403).json('Forbidden.');
            })
            .catch((err) => {
              throw new Error(`${err.message}`);
            });
        } else {
          return _res.status(401).json('Unuthorized');
        }
      })
      .catch((error) => {
        _res.status(401).send(error);
      });
  };

  getUser = async (req: Request, res: Response) => {
    const user = await this.userStore.getUser(parseInt(req.params.id));
    res.json(user);
  };

  create = async (req: Request, res: Response) => {
    const user: User = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    if (await this.userStore.checkIfExists(user.username)) {
      return res.status(400).send('User already exists');
    }
    await this.userStore
      .createUser(user)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(400).send(err);
        throw new Error(err.message);
      });
  };

  destroy = async (req: Request, res: Response) => {
    const deleted = await this.userStore.deleteUser(req.body.id);
    res.json(deleted);
  };

  getMaxId = async (req: Request, res: Response) => {
    const maxId = await this.userStore.getMaxId();
    res.json(maxId);
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const user: User = {
        id: req.body.id,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      };
      const result = await this.userStore.updateUser(user);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
      throw new Error(`${err}`);
    }
  };
}

export default UserController;
