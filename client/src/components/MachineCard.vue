<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title has-text-left">Máquinas</p>
      <div class="has-text-right"></div>
    </header>

    <div class="card-content">
      <div class="content">
        <machine-create @newMachine="listMachines"></machine-create>
      </div>
      <div class="content">
        <machine-list :machines="machines" @refresh="listMachines"></machine-list>
      </div>

      <nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" title="This is the first page" disabled>Anterior</a>
        <a class="pagination-next">Próxima</a>
        <ul class="pagination-list">
          <li v-for="number in pages">
            <a
              @click="listMachines(number)"
              class="pagination-link"
              v-bind:class="{ 'is-current':(pageCurrent === number) }"
              aria-label="Goto page number"
            >{{number}}</a>
          </li>
        </ul>
      </nav>
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
      machines: [],
      pages: [],
      pageCurrent: 1,
      errored: false
    };
  },
  computed: {},
  methods: {
    listMachines(page) {
      if (!page) {
        page = this.pageCurrent;
      }
      axios
        .get("http://localhost/api/machines/?page=" + page)
        .then(response => {
          if (response.data) {
            this.machines = response.data.docs;
            this.pages = response.data.pages;
            this.pageCurrent = parseInt(response.data.page);
          }
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
    this.listMachines();
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