<template>
    <div class="Vault container-fluid">
        <div class="row d-flex">
            <div class="col-12 justify-content-center">
                <h1>{{vault.name}}</h1>
                <h3>{{vault.description}}</h3>
            </div>
        </div>
        <!-- <keep></keep> -->
        <div v-for="keep in vaultKeeps" :key="keep.id">
            <img :src="keep.img" alt="">
            <p>{{keep.name}}</p>
            <p>{{keep.description}}</p>
            <p>Views: {{keep.views}}</p>
            <p>Keeps: {{keep.keeps}}</p>
        </div>
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
               keep:{}
            }
        },
        mounted() {
            this.$store.dispatch('fetchVaultKeepsById', this.vault)
        },
        computed: {
            vaultKeeps() {
                return this.$store.state.vaultKeeps
            },
            
            vault() {
                return this.$store.state.activeVault
            },
            keep(){
                return this.$store.state.activeKeep
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

<style scoped>
img{
    max-height: 25vh;
    max-width: 25vw;
  }
</style>