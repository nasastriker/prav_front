<template>
  <div id="page-user-list">
    <div class="vx-card p-6 no-shadow">
      <div style="margin-top: 10px;margin-bottom: 30px;display: flex;">
        <span class="text-primary cursor-pointer"><arrow-left-icon style="cursor: pointer;" size="1.5x"
                                                                   class="custom-class"
                                                                   @click="backToLists"></arrow-left-icon></span>
      </div>
      <div class="flex flex-wrap justify-between items-center">
        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
          <vs-dropdown vs-trigger-click class="cursor-pointer mb-4">
            <div class="p-3 cursor-pointer flex items-center justify-between font-medium"
                 style="margin-top: 10px;border: 1px solid #ccc;border-radius: 4px;">
                            <span class="mr-2">
                                {{
                                currentPage * paginationPageSize - (paginationPageSize - 1)
                              }} - {{
                                AutoTaskSetsTotal - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : AutoTaskSetsTotal
                              }} of {{ AutoTaskSetsTotal }}
                            </span>
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
        <div style="display: flex">
          <vs-button color="success" type="filled" @click="addRecord"> + Новое условие</vs-button>
          <vs-button style="margin-left: 15px" color="success" type="filled" @click="updateRecords">Обновить</vs-button>
          <vs-button style="margin-left: 15px" @click="filterReset">Сбросить фильтры</vs-button>
        </div>
      </div>
      <div class="out-main">
        <ag-grid-vue ref="agGridTable" :gridOptions="gridOptions" :components="components"
                     class="ag-theme-material w-100 my-4 ag-grid-table unrecognized_files_table"
                     :columnDefs="columnDefs" :defaultColDef="defaultColDef" :rowData="AutoTaskSets"
                     rowSelection="multiple" :rowDataChanged="onRowDataChanged" colResizeDefault="shift"
                     :animateRows="true" :floatingFilter="true" :pagination="true"
                     :paginationPageSize="paginationPageSize" :suppressPaginationPanel="true"
                     @grid-size-changed="onGridSizeChanged" @column-resized="onColumnResized"
                     @column-visible="onColumnVisible" @rowDoubleClicked="onrowDoubleClicked"
                     :overlayNoRowsTemplate="'Нет записей'" :enableRtl="$vs.rtl" enableBrowserTooltips="true">
        </ag-grid-vue>

        <transition name="fade">
          <div class="tablePreloader outer-div" v-if="AutoTaskSetsLoadingFlag">
            <img class="load-bar" src="/loading.gif">
            <span>Идёт загрузка</span>
          </div>
        </transition>

      </div>
      <vs-pagination :total="totalPages" :max="7" v-model="currentPage"/>

      <vs-popup fullscreen classContent="popup-example" title="Условие" :active.sync="showAddItem">
        <h6 class="h6">Наименование:</h6>
        <vs-input type="text" class="w-auto" v-model="itemData.name"></vs-input>

        <h6 class="h6" style="margin-top: 15px">Исполнитель:</h6>
        <v-select class="w-50 " :reduce="label => label.id" label="text" :options="AllUsersForAutoTaskSetsWoAll"
                  v-model="itemData.id_user" @input="setUser"></v-select>

        <h6 class="h6" style="margin-top: 15px">Соисполнитель:</h6>
        <v-select class="w-50 " :reduce="label => label.id" label="text" :options="AllUsersForAutoTaskSetsWoAllWoCommon"
                  v-model="itemData.id_soisp"></v-select>

        <h6 class="h6" style="margin-top: 15px">Контроль:</h6>
        <v-select class="w-50 " :reduce="label => label.id" label="text" :options="AllUsersForAutoTaskSetsWoAllWoCommon"
                  v-model="itemData.id_control"></v-select>

        <div class="auto-task-settings-banner">
          <div style="display:flex;">
            <div style="margin-left: 5px">
              <feather-icon icon="AlertCircleIcon" svgClasses="h-7 w-7"/>
            </div>
            <div style="margin-left: 20px">
              <span style="margin-top: 10px">Укажите условия, при которых должна сгенерироваться разовая задача</span>
            </div>
          </div>
        </div>

        <ConditionVars style="margin-top: 20px" :ref="'condition_vars'" @getCondData="getCondData"></ConditionVars>

        <h6 class="h6 mb-1" style="margin-top: 15px">Описание:</h6>
        <vue-editor style="height: 300px;margin-bottom: 40px;" v-model="itemData.description"></vue-editor>

        <vs-button color="success" style="margin-top: 25px" type="filled" @click="saveItem">Сохранить</vs-button>
      </vs-popup>

      <vs-popup classContent="popup-example" title="Условия" :active.sync="showCondsFlag">
        <div v-for="(cond,index) in recordConds">
          <h4>{{ index + 1 }}. <b>{{ cond.var_type === "formula" ? cond.var_formula : cond.var }} </b>
            <span v-if="cond.description != null">({{ cond.description }})</span>
            <span style="color: green">{{ condOper(cond.var_condition) }}</span>
            <span style="color: blue"><b>{{
                cond.value_type === "formula" ? cond.value_formula : cond.value
              }}</b></span>
          </h4>
        </div>
      </vs-popup>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from 'vuex';
