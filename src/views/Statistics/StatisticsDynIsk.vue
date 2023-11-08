<template>
  <div>
    <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="StatisticInfoIsk"
        rowSelection="multiple"
        :rowDataChanged="onRowDataChanged"
        colResizeDefault="shift"
        @grid-size-changed="onGridSizeChanged"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :overlayNoRowsTemplate="'Нет данных'"
        :enableRtl="$vs.rtl">
    </ag-grid-vue>

    <vs-popup style="min-height: 500px;" classContent="popup-example" title="Кредиты" :active.sync="showCreditList">
      <h4 v-for="(item,index) in creditsForShow">
        {{ index + 1 }}. id: <b>{{ item.id_credit }}</b> / договор: <b>{{ item.number_dog }}</b>
      </h4>
    </vs-popup>
    <vs-popup style="min-height: 500px;" classContent="popup-example" title="Динамика платежей"
              :active.sync="showDynMoneyMonth">
      <vue-apex-charts type="bar" height="350" :options="chartOptions" :series="series"></vue-apex-charts>
    </vs-popup>
    <vs-popup style="min-height: 500px;" classContent="popup-example" title="Динамика количества ИД"
              :active.sync="showDynMoneyId">
      <vue-apex-charts type="bar" height="350" :options="chartOptions" :series="seriesColId"></vue-apex-charts>
    </vs-popup>
    <vs-popup style="min-height: 500px;" classContent="popup-example" title="Динамика количества ИД в процентах"
              :active.sync="showDynIdProc">
      <vue-apex-charts type="bar" height="350" :options="chartOptions" :series="seriesColIdProc"></vue-apex-charts>
    </vs-popup>
  </div>
</template>

<script>
import OpenPayment from './Render/OpenPayment.vue'
import OpenCount from './Render/OpenCount.vue'
import OpenCountCreditsa from "./Render/OpenCountCreditsa.vue";
import VueApexCharts from 'vue-apexcharts';
import {mapGetters} from 'vuex'

export default {
  components: {
    OpenPayment,
    OpenCount,
    OpenCountCreditsa,
    VueApexCharts
  },
  data() {
    return {
      showDynMoneyMonth: false,
      showDynMoneyId: false,
      showDynIdProc: false,
      themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
      series: [{
        name: 'Платежи',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }],
      seriesColId: [{
        name: 'Количество ИД',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }],
      seriesColIdProc: [{
        name: 'Количество ИД в %',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }],
      chartOptions: {
        chart: {
          height: 500,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        xaxis: {
          categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
          }
        },
        title: {}
      },
      titleDynPlat: {
        text: 'Динамика платежей',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444'
        }
      },
      titleDynId: {
        text: 'Динамика ИД',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444'
        }
      },
      creditsForShow: [],
      showCreditList: false,
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
          headerName: 'Дата',
          field: 'date_norm',
          filter: true,
          hide: false,
          width: 100
        },
        {
          headerName: 'Кол. дог.',
          field: 'count',
          filter: true,
          hide: false,
          width: 100,
          cellRendererFramework: 'OpenCountCreditsa',
          cellRendererParams: {
            showCredits: this.showCredits.bind(this),
          }
        },
        {
          headerName: 'Кол. дог. %',
          field: 'countProcent',
          filter: true,
          hide: false,
          width: 100
        },
        {
          headerName: 'Сумма долга + ГП',
          field: 'sumDolgGos',
          filter: true,
          hide: false,
          width: 150
        },
        {
          headerName: 'Сумма долга',
          field: 'sumDolg',
          filter: true,
          hide: false,
          width: 150
        },
        {
          headerName: 'Сумма платежей',
          field: 'sumFact',
          filter: true,
          hide: false,
          width: 150,
          cellRendererFramework: 'OpenPayment',
          cellRendererParams: {
            openDynMoneyMonth: this.openDynMoneyMonth.bind(this),
          }
        },
        {
          headerName: 'Сумма %',
          field: 'sumFactProcent',
          filter: true,
          hide: false,
          width: 150,
        },
        {
          headerName: 'Кол. ИД',
          field: 'countSa',
          filter: true,
          hide: false,
          width: 100,
          cellRendererFramework: 'OpenCount',
          cellRendererParams: {
            openDynMoneyId: this.openDynMoneyId.bind(this),
          }
        },
        {
          headerName: 'Кол. ИД %',
          field: 'countSaProcent',
          filter: true,
          hide: false,
          width: 100,
          cellRendererFramework: 'OpenCount',
          cellRendererParams: {
            openDynMoneyId: this.openDynIdProc.bind(this),
          }
        },
      ],
      components: {
        OpenPayment, OpenCount, OpenCountCreditsa
      }
    }
  },
  computed: {
    paginationPageSize() {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 100
    },
    ...mapGetters([
      'StatisticInfoIsk', 'User'
    ]),
  },
  methods: {
    openDynIdProc(sa_month_arr) {
      if (typeof sa_month_arr != 'undefined') {
        let arr = [];
        let opt = [];
        if (sa_month_arr != null) {
          if (sa_month_arr.length > 0) {
            for (let i = 0; i < sa_month_arr.length; i++) {
              arr.push(sa_month_arr[i].colp + '%')
              opt.push(i);
            }
          }
        }

        this.seriesColIdProc[0].data = arr;
        this.chartOptions.xaxis.categories = opt;
        this.chartOptions.title = this.titleDynId;
        this.showDynIdProc = true;
      }
    },
    openDynMoneyId(sa_month_arr) {
      if (typeof sa_month_arr != 'undefined') {
        let arr = [];
        let opt = [];
        if (sa_month_arr != null) {
          if (sa_month_arr.length > 0) {
            for (let i = 0; i < sa_month_arr.length; i++) {
              arr.push(sa_month_arr[i].col)
              opt.push(i);
            }
          }
        }

        this.seriesColId[0].data = arr;
        this.chartOptions.xaxis.categories = opt;
        this.chartOptions.title = this.titleDynId;
        this.showDynMoneyId = true;
      }
    },
    openDynMoneyMonth(money_month_arr) {
      if (typeof money_month_arr != 'undefined') {
        let arr = [];
        let opt = [];
        if (money_month_arr != null) {
          if (money_month_arr.length > 0) {
            for (let i = 0; i < money_month_arr.length; i++) {
              arr.push(money_month_arr[i].sum)
              opt.push(i);
            }
          }
        }
        this.series[0].data = arr;
        this.chartOptions.xaxis.categories = opt;
        this.chartOptions.title = this.titleDynPlat;
        this.showDynMoneyMonth = true;
      }
    },

    showCredits(credits) {
      console.log(credits)
      if (typeof credits != 'undefined') {
        if (credits != null) {
          if (credits.length > 0) {
            this.creditsForShow = credits;
            this.showCreditList = true;
          }
        }
      }
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