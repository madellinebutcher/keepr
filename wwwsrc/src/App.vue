<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link :to="{ name: 'Home'}">
        <a class="navbar-brand">KEEPR</a>
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link :to="{ name: 'UserProfile' }">
              <a class="nav-link">UserProfile
                <span class="sr-only">(current)</span>
              </a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Login' }">
              <a class="nav-link" @click="logout()" v-if="user">Logout</a>
            </router-link>
          </li>
          <!-- <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
              </li> -->
        </ul>
      </div>
    </nav>




    <!-- <nav class="navbar navbar-light top-header">
      <div class="row">
        <h1>Keepr</h1>
        <div>
          <router-link :to="{ name: 'Home'}" class="navbar-brand ml-3">
            <a>Home</a>
          </router-link>
        </div>
        <div v-if="user" class="navbar-brand">
          <router-link :to="{ name: 'Login'}" class="navbar-brand">
            <a class="navbar-brand" @click="logout()" v-if="user">Logout</a>
          </router-link>
        </div>
      </div>
      <a class="navbar-brand">User: {{user.username}}</a>
    </nav> -->
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
    methods: {
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