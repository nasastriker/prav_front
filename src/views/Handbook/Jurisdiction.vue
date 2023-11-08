<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
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
                </div>


                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button color="success" class="pull-right" type="filled"  @click="$router.push('/handbook/jurisdiction/new')">Новый адрес</vs-button>
                    <import-excel :onSuccess="loadDataInTable" url="/подсудность.xlsx" />

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
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
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
    import OpenJurisdiction from './Render/OpenJurisdiction.vue'
    import { mapActions,mapGetters, mapMutations } from 'vuex'
    import {json2excel, excel2json} from 'js2excel';

    export default {
        components: {
            AgGridVue,
            vSelect,
            OpenJurisdiction,
            VueCsvImport,
            ImportExcel,


        },
        data () {
            return {


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
                        headerName: 'ID',
                        field: 'id',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Регион',
                        field: 'region',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Адрес',
                        field: 'address',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Дом',
                        field: 'hous',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Дома',
                        field: 'house',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Суд. участок',
                        field: 'jud_number',
                        filter: true,
                        width: 150
                    },



                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'OpenJurisdiction'
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
                return this.User.pag.jurisdictions.limit
            },
            ...mapGetters([
                'JurisdictionsArr','TotalJurisdictions','User'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryJurisdictionsOffset(val-1)
                    this.getDataJurisdictions(this.User.pag.jurisdictions);
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },

        },
        methods: {
            ...mapMutations([
                'setQueryJurisdictionsLimit','setQueryJurisdictionsOffset'

            ]),
            ...mapActions([
                'getDataJurisdictions','setDataUser','getDataUser'
            ]),
            changePag(pag){

                this.User.pag.jurisdictions.limit=pag
                this.setDataUser()
                this.getDataJurisdictions(this.User.pag.jurisdictions);
                this.setJurisdictionsLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },
            onrowDoubleClicked(event){
                this.$router.push('/handbook/jurisdiction/'+event.data.id)
            },

            exportData(data,jud_number){
                axios.post(r("jurisdiction.index"), {
                    params: {
                        method: 'importJurisdiction',
                        param: {
                            data:data,
                            jud_number:jud_number
                        }

                    }
                }).then((response) => {
                    if (response.data.result){

                        this.$vs.notify({  title:'Сообщение', text: 'Файл обработан успешно!!!', color: 'success', position: 'top-center' })


                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Файл не обработан !!!', color: 'danger', position: 'top-center' })
                    }




                })
            },
            loadDataInTable ({ results, header, meta,jud_number }) {
                this.header = header
                this.tableData = results
                this.sheetName = meta.sheetName
                this.exportData(results,jud_number)

            },

            loadS(){
                console.log(this.csv)
            },

            updateSearchQuery (val) {
                //this.gridApi.setQuickFilter(val)
                this.User.pag.jurisdictions.find=val

                this.getDataJurisdictions(this.User.pag.jurisdictions);
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
            this.getDataUser().then(res=>{
                this.searchQuery=this.User.pag.jurisdictions.find
                this.setQueryJurisdictionsOffset(0)
                this.getDataJurisdictions(this.User.pag.jurisdictions);
            })

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
