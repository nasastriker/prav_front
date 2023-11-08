<template>
  <div>

                  <vs-tabs alignment="fixed" color="danger">
                    <vs-tab label="Сверка данных">

                    <div class="vx-row" style="border-color: #62626262;margin-top: 20px">

                        <div class="vx-col w-1/3  mb-2" style="border: 1px;">
                          <div>
                            <VarToClipboard name="dc_opiska_fio"/>
                            <vs-checkbox v-model="Deb.debtorCredit.opiska_fio" @input="changeDebStatus(Deb.debtorCredit.opiska_fio)">
                              Ошибка в ФИО должника
                            </vs-checkbox>
                          </div>

                          <div style="margin-top: 15px">
                            <VarToClipboard name="dc_opiska_birthdate"/>
                            <vs-checkbox v-model="Deb.debtorCredit.opiska_birthdate" @input="changeDebStatus(Deb.debtorCredit.opiska_birthdate)">
                              Ошибка в дате рождения должника
                            </vs-checkbox>
                          </div>
                          <div style="margin-top: 15px">
                            <VarToClipboard name="dc_opiska_mesto_bith"/>
                            <vs-checkbox v-model="Deb.debtorCredit.opiska_mesto_bith" @input="changeDebStatus(Deb.debtorCredit.opiska_mesto_bith)">
                              Ошибка в месте рождения
                            </vs-checkbox>
                          </div>
                          <div style="margin-top: 15px">
                            <VarToClipboard name="dc_opiska_number"/>
                            <vs-checkbox v-model="Deb.debtorCredit.opiska_number" @input="changeDebStatus(Deb.debtorCredit.opiska_number)">
                              Ошибка в номере и (или) дате исполнительного документа
                            </vs-checkbox>
                          </div>
                        </div>

                      <div class="vx-col w-1/3  mb-2" style="border: 1px;">
                        <div>
                          <VarToClipboard name="dc_opiska_recover"/>
                          <vs-checkbox v-model="Deb.debtorCredit.opiska_recover" @input="changeDebStatus(Deb.debtorCredit.opiska_recover)"
                                       style="min-width: 20px;">Ошибка в наименовании Взыскателя
                          </vs-checkbox>
                        </div>
                        <div style="margin-top: 15px">
                          <VarToClipboard name="dc_opiska_bank"/>
                          <vs-checkbox v-model="Deb.debtorCredit.opiska_bank" @input="changeDebStatus(Deb.debtorCredit.opiska_bank)">
                            Ошибка в банковских реквизитах Взыскателя
                          </vs-checkbox>
                        </div>
                        <div style="margin-top: 15px">
                          <VarToClipboard name="dc_opiska_shtamp"/>
                          <vs-checkbox v-model="Deb.debtorCredit.opiska_shtamp" @input="changeDebShtamb">
                            Отсутствует в исполнительном документе оригинал печати судебного органа
                          </vs-checkbox>
                          <vs-popup class="holamundo" title="Внимание :" :active.sync="showVnim">

                            <h2>Необходимо:</h2>
                            <h2>1. Выгрузить заявление в суд на описку самостоятельно.</h2>
                            <h2>2. Приложить оригинал Исполнительного документа.</h2>
                            <h2>3. Положить на отправку в лоток "На конверты".</h2>



                          </vs-popup>
                        </div>
                      </div>
                      <div class="vx-col w-1/3  mb-2" style="border: 1px;">
                        <div>
                          <VarToClipboard name="dc_opiska_sum"/>
                          <vs-checkbox v-model="Deb.debtorCredit.opiska_sum" @input="changeDebStatus(Deb.debtorCredit.opiska_sum)">
                            Арифметическая ошибка в сумме долга, размере госпошлины
                          </vs-checkbox>
                        </div>
                        <div style="margin-top: 15px">
                          <h6 class="h6">Дополнительный текст:<VarToClipboard name="dc_opiska_text"/></h6>
                          <vs-textarea class="w-100 vs-textarea-scrolled" style="min-height: 100px; height: 130px;" v-model="Deb.debtorCredit.opiska_text" @change="changeDebStatus(Deb.debtorCredit.opiska_text)"> </vs-textarea>
                        </div>
                      </div>
                    </div>




                    </vs-tab>
                  </vs-tabs>


          <vs-tabs alignment="fixed" color="danger">
            <vs-tab label="Заявление описка в ИД">
              <div class="vx-row" style="padding-top: 20px">
                <div class="vx-col mb-2">
                  <h6 class="h6">Дата направления:<VarToClipboard name="dc_date_opiska"/></h6>
                  <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_opiska"  @blur="changeDebDateOpiska"></vs-input>
                  <h6 class="h6">План-Дата результат:</h6>
                  <vs-input type="date" class="w-100" disabled="true" v-model="planDateZay"></vs-input>
                </div>

