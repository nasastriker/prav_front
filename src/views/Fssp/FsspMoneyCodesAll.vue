<template>
  <div id="page-user-list">
    <div class="vx-card p-6 no-shadow">
      <div class="flex flex-wrap justify-between items-center">
        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div class="cursor-pointer flex items-center justify-between font-medium mr-4"
                 style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
              <span class="mr-2">{{
                  currentPage * paginationPageSize - (paginationPageSize - 1)
                }} - {{
                  TotalFsspMoneyCodesAll - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalFsspMoneyCodesAll
                }} of {{ TotalFsspMoneyCodesAll }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
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

        <div class="vx-row" style="margin-top: 20px">
          <ToXlsFile :url_text=url_text style="margin-right: 20px;margin-top: 10px"></ToXlsFile>
          <div class="vx-col mb-2">
            <vs-button @click="filterReset">Сбросить фильтры</vs-button>
          </div>
        </div>
      </div>
      <div class="out-main">
        <ag-grid-vue
            ref="agGridTable"
            :gridOptions="gridOptions"
            class="ag-theme-material w-100 my-4 ag-grid-table type_order_restrictions unrecognized_files_table"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="FsspMoneyCodesAllArr"
            rowSelection="multiple"
            :rowDataChanged="onRowDataChanged"
            colResizeDefault="shift"
            :animateRows="true"
            :floatingFilter="true"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :suppressPaginationPanel="true"
            @grid-size-changed="onGridSizeChanged"
            @column-resized="onColumnResized"
            @column-visible="onColumnVisible"
            @rowDoubleClicked="onrowDoubleClicked"
            :enableRtl="$vs.rtl"
            :enableBrowserTooltips="true"
            :overlayLoadingTemplate="'Идёт загрузка'"
            :overlayNoRowsTemplate="'Нет записей'">
        </ag-grid-vue>
        <transition name="fade">
          <div class="tablePreloader outer-div" v-if="FsspMoneyCodesAllLoadingFlag">
            <img class="load-bar" src="/loading.gif" style="width: 70px;">
            <span>Идёт загрузка</span>
          </div>
        </transition>
      </div>

      <vs-pagination
          :total="totalPages"
          :max="7"
          v-model="currentPage"/>
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import FsspMoneyCodesFilterRender from "./Render/FsspMoneyCodesFilterRender.vue";
import ToXlsFile from "../ToXlsFile/ToXlsFile.vue";

export default {
  components: {
    FsspMoneyCodesFilterRender,ToXlsFile
  },
  beforeMount() {
    this.defaultColDef = {resizable: true};
    this.rowHeight = 50;
    this.components = {FsspMoneyCodesFilterRender: FsspMoneyCodesFilterRender};
  },
  data() {
    return {
      gridApi: null,
      gridOptions: {
        alwaysShowVerticalScroll: true
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
          headerName: 'id',
          headerTooltip: 'id',
          tooltipField: 'id',
          field: 'id',
          filter: false,
          width: 30,
        },
        {
          headerName: 'Фамилия',
          headerTooltip: 'Фамилия',
          tooltipField: 'name_family',
          field: 'name_family',
          filter: true,
          floatingFilterComponentFramework: 'FsspMoneyCodesFilterRender',
          floatingFilterComponentParams: {
            type_f: 'string',
            field: 'name_family',
            emitFilter: 'clear_filter_money_codes_filter',
            emitSet:'set_filter_money_codes_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 50,
        },
        {
          headerName: 'Имя',
          headerTooltip: 'Имя',
          tooltipField: 'name',
          field: 'name',
          filter: true,
          floatingFilterComponentFramework: 'FsspMoneyCodesFilterRender',
          floatingFilterComponentParams: {
            type_f: 'string',
            field: 'name',
            emitFilter: 'clear_filter_money_codes_filter',
            emitSet:'set_filter_money_codes_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 50,
        },
        {
          headerName: 'Отчество',
          headerTooltip: 'Отчество',
          tooltipField: 'name_patronymic',
          field: 'name_patronymic',
          filter: true,
          floatingFilterComponentFramework: 'FsspMoneyCodesFilterRender',
          floatingFilterComponentParams: {
            type_f: 'string',
            field: 'name_patronymic',
            emitFilter: 'clear_filter_money_codes_filter',
            emitSet:'set_filter_money_codes_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 50,
        },
        {
          headerName: 'ДР',
          headerTooltip: 'День рождения',
          tooltipField: 'birthdate_norm',
          field: 'birthdate',
          filter: false,
          width: 50,
        },
        {
          headerName: 'ИД',
          headerTooltip: 'ИД',
          tooltipField: 'number_sa',
          field: 'number_sa',
          filter: false,
          width: 40,
        },
        {
          headerName: '101',
          headerTooltip: '101',
          tooltipField: '101',
          field: '101',
          filter: true,
          floatingFilterComponentFramework: 'FsspMoneyCodesFilterRender',
          floatingFilterComponentParams: {
            type_f: 'chbox',
            field: '101',
            emitFilter: 'clear_filter_money_codes_filter',
            emitSet:'set_filter_money_codes_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 100,
        },
        {
          headerName: '102',
          headerTooltip: '102',
          tooltipField: '102',
          field: '102',
          filter: true,
          floatingFilterComponentFramework: 'FsspMoneyCodesFilterRender',
          floatingFilterComponentParams: {
            type_f: 'chbox',
            field: '102',
            emitFilter: 'clear_filter_money_codes_filter',
            emitSet:'set_filter_money_codes_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 100,
        },
        {
          headerName: '202',
          headerTooltip: '202',
          tooltipField: '202',
          field: '202',
          filter: true,
          floatingFilterComponentFramework: 'FsspMoneyCodesFilterRender',
          floatingFilterComponentParams: {
            type_f: 'chbox',
            field: '202',
            emitFilter: 'clear_filter_money_codes_filter',
            emitSet:'set_filter_money_codes_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 100,
        },
        {
          headerName: '103',
          headerTooltip: '103',
          tooltipField: '103',
          field: '103',
          filter: true,
          floatingFilterComponentFramework: 'FsspMoneyCodesFilterRender',
          floatingFilterComponentParams: {
            type_f: 'chbox',
            field: '103',
            emitFilter: 'clear_filter_money_codes_filter',
            emitSet:'set_filter_money_codes_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 100,
        },
      ],
      components: {
        FsspMoneyCodesFilterRender
      }
    }
  },

  computed: {
    totalPages() {
      if (this.gridApi)
        return Math.ceil(this.TotalFsspMoneyCodesAll / this.paginationPageSize)
      else return 0
    },
    paginationPageSize() {
      if (typeof this.User.pag.fssp_all_money_codes !== 'undefined') {
        if (typeof this.User.pag.fssp_all_money_codes.limit !== 'undefined') return this.User.pag.fssp_all_money_codes.limit;
      }
      return 100;
    },
    ...mapGetters([
      'FsspMoneyCodesAllArr', 'TotalFsspMoneyCodesAll', 'FsspMoneyCodesAllLoadingFlag', 'User'
    ]),
    currentPage: {
      get() {
        if (typeof this.User.pag.fssp_all_money_codes !== 'undefined') {
          if (typeof this.User.pag.fssp_all_money_codes.curPage !== 'undefined') return this.User.pag.fssp_all_money_codes.curPage
        }
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set(val) {
        if (typeof this.User.pag.fssp_all_money_codes !== 'undefined') {
          this.User.pag.fssp_all_money_codes.curPage = val;
          this.setQueryAllFsspMoneyCodesOffset(val - 1);
          this.gridApi.paginationGoToPage(val - 1);
          this.setDataUser().then((response) => {
            this.getFsspMoneyCodesAll().then((response) => {
              this.onGridReady();
            });
          });
        }
      }
    },
    url_text() {
      return '/fssp_money_codes_to_excel/?data='+JSON.stringify(this.User.pag.fssp_all_money_codes);
    }
  },
  methods: {
    onGridReady() {
      this.gridOptions.api.forEachNode(node => node.data.id == this.User.pag.fssp_all_money_codes.selectIdCode ? node.setSelected(true) : node.setSelected(false));
    },
    onrowDoubleClicked(event) {
      this.User.pag.fssp_all_money_codes.selectIdCode = event.data.id;
      this.setDataUser().then((response) => {
        this.$router.push('/debtors/' + event.data.id_credit)
      });
    },
    changePag(pag) {
      this.User.pag.fssp_all_money_codes.limit = pag;
      this.setDataUser().then((response) => {
        this.getFsspMoneyCodesAll().then((response) => {
          this.onGridReady();
        });
      })
      this.setQueryAllFsspMoneyCodesLimit(pag);
      this.gridApi.paginationSetPageSize(pag);
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
      'setQueryAllFsspMoneyCodesLimit', 'setQueryAllFsspMoneyCodesOffset'
    ]),
    ...mapActions([
      'getFsspMoneyCodesAll', 'setDataUser', 'getDataUser'
    ]),
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val)
    },
    onRowDataChanged() {
      Vue.nextTick(() => {
            this.gridOptions.api.sizeColumnsToFit();
          }
      );
    },
    updateSearchField(findField, findFieldName, findType, not_update = false) {
      this.User.pag.fssp_all_money_codes.fields = JSON.parse(this.User.pag.fssp_all_money_codes.fields);
      this.User.pag.fssp_all_money_codes.fields[findFieldName] = {
        find: findField,
        name: findFieldName,
        type: findType
      }
      // console.log(this.User.pag.fssp_all_money_codes.fields, findFieldName, findField)
      this.User.pag.fssp_all_money_codes.fields = JSON.stringify(this.User.pag.fssp_all_money_codes.fields);
      if(!not_update) {
        this.setDataUser().then((response) => {
          this.getFsspMoneyCodesAll().then((response) => {
            this.onGridReady();
          });
        })
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
    filterReset() {
      this.$root.$emit('clear_filter_money_codes_filter');
      this.setDataUser().then((response) => {
        this.getFsspMoneyCodesAll().then((response) => {
          this.onGridReady();
        });
      })
    },
  },
  mounted() {
    let first_load = false;
    this.gridApi = this.gridOptions.api
    this.getDataUser().then((response) => {
      if (typeof this.User.pag.fssp_all_money_codes === 'undefined') {
        this.User.pag.fssp_all_money_codes = {
          fields:"{}",
          offset:0,
          limit:100,
          curPage:1,
          selectIdCode:0,
        }
        first_load = true;
      }
      this.$root.$emit('set_filter_money_codes_filter',JSON.parse(this.User.pag.fssp_all_money_codes.fields));
      this.gridApi.paginationGoToPage(this.User.pag.fssp_all_money_codes.curPage - 1);
      if (first_load) {
        this.getFsspMoneyCodesAll();
      }
    });
  },

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

.vh75 {
  min-height: 75vh;
}

.load-bar {
  display: inline-block;
  max-width: 100px;
}

.outer-div {
  padding: 20%;
  text-align: center;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(200, 80%, 90%, 0.3);
}

.out-main {
  position: relative;
}
</style>
