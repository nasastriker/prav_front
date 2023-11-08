<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <div class="vx-row">
                    <div class="vx-col">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 18px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalPaymentAlls - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalPaymentAlls }} of {{ TotalPaymentAlls }}</span>
                                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                            </div>
                            <vs-dropdown-menu>

                                <vs-dropdown-item @click="changePag(20)">
                                    <span>20</span>
                                </vs-dropdown-item>
                                <vs-dropdown-item @click="changePag(50)">
                                    <span>50</span>
                                </vs-dropdown-item>
                                <vs-dropdown-item @click="changePag(100)">
                                    <span>100</span>
                                </vs-dropdown-item>
                                <vs-dropdown-item @click="changePag(150)">
                                    <span>150</span>
                                </vs-dropdown-item>
                            </vs-dropdown-menu>
                        </vs-dropdown>
                    </div>
                    <div class="vx-col">
                        <h6 class="mb-1">Cтатус</h6>
                        <v-select  class="w-50 " style="margin-bottom: 10px;min-width: 150px" :reduce="label => label.id" label="name" :options="StatussArrPaymentAndAll"   v-model="filter.status" @input="setStatus" ></v-select>
                    </div>
                    <div>
                        <h6 class="mb-1">Взыскатель</h6>
                        <v-select  class="w-50 " style="margin-bottom: 10px;min-width:150px" :reduce="label => label" label="name" :options="RecoverArrList"   v-model="filter.recover" @input="setRecover" ></v-select>
                    </div>
                        <div class="vx-col">
                            <h6 class="mb-1">Период регистрации c </h6>
                            <vs-input class="w-50" type="date" v-model="filter.begin_date" @blur="SetBeginEndDate" @keyup.enter="$event.target.blur()"  />
                        </div>
                        <div class="vx-col">
                            <h6 class="mb-1">по</h6>
                            <vs-input class="w-50" type="date" v-model="filter.end_date" @blur="SetBeginEndDate" @keyup.enter="$event.target.blur()" />
                        </div>
                        <div class="vx-col">
                            <vs-checkbox style="margin-top:25px;" v-model="payment.fast" @change="setFast"></vs-checkbox>
                        </div>
                        <div class="vx-col">

                            <div class="dropdown-button-container">
                                <vs-dropdown>
                                    <vs-button class="btn" style="margin-top:18px;"  type="gradient" icon="more_horiz">Фильтры</vs-button>
                                    <vs-dropdown-menu>
                                        <vs-dropdown-item>
                                            <vs-button class="mb-4 md:mb-0 mr-4" style="width: 200px" @click="filterPopup=true" >Доп. фильтры</vs-button>
                                        </vs-dropdown-item>

                                        <vs-dropdown-item>
                                            <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="width: 200px" @click="clearFilters">Сбросить все фильтры</vs-button>
                                        </vs-dropdown-item>
                                        <vs-dropdown-item>
                                            <vs-button class="mb-4 md:mb-0 mr-4" style="width: 200px;" @click="importPopup=true">Экспорт</vs-button>
                                        </vs-dropdown-item>

                                        <vs-dropdown-item>
                                            <vs-button class="mb-4 md:mb-0 mr-4" style="width: 200px;" @click="ShowFilterReport">Отчет экспорта фильтров</vs-button>
                                        </vs-dropdown-item>

                                    </vs-dropdown-menu>
                                </vs-dropdown>
                            </div>



                        </div>
                        <!-- <div class="vx-col">
                            <span style="max-width: 40px;">
                        <img src="/loading.gif" v-if="PaymentFindFlag" style="max-width: 40px; margin-top: 5px;">
                        </span>
                        </div> -->
                    </div>

                </div>

                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="User.pag.payments.find" @input="updateSearchQuery" placeholder="Поиск..." />
                    <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                        <div class="dropdown-button-container">
                            <vs-dropdown>
                                <vs-button class="btn" color="success" type="gradient" icon="more_horiz">Операции</vs-button>
                                <vs-dropdown-menu>

                                    <vs-dropdown-item>
                                        <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="showVi=!showVi">Выгрузить</vs-button>
                                    </vs-dropdown-item>

                                    <vs-dropdown-item>
                                        <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="checkProblem">Проверка проблемных</vs-button>
                                    </vs-dropdown-item>
                                    <vs-dropdown-item>
                                      <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="showHisStart">История</vs-button>
                                    </vs-dropdown-item>
                                </vs-dropdown-menu>
                            </vs-dropdown>
                        </div>
                    </div>
                </div>
            </div>

            <vs-popup class="filters_modal"  classContent="popup-example"  title="Дополнительные фильтры" :active.sync="filterPopup">
                <div >
                    <div class="vx-row">
                        <div class="vx-col md:w-1/4 w-full" style="width: 50%;">
                            <h6 style="color:dodgerblue;margin-top:8px;">Регион адреса регистрации:</h6>
                            <v-select style="margin-top:5px;" :reduce="label => label.id" label="name" :options="RegionArr"  v-model="filter.AdditionalFilters.region"></v-select>
                            <h6 style="color:dodgerblue;margin-top:8px;">БАНК:</h6>
                            <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="BanksListArr"   v-model="filter.AdditionalFilters.bank" @change="setBank" ></v-select>
                            <!--<h6 style="color:dodgerblue;margin-top:8px;">ПФ РФ:</h6>-->
                            <!--<v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="PfrListArr"   v-model="filter.AdditionalFilters.pfr"></v-select>-->
                            <h6 style="color:dodgerblue;margin-top:5px;">ФСПП отдел:<VarToClipboard name="d_fssp_otdel"/></h6>
                            <v-select style="min-width: 100%;margin-top:5px;" :reduce="label => label.fssp_code" label="name" :options="FsspOtdelsListArr"  v-model="filter.AdditionalFilters.fssp" @search="filterFindFssp"></v-select>
                            <fieldset class="f" style="margin-top:5px;">
                                <legend class="l">Статус гражданина:<VarToClipboard name="d_pensioner"/></legend>
                                <vs-checkbox style="margin-top:5px;" v-model="filterAll.statusGr" @change="filter.AdditionalFilters.pensioner=(filterAll.statusGr) ? ['0','1'] : []">Все</vs-checkbox>
                                <vs-checkbox style="margin-top:5px;margin-bottom: 5px" vs-value="0" v-model="filter.AdditionalFilters.pensioner" :disabled="filterAll.statusGr">Работающий</vs-checkbox>
                                <vs-checkbox style="margin-bottom: 5px" vs-value="1" v-model="filter.AdditionalFilters.pensioner"  :disabled="filterAll.statusGr" >Пенсионер</vs-checkbox>
                            </fieldset>

                        </div>
                        <div class="vx-col md:w-1/4 w-full">
                            <fieldset class="f" style="margin-top:5px;">
                                <legend class="l">Тип ИД:<VarToClipboard name="dc_type_cp"/></legend>
                                <vs-checkbox style="margin-top:5px;" v-model="filterAll.typeDelo" @change="filter.AdditionalFilters.typeCp=(filterAll.typeDelo) ? ['0','1'] : []">Все</vs-checkbox>
                                <vs-checkbox style="margin-top:5px;" vs-value="0" v-model="filter.AdditionalFilters.typeCp" :disabled="filterAll.typeDelo">Судебный приказ</vs-checkbox>
                                <vs-checkbox style="margin-top:5px;margin-bottom: 5px" vs-value="1" v-model="filter.AdditionalFilters.typeCp" :disabled="filterAll.typeDelo">Исполнительный лист</vs-checkbox>
                            </fieldset>
                            <h6 style="color:dodgerblue;margin-top:5px;">Номер ИП:<VarToClipboard name="dс_number_ip"/></h6>
                            <vs-input style="margin-top:5px;margin-bottom: 5px" v-model="filter.AdditionalFilters.number_ip"></vs-input>

                            <fieldset class="f" style="margin-top: 10px">
                                <legend class="l">Тип должника:<VarToClipboard name="dc_type_debtor"/></legend>
                                <vs-checkbox style="margin-top:5px;" v-model="filterAll.typeDebtor" @change="filterSetsTypeDebtor">Все</vs-checkbox>

                                <template v-for="type_i in TypeDebtorInDebtorCreditArr">
                                    <vs-checkbox  style="margin-top:3px;margin-bottom: 3px" :vs-value="type_i.id.toString()" v-model="filter.AdditionalFilters.typeDebtor " :disabled="filterAll.typeDebtor">{{type_i.name}}</vs-checkbox>
                                </template>
                            </fieldset>

                        </div>

                        <div class="vx-col md:w-1/4 w-full" style="width: 50%;">
                            <h6 class="h6">Ответственный сотрудник:<VarToClipboard name="dc_id_user"/></h6>
                            <v-select  class="w-50" :reduce="label=>label.id" label="name" :options="ResponsibleUserInDebtorListArr"  v-model="filter.AdditionalFilters.id_user"></v-select>
                            <fieldset class="f" style="margin-top: 10px">
                                <legend class="l">Вид взыскания:<VarToClipboard name="dc_name_delo"/></legend>
                                <vs-checkbox style="margin-top:5px;" v-model="filterAll.nameDelo" @change="filterSetsNameDelo">Все</vs-checkbox>
                                <template v-for="type_i in VidRecoverInDebtorCreditArr">
                                    <vs-checkbox  style="margin-top:3px;margin-bottom: 3px" :vs-value="type_i.id.toString()" v-model="filter.AdditionalFilters.name_delo " :disabled="filterAll.nameDelo">{{type_i.name}}</vs-checkbox>
                                </template>
                            </fieldset>

                        </div>

                        <div class="vx-col md:w-1/4 w-full" style="width: 50%;">
                            <h6 class="h6" >Расчетный счет поступления:</h6>
                            <vs-input  class="w-50 " style="margin-bottom: 10px" v-model="filter.AdditionalFilters.account"  ></vs-input>
                            <h6 class="h6" >Тип платежа:</h6>
                            <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="PaymentTypeListArr"   v-model="filter.AdditionalFilters.typePayment" @input="setTypePayment" ></v-select>
                            <h6 class="h6" >БИК источника поступления платежа:</h6>
                            <vs-input  class="w-50 " style="margin-bottom: 10px" v-model="filter.AdditionalFilters.bic"  @input="setBic"></vs-input>

                        </div>
                    </div>
                    <vs-button @click="filterPopup=false" class="mr-4">Закрыть</vs-button>
                    <vs-button @click="SetAdditionalFilters" color="success">Применить</vs-button>

                </div>
            </vs-popup>


            <vs-popup style="min-height: 500px;" class="filters_modal" classContent="popup-example" title="Отчет" :active.sync="reportFilterPopup">
                <PaymentReportFilter></PaymentReportFilter>
            </vs-popup>

            <vs-popup style="min-height: 500px;" classContent="popup-example" title="Отчет" :active.sync="showVi">
                <div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full" >
                        <h6 class="h6 mb-1">С даты:</h6>
                        <vs-input type="date" class="w-full mb-4"  v-model="date_begin"  ></vs-input>
                    </div>
                    <div class="vx-col md:w-1/2 w-full" >
                        <h6 class="h6 mb-1">По дату:</h6>
                        <vs-input type="date" class="w-full mb-4"  v-model="date_end"  ></vs-input>
                    </div>
                </div>
                <div style="text-align: center;margin-top: 10px">
                    <vs-button class="w-1/3 ml-auto"  color="primary" type="filled" @click="generate">Сформировать</vs-button>
                </div>
                <input type="file" ref="fileInput" class="hidden" accept=".xlsx, .xls" @change="handleClick">



            </vs-popup>
            <vs-popup    classContent="popup-example"  title="Экспорт" :active.sync="importPopup">
                <div >
                    <LoadFilterFromXLS @closePopup="importPopup=false"></LoadFilterFromXLS>
                </div>
            </vs-popup>
            <!-- AgGrid Table -->
            <div class="out-main">
                <ag-grid-vue
                        ref="agGridTable"
                        :components="components"
                        :gridOptions="gridOptions"
                        class="ag-theme-material w-100 my-4 ag-grid-table"
                        :columnDefs="columnDefs"
                        :defaultColDef="defaultColDef"
                        :rowData="PaymentAllsArr"
                        rowSelection="multiple"
                        :rowDataChanged = "onRowDataChanged"
                        colResizeDefault="shift"
                        :animateRows="true"
                        @rowDoubleClicked="onrowDoubleClicked"
                        :floatingFilter="true"
                        :pagination="true"
                        :paginationPageSize="paginationPageSize"
                        :suppressPaginationPanel="true"
                        :enableRtl="$vs.rtl"
                        @grid-size-changed="onGridSizeChanged"
                        @column-resized="onColumnResized"
                        @column-visible="onColumnVisible"
                        :enableBrowserTooltips="true"
                        :overlayLoadingTemplate="'Идёт загрузка'"
                        :overlayNoRowsTemplate="'Нет записей'">
                </ag-grid-vue>

                <transition name="fade">
                    <div class="tablePreloader outer-div" v-if="PaymentFindFlag">
                        <img class="load-bar" src="/loading.gif" style="width: 70px;">
                        <span>Идёт загрузка</span>
                    </div>
                </transition>
            </div>
            <div class="warp">
                <div class="left">
                    Общая сумма платежей: <span style="color:green">{{SumPaymentsFromArrayPayments}}</span> рублей из <span style="color: #0e84b5">{{TotalPaymentAlls}}</span> платежей
                </div>

            </div>
          <vs-popup classContent="popup-example" title="Состояния задач" :active.sync="showHis">
            <TaskPayment :taskShow="showHis"></TaskPayment>
          </vs-popup>
            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
    </div>

