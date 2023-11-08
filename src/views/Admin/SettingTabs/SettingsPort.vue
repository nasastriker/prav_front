<template>
    <div>
    <template v-if="!ShowEditSelPorts">
        <div>
            <vs-button style="margin-left: auto;margin-right: 0em" color="success" class="pull-right" type="filled"  @click="NewPorts">Добавить порты</vs-button>
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="SelPortsArr"
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
        </div>
    </template>
    <template v-else>
     <SettingsPortID> </SettingsPortID>
    </template>
    </div>
</template>

<script>
import {mapActions, mapGetters,mapMutations} from 'vuex'
import PortToSettings from '../Render/PortToSettings.vue'
import SettingsPortID from './SettingsPortID.vue'
export default {
    name: 'SettingsPort',
    components: {
        PortToSettings,
        SettingsPortID,
     },
    data() {
        return {
            searchQuery: '',
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
                    headerName: 'Название',
                    field: 'work',
                    filter: true,
                    width: 300,
                },
                {
                    headerName: 'Комментарий',
                    field: 'comment',
                    filter: true,
                    width: 300,
                },
                {
                    headerName: 'ip',
                    field: 'ip',
                    filter: true,
                    width: 150,
                },
                {
                    headerName: 'Порт',
                    field: 'port',
                    filter: true,
                    width: 130,
                },
                {
                    headerName: 'Операции',
                    field: 'id',
                    filter: true,
                    width: 130,
                    cellRendererFramework: 'PortToSettings',
                    cellRendererParams: {
                        editRecord: this.editPorts.bind(this),
                    },
                },
            ],
            components: {
                PortToSettings
            },

            readonly_status: true
        }
    },
    computed: {
        ...mapGetters([
            'SelPortsArr','SelPortsOnes','ShowEditSelPorts'
        ]),
        paginationPageSize () {
            if (this.gridApi) return this.gridApi.paginationGetPageSize()
            else return 100
        },
    },
    methods: {
        editPorts(params){
            this.setShowEditPorts(true)
            this.setselPortsOnes(params)
        },

        onrowDoubleClicked(event){
            this.setShowEditPorts(true)

            this.setselPortsOnes(event.data.id)

        },
        NewPorts(){
            this.setShowEditPorts(true)
            this.setselPortsOnes(0)
        },
        onRowDataChanged () {
            Vue . nextTick (() => {
                this.gridOptions.api.sizeColumnsToFit();
                }
            );
        },
        onColumnResized(params) {
            params.api.resetRowHeights();

        },
        onColumnVisible(params) {
            params.api.resetRowHeights();
        },
        onGridSizeChanged(params) {
            if (params.clientWidth > 500) {
                this.gridApi.sizeColumnsToFit()

            } else {
                this.columnDefs.forEach(x => {
                    x.width = 300;
                });
                this.gridApi.setColumnDefs(this.columnDefs)
            }
        },

        ...mapMutations([
            'setselPortsOnes','setShowEditPorts'
        ]),

        ...mapActions([
            'getSelPortsAll'
        ]),
    },

    mounted() {
        this.gridApi = this.gridOptions.api
        this.getSelPortsAll()
    }
}

</script>

<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
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
