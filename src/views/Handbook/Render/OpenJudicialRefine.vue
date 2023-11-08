<template>
    <div>
        <vs-button
                size="small"
                color="green"
                @click="onClick"
                style="margin-bottom: 5px"
        >Привязать</vs-button>
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
            editRecord() {
               this.params.editAddress(this.params.data.id)
            },
            onClick(){
                this.params.linkJud(this.params.data)
            },

        }
    }
</script>
