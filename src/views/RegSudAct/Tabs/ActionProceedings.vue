<template xmlns="http://www.w3.org/1999/html">

        <div>
          <JudicialHearings :sud_type="'isk'" style="margin-bottom: 15px"></JudicialHearings>

          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Определение об отказе в иске/оставление без рассмотрения">
              <div class="vx-row" style="padding-top: 20px;">
                <div class="vx-col mb-2">
                  <h6 class="h6">Дата определения об отказе в иске</h6>
                  <h6 class="h6 mb-1">/оставление без рассмотрения:<VarToClipboard name="d_data_otkz"/></h6>
                  <vs-input type="date" class="w-100 " v-model="Deb.data_otkz"  @blur="changeDebDateOkz"></vs-input>
                </div>
                <div class="vx-col mb-2" style="margin-top: 30px">
                  <div class="vx-row">
                    <SudCopyRequest class="mt-1" :perem="'data_otkz'"></SudCopyRequest>
                    <vs-button class="mt-1" color="primary" style="margin-left: 10px" @click="showOtkz=!showOtkz">История</vs-button>
                    <vs-button class="mt-1" color="primary" style="margin-left: 10px">Файл</vs-button>
                    <SettingsRegSudAct class="mt-1" :perem="'data_otkz'" :type="'zapros'"></SettingsRegSudAct>
                  </div>
                </div>
              </div>
            </vs-tab>
          </vs-tabs>


          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Решение суда">
              <div class="vx-row" style="padding-top: 20px;">
                <div class="vx-col mb-2">
                  <h6 class="h6 mb-1">Дата решения суда:<VarToClipboard name="dc_date_sud_sol"/></h6>
                  <vs-input type="date" class="w-100 " v-model="Deb.debtorCredit.date_sud_sol"  v-on:keyup.enter="changeDebSudSol" @blur="changeDebSudSol"></vs-input>
                </div>
                <div class="vx-col mb-2" style="margin-top: 15px">
                  <div class="vx-row">
                    <SudCopyRequest class="mt-1" :perem="'date_sud_sol'"></SudCopyRequest>
                    <vs-button class="mt-1" color="primary" style="margin-left: 10px" @click="showDatesSudSol=!showDatesSudSol">История</vs-button>
                    <DownloadFile class="mt-1" :perem_type_doc="'credit_reshenie_suda'"></DownloadFile>
                    <SettingsRegSudAct class="mt-1" :perem="'date_sud_sol'" :type="'zapros'"></SettingsRegSudAct>
                  </div>
                </div>
              </div>
              <div style="margin-top:20px;margin-bottom:20px;">
                <VarToClipboard name="dcs_fi_isk_resh_sud_zaoch"/>
                <vs-checkbox v-model="Deb.debtorCreditSud.fi_isk_resh_sud_zaoch" @input="changeDebCredSud">
                  Заочное решение
                </vs-checkbox>
              </div>
              <div class="vx-row" style="padding-top: 20px;">
                <div class="vx-col mb-2">
                  <h6 class="h6 mb-1">Результат:</h6>
                  <VarToClipboard name="dc_satisfied"/>
                  <vs-checkbox  v-model="Deb.debtorCredit.satisfied" @input="changeDeb">
                    Удовлетворено
                  </vs-checkbox>
                  <div style="margin-top: 5px">
                  <VarToClipboard name="dc_satisfied_part"/>
                  <vs-checkbox  v-model="Deb.debtorCredit.satisfied_part" @input="changeDeb">
                    Удовлетворено частично
                  </vs-checkbox>
                  </div>
                  <div style="margin-top: 5px">
                  <VarToClipboard name="dc_isk_return"/>
                  <vs-checkbox  v-model="Deb.debtorCredit.isk_return" @input="changeDeb">
                    Отказано
                  </vs-checkbox>
                  </div>
                </div>
                <div style="margin-left: 20px;margin-top:30px;">
                  <vs-button color="primary" style="width: 300px;" @click="showIzmSumDolg=!showIzmSumDolg">Внести изменения в сумму долга</vs-button>
                </div>
              </div>

              <div class="vx-row" style="padding-top: 20px;">
                <div class="vx-col mb-2">
                  <h6 class="h6 mb-1">Дата отмены заочного решения:<VarToClipboard name="dcs_fi_isk_resh_sud_zaoch_cancel_date"/></h6>
                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.fi_isk_resh_sud_zaoch_cancel_date"  @blur="changeDebCredSudFiIskReshSudZaochCancelDate"></vs-input>
                </div>
                <div class="vx-col mb-2" style="margin-top: 15px">
                  <div class="vx-row">
                    <SudCopyRequest class="mt-1" :perem="'fi_isk_resh_sud_zaoch_cancel_date'"></SudCopyRequest>
                    <vs-button class="mt-1" color="primary" style="margin-left: 10px" @click="showDatesReshSudZaoch=!showDatesReshSudZaoch">История</vs-button>
                    <vs-button class="mt-1" color="primary" style="margin-left: 10px">Файл</vs-button>
                    <SettingsRegSudAct class="mt-1" :perem="'fi_isk_resh_sud_zaoch_cancel_date'" :type="'zapros'"></SettingsRegSudAct>
                  </div>
                </div>
              </div>
            </vs-tab>
          </vs-tabs>

          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Частная жалоба отмена ЗРС">
              <div class="vx-row" style="padding-top: 20px;">
                <div class="vx-col mb-2">
              <h6 class="h6 mb-1">Дата результата:<VarToClipboard name="dcs_fi_isk_claim_result_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.fi_isk_claim_result_date"  @blur="changeDebCredSudFiIskClaimResultDate"></vs-input>
                </div>
                <div class="vx-col mb-2">
              <h6 class="h6 mb-1">Результат:</h6>
                  <VarToClipboard name="dcs_fi_isk_claim_result_success"/>
              <vs-checkbox v-model="Deb.debtorCreditSud.fi_isk_claim_result_success" @input="changeDebCredSud">
                Удовлетворено
              </vs-checkbox>
                  <div style="margin-top: 5px">
                  <VarToClipboard name="dcs_fi_isk_claim_result_cancel"/>
              <vs-checkbox v-model="Deb.debtorCreditSud.fi_isk_claim_result_cancel" @input="changeDebCredSud">
                Отказано
              </vs-checkbox>
                </div>
                </div>
                <div class="vx-col mb-2" style="margin-top: 10px">
                  <div class="vx-row">
                    <SudCopyRequest class="mt-2" :perem="'fi_isk_claim_napr_date'"></SudCopyRequest>
                    <vs-button class="mt-2" color="primary" style="margin-left: 10px" @click="showDatesIskClaim=!showDatesIskClaim">История</vs-button>
                    <DownloadFile class="mt-2" :perem_type_doc="'credit_claim_otmena_zrs'"></DownloadFile>
                    <SettingsRegSudAct class="mt-2" :perem="'fi_isk_claim_napr_date'" :type="'all'"></SettingsRegSudAct>
                  </div>
                </div>
              </div>
            </vs-tab>
          </vs-tabs>


