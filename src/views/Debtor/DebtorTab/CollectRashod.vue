<template>
    <div >
        <div class="mt-5">

          <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col sm:w-1/3 w-full mb-2" style="margin-left: 10px">
              <h6 class="h6">Дата регистрации заявления должника:<VarToClipboard name="dcs_clr_reg_zay_debtor_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.clr_reg_zay_debtor_date"  @blur="changeDebCredSud"></vs-input>

              <h6 class="h6">Сумма судебных расходов:<VarToClipboard name="dcs_clr_sum"/></h6>
              <vs-input type="number" class="w-100" v-model="Deb.debtorCreditSud.clr_sum" @change="changeDebCredSud"></vs-input>
            </div>
            <div class="vx-col sm:w-1/3 w-full mb-2">
              <h6 class="h6">Дата регистрации определения о назначении СЗ:<VarToClipboard name="dcs_clr_reg_opred_sz_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.clr_reg_opred_sz_date"  @blur="changeDebCredSud"></vs-input>
              <h6 class="h6">Дата возражений на взыскание суд.расходов:<VarToClipboard name="dcs_clr_vozr_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.clr_vozr_date"  @blur="changeDebCredSud"></vs-input>
            </div>
          </div>


          <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col mb-2" style="margin-left: 10px">
              <h6 class="h6">Определение суда о взыскании</h6>
              <h6 class="h6">судебных расходов:<VarToClipboard name="dcs_clr_opred_sud_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.clr_opred_sud_date"  @blur="changeDebCredSudClrOpredSudDate"></vs-input>
            </div>
            <div class="vx-col mb-2">
              <h6 class="h6">Результат:</h6>
              <VarToClipboard name="dcs_clr_opred_result_success"/>
              <vs-checkbox v-model="Deb.debtorCreditSud.clr_opred_result_success" @input="changeDebCredSud">
                Удовлетворено
              </vs-checkbox>
              <div style="margin-top: 5px">
              <VarToClipboard name="dcs_clr_opred_result_cancel"/>
              <vs-checkbox v-model="Deb.debtorCreditSud.clr_opred_result_cancel" @input="changeDebCredSud">
                Отказано
              </vs-checkbox>
              </div>
            </div>
            <div class="vx-col mb-2" style="margin-top: 10px">
              <div class="vx-row">
                <SudCopyRequest :perem="'clr_opred_sud_date'" @refreshAfterSend="refreshAfterSend"></SudCopyRequest>
                <vs-button color="primary" style="margin-left: 10px" @click="showDatesClrOpredSud=!showDatesClrOpredSud">История</vs-button>
                <vs-button color="primary" style="margin-left: 10px">Файл</vs-button>
                <SettingsRegSudAct :perem="'clr_opred_sud_date'" :type="'zapros'"></SettingsRegSudAct>
              </div>
            </div>
          </div>

          <h6 style="margin-top: 20px;margin-left: 10px">Исполнение взыскания судебных расходов:</h6>

          <div class="vx-row" style="padding-top: 10px;margin-bottom: 20px">
            <div class="vx-col mb-2" style="margin-left: 10px">
              <h6 class="h6">Сумма:<VarToClipboard name="dcs_clr_isp_sum"/></h6>
              <vs-input type="number" class="w-100" v-model="Deb.debtorCreditSud.clr_isp_sum" @change="changeDebCredSud"></vs-input>
            </div>
            <div class="vx-col mb-2">
              <h6 class="h6">Дата:<VarToClipboard name="dcs_clr_isp_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.clr_isp_date"  @blur="changeDebCredSud"></vs-input>
            </div>
          </div>



          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Частная жалоба взыскание суд.расходы">
              <div class="vx-row" style="padding-top: 20px">
                <div class="vx-col mb-2">
                  <h6 class="h6">Дата направления:<VarToClipboard name="dcs_clr_claim_napr_date"/></h6>
                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.clr_claim_napr_date"  @blur="changeDebCredSudClrClaimNaprDate"></vs-input>
                  <h6 class="h6">План-Дата результат:</h6>
                  <vs-input type="date" class="w-100" disabled="true" v-model="planDateClaim"></vs-input>
                </div>

<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                  <DateControls></DateControls>-->
<!--                </div>-->

                <div class="vx-col mb-2">
                  <h6 class="h6">Дата результата:<VarToClipboard name="dcs_clr_claim_result_date"/></h6>
                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.clr_claim_result_date"  @blur="changeDebCredSudClrClaimResultDate"></vs-input>
                </div>
                <div class="vx-col mb-2">
                  <h6 class="h6">Результат:</h6>
                  <VarToClipboard name="dcs_clr_claim_result_success"/>
                  <vs-checkbox v-model="Deb.debtorCreditSud.clr_claim_result_success" @input="changeDebCredSud">
                    Удовлетворено
                  </vs-checkbox>
                  <VarToClipboard name="dcs_clr_claim_result_cancel"/>
                  <vs-checkbox v-model="Deb.debtorCreditSud.clr_claim_result_cancel" @input="changeDebCredSud">
                    Отказано
                  </vs-checkbox>
                </div>
                <div class="vx-col mb-2" style="margin-top: 15px">
                  <div class="vx-row">
                    <SudCopyRequest :perem="'clr_claim_napr_date'" @refreshAfterSend="refreshAfterSend"></SudCopyRequest>
                    <vs-button color="primary" style="margin-left: 10px" @click="showDatesClrClaim=!showDatesClrClaim">История</vs-button>
                    <vs-button color="primary" style="margin-left: 10px">Файл</vs-button>
                    <SettingsRegSudAct :perem="'clr_claim_napr_date'" :type="'all'"></SettingsRegSudAct>
                  </div>
                </div>
              </div>
            </vs-tab>
          </vs-tabs>

          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Шаблоны документов">
              <ChangeShablon :perem="'shablon_collect_rashod'" @refreshAfterSend="refreshAfterSend"></ChangeShablon>
              <DateControls :perem="'collect_rashod'" :ref="'comp_date_controls'"></DateControls>
            </vs-tab>
          </vs-tabs>

          <vs-popup class="holamundo" title="Даты определения:" :active.sync="showDatesClrOpredSud">
            <ObjFromJsonViewButton :value="Deb.debtorCreditSud.clr_opred_sud_date_arr" @update_arr="UpdateData_clr_opred_sud_date"></ObjFromJsonViewButton>
          </vs-popup>

          <vs-popup class="holamundo" title="История:" :active.sync="showDatesClrClaim">
            <div>
              <h6 class="h6">Даты направления:</h6>
              <ObjFromJsonViewButton :value="Deb.debtorCreditSud.clr_claim_napr_date_arr" @update_arr="UpdateData_clr_claim_napr_date"></ObjFromJsonViewButton>
            </div>
            <div style="margin-top: 20px">
              <h6 class="h6">Даты результата:</h6>
              <ObjFromJsonViewButton :value="Deb.debtorCreditSud.clr_claim_result_date_arr" @update_arr="UpdateData_clr_claim_result_date"></ObjFromJsonViewButton>
            </div>
          </vs-popup>
        </div>
    </div>
