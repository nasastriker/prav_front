<template>
    <div >
        <div class="mt-5">

          <JudicialHearings :sud_type="'app'"></JudicialHearings>
          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Апелляционная жалоба">
              <div class="vx-col mb-2" style="margin-top: 10px">
              <VarToClipboard name="dcs_app_claim_dolj"/>
              <vs-checkbox v-model="Deb.debtorCreditSud.app_claim_dolj" @input="changeDebCredSud">
                АЖ подана должником
              </vs-checkbox>
              </div>

              <h6 style="margin-top: 20px">Копия АЖ должнику:</h6>

              <div class="vx-row" style="padding-top: 10px;">
                <div class="vx-col mb-2">
                  <h6 class="h6">Дата:<VarToClipboard name="dcs_app_claim_copy_date"/></h6>
                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.app_claim_copy_date"  @blur="changeDebCredSud"></vs-input>
                </div>
                <div class="vx-col mb-2">
                  <h6 class="h6">ШПИ:<VarToClipboard name="dcs_app_claim_copy_shpi"/></h6>
                  <vs-input type="text" class="w-100" v-model="Deb.debtorCreditSud.app_claim_copy_shpi" @change="changeDebCredSud"></vs-input>
                </div>
                <div class="vx-col mb-2">
                <vs-button color="primary" style="margin-top: 15px">Направить</vs-button>
                  <SettingsRegSudAct :perem="'app_claim_copy_date'" :type="'otpr'"></SettingsRegSudAct>
                </div>
              </div>

              <JudChange style="margin-top: 15px"></JudChange>


                <div style="margin-top: 15px">
                  <h6 class="h6">Дата в суд АЖ:<VarToClipboard name="dcs_app_claim_sud_date"/></h6>
                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.app_claim_sud_date"  @blur="changeDebCredSud"></vs-input>
                  <h6 class="h6">План-Дата Результат:</h6>
                  <vs-input type="date" class="w-100" disabled="true" v-model="planDateSud"></vs-input>
                  <h6 class="h6">Дата возражений на АЖ:<VarToClipboard name="dcs_app_claim_vozr_date"/></h6>
                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.app_claim_vozr_date"  @blur="changeDebCredSud"></vs-input>
                </div>



