<template>
    <div >

      <vs-checkbox style="margin-top: 20px;margin-bottom: 30px;margin-left: 15px" v-model="dubPol" @input="checkStatusDebtorCreditDublicat(Deb.debtorCredit.id)">
        <b>Дубликат ИД получен</b>
      </vs-checkbox>


      <vs-tabs alignment="fixed" color="danger">
        <vs-tab label="Обстоятельства утраты ИД">
          <div class="vx-row" style="margin-top: 20px">
            <div class="vx-col w-2/3  mb-2" style="border: 1px;">
              <VarToClipboard name="all_dub_obst_utr"/>
              <DynCheckBoxList :prist_perem="'dub_utr'"></DynCheckBoxList>
              <div style="margin-top: 15px">
<!--          <VarToClipboard name="dcs_dub_no_id_adress_verno"/>-->
          <vs-checkbox v-model="Deb.debtorCreditSud.dub_no_id_adress_verno" @input="changeDebCredSud">
            ИД не получен из суда. При проверке ШПИ адрес получателя указан верно
          </vs-checkbox>
              </div>
              <div style="margin-top: 15px">
<!--          <VarToClipboard name="dcs_dub_no_id_adress_neverno"/>-->
          <vs-checkbox v-model="Deb.debtorCreditSud.dub_no_id_adress_neverno" @input="changeDebCredSud">
            ИД не получен из суда. При проверке ШПИ адрес получателя указан неверно
          </vs-checkbox>
              </div>
              <div style="margin-top: 15px">
<!--          <VarToClipboard name="dcs_dub_id_napr_isp"/>-->
          <vs-checkbox v-model="Deb.debtorCreditSud.dub_id_napr_isp" @input="changeDebCredSud">
            ИД направлен на исполнение
          </vs-checkbox>
              </div>

              <vs-button color="primary" style="width: 300px;margin-top: 30px" @click="dublicatFile">Загрузить документ об утрате</vs-button>
              <vs-input id="fileUpload1" type="file" class="w-full mb-base" label-placeholder="file"
                        v-on:change="saveDocument($event)" style="display: none"/>

            </div>
            <div class="vx-col w-1/3  mb-2" style="border: 1px;">
