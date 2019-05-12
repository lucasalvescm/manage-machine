const express = require('express');
const routes = express.Router();

const MachineController = require('./controllers/MachineController')
const StatusController = require('./controllers/StatusController')
const EventsMachineController = require('./controllers/EventsMachineController')
// Machine routes
routes.get("/machines", MachineController.index);
routes.post("/machines", MachineController.store);
routes.get("/machines/:id", MachineController.show);
routes.put("/machines/:id", MachineController.update);
routes.delete("/machines/:id", MachineController.destroy);
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

module.exports = routes;