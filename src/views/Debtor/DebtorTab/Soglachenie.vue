<template>
    <vx-card no-shadow>
        <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <template v-if="typeof Deb.debtorCredit.id!='undefined'">
                    <Status :id_credit="Deb.debtorCredit.id" class="h6"></Status>
                </template>
                <div class="vx-row" style="padding-top: 20px">
                    <div class="vx-col sm:w-1/2 w-full mb-2">

                        <h6 class="h6">Взыскатель:</h6>
                        <vs-input class="w-100" readonly v-model="Deb.recover.name"></vs-input>
                        <h6 class="h6">Цедент:</h6>
                        <vs-input class="w-100 "  readonly v-model="Deb.recover.namePerv"></vs-input>
                        <h6 class="h6" style="margin-top: 25px">Фамилия:<VarToClipboard name="d_name_family"/></h6>
                        <vs-input class="w-100 "  v-model="Deb.debtor.name_family" @change="changeDeb"></vs-input>
                        <h6 class="h6">Предыдущая фамилия:<VarToClipboard name="d_name_family_last"/></h6>
                        <vs-input class="w-100 "   v-model="Deb.debtor.name_family_last" @change="changeDeb"></vs-input>
                        <h6 class="h6">Имя:<VarToClipboard name="d_name"/></h6>
                        <vs-input class="w-100 "  v-model="Deb.debtor.name" @change="changeDeb"></vs-input>
                        <h6 class="h6">Отчетсво:<VarToClipboard name="d_name_patronymic"/></h6>
                        <vs-input class="w-100 "   v-model="Deb.debtor.name_patronymic" @change="changeDeb"></vs-input>
                        <h6 class="h6">Дата рождения:<VarToClipboard name="d_birthdate"/></h6>
                        <vs-input type="date" class="w-100 " readonly v-model="Deb.debtor.birthdate" @blur="changeDeb"></vs-input>
                        <h6 class="h6" style="margin-top: 15px">Номер договора:<VarToClipboard name="dc_number_dog"/></h6>
                        <vs-input class="w-100"   v-model="Deb.debtorCredit.number_dog" @change="changeDeb"></vs-input>
                        <h6 class="h6">Дата договора:<VarToClipboard name="dc_date_dog"/></h6>
                        <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_dog" @blur="changeDeb"></vs-input>
                        <h6 class="h6" style="margin-top: 15px">Статус гражданина:<VarToClipboard name="d_pensioner"/></h6>

                        <div class="mt-2">

                            <vs-radio v-model="Deb.debtor.pensioner" vs-value="0" vs-name="pensioner" class="mr-4" @input="changeDeb">Работающий</vs-radio>
                            <vs-radio v-model="Deb.debtor.pensioner" vs-value="1" vs-name="pensioner" class="mr-4" @input="changeDeb">Пенсионер</vs-radio>
                        </div>

                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <h6 class="h6">Сумма долга:<VarToClipboard name="dc_dolg_sum"/></h6>
                        <vs-input type="number" readonly class="w-100 "  v-model="Deb.debtorCredit.dolg_sum" @change="changeDeb"></vs-input>


                    </div>
                </div>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2" style="border: 1px;">
                <fieldset class="f" >
                    <legend class="l">Соглашение:</legend>
                    <div class="vx-row" style="padding-top: 20px; padding-left: 15px">
                      <h5 class="" style="padding-left: 15px;color: orangered">Статус:
                         <div class="vx-row">
                            <div class="vx-col">
                                <vs-checkbox v-model="Deb.soglashenie.status" @input="saveSoglashenieStatus"></vs-checkbox>
                            </div>
                            <div class="vx-col" style="margin-left: -30px">
                                <template v-if="Deb.soglashenie.status==1">
                                    Заключено
                                </template>
                                <template v-else>
                                    Не Заключено
                                </template>
                            </div>
                         </div>
                      </h5>
                    </div>
                    <div class="vx-row" >
                      <div style="margin-left: 15px;margin-top: 5px" class="vx-col sm:w-1/2 w-full mb-2">
                        <vs-checkbox v-model="Deb.soglashenie.auto" @input="saveSoglashenieStatus">Автоматический контроль</vs-checkbox>
                      </div>
                    </div>
                    <div class="vx-row" style="padding-top: 20px; padding-left: 15px">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <h6 class="h6">Дата соглашения:</h6>
                            <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date" @blur="saveSoglashenieStatus"></vs-input>
                        </div>
                    </div>

                    <div class="vx-row" style="padding-top: 20px; padding-left: 15px">


                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <h6 class="h6">Дата 1 платежа:</h6>
                            <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date1" @blur="saveSoglashenieStatus"></vs-input>
                            <h6 class="h6">Дата 2 платежа:</h6>
                            <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date2" @blur="saveSoglashenieStatus"></vs-input>
                            <h6 class="h6">Дата 3 платежа:</h6>
                            <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date3" @blur="saveSoglashenieStatus"></vs-input>
                            <h6 class="h6">Дата 4 платежа:</h6>
                            <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date4" @blur="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Дата 5 платежа:</h6>
                          <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date5" @blur="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Дата 6 платежа:</h6>
                          <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date6" @blur="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Дата 7 платежа:</h6>
                          <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date7" @blur="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Дата 8 платежа:</h6>
                          <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date8" @blur="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Дата 9 платежа:</h6>
                          <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date9" @blur="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Дата 10 платежа:</h6>
                          <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date10" @blur="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Дата 11 платежа:</h6>
                          <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date11" @blur="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Дата 12 платежа:</h6>
                          <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date12" @blur="saveSoglashenieStatus"></vs-input>
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <h6 class="h6">Сумма 1 платежа:</h6>
                            <vs-input  class="w-100" v-model="Deb.soglashenie.sum1" @change="saveSoglashenieStatus"></vs-input>
                            <h6 class="h6">Сумма 2 платежа:</h6>
                            <vs-input class="w-100" v-model="Deb.soglashenie.sum2" @change="saveSoglashenieStatus"></vs-input>
                            <h6 class="h6">Сумма 3 платежа:</h6>
                            <vs-input  class="w-100" v-model="Deb.soglashenie.sum3" @change="saveSoglashenieStatus"></vs-input>
                            <h6 class="h6">Сумма 4 платежа:</h6>
                            <vs-input class="w-100" v-model="Deb.soglashenie.sum4" @change="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Сумма 5 платежа:</h6>
                          <vs-input  class="w-100" v-model="Deb.soglashenie.sum5" @change="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Сумма 6 платежа:</h6>
                          <vs-input class="w-100" v-model="Deb.soglashenie.sum6" @change="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Сумма 7 платежа:</h6>
                          <vs-input  class="w-100" v-model="Deb.soglashenie.sum7" @change="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Сумма 8 платежа:</h6>
                          <vs-input class="w-100" v-model="Deb.soglashenie.sum8" @change="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Сумма 9 платежа:</h6>
                          <vs-input  class="w-100" v-model="Deb.soglashenie.sum9" @change="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Сумма 10 платежа:</h6>
                          <vs-input class="w-100" v-model="Deb.soglashenie.sum10" @change="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Сумма 11 платежа:</h6>
                          <vs-input  class="w-100" v-model="Deb.soglashenie.sum11" @change="saveSoglashenieStatus"></vs-input>
                          <h6 class="h6">Сумма 12 платежа:</h6>
                          <vs-input class="w-100" v-model="Deb.soglashenie.sum12" @change="saveSoglashenieStatus"></vs-input>
                        </div>
                    </div>

                    <div class="vx-row" style="padding-top: 20px; padding-left: 15px">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <h6 class="h6">Код:</h6>
                            <vs-input  class="w-100" v-model="Deb.soglashenie.code" @change="saveSoglashenieStatus"></vs-input>
                        </div>





                    </div>


                </fieldset>

            </div>

        </div>







    </vx-card>
