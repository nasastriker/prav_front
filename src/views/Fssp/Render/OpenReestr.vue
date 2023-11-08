<template>
    <div >
        <template   v-if="params.value!=0">
            <div class="inline-block" style="min-width: 110px;">
                <span style="color: red">Реестр </span>
                <a class="mr-4" v-auth-href :href="url_pochta(params.value)" style="color: red;"> {{params.data.batch_name}}</a>
            </div>
        </template>



        <feather-icon icon="RefreshCwIcon" title="Обновить" svgClasses="h-5 w-5 mr-1 hover:text-primary cursor-pointer" @click="refreshShow" />
      <feather-icon icon="ChromeIcon" title="Посмотреть" svgClasses="h-5 w-5 mr-1 hover:text-primary cursor-pointer"
                    @click="$router.push('/fssp/arhiv/pochta/'+params.data.id)"/>
        <feather-icon icon="Trash2Icon" title="Удалить" svgClasses="h-5 w-5 mr-1 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />

        <vs-popup classContent="popup-example" title="Формирования реестр" :active.sync="sendShow">


            <div class="vx-row" style="margin-left: 2px;margin-right: 15px">
                <div class="vx-col md:w-1/2 w-full mt-5">
                    <h6>Дата отправки:</h6>
                    <vs-input type="date" class="w-100 mb-base"  v-model="dateSend" />

                    <h6>Выставите значение для ручного определения веса одного отправления (применимо ко всей партии отправки). При значении 0 - расчет веса отправления производится автоматически по количеству страниц.
                        Вес в граммах:</h6>
                    <vs-input type="text" class="w-100 mb-base"  v-model="gram" />

                </div>

            </div>
            <vs-row vs-type="flex" vs-justify="center">

                <vs-button color="success" type="filled"  @click="refresh">Сформировать</vs-button>

            </vs-row>



        </vs-popup>
    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import axios from '../../../axios';
    import { mapActions,mapGetters } from 'vuex'
    import VueAuthHref from 'vue-auth-href'
    import moment from 'moment';
    Vue.prototype.$moment = moment;
    const options = {
        token: () => `${localStorage.getItem('accessToken')}`
    }

    Vue.use(VueAuthHref, options)
    export default {
        data () {
            return {
                token:{
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                sendShow:false,
                showDos:false,
                gram:0,
                dateSend:null,
            }
        },

        computed: {
            ...mapGetters([
                'User'
            ]),

        },
        methods: {
            url_pochta(id){
                let abc = "abcdefghijklmnopqrstuvwxyz";
                let rs = "";
                while (rs.length < 10) {
                    rs += abc[Math.floor(Math.random() * abc.length)];
                }
                return '/reestr_pochta_sud/?filename='+id+'&name='+rs
            },
            confirmDeleteRecord(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("reestrPochta.index"), {
                    params: {
                        method: 'deleteReestrFssp',
                        param: {
                            id:this.params.data.id,
                        }

                    }
                }).then((response) => {

                    this.$vs.loading.close()
                    if (response.data.result){
                        this.getDataArchFssps();
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
            refreshShow(){

                let value=7
                axios.get(r("setting.index"), {
                    params: {
                        method: 'getSettingsByName',
                        param: 'sendPeriodSudPrikaz'
                    }
                }).then(res=>{
                    if(res.data.result){
                        value=res.data.value
                    }
                    let date1 = new Date();
               let fortnightAway = new Date(date1);
               date1.setDate(fortnightAway.getDate() + value);
               this.dateSend=  moment(date1.toString()).format("YYYY-MM-DD")

              this.sendShow=true
                })

                /*let date1 = new Date();
                let fortnightAway = new Date(date1);
                date1.setDate(fortnightAway.getDate() + 7);
                this.dateSend=  moment(date1.toString()).format("YYYY-MM-DD")

               this.sendShow=true*/
            },
            refresh(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("reestrPochta.index"), {
                    params: {
                        method: 'refreshFssp',
                        param: {
                            id:this.params.data.id,
                            date:this.dateSend,
                            gram:this.gram,
                        }

                    }
                }).then((response) => {
                    console.log(response.data)
                    this.sendShow=false
                    this.$vs.loading.close()

                    if (response.data.result){
                        this.getDataArchFssps();
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
            ...mapActions([
                'getDataArchFssps'
            ]),

        }
    }
</script>
<style>

    .vs-popup {

        min-width: 600px;
    }
</style>