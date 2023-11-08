<template>
  <span>
    <span style="color:red" class="hover:text-primary cursor-pointer" @click="showHistFunc">История</span>

    <vs-popup class="holamundo" title="История" :active.sync="showHist">
      <ag-grid-vue
          style="width: 800px;height: 400px"
          ref="agGridTable"
          :gridOptions="gridOptions"
          class="ag-theme-material w-100 my-4 ag-grid-table"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="DeleteFieldHistoryArr"
          rowSelection="multiple"
          :rowDataChanged = "onRowDataChanged"
          colResizeDefault="shift"
          :animateRows="true"
          :floatingFilter="false"
          :pagination="true"
          :paginationPageSize="paginationPageSize"
          :suppressPaginationPanel="true"
          @grid-size-changed="onGridSizeChanged"
          @column-resized="onColumnResized"
          @rowClicked = "onRowClicked"
          @column-visible="onColumnVisible"
          :overlayNoRowsTemplate="'Нет истории'"
          :enableRtl="$vs.rtl">
      </ag-grid-vue>

      <div style="margin-top: 20px" v-if="perShowFlag">
        <h4>Дата/время: <b>{{ dateTimeShow }}</b> / Старое значение: <b>{{ valShow }}</b></h4>
        <h4>Причина: <b>{{ prichShow }}</b></h4>
      </div>
    </vs-popup>
  </span>
</template>

<script>
import Vue from 'vue'
import { AgGridVue } from 'ag-grid-vue'
import AsyncComputed from 'vue-async-computed'
import { mapActions,mapGetters } from 'vuex'
import vSelect from 'vue-select'
Vue.use(AsyncComputed)
export default {
  components: {
    'v-select': vSelect,AgGridVue
  },
  props:['perem'],
  data () {
    return {
      showHist:false,
      gridApi: null,
      perShowFlag:false,
      dateTimeShow:'',
      valShow:'',
      prichShow:'',
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'Дата/время',
          field: 'date_time',
          filter: true,
          width: 100,
        },
        {
          headerName: 'Старое значение',
          field: 'old_value',
          filter: true,
          width: 200,
        },
        {
          headerName: 'Причина',
          field: 'prich',
          filter: true,
          width: 300,
        },
      ],
      components: {

      }
    }
  },
  computed: {
    ...mapGetters([
      'Deb','DeleteFieldHistoryArr','DeleteFieldHistoryLoadingFlag'
    ]),
  },
  mounted(){
    this.gridApi = this.gridOptions.api;
  },
  methods: {
    showHistFunc(){
      this.gridApi = this.gridOptions.api;
      this.getDeleteFieldHistoryArr({id_credit: this.Deb.debtorCredit.id, perem:this.perem}).then((response) => {
        if (response.result) {
          this.showHist = true;
        } else {
          this.$vs.notify({
            color: 'danger',
            title: 'Ошибка',
            text: response.error,
            position: 'top-center'
          })
        }
      });
    },

    onRowClicked(event){
      this.gridApi = this.gridOptions.api;
      this.dateTimeShow = event.data.date_time;
      this.valShow = event.data.old_value;
      this.prichShow = event.data.prich;
      this.perShowFlag = true;
    },
    onColumnResized(params) {
      params.api.resetRowHeights();
    },
    onColumnVisible(params) {
      params.api.resetRowHeights();
    },
    onGridSizeChanged(params) {
      if (params.clientWidth > 200) {
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
      'getDeleteFieldHistoryArr'
    ]),
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 100
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.load-bar-11{
  display: inline-block;
  max-width: 70px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
}

.load-bar-12{
  display: inline-block;
  max-width: 70px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  color: red;
}

.outer-div-11
{
  text-align: center;
  z-index : 10;
  position : absolute;
  top : 0;
  left : 0;
  width: 100%;
  height: 100%;
  background-color: hsla(200, 80%, 90%, 0.3);
}

.out-main-11{
  position : relative;
}

</style>
