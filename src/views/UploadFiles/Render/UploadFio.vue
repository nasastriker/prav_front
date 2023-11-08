<template>
    <span
    >
       <span @click="$copyText(params.value)">{{params.value}}</span>
    </span>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)
export default {
    mounted() {

    },
    computed: {
        ...mapGetters([
        ]),
    },
    methods: {

    }
}
</script>

<style lang="scss" scpoped>
.ag-grid-cell-chip {
    &.vs-chip-success {
        background: rgba(var(--vs-success), .15);
        color: rgba(var(--vs-success), 1) !important;
        font-weight: 500;
    }

    &.vs-chip-warning {
        background: rgba(var(--vs-warning), .15);
        color: rgba(var(--vs-warning), 1) !important;
        font-weight: 500;
    }

    &.vs-chip-danger {
        background: rgba(var(--vs-danger), .15);
        color: rgba(var(--vs-danger), 1) !important;
        font-weight: 500;
    }
}
</style>
