const express = require('express');
const { config } = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME })
const db = mongoose.connection;

app.use('/products', require('./routes/products.router'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Escuchando...'))