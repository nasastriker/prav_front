<template>
    <div>
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{
                                    currentPage * paginationPageSize - (paginationPageSize - 1)
                                }} - {{
                                    TotalSogls - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalSogls
                                }} of {{ TotalSogls }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
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
                    <vs-input class="mb-4 md:mb-0" v-model="searchQuery" @input="updateSearchQuery"
                              placeholder="Поиск..."/>
                    <!-- <vs-button color="success" class="pull-right" type="filled" style="margin-left: 10px"
                               @click="expTo1C">1С
                    </vs-button> -->


                </div>
            </div>

            <!-- AgGrid Table -->
            <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="SoglsArr"
                rowSelection="multiple"
                :rowDataChanged="onRowDataChanged"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                @grid-size-changed="onGridSizeChanged"
                @column-resized="onColumnResized"
                @column-visible="onColumnVisible"
                :enableBrowserTooltips="true"
                :overlayNoRowsTemplate="'Нет записей'"
                :overlayLoadingTemplate="'Идёт загрузка'"
                @rowDoubleClicked="onrowDoubleClicked"
                :paginationPageSize="paginationPageSize"
                :suppressPaginationPanel="true"
                :enableRtl="$vs.rtl">
            </ag-grid-vue>


            <vs-popup classContent="popup-example" title="Соглашение о рассрочке" :active.sync="popupActive3">
                <div align="right">
                    <vs-button color="success" class="pull-right mr-4" type="filled" @click="openCard">Карточка должника
                    </vs-button>
                    <vs-button color="danger" class="pull-right" type="filled" @click="delSogl">Удалить</vs-button>
                </div>
                <div class="vx-row">
                  <div class="vx-col md:w-1/2 mb-4">
                    <h6 class="mb-1">Статус:</h6>
                      <div class="vx-row">
                        <div class="vx-col">
                          <vs-checkbox v-model="sogl.status" style="margin-left: 0px;"></vs-checkbox>
                        </div>
                        <div class="vx-col" style="margin-left: -30px">
                          <template v-if="sogl.status==1">
                            Заключено
                          </template>
                          <template v-else>
                            Не Заключено
                          </template>
                        </div>
                      </div>


                  </div>
                  <div class="vx-col md:w-1/2 ">
                    <vs-checkbox style="margin-top: 20px; margin-left: 0px;" v-model="sogl.auto">Автоматический контроль</vs-checkbox>
                  </div>



                </div>
                <div class="vx-row">
                    <div class="vx-col">
                        <h6 class="mb-1">ФИО:</h6>
                        <vs-input class="w-full mb-4" v-model="sogl.fio"/>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col md:w-1/2 ">
                        <h6 class="mb-1">Дата первого платежа:</h6>
                        <vs-input type="date" class="w-100 mb-4" v-model="sogl.date1"/>
                    </div>
                    <div class="vx-col md:w-1/2 ">
                      <h6 class="mb-1">Сумма первого платежа:</h6>
                      <vs-input type="number" class="w-100 mb-4" v-model="sogl.sum1"/>
                    </div>
                    <div class="vx-col md:w-1/2 ">
                        <h6 class="mb-1">Дата второго платежа:</h6>
                        <vs-input type="date" class="w-100 mb-4" v-model="sogl.date2"/>
                    </div>
                    <div class="vx-col md:w-1/2 ">
                      <h6 class="mb-1">Сумма второго платежа:</h6>
                      <vs-input type="number" class="w-100 mb-4" v-model="sogl.sum2"/>
                    </div>
                    <div class="vx-col md:w-1/2 ">
                      <h6 class="mb-1">Дата третьего платежа:</h6>
                      <vs-input type="date" class="w-100 mb-4" v-model="sogl.date3"/>
                    </div>
                    <div class="vx-col md:w-1/2 ">
                      <h6 class="mb-1">Сумма третьего платежа:</h6>
                      <vs-input type="number" class="w-100 mb-4" v-model="sogl.sum3"/>
                    </div>
                    <div class="vx-col md:w-1/2 ">
                      <h6 class="mb-1">Дата четвертого платежа:</h6>
                      <vs-input type="date" class="w-100 mb-4" v-model="sogl.date4"/>
                    </div>
                    <div class="vx-col md:w-1/2 ">
                      <h6 class="mb-1">Сумма четвертого платежа:</h6>
                      <vs-input type="number" class="w-100 mb-4" v-model="sogl.sum4"/>
                    </div>
                </div>


            </vs-popup>


            <vs-pagination
                :total="totalPages"
                :max="7"
                v-model="currentPage"/>

        </div>

    </div>

</template>

<script>
import {VueCsvImport} from 'vue-csv-import';
import {mapActions, mapGetters} from 'vuex'
import axios from "@/axios";
import r from "@/route";
import moment from 'moment';
import OpenCheckAuto from './Render/OpenCheckAuto';
export default {

    components: {
        VueCsvImport,
        OpenCheckAuto
    },
    data() {
        return {
            popupActive3: false,
            isDelete: false,
            id_sogl: 0,
            id_cred: 0,
            // Filter Options
            sogl: {},
            searchQuery: '',
            csv: [],
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
                  headerName: 'Номер договора',
                  headerTooltip: 'Номер договора',
                  tooltipField: 'number_dog',
                    field: 'number_dog',
                    filter: true,
                    width: 150
                },
                {
                    headerName: 'ФИО',
                  headerTooltip: 'ФИО',
                  tooltipField: 'fio',
                    field: 'fio',
                    filter: true,
                    width: 250
                },
                {
                  headerName: 'Проверка автомат',
                  headerTooltip: 'Проверка автомат',
                  tooltipField: 'auto',
                  field: 'auto',
                  filter: true,
                  width: 150,
                  cellRendererFramework: 'OpenCheckAuto'
                },

                {
                    headerName: 'Дата 1',
                    field: 'date1',
                  headerTooltip: 'Дата 1',
                  tooltipField: 'date1',
                    filter: true,
                    width: 120,
                    cellRenderer: params =>{
                      if (params.value == null) {
                        return '';
                      } else {
                        return moment(params.value).format('DD.MM.YYYY');
                      }
                    }
                },
                {
                    headerName: 'Дата 2',
                  headerTooltip: 'Дата 2',
                  tooltipField: 'date2',
                    field: 'date2',
                    filter: true,
                  width: 120,
                  cellRenderer: params =>{
                    if (params.value == null) {
                      return '';
                    } else {
                      return moment(params.value).format('DD.MM.YYYY');
                    }
                  }
                },
                {
                  headerName: 'Дата 3',
                  field: 'date3',
                  headerTooltip: 'Дата 3',
                  tooltipField: 'date3',
                  filter: true,
                  width: 120,
                  cellRenderer: params =>{
                    if (params.value == null) {
                      return '';
                    } else {
                      return moment(params.value).format('DD.MM.YYYY');
                    }
                  }
                },
                {
                  headerName: 'Дата 4',
                  headerTooltip: 'Дата 4',
                  tooltipField: 'date4',
                  field: 'date4',
                  filter: true,
                  width: 120,
                  cellRenderer: params =>{
                    if (params.value == null) {
                      return '';
                    } else {
                      return moment(params.value).format('DD.MM.YYYY');
                    }
                  }
                },
                {
                    headerName: 'Сумма 1',
                  headerTooltip: 'Сумма 1',
                  tooltipField: 'sum1',
                    field: 'sum1',
                    filter: true,
                    width: 80
                },
                {
                    headerName: 'Сумма 2',
                  headerTooltip: 'Сумма 2',
                  tooltipField: 'sum2',
                    field: 'sum2',
                    filter: true,
                    width: 80
                },
                {
                  headerName: 'Сумма 3',
                  headerTooltip: 'Сумма 3',
                  tooltipField: 'sum3',
                  field: 'sum3',
                  filter: true,
                  width: 80
                },
                {
                  headerName: 'Сумма 4',
                  headerTooltip: 'Сумма 4',
                  tooltipField: 'sum4',
                  field: 'sum4',
                  filter: true,
                  width: 80
                },
              {
                headerName: 'Дата создания',
                headerTooltip: 'Дата создания',
                tooltipField: 'created_at',
                field: 'created_at',
                filter: true,
                width: 120,
                cellRenderer: params => moment(params.value).format('DD.MM.YYYY')

              },


            ],
            components: {
              OpenCheckAuto
            }
        }
    },

    computed: {
        totalPages() {
            //   console.log(Math.ceil(this.TotalSogls/this.paginationPageSize))
            if (this.gridApi)
                return Math.ceil(this.TotalSogls / this.paginationPageSize)
            else return 0
        },
        paginationPageSize() {
            if (this.gridApi) return this.gridApi.paginationGetPageSize()
            else return 10
        },
        ...mapGetters([
            'SoglsArr', 'TotalSogls'

        ]),
        currentPage: {
            get() {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
            },
            set(val) {
                this.gridApi.paginationGoToPage(val - 1)
            }
        },

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

        delSogl() {
            this.popupActive3 = false;
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Внимание',
                text: 'Вы действительно хотите удалить соглашение?',
                accept: this.delSuccess,
                cancel: this.delCancel,
                acceptText: 'Да',
                cancelText: 'Нет'
            })
        },
        delCancel() {
            this.popupActive3 = true;
        },
        delSuccess() {
            if (this.id_sogl !== 0) {
                this.deleteSogl({'id_sogl': this.id_sogl, 'id_cred': this.id_cred});
                this.popupActive3 = false;
                this.getDataSogls();
            }
        },
        async openCard() {
            this.popupActive3 = false;
            const sleep = (milliseconds) => {
                return new Promise(resolve => setTimeout(resolve, milliseconds))
            }
            await sleep(500)
            this.$router.push('/debtors/' + this.id_cred)
        },
        onrowDoubleClicked(event) {
            this.id_sogl = event.data.ids;
            this.id_cred = event.data.id;
            this.sogl= event.data;
            this.popupActive3 = true;
        },

        ...mapActions([
            'getDataSogls', 'deleteSogl'
        ]),
        updateSearchQuery(val) {
            this.gridApi.setQuickFilter(val)
        },
        onRowDataChanged() {
            Vue.nextTick(() => {
                    this.gridOptions.api.sizeColumnsToFit();
                }
            );
        },
        expTo1C() {
            axios.get(r("sogl.index"), {
                responseType: 'arraybuffer',
                params: {
                    method: 'generateSoglExp1C',
                    param: ''
                }
            }).then((response) => {
                const url = window.URL.createObjectURL(new File([(response.data)], {type: 'application/doc;charset=UTF-8;'}));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Соглашение 1С.xls');
                document.body.appendChild(link);
                link.click();
                this.$vs.loading.close()
            }).catch(error => {
                this.$vs.notify({
                    title: 'Ошибка',
                    text: error.message,
                    color: 'danger',
                    position: 'top-center'
                })
            })
        },

    },
    mounted() {
        this.gridApi = this.gridOptions.api

        this.getDataSogls();
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
</style>
