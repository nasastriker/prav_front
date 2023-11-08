<template>
    <div >
        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
        <vs-button
                size="small"
                color="green"
                @click="start"
                style="margin-bottom: 5px"
        >Запустить</vs-button>
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
                'deleteFuncShedule','getfuncshedule','startFuncRunFromSheduler'



            ]),
            start(){
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'green',
                    title: 'Запуск функции',
                    text: 'Вы действительно хотите запустить функцию из расписания?',
                    accept: ()=>{
                     this.startFuncRunFromSheduler(this.params.value).then((response)=>{
                         console.log(response.result)
                         if (response.result){
                             this.$vs.notify({
                                 color: 'success',
                                 title: 'Запуск функции',
                                 text: 'Успешно!!!',
                                 position: 'top-center'
                             })
                         }
                         else{
                             this.$vs.notify({
                                 color: 'danger',
                                 title: 'Запуск функции',
                                 text: 'Функцию запустить НЕ получилось!!!',
                                 position: 'top-center'
                             })
                         }
                     }).catch(()=>{
                         this.$vs.notify({
                         color: 'error',
                         title: 'Запуск функции',
                         text: 'ОШИБКА!!!',
                         position: 'top-center'
                     })
                     })
                    },
                    acceptText: 'Запуск',
                    cancelText: 'Отмена'
                })
            },
            editRecord () {
                this.$router.push(`/adm/funcshedule/`+this.params.value).catch(() => {})

                /*
                 Below line will be for actual product
                 Currently it's commented due to demo purpose - Above url is for demo purpose

                 this.$router.push("/apps/user/user-edit/" + this.params.data.id).catch(() => {})
                 */
            },
            confirmDeleteRecord () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: 'Вы действительно хотите функцию из расписания?',
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            deleteRecord () {
                this.deleteFuncShedule(this.params.value).then((value)=> {

                  if(value){
                      this.showDeleteSuccess()
                      this.getfuncshedule()
                  }
                  else{
                      this.showDeleteDanger()
                      this.getfuncshedule()

                  }

                });


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
