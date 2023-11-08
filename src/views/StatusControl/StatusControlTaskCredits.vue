<template>
  <div id="page-user-list">
    <div class="vx-card p-6">
      <span class="text-primary cursor-pointer" style="margin-bottom: 20px"><arrow-left-icon  style="cursor: pointer;" size="1.5x" class="custom-class" @click="backToLists"></arrow-left-icon></span>
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalStatusControlTaskCredits - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalStatusControlTaskCredits }} of {{ TotalStatusControlTaskCredits }}</span>
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

              <vs-button @click="filterReset">Сбросить фильтры</vs-button>
              <vs-button @click="updateTaskSends">Обновить</vs-button>

            </div>
          <div class="out-main-11">
            <ag-grid-vue
                    ref="agGridTable"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="StatusControlTaskCredits"
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
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>
            <transition name="fade">
              <div class="outer-div-11" v-if="StatusControlTaskCreditsLoadingFlag"><img class="load-bar-11" src="/loading.gif"></div>
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
  </div>
</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import { ArrowLeftIcon } from 'vue-feather-icons'
    import vSelect from 'vue-select'
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    import StatusControlTaskCreditsFilterRender from "./Render/StatusControlTaskCreditsFilterRender.vue";
    import OpenCreditStatus from "../Debtor/Render/OpenCreditStatus.vue";
    import Vue from "vue";
    import OpenStatusControlTaskCreditsStatus from "./Render/OpenStatusControlTaskCreditsStatus.vue";
    export default {
        components: {
            AgGridVue,
            vSelect,
            VueCsvImport,
            StatusControlTaskCreditsFilterRender,
            OpenCreditStatus,
            OpenStatusControlTaskCreditsStatus,
            ArrowLeftIcon
        },
      beforeMount() {

        this.defaultColDef = { resizable: true };
        this.rowHeight = 50;
        this.components={StatusControlTaskCreditsFilterRender:StatusControlTaskCreditsFilterRender};
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
                    headerName: 'Фамилия',
                    field: 'name_family',
                    filter: true,
                    floatingFilterComponentFramework: 'StatusControlTaskCreditsFilterRender',
                    floatingFilterComponentParams:{
                      type_f: 'string',
                      field: 'name_family',
                      emitFilter:'clear_filter_sc_task_credits_filter',
                      // emitSet:'set_filter_debtor_filter',
                      updateSearchField: this.updateSearchField.bind(this)
                    },
                    hide:false,
                    width: 150
                  },
                  {
                    headerName: 'Имя',
                    field: 'name_debtor',
                    filter: true,
                    floatingFilterComponentFramework: 'StatusControlTaskCreditsFilterRender',
                    floatingFilterComponentParams:{
                      type_f: 'string',
                      field: 'debtors.name',
                      emitFilter:'clear_filter_sc_task_credits_filter',
                      // emitSet:'set_filter_debtor_filter',
                      updateSearchField: this.updateSearchField.bind(this)
                    },
                    hide:false,
                    width: 150
                  },
                  {
                    headerName: 'Отчество',
                    field: 'name_patronymic',
                    filter: true,
                    floatingFilterComponentFramework: 'StatusControlTaskCreditsFilterRender',
                    floatingFilterComponentParams:{
                      type_f: 'string',
                      field: 'name_patronymic',
                      emitFilter:'clear_filter_sc_task_credits_filter',
                      // emitSet:'set_filter_debtor_filter',
                      updateSearchField: this.updateSearchField.bind(this)
                    },
                    hide:false,
                    width: 150
                  },
                  {
                    headerName: 'Дата рождения',
                    field: 'date_birth_norm',
                    filter: true,
                    floatingFilterComponentFramework: 'StatusControlTaskCreditsFilterRender',
                    floatingFilterComponentParams:{
                      type_f: 'date',
                      field: 'birthdate',
                      emitFilter:'clear_filter_sc_task_credits_filter',
                      // emitSet:'set_filter_debtor_filter',
                      updateSearchField: this.updateSearchField.bind(this)
                    },
                    hide:false,
                    width: 120
                  },
                  {
                    headerName: 'Статус',
                    field: 'id_status',
                    filter: true,
                    width: 140,
                    cellRendererFramework: 'OpenCreditStatus'
                  },
                  {
                    headerName: 'Взыскатель',
                    field: 'recover',
                    filter: true,
                    width: 200,
                  },
                  {
                    headerName: 'Пер.Взыскатель',
                    field: 'recover1',
                    filter: true,
                    width: 200,
                  },
                  {
                    headerName: 'Дата отправки',
                    field: 'date_send_norm',
                    filter: true,
                    width: 150,
                  },
                  {
                    headerName: 'Статус отправки',
                    field: 'send_status',
                    filter: true,
                    floatingFilterComponentFramework: 'StatusControlTaskCreditsFilterRender',
                    floatingFilterComponentParams:{
                      type_f: 'list',
                      field: 'send_status',
                      emitFilter:'clear_filter_sc_task_credits_filter',
                      updateSearchField: this.updateSearchField.bind(this)
                    },
                    hide:false,
                    width: 150,
                    cellRendererFramework: Vue.extend(OpenStatusControlTaskCreditsStatus),
                  },
                ],
              components: {
                StatusControlTaskCreditsFilterRender,OpenCreditStatus,OpenStatusControlTaskCreditsStatus
              }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalStatusControlTaskCredits/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
              return this.StatusControlTaskCredit.limit
            },
            ...mapGetters([
                'StatusControlTaskCreditsLoadingFlag','StatusControlTaskCredits','TotalStatusControlTaskCredits',
                'StatusControlTaskCredit'
            ]),
          currentPage: {
            get() {
              if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
              else return 1
            },
            set(val) {
              this.setQueryStatusControlsTaskCreditsOffset(val-1);
              this.getStatusControlTaskCredits();
              this.gridApi.paginationGoToPage(val - 1);
            }
          },

        },
        methods: {
          backToLists(){
            this.$router.back()
          },
          updateTaskSends(){
            this.getStatusControlTaskCredits();
          },
          onrowDoubleClicked(event){
            this.getOneStatusControlTaskCreditData(event.data.id).then((response) => {
              if (response.result){
                this.send_data = response.data;
                if (this.send_data.send_status == 3) {
                  this.popupSendInfo = true;
                } else {
                  this.$router.push('/debtors/'+this.send_data.id_credit)
                }
              }
            });
          },
          changePag(pag) {
            this.StatusControlTaskCredit.limit = pag;
            this.getStatusControlTaskCredits();
            this.setQueryStatusControlsTaskCreditsLimit(pag);
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
            'setQueryStatusControlsTaskCreditsLimit','setQueryStatusControlsTaskCreditsOffset'
          ]),
            ...mapActions([
                'getStatusControlTaskCredits','getDateControlsTaskSendStatuses','getOneStatusControlTaskCreditData'
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
          updateSearchField(findField, findFieldName, findType, not_update=false){
            this.StatusControlTaskCredit.fields[findFieldName]={
              find:findField,
              name:findFieldName,
              type: findType
            }
            this.getStatusControlTaskCredits();
          },
          setColumnFilter (column, val) {
            const filter = this.gridApi.getFilterInstance(column)
            let modelObj = null

            if (val !== 'all') {
              modelObj = { type: 'equals', filter: val }
            }

            filter.setModel(modelObj)
            this.gridApi.onFilterChanged()
          },
          filterReset(){
            this.$root.$emit('clear_filter_sc_task_credits_filter')
          },
        },
        mounted () {
            this.gridApi = this.gridOptions.api
            this.StatusControlTaskCredit.id_task = this.$route.params.id;
            this.getDateControlsTaskSendStatuses();
            this.getStatusControlTaskCredits();
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
