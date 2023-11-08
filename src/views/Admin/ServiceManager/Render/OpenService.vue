<template>
    <div >
        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
        <feather-icon v-if="params.data.active == 2" icon="PlayIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="startServiceFunc" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../../route';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: 'OpenService',
        methods: {
            ...mapActions([
              'deleteService','startService'
            ]),

          startServiceFunc(){
            this.startService(this.params.data.id)
          },
            editRecord () {
              console.log(this.params.data.id)
                this.$router.push(`/adm/services/`+this.params.data.id).catch(() => {})

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
                    text: `Вы действительно хотите удалить сервис? `,
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            deleteRecord () {
                /* Below two lines are just for demo purpose */
                this.deleteService(this.params.data.id).then((value)=> {
                  if(value){
                      this.showDeleteSuccess()
                  }
                  else{
                      this.showDeleteDanger()

                  }
                });


                /* UnComment below lines for enabling true flow if deleting user */
                // this.$store.dispatch("userManagement/removeRecord", this.params.data.id)
                //   .then(()   => { this.showDeleteSuccess() })
                //   .catch(err => { console.error(err)       })
            },
            showDeleteSuccess () {
                this.$vs.notify({
                    color: 'success',
                    title: 'Сервис',
                    text: 'Сервис удален!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сервис',
                    text: 'Сервис удалить не удалось!!!',
                    position: 'top-center'
                })
            }
        }
    }
</script>
