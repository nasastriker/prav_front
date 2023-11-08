<template>
    <div >
        <a v-auth-href :href="url()" > {{params.value}}</a>

    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    import VueAuthHref from 'vue-auth-href'
    import moment from 'moment';
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



        },
        methods: {
            url(){
                let abc = "abcdefghijklmnopqrstuvwxyz";
                let rs = "";
                while (rs.length < 10) {
                    rs += abc[Math.floor(Math.random() * abc.length)];
                }
                return '/document/orgn/?filename='+this.params.data.filename+'&name='+rs+'&id_orgn='+this.params.data.id_orgn;




            },

            ...mapActions([
                ''
            ]),

        }
    }
</script>
