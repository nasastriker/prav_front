<template>
    <div >

        <feather-icon icon="Edit3Icon" title="Редактировать" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <feather-icon icon="Trash2Icon" title="Удалить" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: 'OpenLink',
        computed: {


            ...mapGetters([
                'User'

            ]),


        },
        methods: {
            ...mapActions([
                'deleteShablonDocumentRecover','getDataShablonDocumentRecovers'
            ]),
            editRecord () {
                this.$router.push(`/shablon/`+this.params.value).catch(() => {})
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
                this.deleteShablonDocumentRecover(this.params.value).then((value)=> {
                  if(value){
                      if(typeof this.User.pag.recShabAll!='undefined'){
                          if(this.User.pag.recShabAll!=''&&this.User.pag.recShabAll!=null){
                              this.id_recover=this.User.pag.recShabAll;
                              this.getDataShablonDocumentRecovers(this.User.pag.recShabAll)
                          }else{
                              this.getDataShablonDocumentRecovers();
                          }

                      }else{
                          this.getDataShablonDocumentRecovers();
                      }
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
