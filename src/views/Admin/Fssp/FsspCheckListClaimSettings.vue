<template>
  <div id="page-user-list">
    <div class="vx-card p-6 no-shadow">
      <div class="flex flex-wrap justify-between items-center">
        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div
                class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{
                  currentPage * paginationPageSize - (paginationPageSize - 1)
                }} - {{
                  FsspCheckListClaimItemsCount - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : FsspCheckListClaimItemsCount
                }} of {{ FsspCheckListClaimItemsCount }}</span>
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
          <vs-button color="success" type="filled" @click="newItem"> + Новый элемент</vs-button>
          <vs-button style="margin-left: 15px" color="success" type="filled" @click="updateRecords">Обновить</vs-button>
          <vs-button style="margin-left: 15px" @click="filterReset">Сбросить фильтры</vs-button>
        </div>

      </div>
      <div class="out-main-fssp-cl-claim-set">
        <ag-grid-vue
            ref="agGridTable"
            :gridOptions="gridOptions"
            :components="components"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="FsspCheckListClaimItems"
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
            :enableRtl="$vs.rtl">
        </ag-grid-vue>
        <transition name="fade">
          <div class="outer-div-fssp-cl-claim-set" v-if="FsspCheckListClaimItemsLoadingFlag"><img class="load-bar"
                                                                                                  src="/loading.gif">
          </div>
        </transition>
      </div>

      <vs-popup classContent="popup-example" title="Элемент" :active.sync="showAddItem">
        <h6 class="h6">Наименование:</h6>
        <vs-input type="text" class="w-auto" v-model="itemData.name"></vs-input>
        <h6 class="h6" style="margin-top: 15px">Код:</h6>
        <vs-input type="text" class="w-auto" v-model="itemData.code"></vs-input>
        <h6 class="h6" style="margin-top: 15px">Описание:</h6>
        <vs-textarea height="200px" rows="9" v-model="itemData.opis"></vs-textarea>

        <vs-button color="success" style="margin-top: 25px" type="filled" @click="saveItem">Сохранить</vs-button>
      </vs-popup>

      <vs-pagination
          :total="totalPages"
          :max="7"
          v-model="currentPage"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import FsspCheckListClaimSetFilterRender from "./Render/FsspCheckListClaimSetFilterRender.vue";
import OperFsspClClaimSet from "./Render/OperFsspClClaimSet.vue";
import ActiveFsspClClaimSet from "./Render/ActiveFsspClClaimSet.vue";
import OpenColorText from "./Render/OpenColorText.vue";

