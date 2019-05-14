<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title has-text-left">Status</p>
      <div class="has-text-right">
        <p class="card-header-title"></p>
      </div>
    </header>
    <div class="card-content">
      <div class="content">
        <status-create @newStatus="listStatus"></status-create>
      </div>
      <div class="content">
        <status-list :status="status" @refresh="listStatus"></status-list>
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
import StatusCreate from "./StatusCreate";
import StatusList from "./StatusList";
import axios from "axios";
export default {
  name: "todo-card",
  components: {
    StatusCreate,
    StatusList
  },
  data() {
    return {
      status: [],
      pages: [],
      pageCurrent: 1
    };
  },
  computed: {},
  methods: {
    listStatus(page) {
      if (!page) {
        page = this.pageCurrent;
      }
      axios
        .get("http://localhost/api/status/?page=" + page)
        .then(response => {
          if (response.data) {
            this.status = response.data.docs;
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
    this.listStatus();
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