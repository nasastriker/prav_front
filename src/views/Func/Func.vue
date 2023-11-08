<template>
    <div id="page-user-list" >
        <template v-if="!ShowEditFunc">
            <div class="vx-card p-6">
                <div class="flex flex-wrap justify-between items-center">
                    <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalFuncs - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalFuncs }} of {{ TotalFuncs }}</span>
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
                        <vs-input style="min-width: 400px;" class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    </div>
                    <vs-button color="success" class="pull-right" type="filled"  @click="newFunc">Новая функция</vs-button>
                </div>

                <!-- AgGrid Table -->
                <ag-grid-vue
                        ref="agGridTable"
                        :components="components"
                        :gridOptions="gridOptions"
                        class="ag-theme-material w-100 my-4 ag-grid-table"
                        :columnDefs="columnDefs"
                        :defaultColDef="defaultColDef"
                        :rowData="FuncsArr"
                        rowSelection="multiple"
                        :rowDataChanged = "onRowDataChanged"
                        colResizeDefault="shift"
                        :animateRows="true"
                        :floatingFilter="false"
                        :pagination="true"
                        :paginationPageSize="paginationPageSize"
                @rowDoubleClicked="onrowDoubleClicked"
                        @grid-size-changed="onGridSizeChanged"
                :suppressPaginationPanel="true"
                :enableRtl="$vs.rtl">
                </ag-grid-vue>

                <vs-pagination
                        :total="totalPages"
                        :max="7"
                        v-model="currentPage" />

            </div>
        </template>
        <template v-else>
            <FuncID></FuncID>
        </template>

    </div>

</template>

<script>
    import OpenLink from './Render/OpenFunc.vue'
    import FuncID from './FuncID.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    export default {
        components: {
            OpenLink,
            FuncID,
        },
        props: {
            name: {
                default: '',
                type: String
            },
        },
        data () {
            return {

                // Filter Options


                searchQuery: '',

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
                        headerName: 'Название',
                        field: 'name',
                        filter: true,
                        width: 250
                    },
                    {
                        headerName: 'Функция',
                        field: 'function',
                        filter: true,
                        width: 400
                    },

                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 80,
                        cellRendererFramework: 'OpenLink'
                    },



                ],

                // Cell Renderer Components
                components: {
                    OpenLink,
                }
            }
        },

        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.TotalBanks/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalFuncs/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'FuncsArr','TotalFuncs','ShowEditFunc','EditFunc'

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
            newFunc(){
                this.setShowEditFunc(true)
            },
            onrowDoubleClicked(event){
                this.setShowEditFunc(true)
                this.setEditFunc(event.data.id)


            },
            ...mapActions([
                'getDataFuncs',
            ]),
            ...mapMutations([
                'setEditFunc','setShowEditFunc'
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
          onGridSizeChanged(params) {
            if (params.clientWidth > 200) {
              this.gridApi.sizeColumnsToFit();
            } else {
              this.columnDefs.forEach(x => {
                x.width = 300;
              });
              this.gridApi.setColumnDefs(this.columnDefs);
            }
          },

        },
        mounted () {
            this.gridApi = this.gridOptions.api

            this.getDataFuncs(this.name).then((response)=>{

              this.updateSearchQuery(this.searchQuery)
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
