<template>
  <div class="out-main-11">
    <ag-grid-vue
        style="height: 300px"
        ref="agGridTable"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="data"
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
        @column-visible="onColumnVisible"
        :overlayNoRowsTemplate="'Нет отправок'"
        :enableRtl="$vs.rtl">
    </ag-grid-vue>
    <transition name="fade">
      <div class="outer-div-11" v-if="DateControlSendsLoadingFlag"><img class="load-bar-11" src="/loading.gif"></div>
    </transition>

  </div>
</template>

<script>
import ReestrDateControls from "../../../DateControls/Render/ReestrDateControls.vue";
import FileLinkDateControls from "./FileLinkDateControls.vue";
import { mapActions,mapGetters } from 'vuex'
import OperDateControlsFiles from "./OperDateControlsFiles.vue";
export default {
  components: {
    ReestrDateControls,
    FileLinkDateControls,
    OperDateControlsFiles
  },
  props:['perem'],
  data () {
    return {
      data:[],
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'Дата отправки',
          field: 'date_send',
          filter: true,
          width: 100,
        },
        {
          headerName: 'Наименование обращения',
          field: 'name_send',
          filter: true,
          width: 200,
        },
        {
          headerName: 'Реестр',
          field: 'id_pochta',
          filter: true,
          width: 150,
          cellRendererFramework: 'ReestrDateControls',
          cellRendererParams: {
            refresh_func: this.refreshDateControls.bind(this)
          }
        },
        {
          headerName: 'Канал отправки',
          field: 'channel',
          filter: true,
          width: 100,
        },
        {
          headerName: 'Файл',
          field: 'file_name',
          filter: true,
          width: 200,
          cellRendererFramework: 'FileLinkDateControls'
        },
        {
          headerName: '',
          field: 'doc_id',
          filter: true,
          width: 50,
          cellRendererFramework: 'OperDateControlsFiles',
          cellRendererParams: {
            refresh_func: this.refreshDateControls.bind(this)
          }
        },
      ],
      components: {
        ReestrDateControls,FileLinkDateControls,OperDateControlsFiles
      }
    }
  },
  computed: {
    ...mapGetters([
      'Deb','DateControlSends','DateControlSendsLoadingFlag'
    ]),
  },
  mounted(){
    this.gridApi = this.gridOptions.api
    this.getDateControlSends({id_credit: this.Deb.debtorCredit.id, perem:this.perem}).then((response) => {
      this.data = response;
    });
  },
  methods: {
    refreshDateControls(){
      this.gridApi = this.gridOptions.api
      this.getDateControlSends({id_credit: this.Deb.debtorCredit.id, perem:this.perem}).then((response) => {
        this.data = response;
      });
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
      'getDateControlSends'
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
