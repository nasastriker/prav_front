<template>
    <div >

        <a v-auth-href :href="url()" > {{params.value}}</a>


    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions } from 'vuex'
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



        },
        methods: {
            url(){
                let abc = "abcdefghijklmnopqrstuvwxyz";
                let rs = "";
                while (rs.length < 10) {
                    rs += abc[Math.floor(Math.random() * abc.length)];
                }
                return '/document/recover/?filename='+this.params.data.filename+'&name='+rs+'&id_recover='+this.params.data.id_recover;




            },
            downloadDocument(){
                let href='/document/recover/?token='+localStorage.getItem('accessToken')+'&filename='+this.params.data.filename;
                window.open(href, '_blank');

            },
            ...mapActions([
                ''
            ]),

        }
    }
</script>
