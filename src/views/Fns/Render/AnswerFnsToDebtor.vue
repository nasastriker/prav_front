<template>
    <vs-chip class="ag-grid-cell-chip">
        <b><span @click="ansToDeb()" style="color: orangered;cursor: pointer;">Привязать</span></b>
    </vs-chip>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'AnswerToDebtor',
    data() {
        return {
        }
    },
    mounted() {

    },
    computed: {
        ...mapGetters([
        ]),
    },
    methods: {
        ansToDeb() {
            this.params.my_action(this.params.data.id);
        },
        ...mapActions([
        ]),
    },
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
