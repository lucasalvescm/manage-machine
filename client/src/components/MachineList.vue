<template>
  <div class="row">
    <!--<div class="columns">
      <div class="column">
        <div class="field is-grouped" v-for="(machine, index) in machines">
          <p class="control is-expanded">{{machine.name}}</p>
          <p class="control">
            <a class="button is-danger is-small" @click="remover(index)">
              <span class="icon is-small">
                <i class="fa fa-trash"></i>
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>-->
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(machine, index) in machines">
          <th>{{machine.name}}</th>
          <td>{{machine.last_status}}</td>

          <td>
            <a class="button is-danger is-small" @click="remove(machine._id)">
              <span class="icon is-small">
                <i class="fa fa-trash"></i>
              </span>
            </a>
            <a class="button is-warning is-small" @click="edit(machine)">
              <span class="icon is-small">
                <i class="fa fa-edit"></i>
              </span>
            </a>
          </td>
        </tr>
        <modal-machine
          v-show="showModal"
          @close="showModal = false"
          @updateMachine="updateMachine"
          :machineToUpdate="machineCurrent"
        ></modal-machine>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import ModalMachine from "./ModalMachine";
import config from "../config";
export default {
  name: "todo-list",
  props: ["machines"],
  data() {
    return {
      showModal: false,
      machineCurrent: ""
    };
  },
  components: {
    ModalMachine
  },
  methods: {
    edit(machine) {
      this.machineCurrent = machine;
      this.showModal = true;
    },
    updateMachine() {
      this.showModal = false;
      this.$emit("refresh");
    },
    remove(index) {
      axios
        .delete(config.API_LOCATION + "machines/" + index, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.$emit("refresh");
        })
        .catch(e => {
          console.error(e);
        });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.button {
  border-radius: 50%;
}
</style>