<template>
    <div >
        <a  @click="getFile" style="cursor: pointer">{{params.value}}</a>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../../route';
    import axios from '../../../axios'
    const options = {
        token: () => `${localStorage.getItem('accessToken')}`
    }

    export default {
        data () {
            return {
                showDos:false,
            }
        },

        computed: {



        },
        methods: {
            ...mapActions([
                'getDataRequestPps'
            ]),
            getFile(){
                axios.get(r("requestPP.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getFileNotPath',
                        param:{filename:this.params.data.arch_name,id:this.params.data.id}

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    //console.log(response.data);
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));
                    //  console.log(url);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', this.params.data.arch_name);
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
