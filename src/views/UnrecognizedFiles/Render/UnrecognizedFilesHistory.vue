<template>
  <div>
  <ag-grid-vue
              style="height: 500px"
              ref="agGridTable"
              :gridOptions="gridOptions"
              class="ag-theme-material w-100 my-4 ag-grid-table"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              :rowData="UnrecognizedFilesHistoryList"
              rowSelection="multiple"
              :rowDataChanged = "onRowDataChanged"
              @rowClicked = "onRowClicked"
              colResizeDefault="shift"
              :animateRows="true"
              :floatingFilter="false"
              :pagination="true"
              :paginationPageSize="paginationPageSize"
              :suppressPaginationPanel="true"
              @grid-size-changed="onGridSizeChanged"
              @column-resized="onColumnResized"
              @column-visible="onColumnVisible"
              :overlayNoRowsTemplate="'Нет истории'"
              :enableRtl="$vs.rtl">
          </ag-grid-vue>
    <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage"/>
    <div>
      <h5><b>Пользователь:</b> {{ histData.user_name }} <span v-if="histData.id_user != null">(ID: {{ histData.id_user }})</span> </h5>
      <h5><b>Дата/время:</b> {{ histData.created_at_norm }} </h5>
      <h5><b>Операция: </b> {{ histData.type_oper_norm }} </h5>
      <div v-if="histData.is_json">
        <h5><b>Данные: </b></h5>
        <div style="margin-left: 20px">
        <div>Сменить статус кредита: <b>{{ histData.data_oper_json.change_status_flag_norm }}</b></div>
        <div v-if="histData.data_oper_json.change_status_flag">Статус: <b>{{ histData.data_oper_json.status_data }}</b></div>
        <div>Были файлы для переноса в документы заемщика: <b>{{ histData.data_oper_json.move_files_flag_norm }}</b></div>
        <div v-if="histData.data_oper_json.exist_files">
          <div v-if="histData.data_oper_json.move_files_flag">Выбранный тип документа для переноса: <b>{{ histData.data_oper_json.type_doc.name }} (ID {{ histData.data_oper_json.type_doc.id }})</b></div>
          <div>Файлы:</div>
          <div v-for="pdf_file in histData.data_oper_json.pdf_files_data">
            * {{ pdf_file.file_name }} -
            <span v-if="pdf_file.choice_flag"><b>Выбран</b></span>
            <span v-else>Не выбран</span>
          </div>
        </div>
        </div>
      </div>
      <div v-else>
        <h5><b>Данные: </b> {{ histData.data_oper }}</h5>
        <h5 v-if="histData.error != null"><b>Ошибка: </b> {{ histData.error }}</h5>
      </div>
    </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        components: {},
        data () {
            return {
              histData:{
                user_name:'',
                id_user:null,
                created_at_norm:'',
                type_oper_norm:'',
                data_oper:null,
                data_oper_json:null,
                is_json:false,
                error:null
              },
              gridApi: null,
              gridOptions: {},
              defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
              },
              columnDefs: [
                {
                  headerName: 'Пользователь',
                  field: 'user_name',
                  filter: true,
                  width: 200,
                },
                {
                  headerName: 'Операция',
                  field: 'type_oper_norm',
                  filter: true,
                  width: 300,
                },
                {
                  headerName: 'Данные',
                  field: 'data_oper',
                  filter: true,
                  width: 300,
                },
                {
                  headerName: 'Дата/время',
                  field: 'created_at_norm',
                  filter: true,
                  width: 100,
                },
              ],
            }
        },
      computed: {
        totalPages () {
          if (this.gridApi)
            return Math.ceil(this.UnrecognizedFilesHistoryTotal / this.paginationPageSize)
          else return 0
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
        paginationPageSize () {
          this.gridApi = this.gridOptions.api
          if (this.gridApi) return this.gridApi.paginationGetPageSize()
          else return 100
        },
        ...mapGetters([
            'UnrecognizedFilesHistoryList','UnrecognizedFilesHistoryTotal'
        ]),
      },
        mounted(){
          this.gridApi = this.gridOptions.api;
        },
      methods: {
        onColumnResized(params) {
          params.api.resetRowHeights();
        },
        onColumnVisible(params) {
          params.api.resetRowHeights();
        },
        onGridSizeChanged(params) {
          this.gridApi = this.gridOptions.api;
          this.gridApi.sizeColumnsToFit();
        },
        onRowDataChanged () {
          Vue . nextTick (() => {
                this.gridOptions.api.sizeColumnsToFit();
              }
          );
        },
        onRowClicked(event){
          this.histData.id_user = event.data.id_user;
          this.histData.user_name = event.data.user_name;
          this.histData.type_oper_norm = event.data.type_oper_norm;
          this.histData.created_at_norm = event.data.created_at_norm;
          this.histData.json_data = event.data.json_data;
          this.histData.type_oper = event.data.type_oper;
          this.histData.data_oper = event.data.data_oper;
          this.histData.is_json = event.data.is_json;
          this.histData.data_oper_json = event.data.data_oper_json;
          this.histData.error = event.data.error;
        },
      },
    }
</script>

<style lang="scss">
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
