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
      status: []
    };
  },
  computed: {
  
  },
  methods: {
    listStatus() {
      axios
        .get("http://localhost:3001/api/status")
        .then(response => {
          this.status = response.data.docs;
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
      .get("http://localhost:3001/api/status")
      .then(response => {
        this.status = response.data.docs;
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