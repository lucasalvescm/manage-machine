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
          <th>Código</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sts, index) in status">
          <th>{{sts.name}}</th>
          <td>{{sts.code}}</td>
          <td>
            <a class="button is-danger is-small" @click="remover(sts._id)">
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
  props: ["status"],
  data() {
    return {};
  },
  methods: {
    remover(index) {
      axios
        .delete(
          "http://localhost:3001/api/status/"+index,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          this.$emit("refresh");
        })
        .catch(e => {
          console.error(e);
        });
    }
    
  },
  mounted() {}
};
</script>

<style scoped>
.button {
  border-radius: 50%;
}
</style>