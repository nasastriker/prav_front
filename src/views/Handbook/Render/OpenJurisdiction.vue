<template>
    <div>

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
        computed:{
            ...mapGetters([
                'User'

            ]),
        },

        methods: {
            ...mapActions([
                'deleteJurisdiction','getDataJurisdictions'



            ]),
            editRecord () {
                this.$router.push(`/handbook/jurisdiction/`+this.params.value).catch(() => {})

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
                this.deleteJurisdiction(this.params.value).then((value)=> {
                  if(value){
                      this.getDataJurisdictions(this.User.pag.jurisdictions);
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
                    title: 'Сообщение',
                    text: 'Адрес удален!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger () {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сообщение',
                    text: 'Адрес удалить не удалось!!!',
                    position: 'top-center'
                })
            }
        }
    }
</script>