<!--                <div class="vx-col sm:w-1/2 w-full mb-2">-->
<!--                  <DateControls></DateControls>-->
<!--                </div>-->
<!--              </div>-->
            </vs-tab>
          </vs-tabs>

          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Определение об отказе в АЖ/оставление без рассмотрения">
              <div class="vx-row" style="padding-top: 20px;">
                <div class="vx-col mb-2">
                  <h6 class="h6">Дата определения:<VarToClipboard name="dcs_app_opred_date"/></h6>
                  <vs-input type="date" class="w-100 " v-model="Deb.debtorCreditSud.app_opred_date" v-on:keyup.enter="changeDebCredSudAppOpredDate" @blur="changeDebCredSudAppOpredDate"></vs-input>
                </div>
                <div class="vx-col mb-2" style="margin-top: 15px">
                  <div class="vx-row">
                    <SudCopyRequest :perem="'app_opred_date'" @refreshAfterSend="refreshAfterSend"></SudCopyRequest>
                <vs-button color="primary" style="margin-left: 10px" @click="showDatesAppOpred=!showDatesAppOpred">История</vs-button>
                <vs-button color="primary" style="margin-left: 10px">Файл</vs-button>
                <SettingsRegSudAct :perem="'app_opred_date'" :type="'zapros'"></SettingsRegSudAct>
                  </div>
                </div>
              </div>
            </vs-tab>
          </vs-tabs>

          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Решение суда АЖ">
              <div class="vx-row" style="padding-top: 20px;">
                <div class="vx-col mb-2">
                  <h6 class="h6">Дата решения:<VarToClipboard name="dcs_app_resh_sud_date"/></h6>
                  <vs-input type="date" class="w-100 " v-model="Deb.debtorCreditSud.app_resh_sud_date" v-on:keyup.enter="changeDebCredSudAppReshSudDate" @blur="changeDebCredSudAppReshSudDate"></vs-input>
                </div>
                <div class="vx-col mb-2" style="margin-top: 15px">
                  <div class="vx-row">
                    <SudCopyRequest :perem="'app_resh_sud_date'" @refreshAfterSend="refreshAfterSend"></SudCopyRequest>
                <vs-button color="primary" style="margin-left: 10px" @click="showDatesAppReshSudDate=!showDatesAppReshSudDate">История</vs-button>
                <vs-button color="primary" style="margin-left: 10px">Файл</vs-button>
                <SettingsRegSudAct :perem="'app_resh_sud_date'" :type="'zapros'"></SettingsRegSudAct>
                  </div>
                </div>
              </div>
              <div class="vx-row" style="padding-top: 20px;">
                <div class="vx-col mb-2">
                  <h6 class="h6" style="margin-top: 10px;">Результат:</h6>
                  <VarToClipboard name="dcs_app_resh_sud_success"/>
                  <vs-checkbox v-model="Deb.debtorCreditSud.app_resh_sud_success" @input="changeDebCredSud">
                    Удовлетворено
                  </vs-checkbox>
                  <VarToClipboard name="dcs_app_resh_sud_success_chast"/>
                  <vs-checkbox v-model="Deb.debtorCreditSud.app_resh_sud_success_chast" @input="changeDebCredSud">
                    Удовлетворено частично
                  </vs-checkbox>
                  <VarToClipboard name="dcs_app_resh_sud_cancel"/>
                  <vs-checkbox v-model="Deb.debtorCreditSud.app_resh_sud_cancel" @input="changeDebCredSud">
                    Отказано
                  </vs-checkbox>
                </div>
                <div style="margin-left: 20px">
                  <vs-button color="primary" style="width: 300px;margin-top: 20px" @click="showIzmSumDolg=!showIzmSumDolg">Внести изменения в сумму долга</vs-button>
                </div>
              </div>
            </vs-tab>
          </vs-tabs>

          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Шаблоны документов">
              <ChangeShablon :perem="'shablon_appelation'" @refreshAfterSend="refreshAfterSend"></ChangeShablon>
              <DateControls :perem="'appelation'" :ref="'comp_date_controls'"></DateControls>
            </vs-tab>
          </vs-tabs>


          <vs-popup classContent="popup-example" title="Перепривязка судебного участка" :active.sync="popupResetJud">
            <ResetJud @reSetJud="reSetJud"></ResetJud>
          </vs-popup>
          <vs-popup classContent="popup-example" title="Перепривязка судебного участка" :active.sync="showJud">
            <Jud :number="Deb.debtor.jud_number" ></Jud>
          </vs-popup>
          <vs-popup class="holamundo" title="Дата определения:" :active.sync="showDatesAppOpred">
            <ObjFromJsonViewButton :value="Deb.debtorCreditSud.app_opred_date_arr" @update_arr="UpdateData_date_app_opred"></ObjFromJsonViewButton>
          </vs-popup>
          <vs-popup class="holamundo" title="Дата решения суда:" :active.sync="showDatesAppReshSudDate">
            <ObjFromJsonViewButton :value="Deb.debtorCreditSud.app_resh_sud_date_arr" @update_arr="UpdateData_date_app_resh_sud_date"></ObjFromJsonViewButton>
          </vs-popup>
          <vs-popup classContent="popup-example" title="Внести изменения в сумму долга" :active.sync="showIzmSumDolg">
            <IzmSumDolg></IzmSumDolg>
          </vs-popup>
        </div>
    </div>
</template>

