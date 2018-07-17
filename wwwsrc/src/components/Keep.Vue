<template>
    <div class="keep container-fluid">
            
        <div class="row d-flex justify-content-center flex-wrap">
            <div class="col-12 d-flex justify-content-between flex-wrap">
                <div v-for="keep in keeps" :key="keep.id" class="keep card text-center">
                    <h3 class="card-title">{{keep.name}}</h3>
                    <img :src="keep.img" alt="">
                    <h3 class="card-text">{{keep.description}}</h3>
                    <h3 class="card-text">Views: {{keep.views}} Keeps:{{keep.keeps}}</h3>
                    <form>
                        <select v-model="vault">
                            <option disabled value=''>Select a Vault</option>
                            <option v-for="vault in vaults" :key="vault.id" :value="vault">{{vault.title}}</option>
                        </select>
                        <button v-if="vault.title" class="btn btn-primary" @click="createKeep">Save Pokemon</button>
                    </form>
                </div>
            </div>
        </div>
        <!-- <ul>
            <li v-for="keep in vault" class="keep-bg">
                <h3 class="keep-body">{{keep.body}}</h3>
                <select v-model="selected" @change="moveKeep(keep)">
                    <option disabled value="">Move to Vault:</option>
                    <option v-for="vault in vaults" v-if="keep.parentId!=vault._id" v-bind:value="keep._id">{{vault.title}}</option>
                </select>
                <button @click="deleteKeep(keep)">Delete this keep?</button>

            </li>
        </ul> -->
    </div>
</template>

<script>
    import router from '../router'
    import home from './Home.vue'
    export default {
        name: 'Keep',
        data() {
            return {
                vault: {},
                keep: {},
                newKeep: {
                    name: '',
                    description: '',
                    img: '',
                    views: 0,
                    keeps: 0
                }
            }
        },
        components: {
            home
        },
        mounted() {
            // this.$store.dispatch('fetchKeeps')
        },
        props: {

        },
        computed: {
            keeps() {
                return this.$store.state.activeKeeps
            },
            vaults(){
                return this.$store.state.vaults
            }
        },
        methods: {
            deleteKeep(keep) {
                this.$store.dispatch('deleteKeep', keep)
            },
            createKeep() {
                if (!this.vault.id) {
                    this.error("Please select a vault")
                }
                this.newKeep.vaultId = this.vault.id
                this.$store.dispatch("createKeep", this.newKeep)
            },
            
        }
    }
</script>

<style scoped>
    img{
    max-height: 25vh;
    max-width: 25vw;
  }
</style>