<template>
    <vx-card no-shadow>
        <div class="mt-5">
            <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                <vs-button style="margin-bottom: 10px" color="primary" type="border" icon-pack="feather" icon="icon-arrow-left"    @click="close">Назад</vs-button>



            </div>

            <vs-tabs>
                <vs-tab label="Основные">
                    <div class="vx-row">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <label class="text-sm">Статус:</label>
                            <v-select  class="w-50 mb-base" :reduce="label => label.id" label="name" :options="StatussDebtorArr"  v-model="debtor.id_status" style="margin-bottom: 40px" ></v-select>


                            <vs-input class="w-50 mb-base" label-placeholder="Фамилия" v-model="debtor.name_family"></vs-input>
                            <vs-input class="w-50 mb-base" label-placeholder="Имя" v-model="debtor.name"></vs-input>
                            <vs-input class="w-50 mb-base" label-placeholder="Отчетсво" v-model="debtor.name_patronymic"></vs-input>
                            <vs-input type="date" class="w-50 mb-base" label-placeholder="Дата рождения" v-model="debtor.birthdate"></vs-input>
                            <vs-input style="margin-top: 10px" class="w-full mb-base" label-placeholder="Место рождения" v-model="debtor.bith_place"></vs-input>
                            <vs-input class="w-50 mb-base" label-placeholder="Серия паспорта" v-model="debtor.series"></vs-input>
                            <vs-input class="w-50 mb-base" label-placeholder="Номер паспорта" v-model="debtor.number"></vs-input>
                            <vs-input class="w-full mb-base" label-placeholder="Кем выдан паспорт" v-model="debtor.given_pass"></vs-input>
                            <vs-input type="date" class="w-50 mb-base" label-placeholder="Дата выдачи" v-model="debtor.pass_date"></vs-input>
                            <div class="mt-8 mb-base">
                                <label class="text-sm">Пол</label>
                                <div class="mt-2">
                                    <vs-radio v-model="debtor.sex" vs-value="M" class="mr-4">Мужской</vs-radio>
                                    <vs-radio v-model="debtor.sex" vs-value="F" class="mr-4">Женский</vs-radio>
                                </div>
                            </div>
                            <vs-input style="margin-top: 10px" class="w-100 mb-base" label-placeholder="Снилс" v-model="debtor.snils"></vs-input>
                            <span style="margin-bottom: 5px">
                                ИНН:
                              </span>
                            <vx-input-group class="w-100 mb-base">
                                <vs-input v-model="debtor.inn"  />

                                <template slot="append">
                                    <div class="append-text btn-addon">
                                        <vs-button color="primary" @click="checkInn(false)">Определить</vs-button>
                                    </div>
                                </template>
                            </vx-input-group>



                            <!--  <vs-input style="margin-top: 10px" class="w-full mb-base" label-placeholder="Инн" v-model="debtor.inn"></vs-input> -->

                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <div class="mt-8 mb-base">
                                <label class="text-sm">

                                                Подсудность:

                                    </label>
                                <vx-input-group class="w-100 mb-base">
                                    <vs-input  v-model="debtor.jud_number" />

                                    <template slot="append">
                                        <div class="append-text btn-addon">
                                            <vs-button color="warning" type="border" @click="showJud=!showJud">ИНФО</vs-button>
                                            <vs-button color="warning" type="border" @click="setJud">Установить</vs-button>
                                        </div>
                                    </template>

                                </vx-input-group>
                                <template v-if="showJud">
                                    <Jud :number="debtor.jud_number" ></Jud>
                                </template>

                                <template v-if="debtor.jud_number_geo!=null">
                                        <label class="text-sm">
                                            Гео подсудность:
                                        </label>
                                            <span v-for="(item, index) in debtor.jud_number_geo" :key="item">
                                                <vx-input-group class="w-100 mb-base"  >
                                                    <template v-if="debtor.jud_number_geo_pri==debtor.jud_number_geo[index]">
                                                            <vs-input v-model="debtor.jud_number_geo[index]"  style="color: green"/>
                                                    </template>
                                                    <template v-else>
                                                        <vs-input v-model="debtor.jud_number_geo[index]"  />
                                                    </template>

                                                    <template slot="append">
                                                        <div class="append-text btn-addon">
                                                            <vs-button color="warning" type="border" @click="showIndexProc(index) ">
                                                                <template v-if="showIndex === index">
                                                                    СКРЫТЬ
                                                                </template>
                                                                <template v-else>
                                                                ИНФО
                                                                </template>

                                                            </vs-button>
                                                        </div>
                                                    </template>
                                                </vx-input-group>
                                                <template v-if="showIndex === index">
                                                    <Jud :number="debtor.jud_number_geo[index]" ></Jud>
                                                </template>
                                            </span>
                                </template>



                            </div>

                            <div class="mt-8 mb-base">
                                <label class="text-sm">Статус гражданина</label>
                                <div class="mt-2">

                                    <vs-radio v-model="debtor.pensioner" vs-value="0" vs-name="pensioner" class="mr-4">Работающий</vs-radio>
                                    <vs-radio v-model="debtor.pensioner" vs-value="1" vs-name="pensioner" class="mr-4">Пенсионер</vs-radio>
                                </div>
                            </div>
                            <template v-if="debtor.pensioner==1">
                                <vs-input class="w-full mb-base" disabled label-placeholder="ПФР" v-model="pfr"></vs-input>
                            </template>
                            <span style="margin-bottom: 5px">
                                ФССП:
                              </span>
                            <vx-input-group class="w-100 mb-base">
                                <vs-input disabled v-model="fssp"  />

                                <template slot="append">
                                    <div class="append-text btn-addon">
                                        <vs-button color="primary" @click="checkFssp()">Проверить</vs-button>
                                    </div>
                                </template>
                            </vx-input-group>


                            <div class="mt-8 mb-base">
                                <label class="text-sm">Банкрот</label>
                                <div class="mt-2">
                                    <vs-radio v-model="debtor.bankrot" vs-value="0" vs-name="bankrot" class="mr-4">Нет</vs-radio>
                                    <vs-radio v-model="debtor.bankrot" vs-value="1" vs-name="bankrot" class="mr-4">Да</vs-radio>
                                    <template v-if="debtor.bankrot">
                                        <vs-button color="primary" type="border" @click="openBankrot">Дело</vs-button>

                                    </template>
                                    <vs-button color="primary" @click="checkBankrot">Определить</vs-button>
                                </div>

                            </div>
                            <div style="margin-bottom: 30px">
                    <span style="margin-bottom: 5px">
        Адрес регистрации:
      </span>
                                <VueSuggestions

                                        :model.sync="debtor.address_reg"
                                        :fias.sync="debtor.data_reg"
                                        :options="SuggestionOptionsAddress">

                                </VueSuggestions>
                            </div>
                            <span style="margin-bottom: 5px">
                                ФИАС код улицы:
                              </span>
                            <vx-input-group class="w-100 mb-base">
                                <vs-input disabled v-model="debtor.data_reg.street_fias_id"  />

                                <template slot="append">
                                    <div class="append-text btn-addon">
                                        <vs-button color="warning" type="border" @click="showEditForm(debtor.data_reg.street_fias_id)">ИНФО</vs-button>
                                    </div>
                                </template>
                            </vx-input-group>
                            <vs-input class="w-full mb-base"  disabled label-placeholder="geo_lat" v-model="debtor.data_reg.geo_lat"></vs-input>
                            <vs-input class="w-full mb-base"  disabled label-placeholder="geo_lon" v-model="debtor.data_reg.geo_lon"></vs-input>
                            <vs-input class="w-full mb-base"  disabled label-placeholder="Дом." v-model="debtor.data_reg.house"></vs-input>
                            <div style="margin-top: 10px">
                    <span style="margin-bottom: 5px; margin-top: 5px">
        Адрес фактический:
      </span>
                                <VueSuggestions

                                        :model.sync="debtor.address_fact"
                                        :fias.sync="debtor.data_fact"
                                        :options="SuggestionOptionsAddress">
                                </VueSuggestions>
                            </div>
                            <div style="margin-top: 40px"> </div>
                            <vs-input class="w-full mb-base" disabled label-placeholder="ФИАС код улицы" v-model="debtor.data_fact.street_fias_id"></vs-input>
                            <vs-input class="w-full mb-base"  disabled label-placeholder="Дом" v-model="debtor.data_fact.house"></vs-input>
                            <vs-input style="margin-top: 10px" class="w-full mb-base" label-placeholder="Телефон" v-model="debtor.phone"></vs-input>
                            <vs-input class="w-full" label-placeholder="Email"   v-model="debtor.email"></vs-input>

                        </div>
                    </div>

                    <div style="margin-top: 20px">
                        <vs-button style="margin-top: 10px" color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>
                        <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
                        <!-- <vs-button color="success" class="pull-right" type="filled"  @click="sud">Суд</vs-button> -->


                    </div>

                </vs-tab>



                <vs-tab label="Сведения о договорах">
                        <DebtorRecover :id_debtor="this.debtor.id"></DebtorRecover>




                </vs-tab>
                <vs-tab label="Логи">
                    <Log :id_debtor="this.debtor.id"></Log>




                </vs-tab>

                <vs-popup class="holamundo" :title="labelPop" :active.sync="popupActive">
                    <json-viewer
                            :value="ispl"
                            :expand-depth=5
                            copyable

                            sort></json-viewer>

                </vs-popup>

            </vs-tabs>
        </div>



    </vx-card>
