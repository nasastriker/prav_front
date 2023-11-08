<template>
    <div>
      <vs-checkbox class="mb-4 mt-2" style="margin-left: 0px;" v-model="Deb.debtorCredit.gas_flag" @input="changeDeb">Гас флаг</vs-checkbox>
        <ag-grid-vue
            ref="agGridTable"
            :components="components"
            :gridOptions="gridOptions"
            class="ag-theme-material w-100 my-4 ag-grid-table"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="SudGassArr"
            rowSelection="multiple"
            colResizeDefault="shift"
            :animateRows="true"
            :floatingFilter="false"
            @grid-size-changed="onGridSizeChanged"
            :pagination="true"
        @rowDoubleClicked="onrowDoubleClicked"
            :suppressPaginationPanel="true"
            :enableRtl="$vs.rtl">
        </ag-grid-vue>
    </div>
</template>

<script>
    import StatusGasOpen from './Render/StatusGasOpen.vue'
    import {mapActions, mapGetters} from "vuex";
    import Vue from 'vue'
    import FileLinkSudGas from "./Render/FileLinkSudGas.vue";
    import OpenGas from "./Render/OpenGas.vue";
    import VueClipboard from 'vue-clipboard2'

    VueClipboard.config.autoSetContainer = true // add this line
    Vue.use(VueClipboard)
    export default {
        components: {
          FileLinkSudGas,OpenGas,StatusGasOpen
        },
        data () {
            return {
                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [



                    {
                        headerName: 'Статус',
                        field: 'status',
                        filter: true,
                        width: 100,
                    },

                    {
                        headerName: 'ID СудРФ',
                        field: 'external_id',
                        filter: true,
                        width: 150,
                    },

                    {
                        headerName: 'Статус СудРФ',
                        field: 'status_sudrf',
                        filter: true,
                        width: 200,
                      cellRendererFramework: 'StatusGasOpen',
                    },

                    {
                        headerName: 'Дата',
                        field: 'date_norm',
                        filter: true,
                        width: 100,
                    },
                  {
                    headerName: 'Файл',
                    field: 'file_path',
                    filter: true,
                    width: 200,
                    cellRendererFramework: 'FileLinkSudGas',
                  },
                    {
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 200,
                        cellRendererFramework: 'OpenGas',
                    },
                ],
                components: {
                  FileLinkSudGas,OpenGas,StatusGasOpen
                }
            }
        },
        mounted(){
            this.gridApi = this.gridOptions.api;
            this.getDataSudGassCredit(this.Deb.debtorCredit.id);
        },
        asyncComputed: {},
        computed: {
            ...mapGetters([
                'SudGassArr', 'Deb'
            ]),
        },
        methods: {
            onrowDoubleClicked(event){
                this.$copyText(event.data.external_id)

                alert("Скопировано в буфер обмена");
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
                'getDataSudGassCredit','changeDeb'
            ]),
        },
    }
</script>

<style lang="scss">
    .const{
        margin-top: 10px;
        color: red;
        border: 1px;

        cursor: pointer;
        text-decoration-line: underline;
        text-decoration-style: dashed;
    }
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
    .checkbox_x.vs-checkbox{
        min-width: 20px;
    }

</style>
