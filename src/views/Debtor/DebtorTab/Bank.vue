<template>
    <vx-card no-shadow style="min-height: 95vh;    padding-top: 0px;">


        <div class="vx-row" style="padding-top: 2px">
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <template v-if="typeof Deb.debtorCredit.id!='undefined'">
                    <Status :id_credit="Deb.debtorCredit.id" ref="status" class="h6"></Status>
                </template>
                <div class="vx-row" style="padding-top: 2px">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <vs-checkbox style="margin-top: 20px" v-model="Deb.debtorCredit.response_return_sa"
                                     @input="changeDebUpdate">Приказ получен
                        </vs-checkbox>
                        <vs-checkbox style="margin-top: 15px" v-model="Deb.debtorCredit.response_sa" @input="changeDeb">
                            Отправить отзыв СА
                        </vs-checkbox>
                        <h6 class="h6">Особые пометки:</h6>
                        <vs-textarea class="w-100" v-model="Deb.debtorCredit.comment" @change="changeDeb"></vs-textarea>
                        <h6 class="h6">Взыскатель:<VarToClipboard name="r_name"/></h6>
                        <vs-input class="w-100" v-model="Deb.recover.name"></vs-input>
                        <h6 class="h6">Цедент:<VarToClipboard name="r_namePerv"/></h6>
                        <vs-input class="w-100 " v-model="Deb.recover.namePerv"></vs-input>
                        <h6 class="h6" style="margin-top: 25px">Фамилия:<VarToClipboard name="d_name_family"/> </h6>
                        <vs-input class="w-100 " v-model="Deb.debtor.name_family"></vs-input>
                        <h6 class="h6">Предыдущая фамилия:<VarToClipboard name="d_name_family_last"/></h6>
                        <vs-input class="w-100 "  v-model="Deb.debtor.name_family_last"></vs-input>
                        <h6 class="h6">Имя:<VarToClipboard name="d_name"/></h6>
                        <vs-input class="w-100 " v-model="Deb.debtor.name"></vs-input>
                        <h6 class="h6">Отчетсво:<VarToClipboard name="d_name_patronymic"/></h6>
                        <vs-input class="w-100 " v-model="Deb.debtor.name_patronymic"></vs-input>
                        <h6 class="h6">Дата рождения:<VarToClipboard name="d_birthdate"/></h6>
                        <vs-input type="date" class="w-100 " v-model="Deb.debtor.birthdate"></vs-input>
                        <h6 class="h6" style="margin-top: 15px">Номер договора:<h6 class="h6" v-if="User.pag.showPer"
                                                                                   style="color: orange ">
                            dc_number_dog</h6></h6>
                        <vs-input class="w-100" v-model="Deb.debtorCredit.number_dog"></vs-input>
                        <h6 class="h6">Дата договора:<VarToClipboard name="dc_date_dog"/></h6>
                        <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_dog"></vs-input>

                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <h6 class="h6" style="margin-top: 15px">Статус гражданина:<h6 class="h6" v-if="User.pag.showPer"
                                                                                      style="color: orange ">
                            d_pensioner</h6></h6>

                        <div class="mt-2">

                            <vs-radio v-model="Deb.debtor.pensioner" vs-value="0" vs-name="pensioner" class="mr-4"
                                      @input="changeDeb">Работающий
                            </vs-radio>
                            <vs-radio v-model="Deb.debtor.pensioner" vs-value="1" vs-name="pensioner" class="mr-4"
                                      @input="changeDeb">Пенсионер
                            </vs-radio>
                        </div>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.debtor.pensioner_check"
                                     @input="changeDeb">Не учитывать
                        </vs-checkbox>
                        <h6 class="h6">Сумма долга:</h6>
                        <vs-input type="number" readonly class="w-100 " v-model="Deb.debtorCredit.dolg_sum"></vs-input>
                        <h6 class="h6">Госпошлина:</h6>
                        <vs-input class="w-100 " v-model="Deb.debtorCredit.gospohlina"></vs-input>
                        <h6 class="h6" style="margin-top: 15px">№ СА:<h6 class="h6" v-if="User.pag.showPer"
                                                                         style="color: orange ">dc_number_sa</h6></h6>
                        <vs-input class="w-100" v-model="Deb.debtorCredit.number_sa" @change="changeDeb"></vs-input>
                        <h6 class="h6">Дата СА:<VarToClipboard name="dc_date_sa"/></h6>
                        <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_sa"
                                  @blur="changeDeb"></vs-input>
                        <h6 class="h6">№ СА судебные расходы:<h6 class="h6" v-if="User.pag.showPer"
                                                                 style="color: orange ">so_number_sa_rachod</h6></h6>
                        <vs-input class="w-100" v-model="Deb.sudOrder.number_sa_rachod" @change="changeDeb"></vs-input>
                        <h6 class="h6">Дата судебные расходы:<h6 class="h6" v-if="User.pag.showPer"
                                                                 style="color: orange ">so_date_sud_rachod</h6></h6>
                        <vs-input type="date" class="w-100" v-model="Deb.sudOrder.date_sud_rachod"
                                  @blur="changeDeb"></vs-input>
                        <h6 class="h6">Дата заявления ФНС:</h6>
                        <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_fns"
                                  @blur="changeDeb"></vs-input>
                        <h6 class="h6">Дата ответа ФНС:</h6>
                        <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_return_fns"
                                  @blur="changeDebAndDcStatus"></vs-input>
                        <h6 class="h6">Название банка:</h6>
                        <vs-textarea class="w-100" v-model="Deb.debtorCredit.find_sa" @change="changeDeb"></vs-textarea>
                        <h6 class="h6">Дата заявления банка:<VarToClipboard name="dc_date_bank"/></h6>
                        <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_bank"
                                  @blur="changeDeb"></vs-input>
                        <h6 class="h6">Дата отзыва СА:<VarToClipboard name="dc_date_response_sa"/></h6>
                        <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_response_sa"
                                  @blur="changeDeb"></vs-input>
                    </div>
                </div>


            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <BanksList @checkStat="checkStat" :checkBank="checkBank" :checkDateFns="checkDateFns"></BanksList>
            </div>
        </div>


    </vx-card>
