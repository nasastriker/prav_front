<template>
    <div>
        <fieldset class="f" style="margin-top: 15px" >
            <legend class="l">{{Deb.debtor.name_family}} {{Deb.debtor.name}} {{Deb.debtor.name_patronymic}}:</legend>
            <div class="vx-row" style="padding-top: 20px;padding-left: 10px; padding-right: 10px">
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <template v-if="typeof Deb.debtorCredit.id!='undefined'">
                        <Status :id_credit="Deb.debtorCredit.id" class="h6" ref="status"></Status>
                    </template>
                    <div class="vx-row" style="padding-top: 20px;padding-left: 10px; padding-right: 10px">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <h6 class="h6">Особые пометки:</h6>
                            <vs-textarea class="w-100"  v-model="Deb.debtorCredit.comment" @input="changeDeb"> </vs-textarea>

                            <h6 class="h6">Взыскатель:</h6>
                            <vs-input class="w-100" readonly v-model="Deb.recover.name"></vs-input>
                            <h6 class="h6">Цедент:</h6>
                            <vs-input class="w-100 "  readonly v-model="Deb.recover.namePerv"></vs-input>
                            <h6 class="h6" style="margin-top: 25px">Фамилия:</h6>
                            <vs-input class="w-100 " readonly v-model="Deb.debtor.name_family"></vs-input>
                            <h6 class="h6">Имя:</h6>
                            <vs-input class="w-100 " readonly v-model="Deb.debtor.name"></vs-input>
                            <h6 class="h6">Отчетсво:</h6>
                            <vs-input class="w-100 " readonly  v-model="Deb.debtor.name_patronymic"></vs-input>
                            <h6 class="h6">Дата рождения:</h6>
                            <vs-input type="date" class="w-100 " readonly v-model="Deb.debtor.birthdate"></vs-input>
                            <h6 class="h6" style="margin-top: 15px">Номер договора:</h6>
                            <vs-input class="w-100"  readonly v-model="Deb.debtorCredit.number_dog"></vs-input>
                            <h6 class="h6">Дата договора:</h6>
                            <vs-input type="date" class="w-100"readonly v-model="Deb.debtorCredit.date_dog"></vs-input>
                            <h6 class="h6">Сумма долга:</h6>
                            <vs-input type="number" readonly class="w-100 "  v-model="Deb.debtorCredit.dolg_sum" @change="changeDeb"></vs-input>
                            <h6 class="h6" >Госпошлина:</h6>
                            <vs-input class="w-100 "  v-model="Deb.debtorCredit.gospohlina" @change="changeDeb"></vs-input>
                            <h6 class="h6" style="margin-top: 15px">Статус гражданина:</h6>

                            <div class="mt-2">

                                <vs-radio v-model="Deb.debtor.pensioner" vs-value="0" vs-name="pensioner" class="mr-4" @input="changeDeb">Работающий</vs-radio>
                                <vs-radio v-model="Deb.debtor.pensioner" vs-value="1" vs-name="pensioner" class="mr-4" @input="changeDeb">Пенсионер</vs-radio>
                            </div>
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">

                            <h6 class="h6" >№ИП:</h6>
                            <vs-input  class="w-100"  v-model="Deb.debtorCredit.number_ip"  @change="changeDeb"></vs-input>
                            <h6 class="h6">Дата жалоба ФССП нет ИП:</h6>
                            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.fssp_date"  @blur="changeDeb"></vs-input>
                            <h6 class="h6">Дата ходатайства ФССП по ведению ИП:</h6>
                            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.fssp_hod_date"  @blur="changeDeb"></vs-input>
                            <h6 class="h6">Дата жалоба ФССП по ведению ИП:</h6>
                            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.fssp_ved_date"  @blur="changeDeb"></vs-input>
                            <h6 class="h6">ИП окончено Дата:</h6>
                            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.fssp_close_date"  @blur="changeDeb"></vs-input>

                            <h6 class="h6" style="margin-top: 15px">№ СА:</h6>
                            <vs-input class="w-100"  v-model="Deb.debtorCredit.number_sa"  @change="changeDeb"> </vs-input>
                            <h6 class="h6">Дата СА:</h6>
                            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_sa"  @blur="changeDeb"></vs-input>
                            <h6 class="h6">№ СА судебные расходы:</h6>
                            <vs-input  class="w-100"  v-model="Deb.sudOrder.number_sa_rachod"  @change="changeDeb"></vs-input>
                            <h6 class="h6">Дата судебные расходы:</h6>
                            <vs-input type="date" class="w-100"  v-model="Deb.sudOrder.date_sud_rachod"  @blur="changeDeb"></vs-input>
                        </div>
                    </div>



                </div>

                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <fieldset class="f" >
                        <legend class="l">Cведения из ответов ФССП РФ:</legend>
                        <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="Deb.debtorCredit.fssp_dsip" @input="changeDeb"> Поступление ДС по ИП</vs-checkbox>


                            </div>


                            <div class="vx-col w-2/4  mb-2" >
                                <vs-checkbox v-model="Deb.debtorCredit.fssp_postds" @input="changeDeb">

                                    Постановление о распределении ДС
                                </vs-checkbox>
                            </div>



                        </div>

                        <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="Deb.debtorCredit.fssp_mvd" @input="changeDeb" style="min-width: 20px;">Запрос в ГИБДД МВД России на получения сведений о зарегистрированных автомототранспортных средствах</vs-checkbox>

                            </div>
                            <div class="vx-col w-2/4  mb-2" >
                                <vs-checkbox v-model="Deb.debtorCredit.fssp_transport" @input="changeDeb">Постановление об аресте транспортного средства (транспорт)</vs-checkbox>
                            </div>



                        </div>


                        <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="Deb.debtorCredit.fssp_rosreestr" @input="changeDeb">Запрос в Росреестр (ФНС к ЕГРН)</vs-checkbox>

                            </div>
                            <div class="vx-col w-2/4  mb-2" >
                                <vs-checkbox v-model="Deb.debtorCredit.fssp_nedvizh" @input="changeDeb">Постановление об аресте недвижимого имущества</vs-checkbox>
                            </div>



                        </div>


                        <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="Deb.debtorCredit.fssp_fns" @input="changeDeb">Запрос о счетатах должника-ФЛ в ФНС</vs-checkbox>

                            </div>
                            <div class="vx-col w-2/4  mb-2" >
                                <vs-checkbox v-model="Deb.debtorCredit.fssp_bank" @input="changeDeb">Постановление об обращении взыскания на ДС должника, находящиеся в банке или иной кредитной организации (кредит)</vs-checkbox>
                            </div>



                        </div>


                        <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="Deb.debtorCredit.fssp_pfr" @input="changeDeb">Запрос в ПФР на получение сведения о заработной плате, иных выплатах и вознаграждениях застрахованного лица (ПФР)</vs-checkbox>

                            </div>
                            <div class="vx-col w-2/4  mb-2" >
                                <vs-checkbox v-model="Deb.debtorCredit.fssp_zarplata" @input="changeDeb">Постановление об обращении взыскания на заработную плату и иные доходы должника</vs-checkbox>
                            </div>



                        </div>

                        <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

                            <div class="vx-col w-2/4  mb-2" style="border: 1px;min-width: 20px;">
                                <vs-checkbox  v-model="Deb.debtorCredit.fssp_pfr" @input="changeDeb">Постановление о временном ограничении на выезд должника из Российской Федерации</vs-checkbox>

                            </div>
                            <div class="vx-col w-2/4  mb-2" >

                            </div>



                        </div>




                    </fieldset>
                    <vs-checkbox  v-model="Deb.debtorCredit.claim_fssp_ved_ip" style="margin-top: 15px" @input="changeDeb">Подать жалобу по ведению ИП</vs-checkbox>

                </div>
            </div>
        </fieldset>

    </div>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters, } from 'vuex'
    import axios from '../../axios'
    import vSelect from 'vue-select'
    import Status from '../../components/Status.vue'
    import { AgGridVue } from 'ag-grid-vue'
    export default {
        components: {
            'v-select': vSelect,Status,AgGridVue,
        },
        data () {
            return {
                isk:0,
                judi:{},
                sud:0,
                years:['2020','2019','2018'],
                fio:'',
                searchQuery:'',
                findFlagNotFound:false,
                fail_rachod:0,
                sud_rashod:0,
                id_rec:0,
                number:'',

                // Deb:{}
            }
        },
        mounted(){

        },

        computed: {

            ...mapGetters([
                'RecoverersArr','Deb','BanksArr'

            ]),


        },
        methods: {


            changeStatusSud(){
                if(this.sud){
                    this.$refs.status.setStatus(3);
                }
            },
            changeStatusIsk(){
                if(this.isk){
                    this.$refs.status.setStatus(4);
                }
            },

            changeAndCheckStatusDebLocal(){
                this.changeAndCheckStatusDeb().then((response) => {
                    this.$refs.status.getData();
                })
            },
            ...mapActions([
                'getDataRecoverersAndPravez','getDataDebtorsById','getBanksNameAndId','changeDeb','changeAndCheckStatusDeb'
            ]),


        },
    }
</script>
<style>
    span.checkbox_x.vs-checkbox{
        min-width: 20px;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
</style>
