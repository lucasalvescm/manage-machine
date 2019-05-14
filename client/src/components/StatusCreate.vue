<template>
  <div class="row">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="field">
          <p class="control is-expanded">
            <input
              class="input is-primary has-text-centered"
              type="text"
              placeholder="Nome"
              v-model="name"
            >
          </p>
          <p class="control is-expanded">
            <input
              class="input is-primary has-text-centered"
              type="text"
              placeholder="Código"
              v-model="code"
            >
          </p>
          <p class="control has-text-centered">
            <a class="button is-success add-button" @click="createStatus">
              <span class="icon is-small">
                <i class="fa fa-plus"></i>
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import config from "../config";
export default {
  name: "novo-todo",
  data() {
    return {
      name: "",
      code: ""
    };
  },
  methods: {
    createStatus() {
      axios
        .post(
          config.API_LOCATION + "status",
          {
            name: this.name,
            code: this.code
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          this.status = "";
          this.$emit("newStatus");
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>

<style scoped>
.input {
  border-left: 0;
  border-right: 0;
  border-top: 0;
  border-radius: 0;
  outline: none;
  border-bottom-width: 2px;
  box-shadow: none;
}
.input.is-primary:focus {
  box-shadow: none;
}
.add-button {
  border-radius: 50%;
}
</style>
