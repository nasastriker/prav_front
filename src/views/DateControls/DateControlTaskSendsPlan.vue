<template>
          <div>
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ DateControlsTaskSendPlanTotal - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : DateControlsTaskSendPlanTotal }} of {{ DateControlsTaskSendPlanTotal }}</span>
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
                    :rowData="DateControlsTaskSendPlans"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
            @grid-size-changed="onGridSizeChanged"
            @column-resized="onColumnResized"
            @column-visible="onColumnVisible"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>
            <transition name="fade">
              <div class="outer-div-11" v-if="DateControlsTaskSendPlanLoadingFlag"><img class="load-bar-11" src="/loading.gif"></div>
            </transition>
          </div>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

            <vs-popup classContent="popup-example" title="Инфо отправки" :active.sync="popupSendInfo">
              <h3>{{ send_data.fio_debtor }}</h3>
              <h4 style="margin-top: 20px;">Статус: <b>{{ send_data.status_name }}</b></h4>
              <hr style="margin-bottom: 20px; margin-top: 20px; border: 1px solid #ADD8E6;">
              <div v-if="send_data.send_status == 3">
                <h6 class="h6">Ошибка:</h6>
                <vs-textarea class="w-100" height="500px" v-model="send_data.send_error" > </vs-textarea>
              </div>
            </vs-popup>
          </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import OpenCreditStatus from "../Debtor/Render/OpenCreditStatus.vue";
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
                    field: 'name_debtor',
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
                    field: 'date_birth_norm',
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
                    headerName: 'Дата статуса',
                    field: 'status_date_norm',
                    filter: true,
                    width: 100,
                  },
                  {
                    headerName: 'Дата посл.платежа',
                    field: 'date_last_payment_norm',
                    filter: true,
                    width: 100,
                  },
                  {
                    headerName: 'Взыскатель',
                    field: 'recover',
                    filter: true,
                    width: 120,
                  },
                  {
                    headerName: 'Пер.Взыскатель',
                    field: 'recover1',
                    filter: true,
                    width: 120,
                  }
                ],
              components: {
                OpenCreditStatus
              }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.DateControlsTaskSendPlanTotal/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
              return this.DateControlsTaskSendPlan.limit
            },
            ...mapGetters([
                'DateControlsTaskSendPlans','DateControlsTaskSendPlanTotal','DateControlsTaskSendPlanLoadingFlag','DateControlsTaskSendPlan'
            ]),
          currentPage: {
            get() {
              if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
              else return 1
            },
            set(val) {
              this.setQueryDateControlsTaskSendPlanOffset(val-1);
              this.getDateControlsTaskSendsPlan();
              this.gridApi.paginationGoToPage(val - 1);
            }
          },

        },
        methods: {
          onrowDoubleClicked(event){
            this.$router.push('/credit/'+event.data.id)
          },
          changePag(pag) {
            this.DateControlsTaskSendPlan.limit = pag;
            this.getDateControlsTaskSendsPlan();
            this.setQueryDateControlsTaskSendPlanLimit(pag);
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
            'setQueryDateControlsTaskSendPlanOffset','setQueryDateControlsTaskSendPlanLimit'
          ]),
            ...mapActions([
                'getDateControlsTaskSendsPlan'
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
            this.gridApi = this.gridOptions.api
            this.getDateControlsTaskSendsPlan();
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