<!--                <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--                  <DateControls :perem="'zayavlenie_opiska'"></DateControls>-->
<!--                </div>-->

                <div class="vx-col mb-2">
                  <h6 class="h6">Дата результата:<VarToClipboard name="dcs_op_zay_result_date"/></h6>
                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.op_zay_result_date"  @blur="changeDebCredSudOpZayResultDate"></vs-input>
                  <h6 class="h6">ШПИ заявления описка в ИД:<VarToClipboard name="dcs_op_zay_shpi"/></h6>
                  <vs-input  class="w-100" v-model="Deb.debtorCreditSud.op_zay_shpi" @change="changeDebCredSud"></vs-input>
                </div>
                <div class="vx-col mb-2">
                  <h6 class="h6">Результат:</h6>
                  <VarToClipboard name="dcs_op_zay_result_success"/>
                  <vs-checkbox v-model="Deb.debtorCreditSud.op_zay_result_success" @input="changeDebCredSud">
                    Удовлетворено
                  </vs-checkbox>
                  <VarToClipboard name="dcs_op_zay_result_cancel"/>
                  <vs-checkbox v-model="Deb.debtorCreditSud.op_zay_result_cancel" @input="changeDebCredSud">
                    Отказано
                  </vs-checkbox>
                </div>
                <div class="vx-col mb-2" style="margin-top: 15px">
                  <div class="vx-row">
                    <SudCopyRequest :perem="'date_opiska'" @refreshAfterSend="refreshAfterSend"></SudCopyRequest>
                    <vs-button color="primary" style="margin-left: 10px" @click="showDatesOpiskaZay=!showDatesOpiskaZay">История</vs-button>
                    <DownloadFile :perem_type_doc="'credit_zayavlenie_opiska'"></DownloadFile>
                    <SettingsRegSudAct :perem="'date_opiska'" :type="'all'"></SettingsRegSudAct>
                  </div>
                </div>
              </div>
            </vs-tab>
          </vs-tabs>

      <vs-tabs alignment="fixed" color="danger">
        <vs-tab label="Частная жалоба отказ описка">
          <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col mb-2">
              <h6 class="h6">Дата направления:<VarToClipboard name="dcs_op_claim_napr_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.op_claim_napr_date"  @blur="changeDebCredSudOpClaimNaprDate"></vs-input>
              <h6 class="h6">План-Дата результат:</h6>
              <vs-input type="date" class="w-100" disabled="true" v-model="planDateClaim"></vs-input>
            </div>

