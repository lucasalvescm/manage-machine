const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const EventsMachineSchema = new mongoose.Schema({
  code_status: {
    type: String,
    required: true
  },
  code_machine: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

EventsMachineSchema.plugin(mongoosePaginate);

mongoose.model('EventsMachine', EventsMachineSchema);