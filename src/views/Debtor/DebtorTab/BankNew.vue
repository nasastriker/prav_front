<template>
    <vx-card no-shadow style="min-height: 95vh;    padding-top: 0px;">


        <div class="vx-row" style="padding-top: 2px">
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <template v-if="typeof Deb.debtorCredit.id!='undefined'">
                    <Status :id_credit="Deb.debtorCredit.id" ref="status" class="h6"></Status>
                </template>
                <div class="vx-row" style="padding-top: 2px">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <h6 class="h6">Особые пометки:</h6>
                        <vs-textarea class="w-100" v-model="Deb.debtorCredit.comment" @change="changeDeb"></vs-textarea>
                        <h6 class="h6">Взыскатель:<VarToClipboard name="r_name"/></h6>
                        <vs-input class="w-100" v-model="Deb.recover.name"></vs-input>
                        <h6 class="h6">Цедент:<VarToClipboard name="r_namePerv"/></h6>
                        <vs-input class="w-100 " v-model="Deb.recover.namePerv"></vs-input>
                      <h6 class="h6">№ Договор цессии:<VarToClipboard name="dc_id_recover"/></h6>
                      <v-select  class="w-50 " :reduce="label => label.id" label="number" :options="RecoverersArrDogov"  v-model="Deb.debtorCredit.id_recover" @change="changeDeb"></v-select>
                      <h6 class="h6">Дата договора цессии:<VarToClipboard name="rec_date"/></h6>
                      <vs-input type="date" class="w-100" v-model="RecoverDateCession"></vs-input>



                        <h6 class="h6">Фамилия:<VarToClipboard name="d_name_family"/></h6>
                        <vs-input class="w-100 " v-model="Deb.debtor.name_family"></vs-input>
                        <h6 class="h6">Предыдущая фамилия:<VarToClipboard name="d_name_family_last"/></h6>
                        <vs-input class="w-100 "  v-model="Deb.debtor.name_family_last"></vs-input>
                        <h6 class="h6">Имя:<VarToClipboard name="d_name"/></h6>
                        <vs-input class="w-100 " v-model="Deb.debtor.name"></vs-input>
                        <h6 class="h6">Отчетсво:<VarToClipboard name="d_name_patronymic"/></h6>
                        <vs-input class="w-100 " v-model="Deb.debtor.name_patronymic"></vs-input>
                        <h6 class="h6">Дата рождения:<VarToClipboard name="d_birthdate"/></h6>
                        <vs-input type="date" class="w-100 " v-model="Deb.debtor.birthdate"></vs-input>
                        <h6 class="h6" style="margin-top: 15px">Номер договора займа:<VarToClipboard name="dc_number_dog"/></h6>
                        <vs-input class="w-100" v-model="Deb.debtorCredit.number_dog"></vs-input>
                        <h6 class="h6">Дата договора займа:<VarToClipboard name="dc_date_dog"/></h6>
                        <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_dog"></vs-input>

                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <h6 class="h6">№ ИД:<VarToClipboard name="dc_number_sa"/></h6>
                        <vs-input class="w-100" v-model="Deb.debtorCredit.number_sa" @change="changeDeb"></vs-input>
                        <h6 class="h6">Дата ИД:<VarToClipboard name="dc_date_sa"/></h6>
                        <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_sa"
                                  @blur="changeDeb"></vs-input>
                      <MestoId></MestoId>
                        <h6 class="h6">ШПИ Банк:<VarToClipboard name="dc_shpi_bank"/></h6>
                        <vs-input type="text" class="w-100" v-model="Deb.debtorCredit.shpi_bank" @blur="changeDeb"></vs-input>
                        <h6 class="h6">Дата заявления ФНС:<VarToClipboard name="dc_date_fns"/></h6>
                        <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_fns" @blur="changeDeb"></vs-input>
                        <h6 class="h6">Дата ответа ФНС:<VarToClipboard name="dc_date_return_fns"/></h6>
                        <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_return_fns" @blur="changeDebAndDcStatus"></vs-input>

                        <h6 class="h6">Дата отзыва СА:<VarToClipboard name="dc_date_response_sa"/></h6>
                        <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_response_sa"
                                  @blur="changeDeb"></vs-input>
                    </div>
                </div>

              <DateControls :perem="'bank'" :ref="'comp_date_controls'"></DateControls>

            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <BanksList @checkStat="checkStat" :checkBank="checkBank" :checkDateFns="checkDateFns"></BanksList>
            </div>
        </div>


    </vx-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import VueSuggestions from 'vue-suggestions';
import vSelect from 'vue-select'
import Status from '../../../components/Status.vue'
import BanksList from '../../Bank/BanksList.vue'
import ControlSends from "./Render/ControlSends.vue";
import MestoId from "./Render/MestoId.vue";
import VarToClipboard from './../../VarToClipboard.vue'
import DateControls from "./Render/DateControls.vue";
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
        VueSuggestions, Status, BanksList, 'v-select': vSelect,ControlSends,VarToClipboard,MestoId,DateControls
    },
    data() {
        return {}
    },
    mounted() {
      this.getDataReestrsAndPravDogovor()
    },
    computed: {

        ...mapGetters([
            'StatussDebtorArr', 'Deb', 'User', 'FnsAnswerFindFlag','RecoverersArrDogov','RecoverDateCession'

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
            'saveDebtor', 'getDataStatuss', 'getDataDebtorsById', 'changeDeb', 'setDcStatus','getDataReestrsAndPravDogovor'
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