<!--          <div class="vx-row" style="padding-top: 20px;    padding-right: 20px; padding-left: 20px;border-color: #62626262;">-->



            <h6 class="h6">Дополнительный текст11:</h6>
            <VarToClipboard name="dc_dub_text"/>
            <vs-textarea height="250px" class="vs-textarea-scrolled w-100" rows="10" v-model="Deb.debtorCredit.dub_text" @change="changeDeb"> </vs-textarea>

          </div>
          </div>
        </vs-tab>
      </vs-tabs>

      <vs-tabs alignment="fixed" color="danger">
        <vs-tab label="Запрос ФССП о наличии ИП">
          <div class="vx-row" style="padding-top: 20px;">
            <div class="vx-col mb-2">
              <h6 class="h6">Дата запроса:<VarToClipboard name="dcs_dub_req_exist_ip_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.dub_req_exist_ip_date"  @blur="changeDebCredSud"></vs-input>
            </div>
            <div class="vx-col mb-2">
              <h6 class="h6">Номер запроса:<VarToClipboard name="dcs_dub_req_exist_ip_number"/></h6>
              <vs-input type="text" class="w-100" v-model="Deb.debtorCreditSud.dub_req_exist_ip_number"  @change="changeDebCredSud" ></vs-input>
            </div>
            <div class="vx-col mb-2">
              <h6 class="h6">URL запроса:<VarToClipboard name="dcs_dub_req_exist_ip_url"/></h6>
              <vs-input type="text" class="w-100" v-model="Deb.debtorCreditSud.dub_req_exist_ip_url"  @change="changeDebCredSud" ></vs-input>
            </div>
          </div>
          <div class="vx-row" style="padding-top: 10px;">
            <div class="vx-col mb-2">
              <h6 class="h6">Дата ответа:<VarToClipboard name="dcs_dub_req_exist_ip_answer_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.dub_req_exist_ip_answer_date"  @blur="changeDebCredSud"></vs-input>
            </div>
            <div class="vx-col mb-2">
              <h6 class="h6">Ответ:<VarToClipboard name="dcs_dub_req_exist_ip_answer"/></h6>
              <vs-input type="text" class="w-100" v-model="Deb.debtorCreditSud.dub_req_exist_ip_answer"  @change="changeDebCredSud" ></vs-input>
            </div>
            <div class="vx-col mb-2" style="margin-top: 15px">
              <DownloadFile :perem_type_doc="'credit_otvet_na_zapros_o_nalichii_ip'"></DownloadFile>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>

      <vs-tabs alignment="fixed" color="danger">
        <vs-tab label="Заявление дубликат">
          <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col mb-2">
              <h6 class="h6">Дата направления:<VarToClipboard name="dc_date_dublicat"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_dublicat"  @blur="changeDebCredSudDateDublicat"></vs-input>
              <h6 class="h6">План-Дата результат:</h6>
              <vs-input type="date" class="w-100" disabled="true" v-model="planDateZay"></vs-input>
            </div>
            <div class="vx-col mb-2">
              <h6 class="h6">Дата результата:<VarToClipboard name="dcs_dub_zay_result_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.dub_zay_result_date"  @blur="changeDebCredSudDubZayResultDate"></vs-input>
            </div>
            <div class="vx-col mb-2">
              <h6 class="h6">Результат:</h6>
              <VarToClipboard name="dcs_dub_zay_result_success"/>
              <vs-checkbox v-model="Deb.debtorCreditSud.dub_zay_result_success" @input="changeDebCredSud">
                Удовлетворено
              </vs-checkbox>
              <VarToClipboard name="dcs_dub_zay_result_cancel"/>
              <vs-checkbox v-model="Deb.debtorCreditSud.dub_zay_result_cancel" @input="changeDebCredSud">
                Отказано
              </vs-checkbox>
            </div>
            <div class="vx-col mb-2" style="margin-top: 15px">
              <div class="vx-row">
                <SudCopyRequest :perem="'date_dublicat'" @refreshAfterSend="refreshAfterSend"></SudCopyRequest>
                <vs-button color="primary" style="margin-left: 10px" @click="showDatesDubZay=!showDatesDubZay">История</vs-button>
                <DownloadFile :perem_type_doc="'credit_zayavlenie_dublikat'"></DownloadFile>
                <SettingsRegSudAct :perem="'date_dublicat'" :type="'all'"></SettingsRegSudAct>
              </div>
            </div>
          </div>
          <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col mb-2">
              <h6 class="h6">Дата уведомления:<VarToClipboard name="dcs_dub_date_debtor"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.dub_date_debtor"  @blur="changeDebCredSud"></vs-input>

            </div>
            <div class="vx-col mb-2">
              <h6 class="h6">ШПИ Уведомления:<VarToClipboard name="dcs_dub_shpi_debtor"/></h6>
              <vs-input type="text" class="w-100" v-model="Deb.debtorCreditSud.dub_shpi_debtor"  @blur="changeDebCredSud"></vs-input>
            </div>

          </div>
        </vs-tab>
      </vs-tabs>

      <vs-tabs alignment="fixed" color="danger">
        <vs-tab label="Частная жалоба отказ дубликат">
          <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col mb-2">
              <h6 class="h6">Дата направления:<VarToClipboard name="dcs_dub_claim_napr_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.dub_claim_napr_date"  @blur="changeDebCredSudDubClaimNaprDate"></vs-input>
              <h6 class="h6">План-Дата результат:</h6>
              <vs-input type="date" class="w-100" disabled="true" v-model="planDateClaim"></vs-input>
            </div>

