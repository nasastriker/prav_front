<template>
    <div id="page-user-list">
        <div class="vx-card p-6 no-shadow">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalPostanAllFssp - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalPostanAllFssp }} of {{ TotalPostanAllFssp }}</span>
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

              <div class="vx-row" style="margin-top: 20px">
                <div class="vx-col mb-2">
                  <vs-checkbox style="margin-top: 10px" v-model="User.pag.fssp_all_postans.no_found_only" @input="showNoFoundOnly">Показать только не найденные кредиты</vs-checkbox>
                </div>
                <div class="vx-col mb-2">
                  <vs-button @click="filterReset">Сбросить фильтры</vs-button>
                </div>
              </div>
            </div>
          <div class="out-main">
            <ag-grid-vue
                    ref="agGridTable"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table type_order_restrictions unrecognized_files_table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="FsspPostanAllArr"
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
                    :enableBrowserTooltips="true"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'">
            </ag-grid-vue>
            <transition name="fade">
                <div class="tablePreloader outer-div" v-if="FsspPostanAllLoadingFlag">
                    <img class="load-bar" src="/loading.gif" style="width: 70px;">
                    <span>Идёт загрузка</span>
                </div>
            </transition>
          </div>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

          <vs-popup fullscreen classContent="popup-example" title="Привязка постановления к кредиту" :active.sync="popupRecordToCredit">
            <RecordToCredit @recordToCreditRun="recordToCreditRun"></RecordToCredit>
          </vs-popup>
        </div>
    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import FileLink from "./Render/FileLink.vue";
    import ResCheck from "./Render/ResCheck.vue";
    import OpenUrlJournal from "./Render/OpenUrlJournal.vue";
    import PostanFilterRender from "./Render/PostanFilterRender.vue";
    import OpenFsspPostanFio from "./Render/OpenFsspPostanFio.vue";
    import RecordToCredit from "../Debtor/DebtorTab/Render/RecordToCredit.vue";
    export default {
        components: {
            OpenUrlJournal,
            VueCsvImport,
            FileLink,
            ResCheck,
            PostanFilterRender,
          OpenFsspPostanFio,
          RecordToCredit
        },
      beforeMount() {

        this.defaultColDef = { resizable: true };
        this.rowHeight = 50;
        this.components={PostanFilterRender:PostanFilterRender};
      },
        data () {
            return {
              id_post:null,
              popupRecordToCredit:false,
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
                    headerName: 'Номер ИП',
                    headerTooltip: 'Номер ИП',
                    tooltipField: 'number_ip',
                    field: 'number_ip',
                    filter: false,
                    width: 80,
                  },
                    {
                        headerName: 'ФИО',
                        headerTooltip: 'ФИО',
                        tooltipField: 'deb_fio',
                        field: 'deb_fio',
                        filter: false,
                        width: 150,
                      cellRendererFramework: 'OpenFsspPostanFio',
                      cellRendererParams: {
                        bindToCredit: this.bindToCredit.bind(this),
                      }
                    },
                    {
                        headerName: 'ДР',
                        headerTooltip: 'День рождения',
                        tooltipField: 'deb_dr',
                        field: 'deb_dr',
                        filter: false,
                        width: 50,
                    },
                    {
                        headerName: 'Вид постановления',
                        headerTooltip: 'Вид постановления',
                        tooltipField: 'doc_name',
                        field: 'doc_name',
                        className: 'qweqweqwe',
                        filter: true,
                        floatingFilterComponentFramework: 'PostanFilterRender',
                        floatingFilterComponentParams:{
                          width: 120,
                          type_f: 'list',
                          field: 'doc_type',
                          emitFilter:'clear_filter_postan_filter',
                          newVal:'new_val_for_list_id',
                          updateSearchField: this.updateSearchField.bind(this)
                        },
                        hide:false,
                        width: 150,
                    },
                    {
                        headerName: 'Идентификатор',
                        headerTooltip: 'Идентификатор',
                        tooltipField: 'doc_id',
                        field: 'doc_id',
                        filter: false,
                        width: 50,
                    },
                  {
                    headerName: 'Дата постановления',
                    headerTooltip: 'Дата постановления',
                        tooltipField: 'doc_date_norm',
                    field: 'doc_date_norm',
                    filter: false,
                    width: 50,
                  },
                  {
                    headerName: 'Файл постановления',
                    headerTooltip: 'Файл постановления',
                        tooltipField: 'file_name',
                    field: 'file_name',
                    filter: false,
                    width: 50,
                    cellRendererFramework: 'FileLink',
                  },
                  {
                    headerName: 'Получатель',
                    headerTooltip: 'Получатель',
                        tooltipField: 'receiver',
                    field: 'receiver',
                    filter: false,
                    width: 100,
                  },
                  {
                    headerName: 'Признак ПМ',
                    headerTooltip: 'Признак ПМ',
                        tooltipField: 'priznak_pm_norm',
                    field: 'priznak_pm_norm',
                    filter: false,
                    width: 50,
                  },
                  {
                    headerName: 'Результат проверки',
                    headerTooltip: 'Результат проверки',
                        tooltipField: 'check_result',
                    field: 'check_result',
                    filter: false,
                    width: 50,
                    cellRendererFramework: 'ResCheck',
                  },
                  {
                    headerName: 'Дата обжалования',
                    headerTooltip: 'Дата обжалования',
                        tooltipField: 'date_claim_norm',
                    field: 'date_claim_norm',
                    filter: false,
                    width: 50,
                  },
                ],
              components: {
                FileLink,
                PostanFilterRender,
                OpenFsspPostanFio
              }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalPostanAllFssp/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
              if (typeof this.User.pag.fssp_all_postans !== 'undefined') {
                if (typeof this.User.pag.fssp_all_postans.limit !== 'undefined') return this.User.pag.fssp_all_postans.limit;
              }
              return 100;
            },
            ...mapGetters([
                'FsspPostanAllArr','TotalPostanAllFssp','FsspPostanAllLoadingFlag','User'
            ]),
            currentPage: {
              get() {
                if (typeof this.User.pag.fssp_all_postans !== 'undefined') {
                  if (typeof this.User.pag.fssp_all_postans.curPage !== 'undefined') return this.User.pag.fssp_all_postans.curPage
                }
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
              },
              set(val) {
                if (typeof this.User.pag.fssp_all_postans !== 'undefined') {
                  this.User.pag.fssp_all_postans.curPage = val;
                  this.setQueryAllFsspPostansOffset(val-1);
                  this.gridApi.paginationGoToPage(val - 1);
                  this.setDataUser().then((response) => {
                    // console.log('set cur page')
                    this.getFsspPostansAll().then((response) => {
                      this.onGridReady();
                    });
                  });
                }
              }
            },

        },
        methods: {
          showNoFoundOnly(){
            this.setDataUser().then((response)=>{
              this.getFsspPostansAll().then((response) => {
                this.onGridReady();
              });
            })
          },
          recordToCreditRun(id_credit){
            this.popupRecordToCredit = false;
            this.setUnknownPostanToCredit({id_post: this.id_post, id_credit: id_credit}).then((response_set) => {
              if (response_set.result) {
                this.$vs.notify({
                  title: 'Сообщение',
                  text: 'Запись привязана!',
                  color: 'success',
                  position: 'top-center'
                })
                this.getFsspPostansAll().then((response) => {
                  this.onGridReady();
                });
              } else {
                this.$vs.notify({
                  title: 'Ошибка',
                  text: response_set.error,
                  color: 'danger',
                  position: 'top-center'
                })
              }
            })
            this.id_post = null;
          },
          bindToCredit(id_post){
            this.id_post = id_post;
            this.User.pag.fssp_all_postans.selectIdPost = this.id_post;
            this.setDataUser().then((response)=> {
              this.popupRecordToCredit = true;
            });
          },
          onGridReady(){
            this.gridOptions.api.forEachNode(node => node.data.id == this.User.pag.fssp_all_postans.selectIdPost ? node.setSelected(true) : node.setSelected(false));
          },
          // onSelectionChanged(){
            // console.log('onSelectionChanged')
            // this.User.pag.fssp_all_postans.selectIdPost = this.gridOptions.api.getSelectedRows()[0].id
            // this.setDataUser();
          // },
          onrowDoubleClicked(event){
            if (event.data.id_credit == null){
              this.bindToCredit(event.data.id);
            } else {
              this.User.pag.fssp_all_postans.selectIdPost = event.data.id;
              this.setDataUser().then((response) => {
                this.$router.push('/debtors/' + event.data.id_credit)
              });
            }
          },
          changePag(pag) {
            this.User.pag.fssp_all_postans.limit = pag;
            this.setDataUser().then((response)=>{
              // console.log('change pag')
              this.getFsspPostansAll().then((response) => {
                this.onGridReady();
              });
            })
            this.setQueryAllFsspPostansLimit(pag);
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
            'setQueryAllFsspPostansLimit','setQueryAllFsspPostansOffset'
          ]),
            ...mapActions([
                'getFsspPostansAll','getFsspPostanDocTypes','setDataUser','getDataUser','setUnknownPostanToCredit'
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
            // this.User.pag.credit.find=''
            this.User.pag.fssp_all_postans.fields = JSON.parse(this.User.pag.fssp_all_postans.fields);
            this.User.pag.fssp_all_postans.fields[findFieldName]={
              find:findField,
              name:findFieldName,
              type: findType
            }
            this.User.pag.fssp_all_postans.fields = JSON.stringify(this.User.pag.fssp_all_postans.fields);
            this.setDataUser().then((response)=>{
              // console.log('updateSearchField', this.User.pag.fssp_all_postans.fields)
              this.getFsspPostansAll().then((response) => {
                this.onGridReady();
              });
            })
            // if(!not_update)this.getDataCredits(this.User.pag.credit);
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
            this.$root.$emit('clear_filter_postan_filter');
            // console.log(this.$root)
          },
          newValListId(new_val){
            this.$root.$emit('new_val_for_list_id', new_val);
          },
        },
        mounted () {
          let first_load = false;
          this.gridApi = this.gridOptions.api
          this.getDataUser().then((response)=> {
            if (typeof this.User.pag.fssp_all_postans === 'undefined') {
              this.User.pag.fssp_all_postans = {
                fields:"{\"doc_type\":{\"find\":\"all\",\"name\":\"doc_type\",\"type\":\"list\"}}",
                offset:0,
                limit:100,
                curPage:1,
                selectIdPost:0,
                no_found_only:0,
              }
              first_load = true;
            }
            // console.log('mount_all')
            let fields = JSON.parse(this.User.pag.fssp_all_postans.fields);
            this.newValListId(fields.doc_type.find);
            this.gridApi.paginationGoToPage(this.User.pag.fssp_all_postans.curPage - 1);
            if (first_load) {
              // console.log('mount')
              this.getFsspPostansAll();
            }
            this.getFsspPostanDocTypes();
          });
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
