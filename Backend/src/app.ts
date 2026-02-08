import express, { Request, Response } from 'express'
import connectDB from './config/db.config';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/app.routes';


dotenv.config();
const app = express();

connectDB();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(router);

export default app;

