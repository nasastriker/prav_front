<template>
    <div id="page-user-list">
        <div class="vx-card p-6 no-shadow">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalFsspHodRecords - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalFsspHodRecords }} of {{ TotalFsspHodRecords }}</span>
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

              <div style="display: flex">
                <vs-button color="success" type="filled" @click="newRecord"> + Новое ходатайство</vs-button>
                <vs-button style="margin-left: 15px" color="success" type="filled" @click="updateRecords">Обновить</vs-button>
                <vs-button style="margin-left: 15px" @click="filterReset">Сбросить фильтры</vs-button>
              </div>

            </div>
          <div class="out-main-fssp-hod-records">
            <ag-grid-vue
                    ref="agGridTable"
                    :gridOptions="gridOptions"
                    :components="components"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="FsspHodRecords"
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
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>
            <transition name="fade">
              <div class="tablePreloader outer-div" v-if="FsspHodRecordsLoadingFlag">
                    <img class="load-bar" src="/loading.gif" style="width: 70px;">
                    <span>Идёт загрузка</span>
              </div>
            </transition>
          </div>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

          <vs-popup classContent="popup-example" title="Условия" :active.sync="showCondsFlag">
            <div v-for="(cond,index) in recordConds">
              <h4>{{ index+1 }}. <b>{{ cond.var }}</b> <span v-if="cond.description != null">({{ cond.description }})</span> {{ condOper(cond.var_condition) }} <span style="color: blue"><b>{{ cond.value }}</b></span></h4>
            </div>
          </vs-popup>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import FsspHodRecordsFilterRender from "./Render/FsspHodRecordsFilterRender.vue";
    import OpenCountConds from "./Render/OpenCountConds.vue";
    import OperFsspHodRecords from "./Render/OperFsspHodRecords.vue";
    import ActiveFsspHodRecords from "./Render/ActiveFsspHodRecords.vue";
    import OpenPeriod from "./Render/OpenPeriod.vue";
    import OpenTitle from "./Render/OpenTitle.vue";
    export default {
      components: {
        FsspHodRecordsFilterRender,
        OpenCountConds,
        OperFsspHodRecords,
        ActiveFsspHodRecords,
        OpenPeriod,
        OpenTitle
      },
      beforeMount() {
        this.defaultColDef = {resizable: true};
        this.rowHeight = 50;
        this.components = {FsspHodRecordsFilterRender: FsspHodRecordsFilterRender};
      },
      data() {
        return {
          recordConds:[],
          showCondsFlag:false,
          gridApi: null,
          gridOptions: {
            alwaysShowVerticalScroll: true
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
              headerName: '',
              field: 'id',
              filter: false,
              hide: false,
              width: 25,
            },
            {
              headerName: 'Наименование',
              headerTooltip: 'Наименование',
              tooltipField: 'name',
              field: 'name',
              filter: true,
              floatingFilterComponentFramework: 'FsspHodRecordsFilterRender',
              floatingFilterComponentParams: {
                type_f: 'string',
                field: 'name',
                emitFilter: 'clear_filter_fssp_hod_records_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide: false,
              width: 150,
              cellRendererFramework: 'OpenTitle',
            },
            {
              headerName: 'Дата создания',
              headerTooltip: 'Дата создания',
              tooltipField: 'date_create_norm',
              field: 'date_create_norm',
              filter: true,
              floatingFilterComponentFramework: 'FsspHodRecordsFilterRender',
              floatingFilterComponentParams: {
                type_f: 'date',
                field: 'date_create',
                emitFilter: 'clear_filter_fssp_hod_records_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide: false,
              width: 80
            },
            {
              headerName: '',
              field: 'id',
              filter: true,
              width: 50,
              cellRendererFramework: 'OpenCountConds',
              cellRendererParams: {
                showConds: this.showConds.bind(this)
              }
            },
            {
              headerName: 'Статус, с которого отправлять',
              headerTooltip: 'Статус, с которого отправлять',
              tooltipField: 'status_send_name',
              field: 'status_send_name',
              filter: true,
              floatingFilterComponentFramework: 'FsspHodRecordsFilterRender',
              floatingFilterComponentParams: {
                type_f: 'list_status_send',
                field: 'id_status',
                emitFilter: 'clear_filter_fssp_hod_records_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide: false,
              width: 100,
              cellRendererFramework: 'OpenTitle',
            },
            {
              headerName: 'Организация/Взыскатель/Цессия',
              headerTooltip: 'Организация/Взыскатель/Цессия',
              tooltipField: 'name_recover',
              field: 'name_recover',
              filter: true,
              floatingFilterComponentFramework: 'FsspHodRecordsFilterRender',
              floatingFilterComponentParams: {
                type_f: 'list_recovers',
                field: 'name_recover',
                emitFilter: 'clear_filter_fssp_hod_records_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide: false,
              width: 120,
              cellRendererFramework: 'OpenTitle',
            },
            // {
            //   headerName: 'Периодичность',
            //   field: 'period_text',
            //   filter: true,
            //   width: 120,
            //   cellRendererFramework: 'OpenPeriod'
            // },
            // {
            //   headerName: 'След. запуск',
            //   field: 'next_run_date',
            //   filter: true,
            //   width: 80
            // },
            {
              headerName: 'Активность',
              field: 'active',
              filter: true,
              width: 100,
              cellRendererFramework: 'ActiveFsspHodRecords',
              cellRendererParams: {
                setActive: this.setActive.bind(this)
              }
            },
            {
              headerName: 'Операции',
              headerTooltip: 'Операции',
              field: 'id',
              filter: true,
              width: 100,
              cellRendererFramework: 'OperFsspHodRecords',
              cellRendererParams: {
                editRecord: this.editRecord.bind(this),
                questDeleteRecord: this.questDeleteRecord.bind(this),
                showCreditsPlan: this.showCreditsPlan.bind(this),
                startOneRecord: this.startOneRecord.bind(this),
                showHistory: this.showHistory.bind(this)
              }
            },
          ],
          components: {
            FsspHodRecordsFilterRender,OpenCountConds,OperFsspHodRecords,ActiveFsspHodRecords,OpenPeriod,OpenTitle
          }
        }
      },

      computed: {
        condOper() {
          return (value) => {
            if (value==='равно') return '='
            if (value==='содержит') return 'содержит'
            if (value==='больше или равно') return '>='
            if (value==='меньше или равно') return '<='
            if (value==='больше') return '>'
            if (value==='меньше') return '<'
            if (value==='не равно') return '!='
          }
        },
        totalPages() {
          if (this.gridApi)
            return Math.ceil(this.TotalFsspHodRecords / this.paginationPageSize)
          else return 0
        },
        paginationPageSize() {
          return this.FsspHodRecordData.limit;
        },
        ...mapGetters([
          'FsspHodRecords', 'TotalFsspHodRecords', 'FsspHodRecordsLoadingFlag', 'FsspHodRecordData'
        ]),
        currentPage: {
          get() {
            if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
            else return 1
          },
          set(val) {
            this.setQueryFsspHodRecordsOffset(val - 1);
            this.getFsspHodRecords();
            this.gridApi.paginationGoToPage(val - 1);
          }
        },
      },
      methods: {
        showHistory(id_record){
          this.$router.push('/fssp_hod_record_history/'+id_record);
        },
        startOneRecord(data){
          this.checkFsspHodRecordIsNoWork(data.id).then((response_check) => {
            if (response_check.result){
              if (response_check.is_no_work){
                this.$vs.dialog({
                  type: 'confirm',
                  color: 'blue',
                  title: 'Запуск '+data.name,
                  text: 'Вы действительно хотите запустить '+data.name+'?',
                  accept: ()=>{
                    this.startOneFsspHodRecord(data.id).then((response) => {
                      if (response.result){
                        this.$vs.notify({
                          title:'Сообщение',
                          text: data.name+' запущено',
                          color: 'success',
                          position: 'top-center'
                        })
                        this.updateRecords();
                      }else {
                        this.$vs.notify({
                          title:'Ошибка',
                          text: response.error,
                          color: 'danger',
                          position: 'top-center'
                        })
                      }
                    }).catch(error => {
                      this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                      })
                    });
                  },
                  acceptText: 'Запуск',
                  cancelText: 'Отмена'
                })
              } else {
                this.$vs.notify({
                  title:'Сообщение',
                  text: data.name+' НЕ ЗАПУЩЕНО! У данного ходатайства есть запущенные задачи',
                  color: 'primary',
                  position: 'top-center'
                })
                this.getFsspHodRecords();
              }
            }
          });
        },
        showCreditsPlan(id_record){
          this.$router.push('/fssp_hod_credits_plan/'+id_record);
        },
        setActive(id_record, val){
          this.checkFsspHodRecordIsNoWork(id_record).then((response_check) => {
            if (response_check.result){
              if (response_check.is_no_work){
                this.saveActiveFsspHodRecord({id_record: id_record, val: val}).then((response) => {
                  if (response.result) {
                    this.updateRecords();
                  } else {
                    this.$vs.notify({
                      title:'Ошибка',
                      text: response.error,
                      color: 'danger',
                      position: 'top-center'
                    })
                    this.updateRecords();
                  }
                });
              } else {
                this.$vs.notify({
                  title:'Сообщение',
                  text: 'У данного ходатайства есть запущенные задачи',
                  color: 'primary',
                  position: 'top-center'
                })
                this.updateRecords();
              }
            }
          });
        },
        editRecord(id_record){
          this.checkFsspHodRecordIsNoWork(id_record).then((response) => {
            if (response.result){
              if (response.is_no_work){
                this.$router.push('/fssp_hod_data/'+id_record);
              } else {
                this.$vs.notify({
                  title:'Сообщение',
                  text: 'У данного ходатайства есть запущенные задачи',
                  color: 'primary',
                  position: 'top-center'
                })
                this.getFsspHodRecords();
              }
            }
          });
        },
        questDeleteRecord(data){
          this.checkFsspHodRecordIsNoWork(data.id).then((response_check) => {
            if (response_check.result){
              if (response_check.is_no_work){
                this.$vs.dialog({
                  type: 'confirm',
                  color: 'red',
                  title: 'Удаление '+data.name,
                  text: 'Вы действительно хотите удалить '+data.name+'?',
                  accept: ()=>{
                    this.deleteFsspHodRecord(data.id).then((response) => {
                      if (response.result){
                        this.$vs.notify({
                          title:'Сообщение',
                          text: 'Ходатайство удалено',
                          color: 'success',
                          position: 'top-center'
                        })
                        this.updateRecords();
                      }else {
                        this.$vs.notify({
                          title:'Ошибка',
                          text: response.error,
                          color: 'danger',
                          position: 'top-center'
                        })
                      }
                    }).catch(error => {
                      this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                      })
                    });
                  },
                  acceptText: 'Удалить',
                  cancelText: 'Отмена'
                })
              } else {
                this.$vs.notify({
                  title:'Сообщение',
                  text: 'У данного ходатайства есть запущенные задачи',
                  color: 'primary',
                  position: 'top-center'
                })
                this.getFsspHodRecords();
              }
            }
          });
        },
        showConds(data){
          this.recordConds = data;
          this.showCondsFlag = true;
        },
        newRecord(){
          this.$router.push('/fssp_hod_data/new');
        },
        updateRecords() {
          this.getFsspHodRecords();
        },
        onrowDoubleClicked(event) {
          this.$router.push('/fssp_hod_tasks/' + event.data.id);
        },
        changePag(pag) {
          this.FsspHodRecordData.limit = pag;
          this.getFsspHodRecords();
          this.setQueryFsspHodRecordsLimit(pag);
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
          'setQueryFsspHodRecordsLimit', 'setQueryFsspHodRecordsOffset'
        ]),
        ...mapActions([
            'getFsspStatusesFsspHodRecords', 'getFsspHodRecordsRecoverersList', 'getFsspHodRecords','deleteFsspHodRecord',
            'saveActiveFsspHodRecord','startOneFsspHodRecord','checkFsspHodRecordIsNoWork'
        ]),
        updateSearchQuery(val) {
          this.gridApi.setQuickFilter(val)
        },
        onRowDataChanged() {
          Vue.nextTick(() => {
                this.gridOptions.api.sizeColumnsToFit();
              }
          );
        },
        updateSearchField(findField, findFieldName, findType, not_update = false) {
          this.FsspHodRecordData.fields[findFieldName] = {
            find: findField,
            name: findFieldName,
            type: findType
          }
          this.getFsspHodRecords();
        },
        setColumnFilter(column, val) {
          const filter = this.gridApi.getFilterInstance(column)
          let modelObj = null

          if (val !== 'all') {
            modelObj = {type: 'equals', filter: val}
          }

          filter.setModel(modelObj)
          this.gridApi.onFilterChanged()
        },
        filterReset() {
          this.$root.$emit('clear_filter_fssp_hod_records_filter');
          this.FsspHodRecordData.fields = {};
          this.getFsspHodRecords();
        },
      },
      mounted() {
        this.gridApi = this.gridOptions.api;
        this.getFsspStatusesFsspHodRecords();
        this.getFsspHodRecordsRecoverersList();
        this.getFsspHodRecords();
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
    .vh75{
      min-height: 75vh;
    }
    .load-bar{
      display: inline-block;
      max-width: 100px;
    }

    .outer-div-fssp-hod-records
    {
      padding: 20%;
      text-align: center;
      z-index : 10;
      position : absolute;
      top : 0;
      left : 0;
      width: 100%;
      height: 100%;
      background-color: hsla(200, 80%, 90%, 0.3);
    }

    .out-main-fssp-hod-records{
      position : relative;
    }
</style>
