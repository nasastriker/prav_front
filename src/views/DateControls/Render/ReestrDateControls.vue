<template>
    <div v-if="params.data.reestr == 1">

        <a v-auth-href :href="url_pochta" style="color: red;" v-if="this.params.value!=0">Реестр {{params.data.batch_name}}</a>


        <feather-icon icon="RefreshCwIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="refreshShow" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />

        <vs-popup classContent="popup-example" title="Формирование реестра" :active.sync="sendShow">


            <div class="vx-row" style="margin-left: 2px;margin-right: 15px">
                <div class="vx-col md:w-1/2 w-full mt-5">
                    <h6>Дата отправки:</h6>
                    <vs-input type="date" class="w-100 mb-base"  v-model="dateSend" />
                    <h6>Выставите значение для ручного определения веса одного отправления (применимо ко всей партии отправки). При значении 0 - расчет веса отправления производится автоматически по количеству страниц.</h6>
                    <h6>Вес в граммах:</h6>
                    <vs-input type="text" class="w-100 mb-base"  v-model="gram" />


                </div>
              <div class="vx-col md:w-1/2 w-full mt-5">

                <h6>Тип письма:</h6>
                <v-select  class="w-full" :reduce="label => label.type" label="name" :options="arrayLetter"  v-model="letter_type" ></v-select>
                <h6>Получатель:</h6>
                <v-select  class="w-full" :reduce="label => label.type" label="name" :options="arraySend"  v-model="letter_reseption"  ></v-select>

              </div>

            </div>
            <vs-row vs-type="flex" vs-justify="center" style="margin-top: 40px">

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
    import VueAuthHref from 'vue-auth-href';
    import moment from 'moment';
    Vue.prototype.$moment = moment;
    const options = {
        token: () => `${localStorage.getItem('accessToken')}`
    }

    Vue.use(VueAuthHref, options)
    export default {
      components: {
      },
        data () {
            return {
                token:{
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                arraySend:[],
                arrayLetter:[],
                sendShow:false,
                showDos:false,
                gram:0,
                dateSend:null,
              letter_type:'SIMPLE',
              letter_reseption:'sud',
            }
        },

        computed: {
            ...mapGetters([
                'User'
            ]),
            url_pochta(){
                let abc = "abcdefghijklmnopqrstuvwxyz";
                let rs = "";
                while (rs.length < 10) {
                    rs += abc[Math.floor(Math.random() * abc.length)];
                }
                return '/reestr_pochta_debtor_file/?file_id='+this.params.data.doc_id+'&name='+rs




            },

        },
        methods: {

            confirmDeleteRecord(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("reestrPochta.index"), {
                    params: {
                        method: 'deleteReestrDebtorFile',
                        param: {
                          id:this.params.data.doc_id,
                        }

                    }
                }).then((response) => {

                    this.$vs.loading.close()
                    if (response.data.result){
                        this.params.refresh_func();
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
                      this.arraySend=res.data.arraySend
                      this.arrayLetter=res.data.arrayLetter
                    }
                    let date1 = new Date();
                    let fortnightAway = new Date(date1);
                    date1.setDate(fortnightAway.getDate() + value);
                    this.dateSend=  moment(date1.toString()).format("YYYY-MM-DD")

                    this.sendShow=true
                })

            },
            refresh(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("reestrPochta.index"), {
                    params: {
                        method: 'refreshDebtorFileSendSa',
                        param: {
                            id:this.params.data.doc_id,
                            date:this.dateSend,
                            gram:this.gram,
                            type:this.letter_type,
                            reception:this.letter_reseption,
                        }

                    }
                }).then((response) => {
                    this.sendShow=false
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.params.refresh_func();
                        this.$vs.notify({  title:'Сообщение', text: 'Обновление выполнено успешно!!!', color: 'success', position: 'top-center' })
                        //  this.debtor=response.data.data
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Обновление не выполнено !!! '+response.data.error||'', color: 'danger', position: 'top-center' })
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

            ]),

        }
    }
</script>
<style>

    .vs-popup {

        min-width: 600px;
    }
</style>