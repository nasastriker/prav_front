<template>
    <div >
        <div class="mt-5">

          <div class="vx-row">
            <div class="vx-col mb-2" style="margin-left: 10px">
              <MestoId></MestoId>
            </div>
              <div class="vx-col mb-2" style="margin-top: 25px">
                <vs-checkbox v-model="Deb.debtorCredit.response_return_sa" @input="changeDebAndLoad">ИД в офисе</vs-checkbox>
              </div>
          </div>

          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Заявление правопреемство">
                <div class="vx-row" style="margin-top: 20px;">
                  <div class="vx-col mb-2">
                <h6 class="h6 mb-1">Дата результата:<VarToClipboard name="dcs_pr_zay_result_date"/></h6>
                <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.pr_zay_result_date"  @blur="changeDebCredSudPrZayResultDate"></vs-input>
                  </div>
                  <div class="vx-col mb-2">
                <h6 class="h6 mb-1">Результат:</h6>
                <VarToClipboard name="dcs_pr_zay_result_success"/>
                <vs-checkbox v-model="Deb.debtorCreditSud.pr_zay_result_success" @input="changeDebCredSud">
                  Удовлетворено
                </vs-checkbox>
                    <div style="margin-top: 5px">
                <VarToClipboard name="dcs_pr_zay_result_cancel"/>
                <vs-checkbox v-model="Deb.debtorCreditSud.pr_zay_result_cancel" @input="changeDebCredSud">
                  Отказано
                </vs-checkbox>
                  </div>
                </div>
                  <div class="vx-col mb-2" style="margin-top: 10px">
                    <div class="vx-row">
                      <SudCopyRequest :perem="'pr_zay_napr_date'"></SudCopyRequest>
                      <vs-button color="primary" style="margin-left: 10px" @click="showDatesPrZay=!showDatesPrZay">История</vs-button>
                      <DownloadFile :perem_type_doc="'credit_zayavlenie_pravopreemstvo'"></DownloadFile>
                      <SettingsRegSudAct :perem="'pr_zay_napr_date'" :type="'all'"></SettingsRegSudAct>
                    </div>
                  </div>
            </div>
            </vs-tab>
          </vs-tabs>


          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Описка определение правопреемство">
            <div class="vx-row">
              <div class="vx-col sm:w-1/2 w-full mb-2" style="border: 1px;margin-top: 20px;">
                <div style="color: red">
                  Сверка данных:
                </div>
                <VarToClipboard name="all_pravo_opiska"/>
                <DynCheckBoxList :prist_perem="'pravo_opiska'"></DynCheckBoxList>
                <div style="margin-top: 15px">
<!--                  <VarToClipboard name="dcs_pr_opiska_err_fio"/>-->
                  <vs-checkbox v-model="Deb.debtorCreditSud.pr_opiska_err_fio" @input="changeDebCredSud">
                    Ошибка в ФИО должника
                  </vs-checkbox>
                </div>
                <div style="margin-top: 10px">
<!--                  <VarToClipboard name="dcs_pr_opiska_err_nomer"/>-->
                  <vs-checkbox v-model="Deb.debtorCreditSud.pr_opiska_err_nomer" @input="changeDebCredSud">
                    Ошибка в номере и (или) дате исполнительного документа
                  </vs-checkbox>
                </div>
                <div style="margin-top: 10px">
