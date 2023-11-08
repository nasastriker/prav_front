<template>
  <div>
  <ag-grid-vue
              style="height: 120px"
              ref="agGridTable"
              :gridOptions="gridOptions"
              class="ag-theme-material w-100 my-4 ag-grid-table"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              :rowData="FsspOtherIpArr"
              rowSelection="multiple"
              :rowDataChanged = "onRowDataChanged"
              colResizeDefault="shift"
              :animateRows="true"
              :floatingFilter="false"
              :pagination="true"
              :paginationPageSize="paginationPageSize"
              :suppressPaginationPanel="true"
              @rowDoubleClicked="onrowDoubleClicked"
              @grid-size-changed="onGridSizeChanged"
              @column-resized="onColumnResized"
              @column-visible="onColumnVisible"
              :overlayNoRowsTemplate="'Нет иных ИП по должнику'"
              :enableRtl="$vs.rtl">
          </ag-grid-vue>
    <vs-popup classContent="popup-example" title="Иные ИП по должнику" :active.sync="popupActiveSvodAll">
      <OtherIpAll></OtherIpAll>
    </vs-popup>
  </div>
</template>

<script>
    import Vue from 'vue'
    import { AgGridVue } from 'ag-grid-vue'
    import AsyncComputed from 'vue-async-computed'
    import OtherIpAll from "./OtherIpAll.vue";
    import JsonViewer from 'vue-json-viewer'
    import VueDadata from 'vue-dadata'
    import { mapActions,mapGetters } from 'vuex'
    import VueSuggestions from 'vue-suggestions';
    import vSelect from 'vue-select'
    import { RefreshCwIcon } from 'vue-feather-icons'
    Vue.use(AsyncComputed)
    export default {
        components: {
            VueSuggestions,'v-select': vSelect,AgGridVue,OtherIpAll
        },
        data () {
            return {
              popupActiveSvodAll:false,
              gridApi: null,
              gridOptions: {},
              defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
              },
              columnDefs: [
                {
                  headerName: 'Кол-во ИП по должнику',
                  field: 'countIp',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Всего сумма долга',
                  field: 'allSum',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: '% суммы долга по ИП',
                  field: 'procDolg',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Дата обновления данных',
                  field: 'dateUpdate',
                  filter: true,
                  width: 100,
                },
              ],
            }
        },
      computed: {
        ...mapGetters([
          'FsspOtherIpArr','Deb'
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
          'getFsspOtherIpAll'
        ]),
        paginationPageSize () {
          if (this.gridApi) return this.gridApi.paginationGetPageSize()
          else return 100
        },
        onrowDoubleClicked(){
          this.getFsspOtherIpAll(this.Deb.debtorCredit.id).then((response) => {
            if (response.result){
              this.popupActiveSvodAll = true;
            } else {
              this.$vs.notify({
                title: 'Ошибка',
                text: response.error,
                color: 'danger',
                position: 'top-center'
              })
            }
          });
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
