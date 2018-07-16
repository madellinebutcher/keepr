<template>
    <div class="keeps">
        <ul>
            <li v-for="keep in vault" class="keep-bg">
                <h3 class="keep-body">{{keep.body}}</h3>
                <select v-model="selected" @change="moveKeep(keep)">
                    <option disabled value="">Move to Vault:</option>
                    <option v-for="vault in vaults" v-if="keep.parentId!=vault._id" v-bind:value="keep._id">{{vault.title}}</option>
                </select>
                <button @click="deleteKeep(keep)">Delete this keep?</button>

            </li>
        </ul>
    </div>
</template>

<script>
    import router from '../router'
    export default {
        name: 'Keeps',
        data() {
            return {
                keep: {
                    body: '',
                    parentId: ''
                },
                selected: ''
            }
        },
        components: {
            // keep
        },
        mounted() {
            this.$store.dispatch('fetchKeeps')
        },
        props: {
            list: {
                type: Array,
                required: true
            },
            lists: {
                type: Array,
                required: true
            }
        },
        computed: {
            comments() {
                return this.$store.state.comments
            }
        },
        methods: {
            deleteKeep(keep) {
                this.$store.dispatch('deleteKeep', keep)
            },
            // createComment(task) {
            //     this.comment.parentId = task._id
            //     this.$store.dispatch('createComment', this.comment)
            //     this.comment = { body: '', parentId: '' }
            // },
            moveKeep(keep) {
                keep.parentId = this.selected
                this.$store.dispatch('moveKeep', keep)
                this.selected = ''
            }
        }
    }
</script>

<style>
</style>