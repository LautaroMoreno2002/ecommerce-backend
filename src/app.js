const express = require('express');
const { config } = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

config(); // Deja disponibles las variables de entorno

const app = express();
app.use(bodyParser.json()); // Parsea los bodies a formato JSON

app.use('/', (req, res) => {
  res.send("HOLAA")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Escuchando..."))