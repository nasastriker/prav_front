<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-3 cursor-pointer flex items-center justify-between font-medium" style="margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalReestrsGosposhlina - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalReestrsGosposhlina }} of {{ TotalReestrsGosposhlina }}</span>
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

                    <ImportGosposhlina :onSuccess="loadDataInTable" />


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
                    :rowData="ReestrsGosposhlinaArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    @grid-size-changed="onGridSizeChanged"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl"
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
   import ImportGosposhlina from './Render/ImportGosposhlina.vue'
    import { VueCsvImport } from 'vue-csv-import';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
   import OperationReestr from './Render/OperationReestr.vue'
    export default {
        components: {
            VueCsvImport,
            ImportGosposhlina,
            OperationReestr
        },
        data () {
            return {
                import_type:'',
                onlyBic:false,
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
                        width: 250,
                        //onCellDoubleClicked:'xxx'
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Количество',
                        headerTooltip: 'Количество',
                        tooltipField: 'count',
                        field: 'count',
                        filter: true,
                        width: 150,
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Сумма',
                        headerTooltip: 'Сумма',
                        tooltipField: 'sum',
                        field: 'sum',
                        filter: true,
                        width: 150,
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'name_status',
                        field: 'name_status',
                        filter: true,
                        width: 150,
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Пользователь',
                        headerTooltip: 'Пользователь',
                        tooltipField: 'name_users',
                        field: 'name_users',
                        filter: true,
                        width: 150,
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Создан',
                        headerTooltip: 'Создан',
                        tooltipField: 'created_at',
                        field: 'created_at',
                        filter: true,
                        width: 250,
                        //cellRendererFramework: 'OpenJudicialName'
                    },



                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'OperationReestr'
                    },



                ],

                // Cell Renderer Components
                components: {
                    OperationReestr,
                }
            }
        },

        computed: {
            channel(){
                 return this.$echo.join("updateImportGosposhlina-channel");
            },

            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalReestrsGosposhlina/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.ReestrsGosposhlina!='undefined') {
                                return this.User.pag.ReestrsGosposhlina
                            }
                            else return 10
                        }
                        else return 10
                    }
                    else return 10
                }
                else return 10

            },
            ...mapGetters([
                'ReestrsGosposhlinaArr','TotalReestrsGosposhlina','User'

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
            ...mapActions([
                'getDataReestrsGosposhlina','setDataUser','getDataUser'
            ]),
            ...mapMutations([
                //   'hideReestr','setReestrsPayment','setTotalReestrsPayment'
            ]),

            reload(e){
                this.getDataReestrsGosposhlina()
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
            changePag(pag){
                this.gridApi.paginationSetPageSize(pag)
                if(typeof this.User.pag.ReestrsGosposhlina==='undefined'){
                    this.User.pag.ReestrsGosposhlina={limit:pag}
                }
                if(typeof this.User.pag.ReestrsGosposhlina.limit==='undefined'){
                    this.User.pag.ReestrsGosposhlina.limit=pag
                }
                this.setDataUser()
            },
            hideCol(index){

                this.columnDefs[index].hide=!this.columnDefs[index].hide;
                let a=this.columnDefs

                this.columnDefs=JSON.parse(JSON.stringify(a))
                this.saveColumn();
            },
            onrowDoubleClicked(event){
                this.$router.push('/gosposhlina_reestr/'+event.data.id)
            },
            exportData(data,name,id_recover,import_his){
                this.$vs.loading({color: '#ff8000'})
                let method;
                if(this.import_type === 1){
                    // method = 'exportData1c'
                }
                if(this.import_type === 0){
                    // method='exportData'
                }

                axios.post(r("payment.index"), {
                    params: {
                        method: method,
                        param: {data:data,name:name,id_recover:id_recover,only_bic:this.onlyBic,import_his:import_his}

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){

                        this.getDataReestrsPayment()
                        this.$vs.notify({  title:'Сообщение', text: 'Импорт выполнен успешно!!!', color: 'success', position: 'top-center' })



                        //  this.debtor=response.data.data
                    }else {
                        this.getDataReestrsPayment()
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
            loadDataInTable ({ results, header, meta,name,id_recover,import_type,import_his,onlyBic }) {
                this.$vs.loading({color: '#ff8000'})
                this.header = header
                this.import_type=import_type;
                this.onlyBic=onlyBic;
                this.tableData = results
                this.sheetName = meta.sheetName
                this.exportData(results,name,id_recover,import_his)
                this.$vs.loading.close()

            },


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
            this.channel.listen(".updateImportGosposhlina", (e) => this.reload(e));
            this.getDataUser().then(res=>{
                if(typeof this.User.pag.ReestrsGosposhlina!=='undefined' &&
                    typeof this.User.pag.ReestrsGosposhlina.limit!=='undefined')this.changePag(this.User.pag.ReestrsGosposhlina.limit)
            })

            this.getDataReestrsGosposhlina()
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
