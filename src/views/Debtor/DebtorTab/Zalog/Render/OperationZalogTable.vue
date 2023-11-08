<template>
    <div >
        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../../../route';
    import axios from '../../../../../axios'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        methods: {
            ...mapActions([
                'getDataDebtorCreditComments',
            ]),
            editRecord () {
                this.params.editValue(this.params.data.id)
            },
            confirmDeleteRecord () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: `Вы действительно хотите удалить комментарий? `,
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            deleteRecord () {
                this.params.deleteValue(this.params.data.id)
            },

        }
    }
</script>
