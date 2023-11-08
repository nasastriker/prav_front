<template>
    <div >
                <div class="vx-card p-6">
                    <div class="flex flex-wrap justify-between items-end">
                        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left" >
                            <div class="vx-row">
                            <div class="vx-col">
                            <vs-dropdown vs-trigger-click class="cursor-pointer">
                                <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 18px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                                    <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalCessions - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalCessions }} of {{ TotalCessions }}</span>
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
                            <div class="vx-col">
                                <h6 class="mb-1" style="color:dodgerblue">Организация</h6>
                                <v-select  class="w-50"   style="min-width: 200px;" :reduce="label => label.id" label="name" :options="OrganizationListFilterArrAll"  v-model="filters.id_orgn" @input="FilterByCession"></v-select>
                            </div>
                            <div class="vx-col">
                                <h6 class="mb-1" style="color:dodgerblue">Цедент</h6>
                                <v-select  class="w-50"   style="min-width: 200px;" :reduce="label => label.id" label="name" :options="CessionFilterInCessionArr"  v-model="filters.id_recover" @input="FilterByCession" ></v-select>
                            </div>

                            </div>
                        </div>

                        <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                            <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                            <div class="dropdown-button-container">
                                <vs-button class="btnx" color="danger" type="gradient" style="border-radius: 6px;" @click="$router.push('/cession/new')">Новый договор</vs-button>
                                <template v-if="User.email=='amitx@list.ru'">
                                    <vs-dropdown>
                                        <vs-button class="btn-drop" color="danger" type="gradient" icon="more_horiz"></vs-button>
                                        <vs-dropdown-menu>
                                            <vs-dropdown-item>
                                                <vs-button class="mb-4 md:mb-0 mr-4"  color="primary"  style="min-width: 200px;right:10px" @click="$router.push('/recoverer_shab')">Шаблоны</vs-button>
                                                <vs-button class="mb-4 md:mb-0 mr-4"  color="primary"   style="min-width: 200px;right:10px; margin-top: 5px" @click="$router.push('/recoverer_task')">Задачи</vs-button>
                                            </vs-dropdown-item>



                                        </vs-dropdown-menu>
                                    </vs-dropdown>
                                </template>
                            </div>


                        </div>
                    </div>
                    <ag-grid-vue
                            ref="agGridTable"
                            :components="components"
                            :gridOptions="gridOptions"
                            class="ag-theme-material w-100 my-4 ag-grid-table"
                            :columnDefs="columnDefs"
                            :defaultColDef="defaultColDef"
                            :rowData="CessionsArr"
                            rowSelection="multiple"
                            :rowDataChanged = "onRowDataChanged"
                            colResizeDefault="shift"
                            :animateRows="true"
                            :floatingFilter="false"
                            :pagination="true"
                            @rowDoubleClicked="onrowDoubleClicked"
                            @grid-size-changed="onGridSizeChanged"
                            @column-resized="onColumnResized"
                            @column-visible="onColumnVisible"
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

                </div>

    </div>

</template>

<script>
    import OpenCession from './Render/OpenCession.vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {

        components: {
            OpenCession,
        },
        data () {
            return {
                filters:{
                 id_recover:-1,
                 name_recover:'',
                 id_orgn:-1
                },
                // Filter Options
                cessionFilter:'',
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
                        width: 50
                    },

                    {
                        headerName: 'Номер договора',
                        field: 'number',
                        filter: true,
                        width: 250
                    },

                    {
                        headerName: 'Дата',
                        field: 'date',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Организация',
                        field: 'organization',
                        filter: true,
                        width: 300
                    },
                    {
                        headerName: 'Цедент',
                        field: 'name',
                        filter: true,
                        width: 300
                    },

                    {
                        headerName: 'Примечание',
                        field: 'prim',
                        filter: true,
                        width: 250
                    },


                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'OpenCession'
                    },



                ],
                components: {
                    OpenCession
                }
            }
        },

        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.TotalCessions/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalCessions/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'CessionsArr','TotalCessions','CessionFilterInCessionArr','OrganizationListFilterArr','OrganizationListFilterArrAll','User'

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
            FilterByCession(){
                if(this.filters.id_orgn===null)this.filters.id_orgn=-1
                if(this.filters.id_recover===null)this.filters.id_recover=-1
                this.filters.name_recover=this.CessionFilterInCessionArr.find(org=> org.id==this.filters.id_recover).name
                this.User.pag.filterByCession=this.filters
                this.setDataUser()
                this.getDataFilterInCession({filters: this.filters})

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
            onrowDoubleClicked(event){
                this.$router.push('/cession/'+event.data.id)
            },

            ...mapActions([
                'getDataCessions','getCessionFilterInCessionArr','getDataFilterInCession','getOrganizationListFilterArr','getOrganizationListFilterArr',
                'setDataUser','getDataUser'
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
            this.getDataUser().then(res=>{
                if(typeof this.User.pag.filterByCession!=='undefined'){
                    this.filters.id_recover=this.User.pag.filterByCession.id_recover||-1
                    this.filters.name_recover=this.User.pag.filterByCession.name_recover||''
                    this.filters.id_orgn=this.User.pag.filterByCession.id_orgn||-1
                }
                //this.getDataCessions();
                this.getCessionFilterInCessionArr()
                this.getOrganizationListFilterArr()
                this.getDataFilterInCession({filters: this.filters})

            })

        }
    }

</script>

<style lang="scss">
    .dropdown-button-container {
        display: flex;
        align-items: center;

    .btnx {
        border-radius: 5px 0px 0px 5px;
    }

    .btn-drop {
        border-radius: 0px 5px 5px 0px;
        border-left: 1px solid rgba(255, 255, 255, .2);
    }
    }
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
