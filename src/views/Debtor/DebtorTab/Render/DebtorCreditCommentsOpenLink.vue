<template>
    <div >
        <!--<feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />-->
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../../route';
    import axios from '../../../../axios'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        methods: {
            ...mapActions([
                'getDataDebtorCreditComments',
            ]),
            // editRecord () {
            //   this.$emit.editComment(this.params.id)
            // },
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
                axios.post(r('debtorCreditComments.update'), {
                    params: {
                        method: 'delete',
                        param: this.params.value
                    }
                }).then((value)=> {
                    if(value.data.result){
                        this.showDeleteSuccess()
                        this.getDataDebtorCreditComments({id_credit:this.params.data.id_credit})
                    }
                    else{
                        this.showDeleteDanger()
                    }
                }).catch(e=>{
                    this.showDeleteDanger()
                });
            },
            showDeleteSuccess () {
                this.$vs.notify({
                    color: 'success',
                    title: 'Успешно',
                    text: 'Комментарий удален!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Ошибка',
                    text: 'Комментарий удалить не удалось!!!',
                    position: 'top-center'
                })
            }
        }
    }
</script>
