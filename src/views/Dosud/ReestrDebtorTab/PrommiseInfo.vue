<template>
    <fieldset class="f mt-4">
        <legend class="l px-4 mb-2">Иванов Иван Иванович, 11.05.1966 <span class="ml-2 font-semibold cursor-pointer" @click="" style="color: rgb(239, 68, 68);">Copy</span></legend>
        <div class="flex">
            <div class="mr-4 connectionWrapper">
                <vs-button color="primary" class="relative" style="top:-6px;" type="line" @click="promiseModal=true">
                    <feather-icon icon="FolderPlusIcon" class="mr-4" svgClasses="h-6 w-6" style="top: 5px;" />Добавить обещание
                </vs-button>
                
            </div>
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
                        <vs-button class="btn-drop settingsBtn includeIconOnly"  @click="tableControl=true">
                            <feather-icon icon="SettingsIcon" class="cursor-pointer" style="width: 18px;"></feather-icon>
                        </vs-button>
                    </vs-tooltip>
                </div>
            </div>
        </div>
        <vs-popup classContent="selectModal" class="selectModalWrapper debtorContacts" title="Добавить обещание платежа" :active.sync="promiseModal">

            <div class="vx-row">
                <div class="vx-col w-full">
                    <h6 class="mb-1 h6">Выбрать договор должника:</h6>
                    <v-select  class="w-100 mb-4" label="name"></v-select>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-1/2">
                    <h6 class="mb-1 h6">Внести сумму платежа:</h6>
                    <vs-input class="w-100 mb-2" ></vs-input>
                </div>
                <div class="vx-col w-1/2">
                    <h6 class="mb-1 h6">Выбрать дату платежа:</h6>
                    <vs-input class="w-100 datepicker mb-2" type="date"></vs-input>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-full text-right connectionWrapper">
                    <div>
                        <vs-button color="primary" type="line" @click="">
                            <feather-icon icon="PlusSquareIcon" class="mr-4" svgClasses="h-6 w-6" style="top: 5px;" />Добавить платеж
                        </vs-button>
                    </div>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-full text-right">
                    <vs-button class="mt-6 ml-auto successBtn"  @click="promiseModal=false" color="success" type="filled">Сохранить</vs-button>
                </div>
            </div>
        </vs-popup>
        <!-- AgGrid Table-->
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                style="height:400px"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="PaymentsArr"
                rowSelection="multiple"
                :rowDataChanged = "onRowDataChanged"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="true"
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

    </fieldset>
</template>

<script>
    import r from '../../../route';
    import { mapActions,mapGetters, } from 'vuex'
    import { AgGridVue } from 'ag-grid-vue'
    import axios from '../../../axios'
    export default {
        components: {
            AgGridVue,
        },
        data () {
            return {
                promiseModal:false,
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [

                    {
                        headerName: 'Дата Обещания платежа',
                        headerTooltip: 'Дата Обещания платежа',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Срок Обещания платежа',
                        headerTooltip: 'Срок Обещания платежа',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Сумма обещания платежа',
                        headerTooltip: 'Сумма обещания платежа',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Статус обещания платежа',
                        headerTooltip: 'Статус обещания платежа',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Остаток долга + ГП',
                        headerTooltip: 'Остаток долга + ГП',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Номер договора',
                        headerTooltip: 'Номер договора',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Взыскатель',
                        headerTooltip: 'Взыскатель',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Цедент',
                        headerTooltip: 'Цедент',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Номер цессии',
                        headerTooltip: 'Номер цессии',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Стратегия взаимодействия',
                        headerTooltip: 'Стратегия взаимодействия',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Вид взаимодействия',
                        headerTooltip: 'Вид взаимодействия',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Оператор',
                        headerTooltip: 'Оператор',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Действия ',
                        headerTooltip: 'Действия ',
                        tooltipField: '',
                        field: '',
                        width: 100
                    },
                ],
            }
        },
        mounted(){

        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalMinimalPensions/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'PaymentsArr'
            ]),

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


        },
    }
</script>
