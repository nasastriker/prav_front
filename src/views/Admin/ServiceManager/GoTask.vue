<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
          <div style="margin-bottom: 10px; display: flex">
            <Back></Back>
            <h3 style="margin-left: 15px">{{ Service.name }}</h3>
          </div>
          <hr style="margin-bottom: 15px; border: 0.5px solid #7367f0;">
            <div class="flex flex-wrap justify-between items-center">
<!--                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">-->
<!--                    <vs-dropdown vs-trigger-click class="cursor-pointer">-->
<!--                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">-->
<!--                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ totalGoTasks - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : totalGoTasks }} of {{ totalGoTasks }}</span>-->
<!--                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />-->
<!--                        </div>-->
<!--                        &lt;!&ndash; <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> &ndash;&gt;-->
<!--                        <vs-dropdown-menu>-->

<!--                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">-->
<!--                                <span>20</span>-->
<!--                            </vs-dropdown-item>-->
<!--                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">-->
<!--                                <span>50</span>-->
<!--                            </vs-dropdown-item>-->
<!--                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">-->
<!--                                <span>100</span>-->
<!--                            </vs-dropdown-item>-->
<!--                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">-->
<!--                                <span>150</span>-->
<!--                            </vs-dropdown-item>-->
<!--                        </vs-dropdown-menu>-->
<!--                    </vs-dropdown>-->
<!--                </div>-->

                <div class="flex flex-wrap ag-grid-table-actions-right">
                    <vs-button color="success" class="pull-right" type="filled" @click="getDataGoTasks">Обновить</vs-button>
                </div>
            </div>

            <!-- AgGrid Table -->
            <ag-grid-vue
                style="height: 200px"
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="goTasks"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    @grid-size-changed="onGridSizeChanged"
                    @rowDoubleClicked="onrowDoubleClickedPools"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />



<!--      <vs-popup classContent="popup-example" title="Список задач" :active.sync="popupTaskList">-->
<!--        <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">-->
<!--          <vs-button color="success" class="pull-right" type="filled" @click="getDataGoTasksRefresh">Обновить</vs-button>-->
<!--        </div>-->
<!--        <ag-grid-vue-->
<!--            style="height: 700px"-->
<!--            ref="agGridTable"-->
<!--            :gridOptions="gridOptions2"-->
<!--            class="ag-theme-material w-100 my-4 ag-grid-table"-->
<!--            :columnDefs="columnDefs2"-->
<!--            :defaultColDef="defaultColDef"-->
<!--            :rowData="allTasks"-->
<!--            rowSelection="multiple"-->
<!--            colResizeDefault="shift"-->
<!--            :animateRows="true"-->
<!--            @grid-size-changed="onGridSizeChanged2"-->
<!--            :floatingFilter="false"-->
<!--            :suppressPaginationPanel="true"-->
<!--            :enableRtl="$vs.rtl"-->
<!--            :rowClassRules="rowClassRules">-->
<!--        </ag-grid-vue>-->
<!--      </vs-popup>-->

          <h3>{{ nameTask }}</h3>
      <ag-grid-vue
          ref="agGridTable"
          :components="components"
          :gridOptions="gridOptions2"
          class="ag-theme-material w-100 my-4 ag-grid-table"
          :columnDefs="columnDefs2"
          :defaultColDef="defaultColDef"
          :rowData="allTasks"
          rowSelection="multiple"
          :rowDataChanged = "onRowDataChanged"
          colResizeDefault="shift"
          :animateRows="true"
          :floatingFilter="false"
          :pagination="true"
          @grid-size-changed="onGridSizeChanged2"
          :paginationPageSize="paginationPageSize"
          :suppressPaginationPanel="true"
          :enableRtl="$vs.rtl"
          :rowClassRules="rowClassRules">
      </ag-grid-vue>

      <vs-pagination
          :total="totalPagesTasks"
          :max="7"
          v-model="currentPage2" />
        </div>
    </div>

</template>

