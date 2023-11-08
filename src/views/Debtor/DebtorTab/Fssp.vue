<template>
  <div class="vx-card p-6 no-shadow">
        <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col sm:w-2/3 w-full mb-2">
                <template v-if="typeof Deb.debtorCredit.id!='undefined'">
                    <Status :id_credit="Deb.debtorCredit.id" class="h6"></Status>
                </template>
              </div>
        </div>
                <div class="vx-row" style="padding-top: 20px">
                    <div class="vx-col sm:w-1/4 w-full mb-2">

                        <h6 class="h6">Взыскатель:</h6>
                        <vs-input class="w-auto" readonly v-model="Deb.recover.name"></vs-input>
                        <h6 class="h6">Первоначальный взыскатель:</h6>
                        <vs-input class="w-auto "  readonly v-model="Deb.recover.namePerv"></vs-input>
                        <h6 class="h6" style="margin-top: 25px">Фамилия:<VarToClipboard name="d_name_family"/></h6>
                        <vs-input class="w-auto " readonly v-model="Deb.debtor.name_family"></vs-input>
                        <h6 class="h6">Предыдущая фамилия:<VarToClipboard name="d_name_family_last"/></h6>
                        <vs-input class="w-auto"  readonly v-model="Deb.debtor.name_family_last"></vs-input>
                        <h6 class="h6">Имя:<VarToClipboard name="d_name"/></h6>
                        <vs-input class="w-auto " readonly v-model="Deb.debtor.name"></vs-input>
                        <h6 class="h6">Отчество:<VarToClipboard name="d_name_patronymic"/></h6>
                        <vs-input class="w-auto " readonly  v-model="Deb.debtor.name_patronymic"></vs-input>
                        <h6 class="h6">Дата рождения:<VarToClipboard name="d_birthdate"/></h6>
                        <vs-input type="date" class="w-auto " readonly v-model="Deb.debtor.birthdate"></vs-input>


                      <h6 class="h6" style="margin-top: 15px">Тип ИД:<VarToClipboard name="dc_type_cp"/></h6>
                      <v-select style="    max-width: 250px;" class="w-auto " :reduce="label => label.id" label="name" :options="TypeCP"  v-model="Deb.debtorCredit.type_cp" @input="changeDeb"></v-select>
                      <h6 class="h6" >№ СА:<VarToClipboard name="dc_number_sa"/></h6>
                      <vs-input class="w-auto"  v-model="Deb.debtorCredit.number_sa" @change="changeDeb"></vs-input>
                      <h6 class="h6">Дата СА:<VarToClipboard name="dc_date_sa"/></h6>
                      <vs-input type="date" class="w-auto"  v-model="Deb.debtorCredit.date_sa" @blur="changeDeb"></vs-input>
                      <h6 class="h6" style="">№ дела Иск:<VarToClipboard name="dc_number_delo_il"/></h6>
                      <vs-input class="w-auto"  v-model="Deb.debtorCredit.number_delo_il" @change="changeDeb"></vs-input>
                      <h6 class="h6">Дата договора:<VarToClipboard name="dc_date_dog"/></h6>
                      <vs-input type="date" class="w-auto" v-model="Deb.debtorCredit.date_dog" @blur="changeDeb"></vs-input>
                      <h6 class="h6">Сумма долга:<VarToClipboard name="dc_dolg_sum"/></h6>
                      <vs-input type="number" readonly class="w-auto " v-model="Deb.debtorCredit.dolg_sum" @change="changeDebUpdate"></vs-input>
                    </div>

                  <div class="vx-col sm:w-3/4 w-full mb-2">
                    <vs-tabs alignment="fixed" color="primary">
                      <vs-tab label="Имущество должника">
                    <DebtorProperty></DebtorProperty>
                      </vs-tab>
                      </vs-tabs>

                    <vs-tabs alignment="fixed" color="primary">
                      <vs-tab label="Иные ИП по должнику">
                        <OtherIp></OtherIp>
                      </vs-tab>
                    </vs-tabs>

                  <div class="vx-row" style="padding-top: 20px;margin-bottom: 200px">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                      <h6 class="h6">Дата направления в ФССП:<VarToClipboard name="dc_date_fssp"/></h6>
                      <vs-input type="date" class="w-auto"  v-model="Deb.debtorCredit.date_fssp"  @blur="changeDeb"></vs-input>
                      <h6 class="h6">ШПИ ФССП:<VarToClipboard name="dc_shpi_fssp"/></h6>
                      <vs-input class="w-auto"  v-model="Deb.debtorCredit.shpi_fssp"  @change="changeDeb"> </vs-input>
                      <h6 class="h6">Статус отправления в ФССП:<VarToClipboard name="dc_shpi_fssp_status"/></h6>
                      <vs-input class="w-auto"  v-model="Deb.debtorCredit.shpi_fssp_status"  @change="changeDeb"> </vs-input>
                      <h6 class="h6">Дата получения ФССП:<VarToClipboard name="dc_date_shpi_fssp_receive"/></h6>
                      <vs-input type="date" class="w-auto"  v-model="Deb.debtorCredit.date_shpi_fssp_receive"  @blur="changeDeb"></vs-input>
                      <div style="display: flex">
                        <h6 class="h6">№ИП:</h6>
                        <div class="redh6" @click="showInfoFssp=!showInfoFssp">Инфо</div>
                        <div class="redh6">-</div>
                        <!--<span style="cursor: pointer;color: red;" @click="findFssp">  Поиск</span>-->
                        <div class="redh6" @click="getReqHistory">История</div>
                        <div class="redh6">-</div>
                        <div class="redh6" @click="searchBySiteFssp">Поиск по сайту ФССП</div>
                        <img v-if="FsspSearchBySiteLoadingFlag" class="load-bar" style="max-height: 15px;margin-left: 5px" src="/loading.gif">
                      </div>
                      <VarToClipboard name="dc_number_ip"/>
                      <vs-input  class="w-auto"  v-model="Deb.debtorCredit.number_ip"  @change="changeDeb"></vs-input>
                      <h6 class="h6">Дата возбуждения ИП: <span style="color: red;cursor: pointer" @click="showHist('date_rise_ip')">История</span> <VarToClipboard name="dc_date_rise_ip"/></h6>
                      <vs-input type="date" class="w-auto"  v-model="Deb.debtorCredit.date_rise_ip"  @blur="changeDeb"></vs-input>

                      <h6 class="h6">Дата приостановления ИП:<span style="color: red;cursor: pointer" @click="showHist('date_suspension_ip')">История</span><VarToClipboard name="dc_date_suspension_ip"/></h6>
                      <vs-input type="date" class="w-auto" v-model="Deb.debtorCredit.date_suspension_ip" @blur="changeDeb"></vs-input>
                      <h6 class="h6">Дата возобновления ИП:<span style="color: red;cursor: pointer" @click="showHist('date_renewal_ip')">История</span><VarToClipboard name="dc_date_renewal_ip"/></h6>
                      <vs-input type="date" class="w-auto" v-model="Deb.debtorCredit.date_renewal_ip" @blur="changeDeb"></vs-input>

                      <h6 class="h6">Дата окончания ИП:<VarToClipboard name="dc_date_end_ip"/></h6>
                      <vs-input type="date" class="w-auto"  v-model="Deb.debtorCredit.date_end_ip"  @blur="changeDeb"></vs-input>
                      <h6 class="h6">Основание окончания ИП:<VarToClipboard name="dc_id_end_ip_reason"/></h6>
                      <v-select class="w-auto" :reduce="label => label.id" label="show_text" :options="EndIpReasons" v-model="Deb.debtorCredit.id_end_ip_reason" @input="changeDeb"></v-select>
                      <h6 class="h6" >Отдел ОСП:<span style="color: red;cursor: pointer" @click="showHist('fssp_otdel')">История</span><VarToClipboard name="d_fssp_otdel_code"/></h6>
                      <vs-input class="w-auto" readonly v-model="FsspOtdelName"></vs-input>
                      <h6 class="h6" >ФИО СПИ:<span style="color: red;cursor: pointer" @click="showHist('fio_spi')">История</span><VarToClipboard name="dc_fio_spi"/></h6>
                      <vs-input class="w-auto"  v-model="Deb.debtorCredit.fio_spi" @change="changeDeb"></vs-input>
                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                      <h6 class="h6" >Сумма долга по ИП:<span style="color: red;cursor: pointer" @click="showHist('sum_dolg_po_ip')">История</span><VarToClipboard name="dc_sum_dolg_po_ip"/></h6>
                      <vs-input class="w-auto"  v-model="Deb.debtorCredit.sum_dolg_po_ip" @change="changeDeb"></vs-input>
                      <h6 class="h6" >Сумма Исполнительного сбора:<span style="color: red;cursor: pointer" @click="showHist('sum_isp_sbor')">История</span><VarToClipboard name="dc_sum_isp_sbor"/></h6>
                      <vs-input class="w-auto"  v-model="Deb.debtorCredit.sum_isp_sbor" @change="changeDeb"></vs-input>
                      <h6 class="h6" >Остаток долга по ИП:<span style="color: red;cursor: pointer" @click="showHist('ost_dolg_po_ip')">История</span><VarToClipboard name="dc_ost_dolg_po_ip"/></h6>
                      <vs-input class="w-auto"  v-model="Deb.debtorCredit.ost_dolg_po_ip" @change="changeDeb"></vs-input>
