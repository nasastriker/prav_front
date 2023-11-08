<template>
  <div id="page-user-list">
    <div class="vx-card p-6" style="box-shadow: none">
    <div class="flex flex-wrap justify-between items-center">
      <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ FsspTotalPays - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : FsspTotalPays }} of {{ FsspTotalPays }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <vs-dropdown-menu>
            <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
              <span>20</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
              <span>50</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
              <span>100</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
              <span>150</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>


      <vs-button @click="showHistoryPays">История</vs-button>
    </div>
      <div class="out-main">
        <ag-grid-vue
            style="height: 500px"
            ref="agGridTable"
            :components="components"
            :gridOptions="gridOptions"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="FsspClPays"
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
            :overlayNoRowsTemplate="'Нет платежей'"
            :enableBrowserTooltips="true"
            :overlayLoadingTemplate="'Идёт загрузка'"
            :enableRtl="$vs.rtl">
        </ag-grid-vue>

        <transition name="fade">
            <div class="tablePreloader outer-div" v-if="FsspClPaysLoadingFlag">
                <img class="load-bar" src="/loading.gif" style="width: 70px;">
                <span>Идёт загрузка</span>
            </div>
        </transition>
      </div>

    <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage" />

  </div>

    <vs-popup classContent="popup-example" title="История" :active.sync="showHist">
      <PaysHistory></PaysHistory>
    </vs-popup>
  </div>

</template>

<script>
import { VueCsvImport } from 'vue-csv-import';
import { AgGridVue } from 'ag-grid-vue'
import vSelect from 'vue-select'
import PaysHistory from "./PaysHistory.vue";
import { mapActions,mapGetters } from 'vuex'
export default {
  components: {
    AgGridVue,
    vSelect,
    VueCsvImport,
    PaysHistory
  },
  data () {
    return {
      searchQuery: '',
      csv:[],
      // AgGrid
      showHist:false,
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'Вид операции',
          field: 'type_oper_norm',
          filter: true,
          width: 150,
        },
        {
          headerName: 'Дата операции',
          field: 'date_oper_norm',
          filter: true,
          width: 50,
        },
        {
          headerName: 'Сумма операции',
          field: 'sum',
          filter: true,
          width: 70,
        },
        {
          headerName: 'Отправитель/Получатель',
          field: 'recip',
          filter: true,
          width: 350,
        },
      ],

      components: {

      }
    }
  },

  computed: {
    totalPages () {
      if (this.gridApi)
        return Math.ceil(this.FsspTotalPays/this.paginationPageSize)
      else return 0
    },
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 20
    },
    ...mapGetters([
      'FsspClPays','FsspTotalPays','FsspClPaysLoadingFlag','Deb'

    ]),
    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    },

  },
  methods: {
    showHistoryPays(){
      this.getFsspClPaysHist(this.Deb.debtorCredit.id);
      this.showHist = true;
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
    ...mapActions([
      'getFsspClPaysHist'
    ]),
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    onRowDataChanged () {
      Vue . nextTick (() => {
            this.gridOptions.api.sizeColumnsToFit();
          }
      );
    },

  },
  mounted () {
    this.gridApi = this.gridOptions.api
  }
}

</script>

<style lang="scss">
#page-user-list {
  .user-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.vh75{
  min-height: 75vh;
}
.load-bar-22{
  display: inline-block;
  max-width: 70px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 240px;
}

.outer-div-22
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

.out-main-22{
  position : relative;
}
</style>
