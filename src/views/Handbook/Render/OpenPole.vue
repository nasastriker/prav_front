<template>
    <div >

        <feather-icon icon="Edit3Icon" title="Редактировать" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <feather-icon icon="Trash2Icon" title="Удалить" svgClasses="h-5 w-5 mr-4 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
        <feather-icon icon="DatabaseIcon" title="Клонировать" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="clone" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: 'OpenLink',
        methods: {
            ...mapActions([
                'deletePole','clonePole'



            ]),
            editRecord () {
                this.$router.push(`/handbook/pole/`+this.params.value).catch(() => {})

            },
            clone () {
                /* Below two lines are just for demo purpose */
                this.clonePole(this.params.value).then((value)=> {
                    if(value){
                        this.showCloneSuccess()
                    }
                    else{
                        this.showCloneDanger()

                    }
                });



            },
            showCloneSuccess () {
                this.$vs.notify({
                    color: 'success',
                    title: 'Сообщение',
                    text: 'Поле добавлено!!!',
                    position: 'top-center'
                })
            },
            showCloneDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сообщение',
                    text: 'Поле добавить не удалось!!!',
                    position: 'top-center'
                })
            },
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
                this.deletePole(this.params.value).then((value)=> {
                  if(value){
                      this.showDeleteSuccess()
                  }
                  else{
                      this.showDeleteDanger()

                  }
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
