<template>
                <div class="vx-card p-6">
                    <div class="vx-row">
                        <div class="vx-col">
                            <vs-input v-model="addressException" @input="searchException"></vs-input>
                        </div>
                        <div class="vx-col">
                            <vs-button @click="addException">Добавить</vs-button>
                        </div>
                        <div class="vx-col">
                            <vs-button @click="startCheck">Запустить</vs-button>
                        </div>
                    </div>
                    <ag-grid-vue
                            ref="agGridTable"
                            :components="components"
                            :gridOptions="gridOptions"
                            class="ag-theme-material w-100 my-4 ag-grid-table"
                            :columnDefs="columnDefs"
                            :defaultColDef="defaultColDef"
                            :rowData="AddressExceptionArr"
                            rowSelection="multiple"
                            :rowDataChanged = "onRowDataChanged"
                            colResizeDefault="shift"

                            :animateRows="true"
                            :floatingFilter="true"
                            :pagination="true"
                            :rowHeight="rowHeight"
                            :suppressPaginationPanel="true"
                            @grid-size-changed="onGridSizeChanged"
                            @column-resized="onColumnResized"
                            @column-visible="onColumnVisible"
                            :enableRtl="$vs.rtl">
                    </ag-grid-vue>

                </div>


</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import vSelect from 'vue-select'
import { mapActions,mapGetters,mapMutations } from 'vuex'
import r from '../../route';
import axios from '../../axios'
import OperationAddressException from './Render/OperationAddressException.vue'
 export default {
     components: {
         AgGridVue,
         vSelect,
         OperationAddressException
     },
     beforeMount() {

         this.defaultColDef = { resizable: true };
         this.rowHeight = 24;
     },
     data () {
         return {

             addressException:'',
             // AgGrid
             gridApi: null,
             gridOptions: {

                 alwaysShowVerticalScroll:true
             },
             defaultColDef: {
                 flex: 1,
                 wrapText: true,
                 autoHeight: true,
                 sortable: true,
                 resizable: true,

             },
             columnDefs: [
                 {
                     headerName: 'Исключение',
                     filter: false,
                     field: 'exception',
                     width: 200
                 },


                 {
                     headerName: 'id',
                     field: 'id',
                     filter: false,
                     width: 100,
                     cellRendererFramework:'OperationAddressException'
                 },

             ],

             // Cell Renderer Components
             components: {
                 OperationAddressException,
                 // DebtorFilterRender

             },

         }
     },
     computed: {



         ...mapGetters([
             'User','AddressExceptionArr'

         ]),


     },
     methods: {
         searchException(find){
             this.getDataAddressExceptionArr({find:find})
         },
         startCheck(){
             axios.post(r('addressException.update'), {
                 params: {
                     method: 'startCheck',
                     param: ''
                 }
             }).then((response) => {
                 if (response.data.result){
                     this.$vs.notify({  title:'Сообщение', text: 'Выполнено успешно!!!', color: 'success', position: 'top-center' })

                 }else {
                     this.$vs.notify({  title:'Сообщение', text: 'Выполнить не удалось !!!', color: 'danger', position: 'top-center' })
                 }



             })
         },

         addException(){
             this.saveAddressExceptionArr(this.addressException).then(result=>{
                 if(result)this.getDataAddressExceptionArr()
                 this.addressException=''
             })
         },

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

                    ...mapMutations([
             'setQueryLimit','setQueryOffset','setToUserPag','setFindFlag'

         ]),


         setColumnFilter (column, val) {
             const filter = this.gridApi.getFilterInstance(column)
             let modelObj = null

             if (val !== 'all') {
                 modelObj = { type: 'equals', filter: val }
             }

             filter.setModel(modelObj)
             this.gridApi.onFilterChanged()
         },
         resetColFilters () {
             this.gridApi.setFilterModel(null)
             this.gridApi.onFilterChanged()

             // Reset Filter Options
             this.roleFilter = this.statusFilter = this.isVerifiedFilter = this.departmentFilter = { label: 'All', value: 'all' }

             this.$refs.filterCard.removeRefreshAnimation()
         },
         ...mapActions([
            'getDataAddressExceptionArr','saveAddressExceptionArr'
         ]),

         onRowDataChanged () {
             Vue . nextTick (() => {
                     this.gridOptions.api.sizeColumnsToFit();
                 }
             );
         },

     },

     mounted () {

         this.gridApi = this.gridOptions.api
        this.getDataAddressExceptionArr()




     },



}
</script>

<style scoped>

</style>
