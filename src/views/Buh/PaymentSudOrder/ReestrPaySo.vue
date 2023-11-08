<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalReestrsPaymentSo - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalReestrsPaymentSo }} of {{ TotalReestrsPaymentSo }}</span>
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
                    <ImportPayment :onSuccess="loadDataInTable" url="платежи.xlsx"/>


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
                    :rowData="ReestrsPaymentSoArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    @grid-size-changed="onGridSizeChanged"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl"
                    :enableBrowserTooltips="true"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />


        </div>
    </div>

</template>

<script>
    import ImportPayment from './Render/ImportPayment.vue'
    import { VueCsvImport } from 'vue-csv-import';
    import Open from './Render/OpenReestr.vue'
    import OpenReestrRec from './Render/OpenReestrRec.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../../route';
    import axios from '../../../axios'
    export default {
        components: {
            Open,
            OpenReestrRec,
            VueCsvImport,
            ImportPayment,
        },
        data () {
            return {
                imp1c:false,
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
                        width: 100,
                        cellRendererFramework: 'Open'
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
             //   console.log(Math.ceil(this.TotalReestrsPaymentSo/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalReestrsPaymentSo/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.rabReestrSo!='undefined') {
                                return this.User.pag.rabReestrSo
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
                'ReestrsPaymentSoArr','TotalReestrsPaymentSo','ReestrsArrName','ReestrsArrShow','User'

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
                        rabReestrSo:100
                    }
                }
                this.User.pag.rabReestrSo=pag
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
                this.$router.push('/payment_reestr_so/'+event.data.id)
            },
            exportData(data,name,id_recover){
                this.$vs.loading({color: '#ff8000'})
                let method;
                if(this.imp1c){
                    method='exportData1c'
                }
                else{
                    method='exportData'
                }
                axios.post(r("reestrPaymentSo.index"), {
                    params: {
                        method: method,
                        param: {data:data,name:name,id_recover:id_recover}

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){

                        this.getDataReestrsPaymentSo()
                        this.$vs.notify({  title:'Сообщение', text: 'Импорт выполнен успешно!!!', color: 'success', position: 'top-center' })



                        //  this.debtor=response.data.data
                    }else {
                        this.getDataReestrsPaymentSo()
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
            loadDataInTable ({ results, header, meta,name,id_recover,imp1c }) {
                this.$vs.loading({color: '#ff8000'})
                this.header = header
                this.imp1c=imp1c;
                //   console.log(this.header);
                this.tableData = results
                this.sheetName = meta.sheetName
                //console.log(this.sheetName);
                this.exportData(results,name,id_recover)
                this.$vs.loading.close()

            },
            ...mapActions([
                'getDataReestrsPaymentSo','setDataUser','getDataUser'
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
                if(e.data=='reestr'){
                    this.getDataReestrsPaymentSo()
                }
            }

        },
        mounted () {
            this.getDataUser();
            this.gridApi = this.gridOptions.api
            this.channel.listen(".Reload", (e) => this.reload(e));
            this.getDataReestrsPaymentSo();
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
