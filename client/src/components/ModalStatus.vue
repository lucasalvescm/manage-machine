<template>
  <div>
    <div class="modal is-active">
       <div class="modal-background"></div>
       <div class="modal-content">
         
         <div class="box">
           <label class="label">Atualizar Status</label>
           <div class="field">
            <label class="label" style="text-align:left">Nome</label>
            <div class="control">
              <input class="input" type="text" placeholder="Nome da máquina" v-model="name">
            </div>
            <label class="label" style="text-align:left">Código</label>
            <div class="control">
              <input class="input" type="text" placeholder="Código" v-model="code">
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
export default {
  name: "modal-status",
  props: ["statusToUpdate"],
  data() {
    return{
      name: this.statusToUpdate.name,
      code: this.statusToUpdate.code
    }
  },
  watch: { 
    statusToUpdate: function(newVal, oldVal) {
      this.name = newVal.name
      this.code = newVal.code
    }
  },
  methods: {
    update(){
      axios
        .put(
          "http://localhost:3001/api/status/"+this.statusToUpdate._id,
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
          this.name = ""
          this.$emit("updateStatus");
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>


