<template>
  <div id="page-user-list">
    <div class="vx-card p-6" style="min-height: 95vh;">

      <div style="display: flex;margin-bottom: 30px;">
        <div style="margin-top: 10px">
          <span class="text-primary cursor-pointer"><arrow-left-icon  style="cursor: pointer;" size="1.5x" class="custom-class" @click="backToLists"></arrow-left-icon></span>
        </div>
        <div style="margin-left: 10px;margin-top: 10px;display: flex">
          <feather-icon icon="HomeIcon" svgClasses="h-6 w-6 hover:text-primary cursor-pointer" title="К списку ходатайств" @click="toRecords"/>
          <h4 style="margin-left: 10px">
            <b>{{ recordData.name }} (ID: {{ recordData.id }})</b> / Задача ID {{ recordData.id_task }} от {{ recordData.task_date_create }} (Статус: <b>{{ recordData.task_status_name }}</b>) / Отправки
          </h4>
        </div>
      </div>

      <div class="flex flex-wrap justify-between items-center">
      <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalFsspHodCredits - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalFsspHodCredits }} of {{ TotalFsspHodCredits }}</span>
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

        <div style="display: flex;">
          <vs-button color="success" @click="updateHodCredits">Обновить</vs-button>
          <vs-button style="margin-left: 15px" @click="filterReset">Сбросить фильтры</vs-button>
        </div>
      </div>

      <div class="out-main-fssp-hod-credits" style="margin-top: 20px">
        <ag-grid-vue
            ref="agGridTable"
            :gridOptions="gridOptions"
            :components="components"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="FsspHodCredits"
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
                    :overlayLoadingTemplate="'Идёт загрузка'"
            :enableRtl="$vs.rtl">
        </ag-grid-vue>
      <transition name="fade">
        <div class="tablePreloader outer-div" v-if="FsspHodCreditsLoadingFlag">
            <img class="load-bar" src="/loading.gif" style="width: 70px;">
            <span>Идёт загрузка</span>
        </div>
      </transition>
    </div>

    <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage" />

      <vs-popup classContent="popup-example" title="Ошибка" :active.sync="showErrorPopup">
        <vs-textarea class="w-100" rows="22" height="500px" v-model="send_credit_error_text"></vs-textarea>
      </vs-popup>
    </div>
  </div>
</template>

