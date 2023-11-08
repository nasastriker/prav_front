<template>
  <div id="page-user-list">
    <div class="vx-card p-6" style="box-shadow: none">
    <div class="flex flex-wrap justify-between items-center">
      <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalJournalOneFssp - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalJournalOneFssp }} of {{ TotalJournalOneFssp }}</span>
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
      <vs-input type="date" v-model="FsspJournalDataOne.pag.date_send_journal_one"
                @change="changeDate"></vs-input>
      <v-select style="width: 500px;margin-left: 10px" :reduce="label => label.id" label="val" :options="TypesOperFsspAll" v-model="FsspJournalDataOne.pag.type_oper_one" @input="changeDate"></v-select>
<!--      <div v-if="FsspJournalLoadingFlagOne" style="margin-right: auto;">-->
<!--      v-if="FsspJournalLoadingFlagOne"-->
        <img v-if="FsspJournalLoadingFlagOne" class="load-bar" style="max-height: 30px" src="/loading.gif">
        <div v-if="FsspJournalGetAnswerLoadingFlag" class="vx-row">
          <div style="margin-left: 20px;margin-top: 5px;" class="vx-col">
            <img class="load-bar" style="max-height: 30px" src="/loading.gif">
          </div>
          <div class="vx-col" style="margin-left: -20px;margin-top: 10px;">
            <span>Получение ответа</span>
          </div>
        </div>

      <div style="margin-right: auto;"></div>
<!--      </div>-->
    </div>
      <div style="margin-top: 10px;display: flex">
        <span style="color: blue">Двойной клик по записи в таблице - копирование номера обращения</span>

        <div v-if="FsspGetOrderInfoDataLoadingFlag" class="vx-row" style="margin-left: auto">
          <div style="margin-left: 20px;" class="vx-col">
            <img class="load-bar" style="max-height: 20px" src="/loading.gif">
          </div>
          <div class="vx-col" style="margin-left: -20px;">
            <span style="color: blue">Получение данных</span>
          </div>
        </div>
      </div>
<!--      <div class="out-main">-->
    <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="FsspJournalOneArr"
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
        @rowDoubleClicked="onrowDoubleClicked"
        @column-visible="onColumnVisible"
        :enableBrowserTooltips="true"
        :enableRtl="$vs.rtl"
        :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'">
    </ag-grid-vue>
<!--        <transition name="fade">-->
<!--          <div class="outer-divd" v-if="FsspJournalLoadingFlagOne"><img class="load-bar" src="/loading.gif"></div>-->
<!--        </transition>-->
<!--      </div>-->

    <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage" />

  </div>

    <vs-popup classContent="popup-example" :title="'Ответ на '+nameOperAnswer" :active.sync="popupActiveAnswer">
      <FsspJournalAnswer :type_oper="typeOper"></FsspJournalAnswer>
    </vs-popup>
    <vs-popup classContent="popup-example" title="Техническая информация по обращению" :active.sync="popupTechOrderData">
      <json-viewer
          :value="techOrderData"
          :expand-depth=5
          copyable
          sort>
      </json-viewer>
    </vs-popup>
  </div>

</template>

