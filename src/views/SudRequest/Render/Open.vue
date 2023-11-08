<template>
    <div >
        <template v-if="User.email=='amitx@list.ru'">

            <feather-icon icon="RefreshCwIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="refresh" />

        </template>

    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../../route';
    import axios from '../../../axios'


    export default {
        data () {
            return {
                showDos:false,
            }
        },

        computed: {

            ...mapGetters([
               'User',
            ]),

        },
        methods: {
            refresh(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("requestPP.index"), {
                    params: {
                        method: 'refresh',
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
        },


    }
</script>
