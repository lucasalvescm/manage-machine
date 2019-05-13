const mongoose = require('mongoose');

const Machine = mongoose.model('Machine');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const machines = await Machine.paginate({}, { page, limit: 10 });
    return res.json(machines);
  },

  async show(req, res) {
    const machine = await Machine.findById(req.params.id);
    return res.json(machine);
  },

  async store(req, res) {
    console.log(req.body)
    const machine = await Machine.create(req.body);
    return res.json(machine);
  },

  async update(req, res) {
    const machine = await Machine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.json(machine);
  },

  async destroy(req, res) {
    await Machine.findByIdAndRemove(req.params.id);

    return res.send();
  }
}