<template>
    <div >
        <div class="mt-5">
          <template v-if="typeof Deb.debtorCredit.id!='undefined'">
            <Status :id_credit="Deb.debtorCredit.id" class="h6 mb-1"></Status>
          </template>

          <div class="centerx">
            <vs-tooltip text="Возможность дописать необходимую информацию, сделать пометку к документу" position="top" >
              <h6 class="h6 mb-1">Особые пометки:<VarToClipboard name="dc_comment"/></h6>
            </vs-tooltip>
          </div>
          <vs-textarea class="w-100"  v-model="Deb.debtorCredit.comment" @change="changeDeb"> </vs-textarea>

          <template v-if="typeDes==1">
            <div class="centerx">
              <vs-tooltip text="Организация, в пользу или которой выдан исполнительный документ" position="top" >
                <h6 class="h6 mb-1">Взыскатель:</h6>
              </vs-tooltip>
            </div>
            <div class="vs-component vs-con-input-label vs-input w-100 mb-2 vs-input-primary"><!---->
              <div class="vs-con-input">
                <input type="text" readonly v-model="Deb.recover.name" class="vs-inputx vs-input--input normal hasValue" style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                <!----></div>
              <span></span>
            </div>
            <div class="centerx">
              <vs-tooltip text="Организация которая передает права на взыскание долга" position="top" >
                <h6 class="h6 mb-1">Цедент:</h6>
              </vs-tooltip>
            </div>
            <vs-input class="w-100 mb-2"  v-model="Deb.recover.namePerv"></vs-input>


          <h6 class="h6 mb-1">Фамилия:<VarToClipboard name="d_name_family"/></h6>
<!--          <vs-input class="w-100 "  v-model="Deb.debtor.name_family"@change="changeDeb"></vs-input>-->
            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
              <div class="vs-con-input"><input type="text"
                                               @change="changeDeb" v-model="Deb.debtor.name_family"

                                               class="vs-inputx vs-input--input normal hasValue"
                                               style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                <!----></div>
              <span></span>
            </div>
          <h6 class="h6 mb-1">Имя:<VarToClipboard name="d_name"/></h6>
<!--          <vs-input class="w-100 " v-model="Deb.debtor.name" @change="changeDeb"></vs-input>-->
            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
              <div class="vs-con-input"><input type="text"
                                               @change="changeDeb" v-model="Deb.debtor.name"

                                               class="vs-inputx vs-input--input normal hasValue"
                                               style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                <!----></div>
              <span></span></div>
          <h6 class="h6 mb-1">Отчество:<VarToClipboard name="d_name_patronymic"/></h6>
<!--          <vs-input class="w-100 "  v-model="Deb.debtor.name_patronymic" @change="changeDeb"></vs-input>-->
            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
              <div class="vs-con-input"><input type="text"
                                               @change="changeDeb" v-model="Deb.debtor.name_patronymic"

                                               class="vs-inputx vs-input--input normal hasValue"
                                               style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                <!----></div>
              <span></span></div>
          <h6 class="h6 mb-1">Дата рождения:<VarToClipboard name="d_birthdate"/></h6>
