<template>
    <div >

        <a v-auth-href  :href="url" @click="getDataFnss">{{params.value}}</a>

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import axios from '../../../axios';
    import { mapActions,mapGetters } from 'vuex'
    import VueAuthHref from 'vue-auth-href'
    const options = {
        token: () => `${localStorage.getItem('accessToken')}`
    }

    Vue.use(VueAuthHref, options)
    export default {
        data () {
            return {
                showDos:false,
            }
        },

        computed: {


            url(){
                return '/fns_file/?filename='+this.params.value


            }


        },
        methods: {
            ...mapActions([
                'getDataFnss'
            ]),

        }
    }
</script>

