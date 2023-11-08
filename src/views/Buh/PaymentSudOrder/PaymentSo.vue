<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalPaymentSos - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalPaymentSos }} of {{ TotalPaymentSos }}</span>
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
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">Статус {{status}}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>

                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                        <vs-dropdown-menu>
                            <template v-for="(item,index) in StatussArrPaymentAndAll">
                                <vs-dropdown-item @click="setStatus(index)">
                                    <span>{{ item.name }}</span>


                                </vs-dropdown-item>
                            </template>

                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>

                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="User.pag.paymentsSo.find" @input="updateSearchQuery" placeholder="Поиск..." />
                  <!--  <vs-button color="success" class="pull-right" type="filled"  @click="checkProblem">Проверка проблемных</vs-button> -->

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
                    :rowData="PaymentSosArr"
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

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>
    </div>

</template>

<script>
    import OpenPaymentAll from './Render/OpenPaymentAll.vue'
    import OpenPaymentStatus from './Render/OpenPaymentStatus.vue'
    import ImportPayment from './Render/ImportPayment.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../../route';
    import axios from '../../../axios'
    export default {
        components: {
            ImportPayment,
            OpenPaymentAll,
            OpenPaymentStatus
        },
        data () {
            return {

                status:'Все',
                results: null,
                tableData: [],
                header: [],
                sheetName: '',
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
                        headerName: 'Статус',
                        field: 'status',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'OpenPaymentStatus'
                    },
                    {
                        headerName: 'Клиент',
                        headerTooltip: 'Клиент',
                        tooltipField: 'name_family',
                        field: 'name_family',
                        filter: true,
                        width: 250
                    },

                    {
                        headerName: 'Клиент загруженный',
                        headerTooltip: 'Клиент загруженный',
                        tooltipField: 'fio_load',
                        field: 'fio_load',
                        filter: true,
                        width: 250
                    },
                    {
                        headerName: 'Договор',
                        headerTooltip: 'Договор',
                        tooltipField: 'number',
                        field: 'number',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Договор загр.',
                        headerTooltip: 'Договор загруженный',
                        tooltipField: 'number_load',
                        field: 'number_load',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Сумма',
                        headerTooltip: 'Сумма',
                        tooltipField: 'sum',
                        field: 'sum',
                        filter: true,
                        width: 80
                    },
                    {
                        headerName: 'Дата',
                        headerTooltip: 'Дата',
                        tooltipField: 'date',
                        field: 'date',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'OpenPaymentAll'
                    },

                ],

                // Cell Renderer Components
                components: {
                    OpenPaymentAll,
                    OpenPaymentStatus
                }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalPaymentSos/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                return this.User.pag.paymentsSo.limit
            },
            ...mapGetters([
                'PaymentSosArr','TotalPaymentSos','StatussArr','User','StatussArrPaymentAndAll'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryPaymentsSoOffset(val-1)
                    this.getDataPaymentSos(this.User.pag.paymentsSo);
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
            checkProblem(){
                this.$vs.loading({color: '#ff8000'})

                axios.post(r("payment.index"), {
                    params: {
                        method: 'checkProblem',
                        param:''

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){

                        this.$vs.notify({  title:'Сообщение', text: 'Проверка запущена!!!', color: 'success', position: 'top-center' })


                    }else {
                        this.$vs.notify({  title:'Сообщение', text: 'Ошибка!!!', color: 'danger', position: 'top-center' })
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
            setStatus(index){
                this.status=this.StatussArrPaymentAndAll[index].name
                this.User.pag.paymentsSo.status=this.StatussArrPaymentAndAll[index].id
                this.setDataUser()
                this.getDataPaymentSos(this.User.pag.paymentsSo);
            },
            exportData(data,name,id_recover){
                this.$vs.loading({color: '#ff8000'})

                axios.post(r("payment.index"), {
                    params: {
                        method: 'exportData',
                        param: {data:data,name:name,id_recover:id_recover}

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){

                            this.getDataPaymentSos(this.User.pag.paymentsSo)
                            this.$vs.notify({  title:'Сообщение', text: 'Импорт выполнен успешно!!!', color: 'success', position: 'top-center' })
                            this.popupActive2=true;


                        //  this.debtor=response.data.data
                    }else {
                        this.getDataPaymentSos(this.User.pag.paymentsSo)
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
            loadDataInTable ({ results, header, meta,name,id_recover,status }) {
                this.$vs.loading({color: '#ff8000'})
                this.header = header

                //   console.log(this.header);
                this.tableData = results
                this.sheetName = meta.sheetName
                //console.log(this.sheetName);
                this.exportData(results,name,id_recover)
                this.$vs.loading.close()

            },
            onrowDoubleClicked(event){
                this.$router.push('/payment_so/'+event.data.id)
            },
            changePag(pag){

                this.User.pag.paymentsSo.limit=pag
                this.setDataUser()
                this.getDataPaymentSos(this.User.pag.paymentsSo);
                this.setQueryPaymentsSoLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },
            onValidate(results) {
                this.results = results;
            },

            ...mapActions([
                'getDataPaymentSos','getDataStatuss','setDataUser','getPaymentStatusList'
            ]),
            ...mapMutations([
                         'setQueryPaymentsSoLimit','setQueryPaymentsSoOffset'
            ]),
            updateSearchQuery (val) {
                this.User.pag.credit.find=val

                this.getDataPaymentSos(this.User.pag.paymentsSo);

            },

            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        },
        mounted () {
            this.getPaymentStatusList().then(res=>{
                for (let i=0;i<this.StatussArrPaymentAndAll.length;i++){
                    if(this.StatussArrPaymentAndAll[i].id==this.User.pag.paymentsSo.status){
                        this.status=this.StatussArrPaymentAndAll[i].name
                    }

                }
            })

            this.getDataStatuss();
            this.gridApi = this.gridOptions.api

            this.getDataPaymentSos(this.User.pag.paymentsSo);
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
