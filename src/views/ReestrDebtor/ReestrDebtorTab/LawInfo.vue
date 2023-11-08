<template>
 <div>
    <fieldset class="f mt-4">
         <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                style="height:400px"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="Laws"
                rowSelection="multiple"
                :rowDataChanged = "onRowDataChanged"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :paginationPageSize="paginationPageSize"
                @column-resized="onColumnResized"
                @grid-size-changed="onGridSizeChanged"
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

    </fieldset>
 
 </div>
</template>
 <script>
    import r from '../../../route';
    import { mapActions,mapGetters, } from 'vuex'
    import { AgGridVue } from 'ag-grid-vue'
    import axios from '../../../axios'
    export default {
        components: {
            AgGridVue,
        },
        data () {
            return {
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                Laws: [

                ], 
                columnDefs: [
                    {
                        headerName: 'Наименование текущего суда',
                        headerTooltip: 'Наименование текущего суда',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 260
                    },
                    {
                        headerName: 'Дата СП',
                        headerTooltip: 'дата СП',
                        field: '',
                        filter: true,
                        width: 110,
                    },
                    {
                        headerName: 'Дата иск',
                        headerTooltip: 'дата иск',
                        tooltipField: '',
                        field: '',
                        width: 110
                    },
                    {
                        headerName: '№ ИД',
                        headerTooltip: '№ ИД',
                        tooltipField: '',
                        field: '',
                        width: 100
                    },
                    {
                        headerName: 'Дата ИД',
                        headerTooltip: 'дата ИД',
                        tooltipField: '',
                        field: '',
                        width: 110
                    }
                ],
            }
        },
        mounted(){

        },

        computed: {
           /* ...mapGetters([
                'Laws'
            ]),*/

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
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },


        },
    }
</script>
