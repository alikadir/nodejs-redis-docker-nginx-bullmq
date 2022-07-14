import 'dotenv/config';
import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send(`Hi! ${Date()}`);
});

app.listen(port, () => {
  console.log(`server start. localhost:${port}`);
});
