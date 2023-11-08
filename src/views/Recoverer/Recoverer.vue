<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalRecoverers - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalRecoverers }} of {{ TotalRecoverers }}</span>
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

                        <div class="dropdown-button-container">
                            <vs-button class="btnx" color="danger" type="gradient" @click="$router.push('/recoverer/new')">Новый взыскатель</vs-button>

                            <vs-dropdown>
                                <vs-button class="btn-drop" color="danger" type="gradient" icon="more_horiz"></vs-button>
                                <vs-dropdown-menu>
                                    <vs-dropdown-item>
                                        <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="$router.push('/recoverer_shab')">Шаблоны</vs-button>
                                        <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="$router.push('/recoverer_task')">Задачи</vs-button>
                                    </vs-dropdown-item>



                                </vs-dropdown-menu>
                            </vs-dropdown>
                        </div>





                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="RecoverersArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    :floatingFilter="false"
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
    import OpenRecoverer from './Render/OpenRecoverer.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            OpenRecoverer,
        },
        data () {
            return {
                results: null,
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
                        headerName: 'ID',
                        field: 'id',
                        filter: true,
                        width: 50
                    },
                    {
                        headerName: 'Название',
                        headerTooltip: 'Название',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 300
                    },
                    {
                        headerName: 'Телефон',
                        headerTooltip: 'Телефон',
                        tooltipField: 'phone',
                        field: 'phone',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Email',
                        headerTooltip: 'Email',
                        tooltipField: 'email',
                        field: 'email',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Примечание',
                        headerTooltip: 'Примечание',
                        tooltipField: 'prim',
                        field: 'prim',
                        filter: true,
                        width: 250
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'OpenRecoverer'
                    },



                ],

                // Cell Renderer Components
                components: {
                    OpenRecoverer,
                }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalRecoverers/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'RecoverersArr','TotalRecoverers','User'

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
                this.$router.push('/recoverer/'+event.data.id)
            },
            ...mapMutations([
                'setShowShabRecEdit','setEditShabRecEdit',
            ]),
            ...mapActions([
                'getDataRecoverers','getDataAtrDebtorCredits','getTypesDcDocuments'
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
            this.getDataAtrDebtorCredits();
            this.setShowShabRecEdit(false)
            this.setEditShabRecEdit(0)
            this.gridApi = this.gridOptions.api
            this.getDataRecoverers();
        }
    }


</script>

<style lang="scss">
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
    .con-vs-pagination{
        margin-right: 40px!important;
    }

</style>

