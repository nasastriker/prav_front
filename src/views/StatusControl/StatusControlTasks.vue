<template>
    <div>
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                  <div class="vx-row">
                    <div class="vx-col mb-2">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalStatusControlTasks - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalStatusControlTasks }} of {{ TotalStatusControlTasks }}</span>
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
                  <div class="vx-col mb-2" style="margin-top: 10px">
                <h3><b>{{ StatusControlTask.name_otpr }}</b></h3>
              </div>
                </div>
            </div>
            </div>
            <ag-grid-vue
                style="height: 400px"
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="StatusControlTasks"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
            @rowDoubleClicked="onrowDoubleClicked"
            @grid-size-changed="onGridSizeChanged"
            @column-resized="onColumnResized"
            @column-visible="onColumnVisible"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />


    </div>

</template>

<script>
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import { mapActions,mapGetters,mapMutations } from 'vuex';
    import r from '../../route';
    import axios from '../../axios'
    import Vue from "vue";
    import OpenStatusControlTaskStatus from "./Render/OpenStatusControlTaskStatus.vue";
    export default {
        components: {
            AgGridVue,
            vSelect,OpenStatusControlTaskStatus
        },
        data () {
            return {
                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                  {
                    headerName: 'Наименование',
                    field: 'task_name',
                    filter: false,
                    width: 150,
                  },
                  {
                    headerName: 'Дата',
                    field: 'task_date_norm',
                    filter: false,
                    width: 100,
                  },
                  {
                    headerName: 'Количество заемщиков',
                    field: 'count_credits',
                    filter: false,
                    width: 100,
                  },
                  {
                    headerName: 'Статус задачи',
                    field: 'status',
                    filter: false,
                    width: 100,
                    cellRendererFramework: Vue.extend(OpenStatusControlTaskStatus),
                  },
                ],

                // Cell Renderer Components
                components: {
                  OpenStatusControlTaskStatus
                }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalStatusControlTasks/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
              return this.StatusControlTask.limit
            },
            ...mapGetters([
                'StatusControlTasks','TotalStatusControlTasks','StatusControlTask'
            ]),
            currentPage: {
              get() {
                this.gridApi = this.gridOptions.api
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
              },
              set(val) {
                this.gridApi = this.gridOptions.api
                this.setQueryStatusControlsTaskOffset(val-1);
                this.getStatusControlTasks();
                this.gridApi.paginationGoToPage(val - 1);
              }
            },

        },
        methods: {
          changePag(pag) {
            this.StatusControlTask.limit = pag;
            this.getStatusControlTasks();
            this.setQueryStatusControlsTaskLimit(pag);
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
            onrowDoubleClicked(event){
              this.$router.push('/status_control_credits/'+event.data.id)
            },
            ...mapMutations([
                'setQueryStatusControlsTaskLimit','setQueryStatusControlsTaskOffset'
            ]),
            ...mapActions([
                'getStatusControlTasks'
            ]),
            updateSearchQuery (val) {
                this.gridApi.setQuickFilter(val)
            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        },
        mounted () {
          this.gridApi = this.gridOptions.api;
        }
    }


</script>

<style lang="scss">
    .dropdown-button-container {
        display: flex;
        align-items: center;

    .btnx {
        border-radius: 5px 0px 0px 5px;
    }

    .btn-drop {
        border-radius: 0px 5px 5px 0px;
        border-left: 1px solid rgba(255, 255, 255, .2);
    }
    }
    .con-vs-pagination{
        margin-right: 40px!important;
    }

</style>

