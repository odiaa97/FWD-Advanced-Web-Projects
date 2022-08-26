import express, { Response, Request } from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('main api endpoint');
});

routes.use('/images', images);

export default routes;
