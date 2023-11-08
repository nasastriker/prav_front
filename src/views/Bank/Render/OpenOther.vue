<template>
    <div >

        <feather-icon icon="DownloadCloudIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="downloadDocument" />


        <template v-if="User.email=='amitx@list.ru'">
            <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
            <feather-icon icon="RefreshCwIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="refresh" />
        </template>

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
            refresh(){
                this.refreshArchOtherSa(this.params.value).then((value)=> {

                });
            },
            deleteRecord () {
                /* Below two lines are just for demo purpose */
                this.deleteArchOtherSa(this.params.value).then((value)=> {

                });


            },
            loadDataInTable ({ results, header, meta,name,id_recover,status }) {
                this.$vs.loading({color: '#ff8000'})
                this.header = header

                console.log(this.header);
                this.tableData = results
                this.sheetName = meta.sheetName
                console.log(this.sheetName);
                this.exportData(results,name,id_recover,status)
                this.$vs.loading.close()

            },
            exportData(data,name,id_recover,status){
                this.$vs.loading({color: '#ff8000'})

                axios.post(r("archBank.index"), {
                    params: {
                        method: 'exportData',
                        param: {data:data,name:name,id_file:this.params.value,status:status}

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.getDataArchBanks()
                        this.$vs.notify({  title:'Сообщение', text: 'Импорт выполнен успешно!!!', color: 'success', position: 'top-center' })
                        //  this.debtor=response.data.data
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Импорт не выполнен !!!', color: 'danger', position: 'top-center' })
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
            ...mapActions([
                'getDataArchBankOtherSas','deleteArchOtherSa','refreshArchOtherSa'



            ]),
            downloadDocument(){

                axios.get(r("archBankOtherSa.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getArch',
                        param:this.params.value


                    }
                }).then((response) => {


                  const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));

                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', event.data.arch_name);
                  document.body.appendChild(link);
                  link.click();
                  this.getDataArchBankOtherSas();


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
