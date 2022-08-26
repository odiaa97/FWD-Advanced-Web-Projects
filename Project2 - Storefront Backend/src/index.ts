import express, { Request, Response } from 'express';

const app = express();

const port = 3000;
const host = '127.0.0.1';

app.get('/', (req: Request, res: Response) => {
    res.send("Hello, world!");
})

app.listen(port, host, () => {
    console.log(`Server listening on ${host}:${port}`)
});

export default app;
