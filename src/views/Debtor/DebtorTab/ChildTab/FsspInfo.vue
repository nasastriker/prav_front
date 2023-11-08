<template>
    <div>

        <vs-popup class="holamundo" title="Данные fssp:" :active.sync="showHis">
            <json-viewer
                    :value="dat"
                    :expand-depth=5
                    copyable

                    sort></json-viewer>

        </vs-popup>

    </div >

</template>

<script>
    import Vue from 'vue'
    '
    import vSelect from 'vue-select'
    import { mapActions,mapGetters } from 'vuex'
    import JsonViewer from 'vue-json-viewer'
    export default {
        props:['showHis','dat'],

        components: {
            'v-select': vSelect,
            JsonViewer
        },
        data () {
            return {
                status:{},
                statusLast:0,

            }
        },

        computed: {


        },
        methods: {

        },
        mounted () {


        }
    }


</script>

<style lang="scss">

</style>