<script>
    import DateControls from "./Render/DateControls.vue";
    import JudicialHearings from "./Render/JudicialHearings.vue";
    import ResetJud from "../ResetJud.vue";
    import Jud from '../Jud.vue';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import ObjFromJsonViewButton from '../../RenderComponent/ObjFromJsonViewButton.vue'
    import axios from "../../../axios";
    import r from "../../../route";
    import moment from "moment";
    import ChangeShablon from "./Render/ChangeShablon.vue";
    import JudChange from "../../RegSudAct/Render/JudChange.vue";
    import IzmSumDolg from "./Render/IzmSumDolg.vue";
    import SettingsRegSudAct from "../../RegSudAct/Render/SettingsRegSudAct.vue";
    import VarToClipboard from './../../VarToClipboard.vue';
    import SudCopyRequest from "../../RegSudAct/Render/SudCopyRequest.vue";
    export default {
        components: {
          ResetJud,Jud,ObjFromJsonViewButton,JudicialHearings,DateControls,ChangeShablon,JudChange,IzmSumDolg,
          SettingsRegSudAct,VarToClipboard,SudCopyRequest
        },

        //props:['idDep','back'],
        data () {
            return {
              popupResetJud:false,
              showJud:false,
              showDatesAppOpred:false,
              showDatesAppReshSudDate:false,
              showIzmSumDolg:false,
            }
        },
        mounted(){


        },

        asyncComputed: {

        },
        computed: {
          planDateSud(){
            if(typeof this.Deb.debtorCreditSud.app_claim_sud_date!='undefined'){
              if(this.Deb.debtorCreditSud.app_claim_sud_date!=null){
                let date1 = new Date(this.Deb.debtorCreditSud.app_claim_sud_date);
                let fortnightAway = new Date(date1);
                date1.setDate(fortnightAway.getDate() + 30);

                return  moment(date1.toString()).format("YYYY-MM-DD")
              }
            }
            return null
          },

            ...mapGetters([
                'User','Deb','JudicalName'

            ]),


        },
        methods: {
          refreshAfterSend(){
            this.$refs.comp_date_controls.refreshDateControls();
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
          changeDebCredSud(){
            this.changeDeb();
          },
          changeDebCredSudAppOpredDate(){
            if(this.Deb.debtorCreditSud.app_opred_date_arr==null){
              this.Deb.debtorCreditSud.app_opred_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.app_opred_date_arr.length>0){
              if(this.Deb.debtorCreditSud.app_opred_date!=this.Deb.debtorCreditSud.app_opred_date_arr[this.Deb.debtorCreditSud.app_opred_date_arr.length-1]){
                this.Deb.debtorCreditSud.app_opred_date_arr.push(this.Deb.debtorCreditSud.app_opred_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.app_opred_date_arr.push(this.Deb.debtorCreditSud.app_opred_date)
              this.changeDebCredSud();
            }
          },
          UpdateData_date_app_opred(val){
            this.Deb.debtorCreditSud.app_opred_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudAppReshSudDate(){
            if(this.Deb.debtorCreditSud.app_resh_sud_date_arr==null){
              this.Deb.debtorCreditSud.app_resh_sud_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.app_resh_sud_date_arr.length>0){
              if(this.Deb.debtorCreditSud.app_resh_sud_date!=this.Deb.debtorCreditSud.app_resh_sud_date_arr[this.Deb.debtorCreditSud.app_resh_sud_date_arr.length-1]){
                this.Deb.debtorCreditSud.app_resh_sud_date_arr.push(this.Deb.debtorCreditSud.app_resh_sud_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.app_resh_sud_date_arr.push(this.Deb.debtorCreditSud.app_resh_sud_date)
              this.changeDebCredSud();
            }
          },
          UpdateData_date_app_resh_sud_date(val){
            this.Deb.debtorCreditSud.app_resh_sud_date_arr=val
            this.changeDebCredSud();
          },

          ...mapActions([
            'saveDebtor','getDataStatuss','getDataDebtorsById','changeDeb','getDataDebtorsById',
            'setJudPP','getJurisName'
          ]),

        },
    }
</script>

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
