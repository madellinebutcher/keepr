<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col">
        <button @click="logout" v-if="user">Logout</button>
        <hr>
        <h1>Hello {{user.username}}</h1>
        <hr>
        <form @submit.prevent="createBoard">
          <input type="text" name="title" v-model="title.title" placeholder="Board title goes here">
          <button type="submit">Create new board</button>
        </form>
      </div>
        <div v-for="board in boards" class="boards">
          <button @click="boardPage(board)">{{board.title}}</button>
          <button @click="deleteBoard(board)">Delete board</button>
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
        title: {
          title: ''
        }
      }
    },
    mounted() {
      if (!this.$store.state.user._id) {
        router.push({ name: 'Login' }) // this goes to a login.vue
      }
      this.$store.dispatch('fetchBoards', this.user)
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      boards() {
        return this.$store.state.boards
      }
    },
    methods: {
      createBoard() {
        this.$store.dispatch('createBoard', this.title)
        this.title = { title: '' }
      },
      boardPage(board) {
        this.$store.commit('setBoard', board)
        router.push({ name: 'Board' })
      },
      logout() {
        this.$store.dispatch('logout')
        router.push({ name: 'Login' })
      },
      deleteBoard(board) {
        this.$store.dispatch('deleteBoard', board)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style><template>
<div class="home container-fluid">
  <div class="row">
    <div class="col-12">
      <button @click="logout" v-if="user">Logout</button>
      <hr>
      <h1>Hello {{user.username}}</h1>
      <hr>
      <form @submit.prevent="createBoard">
        <input type="text" name="title" v-model="title.title" placeholder="Board title goes here">
        <button type="submit">Create new board</button>
      </form>
    </div>
  </div>
    <div class="row justify-content-around">
      <div v-for="board in boards" class="boards col-3 ml-2 mr-2 mb-5">
        <h2>{{board.title}}</h2>
        <button @click="boardPage(board)">Open</button>
        <button @click="deleteBoard(board)">Delete</button>
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
      title: {
        title: ''
      }
    }
  },
  mounted() {
    if (!this.$store.state.user._id) {
      router.push({ name: 'Login' }) // this goes to a login.vue
    }
    this.$store.dispatch('fetchBoards', this.user)
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    boards() {
      return this.$store.state.boards
    }
  },
  methods: {
    createBoard() {
      this.$store.dispatch('createBoard', this.title)
      this.title = { title: '' }
    },
    boardPage(board) {
      this.$store.commit('setBoard', board)
      router.push({ name: 'Board' })
    },
    logout() {
      this.$store.dispatch('logout')
      router.push({ name: 'Login' })
    },
    deleteBoard(board) {
      this.$store.dispatch('deleteBoard', board)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.boards{
  background-color: rgba(100,100,100,0.6);
  height: 6rem;
  margin-top: 2rem;
  display: inline-block;
}
</style>