<!--                  <VarToClipboard name="dcs_pr_opiska_err_name"/>-->
                  <vs-checkbox v-model="Deb.debtorCreditSud.pr_opiska_err_name" @input="changeDebCredSud">
                    Ошибка в наименовании Взыскателя
                  </vs-checkbox>
                </div>
              </div>
              <div class="vx-col sm:w-1/2 w-full mb-2" style="border: 1px;margin-bottom: 30px">
                <ChangeShablon :type_visual="1" :perem="'shablon_pravo'"></ChangeShablon>
              </div>
            </div>

              <div style="margin-top: 20px">
                <div class="vx-row">
                  <div class="vx-col mb-2">
                <h6 class="h6 mb-1">Дата результата:<VarToClipboard name="dcs_pr_opiska_result_date"/></h6>
                <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.pr_opiska_result_date"  @blur="changeDebCredSudPrOpiskaResultDate"></vs-input>
                  </div>
                  <div class="vx-col mb-2">
                <h6 class="h6 mb-1">Результат:</h6>
                <VarToClipboard name="dcs_pr_opiska_result_success"/>
                <vs-checkbox v-model="Deb.debtorCreditSud.pr_opiska_result_success" @input="changeDebCredSud">
                  Удовлетворено
                </vs-checkbox>
                    <div style="margin-top: 5px">
                <VarToClipboard name="dcs_pr_opiska_result_cancel"/>
                <vs-checkbox v-model="Deb.debtorCreditSud.pr_opiska_result_cancel" @input="changeDebCredSud">
                  Отказано
                </vs-checkbox>
                  </div>
                </div>
                  <div class="vx-col mb-2" style="margin-top: 10px">
                    <div class="vx-row">
                      <SudCopyRequest :perem="'pr_opiska_napr_date'"></SudCopyRequest>
                      <vs-button color="primary" style="margin-left: 10px" @click="showDatesPrOpiska=!showDatesPrOpiska">История</vs-button>
                      <DownloadFile :perem_type_doc="'credit_opiska_pravopreemstvo'"></DownloadFile>
                      <SettingsRegSudAct :perem="'pr_opiska_napr_date'" :type="'all'"></SettingsRegSudAct>
                    </div>
                  </div>
              </div>
              </div>
            </vs-tab>
          </vs-tabs>

          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Частная жалоба отказ правопреемство">
              <div class="vx-row" style="margin-top: 20px;">
                <div class="vx-col mb-2">
                  <h6 class="h6 mb-1">Дата результата:<VarToClipboard name="dcs_pr_claim_result_date"/></h6>
                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.pr_claim_result_date"  @blur="changeDebCredSudPrClaimResultDate"></vs-input>
                </div>
                <div class="vx-col mb-2">
                  <h6 class="h6 mb-1">Результат:</h6>
                  <VarToClipboard name="dcs_pr_claim_result_success"/>
                  <vs-checkbox v-model="Deb.debtorCreditSud.pr_claim_result_success" @input="changeDebCredSud">
                    Удовлетворено
                  </vs-checkbox>
                  <div style="margin-top: 5px">
                    <VarToClipboard name="dcs_pr_claim_result_cancel"/>
                    <vs-checkbox v-model="Deb.debtorCreditSud.pr_claim_result_cancel" @input="changeDebCredSud">
                      Отказано
                    </vs-checkbox>
                  </div>
                </div>
                <div class="vx-col mb-2" style="margin-top: 10px">
                  <div class="vx-row">
                    <SudCopyRequest :perem="'pr_claim_napr_date'"></SudCopyRequest>
                    <vs-button color="primary" style="margin-left: 10px" @click="showDatesPrClaim=!showDatesPrClaim">История</vs-button>
                    <DownloadFile :perem_type_doc="'credit_claim_pravopreemstvo'"></DownloadFile>
                    <SettingsRegSudAct :perem="'pr_claim_napr_date'" :type="'all'"></SettingsRegSudAct>
                  </div>
                </div>
              </div>
            </vs-tab>
          </vs-tabs>


<!--          <h6 class="h6 mb-1">Копия правопреемство должнику (ШПИ):<VarToClipboard name="dcs_pr_copy_shpi"/></h6>-->
<!--          <vs-input  class="w-100" v-model="Deb.debtorCreditSud.pr_copy_shpi" @change="changeDebCredSud"></vs-input>-->

<!--          <vs-tabs alignment="fixed" color="danger">-->
<!--            <vs-tab label="Заявление правопреемство">-->
<!--              <div class="vx-row" style="padding-top: 20px">-->
<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                  <h6 class="h6 mb-1">Дата направления:<VarToClipboard name="dcs_pr_zay_napr_date"/></h6>-->
<!--                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.pr_zay_napr_date"  @blur="changeDebCredSud"></vs-input>-->
<!--                  <h6 class="h6 mb-1">План-Дата результат:</h6>-->
<!--                  <vs-input type="date" class="w-100" disabled="true" v-model="planDateZay"></vs-input>-->
<!--                </div>-->

<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->

<!--                </div>-->