</template>

<script>
    import DateControls from "./Render/DateControls.vue";
    import ObjFromJsonViewButton from '../../RenderComponent/ObjFromJsonViewButton.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import moment from "moment";
    import ChangeShablon from "./Render/ChangeShablon.vue";
    import SettingsRegSudAct from "../../RegSudAct/Render/SettingsRegSudAct.vue";
    import VarToClipboard from './../../VarToClipboard.vue';
    import SudCopyRequest from "../../RegSudAct/Render/SudCopyRequest.vue";
    export default {
        components: {
          DateControls,ChangeShablon,ObjFromJsonViewButton,SettingsRegSudAct,VarToClipboard,SudCopyRequest
        },

        //props:['idDep','back'],
        data () {
            return {
              showDatesClrOpredSud:false,
              showDatesClrClaim:false,
            }
        },
        mounted(){


        },

        asyncComputed: {

        },
        computed: {
          planDateClaim(){
            if(typeof this.Deb.debtorCreditSud.clr_claim_napr_date!='undefined'){
              if(this.Deb.debtorCreditSud.clr_claim_napr_date!=null){
                let date1 = new Date(this.Deb.debtorCreditSud.clr_claim_napr_date);
                let fortnightAway = new Date(date1);
                date1.setDate(fortnightAway.getDate() + 30);

                return  moment(date1.toString()).format("YYYY-MM-DD")
              }
            }
            return null
          },

            ...mapGetters([
                'User','Deb'

            ]),


        },
        methods: {
          refreshAfterSend(){
            this.$refs.comp_date_controls.refreshDateControls();
          },
          UpdateData_clr_claim_napr_date(val){
            this.Deb.debtorCreditSud.clr_claim_napr_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudClrClaimNaprDate(){
            if(this.Deb.debtorCreditSud.clr_claim_napr_date_arr==null){
              this.Deb.debtorCreditSud.clr_claim_napr_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.clr_claim_napr_date_arr.length>0){
              if(this.Deb.debtorCreditSud.clr_claim_napr_date!=this.Deb.debtorCreditSud.clr_claim_napr_date_arr[this.Deb.debtorCreditSud.clr_claim_napr_date_arr.length-1]){
                this.Deb.debtorCreditSud.clr_claim_napr_date_arr.push(this.Deb.debtorCreditSud.clr_claim_napr_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.clr_claim_napr_date_arr.push(this.Deb.debtorCreditSud.clr_claim_napr_date)
              this.changeDebCredSud();
            }
          },


          UpdateData_clr_claim_result_date(val){
            this.Deb.debtorCreditSud.clr_claim_result_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudClrClaimResultDate(){
            if(this.Deb.debtorCreditSud.clr_claim_result_date_arr==null){
              this.Deb.debtorCreditSud.clr_claim_result_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.clr_claim_result_date_arr.length>0){
              if(this.Deb.debtorCreditSud.clr_claim_result_date!=this.Deb.debtorCreditSud.clr_claim_result_date_arr[this.Deb.debtorCreditSud.clr_claim_result_date_arr.length-1]){
                this.Deb.debtorCreditSud.clr_claim_result_date_arr.push(this.Deb.debtorCreditSud.clr_claim_result_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.clr_claim_result_date_arr.push(this.Deb.debtorCreditSud.clr_claim_result_date)
              this.changeDebCredSud();
            }
          },
          UpdateData_clr_opred_sud_date(val){
            this.Deb.debtorCreditSud.clr_opred_sud_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudClrOpredSudDate(){
            if(this.Deb.debtorCreditSud.clr_opred_sud_date_arr==null){
              this.Deb.debtorCreditSud.clr_opred_sud_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.clr_opred_sud_date_arr.length>0){
              if(this.Deb.debtorCreditSud.clr_opred_sud_date!=this.Deb.debtorCreditSud.clr_opred_sud_date_arr[this.Deb.debtorCreditSud.clr_opred_sud_date_arr.length-1]){
                this.Deb.debtorCreditSud.clr_opred_sud_date_arr.push(this.Deb.debtorCreditSud.clr_opred_sud_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.clr_opred_sud_date_arr.push(this.Deb.debtorCreditSud.clr_opred_sud_date)
              this.changeDebCredSud();
            }
          },


          ...mapActions([
            'changeDeb'
          ]),

          changeDebCredSud(){
            this.changeDeb();
          },




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
