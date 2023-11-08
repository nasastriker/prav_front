<template>
    <div class="mt-4">
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                style="height:400px"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="PaymentsArr"
                rowSelection="multiple"
                :rowDataChanged = "onRowDataChanged"
                colResizeDefault="shift"
                :animateRows="true"
                @grid-size-changed="onGridSizeChanged"
                @column-resized="onColumnResized"
                @column-visible="onColumnVisible"
                :floatingFilter="false"
                :pagination="true"
                :paginationPageSize="paginationPageSize"
                :suppressPaginationPanel="true"
                :enableRtl="$vs.rtl"
                :enableBrowserTooltips="true"
                :overlayLoadingTemplate="'Идёт загрузка'"
                :overlayNoRowsTemplate="'Нет записей'">
        </ag-grid-vue>

        <vs-pagination
                :total="totalPages"
                :max="7"
                v-model="currentPage" />

    </div>
</template>

<script>
    import r from '../../../route'
    import axios from '../../../axios'
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Open from '../../Debtor/DebtorTab/Render/OpenPayment.vue'
    import TypePay from '../../Debtor/DebtorTab/Render/TypePay.vue'
    import { mapActions,mapGetters } from 'vuex'
    export default {
        props:['id_dogovor'],
        components: {
            AgGridVue,
            vSelect,
            Open,
            TypePay,
            VueCsvImport,
        },
        data () {
            return {

                // Filter Options


                pop:false,
                paymentData:{
                    id_debtor:0,
                    id_credit:0,
                    id_reestr:0,
                    status:0,
                    date:'',
                    account:'',
                    type:1,
                    osn:'',
                    sum:0,
                    bic:0,
                    number:'',
                    fio_load:'',
                },
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
                        headerName: 'Рекомендация взаимодействия',
                        headerTooltip: 'Рекомендация взаимодействия',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Подсказка',
                        headerTooltip: 'Подсказка',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Ключевые слова',
                        headerTooltip: 'Ключевые слова',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 170,
                        cellRendererFramework: 'TypePay'

                    },
                ],
            }
        },

        computed: {

            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 10
            },
            ...mapGetters([
                'PaymentsArr'

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
