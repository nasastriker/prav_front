<template>
    <div>
        <vs-popup classContent="popup-example" title="Статистика в разрезе по датам" :active.sync="popupActiveStatsInfo">
            <UserTaskInfoStats :data="stats_data"></UserTaskInfoStats>
        </vs-popup>

        <ag-grid-vue
            style="height: 300px"
            ref="agGridTable"
            :components="components"
            :gridOptions="gridOptions"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="TasksUserArr"
            rowSelection="multiple"
            colResizeDefault="shift"
            :animateRows="true"
            @grid-size-changed="onGridSizeChanged"
            :floatingFilter="false"
            @rowDoubleClicked="onrowDoubleClicked"
            :suppressPaginationPanel="true"
            :enableRtl="$vs.rtl"
            :rowClassRules="rowClassRules">
        </ag-grid-vue>
    </div>

</template>

<script>
import InstructionFile from "../WorkActions/Render/InstructionFile.vue";
import Status from './Render/Status.vue'
import UserTaskInfoStats from "./UserTaskInfoStats.vue";
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
    components: {
        Status,
        InstructionFile,
        UserTaskInfoStats
    },
    props:['id_user', 'is_admin'],
    data() {
        return {
            popupActiveStatsInfo: false,
            stats_data: {},
            gridApi: null,
            gridOptions: {},
            rowClassRules: null,
            defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
            },
            columnDefs: [
                {
                    headerName: 'Название',
                    field: 'name',
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
                    headerName: 'KPI план',
                    headerClass: 'plan-group',
                    children: [
                        {
                            headerName: 'Тек.неделя',
                            headerClass: 'plan-group',
                            cellClass: params => {
                                let yes = false;
                                if (params.value <= params.data.kpi_fact_week
                                    && params.data.kpi_fact_week !== 0){
                                    yes = true;
                                }
                                return yes ? 'cell-succ' : null;
                            },
                            field: 'kpi_plan_week',
                            filter: true,
                            width: 40
                        },
                        {
                            headerName: 'Тек.месяц',
                            headerClass: 'plan-group',
                            cellClass: params => {
                                let yes = false;
                                if (params.value <= params.data.kpi_fact_mon
                                    && params.data.kpi_fact_mon !== 0){
                                    yes = true;
                                }
                                return yes ? 'cell-succ' : null;
                            },
                            field: 'kpi_plan_mon',
                            filter: true,
                            width: 40
                        },
                        {
                            headerName: 'Всего',
                            headerClass: 'plan-group',
                            cellClass: params => {
                                let yes = false;
                                if (params.value <= params.data.kpi_fact_all
                                    && params.data.kpi_fact_all !== 0){
                                    yes = true;
                                }
                                return yes ? 'cell-succ' : null;
                            },
                            field: 'kpi_plan_all',
                            filter: true,
                            width: 40
                        },
                    ]
                },
                {
                    headerName: 'KPI факт',
                    headerClass: 'fact-group',
                    children: [
                        {
                            headerName: 'Тек.неделя',
                            headerClass: 'fact-group',
                            cellClass: params => {
                                let yes = false;
                                if (params.value >= params.data.kpi_plan_week
                                    && params.value !== 0){
                                    yes = true;
                                }
                                return yes ? 'cell-succ' : null;
                            },
                            field: 'kpi_fact_week',
                            filter: true,
                            width: 40
                        },
                        {
                            headerName: 'Тек.месяц',
                            headerClass: 'fact-group',
                            cellClass: params => {
                                let yes = false;
                                if (params.value >= params.data.kpi_plan_mon
                                    && params.value !== 0){
                                    yes = true;
                                }
                                return yes ? 'cell-succ' : null;
                            },
                            field: 'kpi_fact_mon',
                            filter: true,
                            width: 40
                        },
                        {
                            headerName: 'Всего',
                            headerClass: 'fact-group',
                            cellClass: params => {
                                let yes = false;
                                if (params.value >= params.data.kpi_plan_all
                                    && params.value !== 0){
                                    yes = true;
                                }
                                return yes ? 'cell-succ' : null;
                            },
                            field: 'kpi_fact_all',
                            filter: true,
                            width: 40
                        },
                    ]
                },
                {
                    headerName: 'Инструкция',
                    field: 'i_data',
                    filter: true,
                    width: 50,
                    cellRendererFramework: 'InstructionFile'
                },
            ],
            components: {
                Status, InstructionFile
            }
        }
    },

    created() {
        this.rowClassRules = {
            'new-task': (params) => {
                var new_task = params.data.new_task;
                return new_task === 1;
            }
        };
    },

    computed: {
        ...mapGetters([
            'TasksUserArr', 'TotalTasksUser'
        ]),
    },
    methods: {
        onrowDoubleClicked(event) {
            this.popupActiveStatsInfo = true;
            this.getTaskUserStatsInfo(event.data.id).then((response) => {
                if (response.result){
                    this.stats_data = response.data;
                }
            })
            if (this.is_admin !== 1){
                this.iSeeItTaskUserBig(event.data.id).then((response) => {
                    if (response){
                        this.getDataTasksUser(this.id_user);
                    }
                })
            }
        },
        getRowStyle() {
            if (this.TasksUserArr.id_work_action == 4) {
                return {background: 'red'};
            }
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
            'setShowTask'
        ]),
        ...mapActions([
            'getDataTasksUser', 'getTaskUserStatuss', 'getDataUser', 'iSeeItTaskUserBig', 'getTaskUserStatsInfo'
        ]),
    },
    mounted() {
        this.getDataUser();
        this.gridApi = this.gridOptions.api
        this.getDataTasksUser(this.id_user);
    }
}

</script>
<style>
.router-view {
    padding: 1.2rem;
}
.ag-theme-material.w-100.my-4.ag-grid-table {
    /*height: 80vh;*/
}
.ag-theme-material .ag-ltr .ag-cell {
    border-right: 1px solid #bfbfbf!important;
}
.ag-theme-material .ag-row {
    border-color: #bfbfbf!important;
}
</style>

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

.plan-group {
    background-color: #2E8B57;
    color: white;
}

.fact-group {
    background-color: #4682B4;
    color: white;
}

.new-task {
    font-weight: bolder;
}

.cell-succ {
    background-color: #00FF00;
}
.cell-warn {
    background-color: #FFA07A;
}

</style>
