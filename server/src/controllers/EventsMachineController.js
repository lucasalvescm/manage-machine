const mongoose = require('mongoose');

const EventsMachine = mongoose.model('EventsMachine');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const eventsMachine = await EventsMachine.paginate({}, { page, limit: 10 });
    return res.json(eventsMachine);
  },

  async show(req, res) {
    const eventsMachine = await EventsMachine.findById(req.params.id);
    return res.json(eventsMachine);
  },

  async store(req, res) {
    const eventsMachine = await EventsMachine.create(req.body);
    return res.json(eventsMachine);
  },

  async update(req, res) {
    const eventsMachine = await EventsMachine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.json(eventsMachine);
  },

  async destroy(req, res) {
    await EventsMachine.findByIdAndRemove(req.params.id);

    return res.send();
  }
}