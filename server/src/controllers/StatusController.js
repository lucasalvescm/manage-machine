const mongoose = require('mongoose');

const Status = mongoose.model('Status');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const status = await Status.paginate({}, { page, limit: 10 });
    return res.json(status);
  },

  async show(req, res) {
    const status = await Status.findById(req.params.id);
    return res.json(status);
  },

  async store(req, res) {
    const status = await Status.create(req.body);
    return res.json(status);
  },

  async update(req, res) {
    const status = await Status.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.json(status);
  },

  async destroy(req, res) {
    await Status.findByIdAndRemove(req.params.id);

    return res.send();
  }
}