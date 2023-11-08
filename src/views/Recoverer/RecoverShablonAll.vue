<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <div class="vx-row">
                        <div class="vx-col">
                            <vs-dropdown vs-trigger-click class="cursor-pointer">
                                <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                                    <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalShablonDocuments - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalShablonDocuments }} of {{ TotalShablonDocuments }}</span>
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
                        <div class="vx-col 3"  style="    min-width: 250px;">

                            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="RecoverersArrOpt"
                                       v-model="id_recover"  @input="filterByCession" ></v-select>
                        </div>


                    </div>



                </div>
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">

                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button class="btnx" color="danger" type="gradient" @click="$router.push('/recoverer_shab/new')">Новый шаблон</vs-button>

                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="ShablonDocumentsArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl"
                    :overlayLoadingTemplate="'Идёт загрузка'"
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
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Open from './Render/OpenShablonRecover.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
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

                id_recover:null,
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
                        headerTooltip: 'Имя',
                        tooltipField: 'shablon_name',
                        field: 'shablon_name',
                        filter: true,
                        width: 350,
                        //cellRendererFramework: 'OpenJudicialName'
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
                    Open,
                }
            }
        },

        computed: {

            totalPages () {
             //   console.log(Math.ceil(this.TotalShablonDocuments/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalShablonDocuments/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'ShablonDocumentsArr','TotalShablonDocuments','RecoverersArr','User','RecoverersArrOpt'

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
            filterByCession(){

                this.User.pag.recShabAll=this.id_recover;

                this.setDataUser().then((response)=>{
                    this.getDataShablonDocumentRecovers(this.User.pag.recShabAll)
                })

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
            onColumnResized(params) {
                params.api.resetRowHeights();
            },
            onColumnVisible(params) {
                params.api.resetRowHeights();
            },
            onrowDoubleClicked(event){
                this.setEditShabRecEdit(event.data.id)
                this.$router.push('/recoverer_shab/'+event.data.id)
            },
            ...mapMutations([
                'setEditShabRecEdit',
            ]),
            ...mapActions([
                'getDataShablonDocumentRecovers','getDataShablonNames','getDataReestrsAndCession','setDataUser'
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
            if(typeof this.User.pag.recShabAll!='undefined'){
                if(this.User.pag.recShabAll!=''&&this.User.pag.recShabAll!=null){
                    this.id_recover=this.User.pag.recShabAll;
                    this.getDataShablonDocumentRecovers(this.User.pag.recShabAll)
                }else{
                    this.getDataShablonDocumentRecovers();
                }

            }else{
                this.getDataShablonDocumentRecovers();
            }
            this.gridApi = this.gridOptions.api
            this.getDataReestrsAndCession();

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
