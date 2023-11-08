<template>
  <div >
    <span title="Скачать документ">
      <feather-icon icon="DownloadCloudIcon" svgClasses="h-5 w-5 mr-2 hover:text-primary cursor-pointer" @click="downloadDocument" />
    </span>
    <span title="Удалить">
      <feather-icon icon="ScissorsIcon" svgClasses="h-5 w-5 mr-2 hover:text-danger cursor-pointer" @click="confirmDeleteRecordNew" />
    </span>
    <span title="Просмотреть содержимое реестра ">
     <feather-icon icon="ChromeIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="$router.push('/bank/sber_alfa_sa/'+params.value)"/>
    </span>
  </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import axios from '../../../axios';
    import { mapActions,mapGetters } from 'vuex'
    import ImportExcel from './ImportExcel.vue'
    export default {
        components: {

            ImportExcel,

        },
        computed: {



            ...mapGetters([
                'User'

            ]),


        },
        name: 'OpenLink',
        methods: {
            refresh(){
                this.refreshArchSa(this.params.value).then((value)=> {

                });
            },

            ...mapActions([
                'getDataArchBankSas','deleteArchBankSa','refreshArchSa'



            ]),
            confirmDeleteRecordNew(){
              this.params.delete_func(this.params);
            },
            confirmDeleteRecord () {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: `Вы действительно хотите удалить ? `,
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            deleteRecord () {
                /* Below two lines are just for demo purpose */
                this.deleteArchBankSa(this.params.value).then((value)=> {

                });


            },
            downloadDocument(){

                axios.get(r("archBankSa.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getArch',
                        param:this.params.value


                    }
                }).then((response) => {


                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', this.params.data.arch_name);
                    document.body.appendChild(link);
                    link.click();
                    this.getDataArchBankSas();


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
