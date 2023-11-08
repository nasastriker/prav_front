<template>
    <div id="page-user-list">
        <div class="flex flex-wrap justify-between items-center">
            <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                <h3>История:</h3>
            </div>

        </div>

        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-30 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="arrValue"
                rowSelection="multiple"
                :rowDataChanged = "onRowDataChanged"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :paginationPageSize="paginationPageSize"
                :suppressPaginationPanel="true"
        @grid-size-changed="onGridSizeChanged"
        @column-resized="onColumnResized"
        @column-visible="onColumnVisible"
        @rowDoubleClicked="onrowDoubleClicked"
        :enableRtl="$vs.rtl">
        </ag-grid-vue>

        <vs-popup style="min-height: 500px;" classContent="popup-example" title="Ошибка" :active.sync="popupActive">


            <vs-textarea class="w-100"  height="500px" v-model="infoText" > </vs-textarea>
            <div style="text-align: center">
                <vs-button class="w-1/3 ml-auto"  style="margin-top: 15px" color="primary" type="filled" @click="popupActive=!popupActive">Закрыть</vs-button>
            </div>

        </vs-popup>


        <vs-pagination
                :total="totalPages"
                :max="7"
                v-model="currentPage" />


    </div>

</template>

<script>
    import { VueCsvImport } from 'vue-csv-import';
    import { mapActions,mapGetters } from 'vuex'
    import Status from './Render/Status.vue'
    import r from '../../route';
    import axios from '../../axios'

    export default {
        components: {
            Status,
            VueCsvImport,
        },
        data () {
            return {
                infoText:'',
                popupActive:false,
                arrValue:[],
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
                        headerName: 'ID',
                        field: 'id',
                        filter: true,
                        width: 100
                    },


                    {
                        headerName: 'Название',
                        field: 'name',
                        filter: true,
                        width: 500
                    },
                    {
                        headerName: 'Статус',
                        field: 'do',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'Status'
                    },
                    {
                        headerName: 'Дата',
                        field: 'created_at',
                        filter: true,
                        width: 200
                    },



                ],

                // Cell Renderer Components
                components: {
                    Status
                }
            }
        },

        computed: {
            totalPages () {
                return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            ...mapGetters([


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

            onrowDoubleClicked(data){
                this.infoText=data.data.error



                this.popupActive=true
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

            getData(id){
                axios.get(r("historyShed.index"), {
                    params: {
                        method: 'getHistoryById',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.arrValue=response.data.data
                    }



                })
            },

        },
        mounted () {
            this.getData(this.$route.params.id);
            this.gridApi = this.gridOptions.api
        }
    }

</script>

<style lang="scss">
    .vs-popup--content.popup-example {
        min-height: 400px;
    }
    .my-30{
        height: 30vh;
    }
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
