<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalFuncShedule - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalFuncShedule }} of {{ TotalFuncShedule }}</span>
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
                    <label class="mb-4 md:mb-0 mr-4" style="right: 100px; color: red">Время сервера {{ServerDateShedule}}</label>
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />

                    <vs-button color="success" class="pull-right" type="filled"  @click="$router.push('/adm/funcshedule/new')">Новая функция</vs-button>

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
                    :rowData="FuncSheduleArr"
                    :enableBrowserTooltips="true"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :suppressPaginationPanel="true"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
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
    import Status from './Render/StatusSheduler.vue'
    import Open from './Render/OpenSheduler.vue'
    import OpenLink from './Render/OpenFuncShedule.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
        components: {
            Status,
            Open,
            OpenLink
        },

        data () {
            return {

                // Filter Options

     //           user:'',
                searchQuery: '',
     //           status:'Все',
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
                        width: 60
                    },
                    {
                        headerName: 'Название функции',
                        field: 'func_name',
                        filter: true,
                        width: 500
                    },
                    {
                        headerName: 'Статус',
                        field: 'status',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'Status',
                        cellRendererParams: {
                          go_refresh_shed: this.refreshRecordsSheduler.bind(this)
                        }

                    },
                    {
                        headerName: 'Время запуска',
                        field: 'time',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Периодичность',
                        field: 'PeriodText',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Дата следующего запуска',
                        field: 'RunDate',
                        filter: true,
                        width: 200,

                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenLink'
                    },


                ],

                // Cell Renderer Components
                components: {
                    Status,Open
                }
            }
        },

        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.TotalBanks/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalFuncShedule/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },

            ...mapGetters([
                'FuncSheduleArr','TotalFuncShedule', 'ServerDateShedule'
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
                this.$router.push('/adm/funcshedule/'+event.data.id)
            },
            ...mapMutations([
              //  'setShowTask'
            ]),
            ...mapActions([
              //  'gettask_shedule','getTaskUserStatuss','getDataUsers','setDataUser'
                'getfuncshedule'
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
          refreshRecordsSheduler(){
            this.getfuncshedule();
          },

        },
        mounted () {
            this.gridApi = this.gridOptions.api
            this.getfuncshedule()
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
