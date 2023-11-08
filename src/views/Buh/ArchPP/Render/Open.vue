<template>
    <div >

        <feather-icon icon="DownloadCloudIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" title="Скачать докуммент" @click="downloadDocument" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" title="Удалить" @click="confirmDeleteRecord" />
        <template v-if="User.email=='amitx@list.ru'">

            <feather-icon icon="RefreshCwIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="refresh" />

        </template>

    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../../route';
    import axios from '../../../../axios';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: 'OpenLink',
        data () {
            return {
                dateSend:null,
                showGen:false,

            }
        },

        computed: {
            ...mapGetters([
                'User'

            ]),
        },
        methods: {
            ...mapActions([
                'deleteShablonDocument','getDataArchPps'
            ]),

            refresh(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("archPp.update"), {
                    params: {
                        method: 'refreshPp',
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
            confirmDeleteRecord(){
                this.$vs.loading({color: '#ff8000'})
                axios.delete(r("archPp.index")+'/'+this.params.value).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){

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
            downloadDocument(){
                axios.get(r("archPpDownload.index")+'/'+this.params.value, {
                    responseType: 'arraybuffer',
                }).then((response) => {
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', this.params.data.arch_name);
                    document.body.appendChild(link);
                    link.click();
                    this.params.data.status=1
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