<!--            <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--              <DateControls :perem="'dub_claim_napr_date'"></DateControls>-->
<!--            </div>-->

            <div class="vx-col mb-2">
              <h6 class="h6">Дата результата:<VarToClipboard name="dcs_dub_claim_result_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.dub_claim_result_date"  @blur="changeDebCredSudDubClaimResultDate"></vs-input>
            </div>
            <div class="vx-col mb-2">
              <h6 class="h6">Результат:</h6>
              <VarToClipboard name="dcs_dub_claim_result_success"/>
              <vs-checkbox v-model="Deb.debtorCreditSud.dub_claim_result_success" @input="changeDebCredSud">
                Удовлетворено
              </vs-checkbox>
              <VarToClipboard name="dcs_dub_claim_result_cancel"/>
              <vs-checkbox v-model="Deb.debtorCreditSud.dub_claim_result_cancel" @input="changeDebCredSud">
                Отказано
              </vs-checkbox>
            </div>
            <div class="vx-col mb-2" style="margin-top: 15px">
              <div class="vx-row">
                <SudCopyRequest :perem="'dub_claim_napr_date'" @refreshAfterSend="refreshAfterSend"></SudCopyRequest>
                <vs-button color="primary" style="margin-left: 10px" @click="showDatesDubClaim=!showDatesDubClaim">История</vs-button>
                <DownloadFile :perem_type_doc="'credit_claim_dublicat'"></DownloadFile>
                <SettingsRegSudAct :perem="'dub_claim_napr_date'" :type="'all'"></SettingsRegSudAct>
              </div>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>

      <vs-tabs alignment="fixed" color="danger">
        <vs-tab label="Шаблоны документов">
          <ChangeShablon :perem="'shablon_dublikat'" @refreshAfterSend="refreshAfterSend"></ChangeShablon>
          <DateControls :perem="'changes_id_dublicat'" :ref="'comp_date_controls'"></DateControls>
        </vs-tab>
      </vs-tabs>

      <vs-popup class="holamundo" title="История:" :active.sync="showDatesDubZay">
        <div>
          <h6 class="h6">Даты направления:</h6>
          <ObjFromJsonViewButton :value="Deb.debtorCreditSud.date_dublicat_arr" @update_arr="UpdateData_date_dublicat"></ObjFromJsonViewButton>
        </div>
        <div style="margin-top: 20px">
          <h6 class="h6">Даты результата:</h6>
          <ObjFromJsonViewButton :value="Deb.debtorCreditSud.dub_zay_result_date_arr" @update_arr="UpdateData_dub_zay_result_date"></ObjFromJsonViewButton>
        </div>
      </vs-popup>

      <vs-popup class="holamundo" title="История:" :active.sync="showDatesDubClaim">
        <div>
          <h6 class="h6">Даты направления:</h6>
          <ObjFromJsonViewButton :value="Deb.debtorCreditSud.dub_claim_napr_date_arr" @update_arr="UpdateData_dub_claim_napr_date"></ObjFromJsonViewButton>
        </div>
        <div style="margin-top: 20px">
          <h6 class="h6">Даты результата:</h6>
          <ObjFromJsonViewButton :value="Deb.debtorCreditSud.dub_claim_result_date_arr" @update_arr="UpdateData_dub_claim_result_date"></ObjFromJsonViewButton>
        </div>
      </vs-popup>
    </div>
</template>

