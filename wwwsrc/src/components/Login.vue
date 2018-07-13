<template>
    <div class="login-page">
        <form @submit.prevent="userLogin">
            <input type="text" name="email" id="email" v-model="login.email" placeholder="Email Address" autocomplete="email">
            <input type="password" name="password" id="password" v-model="login.password" placeholder="Password" autocomplete="current-password">
            <button type="submit">LOGIN</button>
        </form>
        <button @click="switchRegister">Not a user? Click here to register</button>
    </div>
</template>

<script>
    import router from '../router'
    export default {
        name: '',
        mounted() {
            if(!this.$store.state.user._id){
                this.$store.dispatch('authenticate')
            }
        },
        data() {
            return {
                login: {
                    email: '',
                    password: ''
                }
            }
        },
        computed: {},
        methods: {
            userLogin() {
                this.$store.dispatch('login', this.login)
            },
            switchRegister() {
                router.push({
                    name: 'Register'
                })
            }
        }
    }
</script>

<style>
</style>