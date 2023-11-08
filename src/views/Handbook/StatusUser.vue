
<template>

    <div id="page-user-list">
        <div class="vx-card p-6">

            <div class="flex flex-wrap justify-between items-center">

                <!-- ITEMS PER PAGE -->
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalUserStatuss - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalUserStatuss }} of {{ TotalUserStatuss }}</span>
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
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button color="success" class="pull-right" type="filled"  @click="$router.push('/handbook/status_user/new')">Новый Статус</vs-button>


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
                    :rowData="UserStatussArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
            @grid-size-changed="onGridSizeChanged"
            @column-resized="onColumnResized"
            @column-visible="onColumnVisible"
            @rowDoubleClicked="onrowDoubleClicked"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :suppressPaginationPanel="true"
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
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Open from './Render/OpenStatusUser.vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        components: {
            AgGridVue,
            vSelect,
            Open,
            VueCsvImport,
        },
        data () {
            return {

                // Filter Options


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
                        headerName: 'Имя',
                        field: 'name',
                        filter: true,
                        width: 200
                    },




                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'Open'
                    },



                ],

                // Cell Renderer Components
                components: {
                    Open,
                }
            }
        },

        computed: {
            totalPages () {
             //   console.log(Math.ceil(this.TotalUserStatuss/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalUserStatuss/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'UserStatussArr','TotalUserStatuss'

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
                this.$router.push('/handbook/status_user/'+event.data.id)
            },
            ...mapActions([
                'getDataUserStatuss',
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

            this.getDataUserStatuss();
        }
    }

</script>

<style lang="scss">
    .con-vs-pagination{
        margin-right: 40px!important;
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
</style>
