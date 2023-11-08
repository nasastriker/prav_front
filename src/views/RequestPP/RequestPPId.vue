<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
        <div class="flex flex-wrap justify-between items-center">
            <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                <Back class="mb-4"></Back>
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
            <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right" style=" margin-top: 35px">
                <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                <vs-button color="success" class="pull-right" type="filled"  @click="LoadRequestPP">Скачать запрос</vs-button>

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
    import statusRequestPP from './Render/StatusPP.vue'
    import openHref from './Render/OpenHref.vue'
    import Open from './Render/Open.vue'
    import Back from '../../components/Back.vue'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            AgGridVue,
            vSelect,
            statusRequestPP,
            openHref,
            Back,
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
                    headerName: 'Номер ПП',
                    headerTooltip: 'Номер ПП',
                    tooltipField: 'number',
                    field: 'number',
                    filter: true,
                    width: 100,

                },
                {
                    headerName: 'Дата ПП',
                    headerTooltip: 'Дата ПП',
                    tooltipField: 'date_pp',
                    field: 'date_pp',
                    filter: false,
                    width: 100,
                    getQuickFilterText: params => {
                        return '';
                    }
                },
                {
                    headerName: 'Дата запроса',
                    headerTooltip: 'Дата запроса',
                    tooltipField: 'date_request_pp',
                    field: 'date_request_pp',
                    filter: false,
                    width: 100,
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
                    tooltipField: 'number_request_pp',
                    field: 'number_request_pp',
                    filter: true,
                    width: 100,
                    getQuickFilterText: params => {
                        return '';
                    }
                },
                {
                    headerName: 'Статус',
                    headerTooltip: 'Статус',
                    tooltipField: 'answer_request',
                    field: 'answer_request',
                    filter: false,
                    width: 140,
                    cellRendererFramework: 'statusRequestPP',
                    getQuickFilterText: params => {
                        return '';
                    }
                },
                {
                    headerName: 'Дата Ответа',
                    headerTooltip: 'Дата Ответа',
                    tooltipField: 'date_answer_request',
                    field: 'date_answer_request',
                    filter: false,
                    width: 140,

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
                'getDataRequestPayById','setDataUser'
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
              //  this.setEditFsspAddress(event.data.id)
               // this.setShowTabFsspAddress(true);

                //      this.$router.push('/handbook/jurisdiction/'+event.data.id)
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
                axios.get(r("requestPP.index"), {
                    responseType: 'arraybuffer',
                    params: {
                        method: 'getOneFiles',
                        param:this.$route.params.id
                    }
                }).then((response) => {
                    if(response){
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));
                    //   console.log(response.headers);
                  //  let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    //  console.log(filename);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Запросы_Банк_ПП_'+this.$route.params.id+'.pdf');
                    document.body.appendChild(link);
                    link.click();
                    }
                    else{
                        this.$vs.loading.close()
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
            this.getDataRequestPayById(this.$route.params.id)
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