import AutoTaskSetsFilterRender from "./Render/AutoTaskSetsFilterRender.vue";
import ActiveAutoTaskSet from "./Render/ActiveAutoTaskSet.vue";
import OpenCountConds from "./Render/OpenCountConds.vue";
import ConditionVars from "../../ConditionVars/ConditionVars.vue";
import OperAutoTaskSet from "./Render/OperAutoTaskSet.vue";
import OpenColorText from "../../Admin/Fssp/Render/OpenColorText.vue";
import {ArrowLeftIcon} from 'vue-feather-icons';
import {VueEditor, Quill} from 'vue2-editor';
import ImageResize from "quill-image-resize-vue";

Quill.register('modules/imageResize', ImageResize)

export default {
  components: {
    AutoTaskSetsFilterRender, ActiveAutoTaskSet, OpenCountConds, ConditionVars, OperAutoTaskSet, OpenColorText,
    ArrowLeftIcon, VueEditor
  },
  beforeMount() {
    this.defaultColDef = {resizable: true};
    this.rowHeight = 50;
    this.components = {AutoTaskSetsFilterRender: AutoTaskSetsFilterRender};
  },
  data() {
    return {
      recordConds: [],
      showCondsFlag: false,
      showAddItem: false,
      itemData: {
        name: '',
        id_user: 'common',
        conds: [],
        description: '',
        id_soisp: null,
        id_control: null,
      },
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
          tooltipField: 'name',
          width: 30,
          cellRendererFramework: 'ActiveAutoTaskSet',
          cellRendererParams: {
            setActive: this.setActive.bind(this)
          }
        },
        {
          headerName: 'Наименование',
          headerTooltip: 'Наименование',
          tooltipField: 'name',
          field: 'name',
          filter: true,
          cellRendererFramework: 'OpenColorText',
          floatingFilterComponentFramework: 'AutoTaskSetsFilterRender',
          floatingFilterComponentParams: {
            type_f: 'string',
            field: 'name',
            placeholder: 'Введите значение',
            emitFilter: 'clear_filter_auto_task_sets_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 200,
        },
        {
          headerName: 'Исполнитель',
          headerTooltip: 'Исполнитель',
          tooltipField: 'user_name',
          field: 'user_name',
          filter: true,
          cellRendererFramework: 'OpenColorText',
          floatingFilterComponentFramework: 'AutoTaskSetsFilterRender',
          floatingFilterComponentParams: {
            type_f: 'list_users',
            field: 'id_user',
            placeholder: 'Выберите значение',
            emitFilter: 'clear_filter_auto_task_sets_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 200,
        },
        {
          headerName: 'Соисполнитель',
          headerTooltip: 'Соисполнитель',
          tooltipField: 'so_user_name',
          field: 'so_user_name',
          filter: true,
          cellRendererFramework: 'OpenColorText',
          floatingFilterComponentFramework: 'AutoTaskSetsFilterRender',
          floatingFilterComponentParams: {
            type_f: 'list_users',
            field: 'id_soisp',
            placeholder: 'Выберите значение',
            emitFilter: 'clear_filter_auto_task_sets_filter',
            updateSearchField: this.updateSearchField.bind(this)
          },
          hide: false,
          width: 200,
        },
        {
          headerName: 'Условия',
          headerTooltip: 'Условия',
          field: 'id',
          tooltipField: 'name',
          hide: false,
          width: 50,
          cellRendererFramework: 'OpenCountConds',
          cellRendererParams: {
            showConds: this.showConds.bind(this)
          }
        },
        {
          headerName: '',
          field: 'id',
          hide: false,
          width: 50,
          cellRendererFramework: 'OperAutoTaskSet',
          cellRendererParams: {
            editRecord: this.editRecord.bind(this),
            questDeleteRecord: this.questDeleteRecord.bind(this),
            copyRecord: this.copyRecord.bind(this),
          }
        },
      ],
      components: {
        AutoTaskSetsFilterRender, ActiveAutoTaskSet, OpenCountConds, OperAutoTaskSet, OpenColorText
      }
    }
  },

  computed: {
    condOper() {
      return (value) => {
        if (value === 'равно') return '='
        if (value === 'содержит') return 'содержит'
        if (value === 'больше или равно') return '>='
        if (value === 'меньше или равно') return '<='
        if (value === 'больше') return '>'
        if (value === 'меньше') return '<'
        if (value === 'не равно') return '!='
      }
    },
    totalPages() {
      if (this.gridApi)
        return Math.ceil(this.AutoTaskSetsTotal / this.paginationPageSize)
      else return 0
    },
    paginationPageSize() {
      return this.AutoTaskSetsData.limit
    },
    ...mapGetters([
      'AutoTaskSets', 'AutoTaskSetsTotal', 'AutoTaskSetsLoadingFlag', 'AutoTaskSetsData', 'AllUsersForAutoTaskSetsWoAll',
      'User', 'AllUsersForAutoTaskSetsWoAllWoCommon'
    ]),
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set(val) {
        this.setQueryAutoTaskSetsOffset(val - 1);
        this.getAutoTaskSets();
        this.gridApi.paginationGoToPage(val - 1);
      }
    },
  },
  methods: {
    editRecord(id_record) {
      this.getAutoTaskSetData(id_record).then((response) => {
        if (response.result) {
          this.getAllUsersForAutoTaskSetWoAll();
          this.getAllUsersForAutoTaskSetWoAllWoCommon();
          this.itemData = response.data;
          this.$refs.condition_vars.cancelEditCond();
          this.$refs.condition_vars.setCondData(this.itemData.conds);
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
    backToLists() {
      this.$router.back();
    },
    setUser() {
      if (this.itemData.id_user == null) {
        this.itemData.id_user = 'common';
      }
    },
    copyRecord(data) {
      this.getAllUsersForAutoTaskSetWoAll();
      this.getAllUsersForAutoTaskSetWoAllWoCommon();

      this.itemData = {
        name: data.name,
        id_user: data.id_user,
        conds: data.conds,
        description: data.description,
        id_soisp: data.id_soisp,
        id_control: data.id_control,
      };

      this.$refs.condition_vars.cancelEditCond();
      this.$refs.condition_vars.setCondData(this.itemData.conds);
      this.showAddItem = true;
    },
    questDeleteRecord(data) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'red',
        title: 'Удаление ' + data.name,
        text: 'Вы действительно хотите удалить ' + data.name + '?',
        accept: () => {
          this.deleteAutoTaskSet(data.id).then((response) => {
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
    saveItem() {
      let add_flag = true;

      if (typeof this.itemData.name == 'undefined' || this.itemData.name.trim() === '') {
        add_flag = false;
      }

      if (typeof this.itemData.id_control == 'undefined' || this.itemData.id_control == null) {
        add_flag = false;
      }

      if (typeof this.itemData.conds == 'undefined' || this.itemData.conds.length === 0) {
        add_flag = false;
      }

      if (typeof this.itemData.description == 'undefined' || this.itemData.description.trim() === '') {
        add_flag = false;
      }

      if (add_flag) {
        this.saveAutoTaskSet(this.itemData).then((response) => {
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
    getCondData(condData) {
      this.itemData.conds = condData;
    },
    addRecord() {
      this.getAllUsersForAutoTaskSetWoAll();
      this.getAllUsersForAutoTaskSetWoAllWoCommon();

      this.itemData = {
        name: '',
        id_user: 'common',
        conds: [],
        description: '',
        id_soisp: null,
        id_control: this.User.id,
      };
      this.$refs.condition_vars.setCondData(this.itemData.conds);
      this.$refs.condition_vars.cancelEditCond();
      this.showAddItem = true;
    },
    showConds(data) {
      this.recordConds = data;
      this.showCondsFlag = true;
    },
    setActive(id_item, val) {
      this.saveActiveAutoTaskSet({id_item: id_item, val: val}).then((response) => {
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
    updateRecords() {
      this.getAutoTaskSets();
    },
    onrowDoubleClicked(event) {
      this.$router.push('/auto_task_sets_tasks/' + event.data.id);
    },
    changePag(pag) {
      this.AutoTaskSetsData.limit = pag;
      this.getAutoTaskSets();
      this.setQueryAutoTaskSetsLimit(pag);
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
      'setQueryAutoTaskSetsLimit', 'setQueryAutoTaskSetsOffset'
    ]),
    ...mapActions([
      'getAutoTaskSets', 'saveAutoTaskSet', 'saveActiveAutoTaskSet', 'getAutoTaskSetData', 'deleteAutoTaskSet',
      'getAllUsersForAutoTaskSet', 'getAllUsersForAutoTaskSetWoAll', 'getAllUsersForAutoTaskSetWoAllWoCommon',
      'getDataUser'
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
      this.AutoTaskSetsData.fields[findFieldName] = {
        find: findField,
        name: findFieldName,
        type: findType
      }
      this.getAutoTaskSets();
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
      this.$root.$emit('clear_filter_auto_task_sets_filter');
      this.AutoTaskSetsData.fields = {};
      this.getAutoTaskSets();
    },
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.getDataUser();
    this.getAutoTaskSets();
    this.getAllUsersForAutoTaskSet();
  },

}
</script>
<style lang="scss">
.unrecognized_files_table {
  .ag-floating-filter-body {
    .select2 {
      width: 100% !important;
      margin-left: 19px;

      .select2-selection--single {
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
    span.input-span-placeholder.vs-input--placeholder.normal {
      font-size: 12px !important;
      line-height: 18px;
      padding: 0 !important;
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

.auto-task-settings-banner {
  margin-top: 10px;
  background: #f7e1e1;
  padding: 15px;
  border-radius: 10px;
  color: red;
}

.h6{
  font-size: 12px;
  color: rgb(115, 103, 240);
}
</style>