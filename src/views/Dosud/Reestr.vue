<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-3 cursor-pointer flex items-center justify-between font-medium" style="border: 1px solid #ccc;border-radius: 4px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalReestrs - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalReestrs }} of {{ TotalReestrs }}</span>
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
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="ReestrsArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl"
                    @grid-size-changed="onGridSizeChanged"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true">
            </ag-grid-vue>
            <transition name="fade">
                <div class="tablePreloader outer-div" v-if="ReestrFindFlag">
                    <img class="load-bar" src="/loading.gif">
                    <span>Идёт загрузка</span>
                </div>
            </transition>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import Open from './Render/OpenReestr.vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        components: {
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
                    flex: 1,
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [

//                    {
//                        headerName: 'ID',
//                        field: 'id',
//                        filter: true,
//                        width: 100
//                    },
                    {
                        headerName: 'Взыскатель',
                        headerTooltip: 'Взыскатель',
                        tooltipField: 'nameRecDoc',
                        field: 'nameRecDoc',
                        filter: true,
                        //cellRendererFramework: 'OpenJudicialName'
                    },

                    {
                        headerName: 'Количество',
                        headerTooltip: 'Количество',
                        tooltipField: 'count',
                        field: 'count',
                        filter: true,
                        width: 180
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Кол. текущее',
                        headerTooltip: 'Количество текущее',
                        tooltipField: 'count_tek',
                        field: 'count_tek',
                        filter: true,
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Создан',
                        headerTooltip: 'Создан',
                        tooltipField: 'created_at',
                        field: 'created_at',
                        filter: true,
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Операции',
                        headerTooltip: 'Операции',
                        field: 'id',
                        filter: true,
                        cellRendererFramework: 'Open',
                        width: 180
                    },

                ],

                // Cell Renderer Components
                components: {
                    Open,
                }
            }
        },

        computed: {
            channel(){
                return this.$echo.join("reload-channel");
            },
            totalPages () {
                //   console.log(Math.ceil(this.TotalReestrs/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalReestrs/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 10
            },
            ...mapGetters([
                'ReestrsArr','TotalReestrs','ReestrFindFlag'
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
                this.$router.push('/dosud/reestr/'+event.data.id)
            },


            ...mapActions([
                'getDataReestrs',
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
            reload(e){
                if(e.data=='reestr'){
                    this.getDataReestrs()
                }
            }

        },
        mounted () {
            this.gridApi = this.gridOptions.api
            this.channel.listen(".Reload", (e) => this.reload(e));
            this.getDataReestrs();
        }
    }

</script>

<style scoped>
    .ag-theme-material .ag-cell {
        line-height: 19px !important;
        padding: 0 5px!important;
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
</style>
