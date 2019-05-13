const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ConfigCronSchema = new mongoose.Schema({
  stringCron: {
    type: String,
    required: true
  },
  jsonParameters: {
    type: Object,
    required: true
  }
});

ConfigCronSchema.plugin(mongoosePaginate);

mongoose.model('ConfigCron', ConfigCronSchema);