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
    // boards: [],
    // board: {},
    // lists: {},
    // tasks: [],
    // taskList: {},
    // comments: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
    // deleteUser(state) {
    //   state.user = {}
    //   state.boards = []
    //   state.board = {}
    //   state.lists = {},
    //   state.taskList = {}
    //   state.comments={}
    // },
    // setBoards(state, boards) {
    //   state.boards = boards
    // },
    // setBoard(state, board) {
    //   state.board = board
    // },
    // setLists(state, lists) {
    //   state.lists = createDictionary(lists)
    //   console.log(state.lists)
    // },
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
    register(userData) {
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
      api.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'Home' })
        })
        .catch(res => {
          console.log(res)
        })
    }
  
  //   //APP STUFF

  //   //////// BOARDS //////////////////////////////////
  //   fetchBoards({ commit, dispatch }, user) {
  //     api.get('/api/boards', user)
  //       .then(res => {
  //         commit('setBoards', res.data)
  //       })
  //       .catch(err=>{
  //         console.log(err)
  //       })
  //   },
  //   createBoard({ commit, dispatch, state }, title) {
  //     api.post('/api/boards', title)
  //       .then(res => {
  //         dispatch('fetchBoards', state.user)
  //       })
  //       .catch(err=>{
  //         console.log(err)
  //       })
  //   },
  //   deleteBoard({ commit, dispatch, state }, board) {
  //     api.delete('/api/boards/' + board._id, board)
  //       .then(res => {
  //         dispatch('fetchBoards', state.user)
  //       })
  //       .catch(err=>{
  //         console.log(err)
  //       })
  //   },

  //   ////////  LISTS //////////////////////////////////
  //   createList({ commit, dispatch }, list) {
  //     api.post('/api/lists', list)
  //       .then(res => {
  //         dispatch('fetchLists', list.parentId)
  //       })
  //       .catch(err=>{
  //         console.log(err)
  //       })
  //   },
  //   fetchLists({ commit, dispatch }, boardId) {
  //     api.get('/api/lists')
  //       .then(res => {
  //         commit('setLists', res.data)
  //       })
  //       .catch(err=>{
  //         console.log(err)
  //       })
  //   },
  //   deleteList({ commit, dispatch }, list) {
  //     api.delete('/api/lists/' + list._id, list)
  //       .then(res => {
  //         dispatch('fetchLists', list.parentId)
  //       })
  //       .catch(err=>{
  //         console.log(err)
  //       })
  //   },

  //   //////// TASKS //////////////////////////////////
  //   fetchTasks({ commit, dispatch }) {
  //     api.get('/api/tasks')
  //       .then(res => {
  //         commit('setTaskList', res.data)
  //       })
  //       .catch(err=>{
  //         console.log(err)
  //       })
  //   },
  //   deleteTask({ commit, dispatch }, task) {
  //     api.delete('/api/tasks/' + task._id, task)
  //       .then(res => {
  //         dispatch('fetchTasks', task.parentId)
  //       })
  //       .catch(err=>{
  //         console.log(err)
  //       })
  //   },
  //   createTask({ commit, dispatch }, task) {
  //     api.post('/api/tasks', task)
  //       .then(res => {
  //         dispatch('fetchTasks', task.parentId)
  //       })
  //       .catch(err=>{
  //         console.log(err)
  //       })
  //   },
  //   moveTask({dispatch,commit}, task){
  //     api.put('/api/tasks/'+task._id,task)
  //       .then(res=>{
  //         dispatch('fetchTasks', task.parentId)
  //       })
  //       .catch(err=>{
  //         console.log(err)
  //       })
  //   },
    
  //   //////// COMMENTS //////////////////////////////////
  //   fetchComments({ commit, dispatch }) {
  //     api.get('/api/comments')
  //       .then(res => {
  //         commit('setComments', res.data)
  //       })
  //       .catch(err=>{
  //         console.log(err)
  //       })
  //   },
  //   deleteComment({ commit, dispatch }, comment) {
  //     api.delete('/api/comments/' + comment._id, comment)
  //       .then(res => {
  //         dispatch('fetchComments', comment.parentId)
  //       })
  //       .catch(err=>{
  //         console.log(err)
  //       })
  //   },
  //   createComment({ commit, dispatch }, comment) {
  //     api.post('/api/comments', comment)
  //       .then(res => {
  //         dispatch('fetchComments', comment.parentId)
  //       })
  //       .catch(err=>{
  //         console.log(err)
  //       })
  //   }
  }
})