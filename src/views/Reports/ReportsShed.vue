<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalReportShed - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalReportShed }} of {{ TotalReportShed }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                        <vs-dropdown-menu>


                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                                <span>100</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
                                <span>150</span>
                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>
                <h2>Отчеты по расписанию</h2>
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <label class="mb-4 md:mb-0 mr-4" style="right: 100px; color: red">Время сервера {{ServerDate}}</label>
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
                    :rowData="ReportShedArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
            @rowDoubleClicked="onrowDoubleClicked"
            @grid-size-changed="onGridSizeChanged"
            @column-resized="onColumnResized"
            @column-visible="onColumnVisible"
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
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Open from './Render/OpenReportShed.vue'
    import TypeReportShed from './Render/TypeReportShed.vue'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            AgGridVue,
            vSelect,
            'v-select':vSelect,
            VueCsvImport,
            Open,
            TypeReportShed
        },
        data () {
            return {

                // Filter Options

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
                        headerName: 'Тип',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'TypeReportShed'

                    },

                    {
                        headerName: 'Название',
                        field: 'name',
                        filter: true,
                        width: 250,
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Email',
                        field: 'email',
                        filter: true,
                        width: 250,
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Время запуска',
                        field: 'time',
                        filter: true,
                        width: 100,
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Периодичность',
                        field: 'PeriodText',
                        filter: true,
                        width: 250,
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Дата следующего запуска',
                        field: 'RunDate',
                        filter: true,
                        width: 150,
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'Open',
                        cellRendererParams: {
                            start_func: this.startFunc.bind(this),
                            emitSet:'set_edit_reports_shed_open'
                        }
                    },


                ],

                // Cell Renderer Components
                components: {
                    Open,TypeReportShed
                }
            }
        },

        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.TotalReportShed/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalReportShed/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'ReportShedArr','TotalReportShed','ServerDate','idPopupTransition'

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
            startFunc(item){

                axios.get(r("reportShed.index"), {
                    params: {
                        method: 'start',
                        param: item

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: response.data.mess , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })


            },

            PushMounthDate(){
                for(let i=0;i<30;i++){this.DataSheduleRender.MounthList.push({id: i+1, label: (i+1).toString()})};
                this.DataSheduleRender.MounthList.push({id: 31, label: 'Последнее число месяца'});
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
                this.$root.$emit('set_edit_reports_shed_open',event.data.id)
               // this.SetIdPopupTransition(event.data.id)
            },
            ...mapActions([
                'getReportSheds','SetIdPopupTransition'
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

            this.getReportSheds();
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
