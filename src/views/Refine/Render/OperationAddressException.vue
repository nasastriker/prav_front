<template>
    <div>
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteRecord" />
    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        methods:{
            ...mapActions([
                'deleteAddressException',



            ]),
            confirmDeleteRecord () {
                    this.$vs.dialog({
                        type: 'confirm',
                        color: 'danger',
                        title: 'Удаление',
                        text: `Вы действительно хотите удалить? `,
                        accept: this.deleteRecord,
                        acceptText: 'Удалить',
                        cancelText: 'Отмена'
                    })


            },
            deleteRecord () {
                /* Below two lines are just for demo purpose */
                this.$vs.loading({color: '#ff8000'})
                this.deleteAddressException(this.params.value).then((value)=> {
                    this.$vs.loading.close()
                    if(value){
                        this.showDeleteSuccess()
                    }
                    else{
                        this.showDeleteDanger()

                    }
                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });

            },
            showDeleteSuccess () {
                this.$vs.notify({
                    color: 'success',
                    title: 'Сообщение',
                    text: 'Удален!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сообщение',
                    text: 'Удалить не удалось!!!',
                    position: 'top-center'
                })
            }
        }
    }
</script>

<style scoped>

</style>