<template>

    <div id="page-user-list">



        <div class="vx-card p-6">

            <div class="flex flex-wrap justify-between items-center">

               <!-- <div data-v-356c3cc8="" class="vx-col w-full flex flex-wrap" style="justify-content: flex-start;">-->

                <!-- ITEMS PER PAGE -->
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <div class="vx-row">
                        <div class="vx-col flex">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="p-3 cursor-pointer flex items-center justify-between font-medium" style="margin-top: 10px;border: 1px solid #ccc;border-radius: 4px;margin-right: 10px;">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalRequestUsers - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalRequestUsers }} of {{ TotalRequestUsers }}</span>
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


                        <div style="margin-right: 10px; min-width: 250px;">
                            <div class="centerx">
                                <vs-tooltip text="Фильтр по статусам" position="top" >
                                    <h6 class="h6Blue mb-1">Статус</h6>
                                </vs-tooltip>
                            </div>
                            <v-select  class="w-50 " style="margin-bottom: 10px;min-width: 100px" :reduce="label => label.id" label="name" :options="RequestUsersStatusList"   v-model="requestUsersStatus" @input="inputStatusList" ></v-select>
                        </div>

                        <div style="margin-right: 10px; min-width: 250px;">
                            <div class="centerx">
                                <vs-tooltip text="Наименование" position="top" >
                                    <h6 class="h6Blue mb-1">Наименование</h6>
                                </vs-tooltip>
                            </div>
                            <v-select  class="w-50 " style="margin-bottom: 10px;min-width: 100px" :reduce="label => label.id" label="name" :options="RequestUsersNameList"   v-model="requestUsersName" @input="inputNameList" ></v-select>
                        </div>
                        </div>
                        
                    </div>
                </div>


                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />


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
                    :rowData="RequestUsersArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true">
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
    import { VueCsvImport } from 'vue-csv-import';
    import Open from './Render/OpenRequestUser.vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        components: {
            Open,
            VueCsvImport,
            ImportExcel,
        },
        data () {
            return {

                // Filter Options

                requestUsersStatus:0,
                requestUsersName:0,
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
                        headerName: 'Запрос',
                        headerTooltip: 'Запрос',
                        tooltipField: 'request_name',
                        field: 'request_name',
                        filter: true,
                        width: 300,
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'name_status',
                        field: 'name_status',
                        filter: true,
                        width: 150,
                        //cellRendererFramework: 'OpenJudicialName'
                    },

                    {
                        headerName: 'Создан',
                        headerTooltip: 'Создан',
                        tooltipField: 'created_at',
                        field: 'created_at',
                        filter: true,
                        width: 250,
                        //cellRendererFramework: 'OpenJudicialName'
                    },



                    {
                        headerName: 'Операции',
                        headerTooltip: 'Операции',
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
            channel(){
                return this.$echo.join("reload-channel");
            },
            totalPages () {
                //   console.log(Math.ceil(this.TotalRequestUsers/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalRequestUsers/this.paginationPageSize)
                else return 0
            },

            paginationPageSize () {


            if(typeof this.User.pag.requestUser!='undefined'&&
                typeof this.User.pag.requestUser.paginationPageSize!='undefined') {
                return this.User.pag.requestUser.paginationPageSize
            }
            return 100

            },
            ...mapGetters([
                'RequestUsersArr','TotalRequestUsers','User','RequestUsersNameList','RequestUsersStatusList',

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
            inputNameList(){
                if(this.requestUsersName===null)this.requestUsersName=0
                this.User.pag.requestUser.request=this.requestUsersName
                this.setDataUser().then(res=>{
                    this.getDataRequestUsers(this.User.pag.requestUser)
                })
            },
            inputStatusList () {

                if(this.requestUsersStatus===null)this.requestUsersStatus=0
                this.User.pag.requestUser.requestUsersStatus=this.requestUsersStatus
                this.setDataUser().then(res=>{
                    this.getDataRequestUsers(this.User.pag.requestUser)
                })
            },

            changePag(pag){
                this.User.pag.requestUser.paginationPageSize=pag
                this.setDataUser()
                this.gridApi.paginationSetPageSize(pag)
            },

            onrowDoubleClicked(event){
                this.$router.push('/dosud/request/'+event.data.id)
            },

            ...mapActions([
                'getDataRequestUsers','setDataUser','getRequestUsersNameList','getRequestUsersStatusList','getDataUser'
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
                if(e.data=='requestUser'){
                    this.getDataRequestUsers(this.User.pag.requestUser)
                }
            }

        },
        mounted () {
            this.getRequestUsersNameList()
            this.getRequestUsersStatusList()
            this.gridApi = this.gridOptions.api
            this.channel.listen(".Reload", (e) => this.reload(e));
            this.getDataUser().then(res=>{
                if(typeof this.User.pag.requestUser.requestUsersStatus !=='undefined')this.requestUsersStatus=this.User.pag.requestUser.requestUsersStatus
                if(typeof this.User.pag.requestUser.request !=='undefined')this.requestUsersName=this.User.pag.requestUser.request
                this.getDataRequestUsers(this.User.pag.requestUser)
            })

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
