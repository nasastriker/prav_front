<template>
    <div >
      <span title="Отправить в типографию">
        <feather-icon icon="SendIcon" svgClasses="h-5 w-5 mr-2 hover:text-primary cursor-pointer" @click="send" />
      </span>
      <span title="Удалить">
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-2 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
      </span>
      <span title="Удалить только файл, статусы заемщиков не изменяться">
        <feather-icon icon="ScissorsIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecordNew" />
      </span>



    </div>
</template>

<script>
    import r from '../../../../route';
    import axios from '../../../../axios';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        data () {
            return {
                showDos:false,
            }
        },
        computed: {
            ...mapGetters([
                'User'
            ]),
        },
        methods: {
          deleteOnly(){
            this.$vs.loading({color: '#ff8000'})
            axios.post(r("archSud.update"), {
              params: {
                method: 'deleteOnly',
                param: this.params.value
              }
            }).then((response) => {
              this.$vs.loading.close()
              if (response.data.result){
                this.getDataArchSuds(this.User.pag.sud);
                this.$vs.notify({  title:'Сообщение', text: 'Удалено!!!', color: 'success', position: 'top-center' })
              }else {
                this.$vs.notify({  title:'Сообщение', text: 'Удалить не удалось !!!', color: 'danger', position: 'top-center' })
              }
            }).catch(error => {
              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Ошибка',
                text: error.message,
                color: 'danger',
                position: 'top-center'
              })

            });
          },
          confirmDeleteRecordNew(){
            this.$vs.dialog({
              type: 'confirm',
              color: 'primary',
              title: 'Удаление',
              text: `Вы действительно хотите удалить Будет удален только файл? `,
              accept: this.deleteOnly,
              acceptText: 'Да',
              cancelText: 'Нет'
            })
          },
            confirmDeleteRecord(){
                this.$vs.loading({color: '#ff8000'})
                axios.delete(r("archSud.index")+'/'+this.params.value).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.getDataArchSuds(this.User.pag.sud);
                        this.$vs.notify({  title:'Сообщение', text: 'Удаление выполнено успешно!!!', color: 'success', position: 'top-center' })
                        //  this.debtor=response.data.data
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Удаление не выполнено !!!', color: 'danger', position: 'top-center' })
                    }




                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },
            sendTip(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("archSud.update"), {
                    params: {
                        method: 'sendTip',
                        param: this.params.value
                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.getDataArchSuds(this.User.pag.sud);
                        this.$vs.notify({  title:'Сообщение', text: 'Отправленно!!!', color: 'success', position: 'top-center' })
                        //  this.debtor=response.data.data
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Выполнить не удалось !!!', color: 'danger', position: 'top-center' })
                    }




                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });


            },
            send(){
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'primary',
                    title: 'Отправка',
                    text: `Вы действительно хотите отправить в типографию? `,
                    accept: this.sendTip,
                    acceptText: 'Да',
                    cancelText: 'Нет'
                })

            },
            ...mapActions([
                'deleteShablonDocument','getDataArchSuds'



            ]),
            refresh(){
                if(this.params.data.isk){
                    this.refreshIsk()
                }
                else{
                    this.refreshSud()
                }


            },
            refreshIsk(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("archIsk.index"), {
                    params: {
                        method: 'refreshIsk',
                        param: this.params.value

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){

                        this.$vs.notify({  title:'Сообщение', text: 'Обновление выполнено успешно!!!', color: 'success', position: 'top-center' })
                        //  this.debtor=response.data.data
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Обновление не выполнено !!!', color: 'danger', position: 'top-center' })
                    }




                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },
            refreshSud(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("archSud.index"), {
                    params: {
                        method: 'refreshSud',
                        param: this.params.value

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){

                        this.$vs.notify({  title:'Сообщение', text: 'Обновление выполнено успешно!!!', color: 'success', position: 'top-center' })
                        //  this.debtor=response.data.data
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Обновление не выполнено !!!', color: 'danger', position: 'top-center' })
                    }




                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },
            downloadDocument(){
                axios.get(r("archSud.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getArch',
                        param:this.params.value
                    }
                }).then((response) => {


                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));

                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', this.params.data.arch_name+'.zip');
                    document.body.appendChild(link);
                    link.click();
                    this.getDataArchSuds(this.User.pag.sud);


                }).catch(error => {
                    this.$vs.loading.close()
                    //   this.popupActive3=false;
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },


        }
    }
</script>
