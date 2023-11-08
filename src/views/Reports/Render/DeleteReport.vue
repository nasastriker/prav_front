<template>
    <div >
        <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="primary" style="margin-top: 12px; max-width: 100px"  >
            <span style="padding-right: 30px;padding-left: 30px"  @click="delReport" >удалить</span>
        </vs-chip>

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
            delReport(){
                    this.$vs.loading({color: '#ff8000'})

                    axios.post(r("reports.index"), {
                        params: {
                            method: 'delReport',
                            param: this.params.value

                        }
                    }).then((response) => {
                        this.$vs.loading.close()
                        if (response.data.result) {
                            this.$vs.notify({
                                color: 'success',
                                title: 'Сообщение',
                                text: 'Задача поставлена в очередь на удаление!!!',
                                position: 'top-center'
                            })

                        } else {
                            this.$vs.notify({
                                title: 'Ошибка !!!',
                                text: response.data.err_mess,
                                color: 'danger',
                                position: 'top-center'
                            })
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


        },


    }
</script>
