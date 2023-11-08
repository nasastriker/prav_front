<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalDebtors - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalDebtors }} of {{ TotalDebtors }}</span>
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
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">Поля</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>

                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                        <vs-dropdown-menu>
                            <template v-for="(item,index) in columnDefs">
                                <vs-dropdown-item @click="hideCol(index)">
                                    <vs-checkbox v-model="item.hide"  >{{ item.headerName }}</vs-checkbox>

                                </vs-dropdown-item>
                            </template>

                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>


                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="User.pag.debtor.find" @input="updateSearchQuery" placeholder="Поиск..." />
                  <!--  <vs-button color="success" class="pull-right" type="filled"  @click="$router.push('/debtor/new')">Новый заемщик</vs-button> -->




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
                    :rowData="DebtorsArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="true"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
            @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl">
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
    import OpenLink from './Render/OpenDebtor.vue'
    import OpenDebtorStatus from './Render/OpenDebtorStatus.vue'
    import OpenDebtorPensioner from './Render/OpenDebtorPensioner.vue'
    import OpenDebtorBankrot from './Render/OpenDebtorBankrot.vue'
    import OpenDebtorAdrReg from './Render/OpenDebtorAdrReg.vue'

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            ImportExcel,
            OpenLink,
            OpenDebtorStatus,
            OpenDebtorPensioner,
            OpenDebtorBankrot,
            OpenDebtorAdrReg,
        },
        data () {
            return {

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
                        headerName: 'Операции',
                        field: 'id',
                        hide:false,

                        filter: false,
                        width: 100,
                        cellRendererFramework: 'OpenLink'
                    },

                    {
                        headerName: 'Статус',
                        field: 'id_status',
                        hide: true,
                        filter: true,
                        width: 200,

                        cellRendererFramework: 'OpenDebtorStatus'
                    },
                    {
                        headerName: 'Фамилия',
                        field: 'name_family',
                        filter: true,
                        hide:false,
                        width: 180
                    },
                    {
                        headerName: 'Имя',
                        field: 'name',
                        filter: true,
                        hide:false,
                        width: 150
                    },

                    {
                        headerName: 'Отчество',
                        field: 'name_patronymic',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Email',
                        field: 'email',
                        filter: true,
                        hide:false,
                        width: 200
                    },
                    {
                        headerName: 'Телефон',
                        field: 'phone',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Дата рождения',
                        field: 'birthdate',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Серия паспорта',
                        field: 'series',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Номер паспорта',
                        field: 'number',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Кем выдан',
                        field: 'given_pass',
                        filter: true,
                        hide:false,
                        width: 350
                    },
                    {
                        headerName: 'Дата выдачи',
                        field: 'pass_date',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'СНИЛС',
                        field: 'snils',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'ИНН',
                        field: 'inn',
                        filter: true,
                        hide:false,
                        width: 150
                    },


                    {
                        headerName: 'Адрес рег',
                        field: 'address_reg',
                        filter: true,
                        hide:false,
                        width: 350
                    },
                    {
                        headerName: 'Адрес рег статус',
                        field: 'data_reg',
                        filter: true,
                        filterParams: {
                            excelMode: 'windows', // can be 'windows' or 'mac'
                        },
                        hide:false,
                        width: 300,
                        cellRendererFramework: 'OpenDebtorAdrReg'

                    },
                    {
                        headerName: 'Адрес факт',
                        field: 'address_fact',
                        filter: true,
                        hide:false,
                        width: 350
                    },
                    {
                        headerName: 'Подсудность',
                        field: 'jud_number',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Гео подсудность',
                        field: 'jud_number_geo',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Банкрот',
                        field: 'bankrot',
                        filter: true,
                        hide:false,
                        width: 150,
                        cellRendererFramework: 'OpenDebtorBankrot'
                    },
                    {
                        headerName: 'Пенсионер',
                        field: 'pensioner',
                        hide:false,
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenDebtorPensioner'
                    },






                ],

                // Cell Renderer Components
                components: {
                    OpenLink,
                    OpenDebtorStatus,
                    OpenDebtorPensioner,
                    OpenDebtorBankrot,
                    OpenDebtorAdrReg,
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
                    return Math.ceil(this.TotalDebtors/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                        return this.User.pag.debtor.limit
            },
            ...mapGetters([
                'DebtorsArr','TotalDebtors','StatussArr','User'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryDebtorsOffset(val-1)
                    this.getDataDebtors(this.User.pag.debtor);
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },

        },
        methods: {
            ...mapMutations([
                'setQueryDebtorsLimit','setQueryDebtorsOffset'

            ]),
            changePag(pag){

                this.User.pag.debtor.limit=pag
                this.setDataUser()
                this.getDataDebtors(this.User.pag.debtor);
                this.setQueryDebtorsLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },
            onrowDoubleClicked(event){
                this.$router.push('/debtor/'+event.data.id)
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
            getColumn(){
                axios.get(r("setting.index"), {
                    params: {
                        method: 'getColumnDefs',
                        param: ''

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.columnDefs=response.data.data;
                    }
                    else{
                        this.saveColumn();
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
                'getDataDebtors','getDataStatuss','setDataUser'
            ]),
            updateSearchQuery (val) {
                this.User.pag.debtor.find=val

                this.getDataDebtors(this.User.pag.debtor);

            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        },
        mounted () {
            this.getColumn();
            this.getDataStatuss();
            this.gridApi = this.gridOptions.api

            this.getDataDebtors(this.User.pag.debtor);

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
