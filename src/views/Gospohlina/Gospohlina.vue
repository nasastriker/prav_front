<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="vx-row">
                    <div class="flex flex-wrap vx-col 2">
                        <vs-dropdown vs-trigger-click class="cursor-pointer">
                            <div class="cursor-pointer flex items-center justify-between font-medium" style="padding: 0.75rem !important;margin-top: 18px;border: 1px solid #ccc;border-radius: 4px;">
                                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalSudPps - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalSudPps }} of {{ TotalSudPps }}</span>
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

                        <div style="margin-left: 15px" class="datepicker">
                            <div class="centerx">
                                <vs-tooltip text="Дата" position="top" >
                                    <h6 class="h6Blue mb-1">Дата</h6>
                                </vs-tooltip>
                            </div>
                            <vs-input type="date" v-model="User.pag.sudPp.datePp" @blur="changeDate" ></vs-input>
                        </div>

                        <div style="margin-left: 15px">
                            <div class="centerx">
                                <vs-tooltip text="Плательщик" position="top" >
                                    <h6 class="h6Blue mb-1">Плательщик</h6>
                                </vs-tooltip>
                            </div>
                            <v-select style="width: 200px;" :options="FilterPpArr" v-model="User.pag.sudPp.filter" @input="changePrintFilter"></v-select>
                        </div>

                        <div style="margin-left: 15px; margin-right: 15px">
                            <div class="centerx">
                                <vs-tooltip text="Поиск по номеру ПП" position="top" >
                                    <h6 class="h6Blue mb-1">Поиск по номеру ПП</h6>
                                </vs-tooltip>
                            </div>
                            <vs-input type="text" placeholder="Номер ПП" v-model="User.pag.sudPp.find" @change="changeFind"></vs-input>
                        </div>
                        
                        
                        <div style="margin: 18px 15px 0 0">
                            <vs-button @click="clearFilter" class="mr-4">Сбросить фильтры</vs-button>
                            <!-- <vs-button style="margin-left:10px;margin-top: 18px;max-height: 40px" color="success" class="pull-right" type="filled" @click="refreshTableAnswerFiles">
                    
                            <svg style="    margin-top: 25px;    cursor: pointer;    max-height: 20px;    padding-right: 80px;" @click="clearFilter" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.88px" height="110.668px" viewBox="0 0 122.88 110.668" enable-background="new 0 0 122.88 110.668" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M91.124,15.645c12.928,0,23.406,10.479,23.406,23.406 c0,12.927-10.479,23.406-23.406,23.406c-12.927,0-23.406-10.479-23.406-23.406C67.718,26.125,78.197,15.645,91.124,15.645 L91.124,15.645z M2.756,0h117.322c1.548,0,2.802,1.254,2.802,2.802c0,0.848-0.368,1.622-0.996,2.139l-10.667,13.556 c-1.405-1.375-2.95-2.607-4.614-3.672l6.628-9.22H9.43l37.975,46.171c0.59,0.516,0.958,1.254,0.958,2.102v49.148l21.056-9.623 V57.896c1.651,1.9,3.548,3.582,5.642,4.996v32.133c0,1.105-0.627,2.064-1.586,2.506l-26.476,12.758 c-1.327,0.773-3.023,0.332-3.798-1.033c-0.258-0.441-0.368-0.92-0.368-1.4V55.02L0.803,4.756c-1.07-1.106-1.07-2.839,0-3.945 C1.355,0.258,2.056,0,2.756,0L2.756,0z M96.93,28.282c1.328-1.349,3.489-1.355,4.825-0.013c1.335,1.342,1.341,3.524,0.013,4.872 l-5.829,5.914l5.836,5.919c1.317,1.338,1.299,3.506-0.04,4.843c-1.34,1.336-3.493,1.333-4.81-0.006l-5.797-5.878l-5.807,5.889 c-1.329,1.349-3.489,1.355-4.826,0.013c-1.335-1.342-1.341-3.523-0.013-4.872l5.83-5.913l-5.836-5.919 c-1.317-1.338-1.3-3.507,0.04-4.843c1.339-1.336,3.492-1.333,4.81,0.006l5.796,5.878L96.93,28.282L96.93,28.282z"/></g></svg>
                            </vs-button> -->
                        </div>

                        <div class="dropdown-button-container" style="margin-top:18px">
                            <vs-button class="btnx" color="danger" type="gradient" @click="downloadPP">Скачать</vs-button>
                            <vs-dropdown>
                                <vs-button class="btn-drop" color="danger" type="gradient" icon="more_horiz"></vs-button>
                                <vs-dropdown-menu>
                                    <vs-dropdown-item>
                                        <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" @click="$router.push('/buh/arch')" style="min-width: 200px;right:10px">История</vs-button>
                                    </vs-dropdown-item>

                                </vs-dropdown-menu>
                            </vs-dropdown>

                        </div>

                    </div>
                </div>

                <!-- <div class="vx-col 2" style="    text-align: end;">


                </div> -->


                <div class="vx-col 1" style="    text-align: end;">
                    <img src="loading.gif" v-if="SudPpFlagLoat" style="max-width: 40px; margin-top: 5px;">

                </div>



            </div>



            <!--Open v-on:editGosPoshlinaTrig="editGosPoshlina"/!-->

            <!-- @grid-size-changed="onGridSizeChanged"
            @column-resized="onColumnResized"
            @column-visible="onColumnVisible" -->
            <ag-grid-vue
                    ref="agGridTable"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="SudPpArr"
                    rowSelection="multiple"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="false"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage"/>

            <vs-popup  classContent="popup-example" title="Госпошлина:" :active.sync="pop">

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
                            <vs-input class="w-100" style="width: 235px; height: 40px;"  v-model="dataEditWindow.number_request_pp"></vs-input>
                            <vs-checkbox class="mt-4" v-model="dataEditWindow.return_gp"  >Возврат ГП </vs-checkbox>
                        </div>
                        <div class="vx-col sm:w-1/3 w-full mb-2" >
                            <h6 class="h6">Дата запроса:<VarToClipboard name="sud_pp_date_request_pp"/></h6>
                            <vs-input class="w-100"  type="date"  v-model="dataEditWindow.date_request_pp"></vs-input>
                            <vs-checkbox class="mt-4" v-model="dataEditWindow.return_gp_true"  >Возврат ГП получен</vs-checkbox>

                        </div>
                        <div class="vx-col sm:w-1/3 w-full mb-2" >
                            <h6 class="h6">Дата ответа на запрос:<VarToClipboard name="sud_pp_date_answer_request"/></h6>
                            <vs-input class="w-100"  type="date"  v-model="dataEditWindow.date_answer_request"></vs-input>
                            <vs-checkbox class="mt-4" v-model="dataEditWindow.answer_request"  >Получено </vs-checkbox>
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
                        <vs-button class="w-1/3 ml-auto"  color="primary" type="filled" @click="load1c">Скачать 1с</vs-button>
                        <div class="w-1/3 ml-auto"></div>
                        <vs-button class="w-1/3 ml-auto"  color="primary" type="filled" @click="saveGosPoshlina">Сохранить</vs-button>
                    </div>
            </vs-popup>
        </div>
    </div>

