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
export default {
  name: "novo-todo",
  props: ["machine"],
  data() {
    return{
      mensaje: 'Lorem lorem lorem',
      name: this.machine.name
    }
  },
  methods: {
    update(){
      axios
        .put(
          "http://localhost:3001/api/machines/"+this.machine._id,
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
          this.name = ""
          this.$emit("updateMachine");
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>


