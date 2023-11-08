<template>
    <div>
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                style="height:150px"
                class="ag-theme-material w-100 my-1 ag-grid-table"
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
                           headerName: 'Дата',
                           headerTooltip: 'Дата',
                           tooltipField: '',
                           field: '',
                           filter: true,
                           width: 100
                       },
                       {
                           headerName: 'Вид взаимодействия',
                           headerTooltip: 'Вид взаимодействия',
                           field: '',
                           filter: true,
                           width: 200,
                       },
                       {
                           headerName: 'Скрипт',
                           headerTooltip: 'Скрипт',
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
   