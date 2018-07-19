import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from "../router"

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '' : '//localhost:5000/';


var api = axios.create({
  baseURL: baseUrl + 'api/',
  timeout: 3000,
  withCredentials: true
})
var auth = axios.create({
  baseURL: baseUrl + 'account/',
  timeout: 3000,
  withCredentials: true
})

vue.use(vuex)

// function createDictionary(arr) {
//   var out = {}
//   for (let i = 0; i < arr.length; i++) {
//     const item = arr[i];
//     if (!out[item.parentId]) {
//       out[item.parentId] = []
//       out[item.parentId].push(item)
//     }
//     else {
//       out[item.parentId].push(item)
//     }
//   }
//   return out
// }

export default new vuex.Store({
  state: {
    user: {},
    vaults: [],
    activeVault: {},
    activeKeeps: [],
    activeKeep: {},
    vaultKeeps: [],
    activeVaultKeep: {}


    // tasks: [],
    // taskList: {},
    // comments: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    deleteUser(state) {
      state.user = {}
      state.vaults = []
      state.activeVault = {}
      state.activeKeeps = []
      state.activeKeep = {}
      state.vaultKeeps = [],
      state.activeVaultKeep = {}
    },
    setVaults(state, vaults) {
      state.vaults = vaults
    },
    setActiveVault(state, vault) {
      state.activeVault = vault
    },
    setKeeps(state, keeps) {
      state.activeKeeps = keeps
    },
    setActiveKeep(state, keep) {
      state.activeKeep = keep
    },
    setVaultKeeps(state, vaultKeeps) {
      state.vaultKeeps = vaultKeeps
    },
    setActiveVaultKeep(state, vaultKeep) {
      state.activeVaultKeep = vaultKeep
    }

  },
  actions: {

    //AUTH STUFF
    login({ commit, dispatch }, loginCredentials) {
      auth.post('login', loginCredentials)
        .then(res => {
          console.log("successfully logged in!")
          console.log(res.data)
          commit('setUser', res.data)
          router.push({ name: 'Home' })
          dispatch('fetchVaults', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout({ commit, dispatch }) {
      auth.delete('')
        .then(res => {
          console.log("Successfully logged out!")
          commit('deleteUser')
          router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    register({ commit, dispatch }, userData) {
      auth.post('register', userData)
        .then(res => {
          console.log("Registration Successful")
          router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'Home' })
          commit('setVaults', res.data)
          dispatch('fetchVaults', res.data)
        })

    },

    //   //APP STUFF

    //////// VAULTS /////////////
    fetchVaults({ commit, dispatch, state }, user) {

      api.get('vault/author/' + user.id)
        .then(res => {

          commit('setVaults', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    createVault({ commit, dispatch, state }, vault) {
      api.post('vault', vault)
        .then(res => {
          dispatch('fetchVaults', state.user)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteVault({ commit, dispatch, state }, vault) {
      api.delete('vault/' + vault.id, vault)
        .then(res => {
          dispatch('fetchVaults', state.user)
        })
        .catch(err => {
          console.log(err)
        })
    },
    setActiveVault({ commit, dispatch, state }, vault) {
      commit('setActiveVault', vault)
    },


    //////// KEEPS ///////
    fetchKeeps({ commit, dispatch }) {
      api.get('keep')
        .then(res => {
          commit('setKeeps', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // deleteKeep({ commit, dispatch }, keep) {
    //   api.delete('keep/' + keep.id, keep)
    //     .then(res => {
    //       dispatch('fetchKeeps', keep.parentId)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    createKeep({ commit, dispatch }, keep) {
      api.post('keep', keep)
        .then(res => {
          dispatch('fetchKeeps', keep.parentId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    moveKeep({ dispatch, commit }, keep) {
      api.put('keep/' + keep._id, keep)
        .then(res => {
          dispatch('fetchKeeps', keep.parentId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    viewKeep({ commit, dispatch, state }, keep) {
      api.get('keep/' + keep.id, keep)
        .then(res => {
          commit('setKeeps', res.data) //setactivekeep
          //dispatch edit keep to increase view count
        })
    },
    editKeep({ commit, dispatch }, keep) {
      api.put('keep/' + keep.id, keep)
        .then(res => {
          commit('setActiveKeep', keep)
          dispatch('fetchKeeps', keep)
        })
    },

    /////vaultKeep/////
    fetchVaultKeeps({ commit, dispatch }, user) {
      api.get('vaultkeep/author/' + user.id)
        .then(res => {
          commit('setVaultKeeps', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    createVaultKeep({ commit, dispatch, state }, vaultKeep) {
      api.post('vaultkeep/', vaultKeep)
        .then(res => {
          dispatch('fetchVaultKeeps', vaultKeep.parentId)
        })
        .catch(err => {
          console.log(err)
        })
    },

    fetchVaultKeepsById({commit, dispatch, state}, vaultKeep){
      
      api.get('vaultkeep/vault/'+ vaultKeep.id )
       .then(res => {

         commit('setVaultKeeps', res.data )
       })
    }

  }
})