<template>
          <div>
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TaskRecoverPlanTotal - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TaskRecoverPlanTotal }} of {{ TaskRecoverPlanTotal }}</span>
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

            </div>
          <div class="out-main-11">
            <ag-grid-vue
                    ref="agGridTable"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="arrPlan"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>
            <transition name="fade">
              <div class="outer-div-11" v-if="findFlag"><img class="load-bar-11" src="/loading.gif"></div>
            </transition>

          </div>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />


          </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import OpenCreditStatus from "../Debtor/Render/OpenCreditStatus.vue";
    import r from '@/route';
    import axios from '@/axios'
    export default {
        components: {
            OpenCreditStatus
        },
      beforeMount() {

        this.defaultColDef = { resizable: true };
        this.rowHeight = 50;
      },
        data () {
            return {
              findFlag:false,
              arrPlan:[],
              TaskRecoverPlanTotal:0,
              popupSendInfo:false,
              send_data:{},
                searchQuery: '',
                csv:[],
                // AgGrid
                gridApi: null,
              gridOptions: {
                alwaysShowVerticalScroll:true
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
                    headerName: 'ID',
                    field: 'id',
                    filter: true,
                    width: 50
                  },
                  {
                    headerName: 'Фамилия',
                    field: 'name_family',
                    filter: true,
                    width: 100
                  },
                  {
                    headerName: 'Имя',
                    field: 'name',
                    filter: true,
                    width: 100
                  },
                  {
                    headerName: 'Отчество',
                    field: 'name_patronymic',
                    filter: true,
                    width: 100
                  },
                  {
                    headerName: 'ДР',
                    field: 'birthdate',
                    filter: true,
                    width: 50
                  },
                  {
                    headerName: 'Статус',
                    field: 'id_status',
                    filter: true,
                    width: 100,
                    cellRendererFramework: 'OpenCreditStatus'
                  },
                  {
                    headerName: 'Взыскатель',
                    field: 'recover',
                    filter: true,
                    width: 120,
                  },

                ],
              components: {
                OpenCreditStatus
              }
            }
        },
        props:['data'],
        computed: {

            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TaskRecoverPlanTotal/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
              if (this.gridApi) return this.gridApi.paginationGetPageSize()
              else return 100
            },
            ...mapGetters([

            ]),
          currentPage: {
            get () {
              if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
              else return 1
            },
            set (val) {
              this.gridApi.paginationGoToPage(val - 1)
            }
          },

        },
        methods: {
          onrowDoubleClicked(event){
            this.$router.push('/credit/'+event.data.id)
          },
          changePag(pag) {
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
            getRecoverTaskPlan(){
              this.findFlag=true
              axios.get(r('recoverTask.index'), {
                params: {
                  method: 'recoverTaskPlan',
                  param: this.data
                }
              }).then(res => {
                if (res.data.result) {
                    this.arrPlan=res.data.data
                  this.TaskRecoverPlanTotal=res.data.total

                }
                this.findFlag=false
              }).catch(e=>{
                this.findFlag=false
                this.$vs.notify({
                  title: 'Ошибка',
                  text: 'Ошибка !!!',
                  color: 'danger',
                  position: 'top-center'
                })
              })
            }
        },
        mounted () {
            this.gridApi = this.gridOptions.api
            this.getRecoverTaskPlan();
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
    .load-bar-11{
      display: inline-block;
      max-width: 70px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 160px;
    }

    .load-bar-12{
      display: inline-block;
      max-width: 70px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 40px;
      color: red;
    }

    .outer-div-11
    {
      text-align: center;
      z-index : 10;
      position : absolute;
      top : 0;
      left : 0;
      width: 100%;
      height: 100%;
      background-color: hsla(200, 80%, 90%, 0.3);
    }

    .out-main-11{
      position : relative;
    }
</style>
