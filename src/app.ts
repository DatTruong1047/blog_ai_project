import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express, { Express } from 'express';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(bodyParser.json());

export default app;
