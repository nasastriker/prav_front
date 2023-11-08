<template>
    <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.value)">
        <span>
                {{ statusName }}
        </span>
    </vs-chip>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'UploadFileStatus',
    mounted() {

    },
    computed: {
        ...mapGetters([
            'UploadFilesStatusesArr'

        ]),
        statusName() {
            for (let i = 0; i < this.UploadFilesStatusesArr.length; i++) {
                if (this.UploadFilesStatusesArr[i].id == this.params.value) {
                    return this.UploadFilesStatusesArr[i].val
                }
            }
        },
        chipColor() {
            return (value) => {
                if (value == 1) return 'success'
                if (value == 2) return 'warning'
                if (value == 6) return 'danger'
            }
        }
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
