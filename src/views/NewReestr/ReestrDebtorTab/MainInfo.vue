<template>
    <div class="debtorContacts">
        <fieldset class="f mt-4">
            <legend class="l px-4">Иванов Иван Иванович, 11.05.1966 <span class="ml-2 font-semibold cursor-pointer" @click="" style="color: rgb(239, 68, 68);">Copy</span></legend>
            <div class="vx-row">
                <div class="vx-col sm:w-6/12">

                    <div class="mt-2">
                        <template>
                            <Status :id_credit="Deb.debtorCredit.id" class="h6"></Status>
                        </template>
                    </div>

                    <div class="centerx">
                        <vs-tooltip text="Стратегия взаимодействия" position="top">
                            <h6 class="h6 mb-1">Стратегия взаимодействия:</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2" disabled></vs-input>

                    <div class="centerx">
                        <vs-tooltip text="Cправочник этапов стратегии – очередность видов взаимодействия и скриптов взаимодействия – проставляется в соответствии с применяемой стратегией: например Первичный звонок – значит идет обзвон по реестру без оператора" position="top">
                            <h6 class="h6 mb-1">Этап стратегии:</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2" disabled></vs-input>

                    <div class="mt-6 flex">
                        <div class="centerx">
                            <vs-tooltip text="Показывает следующий этап взаимодействия в соответствии с планом стратегии" position="top">
                                <h6 class="h6 mr-2 mt-1">Следующий этап стратегии:</h6>
                            </vs-tooltip>
                        </div>
                        <div class="flex">
                            <vs-checkbox class="mb-1" @input="">Дата</vs-checkbox>
                            <vs-checkbox class="mb-1" @input="">Вид</vs-checkbox>
                            <vs-checkbox class="mb-1" @input="">Шаблон</vs-checkbox>
                        </div>
                    </div>  

                    <div class="centerx" style="margin-top: 25px !important;">
                        <vs-tooltip text="Фамилия должника (обязательный параметр) " position="top">
                            <h6 class="h6 mb-1" @dblclick="copy">Фамилия:<VarToClipboard name="d_name_family"></VarToClipboard>
                            </h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2" v-model="Deb.debtor.name_family" @change="changeDeb"></vs-input>

                    <div class="centerx">
                        <vs-tooltip text="Имя должника" position="top">
                            <h6 class="h6 mb-1" @dblclick="copy">Имя:
                                <VarToClipboard name="d_name" />
                            </h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2" v-model="Deb.debtor.name" @change="changeDeb"></vs-input>
                    <div class="centerx">
                        <vs-tooltip text="Отчество должника" position="top">
                            <h6 class="h6 mb-1" @dblclick="copy">Отчество:
                                <VarToClipboard name="d_name_patronymic" />
                            </h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2" v-model="Deb.debtor.name_patronymic" @change="changeDeb"></vs-input>
                    <div class="centerx">
                        <vs-tooltip text="Дата рождения должника" position="top">
                            <h6 class="h6 mb-1" @dblclick="copy">Дата рождения:
                                <VarToClipboard name="d_birthdate" />
                            </h6>
                        </vs-tooltip>
                    </div>
                    <vs-input type="date" class="w-100 mb-2" v-model="Deb.debtor.birthdate" @blur="changeDeb"></vs-input>

                    <div class="centerx">
                        <vs-tooltip text="Страна рождения" position="top">
                            <h6 class="h6 mb-1">Страна рождения:</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2" ></vs-input>

                    <div class="centerx">
                        <vs-tooltip text="Место рождения" position="top">
                            <h6 class="h6 mb-1">Место рождения:</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2" ></vs-input>

                </div>

                <div class="vx-col sm:w-6/12">
                    <div class="centerx mt-3">
                        <vs-tooltip text="Адрес регистрации" position="top">
                            <h6 class="h6 mb-1">Адрес регистрации:</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2"> </vs-input>

                    <div class="centerx">
                        <vs-tooltip text="Фактический адрес" position="top">
                            <h6 class="h6 mb-1">Фактический адрес:</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2"> </vs-input>

                    <div class="centerx">
                        <vs-tooltip text="Номер паспорта" position="top">
                            <h6 class="h6 mb-1">Номер паспорта:</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2"> </vs-input>

                    <div class="centerx">
                        <vs-tooltip text="Серия паспорта" position="top">
                            <h6 class="h6 mb-1">Серия паспорта:</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2"> </vs-input>

                    <div class="centerx">
                        <vs-tooltip text="ИНН" position="top">
                            <h6 class="h6 mb-1">ИНН:</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2" ></vs-input>

                    <div class="centerx">
                        <vs-tooltip text="СНИЛС" position="top">
                            <h6 class="h6 mb-1">СНИЛС:</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2" ></vs-input>

                    <div class="centerx">
                        <vs-tooltip text="Email" position="top">
                            <h6 class="h6 mb-1">Email:</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2" ></vs-input>

                    <div class="centerx">
                        <vs-tooltip text="Место работы" position="top">
                            <h6 class="h6 mb-1">Место работы:</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2"> </vs-input>

                    <div class="centerx">
                        <vs-tooltip text="Определяется автоматически" position="top">
                            <h6 class="h6 mb-1" style="margin-top: 10px">Статус гражданина:</h6>
                        </vs-tooltip>
                    </div>
                    <div class="mt-2">
                        <vs-radio v-model="Deb.debtor.pensioner" @change="changeDeb" vs-value="0" vs-name="pensioner" class="mr-4 mb-2">Работающий</vs-radio>
                        <vs-radio v-model="Deb.debtor.pensioner" @change="changeDeb" vs-value="1" vs-name="pensioner" class="mr-4 mb-2">Пенсионер</vs-radio>
                    </div>
                    <vs-checkbox style="margin: 0" v-model="Deb.debtor.pensioner_check" @input="changeDeb">Не учитывать</vs-checkbox>
                </div>
            </div>
            
        </fieldset>
            
    </div>
