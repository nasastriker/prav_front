<template>
  <div>
    <div style="display: flex">
      <a class="flex" v-auth-href :href="url" style="margin-left: auto; gap: 5px;"><feather-icon icon="FileTextIcon" svgClasses="h-5 w-5"/>Выгрузить в файл</a>
    </div>

    <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="StatisticInfoStats"
        rowSelection="multiple"
        :rowDataChanged="onRowDataChanged"
        colResizeDefault="shift"
        :animateRows="true"
        @grid-size-changed="onGridSizeChanged"
        @column-resized="onColumnResized"
        @column-visible="onColumnVisible"
        :floatingFilter="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :overlayNoRowsTemplate="'Нет данных'"
        :enableRtl="$vs.rtl">
    </ag-grid-vue>

<!--    <vs-pagination-->
<!--        :total="totalPages"-->
<!--        :max="7"-->
<!--        v-model="currentPage"/>-->
  </div>

</template>

<script>
import {mapGetters} from 'vuex';
import Vue from "vue";
import VueAuthHref from "vue-auth-href";
const options = {
  token: () => `${localStorage.getItem('accessToken')}`
}
Vue.use(VueAuthHref, options);

export default {
  components: {},
  data() {
    return {
      gridApi: null,
      gridOptions: {
        alwaysShowVerticalScroll: true
      },
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'Позиция',
          field: 'position',
          filter: true,
          hide: false,
          width: 350
        },
        {
          headerName: '%',
          field: 'procent',
          filter: true,
          hide: false,
          width: 180
        },
        {
          headerName: 'Значение',
          field: 'val',
          filter: true,
          hide: false,
          width: 180
        },
        {
          headerName: 'На Дату',
          field: 'date_norm',
          hide: false,
          width: 180
        },
      ],
      components: {}
    }
  },
  computed: {
    // totalPages() {
      // if (this.gridApi)
      //   return Math.ceil(this.TotalStatisticss / this.paginationPageSize)
      // else return 0
      // return 0
    // },
    paginationPageSize() {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 100
    },
    url(){
      return '/statistics_to_excel/?data='+JSON.stringify(this.User.pag.staticSud)+'&type=info';
    },
    ...mapGetters([
      'StatisticInfoStats', 'User'
    ]),
    // currentPage: {
    //   get() {
    //     if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
    //     else return 1
    //   },
    //   set(val) {
    //     this.getDataStatisticss(this.User.pag.staticSud);
    //     this.gridApi.paginationGoToPage(val - 1)
    //   }
    // },
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
    setColumnFilter(column, val) {
      const filter = this.gridApi.getFilterInstance(column)
      let modelObj = null
      if (val !== 'all') {
        modelObj = {type: 'equals', filter: val}
      }
      filter.setModel(modelObj)
      this.gridApi.onFilterChanged()
    },
    onRowDataChanged() {
      Vue.nextTick(() => {
            this.gridOptions.api.sizeColumnsToFit();
          }
      );
    },
  },
  mounted() {
    this.gridApi = this.gridOptions.api
    this.gridApi.paginationSetPageSize(100)
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

.ag-row {
  height: 23px !important;

  padding: 0px !important;
  margin: 0px !important;
}

.ag-cell {

  padding: 0px !important;
  margin: 0px !important;

}

.ag-header-row {
  height: 26px !important;
}

.ag-theme-material .ag-cell {
  line-height: 15px !important;
}

</style>
