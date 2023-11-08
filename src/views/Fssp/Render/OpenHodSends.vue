<template>
    <div >
      <feather-icon icon="XIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmCancelSend" />
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
      name: 'OpenHodSends',
        data () {
            return {
            }
        },

        computed: {
          ...mapGetters([
          ]),
        },
        methods: {
          confirmCancelSend(){
            this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: 'Внимание',
              text: 'Вы действительно хотите отменить отправку?',
              accept: this.cancelSend,
              cancel:this.closeDialog,
              acceptText: 'Да',
              cancelText: 'Нет',
              parameters: ['hello']
            })
          },
          cancelSend(){
                this.cancelHodSend(this.params.value).then((response) => {
                  this.params.to_refresh_after_cancel();
                    if (response){
                        this.$vs.notify({  title:'Сообщение', text: 'Отправка отменена!!!', color: 'success', position: 'top-center' })
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Отменить не удалось!!!', color: 'danger', position: 'top-center' })
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
          closeDialog(){

          },
            ...mapActions([
                'cancelHodSend'
            ]),
        }
    }
</script>