<!--          <vs-tabs alignment="fixed" color="danger">-->
<!--            <vs-tab label="Частная жалоба отмена ЗРС">-->
<!--              <div class="vx-row" style="padding-top: 20px">-->
<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                  <h6 class="h6 mb-1">Дата направления:<VarToClipboard name="dcs_fi_isk_claim_napr_date"/></h6>-->
<!--                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.fi_isk_claim_napr_date"  @blur="changeDebCredSud"></vs-input>-->
<!--                  <h6 class="h6">План-Дата результат:</h6>-->
<!--                  <vs-input type="date" class="w-100" disabled="true" v-model="planDateClaim"></vs-input>-->
<!--                </div>-->

<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->

<!--                </div>-->

<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                  <h6 class="h6">Дата результата:<VarToClipboard name="dcs_fi_isk_claim_result_date"/></h6>-->
<!--                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.fi_isk_claim_result_date"  @blur="changeDebCredSud"></vs-input>-->
<!--                  <h6 class="h6" style="margin-top: 10px;">Результат:</h6>-->
<!--                  <VarToClipboard name="dcs_fi_isk_claim_result_success"/>-->
<!--                  <vs-checkbox v-model="Deb.debtorCreditSud.fi_isk_claim_result_success" @input="changeDebCredSud">-->
<!--                    Удовлетворено-->
<!--                  </vs-checkbox>-->
<!--                  <VarToClipboard name="dcs_fi_isk_claim_result_cancel"/>-->
<!--                  <vs-checkbox v-model="Deb.debtorCreditSud.fi_isk_claim_result_cancel" @input="changeDebCredSud">-->
<!--                    Отказано-->
<!--                  </vs-checkbox>-->
<!--                </div>-->
<!--              </div>-->
<!--            </vs-tab>-->
<!--          </vs-tabs>-->

