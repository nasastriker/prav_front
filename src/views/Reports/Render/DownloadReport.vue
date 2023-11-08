<template>
    <div >
        <template v-if="params.data.filename">
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="primary" style="margin-top: 12px; max-width: 100px" @click="getFile" >
                <span style="padding-right: 30px;padding-left: 30px"  @click="getFile" >скачать</span>
            </vs-chip>
        </template>

        <template v-else>
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="warning" style="margin-top: 12px;max-width: 100px">
                <span  style="padding-right: 30px;padding-left: 30px" >нет файла</span>
            </vs-chip>

        </template>

    </div>
</template>

<script>
    import Vue from 'vue'

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../../route';
    import axios from '../../../axios'
    export default {
        name: 'OpenLink',
        computed: {



        },
        methods:{
            getFile(){
                axios.get(r("reports.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getFileNotPath',
                        param:this.params.data.filename,




                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    //console.log(response.data);
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));
                    //  console.log(url);
                    const link = document.createElement('a');
                    link.href = url;
                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    //console.log(filename);
                    filename= filename.replace('_', '');
                    filename = filename.split('; filename*=utf')[0];

                    link.setAttribute('download', filename);
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
