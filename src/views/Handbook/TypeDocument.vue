<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalTypesDocs - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalTypesDocs }} of {{ TotalTypesDocs }}</span>
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
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button color="success" class="pull-right" type="filled"  @click="$router.push('/handbook/type_document/new')">Новый тип документа</vs-button>
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="TypesDcDocuments"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    :enableRtl="$vs.rtl"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true">
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
    import Open from './Render/OpenTypeDocument.vue'
    import Func from './Render/UploadFunc.vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        components: {
            AgGridVue,
            vSelect,
            Open,
            Func,
            VueCsvImport,
        },
        data () {
            return {
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
                columnDefs: [
                    {
                        headerName: 'ID',
                        field: 'id',
                        filter: true,
                        width: 50
                    },
                    {
                        headerName: 'Наименование',
                        headerTooltip: 'Наименование',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Имя файла',
                        headerTooltip: 'Имя файла',
                        tooltipField: 'name_file',
                        field: 'name_file',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Название переменной',
                        headerTooltip: 'Название переменной',
                        tooltipField: 'peremen_name',
                        field: 'peremen_name',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Расширение',
                        field: 'type_document',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 80,
                        cellRendererFramework: 'Open'
                    },
                    {
                        headerName: 'Функция',
                        field: 'upload_func',
                        filter: true,
                        width: 80,
                        cellRendererFramework: 'Func'
                    },
                ],
                components: {
                    Open, Func
                }
            }
        },
        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalTypesDocs/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'TypesDcDocuments','TotalTypesDocs'
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
            onrowDoubleClicked(event){
                this.$router.push('/handbook/type_document/' + event.data.id)
            },
            ...mapActions([
                'getTypesDcDocuments',
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
            this.getTypesDcDocuments();
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
