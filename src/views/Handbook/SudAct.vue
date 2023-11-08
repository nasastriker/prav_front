<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalSudAct - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalSudAct }} of {{ TotalSudAct }}</span>
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
                    <vs-input class="mb-4 md:mb-0 mr-4"  v-model="User.pag.judicial.find" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button color="success" class="pull-right" type="filled"  @click="$router.push('/handbook/sud-act/new')">Новый закон</vs-button>
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="SudActArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
            @rowDoubleClicked="onrowDoubleClicked"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    :enableRtl="$vs.rtl"
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
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import OpenJudicial from './Render/OpenJudicialAct.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
        components: {
            AgGridVue,
            vSelect,
            OpenJudicial,
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
                        headerName: 'id_region',
                        headerTooltip: 'ID Региона',
                        tooltipField: 'id_region',
                        field: 'id_region',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'name_region',
                        headerTooltip: 'Название региона',
                        tooltipField: 'name_region',
                        field: 'name_region',
                        filter: true,
                        width: 200,
                    },
                    {
                        headerName: 'url',
                        headerTooltip: 'Ссылка на сайт',
                        tooltipField: 'url',
                        field: 'url',
                        filter: true,
                        width: 200
                    },

                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'OpenJudicial'
                    },



                ],

                // Cell Renderer Components
                components: {
                    OpenJudicial,
                }
            }
        },

        computed: {

            totalPages () {
                //   console.log(Math.ceil(this.TotalBanks/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalSudAct/this.paginationPageSize)
                else return 100
            },
            paginationPageSize () {
                return this.User.pag.sudAct.limit
            },

            ...mapGetters([
                'SudActArr','TotalSudAct','User'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQuerySudActOffset(val-1)
                    this.getDataSudActs(this.User.pag.sudAct);
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
            ...mapMutations([
                'setQuerySudActOffset','setQuerySudActLimit'

            ]),

            changePag(pag){

                this.User.pag.sudAct.limit=pag
                this.setDataUser()
                this.getDataSudActs(this.User.pag.sudAct);
                this.setQuerySudActLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },

            onrowDoubleClicked(event){
                this.$router.push('/handbook/sud-act/'+event.data.id)
            },
            loadS(){
                console.log(this.csv)
            },
            ...mapActions([
                'getDataSudActs','setDataUser'
            ]),
            updateSearchQuery (val) {
                this.User.pag.sudAct.find=val

                this.getDataSudActs(this.User.pag.sudAct);

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
            this.gridApi.paginationSetPageSize(this.User.pag.sudAct.limit)
            this.getDataSudActs(this.User.pag.sudAct);
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
