<template>
    <div id="page-user-list">
        <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col sm:w-1/5 w-full mb-2">
                <Back></Back>
            </div>
            <div class="vx-col sm:w-3/5 w-full mb-2">
                <h3 style="margin-bottom: 15px">{{nameReestr}}</h3>
            </div>
        </div>
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalReestrArr - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalReestrArr }} of {{ TotalReestrArr }}</span>
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
                </div>
            </div>
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="ReestrsDeleteArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
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
    import Status  from './Render/Status.vue'
    import Back from '../../components/Back.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    export default {
        components: {
            AgGridVue,
            vSelect,
            Back,
            Status,
            VueCsvImport,
        },
        data () {
            return {
                ReestrsDeleteArr:[],
                TotalReestrArr:0,
                nameReestr:'',
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
                        headerName: 'ID Кредит',
                        field: 'id_credit',
                        filter: true,
                        width: 350,
                    },

                    {
                        headerName: 'Статус',
                        field: 'name_status',
                        filter: true,
                        width: 250,
                    },



                ],

                components: {
                    Status
                }
            }
        },

        computed: {

            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalReestrArr/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.reestr_delete!='undefined') {
                                return this.User.pag.reestr_delete.limit
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
                'User'
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

            data(){

                axios.get(r("reestrDelete.index"), {
                    params: {
                        method: 'getReestrDeleteID',
                        param: this.$route.params.id
                    }
                }).then((response) => {

                    if (response.data.result) {
                        this.ReestrsDeleteArr = response.data.data;
                        this.TotalReestrArr = response.data.total;
                        console.log(  this.TotalReestrArr)
                        this.nameReestr=response.data.name;
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

            ...mapActions([
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

            this.data();
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
