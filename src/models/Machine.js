const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MachineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  last_status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

MachineSchema.plugin(mongoosePaginate);

mongoose.model('Machine', MachineSchema);