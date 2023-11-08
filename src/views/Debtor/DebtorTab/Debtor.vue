<template>
    <vx-card no-shadow>
                <div class="vx-row" >

                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <template v-if="typeof Deb.debtorCredit!='undefined'">
                            <template v-if="typeof Deb.debtorCredit.id!='undefined'">
                                <Status :id_credit="Deb.debtorCredit.id" class="h6"></Status>
                            </template>
                        </template>
                        <h6 class="h6 mb-1">ID_Заемщика:<VarToClipboard name="d_id"/></h6>
                        <vs-input class="w-50 mb-4"  v-model="Deb.debtor.id" disabled ></vs-input>

                        <h6 class="h6 mb-1">Фамилия:<VarToClipboard name="d_name_family"/></h6>
                        <vs-input class="w-50 mb-4"  v-model="Deb.debtor.name_family"  @change="changeDeb"></vs-input>
                        <h6 class="h6 mb-1">Предыдущая фамилия:<VarToClipboard name="d_name_family_last" /></h6>
                        <vs-input class="w-100 mb-4"  v-model="Deb.debtor.name_family_last" @change="changeDeb"></vs-input>
                        <h6 class="h6 mb-1">Имя:<VarToClipboard name="d_name"/></h6>
                        <vs-input class="w-50 mb-4" v-model="Deb.debtor.name"  @change="changeDeb"></vs-input>
                        <h6 class="h6 mb-1">Отчество:<VarToClipboard name="d_name_patronymic"/></h6>
                        <vs-input class="w-50 mb-4"  v-model="Deb.debtor.name_patronymic"  @change="changeDeb"></vs-input>
                        <h6 class="h6 mb-1">Дата рождения:<VarToClipboard name="d_birthdate"/></h6>
                        <vs-input type="date" class="w-50 mb-2"  v-model="Deb.debtor.birthdate" @blur="changeDeb"></vs-input>
                        <h6 class="h6 mb-1">Страна рождения:<VarToClipboard name="d_country_bith_place"/></h6>
                        <v-select  class="w-50 mb-4" style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="CountryCode"   v-model="Deb.debtor.id_country_bith_place" @input="changeDeb" ></v-select>
                        <h6 class="h6 mb-1">Место рождения:<VarToClipboard name="d_bith_place"/></h6>
                        <vs-input  class="w-full mb-4"  v-model="Deb.debtor.bith_place"  @change="changeDeb"></vs-input>
                        <h6 class="h6 mb-1">Серия паспорта:<VarToClipboard name="d_series"/></h6>
                        <vs-input class="w-50 mb-4"  v-model="Deb.debtor.series"  @change="changeDeb"></vs-input>
                        <h6 class="h6 mb-1">Номер паспорта:<VarToClipboard name="d_number"/></h6>
                        <vs-input class="w-50 mb-4"  v-model="Deb.debtor.number"  @change="changeDeb"></vs-input>
                        <h6 class="h6 mb-1">Код подразделения:<VarToClipboard name="d_code_ufms"/></h6>
                        <vs-input class="w-50 mb-4"  v-model="Deb.debtor.code_ufms"  @change="changeDeb"></vs-input>
                        <h6 class="h6 mb-1">Кем выдан паспорт:<VarToClipboard name="d_given_pass"/></h6>
                        <vs-input class="w-full mb-4"  v-model="Deb.debtor.given_pass"  @change="changeDeb"></vs-input>
                        <h6 class="h6 mb-1">Дата выдачи:<VarToClipboard name="d_pass_date"/></h6>
                        <vs-input type="date" class="w-50 mb-4"  v-model="Deb.debtor.pass_date"  @blur="changeDeb"></vs-input>
                        <div class="mt-8 ">
                            <h6 class="h6 mb-1">Пол:<VarToClipboard name="d_sex"/></h6>
                            <div class="mt-2">
                                <vs-radio v-model="Deb.debtor.sex" vs-value="M" class="mr-4"  @input="changeDeb">Мужской</vs-radio>
                                <vs-radio v-model="Deb.debtor.sex" vs-value="F" class="mr-4"  @input="changeDeb">Женский</vs-radio>
                            </div>
                        </div>
                        <h6 class="h6 mb-1"  style="margin-top: 10px">Снилс:<VarToClipboard name="d_snils"/></h6>
                        <vs-input class="w-100 mb-4" v-model="Deb.debtor.snils"  @change="changeDeb"></vs-input>
                        <span style="margin-bottom: 5px">
                            <h6 class="h6 mb-1">ИНН:<VarToClipboard name="d_inn"/></h6>
                        </span>
                        <vx-input-group class="w-100 mb-4">
                            <vs-input v-model="Deb.debtor.inn" @change="changeDeb" />

                            <template slot="append">
                                <div class="append-text btn-addon">
                                    <vs-button color="primary" @click="checkInn(false)">Определить</vs-button>
                                </div>
                            </template>
                        </vx-input-group>

                        <h6 class="h6 mb-1">Телефон:&nbsp;<span>Время: {{curtime}}Мск</span><VarToClipboard name="d_phone"/></h6>
                        <vs-input  class="w-full mb-4"  v-model="Deb.debtor.phone" @change="changeDeb"></vs-input>
                        <h6 class="h6 mb-1">Email:<VarToClipboard name="d_email"/></h6>
                        <vs-input class="w-full mb-4"    v-model="Deb.debtor.email" @change="changeDeb"></vs-input>
                    </div>

                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <div style="margin-bottom: 30px">
                            <h6 class="h6 mb-1">Адрес регистрации: <VarToClipboard name="d_address_reg"/> <span style="color: red;cursor: pointer;font-size: 12px" @click="showDataClick">Инфо</span></h6>

                          <div v-if="Deb.debtor.address_check">
                            <vs-input class="w-full" v-model="Deb.debtor.address_reg" @change="changeDeb"></vs-input>
                          </div>
                          <div v-else>
                            <VueSuggestions v-if="Deb.debtor.data_reg==null"
                                    @changeme="changeAddress"
                                    :model.sync="Deb.debtor.address_reg"
                                    :fias.sync="Deb.debtor.data_reg"
                                    :options="SuggestionOptionsAddress"
                                    style="color:red" >

                            </VueSuggestions>
                            <VueSuggestions v-else
                                            @changeme="changeAddress"
                                            :model.sync="Deb.debtor.address_reg"
                                            :fias.sync="Deb.debtor.data_reg"
                                            :options="SuggestionOptionsAddress"
                                            style="color:black" >

                            </VueSuggestions>
                          </div>
                          <vs-checkbox style="margin: 10px 0 15px;" v-model="Deb.debtor.address_check" @input="changeDeb">Не учитывать</vs-checkbox>
                            <div>
                                <h6 class="h6 mb-1">Почтовый адрес&nbsp;<VarToClipboard name="d_pochta_address"/><span style="color: red;cursor: pointer;font-size: 12px" @click="getPochtaAddress">Проверить</span></h6>
                                <vs-input class="w-full" v-model="Deb.debtor.pochta_address" @change="changeDeb"></vs-input>
                            </div>

                        </div>
                        <template v-if="Deb.debtor.data_reg!=null&&User.pag.showPer">
                            <h6 class="h6 mb-1">ФИАС код улицы:</h6>

                            <vx-input-group class="w-100">

                                <vs-input disabled v-model="Deb.debtor.data_reg.street_fias_id"  />

                                <template slot="append">
                                    <div class="append-text btn-addon">
                                        <vs-button color="warning" type="border" @click="showEditForm(Deb.debtor.data_reg.street_fias_id)">ИНФО</vs-button>
                                    </div>
                                </template>
                            </vx-input-group>
                    <!--        <h6 class="h6">geo_lat:</h6>
                            <vs-input class="w-full "  disabled  v-model="Deb.debtor.data_reg.geo_lat"></vs-input>
                            <h6 class="h6">geo_lon:</h6>
                            <vs-input class="w-full "  disabled  v-model="Deb.debtor.data_reg.geo_lon"></vs-input>
                            -->
                            <h6 class="h6">Дом.:</h6>
                            <vs-input class="w-full "  disabled  v-model="Deb.debtor.data_reg.house"></vs-input>


                        </template>

                        <div class="mt-8 " >
                            <h6 class="h6 mb-1">Судебный участок:<VarToClipboard name="dc_jud_number  Код суда"/></h6>

                            <vx-input-group class="w-100 mb-4">
                                <vs-input  v-model="Deb.debtorCredit.jud_number" @change="changeDebJud" />

                                <template slot="append">
                                    <div class="append-text btn-addon">
                                        <vs-button color="warning" type="border" @click="showJud=!showJud">ИНФО</vs-button>

                                        <vs-button color="primary" @click="setAnotherJud">Перепривязать</vs-button>
                                    </div>
                                </template>

                            </vx-input-group>
                            <template v-if="showJud">
                                <Jud :number="Deb.debtorCredit.jud_number" ></Jud>
                            </template>

                            <h6 class="h6 mb-1">Районный суд:<VarToClipboard name="dc_jud_number_area Код суда"/></h6>

                            <vx-input-group class="w-100 mb-4">
                                <vs-input disabled  v-model="Deb.debtorCredit.jud_number_area" @change="changeDebJud" />

                                <template slot="append">
                                    <div class="append-text btn-addon">
                                        <vs-button color="warning" type="border" @click="showJudArea=!showJudArea">ИНФО</vs-button>
                                    </div>
                                </template>

                            </vx-input-group>
                            <template v-if="showJudArea">
                                <JudArea :number="Deb.debtorCredit.jud_number_area" ></JudArea>
                            </template>

                            <vs-checkbox style="margin-left: 0px;" v-model="Deb.debtorCredit.dogovor_podsud" @input="changeDeb"><VarToClipboard name="dс_dogovor_podsud"/>Договорная подсудность</vs-checkbox>
                        </div>

                        <div class="mt-8 ">
                            <h6 class="h6">Статус гражданина:<VarToClipboard name="d_pensioner"/></h6>
                            <div class="mt-2">

                                <vs-radio v-model="Deb.debtor.pensioner" vs-value="0" vs-name="pensioner" class="mr-4" @input="changeDeb">Работающий</vs-radio>
                                <vs-radio v-model="Deb.debtor.pensioner" vs-value="1" vs-name="pensioner" class="mr-4" @input="changeDeb">Пенсионер</vs-radio>

                            </div>
                            <vs-checkbox class="mb-4 mt-2" style="margin-left: 0px;" v-model="Deb.debtor.pensioner_check" @input="changeDeb">Не учитывать</vs-checkbox>
                        </div>
                        <template v-if="Deb.debtor.pensioner==1">
                            <h6 class="h6">ПФР:</h6>
                            <vs-input class="w-full " disabled  v-model="pfr"></vs-input>
                        </template>

                        <h6 class="h6 mb-1">ФССП отдел: <span style="cursor: pointer;color: red;" @click="opredFssp">Определить</span> <span style="cursor: pointer;color: red;" @click="findFssp">Поиск</span><span v-if="User.email=='amitx@list.ru' || User.email=='miheevandrey1902@gmail.com'" style="cursor: pointer;color: red;padding-left: 30px;" @click="findFsspIp">Поиск по ИП</span>
                            <VarToClipboard name="d_fssp_otdel_code"/>
                            <VarToClipboard name="fssp_name"/>
                            <VarToClipboard name="fssp_address"/>

                        </h6>
