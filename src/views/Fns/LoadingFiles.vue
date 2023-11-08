<template>
  <div id="page-user-list">
    <div class="flex flex-wrap justify-between items-center">
      <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <div class="cursor-pointer flex items-center justify-between font-medium" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ FnsTotalLoadFiles - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : FnsTotalLoadFiles }} of {{ FnsTotalLoadFiles }}</span>
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
        <vs-button style="margin-left: 10px;" color="success" class="pull-right" type="filled" @click="refreshTableLoadFiles">Обновить</vs-button>
        <span style="margin-left: 10px;font-size: medium">Осталось файлов на загрузке: {{ CountFnsFilesLeft }}</span>
      </div>
    </div>
      <div class="out-main">
    <ag-grid-vue
        style="height: 650px"
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="FnsLoadFiles"
        rowSelection="multiple"
        @rowDoubleClicked="onrowDoubleClicked"
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
        :overlayNoRowsTemplate="'Нет файлов'"
        :enableRtl="$vs.rtl"
        :rowClassRules="rowClassRules"
        :enableBrowserTooltips="true">
    </ag-grid-vue>
        <transition name="fade">
          <div class="outer-div-22" v-if="FnsLoadingFlagLoadFiles"><img class="load-bar-22" src="/loading.gif"></div>
        </transition>
      </div>

    <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage" />

      <vs-popup classContent="popup-example" title="Ошибка" :active.sync="popTaskSud">
        <vs-textarea class="w-100" height="600px" v-model="error"></vs-textarea>
      </vs-popup>

    <vs-popup fullscreen classContent="popup-example" :title="namePopupProblem" :active.sync="showNotBinded">
      <ProblemFnsChunks></ProblemFnsChunks>
    </vs-popup>
  </div>
</template>

<script>
import FnsLoadStatus from "./Render/FnsLoadStatus.vue";
import FileLink from "./Render/FileLink.vue";
import { mapActions,mapGetters } from 'vuex'
import ChunksCountBinded from "./Render/ChunksCountBinded.vue";
import ChunksCountNotBinded from "./Render/ChunksCountNotBinded.vue";
import ChunksCountProblem from "./Render/ChunksCountProblem.vue";
import ProblemFnsChunks from "./Render/ProblemFnsChunks.vue";
export default {
  components: {
    FnsLoadStatus,
    FileLink,
    ChunksCountBinded,
    ChunksCountNotBinded,
    ChunksCountProblem,
    ProblemFnsChunks
  },
  data () {
    return {
      searchQuery: '',
      namePopupProblem: '',
      popTaskSud:false,
      showNotBinded:false,
      error:'',
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
          headerName: 'Дата/время',
          field: 'updated_at_norm',
          filter: true,
          width: 80
        },
        {
          headerName: 'Статус',
          field: 'status',
          filter: true,
          width: 70,
          cellRendererFramework: 'FnsLoadStatus'
        },
        {
          headerName: 'Ошибка',
          field: 'error',
          filter: true,
          width: 130
        },
        {
          headerName: 'Файл',
          field: 'file_name',
          filter: true,
          width: 270,
          cellRendererFramework: 'FileLink',
        },
        {
          headerName: 'Привязанных',
          field: 'binded_chunks_count',
          filter: true,
          width: 100,
          cellRendererFramework: 'ChunksCountBinded'
        },
        {
          headerName: 'Не привязанных',
          field: 'not_binded_chunks_count',
          filter: true,
          width: 100,
          cellRendererFramework: 'ChunksCountNotBinded',
          cellRendererParams: {
            showProblemChunks: this.showProblemChunks.bind(this),
          }
        },
        {
          headerName: 'Проблемных',
          field: 'problem_chunks_count',
          filter: true,
          width: 100,
          cellRendererFramework: 'ChunksCountProblem',
          cellRendererParams: {
            showProblemChunks: this.showProblemChunks.bind(this),
          }
        },
      ],

      components: {
        FnsLoadStatus,FileLink,ChunksCountBinded,ChunksCountNotBinded,ChunksCountProblem
      }
    }
  },

  computed: {
    totalPages () {
      if (this.gridApi)
        return Math.ceil(this.FnsTotalLoadFiles/this.paginationPageSize)
      else return 0
    },
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 100
    },
    ...mapGetters([
      'FnsLoadFiles','FnsTotalLoadFiles','FnsLoadingFlagLoadFiles','CountFnsFilesLeft'

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
    showProblemChunks(id_task, status){
      this.getProblemChunksFnsAnswer({id_file:this.$route.params.id,status:status,id_task:id_task}).then((response) => {
        if (response.result) {
          if (status == 0) {
            this.namePopupProblem = 'Не привязанные части файла';
          } else {
            this.namePopupProblem = 'Проблемные части файла';
          }
          this.showNotBinded = true;
        }
      });
    },

    refreshTableLoadFiles(){
      this.getLoadFiles(this.$route.params.id);
    },
    onrowDoubleClicked(event){
      this.error=event.data.error;
      this.popTaskSud=true;
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
        'getLoadFiles','getFnsCredits','getProblemChunksFnsAnswer'
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
    this.getLoadFiles(this.$route.params.id);
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
