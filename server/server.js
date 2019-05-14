const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');


// Iniciando o app
const app = express();
app.use(express.json());
app.use(cors());



// Configurando o db
const dbURI = "mongodb://localhost:27017/manage-machine"
// const dbURI = "mongodb://mongo:27017/manage-machine"
var db = mongoose.connection;
db.on('connecting', function () {
  console.log('connecting to MongoDB...');
});
db.on('error', function (error) {
  console.error('Error in MongoDb connection: ' + error);
  console.log("Tentando reconectar novamente em 5 segundos!")
  setTimeout(function () {
    mongoose.disconnect();
  }, 10000);

});
db.on('connected', function () {
  console.log('MongoDB connected!');
  // QUANDO O BANCO CONECTA, CHAMA A CRON PARA GERAR EVENTOS DE STATUS ALEATORIOS
  const tasks = require('./src/tasks/EventTask');
  tasks.startCron();
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
mongoose.connect(
  dbURI, { useNewUrlParser: true }, { auto_reconnect: true }
)

// Require Models
requireDir("./src/models")
// Inicando as rotas
app.use('/api', require('./src/routes'));

global.TASK = null;

app.listen(3001, () => console.log(`Running in port ${3001}`));
