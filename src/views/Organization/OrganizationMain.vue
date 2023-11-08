<template>
    <div>
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalOrganizationArr - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalOrganizationArr }} of {{ TotalOrganizationArr }}</span>
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


                </div>

                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button class="mb-4 md:mb-0" @click="AddOrganisation"> Добавить</vs-button>

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
                    :rowData="OrganizationArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :suppressPaginationPanel="true"
                    @grid-size-changed="onGridSizeChanged"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    :enableRtl="$vs.rtl"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />

        </div>

    </div>

</template>

<script>
    import organization from './Organization.vue'
    import { ArrowLeftIcon } from 'vue-feather-icons'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import openOrganization from './Render/OpenOrganization.vue'
    export default {
        components: {
            organization,
            ArrowLeftIcon,
            openOrganization,
        },

        data () {
            return {
                idOrganization:0,
                editIDTab:true,
                searchQuery: '',
                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [

                    {
                        headerName: 'Наименование',
                        headerTooltip: 'Наименование',
                        tooltipField: 'short_name',
                        field: 'short_name',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Руководитель',
                        headerTooltip: 'Руководитель',
                        tooltipField: 'director',
                        field: 'director',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Адрес',
                        headerTooltip: 'Адрес',
                        tooltipField: 'address',
                        field: 'address',
                        filter: true,
                        width: 100,
                    },
                    {
                        headerName: 'ИНН',
                        headerTooltip: 'ИНН',
                        tooltipField: 'inn',
                        field: 'inn',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'ОГРН',
                        headerTooltip: 'ОГРН',
                        tooltipField: 'ogrn',
                        field: 'ogrn',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Email',
                        headerTooltip: 'Email',
                        tooltipField: 'email',
                        field: 'email',
                        filter: true,
                        width: 100,
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'openOrganization',
                        cellRendererParams: {
                            editValue: this.editValue.bind(this),
                        },
                    },

                ],

                // Cell Renderer Components
                components: {
                    openOrganization,
                }
            }
        },

        computed: {
            idOrgan(){return this.idOrganization},
            totalPages () {
              if (this.gridApi)
                return Math.ceil(this.TotalOrganizationArr/this.paginationPageSize)
            else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },

            ...mapGetters([
                'TotalOrganizationArr', 'OrganizationArr'
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
            editValue(id){
                this.idOrganization = id
             //   this.editIDTab = false
                this.$router.push('/organization/'+this.id)
            },
            AddOrganisation() {
                this.idOrganization = 'new'
                this.getDataOrganizationArr()
             //   this.editIDTab = false;
                this.$router.push('/organization/new')
            },
            backclick() {
                //this.editIDTab = true
                this.$router.push('/organization')
            },


            onColumnResized(params) {
                params.api.resetRowHeights();
            },
            onColumnVisible(params) {
                params.api.resetRowHeights();
            },
            onGridSizeChanged(params) {

                if (params.clientWidth > 400) {
                    this.gridApi.sizeColumnsToFit();
                } else {
                    this.columnDefs.forEach(x => {
                        x.width = 300;
                    });
                    this.gridApi.setColumnDefs(this.columnDefs);
                }
            },


            onrowDoubleClicked(event) {
                this.idOrganization = event.data.id
                //this.editIDTab = false
                this.$router.push('/organization/'+event.data.id)

            },
            ...mapMutations([]),
            ...mapActions([
                'getDataOrganizationArr',
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
        mounted () {
            this.getDataOrganizationArr()
            this.gridApi = this.gridOptions.api
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
