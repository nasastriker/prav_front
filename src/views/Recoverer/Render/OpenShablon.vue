<template>
    <div >

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
                'deleteShablonDocument','cloneShablonDocument'



            ]),
            clone(){
                this.cloneShablonDocument(this.params.value).then((value)=> {

                });
            },
            editRecord () {
                this.$router.push(`/handbook/shablon/`+this.params.value).catch(() => {})

                /*
                 Below line will be sssfor actual product
                 Currently it's commented due to demo purpose - Above url is for demo purpose

                 this.$router.push("/apps/user/user-edit/" + this.params.data.id).catch(() => {})
                 */
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
                this.deleteShablonDocument(this.params.value).then((value)=> {
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
                    text: 'Шаблон удален!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сообщение',
                    text: 'Шаблон удалить не удалось!!!',
                    position: 'top-center'
                })
            }
        }
    }
</script>
