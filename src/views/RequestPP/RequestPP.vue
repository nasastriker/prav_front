<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
        <div class="flex flex-wrap justify-between items-center mb-4">
            <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                <vs-dropdown vs-trigger-click class="cursor-pointer">
                    <div class="p-3 cursor-pointer flex items-center justify-between font-medium" style="margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;">
                        <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalRequestPps - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalRequestPps }} of {{ TotalRequestPps }}</span>
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
                <vs-button color="success" class="pull-right" type="filled"  @click="LoadRequestPP">Скачать запросы</vs-button>

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
                :rowData="RequestPpsArr"
                rowSelection="multiple"
                :rowDataChanged = "onRowDataChanged"
                @grid-size-changed="onGridSizeChanged"
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
    import Vue from 'vue'
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import { mapActions,mapGetters, mapMutations } from 'vuex'
    import statusRequestPP from './Render/StatusRequestPP.vue'
    import Status from './Render/Status.vue'
    import openHref from './Render/OpenHref.vue'
    import Open from './Render/Open.vue'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            AgGridVue,
            vSelect,
            statusRequestPP,
            Status,
            openHref,
            Open
        },
    data(){
        return {
            // AgGrid
            searchQuery: '',
            gridApi: null,
            gridOptions: {},
            defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
            },
            columnDefs: [

                {
                    headerName: 'Дата запроса',
                    headerTooltip: 'Дата запроса',
                    tooltipField: 'date',
                    field: 'date',
                    filter: false,
                    width: 100,
                    getQuickFilterText: params => {
                        return '';
                    }
                },
                {
                    headerName: 'Кол',
                    headerTooltip: 'Количество ПП в группе',
                    tooltipField: 'count',
                    field: 'count',
                    filter: false,
                    width: 50,
                    getQuickFilterText: params => {
                        return '';
                    }
                },
                {
                    headerName: 'Организация',
                    headerTooltip: 'Организация',
                    tooltipField: 'org_payee',
                    field: 'org_payee',
                    filter: false,
                    width: 200,
                    getQuickFilterText: params => {
                        return '';
                    }
                },
                {
                    headerName: 'Счет',
                    headerTooltip: 'Счет',
                    tooltipField: 'acc_payee',
                    field: 'acc_payee',
                    filter: false,
                    width: 200,
                    getQuickFilterText: params => {
                        return '';
                    }
                },
                {
                    headerName: 'Номер запроса',
                    headerTooltip: 'Номер запроса',
                    tooltipField: 'id',
                    field: 'id',
                    filter: true,
                    width: 100,
                    getQuickFilterText: params => {
                        return params.value;
                    }
                },
                {
                    headerName: 'Статус',
                    headerTooltip: 'Статус',
                    tooltipField: 'status',
                    field: 'status',
                    filter: false,
                    width: 140,
                    cellRendererFramework: 'Status',
                    getQuickFilterText: params => {
                        return '';
                    }
                },
                {
                    headerName: 'Получен',
                    headerTooltip: 'Получен',
                    tooltipField: 'request_status',
                    field: 'request_status',
                    filter: false,
                    width: 140,
                    cellRendererFramework: 'statusRequestPP',
                    getQuickFilterText: params => {
                        return '';
                    }
                },


                {
                    headerName: 'Операции',
                    field: 'id',
                    filter: false,
                    width: 150,
                    cellRendererFramework:'Open',
                    getQuickFilterText: params => {
                        return '';
                    }
                },

            ],
            components: {
                statusRequestPP,openHref,Open
            }
        }
        },
        computed:{
            ...mapGetters([
                'RequestPpsArr','TotalRequestPps','User',
            ]),
            totalPages () {
                //   console.log(Math.ceil(this.TotalBanks/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalRequestPps/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    if(val>1)this.gridApi.paginationGoToPage(val - 1)
                }
            },
        },
        methods:{
            ...mapActions([
                'getDataRequestPayGps','setDataUser'
            ]),

            onGridReady(params) {
                this.gridApi = this.gridOptions.api
            },
            changePag(pag){
                if(this.User.pag==null){
                    this.User.pag={
                        //??          jurisdictionsPag:100
                    }
                }
                this.User.pag.sudRequestPag=pag
                this.setDataUser()
                this.gridApi.paginationSetPageSize(pag)
            },
            onrowDoubleClicked(event){


              this.$router.push('/requestPp/'+event.data.id)
            },
            updateSearchQuery (val) {
                this.gridApi.setQuickFilter(val)
            },

            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit()
                    }
                );
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
            LoadRequestPP(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("requestPP.index"), {
                    responseType: 'arraybuffer',
                    params: {
                        method: 'getAllZapros',
                        param:''
                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if(response){
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));
                    //   console.log(response.headers);
                  //  let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    //  console.log(filename);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Запросы Банк ПП.zip');
                    document.body.appendChild(link);
                    link.click();
                    }
                    else{
                        //   this.popupActive3=false;
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: error.message,
                            color: 'danger',
                            position: 'top-center'
                        })
                    }
                }).catch(error => {
                    this.$vs.loading.close()
                    //   this.popupActive3=false;
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                });

            },

        },

        mounted () {
            this.getDataRequestPayGps()
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