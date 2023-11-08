<template>
    <div >

        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteRecord" />
        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: 'OpenLink',
        methods: {
            ...mapActions([




            ]),
            editRecord () {
                this.params.my_action_edit(this.params.data);

            },
            deleteRecord () {
                this.params.my_action_delete(this.params.data);

            },

        }
    }
</script>
