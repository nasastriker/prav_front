<template>
    <div >
        <div>

          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Заявление в суд о возврате ГП">
              <div class="vx-row" style="padding-top: 20px">
                <div style="margin-left: 14px">
                  <h6 class="h6">Дата направления:<VarToClipboard name="dcs_gr_zay_sud_napr_date"/></h6>
                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.gr_zay_sud_napr_date"  @blur="changeDebCredSudGrZaySudNaprDate"></vs-input>
                  <h6 class="h6">План-Дата результат:</h6>
                  <vs-input type="date" class="w-100" disabled="true" v-model="planDateZay"></vs-input>
                </div>

<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                  <DateControls></DateControls>-->
<!--                </div>-->

                <div style="margin-left: 10px">
                  <h6 class="h6">Дата результата:<VarToClipboard name="dcs_gr_zay_sud_result_date"/></h6>
                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.gr_zay_sud_result_date"  @blur="changeDebCredSudGrZaySudResultDate"></vs-input>
                </div>
                <div style="margin-left: 10px">
                  <h6 class="h6">Результат:</h6>
                  <VarToClipboard name="dcs_gr_zay_sud_result_success"/>
                  <vs-checkbox v-model="Deb.debtorCreditSud.gr_zay_sud_result_success" @input="changeDebCredSud">
                    Удовлетворено
                  </vs-checkbox>
                  <VarToClipboard name="dcs_gr_zay_sud_result_cancel"/>
                  <vs-checkbox v-model="Deb.debtorCreditSud.gr_zay_sud_result_cancel" @input="changeDebCredSud">
                    Отказано
                  </vs-checkbox>
                </div>
                <div style="margin-top: 15px;margin-left: 10px">
                  <div class="vx-row">
                    <SudCopyRequest :perem="'gr_zay_sud_napr_date'" @refreshAfterSend="refreshAfterSend"></SudCopyRequest>
                    <vs-button color="primary" style="margin-left: 10px" @click="showDatesGrZay=!showDatesGrZay">История</vs-button>
                    <vs-button color="primary" style="margin-left: 10px">Файл</vs-button>
                    <SettingsRegSudAct :perem="'gr_zay_sud_napr_date'" :type="'all'"></SettingsRegSudAct>
                  </div>
                </div>
              </div>


            </vs-tab>
          </vs-tabs>

          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Заявление ФНС о возврате ГП">
              <div class="vx-row" style="padding-top: 20px">
                <div style="margin-left: 14px">
              <h6 class="h6">Дата направления:<VarToClipboard name="dcs_gr_zay_fns_napr_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.gr_zay_fns_napr_date"  @blur="changeDebCredSudGrZayFnsNaprDate"></vs-input>
              <h6 class="h6">План-Дата результат:</h6>
              <vs-input type="date" class="w-100" v-model="planDateFns" disabled="true"></vs-input>
                </div>
                <div style="margin-left: 10px">
                  <h6 class="h6">Дата результата:<VarToClipboard name="dcs_gr_zay_fns_result_date"/></h6>
                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.gr_zay_fns_result_date"  @blur="changeDebCredSudGrZayFnsResultDate"></vs-input>
                </div>
                <div style="margin-left: 10px">
                  <h6 class="h6">Результат:</h6>
                  <VarToClipboard name="dcs_gr_zay_fns_result_success"/>
                  <vs-checkbox v-model="Deb.debtorCreditSud.gr_zay_fns_result_success" @input="changeDebCredSud">
                    Удовлетворено
                  </vs-checkbox>
                  <VarToClipboard name="dcs_gr_zay_fns_result_cancel"/>
                  <vs-checkbox v-model="Deb.debtorCreditSud.gr_zay_fns_result_cancel" @input="changeDebCredSud">
                    Отказано
                  </vs-checkbox>
                </div>
                <div style="margin-top: 15px;margin-left: 10px">
                  <div class="vx-row">
                    <SudCopyRequest :perem="'gr_zay_fns_napr_date'" @refreshAfterSend="refreshAfterSend"></SudCopyRequest>
                    <vs-button color="primary" style="margin-left: 10px" @click="showDatesGrFns=!showDatesGrFns">История</vs-button>
                    <vs-button color="primary" style="margin-left: 10px">Файл</vs-button>
                    <SettingsRegSudAct :perem="'gr_zay_fns_napr_date'" :type="'all'"></SettingsRegSudAct>
                  </div>
                </div>
              </div>

              <div style="margin-top: 20px;">
              <h6 class="h6">Дата жалоба ФНС:<VarToClipboard name="dcs_gr_zay_fns_claim_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.gr_zay_fns_claim_date"  @blur="changeDebCredSud"></vs-input>
                  </div>
              <div style="margin-top: 10px;">
              <h6 class="h6">Дата возврата ГП:<VarToClipboard name="dcs_gr_zay_fns_return_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.gr_zay_fns_return_date"  @blur="changeDebCredSud"></vs-input>
              </div>
            </vs-tab>
          </vs-tabs>

          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Шаблоны документов">
              <ChangeShablon :perem="'shablon_gospohlina_return'" @refreshAfterSend="refreshAfterSend"></ChangeShablon>
              <DateControls :perem="'gospohlina_return'" :ref="'comp_date_controls'"></DateControls>
            </vs-tab>
          </vs-tabs>

          <vs-popup class="holamundo" title="История:" :active.sync="showDatesGrZay">
            <div>
              <h6 class="h6">Даты направления:</h6>
              <ObjFromJsonViewButton :value="Deb.debtorCreditSud.gr_zay_sud_napr_date_arr" @update_arr="UpdateData_gr_zay_sud_napr_date"></ObjFromJsonViewButton>
            </div>
            <div style="margin-top: 20px">
              <h6 class="h6">Даты результата:</h6>
              <ObjFromJsonViewButton :value="Deb.debtorCreditSud.gr_zay_sud_result_date_arr" @update_arr="UpdateData_gr_zay_sud_result_date"></ObjFromJsonViewButton>
            </div>
          </vs-popup>

          <vs-popup class="holamundo" title="История:" :active.sync="showDatesGrFns">
            <div>
              <h6 class="h6">Даты направления:</h6>
              <ObjFromJsonViewButton :value="Deb.debtorCreditSud.gr_zay_fns_napr_date_arr" @update_arr="UpdateData_gr_zay_fns_napr_date"></ObjFromJsonViewButton>
            </div>
            <div style="margin-top: 20px">
              <h6 class="h6">Даты результата:</h6>
              <ObjFromJsonViewButton :value="Deb.debtorCreditSud.gr_zay_fns_result_date_arr" @update_arr="UpdateData_gr_zay_fns_result_date"></ObjFromJsonViewButton>
            </div>
          </vs-popup>
        </div>
    </div>
