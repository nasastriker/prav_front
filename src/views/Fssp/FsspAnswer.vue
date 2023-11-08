<template>
    <div>
        <vs-tabs>
            <vs-tab label="Результат">
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
                                    <vs-input type="date" class="w-100" readonly v-model="Deb.debtorCredit.date_dog"></vs-input>
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
                                    <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_end_ip"  @blur="changeDeb"></vs-input>

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
            </vs-tab>
            <vs-tab label="Данные заёмщика">
                <Debtor :back="back"></Debtor>
            </vs-tab>


        </vs-tabs>
        <vs-popup classContent="popup-example" title="Внимание" :active.sync="showSob">

            <h2>Внимание статус не изменился!!! Проверте эти даты:</h2>

            <h6 class="h6">Дата ответа ФНС:</h6>
            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_return_fns"  @blur="changeDeb"></vs-input>
            <h6 class="h6">Дата ответа Альфа:</h6>
            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_return_alfa"  @blur="changeDeb"></vs-input>
            <h6 class="h6">Дата ответа Сбер:</h6>
            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_return_sber"  @blur="changeDeb"></vs-input>
            <h6 class="h6">Дата ответа Совкомбанк:</h6>
            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_return_sovcom"  @blur="changeDeb"></vs-input>
            <h6 class="h6">Дата ответа Уралсиба:</h6>
            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_return_uralsib"  @blur="changeDeb"></vs-input>
            <h6 class="h6">Дата ответа Почта банка:</h6>
            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_return_pochta_bank"  @blur="changeDeb"></vs-input>
            <h6 class="h6">Дата ответа Юмани:</h6>
            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_return_yoomoney_bank"  @blur="changeDeb"></vs-input>


        </vs-popup>
        <template v-if="showChangeStatus">

            <div class="vs-component con-vs-popup vs-popup-primary">
                <div class="vs-popup--background"></div>
                <div class="vs-popup" style="background: rgb(255, 255, 255);">
                    <header class="vs-popup--header">
                        <div class="vs-popup--title"><h3>Изменения</h3></div>
                        <i class="vs-icon notranslate icon-scale vs-popup--close vs-popup--close--icon material-icons null"
                           style="background: rgb(255, 255, 255);" @click="showChangeStatus=!showChangeStatus">close</i></header>
                    <div class="vs-popup--content">
                        <fieldset class="f" style="margin-top: 5px;padding: 10px" >
                            <legend class="l"> Статус </legend>
                            <div v-if="p_changes.is_status_changed">
                                <div style="display: flex">
                                    <div style="background-color: #FFA07A;padding: 10px;width: 150px;border-radius: 8px;">
                                        <h6>{{ p_changes.old_status_name }}</h6>
                                    </div>
                                    <div style="text-align: center;margin: 10px">
                                        <arrow-right-icon size="2x" class="custom-class"></arrow-right-icon>
                                    </div>
                                    <div style="background-color: #00FF7F;padding: 10px;width: 150px;border-radius: 8px;">
                                        <h6>{{ p_changes.new_status_name }}</h6>
                                    </div>
                                </div>
                            </div>
                            <div v-else style="text-align: center">
                                <h5>Статус не изменился</h5>
                            </div>
                        </fieldset>
                        <fieldset class="f" style="margin-top: 5px;padding: 10px" >
                            <legend class="l"> Банки </legend>
                            <div v-if="p_changes.is_collect_changed">
                                <h6>{{ p_changes.change_text }}</h6>
                            </div>
                            <div v-else style="text-align: center">
                                <h5>Изменений в списке банков не было</h5>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

        </template>



    </div>
</template>

<script>
    import { mapActions,mapGetters, } from 'vuex'
    import Status from '../../components/Status.vue'
    import Debtor from '../Debtor/DebtorID.vue';
    import Bank from '../Debtor/DebtorTab/Bank.vue';
    import { ArrowRightIcon } from 'vue-feather-icons'
    export default {
        props: {
            p_changes: {
                change_text: '',
                old_status_name: '',
                new_status_name: '',
                is_status_changed: false,
                is_collect_changed: false,
            },
            showChangeStatus: false
        },
        components: {
           Status,Debtor,Bank,ArrowRightIcon
        },
        data () {
            return {
                back:false,
                years:['2024','2023','2022','2021','2020','2019','2018'],
                showSob:false,
                showChStatus: this.showChangeStatus
            }
        },
        mounted(){
        },
        computed: {
            ...mapGetters([
                'Deb','User'

            ]),
        },
        watch: {
            showChangeStatus (newValue) {
                this.showChStatus = newValue
            }
        },
        methods: {
            ...mapActions([
                'changeDeb',
            ]),
        },
    }
</script>
<style>
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
</style>
