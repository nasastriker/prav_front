<template xmlns="http://www.w3.org/1999/html">

        <div>

          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Определение о возврате заявления">
              <div class="vx-row" style="padding-top: 20px;">
                <div class="vx-col mb-2">
                    <h6 class="h6">Дата определения о возврате</h6>
                    <h6 class="h6 mb-1">заявления:<VarToClipboard name="d_data_return_zay_sp"/></h6>
                    <vs-input type="date" class="w-100 " v-model="Deb.data_return_zay_sp" v-on:keyup.enter="changeDebDateReturnZaySp"  @blur="changeDebDateReturnZaySp"></vs-input>
                </div>
                <div class="vx-col mb-2" style="margin-top: 30px">
                  <div class="vx-row">
                    <SudCopyRequest class="mt-1" :perem="'data_return_zay_sp'"></SudCopyRequest>
                    <vs-button color="primary" class="mt-1 ml-4" @click="showdata_return_zay_sp=!showdata_return_zay_sp">История</vs-button>
                    <DownloadFile class="mt-1" :perem_type_doc="'credit_opredelenie_o_vozvraschenii_zayavleniya_sp'"></DownloadFile>
                    <SettingsRegSudAct class="mt-1" :perem="'data_return_zay_sp'" :type="'zapros'"></SettingsRegSudAct>
                  </div>
                </div>
              </div>
            </vs-tab>
          </vs-tabs>

          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Определение отказ-отмена СП">
              <div class="vx-row" style="padding-top: 20px;">
                <div class="vx-col mb-2">
                  <h6 class="h6 mb-1">Дата определения отказ-отмена СП:<VarToClipboard name="d_data_refusal_sp"/></h6>
                  <vs-input type="date" class="w-100 " v-model="Deb.data_refusal_sp"   v-on:keyup.enter="changeDebDateRefusalSp"  @blur="changeDebDateRefusalSp"></vs-input>
                </div>
                <div class="vx-col mb-2" style="margin-top: 15px; margin-left: -8px;">
                  <div class="vx-row">
                    <SudCopyRequest class="mt-1" :perem="'data_refusal_sp'"></SudCopyRequest>
                    <vs-button color="primary" class="mt-1 ml-4" @click="showData_refusal_sp=!showData_refusal_sp">История</vs-button>
                    <DownloadFile class="mt-1" :perem_type_doc="'credit_otmena'"></DownloadFile>
                    <SettingsRegSudAct :perem="'data_refusal_sp'" :type="'zapros'"></SettingsRegSudAct>
                  </div>
                </div>
              </div>
            </vs-tab>
          </vs-tabs>


          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Частная жалоба отказ-отмена СП">
              <div style="padding-top: 20px" v-if="Deb.debtorCreditSud.fi_prikaz_claim_send_status == 1">
                <h5 style="color: blue">Готова к отправке</h5>
              </div>
            <div class="vx-row" style="padding-top: 20px;">
              <div class="vx-col mb-2">
            <h6 class="h6 mb-1">Дата результата:<VarToClipboard name="dcs_fi_prikaz_claim_result_date"/></h6>
            <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.fi_prikaz_claim_result_date" @blur="changeDebCredSudFiPrikazClaimResultDate"></vs-input>
              </div>
              <div class="vx-col mb-2">
            <h6 class="h6 mb-1">Результат:</h6>
            <VarToClipboard name="dcs_fi_prikaz_claim_result_success"/>
            <vs-checkbox v-model="Deb.debtorCreditSud.fi_prikaz_claim_result_success" @input="changeDebCredSud">
              удовлетворено
            </vs-checkbox>
                  <div style="margin-top: 5px">
            <VarToClipboard name="dcs_fi_prikaz_claim_result_cancel"/>
            <vs-checkbox v-model="Deb.debtorCreditSud.fi_prikaz_claim_result_cancel" @input="changeDebCredSud">
              отказано
            </vs-checkbox>
                </div>
            </div>
              <div class="vx-col mb-2" style="margin-top: 10px">
                <div class="vx-row">
                  <SudCopyRequest :perem="'fi_prikaz_claim_napr_date'"></SudCopyRequest>
                  <vs-button color="primary" style="margin-left: 10px" @click="showDatesPrikazClaim=!showDatesPrikazClaim">История</vs-button>
                  <DownloadFile :perem_type_doc="'credit_claim_otkaz_otmena'"></DownloadFile>
                  <SettingsRegSudAct :perem="'fi_prikaz_claim_napr_date'" :type="'all'"></SettingsRegSudAct>
                </div>
              </div>
            </div>
            </vs-tab>
          </vs-tabs>



            <vs-popup class="holamundo"   title="Причины возрата :" :active.sync="showPrich">
                            <span  style="text-align: center" >
                            <div class="vx-col w-2/4  mb-2" style="border: 1px;margin-top: 20px">


                                <h6 class="h6 mb-1" style="margin-left: 10px;">Причины возврата:</h6>
                            </div>

                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="prav_prich" >
                                    Правовая причина
                                </vs-checkbox>


                            </div>
                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="sud_pp" >
                                    оригинал ПП госпошлина
                                </vs-checkbox>


                            </div>

                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="sud_dover" >
                                    оригинал доверенность
                                </vs-checkbox>


                            </div>
                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="utoch_podsud" >
                                    уточнить подсудность
                                </vs-checkbox>


                            </div>
                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-button color="primary" style="    margin-top: 15px;" class="pull-right" type="filled"  @click="savePrich">Сохранить</vs-button>

                            </div>
                        </span>
            </vs-popup>
            <vs-popup class="holamundo" title="Дата определения отказе/отмене СП :" :active.sync="showData_refusal_sp">
                 <ObjFromJsonViewButton :value="Deb.debtorCredit.data_refusal_sp" @update_arr="UpdateData_refusal_sp"></ObjFromJsonViewButton>

                <!--
             <json-viewer
                            v-if="Deb.debtorCredit.data_refusal_sp!=null"
                            :value="Deb.debtorCredit.data_refusal_sp"
                            :expand-depth=5
                            copyable

                            sort></json-viewer>
                    !-->

               </vs-popup>
               <vs-popup class="holamundo" title="Дата определения о возврате заявления на СП :" :active.sync="showdata_return_zay_sp">
                   <ObjFromJsonViewButton :value="Deb.debtorCredit.data_return_zay_sp" @update_arr="UpdateData_return_zay_sp"></ObjFromJsonViewButton>


                   <!--        <json-viewer
                                   v-if="Deb.debtorCredit.data_return_zay_sp!=null"
                                   :value="Deb.debtorCredit.data_return_zay_sp"
                                   :expand-depth=5
                                   copyable

                                   sort></json-viewer>
                                   !-->
                       </vs-popup>



