<template>
  <div class="row">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="field is-grouped">
          <p class="control is-expanded">
            <input
              class="input is-primary has-text-centered"
              type="text"
              placeholder="Nova máquina..."
              v-model="machine"
            >
          </p>
          <p class="control">
            <a class="button is-success add-button" @click="createMachine">
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
export default {
  name: "machine-create",
  data() {
    return {
      machine: ""
    };
  },
  methods: {
    createMachine() {
      axios
        .post(
          "http://managemachine.ddns.net/api/machines",
          {
            name: this.machine
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          this.machine = "";
          this.$emit("newMachine");
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
