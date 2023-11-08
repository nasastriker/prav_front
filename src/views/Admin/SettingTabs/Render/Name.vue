<template>
    <div >

        <a v-auth-href  :href="url" >{{params.value}}</a>

    </div>
</template>

<script>
    import Vue from 'vue'
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
                return '/example_file/?filename='+this.params.data.type


            }


        },
        methods: {
            ...mapActions([
            ]),

        }
    }
</script>

