<template>
  <div id="app">
    <nav class="navbar navbar-light top-header">
      <div>
        <h1>Keepr</h1>
      </div>
      <div>
        <router-link :to="{ name: 'Home'}" class="navbar-brand">
          <a>Home</a>
        </router-link>
      </div>
      <!-- <div v-if="user" class="d-flex flex-column">
        <a class="navbar-brand">User: {{user.username}}</a>
        
        <a class="navbar-brand" @click="logout" v-if="user">Logout</a>
      </div> -->

    </nav>
    <router-view/>
  </div>

</template>

<script>
  export default {
    name: 'App',
    mounted() {
      this.$store.dispatch('authenticate')

    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    method: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>