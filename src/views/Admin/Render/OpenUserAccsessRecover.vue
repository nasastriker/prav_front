<template>
    <div >
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
    </div>
</template>
<script>
    import r from '../../../route';
    import axios from '../../../axios';
    import { mapActions } from 'vuex'
    export default {
        methods: {
            ...mapActions([
                'deleteUserAccsessRecover','getDataUserAccsessRecover'
            ]),
            confirmDeleteRecord () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: `Вы действительно хотите удалить доступ к взыскателю? `,
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            deleteRecord () {
                axios.post(r('userAccsessRecover.update'), {
                    params: {
                        method: 'deleteUserAccsessRecover',
                        param: this.params.value
                    }
                }).then((value)=> {
                    if(value){
                        this.showDeleteSuccess()
                        this.getDataUserAccsessRecover({id_user:this.$route.params.id})
                    }
                    else{
                        this.showDeleteDanger()

                    }
                });
            },
            showDeleteSuccess () {
                this.$vs.notify({
                    color: 'success',
                    title: 'Успешно',
                    text: 'Доступ к взыскателю удален!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Ошибка',
                    text: 'Доступ к взыскателю удалить не удалось!!!',
                    position: 'top-center'
                })
            }
        }
    }
</script>