<!--          <vs-tabs alignment="fixed" color="danger">-->
<!--            <vs-tab label="Шаблоны документов">-->
<!--              <ChangeShablon></ChangeShablon>-->
<!--            </vs-tab>-->
<!--          </vs-tabs>-->

<!--        <div class="vx-row" style="padding-top: 20px">-->
<!--          <div class="vx-col sm:w-2/3 w-full mb-2" style="border: 1px;">-->

<!--                           <fieldset class="f" style="padding: 10px;">-->
<!--                               <legend class="l">Исковое производство:</legend>-->
<!--                               <h6 class="h6">Дата уведомления должнику:<VarToClipboard name="dc_date_notification_debtor"/></h6>-->
<!--                               <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_notification_debtor" @blur="changeDeb"></vs-input>-->
<!--                               <h6 class="h6">ШПИ уведомления должнику:<VarToClipboard name="dc_shpi_debtor"/></h6>-->
<!--                               <vs-input type="text" class="w-100" v-model="Deb.debtorCredit.shpi_debtor"  @change="changeDeb" ></vs-input>-->


<!--                               <h6 class="h6">Дата в суд Иск :<VarToClipboard name="dc_date_isk"/></h6>-->
<!--                               <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_isk" @blur="changeDeb"></vs-input>-->
<!--                               <h6 class="h6">План-Дата получения ИЛ:</h6>-->
<!--                               <vs-input type="date" class="w-100" v-model="planDateIsk" ></vs-input>-->


<!--                               <h6 class="h6" style="margin-top: 10px;">Решение суда:</h6>-->
<!--                               <vs-checkbox  v-model="Deb.debtorCredit.satisfied" @input="changeDeb">-->
<!--                                   удовлетворено-->
<!--                               </vs-checkbox>-->
<!--                               <vs-checkbox  v-model="Deb.debtorCredit.satisfied_part" @input="changeDeb">-->
<!--                                   удовлетворено частично-->
<!--                               </vs-checkbox>-->
<!--                               <vs-checkbox  v-model="Deb.debtorCredit.isk_return" @input="changeDeb">-->
<!--                                   отказано-->
<!--                               </vs-checkbox>-->
<!--                               <h6 class="h6" style="margin-top:10px">Дата решения суда:<VarToClipboard name="dc_date_sud_sol"/></h6>-->
<!--                               <vs-input type="date" class="w-100 " v-model="Deb.debtorCredit.date_sud_sol" v-on:keyup.enter="changeDeb" @blur="changeDeb"></vs-input>-->
<!--                           </fieldset>-->
                           <vs-popup class="holamundo" title="Дата определения об отказе в иске/оставление без рассмотрения :" :active.sync="showOtkz">
                             <ObjFromJsonViewButton :value="Deb.debtorCredit.data_otkz" @update_arr="UpdateData_otkz"></ObjFromJsonViewButton>
                             <!--                               <json-viewer-->
<!--                                       v-if="Deb.debtorCredit.data_otkz!=null"-->
<!--                                       :value="Deb.debtorCredit.data_otkz"-->
<!--                                       :expand-depth=5-->
<!--                                       copyable-->
<!--                                       sort></json-viewer>-->
                           </vs-popup>

<!--                         <vs-popup classContent="popup-example" title="Перепривязка судебного участка" :active.sync="popupResetJud">-->
<!--                           <ResetJud @reSetJud="reSetJud"></ResetJud>-->
<!--                         </vs-popup>-->

<!--                         <vs-popup classContent="popup-example" title="Перепривязка судебного участка" :active.sync="showJud">-->
<!--                           <Jud :number="Deb.debtor.jud_number" ></Jud>-->
<!--                         </vs-popup>-->

            <vs-popup class="holamundo" title="Дата решения суда:" :active.sync="showDatesSudSol">
              <ObjFromJsonViewButton :value="Deb.debtorCreditSud.fi_isk_date_sud_sol_arr" @update_arr="UpdateData_date_sud_sol"></ObjFromJsonViewButton>
            </vs-popup>

          <vs-popup classContent="popup-example" title="Внести изменения в сумму долга" :active.sync="showIzmSumDolg">
            <IzmSumDolg></IzmSumDolg>
          </vs-popup>