<!--                        <vs-input class="w-full " disabled  v-model="fsspOtdel"></vs-input>-->
                        <v-select class="w-full mb-4 responsive_select" :reduce="label => label.fssp_code" label="name_code" :options="FsspOtdelArr"
                                v-model="Deb.debtor.fssp_otdel_code" @input="changeFsspOtdel"></v-select>
                        <h6 class="h6 mb-1">ФССП район:<VarToClipboard name="d_fssp_area_code Код отделения"/></h6>
                        <vs-input class="w-full mb-4" disabled  v-model="fsspRegion"></vs-input>
                        <vs-checkbox style="margin-left: 0px" v-model="Deb.debtor.send_fssp" @input="changeFsspOtdel">Отправить в управление</vs-checkbox>






                        <div style="margin-top: 10px">
                            <h6 class="h6 mb-1"> Адрес фактический: <VarToClipboard name="d_address_fact"/></h6>

                            <VueSuggestions
                                    @changeme="changeDeb"
                                    :model.sync="Deb.debtor.address_fact"
                                    :fias.sync="Deb.debtor.data_fact"
                                    :options="SuggestionOptionsAddress">
                            </VueSuggestions>
                        </div>
                        <template v-if="Deb.debtor.data_fact!=null&&User.pag.showPer">
                        <div style="margin-top: 40px"> </div>
                        <h6 class="h6 mb-1">ФИАС код улицы:</h6>
                        <vs-input class="w-full " disabled v-model="Deb.debtor.data_fact.street_fias_id"></vs-input>
                        <h6 class="h6 mb-1">Дом:</h6>
                        <vs-input class="w-full "  disabled  v-model="Deb.debtor.data_fact.house"></vs-input>

                        </template>

                        <h6 class="h6 mb-1" style="margin-top: 15px">ШПИ уведомления о покупки:<VarToClipboard name="dc_shpi_buy"/></h6>
                        <vs-input  class="w-100"  v-model="Deb.debtorCredit.shpi_buy" @change="changeDeb"></vs-input>

                        <h6 class="h6 mb-1" style="margin-top: 15px">Дата уведомления о покупки:<VarToClipboard name="dc_date_uved_debtor"/></h6>
                        <vs-input  type="date" class="w-100"  v-model="Deb.debtorCredit.date_uved_debtor" @blur="changeDeb"></vs-input>

                    </div>



                </div>

        <vs-popup class="holamundo" title="Инфо" :active.sync="showData">
            <template v-if="typeof Deb.debtor.data_reg!='undefined'">
            <json-viewer
                    :value="Deb.debtor.data_reg"
                    :expand-depth=5
                    copyable

                    sort></json-viewer>
            </template>
        </vs-popup>

        <vs-popup class="holamundo" :title="labelPop" :active.sync="popupActive">
          <template v-if="typeof ispl!='undefined'">
          <json-viewer
                    :value="ispl"
                    :expand-depth=5
                    copyable

                    sort></json-viewer>
            </template>
        </vs-popup>



        <vs-popup classContent="popup-example" title="Перепривязка судебного участка" :active.sync="popupResetJud">
            <ResetJud @reSetJud="reSetJud"></ResetJud>
        </vs-popup>





    </vx-card>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import Status from '../../../components/Status.vue'
    import r from '../../../route';
    import Jud from '../Jud.vue';
    import JudArea from '../JudArea.vue';
    import axios from '../../../axios'
    import VueSuggestions from '../../../components/vue-suggestions/vue-suggestionsChange.vue';
    import ResetJud from "../ResetJud.vue";
    import moment from 'moment';
    export default {
        components: { VueSuggestions,Status, Jud,JudArea,ResetJud
        },
        data () {
            return {
                popupResetJudArea:false,
                popupResetJud: false,
                showData:false,
                colorShowData:'black',
                showJudArea:false,
                labelPop:'Исполнительные производства',
                popupActive:false,
                showIndex: null,
                ispl:[],
                showJud:false,
                years:['2020','2019','2018'],

            }
        },
        mounted(){

            if(this.FsspOtdelArr.length==0){
                this.getFsspOtdelsArr()
            }
            if(this.FsspOtdelArr.length==0){
                this.getFsspOtdelsArr()
            }
            this.getBanksNameAndId();
            if(this.Deb.debtor.data_reg==null)this.colorShowData='red'
        },
        asyncComputed: {
            async judi() {


            },
            async pfr() {
                //   console.log(this.debtor.data_reg.region_kladr_id)
                if(this.Deb.debtor.data_reg!=null){
                    if(this.Deb.debtor.data_reg.region_kladr_id!=null && this.Deb.debtor.data_reg.region_kladr_id!=''){
                        const res = await  axios.get(r("pfr.index"), {
                            params: {
                                method: 'getPfrByKladrId',
                                param: this.Deb.debtor.data_reg.region_kladr_id
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
            async fsspRegion() {
                //   console.log(this.debtor.data_reg.region_kladr_id)
                if(this.Deb.debtor.data_reg!=null) {
                    if (this.Deb.debtor.data_reg.region_kladr_id != null && this.Deb.debtor.data_reg.region_kladr_id != '') {
                        const res = await  axios.get(r("fssp.index"), {
                            params: {
                                method: 'getRegFsspNameByCode',
                                param: this.Deb.debtor.fssp_area_code
                            }
                        })
                        //    console.log(res.data);
                        if (res.data.result) {
                            return this.Deb.debtor.fssp_area_code + ' ' + res.data.data;
                        }
                        else {
                            return ''
                        }

                    }
                    else {
                        return ''
                    }
                }

            },
            async fsspOtdel() {
                //   console.log(this.debtor.data_reg.region_kladr_id)
                if(this.Deb.debtor.data_reg!=null) {
                    if ((this.Deb.debtor.data_reg.area_kladr_id != null && this.Deb.debtor.data_reg.area_kladr_id != '') ||
                        (this.Deb.debtor.data_reg.city_kladr_id != null && this.Deb.debtor.data_reg.city_kladr_id != '')){
                        const res = await  axios.get(r("fssp.index"), {
                            params: {
                                method: 'getOtdelFsspNameByCode',
                                param: this.Deb.debtor.fssp_otdel_code
                            }
                        })
                        //    console.log(res.data);
                        if (res.data.result) {
                            return this.Deb.debtor.fssp_otdel_code + ' ' + res.data.data;
                        }
                        else {
                            return ''
                        }

                    }
                    else {
                        return ''
                    }
                }

            }
        },

        computed: {
            curtime(){

              let d =new Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"})
              return moment(d).format('HH:MM DD.MM.YYYY')
            },
            ...mapGetters([
                'StatussDebtorArr','Deb','BanksArr','User','FsspOtdelArr','SuggestionOptionsAddress','CountryCode'

            ]),


        },
        methods: {
            getPochtaAddress(){
                axios.post(r('debtors.update'), {
                    params: {
                        method: 'getPochtaAddress',
                        param: {
                            id_debtor:this.Deb.debtor.id,
                            id_credit:this.Deb.debtorCredit.id,
                            address:this.Deb.debtor.address_reg,
                        }
                    }
                }).then((response) => {
                    if (response.data.result){
                        this.Deb.debtor.pochta_address=''
                        if(typeof response.data.data.index!=='undefined')this.Deb.debtor.pochta_address+=response.data.data.index
                        if(typeof response.data.data.region !=='undefined')this.Deb.debtor.pochta_address+=' '+response.data.data.region
                        if(typeof response.data.data.area  !=='undefined')this.Deb.debtor.pochta_address+=' '+response.data.data.area
                        if(typeof response.data.data.place  !=='undefined')this.Deb.debtor.pochta_address+=' '+response.data.data.place
                        if(typeof response.data.data.location  !=='undefined')this.Deb.debtor.pochta_address+=' '+response.data.data.location
                        if(typeof response.data.data.street  !=='undefined')this.Deb.debtor.pochta_address+=' ул.'+response.data.data.street
                     //   if(typeof response.data.data.num-address-type  !=='undefined')this.Deb.debtor.pochta_address+=' '+response.data.data.num-address-type
                        if(typeof response.data.data.house!=='undefined')this.fssp.pochta_address+=' д. '+response.data.data.house
                        if(typeof response.data.data.hotel!=='undefined')this.fssp.pochta_address+=' гостиница '+response.data.data.hotel
                        if(typeof response.data.data.building!=='undefined')this.fssp.pochta_address+=' корп. '+response.data.data.building
                        if(typeof response.data.data.corpus!=='undefined')this.fssp.pochta_address+=' корп. '+response.data.data.corpus
                        if(typeof response.data.data.slash!=='undefined')this.fssp.pochta_address+=' /'
                        if(typeof response.data.data.letter!=='undefined')this.fssp.pochta_address+=' '+response.data.data.letter
                        if(typeof response.data.data.room!=='undefined')this.fssp.pochta_address+=' кв.'+response.data.data.room
                        this.changeDeb()
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

            showDataClick(){
                if(this.Deb.debtor.data_reg)this.showData=true
                else this.$vs.notify({
                    title: 'Ошибка',
                    text: 'Сведения отсутствуют',
                    color: 'danger',
                    position: 'top-center'
                })
            },
            addUlOtdel(){
                this.$vs.loading({ color: '#ff8000' })
                axios.post(r('fsspOtdelsAddress.update'), {
                    params: {
                        method: 'saveFsspOtdelsAddress',
                        param: {
                            address:this.Deb.debtor.address_reg,
                            fssp_number:this.Deb.debtor.fssp_otdel_code
                        }
                    }
                }).then((response) => {
                    if(this.$route.name=='fssp_refine_ospId'){
                        this.$router.back()
                    }
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.$vs.notify({
                            title: 'Сообщение',
                            text: 'Сохранено',
                            color: 'success',
                            position: 'top-center'
                        });
                    } else {
                        this.$vs.notify({
                            title: 'Сообщение',
                            text: 'Сохранить не удалось',
                            color: 'danger',
                            position: 'top-center'
                        });

                    }

                }).catch(error => {
                    if(this.$route.name=='fssp_refine_ospId'){
                        this.$router.back()
                    }
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });

            },
            changeFsspOtdel(){

                this.changeDeb().then(() => {
                    this.getDataDebtorsById(this.Deb.debtorCredit.id).then(() => {
                        if(this.User.set_fssp_to_sud&&this.Deb.debtorCredit.jud_number!=null&&this.Deb.debtor.fssp_otdel_code!=null&&this.Deb.debtorCredit.dogovor_podsud==0){
                          this.$vs.dialog({
                            type: 'confirm',
                            color: 'primary',
                            title: 'Удаление',
                            text: `Вы хотите привязать отдел `+this.Deb.debtor.fssp_otdel_code+' к суд участку '+this.Deb.debtorCredit.jud_number,
                            accept: this.setSudOtdel,
                            acceptText: 'Да',
                            cancelText: 'Нет'
                          })
                        }
                    })
                })
          },
            closeDialog(){
                if(this.$route.name=='fssp_refine_ospId'){
                    this.$router.back()
                }
            },
            setSudOtdel(){
              axios.post(r("judicial.index"), {
                params: {
                  method: 'setSudOtdel',
                  param: {
                      otdel:this.Deb.debtor.fssp_otdel_code,
                      jud_number:this.Deb.debtorCredit.jud_number,
                  }

                }
              }).then((response) => {
                if (response.data.result){

                }



              })

            },
            setAnotherJudArea(){
                this.popupResetJudArea = true;

            },
            setAnotherJud(){
                this.popupResetJud = true;
            },
            reSetJud(){
                this.popupResetJud = false;
                this.setJud();
            },
            changeDebJud(){
                this.changeDebUpdate()
            },
            showIndexProc(index){
                if(this.showIndex!=index){
                    this.showIndex = index
                }
                else{
                    this.showIndex = null
                }

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
            checkFssp(){
                this.$vs.loading({ color: '#ff8000' })
                axios.post(r("debtors.index"), {
                    params: {
                        method: 'getFssp',
                        param: this.Deb.debtor

                    }
                }).then((response) => {

                    this.$vs.loading.close()
                    if (response.data.result){
                        //  this.debtor.inn=response.data.data;
                        let res=response.data.mess.response.result[0];

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
            setJudArea(){
                this.$vs.loading({ color: '#ff8000' })
                axios.post(r("jurisdiction.index"), {
                    params: {
                        method: 'setJurisdictions',
                        param: this.Deb.debtor

                    }
                }).then((response) => {
                    this.$vs.loading.close()
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
            setJud(){
                if(this.Deb.debtor.data_reg==null){
                    this.$vs.notify({  title:'Ошибка', text: 'Проверте адрес' , color: 'danger', position: 'top-center' })
                }else{
                    this.Deb.debtor.id_credit=this.Deb.debtorCredit.id
                    this.$vs.loading({ color: '#ff8000' })
                    axios.post(r("jurisdiction.index"), {
                        params: {
                            method: 'setJurisdictions',
                            param: this.Deb.debtor

                        }
                    }).then((response) => {
                        this.$vs.loading.close()
                        if (response.data.result){
                            this.getDataDebtorsById(this.Deb.debtorCredit.id)
                            this.$vs.notify({  title:'Успешно', text: response.data.mess , color: 'success', position: 'top-center' })
                        }
                        else{

                            this.$vs.notify({  title:'Ошибка', text: response.data.error.data_reg , color: 'danger', position: 'top-center' })
                        }
                        //   console.log(response.data)


                    }).catch(error => {
                        this.$vs.loading.close()
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: error.message,
                            color: 'danger',
                            position: 'top-center'
                        })
                    })
                }

            },
            checkInn(fla){
                let flag=false;
                if (this.Deb.debtor.name==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Имя  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.Deb.debtor.name_family==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Фамилия  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.Deb.debtor.name_patronymic==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Отчество  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.Deb.debtor.birthdate==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Дата рождения  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.Deb.debtor.series==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Серия паспорта  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.Deb.debtor.number==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Номер паспорта  !!!', color: 'danger', position: 'top-center' })
                }
                this.$vs.loading({ color: '#ff8000' })
                if(!flag){
                    axios.post(r("debtors.index"), {
                        params: {
                            method: 'getInn',
                            param: this.Deb.debtor

                        }
                    }).then((response) => {

                        this.$vs.loading.close()
                        if (response.data.result){
                            this.Deb.debtor.inn=response.data.data;
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
            close(){

                this.$router.back()
            },
            changeAddress(){
                axios.post(r("debtorAll.update"), {
                    params: {
                        method: 'changeAddress',
                        param: this.Deb
                    }
                }).then((response) => {
                    if(response.data.result){
                        this.Deb.debtor.fssp_area_code=response.data.fssp_area_code
                        this.Deb.debtor.fssp_otdel_code=response.data.fssp_otdel_code

                    }




                })
            },
            findFsspIp(){
                if(this.Deb.debtor.data_reg==null){
                    this.$vs.notify({  title:'Ошибка', text: 'Проверте адрес' , color: 'danger', position: 'top-center' })
                }else{
                    this.$vs.loading({ color: '#ff8000' })
                    axios.post(r('fssp.update'), {
                        params: {
                            method: 'findFsspIp',
                            param: this.Deb.debtorCredit.id
                        }
                    }).then((response) => {
                        this.$vs.loading.close()
                        if (response.data.result){
                          if (response.data.no_found){
                            this.$vs.notify({
                              title: 'Сообщение',
                              text: 'По вашему запросу ничего не найдено',
                              color: 'success',
                              position: 'top-center'
                            });
                          } else {
                            this.getDataDebtorsById(this.Deb.debtorCredit.id).then(() => {
                              this.$vs.notify({
                                title: 'Сообщение',
                                text: 'Найдено',
                                color: 'success',
                                position: 'top-center'
                              });
                            })
                          }
                        } else {
                            this.getDataDebtorsById(this.Deb.debtorCredit.id).then(() => {
                                if(response.data.find){
                                    this.$vs.notify({
                                        title: 'Сообщение',
                                        text: 'Найдено но в базе нет ' + response.data.find,
                                        color: 'danger',
                                        position: 'top-center'
                                    });
                                }else{
                                    this.$vs.notify({
                                        title: 'Сообщение',
                                        text: 'Ошибка при поиске',
                                        color: 'danger',
                                        position: 'top-center'
                                    });
                                }

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
                }



            },
            findFssp(){
                if(this.Deb.debtor.data_reg==null){
                    this.$vs.notify({  title:'Ошибка', text: 'Проверте адрес' , color: 'danger', position: 'top-center' })
                }else{
                    this.$vs.loading({ color: '#ff8000' })
                    axios.post(r('fssp.update'), {
                        params: {
                            method: 'findFsspBySite',
                            param: this.Deb.debtor.id
                        }
                    }).then((response) => {
                        this.$vs.loading.close()
                        if (response.data.result){
                            this.getDataDebtorsById(this.Deb.debtorCredit.id).then(() => {
                                this.$vs.notify({
                                    title: 'Сообщение',
                                    text: 'Найдено',
                                    color: 'success',
                                    position: 'top-center'
                                });
                            })
                        } else {
                            this.getDataDebtorsById(this.Deb.debtorCredit.id).then(() => {
                                if(response.data.find){
                                    this.$vs.notify({
                                        title: 'Сообщение',
                                        text: 'Найдено но в базе нет ' + response.data.find,
                                        color: 'danger',
                                        position: 'top-center'
                                    });
                                }else{
                                    this.$vs.notify({
                                        title: 'Сообщение',
                                        text: 'Не найдено',
                                        color: 'danger',
                                        position: 'top-center'
                                    });
                                }

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
                }



            },
            opredFssp(){
              if(this.Deb.debtor.data_reg==null){
                  this.$vs.notify({  title:'Ошибка', text: 'Проверте адрес' , color: 'danger', position: 'top-center' })
              }else{
                  this.$vs.loading({ color: '#ff8000' })
                  axios.post(r('fssp.update'), {
                      params: {
                          method: 'opredFssps',
                          param: this.Deb.debtor.id
                      }
                  }).then((response) => {
                      this.$vs.loading.close()
                      if (response.data.result){

                          this.getDataDebtorsById(this.Deb.debtorCredit.id).then(() => {
                              this.$vs.notify({
                                  title: 'Сообщение',
                                  text: 'Найдено',
                                  color: 'success',
                                  position: 'top-center'
                              });
                          })
                      } else {
                          this.getDataDebtorsById(this.Deb.debtorCredit.id).then(() => {
                              this.$vs.notify({
                                  title: 'Сообщение',
                                  text: 'Не найдено',
                                  color: 'danger',
                                  position: 'top-center'
                              });
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
              }



          },
            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getBanksNameAndId','changeDeb','changeDebUpdate',
             'getFsspOtdelsArr','getBanksListSudOrder','opredFssps','getCountryCode'
            ]),


        },
    }
</script>

<style lang="scss">
    .vs-popup {
        display: inline-table;
    }
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
    .checkbox_x.vs-checkbox{
        min-width: 20px;
    }

</style>
