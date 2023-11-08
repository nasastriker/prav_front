    <template>
      <div>
        <CheckCreditBanner></CheckCreditBanner>
    <vx-card no-shadow>
        <div >
            <div v-if="back" style="display: flex">
                <Back></Back>
            </div>
            <div class="vx-row">
                <div class="vx-col  w-5/6 ">

                    <div class="debtor-title-wrapper">
                        <div class="con-vs-tabs vs-tabs vs-tabs-primary vs-tabs-position-top">

                            <div class="con-ul-tabs" style="max-height: 35px;">

                                <ul class="ul-tabs vs-tabs--ul ul-tabs-left">
                                    <span class="debtor-title-main">Вид взыскания: </span>
                                    <template v-if="typeof Deb.debtorCredit.name_delo!='undefined' && Deb.debtorCredit.name_delo!=null">
                                        <span class="vid" style="text-decoration: underline;">{{VidRecover(Deb.debtorCredit.name_delo)}}&nbsp;</span>
                                    </template>
                                    <template v-else>
                                        <span class="vid" style="text-decoration: underline;">id_credit {{Deb.debtorCredit.id }}&nbsp;</span>
                                    </template>

                                    <template  v-for="item in DebAll">
                                        <template v-if="typeof item.name_delo!='undefined' && item.name_delo!=null">
                                            <span class="vid"  @click="goCredit(item.id)"> {{VidRecover(item.name_delo)}}&nbsp;</span>
                                        </template>
                                        <template v-else>
                                            <span class="vid"  @click="goCredit(item.id)">id_credit {{item.id}}&nbsp;</span>
                                        </template>
                                    </template>

                                </ul>

                            </div>

                        </div>

                        <div class="con-vs-tabs vs-tabs vs-tabs-primary vs-tabs-position-top">

                            <div class="con-ul-tabs" style="max-height: 35px;">

                                <ul class="ul-tabs vs-tabs--ul ul-tabs-left">
                                    <span class="debtor-title-main">Номер договора: </span>
                                    <span class="vid" style="text-decoration: underline;">{{Deb.debtorCredit.number_dog}}&nbsp;</span>

                                    <template  v-for="item in DebAllDebtor">
                                        <span class="vid"   @click="goCredit(item.id)"> {{item.number_dog}}&nbsp;</span>
                                    </template>


                                </ul>

                            </div>

                        </div>
                        <div class="con-vs-tabs vs-tabs vs-tabs-primary vs-tabs-position-top">

                            <div class="con-ul-tabs" style="max-height: 35px;">

                                <ul class="ul-tabs vs-tabs--ul ul-tabs-left">
                                    <span class="debtor-title-main">Тип должника: </span>
                                    <span class="vid" style="text-decoration: underline;">{{TypeDebtor(Deb.debtorCredit.type_debtor)}}&nbsp;</span>

                                    <template  v-for="item in DebAllType"


                                    >
                                        <span class="vid" @click="goCredit(item.id)"> {{TypeDebtor(item.type_debtor)}}&nbsp;</span>

                                    </template>


                                </ul>

                            </div>

                        </div>
                        
                    </div>
                </div>

                <div class="vx-col  w-1/6 ">
                    <vs-dropdown>
                        <settings-icon size="1.5x" class="custom-class"
                                       style="cursor: pointer;margin-right: 10px;color: #3f51b5"></settings-icon>
                        <vs-dropdown-menu>
                            <vs-dropdown-item>
                                <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="dossierRefresh">Обновить</vs-button>
                            </vs-dropdown-item>
                            <vs-dropdown-item>
                                <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="showCalc=!showCalc">Расчеты</vs-button>
                            </vs-dropdown-item>
                            <vs-dropdown-item>
                                <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="showFunc=!showFunc">Функции</vs-button>
                            </vs-dropdown-item>

                            <vs-dropdown-item v-if="User.separation_dossiers==1">
                                <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="separationDossiers">Разделить досье</vs-button>
                            </vs-dropdown-item>
                            <vs-dropdown-item v-if="User.delete_dos" >
                                <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="delDoss">Удалить досье</vs-button>
                            </vs-dropdown-item>
                            <vs-dropdown-item v-if="User.add_dop_var">
                                <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="addVarPopup=!addVarPopup">Добавить переменные</vs-button>
                            </vs-dropdown-item>

                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>

            </div>
            <DopVar name="calc" :addVarPopup="addVarPopup"  @changeAddVarPopup="changeAddVarPopup"></DopVar>
            <vs-popup class="holamundo" title="Расчеты применяемые" :active.sync="showCalc">
                <h6 class="h6" style="margin-top: 5px">Применять все расчеты:<VarToClipboard name="dc_calculation"/></h6>
                <vs-checkbox v-model="Deb.debtorCredit.calculation"  @input="changeDebUpdate">Активно</vs-checkbox>

                <h6 class="h6" style="margin-top: 5px">Применять расчеты на всех стадиях:<VarToClipboard name="dc_calculation_stad"/></h6>
                <vs-checkbox v-model="Deb.debtorCredit.calculation_stad"  @input="changeDebUpdate">Активно</vs-checkbox>

                <h6 class="h6" style="margin-top: 5px">Расчет долга «Ограничение 30%»:<VarToClipboard name="dc_calc_org_30"/></h6>
                <vs-checkbox v-model="Deb.debtorCredit.calc_org_30"  @input="changeDebUpdate">Активно</vs-checkbox>
                <h6 class="h6" style="margin-top: 5px">Расчет долга по Ограничениям процентов:<VarToClipboard name="dc_calc_organ"/></h6>
                <vs-checkbox v-model="Deb.debtorCredit.calc_organ"  @input="changeDebUpdate">Активно</vs-checkbox>
                <h6 class="h6" style="margin-top: 5px">Расчет свыше года:<VarToClipboard name="dc_calc_big_year"/></h6>
                <vs-checkbox v-model="Deb.debtorCredit.calc_big_year"  @input="changeDebUpdate">Активно</vs-checkbox>
                <h6 class="h6" style="margin-top: 5px">Расчеты остановлены после подачи в суд:<VarToClipboard name="dc_stop_calc_sud"/></h6>
                <vs-checkbox v-model="Deb.debtorCredit.stop_calc_sud"  @input="changeDebUpdate">Активно</vs-checkbox>
                <h6 class="h6" style="margin-top: 5px">ID Списка расчетов:<VarToClipboard name="dc_id_calculation"/></h6>
                <div class="vx-row">
                    <v-select  class="w-50 " style="margin-left: 10px;width:60%;margin-right: 10px" :reduce="label => label.id" label="name" :options="CalculationList"   v-model="Deb.debtorCredit.id_calculation" @input="changeDebUpdate" ></v-select>
                  <!--  <vs-button @click="ReCalculate">Пересчитать</vs-button> -->
                </div>
            <!--    <template v-for="(item,index) in calc">
                    <div style="margin-left: 10px;margin-right: 10px;color: red"  class="hover:text-primary cursor-pointer">
                        <vs-checkbox v-model="item.active" @input="changeCalc(item)">Активно</vs-checkbox> {{item.text}}
                    </div>
                    <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">

                </template>
                <vs-button style="margin-top: 15px" color="danger" class="pull-right" type="filled"  @click="changeDebUpdate">Расчитать</vs-button> -->
            </vs-popup>

            <vs-popup class="holamundo" title="Функции" :active.sync="showFunc">



                <h6 class="h6" style="margin-top: 5px">Довзыскание:<VarToClipboard name="dc_add_debt"/></h6>
                <vs-checkbox v-model="Deb.debtorCredit.add_debt"  @input="changeDebUpdate">Активно</vs-checkbox>
                <h6 class="h6" style="margin-top: 5px">Довзыскание % сбора для начала:<VarToClipboard name="dc_add_debt_start"/></h6>
                <vs-input type="number" class="w-100" v-model="Deb.debtorCredit.add_debt_start" @change="changeDebUpdate"></vs-input>
                <h6 class="h6" style="margin-top: 5px">Индексация:<VarToClipboard name="dc_indexing_credit"/></h6>
                <vs-checkbox v-model="Deb.debtorCredit.indexing_credit"  @input="changeDebUpdate">Активно</vs-checkbox>
                <h6 class="h6" style="margin-top: 5px">Взыскание залога:<VarToClipboard name="dc_pledge"/></h6>
                <vs-checkbox v-model="Deb.debtorCredit.pledge"  @input="changeDebUpdate">Активно</vs-checkbox>
                <h6 class="h6" style="margin-top: 5px">Судебные расходы:<VarToClipboard name="dc_court_costs"/></h6>
                <vs-checkbox v-model="Deb.debtorCredit.court_costs"  @input="changeDebUpdate">Активно</vs-checkbox>


            </vs-popup>
            <vs-popup class="holamundo" title="Разделение досье" :active.sync="showSep">

                <h6 class="h6">Основной долг:</h6>
                <vs-input type="number" class="w-100" v-model="credit.dolg_osn"></vs-input>
                <h6 class="h6">Пени долг:</h6>
                <vs-input type="number" class="w-100" v-model="credit.peny" ></vs-input>
                <h6 class="h6">% по займу:</h6>
                <vs-input type="number" class="w-100" v-model="credit.procent_dolg" ></vs-input>
                <h6 class="h6">Вид взыскания:</h6>
                <v-select  style="width: 200px" :reduce="label=>label.id" label="name" :options="VidRecoverInDebtorCreditArr"  v-model="credit.name_delo" ></v-select>
                <h6 class="h6" style="margin-top: 15px">Тип должника:</h6>
                <v-select  style="width: 200px" :reduce="label=>label.id" label="name" :options="TypeDebtorInDebtorCreditArr"  v-model="credit.type_debtor"  ></v-select>
                <template v-if="credit.type_debtor!=0">
                  <h6 class="h6">Фамилия:</h6>
                  <vs-input class="w-50 "  v-model="credit.name_family" ></vs-input>
                  <h6 class="h6">Имя:</h6>
                  <vs-input class="w-50 " v-model="credit.name"></vs-input>
                  <h6 class="h6">Отчество:</h6>
                  <vs-input class="w-50 "  v-model="credit.name_patronymic" ></vs-input>
                  <h6 class="h6">Дата рождения:</h6>
                  <vs-input type="date" class="w-50 "  v-model="credit.birthdate"></vs-input>
                </template>

                <div style="text-align: center">
                    <vs-button style="margin-top: 15px" color="success" class="pull-right" type="filled"  @click="sepDoss">Разделить</vs-button>
                </div>


            </vs-popup>
            <vs-tabs :value="mutableList" >

                <template v-if="$route.hash=='#sudOrder'">
                    <vs-tab label="Судебные расходы">
                        <SudOrder></SudOrder>
                    </vs-tab>
                </template>
                <template v-else>
