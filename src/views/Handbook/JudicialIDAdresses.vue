<template>
    <div>
        <template v-if="!ShowTabJud">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-3 cursor-pointer flex items-center justify-between font-medium" style="border: 1px solid #ccc;border-radius: 4px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalJurisdictions - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalJurisdictions }} of {{ TotalJurisdictions }}</span>
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
                </div>


                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button color="success" class="pull-right" type="filled"  @click="newJud">Новый адрес</vs-button>
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
                    :rowData="JurisdictionsArr"
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
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true"
                    @grid-size-changed="onGridSizeChanged">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />
        </template>
        <template v-else>
            <JurisdictionID :jud_id="jud_id" @reload="reload"></JurisdictionID>
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
import OpenJurisdiction from './Render/OpenJurisdictionLoc.vue'
import JurisdictionID from './JurisdictionID.vue'
import { mapActions,mapGetters, mapMutations } from 'vuex'
import {json2excel, excel2json} from 'js2excel';

export default {
    components: {
        AgGridVue,
        vSelect,
        OpenJurisdiction,
        VueCsvImport,
        ImportExcel,
        JurisdictionID,


    },
    props: {
        jud_id: null,

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
                    headerTooltip: 'ID',
                    tooltipField: 'id',
                    field: 'id',
                    filter: true,
                    width: 40,
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                },
                {
                    headerName: 'Операции',
                    headerTooltip: 'Операции',
                    flex: true,
                    pinned:'center',
                    field: 'id',
                    filter: true,
                    width: 95,
                    cellRendererFramework: 'OpenJurisdiction'
                },
                {
                    headerName: 'Адрес',
                    headerTooltip: 'Адрес',
                    tooltipField: 'address',
                    field: 'address',
                    filter: true,
                    width: 500,
                },
                {
                    headerName: 'Дом',
                    headerTooltip: 'Дом',
                    tooltipField: 'hous',
                    field: 'hous',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Дома',
                    headerTooltip: 'Дома',
                    tooltipField: 'house',
                    field: 'house',
                    filter: true,
                    width: 400
                },
                {
                    headerName: 'Суд. участок',
                    headerTooltip: 'Судебный участок',
                    tooltipField: 'jud_number',
                    field: 'jud_number',
                    filter: true,
                    width: 150
                },

            ],

            // Cell Renderer Components
            components: {
                OpenJurisdiction,
            }
        }
    },

    computed: {

        totalPages () {
            //   console.log(Math.ceil(this.TotalBanks/this.paginationPageSize))
            if (this.gridApi)
                return Math.ceil(this.TotalJurisdictions/this.paginationPageSize)
            else return 0
        },
        paginationPageSize () {
            if (this.gridApi) return this.gridApi.paginationGetPageSize()
            else return 100
        },
        ...mapGetters([
            'JurisdictionsArr','TotalJurisdictions','User','ShowTabJud'
        ]),
        currentPage: {
            get () {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
            },
            set (val) {
                this.getDataJurisdictionsByJudicial({jud_id: this.jud_id});
                this.gridApi.paginationGoToPage(val - 1)
            }
        },

    },
    methods: {
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
            this.changeCheckToDel(parameters[0]).then((response) => {
                if (response){
                    this.showDeleteSuccess();
                    this.reload();
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
            this.getDataJurisdictionsByJudicial({jud_id: this.jud_id});
        },
        changePag(pag){
            if(this.User.pag==null){
                this.User.pag={
                    jurisdictionsPag:100
                }
            }
            this.User.pag.jurisdictionsPag=pag
            this.getDataJurisdictionsByJudicial({jud_id: this.jud_id});
            this.setDataUser()
            this.gridApi.paginationSetPageSize(pag)
        },
        newJud(){
            this.setShowTabJud(true);
            this.setEditJud(0)
        },
        onrowDoubleClicked(event){
            this.setShowTabJud(true);
            this.setEditJud(event.data.id)
      //      this.$router.push('/handbook/jurisdiction/'+event.data.id)
        },
        loadS(){
            console.log(this.csv)
        },
        ...mapActions([
            'getDataJurisdictionsByJudicial','setDataUser','changeCheckToDel'
        ]),
        ...mapMutations([
            'setShowTabJud','setEditJud'



        ]),
        updateSearchQuery (val) {
            this.gridApi = this.gridOptions.api
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
        this.getDataJurisdictionsByJudicial({jud_id: this.jud_id})
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
