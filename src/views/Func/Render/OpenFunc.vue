<template>
    <div  >

        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
        <feather-icon icon="DatabaseIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="clone" />

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
                'deleteFunc','cloneFunc'



            ]),
            clone () {
                /* Below two lines are just for demo purpose */
                this.cloneFunc(this.params.value).then((value)=> {
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
                    text: 'Функция добавлена!!!',
                    position: 'top-center'
                })
            },
            showCloneDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сообщение',
                    text: 'Функцияю добавить не удалось!!!',
                    position: 'top-center'
                })
            },
            confirmDeleteRecord () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: `Вы действительно хотите удалить функцию? `,
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            deleteRecord () {
                /* Below two lines are just for demo purpose */
                this.deleteFunc(this.params.value).then((value)=> {
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
                    title: 'Функция',
                    text: 'Функция удалена!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Функция',
                    text: 'Функцию удалить не удалось!!!',
                    position: 'top-center'
                })
            }
        }
    }
</script>
