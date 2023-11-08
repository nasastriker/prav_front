<template>
  <div id="page-user-list">
    <div class="vx-card p-6" style="box-shadow: none">
      <div v-if="type_oper == 'ReqFssp'">
    <div class="flex flex-wrap justify-between items-center">
      <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ FsspJournalAnswerTotal - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : FsspJournalAnswerTotal }} of {{ FsspJournalAnswerTotal }}</span>
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
    </div>
    <ag-grid-vue
        style="width: 1200px;height: 490px"
        ref="agGridTable"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="FsspJournalAnswer"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="false"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        @grid-size-changed="onGridSizeChanged"
        @column-resized="onColumnResized"
        @column-visible="onColumnVisible"
        @rowClicked = "onRowClicked"
        :enableRtl="$vs.rtl">
    </ag-grid-vue>

    <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage" />

        <h5 style="margin-top: 20px">
          <b>ID:</b> {{ answerData.doc_id }} / <b>Тип:</b> {{ answerData.doc_type_name }} <br>
          <b>Дата:</b> {{ answerData.doc_date }} / <b>Корреспонденты:</b> {{ answerData.correspondents_str }} <br>
          <b>Описание:</b> {{ answerData.description }}
        </h5>

      </div>
      <div v-else>
        <json-viewer
            :value="FsspJournalAnswerOne"
            :expand-depth=5
            copyable

            sort></json-viewer>
      </div>

  </div>
  </div>

</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import { mapActions,mapGetters } from 'vuex';
import JsonViewer from 'vue-json-viewer';
export default {
  components: {
    AgGridVue,JsonViewer
  },
  props: {
    type_oper:null,
  },
  data () {
    return {
      answerData:{
        doc_type_name:null,
        doc_date:null,
        correspondents_str:null,
        description:null,
      },
      answerTotal:0,
      // AgGrid
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
          field: 'doc_id',
          filter: true,
          width: 100,
        },
        {
          headerName: 'Тип',
          field: 'doc_type_name',
          filter: true,
          width: 200,
        },
        {
          headerName: 'Дата',
          field: 'doc_date',
          filter: true,
          width: 50,
        },
        {
          headerName: 'Корреспонденты',
          field: 'correspondents_str',
          filter: true,
          width: 200,
        },
        {
          headerName: 'Описание',
          field: 'description',
          filter: true,
          width: 200
        },
      ],
    }
  },

  computed: {
    totalPages () {
      this.gridApi = this.gridOptions.api
      if (this.gridApi)
        return Math.ceil(this.FsspJournalAnswerTotal/this.paginationPageSize)
      else return 0
    },
    paginationPageSize () {
      this.gridApi = this.gridOptions.api
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 20
    },
    ...mapGetters([
        'FsspJournalAnswer','FsspJournalAnswerTotal','FsspJournalAnswerOne'
    ]),
    currentPage: {
      get () {
        this.gridApi = this.gridOptions.api
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.gridApi = this.gridOptions.api
        this.gridApi.paginationGoToPage(val - 1)
      }
    },

  },
  methods: {
    onColumnResized(params) {
      params.api.resetRowHeights();
    },
    onColumnVisible(params) {
      params.api.resetRowHeights();
    },
    onGridSizeChanged(params) {
      this.gridApi = this.gridOptions.api
      this.gridApi.sizeColumnsToFit();
    },
    ...mapActions([
      'getJournalAnswerData'
    ]),
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    onRowClicked(event){
      this.answerData.doc_id = event.data.doc_id;
      this.answerData.doc_type_name = event.data.doc_type_name;
      this.answerData.doc_date = event.data.doc_date;
      this.answerData.correspondents_str = event.data.correspondents_str;
      this.answerData.description = event.data.description;
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
.load-bar{
  display: inline-block;
  max-width: 100px;
}

.outer-divd
{
  padding: 25%;
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
