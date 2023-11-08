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
    export default {
        name: 'OpenLink',
        computed: {



            ...mapGetters([
                'User'

            ]),


        },
        methods: {
            ...mapActions([
                    'getDataArchFsspReturnSas','deleteArchFsspReturnSa','refreshArchFsspReturnSa'


            ]),
            refresh(){
                this.refreshArchFsspReturnSa(this.params.value).then((value)=> {
                    this.getDataArchFsspReturnSas();
                });
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
                this.deleteArchFsspReturnSa(this.params.value).then((value)=> {
                    this.getDataArchFsspReturnSas();
                });


            },
            downloadDocument(){

                axios.get(r("archFssp.index"), {
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
                    this.getDataArchFsspReturnSas();


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
