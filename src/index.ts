import * as express from 'express';
//import { Response } from 'express';
import * as dotenv from 'dotenv';
import routes from './routes/routes';
import { connectToDatabase } from './config/db';
dotenv.config();

const app = express();

connectToDatabase();

app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});