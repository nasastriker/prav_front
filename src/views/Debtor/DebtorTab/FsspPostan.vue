<template>
  <div id="page-user-list">
    <div class="vx-card p-6" style="box-shadow: none">
    <div class="flex flex-wrap justify-between items-center">
      <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalPostanFssp - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalPostanFssp }} of {{ TotalPostanFssp }}</span>
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
      <!--                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">-->
      <!--                    <vs-button class="mb-4 md:mb-0 mr-4" color="danger" type="filled"-->
      <!--                             @click="runJobFsspMonday">Запустить выгрузку</vs-button>-->
      <!--                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />-->
      <!--                </div>-->
<!--      <vs-input type="date" v-model="FsspJournalDataOne.pag.date_send_journal_one"-->
<!--                @change="changeDate"></vs-input>-->
<!--      <v-select style="width: 280px;margin-left: 10px" :reduce="label => label.id" label="val" :options="TypesOperFsspAll" v-model="FsspJournalDataOne.pag.type_oper_one" @input="changeDate"></v-select>-->
<!--&lt;!&ndash;      <div v-if="FsspJournalLoadingFlagOne" style="margin-right: auto;">&ndash;&gt;-->
<!--&lt;!&ndash;      v-if="FsspJournalLoadingFlagOne"&ndash;&gt;-->
<!--        <img v-if="FsspJournalLoadingFlagOne" class="load-bar" style="max-height: 30px" src="/loading.gif">-->
<!--      <div style="margin-right: auto;"></div>-->
<!--      </div>-->
<!--      <vs-button @click="filterReset">Сбросить фильтры</vs-button>-->
    </div>
      <div class="out-main">
        <ag-grid-vue
            ref="agGridTable"
            :gridOptions="gridOptions"
            class="ag-theme-material w-100 my-4 ag-grid-table type_order_restrictions unrecognized_files_table"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="FsspPostanArr"
            rowSelection="multiple"
            :rowDataChanged = "onRowDataChanged"
            colResizeDefault="shift"
            :animateRows="true"
            :floatingFilter="true"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :suppressPaginationPanel="true"
            @grid-size-changed="onGridSizeChanged"
            @column-resized="onColumnResized"
            @column-visible="onColumnVisible"
            :enableBrowserTooltips="true"
            :enableRtl="$vs.rtl"
            :overlayLoadingTemplate="'Идёт загрузка'"
            :overlayNoRowsTemplate="'Нет записей'">
        </ag-grid-vue>
        <transition name="fade">
            <div class="tablePreloader outer-div" v-if="FsspPostanOneLoadingFlag">
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
  </div>

</template>

<script>
import { VueCsvImport } from 'vue-csv-import';
import FileLink from "./Render/FileLink.vue";
import ResCheck from "./Render/ResCheck.vue";
import PostanFilterRender from "./Render/PostanFilterRender.vue";
import { mapActions,mapGetters } from 'vuex'
export default {
  components: {
    VueCsvImport,
    FileLink,
    ResCheck,
    PostanFilterRender
  },
  beforeMount() {

    this.defaultColDef = { resizable: true };
    this.rowHeight = 50;
    this.components={PostanFilterRender:PostanFilterRender};
  },
  data () {
    return {
      searchQuery: '',
      csv:[],
      // AgGrid
      gridApi: null,
      gridOptions: {
        alwaysShowVerticalScroll:true
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
          headerName: 'Номер ИП',
          tooltipField: 'number_ip',
          field: 'number_ip',
          filter: false,
          width: 80,
        },
        {
          headerName: 'Вид постановления',
          tooltipField: 'doc_name',
          field: 'doc_name',
          filter: true,
          floatingFilterComponentFramework: 'PostanFilterRender',
          floatingFilterComponentParams:{
            type_f: 'list',
            field: 'doc_type',
            emitFilter:'clear_filter_postan_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide:false,
          width: 150,
        },
        {
          headerName: 'Идентификатор',
          tooltipField: 'doc_id',
          field: 'doc_id',
          filter: false,
          width: 50,
        },
        {
          headerName: 'Дата постановления',
          tooltipField: 'doc_date_norm',
          field: 'doc_date_norm',
          filter: false,
          width: 50,
        },
        {
          headerName: 'Файл постановления',
          tooltipField: 'file_name',
          field: 'file_name',
          filter: false,
          width: 100,
          cellRendererFramework: 'FileLink',
        },
        {
          headerName: 'Получатель',
          tooltipField: 'receiver',
          field: 'receiver',
          filter: false,
          width: 150,
        },
        {
          headerName: 'Признак ПМ',
          tooltipField: 'priznak_pm_norm',
          field: 'priznak_pm_norm',
          filter: false,
          width: 50,
        },
        {
          headerName: 'Результат проверки',
          field: 'check_result',
          filter: false,
          width: 50,
          cellRendererFramework: 'ResCheck',
        },
        {
          headerName: 'Дата обжалования',
          tooltipField: 'date_claim_norm',
          field: 'date_claim_norm',
          filter: false,
          width: 50,
        },
      ],
      components: {
        FileLink,
        PostanFilterRender
      }

    }
  },

  computed: {
    totalPages () {
      if (this.gridApi)
        return Math.ceil(this.TotalPostanFssp/this.paginationPageSize)
      else return 0
    },
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 100
    },
    ...mapGetters([
      'FsspPostanArr','TotalPostanFssp','Deb','PostanOne','FsspPostanOneLoadingFlag'

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
    changeDate(){
      // this.getFsspMainOneJournal(this.Deb.debtorCredit.id);
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
      'getFsspPostans','getFsspPostanDocTypes'
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
    updateSearchField(findField, findFieldName, findType, not_update=false){
      // this.User.pag.credit.find=''
      // console.log(111)
      this.PostanOne.pag.fields[findFieldName]={
        find:findField,
        name:findFieldName,
        type: findType
      }
      this.getFsspPostans(this.Deb.debtorCredit.id);
      // if(!not_update)this.getDataCredits(this.User.pag.credit);
    },
    setColumnFilter (column, val) {
      const filter = this.gridApi.getFilterInstance(column)
      let modelObj = null

      if (val !== 'all') {
        modelObj = { type: 'equals', filter: val }
      }

      filter.setModel(modelObj)
      this.gridApi.onFilterChanged()
    },
    filterReset(){
      this.$root.$emit('clear_filter_postan_filter')
    },
  },
  mounted () {
    this.gridApi = this.gridOptions.api
    this.getFsspPostans(this.Deb.debtorCredit.id);
    this.getFsspPostanDocTypes();
    // this.filterReset();
  }
}

</script>

<style lang="scss">
.unrecognized_files_table.type_order_restrictions .ag-floating-filter-body .select2 {
    margin-left: 12px;
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
.vh75{
  min-height: 75vh;
}
.load-bar-postan{
  display: inline-block;
  max-width: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
}

.outer-div-postan
{
  padding: 20%;
  text-align: center;
  z-index : 10;
  position : absolute;
  top : 0;
  left : 0;
  width: 100%;
  height: 100%;
  background-color: hsla(200, 80%, 90%, 0.3);
}

.out-main{
  position : relative;
}
</style>
