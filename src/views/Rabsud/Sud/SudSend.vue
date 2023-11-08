<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="vx-col w-2/3">
                    <div class="vx-row">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="cursor-pointer flex items-center justify-between font-medium ml-4" style="padding: 0.75rem !important;margin-top: 18px;border: 1px solid #ccc;border-radius: 4px;">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalArchSuds - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalArchSuds }} of {{ TotalArchSuds }}</span>
                                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                            </div>
                            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                            <vs-dropdown-menu>

                                <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                                    <span>20</span>
                                </vs-dropdown-item>
                                <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                                    <span>50</span>
                                </vs-dropdown-item>
                                <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                                    <span>100</span>
                                </vs-dropdown-item>
                                <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
                                    <span>150</span>
                                </vs-dropdown-item>
                            </vs-dropdown-menu>
                        </vs-dropdown>
                        <div style="margin-left: 15px">
                            <div class="centerx">
                                <vs-tooltip text="Фильтр по дате" position="top" >
                                    <h6 class="h6Blue mb-1">Дата</h6>
                                </vs-tooltip>
                            </div>
                            <vs-input type="date" v-model="User.pag.bankSudDate" @change="changeDate" ></vs-input>
                        </div>

                        <div style="margin-left: 15px">
                            <div class="centerx">
                                <vs-tooltip text="Фильтр по статусу" position="top" >
                                    <h6 class="h6Blue mb-1">Статус</h6>
                                </vs-tooltip>
                            </div>
                            <v-select  class="w-50 " style="min-width: 200px" :reduce="label => label.id" label="name" :options="PrintFilterArr" v-model="User.pag.printFilterId" @input="changePrintFilter"></v-select>
                        </div>

                    </div>
                </div>

                <div class="vx-col w-1/3  mb-2 " style="    text-align: end;">


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
                    :rowData="ArchSudsArr"
                    rowSelection="multiple"
                    @grid-size-changed="onGridSizeChanged"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :overlayLoadingTemplate="'Идёт загрузка'"
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
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Open from './Render/OpenSudSend.vue'
    import { mapActions,mapGetters } from 'vuex'
    import OpenStatus from '../Render/OpenStatusSend.vue'
    import OpenCheck from './Render/OpenCheckSend.vue'
    import OpenHref from './Render/OpenHrefSend.vue'
    import OpenReestr from './Render/OpenReestr.vue'
    import r from '../../../route';
    import axios from '../../../axios'
    import $ from "jquery";

    export default {
        components: {
            AgGridVue,
            vSelect,
            OpenCheck,
            OpenHref,
            Open,
            OpenStatus,
            OpenReestr,
            VueCsvImport,
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

//                    {
//                        headerName: 'ID',
//                        field: 'id',
//                        filter: true,
//                        width: 100
//                    },

                    {
                        headerName: 'Имя',
                        field: 'arch_name',
                        filter: true,
                        width: 550,
                        cellRendererFramework: 'OpenHref'
                    },


                    {
                        headerName: 'Кол.',
                        field: 'count',
                        filter: true,
                        width: 50,
                    },

                    {
                        headerName: 'Распечатан',
                        field: 'check_rasp',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenCheck'
                    },
                   /* {
                        headerName: 'Реестр',
                        field: 'pochta',
                        filter: true,
                        width: 250,
                        cellRendererFramework: 'OpenReestr'
                    },*/


                    {
                        headerName: 'Статус',
                        field: 'status',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenStatus'
                    },

                    {
                        headerName: 'Дата',
                        field: 'date',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'Open'
                    },


                ],

                // Cell Renderer Components
                components: {
                    Open,OpenStatus,OpenCheck,OpenHref,OpenReestr
                }
            }
        },
        computed: {
            channel(){
                return this.$echo.join("updateArchSud-channel");
            },
            totalPages () {
             //   console.log(Math.ceil(this.TotalArchSuds/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalArchSuds/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'ArchSudsArr','TotalArchSuds','User','PrintFilterArr','OtpravFilterArr'

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
            changePrintOtprav(){
                if(this.User.pag==null){
                    this.User.pag={
                        printOtprav:1,
                    }
                }

                this.setDataUser().then((response) => {
                    this.getDataArchSudSends()
                })
            },
            changePrintFilter(){
                if(this.User.pag==null){
                    this.User.pag={
                        printFilterId:'all',
                    }
                }

                this.setDataUser().then((response) => {
                    this.getDataArchSudSends()
                })
            },
            reload(e){
                this.getDataArchSudSends();
            },
            refresh(){
                this.getDataArchSudSends();
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
            runJobSudMonday(){
                this.startJobSudMonday().then((response) =>{
                    if (response) {
                        this.$vs.notify({
                            title: 'Сообщение',
                            text: 'Выгрузка запущена',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
                });
            },
            changeDate(){
                if(this.User.pag==null){
                    this.User.pag={
                        bankSudDate:'',
                    }
                }



                this.setDataUser().then((response) => {
                    this.getDataArchSudSends()
                })
            },
            generate(){
                axios.get(r("archSud.index"), {
                    params: {
                        method: 'generateArchSud',
                        param: ''

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: response.data.mess , color: 'success', position: 'top-center' })
                        this.getDataArchSudSends();
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })
                        this.getDataArchSudSends();
                    }



                }).catch(error => {
                    this.getDataArchSudSends();
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            onrowDoubleClicked(event){
//                let url_generating_pdf='download/archSud/'
//                var params = {
//                    access_token: localStorage.getItem('accessToken'),
//                    id_file:event.data.arch_name
//
//                };
//
//
//                var url = [url_generating_pdf, $.param(params)].join('?');
//
//
//                window.open(url);
//                this.getDataArchSudSends();


            },
            ...mapActions([
                'getDataArchSudSends','setDataUser','startJobSudMonday'
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
            this.channel.listen(".UpdateArchSud", (e) => this.reload(e));
            this.getDataArchSudSends();
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
