<template>
    <div >
      <vs-button color="primary" style="width: 300px;margin-top: 20px" @click="showJudPopup">История судебных заседаний</vs-button>

      <vs-popup classContent="popup-example" title="История судебных заседаний" :active.sync="showJud">
        <vs-button color="primary" style="width: 300px" @click="showAddHearing">Добавить заседание</vs-button>

        <div v-if="showAdd">
          <div style="margin-top: 10px">Название</div>
          <vs-input class="w-full mb-base" v-model="data.name"></vs-input>
          <div style="margin-top: 10px">Дата</div>
          <vs-input type="date" class="w-100 mb-base" v-model="data.date_jud"></vs-input>
          <vs-button v-if="changeHearing" color="primary" @click="addHearing">Изменить</vs-button>
          <vs-button v-else color="primary" @click="addHearing">Добавить</vs-button>
        </div>

        <div class="out-main-11">
          <ag-grid-vue
              ref="agGridTable"
              :gridOptions="gridOptions"
              class="ag-theme-material w-100 my-4 ag-grid-table"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              :rowData="JudicialHearingList"
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
              :overlayNoRowsTemplate="'Нет заседаний'"
              :enableRtl="$vs.rtl">
          </ag-grid-vue>
          <transition name="fade">
            <div class="outer-div-11" v-if="JudicialHearingLoadingFlag"><img class="load-bar-11" src="/loading.gif"></div>
          </transition>
        </div>
      </vs-popup>
    </div>
</template>

<script>
    import OpenJudHearing from "./OpenJudHearing.vue";
    import { AgGridVue } from 'ag-grid-vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import Vue from "vue";
    export default {
        components: {
          AgGridVue,OpenJudHearing
        },

        props:['sud_type'],
        data () {
            return {
              changeHearing:false,
              data: {},
              showAdd:false,
              showJud:false,
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
                  field: 'name',
                  filter: true,
                  width: 150,
                },
                {
                  headerName: 'Дата',
                  field: 'norm_date_jud',
                  filter: true,
                  width: 150,
                },
                {
                  headerName: '',
                  field: 'id',
                  filter: true,
                  width: 50,
                  cellRendererFramework: Vue.extend(OpenJudHearing),
                  cellRendererParams: {
                    to_refresh_after_del: this.onRefreshAfterDel.bind()
                  }
                },
              ],
              components: {
                OpenJudHearing
              }
            }
        },
        mounted(){
          this.gridApi = this.gridOptions.api

        },

        asyncComputed: {

        },
        computed: {


            ...mapGetters([
                'User','Deb','JudicialHearingList','JudicialHearingLoadingFlag'

            ]),


        },
        methods: {
          onRefreshAfterDel(){
            this.getJudicialHearings({id_credit: this.Deb.debtorCredit.id, sud_type: this.sud_type});
          },
          onrowDoubleClicked(event){
            this.showAdd = true;
            this.changeHearing = true;
            this.getOneJudicialHearingData(event.data.id).then((response) => {
              if (response.result){
                this.data = response.data;
              }
            })
          },
          addHearing(){
            this.showAdd = false;
            this.data.id_credit = this.Deb.debtorCredit.id;
            this.data.sud_type = this.sud_type;
            this.saveJudicialHearingData(this.data).then((response) => {
              this.getJudicialHearings({id_credit: this.Deb.debtorCredit.id, sud_type: this.sud_type});
              if(response){
                this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
              }
              else{
                this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
              }
            })
          },
          showAddHearing(){
            this.data = {};
            this.showAdd = true;
            this.changeHearing = false;
          },
          showJudPopup(){
            this.getJudicialHearings({id_credit: this.Deb.debtorCredit.id, sud_type: this.sud_type});
            this.showJud = true;
          },

          onColumnResized(params) {
            params.api.resetRowHeights();
          },
          onColumnVisible(params) {
            params.api.resetRowHeights();
          },
          onGridSizeChanged(params) {
            if (params.clientWidth > 200) {
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
              'getJudicialHearings','saveJudicialHearingData','getOneJudicialHearingData'
          ]),
          paginationPageSize () {
            if (this.gridApi) return this.gridApi.paginationGetPageSize()
            else return 100
          },
        },
    }
</script>

<style lang="scss">
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
</style>
