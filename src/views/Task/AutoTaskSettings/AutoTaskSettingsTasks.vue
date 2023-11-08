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
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ AutoTaskSetsTasksTotal - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : AutoTaskSetsTasksTotal }} of {{ AutoTaskSetsTasksTotal }}</span>
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
                    :rowData="AutoTaskSetsTasks"
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
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>
            <transition name="fade">
              <div class="outer-div-fssp-hod-tasks" v-if="AutoTaskSetsTasksLoadingFlag"><img class="load-bar" src="/loading.gif"></div>
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
    import AutoTaskSetsTasksFilterRender from "./Render/AutoTaskSetsTasksFilterRender.vue";
    import { ArrowLeftIcon } from 'vue-feather-icons';

    export default {
      components: {
        AutoTaskSetsTasksFilterRender,
        ArrowLeftIcon,
      },
      beforeMount() {
        this.defaultColDef = {resizable: true};
        this.rowHeight = 50;
        this.components = {AutoTaskSetsTasksFilterRender: AutoTaskSetsTasksFilterRender};
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
              floatingFilterComponentFramework: 'AutoTaskSetsTasksFilterRender',
              floatingFilterComponentParams: {
                type_f: 'string',
                field: 'id',
                emitFilter: 'clear_filter_auto_task_sets_tasks_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide: false,
              width: 40,
            },
            {
              headerName: 'Создание',
              headerClass: 'create-auto-task-sets-task-group',
              children: [
                {
                  headerName: 'Дата',
                  headerClass: 'create-auto-task-sets-task-group',
                  field: 'date_create_norm',
                  filter: true,
                  floatingFilterComponentFramework: 'AutoTaskSetsTasksFilterRender',
                  floatingFilterComponentParams: {
                    type_f: 'date',
                    field: 'date_create',
                    emitFilter: 'clear_filter_auto_task_sets_tasks_filter',
                    updateSearchField: this.updateSearchField.bind(this)
                  },
                  hide: false,
                  width: 80,
                },
                {
                  headerName: 'Время',
                  headerClass: 'create-auto-task-sets-task-group',
                  field: 'time_create',
                  hide: false,
                  width: 60,
                },
              ]
            },
            {
              headerName: 'Старт',
              headerClass: 'start-auto-task-sets-task-group',
              children: [
                {
                  headerName: 'Дата',
                  headerClass: 'start-auto-task-sets-task-group',
                  field: 'date_start_norm',
                  filter: true,
                  floatingFilterComponentFramework: 'AutoTaskSetsTasksFilterRender',
                  floatingFilterComponentParams: {
                    type_f: 'date',
                    field: 'date_start',
                    emitFilter: 'clear_filter_auto_task_sets_tasks_filter',
                    updateSearchField: this.updateSearchField.bind(this)
                  },
                  hide: false,
                  width: 80,
                },
                {
                  headerName: 'Время',
                  headerClass: 'start-auto-task-sets-task-group',
                  field: 'time_start',
                  hide: false,
                  width: 60,
                },
              ]
            },
            {
              headerName: 'Выполнение',
              headerClass: 'done-auto-task-sets-task-group',
              children: [
                {
                  headerName: 'Дата',
                  headerClass: 'done-auto-task-sets-task-group',
                  field: 'date_done_norm',
                  filter: true,
                  floatingFilterComponentFramework: 'AutoTaskSetsTasksFilterRender',
                  floatingFilterComponentParams: {
                    type_f: 'date',
                    field: 'date_done',
                    emitFilter: 'clear_filter_auto_task_sets_tasks_filter',
                    updateSearchField: this.updateSearchField.bind(this)
                  },
                  hide: false,
                  width: 80,
                },
                {
                  headerName: 'Время',
                  headerClass: 'done-auto-task-sets-task-group',
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
              floatingFilterComponentFramework: 'AutoTaskSetsTasksFilterRender',
              floatingFilterComponentParams: {
                type_f: 'list_status_task',
                field: 'task_status',
                emitFilter: 'clear_filter_auto_task_sets_tasks_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide: false,
              width: 80,
              cellRendererFramework: 'OpenTaskStatus',
              cellRendererParams: {
                showError: this.showError.bind(this)
              }
            },
          ],
          components: {
            AutoTaskSetsTasksFilterRender
          }
        }
      },

      computed: {
        totalPages() {
          if (this.gridApi)
            return Math.ceil(this.AutoTaskSetsTasksTotal / this.paginationPageSize)
          else return 0
        },
        paginationPageSize() {
          return this.AutoTaskSetsTasksData.limit;
        },
        ...mapGetters([
          'AutoTaskSetsTasks','AutoTaskSetsTasksTotal','AutoTaskSetsTasksData','AutoTaskSetsTasksLoadingFlag'
        ]),
        currentPage: {
          get() {
            if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
            else return 1
          },
          set(val) {
            this.setQueryAutoTaskSetsTasksOffset(val - 1);
            this.getAutoTaskSetsTasks();
            this.gridApi.paginationGoToPage(val - 1);
          }
        },
      },
      methods: {
        showError(error_text){
          this.task_error_text = error_text;
          this.showErrorPopup = true;
        },
        backToLists(){
          this.$router.back();
        },
        updateRecords() {
          this.getAutoTaskSetsTasks();
        },
        onrowDoubleClicked(event) {
          // this.$router.push('/fssp_hod_credits/' + event.data.id)
        },
        changePag(pag) {
          this.AutoTaskSetsTasksData.limit = pag;
          this.getAutoTaskSetsTasks();
          this.setQueryAutoTaskSetsTasksLimit(pag);
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
          'setQueryAutoTaskSetsTasksLimit', 'setQueryAutoTaskSetsTasksOffset'
        ]),
        ...mapActions([
          'getAutoTaskSetsTasks','getAutoTaskSetsRecordName','getStatusesAutoTaskSetsTasks'
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
          this.AutoTaskSetsTasksData.fields[findFieldName] = {
            find: findField,
            name: findFieldName,
            type: findType
          }
          this.getAutoTaskSetsTasks();
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
          this.$root.$emit('clear_filter_auto_task_sets_tasks_filter');
          this.AutoTaskSetsTasksData.fields = {};
          this.getAutoTaskSetsTasks();
        },
      },
      mounted() {
        this.gridApi = this.gridOptions.api;
        this.getAutoTaskSetsRecordName(this.$route.params.id).then((response) => {
          if (response.result) {
            this.name_record = response.data;
            this.AutoTaskSetsTasksData.id_record = this.$route.params.id;
            this.getStatusesAutoTaskSetsTasks();
            this.getAutoTaskSetsTasks();
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

    .create-auto-task-sets-task-group{
      background-color: #FFF8DC;
    }
    .start-auto-task-sets-task-group{
      background-color: #87CEEB;
    }
    .done-auto-task-sets-task-group{
      background-color: #90EE90;
    }
</style>
