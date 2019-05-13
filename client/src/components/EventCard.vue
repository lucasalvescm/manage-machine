<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title has-text-left">Configuração de Evento</p>
      <div class="has-text-right">
        <p class="card-header-title"></p>
      </div>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="config">
          <label for="">Minuto</label>
          <div class="select">
            <select>
              <option v-for="(n,i) in 0,60">{{i}}</option>
            </select>
          </div>
        </div>
        <div class="config">
          <label for="">Hora</label>
          <div class="select">
            <select>
              <option v-for="(n,i) in 0,24">{{i}}</option>
            </select>
          </div>
        </div>
        <div class="config">
          <label for="">Dia do Mês</label>
          <div class="select">
            <select>
              <option v-for="(n,i) in 1,31">{{n}}</option>
            </select>
          </div>
        </div>
        <div class="config">
          <label for="">Mês</label>
          <div class="select">
            <select>
              <option v-for="(n,i) in months" :value="i">{{n}}</option>
            </select>
          </div>
        </div>
        <div class="config">
          <label for="">Dia da Semana</label>
          <div class="select">
            <select>
              <option v-for="(n,i) in daysWeek" :value="i">{{n}}</option>
            </select>
          </div>
        </div>
      </div>       
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "event-card",
  components: {
    
  },
  data() {
    return {
      status: [],
      daysWeek: {
        0: "Todos",
        1: "Domingo",
        2: "Segunda",
        3: "Terça",
        4: "Quarta",
        5: "Quinta",
        6: "Sexta",
        7: "Sábado",
      },
      months: {
        0: "Todos",
        1: "Janeiro",
        2: "Fevereiro",
        3: "Março",
        4: "Abril",
        5: "Maio",
        6: "Junho",
        7: "Julho",
        8: "Agosto",
        9: "Setembro",
        10: "Outubro",
        11: "Novembro",
        12: "Dezembro",
      }
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
.config {
    display: inline-block;
}

.config label {
    display: block;
}
</style>