<!--                       </div>-->

<!--                   </div>-->

          <vs-popup class="holamundo" title="Дата отмены заочного решения:" :active.sync="showDatesReshSudZaoch">
            <ObjFromJsonViewButton :value="Deb.debtorCreditSud.fi_isk_resh_sud_zaoch_cancel_date_arr" @update_arr="UpdateData_fi_isk_resh_sud_zaoch_cancel_date"></ObjFromJsonViewButton>
          </vs-popup>
          <vs-popup class="holamundo" title="Дата результата:" :active.sync="showDatesIskClaim">
            <ObjFromJsonViewButton :value="Deb.debtorCreditSud.fi_isk_claim_result_date_arr" @update_arr="UpdateData_fi_isk_claim_result_date"></ObjFromJsonViewButton>
          </vs-popup>
        </div>
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
               // import ResetJud from "../ResetJud.vue";
               import axios from '../../../axios'
               import FsspAnswerInfo from "../../Fssp/FsspAnswerInfo.vue";
               import moment from 'moment';
               // import Jud from '../Jud.vue';
               // import DateControls from "./Render/DateControls.vue";
               import ObjFromJsonViewButton from '../../RenderComponent/ObjFromJsonViewButton.vue'
               import JudicialHearings from "../../Debtor/DebtorTab/Render/JudicialHearings.vue";
               import IzmSumDolg from "../../Debtor/DebtorTab/Render/IzmSumDolg.vue";
               import SettingsRegSudAct from "../Render/SettingsRegSudAct.vue";
               import DownloadFile from "../Render/DownloadFile.vue";
               // import ChangeShablon from "./Render/ChangeShablon.vue";
               import VarToClipboard from './../../VarToClipboard.vue';
               import SudCopyRequest from "../Render/SudCopyRequest.vue";
               Vue.prototype.$moment = moment;
               Vue.use(AsyncComputed)
               export default {
                   components: {
                       FsspAnswerInfo, VueSuggestions,Status,  'v-select': vSelect,JsonViewer,ObjFromJsonViewButton,
                     JudicialHearings,IzmSumDolg,SettingsRegSudAct,DownloadFile,VarToClipboard,SudCopyRequest
                   },
                   data () {
                       return {
                           gg:'{"k1":"v1","k2":"v2","k3":{"f1":"c1","f2":"c2"}}',
                           showOtkz:false,
                           sud_pp:false,
                           sud_dover:false,
                           utoch_podsud:false,
                           prav_prich:false,
                           showData_refusal_sp:false,
                           showdata_return_zay_sp:false,
                           showPrich:false,
                           years:['2021','2020','2019','2018'],
                         popupResetJud:false,
                         showJud:false,
                         showDatesSudSol:false,
                         showShabs:false,
                         find_value:'',
                         id_shablon:'',
                         shab_name:'',
                         load:'',
                         showIzmSumDolg:false,
                         showDatesReshSudZaoch:false,
                         showDatesIskClaim:false,
                       }
                   },
                   mounted(){
                       this.getBanksNameAndId();
                       this.getDataShablonDocumentsPrikaz();
                        this.getJurisName(this.Deb.debtorCredit.id);
                   },
                   asyncComputed: {

                   },
                   computed: {
                       planDateIsk(){

                           if(typeof this.Deb.debtorCredit.date_isk!='undefined'){
                               if( this.Deb.debtorCredit.date_isk!=null){
                                   let date1 = new Date(this.Deb.debtorCredit.date_isk);
                                   let fortnightAway = new Date(date1);
                                   date1.setDate(fortnightAway.getDate() + 140);
                                   return  moment(date1.toString()).format("YYYY-MM-DD")
                               }
                           }
                           return null
                       },
                       planDateSud(){
                           if(typeof this.Deb.debtorCredit.date_sud!='undefined'){
                               if(this.Deb.debtorCredit.date_sud!=null){
                                   let date1 = new Date(this.Deb.debtorCredit.date_sud);
                                   let fortnightAway = new Date(date1);
                                   date1.setDate(fortnightAway.getDate() + 112);

                                       return  moment(date1.toString()).format("YYYY-MM-DD")
                               }
                           }
                           return null
                       },
                     planDateClaim(){
                       if(typeof this.Deb.debtorCreditSud.fi_isk_claim_napr_date!='undefined'){
                         if(this.Deb.debtorCreditSud.fi_isk_claim_napr_date!=null){
                           let date1 = new Date(this.Deb.debtorCreditSud.fi_isk_claim_napr_date);
                           let fortnightAway = new Date(date1);
                           date1.setDate(fortnightAway.getDate() + 30);

                           return  moment(date1.toString()).format("YYYY-MM-DD")
                         }
                       }
                       return null
                     },
                       ...mapGetters([
                           'StatussDebtorArr','Deb','BanksArr','User','ShabPrikaz','JudicalName'

                       ]),


                   },
                   methods: {
                     UpdateData_fi_isk_claim_result_date(val){
                       this.Deb.debtorCreditSud.fi_isk_claim_result_date_arr=val
                       this.changeDebCredSud();
                     },
                     changeDebCredSudFiIskClaimResultDate(){
                       if(this.Deb.debtorCreditSud.fi_isk_claim_result_date_arr==null){
                         this.Deb.debtorCreditSud.fi_isk_claim_result_date_arr=[];
                       }
                       if(this.Deb.debtorCreditSud.fi_isk_claim_result_date_arr.length>0){
                         if(this.Deb.debtorCreditSud.fi_isk_claim_result_date!=this.Deb.debtorCreditSud.fi_isk_claim_result_date_arr[this.Deb.debtorCreditSud.fi_isk_claim_result_date_arr.length-1]){
                           this.Deb.debtorCreditSud.fi_isk_claim_result_date_arr.push(this.Deb.debtorCreditSud.fi_isk_claim_result_date)
                           this.changeDebCredSud();
                         }
                       }
                       else{
                         this.Deb.debtorCreditSud.fi_isk_claim_result_date_arr.push(this.Deb.debtorCreditSud.fi_isk_claim_result_date)
                         this.changeDebCredSud();
                       }
                     },

                     UpdateData_fi_isk_resh_sud_zaoch_cancel_date(val){
                       this.Deb.debtorCreditSud.fi_isk_resh_sud_zaoch_cancel_date_arr=val
                       this.changeDebCredSud();
                     },
                     changeDebCredSudFiIskReshSudZaochCancelDate(){
                       if(this.Deb.debtorCreditSud.fi_isk_resh_sud_zaoch_cancel_date_arr==null){
                         this.Deb.debtorCreditSud.fi_isk_resh_sud_zaoch_cancel_date_arr=[];
                       }
                       if(this.Deb.debtorCreditSud.fi_isk_resh_sud_zaoch_cancel_date_arr.length>0){
                         if(this.Deb.debtorCreditSud.fi_isk_resh_sud_zaoch_cancel_date!=this.Deb.debtorCreditSud.fi_isk_resh_sud_zaoch_cancel_date_arr[this.Deb.debtorCreditSud.fi_isk_resh_sud_zaoch_cancel_date_arr.length-1]){
                           this.Deb.debtorCreditSud.fi_isk_resh_sud_zaoch_cancel_date_arr.push(this.Deb.debtorCreditSud.fi_isk_resh_sud_zaoch_cancel_date)
                           this.changeDebCredSud();
                         }
                       }
                       else{
                         this.Deb.debtorCreditSud.fi_isk_resh_sud_zaoch_cancel_date_arr.push(this.Deb.debtorCreditSud.fi_isk_resh_sud_zaoch_cancel_date)
                         this.changeDebCredSud();
                       }
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



                       UpdateData_refusal_sp(value){
                           this.Deb.debtorCredit.data_refusal_sp=value
                           this.changeDeb()
                       },
                       UpdateData_return_zay_sp(value){
                           this.Deb.debtorCredit.data_return_zay_sp=value
                           this.changeDeb()
                       },
                     UpdateData_otkz(val){
                       this.Deb.debtorCredit.data_otkz=val
                       this.changeDeb()
                     },
                     UpdateData_date_sud_sol(val){
                       this.Deb.debtorCreditSud.fi_isk_date_sud_sol_arr=val
                       this.changeDeb();
                     },



                       sendShab(e){
                           if(e=='Почта'){
                               this.$vs.notify({
                                   title: 'Ошибка',
                                   text: 'Отправка по почте на работает  !!!',
                                   color: 'danger',
                                   position: 'top-center'
                               })
                           }
                           if(e=='Email'){
                               this.sendEmail(e)
                           }
                           if(e=='Скачать'){
                               this.getDoc(e)
                           }
                       },
                       setAutoPeremen(e){
                           for (let i=0;i<e.sud_peremen.length;i++){
                               if(e.sud_peremen[i].avto==true&&e.sud_peremen[i].type=='date'){
                                   let date1 = new Date();
                                   this.Deb.debtorCredit.sud[e.sud_peremen[i].peremen]=moment(date1.toString()).format("YYYY-MM-DD")
                                   this.changeDeb()
                               }

                           }
                       },
                       getDoc(e){
                          // this.setAutoPeremen(e)
                           this.$vs.loading({color: '#ff8000'})
                           axios.get(r("shablonDocument.index"), {
                               responseType: 'arraybuffer',

                               params: {
                                   method: 'getDoc',
                                   param:{
                                       id_shab:this.id_shablon,
                                       id_credit:this.Deb.debtorCredit.id
                                   }


                               }
                           }).then((response) => {
                               // this.setAutoPeremen(e)
                               const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));

                               let filename=response.headers['content-disposition'].replace('attachment; filename=', '');

                               filename = filename.split('; filename*=utf')[0];

                               const link = document.createElement('a');
                               link.href = url;
                               link.setAttribute('download', filename);
                               document.body.appendChild(link);
                               link.click();

                               this.$vs.loading.close()


                           }).catch(error => {
                               this.$vs.loading.close()
                               //   this.popupActive3=false;
                               this.$vs.notify({
                                   title: 'Ошибка',
                                   text: error.message,
                                   color: 'danger',
                                   position: 'top-center'
                               })

                           });
                       },
                       sendEmail(e){
                           // this.setAutoPeremen(e)
                           this.$vs.loading({color: '#ff8000'})
                           axios.get(r("shablonDocument.index"), {


                               params: {
                                   method: 'sendEmail',
                                   param:{
                                       id_shab:e.id,
                                       id_credit:this.Deb.debtorCredit.id
                                   }


                               }
                           }).then((response) => {
                               this.setAutoPeremen(e)

                               this.$vs.notify({  title:'Успешно', text: 'Отправленно' , color: 'success', position: 'top-center' })
                               this.$vs.loading.close()


                           }).catch(error => {
                               this.$vs.loading.close()
                               //   this.popupActive3=false;
                               this.$vs.notify({
                                   title: 'Ошибка',
                                   text: error.message,
                                   color: 'danger',
                                   position: 'top-center'
                               })

                           });
                       },
                       savePrich(){
                           let stat=false;
                           let prich=[];
                           if(this.prav_prich){
                               prich.push('Правовая причина')
                           }
                           if(this.sud_pp){
                               this.setJudPP(this.Deb.debtor.jud_number);
                               prich.push('Оригинал ПП госпошлина')
                           }
                           if(this.sud_dover){
                               this.setJudDov(this.Deb.debtor.jud_number);
                               prich.push('Оригинал доверенность')
                           }
                           if(this.utoch_podsud){
                               prich.push('Уточнить подсудность')
                               stat=true;
                           }

                           if(this.Deb.debtorCredit.data_return_zay_sp==null){
                               this.Deb.debtorCredit.data_return_zay_sp=[];
                           }
                           if(this.Deb.debtorCredit.data_return_zay_sp.length>0){
                               if(this.Deb.data_return_zay_sp!=this.Deb.debtorCredit.data_return_zay_sp[this.Deb.debtorCredit.data_return_zay_sp.length-1]||typeof this.Deb.debtorCredit.data_return_zay_sp[this.Deb.debtorCredit.data_return_zay_sp.length-1].date=='undefined'){
                                   this.Deb.debtorCredit.data_return_zay_sp.push({
                                       date:this.Deb.data_return_zay_sp,
                                       prich:prich,
                                       user:this.User.name_family+' '+this.User.name+' '+this.User.name_patronymic,
                                       userId:this.User.id,


                                   })
                                   if(!stat){
                                   }
           //                        this.changeDebUpdate();
           //                        this.$refs.status.setStatus(3);
                               }
                           }
                           else{
                               this.Deb.debtorCredit.data_return_zay_sp.push({
                                   date:this.Deb.data_return_zay_sp,
                                   prich:prich,
                                   user:this.User.name_family+' '+this.User.name+' '+this.User.name_patronymic,
                                   userId:this.User.id,


                               })
                               if(!stat){
                               }
           //                    this.changeDebUpdate();
           //                    this.$refs.status.setStatus(3);
                           }
                           this.prav_prich=false
                           this.sud_pp=false
                           this.sud_dover=false
                           this.utoch_podsud=false
                           this.changeDeb();
                           this.showPrich=false

                       },
                       changeDebDateReturnZaySp(){

                           if(this.Deb.debtorCredit.data_return_zay_sp==null){
                               this.Deb.debtorCredit.data_return_zay_sp=[];
                           }
                           if(this.Deb.debtorCredit.data_return_zay_sp.length>0){
                               if(this.Deb.data_return_zay_sp!=this.Deb.debtorCredit.data_return_zay_sp[this.Deb.debtorCredit.data_return_zay_sp.length-1].date){
                                   this.showPrich=true
                               }
                           }
                           else{
                               this.showPrich=true
                           }

                       },

                       changeDebDateRefusalSp(){
                           if(this.Deb.debtorCredit.data_refusal_sp==null){
                               this.Deb.debtorCredit.data_refusal_sp=[];
                           }
                           if(this.Deb.debtorCredit.data_refusal_sp.length>0){
                               if(this.Deb.data_refusal_sp!=this.Deb.debtorCredit.data_refusal_sp[this.Deb.debtorCredit.data_refusal_sp.length-1]){
                                   this.Deb.debtorCredit.data_refusal_sp.push(this.Deb.data_refusal_sp)
                                   this.changeDeb();
                               }
                           }
                           else{
                               this.Deb.debtorCredit.data_refusal_sp.push(this.Deb.data_refusal_sp)
                               this.changeDeb();
                           }

                       },
                       changeDebPerem(e){

                           if(this.Deb.debtorCredit.sud==null){
                               this.Deb.debtorCredit.sud={};
                           }
                           this.Deb.debtorCredit.sud[e]=this.Deb.debtorCredit.sud[e];
                           this.changeDeb()

                       },
                       close(){
                           this.$router.back()
                       },
                     changeDebDateOkz(){
                       if(this.Deb.debtorCredit.data_otkz==null){
                         this.Deb.debtorCredit.data_otkz=[];
                       }
                       if(this.Deb.debtorCredit.data_otkz.length>0){
                         if(this.Deb.data_otkz!=this.Deb.debtorCredit.data_otkz[this.Deb.debtorCredit.data_otkz.length-1]){
                           if(typeof this.Deb.data_otkz!='undefined') {
                             this.Deb.debtorCredit.data_otkz.push(this.Deb.data_otkz)
                             this.changeDeb();
                           }
                         }
                       }
                       else{
                         if(typeof this.Deb.data_otkz!='undefined') {
                           this.Deb.debtorCredit.data_otkz.push(this.Deb.data_otkz)
                           this.changeDeb();
                         }
                       }


                     },
                     changeDebCredSud(){
                       // this.DebtorCreditSud.id_credit = this.Deb.debtorCredit.id;
                       this.changeDeb();
                     },
                     changeDebSudSol(){
                       if(this.Deb.debtorCreditSud.fi_isk_date_sud_sol_arr==null){
                         this.Deb.debtorCreditSud.fi_isk_date_sud_sol_arr=[];
                       }
                       if(this.Deb.debtorCreditSud.fi_isk_date_sud_sol_arr.length>0){
                         if(this.Deb.debtorCredit.date_sud_sol!=this.Deb.debtorCreditSud.fi_isk_date_sud_sol_arr[this.Deb.debtorCreditSud.fi_isk_date_sud_sol_arr.length-1]){
                           this.Deb.debtorCreditSud.fi_isk_date_sud_sol_arr.push(this.Deb.debtorCredit.date_sud_sol)
                           this.changeDeb();
                         }
                       }
                       else{
                         this.Deb.debtorCreditSud.fi_isk_date_sud_sol_arr.push(this.Deb.debtorCredit.date_sud_sol)
                         this.changeDeb();
                       }
                     },

                       ...mapActions([
                           'saveDebtor','getDataStatuss','getDataDebtorsById','getBanksNameAndId','changeDeb','getDataDebtorsById',
                           'getDataShablonDocumentsPrikaz','setJudPP','getJudicialsListForReset','getJurisName'
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
