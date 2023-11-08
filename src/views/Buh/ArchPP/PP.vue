<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="vx-col w-2/3">
                    <div class="vx-row">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-3 cursor-pointer flex items-center justify-between font-medium ml-4" style="margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalArchPps - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalArchPps }} of {{ TotalArchPps }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
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
                        <vs-input type="date" v-model="PPdata.pag.date_pps" @change="changeDate" style="margin-left: 10px"></vs-input>
                </div>
                </div>

                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />

                </div>
            </div>
            <div class="out-main">
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :enableBrowserTooltips="true"
                    :defaultColDef="defaultColDef"
                    :rowData="ArchPpsArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'"
                    >
            </ag-grid-vue>
                <transition name="fade">
                    <div class="outer-div" v-if="PPsLoadingFlag"><img class="load-bar" src="/loading.gif"></div>
                </transition>
            </div>

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
    import { mapActions,mapGetters,mapMutations  } from 'vuex'
    import OpenStatus from './Render/OpenStatus.vue'
    import r from '../../../route';
    import axios from '../../../axios'
    export default {
        components: {
            Open,
            OpenStatus,
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
                    {
                        headerName: 'Имя',
                        field: 'arch_name',
                      tooltipField: 'arch_name',
                        filter: true,
                        width: 550,
                    },
                    {
                        headerName: 'Сумма',
                        field: 'sum',
                        filter: true,
                        width: 120,
                    },
                    {
                        headerName: 'Кол.',
                        field: 'count',
                        filter: true,
                        width: 50,
                    },

                    {
                        headerName: 'Статус',
                        field: 'status',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenStatus'
                    },



                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'Open'
                    },

                    {
                        headerName: 'Дата',
                        field: 'created_at',
                        filter: true,
                        width: 250,
                        //cellRendererFramework: 'OpenJudicialName'
                    },


                ],

                // Cell Renderer Components
                components: {
                    Open,OpenStatus
                }
            }
        },

        computed: {
            totalPages () {
             //   console.log(Math.ceil(this.TotalArchPps/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalArchPps/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([
                'ArchPpsArr','TotalArchPps','User','PPdata','PPsLoadingFlag'

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
            changeDate(){
                this.getDataArchPps(this.PPdata.pag.date_pps);
            },
            newArch(){

                axios.post(r("archPp.update"), {

                    params: {
                        method: 'newArch',



                    }
                }).then((response) => {

                    this.$vs.notify({
                        title: 'Удачно',
                        text: 'Удачно',
                        color: 'succsess',
                        position: 'top-center'
                    })



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
            onrowDoubleClicked(event){
                axios.get(r("archPpDownload.index")+'/'+event.data.id, {
                    responseType: 'arraybuffer',
                }).then((response) => {
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', event.data.arch_name);
                    document.body.appendChild(link);
                    this.setArhPPStat(event.data.id)
                    event.data.status=1
                    link.click();
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
                'getDataArchPps'
            ]),
            ...mapMutations([
                'setArhPPStat'
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

            this.getDataArchPps();
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

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.7s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .load-bar{
        display: inline-block;
        max-width: 100px;
    }

    .outer-div
    {
        padding: 20%;
        text-align: center;
        z-index : 10;
        position : absolute;
        top : 0;
        left : 0;
        width: 100%;
        height: 100%;
        background-color: hsla(200, 80%, 90%, 0.3);
    }

    .out-main{
        position : relative;
    }
</style>