<!--                    <vs-tab label="Общая работа">-->
<!--                        <Rabota :grantedChangeRecover="access_change_recover"></Rabota>-->
<!--                    </vs-tab>-->
                  <vs-tab label="Общая работа">
                    <RabotaNew :grantedChangeRecover="access_change_recover"></RabotaNew>
                  </vs-tab>
                </template>

                <vs-tab label="Расчет долга">
                    <DolgNew></DolgNew>
                </vs-tab>

                <vs-tab label="Предмет залога">
                    <Zalog></Zalog>
                </vs-tab>
                <vs-tab label="Контакты с Должником">
                    <DosudMain :id_debtor="idDep"></DosudMain>
                </vs-tab>
              <vs-tab label="Работа в суде">
                <Sud></Sud>
              </vs-tab>

              <vs-tab label="Работа с банками">
                <BankNew></BankNew>
              </vs-tab>
              <vs-tab label="Работа ПФР">
                <Pfr ></Pfr>
              </vs-tab>
                <vs-tab label="Работа ФССП">
                    <FsspAll></FsspAll>
                </vs-tab>
              <vs-tab label="Платежи">
                <Payments :id_dogovor="Deb.debtorCredit.id" v-if="typeof Deb.debtorCredit!='undefined'" ></Payments>
              </vs-tab>

                <vs-tab label="Запросы по заемщику">
                    <Otkaz></Otkaz>
                </vs-tab>

                <vs-tab label="Банкротство">
                    <Bankrot></Bankrot>
                </vs-tab>
                <vs-tab label="Данные заёмщика">
                    <Debtor></Debtor>
                </vs-tab>

                <template v-if="$route.hash!='#sudOrder'">
                    <vs-tab label="Судебные расходы">
                        <SudOrder></SudOrder>
                    </vs-tab>
                </template>
                <template v-else>
                    <vs-tab label="Общая работа">
                        <Rabota></Rabota>
                    </vs-tab>
                </template>
                <vs-tab label="История изменений">
                    <History :id="Deb.debtorCredit.id"></History>
                </vs-tab>

                <vs-tab label="Документы по заемщику">
                    <DocumentsDebtor></DocumentsDebtor>
                </vs-tab>

                <vs-tab  label="Комментарии">
                    <DebtorCreditComments :id_credit="this.Deb.debtorCredit.id"></DebtorCreditComments>
                </vs-tab>

                <vs-tab  label="БКИ">
                    <BKIDebtor></BKIDebtor>
                </vs-tab>


               </vs-tabs>
           </div>



               </vx-card>
      </div>
           </template>

           <script>
               import Vue from 'vue'
               import AsyncComputed from 'vue-async-computed'
               import VueDadata from 'vue-dadata'
               import r from '../../route';
               import DebtorRecover from './DR.vue';
               import Jud from './Jud.vue';
               import Log from './Log.vue';
               import DopVar from './DebtorTab/DopVar.vue';
               import Sud from './DebtorTab/Sud.vue';
               import DolgNew from './DebtorTab/DolgNew.vue';
               import Debtor from './DebtorTab/Debtor.vue';
               import Dosud from './DebtorTab/Dosud.vue';
               import Bank from './DebtorTab/Bank.vue';
               import SudOrder from './DebtorTab/SudOrder.vue';
               import Bankrot from './DebtorTab/Bankrot.vue';
               import History from './DebtorTab/History.vue';
               import PaymentTabel from './DebtorTab/PaymentTabel.vue';
               import PaymentTabelMain from './DebtorTab/PaymentTabelMain.vue';
               import Soglachenie from './DebtorTab/Soglachenie.vue';
               import Soft from './DebtorTab/Soft.vue';
               import Spravka from './DebtorTab/Spravka.vue';
               import OtpTabel from './DebtorTab/OtpTabel.vue';
               import FsspAll from './DebtorTab/FsspAll.vue';
               import Opiska from './DebtorTab/Opiska.vue';
               import Otkaz from './DebtorTab/Otkaz.vue';
               import Dublicat from './DebtorTab/Dublicat.vue';
               import Gospohlina from "./DebtorTab/Gospohlina.vue";
               import { mapActions,mapGetters } from 'vuex'
               import axios from '../../axios'
               import VueSuggestions from 'vue-suggestions';
               import Back from '../../components/Back.vue'
               import DosudMain from "./DebtorTab/DosudMain.vue";
               import Payments from "./DebtorTab/Payments.vue";
               import { RefreshCwIcon } from 'vue-feather-icons'
               import DocumentsDebtor from './DebtorTab/DocumentsDebtor.vue'
               import RabotaNew from "./DebtorTab/RabotaNew.vue";
               import Pfr from "./DebtorTab/Pfr.vue";
               import BankNew from "./DebtorTab/BankNew.vue";
               import DebtorCreditComments from "./DebtorTab/DebtorCreditComments.vue"
               import DebtorCreditCommentsOpenLink from './DebtorTab/Render/DebtorCreditCommentsOpenLink.vue'
               import Zalog from './DebtorTab/Zalog/Zalog.vue'
               import VarToClipboard from './../VarToClipboard.vue'
               import BKIDebtor from './DebtorTab/BKIDebtor.vue'
               import CheckCreditBanner from "./DebtorTab/CheckCreditBanner/CheckCreditBanner.vue";
               Vue.use(AsyncComputed)
               import { SettingsIcon, UserXIcon, BookOpenIcon, SearchIcon, XIcon } from 'vue-feather-icons'
               export default {
                   components: { VueSuggestions,
                       'vue-dadata': VueDadata,
                        Back,
                       'DebtorRecover':DebtorRecover,
                       SettingsIcon,
                       Jud,
                       DopVar,
                       BKIDebtor,
                       Opiska,
                       Otkaz,
                       Sud,
                       OtpTabel,
                       Dublicat,
                       PaymentTabelMain,
                       Log,
                       PaymentTabel,
                       Soglachenie,
                       Soft,
                       SudOrder,
                       Spravka,
                       DolgNew,
                       Debtor,
                       Dosud,
                       Bank,
                       Bankrot,
                       History,
                       FsspAll,
                       Gospohlina,
                       RefreshCwIcon,
                       VarToClipboard,
                       Payments,
                       DosudMain,
                       DocumentsDebtor,
                       RabotaNew,
                       Pfr,
                       BankNew,
                       DebtorCreditComments,
                       DebtorCreditCommentsOpenLink,
                       Zalog,
                       CheckCreditBanner
                   },
                   props: {
                       idDep: {
                           default: '',
                           // type: Number
                       },
                       back:{
                           default: true,

                       },
                       tabIndex:{
                           default: 0,

                       },
                       from_fns_answers: null,
                   },
                   //props:['idDep','back'],
                   data () {

                       return {
                           showFunc:false,
                           CommentEdit:false,
                           addVarPopup:false,
                           credit:{
                               dolg_osn:0,
                               peny:0,
                               procent_dolg:0,
                               type_debtor:0,
                           },
                           calc:[],
                           showCalc:false,
                           showSep:false,
                           mutableList: JSON.parse(this.tabIndex),
                           access_change_recover: false
                       }
                   },
                   mounted(){
                       this.getCountryCode()
                       this.getDataDebtorCreditDopVar()
                       this.getCalculationList()
                       this.getUserAccessChangeRecover().then((response) => {
                           if (response.result) {
                               this.access_change_recover = response.granted;
                           }
                       });
                       this.getDataShablonDocumentsLk();
                       this.getDataStatuss()

                       if (this.from_fns_answers==null) {
                           if (this.$route.params.id) {
                               if (this.idDep) {

                                  this.getDataDebtorsById(this.idDep).then(() => {
                                    this.getRecoverDateCession(this.Deb.debtorCredit.id_recover);
                                  });
                              //    this.getDataDebtorsByIdAll(this.idDep);
                               } else {
                                //   this.getDataDebtorsByIdAll(this.$route.params.id);
                                   this.getDataDebtorsById(this.$route.params.id).then(() => {
                                     this.getRecoverDateCession(this.Deb.debtorCredit.id_recover);
                                       this.getBanksListSudOrder(this.Deb.sudOrder.id);
                                   })

                               }


                           }
                       }
                     this.getCalc();

                   },

                   asyncComputed: {

                   },
                   watch: {
                       $route() {
                           if (this.$route.params.id) {
                               if (this.idDep) {
                                   this.getDataDebtorsById(this.idDep).then(() => {
                                       this.getDataDebtorCreditDocuments(this.Deb.debtorCredit.id);

                                   })

                               } else {
                                   this.getDataDebtorsById(this.$route.params.id).then(() => {
                                       this.getDataDebtorCreditDocuments(this.Deb.debtorCredit.id);
                                       this.getBanksListSudOrder(this.Deb.sudOrder.id);
                                   })

                               }


                           }
                       },

                   },
                   computed: {

                       ...mapGetters([
                           'StatussDebtorArr','Deb','DebAll','VidRecoverInDebtorCreditArr','User','DebAllDebtor','TypeDebtorInDebtorCreditArr','DebAllType','CalculationList'

                       ]),


                   },
                   methods: {
                       changeAddVarPopup(item){
                           this.addVarPopup=item;
                       },
                       changeCalc(item){
                           axios.post(r("debtorCredit.index"), {
                               params: {
                                   method: 'saveCalculationCredit',
                                   param: item
                               }
                           }).then((response) => {

                               this.getCalc()
                               this.changeDebUpdate()
                               this.getDataDebtorsByIdAll(this.Deb.debtorCredit.id);



                           })
                       },
                       getCalc(){
                           axios.get(r("debtorCredit.index"), {
                               params: {
                                   method: 'getCalculation',
                                   param: this.Deb.debtorCredit.id
                               }
                           }).then((response) => {
                               if(response.data.result){
                                   this.calc=response.data.data;
                               }





                           })
                       },
                       ReCalculate(){
                           axios.get(r("debtorCredit.index"), {
                               params: {
                                   method: 'reCalculate',
                                   param: this.Deb.debtorCredit.id
                               }
                           }).then(res=>{
                               if (res.data.result){
                                   this.$vs.notify({
                                       title: 'Успешно',
                                       text: 'Пересчет произведен',
                                       color: 'success',
                                       position: 'top-center'
                                   })
                               }
                               else{
                                   this.$vs.notify({
                                                                   title: 'Ошибка',
                                                                   text: 'Ошибка !!!',
                                                                   color: 'danger',
                                                                   position: 'top-center'
                                                               })
                               }

                           }).catch(e=>{
                               this.$vs.notify({
                                                               title: 'Ошибка',
                                                               text: 'Ошибка !!!',
                                                               color: 'danger',
                                                               position: 'top-center'
                                                           })
                           })
                       },
                       sepDoss(){
                           this.credit.id=this.Deb.debtorCredit.id
                           this.showSep=false;
                           axios.post(r("debtorCredit.index"), {
                               params: {
                                   method: 'separationDossiers',
                                   param: this.credit
                               }
                           }).then((response) => {

                               if (response.data.result){
                                    this.changeDebUpdate();
                                   this.$vs.notify({  title:'Сообщение', text: 'Выполнено!!!', color: 'success', position: 'top-center' })

                               }else {
                                   this.$vs.notify({  title:'Сообщение', text: 'Выполнить не удалось !!!', color: 'danger', position: 'top-center' })
                               }





                           }).catch(error => {

                               this.$vs.notify({
                                   title: 'Ошибка',
                                   text: error.message,
                                   color: 'danger',
                                   position: 'top-center'
                               })
                           });
                       },
                       separationDossiers(){
                           this.showSep=true;
                       },
                       delDoss(){

                           this.$vs.dialog({
                               type: 'confirm',
                               color: 'danger',
                               title: 'Внимание',
                               text: 'Вы действительно хотите удалить досье? ',
                               accept: this.deleLocal,
                               cancel:this.cancel,
                               acceptText: 'Да',
                               cancelText: 'Нет',
                               parameters: ['hello']
                           })

                       },

                       deleLocal: function(parameters){
                           this.deleteDebtorCredit(this.Deb.debtorCredit.id).then((response) => {

                               if (response.result){

                                   this.$vs.notify({  title:'Сообщение', text: 'Удалено!!!', color: 'success', position: 'top-center' })
                                   this.$router.back();

                               }else {
                                   this.$vs.notify({  title:'Сообщение', text: 'Удалить не удалось !!!', color: 'danger', position: 'top-center' })
                               }


                           }).catch(error => {

                               this.$vs.notify({
                                   title: 'Ошибка',
                                   text: error.message,
                                   color: 'danger',
                                   position: 'top-center'
                               })
                           });

                       },
                       TypeDebtor(id){

                           for (let i = 0; i < this.TypeDebtorInDebtorCreditArr.length; i++) {
                               if(this.TypeDebtorInDebtorCreditArr[i].id==id){
                                   return this.TypeDebtorInDebtorCreditArr[i].name
                               }
                           }

                           return ''
                       },
                       VidRecover(id){

                           for (let i = 0; i < this.VidRecoverInDebtorCreditArr.length; i++) {
                               if(this.VidRecoverInDebtorCreditArr[i].id==id){
                                   return this.VidRecoverInDebtorCreditArr[i].name
                               }
                           }

                           return ''
                       },
                       goCredit(id){

                           let str='/debtors/'+id
                           this.$router.push(str);
                       },
                       dossierRefresh(){

                           if (this.Deb.debtorCredit.id) {

                               this.getDataDebtorsByIdCalc(this.Deb.debtorCredit.id).then(() => {
                                   this.getBanksListSudOrder(this.Deb.sudOrder.id);
                               })

                           } else {
                               this.getDataDebtorsByIdCalc(this.$route.params.id).then(() => {
                                   this.getBanksListSudOrder(this.Deb.sudOrder.id);
                               })


                           }


                       },

                       close(){

                           this.$router.back()
                       },
                       ...mapActions([
                           'saveDebtor','getDataStatuss','getDataDebtorCreditDocuments','getDataDebtorCreditDopVar','getDataDebtorsById','getDataShablonDocumentsLk', 'getBanksListSudOrder','deleteDebtorCredit',
                           'getUserAccessChangeRecover','getDataLogs','getDataDebtorsByIdAll','getDataRecoverers','getVidRecoverInDebtorCreditArr',
                           'getRecoverDateCession','changeDebUpdate','getDataDebtorsByIdCalc','getCalculationList','getCountryCode'
                       ]),


                   },
               }
           </script>

           <style lang="scss">
                .debtor-title-wrapper {
                    padding: 10px 20px;
                }
                .debtor-title-main{
                    margin-right: 10px;
                }
               .vid{
                   cursor: pointer;
                   color: #0828c5;
               }
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
               .vs-popup--content{
                   min-height: 500px!important;
               }
               .dropdown-button-container {
                   display: flex;
                   align-items: center;

               .btnx {
                   border-radius: 5px 0px 0px 5px;
               }

               .btn-drop {
                   border-radius: 0px 5px 5px 0px;
                   border-left: 1px solid rgba(255, 255, 255, .2);
               }
               }
           </style>