export default {
  components: {
    FsspCheckListClaimSetFilterRender,OperFsspClClaimSet,ActiveFsspClClaimSet,OpenColorText
  },
  beforeMount() {
    this.defaultColDef = {resizable: true};
    this.rowHeight = 50;
    this.components = {FsspCheckListClaimSetFilterRender: FsspCheckListClaimSetFilterRender};
  },
  data() {
    return {
      itemData: {},
      showAddItem: false,
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
          headerName: '',
          headerTooltip: 'Активность',
          field: 'active',
          tooltipField: 'opis',
          filter: true,
          width: 30,
          cellRendererFramework: 'ActiveFsspClClaimSet',
          cellRendererParams: {
            setActive: this.setActive.bind(this)
          }
        },
        {
          headerName: 'Наименование',
          headerTooltip: 'Наименование',
          field: 'name',
          tooltipField: 'opis',
          filter: true,
          floatingFilterComponentFramework: 'FsspCheckListClaimSetFilterRender',
          floatingFilterComponentParams: {
            type_f: 'string',
            field: 'name',
            emitFilter: 'clear_filter_fssp_cl_claim_set_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 250,
          cellRendererFramework: 'OpenColorText',
        },
        {
          headerName: 'Код',
          headerTooltip: 'Код',
          field: 'code',
          tooltipField: 'opis',
          filter: true,
          floatingFilterComponentFramework: 'FsspCheckListClaimSetFilterRender',
          floatingFilterComponentParams: {
            type_f: 'string',
            field: 'name',
            emitFilter: 'clear_filter_fssp_cl_claim_set_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 150,
          cellRendererFramework: 'OpenColorText',
        },
        {
          headerName: '',
          field: 'id',
          filter: true,
          width: 100,
          cellRendererFramework: 'OperFsspClClaimSet',
          cellRendererParams: {
            questDeleteRecord: this.questDeleteRecord.bind(this),
          }
        },
      ],
      components: {
        FsspCheckListClaimSetFilterRender,OperFsspClClaimSet,ActiveFsspClClaimSet,OpenColorText
      }
    }
  },

  computed: {
    totalPages() {
      if (this.gridApi)
        return Math.ceil(this.FsspCheckListClaimItemsCount / this.paginationPageSize)
      else return 0
    },
    paginationPageSize() {
      return this.FsspCheckListClaimItemsData.limit;
    },
    ...mapGetters([
      'FsspCheckListClaimItems', 'FsspCheckListClaimItemsCount', 'FsspCheckListClaimItemsLoadingFlag',
      'FsspCheckListClaimItemsData'
    ]),
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set(val) {
        this.setQueryFsspCheckListClaimItemsOffset(val - 1);
        this.getFsspCheckListClaimItems();
        this.gridApi.paginationGoToPage(val - 1);
      }
    },
  },
  methods: {
    newItem() {
      this.itemData = {};
      this.showAddItem = true;
    },
    saveItem() {
      let add_flag = true;

      if (typeof this.itemData.name == 'undefined' || this.itemData.name.trim() === '') {
        add_flag = false;
      }

      if (typeof this.itemData.code == 'undefined' || this.itemData.code.trim() === '') {
        add_flag = false;
      }

      if (typeof this.itemData.opis == 'undefined' || this.itemData.opis.trim() === '') {
        add_flag = false;
      }

      if (add_flag) {
        this.saveFsspCheckListClaimItem(this.itemData).then((response) => {
          if (response.result) {
            this.$vs.notify({
              title: 'Сообщение',
              text: 'Запись сохранена',
              color: 'success',
              position: 'top-center'
            })
            this.showAddItem = false;
            this.updateRecords();
          } else {
            this.$vs.notify({
              title: 'Ошибка',
              text: response.error,
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
    setActive(id_item, val) {
      this.saveActiveFsspCheckListClaimItem({id_item: id_item, val: val}).then((response) => {
        if (response.result) {
          this.updateRecords();
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: response.error,
            color: 'danger',
            position: 'top-center'
          })
          this.updateRecords();
        }
      });
    },
    questDeleteRecord(data) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'red',
        title: 'Удаление ' + data.name,
        text: 'Вы действительно хотите удалить ' + data.name + '?',
        accept: () => {
          this.deleteFsspCheckListClaimItem(data.id).then((response) => {
            if (response.result) {
              this.$vs.notify({
                title: 'Сообщение',
                text: 'Удалено!',
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
      })
    },
    updateRecords() {
      this.getFsspCheckListClaimItems();
    },
    onrowDoubleClicked(event) {
      this.getFsspCheckListClaimItemData(event.data.id).then((response) => {
        if (response.result) {
          this.itemData = response.data;
          this.showAddItem = true;
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
    changePag(pag) {
      this.FsspCheckListClaimItemsData.limit = pag;
      this.getFsspCheckListClaimItems();
      this.setQueryFsspCheckListClaimItemsLimit(pag);
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
      'setQueryFsspCheckListClaimItemsLimit', 'setQueryFsspCheckListClaimItemsOffset'
    ]),
    ...mapActions([
      'getFsspCheckListClaimItems', 'saveActiveFsspCheckListClaimItem', 'deleteFsspCheckListClaimItem',
      'saveFsspCheckListClaimItem','getFsspCheckListClaimItemData'
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
      this.FsspCheckListClaimItemsData.fields[findFieldName] = {
        find: findField,
        name: findFieldName,
        type: findType
      }
      this.getFsspCheckListClaimItems();
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
      this.$root.$emit('clear_filter_fssp_cl_claim_set_filter');
      this.FsspCheckListClaimItemsData.fields = {};
      this.getFsspCheckListClaimItems();
    },
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.getFsspCheckListClaimItems();
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

.outer-div-fssp-cl-claim-set {
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

.out-main-fssp-cl-claim-set {
  position: relative;
}
</style>