</template>
<script>


    import Vue from 'vue'
    import vueDebounce from 'vue-debounce'
    import r from '../../../route';
    import axios from '../../../axios'
    import AsyncComputed from 'vue-async-computed'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import VueSuggestions from '../../../components/vue-suggestions/vue-suggestionsChange.vue';
    import Status from '../../../components/Status.vue'
    import ObjFromJsonViewButton from '../../RenderComponent/ObjFromJsonViewButton.vue'
    import { AgGridVue } from 'ag-grid-vue'
    Vue.use(AsyncComputed)
    import VueClipboard from 'vue-clipboard2'
    VueClipboard.config.autoSetContainer = true
    Vue.use(VueClipboard)
    import moment from 'moment';
    export default {
        components: { VueSuggestions,Status, 
          ObjFromJsonViewButton,
          AgGridVue,
        },
        props: ['grantedChangeRecover'],
        data () {
            return {
                copied: false,
                popupChangeRecover: false,
                rec_id: 0,
                popupMenu:false,
                gridApi: null,
                operatorSelectModal: false,
                strategySelectModal: false,
                sendMailSelectModal: false,
                sendSmsSelectModal: false,
                ivrSelectModal: false,
                massCallModal: false,
                promiseModal: false,
                operatorCallModal: false,
                connectionModal: false,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [

                    {
                        headerName: 'Дата',
                        headerTooltip: 'Дата',
                        tooltipField: 'created_at',
                        field: 'created_at',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Вид взаимодействия',
                        headerTooltip: 'Вид взаимодействия',
                        field: 'type',
                        filter: true,
                        width: 150,
                         cellRendererFramework: 'Type'
                    },
                    {
                        headerName: 'Результат ',
                        headerTooltip: 'Результат ',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 120
                    },
                    {
                        headerName: 'Оператор ',
                        headerTooltip: 'Оператор ',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 120
                    },
                    {
                        headerName: 'Файл ',
                        headerTooltip: 'Файл ',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 120
                    },
                ],
                components: {
                   // Type,
                  //  Open,
                }


            }
        },
        mounted(){
            this.getDataReestrsAndCessionDogov()
            this.gridApi = this.gridOptions.api

            this.getDataHistorySoft(this.id_debtorcredit);


            if(this.TypeDebtorInDebtorCreditArr.length==0){
                this.getTypeDebtorInDebtorCreditArr()
            }

            if(this.VidRecoverInDebtorCreditArr.length==0){
                this.getVidRecoverInDebtorCreditArr()
            }

            if(this.ResponsibleUserInDebtorList.length==0){
                this.getResponsibleUserInDebtorList()
            }
              if(this.FsspOtdelArr.length==0){
                this.getFsspOtdelsArr()
              }

        },
        asyncComputed: {

            async liveRegion() {
                //   console.log(this.debtor.data_reg.region_kladr_id)
                if(this.Deb.debtor.data_reg!=null) {
                    if (this.Deb.debtor.data_reg.region_with_type != null && this.Deb.debtor.data_reg.region_with_type != '') {
                        return this.Deb.debtor.data_reg.region_with_type;
                    } else {
                        return ''
                    }
                }

            },



        },
        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalCredits/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                return this.User.pag.credit.limit
            },

            ...mapGetters([
                'StatussDebtorArr','Deb','DebtorCreditDopVarRabArr','User','RecoverersArrDogov','TypeCP','TypeDebtorInDebtorCreditArr','VidRecoverInDebtorCreditArr',
                'ResponsibleUserInDebtorList','SuggestionOptionsAddress','FsspOtdelArr','RecoverDateCession','HistorySoftArr','TotalHistorySoft','TypeArr'


            ]),
            currentPage: {
                get () {
                    if (typeof this.User.pag.credit.curPage !== 'undefined') return this.User.pag.credit.curPage
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    return 1
                },
                set (val) {
                    this.User.pag.credit.curPage=val;
                    this.setQueryCreditsOffset(val-1)
                    this.getDataCredits(this.User.pag.credit);
                    this.gridApi.paginationGoToPage(val - 1)
                    this.setDataUser()

                }
            },


        },
        methods: {
            onColumnResized(params) {
                params.api.resetRowHeights();
            },
            onColumnVisible(params) {
                params.api.resetRowHeights();
            },
            onGridSizeChanged(params) {
                if (params.clientWidth > 500) {
                    this.gridApi.sizeColumnsToFit();
                } else {
                    this.columnDefs.forEach(x => {
                        x.width = 300;
                    });
                    this.gridApi.setColumnDefs(this.columnDefs);
                }
            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },
          copy () {

            this.$copyText(this.Deb.debtor.name_family+' '+this.Deb.debtor.name+' '+this.Deb.debtor.name_patronymic+' '+moment(this.Deb.debtor.birthdate).format('DD.MM.YYYY'))
            this.copied = true
            setTimeout(() => { this.copied = false }, 750)

          },
          ...mapMutations([
                'setQueryCreditsLimit','setQueryCreditsOffset','setCreditToUserPag','setCreditsFindFlag'

            ]),
        changeRecover() {
            if (this.rec_id !== -1) {
                if (this.rec_id !== 0) {
                    if (this.rec_id !== this.Deb.debtorCredit.id_recover) {
                        this.popupChangeRecover = false
                        this.Deb.debtorCredit.id_recover=this.rec_id;
                        this.changeDebUpdate()
                    } else {
                        this.$vs.notify({
                            title: 'Сообщение',
                            text: 'Выберите взыскателя для изменения',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
                } else {
                    this.$vs.notify({
                        title: 'Сообщение',
                        text: 'Выберите взыскателя для изменения',
                        color: 'success',
                        position: 'top-center'
                    })
                }
            } else {
                this.$vs.notify({
                    title: 'Сообщение',
                    text: 'Выберите взыскателя для изменения',
                    color: 'success',
                    position: 'top-center'
                })
            }
        },
        showPopupChangeRecover(){
            this.getDataReestrsAndPravDogovor()
            this.popupChangeRecover = true
        },
        print(){

            let mywindow = window.open('', 'Print', 'height=600,width=800');
            let elem = document.getElementById('printMe');
            mywindow.document.write('<html><head><title>Print QR</title>');
            mywindow.document.write('</head><body >');
            mywindow.document.write(elem.innerHTML);
            mywindow.document.write('</body></html>');

            mywindow.document.close();
            mywindow.focus()
            mywindow.print();
         //   mywindow.close();

        },

        ...mapActions([
            'saveDebtor','getDataStatuss','getDataDebtorsById','changeDeb','changeDebUpdate','deleteDebtorCredit','getDataReestrsAndPravDogovor',
            'getDataReestrsAndCessionDogov','getTypeDebtorInDebtorCreditArr',
            'getVidRecoverInDebtorCreditArr','getResponsibleUserInDebtorList','getFsspOtdelsArr',
            'changeDebUpdate','opredFssps', 'getDataHistorySoft','sendMessageHistorySoftOnce'
        ]),


        },
    }
</script>

<style>
    .debtorContacts .w-100{
        width: 100%;
    }
    .connectionModalWrapper .vs-popup{
        width: 900px;
    }
    .connectionModal .vs-button .feather-icon{
        top: 6px;
    }
    .connectionModal .vs-button-line{
        border-bottom: none!important;
        padding-left: 0!important;
    }
</style>