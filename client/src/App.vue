<template>
  <div id="app">
    <section class="hero is-light is-bold is-fullheight">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
            </a>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item" @click="swapComponent('machine-card')">
                Máquinas
              </a>

              <a class="navbar-item" @click="swapComponent('status-card')">
                Status
              </a>

              <a class="navbar-item" @click="swapComponent('event-card')">
                Configurações
              </a>
            </div>

            <div class="navbar-end">
              
            </div>
          </div>
        </nav>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="row">
            <div class="columns">
              <div class="column is-half is-offset-one-quarter">
                <div :is="currentComponent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero footer: will stick at the bottom -->
      <div class="hero-foot">
        <div class="container">
          <div class="content has-text-centered">
            <p></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MachineCard from "./components/MachineCard";
import StatusCard from "./components/StatusCard";
import EventCard from "./components/EventCard";
export default {
  name: "app",
  components: {
    MachineCard,
    StatusCard,
    EventCard
  },
  methods: {
    swapComponent: function(component)
    {
      this.currentComponent = component;
    }
  },
  data() {
    return {
      currentComponent: MachineCard
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
