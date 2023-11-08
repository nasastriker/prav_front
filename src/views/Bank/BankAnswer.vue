<template>
    <div>

        <vs-tabs>
            <vs-tab label="Результат">
                <fieldset class="f" style="margin-top: 5px" >
                    <legend class="l">{{Deb.debtor.name_family}} {{Deb.debtor.name}} {{Deb.debtor.name_patronymic}}:</legend>
                    <Bank :checkBank="true"></Bank>
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
