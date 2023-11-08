<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <div class="vx-row" >
                        <div class="vx-col mt-2 1">
                            <Back></Back>
                        </div>
                        <div class="vx-col 1">
                            <vs-dropdown vs-trigger-click class="cursor-pointer">
                                <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                                    <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ total - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : total }} of {{ total }}</span>
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
                        <div class="vx-col 2" style="    min-width: 250px;">
                            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="CurStatus"  v-model="status" @input="setStatus" ></v-select>
                        </div>
                        <div class="vx-col 3">
                            <h3 style="margin-bottom: 15px">{{name}}</h3>
                        </div>

                    </div>
                </div>
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="data"
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
    import Back from '../../components/Back.vue'
    import Status from './Render/Status.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            AgGridVue,
            vSelect,
            Status,
            Back,
            VueCsvImport,
        },
        data () {
            return {
                status:-1,
                CurStatus:[
                    {
                        id:-1,
                        name:'Все',
                    },
                    {
                        id:0,
                        name:'Поиск',
                    },
                    {
                        id:1,
                        name:'Проблемный',
                    },
                    {
                        id:2,
                        name:'Обработан',
                    },
                    {
                        id:3,
                        name:'Дубликат',
                    },
                ],
                data:[],
                dataAll:[],
                total:0,
                name:'',

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



                ],

                components: {
                    Status
                }
            }
        },

        computed: {

            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.total/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                return this.User.pag.reestr_import.limit
            },

            ...mapGetters([
                'User',

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
            setStatus(){

                if(this.status==null){
                    this.status=-1
                }
                this.data=[];
                if(this.status==-1){
                    this.data=this.dataAll;
                }else{
                    for (let i = 0; i < this.dataAll.length; i++) {
                        if(this.dataAll[i].status==this.status){
                            this.data.push(this.dataAll[i])
                        }
                    }
                }


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
            ...mapMutations([

            ]),
            changePag(pag){


                this.gridApi.paginationSetPageSize(pag)
            },


            onrowDoubleClicked(event){

                this.$router.push('/debtors/'+event.data.id_credit)
            },

            ...mapActions([
              'setDataUser'
            ]),

            getData(){
                {
                    axios.get(r("updateData.index"), {
                        params: {
                            method: 'getUpdateDataId',
                            param: this.$route.params.id
                        }
                    }).then((response) => {
                        if(response.data.result){
                            let first =response.data.data.data[0]
                            this.columnDefs.push(   {
                                headerName: 'Статус',
                                field: 'status',
                                filter: true,
                                width: 120,
                                cellRendererFramework: 'Status'

                            })
                            for (let key in first) {
                                this.columnDefs.push(  {
                                    headerName: key,
                                    field: key,
                                    filter: true,
                                    width: 120,

                                },)
                            }
                            this.columnDefs.push(  {
                                headerName: 'id_credit',
                                field: 'id_credit',
                                filter: true,
                                width: 120,

                            },)


                            this.data=response.data.data.data
                            this.dataAll=response.data.data.data
                            this.total=response.data.data.count
                            this.name=response.data.data.name

                        }




                    })


                }
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
            this.getData();
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