<!--            <div class="vx-col sm:w-1/3 w-full mb-2">-->
<!--              <DateControls :perem="'op_claim_napr_date'"></DateControls>-->
<!--            </div>-->

            <div class="vx-col mb-2">
              <h6 class="h6">Дата результата:<VarToClipboard name="dcs_op_claim_result_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.op_claim_result_date"  @blur="changeDebCredSudOpClaimResultDate"></vs-input>
            </div>
            <div class="vx-col mb-2">
              <h6 class="h6">Результат:</h6>
              <VarToClipboard name="dcs_op_claim_result_success"/>
              <vs-checkbox v-model="Deb.debtorCreditSud.op_claim_result_success" @input="changeDebCredSud">
                Удовлетворено
              </vs-checkbox>
              <VarToClipboard name="dcs_op_claim_result_cancel"/>
              <vs-checkbox v-model="Deb.debtorCreditSud.op_claim_result_cancel" @input="changeDebCredSud">
                Отказано
              </vs-checkbox>
            </div>
            <div class="vx-col mb-2" style="margin-top: 15px">
              <div class="vx-row">
                <SudCopyRequest :perem="'op_claim_napr_date'" @refreshAfterSend="refreshAfterSend"></SudCopyRequest>
                <vs-button color="primary" style="margin-left: 10px" @click="showDatesOpiskaClaim=!showDatesOpiskaClaim">История</vs-button>
                <DownloadFile :perem_type_doc="'credit_claim_opiska'"></DownloadFile>
                <SettingsRegSudAct :perem="'op_claim_napr_date'" :type="'all'"></SettingsRegSudAct>
              </div>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>

      <vs-tabs alignment="fixed" color="danger">
        <vs-tab label="Шаблоны документов">
          <ChangeShablon :perem="'shablon_opiska'" @refreshAfterSend="refreshAfterSend"></ChangeShablon>
          <DateControls :perem="'opiska'" :ref="'comp_date_controls'"></DateControls>
        </vs-tab>
      </vs-tabs>

      <vs-popup class="holamundo" title="История:" :active.sync="showDatesOpiskaZay">
        <div>
          <h6 class="h6">Даты направления:</h6>
          <ObjFromJsonViewButton :value="Deb.debtorCreditSud.date_opiska_arr" @update_arr="UpdateData_date_opiska"></ObjFromJsonViewButton>
        </div>
        <div style="margin-top: 20px">
          <h6 class="h6">Даты результата:</h6>
          <ObjFromJsonViewButton :value="Deb.debtorCreditSud.op_zay_result_date_arr" @update_arr="UpdateData_op_zay_result_date"></ObjFromJsonViewButton>
        </div>
      </vs-popup>

    <vs-popup class="holamundo" title="История:" :active.sync="showDatesOpiskaClaim">
      <div>
        <h6 class="h6">Даты направления:</h6>
        <ObjFromJsonViewButton :value="Deb.debtorCreditSud.op_claim_napr_date_arr" @update_arr="UpdateData_op_claim_napr_date"></ObjFromJsonViewButton>
      </div>
      <div style="margin-top: 20px">
        <h6 class="h6">Даты результата:</h6>
        <ObjFromJsonViewButton :value="Deb.debtorCreditSud.op_claim_result_date_arr" @update_arr="UpdateData_op_claim_result_date"></ObjFromJsonViewButton>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import DateControls from "./Render/DateControls.vue";