<script>
    import OpenLink from './Render/StopGoTask.vue'
    import { mapActions,mapGetters } from 'vuex'
    import axios from "../../../axios";
    import Back from '../../../components/Back.vue'
    import r from "../../../route";
    import g from "../../../routeGo";
    export default {
        components: {
            OpenLink,
            Back,
        },
        data () {
            return {

                // Filter Options
                nameTask:"",
                Service:{},
                popupTaskList: false,
                allTasks: [],
                searchQuery: '',
                totalGoTasks:0,
                goTasks:[],
                // AgGrid
                gridApi: null,
                gridApi2: null,
                gridOptions: {},
                gridOptions2: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'Очередь',
                        field: 'job_name',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Статус',
                        field: 'status',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Воркеров',
                        field: 'count_workers',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Процессов',
                        field: 'count_processes',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'В работе',
                        field: 'running',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Ожидают',
                        field: 'waiting',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Выполнено',
                        field: 'succeeded',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Провалено',
                        field: 'failed',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Прекращено',
                        field: 'killed',
                        filter: true,
                        width: 100
                    },



                    {
                        headerName: 'Операции',
                        field: 'job_name',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'OpenLink',
                        cellRendererParams: {
                            task_stopped: this.taskGoStopped.bind(this)
                        }
                    },



                ],


              columnDefs2: [
                {
                  headerName: 'PID',
                  field: 'pid',
                  filter: true,
                  width: 50
                },
                {
                  headerName: 'Задача',
                  field: 'name',
                  filter: true,
                  width: 250
                },
                {
                  headerName: 'Статус',
                  field: 'status',
                  filter: true,
                  width: 100
                },
                {
                  headerName: 'Старт',
                  field: 'startAt',
                  filter: true,
                  width: 100
                },
                {
                  headerName: 'Финиш',
                  field: 'endAt',
                  filter: true,
                  width: 100
                },
                {
                  headerName: 'Ошибка',
                  field: 'error',
                  filter: true,
                  width: 500
                },
              ],

                // Cell Renderer Components
                components: {
                    OpenLink,
                }
            }
        },
      created() {
        this.rowClassRules = {
          'row-act': (params) => {
            var id_status = params.data.status;
            return id_status === "Succeeded";
          },
          'row-fail': (params) => {
            var id_status = params.data.status;
            return id_status === "Failed";
          },
        };
      },
        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.totalGoTasks/this.paginationPageSize)
                else return 0
            },
          totalPagesTasks () {
            if (this.gridApi2)
              return Math.ceil(this.allTasks.length/this.paginationPageSizeTasks)
            else return 0
          },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
          paginationPageSizeTasks () {
            if (this.gridApi2) return this.gridApi2.paginationGetPageSize()
            else return 100
          },
            ...mapGetters([]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },
          currentPage2: {
            get () {
              if (this.gridApi2) return this.gridApi2.paginationGetCurrentPage() + 1
              else return 1
            },
            set (val) {
              this.gridApi2.paginationGoToPage(val - 1)
            }
          },

        },
        methods: {
          onrowDoubleClickedPools(event){
            this.nameTask = event.data.job_name
            this.allTasks = event.data.all_processes
          },
          getServiceData(id) {
            axios.get(g('service_manager/get_service_data'), {
              params: {
                id: id
              }
            }).then((response) => {
              if (response.data.result) {
                this.Service = response.data.data
                console.log(this.Service)
                this.getDataGoTasks()
                return true
              }
            })
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
          onGridSizeChanged2(params) {
            if (params.clientWidth > 500) {
              this.gridApi2.sizeColumnsToFit();
            } else {
              this.columnDefs2.forEach(x => {
                x.width = 300;
              });
              this.gridApi2.setColumnDefs(this.columnDefs2);
            }
          },
            taskGoStopped(){
                this.getDataGoTasks();
            },
            getDataGoTasks(){
                axios.get(g(this.Service.url+'/get_all_job_info'), {
                    params: {}
                }).then((response) => {
                    if (response.data.result){
                        // console.log(response.data.data)
                        this.goTasks=response.data.data
                        this.totalGoTasks=response.data.total
                    }
                    else{
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Ошибка',
                            color: 'danger',
                            position: 'top-center'
                        })
                    }
                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка111',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },
            ...mapActions([]),
            updateSearchQuery (val) {
                this.gridApi.setQuickFilter(val)
            },
            onRowDataChanged (event) {
              console.log(event.data.all_processes)
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        },
        mounted () {
            this.gridApi = this.gridOptions.api
            this.gridApi2 = this.gridOptions2.api
            this.getServiceData(this.$route.params.id)
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
