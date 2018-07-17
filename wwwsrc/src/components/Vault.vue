<template>
    <div class="Vault container-fluid">
        <div class="row d-flex">
            <div class="col-12 justify-content-center">
                <h1>{{vault.name}}</h1>
                <h3>{{vault.description}}</h3>
            </div>
        </div>
        <!-- <div class="row">
            <div v-for="keep in keeps[vault._id]" class="keep col-3 m-1">
                <h2 class="keep-title">{{keep.name}}</h2>
                <div class="row justify-content-center">
                    
                    <button @click="deleteKeep(keep)">Delete Keep?</button>
                </div>
                
            </div>
        </div> -->
    </div>

</template>

<script>
    import router from '../router'
    // import keep from './Keep'
    export default {
        name: 'Vault',
        components: {
            // keep
        },
        data() {
            return {
                // vault:{}
            }
        },
        mounted() {
            // this.$store.dispatch('fetchKeeps', this.vault.id)
        },
        computed: {
            keep() {
                return this.$store.state.activeKeep
            },
            vault(){
                return this.$store.state.activeVault
            }
        },
        methods: {
           
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