<!--                       <div class="vx-col sm:w-2/3 w-full mb-2" style="border: 1px;">-->

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
<!--                           <vs-popup class="holamundo" title="Дата определения об отказе в иске/оставление без рассмотрения :" :active.sync="showOtkz">-->
<!--                               <json-viewer-->
<!--                                       v-if="Deb.debtorCredit.data_otkz!=null"-->
<!--                                       :value="Deb.debtorCredit.data_otkz"-->
<!--                                       :expand-depth=5-->
<!--                                       copyable-->
<!--                                       sort></json-viewer>-->
<!--                           </vs-popup>-->

<!--                         <vs-popup classContent="popup-example" title="Перепривязка судебного участка" :active.sync="popupResetJud">-->
<!--                           <ResetJud @reSetJud="reSetJud"></ResetJud>-->
<!--                         </vs-popup>-->

<!--                         <vs-popup classContent="popup-example" title="Перепривязка судебного участка" :active.sync="showJud">-->
<!--                           <Jud :number="Deb.debtor.jud_number" ></Jud>-->
<!--                         </vs-popup>-->
<!--                       </div>-->

<!--                   </div>-->
          <vs-popup class="holamundo" title="Дата результата:" :active.sync="showDatesPrikazClaim">
            <ObjFromJsonViewButton :value="Deb.debtorCreditSud.fi_prikaz_claim_result_date_arr" @update_arr="UpdateData_fi_prikaz_claim_result_date"></ObjFromJsonViewButton>
          </vs-popup>

        </div>
           </template>

           <script>
               import Vue from 'vue'
               import AsyncComputed from 'vue-async-computed'
               import JsonViewer from 'vue-json-viewer'
               import { mapActions,mapGetters } from 'vuex'
               import VueSuggestions from 'vue-suggestions';
               import vSelect from 'vue-select'
               import Status from '../../../components/Status.vue'
               import r from '../../../route';
               // import ResetJud from "../ResetJud.vue";
               import axios from '../../../axios'
               import FsspAnswerInfo from "../../Fssp/FsspAnswerInfo.vue";
               import moment from 'moment';
               import SettingsRegSudAct from "../Render/SettingsRegSudAct.vue";
               import DownloadFile from "../Render/DownloadFile.vue";
               // import Jud from '../Jud.vue';
               import ObjFromJsonViewButton from '../../RenderComponent/ObjFromJsonViewButton.vue';
               import VarToClipboard from './../../VarToClipboard.vue';
               import SudCopyRequest from "../Render/SudCopyRequest.vue";
               Vue.prototype.$moment = moment;
               Vue.use(AsyncComputed)
               export default {
                   components: {
                       FsspAnswerInfo, VueSuggestions,Status,  'v-select': vSelect,JsonViewer,ObjFromJsonViewButton,
                     SettingsRegSudAct,DownloadFile,VarToClipboard,SudCopyRequest
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
                         showDatesPrikazClaim:false,
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
                       if(typeof this.Deb.debtorCreditSud.fi_prikaz_claim_napr_date!='undefined'){
                         if(this.Deb.debtorCreditSud.fi_prikaz_claim_napr_date!=null){
                           let date1 = new Date(this.Deb.debtorCreditSud.fi_prikaz_claim_napr_date);
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
                     UpdateData_fi_prikaz_claim_result_date(val){
                       this.Deb.debtorCreditSud.fi_prikaz_claim_result_date_arr=val
                       this.changeDebCredSud();
                     },
                     changeDebCredSudFiPrikazClaimResultDate(){
                       if(this.Deb.debtorCreditSud.fi_prikaz_claim_result_date_arr==null){
                         this.Deb.debtorCreditSud.fi_prikaz_claim_result_date_arr=[];
                       }
                       if(this.Deb.debtorCreditSud.fi_prikaz_claim_result_date_arr.length>0){
                         if(this.Deb.debtorCreditSud.fi_prikaz_claim_result_date!=this.Deb.debtorCreditSud.fi_prikaz_claim_result_date_arr[this.Deb.debtorCreditSud.fi_prikaz_claim_result_date_arr.length-1]){
                           this.Deb.debtorCreditSud.fi_prikaz_claim_result_date_arr.push(this.Deb.debtorCreditSud.fi_prikaz_claim_result_date)
                           this.changeDebCredSud();
                         }
                       }
                       else{
                         this.Deb.debtorCreditSud.fi_prikaz_claim_result_date_arr.push(this.Deb.debtorCreditSud.fi_prikaz_claim_result_date)
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

                       changeDebDateOkz(){
                           if(this.Deb.debtorCredit.data_otkz==null){
                               this.Deb.debtorCredit.data_otkz=[];
                           }
                           if(this.Deb.debtorCredit.data_otkz.length>0){
                               if(this.Deb.data_otkz!=this.Deb.debtorCredit.data_otkz[this.Deb.debtorCredit.data_otkz.length-1]){
                                   this.Deb.debtorCredit.data_otkz.push(this.Deb.data_otkz)
                                   this.changeDeb();
                               }
                           }
                           else{
                               this.Deb.debtorCredit.data_otkz.push(this.Deb.data_otkz)
                               this.changeDeb();
                           }


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
                                 this.changeDeb().then(() => {
                                   this.getDataDebtorsById(this.Deb.debtorCredit.id)
                                 });
                               }
                           }
                           else{
                               this.Deb.debtorCredit.data_refusal_sp.push(this.Deb.data_refusal_sp)
                             this.changeDeb().then(() => {
                               this.getDataDebtorsById(this.Deb.debtorCredit.id)
                             });
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

                     changeDebCredSud(){
                       // this.DebtorCreditSud.id_credit = this.Deb.debtorCredit.id;
                       this.changeDeb();
                     },


                       ...mapActions([
                           'saveDebtor','getDataStatuss','getDataDebtorsById','getBanksNameAndId','changeDeb','getDataDebtorsById',
                           'getDataShablonDocumentsPrikaz','setJudPP','getJudicialsListForReset','getJurisName',
                           'getShablonDocumentList','getShablonName','setJudDov'
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
