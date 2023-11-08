<template>
    <json-viewer
        :value="history_d"
        :expand-depth=5
        copyable

        sort></json-viewer>
</template>


<script>
import JsonViewer from 'vue-json-viewer'

export default {
    props: ['hist_data'],
    components: {
        JsonViewer
    },
    data() {
        return {}
    },
    computed: {
        history_d(){
            return this.hist_data;
        }
    },
    methods: {},
    mounted() {}
}


</script>

<style lang="scss">

</style>
