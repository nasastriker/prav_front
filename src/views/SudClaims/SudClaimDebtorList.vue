<template>
  <div id="page-user-list">
    <div class="vx-card p-6 no-shadow">
      <div class="flex flex-wrap justify-between items-center">
        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
          <vs-dropdown vs-trigger-click class="cursor-pointer" style="margin-top: 20px">
            <div class="cursor-pointer flex items-center justify-between font-medium" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalSudClaims - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalSudClaims }} of {{ TotalSudClaims }}</span>
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
        <div class="vx-row" style="padding-top: 20px">
          <div class="vx-col mb-2" style="width: 400px">
        <h6 class="h6Blue mb-1">Тип жалобы/заявления</h6>
        <v-select  class="w-full " :reduce="label => label.id" label="text" :options="SudClaimTypes" v-model="SudClaim.claim_type" @input="setClaimType"></v-select>
          </div>
          <div class="vx-col mb-2" style="margin-top: 18px">
        <vs-button @click="filterReset">Сбросить фильтры</vs-button>
        </div>
        </div>
      </div>
      <div class="out-main">
        <ag-grid-vue
            ref="agGridTable"
            :gridOptions="gridOptions"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="SudClaims"
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
            :enableRtl="$vs.rtl"
            :overlayNoRowsTemplate="'Нет записей'"
            :overlayLoadingTemplate="'Идёт загрузка'">
        </ag-grid-vue>
        <transition name="fade">
          <div class="outer-div" v-if="SudClaimsLoadingFlag"><img class="load-bar" src="/loading.gif"></div>
        </transition>
      </div>

      <vs-pagination
          :total="totalPages"
          :max="7"
          v-model="currentPage" />

    </div>
  </div>

</template>

<script>
import { VueCsvImport } from 'vue-csv-import';
import { AgGridVue } from 'ag-grid-vue'
import vSelect from 'vue-select'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import r from '../../route';
import axios from '../../axios'
import OpenCreditStatus from "../Debtor/Render/OpenCreditStatus.vue";
import Vue from "vue";
import SudClaimDebtorFilterRender from "./Render/SudClaimDebtorFilterRender.vue";
export default {
  components: {
    AgGridVue,
    vSelect,
    VueCsvImport,
    SudClaimDebtorFilterRender,
    OpenCreditStatus
  },
  beforeMount() {

    this.defaultColDef = { resizable: true };
    this.rowHeight = 50;
    this.components={SudClaimDebtorFilterRender:SudClaimDebtorFilterRender};
  },
  data () {
    return {
      searchQuery: '',
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
          floatingFilterComponentFramework: 'SudClaimDebtorFilterRender',
          floatingFilterComponentParams:{
            type_f: 'string',
            field: 'name_family',
            emitFilter:'clear_filter_sud_claims_filter',
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
          floatingFilterComponentFramework: 'SudClaimDebtorFilterRender',
          floatingFilterComponentParams:{
            type_f: 'string',
            field: 'debtors.name',
            emitFilter:'clear_filter_sud_claims_filter',
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
          floatingFilterComponentFramework: 'SudClaimDebtorFilterRender',
          floatingFilterComponentParams:{
            type_f: 'string',
            field: 'name_patronymic',
            emitFilter:'clear_filter_sud_claims_filter',
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
          floatingFilterComponentFramework: 'SudClaimDebtorFilterRender',
          floatingFilterComponentParams:{
            type_f: 'date',
            field: 'birthdate',
            emitFilter:'clear_filter_sud_claims_filter',
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
      ],
      components: {
        SudClaimDebtorFilterRender, OpenCreditStatus
      }
    }
  },

  computed: {
    totalPages () {
      if (this.gridApi)
        return Math.ceil(this.TotalSudClaims/this.paginationPageSize)
      else return 0
    },
    paginationPageSize () {
      return this.SudClaim.limit
    },
    ...mapGetters([
        'SudClaims','TotalSudClaims','SudClaimsLoadingFlag','SudClaim','SudClaimTypes'
    ]),
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set(val) {
        this.setQuerySudClaimsOffset(val-1);
        this.getSudClaims();
        this.gridApi.paginationGoToPage(val - 1);
      }
    },

  },
  methods: {
    setClaimType(){
      if(this.SudClaim.claim_type==null){
        this.SudClaim.claim_type='fi_prikaz_claim_send_status';
      }
      this.getSudClaims();
    },
    onrowDoubleClicked(event){
      this.$router.push('/debtors/'+event.data.cred_id)
    },
    changePag(pag) {
      this.SudClaim.limit = pag;
      this.getSudClaims();
      this.setQuerySudClaimsLimit(pag);
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
        'setQuerySudClaimsLimit','setQuerySudClaimsOffset'
    ]),
    ...mapActions([
        'getSudClaims','getSudClaimTypes'
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
      this.SudClaim.fields[findFieldName]={
        find:findField,
        name:findFieldName,
        type: findType
      }
      this.getSudClaims();
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
      this.$root.$emit('clear_filter_sud_claims_filter')
    },
  },
  mounted () {
    this.gridApi = this.gridOptions.api;
    this.getSudClaimTypes();
    this.getSudClaims();
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

.outer-div
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

.out-main{
  position : relative;
}
</style>
