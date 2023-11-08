<template>
    <div>
        <template v-if="!ShowTabFsspAddress">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 mt-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalFsspOtdelsAddressArr - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalFsspOtdelsAddressArr }} of {{ TotalFsspOtdelsAddressArr }}</span>
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

                    <vs-button color="danger" style="margin-left: 10px" class="pull-left" type="filled"  @click="delSelected">Удалить выделенные</vs-button>
                    <vs-button  style="margin-left: 10px" class="pull-left" type="filled"  @click="$router.push('/handbook/fssp_otdels/')">Закрыть</vs-button>
                </div>


                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">

                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button color="success" class="pull-right" type="filled"  @click="newFsspAddress">Новый адрес</vs-button>
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
                    :rowData="FsspOtdelsAddressArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :pagination="true"
                    @grid-ready="onGridReady"
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

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />
        </template>
        <template v-else>
            <FsspOtdelsNE :fssp_id="f_ssp_id" :fssp_code="f_ssp_code"></FsspOtdelsNE>
        </template>

    </div>

</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
import ImportExcel from '@/components/excel/ImportExcelJurisdiction.vue'
import axios from '../../axios'
import r from '../../route'
import { VueCsvImport } from 'vue-csv-import';
import { AgGridVue } from 'ag-grid-vue'
import vSelect from 'vue-select'
import OpenFsspOtdelsAddress from './Render/OpenFsspOtdelsAddress.vue'
import FsspOtdelsNE from './FsspOtdelsNE.vue'
import { mapActions,mapGetters, mapMutations } from 'vuex'
import {json2excel, excel2json} from 'js2excel';

export default {
  //  name: FsspOtedlsIDAddresses,
    components: {
        AgGridVue,
        vSelect,
        OpenFsspOtdelsAddress,
        VueCsvImport,
        ImportExcel,
        FsspOtdelsNE,


    },
    props: {
        fssp_id: null,
        fssp_code:null,

    },
    data () {
        return {
            countCheckData: 0,
            showTab:true,
            tableData: [],
            header: [],
            sheetName: '',
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
                    headerName: '',
                    field: 'id',
                    filter: true,
                    width: 40,
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                },
                {
                    headerName: 'Операции',
                    field: 'id',
                    filter: true,
                    width: 100,
                    cellRendererFramework: 'OpenFsspOtdelsAddress'
                },
                {
                    headerName: 'Адрес',
                    field: 'address',
                    filter: true,
                    width: 500,
                },
             /*
                {
                    headerName: 'Дом',
                    field: 'hous',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Дома',
                    field: 'house',
                    filter: true,
                    width: 400
                },
                */
                {
                    headerName: 'Код отдела',
                    field: 'fssp_number',
                    filter: true,
                    width: 150
                },

            ],

            // Cell Renderer Components
            components: {
                OpenFsspOtdelsAddress,
            }
        }
    },

    computed: {
        totalPages () {
            //   console.log(Math.ceil(this.TotalBanks/this.paginationPageSize))
            if (this.gridApi)
                return Math.ceil(this.TotalFsspOtdelsAddressArr/this.paginationPageSize)
            else return 0
        },
        paginationPageSize () {
            if (this.gridApi) return this.gridApi.paginationGetPageSize()
            else return 100
        },
        ...mapGetters([
            'FsspOtdelsAddressArr','TotalFsspOtdelsAddressArr','User','ShowTabFsspAddress'
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
        onGridReady(params) {
            this.gridApi = this.gridOptions.api
        },
        showDeleteSuccess() {
            this.$vs.notify({
                color: 'success',
                title: 'Сообщение',
                text: 'Удален!!!',
                position: 'top-center'
            })
        },
        showDeleteDanger() {
            this.$vs.notify({
                color: 'danger',
                title: 'Сообщение',
                text: 'Ошибка при удалении!!!',
                position: 'top-center'
            })
        },
        deleteSelRecords(parameters){
            this.changeCheckToDelFssp(parameters[0]).then((response) => {
                this.getDataFsspOtdelsAddressArr(this.fssp_code)
                if (response){
                    this.showDeleteSuccess();

                } else {
                    this.showDeleteDanger();
                }
            });
        },
        delSelected(){
            let selectedNodes = this.gridApi.getSelectedNodes();
            let selectedData = selectedNodes.map(node => node.data);
            if(selectedData.length > 0){
                    this.$vs.dialog({
                        type: 'confirm',
                        color: 'danger',
                        title: 'Удаление',
                        text: 'Вы действительно хотите удалить '+selectedData.length+' записи(ей)?',
                        accept: this.deleteSelRecords,
                        acceptText: 'Удалить',
                        cancelText: 'Отмена',
                        parameters: [selectedData]
                    })
                // console.log(selectedData);
            } else {
                this.$vs.notify({
                    title: 'Сообщение',
                    text: 'Выберите записи для удаления',
                    color: 'primary',
                    position: 'top-center'
                })
            }

        },
        reload(){
            //??   this.getDataJurisdictionsByJudicial({jud_id: this.jud_id});
        },
        changePag(pag){
            if(this.User.pag==null){
                this.User.pag={
                    //??          jurisdictionsPag:100
                }
            }
            this.User.pag.jurisdictionsPag=pag
            this.getDataJurisdictionsByJudicial({jud_id: this.jud_id});
            this.setDataUser()
            this.gridApi.paginationSetPageSize(pag)
        },
        newFsspAddress(){
            this.setEditFsspAddress(0)
            this.setShowTabFsspAddress(true)

        },
        onrowDoubleClicked(event){
            this.setEditFsspAddress(event.data.id)
            this.setShowTabFsspAddress(true);

      //      this.$router.push('/handbook/jurisdiction/'+event.data.id)
        },

        ...mapActions([
            'getDataFsspOtdelsAddressArr','setDataUser','changeCheckToDelFssp'
        ]),
        ...mapMutations([
            'setShowTabFsspAddress','setEditFsspAddress'



        ]),
        updateSearchQuery (val) {
            this.gridApi = this.gridOptions.api
            this.gridApi.setQuickFilter(val)
        },
        onRowDataChanged () {
            Vue . nextTick (() => {
                    this.gridOptions.api.sizeColumnsToFit()
                }
            );
        },

    },
    mounted () {
        this.f_ssp_id=this.fssp_id
        this.f_ssp_code=this.fssp_code
       // console.log(this.f_ssp_code)
        this.gridApi = this.gridOptions.api
      //  console.log(this.fssp_id)
        this.getDataFsspOtdelsAddressArr(this.fssp_code)
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