</template>

<script>
import r from '../../route'
import axios from '../../axios'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import OpenStatus from './Render/OpenStatus.vue'
import OpenCheckReturnGp from './Render/OpenCheckReturnGp.vue'
import OpenCheckReturnGpTrue from './Render/OpenCheckReturnGpTrue.vue'
import OpenCheckPayGp from './Render/OpenCheckPayGp.vue'
import Open from './Render/OpenGos.vue'
import OpenGosType from './Render/OpenGosType.vue'
import moment from 'moment';
export default {
    components: {
        OpenCheckReturnGp,
        OpenCheckReturnGpTrue,
        OpenStatus,
        OpenCheckPayGp,
        Open,
        OpenGosType,
    },
    props:['id'],
    data() {
        return {
            renderEditWindow:{
             typeGosPoshlina:[{id:0,label:'Судебный приказ'}, {id:1,label:'Иск'},{id:2,label:'Доп платеж'}],
            },

            showPP:false,
            summPP:0,
            dataEditWindow:{
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
                    headerTooltip: 'Операции',
                    field: 'id',
                    filter: true,
                    width: 100,
                    cellRendererFramework: 'Open',
                    cellRendererParams: {
                        editGosPoshlina: this.editGosPoshlina.bind(this),
                    },


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
                    width: 100,
                  cellRenderer: params => moment(params.value).format('DD.MM.YYYY')
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
                    width: 130,
                    cellRendererFramework: 'OpenStatus'
                },

                {
                    headerName: 'Номер запроса',
                    headerTooltip: 'Номер запроса',
                    tooltipField: 'number_request_pp',
                    field: 'number_request_pp',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Дата запроса',
                    headerTooltip: 'Дата запроса',
                    tooltipField: 'date_request_pp',
                    field: 'date_request_pp',
                    filter: true,
                    width: 100,
                },
                {
                    headerName: 'Возврат ГП',
                    headerTooltip: 'Возврат госпошлины',
                    tooltipField: 'Возврат госпошлины',
                    field: 'return_gp',
                    filter: true,
                    width: 150,
                    cellRendererFramework: 'OpenCheckReturnGp'
                },
                {
                    headerName: 'Оплачено',
                    headerTooltip: 'Оплачено',
                    tooltipField: 'Оплачено',
                    field: 'gp_pay',
                    filter: true,
                    width: 150,
                    cellRendererFramework: 'OpenCheckPayGp'
                },
                {
                    headerName: 'Возврат ГП получен',
                    headerTooltip: 'Возврат госпошлины получен',
                    tooltipField: 'Возврат госпошлины получен',
                    field: 'return_gp_true',
                    filter: true,
                    width: 200,
                    cellRendererFramework: 'OpenCheckReturnGpTrue'
                },

            ],

            // Cell Renderer Components
            components: {
                Open,OpenGosType,OpenStatus,OpenCheckReturnGp,OpenCheckReturnGpTrue,OpenCheckPayGp
            }
        }
    },

    computed: {
        ...mapGetters([
           'User','SudPpFlagLoat'
        ]),
        totalPages() {
            if (this.gridApi)
                return Math.ceil(this.TotalSudPps / this.paginationPageSize)
            else return 0
        },
        paginationPageSize () {
            if(typeof this.User.pag.sudPp=='undefined'){
                return this.User.pag.sudPp={
                    offset:0,
                    find:null,
                    datePp:null,
                    status:null,


                    limit:100
                }
            }
            if(typeof this.User.pag.sudPp.limit=='undefined'){
                this.User.pag.sudPp.limit=100
            }
            return this.User.pag.sudPp.limit

        },

        currentPage: {
            get() {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
            },
            set(val) {
                if(typeof this.User.pag.sudPp=='undefined'){
                    return this.User.pag.sudPp={
                        offset:0,
                        find:null,
                        datePp:null,
                        status:null,


                        limit:100
                    }
                }
                if(typeof this.User.pag.sudPp.offset=='undefined'){
                    this.User.pag.sudPp.offset=0
                }
                this.User.pag.sudPp.offset=val-1
                this.getDataSudPpAlls(this.User.pag.sudPp);
                this.gridApi.paginationGoToPage(val - 1);
            }
        },
        ...mapGetters([
            'SudPpArr', 'TotalSudPps', 'SudPpData','Deb','User','FilterPpArr'
        ]),
    },
    methods: {
        changeDate(){
            this.setDataUser().then((response) => {
                this.getDataSudPpAlls(this.User.pag.sudPp);
            })
        },
        downloadPP(){
            let flag=true
            if(this.User.pag.sudPp.datePp==null||this.User.pag.sudPp.datePp==''){
                this.$vs.notify({  title:'Ошибка', text: 'Выберите дату !!!', color: 'danger', position: 'top-center' })
                flag=false
            }
            if(this.User.pag.sudPp.filter==null||this.User.pag.sudPp.filter==''){
                this.$vs.notify({  title:'Ошибка', text: 'Выберите организацию !!!', color: 'danger', position: 'top-center' })
                flag=false
            }
            if(flag){

                axios.get(r("sudPp.index"), {
                    params: {
                        method: 'downloadAllCount',
                        param: this.User.pag.sudPp

                    }
                }).then((response) => {
                    if(response.data.result){
                        this.$vs.loading({color: '#ff8000'})
                        axios.get(r("sudPp.index"), {
                            responseType: 'arraybuffer',

                            params: {
                                method: 'downloadAll',
                                param:this.User.pag.sudPp


                            }
                        }).then((response) => {
                            this.getDataSudPpAlls(this.User.pag.sudPp);
                            const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));
                            let filename =decodeURI(response.headers[0]);
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', filename);
                            document.body.appendChild(link);
                            link.click();

                            this.$vs.loading.close()


                        }).catch(error => {
                            this.$vs.loading.close()

                            this.$vs.notify({
                                title: 'Ошибка',
                                text: error.message,
                                color: 'danger',
                                position: 'top-center'
                            })

                        });
                    }else{
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Выгрузка запущенна ожидайте!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    }

                })

            }



        },
         encode_utf8(s) {
            return unescape(encodeURIComponent(s));
        },

         decode_utf8(s) {
            return decodeURIComponent(escape(s));
        },

        validateNumber: event => {
            const charCode = String.fromCharCode(event.keyCode);
            if (!/[0-9]/.test(charCode)) {
                event.preventDefault();
            }
        },
        onColumnResized(params) {
            params.api.resetRowHeights();
        },
        onColumnVisible(params) {
            params.api.resetRowHeights();
        },

        editGosPoshlina(params){
            this.dataEditWindow=params
            this.pop=true
        },
        onrowDoubleClicked(event){
            this.dataEditWindow=event.data
            this.pop=true

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
        clearFilter(){
            if(typeof this.User.pag.sudPp=='undefined'){
                this.User.pag.sudPp={
                    offset:0,
                    find:null,
                    filter:null,
                    datePp:null,
                    status:null,
                    limit:100
                }
            }
            this.User.pag.sudPp.find=null
            this.User.pag.sudPp.filter=null
            this.User.pag.sudPp.datePp=null
            this.setDataUser().then((response) => {
                this.getDataSudPpAlls(this.User.pag.sudPp);

            })
        },
        changePrintFilter(){
            if(typeof this.User.pag.sudPp=='undefined'){
                this.User.pag.sudPp={
                    offset:0,
                    find:null,
                    filter:null,
                    datePp:null,
                    status:null,
                    limit:100
                }
            }

            this.setDataUser().then((response) => {
                this.getDataSudPpAlls(this.User.pag.sudPp);

            })
        },
        changeFind(){
            if(typeof this.User.pag.sudPp=='undefined'){
                this.User.pag.sudPp={
                    offset:0,
                    find:null,
                    filter:null,
                    datePp:null,
                    status:null,
                    limit:100
                }
            }

            this.setDataUser().then((response) => {
                this.getDataSudPpAlls(this.User.pag.sudPp);

            })
        },
        changePag(pag){
            if(typeof this.User.pag.sudPp=='undefined'){
                this.User.pag.sudPp={
                    offset:0,
                    find:null,
                    datePp:null,
                    filter:null,
                    status:null,
                    limit:100
                }
            }
            this.User.pag.sudPp.limit=pag

            this.setDataUser().then((response) => {
                this.getDataSudPpAlls(this.User.pag.sudPp);

            })


            this.gridApi.paginationSetPageSize(pag)
        },
        updateSearchQuery (val) {
            this.User.pag.sudPp.find=val

            this.getDataSudPpAlls(this.User.pag.sudPp);

        },

        onRowDataChanged () {
            Vue . nextTick (() => {
                    this.gridOptions.api.sizeColumnsToFit();
                }
            );
        },
        load1c(){


            axios.post(r("sudPp.update"), {
                params: {
                    method: 'saveSudPpsGosPoshlina',
                    param: this.dataEditWindow

                }
            }).then((response) => {
                if(response){
                    this.$vs.loading({color: '#ff8000'})
                    axios.get(r("sudPp.index"), {
                        responseType: 'arraybuffer',

                        params: {
                            method: 'load1c',
                            param:this.dataEditWindow.id


                        }
                    }).then((response) => {
                        this.pop=false;
                        const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/zip;charset=UTF-8;' }));

                        let filename=response.headers['content-disposition'].replace('attachment; filename=', '');

                        filename = filename.split('; filename*=utf')[0];

                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', filename);
                        document.body.appendChild(link);
                        link.click();

                        this.$vs.loading.close()


                    }).catch(error => {
                        this.$vs.loading.close()
                        //   this.popupActive3=false;
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: error.message,
                            color: 'danger',
                            position: 'top-center'
                        })

                    });
                }
                else{
                    this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                }


            })




        },
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
        ...mapMutations([
            'setQuerySudPpLimit','setQuerySudPpOffset'
        ]),
        ...mapActions([
            'getDataSudPpAlls','saveSudPpsGosPoshlina','getDataDebtorsById','setDataUser','getFilterPpArr'
        ]),
    },
    mounted() {
        this.gridApi = this.gridOptions.api
        this.getDataSudPpAlls(this.User.pag.sudPp);
        this.getFilterPpArr();
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
