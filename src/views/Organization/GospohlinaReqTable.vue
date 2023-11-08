<template>
    <div >
                <div class="vx-card p-6">
                <template v-if="newGPTab==false">
                    <div class="flex flex-wrap justify-between items-center">
                        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                            <vs-dropdown vs-trigger-click class="cursor-pointer">
                                <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                                    <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalGospohlinaReqs - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalGospohlinaReqs }} of {{ TotalGospohlinaReqs }}</span>
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

                            <vs-button color="success" class="pull-right" type="filled"  @click="editValue(-1)">Новый</vs-button>


                        </div>
                    </div>
                    <ag-grid-vue
                            ref="agGridTable"
                            :components="components"
                            :gridOptions="gridOptions"
                            class="ag-theme-material w-100 my-4 ag-grid-table"
                            :columnDefs="columnDefs"
                            :defaultColDef="defaultColDef"
                            :rowData="GospohlinaReqsArr"
                            rowSelection="multiple"
                            :rowDataChanged = "onRowDataChanged"
                            colResizeDefault="shift"
                            @grid-size-changed="onGridSizeChanged"
                            :animateRows="true"
                            :floatingFilter="false"
                            :pagination="true"
                            @rowDoubleClicked="onrowDoubleClicked"
                            :paginationPageSize="paginationPageSize"
                            :suppressPaginationPanel="true"
                            :enableRtl="$vs.rtl"
                            :overlayLoadingTemplate="'Идёт загрузка'"
                            :overlayNoRowsTemplate="'Нет записей'"
                            :enableBrowserTooltips="true">
                    </ag-grid-vue>

                    <vs-pagination
                            :total="totalPages"
                            :max="7"
                            v-model="currentPage" />
                </template>
                <template v-else>
                <gospohlinaReq :id_orgn="id" :id="idGP" @back_click="BackClick"></gospohlinaReq>
                </template>
                </div>

    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import OpenGospohlinaReq from './Render/OpenGospohlinaReq.vue'
    import { mapActions,mapGetters } from 'vuex'
    import gospohlinaReq from './GospohlinaReq.vue'
    export default {

        components: {
            AgGridVue,
            vSelect,
            VueCsvImport,
            OpenGospohlinaReq,
            gospohlinaReq,
        },
        props:['id'],
        data () {
            return {

                // Filter Options
                idGP:-1,
                newGPTab:false,
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
                        headerName: 'Название',
                        headerTooltip: 'Название',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 350
                    },

                    {
                        headerName: 'Плательщик',
                        headerTooltip: 'Плательщик',
                        tooltipField: 'payment_name1',
                        field: 'payment_name1',
                        filter: true,
                        width: 300
                    },
                    {
                        headerName: 'Счет',
                        headerTooltip: 'Счет',
                        tooltipField: 'payment_acc',
                        field: 'payment_acc',
                        filter: true,
                        width: 300
                    },

                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'OpenGospohlinaReq',
                        cellRendererParams: {
                            editValue: this.editValue.bind(this),
                            id_orgn:this.id,
                        },
                    },



                ],
                components: {
                    OpenGospohlinaReq
                }
            }
        },

        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.TotalGospohlinaReqs/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalGospohlinaReqs/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'GospohlinaReqsArr','TotalGospohlinaReqs'

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
            editValue(id){
                this.idGP=id
                this.newGPTab=true

            },
            BackClick(){
                this.newGPTab=false
                this.getDataGospohlinaReqs(this.id)
            },

            onGridSizeChanged(params) {
                if (params.clientWidth > 500) {
                    if(this.gridApi.visible)this.gridApi.sizeColumnsToFit();
                } else {
                    this.columnDefs.forEach(x => {
                        x.width = 300;
                    });
                    this.gridApi.setColumnDefs(this.columnDefs);
                }
            },
            onrowDoubleClicked(event){
                this.editValue(event.data.id)
            },

            ...mapActions([
                'getDataGospohlinaReqs',
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
            this.getDataGospohlinaReqs(this.id);
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
