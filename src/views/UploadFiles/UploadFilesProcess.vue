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
            :rowData="UploadFilesTasksArr"
            rowSelection="multiple"
            colResizeDefault="shift"
            :animateRows="true"
            @grid-size-changed="onGridSizeChanged"
            :floatingFilter="false"
            :suppressPaginationPanel="true"
            :enableRtl="$vs.rtl"
            :overlayNoRowsTemplate="'Нет записей'"
            :rowClassRules="rowClassRules"
            :enableBrowserTooltips="true">
        </ag-grid-vue>
    </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import {mapActions, mapGetters} from 'vuex'
import {} from 'vue-feather-icons'
import vSelect from 'vue-select'

export default {
    components: {
        AgGridVue,
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
                    headerTooltip: 'Дата',
                    tooltipField: 'date_upload',
                    field: 'date_upload',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Статус',
                    headerTooltip: 'Статус',
                    tooltipField: 'status_name',
                    field: 'status_name',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Тип документов',
                    headerTooltip: 'Тип документов',
                    tooltipField: 'doc',
                    field: 'doc',
                    filter: true,
                    width: 200
                },
                {
                    headerName: 'Количество',
                    headerTooltip: 'Количество',
                    tooltipField: 'count_files',
                    field: 'count_files',
                    filter: true,
                    width: 50
                },
                {
                    headerName: 'Пользователь',
                    headerTooltip: 'Пользователь',
                    tooltipField: 'user',
                    field: 'user',
                    filter: true,
                    width: 100
                },
            ],
            components: {
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
        ...mapGetters([
            'UploadFilesTasksArr'
        ]),
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
        ...mapActions([
            'getUploadFilesTasks'
        ]),
    },
    mounted() {
        this.gridApi = this.gridOptions.api;
        this.getUploadFilesTasks();
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
