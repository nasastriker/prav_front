<template>
    <div >
        <span title="Скачать архив">
           <feather-icon icon="DownloadCloudIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="downloadDocument" />
        </span>
        <span title="Удалить архив">
           <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
        </span>
    </div>
</template>

<script>
    import r from '../../../route';
    import axios from '../../../axios';
    import { mapActions} from 'vuex'
    export default {
        methods: {
            ...mapActions([
                    'getDataArchPfrs','deleteArchPfr'
            ]),
            confirmDeleteRecord () {
                this.params.deleteArch(this.params.value);
            },
            downloadDocument(){
                axios.get(r("archPfr.index"), {
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
                    this.getDataArchPfrs();

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
