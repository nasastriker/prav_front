<template>
    <fieldset class="f mt-4">
        <legend class="l px-4 mb-2">Иванов Иван Иванович, 11.05.1966 <span class="ml-2 font-semibold cursor-pointer" @click="" style="color: rgb(239, 68, 68);">Copy</span></legend>
        <div class="flex">
            <div class="mr-4">
                <div class="centerx">
                    <vs-tooltip text="Обновить таблицу" position="top" >
                        <vs-button @click="refreshShow">
                            <feather-icon icon="RefreshCwIcon" svgClasses="h-5 w-5 cursor-pointer" />
                        </vs-button>
                    </vs-tooltip>
                </div>
            </div>

            <div class="mr-4">
                <div class="centerx">
                    <vs-tooltip text="Сбросить фильтры" position="top" >
                        <vs-button color="danger" @click="filterReset" >
                            <feather-icon icon="XCircleIcon" svgClasses="h-5 w-5 cursor-pointer" />
                        </vs-button>
                    </vs-tooltip>
                </div>
            </div>

            <div class="settingsBtnWrapper mr-4" >
                <div class="centerx">
                    <vs-tooltip text="Настройки таблицы" position="top" >
                        <vs-button class="btn-drop settingsBtn"  @click="tableControl=true">
                            <feather-icon icon="SettingsIcon" class="cursor-pointer" style="width: 18px;"></feather-icon>
                        </vs-button>
                    </vs-tooltip>
                </div>
            </div>
        </div>
        <!-- AgGrid Table-->
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                style="height:250px"
                class="ag-theme-material w-100 my-4 ag-grid-table table-h30"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="PhoneNumbers"
                :rowHeight="30"
                rowSelection="multiple"
                :rowDataChanged = "onRowDataChanged"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="false"
                :pagination="true"
                :paginationPageSize="paginationPageSize"
                @column-resized="onColumnResized"
                @grid-size-changed="onGridSizeChanged"
                :suppressPaginationPanel="true"
                :enableRtl="$vs.rtl"
                :enableBrowserTooltips="true"
                :overlayLoadingTemplate="'Идёт загрузка'"
                :overlayNoRowsTemplate="'Нет записей'">
        </ag-grid-vue>
    
    </fieldset>
    
</template>

<script>
    import r from '../../../route';
    import { mapActions,mapGetters, } from 'vuex'
    import { AgGridVue } from 'ag-grid-vue'
    import axios from '../../../axios'
    export default {
        components: {
            AgGridVue,
        },
        data () {
            return {
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                PhoneNumbers: [
                    {number: "+79591114578", vid:"мобильный"}, 
                    {number: "456213", vid:"домашний"},
                    {number: "89591234571", vid:"рабочий"},
                    {number: "89591234571", vid:"открытые источники"},
                    {number: "89591234571", vid:"иной контакт"}
                ], 
                columnDefs: [
                    {
                        headerName: 'Номер телефона',
                        headerTooltip: 'Номер телефона',
                        tooltipField: '',
                        field: 'number',
                        filter: true,
                        width: 240
                    },
                    {
                        headerName: 'Вид телефона',
                        headerTooltip: 'Вид телефона',
                        field: 'vid',
                        filter: true,
                        width: 250,
                    },
                    {
                        headerName: 'Действия ',
                        headerTooltip: 'Действия ',
                        tooltipField: '',
                        field: 'options',
                        cellStyle: {textAlign: 'center'},
                        template: `<button type="button" name="button" class="vs-component vs-button vs-button-primary vs-button-filled"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone h-4 w-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button><button type="button" name="button" class="vs-component vs-button vs-button-primary vs-button-filled"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit vue-feather__content h-4 w-4"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button><button type="button" name="button" class="vs-component vs-button vs-button-primary vs-button-filled"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-delete vue-feather__content h-4 w-4"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg></button>`,
                        width: 130
                    },
                ],
            }
        },
        mounted(){

        },

        computed: {
           /* ...mapGetters([
                'PhoneNumbers'
            ]),*/

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
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },


        },
    }
</script>
<style>
.table-h30 .ag-cell, .table-h30 .ag-row {
    height: 30px !important;
    line-height: 30px !important;
}
.table-h30 .vs-button {
    padding: 5px !important;
    margin: 1px 2px;
}
</style>