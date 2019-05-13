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
          <label for>Minuto</label>
          <div class="select">
            <select v-model="minuteSelected">
              <option value="*">Todos</option>
              <option v-for="(n,i) in 0,60">{{i}}</option>
            </select>
          </div>
        </div>
        <div class="config">
          <label for>Hora</label>
          <div class="select">
            <select v-model="hourSelected">
              <option value="*">Todos</option>
              <option v-for="(n,i) in 0,24">{{i}}</option>
            </select>
          </div>
        </div>
        <div class="config">
          <label for>Dia do Mês</label>
          <div class="select">
            <select v-model="daySelected">
              <option value="*">Todos</option>
              <option v-for="(n,i) in 1,31">{{n}}</option>
            </select>
          </div>
        </div>
        <div class="config">
          <label for>Mês</label>
          <div class="select">
            <select v-model="monthSelected">
              <option value="*">Todos</option>
              <option v-for="(n,i) in months" :value="i">{{n}}</option>
            </select>
          </div>
        </div>
        <div class="config">
          <label for>Dia da Semana</label>
          <div class="select">
            <select v-model="dayOfWeekSelected">
              <option value="*">Todos</option>
              <option v-for="(n,i) in daysWeek" :value="i">{{n}}</option>
            </select>
          </div>
        </div>
      </div>
      <a class="button is-primary" @click="saveConfig">Salvar</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "event-card",
  components: {},
  data() {
    return {
      status: [],
      idConfig: null,
      minuteSelected: "*",
      hourSelected: "*",
      daySelected: "*",
      monthSelected: "*",
      dayOfWeekSelected: "*",
      daysWeek: {
        0: "Dom.",
        1: "Seg.",
        2: "Ter.",
        3: "Qua.",
        4: "Qui.",
        5: "Sex.",
        6: "Sáb."
      },
      months: {
        1: "Jan.",
        2: "Fev.",
        3: "Mar.",
        4: "Abr.",
        5: "Mai.",
        6: "Jun.",
        7: "Jul.",
        8: "Ago.",
        9: "Set.",
        10: "Out.",
        11: "Nov.",
        12: "Dez."
      }
    };
  },
  computed: {},
  methods: {
    saveConfig() {
      let config = {
        minuteSelected: this.minuteSelected,
        hourSelected: this.hourSelected,
        daySelected: this.daySelected,
        monthSelected: this.monthSelected,
        dayOfWeekSelected: this.dayOfWeekSelected
      };
      if (!this.idConfig) {
        this.createConfig(config);
      } else {
        this.updateConfig(this.idConfig, config);
      }
    },
    getConfig() {
      axios
        .get("http://localhost:3001/api/configcron")
        .then(response => {
          if (response.data) {
            console.log(response.data);
            if (response.data.docs[0]) {
              let config = response.data.docs[0].jsonParameters;
              this.minuteSelected = config.minuteSelected;
              this.hourSelected = config.hourSelected;
              this.daySelected = config.daySelected;
              this.monthSelected = config.monthSelected;
              this.dayOfWeekSelected = config.dayOfWeekSelected;
              this.idConfig = config._id;
            }
            console.log(this.minuteSelected);
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    createConfig(config) {
      axios
        .post(
          "http://localhost:3001/api/configcron",
          {
            stringCron: config
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {})
        .catch(e => {
          console.error(e);
        });
    },
    updateConfig(index, config) {
      axios
        .put(
          "http://localhost:3001/api/configcron/" + index,
          {
            stringCron: config
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {})
        .catch(e => {
          console.error(e);
        });
    }
  },
  mounted() {
    this.getConfig();
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