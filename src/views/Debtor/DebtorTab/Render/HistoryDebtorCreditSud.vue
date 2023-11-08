<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="vx-row" >
                <div class="vx-col ">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalDebtorCreditSudLogs - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalDebtorCreditSudLogs }} of {{ TotalDebtorCreditSudLogs }}</span>
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

                <div class="vx-col" style="margin-right: 0rem !important;">
                    <vs-input style="margin-right: 0rem !important;" class="mb-4 md:mb-0 mr-4" v-model="historyDebtorCreditSudView.find" @input="updateSearchQuery" placeholder="Поиск..." />

                </div>
                <div class="vx-col 1" >
                            <span style="max-width: 40px;">
                            <img src="/loading.gif" v-if="LogsFindFlag" style="max-width: 40px; margin-top: 5px;">
                            </span>
                </div>
            </div>

            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="LogsDebtorCreditSudHistoryArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :enableBrowserTooltips="true"
                    :floatingFilter="true"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
            >
            </ag-grid-vue>
            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>

    </div>
</template>

<script>
    import { mapActions,mapGetters,mapMutations } from 'vuex'

    export default {
        components: {
        },
        props:['id'],
        data () {
            return {
                historyDebtorCreditSudView:{
                    offset:0,
                    limit:100,
                    find:'',
                    id_credit:0,
                },

                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [


                    {
                        headerName: 'Пользователь',
                        field: 'user_name',
                        headerTooltip: 'Пользователь',
                        tooltipField: 'user_name',
                        // filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Название переменной',
                        headerTooltip: 'Название переменной',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 300,
                    },
                    {
                        headerName: 'Старое значение',
                        headerTooltip: 'Старое значение',
                        tooltipField: 'old_value',
                        field: 'old_value',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Новое значение',
                        headerTooltip: 'Новое значение',
                        tooltipField: 'new_value',
                        field: 'new_value',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Дата изменения',
                        headerTooltip: 'Пользователь',
                        tooltipField: 'date',
                        field: 'date',
                        filter: true,
                        width: 150,
                    },

                ],

                components: {
                }

            }
        },
        mounted(){
            this.gridApi = this.gridOptions.api
            this.getDataUser().then(res=>{
                this.User.pag.historyDebtorCreditSudView.id_credit=this.id
                this.User.pag.historyDebtorCreditSudView.find=''
                this.setDataUser().then(res=>{
                    this.getDebtorCreditSudHistoryArr(this.User.pag.historyDebtorCreditSudView);
                    this.historyDebtorCreditSudView=this.User.pag.historyDebtorCreditSudView;
                })

            })

        },
        computed: {

            ...mapGetters([
                'LogsDebtorCreditSudHistoryArr','User','TotalDebtorCreditSudLogs','LogsFindFlag'

            ]),
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalDebtorCreditSudLogs/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 20
            },
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
            ...mapActions([
                'getDebtorCreditSudHistoryArr','getDataUser','setDataUser'
            ]),
            ...mapMutations([
            ] ),
            changePag(pag){
                this.User.pag.historyDebtorCreditSudView.limit=pag
                this.setDataUser().then((response)=>{
                    this.getDebtorCreditSudHistoryArr(this.User.pag.historyDebtorCreditSudView);
                })
                this.gridApi.paginationSetPageSize(pag)

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
            onColumnResized(params) {
                params.api.resetRowHeights();
            },
            onColumnVisible(params) {
                params.api.resetRowHeights();
            },
            updateSearchQuery (val) {
                this.gridApi.setQuickFilter(val)
            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        }

    }
</script>

<style>

</style>