<template v-if="is_pp">
    <json-viewer
        :value="pp_data"
        :expand-depth=5
        copyable

        sort></json-viewer>
</template>


<script>
import Vue from 'vue'
import JsonViewer from 'vue-json-viewer'
'
import AsyncComputed from 'vue-async-computed'

Vue.use(AsyncComputed)
import {mapActions, mapGetters} from 'vuex'
import r from '../../route';
import axios from '../../axios'

export default {
    props: ['id_debcredit', 'type_pp'],
    components: {
        JsonViewer
    },
    data() {
        return {
            pp_data: {},
            is_pp: false
        }
    },
    computed: {},
    methods: {
        getData() {
            if (this.id_debcredit != null) {
                axios.get(r("debtorCredit.index"), {
                    params: {
                        method: 'getInfoPP',
                        param: [ this.id_debcredit, this.type_pp ]
                    }
                }).then((response) => {
                    if (response.data.result) {
                        this.is_pp = response.data.result;
                        this.pp_data = response.data.data;
                    }
                })
            }
        }
    },
    mounted() {
        this.getData()
    }
}


</script>

<style lang="scss">

</style>
