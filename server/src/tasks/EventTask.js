const mongoose = require('mongoose');

const Machine = mongoose.model('Machine');
const Status = mongoose.model('Status');
const EventsMachine = mongoose.model('EventsMachine');


function newStatus(machine, count_status) {
  let query = {}
  if (machine.last_status !== undefined) {
    console.log({ "name": { $ne: machine.last_status } })
    query = {
      "name": { $ne: machine.last_status }
    }
  }
  console.log(`STATUS ANTIGO(${machine.id}): ${machine.last_status}`)
  var random = Math.floor(Math.random() * count_status);
  let new_status;
  Status.find(query, (err, result) => new_status = result)
    .limit(1).skip(random)
    .then(() => {
      if (new_status[0]) {
        console.log(`STATUS NOVO(${machine.id}): ${new_status[0].name}`)
        // Atualiza o last_status da maquina
        Machine.updateOne(
          { _id: machine.id }, { $set: { last_status: new_status[0].name } },
          function (err) { if (err) { console.log(err) } });
        // Cria o log da nova mudança de status da maquina 
        EventsMachine.create({ code_status: new_status[0].code, code_machine: machine.id })
      }
      else {
        console.log("Ocorreu algum erro ou não foi encontrado um status diferente do atual.")
      }

    })
    .catch(function (e) {
      console.log(e)
    })
}
function getDateNow() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var time = today.getTime();
  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }
  today = `${yyyy}-${mm}-${dd} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  return today
}
module.exports = {
  event() {
    let count_status;
    date_now = getDateNow();
    console.log(`EventTask iniciou [${date_now}]`)
    Status.countDocuments({}, (err, result) => count_status = result)
      .then(() => {
        machines_list = []
        Machine.find({}, function (err, machines) {
          machines.forEach(function (machine) {
            machines_list.push({
              id: machine._id,
              last_status: machine.last_status
            })
          })
        })
          .then((data) => {
            machines_list.forEach(function (machine) {
              newStatus(machine, count_status)
            })
          })
          .catch(function (e) {
            console.log(e)
          })

      })
      .catch(function (e) {
        console.log(e)
      })

  }
}