<!--          <vs-input type="date" class="w-100 " v-model="Deb.debtor.birthdate" @blur="changeDeb"></vs-input>-->
            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
              <div class="vs-con-input"><input type="date"
                                               @blur="changeDeb" v-model="Deb.debtor.birthdate"

                                               class="vs-inputx vs-input--input normal hasValue"
                                               style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                <!----></div>
              <span></span></div>

          <h6 class="h6 mb-1" style="margin-top: 15px">Статус гражданина:</h6>

          <div class="mt-2">

            <vs-radio v-model="Deb.debtor.pensioner"  @change="changeDeb" vs-value="0" vs-name="pensioner" class="mr-4">Работающий</vs-radio>
            <vs-radio v-model="Deb.debtor.pensioner" @change="changeDeb" vs-value="1" vs-name="pensioner" class="mr-4">Пенсионер</vs-radio>
          </div>
          <vs-checkbox style="margin-bottom: 15px" v-model="Deb.debtor.pensioner_check" @input="changeDeb">Не учитывать</vs-checkbox>
          <h6 class="h6 mb-1" style="margin-top: 15px">Номер договора:<VarToClipboard name="dc_number_dog"/></h6>
          <vs-input class="w-100"  v-model="Deb.debtorCredit.number_dog" @change="changeDeb"></vs-input>
          <h6 class="h6 mb-1">Дата договора:<VarToClipboard name="dc_date_dog"/></h6>
          <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_dog" @blur="changeDeb"></vs-input>

          </template>
          <template v-if="typeDes==2">

            <JudChange></JudChange>


            <div class="vx-row" style="padding-top: 20px">
              <div class="vx-col sm:w-1/2 w-full mb-2">
                <div class="centerx">
                  <vs-tooltip text="Организация, в пользу или которой выдан исполнительный документ" position="top" >
                    <h6 class="h6 mb-1">Взыскатель:</h6>
                  </vs-tooltip>
                </div>

                <div class="vs-component vs-con-input-label vs-input w-100 mb-2 vs-input-primary"><!---->
                  <div class="vs-con-input"><input type="text"
                                                   readonly
                                                   v-model="Deb.recover.name"

                                                   class="vs-inputx vs-input--input normal hasValue"
                                                   style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                    <!----></div>
                  <span></span>
                </div>

                <div class="centerx">
                  <vs-tooltip text="Организация которая передает права на взыскание долга" position="top" >
                    <h6 class="h6 mb-1">Цедент:</h6>
                  </vs-tooltip>
                </div>
                <vs-input class="w-100 mb-2"  v-model="Deb.recover.namePerv"></vs-input>

                <div class="centerx">
                  <vs-tooltip text="Фамилия должника" position="top" >
                    <h6 class="h6 mb-1">Фамилия:<VarToClipboard name="d_name_family"/></h6>
                  </vs-tooltip>
                </div>
<!--                <vs-input class="w-100 "  v-model="Deb.debtor.name_family"@change="changeDeb"></vs-input>-->
                <div class="vs-component vs-con-input-label vs-input w-100 mb-2 vs-input-primary"><!---->
                  <div class="vs-con-input"><input type="text"
                                                   @change="changeDeb" v-model="Deb.debtor.name_family"

                                                   class="vs-inputx vs-input--input normal hasValue"
                                                   style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                    <!----></div>
                  <span></span>
                </div>

                <div class="centerx" >
                  <vs-tooltip text="Предыдущая фамилия (указывается в случае смены)" position="top" >
                    <h6 class="h6 mb-1">Предыдущая фамилия:<VarToClipboard name="d_name_family_last"/></h6>
                  </vs-tooltip>
                </div>
                <!--                <vs-input class="w-100 "  v-model="Deb.debtor.name_family_last"@change="changeDeb"></vs-input>-->
                <div class="vs-component vs-con-input-label vs-input w-100 mb-2 vs-input-primary"><!---->
                  <div class="vs-con-input"><input type="text"
                                                   @change="changeDeb" v-model="Deb.debtor.name_family_last"

                                                   class="vs-inputx vs-input--input normal hasValue"
                                                   style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                    <!----></div>
                  <span></span>
                </div>

                <div class="centerx" >
                  <vs-tooltip text="Имя должника" position="top" >
                    <h6 class="h6 mb-1">Имя:<VarToClipboard name="d_name"/></h6>
                  </vs-tooltip>
                </div>
<!--                <vs-input class="w-100 " v-model="Deb.debtor.name" @change="changeDeb"></vs-input>-->
                <div class="vs-component vs-con-input-label vs-input w-100 mb-2 vs-input-primary"><!---->
                  <div class="vs-con-input"><input type="text"
                                                   @change="changeDeb" v-model="Deb.debtor.name"

                                                   class="vs-inputx vs-input--input normal hasValue"
                                                   style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                    <!----></div>
                  <span></span>
                </div>

                <div class="centerx" >
                  <vs-tooltip text="Отчество должника" position="top" >
                    <h6 class="h6 mb-1">Отчество:<VarToClipboard name="d_name_patronymic"/></h6>
                  </vs-tooltip>
                </div>