<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                  <h6 class="h6 mb-1">Дата результата:<VarToClipboard name="dcs_pr_zay_result_date"/></h6>-->
<!--                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.pr_zay_result_date"  @blur="changeDebCredSud"></vs-input>-->
<!--                  <h6 class="h6 mb-1" style="margin-top: 10px;">Результат:</h6>-->
<!--                  <VarToClipboard name="dcs_pr_zay_result_success"/>-->
<!--                  <vs-checkbox v-model="Deb.debtorCreditSud.pr_zay_result_success" @input="changeDebCredSud">-->
<!--                    Удовлетворено-->
<!--                  </vs-checkbox>-->
<!--                  <VarToClipboard name="dcs_pr_zay_result_cancel"/>-->
<!--                  <vs-checkbox v-model="Deb.debtorCreditSud.pr_zay_result_cancel" @input="changeDebCredSud">-->
<!--                    Отказано-->
<!--                  </vs-checkbox>-->
<!--                </div>-->
<!--              </div>-->
<!--            </vs-tab>-->
<!--          </vs-tabs>-->

<!--          <vs-tabs alignment="fixed" color="danger">-->
<!--            <vs-tab label="Частная жалоба отказ правопреемство">-->
<!--              <div class="vx-row" style="padding-top: 20px">-->
<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                  <h6 class="h6 mb-1">Дата направления:<VarToClipboard name="dcs_pr_claim_napr_date"/></h6>-->
<!--                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.pr_claim_napr_date"  @blur="changeDebCredSud"></vs-input>-->
<!--                  <h6 class="h6 mb-1">План-Дата результат:</h6>-->
<!--                  <vs-input type="date" class="w-100" disabled="true" v-model="planDateClaim"></vs-input>-->
<!--                </div>-->

<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->

<!--                </div>-->

<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                  <h6 class="h6 mb-1">Дата результата:<VarToClipboard name="dcs_pr_claim_result_date"/></h6>-->
<!--                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.pr_claim_result_date"  @blur="changeDebCredSud"></vs-input>-->
<!--                  <h6 class="h6 mb-1" style="margin-top: 10px;">Результат:</h6>-->
<!--                  <VarToClipboard name="dcs_pr_claim_result_success"/>-->
<!--                  <vs-checkbox v-model="Deb.debtorCreditSud.pr_claim_result_success" @input="changeDebCredSud">-->
<!--                    Удовлетворено-->
<!--                  </vs-checkbox>-->
<!--                  <VarToClipboard name="dcs_pr_claim_result_cancel"/>-->
<!--                  <vs-checkbox v-model="Deb.debtorCreditSud.pr_claim_result_cancel" @input="changeDebCredSud">-->
<!--                    Отказано-->
<!--                  </vs-checkbox>-->
<!--                </div>-->
<!--              </div>-->
<!--            </vs-tab>-->
<!--          </vs-tabs>-->

<!--          <vs-tabs alignment="fixed" color="danger">-->
<!--            <vs-tab label="Описка определение правопреемство">-->
<!--              <div class="vx-row" style="padding-top: 20px">-->
<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                  <VarToClipboard name="dcs_pr_opiska_err_fio"/>-->
<!--                  <vs-checkbox v-model="Deb.debtorCreditSud.pr_opiska_err_fio" @input="changeDebCredSud">-->
<!--                    Ошибка в ФИО должника-->
<!--                  </vs-checkbox>-->
<!--                </div>-->
<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                  <VarToClipboard name="dcs_pr_opiska_err_nomer"/>-->
<!--                  <vs-checkbox v-model="Deb.debtorCreditSud.pr_opiska_err_nomer" @input="changeDebCredSud">-->
<!--                    Ошибка в номере и (или) дате исполнительного документа-->
<!--                  </vs-checkbox>-->
<!--                </div>-->
<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                  <VarToClipboard name="dcs_pr_opiska_err_name"/>-->
<!--                  <vs-checkbox v-model="Deb.debtorCreditSud.pr_opiska_err_name" @input="changeDebCredSud">-->
<!--                    Ошибка в наименовании Взыскателя-->
<!--                  </vs-checkbox>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="vx-row" style="padding-top: 20px">-->
<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                  <h6 class="h6 mb-1">Дата направления:<VarToClipboard name="dcs_pr_opiska_napr_date"/></h6>-->
<!--                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.pr_opiska_napr_date"  @blur="changeDebCredSud"></vs-input>-->
<!--                  <h6 class="h6 mb-1">План-Дата результат:</h6>-->
<!--                  <vs-input type="date" class="w-100" disabled="true" v-model="planDateOpred"></vs-input>-->
<!--                </div>-->

