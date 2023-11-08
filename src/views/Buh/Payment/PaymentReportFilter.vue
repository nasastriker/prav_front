<template>
    <div>
        <ag-grid-vue
                style="height: 400px"
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="PaymentFilterTaskAll"
                rowSelection="multiple"
                colResizeDefault="shift"
                :animateRows="true"
                @grid-size-changed="onGridSizeChanged"
                :floatingFilter="false"
                :suppressPaginationPanel="true"
                :enableRtl="$vs.rtl"
                :rowClassRules="rowClassRules"
                :enableBrowserTooltips="true"
                :overlayNoRowsTemplate="'Нет записей'"
                :overlayLoadingTemplate="'Идёт загрузка'">

        </ag-grid-vue>
            <textarea  class="w-full" v-if="errorVisible" style="height: 300px" v-model="errMsg"></textarea>
            <vs-button v-if="errorVisible" @click="errorVisible=false">Скрыть ошибку</vs-button>


    </div>
</template>

<script>
    import {AgGridVue} from 'ag-grid-vue'
    import {mapActions, mapGetters,mapMutations} from 'vuex'
    import {} from 'vue-feather-icons'
    import OperationPaymentReportFilter from './Render/OperationPaymentReportFilter.vue'
    import downloadPaymentFilterReport from  './Render/DowloadPaymentFilterReport.vue'
    import ProgressPaymentFilterReport from './Render/ProgressPaymentFilterReport.vue'
    import ShowErrorPaymentFilterReport from './Render/ShowErrorPaymentFilterReport.vue'
    import vSelect from 'vue-select'
    export default {
        components: {
            AgGridVue,OperationPaymentReportFilter,downloadPaymentFilterReport,ProgressPaymentFilterReport,ShowErrorPaymentFilterReport
        },
        data() {
            return {
                errMsg:'',
                errorVisible:false,
                gridApi: null,
                gridOptions: {},
                rowClassRules: null,
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'Дата',
                        headerTooltip: 'ФИО',
                        tooltipField: 'fio',
                        field: 'date',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'status_name',
                        field: 'status_name',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Название',
                        headerTooltip: 'Название',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Файл',
                        headerTooltip: 'Файл',
                        tooltipField: 'filename',
                        field: 'filename',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'downloadPaymentFilterReport'
                    },

                    {
                        headerName: 'Пользователь',
                        headerTooltip: 'Пользователь',
                        tooltipField: 'user',
                        field: 'user',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Прогресс',
                        headerTooltip: 'Прогресс',
                        tooltipField: 'progress',
                        field: 'progress',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'ProgressPaymentFilterReport',
                    },
                    {
                        headerName: 'Ошибки',
                        headerTooltip: 'Ошибки',
                        tooltipField: 'error',
                        field: 'error',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'ShowErrorPaymentFilterReport',
                        cellRendererParams:{
                            ShowError: this.ShowError.bind(this)
                        }
                    },

                    {
                        headerName: 'Операции',
                        headerTooltip: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                           cellRendererFramework: 'OperationPaymentReportFilter',
                    },

                ],
                components: {
                    OperationPaymentReportFilter,downloadPaymentFilterReport,ProgressPaymentFilterReport,ShowErrorPaymentFilterReport
                }
            }
        },

        created() {
            this.rowClassRules = {
                'row-done': (params) => {
                    return params.data.status === 2;
                },
                'row-error': (params) => {
                    return params.data.status === 3;
                },
                'row-warning':(params)=>{
                    return params.data.status  === 5;
                }
            };
        },

        computed: {
            channel(){
                return this.$echo.join("updateImportFilterPayment-channel");
            },
            ...mapGetters([
                'PaymentFilterTaskAll'
            ]),
        },
        methods: {
            ShowError(error){
                this.errorVisible=true
                this.errMsg=error
            },
            reload(e){
                this.setPaymentFilterTask(e.data)
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
                'setPaymentFilterTask',
            ]),
            ...mapActions([
                'getPaymentFilterTask'
            ]),
        },
        mounted() {
            this.channel.listen(".updateImportFilterPayment", (e) => this.reload(e));
            this.gridApi = this.gridOptions.api;
            this.getPaymentFilterTask();
        }
    }


</script>

<style>
    .row-done {
        background-color: #98FB98;
    }
    .row-error {
        background-color: #F08080;
    }
    .row-warning {
        background-color: #f0ed3c;
    }
</style>
