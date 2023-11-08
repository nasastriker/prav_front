<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium" style="padding: 0.7rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalSudOrders - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalSudOrders }} of {{ TotalSudOrders }}</span>
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
                        <div class="cursor-pointer flex items-center justify-between font-medium ml-4" style="padding: 0.7rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;">
                            <span class="mr-2">Статус {{status}}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>

                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                        <vs-dropdown-menu class="scroll">
                            <template v-for="(item,index) in StatussArrAndAll">
                                <vs-dropdown-item @click="setStatus(index)">
                                    <span>{{ item.name }}</span>


                                </vs-dropdown-item>
                            </template>

                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>


                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="User.pag.sudOrder.find" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button color="success" class="pull-right" type="filled"  @click="downLoad">Скачать</vs-button>



                </div>
            </div>
            <div class="flex flex-wrap justify-between items-center" style="margin-top: 0px">


            </div>
            <!-- AgGrid Table -->
             <div class="out-main">
                <ag-grid-vue
                        ref="agGridTable"
                        :components="components"
                        :gridOptions="gridOptions"
                        class="ag-theme-material w-100 my-4 ag-grid-table"
                        :columnDefs="columnDefs"
                        :defaultColDef="defaultColDef"
                        :rowData="SudOrdersArr"
                        rowSelection="multiple"
                        :rowDataChanged = "onRowDataChanged"
                        colResizeDefault="shift"
                        :animateRows="true"
                        :floatingFilter="true"
                        :pagination="true"
                        :paginationPageSize="paginationPageSize"
                        :suppressPaginationPanel="true"
                        @rowDoubleClicked="onrowDoubleClicked"
                        @grid-size-changed="onGridSizeChanged"
                        :enableRtl="$vs.rtl"
                        :enableBrowserTooltips="true"
                        :overlayNoRowsTemplate="'Нет записей'"
                        :overlayLoadingTemplate="'Идёт загрузка'">
                </ag-grid-vue>
                <transition name="fade">
                    <div class="tablePreloader outer-div" v-if="CorrespondenceFindFlag">
                        <img class="load-bar" src="/loading.gif" style="width: 70px;">
                        <span>Идёт загрузка</span>
                    </div>
                </transition>
            </div>
            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>

    </div>

</template>

<script>
    import ImportExcel from '@/components/excel/ImportExcel.vue'
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import OpenCreditStatus from '../Debtor/Render/OpenCreditStatus.vue'

    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            AgGridVue,
            vSelect,
            ImportExcel,
            OpenCreditStatus,
        },
        beforeMount() {

            this.defaultColDef = { resizable: true };
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
                        headerName: '№ СА расход',
                        headerTooltip: 'Номер судебного акта, расход',
                        tooltipField: 'number_sa_rachod',
                        field: 'number_sa_rachod',
                        filter: true,
                        hide:false,
                        width: 180
                    },

                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'id_status',
                        field: 'id_status',
                        hide: false,
                        filter: true,
                        width: 200,

                        cellRendererFramework: 'OpenCreditStatus'
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
                    return Math.ceil(this.TotalSudOrders/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                        return this.User.pag.sudOrder.limit
            },
            ...mapGetters([
                'SudOrdersArr','TotalSudOrders','StatussArrAndAll','User'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQuerySudOrdersOffset(val-1)
                    this.getDataSudOrders(this.User.pag.sudOrder);
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
            downLoad(){
                axios.get(r("sudOrder.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'downloadSudOrders',
                        param:this.User.pag.bankArch


                    }
                }).then((response) => {


                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));
                    //   console.log(response.headers);
                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    //  console.log(filename);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);




                    document.body.appendChild(link);
                    link.click();


                }).catch(error => {
                    this.$vs.loading.close()
                    //   this.popupActive3=false;
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });

            },
            setStatus(index){
              this.status=this.StatussArrAndAll[index].name
                this.User.pag.sudOrder.status=this.StatussArrAndAll[index].id
                this.setDataUser()
                this.getDataSudOrders(this.User.pag.sudOrder);
            },
            ...mapMutations([
                'setQuerySudOrdersLimit','setQuerySudOrdersOffset'

            ]),
            changePag(pag){

                this.User.pag.sudOrder.limit=pag
                this.setDataUser()
                this.getDataSudOrders(this.User.pag.sudOrder);
                this.setQuerySudOrdersLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },
            onrowDoubleClicked(event){
                this.$router.push('/debtors/'+event.data.id_credit+'#sudOrder')
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
                'getDataSudOrders','getDataStatuss','setDataUser'
            ]),
            updateSearchQuery (val) {
                this.User.pag.sudOrder.find=val
             //   this.setDataUser();
                this.getDataSudOrders(this.User.pag.sudOrder);

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
            for (let i=0;i<this.StatussArrAndAll.length;i++){
                if(this.StatussArrAndAll[i].id==this.User.pag.sudOrder.status){
                    this.status=this.StatussArrAndAll[i].name
                }

            }

            this.getDataSudOrders(this.User.pag.sudOrder);
        }
    }


</script>

<style lang="scss">
    .scroll ul.vs-component.vs-dropdown--menu {
        height: 85vh;
        overflow-y: scroll;
    }
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
