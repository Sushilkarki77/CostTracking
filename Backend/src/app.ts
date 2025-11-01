import express, {Request, Response} from 'express'
import connectDB from '../config/db.config';
import dotenv from 'dotenv';



dotenv.config();


const app  = express();


connectDB()


app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});