<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">


                <div class="vx-col w-2/3">
                    <div class="vx-row">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="cursor-pointer flex items-center justify-between font-medium mr-4 ml-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalImportTasks - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalImportTasks }} of {{ TotalImportTasks }}</span>
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
                </div>

                <div class="vx-col w-1/3  mb-2 " style="    text-align: end;">
                    <!--   <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." /> -->


                </div>


            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="ImportTasksArr"
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
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import Status from './Render/Status.vue';
    import axios from '../../axios'
    import OperationRender from './Render/OperationImportFromFolderRender.vue'
    export default {
        components: {
            AgGridVue,
            vSelect,
            VueCsvImport,
            Status,
            OperationRender,
        },
        data () {
            return {
                searchQuery: '',
                csv:[],
                // AgGrid
                gridApi: null,
                gridOptions: {

                },
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'ID',
                        headerTooltip: 'ID',
                        tooltipField: 'id',
                        field: 'id',
                        filter: true,
                        width: 50
                    },

                    {
                        headerName: 'Имя',
                        headerTooltip: 'Имя',
                        tooltipField: 'recover',
                        field: 'recover',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Количество Имп.',
                        headerTooltip: 'Количество импортов',
                        tooltipField: 'count',
                        field: 'count',
                        filter: true,
                        width: 100,
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'status',
                        field: 'status',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'Status'
                    },

                    {
                        headerName: 'Файл',
                        headerTooltip: 'Файл',
                        tooltipField: 'file',
                        field: 'file',
                        filter: true,
                        width: 300,
                    },
                    {
                        headerName: 'Папка',
                        headerTooltip: 'Папка',
                        tooltipField: 'folder',
                        field: 'folder',
                        filter: true,
                        width: 200,
                    },
                    {
                        headerName: 'Дата',
                        headerTooltip: 'Дата',
                        tooltipField: 'created_at',
                        field: 'created_at',
                        filter: true,
                        width: 150,
                    },

                    {
                        headerName: 'Операции',
                        headerTooltip: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 50,
                        cellRendererFramework: 'OperationRender'
                    },

                ],
                // Cell Renderer Components
                components: {
                    Status, OperationRender
                }
            }
        },
        computed: {
            channel(){
                return this.$echo.join("updateImportTask-channel");
            },
            totalPages () {
                //   console.log(Math.ceil(this.TotalImportTasks/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalImportTasks/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.importTask!='undefined') {
                                return this.User.pag.importTask
                            }
                            else return 100
                        }
                        else return 100
                    }
                    else return 100
                }
                else return 100
            },
            ...mapGetters([
                'ImportTasksArr','TotalImportTasks','User','ImportTasksArrHistory'
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
            onrowDoubleClicked(event){
              //  console.log(this.ImportTasksArrHistory);
                this.$router.push('/import_folder/'+event.data.id)
            },
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
            reload(e){
               this.setImportTasksOne(e.data)
            },
            changePag(pag){
                if(this.User.pag==null){
                    this.User.pag={
                        importTask:100
                    }
                }
                this.User.pag.importTask=pag
                this.setDataUser()
                this.gridApi.paginationSetPageSize(pag)
            },

            ...mapMutations([
                'setImportTasksOne'
            ]),
            ...mapActions([
                'getDataImportTasks','setDataUser','getDataUser'
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
            this.channel.listen(".UpdateImportTask", (e) => this.reload(e));
            this.gridApi = this.gridOptions.api
            this.getDataUser();
            this.getDataImportTasks();
        }
    }
</script>
<style>
    .router-view {
        padding: 1.2rem;
    }
    .ag-theme-material.w-100.my-4.ag-grid-table {
        /*height: 80vh;*/
    }
    .ag-theme-material .ag-ltr .ag-cell {
        border-right: 1px solid #bfbfbf!important;
    }
    .ag-theme-material .ag-row {
        border-color: #bfbfbf!important;
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
