<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalReestrsImport - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalReestrsImport }} of {{ TotalReestrsImport }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
                    <import-excel :onSuccess="loadDataInTable" url="реестр_импорт.xlsx"/>


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
                    :rowData="ReestrsImportArrShow"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl"
                    @grid-size-changed="onGridSizeChanged"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
    </div>

</template>

<script>
    import ImportExcel from './ImportExcelStatus.vue'
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Open from './Render/Open.vue'
    import OpenReestrRec from './Render/OpenReestrRec.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    import JsonViewer from 'vue-json-viewer'
    export default {
        components: {
            AgGridVue,
            JsonViewer,
            vSelect,
            Open,
            OpenReestrRec,
            VueCsvImport,
            ImportExcel,
        },
        data () {
            return {

                // Filter Options
                data:[],
                popupActive2:false,
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
                        headerName: 'Имя',
                        headerTooltip: 'Имя',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        width: 350,

                    },
                    {
                        headerName: 'Количество',
                        field: 'count',
                        filter: true,
                        width: 150,

                    },
                    {
                        headerName: 'Статус',
                        field: 'name_status',
                        filter: true,
                        width: 150,

                    },
                    {
                        headerName: 'Пользователь',
                        headerTooltip: 'Пользователь',
                        tooltipField: 'name_users',
                        field: 'name_users',
                        filter: true,
                        width: 150,

                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'Open'
                    },
                    {
                        headerName: 'Создан',
                        field: 'created_at',
                        filter: true,
                        width: 250,

                    },



                ],

                // Cell Renderer Components
                components: {
                    Open,OpenReestrRec
                }
            }
        },

        computed: {
            channel(){
                return this.$echo.join("reload-channel");
            },
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalReestrsImport/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.reestrImport!='undefined') {
                                return this.User.pag.reestrImport
                            }
                            else return 100
                        }
                        else return 100
                    }
                    else return 100
                }
                else return 100

            },
            ...mapGetters([
                'ReestrsImportArr','TotalReestrsImport','ReestrsImportArrName','ReestrsImportArrShow','User'

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
            changePag(pag){
                if(this.User.pag==null){
                    this.User.pag={
                        reestrImport:100
                    }
                }
                this.User.pag.reestrImport=pag
                this.setDataUser()
                this.gridApi.paginationSetPageSize(pag)
            },
            hideCol(index){

                this.columnDefs[index].hide=!this.columnDefs[index].hide;
                let a=this.columnDefs

                this.columnDefs=JSON.parse(JSON.stringify(a))
                this.saveColumn();
            },
            onrowDoubleClicked(event){
                this.$router.push('/reestr_import/'+event.data.id)
            },
            exportData(data,name,id_recover,status,type){
                this.$vs.loading({color: '#ff8000'})
                let method='exportData'
                axios.post(r("reestrImport.index"), {
                    params: {
                        method: method,
                        param: {
                            data:data,
                            name:name,
                            id_recover:id_recover,
                            status:status,
                            type:type,
                        }

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){
                            this.getDataReestrsImport()
                            this.$vs.notify({  title:'Сообщение', text: 'Импорт выполнен успешно!!!', color: 'success', position: 'top-center' })

                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Импорт не выполнен !!!', color: 'danger', position: 'top-center' })
                    }




                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },
            loadDataInTable (data) {
                this.$vs.loading({color: '#ff8000'})
                this.header = data.header

                this.tableData = data.results
                this.sheetName = data.meta.sheetName
                this.exportData(data.results,data.name,data.id_recover,data.id_status,data.type)
                this.$vs.loading.close()

            },
            ...mapActions([
                'getDataReestrsImport','setDataUser'
            ]),
            ...mapMutations([
                'hideReestr'
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
            reload(e){
                if(e.data=='reestrImport'){
                    this.getDataReestrsImport()
                }
            }

        },
        mounted () {
            this.gridApi = this.gridOptions.api
            this.channel.listen(".Reload", (e) => this.reload(e));
            this.getDataReestrsImport();
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
