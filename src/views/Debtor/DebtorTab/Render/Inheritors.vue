<template>
  <div class="out-main-11">
    <vs-button color="primary" style="width: 300px;" @click="showAddInheritor">Добавить наследника</vs-button>
  <ag-grid-vue
              style="height: 200px"
              ref="agGridTable"
              :gridOptions="gridOptions"
              class="ag-theme-material w-100 my-4 ag-grid-table"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              :rowData="InheritorList"
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
              :overlayNoRowsTemplate="'Нет наследников'"
              :enableRtl="$vs.rtl">
          </ag-grid-vue>
    <transition name="fade">
      <div class="outer-div-11" v-if="InheritorsLoadingFlag"><img class="load-bar-11" src="/loading.gif"></div>
    </transition>


    <vs-popup classContent="popup-example" title="Наследник" :active.sync="popupActiveInheritors">
      <div style="margin-top: 10px">Фамилия</div>
      <vs-input class="w-full mb-base" v-model="data.name_family"></vs-input>
      <div style="margin-top: 10px">Имя</div>
      <vs-input class="w-full mb-base" v-model="data.name"></vs-input>
      <div style="margin-top: 10px">Отчество</div>
      <vs-input class="w-full mb-base" v-model="data.name_patronymic"></vs-input>
      <div style="margin-top: 10px">Дата рождения</div>
      <vs-input type="date" class="w-100" v-model="data.birthdate"></vs-input>
      <div style="margin-top: 10px">Серия паспорта</div>
      <vs-input class="w-full mb-base" v-model="data.series"></vs-input>
      <div style="margin-top: 10px">Номер паспорта</div>
      <vs-input class="w-full mb-base" v-model="data.number"></vs-input>
      <div style="margin-top: 10px">Кем выдан</div>
      <vs-input class="w-full mb-base" v-model="data.given_pass"></vs-input>
      <div style="margin-top: 10px">Дата выдачи</div>
      <vs-input type="date" class="w-100" v-model="data.pass_date"></vs-input>
      <div style="margin-top: 10px">Адрес</div>
      <VueSuggestionsChange
          :model.sync="data.address"
          :fias.sync="data.address_reg"
          :options="SuggestionOptionsAddress"
          style="color:black" >
      </VueSuggestionsChange>

      <vs-button color="success" class="pull-right" type="filled" style="margin-top: 20px"
                 @click="saveInheritor">Сохранить</vs-button>
    </vs-popup>
  </div>
</template>

<script>
    import Vue from 'vue'
    import { AgGridVue } from 'ag-grid-vue'
    import AsyncComputed from 'vue-async-computed'
    import { mapActions,mapGetters } from 'vuex'
    import VueSuggestionsChange from '../../../../components/vue-suggestions/vue-suggestionsChange.vue'
    import vSelect from 'vue-select'
    import OpenInheritor from "./OpenInheritor.vue";
    import { RefreshCwIcon } from 'vue-feather-icons'
    Vue.use(AsyncComputed)
    export default {
        components: {
          VueSuggestionsChange,'v-select': vSelect,AgGridVue,RefreshCwIcon,OpenInheritor
        },
        data () {
            return {
              data: {},
              popupActiveInheritors:false,
              gridApi: null,
              gridOptions: {},
              defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
              },
              columnDefs: [
                {
                  headerName: 'Фамилия',
                  field: 'name_family',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Имя',
                  field: 'name',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'Отчество',
                  field: 'name_patronymic',
                  filter: true,
                  width: 100,
                },
                {
                  headerName: 'ДР',
                  field: 'birthdate_norm',
                  filter: true,
                  width: 50,
                },
                {
                  headerName: 'Адрес',
                  field: 'address',
                  filter: true,
                  width: 200,
                },
                {
                  headerName: 'Паспорт',
                  field: 'pass_data',
                  filter: true,
                  width: 200,
                },
                {
                  headerName: 'Операции',
                  field: 'id',
                  filter: true,
                  width: 50,
                  cellRendererFramework: 'OpenInheritor'
                },
              ],
              components: {
                OpenInheritor
              }
            }
        },
      computed: {
        ...mapGetters([
          'InheritorList','Deb','InheritorsLoadingFlag','SuggestionOptionsAddress'
        ]),
      },
        mounted(){
          this.gridApi = this.gridOptions.api
        },
      methods: {
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
        onRowDataChanged () {
          Vue . nextTick (() => {
                this.gridOptions.api.sizeColumnsToFit();
              }
          );
        },
        ...mapActions([
          'saveInheritorData','getInheritorData','getInheritorList'
        ]),
        paginationPageSize () {
          if (this.gridApi) return this.gridApi.paginationGetPageSize()
          else return 100
        },
        onrowDoubleClicked(event){
          this.popupActiveInheritors = true;
          this.getInheritorData(event.data.id).then((response) => {
            if (response.result){
              this.data = response.data;
            }
          })
        },
        showAddInheritor(){
          this.data = {};
          this.popupActiveInheritors = true;
        },
        saveInheritor(){
          this.popupActiveInheritors = false;
          this.data.id_debtor = this.Deb.debtor.id;
          this.saveInheritorData(this.data).then((response) => {
            this.getInheritorList(this.Deb.debtor.id);
            if(response){
              this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
            }
            else{
              this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
            }
          })
        },
      },
    }
</script>

<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
    .checkbox_x.vs-checkbox{
        min-width: 20px;
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
      margin-top: 40px;
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
