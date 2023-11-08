<template>
    <div id="page-user-list">
        <div class="vx-card p-6 no-shadow">
          <div style="margin-top: 10px;margin-bottom: 30px;display: flex;">
            <span class="text-primary cursor-pointer"><arrow-left-icon  style="cursor: pointer;" size="1.5x" class="custom-class" @click="backToLists"></arrow-left-icon></span>
            <h4 style="margin-left: 20px"><b>{{ name_record }}</b> / Задачи</h4>
          </div>

            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalFsspHodTasks - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalFsspHodTasks }} of {{ TotalFsspHodTasks }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
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
                <vs-button color="success" type="filled" @click="updateRecords">Обновить</vs-button>
                <vs-button style="margin-left: 15px" @click="filterReset">Сбросить фильтры</vs-button>
              </div>

            </div>
          <div class="out-main-fssp-hod-tasks">
            <ag-grid-vue
                    ref="agGridTable"
                    :gridOptions="gridOptions"
                    :components="components"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="FsspHodTasks"
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
                    @rowDoubleClicked="onrowDoubleClicked"
                    :overlayNoRowsTemplate="'Нет задач'"
                    :enableBrowserTooltips="true"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>
            <transition name="fade">
              <div class="outer-div-fssp-hod-tasks" v-if="FsspHodTasksLoadingFlag"><img class="load-bar" src="/loading.gif"></div>
            </transition>
          </div>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

          <vs-popup classContent="popup-example" title="Причина" :active.sync="showErrorPopup">
            <vs-textarea class="w-100" rows="22" height="500px" v-model="task_error_text"></vs-textarea>
          </vs-popup>
        </div>
    </div>

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import FsspHodTasksFilterRender from "./Render/FsspHodTasksFilterRender.vue";
    import { ArrowLeftIcon } from 'vue-feather-icons';
    import OpenTitle from "./Render/OpenTitle.vue";
    import OperFsspHodTasks from "./Render/OperFsspHodTasks.vue";
    import OpenTaskStatus from "./Render/OpenTaskStatus.vue";
    export default {
      components: {
        FsspHodTasksFilterRender,
        ArrowLeftIcon,
        OpenTitle,
        OperFsspHodTasks,
        OpenTaskStatus
      },
      beforeMount() {
        this.defaultColDef = {resizable: true};
        this.rowHeight = 50;
        this.components = {FsspHodTasksFilterRender: FsspHodTasksFilterRender};
      },
      data() {
        return {
          showErrorPopup:false,
          task_error_text:'',
          name_record:'',
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
              field: 'id',
              filter: true,
              floatingFilterComponentFramework: 'FsspHodTasksFilterRender',
              floatingFilterComponentParams: {
                type_f: 'string',
                field: 'id',
                emitFilter: 'clear_filter_fssp_hod_tasks_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide: false,
              width: 40,
            },
            {
              headerName: 'Создание',
              headerClass: 'create-fssp-hod-task-group',
              children: [
                {
                  headerName: 'Пользователь',
                  headerClass: 'create-fssp-hod-task-group',
                  field: 'user_name_create',
                  hide: false,
                  width: 140,
                  cellRendererFramework: 'OpenTitle'
                },
                {
                  headerName: 'Дата',
                  headerClass: 'create-fssp-hod-task-group',
                  field: 'date_create_norm',
                  filter: true,
                  floatingFilterComponentFramework: 'FsspHodTasksFilterRender',
                  floatingFilterComponentParams: {
                    type_f: 'date',
                    field: 'date_create',
                    emitFilter: 'clear_filter_fssp_hod_tasks_filter',
                    updateSearchField: this.updateSearchField.bind(this)
                  },
                  hide: false,
                  width: 80,
                },
                {
                  headerName: 'Время',
                  headerClass: 'create-fssp-hod-task-group',
                  field: 'time_create',
                  hide: false,
                  width: 60,
                },
              ]
            },
            {
              headerName: 'Старт',
              headerClass: 'start-fssp-hod-task-group',
              children: [
                {
                  headerName: 'Дата',
                  headerClass: 'start-fssp-hod-task-group',
                  field: 'date_start_norm',
                  filter: true,
                  floatingFilterComponentFramework: 'FsspHodTasksFilterRender',
                  floatingFilterComponentParams: {
                    type_f: 'date',
                    field: 'date_start',
                    emitFilter: 'clear_filter_fssp_hod_tasks_filter',
                    updateSearchField: this.updateSearchField.bind(this)
                  },
                  hide: false,
                  width: 80,
                },
                {
                  headerName: 'Время',
                  headerClass: 'start-fssp-hod-task-group',
                  field: 'time_start',
                  hide: false,
                  width: 60,
                },
              ]
            },
            {
              headerName: 'Отмена',
              headerClass: 'cancel-fssp-hod-task-group',
              children: [
                {
                  headerName: 'Пользователь',
                  headerClass: 'cancel-fssp-hod-task-group',
                  field: 'user_name_cancel',
                  hide: false,
                  width: 140,
                  cellRendererFramework: 'OpenTitle'
                },
                {
                  headerName: 'Дата',
                  headerClass: 'cancel-fssp-hod-task-group',
                  field: 'date_cancel_norm',
                  filter: true,
                  floatingFilterComponentFramework: 'FsspHodTasksFilterRender',
                  floatingFilterComponentParams: {
                    type_f: 'date',
                    field: 'date_cancel',
                    emitFilter: 'clear_filter_fssp_hod_tasks_filter',
                    updateSearchField: this.updateSearchField.bind(this)
                  },
                  hide: false,
                  width: 80,
                },
                {
                  headerName: 'Время',
                  headerClass: 'cancel-fssp-hod-task-group',
                  field: 'time_cancel',
                  hide: false,
                  width: 60,
                },
              ]
            },
            {
              headerName: 'Выполнение',
              headerClass: 'done-fssp-hod-task-group',
              children: [
                {
                  headerName: 'Дата',
                  headerClass: 'done-fssp-hod-task-group',
                  field: 'date_done_norm',
                  filter: true,
                  floatingFilterComponentFramework: 'FsspHodTasksFilterRender',
                  floatingFilterComponentParams: {
                    type_f: 'date',
                    field: 'date_done',
                    emitFilter: 'clear_filter_fssp_hod_tasks_filter',
                    updateSearchField: this.updateSearchField.bind(this)
                  },
                  hide: false,
                  width: 80,
                },
                {
                  headerName: 'Время',
                  headerClass: 'done-fssp-hod-task-group',
                  field: 'time_done',
                  hide: false,
                  width: 60,
                },
              ]
            },
            {
              headerName: '',
              field: 'count_send_credits',
              hide: false,
              width: 50,
            },
            {
              headerName: 'Статус',
              field: 'status_name',
              filter: true,
              floatingFilterComponentFramework: 'FsspHodTasksFilterRender',
              floatingFilterComponentParams: {
                type_f: 'list_status_task',
                field: 'task_status',
                emitFilter: 'clear_filter_fssp_hod_tasks_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide: false,
              width: 80,
              cellRendererFramework: 'OpenTaskStatus',
              cellRendererParams: {
                showError: this.showError.bind(this)
              }
            },
            {
              headerName: '',
              field: 'task_error',
              hide: false,
              width: 30,
              cellRendererFramework: 'OperFsspHodTasks',
              cellRendererParams: {
                cancelOneTask: this.cancelOneTask.bind(this)
              }
            },
          ],
          components: {
            FsspHodTasksFilterRender,OpenTitle,OperFsspHodTasks,OpenTaskStatus
          }
        }
      },

      computed: {
        totalPages() {
          if (this.gridApi)
            return Math.ceil(this.TotalFsspHodTasks / this.paginationPageSize)
          else return 0
        },
        paginationPageSize() {
          return this.FsspHodTaskData.limit;
        },
        ...mapGetters([
          'FsspHodTasks', 'TotalFsspHodTasks', 'FsspHodTasksLoadingFlag', 'FsspHodTaskData'
        ]),
        currentPage: {
          get() {
            if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
            else return 1
          },
          set(val) {
            this.setQueryFsspHodTaskOffset(val - 1);
            this.getFsspHodTasks();
            this.gridApi.paginationGoToPage(val - 1);
          }
        },
      },
      methods: {
        showError(error_text){
          this.task_error_text = error_text;
          this.showErrorPopup = true;
        },
        cancelOneTask(id_task){
          this.$vs.dialog({
            type: 'confirm',
            color: 'red',
            title: 'Отмена задачи id '+id_task,
            text: 'Вы действительно хотите отменить задачу?',
            accept: ()=>{
              this.cancelOneFsspHodTask(id_task).then((response) => {
                if (response.result){
                  this.$vs.notify({
                    title:'Сообщение',
                    text: 'Задача отменена',
                    color: 'success',
                    position: 'top-center'
                  })
                  this.getFsspHodTasks();
                }else {
                  this.$vs.notify({
                    title:'Ошибка',
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
            acceptText: 'Отменить',
            cancelText: 'Не отменять'
          })
        },
        backToLists(){
          this.$router.back();
        },
        updateRecords() {
          this.getFsspHodTasks();
        },
        onrowDoubleClicked(event) {
          this.$router.push('/fssp_hod_credits/' + event.data.id)
        },
        changePag(pag) {
          this.FsspHodTaskData.limit = pag;
          this.getFsspHodTasks();
          this.setQueryFsspHodTaskLimit(pag);
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
          'setQueryFsspHodTaskLimit', 'setQueryFsspHodTaskOffset'
        ]),
        ...mapActions([
          'getFsspHodTasks','getFsspHodRecordName','getStatusesFsspHodTasks','cancelOneFsspHodTask'
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
          this.FsspHodTaskData.fields[findFieldName] = {
            find: findField,
            name: findFieldName,
            type: findType
          }
          this.getFsspHodTasks();
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
          this.$root.$emit('clear_filter_fssp_hod_tasks_filter');
          this.FsspHodTaskData.fields = {};
          this.getFsspHodTasks();
        },
      },
      mounted() {
        this.gridApi = this.gridOptions.api;
        this.getFsspHodRecordName(this.$route.params.id).then((response) => {
          if (response.result) {
            this.name_record = response.data;
            this.FsspHodTaskData.id_record = this.$route.params.id;
            this.getStatusesFsspHodTasks();
            this.getFsspHodTasks();
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

    .outer-div-fssp-hod-tasks
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

    .out-main-fssp-hod-tasks{
      position : relative;
    }

    .create-fssp-hod-task-group{
      background-color: #FFF8DC;
    }
    .start-fssp-hod-task-group{
      background-color: #87CEEB;
    }
    .cancel-fssp-hod-task-group{
      background-color: #FA8072;
    }
    .done-fssp-hod-task-group{
      background-color: #90EE90;
    }
</style>