</template>

<script>
    import Vue from 'vue'
    import AsyncComputed from 'vue-async-computed'
    import JsonViewer from 'vue-json-viewer'
    import VueDadata from 'vue-dadata'
    import { mapActions,mapGetters } from 'vuex'
    import VueSuggestions from 'vue-suggestions';
    import vSelect from 'vue-select'
    import Status from '../../../components/Status.vue'
    import r from '../../../route';
    import axios from '../../../axios';
    import VarToClipboard from './../../VarToClipboard.vue'
    Vue.use(AsyncComputed)
    export default {
        components: { VueSuggestions,Status,  'v-select': vSelect,VarToClipboard,
        },
        data () {
            return {

                years:['2020','2019','2018']
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
            saveSoglashenieStatus(){
                axios.post(r('sogl.update'), {
                    params: {
                        method: 'saveSoglashenieStatus',
                        param: {id_credit:this.Deb.debtorCredit.id,sogl:this.Deb.soglashenie}
                    }
                }).then(res=>{
                     if(res.data.result){

                     }
                     else{
                         this.$vs.notify({
                               title: 'Ошибка',
                               text: 'Ошибка !!!',
                               color: 'danger',
                               position: 'top-center'
                           })
                     }
                }).catch(e=>{
                    this.$vs.notify({
                                title: 'Ошибка',
                                text: 'Ошибка !!!',
                                color: 'danger',
                                position: 'top-center'
                            })
                })
            },
            close(){

                this.$router.back()
            },
            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getBanksNameAndId','changeDeb'
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
    .checkbox_x.vs-checkbox{
        min-width: 20px;
    }

</style>
