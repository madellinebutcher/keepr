import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Vault from '@/components/Vault'
import Keep from '@/components/Keep'
import UserProfile from '@/components/UserProfile'

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
      path: '/UserProfile',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Vault',
      name: 'Vault',
      component: Vault
    },
    {
      path:'/Keep',
      name: 'Keep',
      component: Keep
    }
    //need keep/:id route
  ]
})