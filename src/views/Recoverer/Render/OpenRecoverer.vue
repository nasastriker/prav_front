<template>
    <div >
        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <feather-icon icon="DatabaseIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="clone" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />


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
                'deleteRecoverer','cloneRecoverer'



            ]),
            editRecord () {
                this.$router.push(`/recoverer/`+this.params.value).catch(() => {})

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
                    text: `Вы действительно хотите удалить взыскателя? `,
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            clone () {
                /* Below two lines are just for demo purpose */
                this.cloneRecoverer(this.params.value).then((value)=> {
                    if(value){
                        this.showCloneSuccess()
                    }
                    else{
                        this.showCloneDanger()

                    }
                });



            },
            deleteRecord () {
                /* Below two lines are just for demo purpose */
                this.deleteRecoverer(this.params.value).then((value)=> {
                  if(value){
                      this.showDeleteSuccess()
                  }
                  else{
                      this.showDeleteDanger()

                  }
                });


            },
            showCloneSuccess () {
                this.$vs.notify({
                    color: 'success',
                    title: 'Сообщение',
                    text: 'Взыскатель добавлен!!!',
                    position: 'top-center'
                })
            },
            showCloneDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сообщение',
                    text: 'Взыскатель добавить не удалось!!!',
                    position: 'top-center'
                })
            },
            showDeleteSuccess () {
                this.$vs.notify({
                    color: 'success',
                    title: 'Сообщение',
                    text: 'Взыскатель удален!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сообщение',
                    text: 'Взыскатель удалить не удалось!!!',
                    position: 'top-center'
                })
            }
        }
    }
</script>
