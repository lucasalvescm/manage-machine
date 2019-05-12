const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// Iniciando o app
const app = express();
app.use(express.json());
app.use(cors());


const dbURI = "mongodb://localhost:27017/manage-machine"
var db = mongoose.connection;
db.on('connecting', function () {
  console.log('connecting to MongoDB...');
});

db.on('error', function (error) {
  console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});
db.on('connected', function () {
  console.log('MongoDB connected!');
});
db.once('open', function () {
  console.log('MongoDB connection opened!');
});
db.on('reconnected', function () {
  console.log('MongoDB reconnected!');
});
db.on('disconnected', function () {
  console.log('MongoDB disconnected!');
  mongoose.connect(dbURI, { useNewUrlParser: true }, { auto_reconnect: true });
});
mongoose.connect(dbURI, { useNewUrlParser: true }, { auto_reconnect: true });



requireDir("./src/models")

app.use('/api', require('./src/routes'));

app.listen(3001, () => console.log(`Running in port ${3001}`));
