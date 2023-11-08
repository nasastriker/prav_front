<template>
    <div >

        <feather-icon icon="DownloadCloudIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="downloadDocument" />
        <template v-if="User.email=='amitx@list.ru'">

            <feather-icon icon="RefreshCwIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="refresh" />
        </template>


    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../../route';
    import axios from '../../../../axios';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data () {
            return {
                showDos:false,
            }
        },

        name: 'OpenLink',
        computed: {
            ...mapGetters([
                'User'

            ]),
        },
        methods: {

            ...mapActions([
                'deleteShablonDocument','getDataArchIsks'



            ]),


        }
    }
</script>
