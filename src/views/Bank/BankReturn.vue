<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium ml-1 mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalCredits - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalCredits }} of {{ TotalCredits }}</span>
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
                    <vs-button type="border" class="pull-right" style="padding: 0.75rem !important;height: 38px;"  @click="$router.push('/bank/other_return_sa')">Файлы</vs-button>
                </div>

                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="User.pag.credit.find" @input="updateSearchQuery" placeholder="Поиск..." />
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
                    :rowData="CreditsArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="true"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl"
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
    import ImportExcel from '@/components/excel/ImportExcel.vue'
    import OpenCreditStatus from '../Debtor/Render/OpenCreditStatus.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            ImportExcel,
            OpenCreditStatus,
        },
        data () {
            return {
                status:'Все',
                statusFilter: { label: 'Все', value: 'all' },
                statusOptions: [
                    { label: 'Все', value: 'all' },
                    { label: 'Ошибки', value: 'Ошибки' },

                ],

                results: null,
                help: 'Necessary columns are: login, firstname and lastname',
                tableData: [],
                header: [],
                sheetName: '',
                searchQuery: '',

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
                        headerName: 'Место СА',
                        headerTooltip: 'Место СА',
                        tooltipField: 'find_sa',
                        field: 'find_sa',
                        filter: true,
                        hide:false,
                        width: 180
                    },
                    {
                        headerName: 'Взыскатель',
                        headerTooltip: 'Взыскатель',
                        tooltipField: 'recover',
                        field: 'recover',
                        filter: true,
                        hide:false,
                        width: 180
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
                    OpenCreditStatus,
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
                    return Math.ceil(this.TotalCredits/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                        return this.User.pag.credit.limit
            },
            ...mapGetters([
                'CreditsArr','TotalCredits','StatussArrAndAll','User'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryCreditsOffset(val-1)
                    this.getDataCreditsSendSa(this.User.pag.credit);
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },

        },
        methods: {
            setStatus(index){
              this.status=this.StatussArrAndAll[index].name
                this.User.pag.credit.status=this.StatussArrAndAll[index].id

                this.getDataCreditsSendSa(this.User.pag.credit);
            },
            ...mapMutations([
                'setQueryCreditsLimit','setQueryCreditsOffset'

            ]),
            changePag(pag){

                this.User.pag.credit.limit=pag
                this.setDataUser()
                this.getDataCreditsSendSa(this.User.pag.credit);
                this.setQueryCreditsLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },
            onrowDoubleClicked(event){
                this.$router.push('/credit/'+event.data.id)
            },
            setColumnFilter (column, val) {
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
            saveColumn(){
                axios.post(r("setting.index"), {
                    params: {
                        method: 'saveColumnDefs',
                        param:  this.columnDefs

                    }
                }).then((response) => {
                    if (response.data.result){

                    }


                })
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

            ...mapActions([
                'getDataCreditsSendSa','getDataStatuss','setDataUser'
            ]),
            updateSearchQuery (val) {
                this.User.pag.credit.find=val

                this.getDataCreditsSendSa(this.User.pag.credit);

            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        },
        mounted () {

            this.getDataStatuss();
            this.gridApi = this.gridOptions.api

            this.getDataCreditsSendSa(this.User.pag.credit);
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
