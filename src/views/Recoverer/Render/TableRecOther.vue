<template>
        <ag-grid-vue
                ref="agGridTable"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :components="components"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="RecoverOtherDocuments"
                rowSelection="multiple"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="true"
                :suppressPaginationPanel="true"
                @grid-size-changed="onGridSizeChanged"
                @column-resized="onColumnResized"
                :enableRtl="$vs.rtl"
                style="height: 100%">
        </ag-grid-vue>
</template>

<script>
    import { AgGridVue } from 'ag-grid-vue'
    import { mapActions,mapGetters } from 'vuex'
    import vSelect from 'vue-select'
    import DownLoadRecoverOther from './DownLoadRecoverOther.vue'
    export default {
        components: {
            vSelect,
            AgGridVue,
            DownLoadRecoverOther,
        },
        props:['id_rec'],
        data () {
            return {
                gridApi: null,
                gridOptions: {},
                rowClassRules: null,
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true

                },

                columnDefs: [
                    {
                        headerName: 'Имя документа',
                        field: 'filename',
                        filter: false,
                        width: 400,

                    },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: false,
                        width: 100,
                        cellRendererFramework: 'DownLoadRecoverOther',
                    },

                ],
                components: {
                    DownLoadRecoverOther
                },
            }
        },
                mounted() {
                    this.gridApi = this.gridOptions.api
                    this.getRecoverOtherDocuments(this.id_rec)
                },
                computed: {
                    ...mapGetters([
                        'RecoveresOtherOrgn','TypesDcDocumentsRec','RecoverOtherDocuments'
                    ]),
                },
                methods: {
                    ...mapActions([
                        'getTypesDcDocuments','getRecoverOtherDocuments','saveRecoverersOther','getDataRecoverersOtherOnce'
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
            }

    }
</script>

<style scoped>

</style>