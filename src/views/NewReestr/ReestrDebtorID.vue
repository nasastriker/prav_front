<template>
    <vx-card no-shadow class="debtorContacts">
        <div class="flex mb-4">
            <Back></Back>
        </div>
        <div class="vx-row">

            <div class="vx-col sm:w-7/12 w-full">
                <vs-tabs >
                    <vs-tab label="Данные о должнике">
                        <MainInfo></MainInfo>
                    </vs-tab>
                    <vs-tab label="Номера телефонов">
                        <PhoneNumbers></PhoneNumbers>
                    </vs-tab>
                    <vs-tab label="Информация о договорах">
                        <CreditInfo></CreditInfo>
                    </vs-tab>
                    <vs-tab label="Информация о платежах">
                        <PayInfo></PayInfo>
                    </vs-tab>
                    <vs-tab label="Информация об обещаниях">
                        <PrommiseInfo></PrommiseInfo>
                    </vs-tab>
                </vs-tabs>

                <div style="padding: 10px;">
                    <div style="padding-top: 20px">
                        
                        <div class="vx-col w-full">
                            <h5 class="mb-4 h5-labell">История взаимодействия:</h5>
                            <div class="flex flex-wrap justify-start items-center">
                                <!-- ITEMS PER PAGE -->
                                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4 mt-5" style="padding: 0.75rem !important;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalMinimalPensions - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalMinimalPensions }} of {{ TotalMinimalPensions }}</span>
                                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                                        </div>
                                        <vs-dropdown-menu>
                                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                                                <span>20</span>
                                            </vs-dropdown-item>
                                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                                                <span>50</span>
                                            </vs-dropdown-item>
                                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                                                <span>100</span>
                                            </vs-dropdown-item>
                                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
                                                <span>150</span>
                                            </vs-dropdown-item>
                                        </vs-dropdown-menu>
                                    </vs-dropdown>
                                </div>
                                <div style="margin-top: 18px;" class="mr-4">
                                    <div class="centerx">
                                        <vs-tooltip text="Обновить таблицу" position="top" >
                                            <vs-button @click="refreshShow">
                                                <feather-icon icon="RefreshCwIcon" svgClasses="h-5 w-5 cursor-pointer" />
                                            </vs-button>
                                        </vs-tooltip>
                                    </div>
                                </div>

                                <div style="margin-top: 18px;" class="mr-4">
                                    <div class="centerx">
                                        <vs-tooltip text="Сбросить фильтры" position="top" >
                                            <vs-button color="danger" @click="filterReset" >
                                                <feather-icon icon="XCircleIcon" svgClasses="h-5 w-5 cursor-pointer" />
                                            </vs-button>
                                        </vs-tooltip>
                                    </div>
                                </div>

                                <div class="settingsBtnWrapper mr-4" style="margin-top: 18px;">
                                    <div class="centerx">
                                        <vs-tooltip text="Настройки таблицы" position="top" >
                                            <vs-button class="btn-drop settingsBtn"  @click="tableControl=true">
                                                <feather-icon icon="SettingsIcon" class="cursor-pointer" style="width: 18px;"></feather-icon>
                                            </vs-button>
                                        </vs-tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- AgGrid Table-->
                    <ag-grid-vue
                            ref="agGridTable"
                            :components="components"
                            :gridOptions="gridOptions"
                            class="ag-theme-material w-100 my-4 ag-grid-table"
                            style="height:400px"
                            :columnDefs="columnDefs"
                            :defaultColDef="defaultColDef"
                            :rowData="HistorySoftArr"
                            rowSelection="multiple"
                            :rowDataChanged = "onRowDataChanged"
                            colResizeDefault="shift"
                            :animateRows="true"
                            :floatingFilter="false"
                            :pagination="true"
                            :paginationPageSize="paginationPageSize"
                            @column-resized="onColumnResized"
                            @grid-size-changed="onGridSizeChanged"
                            :suppressPaginationPanel="true"
                            :enableRtl="$vs.rtl"
                            :enableBrowserTooltips="true"
                            :overlayLoadingTemplate="'Идёт загрузка'"
                            :overlayNoRowsTemplate="'Нет записей'">
                    </ag-grid-vue>
                    <vs-pagination
                            :total="totalPages"
                            :max="7"
                            v-model="currentPage" /> 
                    
                </div>
            </div>
            <div class="vx-col sm:w-5/12 w-full connectionWrapper">
                <fieldset class="f mt-4">
                    <div class="vx-row">
                        <div class="vx-col w-1/2">
                            <div class="centerx mb-4">
                                <vs-tooltip text="Входящий/исходящий/пусто" position="top" >
                                    <h6 class="mb-1 h6">Текущий звонок: <span class="ml-1 text-base font-bold text-red" style="color: rgb(239 68 68);">Входящий</span></h6>
                                </vs-tooltip>
                            </div>

                            <div class="centerx">
                                <vs-tooltip text="Входящий/исходящий/недозвон" position="top" >
                                    <h6 class="mb-1 h6">Номер телефона:</h6>
                                </vs-tooltip>
                            </div>
                            <vs-input class="w-100 mb-2" disabled></vs-input>

                            <div class="centerx">
                                <vs-tooltip text="Мобильный/домашний" position="top" >
                                    <h6 class="mb-1 h6">Вид телефона:</h6>
                                </vs-tooltip>
                            </div>
                            <v-select  class="w-50 mb-2" label="phone" style="margin-bottom: 40px" ></v-select>

                            <div class="centerx mt-4">
                                <vs-tooltip text="Время разговора" position="top" >
                                    <h6 class="mb-1 h6">Время разговора: <span class="ml-1 text-base font-bold text-red" style="color: rgb(239 68 68);">00:00:00</span></h6>
                                </vs-tooltip>
                            </div>

                            <div class="centerx">
                                <vs-tooltip text="Ведение аудиозаписи" position="top">
                                    <h6 class="h6 mb-1" style="margin-top: 10px">Ведение аудиозаписи:</h6>
                                </vs-tooltip>
                            </div>
                            <div class="mt-2 mb-4">
                                <vs-radio vs-value="0" vs-name="pensioner" class="mr-4 mb-2">Вкл.</vs-radio>
                                <vs-radio vs-value="1" vs-name="pensioner" class="mr-4 mb-2">Выкл.</vs-radio>
                            </div>

                            <!-- <h6 class="mb-1 h6 mt-4">Результат звонка:</h6>
                            <v-select  class="w-50 mb-base" label="result" style="margin-bottom: 40px" ></v-select> -->
                            
                        </div>
                        <div class="vx-col w-1/2">


                            <div><vs-button color="primary" type="line" ><feather-icon icon="PhoneIcon" class="mr-4" svgClasses="h-6 w-6" /> Начать звонок</vs-button></div>
                            <div><vs-button color="primary" type="line" @click="sendSmsSelectModal=true"><feather-icon icon="SendIcon" class="mr-4" svgClasses="h-6 w-6" /> Отправить SMS</vs-button></div>
                            <div><vs-button color="primary" type="line" @click="sendMailSelectModal=true"><feather-icon icon="MailIcon" class="mr-4" svgClasses="h-6 w-6" /> Отправить EMAIL</vs-button></div>
                            <div><vs-button color="primary" type="line" @click="promiseModal=true"><feather-icon icon="FolderPlusIcon" class="mr-4" svgClasses="h-6 w-6" /> Добавить Обещание</vs-button></div>
                            <div><vs-button color="primary" type="line" @click="operatorSelectModal=true"><feather-icon icon="UserPlusIcon" class="mr-4" svgClasses="h-6 w-6" /> Привязать оператора</vs-button></div>
                            <div class="mb-4"><vs-button color="primary" type="line" @click="strategySelectModal=true"><feather-icon icon="RefreshCwIcon" class="mr-4" svgClasses="h-6 w-6" /> Сменить стратегию</vs-button></div>

                            
                            
                            <div class="vx-row mt-6">
                                <div class="vx-col w-full">
                                    <vs-button @click="connectionModal=false" style="width:200px;" color="danger" class="mt-3 mr-4 mb-4">Окончить звонок</vs-button>
                                    <vs-button class=" ml-auto" @click="" style="width:200px;" color="success" type="filled">Завершить обработку</vs-button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="vx-row">
                        <div class="vx-col w-full">
                            <div class="centerx">
                                <vs-tooltip text="Возможность дописать необходимую информацию, сделать пометку к документу" position="top" >
                                    <h6 class="h6 mb-1">Комментарий оператора:</h6>
                                </vs-tooltip>
                            </div>
                            <vs-textarea class="w-100" style="height: 100px;" @change=""></vs-textarea>

                            <vs-button class="ml-auto" @click="" color="success" type="filled">Добавить</vs-button>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>

        <vs-popup classContent="selectModal" class="selectModalWrapper" title="Cмена оператора взаимодействия" :active.sync="operatorSelectModal">
            <div class="vx-row">
                <div class="vx-col w-full">
                    <h6 class="mb-1 h6">Выбрать оператора:</h6>
                    <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-1/2">
                    <h6 class="mb-1 h6">Выбрать дату запуска:</h6>
                    <vs-input class="w-100 datepicker mb-base" type="date"></vs-input>
                </div>
                <div class="vx-col w-1/2 text-right">
                    <vs-button class="mt-6 ml-auto successBtn"  @click="operatorSelectModal=false" color="success" type="filled">Сохранить</vs-button>
                </div>
            </div>

        </vs-popup>

        <vs-popup classContent="selectModal" class="selectModalWrapper" title="Cмена стратегии" :active.sync="strategySelectModal">
            <div class="vx-row">
                <div class="vx-col w-full">
                    <h6 class="mb-1 h6">Выбрать стратегию взаимодействия:</h6>
                    <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-1/2">
                    <h6 class="mb-1 h6">Выбрать дату запуска:</h6>
                    <vs-input class="w-100 datepicker mb-base" type="date"></vs-input>
                </div>
                <div class="vx-col w-1/2 text-right">
                    <vs-button class="mt-6 ml-auto successBtn"  @click="strategySelectModal=false" color="success" type="filled">Сохранить</vs-button>
                </div>
            </div>
        </vs-popup>

        <vs-popup classContent="selectModal" class="selectModalWrapper" title="Отправить Email" :active.sync="sendMailSelectModal">
            <div class="vx-row">
                <div class="vx-col w-full">
                    <h6 class="mb-1 h6">Выбрать скрипт Email:</h6>
                    <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-1/2">
                    <h6 class="mb-1 h6">Выбрать дату запуска:</h6>
                    <vs-input class="w-100 datepicker mb-base" type="date"></vs-input>
                </div>
                <div class="vx-col w-1/2 text-right">
                    <vs-button class="mt-6 ml-auto successBtn"  @click="sendMailSelectModal=false" color="success" type="filled">Сохранить</vs-button>
                </div>
            </div>
        </vs-popup>

        <vs-popup classContent="selectModal" class="selectModalWrapper" title="Отправить SMS" :active.sync="sendSmsSelectModal">
            <div class="vx-row">
                <div class="vx-col w-full">
                    <h6 class="mb-1 h6">Выбрать скрипт SMS:</h6>
                    <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-1/2">
                    <h6 class="mb-1 h6">Выбрать дату запуска:</h6>
                    <vs-input class="w-100 datepicker mb-base" type="date"></vs-input>
                </div>
                <div class="vx-col w-1/2 text-right">
                    <vs-button class="mt-6 ml-auto successBtn"  @click="sendSmsSelectModal=false" color="success" type="filled">Сохранить</vs-button>
                </div>
            </div>
        </vs-popup>

        <vs-popup classContent="selectModal" class="selectModalWrapper" title="Запустить автоинформатор (IVR)" :active.sync="ivrSelectModal">
            <div class="vx-row">
                <div class="vx-col w-full">
                    <h6 class="mb-1 h6">Выбрать скрипт IVR:</h6>
                    <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-1/2">
                    <h6 class="mb-1 h6">Выбрать дату запуска:</h6>
                    <vs-input class="w-100 datepicker mb-base" type="date"></vs-input>
                </div>
                <div class="vx-col w-1/2 text-right">
                    <vs-button class="mt-6 ml-auto successBtn"  @click="ivrSelectModal=false" color="success" type="filled">Сохранить</vs-button>
                </div>
            </div>
        </vs-popup>

        <vs-popup classContent="selectModal" class="selectModalWrapper" title="Запустить массовый обзвон" :active.sync="massCallModal">
            <div class="vx-row">
                <div class="vx-col w-full">
                    <h6 class="mb-1 h6">Выбрать оператора:</h6>
                    <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-1/2">
                    <h6 class="mb-1 h6">Выбрать дату запуска:</h6>
                    <vs-input class="w-100 datepicker mb-base" type="date"></vs-input>
                </div>
                <div class="vx-col w-1/2 text-right">
                    <vs-button class="mt-6 ml-auto successBtn"  @click="massCallModal=false" color="success" type="filled">Сохранить</vs-button>
                </div>
            </div>
        </vs-popup>

        <vs-popup classContent="selectModal" class="selectModalWrapper" title="Запустить обзвон оператором" :active.sync="operatorCallModal">
            <div class="vx-row">
                <div class="vx-col w-full">
                    <h6 class="mb-1 h6">Выбрать оператора:</h6>
                    <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-1/2">
                    <h6 class="mb-1 h6">Выбрать дату запуска:</h6>
                    <vs-input class="w-100 datepicker mb-base" type="date"></vs-input>
                </div>
                <div class="vx-col w-1/2 text-right">
                    <vs-button class="mt-6 ml-auto successBtn"  @click="operatorCallModal=false" color="success" type="filled">Сохранить</vs-button>
                </div>
            </div>
        </vs-popup>

        

    </vx-card>
