<template>
    <div >
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data () {
            return {
            }
        },

        computed: {
          ...mapGetters([
              'Deb'
          ]),
        },
        methods: {
            confirmDeleteRecord(){
                this.deleteInheritor(this.params.value).then((response) => {
                  this.getInheritorList(this.Deb.debtor.id);
                    if (response){
                        this.$vs.notify({  title:'Сообщение', text: 'Удаление выполнено успешно!!!', color: 'success', position: 'top-center' })
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Удаление не выполнено !!!', color: 'danger', position: 'top-center' })
                    }
                }).catch(error => {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                });
            },
            ...mapActions([
                'deleteInheritor','getInheritorList'
            ]),
        }
    }
</script>
