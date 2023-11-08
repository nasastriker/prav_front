<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalArbitrsArea - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalArbitrsArea }} of {{ TotalArbitrsArea }}</span>
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
                    <vs-input class="mb-4 md:mb-0"  v-model="User.pag.arbitrArea.find" @input="updateSearchQuery" placeholder="Поиск..." />
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="ArbitrsAreaArr"
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
    import OpenArbitr from './Render/OpenArbitrAct.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
        components: {
            OpenArbitr,
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
                        width: 30
                    },

                    {
                        headerName: 'Название',
                        headerTooltip: 'Название',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 250
                    },
                    {
                        headerName: 'Сайт',
                        headerTooltip: 'Сайт',
                        tooltipField: 'site',
                        field: 'site',
                        filter: true,
                        width: 300
                    },

                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'OpenArbitr'
                    },



                ],

                // Cell Renderer Components
                components: {
                    OpenArbitr,
                }
            }
        },

        computed: {

            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalArbitrsArea/this.paginationPageSize)
                else return 100
            },
            paginationPageSize () {
                return this.User.pag.arbitrArea.limit
            },

            ...mapGetters([
                'ArbitrsAreaArr','TotalArbitrsArea','User'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryArbitrAreaOffset(val-1)
                    this.getDataArbitrAreas(this.User.pag.arbitrArea);
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
            ...mapMutations([
                'setQueryArbitrAreaOffset','setQueryArbitrAreaLimit'

            ]),

            changePag(pag){

                this.User.pag.arbitrArea.limit=pag
                this.setDataUser()
                this.getDataArbitrAreas(this.User.pag.arbitrArea);
                this.setQueryArbitrAreaLimit(pag);
                this.gridApi.paginationSetPageSize(pag)


            },

            onrowDoubleClicked(event){
                this.$router.push('/handbook/arbitr-act/'+event.data.id)
            },
            loadS(){
                //
            },
            ...mapActions([
                'getDataArbitrAreas','setDataUser','getArbitrRegionsArr'
            ]),
            updateSearchQuery (val) {
                this.User.pag.arbitrArea.find=val
                this.getDataArbitrAreas(this.User.pag.arbitrArea);

            },

            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        },
        mounted () {

            this.getDataArbitrAreas(this.User.pag.arbitrArea);
            this.gridApi = this.gridOptions.api
            this.gridApi.paginationSetPageSize(this.User.pag.arbitrArea.limit)
            this.getArbitrRegionsArr()
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