<script>
    import { mapActions,mapGetters,mapMutations } from 'vuex';
    import { ArrowLeftIcon } from 'vue-feather-icons';
    import OpenCreditStatus from "../../Debtor/Render/OpenCreditStatus.vue";
    import OpenTitle from "./Render/OpenTitle.vue";
    import FsspHodCreditsFilterRender from "./Render/FsspHodCreditsFilterRender.vue";
    import OpenHodCreditsStatus from "./Render/OpenHodCreditsStatus.vue";
    export default {
      components: {
        ArrowLeftIcon,OpenCreditStatus,OpenTitle,FsspHodCreditsFilterRender,OpenHodCreditsStatus
      },
      beforeMount() {
        this.defaultColDef = {resizable: true};
        this.rowHeight = 50;
        this.components = {FsspHodCreditsFilterRender: FsspHodCreditsFilterRender};
      },
      data() {
        return {
          showErrorPopup:false,
          send_credit_error_text:'',
          recordData:{},
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
              field: 'cred_id',
              filter: true,
              floatingFilterComponentFramework: 'FsspHodCreditsFilterRender',
              floatingFilterComponentParams:{
                type_f: 'string',
                field: 'debtor_credits.id',
                emitFilter:'clear_filter_fssp_hod_credits_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide:false,
              width: 80
            },
            {
              headerName: 'Фамилия',
              field: 'name_family',
              filter: true,
              floatingFilterComponentFramework: 'FsspHodCreditsFilterRender',
              floatingFilterComponentParams:{
                type_f: 'string',
                field: 'name_family',
                emitFilter:'clear_filter_fssp_hod_credits_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide:false,
              width: 150,
              cellRendererFramework: 'OpenTitle'
            },
            {
              headerName: 'Имя',
              field: 'name_debtor',
              filter: true,
              floatingFilterComponentFramework: 'FsspHodCreditsFilterRender',
              floatingFilterComponentParams:{
                type_f: 'string',
                field: 'debtors.name',
                emitFilter:'clear_filter_fssp_hod_credits_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide:false,
              width: 150,
              cellRendererFramework: 'OpenTitle'
            },
            {
              headerName: 'Отчество',
              field: 'name_patronymic',
              filter: true,
              floatingFilterComponentFramework: 'FsspHodCreditsFilterRender',
              floatingFilterComponentParams:{
                type_f: 'string',
                field: 'name_patronymic',
                emitFilter:'clear_filter_fssp_hod_credits_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide:false,
              width: 150,
              cellRendererFramework: 'OpenTitle'
            },
            {
              headerName: 'ДР',
              field: 'date_birth_norm',
              filter: true,
              floatingFilterComponentFramework: 'FsspHodCreditsFilterRender',
              floatingFilterComponentParams:{
                type_f: 'date',
                field: 'birthdate',
                emitFilter:'clear_filter_fssp_hod_credits_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide:false,
              width: 120,
              cellRendererFramework: 'OpenTitle'
            },
            {
              headerName: 'Номер ИП',
              field: 'number_ip',
              filter: true,
              floatingFilterComponentFramework: 'FsspHodCreditsFilterRender',
              floatingFilterComponentParams:{
                type_f: 'string',
                field: 'number_ip',
                emitFilter:'clear_filter_fssp_hod_credits_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide:false,
              width: 120,
              cellRendererFramework: 'OpenTitle'
            },
            {
              headerName: 'Статус',
              field: 'id_status',
              filter: true,
              width: 140,
              cellRendererFramework: 'OpenCreditStatus'
            },
            {
              headerName: 'Пер. Статус',
              field: 'send_id_status',
              filter: true,
              width: 140,
              cellRendererFramework: 'OpenCreditStatus'
            },
            // {
            //   headerName: 'Дата статуса',
            //   field: 'status_date_norm',
            //   filter: true,
            //   width: 100,
            // },
            // {
            //   headerName: 'Дата посл.платежа',
            //   field: 'date_last_payment_norm',
            //   filter: true,
            //   width: 100,
            // },
            {
              headerName: 'Взыскатель',
              field: 'recover',
              filter: true,
              width: 200,
              cellRendererFramework: 'OpenTitle'
            },
            {
              headerName: 'Пер.Взыскатель',
              field: 'recover1',
              filter: true,
              width: 200,
              cellRendererFramework: 'OpenTitle'
            },
            {
              headerName: 'Дата отправки',
              field: 'date_send_norm',
              filter: true,
              floatingFilterComponentFramework: 'FsspHodCreditsFilterRender',
              floatingFilterComponentParams:{
                type_f: 'date',
                field: 'date_send',
                emitFilter:'clear_filter_fssp_hod_credits_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide:false,
              width: 120,
              cellRendererFramework: 'OpenTitle'
            },
            {
              headerName: 'Статус отправки',
              field: 'status_name',
              filter: true,
              floatingFilterComponentFramework: 'FsspHodCreditsFilterRender',
              floatingFilterComponentParams:{
                type_f: 'status_list',
                field: 'status',
                emitFilter:'clear_filter_fssp_hod_credits_filter',
                updateSearchField: this.updateSearchField.bind(this)
              },
              hide:false,
              width: 150,
              cellRendererFramework: 'OpenHodCreditsStatus',
              cellRendererParams: {
                showError: this.showError.bind(this)
              }
            },
          ],
          components: {
            OpenCreditStatus,OpenTitle,FsspHodCreditsFilterRender,OpenHodCreditsStatus
          }
        }
      },
      mounted() {
        this.gridApi = this.gridOptions.api;
        this.FsspHodCreditsData.id_task = this.$route.params.id;
        this.getStatusesFsspHodCredits();
        this.updateHodCredits();
      },
      computed: {
        ...mapGetters([
            'FsspHodCredits','TotalFsspHodCredits','FsspHodCreditsLoadingFlag','FsspHodCreditsData'
        ]),

        totalPages() {
          if (this.gridApi)
            return Math.ceil(this.TotalFsspHodCredits / this.paginationPageSize)
          else return 0
        },
        currentPage: {
          get() {
            if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
            else return 1
          },
          set(val) {
            this.setQueryFsspHodCreditsOffset(val - 1);
            this.updateHodCredits();
            this.gridApi.paginationGoToPage(val - 1);
          }
        },
        paginationPageSize() {
          return this.FsspHodCreditsData.limit;
        },
      },
      methods: {
        toRecords(){
          this.$router.push('/fssp_hod_sends');
        },
        showError(error_text){
          this.send_credit_error_text = error_text;
          this.showErrorPopup = true;
        },
        updateHodCredits(){
          this.getFsspHodCredits().then((response) => {
            if (response.result){
              this.recordData = response.record_data;
            }
          });
        },
        backToLists(){
          this.$router.back();
        },
        changePag(pag) {
          this.FsspHodCreditsData.limit = pag;
          this.updateHodCredits();
          this.setQueryFsspHodCreditsLimit(pag);
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
        updateSearchField(findField, findFieldName, findType, not_update = false) {
          this.FsspHodCreditsData.fields[findFieldName] = {
            find: findField,
            name: findFieldName,
            type: findType
          }
          this.updateHodCredits();
        },
        updateSearchQuery(val) {
          this.gridApi.setQuickFilter(val)
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
          this.$root.$emit('clear_filter_fssp_hod_credits_filter');
          this.FsspHodCreditsData.fields = {};
          this.updateHodCredits();
        },
        onRowDataChanged() {
          Vue.nextTick(() => {
                this.gridOptions.api.sizeColumnsToFit();
              }
          );
        },

        ...mapMutations([
            'setQueryFsspHodCreditsOffset','setQueryFsspHodCreditsLimit'
        ]),
        ...mapActions([
            'getFsspHodCredits','getStatusesFsspHodCredits'
        ]),

        onrowDoubleClicked(event) {
          this.$router.push('/debtors/'+event.data.cred_id)
        },
      },
    }
</script>

<style lang="scss">
.ag-theme-material.w-100.my-4.ag-grid-table {
  // height: calc(100vh - 300px);
}
    .address-component {
        flex: 1 1 auto;
        width: 1%;

    input {
        height: auto;
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

    &:focus {
         color: #495057;
         background-color: #fff;
         border-color: #80bdff;
         outline: 0;
         box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
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
    .load-bar-fssp-hod-credits{
      display: inline-block;
      max-width: 100px;
      margin: auto;
    }

    .outer-div-fssp-hod-credits
    {
      display: flex;
      text-align: center;
      z-index : 10;
      position : absolute;
      top : 0;
      left : 0;
      width: 100%;
      height: 100%;
      background-color: hsla(200, 80%, 90%, 0.3);
    }

    .out-main-fssp-hod-credits{
      position : relative;
    }
</style>
