import express from 'express';
import path from 'path';
import routes from './routes/index';

const app = express();
const host = 'localhost';
const port = 3000;

app.use(express.static(path.join(__dirname, './../public/')));

app.use('/api', routes);

app.get('/', (req: express.Request, res: express.Response): express.Response  => {
  return res.send(`<img src="./images/fjord.png" alt="${__dirname}" />`);
});

app.listen(port, host, () =>
  console.log(`Server listening on http://${host}:${port}`)
);
export default app;
