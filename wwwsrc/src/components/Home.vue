<template>
  <div class="home container-fluid">

    <div class="row d-flex flex-wrap">
      <div class="col">
        <hr>
        <h1>Hello {{user.username}}</h1>
        <button @click="logout" v-if="user">Logout</button>
        <hr>
        <form @submit.prevent="createVault">
          <input type="text" name="title" v-model="vault.name" placeholder="Vault Name">
          <input type="text" name="description" v-model="vault.description" placeholder="Description">
          <button type="submit">Create Vault</button>
        </form>
      </div>
    </div>
    <br>
    <div class="row d-flex flex-wrap">
      <div class="col">
        <form @submit.prevent="createKeep">
          <input type="text" name="title" v-model="keep.name" placeholder="Keep Name">
          <input type="text" name="description" v-model="keep.description" placeholder="Description">
          <input type="url" name="img" v-model="keep.img" placeholder="Image">
          <button type="submit">Add Pokemon</button>
        </form>
      </div>
    </div>
    <br>
    <div class="row d-flex flex-wrap">
      <div class="col-12 d-flex justify-content-between flex-wrap">
        <h3>Your Vaults:</h3>
        <div v-for="vault in vaults" class="vaults">
          <button @click="vaultSection(vault)">{{vault.name}}</button>
          <button @click="deleteVault(vault)">Delete Vault</button>
        </div>
      </div>
    </div>
    <div class="row ">
      <div class="col-12 d-flex justify-content-between flex-wrap">
        <div v-for="keep in keeps" :key="keep.id" class="keep card text-center">
          <h3 class="card-title">{{keep.name}}</h3>
          <img :src="keep.img" alt="">
          <h3 class="card-text">{{keep.description}}</h3>
          <h3 class="card-text">Views: {{keep.views}} Keeps:{{keep.keeps}}</h3>
          <!-- <router-link :to="{ name: 'Keep', params: { id: keep.id }}"> -->
            <button @click="viewedKeep(keep)">View Pokemon</button>

          <!-- </router-link> -->
          <!-- <button @click="saveKeep(keep)">Save Pokemon</button> -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import router from '../router'
  export default {
    name: 'Keep',
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
          views: 0,
          keeps: 0
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
        this.$store.dispatch('setActiveVault', vault)
        router.push({ name: 'Vault' })
      },
      logout() {
        this.$store.dispatch('logout')
      },
      deleteVault(vault) {
        this.$store.dispatch('deleteVault', vault)
      },
      createKeep() {
        this.$store.dispatch('createKeep', this.keep)
      },
      viewedKeep(keep) {
        keep.views++
        this.$store.dispatch('editKeep', keep)
        router.push({ name: 'Keep' })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    max-height: 25vh;
    max-width: 25vw;
  }
</style>