<!--                <vs-input class="w-100 "  v-model="Deb.debtor.name_patronymic" @change="changeDeb"></vs-input>-->
                <div class="vs-component vs-con-input-label vs-input w-100 mb-2 vs-input-primary"><!---->
                  <div class="vs-con-input"><input type="text"
                                                   @change="changeDeb" v-model="Deb.debtor.name_patronymic"

                                                   class="vs-inputx vs-input--input normal hasValue"
                                                   style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                    <!----></div>
                  <span></span>
                </div>

                <div class="centerx" >
                  <vs-tooltip text="Дата рождения должника" position="top" >
                    <h6 class="h6 mb-1">Дата рождения:<VarToClipboard name="d_birthdate"/></h6>
                  </vs-tooltip>
                </div>
<!--                <vs-input type="date" class="w-100 " v-model="Deb.debtor.birthdate" @blur="changeDeb"></vs-input>-->
                <div class="vs-component vs-con-input-label vs-input w-100 mb-2 vs-input-primary"><!---->
                  <div class="vs-con-input"><input type="date"
                                                   @blur="changeDeb" v-model="Deb.debtor.birthdate"

                                                   class="vs-inputx vs-input--input normal hasValue"
                                                   style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                    <!----></div>
                  <span></span>
                </div>

                <div class="centerx" >
                  <vs-tooltip text="Дата смерти (указывается в случае смерти должника)" position="top" >
                    <h6 class="h6 mb-1">Дата смерти:<VarToClipboard name="dcs_inh_death_date"/></h6>
                  </vs-tooltip>
                </div>
                <vs-input type="date" class="w-100 mb-2" v-model="Deb.debtorCreditSud.inh_death_date"  @blur="changeDeb"></vs-input>

                <div class="centerx" >
                  <vs-tooltip text="Определяется автоматически на основании даты рождения" position="top" >
                    <h6 class="h6 mb-1" style="margin-top: 15px">Статус гражданина:</h6>
                  </vs-tooltip>
                </div>

                <div class="mt-2">

                  <vs-radio v-model="Deb.debtor.pensioner"  @change="changeDeb" vs-value="0" vs-name="pensioner" class="mr-4 mb-2">Работающий</vs-radio>
                  <vs-radio v-model="Deb.debtor.pensioner" @change="changeDeb" vs-value="1" vs-name="pensioner" class="mr-4 mb-2">Пенсионер</vs-radio>
                </div>
                <vs-checkbox style="margin-bottom: 15px; margin-left: 0px" v-model="Deb.debtor.pensioner_check" @input="changeDeb">Не учитывать</vs-checkbox>

                <div class="centerx" >
                  <vs-tooltip text="Персональный уникальный номер договора" position="top" >
                    <h6 class="h6 mb-1" style="margin-top: 15px">Номер договора:<VarToClipboard name="dc_number_dog"/></h6>
                  </vs-tooltip>
                </div>
                <vs-input class="w-100 mb-2"  v-model="Deb.debtorCredit.number_dog" @change="changeDeb"></vs-input>

                <div class="centerx" >
                  <vs-tooltip text="Дата заключения договора" position="top" >
                    <h6 class="h6 mb-1">Дата договора:<VarToClipboard name="dc_date_dog"/></h6>
                  </vs-tooltip>
                </div>
                <vs-input type="date" class="w-100 mb-2" v-model="Deb.debtorCredit.date_dog" @blur="changeDeb"></vs-input>
              </div>

              <div class="vx-col sm:w-1/2 w-full mb-2">
                <div class="centerx" >
                  <vs-tooltip text="Основная сумма займа" position="top" >
                    <h6 class="h6 mb-1">Сумма долга в суд:<VarToClipboard name="dc_dolg_sum_sud"/></h6>
                  </vs-tooltip>
                </div>
