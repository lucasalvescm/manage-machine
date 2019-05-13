<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title has-text-left">Máquinas</p>
      <div class="has-text-right">
        <p class="card-header-title">{{machines.length}} máquinas</p>
      </div>
    </header>
    <div class="card-content">
      <div class="content">
        <machine-create @newMachine="listMachines"></machine-create>
      </div>
      <div class="content">
        
        <machine-list :machines="machines" @refresh="listMachines"></machine-list>
      </div>
    </div>
  </div>
</template>

<script>
import MachineCreate from "./MachineCreate";
import MachineList from "./MachineList";

import axios from "axios";
export default {
  name: "todo-card",
  components: {
    MachineCreate,
    MachineList
  },
  data() {
    return {
      machines: []
    };
  },
  computed: {
    
  },
  methods: {
    listMachines() {
      axios
        .get("http://localhost:3001/api/machines")
        .then(response => {
          this.machines = response.data.docs;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    checkTarefa(index) {
      // this.tarefas[index]["checked"] = !this.tarefas[index]["checked"];
    },
    removerTarefa(index) {
      // this.tarefas.splice(index, 1);
    }
  },
  mounted() {
    axios
      .get("http://localhost:3001/api/machines")
      .then(response => {
        this.machines = response.data.docs;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

<style>
.card {
  border-radius: 10px;
}
.card-header-title {
  color: #636368;
}
</style>