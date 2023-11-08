<template v-if="is_info">
    <json-viewer
        :value="answer_data"
        :expand-depth=5
        copyable

        sort></json-viewer>
</template>


<script>
import JsonViewer from 'vue-json-viewer'
import r from '../../route';
import axios from '../../axios'

export default {
    props: ['id_debcredit'],
    components: {
        JsonViewer
    },
    data() {
        return {
            answer_data: {},
            is_info: false
        }
    },
    computed: {},
    methods: {
        getData() {
            if (this.id_debcredit != null) {
                axios.get(r("fssp.index"), {
                    params: {
                        method: 'getInfoFsspAnswer',
                        param: this.id_debcredit
                    }
                }).then((response) => {
                    if (response.data.result) {
                        this.is_info = response.data.result;
                        this.answer_data = response.data.data;
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
