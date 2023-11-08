<template>
  <div id="page-user-list">
    <div class="vx-card p-6" style="min-height: 95vh;">

      <div style="display: flex">
        <div style="margin-top: 10px">
          <span class="text-primary cursor-pointer"><arrow-left-icon  style="cursor: pointer;" size="1.5x" class="custom-class" @click="backToLists"></arrow-left-icon></span>
        </div>
        <div style="margin-left: 10px;margin-top: 10px">
          <h4><b>Удовлетворяющие по условиям кредиты:</b> {{ recordData.name }} (ID: {{ recordData.id }})</h4>
        </div>
      </div>
        <div style="display:flex;margin-top: 20px;justify-content: space-between;">
          <div>
          <div style="margin-top: 15px" v-if="recordData.conds.length > 0">
            <h5 class="mb-4"><b>Условия:</b></h5>
            <div v-for="(cond,index) in recordData.conds" class="mb-2">
              <h5>{{ index+1 }}. <b>{{ cond.var }}</b> <span v-if="cond.description != null">({{ cond.description }})</span> {{ condOper(cond.var_condition) }} <span style="color: blue"><b>{{ cond.value }}</b></span></h5>
            </div>
          </div>
          <div style="margin-top: 15px" v-else>
            <h5>Условий нет</h5>
          </div>
        </div>
        <div style="margin-left: 50px;">
          <div class="mb-4">
            <h5><b>ID Статуса = {{ recordData.id_status }}</b></h5>
          </div>
          <div style="display: flex;">
            <h5 class="mb-4 mr-4"><b>SQL</b></h5>
            <div style="padding: 15px; background: #EEDDFF;border-radius: 10px;width:700px">
              {{ sqlText }}
            </div>
          </div>
        </div>
    </div>

      <div style="margin-top: 20px;display: flex">
      <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalFsspHodCreditsPlan - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalFsspHodCreditsPlan }} of {{ TotalFsspHodCreditsPlan }}</span>
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

        <div style="margin-left: auto">
          <vs-button color="success" @click="updateHodCreditsPlan">Обновить</vs-button>
        </div>
      </div>

      <div class="out-main-fssp-hod-credits-plan" style="margin-top: 20px">
      <ag-grid-vue
          ref="agGridTable"
          style="height: 800px"
          :gridOptions="gridOptions"
          :components="components"
          class="ag-theme-material w-100 my-4 ag-grid-table vh65"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="FsspHodCreditsPlan"
          :floatingFilter="false"
          rowSelection="multiple"
          colResizeDefault="shift"
          :animateRows="true"
          :pagination="true"
          :paginationPageSize="paginationPageSize"
          :suppressPaginationPanel="true"
          @grid-size-changed="onGridSizeChanged"
          @column-resized="onColumnResized"
          @column-visible="onColumnVisible"
          @rowDoubleClicked="onrowDoubleClicked"
          :overlayNoRowsTemplate="'Нет записей'"
          :enableRtl="$vs.rtl">
      </ag-grid-vue>
      <transition name="fade">
        <div class="tablePreloader outer-div" v-if="FsspHodCreditsPlanLoadingFlag">
            <img class="load-bar" src="/loading.gif" style="width: 70px;">
            <span>Идёт загрузка</span>
        </div>
      </transition>
    </div>

    <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage" />

      <vs-popup classContent="popup-example" title="Сгенерированный текст для поля Описание в ГУ" :active.sync="showOpisText">
        <vs-textarea class="w-100" rows="22" height="500px" v-model="opisText"></vs-textarea>
      </vs-popup>
    </div>
  </div>
</template>

