<template>
  <div id="page-user-list">
    <div class="vx-card p-6 no-shadow">
      <div class="flex flex-wrap justify-between items-center">
        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
          <vs-dropdown vs-trigger-click class="cursor-pointer mb-4">
            <div class="p-3 cursor-pointer flex items-center justify-between font-medium" style="margin-top: 10px;border: 1px solid #ccc;border-radius: 4px;">
                            <span class="mr-2">
                                {{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ UnrecognizedFilesTotal - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : UnrecognizedFilesTotal }} of {{ UnrecognizedFilesTotal }}
                            </span>
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
        <div style="display: flex">
          <vs-button color="success" type="filled" @click="updateRecords">Обновить</vs-button>
          <vs-button style="margin-left: 15px" @click="filterReset">Сбросить фильтры</vs-button>
          <vs-button color="success" style="margin-left: 15px" @click="createHand"> + Создать вручную</vs-button>
        </div>
      </div>
      <div class="out-main">
        <ag-grid-vue ref="agGridTable" :gridOptions="gridOptions" :components="components" class="ag-theme-material w-100 my-4 ag-grid-table unrecognized_files_table" :columnDefs="columnDefs" :defaultColDef="defaultColDef" :rowData="UnrecognizedFilesList" rowSelection="multiple" :rowDataChanged="onRowDataChanged" colResizeDefault="shift" :animateRows="true" :floatingFilter="true" :pagination="true" :paginationPageSize="paginationPageSize" :suppressPaginationPanel="true" @grid-size-changed="onGridSizeChanged" @column-resized="onColumnResized" @column-visible="onColumnVisible" @rowDoubleClicked="onrowDoubleClicked" :overlayNoRowsTemplate="'Нет записей'" :enableRtl="$vs.rtl" enableBrowserTooltips="true">
        </ag-grid-vue>

        <transition name="fade">
          <div class="tablePreloader outer-div" v-if="UnrecognizedFilesLoadingFlag">
            <img class="load-bar" src="/loading.gif">
            <span>Идёт загрузка</span>
          </div>
        </transition>

      </div>
      <vs-pagination :total="totalPages" :max="7" v-model="currentPage" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import UnrecognizedFilesFilterRender from "./Render/UnrecognizedFilesFilterRender.vue";