<script>
    import DateControls from "./Render/DateControls.vue";
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import moment from "moment";
    import ChangeShablon from "./Render/ChangeShablon.vue";
    import Status from '../../../components/Status.vue'
    import DownloadFile from "../../RegSudAct/Render/DownloadFile.vue";
    import ObjFromJsonViewButton from '../../RenderComponent/ObjFromJsonViewButton.vue'
    import VarToClipboard from './../../VarToClipboard.vue';
    import SettingsRegSudAct from "../../RegSudAct/Render/SettingsRegSudAct.vue";
    import SudCopyRequest from "../../RegSudAct/Render/SudCopyRequest.vue";
    import DynCheckBoxList from "../../DynCheckBoxList/DynCheckBoxList.vue";
    export default {
        components: {
          DateControls,ChangeShablon,Status,ObjFromJsonViewButton,DownloadFile,VarToClipboard,SettingsRegSudAct,
          SudCopyRequest,DynCheckBoxList
        },

        //props:['idDep','back'],
        data () {
            return {
              showStatus:true,
              dubPol:false,
              showDatesDubZay:false,
              showDatesDubClaim:false,
            }
        },
        mounted(){


        },

        asyncComputed: {

        },
        computed: {
          planDateZay(){
            if(typeof this.Deb.debtorCredit.date_dublicat!='undefined'){
              if( this.Deb.debtorCredit.date_dublicat!=null){
                let date1 = new Date(this.Deb.debtorCredit.date_dublicat);
                let fortnightAway = new Date(date1);
                date1.setDate(fortnightAway.getDate() + 84);
                return  moment(date1.toString()).format("YYYY-MM-DD")
              }
            }
            return null
          },
          planDateClaim(){
            if(typeof this.Deb.debtorCreditSud.dub_claim_napr_date!='undefined'){
              if(this.Deb.debtorCreditSud.dub_claim_napr_date!=null){
                let date1 = new Date(this.Deb.debtorCreditSud.dub_claim_napr_date);
                let fortnightAway = new Date(date1);
                date1.setDate(fortnightAway.getDate() + 84);

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
            'changeDeb','getInheritorList','saveDebtorCreditDocument','checkDebtorCreditDublicat','checkStatusDebtorCreditDublicat'
          ]),

          refreshAfterSend(){
            this.$refs.comp_date_controls.refreshDateControls();
          },

          UpdateData_dub_claim_napr_date(val){
            this.Deb.debtorCreditSud.dub_claim_napr_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudDubClaimNaprDate(){
            if(this.Deb.debtorCreditSud.dub_claim_napr_date_arr==null){
              this.Deb.debtorCreditSud.dub_claim_napr_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.dub_claim_napr_date_arr.length>0){
              if(this.Deb.debtorCreditSud.dub_claim_napr_date!=this.Deb.debtorCreditSud.dub_claim_napr_date_arr[this.Deb.debtorCreditSud.dub_claim_napr_date_arr.length-1]){
                this.Deb.debtorCreditSud.dub_claim_napr_date_arr.push(this.Deb.debtorCreditSud.dub_claim_napr_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.dub_claim_napr_date_arr.push(this.Deb.debtorCreditSud.dub_claim_napr_date)
              this.changeDebCredSud();
            }
          },

          UpdateData_date_dublicat(val){
            this.Deb.debtorCreditSud.date_dublicat_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudDateDublicat(){
            if(this.Deb.debtorCreditSud.date_dublicat_arr==null){
              this.Deb.debtorCreditSud.date_dublicat_arr=[];
            }
            if(this.Deb.debtorCreditSud.date_dublicat_arr.length>0){
              if(this.Deb.debtorCredit.date_dublicat!=this.Deb.debtorCreditSud.date_dublicat_arr[this.Deb.debtorCreditSud.date_dublicat_arr.length-1]){
                this.Deb.debtorCreditSud.date_dublicat_arr.push(this.Deb.debtorCredit.date_dublicat)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.date_dublicat_arr.push(this.Deb.debtorCredit.date_dublicat)
              this.changeDebCredSud();
            }
          },

          UpdateData_dub_claim_result_date(val){
            this.Deb.debtorCreditSud.dub_claim_result_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudDubClaimResultDate(){
            if(this.Deb.debtorCreditSud.dub_claim_result_date_arr==null){
              this.Deb.debtorCreditSud.dub_claim_result_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.dub_claim_result_date_arr.length>0){
              if(this.Deb.debtorCreditSud.dub_claim_result_date!=this.Deb.debtorCreditSud.dub_claim_result_date_arr[this.Deb.debtorCreditSud.dub_claim_result_date_arr.length-1]){
                this.Deb.debtorCreditSud.dub_claim_result_date_arr.push(this.Deb.debtorCreditSud.dub_claim_result_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.dub_claim_result_date_arr.push(this.Deb.debtorCreditSud.dub_claim_result_date)
              this.changeDebCredSud();
            }
          },

          UpdateData_dub_zay_result_date(val){
            this.Deb.debtorCreditSud.dub_zay_result_date_arr=val
            this.changeDebCredSud();
          },
          changeDebCredSudDubZayResultDate(){
            if(this.Deb.debtorCreditSud.dub_zay_result_date_arr==null){
              this.Deb.debtorCreditSud.dub_zay_result_date_arr=[];
            }
            if(this.Deb.debtorCreditSud.dub_zay_result_date_arr.length>0){
              if(this.Deb.debtorCreditSud.dub_zay_result_date!=this.Deb.debtorCreditSud.dub_zay_result_date_arr[this.Deb.debtorCreditSud.dub_zay_result_date_arr.length-1]){
                this.Deb.debtorCreditSud.dub_zay_result_date_arr.push(this.Deb.debtorCreditSud.dub_zay_result_date)
                this.changeDebCredSud();
              }
            }
            else{
              this.Deb.debtorCreditSud.dub_zay_result_date_arr.push(this.Deb.debtorCreditSud.dub_zay_result_date)
              this.changeDebCredSud();
            }
          },

          changeDebCredSud(){
            this.changeDeb();
          },
          dublicatFile(){
            document.getElementById("fileUpload1").click()
          },
          saveDocument(evt){
            this.saveDebtorCreditDocument({
              file: evt.target.files[0],
              name: evt.target.files[0].name,
              id: this.Deb.debtorCredit.id,
              type:34,
            }).then((response) => {
              if (response.result) {
                // this.$refs.status.setStatus(13);
                this.checkDebtorCreditDublicat(this.Deb.debtorCredit.id).then((response_dub) => {
                  if (response_dub.result) {
                    this.changeDebCredSud();
                    this.$vs.notify({
                      title: 'Успешно',
                      text: 'Сохранено!!!',
                      color: 'success',
                      position: 'top-center'
                    })
                  }
                });
              } else {
                this.$vs.notify({
                  title: 'Ошибка',
                  text: response.message,
                  color: 'danger',
                  position: 'top-center'
                })
              }
            }).catch(error => {
              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Ошибка',
                text: error.message,
                color: 'danger',
                position: 'top-center'
              })
            });
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
