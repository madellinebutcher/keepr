<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col">
        <button @click="logout" v-if="user">Logout</button>
        <hr>
        <h1>Hello {{user.username}}</h1>
        <hr>
        <form @submit.prevent="createVault">
          <input type="text" name="title" v-model="vault.name" placeholder="Vault Name">
          <input type="text" name="description" v-model="vault.description" placeholder="Description">
          <button type="submit">Create Vault</button>
        </form>
      </div>
        <div v-for="vault in vaults" class="vaults">
          <button @click="vaultSection(vault)">{{vault.title}}</button>
          <button @click="deletVault(vault)">Delete vault</button>
        </div>
    </div>
  </div>
</template>

<script>
  import router from '../router'
  export default {
    name: 'Home',
    data() {
      return {
        vault: {
          name: '',
          description:''
        }
      }
    },
    mounted() {
      // if (!this.$store.state.user._id) {
      //   router.push({ name: 'Login' }) // this goes to a login.vue
      // }
      this.$store.dispatch('fetchVaults', this.user)
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      vaults() {
        return this.$store.state.vaults
      }
    },
    methods: {
      createVault() {
        this.$store.dispatch('createVault', this.vault)
      },
      vaultSection(vault) {
        this.$store.commit('setVault', vault)
        router.push({ name: 'Vault' })
      },
      logout() {
        this.$store.dispatch('logout')
        router.push({ name: 'Login' })
      },
      deleteVault(vault) {
        this.$store.dispatch('deleteVault', vault)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>