import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import orderRoutes from './routes/order.route';
import productRoutes from './routes/product.route';

import cors from 'cors';
import cartRoutes from './routes/cart.route';

const app: express.Application = express();
const port = 3000;
const host = '127.0.0.1';
app.listen(port, host, () => {
  console.log(`listening on http://${host}:${port}`);
});

const corsOptions = {
  origin: 'http://localhost:3000',
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the home page!');
});

userRoutes(app);
authRoutes(app);
orderRoutes(app);
productRoutes(app);
cartRoutes(app);

export default app;
