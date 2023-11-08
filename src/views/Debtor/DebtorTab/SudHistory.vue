<template >
    <div>
        <ag-grid-vue
            ref="agGridTable"
            :components="components"
            :gridOptions="gridOptions"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="HistoryIskDocArr"
            rowSelection="multiple"
            colResizeDefault="shift"
            :animateRows="true"
            :floatingFilter="false"
            @grid-size-changed="onGridSizeChanged"
            :pagination="true"
            :suppressPaginationPanel="true"
            :enableRtl="$vs.rtl">
        </ag-grid-vue>
    </div>
</template>

<script>

    import {mapActions, mapGetters} from "vuex";
    import {AgGridVue} from 'ag-grid-vue'
    import OpenSendSudFile from "./Render/OpenSendSudFile.vue";
    export default {
        components: {
            AgGridVue,
            OpenSendSudFile
        },
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
                        headerName: 'Дата',
                        field: 'normal_date',
                        filter: true,
                        width: 100,
                    },
                    {
                        headerName: 'Документ',
                        field: 'doc',
                        filter: true,
                        width: 500,
                    },
                    {
                        headerName: 'Канал',
                        field: 'channel',
                        filter: true,
                        width: 200,
                    },
                    {
                        headerName: 'Пользователь',
                        field: 'user',
                        filter: true,
                        width: 300,
                    },
                    {
                        headerName: 'Файл',
                        field: 'file_name',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenSendSudFile'
                    },
                ],
                components: {
                    OpenSendSudFile
                }
            }
        },
        mounted(){
            this.gridApi = this.gridOptions.api;
            this.getHistoryIskDocs(this.Deb.debtorCredit.id);
        },
        asyncComputed: {},
        computed: {
            ...mapGetters([
                'HistoryIskDocArr', 'Deb'
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
                'getHistoryIskDocs'
            ]),
        },
    }
</script>

<style lang="scss">
    .const{
        margin-top: 10px;
        color: red;
        border: 1px;

        cursor: pointer;
        text-decoration-line: underline;
        text-decoration-style: dashed;
    }
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
    .checkbox_x.vs-checkbox{
        min-width: 20px;
    }

</style>
