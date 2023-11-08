<template>
    <div >

        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteRecord" />
    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import axios from '../../../axios'
    import { mapActions,mapGetters } from 'vuex'
    import { Trash2Icon,Edit3Icon,ArchiveIcon } from 'vue-feather-icons'
    export default {
        components: {
            Trash2Icon,
            Edit3Icon,
        },
        computed:{
            ...mapGetters([
                'User'
            ])
        },

        methods: {
            ...mapActions([



            ]),
            editRecord () {
                this.params.edit_var(this.params.data.id)
            },
            deleteRecord () {
              this.params.delete_var(this.params.data.id)
            },
        }
    }
</script>
