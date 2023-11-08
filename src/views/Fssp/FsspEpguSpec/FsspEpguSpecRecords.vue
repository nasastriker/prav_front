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
                  TotalFsspEpguSpecRecords - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalFsspEpguSpecRecords
                }} of {{ TotalFsspEpguSpecRecords }}</span>
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

        <div style="display: flex">
          <vs-button color="success" type="filled" @click="newRecord"> + Новый тип спецификации ЕПГУ</vs-button>
          <vs-button style="margin-left: 15px" color="success" type="filled" @click="updateRecords">Обновить</vs-button>
          <vs-button style="margin-left: 15px" @click="filterReset">Сбросить фильтры</vs-button>
        </div>

      </div>
      <div class="out-main-fssp-hod-records">
        <ag-grid-vue
            ref="agGridTable"
            :gridOptions="gridOptions"
            :components="components"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="FsspEpguSpecRecords"
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
            :overlayNoRowsTemplate="'Нет записей'"
            :enableBrowserTooltips="true"
            :enableRtl="$vs.rtl">
        </ag-grid-vue>
        <transition name="fade">
          <div class="tablePreloader outer-div" v-if="FsspEpguSpecRecordsLoadingFlag">
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
import {mapActions, mapGetters, mapMutations} from 'vuex';
import FsspEpguSpecRecordsFilterRender from "./Render/FsspEpguSpecRecordsFilterRender.vue";
import OperFsspEpguSpecTypesRecords from "./Render/OperFsspEpguSpecTypesRecords.vue";

export default {
  components: {
    FsspEpguSpecRecordsFilterRender,OperFsspEpguSpecTypesRecords
  },
  beforeMount() {
    this.defaultColDef = {resizable: true};
    this.rowHeight = 50;
    this.components = {FsspEpguSpecRecordsFilterRender: FsspEpguSpecRecordsFilterRender};
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
          headerName: 'Код',
          headerTooltip: 'Код',
          tooltipField: 'code',
          field: 'code',
          filter: true,
          floatingFilterComponentFramework: 'FsspEpguSpecRecordsFilterRender',
          floatingFilterComponentParams: {
            type_f: 'string',
            field: 'code',
            emitFilter: 'clear_filter_fssp_epgu_spec_records_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 50,
        },
        {
          headerName: 'Наименование',
          headerTooltip: 'Наименование',
          tooltipField: 'name',
          field: 'name',
          filter: true,
          floatingFilterComponentFramework: 'FsspEpguSpecRecordsFilterRender',
          floatingFilterComponentParams: {
            type_f: 'string',
            field: 'name',
            emitFilter: 'clear_filter_fssp_epgu_spec_records_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 250,
        },
        {
          headerName: 'Операции',
          headerTooltip: 'Операции',
          field: 'id',
          filter: false,
          width: 50,
          cellRendererFramework: 'OperFsspEpguSpecTypesRecords',
          cellRendererParams: {
            questDeleteRecord: this.questDeleteRecord.bind(this),
          }
        },
      ],
      components: {
        FsspEpguSpecRecordsFilterRender,OperFsspEpguSpecTypesRecords
      }
    }
  },

  computed: {
    totalPages() {
      if (this.gridApi)
        return Math.ceil(this.TotalFsspEpguSpecRecords / this.paginationPageSize)
      else return 0
    },
    paginationPageSize() {
      return this.FsspEpguSpecRecordsData.limit;
    },
    ...mapGetters([
      'FsspEpguSpecRecords', 'TotalFsspEpguSpecRecords', 'FsspEpguSpecRecordsLoadingFlag', 'FsspEpguSpecRecordsData'
    ]),
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set(val) {
        this.setQueryFsspEpguSpecRecordsOffset(val - 1);
        this.getFsspEpguSpecRecords();
        this.gridApi.paginationGoToPage(val - 1);
      }
    },
  },
  methods: {
    questDeleteRecord(data) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'red',
        title: 'Удаление ' + data.name,
        text: 'Вы действительно хотите удалить ' + data.name + '?',
        accept: () => {
          this.deleteFsspEpguSpecRecord(data.id).then((response) => {
            if (response.result) {
              this.$vs.notify({
                title: 'Сообщение',
                text: 'Тип спецификации удален',
                color: 'success',
                position: 'top-center'
              })
              this.updateRecords();
            } else {
              this.$vs.notify({
                title: 'Ошибка',
                text: response.error,
                color: 'danger',
                position: 'top-center'
              })
            }
          }).catch(error => {
            this.$vs.notify({
              title: 'Ошибка',
              text: error.message,
              color: 'danger',
              position: 'top-center'
            })
          });
        },
        acceptText: 'Удалить',
        cancelText: 'Отмена'
      });
    },
    newRecord() {
      this.$router.push('/fssp_epgu_spec_type/new');
    },
    updateRecords() {
      this.getFsspEpguSpecRecords();
    },
    onrowDoubleClicked(event) {
      this.$router.push('/fssp_epgu_spec_type/' + event.data.id);
    },
    changePag(pag) {
      this.FsspEpguSpecRecordsData.limit = pag;
      this.getFsspEpguSpecRecords();
      this.setQueryFsspEpguSpecRecordsLimit(pag);
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
      'setQueryFsspEpguSpecRecordsLimit', 'setQueryFsspEpguSpecRecordsOffset'
    ]),
    ...mapActions([
        'getFsspEpguSpecRecords','deleteFsspEpguSpecRecord'
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
      this.FsspEpguSpecRecordsData.fields[findFieldName] = {
        find: findField,
        name: findFieldName,
        type: findType
      }
      if(!not_update) {
          this.getFsspEpguSpecRecords();
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
      this.$root.$emit('clear_filter_fssp_epgu_spec_records_filter');
      this.getFsspEpguSpecRecords();
    },
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.getFsspEpguSpecRecords();
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

.outer-div-fssp-hod-records {
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

.out-main-fssp-hod-records {
  position: relative;
}
</style>
