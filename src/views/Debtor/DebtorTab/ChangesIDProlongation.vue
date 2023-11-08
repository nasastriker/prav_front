<template>
    <div >
        <div class="mt-5">



<!--          <div class="vx-row" style="padding-top: 20px">-->
<!--            <div class="vx-col sm:w-1/4 w-full mb-2">-->
<!--              <h6 class="h6">№ ИД:<VarToClipboard name="dc_number_sa"/></h6>-->
<!--              <vs-input class="w-100"  v-model="Deb.debtorCredit.number_sa" @change="changeDeb"></vs-input>-->
<!--              <h6 class="h6">Дата ИД:<VarToClipboard name="dc_date_sa"/></h6>-->
<!--              <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_sa" @blur="changeDeb"></vs-input>-->
<!--              -->
<!--            </div>-->

<!--            <div class="vx-col sm:w-3/4 w-full mb-2">-->
              <vs-tabs alignment="fixed" color="danger">
                <vs-tab label="Периоды исполнения ИД. История">
                  <ChangeIdHistory></ChangeIdHistory>
                </vs-tab>
              </vs-tabs>
<!--            </div>-->

            <vs-tabs alignment="fixed" color="danger">
              <vs-tab label="Заявление в суд продление ИД">
                <div class="vx-row" style="padding-top: 20px">
                  <div class="vx-col mb-2">
                    <h6 class="h6">Дата направления:<VarToClipboard name="dcs_prod_zay_napr_date"/></h6>
                    <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.prod_zay_napr_date"  @blur="changeDebCredSudProdZayNaprDate"></vs-input>
                    <h6 class="h6">План-Дата результат:</h6>
                    <vs-input type="date" class="w-100" disabled="true" v-model="planDateZay"></vs-input>
                  </div>

<!--                  <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                    <DateControls></DateControls>-->
<!--                  </div>-->

                  <div class="vx-col mb-2">
                    <h6 class="h6">Дата результата:<VarToClipboard name="dcs_prod_zay_result_date"/></h6>
                    <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.prod_zay_result_date"  @blur="changeDebCredSudProdZayResultDate"></vs-input>
                  </div>
                  <div class="vx-col mb-2">
                    <h6 class="h6">Результат:</h6>
                    <VarToClipboard name="dcs_prod_zay_result_success"/>
                    <vs-checkbox v-model="Deb.debtorCreditSud.prod_zay_result_success" @input="changeDebCredSud">
                      Удовлетворено
                    </vs-checkbox>
                    <VarToClipboard name="dcs_prod_zay_result_cancel"/>
                    <vs-checkbox v-model="Deb.debtorCreditSud.prod_zay_result_cancel" @input="changeDebCredSud">
                      Отказано
                    </vs-checkbox>
                  </div>
                  <div class="vx-col mb-2" style="margin-top: 15px">
                    <div class="vx-row">
                      <SudCopyRequest :perem="'prod_zay_napr_date'" @refreshAfterSend="refreshAfterSend"></SudCopyRequest>
                      <vs-button color="primary" style="margin-left: 10px" @click="showDatesProdZay=!showDatesProdZay">История</vs-button>
                      <vs-button color="primary" style="margin-left: 10px">Файл</vs-button>
                      <SettingsRegSudAct :perem="'prod_zay_napr_date'" :type="'all'"></SettingsRegSudAct>
                    </div>
                  </div>
                </div>
              </vs-tab>
            </vs-tabs>

            <vs-tabs alignment="fixed" color="danger">
              <vs-tab label="Частная жалоба отказ продление ИД">
                <div class="vx-row" style="padding-top: 20px">
                  <div class="vx-col mb-2">
                    <h6 class="h6">Дата направления:<VarToClipboard name="dcs_prod_claim_napr_date"/></h6>
                    <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.prod_claim_napr_date"  @blur="changeDebCredSudProdClaimNaprDate"></vs-input>
                    <h6 class="h6">План-Дата результат:</h6>
                    <vs-input type="date" class="w-100" disabled="true" v-model="planDateClaim"></vs-input>
                  </div>

