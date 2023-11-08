<template>
  <div id="page-user-list">
    <div class="vx-card p-6">
      <h1>Ставки ЦБ</h1>
      <div class="flex flex-wrap justify-between items-center">
        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalRates - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalRates }} of {{ TotalRates }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <vs-dropdown-menu>
              <vs-dropdown-item @click="changePag(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="changePag(50)">
                <span>50</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="changePag(100)">
                <span>100</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="changePag(150)">
                <span>150</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
          <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
          <vs-button color="success" class="pull-right" type="filled"  @click="$router.push('/stavkaCB/new')">Новая ставка</vs-button>


        </div>
      </div>

      <ag-grid-vue
          ref="agGridTable"
          :components="components"
          :gridOptions="gridOptions"
          class="ag-theme-material w-100 my-4 ag-grid-table"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="RatesArr"
          rowSelection="multiple"
          :rowDataChanged = "onRowDataChanged"
          colResizeDefault="shift"
          :animateRows="true"
          :floatingFilter="false"
          :pagination="true"
          :paginationPageSize="paginationPageSize"
          :suppressPaginationPanel="true"
          @rowDoubleClicked="onrowDoubleClicked"
          :enableRtl="$vs.rtl"
          @grid-size-changed="onGridSizeChanged"
          @column-resized="onColumnResized"
          @column-visible="onColumnVisible"
          :enableBrowserTooltips="true"
          :overlayLoadingTemplate="'Идёт загрузка'"
          :overlayNoRowsTemplate="'Нет записей'">
      </ag-grid-vue>

      <vs-pagination
          :total="totalPages"
          :max="7"
          v-model="currentPage" />

    </div>
  </div>

</template>

<script>
import OpenStavkaCB from './Render/OpenStavkaCB.vue'
import { mapActions,mapGetters } from 'vuex'
export default {
  components: {
    OpenStavkaCB,
  },
  data () {
    return {
      ratecbs:{
        offset:0,
        limit:10,
        find:'',
        curPage: 1
      },
      searchQuery: '',
      csv:[],
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [

        {
          headerName: 'ID',
          field: 'id',
          filter: true,
          width: 100
        },
        {
          headerName: 'Дата начала',
          field: 'data_begin',
          filter: true,
          width: 200
        },

        {
          headerName: 'Дата окончания',
          field: 'data_end',
          filter: true,
          width: 200
        },
        {
          headerName: 'Ставка',
          field: 'rate',
          filter: true,
          width: 200
        },
        {
          headerName: 'Операции',
          field: 'id',
          filter: true,
          width: 100,
          cellRendererFramework: 'OpenStavkaCB'
        },
      ],

      components: {
        OpenStavkaCB,
      }
    }
  },

  computed: {
    totalPages () {
      if (this.gridApi)
        return Math.ceil(this.TotalRates/this.paginationPageSize)
      else return 0
    },
    paginationPageSize () {
      return this.PagRateCB.limit
    },
    ...mapGetters([
      'RatesArr','TotalRates', 'User', 'PagRateCB'

    ]),
    currentPage: {

      get () {
        if (typeof this.PagRateCB.curPage !== 'undefined') return this.PagRateCB.curPage
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.PagRateCB.curPage=val;
        this.PagRateCB.offset = (val-1);
        this.getDataRates(this.PagRateCB);
        this.gridApi.paginationGoToPage(val - 1)
        this.setDataUser()
      }
    },

  },
  methods: {
    changePag(pag){
      this.PagRateCB.limit=pag
      this.getDataRates(this.PagRateCB);
      this.gridApi.paginationSetPageSize(pag)
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
    onrowDoubleClicked(event){
      this.$router.push('/stavkaCB/'+event.data.id)
    },

    ...mapActions([
      'getDataRates',
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
    this.getDataRates();
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
</style>