import AsyncComputed from 'vue-async-computed'
import {mapActions, mapGetters} from 'vuex'
import VueSuggestions from 'vue-suggestions';
import Status from '../../../components/Status.vue'
import r from '../../../route';
import axios from '../../../axios'
import moment from "moment/moment";
import ObjFromJsonViewButton from '../../RenderComponent/ObjFromJsonViewButton.vue'
import DownloadFile from "../../RegSudAct/Render/DownloadFile.vue";
import ChangeShablon from "./Render/ChangeShablon.vue";
import VarToClipboard from './../../VarToClipboard.vue';
import SettingsRegSudAct from "../../RegSudAct/Render/SettingsRegSudAct.vue";
import SudCopyRequest from "../../RegSudAct/Render/SudCopyRequest.vue";
Vue.use(AsyncComputed)
export default {
    components: {
        VueSuggestions, Status, DateControls,ChangeShablon,ObjFromJsonViewButton,
      DownloadFile,VarToClipboard,SettingsRegSudAct,SudCopyRequest
    },
    data() {
        return {
            showVnim:false,
            showInfoFssp: false,
            years: ['2021', '2020', '2019', '2018'],
            load:'',
          showDatesOpiskaZay:false,
          showDatesOpiskaClaim:false,
        }
    },
    mounted() {
        this.getBanksNameAndId();
    },
    asyncComputed: {},
    computed: {
      planDateZay(){
        if(typeof this.Deb.debtorCredit.date_opiska!='undefined'){
          if(this.Deb.debtorCredit.date_opiska!=null){
            let date1 = new Date(this.Deb.debtorCredit.date_opiska);
            let fortnightAway = new Date(date1);
            date1.setDate(fortnightAway.getDate() + 30);

            return  moment(date1.toString()).format("YYYY-MM-DD")
          }
        }
        return null
      },
      planDateClaim(){
        if(typeof this.Deb.debtorCreditSud.op_claim_napr_date!='undefined'){
          if(this.Deb.debtorCreditSud.op_claim_napr_date!=null){
            let date1 = new Date(this.Deb.debtorCreditSud.op_claim_napr_date);
            let fortnightAway = new Date(date1);
            date1.setDate(fortnightAway.getDate() + 84);

            return  moment(date1.toString()).format("YYYY-MM-DD")
          }
        }
        return null
      },

        ...mapGetters([
            'StatussDebtorArr', 'Deb', 'BanksArr','User'

        ]),


    },
    methods: {
      refreshAfterSend(){
        this.$refs.comp_date_controls.refreshDateControls();
      },
      UpdateData_op_claim_napr_date(val){
        this.Deb.debtorCreditSud.op_claim_napr_date_arr=val
        this.changeDebCredSud();
      },
      changeDebCredSudOpClaimNaprDate(){
        if(this.Deb.debtorCreditSud.op_claim_napr_date_arr==null){
          this.Deb.debtorCreditSud.op_claim_napr_date_arr=[];
        }
        if(this.Deb.debtorCreditSud.op_claim_napr_date_arr.length>0){
          if(this.Deb.debtorCreditSud.op_claim_napr_date!=this.Deb.debtorCreditSud.op_claim_napr_date_arr[this.Deb.debtorCreditSud.op_claim_napr_date_arr.length-1]){
            this.Deb.debtorCreditSud.op_claim_napr_date_arr.push(this.Deb.debtorCreditSud.op_claim_napr_date)
            this.changeDebCredSud();
          }
        }
        else{
          this.Deb.debtorCreditSud.op_claim_napr_date_arr.push(this.Deb.debtorCreditSud.op_claim_napr_date)
          this.changeDebCredSud();
        }
      },

      UpdateData_date_opiska(val){
        this.Deb.debtorCreditSud.date_opiska_arr=val
        this.changeDebCredSud();
      },
      changeDebDateOpiska(){
        if(this.Deb.debtorCreditSud.date_opiska_arr==null){
          this.Deb.debtorCreditSud.date_opiska_arr=[];
        }
        if(this.Deb.debtorCreditSud.date_opiska_arr.length>0){
          if(this.Deb.debtorCredit.date_opiska!=this.Deb.debtorCreditSud.date_opiska_arr[this.Deb.debtorCreditSud.date_opiska_arr.length-1]){
            this.Deb.debtorCreditSud.date_opiska_arr.push(this.Deb.debtorCredit.date_opiska)
            this.changeDebCredSud();
          }
        }
        else{
          this.Deb.debtorCreditSud.date_opiska_arr.push(this.Deb.debtorCredit.date_opiska)
          this.changeDebCredSud();
        }
      },

      UpdateData_op_claim_result_date(val){
        this.Deb.debtorCreditSud.op_claim_result_date_arr=val
        this.changeDebCredSud();
      },
      changeDebCredSudOpClaimResultDate(){
        if(this.Deb.debtorCreditSud.op_claim_result_date_arr==null){
          this.Deb.debtorCreditSud.op_claim_result_date_arr=[];
        }
        if(this.Deb.debtorCreditSud.op_claim_result_date_arr.length>0){
          if(this.Deb.debtorCreditSud.op_claim_result_date!=this.Deb.debtorCreditSud.op_claim_result_date_arr[this.Deb.debtorCreditSud.op_claim_result_date_arr.length-1]){
            this.Deb.debtorCreditSud.op_claim_result_date_arr.push(this.Deb.debtorCreditSud.op_claim_result_date)
            this.changeDebCredSud();
          }
        }
        else{
          this.Deb.debtorCreditSud.op_claim_result_date_arr.push(this.Deb.debtorCreditSud.op_claim_result_date)
          this.changeDebCredSud();
        }
      },

      UpdateData_op_zay_result_date(val){
        this.Deb.debtorCreditSud.op_zay_result_date_arr=val
        this.changeDebCredSud();
      },
      changeDebCredSudOpZayResultDate(){
        if(this.Deb.debtorCreditSud.op_zay_result_date_arr==null){
          this.Deb.debtorCreditSud.op_zay_result_date_arr=[];
        }
        if(this.Deb.debtorCreditSud.op_zay_result_date_arr.length>0){
          if(this.Deb.debtorCreditSud.op_zay_result_date!=this.Deb.debtorCreditSud.op_zay_result_date_arr[this.Deb.debtorCreditSud.op_zay_result_date_arr.length-1]){
            this.Deb.debtorCreditSud.op_zay_result_date_arr.push(this.Deb.debtorCreditSud.op_zay_result_date)
            this.changeDebCredSud();
          }
        }
        else{
          this.Deb.debtorCreditSud.op_zay_result_date_arr.push(this.Deb.debtorCreditSud.op_zay_result_date)
          this.changeDebCredSud();
        }
      },
        changeDebShtamb(){
            this.changeDeb();
            if(this.Deb.debtorCredit.opiska_shtamp){
                let str=this.Deb.debtorCredit.number_sa[0]+this.Deb.debtorCredit.number_sa[1];
                str=str.toLowerCase();
                if(str=='bc'||str=='вс'){
                    this.showVnim=true
                }
            }
        },
        changeDebStatus(dat) {
            this.changeDeb();
            // if(dat){
            //     this.$refs.status.setStatus(12);
            // }

        },
        opiska() {
            this.$vs.loading({color: '#ff8000'})
            axios.get(r("document.index"), {
                responseType: 'arraybuffer',

                params: {
                    method: 'getOpiska',
                    param: this.Deb.debtorCredit.id,


                }
            }).then((response) => {
                this.$vs.loading.close()
                this.$refs.status.setStatus(52);
                //console.log(response.data);
                const url = window.URL.createObjectURL(new File([(response.data)], {type: 'application/doc;charset=UTF-8;'}));
                //  console.log(url);
                const link = document.createElement('a');
                link.href = url;

                link.setAttribute('download', 'Описка__' + this.Deb.debtor.name_family + '_' + this.Deb.debtor.name + '_' + this.Deb.debtor.name_patronymic + '.pdf');


                document.body.appendChild(link);
                link.click();


            }).catch(error => {
                this.$vs.loading.close()
                //   this.popupActive3=false;

                this.$vs.notify({
                    title: 'Ошибка',
                    text: 'Ошибка!!!',
                    color: 'danger',
                    position: 'top-center'
                })

            });
        },

        close() {

            this.$router.back()
        },
        getData() {

            this.$router.back()
        },
        ...mapActions([
            'saveDebtor', 'getDataStatuss', 'getDataDebtorsById', 'getBanksNameAndId', 'changeDeb'
        ]),
      changeDebCredSud(){
        this.changeDeb();
      },


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

.checkbox_x.vs-checkbox {
    min-width: 20px;
}

</style>
