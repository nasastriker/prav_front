<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalFsspOtdelsAll - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalFsspOtdelsAll }} of {{ TotalFsspOtdelsAll }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button color="success" class="pull-right" type="filled"  @click="$router.push('/handbook/fssp_otdels/new')">Новый отдел ФССП</vs-button>
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="FsspOtdelsAll"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    @rowDoubleClicked="onrowDoubleClicked"
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
    import OpenOtdel from './Render/OpenFsspOtdel.vue'
    import { mapActions,mapGetters, mapMutations } from 'vuex'
    export default {
        components: {
            AgGridVue,
            vSelect,
            OpenOtdel,
            VueCsvImport,
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
                        headerTooltip: 'ID',
                        tooltipField: 'id',
                        field: 'id',
                        filter: true,
                        width: 50
                    },
                    {
                        headerName: 'Код',
                        headerTooltip: 'Код',
                        tooltipField: 'fssp_code',
                        field: 'fssp_code',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Наименование',
                        headerTooltip: 'Наименование',
                        tooltipField: 'fssp_name',
                        field: 'fssp_name',
                        filter: true,
                        width: 500
                    },
                    {
                        headerName: 'Адрес',
                        headerTooltip: 'Адрес',
                        tooltipField: 'address',
                        field: 'address',
                        filter: true,
                        width: 600
                    },
                    {
                        headerName: 'Территория',
                        headerTooltip: 'Территория',
                        tooltipField: 'territoty_of_service',
                        field: 'territoty_of_service',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Операции',
                        headerTooltip: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'OpenOtdel'
                    },
                ],
                components: {
                    OpenOtdel,
                }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalFsspOtdelsAll/this.paginationPageSize)
                else return 100

            },
            paginationPageSize () {
                return this.User.pag.fsspOtdels.limit
            },
            ...mapGetters([
                'User','FsspOtdelsAll','TotalFsspOtdelsAll'
            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryFsspOtdelsOffset(val-1)
                    this.getDataFsspOtdelsAll(this.User.pag.fsspOtdels)
                    this.gridApi.paginationGoToPage(val-1)


                }
            },
        },
        methods: {
            onrowDoubleClicked(event){
                this.$router.push('/handbook/fssp_otdels/'+event.data.id)
            },
            ...mapMutations([
                'setQueryFsspOtdelsOffset','setQueryFsspOtdelsLimit'

            ]),

            ...mapActions([
                'setDataUser','getDataFsspOtdelsAll'
            ]),
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
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
            changePag(pag){

                this.User.pag.fsspOtdels.limit=pag
                this.setDataUser()
                this.getDataFsspOtdelsAll(this.User.pag.fsspOtdels);
                this.setQueryFsspOtdelsLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },
            updateSearchQuery (val) {
                this.User.pag.fsspOtdels.find=val
                this.setDataUser().then((response) => {
                    this.getDataFsspOtdelsAll(this.User.pag.fsspOtdels);

                })

            },


        },
        mounted () {

            this.User.pag.fsspOtdels.find=''
            this.searchQuery=this.User.pag.fsspOtdels.find
            this.getDataFsspOtdelsAll(this.User.pag.fsspOtdels)
            this.updateSearchQuery('');
            this.gridApi = this.gridOptions.api
            this.gridApi.paginationSetPageSize(this.User.pag.fsspOtdels.limit)

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
