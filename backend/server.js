import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app. get('/cloths', (req, res) => {
    res.send('Server is ready');
    });

console.log(process.env.MONGO_URI);

app.listen(6000, () => {
    connectDB();
    console.log('Server listening on port 6000');
});