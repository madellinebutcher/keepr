<template>
    <div class="Vault container-fluid">
        <div class="row d-flex">
            <div class="col-12 justify-content-center">
                <h1>{{vault.name}}</h1>
                <h3>{{vault.description}}</h3>
            </div>
        </div>
        <!-- <keep></keep> -->
        <div class="row ">
            <div class="col-12 d-flex justify-content-between flex-wrap">
                <div v-for="keep in vaultKeeps" :key="keep.id" class="card text-center">
                    <img :src="keep.img" alt="">
                    <p>{{keep.name}}</p>
                    <p>{{keep.description}}</p>
                    <p>Views: {{keep.views}}</p>
                    <p>Keeps: {{keep.keeps}}</p>
                    <button type="button" v-if="keep.id" class="btn btn-danger" @click="deleteVaultKeep(keep)">Delete Pokemon</button>
                    
                </div>
            </div>
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
                // keep: {}
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
            keep() {
                return this.$store.state.activeKeep
            }
        },
        methods: {

            deleteVaultKeep(keep){
                
                this.$store.dispatch('deleteVaultKeep', keep)
            }
        }
    }
</script>

<style scoped>
    img {
        max-height: 40vh;
        max-width: 30vw;
    }
</style>