<!--                <vs-input type="number" v-model="ocsMinGp" readonly="readonly" class="w-100 "></vs-input>-->
                <div class="vs-component vs-con-input-label vs-input w-100 mb-2 vs-input-primary"><!---->
                  <div class="vs-con-input"><input type="number"
                                                   v-model="Deb.debtorCredit.dolg_sum_sud"
                                                   readonly="readonly"
                                                   class="vs-inputx vs-input--input normal hasValue"
                                                   style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                    <!----></div>
                  <span></span>
                </div>

                <div class="centerx" >
                  <vs-tooltip text="Cбор, установленный законодательством для истцов, обращающихся в судебный орган для разрешения споров" position="top" >
                    <h6 class="h6 mb-1">Госпошлина в Суд:<VarToClipboard name="dc_gp_sum_sud"/></h6>
                  </vs-tooltip>
                </div>
<!--                <vs-input class="w-100 " v-model="Deb.debtorCredit.gospohlina" @change="changeDebUpdate"></vs-input>-->
                <div class="vs-component vs-con-input-label vs-input w-100 mb-2 vs-input-primary"><!---->
                  <div class="vs-con-input"><input type="number"
                                                   v-model="Deb.debtorCredit.gp_sum_sud"
                                                   readonly="readonly"
                                                   class="vs-inputx vs-input--input normal hasValue"
                                                   style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                    <!----></div>
                  <span></span>
                </div>
                <div class="centerx" >
                  <vs-tooltip text="Cуммарное значение основного долга и госпошлины. Считается автоматически" position="top" >
                    <h6 class="h6 mb-1">Сумма долга в суд + ГП:<VarToClipboard name="dc_dolg_sum_sud_and_gp"/></h6>
                  </vs-tooltip>
                </div>
<!--                <vs-input type="number" @change="changeDeb" v-model="Deb.debtorCredit.ocs_sum" readonly="readonly" class="w-100"></vs-input>-->
                <div class="vs-component vs-con-input-label vs-input w-100 mb-2 vs-input-primary"><!---->
                  <div class="vs-con-input"><input type="number"
                                                   v-model="Deb.debtorCredit.dolg_sum_sud_and_gp"
                                                   readonly="readonly"
                                                   class="vs-inputx vs-input--input normal hasValue"
                                                   style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                    <!----></div>
                  <span></span></div>

                <vs-button color="primary" style="margin-top: 10px;margin-bottom: 10px" @click="showIzmSumDolg=!showIzmSumDolg">Внести изменения в сумму долга</vs-button>

                <div class="centerx" >
                  <vs-tooltip text="Номер исполнительного документа" position="top" >
                    <h6 class="h6 mb-1" >№ ИД: <DeleteFieldsHistory :perem="'dc_number_sa'" /><VarToClipboard name="dc_number_sa"/></h6>
                  </vs-tooltip>
                </div>
<!--                <vs-input class="w-100"  v-model="Deb.debtorCredit.number_sa" @change="changeDeb"></vs-input>-->
                <div class="vs-component vs-con-input-label vs-input w-100 mb-2 vs-input-primary"><!---->
                  <div class="vs-con-input"><input type="text"
                                                   @change="changeDeb" v-model="Deb.debtorCredit.number_sa"
                                                   class="vs-inputx vs-input--input normal hasValue"
                                                   style="background-color:rgb(29 223 0 / 13%);border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                    <!----></div>
                  <span></span>
                </div>

                <div class="centerx" >
                  <vs-tooltip text="Дата выдачи исполнительного документа" position="top" >
                    <h6 class="h6 mb-1">Дата ИД: <DeleteFieldsHistory :perem="'dc_date_sa'" /><VarToClipboard name="dc_date_sa"/></h6>
                  </vs-tooltip>
                </div>
<!--                <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_sa" @blur="changeDeb"></vs-input>-->
                <div class="vs-component vs-con-input-label vs-input w-100 mb-2 vs-input-primary"><!---->
                  <div class="vs-con-input"><input type="date"
                                                   v-model="Deb.debtorCredit.date_sa"
                                                   @blur="changeDebAndPrint"
                                                   class="vs-inputx vs-input--input normal hasValue"
                                                   style="background-color:rgb(29 223 0 / 13%);border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                    <!----></div>
                  <span></span>
                </div>

                <div class="centerx" >
                  <vs-tooltip text="Номер искового документа" position="top" >
                    <h6 class="h6 mb-1" style="">№ дела Иск:<VarToClipboard name="dc_number_delo_il"/></h6>
                  </vs-tooltip>
                </div>
