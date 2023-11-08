<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalMinimalPensions - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalMinimalPensions }} of {{ TotalMinimalPensions }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
                        <vs-dropdown-menu>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                                <span>20</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                                <span>50</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                                <span>100</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
                                <span>150</span>
                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                  <vs-button color="primary" style="margin-left: 10px" @click="showPopup">Новый размер</vs-button>

                </div>
            </div>
          <div class="out-main">
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="MinimalPensions"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    :enableRtl="$vs.rtl"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    :enableBrowserTooltips="true"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'">
            </ag-grid-vue>
            
            <transition name="fade">
                <div class="tablePreloader outer-div" v-if="MinimalPensionsLoadingFlag">
                    <img class="load-bar" src="/loading.gif" style="width: 70px;">
                    <span>Идёт загрузка</span>
                </div>
            </transition>
          </div>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

          <vs-popup classContent="popup-example" title="Мин. размер пенсии" :active.sync="popupActive">
            <div style="margin-top: 10px">Регион</div>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="RegionListMP" v-model="data.id_region"></v-select>
            <div style="margin-top: 10px">Мин.размер</div>
            <vs-input class="w-full mb-base" type="number" v-model="data.amount"></vs-input>

            <vs-button color="success" class="pull-right" type="filled" style="margin-top: 20px"
                       @click="saveAmount">Сохранить</vs-button>
          </vs-popup>

        </div>
    </div>

</template>

<script>
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import OpenMinimalPension from "../Render/OpenMinimalPension.vue";
    export default {
        components: {
            AgGridVue,
            vSelect,
          OpenMinimalPension
        },
        data () {
            return {
              data:{},
              popupActive:false,
                results: null,
                searchQuery: '',
                // AgGrid
                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'Регион',
                        headerTooltip: 'Регион',
                        tooltipField: 'region_name',
                        field: 'region_name',
                        filter: true,
                        width: 300
                    },
                    {
                        headerName: 'Размер',
                        headerTooltip: 'Размер',
                        tooltipField: 'amount',
                        field: 'amount',
                        filter: true,
                        width: 200
                    },
                  {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'OpenMinimalPension'
                    },



                ],

                // Cell Renderer Components
                components: {
                  OpenMinimalPension
                }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalMinimalPensions/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'MinimalPensions','TotalMinimalPensions','MinimalPensionsLoadingFlag','RegionListMP'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },

        },
        methods: {
          saveAmount(){
            this.popupActive = false;
            this.saveMinPensData(this.data).then((response) => {
              this.getMinimalPensions();
              if(response){
                this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
              }
              else{
                this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
              }
            })
          },
          showPopup(){
            this.data = {};
            this.getRegionListMP();
            this.popupActive = true;
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
            onrowDoubleClicked(event){
              this.getRegionListMP();
              this.popupActive = true;
              this.getMinPensData(event.data.id).then((response) => {
                if (response.result){
                  this.data = response.data;
                }
              })
            },
            ...mapMutations([
            ]),
            ...mapActions([
                'getMinimalPensions','getRegionListMP','saveMinPensData','getMinPensData'
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

        },
        mounted () {
            this.gridApi = this.gridOptions.api
            this.getMinimalPensions();
        }
    }


</script>

<style lang="scss">
    .dropdown-button-container {
        display: flex;
        align-items: center;

    .btnx {
        border-radius: 5px 0px 0px 5px;
    }

    .btn-drop {
        border-radius: 0px 5px 5px 0px;
        border-left: 1px solid rgba(255, 255, 255, .2);
    }
    }
    .con-vs-pagination{
        margin-right: 40px!important;
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

