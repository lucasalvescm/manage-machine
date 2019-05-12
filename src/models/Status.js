const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const StatusSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

StatusSchema.plugin(mongoosePaginate);

mongoose.model('Status', StatusSchema);