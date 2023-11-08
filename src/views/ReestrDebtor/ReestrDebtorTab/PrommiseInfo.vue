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
            <vs-button  color="danger" class="btn-drop settingsBtn"  @click="obeshanieModal = true">
                Добавить обещание
            </vs-button>
            <vs-popup
            classContent="selectModal"
            class="selectModalWrapper"
            title="Добавить обещание платежа"
            :active.sync="obeshanieModal"
          >
            <div class="vx-row">
              <div class="vx-col w-full">
                <h6 class="mb-1 h6">Выбрать договор должника:</h6>
                <v-select
                  class="w-50"
                  label="name"
                  style="margin-bottom: 40px"
                ></v-select>
              </div></div>
              <div class="vx-row">
                <div class="vx-col w-1/2">
                  <h6 class="mb-1 h6">Ввести сумму платежа:</h6>
                  <vs-input class="w-full"></vs-input>
                </div>
                <div class="vx-col w-1/2">
                  <h6 class="mb-1 h6">Выбрать дату платежа:</h6>
                <vs-input class=" w-full datepicker w-100" type="date"></vs-input>
                </div>
                </div>
                <div class="obeshanie-more"></div>
                <div class="vx-row mt-3"><div class="vx-col w-full text-right">
                    <vs-button  color="danger" class="btn-drop settingsBtn"  @click="addObeshanie()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle vue-feather__content w-4 h-4"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </vs-button>
                </div></div>
            <div class="vx-row">
      
              <div class="vx-col w-1/2 w-full text-center">
                <vs-button
                  class="mt-6 ml-auto successBtn"
                  @click="obeshanieModal = false"
                  color="success"
                  type="filled"
                  >Сохранить</vs-button
                >
              </div>
            </div>
          </vs-popup>
        </div>
        <!-- AgGrid Table-->
        <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                style="height:400px"
                class="ag-theme-material w-100 my-4 ag-grid-table table-h30"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="CreditInfo"
                rowSelection="multiple"
                :rowHeight="30"
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
        <vs-pagination
                :total="totalPages"
                :max="7"
                v-model="currentPage" /> 

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
                obeshanieModal: false,
                CreditInfo: [{date: ''}], 
                columnDefs: [

                    {
                        headerName: 'Дата Обещания платежа',
                        headerTooltip: 'Дата Обещания платежа',
                        tooltipField: '',
                        field: 'date',
                        filter: true,
                        width: 250
                    },
                    {
                        headerName: 'Срок Обещания платежа',
                        headerTooltip: 'Срок Обещания платежа',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 250
                    },
                    {
                        headerName: 'Сумма обещания платежа',
                        headerTooltip: 'Сумма обещания платежа',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 250
                    },
                    {
                        headerName: 'Статус обещания платежа',
                        headerTooltip: 'Статус обещания платежа',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 250
                    },
                    {
                        headerName: 'Остаток долга + ГП',
                        headerTooltip: 'Остаток долга + ГП',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width:250
                    },
                    {
                        headerName: 'Номер договора',
                        headerTooltip: 'Номер договора',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 250
                    },
                    {
                        headerName: 'Взыскатель',
                        headerTooltip: 'Взыскатель',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Цедент',
                        headerTooltip: 'Цедент',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Номер цессии',
                        headerTooltip: 'Номер цессии',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width:200
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Стратегия взаимодействия',
                        headerTooltip: 'Стратегия взаимодействия',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 250
                    },
                    {
                        headerName: 'Вид взаимодействия',
                        headerTooltip: 'Вид взаимодействия',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Оператор',
                        headerTooltip: 'Оператор',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Действия ',
                        headerTooltip: 'Действия ',
                        tooltipField: '',
                        field: '',
                        width: 120, 
                        cellStyle: {textAlign: 'center'},
                        template: `<button type="button" name="button" class="vs-component vs-button vs-button-primary vs-button-filled"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit vue-feather__content h-4 w-4"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button><button type="button" name="button" class="vs-component vs-button vs-button-primary vs-button-filled"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-delete vue-feather__content h-4 w-4"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg></button><button type="button" name="button" class="vs-component vs-button vs-button-primary vs-button-filled"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-fast-forward vue-feather__content w-4 h-4"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg></button>`,
                    },
                ],
            }
        },
        mounted(){

        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalMinimalPensions/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 100
            },
            /*...mapGetters([
                'CreditInfo'
            ]),*/

        },
        methods: {
            addObeshanie(){
                var htmlObject = document.createElement('div');
                htmlObject.innerHTML = '<div class="vx-row mt-3"><div class="vx-col w-1/2"><h6 class="mb-1 h6">Ввести сумму платежа:</h6><div class="vs-component vs-con-input-label vs-input w-full vs-input-primary"><!----><div class="vs-con-input"><input type="text" class="vs-inputx vs-input--input normal" style="border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!----><!----></div><span></span></div></div><div class="vx-col w-1/2"><h6 class="mb-1 h6">Выбрать дату платежа:</h6><div class="vs-component vs-con-input-label vs-input w-full datepicker w-100 vs-input-primary"><!----><div class="vs-con-input"><input type="date" class="vs-inputx vs-input--input normal" style="border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!----><!----></div><span></span></div></div></div>'
                document.querySelector('.obeshanie-more').append(htmlObject)
            },
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
