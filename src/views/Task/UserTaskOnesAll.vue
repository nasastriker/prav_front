<template>
    <div>
        <div>
            <div>
                <div style="display: flex">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div
                            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{
                                    currentPage * paginationPageSize - (paginationPageSize - 1)
                                }} - {{
                                    TotalTasksUserOnes - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalTasksUserOnes
                                }} of {{ TotalTasksUserOnes }}</span>
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

                    <v-select style="width: 220px;margin-left: 15px;" :reduce="label => label.id" label="name" :options="StatusesTasks" v-model="TaskData.pag.task_status" @input="refreshTableTasks"></v-select>
                    <vs-input type="date" v-model="TaskData.pag.task_date"
                              @change="refreshTableTasks" style="margin-left: 15px;"></vs-input>
                    <v-select style="width: 380px;margin-left: 15px;" :reduce="label => label.id" label="fio" :options="UsersArrAll" v-model="TaskData.pag.task_user_id" @input="refreshTableTasks"></v-select>


                    <div style="display: flex;margin-left: auto;">
                        <vs-input class="mb-4 md:mb-0 mr-4" v-model="TaskData.pag.taks_find"
                                  @input="refreshTableTasks"
                                  placeholder="Поиск по наименованию..."/>

                        <div>
                            <!--
                            <vs-button color="danger" class="pull-right" type="filled"
                                       @click="clearSearchBar">Очистить</vs-button>
                                        !-->
                            <vs-button color="danger" style="margin-left: 10px" class="pull-left" type="filled"  @click="delSelected">Удалить</vs-button>
                        </div>

                        <vs-button style="margin-left: 25px;" color="success"
                                       type="filled" @click="AddTask">
                                + Поставить задачу</vs-button>
                    </div>
                </div>
            </div>

            <vs-popup classContent="popup-example" :title="popup_label" :active.sync="popupActiveTaskInfo">
                <TaskID :is_admin="1" :task_dat="task_data" :from_new="fromNewTask" :show_fname="false" :all="1" @closeAfterSave="closePopup"></TaskID>
            </vs-popup>

            <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-alpine w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="TasksUserOnesArr"
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
                :enableBrowserTooltips="true">
            </ag-grid-vue>

            <vs-pagination
                :total="totalPages"
                :max="7"
                v-model="currentPage"/>

        </div>
    </div>

</template>

<script>
import TaskID from "./TaskID.vue";
import Actions from "./Render/Actions.vue";
import {mapActions, mapGetters, mapMutations} from 'vuex'
import FileLink from "./Render/FileLink.vue"