</template>

<script>
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import JsonViewer from 'vue-json-viewer'
import VueDadata from 'vue-dadata'
import {mapActions, mapGetters} from 'vuex'
import VueSuggestions from 'vue-suggestions';
import vSelect from 'vue-select'
import Status from '../../../components/Status.vue'
import BanksList from '../../Bank/BanksList.vue'
import VarToClipboard from './../../VarToClipboard.vue'
Vue.use(AsyncComputed)
export default {
    props: {
        checkDateFns: {
            default: false
        },
        checkBank: {
            default: false
        },
    },
    components: {
        VueSuggestions, Status, BanksList, 'v-select': vSelect,VarToClipboard,
    },
    data() {
        return {}
    },
    mounted() {

    },
    asyncComputed: {},
    computed: {

        ...mapGetters([
            'StatussDebtorArr', 'Deb', 'User', 'FnsAnswerFindFlag'

        ]),


    },
    methods: {
        changeDebAndDcStatus(){
            this.changeDeb();
            if (this.$route.name === 'fns_answerfiles') {
                this.setDcStatus(this.Deb.debtorCredit.id);
            }
        },
        checkStat(){
            this.$refs.status.getData();
        },
        close() {

            this.$router.back()
        },
        ...mapActions([
            'saveDebtor', 'getDataStatuss', 'getDataDebtorsById', 'changeDeb', 'setDcStatus','changeDebUpdate'
        ]),


    },
}
</script>

<style lang="scss">

.h6 {
    font-size: 12px;
    color: cadetblue;
}

.f {

    border: 1px;
    border-style: double;
    border-color: #62626262;
    border-radius: 8px;
}

.l {
    color: #a00;
    padding: 0 10px;
}

.box {
    display: flex;
    margin-top: 15px;
}

.box1 {
    display: flex;
}

.push {
    margin-left: auto;
    width: 300px;
}

.push1 {
    margin-left: auto;
    margin-bottom: 5px;
}


</style>
