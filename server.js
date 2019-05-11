const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// Iniciando o app
const app = express();
app.use(express.json());
app.use(cors());

// Iniciando o DB
mongoose.connect(
  "mongodb://mongo:27017/manage-machine",
  { useNewUrlParser: true }
);

requireDir("./src/models")

app.use('/api', require('./src/routes'));

app.listen(3001, () => console.log(`Running in port ${3001}`));
