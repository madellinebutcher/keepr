<template>
    <div class="Vault container-fluid">
        <div class="row d-flex">
            <div class="col-12 justify-content-between">
                <button @click="logout" v-if="user">Logout</button>
                <button @click="toHome">Back to home</button>
            </div>
            <div class="col-12 justify-content-center">
                <h1 class="vault-title">{{vault.title}}</h1>
                
            </div>
        </div>
        <div class="row">
            <div v-for="keep in keeps[vault._id]" class="keep col-3 m-1">
                <h2 class="keep-title">{{keep.title}}</h2>
                <div class="row justify-content-center">
                    
                    <button @click="deleteKeep(keep)">Delete Keep?</button>
                </div>
                
            </div>
        </div>
    </div>

</template>

<script>
    import router from '../router'
    import keep from './Keep'
    export default {
        name: 'Vault',
        components: {
            keep
        },
        data() {
            return {
                keep: {
                    title: '',
                    parentId: ''
                }
            }
        },
        mounted() {
            this.$store.dispatch('fetchKeeps', this.vault._id)
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            vault() {
                return this.$store.state.vault
            },
            keeps() {
                return this.$store.state.keeps
            },
            // taskList() {
            //     return this.$store.state.taskList
            // }
        },
        methods: {
            toHome() {
                router.push({ name: 'Home' })
            },
            logout() {
                this.$store.dispatch('logout')
                router.push({ name: 'Login' })
            }
            // createList() {
            //     this.list.parentId = this.board._id
            //     this.$store.dispatch('createList', this.list)
            //     this.list = { title: '', parentId: '' }
            // },
            // deleteList(list) {
            //     this.$store.dispatch('deleteList', list)
            // },
            // createTask(list) {
            //     this.task.parentId = list._id
            //     this.$store.dispatch('createTask', this.task)
            //     this.task = { body: '', parentId: '' }
            // }
        }
    }
</script>

<style>

</style>