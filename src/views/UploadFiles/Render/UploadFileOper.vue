<template>
    <div>
        <feather-icon v-if="params.data.status == 2" icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'UploadFileOper',
    mounted() {

    },
    computed: {
        ...mapGetters([
        ]),
    },
    methods: {
        confirmDeleteRecord() {
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Удаление',
                text: `Вы действительно хотите удалить ? `,
                accept: this.deleteRecord,
                acceptText: 'Удалить',
                cancelText: 'Отмена'
            })
        },
        deleteRecord() {
            this.deleteUploadFile(this.params.data.id).then((value)=> {
                if(value){
                    this.showDeleteSuccess()
                    this.params.refresh_func();
                }
                else{
                    this.showDeleteDanger()
                }
            });
        },
        showDeleteSuccess() {
            this.$vs.notify({
                color: 'success',
                title: 'Сообщение',
                text: 'Удален!!!',
                position: 'top-center'
            })
        },
        showDeleteDanger() {
            this.$vs.notify({
                color: 'danger',
                title: 'Сообщение',
                text: 'Ошибка при удалении!!!',
                position: 'top-center'
            })
        },
        ...mapActions([
            'deleteUploadFile'
        ])
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