<!--                  <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                    <DateControls></DateControls>-->
<!--                  </div>-->

                  <div class="vx-col mb-2">
                    <h6 class="h6">Дата результата:<VarToClipboard name="dcs_prod_claim_result_date"/></h6>
                    <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.prod_claim_result_date"  @blur="changeDebCredSudProdClaimResultDate"></vs-input>
                  </div>
                  <div class="vx-col mb-2">
                    <h6 class="h6">Результат:</h6>
                    <VarToClipboard name="dcs_prod_claim_result_success"/>
                    <vs-checkbox v-model="Deb.debtorCreditSud.prod_claim_result_success" @input="changeDebCredSud">
                      Удовлетворено
                    </vs-checkbox>
                    <VarToClipboard name="dcs_prod_claim_result_cancel"/>
                    <vs-checkbox v-model="Deb.debtorCreditSud.prod_claim_result_cancel" @input="changeDebCredSud">
                      Отказано
                    </vs-checkbox>
                  </div>
                  <div class="vx-col mb-2" style="margin-top: 15px">
                    <div class="vx-row">
                      <SudCopyRequest :perem="'prod_claim_napr_date'" @refreshAfterSend="refreshAfterSend"></SudCopyRequest>
                      <vs-button color="primary" style="margin-left: 10px" @click="showDatesProdClaim=!showDatesProdClaim">История</vs-button>
                      <vs-button color="primary" style="margin-left: 10px">Файл</vs-button>
                      <SettingsRegSudAct :perem="'prod_claim_napr_date'" :type="'all'"></SettingsRegSudAct>
                    </div>
                  </div>
                </div>
<!--                <DateControls :perem="'changes_id_prolongation'"></DateControls>-->
              </vs-tab>
            </vs-tabs>

          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Шаблоны документов">
              <ChangeShablon :perem="'shablon_changes_id_prolongation'" @refreshAfterSend="refreshAfterSend"></ChangeShablon>
              <DateControls :perem="'changes_id_prolongation'" :ref="'comp_date_controls'"></DateControls>
            </vs-tab>
          </vs-tabs>

          <vs-popup class="holamundo" title="История:" :active.sync="showDatesProdZay">
            <div>
              <h6 class="h6">Даты направления:</h6>
              <ObjFromJsonViewButton :value="Deb.debtorCreditSud.prod_zay_napr_date_arr" @update_arr="UpdateData_prod_zay_napr_date"></ObjFromJsonViewButton>
            </div>
            <div style="margin-top: 20px">
              <h6 class="h6">Даты результата:</h6>
              <ObjFromJsonViewButton :value="Deb.debtorCreditSud.prod_zay_result_date_arr" @update_arr="UpdateData_prod_zay_result_date"></ObjFromJsonViewButton>
            </div>
          </vs-popup>

          <vs-popup class="holamundo" title="История:" :active.sync="showDatesProdClaim">
            <div>
              <h6 class="h6">Даты направления:</h6>
              <ObjFromJsonViewButton :value="Deb.debtorCreditSud.prod_claim_napr_date_arr" @update_arr="UpdateData_prod_claim_napr_date"></ObjFromJsonViewButton>
            </div>
            <div style="margin-top: 20px">
              <h6 class="h6">Даты результата:</h6>
              <ObjFromJsonViewButton :value="Deb.debtorCreditSud.prod_claim_result_date_arr" @update_arr="UpdateData_prod_claim_result_date"></ObjFromJsonViewButton>
            </div>
          </vs-popup>

<!--          </div>-->
        </div>
    </div>
</template>