import OpenStatus from "./Render/OpenStatus.vue";
import OpenCountFiles from "./Render/OpenCountFiles.vue";
import Open from "./Render/Open.vue"
export default {
  components: {
    UnrecognizedFilesFilterRender,
    OpenStatus,
    OpenCountFiles,
    Open
  },
  beforeMount() {
    this.defaultColDef = { resizable: true };
    this.rowHeight = 50;
    this.components = { UnrecognizedFilesFilterRender: UnrecognizedFilesFilterRender };
  },
  data() {
    return {
      all:false,
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
      columnDefs: [{
        headerName: '№',
        headerTooltip: '№',
        tooltipField: 'id',
        field: 'id',
        filter: true,
        floatingFilterComponentFramework: 'UnrecognizedFilesFilterRender',
        floatingFilterComponentParams: {
          type_f: 'string',
          // placeholder: 'Введите значение',
          field: 'unrecognized_file_records.id',
          emitFilter: 'clear_filter_unrecognized_files_filter',
          updateSearchField: this.updateSearchField.bind(this)
        },
        hide: false,
        width: 20,
      },
        {
          headerName: 'Фамилия',
          headerTooltip: 'Фамилия',
          tooltipField: 'name_family',
          field: 'name_family',
          filter: true,
          floatingFilterComponentFramework: 'UnrecognizedFilesFilterRender',
          floatingFilterComponentParams: {
            type_f: 'string',
            field: 'name_family',
            placeholder: 'Введите значение',
            emitFilter: 'clear_filter_unrecognized_files_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 45,
        },
        {
          headerName: 'Имя',
          headerTooltip: 'Имя',
          tooltipField: 'name_debtor',
          field: 'name_debtor',
          filter: true,
          floatingFilterComponentFramework: 'UnrecognizedFilesFilterRender',
          floatingFilterComponentParams: {
            type_f: 'string',
            field: 'debtors.name',
            placeholder: 'Введите значение',
            emitFilter: 'clear_filter_unrecognized_files_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 45,
        },
        {
          headerName: 'Отчество',
          headerTooltip: 'Отчество',
          tooltipField: 'name_patronymic',
          field: 'name_patronymic',
          filter: true,
          floatingFilterComponentFramework: 'UnrecognizedFilesFilterRender',
          floatingFilterComponentParams: {
            type_f: 'string',
            field: 'name_patronymic',
            placeholder: 'Введите значение',
            emitFilter: 'clear_filter_unrecognized_files_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 45,
        },
        {
          headerName: 'Дата Рождения',
          headerTooltip: 'Дата Рождения',
          tooltipField: 'birthdate_norm',
          field: 'birthdate_norm',
          filter: true,
          width: 60,
          floatingFilterComponentFramework: 'UnrecognizedFilesFilterRender',
          floatingFilterComponentParams: {
            type_f: 'date',
            field: 'birthdate',
            emitFilter: 'clear_filter_unrecognized_files_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },

        },
        {
          headerName: '№ ИД',
          headerTooltip: '№ Исполнительного документа',
          tooltipField: 'number_sa',
          field: 'number_sa',
          filter: false,
          width: 50,
        },
        {
          headerName: 'Дата ИД',
          headerTooltip: 'Дата Исполнительного документа',
          tooltipField: 'date_sa',
          field: 'date_sa',
          filter: false,
          width: 30,

        },
        {
          headerName: 'Файл',
          headerTooltip: 'Файл',
          tooltipField: 'count_files',
          field: 'count_files',
          filter: false,
          width: 30,
          cellRendererFramework: 'OpenCountFiles',
        },

        {
          headerName: 'Канал ЭДО',
          headerTooltip: 'Канал ЭДО',
          tooltipField: 'from_type_norm',
          field: 'from_type_norm',
          filter: true,
          floatingFilterComponentFramework: 'UnrecognizedFilesFilterRender',
          floatingFilterComponentParams: {
            type_f: 'list_from_type',
            field: 'from_type',
            placeholder: 'Выбирите значение',
            emitFilter: 'clear_filter_unrecognized_files_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 130,
        },
        {
          headerName: 'Дата поступления',
          headerTooltip: 'Дата поступления',
          tooltipField: 'date_receive_norm',
          field: 'date_receive_norm',
          filter: true,
          floatingFilterComponentFramework: 'UnrecognizedFilesFilterRender',
          floatingFilterComponentParams: {
            type_f: 'date',
            field: 'date_receive',
            emitFilter: 'clear_filter_unrecognized_files_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 50
        },
        {
          headerName: 'Статус',
          headerTooltip: 'Статус',
          tooltipField: 'record_status',
          field: 'record_status',
          filter: true,
          floatingFilterComponentFramework: 'UnrecognizedFilesFilterRender',
          floatingFilterComponentParams: {
            type_f: 'list_record_status',
            field: 'record_status',
            placeholder: 'Выбирите значение',
            emitFilter: 'clear_filter_unrecognized_files_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 50,
          cellRendererFramework: 'OpenStatus',
        },
        {
          headerName: 'Операции',
          headerTooltip: 'Операции',
          field: 'id',
          filter: false,
          width: 30,
          cellRendererFramework: 'Open',
          // cellRendererParams: {
          //   deleteArch: this.deleteArch.bind(this)
          // }
        },

      ],
      components: {
        UnrecognizedFilesFilterRender,
        OpenStatus,
        OpenCountFiles,
        Open,
      }
    }
  },

  computed: {
    totalPages() {
      if (this.gridApi)
        return Math.ceil(this.UnrecognizedFilesTotal / this.paginationPageSize)
      else return 0
    },
    paginationPageSize() {
      return this.UnrecognizedFilesData.limit
    },
    ...mapGetters([
      'UnrecognizedFilesList', 'UnrecognizedFilesTotal', 'UnrecognizedFilesLoadingFlag', 'UnrecognizedFilesData'

    ]),
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set(val) {
        this.setQueryUnrecognizedFilesOffset(val - 1);
        this.getUnrecognizedFilesList();
        this.gridApi.paginationGoToPage(val - 1);
      }
    },

  },
  methods: {
    createHand() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'success',
        title: 'Создание записи',
        text: 'Вы действительно хотите создать запись?',
        accept: () => {
          this.createUnrecognizedFilesRecordHand(null).then((response) => {
            console.log("RESPONSE", response)
            if (response.result) {
              this.$vs.notify({
                title: 'Сообщение',
                text: response.msg,
                color: 'success',
                position: 'top-center'
              });
              this.filterReset();
              this.$router.push('/unrecognized_files/' + response.id_record)
            } else {
              this.$vs.notify({
                title: 'Ошибка',
                text: response.error,
                color: 'danger',
                position: 'top-center'
              })
            }
          })
        },
        acceptText: 'Создать',
        cancelText: 'Отмена'
      })
    },
    updateRecords() {
      this.getUnrecognizedFilesList();
    },
    onrowDoubleClicked(event) {
      // this.$router.push('/debtors/' + event.data.id_credit)
      this.$router.push('/unrecognized_files/' + event.data.id)
    },
    changePag(pag) {
      this.UnrecognizedFilesData.limit = pag;
      this.getUnrecognizedFilesList();
      this.setQueryUnrecognizedFilesLimit(pag);
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
      'setQueryUnrecognizedFilesLimit', 'setQueryUnrecognizedFilesOffset'
    ]),
    ...mapActions([
      'getUnrecognizedFilesList', 'getUnrecognizedFilesRecordStatuses', 'getUnrecognizedFilesFromTypes',
      'createUnrecognizedFilesRecordHand'
    ]),
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val)
    },
    onRowDataChanged() {
      Vue.nextTick(() => {
        this.gridOptions.api.sizeColumnsToFit();
      });
    },
    updateSearchField(findField, findFieldName, findType, not_update = false) {
      this.UnrecognizedFilesData.fields[findFieldName] = {
        find: findField,
        name: findFieldName,
        type: findType
      }
      this.getUnrecognizedFilesList();
    },
    setColumnFilter(column, val) {
      const filter = this.gridApi.getFilterInstance(column)
      let modelObj = null

      if (val !== 'all') {
        modelObj = { type: 'equals', filter: val }
      }

      filter.setModel(modelObj)
      this.gridApi.onFilterChanged()
    },
    filterReset() {
      this.$root.$emit('clear_filter_unrecognized_files_filter')
      this.UnrecognizedFilesData.fields = {};
      this.getUnrecognizedFilesList();
    },
  },
  mounted() {
    this.gridApi = this.gridOptions.api
    this.getUnrecognizedFilesList();
    this.getUnrecognizedFilesRecordStatuses();
    this.getUnrecognizedFilesFromTypes();
  },

}
</script>
<style lang="scss">
.unrecognized_files_table{
  .ag-floating-filter-body{
    .select2{
      width: 100%!important;
      margin-left: 19px;
      .select2-selection--single{
        border: none;
        .select2-selection__rendered {
          color: #444;
          line-height: 28px;
          font-weight: 100;
        }
      }
    }
  }
  .ag-header-cell {
    span.input-span-placeholder.vs-input--placeholder.normal{
      font-size: 12px!important;
      line-height: 18px;
      padding: 0!important;
    }
    .ag-floating-filter-button {
      margin-left: -24px;
    }
  }
}

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

[dir] .ag-grid-table .ag-header-viewport .vs-input--placeholder {
    top: 0.7rem;
    left: 0.7rem;
    border-radius: 0;
}

[dir] .ag-header-row:nth-child(2) .ag-header-cell:first-child {
    padding: 0!important;
}

[dir] .ag-header-row:first-child .ag-header-cell:first-child {
    padding: 0 11px 0 11px!important;
}


</style>