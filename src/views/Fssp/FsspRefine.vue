<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalDebtorRefines - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalDebtorRefines }} of {{ TotalDebtorRefines }}</span>
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
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4"  v-model="User.pag.refine.find" @input="updateSearchQuery" placeholder="Поиск..." />
                </div>
            </div>
            <div class="flex flex-wrap justify-between items-center" style="margin-top: 0px">


            </div>
            <!-- AgGrid Table -->
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="DebtorRefinesArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="true"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    @rowDoubleClicked="onrowDoubleClicked"
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
    import OpenCreditStatus from '../Debtor/Render/OpenCreditStatus.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
        components: {
            OpenCreditStatus
        },
        data () {
            return {
                chang:true,
                cessPrav:[
                    { name: 'Все', id: -1 },
                    { name: 'Правеж', id: 1 },
                    { name: 'Остальные', id: 0 },

                ],
                statusFilter: { label: 'Все', value: 'all' },
                statusOptions: [
                    { label: 'Все', value: 'all' },
                    { label: 'Ошибки', value: 'Ошибки' },

                ],
                region:'Все',
                recover:'Все',
                results: null,
                help: 'Necessary columns are: login, firstname and lastname',
                tableData: [],
                header: [],
                sheetName: '',
                searchQuery: '',
                status:'Все',
                // AgGrid
                gridApi: null,
                gridOptions: {

                    alwaysShowVerticalScroll:true
                },
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: '№ Договора',
                        headerTooltip: 'Номер договора',
                        tooltipField: 'number_dog',
                        field: 'number_dog',
                        filter: true,
                        hide:false,
                        width: 180
                    },

                    {
                        headerName: 'Статус',
                        field: 'id_status',
                        hide: false,
                        filter: true,
                        width: 200,

                        cellRendererFramework: 'OpenCreditStatus'
                    },

                    {
                        headerName: 'Фамилия',
                        headerTooltip: 'Фамилия',
                        tooltipField: 'name_family',
                        field: 'name_family',
                        filter: true,
                        hide:false,
                        width: 180
                    },
                    {
                        headerName: 'Имя',
                        headerTooltip: 'Имя',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        hide:false,
                        width: 150
                    },

                    {
                        headerName: 'Отчество',
                        headerTooltip: 'Отчество',
                        tooltipField: 'name_patronymic',
                        field: 'name_patronymic',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Email',
                        headerTooltip: 'Email',
                        tooltipField: 'email',
                        field: 'email',
                        filter: true,
                        hide:false,
                        width: 200
                    },
                    {
                        headerName: 'Телефон',
                        headerTooltip: 'Телефон',
                        tooltipField: 'phone',
                        field: 'phone',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                ],

                // Cell Renderer Components
                components: {
                    OpenCreditStatus
                }
            }
        },
        watch: {

            statusFilter (obj) {

                this.setColumnFilter('status', obj.value)
            },

        },
        computed: {


            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalDebtorRefines/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                return this.User.pag.fssp_refine.limit
            },

            ...mapGetters([
                'DebtorRefinesArr','TotalDebtorRefines','StatussArr','User','StatussDebtorArrAndAll','RegionArr'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryFsspRefineOffset(val-1)
                    this.getDataDebtorRefines(this.User.pag.fssp_refine);
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
            changePag(pag){

                this.User.pag.fssp_refine.limit=pag
                this.setDataUser()
                this.getDataDebtorRefines(this.User.pag.fssp_refine);
                this.setQueryRefineLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },

            onrowDoubleClicked(event){

                    this.$router.push('/fssp_refine/'+event.data.id)


            },
            setColumnFilter (column, val) {
                //console.log(column);
                const filter = this.gridApi.getFilterInstance(column)
                let modelObj = null

                if (val !== 'all') {
                    modelObj = { type: 'equals', filter: val }
                }

                filter.setModel(modelObj)
                this.gridApi.onFilterChanged()
            },
            resetColFilters () {
                // Reset Grid Filter
                this.gridApi.setFilterModel(null)
                this.gridApi.onFilterChanged()

                // Reset Filter Options
                this.roleFilter = this.statusFilter = this.isVerifiedFilter = this.departmentFilter = { label: 'All', value: 'all' }

                this.$refs.filterCard.removeRefreshAnimation()
            },


            hideCol(index){

                this.columnDefs[index].hide=!this.columnDefs[index].hide;
                let a=this.columnDefs

                this.columnDefs=JSON.parse(JSON.stringify(a))
                this.saveColumn();
            },

            onValidate(results) {
                this.results = results;
            },
            ...mapMutations([
                'setQueryRefineLimit','setQueryFsspRefineOffset'

            ]),
            ...mapActions([
                'getDataDebtorRefines','getDataStatuss','setDataUser','getRegion','getDataReestrsAndPravDogovor'
            ]),
            updateSearchQuery (val) {
                this.User.pag.fssp_refine.find=val

                this.getDataDebtorRefines(this.User.pag.fssp_refine);

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
            this.User.pag.fssp_refine.status=61
            this.getDataDebtorRefines(this.User.pag.fssp_refine);



        }
    }


</script>
<style>
    .scroll ul.vs-component.vs-dropdown--menu {
        height: 85vh;
        overflow-y: scroll;
    }
</style>

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
    .ag-row{
        height: 23px!important;

        padding: 0px!important; margin: 0px!important;
    }
    .ag-cell{

        padding: 0px!important; margin: 0px!important;

    }
    .ag-header-row{
        height: 26px!important;
    }
    .ag-theme-material .ag-cell {
        line-height:15px!important;
    }

</style>
