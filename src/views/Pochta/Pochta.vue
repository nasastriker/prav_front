<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalPochta - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalPochta }} of {{ TotalPochta }}</span>
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
                    <vs-input class="mb-4 md:mb-0 mr-4"  v-model="User.pag.pochta.find" @input="updateSearchQuery" placeholder="Поиск..." />
                  <vs-button class="btnx" color="danger" type="gradient" @click="update">Обновить</vs-button>
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="PochtasArr"
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
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
    </div>

</template>

<script>
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import moment from 'moment';
    export default {
        components: {
        },
        data () {
            return {
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
                        headerTooltip: 'ID',
                        tooltipField: 'id',
                        filter: true,
                        width: 30
                    },
                    {
                      headerName: 'Дата',
                      field: 'date',
                      headerTooltip: 'Дата',
                      tooltipField: 'date',
                      filter: true,
                      width: 120,
                      cellRenderer: params => moment(params.value).format('DD.MM.YYYY')
                    },

                    {
                        headerName: 'Получатель',
                        headerTooltip: 'Получатель',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 250
                    },
                    {
                      headerName: 'Адрес',
                      field: 'address',
                      headerTooltip: 'Адрес',
                      tooltipField: 'address',
                      filter: true,
                      width: 250
                    },
                    {
                      headerName: 'Почта ID',
                      headerTooltip: 'Почта ID',
                      tooltipField: 'pochta_id',
                      field: 'pochta_id',
                      filter: true,
                      width: 250
                    },
                    {
                        headerName: 'Cтатус',
                        headerTooltip: 'Cтатус',
                        tooltipField: 'status',
                        field: 'status',
                        filter: true,
                        width: 300
                    },





                ],

                // Cell Renderer Components
                components: {
                }
            }
        },

        computed: {

            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalPochta/this.paginationPageSize)
                else return 100
            },
            paginationPageSize () {
                return this.User.pag.pochta.limit
            },

            ...mapGetters([
                'PochtasArr','TotalPochta','User'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryPochtaOffset(val-1)
                    this.getDataPochtaArr(this.User.pag.pochta);
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
                'setQueryPochtaOffset','setQueryPochtaLimit'

            ]),

            changePag(pag){

                this.User.pag.pochta.limit=pag
                this.setDataUser()
                this.getDataPochtaArr(this.User.pag.pochta);
                this.setQueryPochtaLimit(pag);
                this.gridApi.paginationSetPageSize(pag)


            },

            onrowDoubleClicked(event){
              this.$router.push('/credit/'+event.data.id_credit)
            },
            loadS(){
                //
            },
            ...mapActions([
                'getDataPochtaArr','setDataUser','getArbitrRegionsArr'
            ]),
            update(){
              this.getDataPochtaArr(this.User.pag.pochta);
            },
            updateSearchQuery (val) {
                this.User.pag.pochta.find=val
                this.getDataPochtaArr(this.User.pag.pochta);

            },

            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        },
        mounted () {

            this.getDataPochtaArr(this.User.pag.pochta);
            this.gridApi = this.gridOptions.api
            this.gridApi.paginationSetPageSize(this.User.pag.pochta.limit)
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
