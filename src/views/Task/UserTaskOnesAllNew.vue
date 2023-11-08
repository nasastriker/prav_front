<template>
    <div>
      <div class="vx-row">
        <div class="vx-col mb-4">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div
                class="p-3 cursor-pointer flex items-center justify-between font-medium" style="margin-top: 17px;border: 1px solid #ccc;border-radius: 4px;">
                            <span class="mr-2">{{
                                currentPage * paginationPageSize - (paginationPageSize - 1)
                              }} - {{
                                UsersTaskTotal - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : UsersTaskTotal
                              }} of {{ UsersTaskTotal }}</span>
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
        <div class="vx-col mb-4">
            <div class="centerx">
                <vs-tooltip text="Фильтр по статусам задач" position="top" >
                    <h6 class="h6Blue mb-1">Статус задач</h6>
                </vs-tooltip>
            </div>
            <v-select style="width: 220px;" :reduce="label => label.id" label="name" :options="StatusesUserTasks" v-model="TaskUserData.pag.task_status" @input="refreshTableTasks"></v-select>
        </div>
        <div class="vx-col mb-4">
            <div class="centerx">
                <vs-tooltip text="Фильтр по крайнему сроку" position="top" >
                    <h6 class="h6Blue mb-1">Крайний срок</h6>
                </vs-tooltip>
            </div>
            <vs-input type="date" v-model="TaskUserData.pag.task_date" @change="refreshTableTasks" class="date_wrapper" ></vs-input>
        </div>
        <div class="vx-col mb-4">
            <div class="centerx">
                <vs-tooltip text="Фильтр по сотруднику" position="top" >
                    <h6 class="h6Blue mb-1">Выбрать сотрудника</h6>
                </vs-tooltip>
            </div>
            <v-select :reduce="label => label.id" label="fio" :options="UsersArrAll" v-model="TaskUserData.pag.task_user_id" @input="refreshTableTasks"></v-select>
        </div>
        <div class="vx-col mb-4">
            <div class="centerx">
                <vs-tooltip text="Фильтр по роли сотрудника" position="top" >
                    <h6 class="h6Blue mb-1">Выбрать роль сотрудника</h6>
                </vs-tooltip>
            </div>
            <v-select :reduce="label => label.id" label="name" :options="roleArr" v-model="TaskUserData.pag.task_user_role" @input="refreshTableTasks" placeholder="Роль сотрудника" style="width: 200px"></v-select>
        </div>
        <div class="vx-col mb-4">
            <div class="centerx">
                <vs-tooltip text="Поиск по наименованию задачи, после ввода нажите Enter" position="top" >
                    <h6 class="h6Blue mb-1">Поиск</h6>
                </vs-tooltip>
            </div>
            <vs-input class="mb-4 md:mb-0 " v-model="TaskUserData.pag.task_find" @change="refreshTableTasks" @keyup.enter="refreshTableTasks" placeholder="Поиск по наименованию..."/>
        </div>
        <div class="vx-col mb-4">
          <vs-button color="primary" class="btn_new_task" type="filled" @click="AddTask">Поставить задачу</vs-button>
<!--          <vs-button color="primary" class="btn_new_task" type="filled" @click="toSettings">Настройки</vs-button>-->
        </div>
      </div>


      <ag-grid-vue
          ref="agGridTable"
          :components="components"
          :gridOptions="gridOptions"
          class="ag-theme-material w-100 my-4 ag-grid-table all_task"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="UsersTask"
          rowSelection="multiple"
          :rowDataChanged="onRowDataChanged"
          colResizeDefault="shift"
          :animateRows="true"
          @grid-size-changed="onGridSizeChanged"
          :floatingFilter="false"
          :pagination="true"
          :paginationPageSize="paginationPageSize"
          @rowDoubleClicked="onrowDoubleClicked"
          :suppressPaginationPanel="true"
          :enableRtl="$vs.rtl"
          :rowClassRules="rowClassRules"
          :overlayNoRowsTemplate="'Нет записей'"
          :enableBrowserTooltips="true">
      </ag-grid-vue>

      <vs-pagination
          :total="totalPages"
          :max="7"
          v-model="currentPage"/>
    </div>

</template>

<script>
import TaskID from "./TaskID.vue";
import Actions from "./Render/ActionsNew.vue";
import {mapActions, mapGetters, mapMutations} from 'vuex'
import FileLink from "./Render/FileLinkNew.vue"
import moment from 'moment';
import axios from "@/axios";
import r from "@/route";

