<template>
    <div>
        <ag-grid-vue
            ref="agGridTable"
            :components="components"
            :gridOptions="gridOptions"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="SudErrorsArr"
            rowSelection="multiple"
            colResizeDefault="shift"
            :animateRows="true"
            :floatingFilter="false"
            @grid-size-changed="onGridSizeChanged"
            :pagination="true"
            :suppressPaginationPanel="true"
            :enableRtl="$vs.rtl"
            :overlayNoRowsTemplate="'Нет записей'"
            :enableBrowserTooltips="true">
        </ag-grid-vue>
    </div>
</template>

<script>

    import {mapActions, mapGetters} from "vuex";
    import {AgGridVue} from 'ag-grid-vue'

    export default {
        components: {
            AgGridVue,
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
                        headerName: 'Текст ошибки',
                        headerTooltip: 'Текст ошибки',
                        tooltipField: 'text',
                        field: 'text',
                        filter: true,
                        width: 500,
                    },

                    {
                        headerName: 'Дата ошибки',
                        headerTooltip: 'Дата ошибки',
                        tooltipField: 'created_at',
                        field: 'created_at',
                        filter: true,
                        width: 100,
                    },
                ],
                components: {
                }
            }
        },
        mounted(){
            this.gridApi = this.gridOptions.api;
            this.getDataSudErrorsCredit(this.Deb.debtorCredit.id);
        },
        asyncComputed: {},
        computed: {
            ...mapGetters([
                'SudErrorsArr', 'Deb'
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
                'getDataSudErrorsCredit'
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
