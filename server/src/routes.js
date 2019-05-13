const express = require('express');
const routes = express.Router();

const MachineController = require('./controllers/MachineController')
const StatusController = require('./controllers/StatusController')
const EventsMachineController = require('./controllers/EventsMachineController')
const ConfigCronController = require('./controllers/ConfigCronController')
// Machine routes
routes.get("/machines", MachineController.index);
routes.post("/machines", MachineController.store);
routes.get("/machines/:id", MachineController.show);
routes.put("/machines/:id", MachineController.update);
routes.delete("/machines/:id", MachineController.destroy);
routes.options("/machines", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
  res.end()
});
// Status routes
routes.get("/status", StatusController.index);
routes.post("/status", StatusController.store);
routes.get("/status/:id", StatusController.show);
routes.put("/status/:id", StatusController.update);
routes.delete("/status/:id", StatusController.destroy);
// Events Machine routes
routes.get("/events", EventsMachineController.index);
routes.post("/events", EventsMachineController.store);
routes.get("/events/:id", EventsMachineController.show);
routes.put("/events/:id", EventsMachineController.update);
routes.delete("/events/:id", EventsMachineController.destroy);

routes.get("/configcron", ConfigCronController.index);
routes.post("/configcron", ConfigCronController.store);

module.exports = routes;