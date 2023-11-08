<template>
    <json-viewer
        :value="BanksHistoryArr"
        :expand-depth=5
        copyable
        sort></json-viewer>
</template>


<script>
import JsonViewer from 'vue-json-viewer'
import { mapGetters} from 'vuex'

export default {
    props: {
        id_debcredit: null
    },
    components: {
        JsonViewer
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'BanksHistoryArr'
        ]),
    },
    methods: {

    },
    mounted() {

    }
}


</script>

<style lang="scss">

</style>
