<template>
    <div >
                <div slot="header">
                    Платежы по договору ОТП:
                </div>
                <div class="">

                    <div class="flex flex-wrap justify-between items-center">
                        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                            <vs-dropdown vs-trigger-click class="cursor-pointer">
                                <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                                    <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalOtp - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalOtp }} of {{ TotalOtp }}</span>
                                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                                </div>
                                <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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

                    <!-- AgGrid Table -->
                    <ag-grid-vue
                            ref="agGridTable"
                            :components="components"
                            :gridOptions="gridOptions"
                            class="ag-theme-material w-100 my-4 ag-grid-table"
                            :columnDefs="columnDefs"
                            :defaultColDef="defaultColDef"
                            :rowData="OtpArr"
                            rowSelection="multiple"
                            :rowDataChanged = "onRowDataChanged"
                            colResizeDefault="shift"
                            :animateRows="true"
                            :floatingFilter="false"
                            :pagination="true"
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
    import { VueCsvImport } from 'vue-csv-import';
    import Open from './Render/OpenPayment.vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        props:['id_dogovor'],
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
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'cessionary',
                        field: 'cessionary',
                        filter: true,
                        width: 120
                    },
                    {
                        headerName: 'fio',
                        field: 'fio',
                        filter: true,
                        width: 100
                    },

                    {
                        headerName: 'id_dog',
                        field: 'id_dog',
                        filter: true,
                        width: 100,

                    },
                    {
                        headerName: 'number_dog',
                        field: 'number_dog',
                        filter: true,
                        width: 100,

                    },

                    {
                        headerName: 'date_oper',
                        field: 'date_oper',
                        filter: true,
                        width: 100,

                    },
                    {
                        headerName: 'acc_dt',
                        field: 'acc_dt',
                        filter: true,
                        width: 100,

                    },
                    {
                        headerName: 'acc_kt',
                        field: 'acc_kt',
                        filter: true,
                        width: 100,

                    },
                    {
                        headerName: 'sum_val_local',
                        field: 'sum_val_local',
                        filter: true,
                        width: 100,

                    },
                    {
                        headerName: 'sum_val_dog',
                        field: 'sum_val_dog',
                        filter: true,
                        width: 100,

                    },
                    {
                        headerName: 'date_val',
                        field: 'date_val',
                        filter: true,
                        width: 100,

                    },
                    {
                        headerName: 'oper_type',
                        field: 'oper_type',
                        filter: true,
                        width: 100,

                    },


//                    {
//                        headerName: 'Операции',
//                        field: 'id',
//                        filter: true,
//                        width: 100,
//                        cellRendererFramework: 'Open'
//                    },
                ],
                components: {
                    Open
                }
            }
        },

        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.TotalOtp/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalOtp/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 1000
            },
            ...mapGetters([
                'OtpArr','TotalOtp'

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

            ...mapActions([
                'getDataOtp',
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

            this.getDataOtp(this.id_dogovor);
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