export default {
    components: {
        TaskID,
        Actions,
        FileLink,
    },
    data() {
        return {

            roleArr:[
              {
                id:0,
                name:'Исполнитель',
              },
              {
                id:1,
                name:'Соисполнитель',
              },
              {
                id:2,
                name:'Наблюдатель',
              },
            ],
            task_data: {},
            popupActiveTaskInfo: false,
            popup_label: '',
            searchQuery: '',
            gridApi: null,
            gridOptions: {},
            rowClassRules: null,
            fromNewTask: false,
            today_date: null,
            defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
            },
            columnDefs: [

                {
                    headerName: 'Дата постановки',
                    headerTooltip: 'Дата постановки',
                    tooltipField: 'created_at',
                    field: 'created_at',
                    filter: true,
                    width: 40,
                    cellRenderer: params => moment(params.value).format('DD.MM.YYYY')

                },
                {
                  headerName: 'Название',
                  headerTooltip: 'Название',
                  tooltipField: 'name',
                  field: 'name',
                  filter: true,
                  width: 100
                },
                {
                  headerName: 'Крайний срок',
                  headerTooltip: 'Крайний срок',
                  tooltipField: 'plan_date',
                  field: 'plan_date',
                  filter: true,
                  width: 40,

                  cellRenderer: params => moment(params.value).format('DD.MM.YYYY')
                },
                {
                  headerName: 'Постановщик',
                  headerTooltip: 'Постановщик',
                  tooltipField: 'fio_user',
                  field: 'fio_user',
                  filter: true,
                  width: 100
                },
                {
                    headerName: 'Ответственный',
                    headerTooltip: 'Ответственный',
                    tooltipField: 'user_name',
                    field: 'user_name',
                    filter: true,
                    width: 100
                },
                {
                  headerName: 'Роль сотрудника',
                  headerTooltip: 'Роль сотрудника',
                  tooltipField: 'user_role',
                  field: 'user_role',
                  filter: true,
                  width: 100,
                  cellRenderer: (data) => {

                    if(this.User.id==data.data.id_contractor){
                      return 'Исполнитель'
                    }
                    if(this.User.id==data.data.id_soisp){
                      return 'Соисполнитель'
                    }
                    if(this.User.id==data.data.id_control){
                      return 'Наблюдатель'
                    }
                    return ''
                  }
                },

                {
                    headerName: 'Статус',
                    headerTooltip: 'Статус',
                    tooltipField: 'id_status',
                    field: 'id_status',
                    filter: true,
                    width: 40,
                    cellRenderer: (data) => {
                      for (let i = 0; i < this.StatusUsersTaskList.length; i++) {
                        if (this.StatusUsersTaskList[i].id==data.data.id_status) {
                            return this.StatusUsersTaskList[i].name
                        }
                      }

                      return ''
                    }
                },

                {
                  headerName: 'Файл',
                  headerTooltip: 'Файл',
                  field: 'id',
                  filter: true,
                  width: 40,
                 cellRendererFramework: 'FileLink',
                },
                {
                    headerName: 'Действие',
                    headerTooltip: 'Действия',
                    field: 'id',
                    filter: true,
                    width: 40,
                    minWidth: 60,
                    cellRendererFramework: 'Actions',
                    cellClass: 'actions_cell',
                    cellRendererParams: {
                        refresh_func: this.refreshTableTasks.bind(this),
                        is_admin: 1
                    }
                },
            ],
            enableBrowserTooltips: true,
            components: {
               Actions, FileLink,
            }
        }
    },

    created() {
        this.rowClassRules = {
          'prosr': (params) => {
            var plan_date = params.data.srok_plan;
            var id_status = params.data.status;
            return (plan_date < this.today_date && id_status === 1);
          },
            'row-podt': (params) => {
                var id_status = params.data.status;
                return id_status === 3;
            },
            'row-done': (params) => {
                var id_status = params.data.status;
                return id_status === 2;
            },
            'new-confirm': (params) => {
                var new_confirm = params.data.new_confirm;
                return new_confirm === 1;
            }

        };
    },

    computed: {
        totalPages() {
            if (this.gridApi)
                return Math.ceil(this.UsersTaskTotal / this.paginationPageSize)
            else return 0
        },
        paginationPageSize() {
            return this.TaskUserData.pag.limit
        },
        ...mapGetters([
            'UsersTask', 'UsersTaskTotal', 'StatusesUserTasks', 'TaskUserData', 'UsersArrAll','User','StatusUsersTaskList'
        ]),
        currentPage: {
            get() {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
            },
            set(val) {
                this.setQueryUsersTasksOffset(val-1);
                this.refreshTableTasks();
                this.gridApi.paginationGoToPage(val - 1);
            }
        },
    },
    methods: {
      toSettings(){
        this.$router.push('/auto_task_sets');
      },
        AddTask(){
          this.$router.push('/task/new')
        },
        clearSearchBar(){
            this.TaskUserData.pag.task_find = '';
            this.refreshTableTasks();
        },
        changePag(pag) {
            this.TaskUserData.pag.limit = pag;
            this.refreshTableTasks();
            this.setQueryUsersTasksLimit(pag);
            this.gridApi.paginationSetPageSize(pag);
        },
        refreshTableTasks(){
          if(this.TaskUserData.pag.task_status==null){
            this.TaskUserData.pag.task_status=0;
          }

          this.getDataUserTask(this.TaskUserData);
        },
        onGridSizeChanged(params) {
            if (params.clientWidth > 500) {
                this.gridApi.sizeColumnsToFit();
            } else if(params.clientWidth > 20){
                this.columnDefs.forEach(x => {
                    x.width = 300;
                });
                this.gridApi.setColumnDefs(this.columnDefs);
            }
        },
        onrowDoubleClicked(event) {
          this.$router.push('/task/'+event.data.id)

        },
        ...mapMutations([
            'setQueryUsersTasksLimit','setQueryUsersTasksOffset'
        ]),
        ...mapActions([
            'getDataUserTask', 'getDataUser', 'getDataCrmSections', 'getDataTaskUser', 'iSeeItTaskUserConfirm','getStatusUserTaskList',
          'deleteTaskUserList'
        ]),
        onRowDataChanged() {
            Vue.nextTick(() => {
                    this.gridOptions.api.sizeColumnsToFit();
                }
            );
        },
    },
    mounted() {
         this.getStatusUserTaskList()

        this.getDataUser();
        this.gridApi = this.gridOptions.api
        this.getDataUserTask(this.TaskUserData);
      
    }
}

