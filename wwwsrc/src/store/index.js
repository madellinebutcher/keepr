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

function createDictionary(arr) {
  var out = {}
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!out[item.parentId]) {
      out[item.parentId] = []
      out[item.parentId].push(item)
    }
    else {
      out[item.parentId].push(item)
    }
  }
  return out
}

export default new vuex.Store({
  state: {
    user: {},
    vaults: [],
    vault: {},
    keeps: {},
    // tasks: [],
    // taskList: {},
    // comments: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    // deleteUser(state) {
    //   state.user = {}
    //   state.boards = []
    //   state.board = {}
    //   state.lists = {},
    //   state.taskList = {}
    //   state.comments={}
    // },
    setVaults(state, vaults) {
      state.vaults = vaults
    },
    setVault(state, vault) {
      state.vault = vault
    },
    setKeeps(state, keeps) {
      state.keeps = createDictionary(keeps)
      console.log(state.keeps)
    }
    // setTaskList(state, tasks) {
    //   state.taskList = createDictionary(tasks)
    // },
    // setComments(state, comments){
    //   state.comments=createDictionary(comments)
    // }
  },
  actions: {

    //AUTH STUFF
    login({ commit}, loginCredentials) {
      auth.post('login', loginCredentials)
        .then(res => {
          console.log("successfully logged in!")
          console.log(res.data.data)
          commit('setUser', res.data)
          router.push({ name: 'Home' })
        })
        .catch(err=>{
          console.log(err)
        })
    },
    logout({ commit }) {
      auth.delete('/logout')
        .then(res => {
          console.log("Successfully logged out!")
          commit('deleteUser')
          router.push({ name: 'Login' })
        })
        .catch(err=>{
          console.log(err)
        })
    },
    register({commit,dispatch}, userData) {
      auth.post('register', userData)
        .then(res => {
          console.log("Registration Successful")
          router.push({ name: 'Login' }) 
        })
        .catch(err=>{
          console.log(err)
        })
    },
    authenticate({ commit }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'Home' })
        })
        .catch(res => {
          console.log(res)
        })
    },
  
  //   //APP STUFF

    //////// VAULTS /////////////
    fetchVaults({ commit, dispatch }, user) {
      api.get('vault', user)
        .then(res => {
          commit('setVaults', res.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    createVault({ commit, dispatch, state }, vault) {
      api.post('vault', vault)
        .then(res => {
          dispatch('fetchVaults', state.user)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    deleteVault({ commit, dispatch, state }, vault) {
      api.delete('vault/' + vault._id, vault)
        .then(res => {
          dispatch('fetchVaults', state.user)
        })
        .catch(err=>{
          console.log(err)
        })
    },


    //////// KEEPS ///////
    fetchKeeps({ commit, dispatch }) {
      api.get('keep')
        .then(res => {
          commit('setKeep', res.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    deleteKeep({ commit, dispatch }, keep) {
      api.delete('keep/' + keep._id, keep)
        .then(res => {
          dispatch('fetchKeeps', keep.parentId)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    createKeep({ commit, dispatch }, keep) {
      api.post('keep', keep)
        .then(res => {
          dispatch('fetchKeeps', keep.parentId)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    moveKeep({dispatch,commit}, keep){
      api.put('keep/'+keep._id,keep)
        .then(res=>{
          dispatch('fetchKeeps', keep.parentId)
        })
        .catch(err=>{
          console.log(err)
        })
    }
    
  }
})