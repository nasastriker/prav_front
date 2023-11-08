<template>
    <div >
        <div class="mt-5">

          <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col sm:w-1/4 w-full mb-2">
              <h6 class="h6">Дата смерти:<VarToClipboard name="dcs_inh_death_date"/></h6>
              <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.inh_death_date"  @blur="changeDebCredSud"></vs-input>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-2">
              <h6 class="h6">Номер наследственного дела:<span style="color: red;cursor: pointer;font-size: 12px" @click="showDataInfo=!showDataInfo">Информация</span><VarToClipboard name="dcs_inh_delo_nomer"/></h6>
              <vs-input type="text" class="w-100" v-model="Deb.debtorCreditSud.inh_delo_nomer" @change="changeDebCredSud"></vs-input>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-2">
              <h6 class="h6">ФИО нотариуса:<VarToClipboard name="dcs_inh_fio_notarius"/></h6>
              <vs-input type="text" class="w-100" v-model="Deb.debtorCreditSud.inh_fio_notarius" @change="changeDebCredSud"></vs-input>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-2">
              <h6 class="h6">Адрес нотариуса:<VarToClipboard name="dcs_inh_adress_notarius"/></h6>
              <vs-input type="text" class="w-100" v-model="Deb.debtorCreditSud.inh_adress_notarius" @change="changeDebCredSud"></vs-input>
            </div>
          </div>
            <vs-tabs alignment="fixed" color="danger">
              <vs-tab label="Данные наследников">
                <Inheritors></Inheritors>
              </vs-tab>
            </vs-tabs>
          </div>
            <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col sm:w-3/4 w-full mb-2">
              <JudicialHearings :sud_type="'inh'"></JudicialHearings>
              <h6 class="h6" style="margin-top: 15px">Место нахождения ИД:<VarToClipboard name="dc_find_sa"/></h6>
              <vs-input  class="w-100"  v-model="Deb.debtorCredit.find_sa" @change="changeDeb"></vs-input>
              <vs-tabs alignment="fixed" color="danger">
                <vs-tab label="Заявление в суд правопреемство наследство">
                  <div class="vx-row" style="padding-top: 20px">
                    <div class="vx-col sm:w-1/3 w-full mb-2">
                      <h6 class="h6">Дата направления:<VarToClipboard name="dcs_inh_zay_sud_napr_date"/></h6>
                      <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.inh_zay_sud_napr_date"  @blur="changeDebCredSud"></vs-input>
                      <h6 class="h6">Дата назначения судебного заседания:<VarToClipboard name="dcs_inh_zay_sud_zased_date"/></h6>
                      <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.inh_zay_sud_zased_date"  @blur="changeDebCredSud"></vs-input>
                      <h6 class="h6">План-Дата результат:</h6>
                      <vs-input type="date" class="w-100" disabled="true" v-model="planDateZay"></vs-input>

                    </div>

                    <div class="vx-col sm:w-1/3 w-full mb-2">
                      <DateControls></DateControls>
                    </div>

                    <div class="vx-col sm:w-1/3 w-full mb-2">
                      <h6 class="h6">Дата результата:<VarToClipboard name="dcs_inh_zay_sud_result_date"/></h6>
                      <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.inh_zay_sud_result_date"  @blur="changeDebCredSud"></vs-input>
                      <h6 class="h6" style="margin-top: 10px;">Результат:</h6>
                      <VarToClipboard name="dcs_inh_zay_sud_result_success"/>
                      <vs-checkbox v-model="Deb.debtorCreditSud.inh_zay_sud_result_success" @input="changeDebCredSud">
                        Удовлетворено
                      </vs-checkbox>
                      <VarToClipboard name="dcs_inh_zay_sud_result_cancel"/>
                      <vs-checkbox v-model="Deb.debtorCreditSud.inh_zay_sud_result_cancel" @input="changeDebCredSud">
                        Отказано
                      </vs-checkbox>
                    </div>
                  </div>
                </vs-tab>
              </vs-tabs>

              <vs-tabs alignment="fixed" color="danger">
                <vs-tab label="Частная жалоба отказ правопреемство наследство">
                  <div class="vx-row" style="padding-top: 20px">
                    <div class="vx-col sm:w-1/3 w-full mb-2">
                      <h6 class="h6">Дата направления:<VarToClipboard name="dcs_inh_claim_napr_date"/></h6>
                      <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.inh_claim_napr_date"  @blur="changeDebCredSud"></vs-input>
                      <h6 class="h6">План-Дата результат:</h6>
                      <vs-input type="date" class="w-100" disabled="true" v-model="planDateClaim"></vs-input>
                    </div>

                    <div class="vx-col sm:w-1/3 w-full mb-2">
                      <DateControls></DateControls>
                    </div>

                    <div class="vx-col sm:w-1/3 w-full mb-2">
                      <h6 class="h6">Дата результата:<VarToClipboard name="dcs_inh_claim_result_date"/></h6>
                      <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.inh_claim_result_date"  @blur="changeDebCredSud"></vs-input>
                      <h6 class="h6" style="margin-top: 10px;">Результат:</h6>
                      <VarToClipboard name="dcs_inh_claim_result_success"/>
                      <vs-checkbox v-model="Deb.debtorCreditSud.inh_claim_result_success" @input="changeDebCredSud">
                        Удовлетворено
                      </vs-checkbox>
                      <VarToClipboard name="dcs_inh_claim_result_cancel"/>
                      <vs-checkbox v-model="Deb.debtorCreditSud.inh_claim_result_cancel" @input="changeDebCredSud">
                        Отказано
                      </vs-checkbox>
                    </div>
                  </div>
                </vs-tab>
              </vs-tabs>

              <vs-tabs alignment="fixed" color="danger">
                <vs-tab label="Ходатайство о замене стороны">
                  <h6 class="h6">Дата:<VarToClipboard name="dcs_inh_hod_zamen_date"/></h6>
                  <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.inh_hod_zamen_date"  @blur="changeDebCredSud"></vs-input>
                </vs-tab>
              </vs-tabs>

              <vs-tabs alignment="fixed" color="danger">
                <vs-tab label="Шаблоны документов">
                  <ChangeShablon :perem="'shablon_inheritance'"></ChangeShablon>
                </vs-tab>
              </vs-tabs>

            </div>
            <div class="vx-col sm:w-1/4 w-full mb-2">
              <fieldset class="f" style="padding: 10px;">
                <legend class="l">Описка наследство:</legend>
                <h6 style="margin-top: 10px">Сверка данных:</h6>
                <VarToClipboard name="dcs_inh_op_err_fio_debtor"/>
                <vs-checkbox style="margin-top: 10px" v-model="Deb.debtorCreditSud.inh_op_err_fio_debtor" @input="changeDebCredSud">
                  Ошибка в ФИО должника
                </vs-checkbox>
                <VarToClipboard name="dcs_inh_op_err_dr_debtor"/>
                <vs-checkbox style="margin-top: 10px" v-model="Deb.debtorCreditSud.inh_op_err_dr_debtor" @input="changeDebCredSud">
                  Ошибка в дате рождения должника
                </vs-checkbox>
                <VarToClipboard name="dcs_inh_op_err_sa"/>
                <vs-checkbox style="margin-top: 10px" v-model="Deb.debtorCreditSud.inh_op_err_sa" @input="changeDebCredSud">
                  Ошибка в номере и (или) дате исполнительного документа
                </vs-checkbox>
                <VarToClipboard name="dcs_inh_op_err_sum"/>
                <vs-checkbox style="margin-top: 10px" v-model="Deb.debtorCreditSud.inh_op_err_sum" @input="changeDebCredSud">
                  Арифметическая ошибка в сумме долга, размере госпошлины
                </vs-checkbox>
                <VarToClipboard name="dcs_inh_op_err_name_rec"/>
                <vs-checkbox style="margin-top: 10px" v-model="Deb.debtorCreditSud.inh_op_err_name_rec" @input="changeDebCredSud">
                  Ошибка в наименовании Взыскателя
                </vs-checkbox>
                <VarToClipboard name="dcs_inh_op_err_recv_rec"/>
                <vs-checkbox style="margin-top: 10px" v-model="Deb.debtorCreditSud.inh_op_err_recv_rec" @input="changeDebCredSud">
                  Ошибка в банковских реквизитах Взыскателя
                </vs-checkbox>
                <VarToClipboard name="dcs_inh_op_err_orig_sud"/>
                <vs-checkbox style="margin-top: 10px" v-model="Deb.debtorCreditSud.inh_op_err_orig_sud" @input="changeDebCredSud">
                  Отсутствует оригинал печати судебного органа
                </vs-checkbox>
                <h6 class="h6" style="margin-top: 10px">Дополнительный текст:<VarToClipboard name="dcs_inh_op_dop_text"/></h6>
                <vs-textarea class="w-100 vs-textarea-scrolled" style="height: 200px;" v-model="Deb.debtorCreditSud.inh_op_dop_text" @change="changeDebCredSud"> </vs-textarea>

                <h6 style="margin-top: 10px">Заявление описка наследство:</h6>
                <h6 class="h6">Дата результата:<VarToClipboard name="dcs_inh_zay_op_result_date"/></h6>
                <vs-input type="date" class="w-100" v-model="Deb.debtorCreditSud.inh_zay_op_result_date"  @blur="changeDebCredSud"></vs-input>
                <h6 class="h6" style="margin-top: 10px;">Результат:</h6>
                <VarToClipboard name="dcs_inh_zay_op_result_success"/>
                <vs-checkbox v-model="Deb.debtorCreditSud.inh_zay_op_result_success" @input="changeDebCredSud">
                  Удовлетворено
                </vs-checkbox>
                <VarToClipboard name="dcs_inh_zay_op_result_cancel"/>
                <vs-checkbox v-model="Deb.debtorCreditSud.inh_zay_op_result_cancel" @input="changeDebCredSud">
                  Отказано
                </vs-checkbox>
              </fieldset>
            </div>
          </div>


      <vs-popup class="holamundo" title="Информация" :active.sync="showDataInfo">
        <template v-if="typeof Deb.debtorCreditSud.inh_data_notarius!='undefined'">
          <json-viewer
              :value="Deb.debtorCreditSud.inh_data_notarius"
              :expand-depth=5
              copyable

              sort></json-viewer>
        </template>
      </vs-popup>
        </div>

