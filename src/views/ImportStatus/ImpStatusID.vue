<template>
    <div id="page-user-list">
        <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col sm:w-1/5 w-full mb-2">
                <Back></Back>
            </div>
            <div class="vx-col sm:w-3/5 w-full mb-2">
                <h3 style="margin-bottom: 15px">{{ReestrsImportName}}</h3>
            </div>
        </div>
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalReestrsImport - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalReestrsImport }} of {{ TotalReestrsImport }}</span>
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
                            <span class="mr-2">Статус {{status}}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>

                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                        <vs-dropdown-menu>
                            <template v-for="(item,index) in StatussArrReestrsImportAndAll">
                                <vs-dropdown-item @click="setStatus(index)">
                                    <span>{{ item.name }}</span>


                                </vs-dropdown-item>
                            </template>

                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="User.pag.reestr_import.find" @input="updateSearchQuery" placeholder="Поиск..." />
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="ReestrsImportArr"
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
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import OpenIn from './Render/OpenIn.vue'
    import Status  from './Render/Status.vue'
    import Back from '../../components/Back.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            AgGridVue,
            vSelect,
            OpenIn,
            Back,
            Status,
            VueCsvImport,
        },
        data () {
            return {
                status:'Все',
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
                        headerName: 'ФИО',
                        field: 'fio',
                        filter: true,
                        width: 350,
                    },
                    {
                        headerName: 'Договор',
                        field: 'number',
                        filter: true,
                        width: 250,

                    },


                    {
                        headerName: 'Статус',
                        field: 'status',
                        filter: true,
                        width: 250,
                        cellRendererFramework: 'Status'
                    },


                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'OpenIn'
                    },
                    {
                        headerName: 'Создан',
                        field: 'created_at',
                        filter: true,
                        width: 250,
                        //cellRendererFramework: 'OpenJudicialName'
                    },


                ],

                components: {
                    OpenIn,
                    Status
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
                return this.User.pag.reestr_import.limit
            },

            ...mapGetters([
                'ReestrsImportArr','TotalReestrsImport','User','ReestrsImportName','StatussArrReestrsImportAndAll'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryReestrImportOffset(val-1)
                    this.getDataReestrsImportByReestrs({
                        req:this.User.pag.reestr_import,
                        id:this.$route.params.id,

                    });
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },


        },
        methods: {
            setStatus(index){
                this.status=this.StatussArrReestrsImportAndAll[index].name
                this.User.pag.reestr_import.status=this.StatussArrReestrsImportAndAll[index].id
                this.setDataUser()
                this.getDataReestrsImportByReestrs( {
                    req:this.User.pag.reestr_import,
                    id:this.$route.params.id
                });
            },
            ...mapMutations([
                'setQueryReestrImportLimit','setQueryReestrImportOffset'

            ]),
            changePag(pag){

                this.User.pag.reestr_import.limit=pag
                this.setDataUser()
                this.getDataReestrsImportByReestrs({
                    req:this.User.pag.reestr_import,
                    id:this.$route.params.id,

                });
                this.setQueryReestrImportLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },


            onrowDoubleClicked(event){

                this.$router.push('/debtors/'+event.data.id_credit)
            },

            ...mapActions([
                'getDataReestrsImportByReestrs','getDataStatuss','setDataUser'
            ]),
            updateSearchQuery (val) {
                this.User.pag.reestr_import.find=val

                this.getDataReestrsImportByReestrs({
                    req:this.User.pag.reestr_import,
                    id:this.$route.params.id,

                });

            },

            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },
            reload(e){
                if(e.data=='reestr'){
                   // this.getDataReestrsImportByReestrs(this.User.pag.reestr_import,this.$route.params.id);
                }
            }

        },
        mounted () {
            this.getDataStatuss();
            this.gridApi = this.gridOptions.api
            this.channel.listen(".Reload", (e) => this.reload(e));
            //this.getDataReestrsImportByReestrs(this.$route.params.id);
            this.getDataReestrsImportByReestrs({
                req:this.User.pag.reestr_import,
                id:this.$route.params.id

            });
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
