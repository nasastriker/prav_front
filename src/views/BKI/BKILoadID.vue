<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <Back></Back>
            <h3 style="margin-left: 15px">{{ AnswerFileName }}</h3>
            <hr style="margin-bottom: 15px; border: 0.5px solid #7367f0;">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div
                                class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                          <span class="mr-2">{{
                              currentPage * paginationPageSize - (paginationPageSize - 1)
                            }} - {{
                              TotalRecordsAns - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalRecordsAns
                            }} of {{ TotalRecordsAns }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
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
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="BkiReestrOnce"
                    rowSelection="multiple"
                    :rowDataChanged="onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
            >
            </ag-grid-vue>
            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage"/>
        </div>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import Back from '../../components/Back.vue'
   import StatusBkiCredit from './Render/StatusBkiCredit.vue'
    import axios from "@/axios";
    import r from "@/route";

    export default {
        components: {
            Back,
           StatusBkiCredit,
        },
        data() {
            return {
                pag:100,
                AnswerFileName:'',
                AnsCreditsArr: '',
                TotalRecordsAns:0,
                csv: [],
                // AgGrid
                gridApi: null,
                gridOptions: {},
                popupActiveAnswerFile: false,
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'Заемщик',
                        field: 'fio',
                        filter: true,
                        width: 300,
                    },
                    {
                        headerName: 'Дата рождения',
                        field: 'birthdate',
                        filter: true,
                        width: 120,
                    },

                    {
                        headerName: 'ID Кредита',
                        field: 'id_credit',
                        filter: true,
                        width: 100,
                    },

                    // {
                    //     headerName: 'Статус',
                    //     field: 'bank',
                    //     filter: true,
                    //     width: 280,
                    //     // cellRendererFramework: 'OpenAnsStatus'
                    //
                    // },
                    {
                        headerName: 'Статус',
                        field: 'status',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'StatusBkiCredit'
                    },

                ],
                components: {
                   StatusBkiCredit
                }
            }
        },



        computed: {
            totalPages() {
                if (this.gridApi)
                    return Math.ceil(this.TotalRecordsAns / this.paginationPageSize)
                else return 0
            },

            paginationPageSize() {
                return this.pag
            },
            ...mapGetters([
                'BkiReestrOnce'
            ]),
            currentPage: {
                get() {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set(val) {
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },
        },
        methods: {
            ...mapActions([
                'getBkiReestrOnce'
            ]),

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

            changePag(pag) {

                this.gridApi.paginationSetPageSize(pag)
            },

            onrowDoubleClicked(event) {
                // console.log('2424' ,event)
                this.$router.push('/debtors/' + event.data.id_credit);

            },
            ...mapActions([

            ]),
            updateSearchQuery(val) {
                this.gridApi.setQuickFilter(val)
            },
            onRowDataChanged() {
                Vue.nextTick(() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },
        },
        mounted() {
            this.gridApi = this.gridOptions.api;
            this.getBkiReestrOnce(this.$route.params.id)

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
    .vs-popup {
        min-width: 800px;
    }
    .err_mess {
        color: red;
    }

    .succs_mess {
        color: green;
    }

    .row-no-file {
        background-color: #FFC0CB;
    }

    hr {
        transform: scaleY(0.5);
    }
</style>
