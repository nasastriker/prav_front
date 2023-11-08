<template>
    <fieldset class="f mt-4">
        <legend class="l px-4">Иванов Иван Иванович, 11.05.1966 <span class="ml-2 font-semibold cursor-pointer" @click="" style="color: rgb(239, 68, 68);">Copy</span></legend>

            <div class="mt-4">

                <div class="flex flex-wrap justify-between items-center">
                   <!-- <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalPayments - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalPayments }} of {{ TotalPayments }}</span>
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
                    </div>-->
                   <!-- <vs-button v-if="User.accsess_payments" style="margin-left: 15px; margin-right: 25px" color="success" class="pull-right" type="filled"  @click="pop=true">Добавить платеж</vs-button>
                    <div>
                        <h5>Итого: <b>{{ TotalSum }}</b> руб.</h5>
                    </div>-->

                    <!-- <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                        <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    </div> -->
                </div>
                <div class="flex">
                    <div class="mr-4">
                        <div class="centerx">
                            <vs-tooltip text="Обновить таблицу" position="top" >
                                <vs-button @click="refreshShow">
                                    <feather-icon icon="RefreshCwIcon" svgClasses="h-5 w-5 cursor-pointer" />
                                </vs-button>
                            </vs-tooltip>
                        </div>
                    </div>
        
                    <div class="mr-4">
                        <div class="centerx">
                            <vs-tooltip text="Сбросить фильтры" position="top" >
                                <vs-button color="danger" @click="filterReset" >
                                    <feather-icon icon="XCircleIcon" svgClasses="h-5 w-5 cursor-pointer" />
                                </vs-button>
                            </vs-tooltip>
                        </div>
                    </div>
        
                    <div class="settingsBtnWrapper mr-4" >
                        <div class="centerx">
                            <vs-tooltip text="Настройки таблицы" position="top" >
                                <vs-button class="btn-drop settingsBtn"  @click="tableControl=true">
                                    <feather-icon icon="SettingsIcon" class="cursor-pointer" style="width: 18px;"></feather-icon>
                                </vs-button>
                            </vs-tooltip>
                        </div>
                    </div>
                </div>
                <!-- AgGrid Table -->
                <ag-grid-vue
                        ref="agGridTable"
                        :components="components"
                        :gridOptions="gridOptions"
                        class="ag-theme-material my-4 ag-grid-table table-h30"
                        style="height:400px"
                        :columnDefs="columnDefs"
                        :defaultColDef="defaultColDef"
                        :rowData="PaymentsArr"
                        rowSelection="multiple"
                        :rowDataChanged = "onRowDataChanged"
                        colResizeDefault="shift"
                        :animateRows="true"
                        :rowHeight="30"
                        @grid-size-changed="onGridSizeChanged"
                        @column-resized="onColumnResized"
                        @column-visible="onColumnVisible"
                        :floatingFilter="false"
                        :pagination="true"
                        :paginationPageSize="paginationPageSize"
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
            <vs-popup style="min-height: 300px; min-width: 300px;" classContent="popup-example" title="Добавить платеж" :active.sync="pop">
                <div class="vx-row" >

                    <div class="vx-col sm:w-1/2 w-full " >

                                <h6 class="h6" style="margin-top: 5px">Дата платежа:</h6>
                                <vs-input class="w-50"  type="date" v-model="paymentData.date"></vs-input>
                                <h6 class="h6" style="margin-top: 5px">Сумма платежа:</h6>
                                <vs-input class="w-50"  type="number"  @keypress="validateNumber1" v-model="paymentData.sum"></vs-input>
                                <h6 class="h6" style="margin-top: 5px">БИК:</h6>
                                <vs-input class="w-50" type="number"  @keypress="validateNumber"  v-model="paymentData.bic"></vs-input>
                                <h6 class="h6" style="margin-top: 5px">Счет:</h6>
                                <vs-input class="w-50"  v-model="paymentData.account"></vs-input>
                                <h6 class="h6" style="margin-top: 5px">Назначение платежа:</h6>
                                <vs-input class="w-full"  v-model="paymentData.osn"></vs-input>
                                <h6 class="h6" style="margin-top: 5px">Тип платежа:</h6>
                                <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="PaymentsTypeArr"  v-model="paymentData.type"></v-select>

                    </div>
                </div>


                <div style="text-align: center;margin-top: 10px">
                    <vs-button class=""  color="primary" type="filled" @click="SavePayment">Сохранить</vs-button>
                </div>
            </vs-popup>
    </fieldset>

</template>

