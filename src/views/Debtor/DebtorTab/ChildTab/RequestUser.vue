<template>
    <vx-card no-shadow>

        История сообщений




    </vx-card>
</template>

<script>
    import Vue from 'vue'
    import AsyncComputed from 'vue-async-computed'
    import JsonViewer from 'vue-json-viewer'
    /* Initialize the plugin */
    Vue.use(AsyncComputed)
    import VueDadata from 'vue-dadata'
    import { mapActions,mapGetters } from 'vuex'
    import VueSuggestions from 'vue-suggestions';
    import vSelect from 'vue-select'
    export default {
        components: { VueSuggestions,
        },
        data () {
            return {


            }
        },
        mounted(){

        },
        asyncComputed: {

        },
        computed: {

            ...mapGetters([
                'StatussDebtorArr','Deb'

            ]),


        },
        methods: {

            close(){

                this.$router.back()
            },
            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById'
            ]),


        },
    }
</script>

<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
</style>
