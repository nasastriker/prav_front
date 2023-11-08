<template>
        <div id="page-user-list">
            <div class="vx-card p-6">
                <div class="vx-row" >

                    <div class="vx-col ">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalLogs - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalLogs }} of {{ TotalLogs }}</span>
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

                    <div class="vx-col" style="margin-right: 0rem !important;">
                        <vs-input style="margin-right: 0rem !important;" class="mb-4 md:mb-0 mr-4" v-model="historyDebtorCreditView.find" @input="updateSearchQuery" placeholder="Поиск..." />

                    </div>
                    <div class="vx-col 1" >
                            <span style="max-width: 40px;">
                            <img src="/loading.gif" v-if="LogsFindFlag" style="max-width: 40px; margin-top: 5px;">
                            </span>
                    </div>
                </div>



                <!-- AgGrid Table -->
                <ag-grid-vue
                        ref="agGridTable"
                        :components="components"
                        :gridOptions="gridOptions"
                        class="ag-theme-material w-100 my-4 ag-grid-table"
                        :columnDefs="columnDefs"
                        :defaultColDef="defaultColDef"
                        :rowData="LogsDebtorCreditHistoryArr"
                        rowSelection="multiple"
                        :rowDataChanged = "onRowDataChanged"
                        colResizeDefault="shift"
                        :enableBrowserTooltips="true"
                        :animateRows="true"
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
   import OperationDebtorCreditHistory from './OperationDebtorCreditHistory.vue'
    import filterHistoryDebtorCreditView from './filterHistoryDebtorCreditView.vue'
    import { AgGridVue } from 'ag-grid-vue'

    export default {
        components: {
            OperationDebtorCreditHistory,filterHistoryDebtorCreditView,AgGridVue
        },
        props:['id'],
        data () {
            return {
                historyDebtorCreditView:{
                    offset:0,
                    limit:100,
                    find:'',
                    // fields:{},
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
                      headerTooltip: 'Пользователь',
                      tooltipField: 'user_name',
                        field: 'user_name',
                        // filter: true,
                        width: 150,
                        // floatingFilterComponentFramework: 'filterHistoryDebtorCreditView',
                        // floatingFilterComponentParams:{
                        //     type_f: 'string',
                        //     field: 'user_name',
                        //     emitFilter:'clear_filter_historyDebtorCreditView_filter',
                        //     emitSet:'set_filter_historyDebtorCreditView_filter',
                        //     updateSearchField: this.updateSearchField.bind(this)
                        // },
                    },
                    {
                        headerName: 'Название переменной',
                      headerTooltip: 'Название переменной',
                      tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 300,
                        // floatingFilterComponentFramework: 'filterHistoryDebtorCreditView',
                        // floatingFilterComponentParams:{
                        //     type_f: 'string',
                        //     field: 'user_name',
                        //     emitFilter:'clear_filter_historyDebtorCreditView_filter',
                        //     emitSet:'set_filter_historyDebtorCreditView_filter',
                        //     updateSearchField: this.updateSearchField.bind(this)
                        // },
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
                      headerTooltip: 'Дата изменения',
                      tooltipField: 'date',
                        field: 'date',
                        filter: true,
                        width: 150,
                        // floatingFilterComponentFramework: 'filterHistoryDebtorCreditView',
                        // floatingFilterComponentParams:{
                        //     type_f: 'date',
                        //     field: 'user_name',
                        //     emitFilter:'clear_filter_historyDebtorCreditView_filter',
                        //     emitSet:'set_filter_historyDebtorCreditView_filter',
                        //     updateSearchField: this.updateSearchField.bind(this)
                        // },
                    },

                    // {
                    //     headerName: 'Операции',
                    //     field: 'status',
                    //     // filter: true,
                    //     width: 150,
                    //    cellRendererFramework: 'OperationDebtorCreditHistory'
                    // },

                ],

                // Cell Renderer Components
                components: {
                   OperationDebtorCreditHistory,filterHistoryDebtorCreditView
                }

            }
        },
        mounted(){
            this.gridApi = this.gridOptions.api
            this.getDataUser().then(res=>{
                this.User.pag.historyDebtorCreditView.id_credit=this.id
                this.User.pag.historyDebtorCreditView.find=''
                this.setDataUser().then(res=>{
                    this.getDebtorCreditHistoryArr(this.User.pag.historyDebtorCreditView);
                    this.historyDebtorCreditView=this.User.pag.historyDebtorCreditView;
                })

            })

        },
        computed: {

            ...mapGetters([
                'LogsDebtorCreditHistoryArr','User','TotalLogs','LogsFindFlag'

            ]),
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalLogs/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                // return this.User.pag.historyDebtorCreditView.limit
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 20
            },
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    // this.setQueryHistoryDebtorCreditViewOffset(val-1)
                    // this.getDebtorCreditHistoryArr(this.User.pag.historyDebtorCreditView);
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },

        },
        methods: {
            ...mapActions([
                'getDebtorCreditHistoryArr','getDataUser','setDataUser'
            ]),
            ...mapMutations([
            // 'setQueryHistoryDebtorCreditViewOffset'
           ] ),
            confirmDeleteRecord(id){
                // console.log(id)
            },
            infoRecord(id){

            },
            updateSearchField(findField, findFieldName, findType, not_update=false){
               /* if(!not_update)this.setPaymentFindFlag=true
                this.User.pag.historyDebtorCreditView.find=''
                this.filter.fields[findFieldName] = {
                    find: findField,
                    name: findFieldName,
                    type: findType
                }
                if(!not_update) {
                    this.historyDebtorCreditView.filter=JSON.stringify(this.filter)
                    this.User.pag.historyDebtorCreditView=this.historyDebtorCreditView
                    this.setDataUser().then((response) => {
                        this.getDataPaymentAlls(this.User.pag.payments)
                        //this.setPaymentFindFlag=false
                    })
                }*/
            },
            changePag(pag){
                this.User.pag.historyDebtorCreditView.limit=pag
                this.setDataUser().then((response)=>{
                    this.getDebtorCreditHistoryArr(this.User.pag.historyDebtorCreditView);
                })
                this.gridApi.paginationSetPageSize(pag)

            },

            onrowDoubleClicked(event){


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
                // this.User.pag.historyDebtorCreditView.find=this.historyDebtorCreditView.find
                // this.setDataUser().then((response)=>{
                //     this.getDebtorCreditHistoryArr(this.User.pag.historyDebtorCreditView)
                // })

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