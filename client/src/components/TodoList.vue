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
            <a class="button is-danger is-small" @click="remover(index)">
              <span class="icon is-small">
                <i class="fa fa-trash"></i>
              </span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "todo-list",
  props: ["machines"],
  data() {
    return {};
  },
  methods: {
    remover(index) {
      this.$emit("remover", index);
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

<style scoped>
.button {
  border-radius: 50%;
}
</style>