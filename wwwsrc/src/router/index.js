import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }, 
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
    // {
    //   path: '/Board',
    //   name: 'Board',
    //   component: Board
    // }
  ]
})