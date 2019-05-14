<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title has-text-left">LOGS DE EVENTOS</p>
      <div class="has-text-right">
        <p class="card-header-title"></p>
      </div>
    </header>
    <div class="card-content">
      <div class="content">
        <log-event-list :logs="logs"></log-event-list>
      </div>

      <nav class="pagination" role="navigation" aria-label="pagination">
        <a
          class="pagination-previous"
          title="This is the first page"
          v-bind:disabled="(pageCurrent === 1)"
          @click="listLogs(pageCurrent-1)"
        >Anterior</a>

        <a class="pagination-next" @click="listLogs(pageCurrent+1)">Próxima</a>
        <label>Página {{pageCurrent}}</label>
      </nav>
    </div>
  </div>
</template>

<script>
import LogEventList from "./LogEventList";
import config from "../config";
import axios from "axios";
export default {
  name: "log-event-card",
  components: {
    LogEventList
  },
  data() {
    return {
      logs: [],
      pages: [],
      pageCurrent: 1
    };
  },
  computed: {},
  methods: {
    listLogs(page) {
      if (!page) {
        page = this.pageCurrent;
      }
      axios
        .get(config.API_LOCATION + "events/?page=" + page)
        .then(response => {
          if (response.data) {
            this.logs = response.data.docs;
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
    this.listLogs();
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