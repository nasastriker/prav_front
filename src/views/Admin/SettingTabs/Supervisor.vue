<template>
    <div>
        <vs-button color="primary"  class="ag-grid-cell-button cursor-pointer "  type="filled"  style="margin-top: 20px;" @click="NewTask">Добавить задачу</vs-button>
        <ag-grid-vue

                ref="agGridTableR"
                :components="components"
                class="ag-theme-material w-30 my-4 ag-grid-table"
                :columnDefs="columnDefsRT"
                :defaultColDef="defaultColDef"
                :rowData="Supervisor"
                rowSelection="multiple"
                :gridOptions="gridOptions"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :suppressPaginationPanel="true"
        @grid-size-changed="onGridSizeChanged"
        @column-resized="onColumnResized"
        @column-visible="onColumnVisible"
                :enableRtl="$vs.rtl">
        </ag-grid-vue>
        <vs-popup classContent="popup-example" title="Скачать файлы выгрузок" :active.sync="pop">

            <h6>Название</h6>
            <vs-input  class="w-full"   style="magrin-bottom: 20px;margin-top: 2px;" v-model="supervisorOfValue.name"></vs-input>
            <h6>Количество процессов</h6>
            <vs-input  type="number"  style="magrin-bottom: 20px;margin-top: 2px;" v-model="supervisorOfValue.numprocs"></vs-input>
            <h6>Команда</h6>
            <vs-input  class="w-full"  style="magrin-bottom: 20px;margin-top: 2px;" v-model="supervisorOfValue.command"></vs-input>
            <h6>Лог</h6>
            <vs-input  class="w-full"   style="magrin-bottom: 20px;margin-top: 2px;" v-model="supervisorOfValue.logfile"></vs-input>
            <vs-button style="magrin-bottom: 20px;margin-top: 20px;" @click="saveSup">Сохранить</vs-button>
        </vs-popup>

    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import r from '../../../route';
import axios from '../../../axios'
import SupervisorValue from './Render/SupervisorValue.vue'
export default {
    components: {
        SupervisorValue,
    },
    data() {
        return {
            supervisorOfValue:{
                id:'new',
                name:'',
                command:'listen database_two --sleep=3 --tries=1 --timeout=12000',
                numprocs:1,
                logfile:'/tmp/worker-laravel-echo.log',
            },
            pop:false,
            gridApi: null,
            gridOptions: {},
            defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
            },
            columnDefsRT: [

                {
                    headerName: 'id',
                    field: 'id',
                    filter: true,
                    width: 80,
                },
                {
                    headerName: 'Название',
                    field: 'name',
                    filter: true,
                    width: 260,
                },

                {
                    headerName: 'Количество',
                    field: 'numprocs',
                    filter: true,
                    width: 80,
                },

                {
                    headerName: 'Команда',
                    field: 'command',
                    filter: true,
                    width: 200,
                },

                {
                    headerName: 'Операции',
                    field: 'id',
                    filter: true,
                    width: 130,
                    cellRendererFramework: 'SupervisorValue',
                    cellRendererParams: {
                        editValue: this.editValue.bind(this),
                        deleteValue: this.deleteSup.bind(this),
                    },
                },
            ],
            components: {
                SupervisorValue
            },

            readonly_status: true
        }
    },
    computed: {
        ...mapGetters([
            'SettingAllArr','Supervisor'
        ]),
    },
    methods: {
        editValue(data){
            this.supervisorOfValue.id=data.id
            this.supervisorOfValue.name=data.name
            this.supervisorOfValue.command=data.command
            this.supervisorOfValue.numprocs=data.numprocs
            this.supervisorOfValue.logfile=data.logfile
            this.pop=true
        },
        deleteSup(data){
            this.pop=false
            axios.post(r('setting.update'), {
                params: {
                    method: 'deleteSupervisor',
                    param: data
                }
            }).then((response) => {
                if(response){
                    this.$vs.notify({  title:'Успешно', text: 'Удалено!!!', color: 'success', position: 'top-center' })
                    this.getDataSupervisor()

                }
                else{
                    this.$vs.notify({  title:'Ошибка', text: 'Удалить не удалось !!!', color: 'danger', position: 'top-center' })
                }
            })
        },
        saveSup(){
            this.pop=false
            axios.post(r('setting.update'), {
                params: {
                    method: 'saveSupervisor',
                    param: this.supervisorOfValue
                }
            }).then((response) => {
                if(response){
                    this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                    this.getDataSupervisor()

                }
                else{
                    this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                }
            })
        },
        NewTask(){
            this.supervisorOfValue.id='new'
            this.supervisorOfValue.name=''
            this.supervisorOfValue.command='listen database_two --sleep=3 --tries=1 --timeout=12000'
            this.supervisorOfValue.numprocs=1
            this.supervisorOfValue.logfile='/tmp/worker-laravel-echo.log'
            this.pop=true
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

        onRowDataChanged () {
            Vue . nextTick (() => {
                    this.gridOptions.api.sizeColumnsToFit();
                }
            );
        },



        ...mapActions([
            'getDataSupervisor'
        ]),
    },

    mounted() {
        this.gridApi = this.gridOptions.api
        this.getDataSupervisor();
    }
}

</script>

<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
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
</style>