<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->

<!--                </div>-->

<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                  <h6 class="h6 mb-1">Дата результата:<VarToClipboard name="dcs_pr_opiska_result_date"/></h6>-->
<!--                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.pr_opiska_result_date"  @blur="changeDebCredSud"></vs-input>-->
<!--                  <h6 class="h6 mb-1" style="margin-top: 10px;">Результат:</h6>-->
<!--                  <VarToClipboard name="dcs_pr_opiska_result_success"/>-->
<!--                  <vs-checkbox v-model="Deb.debtorCreditSud.pr_opiska_result_success" @input="changeDebCredSud">-->
<!--                    Удовлетворено-->
<!--                  </vs-checkbox>-->
<!--                  <VarToClipboard name="dcs_pr_opiska_result_cancel"/>-->
<!--                  <vs-checkbox v-model="Deb.debtorCreditSud.pr_opiska_result_cancel" @input="changeDebCredSud">-->
<!--                    Отказано-->
<!--                  </vs-checkbox>-->
<!--                </div>-->
<!--              </div>-->
<!--            </vs-tab>-->
<!--          </vs-tabs>-->

<!--          <vs-tabs alignment="fixed" color="danger">-->
<!--            <vs-tab label="Ходатайство о замене стороны">-->
<!--              <h6 class="h6 mb-1">Дата:<VarToClipboard name="dcs_pr_hod_zamen_date"/></h6>-->
<!--              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.pr_hod_zamen_date"  @blur="changeDebCredSud"></vs-input>-->
<!--            </vs-tab>-->
<!--          </vs-tabs>-->

<!--          <vs-tabs alignment="fixed" color="danger">-->
<!--            <vs-tab label="Шаблоны документов">-->
<!--              <ChangeShablon></ChangeShablon>-->
<!--            </vs-tab>-->
<!--          </vs-tabs>-->
          <vs-popup class="holamundo" title="Дата результата:" :active.sync="showDatesPrZay">
            <ObjFromJsonViewButton :value="Deb.debtorCreditSud.pr_zay_result_date_arr" @update_arr="UpdateData_pr_zay_result_date"></ObjFromJsonViewButton>
          </vs-popup>
          <vs-popup class="holamundo" title="Дата результата:" :active.sync="showDatesPrOpiska">
            <ObjFromJsonViewButton :value="Deb.debtorCreditSud.pr_opiska_result_date_arr" @update_arr="UpdateData_pr_opiska_result_date"></ObjFromJsonViewButton>
          </vs-popup>
          <vs-popup class="holamundo" title="Дата результата:" :active.sync="showDatesPrClaim">
            <ObjFromJsonViewButton :value="Deb.debtorCreditSud.pr_claim_result_date_arr" @update_arr="UpdateData_pr_claim_result_date"></ObjFromJsonViewButton>
          </vs-popup>
        </div>
    </div>
</template>