export default {
    components: {
        TaskID,
        Actions,
        FileLink,
    },
    data() {
        return {
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
                    headerName: '',
                    filter: true,
                    width: 10,
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                },
                {
                    headerName: 'Дата',
                    field: 'date_normal',
                    filter: true,
                    width: 40
                },
                {
                    headerName: 'Сотрудник',
                    field: 'user_name',
                    tooltipField: 'user_name',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Название',
                    field: 'name',
                    tooltipField: 'name',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Раздел CRM',
                    field: 'crm_section',
                    tooltipField: 'crm_section',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Срок выполнения',
                    headerClass: 'srok-group',
                    children: [
                        {
                            headerName: 'План',
                            headerClass: 'plan-group',
                            cellClass: params => {
                                return params.value === 0 ? 'cell-warn' : 'cell-success';
                            },
                            field: 'srok_plan_normal',
                            filter: true,
                            width: 40
                        },
                        {
                            headerName: 'Факт',
                            headerClass: 'plan-group',
                            field: 'srok_fact',
                            filter: true,
                            width: 40
                        },
                    ]
                },
                {
                    headerName: 'KPI',
                    headerClass: 'kpi-group',
                    children: [
                        {
                            headerName: 'План',
                            headerClass: 'fact-group',
                            field: 'kpi_plan',
                            filter: true,
                            width: 40
                        },
                        {
                            headerName: 'Факт',
                            headerClass: 'fact-group',
                            field: 'kpi_fact',
                            filter: true,
                            width: 40
                        },
                    ]
                },
                {
                    headerName: 'Статус',
                    field: 'status_normal',
                    filter: true,
                    width: 50,
                },
              {
                headerName: 'Файл',
                field: 'file_name',
                filter: true,
                width: 100,
                // cellRendererFramework: 'FileLink',
              },
                {
                    headerName: '',
                    field: 'id',
                    filter: true,
                    width: 20,
                    cellRendererFramework: 'Actions',
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
                return Math.ceil(this.TotalTasksUserOnes / this.paginationPageSize)
            else return 0
        },
        paginationPageSize() {
            return this.TaskData.pag.limit
        },
        ...mapGetters([
            'TasksUserOnesArr', 'TotalTasksUserOnes', 'StatusesTasks', 'TaskData', 'UsersArrAll'
        ]),
        currentPage: {
            get() {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
            },
            set(val) {
                this.setQueryTasksOffset(val-1);
                this.refreshTableTasks();
                this.gridApi.paginationGoToPage(val - 1);
            }
        },
    },
    methods: {
        closePopup(){
            this.refreshTableTasks();
            this.popupActiveTaskInfo = false;
        },
        AddTask(){
            this.task_data = {};
            this.getDataCrmSections();
            this.popup_label = 'Поставить задачу';
            this.popupActiveTaskInfo = true;
            this.fromNewTask = true;
        },
        clearSearchBar(){
            this.TaskData.pag.taks_find = '';
            this.refreshTableTasks();
        },
        changePag(pag) {
            this.TaskData.pag.limit = pag;
            this.refreshTableTasks();
            this.setQueryTasksLimit(pag);
            this.gridApi.paginationSetPageSize(pag);
        },
        refreshTableTasks(){
            this.getDataTasksUserOnes('all');
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
            this.getDataTaskUser(event.data.id).then((response) => {
                if (response.result){
                    this.task_data = response.data;
                    this.getDataCrmSections();
                    this.popup_label = 'Редактирование задачи';
                    this.popupActiveTaskInfo = true;
                    this.fromNewTask = false;
                }
            })
            this.iSeeItTaskUserConfirm(event.data.id).then((response) => {
                if (response){
                    this.refreshTableTasks();
                }
            })
        },
        ...mapMutations([
            'setQueryTasksLimit','setQueryTasksOffset'
        ]),
        ...mapActions([
            'getDataTasksUserOnes', 'getDataUser', 'getDataCrmSections', 'getDataTaskUser', 'iSeeItTaskUserConfirm',
          'getTodayDate','getDataUsersNoAdmin','deleteTaskUserList'
        ]),
        onRowDataChanged() {
            Vue.nextTick(() => {
                    this.gridOptions.api.sizeColumnsToFit();
                }
            );
        },
        delSelected(){
            let selectedNodes = this.gridApi.getSelectedNodes();
            let selectedData = selectedNodes.map(node => node.data);
            if(selectedData.length > 0){
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: 'Вы действительно хотите удалить '+selectedData.length+' задач(и)?',
                    accept: this.deleteSelRecords,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена',
                    parameters: [selectedData]
                })
                // console.log(selectedData);
            } else {
                this.$vs.notify({
                    title: 'Сообщение',
                    text: 'Выберите задачи для удаления',
                    color: 'primary',
                    position: 'top-center'
                })
            }

        },
        deleteSelRecords(parameters){
            this.deleteTaskUserList(parameters[0]).then((response) => {
                this.getDataTasksUserOnes('all')
                if (response){
                    this.$vs.notify({
                        color: 'success',
                        title: 'Сообщение',
                        text: 'Задачи удалены!!!',
                        position: 'top-center'
                    })

                } else {
                    this.$vs.notify({
                        color: 'danger',
                        title: 'Сообщение',
                        text: 'Ошибка при удалении!!!',
                        position: 'top-center'
                    })
                }
            }).catch(error=>{
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сообщение',
                    text: 'Ошибка при удалении!!!',
                    position: 'top-center'
                })
            })
        },
    },
    mounted() {
      this.getDataUsersNoAdmin();
        this.getDataUser();
        this.gridApi = this.gridOptions.api
        this.getDataTasksUserOnes('all');
      this.getTodayDate().then((response) => {
        if (response.result){
          this.today_date = response.data
        }
      });
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
</style>
