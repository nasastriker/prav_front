<template>
    <div >
        <template   v-if="typeof params.value!='undefined'">
            <template   v-if="params.value.length>0">
              <span title="Нажмите на номер реестра чтобы скачать">
                <span style="color: red">Реестр </span>
                <a v-auth-href :href="url_pochta(item.id_pochta)" style="color: red;" v-for="item in params.value"> {{item.batch_name}}</a>
              </span>
            </template>
        </template>


      <span title="Сформировать почтовый реестр">
        <feather-icon icon="RefreshCwIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer mr-2" @click="refreshShow" />
      </span>
      <span title="Просмотреть содержимое">
        <feather-icon icon="ChromeIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer mr-2" @click="$router.push('/rabsud/sud/'+params.data.id)"/>
      </span>
      <span title="Удалить почтовый реестр">
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
      </span>
        <vs-popup classContent="popup-example" title="Формирования реестр" :active.sync="sendShow">
            <div class="vx-row" style="margin-left: 2px;margin-right: 15px">
                <div >
                    <h6>Дата отправки:</h6>
                    <vs-input type="date" class="w-100 mb-base"  v-model="dateSend" />
                    <h6>Выставите значение для ручного определения веса одного отправления (применимо ко всей партии отправки). При значении 0 -  расчет веса отправления производится  автоматически по количеству страниц.</h6>
                    <vs-input type="text" class="w-100 mb-base"  v-model="gram" />
                    <template v-if="params.data.type=='document'">
                      <h6>Тип письма:</h6>
                      <v-select  class="w-full" :reduce="label => label.type" label="name" :options="arrayLetter"  v-model="letter_type" ></v-select>
                      <h6>Получатель:</h6>
                      <v-select  class="w-full" style="margin-bottom: 15px" :reduce="label => label.type" label="name" :options="arraySend"  v-model="letter_reseption"  ></v-select>
                    </template>

                </div>
            </div>
            <vs-row vs-type="flex" vs-justify="center">
                <vs-button color="success" type="filled"  @click="refresh">Сформировать</vs-button>
            </vs-row>
          <h6>Почтовые лимиты:</h6>
          <template v-for="lim in PochtaSettingsLimit">
            <div class="vx-row" style="margin-left: 2px;margin-right: 15px" >
              <span>{{lim.name}} &nbsp;</span>
              <span> Количество запросов: {{lim.allowed}}&nbsp;</span>
              <span> Доступные запросы: {{lim.current}}&nbsp;</span>

            </div>
          </template>

        </vs-popup>
    </div>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../../route';
    import axios from '../../../../axios';
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
                arrayLetter:[],
              arraySend:[],
                gramTrue:false,
                letter_type:null,
                letter_reseption:null,
                sendShow:false,
                showDos:false,
                gram:0,
                dateSend:null,
            }
        },

        computed: {
            ...mapGetters([
                'User','PochtaSettingsLimit'
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
                        method: 'deleteReestr',
                        param: {
                            id:this.params.data.id,
                        }

                    }
                }).then((response) => {

                    this.$vs.loading.close()
                    if (response.data.result){
                        this.getDataArchSuds();
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
                let date1 = new Date();
                let date2 = new Date();
                let fortnightAway = new Date(date1);
                let period=7;
                this.getPochtaLimit()
                this.getGlobalSetting('sendPeriodSudPrikaz').then((response) => {
                  if(response.data.result)period=response.data.data
                    date1.setDate(fortnightAway.getDate() + period);
                    date2.setDate(fortnightAway.getDate() + period*2);
                    let str = this.params.data.arch_name;
                    this.arraySend=response.data.arraySend
                    this.arrayLetter=response.data.arrayLetter
                    let pos = str.search("OPISKA");
                    if (pos != -1) {
                        this.dateSend=  moment(date2.toString()).format("YYYY-MM-DD")
                    }else{
                        this.dateSend=  moment(date1.toString()).format("YYYY-MM-DD")

                    }
                })
                this.sendShow=true
                },
            refresh(){
                this.sendShow=false
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("reestrPochta.index"), {
                    params: {
                        method: 'refreshSud',
                        param: {
                            id:this.params.data.id,
                            date:this.dateSend,
                            gram:this.gram,
                            letter_type:this.letter_type,
                            letter_reseption:this.letter_reseption,

                        }

                    }
                }).then((response) => {
                    this.sendShow=false
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.getDataArchSuds();
                        this.$vs.notify({  title:'Сообщение', text: 'Обновление выполнено успешно!!!', color: 'success', position: 'top-center' })
                        //  this.debtor=response.data.data
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: response.data.error, color: 'danger', position: 'top-center' })
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
                'getDataArchSuds','getGlobalSetting','getPochtaLimit'
            ]),

        }
    }
</script>
<style>

    .vs-popup {

        min-width: 600px;
    }
</style>