<script>
    import ObjFromJsonViewButton from '../../RenderComponent/ObjFromJsonViewButton.vue'
    import SettingsRegSudAct from "../Render/SettingsRegSudAct.vue";
    import ChangeShablon from "../../Debtor/DebtorTab/Render/ChangeShablon.vue";
    import DownloadFile from "../Render/DownloadFile.vue";
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import moment from "moment/moment";
    import VarToClipboard from './../../VarToClipboard.vue';
    import MestoId from "../../Debtor/DebtorTab/Render/MestoId.vue";
    import SudCopyRequest from "../Render/SudCopyRequest.vue";
    import DynCheckBoxList from "../../DynCheckBoxList/DynCheckBoxList.vue";
    export default {
        components: {
          ChangeShablon,ObjFromJsonViewButton,SettingsRegSudAct,DownloadFile,VarToClipboard,MestoId,SudCopyRequest,
          DynCheckBoxList
        },

        //props:['idDep','back'],
        data () {
            return {
              showDatesPrZay:false,
              showDatesPrOpiska:false,
              showDatesPrClaim:false,
            }
        },
        mounted(){


        },

        asyncComputed: {

        },
        computed: {
          planDateZay(){
            if(typeof this.Deb.debtorCreditSud.pr_zay_napr_date!='undefined'){
              if(this.Deb.debtorCreditSud.pr_zay_napr_date!=null){
                let date1 = new Date(this.Deb.debtorCreditSud.pr_zay_napr_date);
                let fortnightAway = new Date(date1);
                date1.setDate(fortnightAway.getDate() + 30);

                return  moment(date1.toString()).format("YYYY-MM-DD")
              }
            }
            return null
          },
          planDateClaim(){
            if(typeof this.Deb.debtorCreditSud.pr_claim_napr_date!='undefined'){
              if(this.Deb.debtorCreditSud.pr_claim_napr_date!=null){
                let date1 = new Date(this.Deb.debtorCreditSud.pr_claim_napr_date);
                let fortnightAway = new Date(date1);
                date1.setDate(fortnightAway.getDate() + 30);

                return  moment(date1.toString()).format("YYYY-MM-DD")
              }
            }
            return null
          },
          planDateOpred(){
            if(typeof this.Deb.debtorCreditSud.pr_opiska_napr_date!='undefined'){
              if(this.Deb.debtorCreditSud.pr_opiska_napr_date!=null){
                let date1 = new Date(this.Deb.debtorCreditSud.pr_opiska_napr_date);
                let fortnightAway = new Date(date1);
                date1.setDate(fortnightAway.getDate() + 30);

                return  moment(date1.toString()).format("YYYY-MM-DD")
              }
            }
            return null
          },

            ...mapGetters([
                'Deb','User'

            ]),


        },
        methods: {
          UpdateData_pr_claim_result_date(val){
            this.Deb.debtorCreditSud.pr_claim_result_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudPrClaimResultDate(){
            if(this.Deb.debtorCreditSud.pr_claim_result_date_arr==null){
              this.Deb.debtorCreditSud.pr_claim_result_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.pr_claim_result_date_arr.length>0){
              if(this.Deb.debtorCreditSud.pr_claim_result_date!=this.Deb.debtorCreditSud.pr_claim_result_date_arr[this.Deb.debtorCreditSud.pr_claim_result_date_arr.length-1]){
                this.Deb.debtorCreditSud.pr_claim_result_date_arr.push(this.Deb.debtorCreditSud.pr_claim_result_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.pr_claim_result_date_arr.push(this.Deb.debtorCreditSud.pr_claim_result_date)
              this.changeDebCredSud();
            }
          },

          UpdateData_pr_opiska_result_date(val){
            this.Deb.debtorCreditSud.pr_opiska_result_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudPrOpiskaResultDate(){
            if(this.Deb.debtorCreditSud.pr_opiska_result_date_arr==null){
              this.Deb.debtorCreditSud.pr_opiska_result_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.pr_opiska_result_date_arr.length>0){
              if(this.Deb.debtorCreditSud.pr_opiska_result_date!=this.Deb.debtorCreditSud.pr_opiska_result_date_arr[this.Deb.debtorCreditSud.pr_opiska_result_date_arr.length-1]){
                this.Deb.debtorCreditSud.pr_opiska_result_date_arr.push(this.Deb.debtorCreditSud.pr_opiska_result_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.pr_opiska_result_date_arr.push(this.Deb.debtorCreditSud.pr_opiska_result_date)
              this.changeDebCredSud();
            }
          },

          UpdateData_pr_zay_result_date(val){
            this.Deb.debtorCreditSud.pr_zay_result_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudPrZayResultDate(){
            if(this.Deb.debtorCreditSud.pr_zay_result_date_arr==null){
              this.Deb.debtorCreditSud.pr_zay_result_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.pr_zay_result_date_arr.length>0){
              if(this.Deb.debtorCreditSud.pr_zay_result_date!=this.Deb.debtorCreditSud.pr_zay_result_date_arr[this.Deb.debtorCreditSud.pr_zay_result_date_arr.length-1]){
                this.Deb.debtorCreditSud.pr_zay_result_date_arr.push(this.Deb.debtorCreditSud.pr_zay_result_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.pr_zay_result_date_arr.push(this.Deb.debtorCreditSud.pr_zay_result_date)
              this.changeDebCredSud();
            }
          },

          changeDebAndLoad(){
            this.changeDeb().then(() => {
              this.getDataDebtorsById(this.Deb.debtorCredit.id)
            });
          },
          changeDebCredSud(){
            this.changeDeb();
          },

          ...mapActions([
            'changeDeb','getDataDebtorsById'
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
