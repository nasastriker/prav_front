<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalFnss - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalFnss }} of {{ TotalFnss }}</span>
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
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">Статус</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>

                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                        <vs-dropdown-menu>

                            <vs-dropdown-item @click="hideFnsArhiv('loadArh')">
                                <vs-checkbox  v-model="statusReestr.loadArh" >Скачан</vs-checkbox>


                            </vs-dropdown-item>

                            <vs-dropdown-item @click="hideFnsArhiv('noLoad')">
                                <vs-checkbox  v-model="statusReestr.noLoad" >Не скачан</vs-checkbox>


                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="FnssArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
            @rowDoubleClicked="onrowDoubleClicked"
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
    import Open from './Render/Open.vue'
    import OpenRec from './Render/OpenRec.vue'
    import StatusIfns from './Render/StatusIfns.vue'
    import CodeIfns from './Render/CodeIfns.vue'
    import { mapActions,mapGetters } from 'vuex'
    import OpenStatus from './Render/OpenStatus.vue'
    export default {
        components: {
            CodeIfns,
            StatusIfns,
            Open,
            OpenRec,
            OpenStatus,
            VueCsvImport,
        },
        data () {
            return {
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
                        headerName: 'Код ИФНС',
                        field: 'id_ifns',
                        filter: true,
                        width: 120,
                        cellRendererFramework: 'CodeIfns'
                    },
                    {
                        headerName: 'Файл',
                        field: 'arch_name',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Взыскатель',
                        field: 'id_recover',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenRec'
                    },
                    {
                        headerName: 'Дата Отпр.',
                        field: 'date_ifns',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Дата Возр.',
                        field: 'date_retrun_ifns',
                        filter: true,
                        width: 150,
                    },

                    {
                        headerName: 'Статус',
                        field: 'status_ifns',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'StatusIfns'
                    },
//


                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'Open'
                    },

//                    {
//                        headerName: 'Дата',
//                        field: 'created_at',
//                        filter: true,
//                        width: 250,
//                        //cellRendererFramework: 'OpenJudicialName'
//                    },


                ],

                // Cell Renderer Components
                components: {
                    Open,OpenStatus,CodeIfns,OpenRec,StatusIfns
                }
            }
        },

        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.TotalFnss/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalFnss/this.paginationPageSize)
                else return 0
            },
            statusReestr () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.fnsWorkStatus!='undefined') {
                                return this.User.pag.fnsWorkStatus
                            }
                            else return {loadArh:true,noLoad:true}
                        }
                        else return {loadArh:true,noLoad:true}
                    }
                    else return {loadArh:true,noLoad:true}
                }
                else return {loadArh:true,noLoad:true}

            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.fnsWork!='undefined') {
                                return this.User.pag.fnsWork
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
                'FnssArr','TotalFnss','User','IfnssArr','RecoverersArr'

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
            hideFnsWorkArhiv(data){
                if(this.User.pag==null){
                    this.User.pag={
                        fnsWorkStatus:{loadArh:true,notLoad:true}
                    }
                }
                if(this.User.pag.fnsWorkStatus==null){
                    this.User.pag={
                        fnsWorkStatus:{loadArh:true,notLoad:true}
                    }
                }
                if(data=='notLoad'){
                    this.User.pag.fnsWorkStatus.notLoad=!this.User.pag.fnsWorkStatus.notLoad
                }
                if(data=='loadArh'){
                    this.User.pag.fnsWorkStatus.loadArh=!this.User.pag.fnsWorkStatus.loadArh
                }

                this.setDataUser().then((response) => {
                    this.getDataFnss()
                })
            },
            changePag(pag){
                if(this.User.pag==null){
                    this.User.pag={
                        fnsWork:10
                    }
                }
                this.User.pag.fnsWork=pag
                this.setDataUser()
                this.gridApi.paginationSetPageSize(pag)
            },

            onrowDoubleClicked(event){
                this.$router.push('/fns/work/'+event.data.id)
            },
            ...mapActions([
                'getDataFnss','setDataUser','getDataIfnss','getDataRecoverers','getDataCessions','getDataIfnss'
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
            this.getDataIfnss();
            this.getDataRecoverers();
            this.getDataIfnss();
            this.getDataCessions();
            this.getDataFnss();
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
