<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalEmailMesss - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalEmailMesss }} of {{ TotalEmailMesss }}</span>
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
                    <span style="max-width: 40px;">
                            <img src="/loading.gif" v-if="EmailLoadingIconStatusFlag" style="max-width: 40px; margin-top: 5px;margin-right:10px">
                            </span>
                    <vs-input class="mb-4 md:mb-0" v-model="User.pag.email.find"  @input="updateSearchQuery" placeholder="Поиск..." />
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="EmailMesssArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    @rowDoubleClicked="onrowDoubleClicked"
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
    import OpenLink from './Render/Open.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import moment from 'moment';
    export default {
        components: {
            OpenLink,
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
                        headerTooltip: 'ID',
                        tooltipField: 'id',
                        field: 'id',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Отправитель',
                        headerTooltip: 'Отправитель',
                        tooltipField: 'sender',
                        field: 'sender',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Email',
                        headerTooltip: 'Email',
                        tooltipField: 'email',
                        field: 'email',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Сообщение',
                        headerTooltip: 'Сообщение',
                        tooltipField: 'mess',
                        field: 'mess',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Имя файла',
                        headerTooltip: 'Имя файла',
                        tooltipField: 'filename',
                        field: 'filename',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'status',
                        field: 'status',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Просмотренно',
                        headerTooltip: 'Просмотренно',
                        tooltipField: 'status_show',
                        field: 'status_show',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Дата',
                        headerTooltip: 'Дата',
                        tooltipField: 'created_at',
                        field: 'created_at',
                        filter: true,
                        width: 100,
                      cellRenderer: params => moment(params.value).format('DD.MM.YYYY')
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 100,
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
                    return Math.ceil(this.TotalEmailMesss/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User.pag.email=='undefined'){
                    return this.User.pag.email={
                        offset:0,

                        limit:100
                    }
                }
                if(typeof this.User.pag.email.limit=='undefined'){
                    this.User.pag.email.limit=100
                }
                return this.User.pag.email.limit

            },

            ...mapGetters([
                'EmailMesssArr','TotalEmailMesss','User','EmailLoadingIconStatusFlag'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryEmailOffset(val-1)
                    this.getDataEmailMesss(this.User.pag.email);
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },
//            currentPage: {
//                get () {
//                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
//                    else return 1
//                },
//                set (val) {
//                    if(typeof this.User.pag.email=='undefined'){
//                         this.User.pag.email={
//                            offset:0,
//
//                            limit:100
//                        }
//                    }
//                    console.log('ggg')
//                    this.User.pag.email.offset=(val)*this.User.pag.email.limit
//                    this.setDataUser().then((response) => {
//                        this.getDataEmailMesss(this.User.pag.email);
//                    })
//                    this.gridApi.paginationGoToPage(val )
//                }
//            },


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
            changePag(pag){
                if(typeof this.User.pag.email=='undefined'){
                    this.User.pag.email={
                        offset:0,
                        limit:100
                    }
                }
                this.User.pag.email.limit=pag

                this.setDataUser().then((response) => {
                    this.getDataEmailMesss(this.User.pag.email);

                })


                this.gridApi.paginationSetPageSize(pag)
            },
            onrowDoubleClicked(event){
                this.$router.push('/adm/email/'+event.data.id)
            },
            ...mapMutations([
                'setQueryEmailOffset'

            ]),
            ...mapActions([
                'getDataEmailMesss','setDataUser'
            ]),
            updateSearchQuery (val) {
                this.User.pag.email.find=val

                this.getDataEmailMesss(this.User.pag.email);

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

//            this.getDataEmailMesss(this.User.pag.email);
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
