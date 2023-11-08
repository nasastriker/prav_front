<template>
    <div id="page-user-list">
        <div class="vx-card p-6" style="min-height: 95vh;">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalArchFsspReturnSas - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalArchFsspReturnSas }} of {{ TotalArchFsspReturnSas }}</span>
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
                    :rowData="ArchFsspReturnSasArr"
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
    import Open from './Render/OpenReturn.vue'
    import Name from './Render/Name.vue'
    import { mapActions,mapGetters } from 'vuex'
    import OpenStatus from './Render/OpenStatus.vue'
    import r from '../../route';
    import axios from '../../axios'

    export default {
        components: {
            Open,
            Name,
            OpenStatus,
            VueCsvImport,
        },

        data () {
            return {
                searchQuery: '',
                csv:[],
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
                        field: 'arch_name',
                        filter: true,
                        width: 500,
                        cellRendererFramework: 'Name'
                    },
                    {
                        headerName: 'Дата',
                        field: 'date',
                        filter: true,
                        width: 150,
                    },

                    {
                        headerName: 'Статус',
                        field: 'status',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenStatus'
                    },

                    {
                        headerName: 'Дата создания',
                        field: 'created_at',
                        filter: true,
                        width: 250,
                    },

                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'Open'
                    },


                ],

                components: {
                    Open,OpenStatus,Name
                }
            }
        },

        computed: {

            totalPages () {
                //   console.log(Math.ceil(this.TotalArchFsspReturnSas/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalArchFsspReturnSas/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.fsspReturn!='undefined') {
                                return this.User.pag.fsspReturn
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
                'ArchFsspReturnSasArr','TotalArchFsspReturnSas','User'

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
            onColumnResized(params) {
                params.api.resetRowHeights();
            },
            onColumnVisible(params) {
                params.api.resetRowHeights();
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
            changePag(pag){
                if(this.User.pag==null){
                    this.User.pag={
                        fsspReturn:100
                    }
                }
                this.User.pag.fsspReturn=pag
                this.setDataUser()
                this.gridApi.paginationSetPageSize(pag)
            },

            onrowDoubleClicked(event){

                axios.get(r("archFsspReturnSa.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getArch',
                        param:event.data.id


                    }
                }).then((response) => {


                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));

                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', event.data.arch_name);
                    document.body.appendChild(link);
                    link.click();
                    this.getDataArchFsspReturnSas();


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
                'getDataArchFsspReturnSas','setDataUser'
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

            this.getDataArchFsspReturnSas();
        }
    }

</script>

<style lang="scss">
    /*.ag-row {*/
        /*height: 43px !important;*/
    /*}*/
    /*.cell-wrap-text { white-space: normal !important;*/
        /*overflow-wrap: normal!important;*/
        /*word-wrap: normal!important;*/
        /*word-break: normal!important;*/
        /*line-break: auto!important;*/
        /*hyphens: manual!important;*/
        /*width: 50%!important;*/
    /*}*/
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
