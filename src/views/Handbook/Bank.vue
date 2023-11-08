<template>
    <div id="page-user-list">
        <div class="p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalBanks - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalBanks }} of {{ TotalBanks }}</span>
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
                    <vs-dropdown vs-trigger-click class="cursor-pointer" >
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{filt}}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>


                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                        <vs-dropdown-menu class="scroll">
                            <template v-for="(item,index) in DatArr">
                                <vs-dropdown-item @click="setFilt(index)">
                                    <span>{{ item.name }}</span>
                                </vs-dropdown-item>
                            </template>

                        </vs-dropdown-menu>
                    </vs-dropdown>

                </div>
                <vs-input class="mb-4 md:mb-0 mr-4" style="width: 60%" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-button color="success" class="pull-right" type="filled"  @click="$router.push('/handbook/bank/new')">Новый банк</vs-button>
                </div>
            </div>

            <!-- AgGrid Table -->
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table vh70"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="BanksArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
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
    import Open from './Render/OpenBank.vue'
    import EditPriory from './Render/EditPriory.vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        components: {
            AgGridVue,
            vSelect,
            Open,
            EditPriory,
            VueCsvImport,
        },
        data () {
            return {

                // Filter Options
                filt:'Все',
                DatArr:[
                    {
                        id:0,
                        name:'Все'
                    },
                    {
                        id:1,
                        name:'С приоритетом'
                    },



                ],
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
                        width: 100
                    },
                    {
                        headerName: 'Номер',
                        headerTooltip: 'Номер',
                        tooltipField: 'reg_number',
                        field: 'reg_number',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Приоритет',
                        headerTooltip: 'Приоритет',
                        tooltipField: 'priority',
                        field: 'priority',
                        filter: true,
                        width: 100,
                     //   cellRendererFramework: 'EditPriory'
                    },
                    {
                        headerName: 'Имя',
                        headerTooltip: 'Имя',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 250,
                        //cellRendererFramework: 'OpenJudicialName'
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
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'Open'
                    },
                ],

                // Cell Renderer Components
                components: {
                    Open,EditPriory
                }
            }
        },

        computed: {
            totalPages () {
             //   console.log(Math.ceil(this.TotalBanks/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalBanks/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'BanksArr','TotalBanks','User'

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
            setFilt(index){
                this.filt=this.DatArr[index].name
                if(typeof this.User.pag.bank=='undefined'){
                    this.User.pag.bank={}
                }
                this.User.pag.bank.filt=this.DatArr[index].id
                this.setDataUser()
                this.getDataBanks(this.User.pag.bank);
            },

            onrowDoubleClicked(event){
                this.$router.push('/handbook/bank/'+event.data.id)
            },
            ...mapActions([
                'getDataBanks','setDataUser'
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

            this.getDataBanks(this.User.pag.bank);
        }
    }

</script>

<style lang="scss">
  .vh70{
      max-height: 70vh!important;
  }
</style>
