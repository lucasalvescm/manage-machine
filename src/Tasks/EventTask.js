const mongoose = require('mongoose');

const Machine = mongoose.model('Machine');
const Status = mongoose.model('Status');
const EventsMachine = mongoose.model('EventsMachine');

function countStatus() {
  const status = Status.countDocuments({}, function (err, result) { return result });
  console.log(status)
}

function newStatus(machine) {
  let query = {}
  if (machine.last_status !== undefined) {
    query = {
      $not: { "name": machine.last_status }
    }
  }
  var random = Math.floor(Math.random() * 4);
  // let new_status;
  // Status.find(query).limit(1).skip(random).exec(
  //   function (err, status) {
  //     new_status = status;
  //   }
  // ).then((data) => {
  //   Machine.update({ _id: machine.id }, { $set: { last_status: new_status.code } });
  //   EventsMachine.create({ code_status: new_status.code, code_machine: machine.id })
  // })
  let new_status;
  console.log(query)
  Status.find({}, (err, result) => new_status = result)
    .limit(1).skip(random)
    .then(() => {
      // console.log({ _id: machine.id }, { $set: { last_status: new_status[0].code } })
      Machine.updateOne(
        { _id: machine.id }, { $set: { last_status: new_status[0].name } },
        function (err) { if (err) { console.log(err) } });
      // EventsMachine.create({ code_status: new_status.code, code_machine: machine.id })
    })
}

module.exports = {
  event() {
    machines_list = []
    Machine.find({}, function (err, machines) {
      machines.forEach(function (machine) {
        machines_list.push({
          id: machine._id,
          last_status: machine.last_status
        })
        // newStatus(query)
        // console.log(newStatus)
      })
    }).then((data) => {
      machines_list.forEach(function (machine) {
        newStatus(machine)
      })
    })


  }
}