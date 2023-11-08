<template>
    <div >

       <a :href="url">{{params.value}}</a>

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

        computed: {


            url(){

                return '/arch_isk/?token='+localStorage.getItem('accessToken')+'&filename='+this.params.value

            }


        },
        methods: {



        }
    }
</script>
