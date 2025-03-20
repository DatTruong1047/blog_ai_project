import * as dotenv from 'dotenv';
dotenv.config();

export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = +process.env.PORT;
