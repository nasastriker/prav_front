<template>

    <div >

        <vs-collapse>

            <vs-collapse-item>
                <div slot="header">
                    Платежы по договору займа:
                </div>
                <div class="">

                    <div class="flex flex-wrap justify-between items-center">

                        <!-- ITEMS PER PAGE -->
                        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                            <vs-dropdown vs-trigger-click class="cursor-pointer">
                                <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                                    <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalPayments - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalPayments }} of {{ TotalPayments }}</span>
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
                            :rowData="PaymentsArr"
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
            </vs-collapse-item>
        </vs-collapse>
    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import { mapActions,mapGetters } from 'vuex'
    export default {
        props:['id_dogovor'],
        components: {
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
                        headerName: 'Сумма',
                        field: 'sum',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Дата',
                        field: 'date',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Статус',
                        field: 'stat',
                        filter: true,
                        width: 200,

                    },
                ],
                components: {
                }
            }
        },

        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.TotalPayments/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalPayments/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 10
            },
            ...mapGetters([
                'PaymentsArr','TotalPayments'

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
                'getDataPayments',
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

            this.getDataPayments(this.id_dogovor);
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
