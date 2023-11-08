<template>
    <div id="page-service-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <!-- ITEMS PER PAGE -->
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalServices - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalServices }} of {{ TotalServices }}</span>
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

                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                  <div class="pull-right" style="margin-right: 10px">
                    <img src="/loading.gif" v-if="ServicesLoadingFlag" style="max-width: 40px; margin-top: 5px;">
                  </div>
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button color="primary" style="margin-right: 10px" class="pull-right" type="filled"  @click="refresh">Обновить</vs-button>
                    <vs-button color="success" class="pull-right" type="filled"  @click="newService">+ Новый Сервис</vs-button>
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
                    :rowData="ServiceArr"
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
                    :rowClassRules="rowClassRules"
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
    import OpenService from "./Render/OpenService.vue";
    import { mapActions,mapGetters } from 'vuex'
    export default {
        components: {
            OpenService,
        },
        data () {
            return {

                // Filter Options


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
                        headerName: 'Сервис',
                        headerTooltip: 'Сервис',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'URL',
                        headerTooltip: 'URL',
                        tooltipField: 'url',
                        field: 'url',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Порт',
                        headerTooltip: 'Порт',
                        tooltipField: 'port',
                        field: 'port',
                        filter: true,
                        width: 100
                    },
                    // {
                    //     headerName: 'active',
                    //     field: 'active',
                    //     filter: true,
                    //     width: 150
                    // },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'OpenService'
                    },
                ],

                components: {
                    OpenService,
                }
            }
        },

      created() {
        this.rowClassRules = {
          'row-act': (params) => {
            var id_active = params.data.active;
            return id_active === 1;
          },
          'row-fail': (params) => {
            var id_active = params.data.active;
            return id_active === 2;
          },
        };
      },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalServices/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 10
            },
            ...mapGetters([
                'ServiceArr','TotalServices','ServicesLoadingFlag'

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
          refresh(){
            this.getDataServices();
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
                this.$router.push('/adm/services_info/'+event.data.id)
            },
            newService(){
                this.$router.push('/adm/services/new')
            },
            ...mapActions([
                'getDataServices',
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

            this.getDataServices();
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

    .row-act {
      background-color: #00FF00;
    }
    .row-fail {
      background-color: #FA8072;
    }
</style>