<script>
import OpenOneUrl from "./Render/OpenOneUrl.vue";
import OpenOneJournalStatus from "./Render/OpenOneJournalStatus.vue";
import FsspJournalAnswer from "./Render/FsspJournalAnswer.vue";
import FsspJournalOpenFileLink from "./Render/FsspJournalOpenFileLink.vue";
import OperFsspOneJournal from "./Render/OperFsspOneJournal.vue";
import JsonViewer from 'vue-json-viewer';
import { mapActions,mapGetters } from 'vuex';
export default {
  components: {
    OpenOneUrl,
    OpenOneJournalStatus,
    FsspJournalAnswer,
    FsspJournalOpenFileLink,
    OperFsspOneJournal,
    JsonViewer
  },
  data () {
    return {
      techOrderData:null,
      popupTechOrderData:false,
      popupActiveAnswer:false,
      nameOperAnswer:'',
      typeOper:null,
      searchQuery: '',
      csv:[],
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
          headerName: 'Номер ИП',
          tooltipField: 'number_ip',
          field: 'number_ip',
          filter: true,
          width: 100,
        },
        {
          headerName: 'Вид действия',
          tooltipField: 'name_oper',
          field: 'name_oper',
          filter: true,
          width: 150,
        },
        {
          headerName: 'Дата действия',
          tooltipField: 'date_send_norm',
          field: 'date_send_norm',
          filter: true,
          width: 50,
        },
        {
          headerName: 'URL запроса/Сообщение',
          tooltipField: 'url',
          field: 'url',
          filter: true,
          width: 200,
          cellRendererFramework: 'OpenOneUrl'
        },
        {
          headerName: 'Файл',
          field: 'req_file_path',
          filter: true,
          width: 50,
          cellRendererFramework: 'FsspJournalOpenFileLink'
        },
        {
          headerName: 'Статус',
          field: 'status',
          filter: true,
          width: 100,
          cellRendererFramework: 'OpenOneJournalStatus',
          cellRendererParams: {
            showAnswer: this.showAnswer.bind(this)
          }
        },
        {
          headerName: '',
          headerTooltip: '',
          field: 'id',
          filter: false,
          width: 50,
          cellRendererFramework: 'OperFsspOneJournal',
          cellRendererParams: {
            questGetInfoData: this.questGetInfoData.bind(this),
          }
        },
      ],

      components: {
        OpenOneUrl,OpenOneJournalStatus,FsspJournalOpenFileLink,OperFsspOneJournal
      }
    }
  },

  computed: {
    totalPages () {
      if (this.gridApi)
        return Math.ceil(this.TotalJournalOneFssp/this.paginationPageSize)
      else return 0
    },
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 100
    },
    ...mapGetters([
      'FsspJournalOneArr','TotalJournalOneFssp','Deb','FsspJournalDataOne','TypesOperFsspAll','FsspJournalLoadingFlagOne',
        'FsspJournalGetAnswerLoadingFlag','FsspGetOrderInfoDataLoadingFlag'

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
    questGetInfoData(data){
      this.getFsspOrderInfoData(data).then((response) => {
        if (response.result) {
          this.techOrderData = response.data;
          this.popupTechOrderData = true;
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: response.text,
            color: 'danger',
            position: 'top-center'
          })
        }
      });
    },
    showAnswer(data){
      this.getJournalAnswerData({
        id_credit: data.id_credit,
        type_oper: data.type_oper,
        number: data.number
      }).then((response) => {
        if (response.result) {
          this.nameOperAnswer = data.name_oper;
          this.typeOper = data.type_oper;
          this.popupActiveAnswer = true;
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: response.error,
            color: 'danger',
            position: 'top-center'
          })
        }
      });
    },
    changeDate(){
      if (this.FsspJournalDataOne.pag.type_oper_one == null){
        this.FsspJournalDataOne.pag.type_oper_one = 'all';
      }
      this.getFsspMainOneJournal(this.Deb.debtorCredit.id);
    },
    onrowDoubleClicked(event){
      if (event.data.number != null) {
        this.$copyText(event.data.number);
        this.$vs.notify({
          title: 'Сообщение',
          text: 'Скопировано в буфер обмена: ' + event.data.number,
          color: 'primary',
          position: 'top-center'
        })
      } else {
        this.$vs.notify({
          title: 'Сообщение',
          text: 'Нет номера обращения',
          color: 'danger',
          position: 'top-center'
        })
      }
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
      'getFsspMainOneJournal','getTypesOperFssp','getJournalAnswerData','getFsspOrderInfoData'
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
    this.getFsspMainOneJournal(this.Deb.debtorCredit.id);
    this.getTypesOperFssp();
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
