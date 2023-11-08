<template>
    <div id="page-user-list">
        <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col sm:w-1/5 w-full mb-2">
                <Back></Back>
            </div>
            <div class="vx-col sm:w-3/5 w-full mb-2">
                <h3 style="margin-bottom: 15px"></h3>
            </div>
        </div>
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalImportTasksId - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalImportTasksId }} of {{ TotalImportTasksId }}</span>
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
                    <v-select  class="cursor-pointer" style="margin-left:20px;" :reduce="label => label.id" label="label" :options="filterList" @input="onChangeFilter"    v-model="filter"  ></v-select>
                </div>
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="User.pag.debtor_reestr.find" @input="updateSearchQuery" placeholder="Поиск..." />
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="ImportTasksArrId"
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
            <vs-popup classContent="popup-example" title="Ошибка" :active.sync="showErr">
                <vs-textarea class="w-100" height="600px" v-model="error" > </vs-textarea>
            </vs-popup>
        </div>
    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Open from '../Reestr/Render/OpenDebtor.vue'
    import Status  from '../../components/StatusDogovor.vue'
    import StatusU from './Render/StatusID.vue'
    import Back from '../../components/Back.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            AgGridVue,
            vSelect,
            Open,
            Back,
            Status,
            StatusU,
            VueCsvImport,
        },
        data () {
            return {

                // Filter Options

                filter:2,
                filterList:[{label:'Все', id:2},{label:'Успешно', id:1},{label:'Ошибка', id:0}],
                searchQuery: '',
                csv:[],
                // AgGrid
                gridApi: null,
                showErr:false,
                error:'',
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
                        cellRendererFramework: 'StatusU'
                    },
                    {
                        headerName: 'Id_credit',
                        field: 'id_credit',
                        filter: true,
                        width: 100,

                    },
                    {
                        headerName: 'Договор',
                        field: 'number_dog',
                        filter: true,
                        width: 100,

                    },
                    {
                        headerName: 'Договор',
                        field: 'date_dog',
                        filter: true,
                        width: 100,

                    },
                    {
                        headerName: 'Фамилия',
                        field: 'name_family',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Текст',
                        field: 'text',
                        filter: true,
                        width: 600,
                    },

/*
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'Open'
                    },
*/


                ],

                // Cell Renderer Components
                components: {
                    Open,
                    Status,
                    StatusU,
                }
            }
        },

        computed: {

            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalImportTasksId/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                return 100
            },

            ...mapGetters([
                'ImportTasksArrId','TotalImportTasksId','User',

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
            ...mapMutations([


            ]),
            changePag(pag){


                this.gridApi.paginationSetPageSize(pag)
            },

            onChangeFilter(event){
                this.getDataImportTasksId({
                    id:this.$route.params.id, filter:this.filter,

                })
                // console.log(event.data)
            },
            onrowDoubleClicked(event){
                if(event.data.status==1){
                    this.$router.push('/debtors/'+event.data.id_credit)
                }else{
                    this.error=event.data.error
                    this.showErr=true;
                }

            },

            ...mapActions([
                'getDataImportTasksId','getDataStatuss','setDataUser'
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

            }

        },
        mounted () {
            this.getDataStatuss();
            this.gridApi = this.gridOptions.api
            this.getDataImportTasksId({
                id:this.$route.params.id,
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