<!--                <vs-input class="w-100"  v-model="Deb.debtorCredit.number_delo_il" @change="changeDeb"></vs-input>-->
                <div class="vs-component vs-con-input-label vs-input w-100 mb-2 vs-input-primary"><!---->
                  <div class="vs-con-input"><input type="text"
                                                   @change="changeDebAndDelo" v-model="Deb.debtorCredit.number_delo_il"
                                                   class="vs-inputx vs-input--input normal hasValue"
                                                   style="background-color:rgb(29 223 0 / 13%);border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                    <!----></div>
                  <span></span>
                </div>
                <div class="centerx">
                  <vs-tooltip text="Исполнительным документом может быть Судебный приказ или Исполнительный лист" position="top" >
                    <h6 class="h6 mb-1" style="margin-top: 15px">Тип ИД:<VarToClipboard name="dc_type_cp"/></h6>
                  </vs-tooltip>
                </div>
                <v-select class="mb-2" :reduce="label => label.id" label="name" :options="TypeCP"  v-model="Deb.debtorCredit.type_cp" @input="changeDeb"></v-select>

                <barcode   id="printMe" style="text-align: center;" v-bind:value="Deb.debtorCredit.id"></barcode>
                <div style="text-align: center">
                  <vs-button @click="print" color="primary" type="border" icon="print" style="margin: 0 auto;">Печать</vs-button>
                </div>

                <div class="centerx" >
                  <vs-tooltip text="Тип взыскания с заёмщика" position="top" >
                    <h6 class="h6 mb-1" style="margin-top: 15px">Вид взыскания:<VarToClipboard name="dc_name_delo"/></h6>
                  </vs-tooltip>
                </div>
                <v-select class="mb-2" :reduce="label=>label.id" label="name" :options="VidRecoverInDebtorCreditArr"  v-model="Deb.debtorCredit.name_delo" @input="changeDeb"></v-select>

                <div class="centerx" >
                  <vs-tooltip text="Характеристика ответственности заёмщика" position="top" >
                    <h6 class="h6 mb-1">Тип должника:<VarToClipboard name="dc_type_debtor"/></h6>
                  </vs-tooltip>
                </div>
                <v-select class="mb-2" :reduce="label=>label.id" label="name" :options="TypeDebtorInDebtorCreditArr"  v-model="Deb.debtorCredit.type_debtor" @input="changeDeb" ></v-select>

              </div>
            </div>
          </template>
        </div>



      <vs-popup classContent="popup-example" title="Перепривязка судебного участка" :active.sync="popupResetJud">
        <ResetJud @reSetJud="reSetJud"></ResetJud>
      </vs-popup>

      <vs-popup classContent="popup-example" title="Внести изменения в сумму долга" :active.sync="showIzmSumDolg">
        <IzmSumDolg></IzmSumDolg>
      </vs-popup>

    </div>
</template>

