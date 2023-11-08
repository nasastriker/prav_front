<template>
    <div id="page-user-list">
        <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col sm:w-1/5 w-full mb-2">
                <Back></Back>

            </div>
            <div class="vx-col sm:w-3/5 w-full mb-2">
                <h4 style="margin-bottom: 15px">{{ReestrsName}} Сумма : {{SumAll}}</h4>
            </div>

        </div>
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-3 cursor-pointer flex items-center justify-between font-medium" style="margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalReestrsGosposhlinaOnce - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalReestrsGosposhlinaOnce }} of {{ TotalReestrsGosposhlinaOnce }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
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


                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                </div>
                <v-select  class="w-50 " style="margin-bottom: 10px; min-width:200px;" :reduce="label => label.id" label="name" :options="statusArr"   v-model="status" @input="setStatus" ></v-select>

                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                    <span style="color:#b3b3b3;padding-right: 10px;">Проблемнные: {{SumBad}}</span>
                    <span style="color: green;padding-right: 10px;">Сумма: {{SumGood}}</span>
                    <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />


                </div>
            </div>
            <vs-popup  classContent="popup-example" title="Госпошлина:" :active.sync="pop">
                <div >
                    <h6 class="h6" style="margin-left: 5px">ID Кредита:</h6>
                    <vs-input style="margin-left: 5px" class="w-100"  v-model="dataEditWindow.id_debcredit"></vs-input>
                </div>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/3 w-full mb-2" >
                        <h6 class="h6">Стадия:<VarToClipboard name="sud_pp_type_pp"/></h6>
                        <v-select  class="w-100 "  :reduce="label => label.id" label="label" :options="renderEditWindow.typeGosPoshlina"  v-model="dataEditWindow.type_pp"    ></v-select>
                    </div>
                    <div class="vx-col sm:w-1/3 w-full mb-2" >
                        <h6 class="h6">Дата:<VarToClipboard name="sud_pp_date_pp"/></h6>
                        <vs-input class="w-100"  type="date"  v-model="dataEditWindow.date_pp"></vs-input>
                    </div>
                    <div class="vx-col sm:w-1/3 w-full mb-2" >
                        <h6 class="h6">Номер ПП:<VarToClipboard name="sud_pp_number"/></h6>
                        <vs-input class="w-100"  v-model="dataEditWindow.number"></vs-input>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/3 w-full mb-2" >
                        <h6 class="h6">Номер запроса:<VarToClipboard name="sud_pp_number_request_pp"/></h6>
                        <vs-input class="w-100"  v-model="dataEditWindow.number_request_pp"></vs-input>
                    </div>
                    <div class="vx-col sm:w-1/3 w-full mb-2" >
                        <h6 class="h6">Дата запроса:<VarToClipboard name="sud_pp_date_request_pp"/></h6>
                        <vs-input class="w-100"  type="date"  v-model="dataEditWindow.date_request_pp"></vs-input>
                    </div>
                    <div class="vx-col sm:w-1/3 w-full mb-2" >
                        <h6 class="h6">Дата ответа на запрос:<VarToClipboard name="sud_pp_date_answer_request"/></h6>
                        <vs-input class="w-100"  type="date"  v-model="dataEditWindow.date_answer_request"></vs-input>
                        <vs-checkbox  v-model="dataEditWindow.answer_request"  >Получено </vs-checkbox>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-2" >

                        <fieldset class="f" style="margin-top:15px; ">
                            <legend class="l">Реквизиты плательщика:</legend>
                            <div class="vx-row" style="padding-left: 20px;border-color: #62626262;">
                                <div class="vx-col" >
                                    <h6 class="h6">Плательщик:<VarToClipboard name="sud_pp_org_payee"/></h6>
                                    <vs-input class="w-100"  v-model="dataEditWindow.org_payee"></vs-input>
                                    <h6 class="h6">Счет плательщика:<VarToClipboard name="sud_pp_acc_payee"/></h6>
                                    <vs-input class="w-100"  type="number"  @keypress="validateNumber"   v-model="dataEditWindow.acc_payee"></vs-input>
                                    <h6 class="h6">ИНН:<VarToClipboard name="sud_pp_inn_payee"/></h6>
                                    <vs-input class="w-100"  type="number"  @keypress="validateNumber"  v-model="dataEditWindow.inn_payee"></vs-input>
                                    <h6 class="h6">КПП:<VarToClipboard name="sud_pp_kpp_payee"/></h6>
                                    <vs-input class="w-100"  type="number"  @keypress="validateNumber" v-model="dataEditWindow.kpp_payee"></vs-input>
                                    <h6 class="h6">Банк плательщика:<VarToClipboard name="sud_pp_bank_name_payee"/></h6>
                                    <vs-input class="w-100"  v-model="dataEditWindow.bank_name_payee"></vs-input>

                                    <h6 class="h6">БИК Банка:<VarToClipboard name="sud_pp_bank_bic_payee"/></h6>
                                    <vs-input class="w-100"  type="number"  @keypress="validateNumber"  v-model="dataEditWindow.bank_bic_payee"></vs-input>
                                    <h6 class="h6">Корр счет:<VarToClipboard name="sud_pp_bank_ks_payee"/></h6>
                                    <vs-input class="w-100"  type="number"  @keypress="validateNumber"  v-model="dataEditWindow.bank_ks_payee"></vs-input>
                                    <h6 class="h6">ТП:<VarToClipboard name="sud_pp_tnp_payee"/></h6>
                                    <vs-input class="w-100"  v-model="dataEditWindow.tnp_payee"></vs-input>
                                    <h6 class="h6">Город банка плательщика:<VarToClipboard name="sud_pp_city_payee"/></h6>
                                    <vs-input class="w-100"  v-model="dataEditWindow.city_payee"></vs-input>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2" >
                        <fieldset class="f" style="margin-top:15px ">
                            <legend class="l">Реквизиты получателя:</legend>
                            <div class="vx-row" style="padding-left: 20px;border-color: #62626262;">
                                <div class="vx-col" >
                                    <h6 class="h6">Получатель:<VarToClipboard name="sud_pp_name_recip"/></h6>
                                    <vs-input class="w-100"  v-model="dataEditWindow.name_recip"></vs-input>
                                    <h6 class="h6">Счет получателя:<VarToClipboard name="sud_pp_acc_recip"/></h6>
                                    <vs-input class="w-100" type="number"  @keypress="validateNumber"  v-model="dataEditWindow.acc_recip"></vs-input>
                                    <h6 class="h6">ИНН:<VarToClipboard name="sud_pp_inn_recip"/></h6>
                                    <vs-input class="w-100" type="number"  @keypress="validateNumber"  v-model="dataEditWindow.inn_recip"></vs-input>
                                    <h6 class="h6">КПП:<VarToClipboard name="sud_pp_kpp_recip"/></h6>
                                    <vs-input class="w-100"  type="number"  @keypress="validateNumber"  v-model="dataEditWindow.kpp_recip"></vs-input>
                                    <h6 class="h6">Банк получателя:<VarToClipboard name="sud_pp_bank_recip"/></h6>
                                    <vs-input class="w-100" style="margin-top:5px; margin-bottom: 5px;min-width:200px;" v-model="dataEditWindow.bank_recip"></vs-input>
                                    <h6 class="h6">БИК Банка:<VarToClipboard name="sud_pp_bank_bic_recip"/></h6>
                                    <vs-input class="w-100" type="number"  @keypress="validateNumber"  v-model="dataEditWindow.bank_bic_recip"></vs-input>
                                    <h6 class="h6">Корр счет:<VarToClipboard name="sud_pp_bank_ks_recip"/></h6>
                                    <vs-input class="w-100" type="number"  @keypress="validateNumber"  v-model="dataEditWindow.bank_ks_recip"></vs-input>
                                    <h6 class="h6">ТП:<VarToClipboard name="sud_pp_tnp_recip"/></h6>
                                    <vs-input class="w-100"  v-model="dataEditWindow.tnp_recip"></vs-input>
                                    <h6 class="h6">Город банка получателя:<VarToClipboard name="sud_pp_city_recip"/></h6>
                                    <vs-input class="w-100"  v-model="dataEditWindow.city_recip"></vs-input>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/3 w-full mb-2" >
                        <h6 class="h6">КБК:<VarToClipboard name="sud_pp_kbk"/></h6>
                        <vs-input class="w-100" type="number"  @keypress="validateNumber" style="margin-top:5px; margin-bottom: 5px;" v-model="dataEditWindow.kbk"></vs-input>
                    </div>
                    <div class="vx-col sm:w-1/3 w-full mb-2" >
                        <h6 class="h6">ОКАТО:<VarToClipboard name="sud_pp_okato"/></h6>
                        <vs-input class="w-100"  type="number"  @keypress="validateNumber" style="margin-top:5px; margin-bottom: 5px;" v-model="dataEditWindow.okato"></vs-input>
                    </div>
                    <div class="vx-col sm:w-1/3 w-full mb-2" >
                        <h6 class="h6">Сумма:<VarToClipboard name="sud_pp_sum"/></h6>
                        <vs-input type="number" class="w-100"  style="margin-top:5px; margin-bottom: 5px;" v-model="dataEditWindow.sum"></vs-input>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col" >
                        <h6 class="h6">Основание:<VarToClipboard name="sud_pp_appointment"/></h6>
                        <vs-textarea class="w-100" label="Основание" style="margin-top:5px; margin-bottom: 5px;margin-left: 10px;margin-right: 10px;min-width:700px;min-height: 80px;" v-model="dataEditWindow.appointment"></vs-textarea>
                    </div>
                </div>
                <div class="flex flex-wrap">
                    <vs-button class="w-1/3 ml-auto"  color="primary" type="filled" @click="saveGosPoshlina">Сохранить</vs-button>

                    <div class="w-1/3 ml-auto"></div>
                    <vs-button class="w-1/3 ml-auto"  color="primary" type="filled" @click="pop=false">Отмена</vs-button>
                </div>
            </vs-popup>
            <!-- AgGrid Table -->
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="SudPpReestrGosposhlina"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
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
    import { AgGridVue } from 'ag-grid-vue'
    import vSelect from 'vue-select'
    import Back from '../../components/Back.vue'
    import OpenStatus from './Render/OpenStatus.vue'
    import Open from './Render/OpenGos.vue'
    import OpenGosType from './Render/OpenGosType.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import OpenStatusFind from './Render/OpenStatusFind.vue'
    import r from '../../route';
    import axios from '../../axios'
    import VarToClipboard from './../VarToClipboard.vue'
    export default {
        components: {
            AgGridVue,
            Back,
            OpenStatusFind,
            vSelect,
            Open,OpenGosType,OpenStatus,VarToClipboard
        },
        data () {
            return {
                dataEditWindow:{
                    id_debcredit:0,
                    id:0,
                    number:0, // Номер
                    date_pp:'', //Дата
                    sum:0,	//Cумма
                    type_pp:0, //Тип
                    acc_payee:0, //Счет плат.
                    org_payee:'', //Плательшик
                    inn_payee:0, //ИНН плат.
                    kpp_payee:0, //КПП плат.
                    bank_name_payee:'', //Банк плат.
                    bank_city_payee:'', //Город Банк плат.
                    bank_bic_payee:0, //БИК Банк плат.
                    bank_ks_payee:0, //КС Банк плат.
                    acc_recip:0, //Счет пол.
                    name_recip:'', //Получатель
                    inn_recip:0, //ИНН пол.
                    kpp_recip:0, //КПП пол.
                    bank_recip:'', //Банк пол.
                    bank_bic_recip:0, //БИК Банк пол.
                    bank_ks_recip:0, //КС Банк пол.
                    appointment:'', //Основание
                    okato:0, //Окато
                    tnp_payee:'',
                    city_payee:'',
                    tnp_recip:'',
                    city_recip:'',
                    kbk:0, //КБК
                    number_request_pp:'', // Номер запроса
                    date_request_pp:''    ,// Дата запроса
                    date_answer_request:''// Дата ответа на запроса
                },
                pop:false,
                renderEditWindow:{
                    typeGosPoshlina:[{id:0,label:'Судебный приказ'}, {id:1,label:'Иск'},{id:2,label:'Доп платеж'}],
                },

                showPP:false,
                summPP:0,
                sudPpReestr:{
                    reestrName:'',
                    sum:0,
                    probSum:0,
                },
                ReestrsName:'',
                SumAll:0,
                SumGood:0,
                SumBad:0,
                status:0,
                results: null,
                help: 'Necessary columns are: login, firstname and lastname',
                tableData: [],
                header: [],
                sheetName: '',
                searchQuery: '',
                statusArr:[{id:0,name:'Все'},{id:1,name:'Обработанные'},{id:2,name:'Проблемные'}],
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
                        headerName: 'Операции',
                        field: 'id',
                        filter: true,
                        width: 100,
                        cellRendererFramework: 'Open',
                        cellRendererParams: {
                            editGosPoshlina: this.editGosPoshlina.bind(this),
                        },


                    },
                    {
                        headerName: 'Привязка',
                        headerTooltip: 'Привязка',
                        tooltipField: 'status_find',
                        field: 'status_find',
                        filter: true,
                        width: 140,
                        cellRendererFramework: 'OpenStatusFind',



                    },
                    {
                        headerName: 'Номер',
                        headerTooltip: 'Номер',
                        tooltipField: 'number',
                        field: 'number',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Дата',
                        headerTooltip: 'Дата',
                        tooltipField: 'date_pp',
                        field: 'date_pp',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Сумма',
                        headerTooltip: 'Сумма',
                        tooltipField: 'sum',
                        field: 'sum',
                        filter: true,
                        width: 100
                    },
                    {
                        headerName: 'Тип',
                        headerTooltip: 'Тип',
                        tooltipField: 'type_pp',
                        field: 'type_pp',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenGosType'
                    },
                    {
                        headerName: 'Счет плат.',
                        headerTooltip: 'Счет плательщика',
                        tooltipField: 'acc_payee',
                        field: 'acc_payee',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Плательшик',
                        headerTooltip: 'Плательшик',
                        tooltipField: 'org_payee',
                        field: 'org_payee',
                        filter: true,
                        width: 200
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'status',
                        field: 'status',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'OpenStatus'
                    },

                    {
                        headerName: 'Номер запроса',
                        headerTooltip: 'Номер запроса',
                        tooltipField: 'number_request_pp',
                        field: 'number_request_pp',
                        filter: true,
                        width: 150
                    },
                    {
                        headerName: 'Дата запроса',
                        headerTooltip: 'Дата запроса',
                        tooltipField: 'date_request_pp',
                        field: 'date_request_pp',
                        filter: true,
                        width: 120
                    },

                ],

                // Cell Renderer Components
                components: {
                    Open,OpenGosType,OpenStatus,OpenStatusFind
                }
            }
        },

        computed: {
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalReestrsGosposhlinaOnce/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                if(typeof this.User!='undefined'){
                    if(this.User.pag!=null){
                        if(typeof this.User.pag!='undefined'){
                            if(typeof this.User.pag.importGosposhlina!='undefined') {
                                return this.User.pag.importGosposhlina.limit
                            }
                            else return 10
                        }
                        else return 10
                    }
                    else return 10
                }
                else return 10

            },
            ...mapGetters([
               // 'PaymentAllsArr','TotalPaymentAlls','StatussArr','User','StatussArrPaymentAndAll','PaymentReestrsName','PaymentSum','PaymentSumProb','PaymentSumAll'
                   'SudPpReestrGosposhlina','TotalReestrsGosposhlinaOnce','User'
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
            ...mapActions([
                'getDataReestrsGosposhlinaOnce','getDataUser','setDataUser',
            ]),
            ...mapMutations([
               // 'setQueryPaymentsLimit','setQueryPaymentsOffset'
            ]),
            saveGosPoshlina(){
                axios.post(r("sudPp.update"), {
                    params: {
                        method: 'saveSudPpsGosPoshlina',
                        param: this.dataEditWindow

                    }
                }).then((response) => {
                    if(response.data.result){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.pop=false;
                        this.getDataSudPpAlls(this.User.pag.sudPp)
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }


                })
            },
            validateNumber: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            editGosPoshlina(params){
                this.dataEditWindow=params
                this.pop=true
            },
            onrowDoubleClicked(event){
                this.dataEditWindow=event.data
                this.pop=true

            },
            setStatus(){
                if(this.status===null)this.status=0
                this.User.pag.importGosposhlina.status=this.status
                this.setDataUser().then(res=>{
                    this.getDataReestrsGosposhlinaOnce(  {
                        id:this.$route.params.id,
                        status:this.status,
                    }).then(res=>{
                        if(res.result){
                            this.SumGood=res.sumGood
                            this.SumBad=res.sumBad
                            this.SumAll=this.SumGood+this.SumBad
                            this.ReestrsName=res.reestr.name
                        }
                    })
                })
            },

            changePag(pag){
                this.gridApi.paginationSetPageSize(pag)
                this.User.pag.importGosposhlina.limit=pag
                this.setDataUser()
            },
            onValidate(results) {
                this.results = results;
            },

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
            this.getDataUser().then(res=>{
                this.status=this.User.pag.importGosposhlina.status||0
                this.getDataReestrsGosposhlinaOnce(  {
                    id:this.$route.params.id,
                    status:this.status,
                }).then(res=>{
                    if(res.result){
                        this.SumGood=res.sumGood
                        this.SumBad=res.sumBad
                        this.SumAll=this.SumGood+this.SumBad
                        this.ReestrsName=res.reestr.name
                    }
                })
            if(typeof this.User.pag.importGosposhlina.limit!=='undefined')this.changePag(this.User.pag.importGosposhlina.limit)
            })

        }
    }


</script>

<style>
    .router-view {
        padding: 1.2rem;
    }
    .ag-theme-material.w-100.my-4.ag-grid-table {
        /*height: 80vh;*/
    }
    .ag-theme-material .ag-ltr .ag-cell {
        border-right: 1px solid #bfbfbf!important;
    }
    .ag-theme-material .ag-row {
        border-color: #bfbfbf!important;
    }
</style>

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

    .plan-group {
        background-color: #2E8B57;
        color: white;
    }

    .fact-group {
        background-color: #4682B4;
        color: white;
    }

    .new-task {
        font-weight: bolder;
    }

    .cell-succ {
        background-color: #00FF00;
    }
    .cell-warn {
        background-color: #FFA07A;
    }

</style>
<style lang="scss">
    .con-vs-popup {
        z-index: 53000;

        .vs-popup {
            width: 800px !important; //You can change the width according to your content
            height: auto;
        }
        .vs-popup--content {
            width: auto !important;
            padding: 1rem;
            font-size: 1rem;
        }
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
    .con-vs-pagination{
        margin-right: 40px!important;
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
