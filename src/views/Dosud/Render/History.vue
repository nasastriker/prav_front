<template>
    <vx-card no-shadow>

        История
        <json-viewer :value="data"></json-viewer>



    </vx-card>
</template>

<script>
    import Vue from 'vue'
    import AsyncComputed from 'vue-async-computed'
    import JsonViewer from 'vue-json-viewer'
    import VueDadata from 'vue-dadata'
    import { mapActions,mapGetters } from 'vuex'
    import VueSuggestions from 'vue-suggestions';
    import vSelect from 'vue-select'
    import r from '../../../route';
    import axios from '../../../axios'
    Vue.use(AsyncComputed)
    export default {
        components: { VueSuggestions,JsonViewer
        },
        props:['id'],
        data () {
            return {
                data:{},

            }
        },
        mounted(){
            this.getData(this.id);
        },
        asyncComputed: {

        },
        computed: {

            ...mapGetters([

            ]),


        },
        methods: {
            getData(){
                axios.get(r("historyReestr.index"), {
                    params: {
                        method: 'getHistoryReestr',
                        param: this.id

                    }
                }).then((response) => {
                    if (response.data.result){
                            this.data=response.data.data
                    }




                })
            },
            close(){

                this.$router.back()
            },
            ...mapActions([
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