<script>

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import Status from '../../components/Status.vue'
    import Jud from "../Debtor/Jud.vue";
    import ResetJud from "../Debtor/ResetJud.vue";
    import InfoGosp from "../Debtor/DebtorTab/ChildTab/InfoGosp.vue";
    import axios from "../../axios";
    import r from "../../route";
    import VueBarcode from 'vue-barcode';
    import JudChange from "./Render/JudChange.vue";
    import IzmSumDolg from "../Debtor/DebtorTab/Render/IzmSumDolg.vue";
    import VarToClipboard from './../VarToClipboard.vue'
    import DeleteFieldsHistory from "../Debtor/DebtorTab/Render/DeleteFieldsHistory.vue";
    export default {
        components: {
          Status,Jud,ResetJud,InfoGosp,'barcode': VueBarcode,JudChange,IzmSumDolg,VarToClipboard,
          DeleteFieldsHistory
        },

        props:['typeDes'],
        data () {
            return {
              access_change_recover:false,
              popupChangeRecover:false,
              rec_id: 0,
              showJud:false,
              popupResetJud:false,
              showIzmSumDolg:false,
            }
        },
        mounted(){
          this.getJurisName(this.Deb.debtorCredit.id);
          this.getUserAccessChangeRecover().then((response) => {
            if (response.result) {
              this.access_change_recover = response.granted;
            }
          });
          this.getDataReestrsAndCessionDogov()
          this.getTypeDebtorInDebtorCreditArr()
          this.getVidRecoverInDebtorCreditArr()

        },

        asyncComputed: {

        },
        computed: {
          ocsMinGp(){
            var rounded = function(number){
              return +number.toFixed(2);
            }

            return  rounded(this.Deb.debtorCredit.ocs_sum-this.Deb.debtorCredit.gospohlina)
          },


            ...mapGetters([
                'User','Deb','RecoverersArrDogov','TypeDebtorInDebtorCreditArr','VidRecoverInDebtorCreditArr','TypeCP'

            ]),



        },
        methods: {

          ...mapActions([
            'saveDebtor','getDataStatuss','getDataDebtorsById','changeDeb','deleteDebtorCredit','getDataReestrsAndPravDogovor',
            'getBanksListSudOrder','getDataReestrsAndCessionDogov','getTypeDebtorInDebtorCreditArr',
            'getVidRecoverInDebtorCreditArr','getResponsibleUserInDebtorList','getUserAccessChangeRecover',
              'getJudicialsListForReset','getJurisName','changeDebUpdate','checkStatusDebtorCreditSa','checkStatusDebtorCreditIsk'
          ]),

            changeDebAndDelo(){
                if(this.Deb.statusLast==100&&this.Deb.debtorCredit.date_sa!==null&&!this.Deb.debtorCredit.number_sa!==null&&this.Deb.debtorCredit.number_delo_il!==null){
                    this.print();
                }
                if(this.Deb.statusLast==53&&this.Deb.debtorCredit.date_sa!==null&&!this.Deb.debtorCredit.number_sa!==null&&this.Deb.debtorCredit.number_delo_il!==null){
                    this.print();
                }
                this.changeDeb().then((response) => {
                    if(this.Deb.statusLast==100){

                        this.checkStatusDebtorCreditIsk(this.Deb.debtorCredit.id);
                    }
                    if(this.Deb.statusLast==53){
                        this.checkStatusDebtorCreditIsk(this.Deb.debtorCredit.id);
                    }

                }).catch(error => {

                });

            },
            changeDebAndPrint(){

                if(this.Deb.statusLast==6&&this.Deb.debtorCredit.date_sa!==null&&!this.Deb.debtorCredit.number_sa!==null){
                    this.print();
                }

                this.changeDeb().then((response) => {
                    if(this.Deb.statusLast==6){

                        this.checkStatusDebtorCreditSa(this.Deb.debtorCredit.id);

                    }



                }).catch(error => {

                });

            },

          setAnotherJud(){
            if (this.Deb.debtor.data_reg==null){
              this.$vs.notify({  title:'Ошибка', text: 'Проверте адрес', color: 'danger', position: 'top-center' })
            }else{
              this.getJudicialsListForReset(this.Deb.debtor.id);
              this.popupResetJud = true;
            }
          },
          reSetJud(){
            this.popupResetJud = false;
            this.setJud();
          },
          setJud(){
            if(this.Deb.debtor.data_reg==null){
              this.$vs.notify({  title:'Ошибка', text: 'Проверьте адрес' , color: 'danger', position: 'top-center' })
            }else{
              this.$vs.loading({ color: '#ff8000' })
              axios.post(r("jurisdiction.index"), {
                params: {
                  method: 'setJurisdictions',
                  param: this.Deb.debtor
                }
              }).then((response) => {
                this.$vs.loading.close()
                if (response.data.result){
                  this.getJurisName(this.Deb.debtorCredit.id);
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
          print(){

            let mywindow = window.open('print.html', 'Print', 'height=600,width=800');
            let elem = document.getElementById('printMe');
            mywindow.document.write('<html><head><title>Print QR</title>');
            mywindow.document.write('</head><body >');
            mywindow.document.write(elem.innerHTML);
            mywindow.document.write('</body></html>');

            mywindow.document.close();
            mywindow.focus()
            mywindow.print();
            mywindow.close('print.html');

          },


        },
    }
</script>

<style scoped>
.vs-con-input-label{
  width: 100%;
}
</style>
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
