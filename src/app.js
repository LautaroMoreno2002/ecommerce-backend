import express from 'express';
import { config } from 'dotenv';
import { connect, connection } from 'mongoose';
import { json } from 'body-parser';

config();

const app = express();
app.use(json());

connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME })
const db = connection;

app.use('/products', require('./routes/products.router'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Escuchando...'))