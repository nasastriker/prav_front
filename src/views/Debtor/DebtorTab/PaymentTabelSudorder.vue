<template>
    <div >
                <div slot="header">
                    Платежи по суд расходам:
                </div>
                <div class="">

                    <div class="flex flex-wrap justify-between items-center">
                        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                            <vs-dropdown vs-trigger-click class="cursor-pointer">
                                <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                                    <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalPaymentSoOnes - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalPaymentSoOnes }} of {{ TotalPaymentSoOnes }}</span>
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

                        <div>
                            <h5>Итого: <b>{{ TotalSumSoOnes }}</b> руб.</h5>
                        </div>

                        <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                            <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                            <vs-button color="success" class="pull-right" type="filled"  @click="downloadArch">Скачать</vs-button>

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
                            :rowData="PaymentSoOnesArr"
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
    import Open from './Render/OpenPaymentSudOrder.vue'
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../../route';
    import axios from '../../../axios'
    export default {
        props:['id_dogovor'],
        components: {
            Open,
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
                        headerName: 'Дата',
                        field: 'dat',
                        filter: true,
                        width: 120
                    },
                    {
                        headerName: 'Сумма',
                        field: 'sum',
                        filter: true,
                        width: 100
                    },

                    {
                        headerName: 'Вх. остаток',
                        field: 'vh',
                        filter: true,
                        width: 100,

                    },
                    {
                        headerName: 'Исх. остаток',
                        field: 'ish',
                        filter: true,
                        width: 100,

                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'Open'
                    },
                ],
                components: {
                    Open
                }
            }
        },

        computed: {
            totalPages () {
                //   console.log(Math.ceil(this.TotalPaymentSoOnes/this.paginationPageSize))
                if (this.gridApi)
                    return Math.ceil(this.TotalPaymentSoOnes/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 10
            },
            ...mapGetters([
                'PaymentSoOnesArr','TotalPaymentSoOnes','TotalSumSoOnes'

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
            downloadArch(){
                axios.get(r("payment.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'downloadArch',
                        param:this.id_dogovor


                    }
                }).then((response) => {


                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));
                    //   console.log(response.headers);
                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    //  console.log(filename);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);




                    document.body.appendChild(link);
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
                'getDataPaymentSoOnes',
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

            this.getDataPaymentSoOnes(this.id_dogovor);
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
