import * as express from 'express';
import { Response } from 'express';
import * as dotenv from 'dotenv';
import { connectToDatabase } from './config/db';
dotenv.config();

const app = express();

connectToDatabase();

app.get("/", (_, res: Response) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});