<script>
    import r from '../../../route'
    import axios from '../../../axios'
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Open from '../../Debtor/DebtorTab/Render/OpenPayment.vue'
    import TypePay from '../../Debtor/DebtorTab/Render/TypePay.vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        props:['id_dogovor'],
        components: {
            AgGridVue,
            vSelect,
            Open,
            TypePay,
            VueCsvImport,
        },
        data () {
            return {

                // Filter Options


                pop:false,
                paymentData:{
                    id_debtor:0,
                    id_credit:0,
                    id_reestr:0,
                    status:0,
                    date:'',
                    account:'',
                    type:1,
                    osn:'',
                    sum:0,
                    bic:0,
                    number:'',
                    fio_load:'',
                },
                searchQuery: '',
                csv:[],
                // AgGrid
                gridApi: null,
                
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                PaymentsArr: [
                    {data: new Date()}
                ], 
                columnDefs: [
                    {
                        headerName: 'Дата платежа',
                        headerTooltip: 'Дата платежа',
                        tooltipField: 'date',
                        field: 'date',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Сумма платежа',
                        headerTooltip: 'Сумма платежа',
                        tooltipField: 'sum',
                        field: 'sum',
                        filter: true,
                        width: 200
                    },

                    {
                        headerName: 'Тип платежа',
                        headerTooltip: 'Тип платежа',
                        tooltipField: 'vh',
                        field: 'vh',
                        filter: true,
                        width: 200,

                    },
                    {
                        headerName: 'Основание',
                        headerTooltip: 'Основание',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 200,

                    },
                    {
                        headerName: 'Остаток долга + ГП',
                        headerTooltip: 'Остаток долга + ГП',
                        tooltipField: 'type',
                        field: '',
                        filter: true,
                        width: 250,
                        cellRendererFramework: 'TypePay'

                    },
                    {
                        headerName: 'Взыскатель',
                        headerTooltip: 'Взыскатель',
                        tooltipField: 'osn',
                        field: '',
                        filter: true,
                        width: 350,

                    },
                    {
                        headerName: 'Цедент',
                        headerTooltip: 'Цедент',
                        tooltipField: 'account',
                        field: '',
                        filter: true,
                        width: 200,

                    },

                    {
                        headerName: 'Номер цессии',
                        headerTooltip: 'Номер цессии',
                        field: '',
                        filter: true,
                        width: 200
                    },

                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        field: '',
                        filter: true,
                        width: 200
                    },

                    {
                        headerName: 'Стратегия взаимодействия',
                        headerTooltip: 'Стратегия взаимодействия',
                        field: '',
                        filter: true,
                        width: 250
                    },

                    {
                        headerName: 'Этап стратегии',
                        headerTooltip: 'Этап стратегии',
                        field: '',
                        filter: true,
                        width: 200
                    },
                    
                    {
                        headerName: 'Номер договора',
                        headerTooltip: 'Номер договора',
                        field: '',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Действия',
                        headerTooltip: 'Действия',
                        field: '',
                        filter: true,
                        width:120,
                        cellStyle: {textAlign: 'center'},
                        template: '<button type="button" name="button" class="vs-component vs-button vs-button-primary vs-button-filled"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-fast-forward vue-feather__content w-4 h-4"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg></button>'
                    },

                    
                    
                ],
                components: {
                    Open,TypePay
                }
            }
        },

        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.TotalPayments/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalPayments/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 10
            },
           /* ...mapGetters([
                'PaymentsArr','TotalPayments','TotalSum','Deb','PaymentsTypeArr','User'

            ]),*/
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },

        },
        methods: {
            SavePayment(){
                axios.post(r("payment.update"), {
                    params: {
                        method: 'savePayment',
                        param: {
                            'id_credit': this.Deb.debtorCredit.id,
                            'id_debtor': this.Deb.debtorCredit.id_debtor,
                            'date': this.paymentData.date,
                            'osn': this.paymentData.osn,
                            'type': this.paymentData.type,
                            'account': this.paymentData.account,
                            'sum': this.paymentData.sum,
                            'number_dog': this.Deb.debtorCredit.number_dog,
                            'фио заемщика':this.Deb.debtor.name_family+' '+this.Deb.debtor.name+' '+this.Deb.debtor.name_patronymic, //??? поле
                            'номер договора': this.Deb.debtorCredit.number_dog, //??? поле
                            'бик': this.paymentData.bic
                        }
                    }

                }).then((response) => {
                        this.getDataPayments(this.id_dogovor);
                        console.log(response)
                        if (response){
                            this.pop=false;
                            this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })


                        }
                        else{
                            this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                        }
                })
            },
            validateNumber: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            validateNumber1: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9,.]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            onColumnResized(params) {
                params.api.resetRowHeights();
            },
            onColumnVisible(params) {
                params.api.resetRowHeights();
            },
            onGridSizeChanged(params) {
              /*  if (params.clientWidth > 500) {
                    this.gridApi.sizeColumnsToFit();
                } else {*/
                    this.columnDefs.forEach(x => {
                        x.width = 300;
                    });
                    this.gridApi.setColumnDefs(this.columnDefs);
                /*}*/
            },
            ...mapActions([
                'getDataPayments','save',
            ]),
            updateSearchQuery (val) {
                this.gridApi.setQuickFilter(val)
            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        },
        mounted () {
            this.gridApi = this.gridOptions.api

            this.getDataPayments(this.id_dogovor);
        }
    }

</script>

<style lang="scss">
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
