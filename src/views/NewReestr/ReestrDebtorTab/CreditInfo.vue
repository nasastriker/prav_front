<template>
    <fieldset class="f mt-4">
        <legend class="l px-4 mb-2">Иванов Иван Иванович, 11.05.1966 <span class="ml-2 font-semibold cursor-pointer" @click="" style="color: rgb(239, 68, 68);">Copy</span></legend>
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
        <!-- AgGrid Table-->
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                style="height:400px"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="CreditInfo"
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
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [

                    {
                        headerName: 'Взыскатель',
                        headerTooltip: 'Взыскатель',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Цедент',
                        headerTooltip: 'Цедент',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Номер цессии',
                        headerTooltip: 'Номер цессии',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 120
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
                        width: 150
                    },
                    {
                        headerName: 'Этап стратегии',
                        headerTooltip: 'Этап стратегии',
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
                        width: 100
                    },
                    {
                        headerName: 'Срок возврата ',
                        headerTooltip: 'Срок возврата ',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Сумма займа',
                        headerTooltip: 'Сумма займа',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Остаток долга + ГП',
                        headerTooltip: 'Остаток долга + ГП',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Сумма платежей',
                        headerTooltip: 'Сумма платежей',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Сумма последнего платежа',
                        headerTooltip: 'Сумма последнего платежа',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Дата последнего платежа',
                        headerTooltip: 'Дата последнего платежа',
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
                'CreditInfo'
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
