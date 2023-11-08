<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalWorkActions - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalWorkActions }} of {{ TotalWorkActions }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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

                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button color="success" class="pull-right" type="filled"  @click="$router.push('/work_actions/new')">Новое Действие</vs-button>
                    <vs-button style="margin-left: 10px" color="success" class="pull-right" type="filled"  @click="$router.push('/crm_sections/new')">Новый Раздел СРМ</vs-button>
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="WorkActionsArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    @grid-size-changed="onGridSizeChanged"
                    @rowDoubleClicked="onrowDoubleClicked"
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
    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Open from './Render/OpenWA.vue'
    import InstructionFile from './Render/InstructionFile.vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        components: {
            AgGridVue,
            vSelect,
            Open,
            VueCsvImport,
            InstructionFile
        },
        data () {
            return {
                searchQuery: '',
                csv:[],
                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'ID',
                        field: 'id',
                        filter: true,
                        width: 50
                    },
                    {
                        headerName: 'Имя',
                        headerTooltip: 'Имя',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Раздел СРМ',
                        headerTooltip: 'Раздел СРМ',
                        tooltipField: 'crm_section',
                        field: 'crm_section',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Таблица БД',
                        headerTooltip: 'Таблица БД',
                        tooltipField: 'tabel_name',
                        field: 'tabel_name',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Переменная',
                        headerTooltip: 'Переменная',
                        tooltipField: 'peremen_name',
                        field: 'peremen_name',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'KPI неделя',
                        headerTooltip: 'KPI неделя',
                        tooltipField: 'kpi_week',
                        field: 'kpi_week',
                        filter: true,
                        width: 70
                    },
                    {
                        headerName: 'KPI месяц',
                        headerTooltip: 'KPI месяц',
                        tooltipField: 'kpi_month',
                        field: 'kpi_month',
                        filter: true,
                        width: 70
                    },
                    {
                        headerName: 'KPI всего',
                        headerTooltip: 'KPI всего',
                        tooltipField: 'kpi_all',
                        field: 'kpi_all',
                        filter: true,
                        width: 70
                    },
                    {
                        headerName: 'Инструкция',
                        headerTooltip: 'Инструкция',
                        tooltipField: 'i_data',
                        field: 'i_data',
                        filter: true,
                        width: 50,
                        cellRendererFramework: 'InstructionFile'
                    },
                    {
                        headerName: '',
                        field: 'id',
                        filter: true,
                        width: 30,
                        cellRendererFramework: 'Open'
                    },
                ],
                components: {
                    Open, InstructionFile
                }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalWorkActions/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'WorkActionsArr','TotalWorkActions'

            ]),
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
            onrowDoubleClicked(event){
                this.$router.push('/work_actions/'+event.data.id)
            },
            ...mapActions([
                'getDataWorkActions',
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
            this.getDataWorkActions();
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
