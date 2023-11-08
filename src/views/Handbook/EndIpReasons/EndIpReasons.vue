<template>
  <div id="page-user-list">
    <div class="vx-card p-6">
      <div class="flex flex-wrap justify-between items-center">
        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div
                class="cursor-pointer flex items-center justify-between font-medium ml-1 mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
              <span class="mr-2">{{
                  currentPage * paginationPageSize - (paginationPageSize - 1)
                }} - {{
                  EndIpReasonsTotal - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : EndIpReasonsTotal
                }} of {{ EndIpReasonsTotal }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
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

        <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
          <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..."/>
          <vs-button color="success" class="pull-right" type="filled" @click="addNewReasonShowPopup"> +
            Новое основание
          </vs-button>
        </div>
      </div>

      <ag-grid-vue
          ref="agGridTable"
          :components="components"
          :gridOptions="gridOptions"
          class="ag-theme-material w-100 my-4 ag-grid-table"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="EndIpReasons"
          rowSelection="multiple"
          :rowDataChanged="onRowDataChanged"
          colResizeDefault="shift"
          :animateRows="true"
          :floatingFilter="false"
          :pagination="true"
          :paginationPageSize="paginationPageSize"
          :suppressPaginationPanel="true"
          @rowDoubleClicked="onrowDoubleClicked"
          @grid-size-changed="onGridSizeChanged"
          :enableRtl="$vs.rtl"
          :enableBrowserTooltips="true"
          :overlayLoadingTemplate="'Идёт загрузка'"
          :overlayNoRowsTemplate="'Нет записей'">
      </ag-grid-vue>

      <vs-pagination
          :total="totalPages"
          :max="7"
          v-model="currentPage"/>
    </div>

    <vs-popup classContent="popup-example" :title="reasonDataTitle" :active.sync="reasonDataShowPopup">
      <h6 class="h6">Отображаемый текст:</h6>
      <vs-input type="text" class="w-auto" v-model="reasonData.show_text"></vs-input>
      <h6 class="h6" style="margin-top: 20px">Текст для поиска:</h6>
      <vs-input type="text" class="w-auto" v-model="reasonData.search_text"></vs-input>
      <h6 class="h6" style="margin-top: 20px">Комментарий:</h6>
      <vs-textarea height="200px" rows="10" v-model="reasonData.comment"></vs-textarea>

      <vs-button style="margin-left: auto;margin-top: 20px" color="primary" type="filled" @click="addNewReason">Сохранить</vs-button>
    </vs-popup>
  </div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import OperReasons from "./Render/OperReasons.vue";
export default {
  components: {
    OperReasons
  },
  data() {
    return {
      reasonData:{},
      reasonDataTitle:'Новое основание',
      reasonDataShowPopup:false,
      searchQuery: '',
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
          field: 'id',
          tooltipField:'id',
          filter: true,
          width: 50
        },
        {
          headerName: 'Отображаемый текст',
          headerTooltip: 'Отображаемый текст',
          field: 'show_text',
          tooltipField:'show_text',
          filter: true,
          width: 200
        },
        {
          headerName: 'Текст для поиска',
          headerTooltip: 'Текст для поиска',
          field: 'search_text',
          tooltipField:'search_text',
          filter: true,
          width: 200
        },
        {
          headerName: 'Комментарий',
          headerTooltip: 'Комментарий',
          field: 'comment',
          tooltipField:'comment',
          filter: true,
          width: 200
        },
        {
          headerName: 'Операции',
          field: 'id',
          filter: true,
          width: 50,
          cellRendererFramework: 'OperReasons',
          cellRendererParams: {
            questionDelete: this.questionDelete.bind(this),
          }
        },
      ],

      components: {
        OperReasons
      }
    }
  },

  computed: {
    totalPages() {
      if (this.gridApi)
        return Math.ceil(this.EndIpReasonsTotal / this.paginationPageSize)
      else return 0
    },
    paginationPageSize() {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 100
    },
    ...mapGetters([
      'EndIpReasons', 'EndIpReasonsTotal'
    ]),
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set(val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    },
  },
  methods: {
    addNewReasonShowPopup(){
      this.reasonData = {};
      this.reasonDataTitle = 'Новое основание';
      this.reasonDataShowPopup = true;
    },
    addNewReason(){
      let flag = true;

      if (typeof this.reasonData.show_text == 'undefined' || this.reasonData.show_text.trim() === ''){
        flag = false;
      }

      if (typeof this.reasonData.search_text == 'undefined' || this.reasonData.search_text.trim() === ''){
        flag = false;
      }

      if (flag){
        this.saveEndIpReason(this.reasonData).then((response) => {
          if (response.result){
            this.reasonDataShowPopup = false;
            this.updateRecords();
            this.$vs.notify({
              title: 'Сообщение',
              text: 'Сохранено',
              color: 'success',
              position: 'top-center'
            })
          } else {
            this.$vs.notify({
              title: 'Ошибка',
              text: 'Ошибка при сохранении',
              color: 'danger',
              position: 'top-center'
            })
          }
        });
      } else {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Заполните необходимые поля',
          color: 'danger',
          position: 'top-center'
        })
      }
    },
    questionDelete(data){
      this.$vs.dialog({
        type: 'confirm',
        color: 'red',
        title: 'Удаление '+data.show_text,
        text: 'Вы действительно хотите удалить '+data.show_text+'?',
        accept: ()=>{
          this.deleteEndIpReason(data.id).then((response) => {
            if (response.result){
              this.$vs.notify({
                title:'Сообщение',
                text: 'Основание удалено',
                color: 'success',
                position: 'top-center'
              })
              this.updateRecords();
            }else {
              this.$vs.notify({
                title:'Ошибка',
                text: 'Ошибка при удалении',
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
      })
    },
    updateRecords(){
      this.getEndIpReasons();
    },
    onrowDoubleClicked(event) {
      this.getEndIpReasonData(event.data.id).then((response) => {
        if (response.result) {
          this.reasonData = response.data;
          this.reasonDataTitle = 'Редактирование основания';
          this.reasonDataShowPopup = true;
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: 'Ошибка',
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
    ...mapActions([
        'getEndIpReasons','saveEndIpReason','deleteEndIpReason','getEndIpReasonData'
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
    onGridSizeChanged(params) {
      this.gridApi = this.gridOptions.api;
      if (params.clientWidth > 500) {
        this.gridApi.sizeColumnsToFit();
      } else {
        this.columnDefs.forEach(x => {
          x.width = 300;
        });
        this.gridApi.setColumnDefs(this.columnDefs);
      }
    },
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.getEndIpReasons();
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
</style>
