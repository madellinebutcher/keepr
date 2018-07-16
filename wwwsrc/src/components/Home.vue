<template>
  <div class="home container-fluid">
    <div class="row d-flex flex-wrap">
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
    </div>
    <div class="row d-flex flex-wrap">
      <div class="col">
        <form @submit.prevent="createKeep">
          <input type="text" name="title" v-model="keep.name" placeholder="Keep Name">
          <input type="text" name="description" v-model="keep.description" placeholder="Description">
          <input type="url" name="img" v-model="keep.img" placeholder="Image">
          <button type="submit">Create Keep</button>
        </form>
      </div>
    </div>
    <div class="row d-flex flex-wrap">
      <div class="col">
        <div v-for="vault in vaults" class="vaults">
          <button @click="vaultSection(vault)">{{vault.name}}</button>
          <button @click="deleteVault(vault)">Delete vault</button>
        </div>
      </div>
    </div>
    <div class="row d-flex flex-wrap">
      <div class="col">
        <div v-for="keep in keeps" class="keeps">
          <button @click="keepSection(keep)">{{keep.name}}</button>
          <button @click="editKeep(keep)">Edit Keep</button>
        </div>
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
          description: '',
          authorId: ''
        },
        keep: {
          name: '',
          description: '',
          img: '',
        }
      }
    },
    mounted() {
      if (this.$store.state.user.id) {
        this.$store.dispatch('fetchVaults', this.$store.state.user)
      }
      this.$store.dispatch('fetchKeeps')
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      vaults() {
        return this.$store.state.vaults
      },
      keeps() {
        return this.$store.state.activeKeeps
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
      keepSection(keep) {
        this.$store.commit('setKeeps', keep)
        router.push({ name: 'Keep' })
      },
      logout() {
        this.$store.dispatch('logout')
        router.push({ name: 'Login' })
      },
      deleteVault(vault) {
        this.$store.dispatch('deleteVault', vault)
      },
      createKeep() {
        this.$store.dispatch('createKeep', this.keep)
      },
      editKeep(keep) {
        this.$store.dispatch('editKeep', keep)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>