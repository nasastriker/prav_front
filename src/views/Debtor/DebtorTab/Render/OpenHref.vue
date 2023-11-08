<template>
    <div >


        <a v-auth-href :href="url" style="color: red;"> {{params.value}}</a>

    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    import VueAuthHref from 'vue-auth-href'
    import moment from 'moment';
    Vue.prototype.$moment = moment;
    const options = {
        token: () => `${localStorage.getItem('accessToken')}`
    }

    Vue.use(VueAuthHref, options)
    export default {
        data () {
            return {
                token:{
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                showDos:false,
            }
        },

        computed: {


            url(){
                    return window.origin+'/document/credit/?filename='+this.params.value+'&id_credit='+this.params.data.id_credit
                        +'&id_doc='+this.params.data.id;




            }


        },
        methods: {

            ...mapActions([
                ''
            ]),

        }
    }
</script>
