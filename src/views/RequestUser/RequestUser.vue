<!-- =========================================================================================
File Name: UserList.vue
Description: User List page
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>

    <div id="page-user-list">



        <div class="vx-card p-6">

            <div class="flex flex-wrap justify-between items-center">

                <!-- ITEMS PER PAGE -->
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalRequestUsers - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalRequestUsers }} of {{ TotalRequestUsers }}</span>
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
                </div>



                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />


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
                    :rowData="RequestUsersArr"
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
    import ImportExcel from '@/components/excel/ImportExcel.vue'
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Open from './Render/OpenRequestUser.vue'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            AgGridVue,
            vSelect,
            Open,
            VueCsvImport,
            ImportExcel,
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
                        headerName: 'Имя',
                        field: 'id_debtor',
                        filter: true,
                        width: 250,
                        onCellDoubleClicked:'onCellDoubleClicked'
                        //onCellDoubleClicked:'xxx'
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Запрос',
                        field: 'request_name',
                        filter: true,
                        width: 300,
                        //cellRendererFramework: 'OpenJudicialName'
                    },
                    {
                        headerName: 'Статус',
                        field: 'name_status',
                        filter: true,
                        width: 150,
                        //cellRendererFramework: 'OpenJudicialName'
                    },

                    {
                        headerName: 'Создан',
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
                        cellRendererFramework: 'Open'
                    },



                ],

                // Cell Renderer Components
                components: {
                    Open,
                }
            }
        },

        computed: {
            channel(){
                return this.$echo.join("reload-channel");
            },
            totalPages () {
             //   console.log(Math.ceil(this.TotalRequestUsers/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalRequestUsers/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 10
            },
            ...mapGetters([
                'RequestUsersArr','TotalRequestUsers'

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

            onrowDoubleClicked(event){
                this.$router.push('/request_user/'+event.data.id)
            },

            ...mapActions([
                'getDataRequestUsers',
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
                if(e.data=='requestUser'){
                    this.getDataRequestUsers()
                }
            }

        },
        mounted () {
            this.gridApi = this.gridOptions.api
            this.channel.listen(".Reload", (e) => this.reload(e));
            this.getDataRequestUsers();
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