</script>

<style scoped>
    .all_task .ag-header-cell.ag-header-cell-sortable{
        padding-left: 5px;
    }
</style>
<style lang="scss">
.h6Blue {
    font-size: 12px;
    color: rgb(115, 103, 240);
}
.ag-root-wrapper{
    border: none
}
.ag-row{
    color: rgb(60 60 60 / 87%);
}
.ag-header-row {
    color: rgba(0, 0, 0, 0.54);
    font-weight: 600;
    font-size: inherit;
    font-family: inherit;
}
.actions_cell{
    text-align: center;
}
.ag-theme-material .ag-ltr .ag-cell{
    padding-left: 5px!important;
    line-height: 18px !important;
}
.con-vs-tooltip{
    display: inline-block;
}
.vs-input--placeholder {
    top: 0px;
    font-size: 1rem !important;
}

.h6 {
    font-size: 12px;
}
.btn_new_task.vs-button{
    margin-top: 17px;
    padding: 0.8rem 2rem!important;
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
.srok-group {
    background-color: #2E8B57;
    color: white;
}

.kpi-group {
    background-color: #4682B4;
    color: white;
}

.row-done {
    background-color: #98FB98;
}
.row-podt {
    background-color: #B0E0E6;
}
.prosr {
  background-color: #FF4500;
}
.new-confirm {
    font-weight: bolder;
}
[dir] .ag-theme-material .ag-ltr .ag-has-focus .ag-cell-focus:not(.ag-cell-range-selected), [dir] .ag-theme-material .ag-ltr .ag-has-focus .ag-cell-focus.ag-cell-range-single-cell, [dir] .ag-theme-material .ag-ltr .ag-cell-focus.ag-cell-range-single-cell.ag-cell-range-handle, [dir] .ag-theme-material .ag-rtl .ag-has-focus .ag-cell-focus:not(.ag-cell-range-selected), [dir] .ag-theme-material .ag-rtl .ag-has-focus .ag-cell-focus.ag-cell-range-single-cell, [dir] .ag-theme-material .ag-rtl .ag-cell-focus.ag-cell-range-single-cell.ag-cell-range-handle{
    border:none;
}
</style>
