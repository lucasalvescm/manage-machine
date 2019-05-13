const mongoose = require('mongoose');

const ConfigCron = mongoose.model('ConfigCron');

function generateStringCron(json) {
  let cron = null
  if (json.stringCron) {
    cron = `${json.stringCron.minuteSelected} \
    ${json.stringCron.hourSelected} \
    ${json.stringCron.daySelected} \
    ${json.stringCron.monthSelected} \
    ${json.stringCron.dayOfWeekSelected}`
  }
  console.log(cron)
  return cron
}

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const eventsMachine = await ConfigCron.paginate({}, { page, limit: 10 });
    return res.json(eventsMachine);
  },

  async show(req, res) {
    const eventsMachine = await ConfigCron.findById(req.params.id);
    return res.json(eventsMachine);
  },

  async store(req, res) {
    stringCron = generateStringCron(req.body);
    if (stringCron) {
      ConfigCron.deleteMany({}, (err, removed) => {
        if (err) {
          console.log(err)
        }
        console.log(removed)
      })
      const eventsMachine = await ConfigCron.create({ stringCron: stringCron, jsonParameters: req.body.stringCron });
      return res.json(eventsMachine);
    }

    return res.json('')

  },

  async update(req, res) {
    stringCron = generateStringCron(req.body);
    if (stringCron) {
      const eventsMachine = await ConfigCron.findByIdAndUpdate(
        req.params.id,
        { stringCron: stringCron, jsonParameters: req.body.stringCron },
        { new: true }
      );
      return res.json(eventsMachine);
    }
    return res.json('')
  },

  // async destroy(req, res) {
  //   await EventsMachine.findByIdAndRemove(req.params.id);

  //   return res.send();
  // }
}