</template>

<script>

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import DateControls from "./Render/DateControls.vue";
    import moment from "moment/moment";
    import ObjFromJsonViewButton from '../../RenderComponent/ObjFromJsonViewButton.vue'
    import ChangeShablon from "./Render/ChangeShablon.vue";
    import VarToClipboard from './../../VarToClipboard.vue';
    import SettingsRegSudAct from "../../RegSudAct/Render/SettingsRegSudAct.vue";
    import SudCopyRequest from "../../RegSudAct/Render/SudCopyRequest.vue";
    export default {
        components: {
          DateControls,ChangeShablon,ObjFromJsonViewButton,VarToClipboard,SettingsRegSudAct,SudCopyRequest
        },

        //props:['idDep','back'],
        data () {
            return {
              showDatesGrZay:false,
              showDatesGrFns:false,
            }
        },
        mounted(){


        },

        asyncComputed: {

        },
        computed: {
          planDateFns(){
            if(typeof this.Deb.debtorCreditSud.gr_zay_fns_napr_date!='undefined'){
              if(this.Deb.debtorCreditSud.gr_zay_fns_napr_date!=null){
                let date1 = new Date(this.Deb.debtorCreditSud.gr_zay_fns_napr_date);
                let fortnightAway = new Date(date1);
                date1.setDate(fortnightAway.getDate() + 30);

                return  moment(date1.toString()).format("YYYY-MM-DD")
              }
            }
            return null
          },
          planDateZay(){
            if(typeof this.Deb.debtorCreditSud.gr_zay_sud_napr_date!='undefined'){
              if(this.Deb.debtorCreditSud.gr_zay_sud_napr_date!=null){
                let date1 = new Date(this.Deb.debtorCreditSud.gr_zay_sud_napr_date);
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
          ...mapActions([
            'changeDeb'
          ]),

          refreshAfterSend(){
            this.$refs.comp_date_controls.refreshDateControls();
          },

          UpdateData_gr_zay_fns_result_date(val){
            this.Deb.debtorCreditSud.gr_zay_fns_result_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudGrZayFnsResultDate(){
            if(this.Deb.debtorCreditSud.gr_zay_fns_result_date_arr==null){
              this.Deb.debtorCreditSud.gr_zay_fns_result_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.gr_zay_fns_result_date_arr.length>0){
              if(this.Deb.debtorCreditSud.gr_zay_fns_result_date!=this.Deb.debtorCreditSud.gr_zay_fns_result_date_arr[this.Deb.debtorCreditSud.gr_zay_fns_result_date_arr.length-1]){
                this.Deb.debtorCreditSud.gr_zay_fns_result_date_arr.push(this.Deb.debtorCreditSud.gr_zay_fns_result_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.gr_zay_fns_result_date_arr.push(this.Deb.debtorCreditSud.gr_zay_fns_result_date)
              this.changeDebCredSud();
            }
          },

          UpdateData_gr_zay_fns_napr_date(val){
            this.Deb.debtorCreditSud.gr_zay_fns_napr_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudGrZayFnsNaprDate(){
            if(this.Deb.debtorCreditSud.gr_zay_fns_napr_date_arr==null){
              this.Deb.debtorCreditSud.gr_zay_fns_napr_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.gr_zay_fns_napr_date_arr.length>0){
              if(this.Deb.debtorCreditSud.gr_zay_fns_napr_date!=this.Deb.debtorCreditSud.gr_zay_fns_napr_date_arr[this.Deb.debtorCreditSud.gr_zay_fns_napr_date_arr.length-1]){
                this.Deb.debtorCreditSud.gr_zay_fns_napr_date_arr.push(this.Deb.debtorCreditSud.gr_zay_fns_napr_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.gr_zay_fns_napr_date_arr.push(this.Deb.debtorCreditSud.gr_zay_fns_napr_date)
              this.changeDebCredSud();
            }
          },

          UpdateData_gr_zay_sud_result_date(val){
            this.Deb.debtorCreditSud.gr_zay_sud_result_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudGrZaySudResultDate(){
            if(this.Deb.debtorCreditSud.gr_zay_sud_result_date_arr==null){
              this.Deb.debtorCreditSud.gr_zay_sud_result_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.gr_zay_sud_result_date_arr.length>0){
              if(this.Deb.debtorCreditSud.gr_zay_sud_result_date!=this.Deb.debtorCreditSud.gr_zay_sud_result_date_arr[this.Deb.debtorCreditSud.gr_zay_sud_result_date_arr.length-1]){
                this.Deb.debtorCreditSud.gr_zay_sud_result_date_arr.push(this.Deb.debtorCreditSud.gr_zay_sud_result_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.gr_zay_sud_result_date_arr.push(this.Deb.debtorCreditSud.gr_zay_sud_result_date)
              this.changeDebCredSud();
            }
          },

          UpdateData_gr_zay_sud_napr_date(val){
            this.Deb.debtorCreditSud.gr_zay_sud_napr_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudGrZaySudNaprDate(){
            if(this.Deb.debtorCreditSud.gr_zay_sud_napr_date_arr==null){
              this.Deb.debtorCreditSud.gr_zay_sud_napr_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.gr_zay_sud_napr_date_arr.length>0){
              if(this.Deb.debtorCreditSud.gr_zay_sud_napr_date!=this.Deb.debtorCreditSud.gr_zay_sud_napr_date_arr[this.Deb.debtorCreditSud.gr_zay_sud_napr_date_arr.length-1]){
                this.Deb.debtorCreditSud.gr_zay_sud_napr_date_arr.push(this.Deb.debtorCreditSud.gr_zay_sud_napr_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.gr_zay_sud_napr_date_arr.push(this.Deb.debtorCreditSud.gr_zay_sud_napr_date)
              this.changeDebCredSud();
            }
          },

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
