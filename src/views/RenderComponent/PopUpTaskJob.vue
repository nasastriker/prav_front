<template>
    <div>
        <ag-grid-vue
                style="height: 500px"
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="dataArr"
                rowSelection="multiple"
                colResizeDefault="shift"
                :animateRows="true"
                @rowDoubleClicked="onrowDoubleClicked"
                @grid-size-changed="onGridSizeChanged"
                :floatingFilter="false"
                :suppressPaginationPanel="true"
                :enableRtl="$vs.rtl"
                :enableBrowserTooltips="true"
                :rowClassRules="rowClassRules">
        </ag-grid-vue>
        <vs-popup classContent="popup-example" title="Ошибка" :active.sync="popTaskSud">
            <vs-textarea  height="600px" v-model="error" > </vs-textarea>
        </vs-popup>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import TaskStatus from './TaskJobStatusRenderPopUp.vue'
    import moment from 'moment';
    export default {
        components: {
            TaskStatus,
        },
        props:[
            'name','dataArr'
        ],
        data() {
            return {

                popTaskSud:false,
                error:'',
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
                        headerName: 'Дата',
                        field: 'created_at',
                        tooltipField: 'created_at',
                        cellRenderer: params => moment(params.value).format('HH:MM DD.MM.YYYY'),
                        filter: true,
                        width: 120
                    },
                    {
                      headerName: 'Имя',
                      field: 'name',
                      tooltipField: 'name',
                      filter: true,
                      width: 150
                    },
                    {
                        headerName: 'Статус',
                        field: 'status',
                        tooltipField: 'status',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'TaskStatus'
                    },
                    {
                        headerName: 'Ошибка',
                        field: 'error',
                        tooltipField: 'error',
                        filter: true,
                        width: 200
                    },

                ],
                components: {
                    TaskStatus
                }
            }
        },

        created() {

        },

        computed: {
            ...mapGetters([
                'TaskSudArr'
            ]),
        },
        methods: {


            onrowDoubleClicked(event){
                this.error=event.data.error;
                this.popTaskSud=true;
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
            ...mapActions([
            ]),
        },
        mounted() {
            this.gridApi = this.gridOptions.api;
        }
    }

</script>

<style lang="scss">
    .vs-popup--content{
        min-height: 500px!important;
    }
    .dropdown-button-container {
        display: flex;
        align-items: center;

        .btnx {
            border-radius: 5px 0px 0px 5px;
        }

        .btn-drop {
            border-radius: 0px 5px 5px 0px;
            border-left: 1px solid rgba(255, 255, 255, .2);
        }
    }

</style>
