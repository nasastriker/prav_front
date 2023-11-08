<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="vx-col mb-2">
                    <div class="vx-row">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="cursor-pointer flex items-center justify-between font-medium ml-4 mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ BkiReestrTotal - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : BkiReestrTotal }} of {{ BkiReestrTotal }}</span>
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
                </div>

                <div class="vx-col mb-2">
                    <div class="dropdown-button-container">
                        <vs-button class="btn" color="danger" type="gradient" @click="startJobBkiMonday">Запустить выгрузку</vs-button>
                        <!--<vs-dropdown>
                            <vs-button class="btn-drop" color="danger" type="gradient" icon="more_horiz"></vs-button>
                            <vs-dropdown-menu>
                                <vs-dropdown-item>
                                    <vs-button color="primary" class="pull-right" type="filled"  @click="refreshBankListSa">Обновить</vs-button>
                                </vs-dropdown-item>



                            </vs-dropdown-menu>
                        </vs-dropdown>-->
                    </div>
                    <!--   <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." /> -->


                </div>

            </div>
            <div class="out-main">
                <ag-grid-vue
                        ref="agGridTable"
                        :components="components"
                        :gridOptions="gridOptions"
                        class="ag-theme-material w-100 my-4 ag-grid-table"
                        :columnDefs="columnDefs"
                        :defaultColDef="defaultColDef"
                        :rowData="BkiReestrArr"
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
                        @grid-size-changed="onGridSizeChanged"
                        @column-resized="onColumnResized"
                        @column-visible="onColumnVisible"
                        :enableBrowserTooltips="true"
                        :overlayLoadingTemplate="'Идёт загрузка'"
                        :overlayNoRowsTemplate="'Нет записей'">
                </ag-grid-vue>
                <!--<transition name="fade">-->
                    <!--<div class="outer-div" v-if="BankListSaLoadingFlag"><img class="load-bar" src="/loading.gif"></div>-->
                <!--</transition>-->
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
                        headerTooltip: 'Имя',
                        tooltipField: 'filename',
                        field: 'filename',
                        filter: true,
                        width: 400,
                        cellRendererFramework: 'Name'
                    },
                    {
                        headerName: 'Количество',
                        headerTooltip: 'Количество',
                        tooltipField: 'count_credit',
                        field: 'count_credit',
                        filter: true,
                        width: 250,
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'status',
                        field: 'status',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenStatus'
                    },
                    {
                        headerName: 'Дата создания',
                        field: 'date',
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

                // Cell Renderer Components
                components: {
                    Name,OpenStatus,Open,
                }
            }
        },

        computed: {

            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.BkiReestrTotal/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.bkiReestr!='undefined') {
                                return this.User.pag.bkiReestr
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
                'BkiReestrArr','BkiReestrTotal','User'

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
            startJobBkiMonday(){
                axios.get(r("bki_reestr.index"), {
                    params: {
                        method: 'startJobBkiMonday',
                        param: ''
                    }
                }).then((response) => {
                        this.$vs.notify({
                            title: 'Сообщение',
                            text: 'Выгрузка запущена',
                            color: 'success',
                            position: 'top-center'
                        })
                })


            },


            changePag(pag){
                if(this.User.pag==null){
                    this.User.pag={
                        bkiReestr:10
                    }
                }
                this.User.pag.bkiReestr=pag
                this.setDataUser()
                this.gridApi.paginationSetPageSize(pag)
            },

            onrowDoubleClicked(event){

            },
            ...mapActions([
                'getBkiReestrArr','setDataUser'
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

            this.getBkiReestrArr();
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
