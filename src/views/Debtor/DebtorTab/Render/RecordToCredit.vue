<template>
  <div>
    <div v-if="vidTypeR == 0">
      <div style="display: flex">
        <div style="width: 400px">
          <h6 class="h6Blue">ФИО должника/Номер договора/ID Кредита: </h6>
          <vs-input type="search" class="w-full" v-model="searchData.find" @keyup.enter="searchCredits"></vs-input>
          <div><span style="color:red;font-size: 10pt">После ввода нажмите Enter</span></div>
        </div>
<!--        <vs-checkbox style="margin-left: 10px" v-model="searchData.fast" @input="searchCredits"></vs-checkbox>-->
      </div>
    </div>
    <div v-if="vidTypeR == 1" class="record-to-credit-info">
      <div>
        <h5>Вы действительно хотите привязать запись к кредиту:</h5>
        <h5 style="margin-top: 10px"><b>{{ bindingData.name_family }} {{ bindingData.name }} {{ bindingData.name_patronymic }}</b> (id кредита <b>{{ bindingData.id_credit }}</b>)?</h5>
      </div>
      <div style="display: flex;">
        <vs-button style="margin-left: 25px;" color="danger" type="filled" @click="bindToCreditYes">Да</vs-button>
        <vs-button style="margin-left: 15px;" color="success" type="filled" @click="bindToCreditNo">Нет</vs-button>
      </div>
    </div>

      <div class="out-main-record-to-credit">
      <ag-grid-vue
          ref="agGridTable"
          style="height: 600px;"
          :components="components"
          :gridOptions="gridOptions"
          class="ag-theme-material w-100 my-4 ag-grid-table"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="creditsData"
          rowSelection="multiple"
          :rowDataChanged="onRowDataChanged"
          colResizeDefault="shift"
          :animateRows="true"
          :floatingFilter="false"
          :pagination="true"
          :paginationPageSize="paginationPageSize"
          :suppressPaginationPanel="true"
          @grid-size-changed="onGridSizeChanged"
          :overlayNoRowsTemplate="'Нет кредитов'"
          :enableRtl="$vs.rtl">
      </ag-grid-vue>
        <transition name="fade">
          <div class="tablePreloader outer-div" v-if="SudActCreditsFindFlag">
              <img class="load-bar" src="/loading.gif" style="width: 70px;">
              <span>Идёт загрузка</span>
          </div>
        </transition>
      </div>

      <vs-pagination
          :total="totalPages"
          :max="7"
          v-model="currentPage"/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import OpenCreditStatus from "../../Render/OpenCreditStatus.vue";
    import OpenRecordToCredit from "./OpenRecordToCredit.vue";
    export default {
        components: {
          OpenCreditStatus,
          OpenRecordToCredit
        },
        data () {
            return {
              vidTypeR:0,
              bindingData:{},
              searchData:{
                find:'',
                fast:true,
                offset:0,
                limit:100,
              },
              creditsData:[],
              creditsTotal:0,
              gridApi: null,
              gridOptions: {},
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
                  hide:false,
                  width: 80,
                  cellRendererFramework: 'OpenRecordToCredit',
                  cellRendererParams: {
                    questBinding: this.questBinding.bind(this)
                  }
                },
                {
                  headerName: 'Фамилия',
                  field: 'name_family',
                  filter: true,
                  hide:false,
                  width: 180
                },
                {
                  headerName: 'Имя',
                  field: 'name',
                  filter: true,
                  hide:false,
                  width: 150
                },
                {
                  headerName: 'Отчество',
                  field: 'name_patronymic',
                  filter: true,
                  hide:false,
                  width: 150
                },
                {
                  headerName: 'Дата рождения',
                  field: 'birthdate',
                  filter: true,
                  hide:false,
                  width: 160
                },
                {
                  headerName: 'Статус',
                  field: 'id_status',
                  hide: false,
                  filter: false,
                  width: 200,
                  cellRendererFramework: 'OpenCreditStatus'
                },
                {
                  headerName: '№ Договора',
                  field: 'number_dog',
                  filter: true,
                  hide:false,
                  width: 180
                },
                {
                  headerName: '№ СА',
                  field: 'number_sa',
                  filter: true,
                  hide:false,
                  width: 180
                },
                {
                  headerName: 'Взыскатель',
                  field: 'recover',
                  filter: false,
                  hide:false,
                  width: 180,
                },
                {
                  headerName: 'Цедент',
                  field: 'recover1',
                  filter: false,
                  hide:false,
                  width: 180,
                },
              ],
              components: {
                OpenCreditStatus,OpenRecordToCredit
              }
            }
        },
        mounted(){
          this.gridApi = this.gridOptions.api;
        },
        computed: {
            totalPages () {
              this.gridApi = this.gridOptions.api
                if (this.gridApi)
                    return Math.ceil(this.creditsTotal / this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
              this.gridApi = this.gridOptions.api
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            currentPage: {
              get () {
                this.gridApi = this.gridOptions.api
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
              },
              set (val) {
                this.gridApi = this.gridOptions.api;
                this.searchData.offset = (val-1) * this.searchData.limit
                this.getSudActDataCredits(this.searchData).then((response) => {
                  if (response.data.result){
                    this.creditsData = response.data.data;
                    this.creditsTotal = response.data.total;
                  }
                });
                this.gridApi.paginationGoToPage(val - 1)
              }
            },
            ...mapGetters([
                'SudActCreditsFindFlag'
            ]),
        },
        methods: {
          bindToCreditYes(){
            this.vidTypeR = 0;
            this.$emit('recordToCreditRun', this.bindingData.id_credit);
            this.bindingData = {};
          },
          bindToCreditNo(){
            this.bindingData = {};
            this.vidTypeR = 0;
          },
          questBinding(data){
            this.vidTypeR = 1;
            this.bindingData = data;
          },
          searchCredits(){
            this.getSudActDataCredits(this.searchData).then((response) => {
              if (response.data.result){
                this.creditsData = response.data.data;
                this.creditsTotal = response.data.total;
              }
            });
          },
          updateSearchQuery (val) {
            this.gridApi = this.gridOptions.api
            this.gridApi.setQuickFilter(val)
          },
          onGridSizeChanged(params) {
            this.gridApi = this.gridOptions.api;
            this.gridApi.sizeColumnsToFit();
          },
          onRowDataChanged () {
            Vue.nextTick(() => {
                  this.gridOptions.api.sizeColumnsToFit();
                }
            );
          },
            ...mapActions([
                'getSudActDataCredits'
            ]),
        },
    }
</script>

<style lang="scss">
    .h6 {
        font-size: 12px;
        color: cadetblue;
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
      margin: auto;
      max-width: 100px;
    }

    .outer-div-record-to-credit
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

    .out-main-record-to-credit{
      position : relative;
    }
    .record-to-credit-info{
      display: flex;
      background: #f5f5f5;
      padding: 15px;
      border-radius: 10px;
    }
</style>
