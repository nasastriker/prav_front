<template>
    <div>
        <ag-grid-vue
            style="height: 500px"
            ref="agGridTable"
            :components="components"
            :gridOptions="gridOptions"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="ReportsTaskArr"
            rowSelection="multiple"
            colResizeDefault="shift"
            :animateRows="true"
            @grid-size-changed="onGridSizeChanged"
            :floatingFilter="false"
            :suppressPaginationPanel="true"
            :enableRtl="$vs.rtl"
            :rowClassRules="rowClassRules">
        </ag-grid-vue>
    </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import {mapActions, mapGetters,mapMutations} from 'vuex'
import {} from 'vue-feather-icons'
import vSelect from 'vue-select'
import DownloadReport from './Render/DownloadReport.vue'
import DeleteReport from './Render/DeleteReport.vue'

export default {
    components: {
        AgGridVue,
        DownloadReport,
        DeleteReport,
        'v-select': vSelect,
    },
    data() {
        return {
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
                    field: 'date',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Статус',
                    field: 'status_name',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Название',
                    field: 'name',
                    filter: true,
                    width: 200
                },
                {
                    headerName: 'Файл',
                    field: 'filename',
                    filter: true,
                    width: 200,
                    cellRendererFramework: 'DownloadReport'
                },
                {
                    headerName: 'Кол. общ',
                    field: 'count',
                    filter: true,
                    width: 80
                },
                {
                    headerName: 'Кол. вып.',
                    field: 'count_do',
                    filter: true,
                    width: 80
                },
                {
                    headerName: 'Пользователь',
                    field: 'user',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Операции',
                    field: 'id',
                    filter: true,
                    width: 200,
                    cellRendererFramework: 'DeleteReport'
                },

            ],
            components: {
                DownloadReport,DeleteReport
            }
        }
    },

    created() {
        this.rowClassRules = {
            'row-done': (params) => {
                var id_status = params.data.status;
                return id_status === 1;
            },
            'row-error': (params) => {
                var id_status = params.data.status;
                return id_status === 2;
            }
        };
    },

    computed: {
        channel(){
            return this.$echo.join("updateReportTask-channel");
        },
        ...mapGetters([
            'ReportsTaskArr'
        ]),
    },
    methods: {
        reload(e){
            this.setReportsTask(e.data)
            this.setTotalReportsTask(e.total)
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
            'setReportsTask','setTotalReportsTask'
        ]),
        ...mapActions([
            'getReportTasks'
        ]),
    },
    mounted() {
        this.channel.listen(".UpdateReportTask", (e) => this.reload(e));
        this.gridApi = this.gridOptions.api;
        this.getReportTasks();
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
</style>
