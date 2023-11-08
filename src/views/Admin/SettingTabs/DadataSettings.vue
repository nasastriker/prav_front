<template>
    <div>
        <div class="vx-card p-6">

            <template v-if="editDadataPop">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <div class="vx-row">
                        <div class="vx-col">
                            <vs-dropdown vs-trigger-click class="cursor-pointer" style="margin-top: 10px">
                                <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                                    <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalDadataSettings - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalDadataSettings }} of {{ TotalDadataSettings }}</span>
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


                    </div>
                </div>
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <vs-input class="mb-4 md:mb-0 mr-4" style="margin-top: 5px" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                    <vs-button class="mb-4 md:mb-0 mr-4" style="margin-top: 5px" @click="AddDadataSettings"> Добавить</vs-button>

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
                    :rowData="DadataSettingsArr"
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
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />
            </template>
            <template v-else>
                <DadataSettingsID  :id="editDadata" @back_click="backclick"></DadataSettingsID>
            </template>
        </div>

    </div>

</template>

<script>
    import DadataSettingsID from './DadataSettingsID.vue'
    //  import organization from './Organization.vue'
    import { ArrowLeftIcon } from 'vue-feather-icons'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import operationDadataSettings from './Render/OperationDadataSettings.vue'
    export default {
        components: {
            ArrowLeftIcon,
            DadataSettingsID,
            operationDadataSettings,
        },
        data () {
            return {

                idDadata:-1,
                editDadataPop:true,
                editDadata:0,
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
                        headerName: 'ID',
                        field: 'id',
                        filter: true,
                        width: 80

                    },
                    {
                        headerName: 'TOKEN',
                        field: 'token',
                        filter: true,
                        width: 300
                    },
                    {
                        headerName: 'SECRET',
                        field: 'secret',
                        filter: true,
                        width: 250
                    },
                    {
                        headerName: 'FRONT',
                        field: 'front',
                        filter: true,
                        width: 80
                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 100,
                       cellRendererFramework: 'operationDadataSettings',
                       cellRendererParams: {
                           editValue: this.editValue.bind(this),
                        },
                    },

                ],

                // Cell Renderer Components
                components: {
                    operationDadataSettings,
                }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalDadataSettings/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },

            ...mapGetters([
                'TotalDadataSettings', 'DadataSettingsArr','User'
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
                this.editDadata=id
                this.editDadataPop=false

            },
            AddDadataSettings() {
                this.editDadata=-1
                this.editDadataPop=false

            },
            backclick() {
                this.getDadataSettingsArr()
                this.editDadataPop=true
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
                this.editValue(event.data.id)

            },
            ...mapMutations([]),
            ...mapActions([
                'getDadataSettingsArr','setDataUser','getDataUser',
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
            this.gridApi = this.gridOptions.api
            this.getDadataSettingsArr()


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
