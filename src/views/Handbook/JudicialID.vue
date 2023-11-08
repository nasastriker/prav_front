<template>
    <vx-card  no-shadow>

        <vs-tabs >
            <vs-tab label="Общие">
                <br>
                <label style="margin: 10px 0px;">{{label}} </label>
                <div class="vx-row" style="padding-top: 20px">
                    <div class="vx-col md:w-1/2 w-full mb-2">
                        <div class="centerx">
                            <vs-tooltip text="Номер" position="top" >
                                <h6 class="h6 mb-1">Номер</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="w-full mb-base mb-4" v-model="judi.number"></vs-input>


                        <v-select  class="w-50 judicialAreasSelect" style="margin-top: 10px" :reduce="label => label.id" label="name" :options="JudicialAreasForSug"    v-model="judi.area_number"  ></v-select>

                        <vs-checkbox style="margin:15px 0;" v-model="judi.is_area_sud">Районный суд</vs-checkbox>

                        <div class="centerx">
                            <vs-tooltip text="Название" position="top" >
                                <h6 class="h6 mb-1">Название</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="w-full mb-4" v-model="judi.name"></vs-input>

                        <div class="centerx">
                            <vs-tooltip text="Индекс" position="top" >
                                <h6 class="h6 mb-1">Индекс</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="w-full mb-4" v-model="judi.index_pochta"></vs-input>


                        <div style="margin-bottom: 30px">
                            
                            <div class="centerx">
                                <vs-tooltip text="Используется если адрес не ищется через почту" position="top" >
                                    <h6 class="h6B mb-1">Адрес почтовый:&nbsp;<span style="color: red;cursor: pointer;font-size: 12px" @click="getPochtaAddress">Проверить</span></h6>
                                </vs-tooltip>
                            </div>
                            <vs-input class="w-full mb-4" v-model="judi.pochta_address"></vs-input>

                            <div class="centerx">
                                <vs-tooltip text="Адрес" position="top" >
                                    <h6 class="h6 mb-1">Адрес:&nbsp;<span style="color: red;cursor:pointer" @click="showPochta=!showPochta">Почта</span></h6>
                                </vs-tooltip>
                            </div>
                            <vs-popup class="holamundo" title="Инфо" :active.sync="showPochta">
                                <json-viewer
                                        :value="judi.data_pochta"
                                        :expand-depth=5
                                        copyable

                                        sort></json-viewer>

                            </vs-popup>
                            <VueSuggestions
                                    @changeme="saveLocal"
                                    :model.sync="judi.address"
                                    :fias.sync="judi.data_address"
                                    :options="SuggestionOptionsAddress">

                            </VueSuggestions>

                        </div>
                        <template v-if="judi.data_address!=null">
                            <div class="centerx">
                                <vs-tooltip text="ФИАС код улицы" position="top" >
                                    <h6 class="h6 mb-1">ФИАС код улицы:</h6>
                                </vs-tooltip>
                            </div>
                            <vx-input-group class="w-100 mb-4">

                                <vs-input disabled v-model="judi.data_address.street_fias_id"  />

                                <template slot="append">
                                    <div class="append-text btn-addon">
                                        <vs-button color="warning" type="border" @click="showEditForm(judi.data_address.street_fias_id)">ИНФО</vs-button>
                                    </div>
                                </template>
                            </vx-input-group>

                            <div class="centerx">
                                <vs-tooltip text="Дом" position="top" >
                                    <h6 class="h6 mb-1">Дом:</h6>
                                </vs-tooltip>
                            </div>
                            <vs-input class="w-full mb-4"  disabled  v-model="judi.data_address.house"></vs-input>


                        </template>


                        <div class="centerx">
                            <vs-tooltip text="Сайт" position="top" >
                                <h6 class="h6 mb-1">Сайт:</h6>
                            </vs-tooltip>
                        </div>
                        <vx-input-group class="w-100 mb-4">
                            <vs-input v-model="judi.site"  />

                            <template slot="append">
                                <div class="append-text btn-addon">
                                    <vs-button color="warning" type="border"  @click="openUrl">Открыть</vs-button>
                                </div>
                            </template>
                        </vx-input-group>

                        <div class="centerx">
                            <vs-tooltip text="Email" position="top" >
                                <h6 class="h6 mb-1">Email:</h6>
                            </vs-tooltip>
                        </div>
                        <vx-input-group class="w-100 mb-4">
                            <vs-input v-model="judi.email"  />

                            <template slot="append">
                                <div class="append-text btn-addon">
                                    <vs-button color="warning" type="border"  @click="send">Написать</vs-button>
                                </div>
                            </template>
                        </vx-input-group>

                        <div class="centerx">
                            <vs-tooltip text="Страница подсудности" position="top" >
                                <h6 class="h6 mb-1">Страница подсудности:</h6>
                            </vs-tooltip>
                        </div>
                        <vx-input-group class="w-100 mb-4">
                            <vs-input v-model="judi.podsupnost"  />

                            <template slot="append">
                                <div class="append-text btn-addon">
                                    <vs-button color="warning" type="border"  @click="openUrlPod">Открыть</vs-button>
                                </div>
                            </template>
                        </vx-input-group>

                        <div class="centerx">
                            <vs-tooltip text="Телефон" position="top" >
                                <h6 class="h6 mb-1">Телефон:</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="w-full mb-4"  v-model="judi.phone"></vs-input>


                    </div>
                    <div class="vx-col md:w-1/2 w-full mb-2">
                        <vs-checkbox style="margin-bottom: 15px" v-model="judi.origPP" >Приложить оригинал ПП госпошлина</vs-checkbox>
                        <vs-checkbox style="margin-bottom: 15px" v-model="judi.origDover" >Приложить оригинал доверенность</vs-checkbox>
                        <vs-checkbox style="margin-bottom: 15px" v-model="judi.notElPis" >Не принимают электронное письмо</vs-checkbox>
                        <vs-checkbox style="margin-bottom: 15px" v-model="judi.notOnline" >Отказывают по онлайн займу</vs-checkbox>
                        <vs-checkbox style="margin-bottom: 15px" v-model="judi.send_area" >Отправлять в район</vs-checkbox>
                      <vs-checkbox style="margin-bottom: 15px" v-model="judi.send_gas" >Есть возможность отправки через ГАС</vs-checkbox>

                      <span style="margin-bottom: 5px">
                                ФССП отдел:
                              </span>
                      <v-select class="w-full" :reduce="label => label.fssp_code" label="name_code" :options="FsspOtdelArr"
                                v-model="judi.fssp_code" @input="saveLocal"></v-select>

                    </div>
                </div>

                <div style="margin-top: 20px" >
                    <vs-button color="primary mr-4"  class="pull-right" type="filled"  @click="checkJudAcc">Проверить Плат Акк</vs-button>
                    <vs-button color="primary mr-4"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>
                    <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


                </div>

            </vs-tab>
            <vs-tab label="Платежные данные">
                <br>
                <div class="centerx">
                    <vs-tooltip text="Бик Банка" position="top" >
                        <h6 class="h6 mb-1">Бик Банка:</h6>
                    </vs-tooltip>
                </div>
                <vs-input class="w-full mb-4" v-model="judi.bankBic"></vs-input>

                <div class="centerx">
                    <vs-tooltip text="Название банка" position="top" >
                        <h6 class="h6 mb-1">Название банка:</h6>
                    </vs-tooltip>
                </div>
                <vs-input class="w-full mb-4" v-model="judi.bankName"></vs-input>

                <div class="centerx">
                    <vs-tooltip text="Кор. счет" position="top" >
                        <h6 class="h6 mb-1">Кор. счет:</h6>
                    </vs-tooltip>
                </div>
                <vs-input class="w-full mb-4" v-model="judi.correspAcc"></vs-input>

                <div class="centerx">
                    <vs-tooltip text="ОКТМО" position="top" >
                        <h6 class="h6 mb-1">ОКТМО:</h6>
                    </vs-tooltip>
                </div>
                <vs-input class="w-full mb-4" v-model="judi.oktmmf"></vs-input>

                <div class="centerx">
                    <vs-tooltip text="Номер счета" position="top" >
                        <h6 class="h6 mb-1">Номер счета:</h6>
                    </vs-tooltip>
                </div>
                <vs-input class="w-full mb-4" v-model="judi.payeeAcc"></vs-input>

                <div class="centerx">
                    <vs-tooltip text="ИНН" position="top" >
                        <h6 class="h6 mb-1">ИНН:</h6>
                    </vs-tooltip>
                </div>
                <vs-input class="w-full mb-4" v-model="judi.payeeInn"></vs-input>

                <div class="centerx">
                    <vs-tooltip text="КПП" position="top" >
                        <h6 class="h6 mb-1">КПП:</h6>
                    </vs-tooltip>
                </div>
                <vs-input class="w-full mb-4" v-model="judi.payeeKpp"></vs-input>

                <div class="centerx">
                    <vs-tooltip text="Получатель" position="top" >
                        <h6 class="h6 mb-1">Получатель:</h6>
                    </vs-tooltip>
                </div>
                <vs-input class="w-full mb-4" v-model="judi.payeeName"></vs-input>

                <div class="centerx">
                    <vs-tooltip text="ТП (г., п.)" position="top" >
                        <h6 class="h6 mb-1">ТП (г., п.):</h6>
                    </vs-tooltip>
                </div>
                <vs-input class="w-full mb-4" v-model="judi.tnp"></vs-input>

                <div class="centerx">
                    <vs-tooltip text="Город" position="top" >
                        <h6 class="h6 mb-1">Город:</h6>
                    </vs-tooltip>
                </div>
                <vs-input class="w-full mb-4" v-model="judi.city"></vs-input>
                <div style="margin-top: 20px" >
                    <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="checkJudAcc">Проверить Плат Акк</vs-button>
                    <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="close">Закрыть</vs-button>
                    <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


                </div>

            </vs-tab>
            <vs-tab label="Страница подсудности">
                <vs-button color="primary"  class="pull-right" type="filled" style="float: right"  @click="ExportToAddressArea">Экспортировать в адреса участка</vs-button>
                <span v-html="site" ></span>


            </vs-tab>
            <vs-tab label="Адреса участка">
                <JudicialIDAdresses :jud_id="judi.id" ></JudicialIDAdresses>
            </vs-tab>
        </vs-tabs>


    </vx-card>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import VueSuggestions from '../../components/vue-suggestions/vue-suggestionsChange.vue';
    import JudicialIDAdresses from "./JudicialIDAdresses.vue";
    export default {
        components: {
            VueSuggestions,
            JudicialIDAdresses,

        },
        props:{
            id_jud: {
                default: 0,
                type: Number
            }

        },
        data () {
            return {


                label:'Редактирование судебного участка:',
                judi:{
                    data_pochta:{}
                },
                showPochta:false,
                site:'',

            }
        },
        mounted(){
         ///   console.log(this.$route)

            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    if(this.id_jud==0){
                        this.judi.id=this.$route.params.id
                        this.getData(this.$route.params.id);
                    }else{
                        this.judi.id=this.id_jud
                        this.getData(this.id_jud);
                    }

                } else {
                    this.label='Судебный участок'
                }


            }
            this.getDataJurisdictionsByJudicial({jud_id: this.judi.id});
        },

        computed: {
            ...mapGetters([
                'JudicialAreasForSug','JurisdictionsArr','SuggestionOptionsAddress','FsspOtdelArr'
            ]),

        },
        methods: {
            ...mapActions([
               'getDataJudicials', 'exportToAddressArea','getDataJurisdictionsByJudicial','getDataJudicialAreasForSug'
            ]),
            getPochtaAddress(){
                axios.post(r('judicial.update'), {
                    params: {
                        method: 'getPochtaAddress',
                        param: {

                            address:this.judi.address
                        }
                    }
                }).then((response) => {
                    if (response.data.result){
                        this.judi.pochta_address=response.data.data

                        this.$vs.notify({
                            title: 'Сообщение',
                            text: 'Почтовый адрес определен',
                            color: 'success',
                            position: 'top-center'
                        });
                    } else {
                        this.$vs.notify({
                            title: 'Сообщение',
                            text: 'Почтовый адрес определить не удалось('+response.data.error||''+')',
                            color: 'danger',
                            position: 'top-center'
                        });

                    }

                }).catch(error => {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },


            ExportToAddressArea(){

               this.$vs.loading({ color: '#ff8000' })
                this.exportToAddressArea(this.$route.params.id).then((response)=>{
                    this.$vs.loading.close()
                    if(response.result){
                      this.$vs.notify({
                          title: 'Успех',
                          text: 'Экспортировано '+response.countoriginal+' адресов, совподающих '+response.countmatch,
                          color: 'success',
                          position: 'top-center'
                      })
                  }
                  else {
                      this.$vs.notify({
                          title: 'Ошибка',
                          text: 'Ошибка',
                          color: 'danger',
                          position: 'top-center'
                      })
                  }
              }).catch(error => {
                    this.$vs.loading.close()
                  this.$vs.notify({
                      title: 'Ошибка',
                      text: 'Ошибка',
                      color: 'danger',
                      position: 'top-center'
                  })
              })
            },

            close(){
                if(this.id_jud==0){
                    this.$router.push('/handbook/judicial/')
                }else{
                    this.$emit('save')
                }


            },
            checkJudAcc(){
                this.$vs.loading({ color: '#ff8000' })
                axios.get(r("judicial.index"), {
                    params: {
                        method: 'checkJudAcc',
                        param: this.judi.id

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.judi=response.data.data
                    }
                    else{
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Ошибка',
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

            showEditForm(){

            },
            openUrlPod(){
                window.open(this.judi.podsupnost, '_blank');
            },
            openUrl(){
                window.open(this.judi.site, '_blank');
            },
            send(){
                window.open('mailto:'+this.judi.email, '_blank');
            },
            ...mapActions([
                'saveJudicial',
            ]),
            getData(id){
                axios.get(r("judicial.index"), {
                    params: {
                        method: 'getJudicial',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.judi=response.data.data
                        this.getJudicalSite(this.judi.number);
                    }



                })
            },
            getJudicalSite(number){
                axios.get(r("judicial.index"), {
                    params: {
                        method: 'getJudicalSite',
                        param: number

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.site=response.data.data.site
                    }



                })
            },
            saveLocal(){
                if(this.$route.params.id!='new'){
                    if(this.id_jud==0){
                        this.judi.id=this.$route.params.id;
                    }else{
                        this.judi.id=this.id_jud;

                    }


                    axios.post(r("judicial.update"), {
                        params: {
                            method: 'saveJudicial',
                            param: this.judi
                        }
                    }).then((response) => {
                        if(response.data.result){
                            this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        }
                        else{
                            this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                        }



                    })

                }




            },
            save(){
                if(this.id_jud==0){
                    this.judi.id=this.$route.params.id;
                }else{
                    this.judi.id=this.id_jud;

                }

                this.saveJudicial(this.judi).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        if(this.id_jud==0){
                            this.getDataJudicials();
                            this.$router.push('/handbook/judicial/')
                        }else{
                            this.$emit('save')

                        }

                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }


                })



            },


        },
    }
</script>
<style>
    .judicialAreasSelect .vs__dropdown-toggle {
        padding: 0.75px 0 4px 0;
        height: auto!important;
    }
    .highlighted { color: red }
    .terr-item .right {
        margin-left: 32%;
    }
    .terr-item .left {
        width: 30%;
        float: left;
    }
    .address-note {
        font-size: 13px;
        color: #444;
        padding-top: 5px;
    }
    .table{
        border-collapse: collapse; /* Убираем двойные линии между ячейками */
    }
    .tdd{
        padding: 3px; /* Поля вокруг содержимого таблицы */
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .standart{
        color: #a9a7f0
    }
</style>
