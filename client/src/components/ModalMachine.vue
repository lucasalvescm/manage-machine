<template>
  <div>
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <label class="label">Atualizar Máquina</label>
          <div class="field">
            <label class="label" style="text-align:left">Nome</label>
            <div class="control">
              <input class="input" type="text" placeholder="Nome da máquina" v-model="name">
            </div>
          </div>
          <div class="control">
            <button class="button is-primary" @click="update()">Salvar</button>
            <button class="button is-danger" @click="$emit('close')">Cancelar</button>
          </div>
        </div>
      </div>
      <button class="modal-close" @click="$emit('close')"></button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import config from "../config";
export default {
  name: "modal-machine",
  props: ["machineToUpdate"],
  data() {
    return {
      name: this.machineToUpdate.name
    };
  },
  watch: {
    machineToUpdate: function(newVal, oldVal) {
      this.name = newVal.name;
    }
  },
  methods: {
    update() {
      axios
        .put(
          config.API_LOCATION + "machines/" + this.machineToUpdate._id,
          {
            name: this.name
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          this.name = "";
          this.$emit("updateMachine");
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>


