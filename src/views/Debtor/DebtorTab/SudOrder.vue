<template>
    <vx-card no-shadow>


        <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <template v-if="typeof Deb.sudOrder.id!='undefined'">
                    <Status :id_credit="Deb.sudOrder.id" class="h6"></Status>
                </template>
                <div class="vx-row" style="padding-top: 20px">
                    <div class="vx-col sm:w-1/2 w-full mb-2">

                      <div class="centerx">
                        <vs-tooltip text="Организация, в пользу или которой выдан исполнительный документ" position="top" >
                          <h6 class="h6 mb-1">Взыскатель:<VarToClipboard name="r_name"/></h6>
                        </vs-tooltip>
                      </div>
                      <vs-input class="w-100 mb-4"  v-model="Deb.recover.name"></vs-input>

                      <div class="centerx">
                        <vs-tooltip text="Организация которая передает права на взыскание долга" position="top" >
                          <h6 class="h6 mb-1">Цедент:<VarToClipboard name="r_namePerv"/></h6>
                        </vs-tooltip>
                      </div>
                      <vs-input class="w-100 mb-4"  v-model="Deb.recover.namePerv"></vs-input>

                      <h6 class="h6">ID_Суд Ордера:<VarToClipboard name="so_id"/></h6>
                        <vs-input class="w-50 "  v-model="Deb.sudOrder.id" disabled ></vs-input>
                        <h6 class="h6" style="margin-top: 25px">Фамилия:<VarToClipboard name="d_name_family"/></h6>
                        <vs-input class="w-100 "  v-model="Deb.debtor.name_family"></vs-input>
                        <h6 class="h6">Предыдущая фамилия:<VarToClipboard name="d_name_family_last"/></h6>
                        <vs-input class="w-100 "  v-model="Deb.debtor.name_family_last"></vs-input>
                        <h6 class="h6">Имя:<VarToClipboard name="d_name"/></h6>
                        <vs-input class="w-100 " v-model="Deb.debtor.name"></vs-input>
                        <h6 class="h6">Отчество:<VarToClipboard name="d_name_patronymic"/></h6>
                        <vs-input class="w-100 "  v-model="Deb.debtor.name_patronymic"></vs-input>
                        <h6 class="h6">Дата рождения:<VarToClipboard name="d_birthdate"/></h6>
                        <vs-input type="date" class="w-100 " v-model="Deb.debtor.birthdate"></vs-input>
                        <h6 class="h6" style="margin-top: 15px">Номер договора:<VarToClipboard name="dc_number_dog"/></h6>
                        <vs-input class="w-100"  v-model="Deb.debtorCredit.number_dog"></vs-input>
                        <h6 class="h6">Дата договора:<VarToClipboard name="dc_date_dog"/></h6>
                        <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_dog"></vs-input>

                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <h6 class="h6" style="margin-top: 15px">Статус гражданина:<VarToClipboard name="d_pensioner"/></h6>

                        <div class="mt-2">

                            <vs-radio v-model="Deb.debtor.pensioner" vs-value="0" vs-name="pensioner" class="mr-4" @input="changeDeb">Работающий</vs-radio>
                            <vs-radio v-model="Deb.debtor.pensioner" vs-value="1" vs-name="pensioner" class="mr-4" @input="changeDeb">Пенсионер</vs-radio>
                        </div>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.debtor.pensioner_check" @input="changeDeb">Не учитывать</vs-checkbox>
                        <h6 class="h6">№ СА судебные расходы:<VarToClipboard name="so_number_sa_rachod"/></h6>
                        <vs-input  class="w-100"  v-model="Deb.sudOrder.number_sa_rachod"  @change="changeDeb"></vs-input>
                        <h6 class="h6">Дата судебные расходы:<VarToClipboard name="so_date_sud_rachod"/></h6>
                        <vs-input type="date" class="w-100"  v-model="Deb.sudOrder.date_sud_rachod"  @blur="changeDeb"></vs-input>
                        <h6 class="h6">Cудебные расходы сумма:<VarToClipboard name="so_sum"/></h6>
                        <vs-input  type="number" class="w-100"  v-model="Deb.sudOrder.sum"  @change="changeDebUpdate"></vs-input>
                        <h6 class="h6">Cудебные расходы остаток:<VarToClipboard name="so_ocs_sum"/></h6>
                        <vs-input  type="number" class="w-100"  v-model="Deb.sudOrder.ocs_sum"  @change="changeDeb"></vs-input>
                        <h6 class="h6">Название Банка:<VarToClipboard name="so_find_sa"/></h6>
                        <vs-input  class="w-100"  v-model="Deb.sudOrder.find_sa" @change="changeDeb"></vs-input>



                    </div>
                </div>




            </div>

            <div class="vx-col sm:w-1/2 w-full mb-2" style="border: 1px;">

                <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

                    <div class="vx-col w-1/4  mb-2" style="border: 1px;">
                        <h6 class="h6" style="margin-top: 15px">Сбербанк:<VarToClipboard name="so_bank_sber"/></h6>

                        <div class="mt-2">

                            <vs-radio v-model="Deb.sudOrder.bank_sber" vs-value="1" vs-name="bank_sber" class="mr-4" @input="changeDeb">Есть</vs-radio>
                            <vs-radio v-model="Deb.sudOrder.bank_sber" vs-value="2" vs-name="bank_sber" class="mr-4" @input="changeDeb">Нет</vs-radio>


                        </div>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.sudOrder.bank_sber_check" @input="changeDeb">Нет возможности взыскать</vs-checkbox>
                    </div>
                    <div class="vx-col w-1/4  mb-2" style="border: 1px;">
                        <h6 class="h6" style="margin-top: 15px">Альфа:<VarToClipboard name="so_bank_alfa"/></h6>

                        <div class="mt-2">

                            <vs-radio v-model="Deb.sudOrder.bank_alfa" vs-value="1" vs-name="bank_alfa" class="mr-4" @input="changeDeb">Есть</vs-radio>
                            <vs-radio v-model="Deb.sudOrder.bank_alfa" vs-value="2" vs-name="bank_alfa" class="mr-4" @input="changeDeb">Нет</vs-radio>


                        </div>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.sudOrder.bank_alfa_check" @input="changeDeb">Нет возможности взыскать</vs-checkbox>
                    </div>
                    <div class="vx-col w-1/4  mb-2" style="border: 1px;">
                        <h6 class="h6" style="margin-top: 15px">Совкомбанк:<VarToClipboard name="so_bank_sovcom"/></h6>

                        <div class="mt-2">

                            <vs-radio v-model="Deb.sudOrder.bank_sovcom" vs-value="1" vs-name="bank_sovcom" class="mr-4" @input="changeDeb">Есть</vs-radio>
                            <vs-radio v-model="Deb.sudOrder.bank_sovcom" vs-value="2" vs-name="bank_sovcom" class="mr-4" @input="changeDeb">Нет</vs-radio>


                        </div>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.sudOrder.bank_sovcom_check" @input="changeDeb">Нет возможности взыскать</vs-checkbox>
                    </div>
                    <div class="vx-col w-1/4  mb-2" style="border: 1px;">
                        <h6 class="h6" style="margin-top: 15px">ВТБ:<VarToClipboard name="so_bank_vtb"/></h6>

                        <div class="mt-2">

                            <vs-radio v-model="Deb.sudOrder.bank_vtb" vs-value="1" vs-name="bank_vtb" class="mr-4" @input="changeDeb">Есть</vs-radio>
                            <vs-radio v-model="Deb.sudOrder.bank_vtb" vs-value="2" vs-name="bank_vtb" class="mr-4" @input="changeDeb">Нет</vs-radio>


                        </div>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.sudOrder.bank_vtb_check" @input="changeDeb">Нет возможности взыскать</vs-checkbox>
                    </div>


                </div>

                <div class="vx-row" style="padding-top: 5px">
                    <vs-button color="success" class="pull-right" type="filled"  @click="pfr">Заявление в ПФ РФ</vs-button>
                </div>
                <div class="vx-row" style="padding-top: 5px">
                    <vs-button color="success" class="pull-right" type="filled"  @click="fssp">Заявление в ФССП РФ </vs-button>
                </div>


                <BanksListSudOrder></BanksListSudOrder>

            </div>



        </div>
