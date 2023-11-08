<template>
    <div id="page-user-list">
        <div class="vx-card p-6 no-shadow">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalIpOnline - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalIpOnline }} of {{ TotalIpOnline }}</span>
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
                  <vs-checkbox style="margin-top: 10px" v-model="FsspIpOnline.no_found_only" @input="showNoFoundOnly">Показать только не найденные кредиты</vs-checkbox>
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
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="FsspIpOnlineArr"
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
              <div class="tablePreloader outer-div" v-if="FsspIpOnlineLoadingFlag">
                    <img class="load-bar" src="/loading.gif" style="width: 70px;">
                    <span>Идёт загрузка</span>
                </div>
            </transition>
          </div>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

          <vs-popup class="holamundo" title="Данные из ГУ" :active.sync="popupDataIp">
            <json-viewer
                :value="data_ip"
                :expand-depth=5
                copyable

                sort></json-viewer>
          </vs-popup>

          <vs-popup class="holamundo" title="Привязка данных к кредиту" :active.sync="popupDataIpToCredit">

          </vs-popup>
        </div>
    </div>

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import IpOnlineFilterRender from "./Render/IpOnlineFilterRender.vue";
    import OpenIpOnlineError from "./Render/OpenIpOnlineError.vue";
    import OpenIpOnlineData from "./Render/OpenIpOnlineData.vue";
    export default {
        components: {
          IpOnlineFilterRender,
          OpenIpOnlineError,
          OpenIpOnlineData,
        },
      beforeMount() {
        this.defaultColDef = { resizable: true };
        this.rowHeight = 50;
        this.components={IpOnlineFilterRender:IpOnlineFilterRender};
      },
        data () {
            return {
              noFoundOnly:false,
              popupDataIp:false,
              popupDataIpToCredit:false,
              data_ip:null,
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
                    headerTooltip: 'Фамилия',
                    tooltipField: 'name_family',
                    field: 'name_family',
                    filter: true,
                    floatingFilterComponentFramework: 'IpOnlineFilterRender',
                    floatingFilterComponentParams:{
                      type_f: 'string',
                      field: 'name_family',
                      emitFilter:'clear_filter_ip_online_filter',
                      updateSearchField: this.updateSearchField.bind(this)
                    },
                    hide:false,
                    width: 50,
                  },
                  {
                    headerName: 'Имя',
                    headerTooltip: 'Имя',
                    tooltipField: 'name',
                    field: 'name',
                    filter: true,
                    floatingFilterComponentFramework: 'IpOnlineFilterRender',
                    floatingFilterComponentParams:{
                      type_f: 'string',
                      field: 'name',
                      emitFilter:'clear_filter_ip_online_filter',
                      updateSearchField: this.updateSearchField.bind(this)
                    },
                    hide:false,
                    width: 50,
                  },
                  {
                    headerName: 'Отчество',
                    headerTooltip: 'Отчество',
                    tooltipField: 'name_patronymic',
                    field: 'name_patronymic',
                    filter: true,
                    floatingFilterComponentFramework: 'IpOnlineFilterRender',
                    floatingFilterComponentParams:{
                      type_f: 'string',
                      field: 'name_patronymic',
                      emitFilter:'clear_filter_ip_online_filter',
                      updateSearchField: this.updateSearchField.bind(this)
                    },
                    hide:false,
                    width: 50,
                  },
                  {
                    headerName: 'ДР',
                    headerTooltip: 'День рождения',
                    tooltipField: 'birthdate_norm',
                    field: 'birthdate_norm',
                    filter: false,
                    width: 30,
                  },
                  {
                    headerName: 'ИД',
                    headerTooltip: 'ИД',
                    tooltipField: 'number_sa',
                    field: 'number_sa',
                    filter: false,
                    width: 50,
                  },
                  {
                    headerName: 'Номер ИП',
                    headerTooltip: 'Номер ИП',
                    tooltipField: 'number_ip',
                    field: 'number_ip',
                    filter: true,
                    floatingFilterComponentFramework: 'IpOnlineFilterRender',
                    floatingFilterComponentParams:{
                      type_f: 'string',
                      field: 'fssp_check_ip_online_items.number_ip',
                      emitFilter:'clear_filter_ip_online_filter',
                      updateSearchField: this.updateSearchField.bind(this)
                    },
                    hide:false,
                    width: 60,
                  },
                  {
                    headerName: 'Возбуждено',
                    headerTooltip: 'Возбуждено',
                    tooltipField: 'rise_date_norm',
                    field: 'rise_date_norm',
                    filter: true,
                    floatingFilterComponentFramework: 'IpOnlineFilterRender',
                    floatingFilterComponentParams:{
                      type_f: 'date',
                      field: 'rise_date',
                      emitFilter:'clear_filter_ip_online_filter',
                      updateSearchField: this.updateSearchField.bind(this)
                    },
                    hide:false,
                    width: 40
                  },
                  {
                    headerName: 'Окончено',
                    headerTooltip: 'Окончено',
                    tooltipField: 'end_date_norm',
                    field: 'end_date_norm',
                    filter: false,
                    width: 30,
                  },
                  {
                    headerName: 'Данные из ГУ',
                    headerTooltip: 'Данные из ГУ',
                    tooltipField: 'data_ip',
                    field: 'data_ip',
                    filter: false,
                    width: 30,
                    cellRendererFramework: 'OpenIpOnlineData',
                    cellRendererParams: {
                      showPopupDataIp: this.showPopupDataIp.bind(this)
                    }
                  },
                  {
                    headerName: 'Ошибка',
                    headerTooltip: 'Ошибка',
                    tooltipField: 'error',
                    field: 'error',
                    filter: false,
                    width: 50,
                    cellRendererFramework: 'OpenIpOnlineError'
                  },
                  {
                    headerName: 'Дата/время изменения',
                    headerTooltip: 'Дата/время изменения',
                    tooltipField: 'upd_date_time_norm',
                    field: 'upd_date_time_norm',
                    filter: false,
                    width: 50,
                  },
                  {
                    headerName: 'Организация',
                    headerTooltip: 'Организация',
                    tooltipField: 'org_name',
                    field: 'org_name',
                    filter: true,
                    floatingFilterComponentFramework: 'IpOnlineFilterRender',
                    floatingFilterComponentParams:{
                      type_f: 'list',
                      field: 'org',
                      emitFilter:'clear_filter_ip_online_filter',
                      updateSearchField: this.updateSearchField.bind(this)
                    },
                    hide:false,
                    width: 80
                  },
                ],
              components: {
                IpOnlineFilterRender,OpenIpOnlineError,OpenIpOnlineData
              }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalIpOnline/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
              return this.FsspIpOnline.limit
            },
            ...mapGetters([
                'FsspIpOnlineArr','TotalIpOnline','FsspIpOnlineLoadingFlag','FsspIpOnline'

            ]),
            currentPage: {
              get() {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
              },
              set(val) {
                this.setQueryIpOnlineOffset(val-1);
                this.getFsspIpOnlineArr();
                this.gridApi.paginationGoToPage(val - 1);
              }
            },

        },
        methods: {
          onrowDoubleClicked(event){
            if (event.data.id_credit !== null) {
              this.$router.push('/debtors/' + event.data.id_credit)
            } else {
              this.popupDataIpToCredit = true;
            }
          },
          changePag(pag) {
            this.FsspIpOnline.limit = pag;
            this.getFsspIpOnlineArr();
            this.setQueryIpOnlineLimit(pag);
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
            'setQueryIpOnlineLimit','setQueryIpOnlineOffset'
          ]),
            ...mapActions([
                'getFsspIpOnlineArr','getFsspOrgsListGu'
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
            this.FsspIpOnline.fields[findFieldName]={
              find:findField,
              name:findFieldName,
              type: findType
            }
            this.getFsspIpOnlineArr();
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
            this.$root.$emit('clear_filter_ip_online_filter')
          },
          showPopupDataIp(dataip){
            this.data_ip = dataip;
            this.popupDataIp = true;
          },
          showNoFoundOnly(){
            this.getFsspIpOnlineArr();
          },
        },
        mounted () {
            this.gridApi = this.gridOptions.api
            this.getFsspIpOnlineArr();
            this.getFsspOrgsListGu();
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