</template>

<script>
    import JudicialHearings from "./Render/JudicialHearings.vue";
    import Inheritors from "./Render/Inheritors.vue";
    import DateControls from "./Render/DateControls.vue";
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import moment from "moment";
    import ChangeShablon from "./Render/ChangeShablon.vue";
    import JsonViewer from 'vue-json-viewer'
    import VarToClipboard from './../../VarToClipboard.vue'
    export default {
        components: {
          DateControls,Inheritors,JudicialHearings,ChangeShablon,JsonViewer,VarToClipboard
        },

        //props:['idDep','back'],
        data () {
            return {
              showDataInfo:false,

            }
        },
        mounted(){
          this.getInheritorList(this.Deb.debtor.id);
        },

        asyncComputed: {

        },
        computed: {
          planDateZay(){
            if(typeof this.Deb.debtorCreditSud.inh_zay_sud_napr_date!='undefined'){
              if(this.Deb.debtorCreditSud.inh_zay_sud_napr_date!=null){
                let date1 = new Date(this.Deb.debtorCreditSud.inh_zay_sud_napr_date);
                let fortnightAway = new Date(date1);
                date1.setDate(fortnightAway.getDate() + 30);

                return  moment(date1.toString()).format("YYYY-MM-DD")
              }
            }
            return null
          },
          planDateClaim(){
            if(typeof this.Deb.debtorCreditSud.inh_claim_napr_date!='undefined'){
              if(this.Deb.debtorCreditSud.inh_claim_napr_date!=null){
                let date1 = new Date(this.Deb.debtorCreditSud.inh_claim_napr_date);
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
            'changeDeb','getInheritorList'
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
