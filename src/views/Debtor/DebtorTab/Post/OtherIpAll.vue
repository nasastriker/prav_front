<template>
  <div>
          <ag-grid-vue
              style="width: 1200px;height: 500px"
              ref="agGridTable"
              :gridOptions="gridOptions"
              class="ag-theme-material w-100 my-4 ag-grid-table"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              :rowData="FsspOtherIpAllArr"
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
              :enableRtl="$vs.rtl">
          </ag-grid-vue>
    <h4 v-if="showHints">
      <b>Наименование иного взыскателя:</b> {{ svodData.name }} <br>
      <b>Признак сводного производства:</b> {{ svodData.pr_svod }} / <b>№ИП иного кредитора:</b> {{ svodData.ip }} <br>
      <b>Сумма долга иного взыскателя: </b> {{ svodData.sum }} / <b>% долга иного взыскателя: </b> {{ svodData.proc }} / <b>Остаток долга иного взыскателя: </b> {{ svodData.ost_sum }} <br>
      <b>Дата обновления данных: </b>{{ svodData.date_upd }} / <b>Дата окончания ИП иного кредитора: </b>{{ svodData.date_end_ip }}
    </h4>
  </div>
</template>

<script>
    import Vue from 'vue'
    import { AgGridVue } from 'ag-grid-vue'
    import AsyncComputed from 'vue-async-computed'
    import JsonViewer from 'vue-json-viewer'
    import VueDadata from 'vue-dadata'
    import { mapActions,mapGetters } from 'vuex'
    import VueSuggestions from 'vue-suggestions';
    import vSelect from 'vue-select'
    import { RefreshCwIcon } from 'vue-feather-icons'
    Vue.use(AsyncComputed)
    export default {
        components: {
            VueSuggestions,'v-select': vSelect,AgGridVue
        },
        data () {
            return {
              svodData:{
                name:'',
                pr_svod:'',
                ip:'',
                sum:'',
                proc:'',
                ost_sum:'',
                date_upd:'',
                date_end_ip:'',
              },
              showHints:false,
              gridApi: null,
              gridOptions: {},
              defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
              },
              columnDefs: [
                {
                  headerName: 'Наименование',
                  field: 'fssp_IdCrdrName',
                  filter: true,
                  width: 200,
                },
                {
                  headerName: 'Номер свод. ИП',
                  field: 'pr_svod',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Дата возб. свод. ИП',
                  field: 'date_rise_svod_ip_norm',
                  filter: true,
                  width: 70,
                },
                {
                  headerName: 'Номер ИП',
                  field: 'fssp_IPNo',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Сумма долга',
                  field: 'fssp_IdDebtSum',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: '% долга',
                  field: 'proc_dolg',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Остаток долга',
                  field: 'fssp_IpRestDebtsum',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Дата обновления данных',
                  field: 'date_last',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Дата окончания ИП',
                  field: 'date_end_ip',
                  filter: true,
                  width: 100,
                },
              ],
            }
        },
      computed: {
        ...mapGetters([
          'FsspOtherIpAllArr'
        ]),
      },
        mounted(){
          this.gridApi = this.gridOptions.api
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
        ...mapActions([

        ]),
        paginationPageSize () {
          if (this.gridApi) return this.gridApi.paginationGetPageSize()
          else return 100
        },
        onRowClicked(event){
          this.showHints = true;
          this.svodData.name = event.data.fssp_IdCrdrName;
          this.svodData.pr_svod = event.data.pr_svod;
          this.svodData.ip = event.data.fssp_IPNo;
          this.svodData.sum = event.data.fssp_IdDebtSum;
          this.svodData.proc = event.data.proc_dolg;
          this.svodData.date_upd = event.data.date_last;
          this.svodData.date_end_ip = event.data.date_end_ip;
          this.svodData.ost_sum = event.data.fssp_IpRestDebtsum;
        }
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
