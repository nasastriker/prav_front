<template>
    <div >
        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        methods: {
            ...mapActions([
                'getSelPortsAll','DeleteSelPortsOnes'



            ]),
            editRecord () {
                this.params.editRecord(this.params.value)
            },
            confirmDeleteRecord () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: 'Вы действительно хотите удалить запись?',
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            deleteRecord () {
                this.DeleteSelPortsOnes(this.params.value).then((value)=> {

                  if(value){
                      this.showDeleteSuccess()
                  }
                  else{
                      this.showDeleteDanger()

                  }

                });

                this.getSelPortsAll()
            },
            showDeleteSuccess () {
                this.$vs.notify({
                    color: 'success',
                    title: 'Расписание функций',
                    text: 'Запись из расписания удалена!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Расписание функций',
                    text: 'Функцию из расписания удалить не удалось!!!',
                    position: 'top-center'
                })
            }
        }
    }
</script>
