<template>
    <div >

        <feather-icon icon="DownloadIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="download" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />


    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../../route';
    import axios from '../../../axios'
    export default {
        name:'DownLoadRecoverOther',
        methods: {
            ...mapActions([
                'deleteRecoverOtherDocument','getRecoverOtherDocuments'
            ]),
            download(){
                axios.get(r("recoverersOther.index"), {
                    responseType: 'arraybuffer',
                    params: {
                        method: 'getFile',
                        param:this.params.data.id,
                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', this.params.data.filename);
                    document.body.appendChild(link);
                    link.click();
                }).catch(error => {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка!!!',
                        color: 'danger',
                        position: 'top-center'
                    })
                });
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
                /* Below two lines are just for demo purpose */
                this.deleteRecoverOtherDocument(this.params.value).then((value)=> {

                    this.getRecoverOtherDocuments(this.params.data.id_recover)
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
