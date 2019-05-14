<template>
  <div class="row">
    <table class="table">
      <thead>
        <tr>
          <th>Código Status</th>
          <th>Código Máquina</th>
          <th>Criado em</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(log, index) in logs">
          <th>{{log.code_status}}</th>
          <td>{{log.code_machine}}</td>
          <td>{{log.createdAt}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config";
export default {
  name: "log-event-list",
  props: ["logs"],
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {}
};
</script>

<style scoped>
.button {
  border-radius: 50%;
}
</style>