</template>

<script>

    import Vue from 'vue'
    import r from '../../route';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import CreditInfo from './ReestrDebtorTab/CreditInfo.vue';
    import PhoneNumbers from './ReestrDebtorTab/PhoneNumbers.vue';
    import MainInfo from './ReestrDebtorTab/MainInfo.vue';
    import PayInfo from './ReestrDebtorTab/PayInfo.vue';
    import PrommiseInfo from './ReestrDebtorTab/PrommiseInfo.vue';
    import axios from '../../axios'
    import VueSuggestions from '../../components/vue-suggestions/vue-suggestionsChange.vue';
    import Status from '../../components/Status.vue'
    import ObjFromJsonViewButton from '../RenderComponent/ObjFromJsonViewButton.vue'
    import { AgGridVue } from 'ag-grid-vue'
    import AsyncComputed from 'vue-async-computed'

    import Back from '../../components/Back.vue'

    Vue.use(AsyncComputed)
    import VueClipboard from 'vue-clipboard2'
    VueClipboard.config.autoSetContainer = true
    Vue.use(VueClipboard)
    import moment from 'moment';

    export default {
        components: {
            Back,
            CreditInfo,
            PhoneNumbers,
            MainInfo,
            PayInfo,
            PrommiseInfo,
            VueSuggestions,
            Status, 
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
                        width: 70
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
                        headerName: 'Результат взаимодействия',
                        headerTooltip: 'Результат взаимодействия',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 120
                    },
                    {
                        headerName: 'Оператор',
                        headerTooltip: 'Оператор',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 120
                    },
                    {
                        headerName: 'Файл',
                        headerTooltip: 'Файл',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 120
                    },
                    {
                        headerName: 'Взыскатель',
                        headerTooltip: 'Взыскатель',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 120
                    },
                    {
                        headerName: 'Цедент',
                        headerTooltip: 'Цедент',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 120
                    },
                    {
                        headerName: '№ Договора цессии',
                        headerTooltip: 'Номер Договора цессии',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 120
                    },
                    {
                        headerName: '№ Договора',
                        headerTooltip: 'Номер Договора',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 120
                    },
                    {
                        headerName: 'Дата договора',
                        headerTooltip: 'Дата договора',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
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
          refreshShow(){
                let value=7
                axios.get(r("setting.index"), {
                    params: {
                        method: 'getSettingsByName',
                        param: 'sendPeriodSudPrikaz'
                    }
                }).then(res=>{
                    if(res.data.result){
                        value=res.data.value
                      this.arraySend=res.data.arraySend
                      this.arrayLetter=res.data.arrayLetter
                    }
                    let date1 = new Date();
                    let fortnightAway = new Date(date1);
                    date1.setDate(fortnightAway.getDate() + value);
                    this.dateSend=  moment(date1.toString()).format("YYYY-MM-DD")

                    this.sendShow=true
                })

            },
            refresh(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("reestrPochta.index"), {
                    params: {
                        method: 'refreshDebtorFileSendSa',
                        param: {
                            id:this.params.data.doc_id,
                            date:this.dateSend,
                            gram:this.gram,
                            type:this.letter_type,
                            reception:this.letter_reseption,
                        }

                    }
                }).then((response) => {
                    this.sendShow=false
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.params.refresh_func();
                        this.$vs.notify({  title:'Сообщение', text: 'Обновление выполнено успешно!!!', color: 'success', position: 'top-center' })
                        //  this.debtor=response.data.data
                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Обновление не выполнено !!! '+response.data.error||'', color: 'danger', position: 'top-center' })
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
    .connectionWrapper .vs-button .feather-icon{
        top: 6px;
    }
    .connectionWrapper .vs-button-line{
        border-bottom: none!important;
        padding-left: 0!important;
    }
</style>