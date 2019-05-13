<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title has-text-left">{{hoje}}</p>
      <div class="has-text-right">
        <p class="card-header-title">{{machines.length}} máquinas</p>
      </div>
    </header>
    <div class="card-content">
      <div class="content">
        <novo-todo @newMachine="listMachines"></novo-todo>
      </div>
      <div class="content">
        <todo-list :machines="machines" @check="checkTarefa" @remover="removerTarefa"></todo-list>
      </div>
    </div>
  </div>
</template>

<script>
import NovoTodo from "./NovoTodo";
import TodoList from "./TodoList";
import axios from "axios";
export default {
  name: "todo-card",
  components: {
    NovoTodo,
    TodoList
  },
  data() {
    return {
      dias: [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado"
      ],
      meses: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ],
      machines: []
    };
  },
  computed: {
    hoje: function() {
      let novaData = new Date();
      return `${this.dias[novaData.getDay()]}, ${novaData.getDate()} de ${
        this.meses[novaData.getMonth()]
      }`;
    }
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