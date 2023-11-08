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

                    <v-select style="width: 250px;margin-left: 15px;" :reduce="label => label.id" label="name" :options="StatusesTasks" v-model="TaskData.pag.task_status" @input="refreshTableTasks"></v-select>
                    <vs-input type="date" v-model="TaskData.pag.task_date"
                              @change="refreshTableTasks" style="margin-left: 15px;"></vs-input>

                    <div style="display: flex;margin-left: auto;">
                        <vs-input class="mb-4 md:mb-0 mr-4" v-model="TaskData.pag.taks_find"
                                  @input="refreshTableTasks"
                                  placeholder="Поиск по наименованию..."/>
                        <div>
                        <vs-button color="danger" class="pull-right" type="filled"
                                   @click="clearSearchBar">Очистить</vs-button>
                        </div>
                        <div v-if="is_admin">
                            <vs-button style="margin-left: 25px;" color="success"
                                       class="pull-right" type="filled" @click="AddTask">
                                + Поставить задачу
                            </vs-button>
                        </div>
                    </div>
                </div>
            </div>

            <vs-popup classContent="popup-example" :title="popup_label" :active.sync="popupActiveTaskInfo">
                <TaskID :is_admin="is_admin" :task_dat="task_data" :id_user="id_user" :from_new="fromNewTask" :show_fname="false" :showEditorVue="descriptionWindow" @closeAfterSave="closePopup"></TaskID>
            </vs-popup>

            <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
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
                :rowClassRules="rowClassRules">
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
import {mapActions, mapGetters, mapMutations} from 'vuex'
import Actions from "./Render/Actions.vue";
import FileLink from "./Render/FileLink.vue";

export default {
    components: {
        Actions,
        TaskID,
        FileLink
    },
    props: {
        id_user: 0,
        is_admin: 0
    },
    data() {
        return {
            descriptionWindow:true,
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
                    headerName: 'Дата',
                    field: 'date_normal',
                    filter: true,
                    width: 40
                },
                {
                    headerName: 'Название',
                    field: 'name',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'ФИО',
                    field: 'user_name',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Раздел CRM',
                    field: 'crm_section',
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
                width: 80,
                // cellRendererFramework: 'FileLink',
              },
                {
                    headerName: '',
                    field: 'id',
                    filter: true,
                    width: 90,
                    cellRendererFramework: 'Actions',
                    cellRendererParams: {
                        refresh_func: this.refreshTableTasks.bind(this),
                        is_admin: this.is_admin
                    }
                },
            ],
            components: {
                Actions, FileLink
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
            'new-task': (params) => {
                var new_task = params.data.new_task;
                return new_task === 1;
            },
            'row-arc': (params) => {
            var new_task = params.data.status;
            return new_task === 4;
        },

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
            'TasksUserOnesArr', 'TotalTasksUserOnes', 'StatusesTasks', 'TaskData'
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
            this.getDataTasksUserOnes(this.id_user);
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
        onrowDoubleClicked(event) {
            this.getDataTaskUser(event.data.id).then((response) => {
                if (response.result){
                    this.task_data = response.data;
                    if(this.task_data.description)this.descriptionWindow=this.task_data.description.lastIndexOf('<p>')!==-1
                    this.getDataCrmSections();
                    this.popup_label = 'Редактирование задачи';
                    this.popupActiveTaskInfo = true;
                    this.fromNewTask = false;
                }
            })
            if (this.is_admin !== 1){
                this.iSeeItTaskUser(event.data.id).then((response) => {
                    if (response){
                        // this.getNavMenuItems();
                        this.refreshTableTasks();
                    }
                })
            }
        },
        ...mapMutations([
            'setQueryTasksLimit','setQueryTasksOffset'
        ]),
        ...mapActions([
            'getDataTasksUserOnes', 'getDataUser', 'getDataCrmSections', 'getDataTaskUser', 'iSeeItTaskUser',
            'getNavMenuItems', 'getTodayDate'
        ]),
        onRowDataChanged() {
            Vue.nextTick(() => {
                    this.gridOptions.api.sizeColumnsToFit();
                }
            );
        },
    },
    mounted() {
        this.getDataUser();
        this.gridApi = this.gridOptions.api
        this.getDataTasksUserOnes(this.id_user);
        this.getTodayDate().then((response) => {
          if (response.result){
            this.today_date = response.data
          }
        })
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
.row-arc{
    background-color: #e6c10a;
}
.prosr {
    background-color: #FF4500;
}
.new-task {
    font-weight: bolder;
}
</style>