</template>

<script>
    import OpenPaymentAll from './Render/OpenPaymentAll.vue'
    import filterRenderPayment from './Render/filterRenderPayment.vue'
    import OpenPaymentStatus from './Render/OpenPaymentStatus.vue'
    import ImportPayment from './Render/ImportPayment.vue'
    import TaskPayment from './Render/TaskPayment.vue'
    import PaymentReportFilter from './PaymentReportFilter.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import LoadFilterFromXLS from './LoadFilterFromXLS.vue'
    import r from '../../../route';
    import axios from '../../../axios'
    export default {
        components: {
            ImportPayment,
            TaskPayment,
            OpenPaymentAll,
            OpenPaymentStatus,
            filterRenderPayment,
            LoadFilterFromXLS,
            PaymentReportFilter,
        },
        data () {
            return {
                showHis:false,
                importTextAreaError:'',
                importPopup:false,
                reportFilterPopup:false,
                importData:{},
                filterAll:{
                    statusGr:false,
                    typeDebtor:false,
                    typeDelo:false,
                    nameDelo:false
                },
                filterPopup:false,
                additionFilterStay:true,
                filter:{
                    fields:{},
                    status:0,
                    recover:{
                        name:'Все',
                        id:0,
                        id_recover:-2,
                        num_recover:0,
                        typeRecover:0,
                    },
                    begin_date:'',
                    end_date:'',
                    AdditionalFilters:{
                        pensioner:['0','1'],
                        typeCp:['0','1'],
                        typeDebtor:[],
                        region: -1,
                        fssp : -1,
                        name_delo:[],
                        number_ip:'',
                        flag:1,
                        id_user:-1,
                        typePayment:0,
                        bank:0,
                        pfr:0,
                        account:'',
                        bic:'',

                    }
                },
                payment:{
                    find:'',
                    fast:true,
                    limit:50,
                    offset:0,
                    filter:''
                },
                paymentArc:{
                    find:'',
                    fast:true,
                    limit:50,
                    offset:0,
                    filter:''
                },
                filterArc:{
                    fields:{},
                    status:0,
                   recover:{
                       name:'Все',
                       id:0,
                       id_recover:-2,
                       num_recover:0,
                       typeRecover:0,
                   },
                   begin_date:'',
                   end_date:'',
                   AdditionalFilters:{
                       pensioner:['0','1'],
                       typeCp:['0','1'],
                       typeDebtor:[],
                       region: -1,
                       fssp : -1,
                       name_delo:[],
                       number_ip:'',
                       flag:1,
                       id_user:-1,
                       typePayment:0,
                       bank:0,
                       pfr:0,
                       account:'',
                       bic:'',
                   }
                },
                showVi:false,
                date_begin:null,
                date_end:null,
                status:'Все',
                results: null,
                help: 'Necessary columns are: login, firstsname and lastname',
                tableData: [],
                header: [],
                sheetName: '',
                searchQuery: '',

                // AgGrid
                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'Статус',
                        field: 'status',
                        filter: false,
                        width: 90,
                        cellRendererFramework: 'OpenPaymentStatus'
                    },
                    {
                        headerName: 'Клиент',
                        headerTooltip: 'Клиент',
                        tooltipField: 'fio',
                        field: 'fio',
                        width: 250,
                        filter: true,
                        floatingFilterComponentFramework: 'filterRenderPayment',
                        floatingFilterComponentParams:{
                            type_f: 'string',
                            field: 'fio',
                            emitFilter:'clear_filter_payment_filter',
                            emitSet:'set_filter_payment_filter',
                            updateSearchField: this.updateSearchField.bind(this)
                        },
                    },

                    {
                        headerName: 'Клиент загруженный',
                        headerTooltip: 'Клиент загруженный',
                        tooltipField: 'fio_load',
                        field: 'fio_load',
                        filter: true,
                        floatingFilterComponentFramework: 'filterRenderPayment',
                        floatingFilterComponentParams:{
                            type_f: 'string',
                            field: 'fio_load',
                            emitFilter:'clear_filter_payment_filter',
                            emitSet:'set_filter_payment_filter',
                            updateSearchField: this.updateSearchField.bind(this)
                        },
                        width: 250
                    },
                    {
                        headerName: 'Договор',
                        headerTooltip: 'Договор',
                        tooltipField: 'number_dog',
                        field: 'number_dog',
                        filter: true,
                        floatingFilterComponentFramework: 'filterRenderPayment',
                        floatingFilterComponentParams:{
                            type_f: 'string',
                            field: 'number_dog',
                            emitFilter:'clear_filter_payment_filter',
                            emitSet:'set_filter_payment_filter',
                            updateSearchField: this.updateSearchField.bind(this)
                        },
                        width: 200
                    },
                    {
                        headerName: 'Договор загр.',
                        headerTooltip: 'Договор загруженный',
                        tooltipField: 'number_load',
                        field: 'number_load',
                        filter: true,
                        floatingFilterComponentFramework: 'filterRenderPayment',
                        floatingFilterComponentParams:{
                            type_f: 'string',
                            field: 'number_load',
                            emitFilter:'clear_filter_payment_filter',
                            emitSet:'set_filter_payment_filter',
                            updateSearchField: this.updateSearchField.bind(this)
                        },
                        width: 200
                    },


                    {
                        headerName: 'Сумма',
                        headerTooltip: 'Сумма',
                        tooltipField: 'sum',
                        field: 'sum',
                        filter: true,
                        width: 80,
                        floatingFilterComponentFramework: 'filterRenderPayment',
                        floatingFilterComponentParams:{
                            type_f: 'string',
                            field: 'sum1',
                            emitFilter:'clear_filter_payment_filter',
                            emitSet:'set_filter_payment_filter',
                            updateSearchField: this.updateSearchField.bind(this)
                        },
                    },
                    {
                        headerName: 'Дата',
                        headerTooltip: 'Дата',
                        tooltipField: 'date',
                        field: 'date',
                        filter: true,
                        floatingFilterComponentFramework: 'filterRenderPayment',
                        floatingFilterComponentParams:{
                            type_f: 'date',
                            field: 'date',
                            emitFilter:'clear_filter_payment_filter',
                            emitSet:'set_filter_payment_filter',
                            updateSearchField: this.updateSearchField.bind(this)
                        },
                        width: 100
                    },
                    {
                        headerName: 'Основание',
                        headerTooltip: 'Основание',
                        tooltipField: 'osn',
                        field: 'osn',
                        filter: false,
                        width: 250,
                    },
                    {
                        headerName: 'Счет',
                        headerTooltip: 'Счет',
                        tooltipField: 'account',
                        field: 'account',
                        filter: true,
                        width: 100,
                        floatingFilterComponentFramework: 'filterRenderPayment',
                        floatingFilterComponentParams:{
                            type_f: 'string',
                            field: 'account',
                            emitFilter:'clear_filter_payment_filter',
                            emitSet:'set_filter_payment_filter',
                            updateSearchField: this.updateSearchField.bind(this)
                        },

                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: false,
                        width: 100,
                        cellRendererFramework: 'OpenPaymentAll'
                    },



                ],

                // Cell Renderer Components
                components: {
                    OpenPaymentAll,
                    OpenPaymentStatus,
                    filterRenderPayment
                }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalPaymentAlls/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                return this.User.pag.payments.limit
            },
            ...mapGetters([
                'PaymentAllsArr','TotalPaymentAlls','StatussArr','User','StatussArrPaymentAndAll','RecoverArrList','RegionArr',
                'TypeDebtorInDebtorCreditArr','SumPaymentsFromArrayPayments',
                'JudicialsListArr','FsspOtdelsListArr','VidRecoverInDebtorCreditArr','ResponsibleUserInDebtorListArr',
                'RecoverersArr','BanksListArr','PfrListArr','PaymentFindFlag','PaymentTypeListArr','SumPaymentsFromArrayPayments'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryPaymentsOffset(val-1)
                    this.getDataPaymentAlls(this.User.pag.payments);
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },

        },
        methods: {
            showHisStart(){
              this.getTaskPayments(this.User.pag.taskPaymentHistory);
              this.showHis=true
            },
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
            ...mapActions([
                'getDataPaymentAlls','getDataStatuss','setDataUser','getRecoverArrList','getDataUser',
                'getRegion','getJudicialsListArr','getFsspOtdelsListArr','getDataUser','getRecoverArrList','getResponsibleUserInDebtorList',
                'getVidRecoverInDebtorCreditArr','getBanksListArr','getPfrListArr','getFsspOtdelsListArr','getTypeDebtorInDebtorCreditArr',
                'getPaymentsType','importPaymentFromXLS','checkPaymentFilterFromXLS','getPaymentStatusList','getPaymentFilterTask','getTaskPayments'
            ]),
            ...mapMutations([
                'setQueryPaymentsLimit','setQueryPaymentsOffset',
            ]),

            ShowFilterReport(){
                this.reportFilterPopup=true
                this.getPaymentFilterTask()
            },
            clearFilters(){
                this.filter=JSON.parse(JSON.stringify(this.filterArc))
                this.filterAll.typeDebtor=(this.filter.AdditionalFilters.typeDebtor.length===this.TypeDebtorInDebtorCreditArr.length)||(this.filter.AdditionalFilters.typeDebtor.length===0)
                this.filterAll.nameDelo=(this.filter.AdditionalFilters.name_delo.length===this.VidRecoverInDebtorCreditArr.length)||(this.filter.AdditionalFilters.name_delo.length===0)
                this.filterSetsTypeDebtor()
                this.filterSetsNameDelo()
                this.filterAll.statusGr=this.filter.AdditionalFilters.pensioner.length===2
                this.filterAll.typeDelo=this.filter.AdditionalFilters.typeCp.length===2
             //   console.log(this.filter)
                this.$root.$emit('clear_filter_payment_filter',this.filter.fields)
                this.payment.filter=JSON.stringify(this.filter)
                this.User.pag.payments=this.payment
                this.setDataUser().then((res)=>{
                    this.getDataPaymentAlls(this.User.pag.payments)
                })

            },

            additionFilterStayCheck(){

            },

            importFilterInTable (data) {
                // this.$vs.loading({color: '#ff8000'})
                // this.header = data.header
                //
                // this.tableData = data.results
                // this.sheetName = data.meta.sheetName




                //this.loadFilterPaymentFromXLS(data.results,data.name)
                //this.$vs.loading.close()

            },

            setBic(){
                if(this.filter.AdditionalFilters.bic!=='')this.filter.AdditionalFilters.bank=0
            },
            setBank(){
                this.filter.AdditionalFilters.bank=this.filter.AdditionalFilters.bank||0
                if(this.filter.AdditionalFilters.bank!==0)this.filter.AdditionalFilters.bic=''

            },
            setFast(){
                this.User.pag.payments=this.payment
                this.setDataUser().then((res)=>{
                    this.getDataPaymentAlls(this.User.pag.payments);

                })

            },
            SetAdditionalFilters(){
                this.payment.filter=JSON.stringify(this.filter)
                this.User.pag.payments=this.payment
                this.setDataUser().then((res)=>{
                    this.getDataPaymentAlls(this.User.pag.payments);

                })
                this.filterPopup=false
            },
            setTypePayment(){
                this.filter.AdditionalFilters.typePayment=this.filter.AdditionalFilters.typePayment||0
            },
            updateSearchField(findField, findFieldName, findType, not_update=false){
                if(!not_update)this.setPaymentFindFlag=true
                this.User.pag.payments.find=''
                this.filter.fields[findFieldName] = {
                    find: findField,
                    name: findFieldName,
                    type: findType
                }
                if(!not_update) {
                    this.payment.filter=JSON.stringify(this.filter)
                    this.User.pag.payments=this.payment
                    this.setDataUser().then((response) => {
                        this.getDataPaymentAlls(this.User.pag.payments)
                        //this.setPaymentFindFlag=false
                    })
                }
            },

            filterSetsNameDelo(){
                if(this.filterAll.nameDelo) {
                    this.filter.AdditionalFilters.name_delo=[]
                    for (let i = 0; i < this.VidRecoverInDebtorCreditArr.length; i++) {
                        this.filter.AdditionalFilters.name_delo.push(i.toString())
                    }
                }
                else{
                    this.filter.AdditionalFilters.name_delo.splice(0,this.filter.AdditionalFilters.name_delo.length)
                }
            },

            filterSetsTypeDebtor(){
                if(this.filterAll.typeDebtor) {
                    this.filter.AdditionalFilters.typeDebtor=[]
                    for (let i = 0; i < this.TypeDebtorInDebtorCreditArr.length; i++) {
                        this.filter.AdditionalFilters.typeDebtor.push(i.toString())
                    }
                }
                else{
                    this.filter.AdditionalFilters.typeDebtor.splice(0,this.filter.AdditionalFilters.typeDebtor.length)
                }
            },

            SetBeginEndDate(){
                this.payment.filter=JSON.stringify(this.filter)
                this.User.pag.payments=this.payment
                this.setDataUser().then((res)=>{
                    this.getDataPaymentAlls(this.User.pag.payments);
                })
            },

            setRecover(){
                this.filter.recover=this.filter.recover||this.RecoverArrList[0]
                this.payment.filter=JSON.stringify(this.filter)
                this.User.pag.payments=this.payment
                this.setDataUser().then((res)=>{
                    this.getDataPaymentAlls(this.User.pag.payments);
                })
            },

            handleClick (e) {
                const files = e.target.files
                const rawFile = files[0]
                if (!rawFile) return
                this.uploadFile(rawFile)
            },
            filterFindFssp(value){
                this.getFsspOtdelsListArr(value)
            },

            getFile(file,name){
                axios.get(r("reports.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getFile',
                        param:file,




                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    //console.log(response.data);
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                    //  console.log(url);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', name);
                    document.body.appendChild(link);
                    link.click();


                }).catch(error => {


                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка!!!',
                        color: 'danger',
                        position: 'top-center'
                    })

                });

            },
            generate(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("reports.update"), {
                    params: {
                        method: 'generatePaymentReport',
                        param:{
                            date_begin:this.date_begin,
                            date_end:this.date_end,
                        }





                    }
                }).then((response) => {
                    this.showVi=false;
                    this.$vs.loading.close()
                    if(response.data.result){

                        this.getFile(response.data.filename,'отчет.xls')
                    }
                    else{
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Ошибка!!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                    }


                }).catch(error => {
                    this.popupActive2=false;
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка!!!',
                        color: 'danger',
                        position: 'top-center'
                    })

                });

            },
            checkProblem(){
                this.$vs.loading({color: '#ff8000'})

                axios.post(r("payment.index"), {
                    params: {
                        method: 'checkProblem',
                        param:''

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){

                        this.$vs.notify({  title:'Сообщение', text: 'Проверка запущена!!!', color: 'success', position: 'top-center' })


                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Ошибка!!!', color: 'danger', position: 'top-center' })
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
            setStatus(){
                this.filter.status=this.filter.status||0
                this.payment.filter=JSON.stringify(this.filter)
                this.User.pag.payments=this.payment
                this.setDataUser().then((res)=>{
                    this.getDataPaymentAlls(this.User.pag.payments);
                })

            },
            exportData(data,name,id_recover){
                this.$vs.loading({color: '#ff8000'})

                axios.post(r("payment.index"), {
                    params: {
                        method: 'exportData',
                        param: {data:data,name:name,id_recover:id_recover}

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){

                            this.getDataPaymentAlls(this.User.pag.payments)
                            this.$vs.notify({  title:'Сообщение', text: 'Импорт выполнен успешно!!!', color: 'success', position: 'top-center' })
                            this.popupActive2=true;


                        //  this.debtor=response.data.data
                    }else {
                        this.getDataPaymentAlls(this.User.pag.payments)
                        this.$vs.notify({  title:'Сообщение', text: 'Импорт не выполнен !!!', color: 'danger', position: 'top-center' })
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
            loadDataInTable ({ results, header, meta,name,id_recover,status }) {
                this.$vs.loading({color: '#ff8000'})
                this.header = header

                //   console.log(this.header);
                this.tableData = results
                this.sheetName = meta.sheetName
                //console.log(this.sheetName);
                this.exportData(results,name,id_recover)
                this.$vs.loading.close()

            },
            onrowDoubleClicked(event){
                this.$router.push('/payment/'+event.data.id)
            },
            changePag(pag){

                this.User.pag.payments.limit=pag
                this.setDataUser()
                this.getDataPaymentAlls(this.User.pag.payments);
                this.setQueryPaymentsLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },
            onValidate(results) {
                this.results = results;
            },


            updateSearchQuery (val) {
                this.User.pag.payments.find=val

                this.getDataPaymentAlls(this.User.pag.payments);

            },

            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },
            restoreUserPag(arc, dest) {
                Object.keys(arc).forEach((key) => {
                    if (typeof arc[key] === 'object' && arc[key] !== null) {
                        if (Array.isArray(arc[key])) {
                            if ((typeof dest[key] !== 'object' || dest[key] === null || !Array.isArray(dest[key]))) {
                                dest[key] = []
                                arc[key].forEach((ar) => dest[key].push(ar))
                            }
                        } else {
                            if (typeof dest[key] !== 'object' || dest[key] === null || Array.isArray(dest[key])) dest[key] = {}
                            this.restoreUserPag(arc[key], dest[key])
                        }
                    }
                    else {
                        if (typeof dest[key] === 'undefined' || typeof dest[key] === 'object' || dest[key] === null || dest[key] === '') dest[key] = arc[key]
                    }
                })
            },
        },
        mounted () {
            this.getRecoverArrList()
            this.getDataStatuss()
            this.getRegion()
            this.getBanksListArr()
            this.getPfrListArr()
            this.getFsspOtdelsListArr()
            this.getResponsibleUserInDebtorList()
            this.getPaymentsType()
            this.getPaymentStatusList()
            this.getTypeDebtorInDebtorCreditArr().then(()=>{
                this.filterSetsTypeDebtor()
                this.filterSetsNameDelo()
                this.additionFilterStay=this.additionFilterStayCheck()
            })
            this.gridApi = this.gridOptions.api
            this.getDataUser().then((res)=>{
                 this.payment=this.User.pag.payments||{}
                this.restoreUserPag(this.paymentArc,this.payment)
                this.filter=JSON.parse(this.payment.filter||'{}')
                this.restoreUserPag(this.filterArc,this.filter)
                this.filterAll.typeDebtor=(this.filter.AdditionalFilters.typeDebtor.length==this.TypeDebtorInDebtorCreditArr.length)||(this.filter.AdditionalFilters.typeDebtor.length==0)
                this.filterAll.nameDelo=(this.filter.AdditionalFilters.name_delo.length==this.VidRecoverInDebtorCreditArr.length)||(this.filter.AdditionalFilters.name_delo.length==0)
                this.filterSetsTypeDebtor()
                this.filterSetsNameDelo()
                this.filterAll.statusGr=this.filter.AdditionalFilters.pensioner.length==2
                this.filterAll.typeDelo=this.filter.AdditionalFilters.typeCp.length==2
                this.$root.$emit('set_filter_payment_filter',this.filter.fields)
                this.getDataPaymentAlls(this.payment)
            })

        }
    }


</script>

<style lang="scss">
    .filters_modal .vs-popup{
        width: 900px;
    }
    .filters_modal .vs-progress-primary {
        margin-top: 7px;
    }
    #page-user-list {
    .user-list-filters {
    .vs__actions {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-58%);
    }
    }
    }
</style>
