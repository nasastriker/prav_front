<template>
    <div>
            <div class="vx-col w-2/3">
                <div class="vx-row">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ arrDeleteTotal - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : arrDeleteTotal }} of {{ arrDeleteTotal }}</span>
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
            </div>
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="arrDelete"
                rowSelection="multiple"
                :enableBrowserTooltips="true"
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

</template>

<script>
    export default {
        components: {
        },
        props:['arrDelete','arrDeleteTotal'],
        data () {
            return {
                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'ФИО',
                        field: 'fio',
                        filter: true,
                        tooltipField: 'fio',
                        width: 250,

                    },
                    {
                        headerName: 'Статус',
                        field: 'stat_name',
                        tooltipField: 'stat_name',
                        filter: true,
                        width: 200,
                    },

                    {
                        headerName: 'Номер договора',
                        field: 'number_dog',
                        tooltipField: 'number_dog',
                        filter: true,
                        width: 150,

                    },
                ],

                components: {
                }
            }
        },

        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.arrDeleteTotal/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.arrDeleteTotal/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
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
