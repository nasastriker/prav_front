<template>
    <div >
        <template v-if="params.data.filename">
            <vs-chip class="ag-grid-cell-chip cursor-pointer download_btn" color="primary" @click="getFile" >
                <span style="padding-right: 30px;padding-left: 30px"  @click="getFile" >скачать</span>
            </vs-chip>
        </template>

        <template v-else>
            <vs-chip class="ag-grid-cell-chip cursor-pointer download_btn" color="warning">
                <span style="padding-right: 30px;padding-left: 30px" >нет файла</span>
            </vs-chip>

        </template>

    </div>
</template>

<script>
    import r from '../../../route';
    import axios from '../../../axios'
    export default {
        name: 'OpenLink',
        computed: {



        },
        methods:{
            getFile(){
                axios.get(r("correspondence.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getFileNotPath',
                        param:this.params.data.id,




                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    //console.log(response.data);
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));
                    //  console.log(url);
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
        },


    }
</script>
