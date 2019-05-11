const express = require('express');
const routes = express.Router();

const MachineController = require('./controllers/MachineController')

routes.get("/machines", MachineController.index);
routes.post("/machines", MachineController.store);
routes.get("/machines/:id", MachineController.show);
routes.put("/machines/:id", MachineController.update);
routes.delete("/machines/:id", MachineController.destroy);

module.exports = routes;