<template>
    <div class="register">
        <form @submit.prevent="userRegister">
            <input type="text" name="username" id="username" v-model="register.username" placeholder="username">
            <input type="text" name="email" id="email" v-model="register.email" placeholder="Email Address" autocomplete="email">
            <input type="password" name="password" id="password" v-model="register.password" placeholder="Password" autocomplete="current-password">
            <button type="submit">Register</button>
        </form>
        <button @click="switchLogin">Already a user? Click here to login!</button>
    </div>
</template>

<script>
    import router from '../router'
    export default {
        name: 'register',
        data() {
            return {
                register: {
                    username: '',
                    email: '',
                    password: ''
                }
            }
        },
        computed: {},
        methods: {
            userRegister() {
                this.$store.dispatch('register', this.register)
            },
            switchLogin() {
                router.push({
                    name: 'Login'
                })
            }
        }
    }
</script>

<style>
</style>