<!--        <div class="vx-col sm:w-1/2 w-full mb-2">-->
<!--            -->
<!--        </div>-->






    </vx-card>
</template>

<script>
    import Vue from 'vue'
    import r from '../../../route';
    import axios from '../../../axios'
    import AsyncComputed from 'vue-async-computed'
    import JsonViewer from 'vue-json-viewer'
    import VueDadata from 'vue-dadata'
    import { mapActions,mapGetters } from 'vuex'
    import VueSuggestions from 'vue-suggestions';
    import vSelect from 'vue-select'
    import Status from '../../../components/StatusSudOrder.vue'
    import BanksListSudOrder from '../../Bank/BanksListSudOrder.vue'
    import VarToClipboard from './../../VarToClipboard.vue'
    Vue.use(AsyncComputed)
    export default {
        components: { VueSuggestions,Status,BanksListSudOrder,  'v-select': vSelect,VarToClipboard,
        },
        data () {
            return {

                years:['2021','2020','2019','2018','2017','2016','2015','2014','2013','2012','2011','2010','2009','2008']
            }
        },
        mounted(){
            this.getBanksNameAndId();
        },
        asyncComputed: {

        },
        computed: {

            ...mapGetters([
                'StatussDebtorArr','Deb','BanksArr','User'

            ]),


        },
        methods: {
            fssp(){
                this.$vs.loading({ color: '#ff8000' })
                axios.get(r("document.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getFsspSudOrder',
                        param:this.Deb.sudOrder.id,




                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    //console.log(response.data);
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                    //  console.log(url);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'FSSP_'+this.Deb.debtor.name_family+'_'+this.Deb.debtor.name+'_'+this.Deb.debtor.name_patronymic+'_.pdf');
                    document.body.appendChild(link);
                    link.click();


                }).catch(error => {
                    this.$vs.loading.close()
                    //   this.popupActive3=false;

                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка!!!',
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },
            pfr(){
                this.$vs.loading({ color: '#ff8000' })
                axios.get(r("document.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getPfrSudOrder',
                        param:this.Deb.sudOrder.id,




                    }
                }).then((response) => {
                    this.$vs.loading.close()

                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                    //  console.log(url);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'PF_'+this.Deb.debtor.name_family+'_'+this.Deb.debtor.name+'_'+this.Deb.debtor.name_patronymic+'_.pdf');
                    document.body.appendChild(link);
                    link.click();


                }).catch(error => {
                    this.$vs.loading.close()
                    //   this.popupActive3=false;

                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка!!!',
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },
            close(){

                this.$router.back()
            },
            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getBanksNameAndId','changeDeb','changeDebUpdate'
            ]),


        },
    }
</script>

<style lang="scss">
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

</style>