<script>
    import ChangeIdHistory from "./Render/ChangeIdHistory.vue";
    import ChangeShablon from "./Render/ChangeShablon.vue";
    import DateControls from "./Render/DateControls.vue";
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import ObjFromJsonViewButton from '../../RenderComponent/ObjFromJsonViewButton.vue'
    import moment from "moment/moment";
    import VarToClipboard from './../../VarToClipboard.vue';
    import SettingsRegSudAct from "../../RegSudAct/Render/SettingsRegSudAct.vue";
    import SudCopyRequest from "../../RegSudAct/Render/SudCopyRequest.vue";
    export default {
        components: {
          DateControls,ChangeIdHistory,ObjFromJsonViewButton,VarToClipboard,ChangeShablon,SettingsRegSudAct,
          SudCopyRequest
        },

        //props:['idDep','back'],
        data () {
            return {
              showDatesProdZay:false,
              showDatesProdClaim:false,
            }
        },
        mounted(){


        },

        asyncComputed: {

        },
        computed: {
          planDateZay(){
            if(typeof this.Deb.debtorCreditSud.prod_zay_napr_date!='undefined'){
              if(this.Deb.debtorCreditSud.prod_zay_napr_date!=null){
                let date1 = new Date(this.Deb.debtorCreditSud.prod_zay_napr_date);
                let fortnightAway = new Date(date1);
                date1.setDate(fortnightAway.getDate() + 30);

                return  moment(date1.toString()).format("YYYY-MM-DD")
              }
            }
            return null
          },
          planDateClaim(){
            if(typeof this.Deb.debtorCreditSud.prod_claim_napr_date!='undefined'){
              if(this.Deb.debtorCreditSud.prod_claim_napr_date!=null){
                let date1 = new Date(this.Deb.debtorCreditSud.prod_claim_napr_date);
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
          UpdateData_prod_claim_napr_date(val){
            this.Deb.debtorCreditSud.prod_claim_napr_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudProdClaimNaprDate(){
            if(this.Deb.debtorCreditSud.prod_claim_napr_date_arr==null){
              this.Deb.debtorCreditSud.prod_claim_napr_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.prod_claim_napr_date_arr.length>0){
              if(this.Deb.debtorCreditSud.prod_claim_napr_date!=this.Deb.debtorCreditSud.prod_claim_napr_date_arr[this.Deb.debtorCreditSud.prod_claim_napr_date_arr.length-1]){
                this.Deb.debtorCreditSud.prod_claim_napr_date_arr.push(this.Deb.debtorCreditSud.prod_claim_napr_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.prod_claim_napr_date_arr.push(this.Deb.debtorCreditSud.prod_claim_napr_date)
              this.changeDebCredSud();
            }
          },

          UpdateData_prod_zay_napr_date(val){
            this.Deb.debtorCreditSud.prod_zay_napr_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudProdZayNaprDate(){
            if(this.Deb.debtorCreditSud.prod_zay_napr_date_arr==null){
              this.Deb.debtorCreditSud.prod_zay_napr_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.prod_zay_napr_date_arr.length>0){
              if(this.Deb.debtorCreditSud.prod_zay_napr_date!=this.Deb.debtorCreditSud.prod_zay_napr_date_arr[this.Deb.debtorCreditSud.prod_zay_napr_date_arr.length-1]){
                this.Deb.debtorCreditSud.prod_zay_napr_date_arr.push(this.Deb.debtorCreditSud.prod_zay_napr_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.prod_zay_napr_date_arr.push(this.Deb.debtorCreditSud.prod_zay_napr_date)
              this.changeDebCredSud();
            }
          },


          UpdateData_prod_claim_result_date(val){
            this.Deb.debtorCreditSud.prod_claim_result_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudProdClaimResultDate(){
            if(this.Deb.debtorCreditSud.prod_claim_result_date_arr==null){
              this.Deb.debtorCreditSud.prod_claim_result_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.prod_claim_result_date_arr.length>0){
              if(this.Deb.debtorCreditSud.prod_claim_result_date!=this.Deb.debtorCreditSud.prod_claim_result_date_arr[this.Deb.debtorCreditSud.prod_claim_result_date_arr.length-1]){
                this.Deb.debtorCreditSud.prod_claim_result_date_arr.push(this.Deb.debtorCreditSud.prod_claim_result_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.prod_claim_result_date_arr.push(this.Deb.debtorCreditSud.prod_claim_result_date)
              this.changeDebCredSud();
            }
          },

          UpdateData_prod_zay_result_date(val){
            this.Deb.debtorCreditSud.prod_zay_result_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudProdZayResultDate(){
            if(this.Deb.debtorCreditSud.prod_zay_result_date_arr==null){
              this.Deb.debtorCreditSud.prod_zay_result_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.prod_zay_result_date_arr.length>0){
              if(this.Deb.debtorCreditSud.prod_zay_result_date!=this.Deb.debtorCreditSud.prod_zay_result_date_arr[this.Deb.debtorCreditSud.prod_zay_result_date_arr.length-1]){
                this.Deb.debtorCreditSud.prod_zay_result_date_arr.push(this.Deb.debtorCreditSud.prod_zay_result_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.prod_zay_result_date_arr.push(this.Deb.debtorCreditSud.prod_zay_result_date)
              this.changeDebCredSud();
            }
          },

          changeDebCredSud(){
            this.changeDeb();
          },

          ...mapActions([
            'changeDeb'
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