<script>
    import { mapActions,mapGetters,mapMutations } from 'vuex';
    import { ArrowLeftIcon } from 'vue-feather-icons';
    import OpenCreditStatus from "../../Debtor/Render/OpenCreditStatus.vue";
    import OpenTitle from "./Render/OpenTitle.vue";
    import OperFsspHodCreditsPlan from "./Render/OperFsspHodCreditsPlan.vue";
    export default {
      components: {
        ArrowLeftIcon,OpenCreditStatus,OpenTitle,OperFsspHodCreditsPlan
      },
      data() {
        return {
          sqlText:'',
          opisText:'',
          showOpisText:false,
          recordData:{
            conds:[]
          },
          gridApi: null,
          gridOptions: {
            alwaysShowVerticalScroll:true
          },
          defaultColDef: {
            sortable: true,
            resizable: true,
            suppressMenu: true
          },
          columnDefs: [
            {
              headerName: '',
              field: 'id',
              filter: true,
              width: 100,
              cellRendererFramework: 'OpenTitle'
            },
            {
              headerName: 'Фамилия',
              field: 'name_family',
              filter: true,
              width: 150,
              cellRendererFramework: 'OpenTitle'
            },
            {
              headerName: 'Имя',
              field: 'name_debtor',
              filter: true,
              width: 150,
              cellRendererFramework: 'OpenTitle'
            },
            {
              headerName: 'Отчество',
              field: 'name_patronymic',
              filter: true,
              width: 150,
              cellRendererFramework: 'OpenTitle'
            },
            {
              headerName: 'ДР',
              field: 'date_birth_norm',
              filter: true,
              width: 80,
              cellRendererFramework: 'OpenTitle'
            },
            {
              headerName: 'Номер ИП',
              field: 'number_ip',
              filter: true,
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
              headerName: 'Дата статуса',
              field: 'status_date_norm',
              filter: true,
              width: 100,
              cellRendererFramework: 'OpenTitle'
            },
            {
              headerName: 'Дата посл.платежа',
              field: 'date_last_payment_norm',
              filter: true,
              width: 100,
              cellRendererFramework: 'OpenTitle'
            },
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
              headerName: '',
              field: 'id',
              filter: true,
              width: 100,
              cellRendererFramework: 'OperFsspHodCreditsPlan',
              cellRendererParams: {
                genOpisText: this.genOpisText.bind(this),
              }
            },
          ],
          components: {
            OpenCreditStatus,OpenTitle,OperFsspHodCreditsPlan
          }
        }
      },
      mounted() {
        this.gridApi = this.gridOptions.api;
        this.getFsspHodRecordData(this.$route.params.id).then((response) => {
          if (response.result){
            this.recordData = response.data;
            this.FsspHodCreditsPlanData.id_record = this.$route.params.id;
            this.getFsspHodCreditsPlan().then((response_plan) => {
              if (response_plan.result){
                this.sqlText = response_plan.sql;
              }
            });
          } else {
            this.$vs.notify({
              title: 'Ошибка',
              text: response.error,
              color: 'danger',
              position: 'top-center'
            })
          }
        });
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
        ...mapGetters([
            'FsspHodCreditsPlan','TotalFsspHodCreditsPlan','FsspHodCreditsPlanLoadingFlag','FsspHodCreditsPlanData'
        ]),

        totalPages() {
          if (this.gridApi)
            return Math.ceil(this.TotalFsspHodCreditsPlan / this.paginationPageSize)
          else return 0
        },
        currentPage: {
          get() {
            if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
            else return 1
          },
          set(val) {
            this.setQueryFsspHodCreditsPlanOffset(val - 1);
            this.getFsspHodCreditsPlan();
            this.gridApi.paginationGoToPage(val - 1);
          }
        },
        paginationPageSize() {
          return this.FsspHodCreditsPlanData.limit;
        },
      },
      methods: {
        genOpisText(id_credit, id_record){
          this.genOpisTextFsspHodRecordOneCreditPlan({id_credit: id_credit, id_record: id_record}).then((response) => {
            if (response.result) {
              this.opisText = response.data;
              this.showOpisText = true;
            } else {
              this.$vs.notify({
                title:'Ошибка',
                text: response.error,
                color: 'danger',
                position: 'top-center'
              })
            }
          });
        },
        updateHodCreditsPlan(){
          this.getFsspHodCreditsPlan();
        },
        backToLists(){
          this.$router.back();
        },
        changePag(pag) {
          this.FsspHodCreditsPlanData.limit = pag;
          this.getFsspHodCreditsPlan();
          this.setQueryFsspHodCreditsPlanLimit(pag);
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
            'setQueryFsspHodCreditsPlanOffset','setQueryFsspHodCreditsPlanLimit'
        ]),
        ...mapActions([
            'getFsspHodCreditsPlan','getFsspHodRecordData','genOpisTextFsspHodRecordOneCreditPlan'
        ]),

        onrowDoubleClicked(event) {
          this.$router.push('/credit/'+event.data.id)
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
    .load-bar-fssp-hod-credits-plan{
      display: inline-block;
      max-width: 100px;
      margin: auto;
    }

    .outer-div-fssp-hod-credits-plan
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

    .out-main-fssp-hod-credits-plan{
      position : relative;
    }
</style>