<!--                      <vs-input class="w-auto"  v-model="Deb.debtorCredit.osn_end_ip" @change="changeDeb"></vs-input>-->
<!--                      <vs-textarea class="w-auto" height="146px" v-model="Deb.debtorCredit.osn_end_ip" @change="changeDeb"> </vs-textarea>-->
                      <h6 class="h6">Сумма долга в Суд:<VarToClipboard name="dc_dolg_sum_sud"/></h6>
                      <vs-input disabled type="number" class="w-auto" v-model="Deb.debtorCredit.dolg_sum_sud"></vs-input>
                      <h6 class="h6">Сумма долга Суд + ГП:<VarToClipboard name="dc_dolg_sum_sud_and_gp"/></h6>
                      <vs-input disabled type="number" class="w-auto" v-model="Deb.debtorCredit.dolg_sum_sud_and_gp"></vs-input>
                      <h6 class="h6">Сумма долга удовлетворено:<VarToClipboard name="dc_dolg_sum_res"/></h6>
                      <vs-input disabled type="number" class="w-auto" v-model="Deb.debtorCredit.dolg_sum_res"></vs-input>
                      <h6 class="h6">Сумма долга удовлетворено + ГП:<VarToClipboard name="dc_dolg_sum_res_and_gp"/></h6>
                      <vs-input disabled type="number" class="w-auto" v-model="Deb.debtorCredit.dolg_sum_res_and_gp"></vs-input>
                      <h6 class="h6">Остаток долга ост:<VarToClipboard name="dc_ocs_sum_ocs"/></h6>
                      <vs-input disabled type="number" readonly class="w-auto" v-model="Deb.debtorCredit.ocs_sum_ocs"></vs-input>
                      <div class="centerx">
                        <vs-tooltip text="Остаток долга + государственная пошлина" position="top" >
                          <h6 class="h6 mb-1">Остаток долга + ГП:<VarToClipboard name="dc_ocs_sum"/></h6>
                        </vs-tooltip>
                      </div>
                      <vs-input disabled type="number" readonly class="w-auto" v-model="Deb.debtorCredit.ocs_sum"></vs-input>
                      <h6 class="h6">Дата Административного иска:<VarToClipboard name="dcs_date_adm_isk"/></h6>
                      <vs-input  type="date" class="w-auto" v-model="Deb.debtorCreditSud.date_adm_isk"></vs-input>
                      <h6 class="h6">ШПИ Административного иска:<VarToClipboard name="dcs_shpi_adm_isk"/></h6>
                      <vs-input  type="text"  class="w-auto" v-model="Deb.debtorCreditSud.shpi_adm_isk"></vs-input>
                    </div>
                  </div>
                </div>
                </div>



    <vs-popup class="holamundo" title="История:" :active.sync="showHistVal">
      <template v-if="histData">
        <json-viewer
            :value="histData"
            :expand-depth=5
            copyable

            sort></json-viewer>
      </template>
    </vs-popup>

        <vs-popup class="holamundo" title="Данные запроса ФССП:" :active.sync="showInfoHodFssp">
            <template v-if="history_data_hod">
                <json-viewer
                        :value="history_data_hod"
                        :expand-depth=5
                        copyable

                        sort></json-viewer>
            </template>


        </vs-popup>

        <vs-popup class="holamundo" title="Данные ФССП:" :active.sync="showInfoFssp">
            <template v-if="Deb.debtorCredit.data_fssp">
                <json-viewer
                        :value="Deb.debtorCredit.data_fssp"
                        :expand-depth=5
                        copyable

                        sort></json-viewer>
            </template>


        </vs-popup>


        <vs-popup class="holamundo" title="Данные ответа ФССП:" :active.sync="showInfoFsspAns">
            <template v-if="Deb.debtorCredit.answer_rec_fssp">
                <json-viewer
                        :value="Deb.dataAnswer"
                        :expand-depth=5
                        copyable

                        sort></json-viewer>
            </template>


        </vs-popup>

        <template v-if="showSved">
            <vs-popup class="holamundo" title="Cведения из ответов ФССП РФ:" :active.sync="showSved">
                <FsspAnswerInfo :id_debcredit="Deb.debtorCredit.id"></FsspAnswerInfo>
            </vs-popup>
        </template>

        <vs-popup title="История запросов о наличии ИП" :active.sync="showHistoryFssp">
            <FsspHistory :hist_data="history_data"></FsspHistory>
        </vs-popup>
        <vs-popup title="История запросов о Жалобы на ФССП" :active.sync="showFsspVedHistory">
            <FsspHistory :hist_data="history_data_ved"></FsspHistory>
        </vs-popup>

      <vs-popup class="holamundo" title="История отправок:" :active.sync="showFsspJournal">
          <json-viewer
              :value="journal_data"
              :expand-depth=5
              copyable

              sort></json-viewer>
      </vs-popup>

      <vs-popup class="holamundo" title="Результат:" :active.sync="showFsspResult">
        <json-viewer
            :value="result_send_data"
            :expand-depth=5
            copyable

            sort></json-viewer>
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
    import DebtorProperty from "./Post/DebtorProperty.vue";
    import OtherIp from "./Post/OtherIp.vue";
    import r from '../../../route';

    import axios from '../../../axios'
    import FsspAnswerInfo from "../../Fssp/FsspAnswerInfo.vue";
    import FsspHistory from "../../Fssp/FsspHistory.vue";
    import { RefreshCwIcon } from 'vue-feather-icons'
    import VarToClipboard from './../../VarToClipboard.vue'
    Vue.use(AsyncComputed)
    export default {
        components: {
            FsspAnswerInfo, VueSuggestions,Status,  'v-select': vSelect,JsonViewer, RefreshCwIcon,FsspHistory,
          DebtorProperty,OtherIp,VarToClipboard
        },
        data () {
            return {
              showHistVal:false,
                showInfoHodFssp:false,
                histData: {},
                history_data: {},
                history_data_hod: {},
                history_data_ved:{},
                journal_data:{},
                result_send_data:{},
                showHistoryFssp:false,
                showFsspVedHistory:false,
                showInfoFsspAns:false,
                showInfoFssp:false,
                showSved:false,
                showFsspJournal: false,
                showFsspResult: false,
                years:['2022','2021','2020','2019','2018'],
                type_oper_now: '',
              showOtherIpAll:false,
              fssp_otdel_name:'',
            }
        },
        mounted(){
            this.getBanksNameAndId();
            this.getFsspProperty(this.Deb.debtorCredit.id);
            this.getFsspOtherIp(this.Deb.debtorCredit.id);
            // this.getFsspDataCredit(this.Deb.debtorCredit.id);
            this.getFsspOtdelName(this.Deb.debtorCredit.id);
            this.getEndIpReasons();
            // .then((response) => {
            //       if (response.result) {
            //         this.fssp_otdel_name = response.data;
            //       }
            // });
        },
        asyncComputed: {

        },
        computed: {

            ...mapGetters([
                'StatussDebtorArr','Deb','BanksArr','User','FsspDataCredit','TypeCP','FsspOtdelName','EndIpReasons',
                'FsspSearchBySiteLoadingFlag'
            ]),


        },
        methods: {
          searchBySiteFssp(){
            this.$vs.dialog({
              type: 'confirm',
              color: 'primary',
              title: 'Поиск по сайту ФССП',
              text: 'Вы действительно хотите запустить поиск по сайту ФССП?',
              accept: ()=>{
                this.searchIpBySiteFsspOne(this.Deb.debtorCredit.id).then((response) => {
                  if (response.result){
                    if (response.no_found){
                      this.$vs.notify({
                        title: 'Успешно',
                        text: 'Сообщение: По вашему запросу ничего не найдено',
                        color: 'primary',
                        position: 'top-center'
                      });
                    } else {
                      this.$vs.notify({
                        title: 'Успешно',
                        text: 'Проверка проведена',
                        color: 'success',
                        position: 'top-center'
                      });
                    }
                    this.getDataDebtorsById(this.$route.params.id);
                    this.getFsspDataCredit(this.Deb.debtorCredit.id);
                  } else {
                    this.$vs.notify({
                      title: 'Ошибка',
                      text: response.error,
                      color: 'danger',
                      position: 'top-center'
                    })
                  }
                })
              },
              acceptText: 'Запуск',
              cancelText: 'Отмена'
            })
          },

          showHist(type){
            this.getHistoryVals({id_credit: this.Deb.debtorCredit.id,type: type}).then((response) => {
              if (response.result) {
                this.histData = response.data;
                this.showHistVal = true;
              }
            });
          },


          toQueueConfirm(type_oper){
            this.type_oper_now = '';
            this.type_oper_now = type_oper;
            this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: 'Внимание',
              text: 'Вы действительно хотите поставить данное заявление в очередь?',
              accept: this.toQueue,
              acceptText: 'Да',
              cancelText: 'Нет'
            })
          },

          toQueue(){
            this.toQueueFssp({id_credit: this.Deb.debtorCredit.id,type_oper: this.type_oper_now}).then((response) => {
              if (response.result){
                this.$vs.notify({
                  title: 'Успешно',
                  text: 'Поставлено в очередь',
                  color: 'success',
                  position: 'top-center'
                });
                this.getDataDebtorsById(this.$route.params.id);
                this.getFsspDataCredit(this.Deb.debtorCredit.id);
              } else {
                this.$vs.notify({
                  title: 'Ошибка',
                  text: response.message,
                  color: 'danger',
                  position: 'top-center'
                })
              }
            })
          },
          getJournalFsspA(type_oper){
            this.getJournalFssp({credit_id: this.Deb.debtorCredit.id, type_oper: type_oper}).then((response) => {
              if (response.result){
                this.journal_data = response.data;
                this.showFsspJournal = true;
              }
            });
          },
          getResultFsspA(type_oper){
            this.getSendResultFssp({credit_id: this.Deb.debtorCredit.id, type_oper: type_oper}).then((response) => {
              if (response.result){
                this.result_send_data = response.data;
                this.showFsspResult = true;
              }
            });
          },
            getFsspVedHistoryLocal(){
                this.getFsspVedHistory(this.Deb.debtorCredit.id).then((response) => {
                    if (response.result){
                        this.history_data_ved = response.data;
                        this.showFsspVedHistory = true;
                    }
                });
            },
            getReqHistoryHodFssp(){
                this.getFsspReqHistoryHod(this.Deb.debtorCredit.id).then((response) => {
                    if (response.result){
                        this.history_data_hod = response.data;
                        this.showInfoHodFssp = true;
                    }
                });
            },
            getReqHistory(){
                this.getFsspReqHistory(this.Deb.debtorCredit.id).then((response) => {
                    if (response.result){
                        this.history_data = response.data;
                        this.showHistoryFssp = true;
                    }
                });
            },
            claimStatusRefresh(){
                this.getDataDebtorsById(this.Deb.debtorCredit.id);
            },
            findFsspAns(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("fssp.index"), {
                    params: {
                        method: 'findFsspAns',
                        param: this.Deb.debtorCredit.id

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    //   this.getDataDebtorsById(this.Deb.debtorCredit.id);
                    if (response.data.result) {
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Найдено!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
                    else {
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Ответа нет !!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    }

                }).catch(error => {
                    this.getDataDebtorsById(this.Deb.debtorCredit.id);
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })


                });
            },

            findFssp(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("fssp.index"), {
                    params: {
                        method: 'findFssp',
                        param: this.Deb.debtorCredit.id

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                 //   this.getDataDebtorsById(this.Deb.debtorCredit.id);
                    if (response.data.result.mess.response.status) {
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Найдено!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
                    else {
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Ошибка !!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    }

                }).catch(error => {
                    this.getDataDebtorsById(this.Deb.debtorCredit.id);
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })


                });
            },
            infoFssp(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("fssp.index"), {
                    params: {
                        method: 'infoFssp',
                        param: this.Deb.debtorCredit.id

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    this.getDataDebtorsById(this.Deb.debtorCredit.id);
                    if (response.data.data.result) {
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Запрос отправлен!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
                    else {
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Ошибка !!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    }

                }).catch(error => {
                    this.getDataDebtorsById(this.Deb.debtorCredit.id);
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })


                });
            },
          openHodBanksFssp(){
            window.open( this.Deb.debtorCredit.url_send_banks_fssp, '_blank');
          },
            openFssp(){
                window.open( this.Deb.debtorCredit.url_rec_fssp, '_blank');
            },
            openReqIpExistFssp(){
                window.open( this.Deb.debtorCredit.url_hod_fssp, '_blank');
            },
            openClaimFssp(){
                window.open( this.Deb.debtorCredit.url_claim_fssp, '_blank');
            },
            openReqReturnFssp(){
                window.open( this.Deb.debtorCredit.url_zay_return_fssp, '_blank');
            },
            openClaimReturnFssp(){
                window.open( this.FsspDataCredit.url_noid_claim, '_blank');
            },
            openNoIpClaimFssp(){
                window.open( this.FsspDataCredit.url_noip_claim, '_blank');
            },
          openOtkazIpClaimFssp(){
            window.open( this.FsspDataCredit.url_otkazip_claim, '_blank');
          },
            close(){
                this.$router.back()
            },
            // getAnswerJson(){
            //     Deb.debtorCredit.answer_rec_fssp
            // },
            createClaim(){
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Внимание',
                    text: 'Вы действительно хотите подать жалобу?',
                    accept: this.claimSuccess,
                    acceptText: 'Да',
                    cancelText: 'Нет'
                })
            },
          openReqIpExistFssp1111(){

          },
            claimSuccess(){
                this.$vs.loading({color: '#ff8000'})
                this.createClaimOnFssp(this.Deb.debtorCredit.id).then((response) => {
                    this.$vs.loading.close()
                    if (response.result){
                        this.$vs.notify({
                            title: 'Сообщение',
                            text: response.message,
                            color: 'success',
                            position: 'top-center'
                        })
                        this.getDataDebtorsById(this.Deb.debtorCredit.id);
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
            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getBanksNameAndId','changeDeb','getDataDebtorsById',
                'createClaimOnFssp','getFsspReqHistory','getFsspReqHistoryHod','getFsspVedHistory','getJournalFssp',
                'getSendResultFssp','getFsspDataCredit','toQueueFssp','changeDebUpdate','getFsspOtdelName','getHistoryVals',
              'getFsspProperty','getFsspOtherIp','getEndIpReasons','searchIpBySiteFsspOne'
            ]),


        },
    }
</script>

<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
    .redh6{
      color: red;
      font-size: 12px;
      cursor: pointer;
      margin-left: 5px;
      margin-top: -2px;
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
