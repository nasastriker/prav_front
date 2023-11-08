<template>
    <div id="page-user-list">
        <div class="vx-card p-6 no-shadow">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalJournalErrors - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalJournalErrors }} of {{ TotalJournalErrors }}</span>
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
<!--                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">-->
<!--                    <vs-button class="mb-4 md:mb-0 mr-4" color="danger" type="filled"-->
<!--                             @click="runJobFsspMonday">Запустить выгрузку</vs-button>-->
<!--                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />-->
<!--                </div>-->
              <vs-input type="date" v-model="FsspJournalErrorsData.pag.date_send_journal"
                        @change="changeDate"></vs-input>
              <v-select style="width: 500px;margin-right: auto;margin-left: 10px" :reduce="label => label.id" label="val" :options="TypesOperFsspAllError" v-model="FsspJournalErrorsData.pag.type_oper" @input="changeDate"></v-select>
              <a class="flex" style="gap: 5px;" v-auth-href :href="url"><feather-icon icon="FileTextIcon" svgClasses="h-5 w-5"/>Выгрузить в файл</a>
            </div>
          <div class="out-main">
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="FsspJournalErrorsArr"
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
                    :enableRtl="$vs.rtl"
                    :enableBrowserTooltips="true"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'">
            </ag-grid-vue>
            <transition name="fade">
                <div class="tablePreloader outer-div" v-if="FsspJournalErrorsLoadingFlag">
                    <img class="load-bar" src="/loading.gif" style="width: 70px;">
                    <span>Идёт загрузка</span>
                </div>
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
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import OpenJournalError from "./Render/OpenJournalError.vue";
    import Vue from "vue";
    import VueAuthHref from "vue-auth-href";
    const options = {
      token: () => `${localStorage.getItem('accessToken')}`
    }
    Vue.use(VueAuthHref, options);
    export default {
        components: {
            VueCsvImport,
          OpenJournalError
        },
        data () {
            return {
                searchQuery: '',
                csv:[],
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
                        headerName: 'Взыскатель',
                        headerTooltip: 'Взыскатель',
                        tooltipField: 'rec_name',
                        field: 'rec_name',
                        filter: true,
                        width: 100,
                    },
                    {
                        headerName: 'ФИО',
                        headerTooltip: 'ФИО',
                        tooltipField: 'deb_fio',
                        field: 'deb_fio',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'ДР',
                        headerTooltip: 'День рождения',
                        tooltipField: 'deb_dr',
                        field: 'deb_dr',
                        filter: true,
                        width: 50,
                    },
                    {
                        headerName: 'Номер договора',
                        headerTooltip: 'Номер договора',
                        tooltipField: 'number_dog',
                        field: 'number_dog',
                        filter: true,
                        width: 80,
                    },
                    {
                        headerName: 'Вид действия',
                        headerTooltip: 'Вид действия',
                        tooltipField: 'name_oper',
                        field: 'name_oper',
                        filter: true,
                        width: 120,
                    },
                    {
                        headerName: 'Дата действия',
                        headerTooltip: 'Дата действия',
                        tooltipField: 'date_send_norm',
                        field: 'date_send_norm',
                        filter: true,
                        width: 50,
                    },
                    {
                        headerName: 'Ошибка',
                        headerTooltip: 'Ошибка',
                        tooltipField: 'message_txt',
                        field: 'message_txt',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenJournalError'
                  },
                ],

              components: {
                OpenJournalError
              }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalJournalErrors/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
              return this.FsspJournalErrorsData.pag.limit
            },
            ...mapGetters([
                'FsspJournalErrorsArr','TotalJournalErrors','FsspJournalErrorsLoadingFlag','FsspJournalErrorsData','TypesOperFsspAllError'

            ]),
            currentPage: {
              get() {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
              },
              set(val) {
                this.setQueryJournalErrorsOffset(val-1);
                this.getFsspMainJournalErrors();
                this.gridApi.paginationGoToPage(val - 1);
              }
            },
          url(){
            return '/fssp_journal_to_excel/?data='+JSON.stringify(this.FsspJournalErrorsData.pag)+'&error=1';
          }

        },
        methods: {
          onrowDoubleClicked(event){
            this.$router.push('/debtors/' + event.data.id_credit)
          },
          changePag(pag) {
            this.FsspJournalErrorsData.pag.limit = pag;
            this.getFsspMainJournalErrors();
            this.setQueryJournalErrorsLimit(pag);
            this.gridApi.paginationSetPageSize(pag);
          },
          changeDate(){
            if (this.FsspJournalErrorsData.pag.type_oper == null){
              this.FsspJournalErrorsData.pag.type_oper = 'all';
            }
            this.getFsspMainJournalErrors();
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
            'setQueryJournalErrorsLimit','setQueryJournalErrorsOffset'
          ]),
            ...mapActions([
                'getFsspMainJournalErrors','getTypesOperFsspError'
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
            this.getFsspMainJournalErrors();
            this.getTypesOperFsspError();
        }
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
