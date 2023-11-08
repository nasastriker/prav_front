<template>
    <div >
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="questDeleteRecord" />
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
          questDeleteRecord(){
            this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: 'Внимание',
              text: 'Вы действительно хотите удалить период?',
              accept: this.confirmDeleteRecord,
              cancel:this.closeDialog,
              acceptText: 'Да',
              cancelText: 'Нет',
              parameters: ['hello']
            })
          },
          closeDialog(){

          },

            confirmDeleteRecord(){
                this.deleteChangeIdHistory({id_credit: this.Deb.debtorCredit.id, id_history: this.params.value}).then((response) => {
                  this.getChangeIdHistoryList(this.Deb.debtorCredit.id);
                    if (response){
                        this.getDataDebtorsById(this.Deb.debtorCredit.id);
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
                'deleteChangeIdHistory','getChangeIdHistoryList','getDataDebtorsById'
            ]),
        }
    }
</script>
