<template>
  <div id="page-user-list">
    <div class="flex flex-wrap justify-between items-center">
      <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ FnsAnswerProblemChunksTotal - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : FnsAnswerProblemChunksTotal }} of {{ FnsAnswerProblemChunksTotal }}</span>
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
        style="height: 400px"
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="FnsAnswerProblemChunks"
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
        :enableRtl="$vs.rtl">
    </ag-grid-vue>

    <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage" />

    <div style="margin-top: 20px">
      <span><b>RegEx 1 отделение части:</b> [ИН|ин][\D]*\s*([\d\s]*).*\sФ..\s*Ф.[:;.,]*?\s([\D\d]*?)(Место|Дата рождения|Дата)</span><br>
      <span><b>RegEx 2 отделение части:</b> КНД\s*1120498\s*.*?№\s*(.*?)(ИН.|ин.|Ин.|иН.).\s*(\d*)\s*(Дата\sрождения|Дата|.*?Место|.*Дата)</span><br>
      <br>
      <span><b>RegEx 1 поиск данных:</b> [ИН|ин][\D]*\s*([\d\s]*).*\sФ..\s*Ф.[:;.,]*?\s([\D\d]*?)\nДата рождения.\s(\d{2}\.\d{2}\.\d{4})</span><br>
      <span><b>RegEx 1 поиск данных:</b> [ИН|ин][\D]*\s*([\d\s]*).*\sФ..\s*Ф.[:;.,]*?\s([\D\d]*?)\nДата рождения</span><br>
      <span><b>RegEx 1 поиск данных:</b> [ИН|ин][\D]*\s*([\d\s]*).*\sФ..\s*Ф.[:;.,]*?\s([\D]*?)\n</span><br>
      <span><b>RegEx 2 поиск данных:</b> КНД\s*1120498\s*.*?№\s*(.*?)(ИН.|ин.|Ин.|иН.).\s*(\d*)\s*(Дата\sрождения).\s*(\d{2}\.\d{2}\.\d{4})</span><br>
      <span><b>RegEx 2 поиск данных:</b> КНД\s*1120498\s*.*?№\s*(.*?)(ИН.|ин.|Ин.|иН.).\s*(\d*)\s*(.*?Место|.*Дата|Дата\sрождения)</span><br>
      <br>
      <span><b>RegEx поиск банков:</b> РегНом\/Но.\s*Ф.\s*(.*?)\/(\d*)</span>

      <vs-textarea v-if="statusProblemChunkText == 0" class="w-100" rows="10" style="min-height: 200px;" v-model="problemChunk.text"></vs-textarea>
      <vs-textarea v-else class="w-100" rows="10" style="min-height: 200px;" v-model="problemChunk.text_wo_enters"></vs-textarea>
    </div>
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';
import OpenShowTextFnsAnswer from "./OpenShowTextFnsAnswer.vue";
import OpenShowTextFnsAnswerWoEnter from "./OpenShowTextFnsAnswerWoEnter.vue";
export default {
  components: {
    OpenShowTextFnsAnswer,OpenShowTextFnsAnswerWoEnter
  },
  data () {
    return {
      statusProblemChunkText:0,
      problemChunk:{},
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'Дата/время',
          field: 'created_at_norm',
          filter: true,
          width: 80
        },
        {
          headerName: 'Фамилия',
          field: 'last_name_norm',
          filter: true,
          width: 150,
        },
        {
          headerName: 'Имя',
          field: 'first_name_norm',
          filter: true,
          width: 150
        },
        {
          headerName: 'Отчество',
          field: 'middle_name_norm',
          filter: true,
          width: 150,
        },
        {
          headerName: 'ИНН',
          field: 'inn_norm',
          filter: true,
          width: 80,
        },
        {
          headerName: 'ДР',
          field: 'dr_norm',
          filter: true,
          width: 80,
        },
        {
          headerName: 'Проблема',
          field: 'problem_text',
          filter: true,
          width: 100,
        },
        {
          headerName: '',
          field: 'dr_norm',
          filter: true,
          width: 80,
          cellRendererFramework: 'OpenShowTextFnsAnswer',
          cellRendererParams: {
            showTextStartAnswerFns: this.showTextStartAnswerFns.bind(this),
          }
        },
        {
          headerName: '',
          field: 'dr_norm',
          filter: true,
          width: 80,
          cellRendererFramework: 'OpenShowTextFnsAnswerWoEnter',
          cellRendererParams: {
            showTextStartAnswerFns: this.showTextStartAnswerFns.bind(this),
          }
        },
      ],

      components: {
        OpenShowTextFnsAnswer,OpenShowTextFnsAnswerWoEnter
      }
    }
  },

  computed: {
    totalPages () {
      if (this.gridApi)
        return Math.ceil(this.FnsAnswerProblemChunksTotal/this.paginationPageSize)
      else return 0
    },
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 100
    },
    ...mapGetters([
        'FnsAnswerProblemChunks','FnsAnswerProblemChunksTotal'
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
    showTextStartAnswerFns(chunk, status){
      this.problemChunk = chunk;
      this.statusProblemChunkText = status;
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
        'getTextProblemChunkFnsAnswer'
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
    this.gridApi = this.gridOptions.api;
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