</template>

<script>
    import Vue from 'vue'
    import AsyncComputed from 'vue-async-computed'
    import JsonViewer from 'vue-json-viewer'
    import VueDadata from 'vue-dadata'
    import r from '../../route';
    import DebtorRecover from './DR.vue';
    import Jud from './Jud.vue';
    import Log from './Log.vue';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import VueSuggestions from 'vue-suggestions';
    import vSelect from 'vue-select'
    Vue.use(AsyncComputed)
    export default {
        components: { VueSuggestions,
            'vue-dadata': VueDadata,
            'v-select': vSelect,
            'DebtorRecover':DebtorRecover,
            JsonViewer,
            Jud,
            Log
        },
        props:['idDep'],
        data () {
            return {
                labelPop:'Исполнительные производства',
                popupActive:false,
                showJud:false,
                ispl:[],
                showIndex: null,
                fias_reg:'',
                debtor:{

                        data_reg:{},
                    data_fact:{},
                },
                suggestionOptions: {
                    // @see https://confluence.hflabs.ru/pages/viewpage.action?pageId=207454318
                    token: 'bb9fba5f0b4fb49230a94774a985a84e51e7dcd4',
                    type: "NAME",
                    params: {
                        parts: ["SURNAME"]
                    },
                    scrollOnFocus: false,
                    triggerSelectOnBlur: false,
                    triggerSelectOnEnter: false,
                    addon: 'none',
                    // @see https://confluence.hflabs.ru/pages/viewpage.action?pageId=207454320
                    onSelect (suggestion) {

                    }
                },
                suggestionOptionsName: {
                    // @see https://confluence.hflabs.ru/pages/viewpage.action?pageId=207454318
                    token: 'bb9fba5f0b4fb49230a94774a985a84e51e7dcd4',
                    type: "NAME",
                    params: {
                        parts: ["NAME"]
                    },
                    scrollOnFocus: false,
                    triggerSelectOnBlur: false,
                    triggerSelectOnEnter: false,
                    addon: 'none',
                    // @see https://confluence.hflabs.ru/pages/viewpage.action?pageId=207454320
                    onSelect (suggestion) {

                    }
                },
                suggestionOptionsMidname: {
                    // @see https://confluence.hflabs.ru/pages/viewpage.action?pageId=207454318
                    token: 'bb9fba5f0b4fb49230a94774a985a84e51e7dcd4',
                    type: "NAME",
                    params: {
                        parts: ["PATRONYMIC"]
                    },
                    scrollOnFocus: false,
                    triggerSelectOnBlur: false,
                    triggerSelectOnEnter: false,
                    addon: 'none',
                    // @see https://confluence.hflabs.ru/pages/viewpage.action?pageId=207454320
                    onSelect (suggestion) {

                    }
                },

            }
        },
        mounted(){
            this.getDataStatuss()
            if (this.$route.params.id){
                if(this.idDep){
                    this.getData(this.idDep);
                }
                else{
                    this.getData(this.$route.params.id);
                }




            }

        },
        asyncComputed: {
            async judi() {


            },
            async pfr() {
             //   console.log(this.debtor.data_reg.region_kladr_id)
                if(this.debtor.data_reg.region_kladr_id!=null && this.debtor.data_reg.region_kladr_id!=''){
                    const res = await  axios.get(r("pfr.index"), {
                        params: {
                            method: 'getPfrByKladrId',
                            param: this.debtor.data_reg.region_kladr_id
                        }
                    })
                //    console.log(res.data);
                    if(res.data.result){
                        return res.data.data.address;
                    }
                    else{
                        return ''
                    }

                }
                else{
                    return ''
                }

            },
            async fssp() {
                //   console.log(this.debtor.data_reg.region_kladr_id)
                if(this.debtor.data_reg.region_kladr_id!=null && this.debtor.data_reg.region_kladr_id!=''){
                    const res = await  axios.get(r("fssp.index"), {
                        params: {
                            method: 'getFsspByKladrId',
                            param: this.debtor.data_reg.region_kladr_id
                        }
                    })
                //    console.log(res.data);
                    if(res.data.result){
                        return res.data.data.address;
                    }
                    else{
                        return ''
                    }

                }
                else{
                    return ''
                }

            }
        },
        computed: {

            ...mapGetters([
                'StatussDebtorArr','SuggestionOptionsAddress'

            ]),


        },
        methods: {
            showIndexProc(index){
                if(this.showIndex!=index){
                    this.showIndex = index
                }
                else{
                    this.showIndex = null
                }

            },
            close(){

                this.$router.back()
            },
            ...mapActions([
                'saveDebtor','getDataStatuss',
            ]),
            setJud(){
                axios.post(r("jurisdiction.index"), {
                    params: {
                        method: 'setJurisdictions',
                        param: this.debtor

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: response.data.mess , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                        this.$vs.loading.close()
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: error.message,
                            color: 'danger',
                            position: 'top-center'
                        })
                })
            },
            showEditForm(e){
                axios.get(r("jurisdiction.index"), {
                    params: {
                        method: 'getJurisdictionsByStreetFias',
                        param: e

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.popupActive=true;
                        this.labelPop='Адреса в базе данных по данному коду'
                        this.ispl=response.data.data
                    }



                })
            },
            sud(){
                axios.get(r("judicial.index"), {
                    params: {
                        method: 'getDebtorJudicial',
                        param: this.debtor.data_reg

                    }
                }).then((response) => {
                    if (response.data.result){

                        this.debtor=response.data.data
                    }



                })
            },
            openBankrot(){
                window.open(this.debtor.bankrot_delo, '_blank');
            },
            checkFssp(){
                this.$vs.loading({ color: '#ff8000' })
                    axios.post(r("debtors.index"), {
                        params: {
                            method: 'getFssp',
                            param: this.debtor

                        }
                    }).then((response) => {

                        this.$vs.loading.close()
                        if (response.data.result){
                          //  this.debtor.inn=response.data.data;
                            let res=response.data.mess.response.result[0];
                            console.log(res.result);
                            if(res.result.length>0){
                                this.$vs.notify({  title:'Успешно', text: 'Проверка выполнена есть исполнительные производства!!!', color: 'success', position: 'top-center' })
                                this.popupActive=true;
                                this.ispl=res.result;
                                this.labelPop='Исполнительные производства'
                            }
                            else{
                                this.$vs.notify({  title:'Успешно', text: 'Проверка выполнена успешно исполнительные производства не найдены!!!', color: 'success', position: 'top-center' })
                            }

                        }
                        else{
                            this.$vs.notify({  title:'Ошибка', text: response.data.mess, color: 'danger', position: 'top-center' })
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
            checkBankrot(){
                let flag=false;

                if (this.debtor.inn == null) {

                    this.checkInn(true);
                    flag=true;

                }
                if (this.debtor.inn == "") {
                    this.checkInn(true);
                    flag=true;
                }
                if(!flag) {
                    this.getBankrot();
                }

            },
            getBankrot(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("debtors.index"), {
                    params: {
                        method: 'getBankrot',
                        param: this.debtor

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result) {
                        this.debtor.bankrot = 1;
                        this.debtor.bankrot_delo = 'https://bankrot.fedresurs.ru/PrivatePersonCard.aspx?ID=' + response.data.data
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Банкротство определено!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
                    else {
                        this.debtor.bankrot = 0;
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Не банкрот !!!',
                            color: 'success',
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
            checkInn(fla){
                let flag=false;
                if (this.debtor.name==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Имя  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.debtor.name_family==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Фамилия  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.debtor.name_patronymic==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Отчество  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.debtor.birthdate==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Дата рождения  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.debtor.series==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Серия паспорта  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.debtor.number==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Номер паспорта  !!!', color: 'danger', position: 'top-center' })
                }
                this.$vs.loading({ color: '#ff8000' })
                if(!flag){
                    axios.post(r("debtors.index"), {
                        params: {
                            method: 'getInn',
                            param: this.debtor

                        }
                    }).then((response) => {

                        this.$vs.loading.close()
                        if (response.data.result){
                            this.debtor.inn=response.data.data;
                            if(fla){
                                this.getBankrot();
                            }
                            this.$vs.notify({  title:'Успешно', text: 'Инн определен!!!', color: 'success', position: 'top-center' })
                        }
                        else{
                            this.$vs.notify({  title:'Ошибка', text: 'Инн определить не удалось !!!', color: 'danger', position: 'top-center' })
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

                }

            },
            getData(id){
                axios.get(r("debtors.index"), {
                    params: {
                        method: 'getDebtor',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){

                        this.debtor=response.data.data
                        if(!this.debtor.data_reg){
                            this.debtor.data_reg={}
                        }
                        if(!this.debtor.data_fact){
                            this.debtor.data_fact={}
                        }
                    }



                })
            },

            save(){
                if(this.idDep){
                    this.debtor.id=this.idDep
                }
                else{
                    this.debtor.id=this.$route.params.id
                }

                this.saveDebtor(this.debtor).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.back()
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
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

<style lang="scss">
    .address-component {
        flex: 1 1 auto;
        width: 1%;

    input {
        height: auto;
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

    &:focus {
         color: #495057;
         background-color: #fff;
         border-color: #80bdff;
         outline: 0;
         box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
     }
    }
    }
</style>
