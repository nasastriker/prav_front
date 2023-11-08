<template >

    <div >

        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="edit" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />


    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../../route'
    import axios from '../../../axios'
    export default {
        name: 'Open',
        computed: {
            ...mapGetters([
                'User',
            ]),
        },
        methods: {
            ...mapActions([
                'deleteControlStatus','getControlStatuss',



            ]),
            edit(){
                this.$router.push(`/controlStatus/`+this.params.value).catch(() => {})

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

                this.deleteControlStatus(this.params.value).then((value)=> {
                    this.getControlStatuss(this.User.pag.controlStatus);

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
