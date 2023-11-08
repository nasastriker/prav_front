<template>
    <div>
        <div class="flex flex-wrap justify-between items-center">
            <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                <vs-dropdown vs-trigger-click class="cursor-pointer">
                    <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
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
            </div>
            <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">


                    <vs-button class="mb-4 md:mb-0 mr-4"  color="primary" style="min-width: 200px;right:10px" @click="genPP">Создать пп</vs-button>


            </div>
        </div>



        <!--Open v-on:editGosPoshlinaTrig="editGosPoshlina"/!-->

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
            :enableRtl="$vs.rtl">
        </ag-grid-vue>

        <vs-pagination
            :total="totalPages"
            :max="7"
            v-model="currentPage"/>

        <vs-popup style="min-height: 500px;" classContent="popup-example" title="Госпошлина:" :active.sync="pop">
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
                  <vs-tooltip text="Номер запроса оригинала ПП" position="top" >
                    <h6 class="h6">Номер запроса:<VarToClipboard name="sud_pp_number_request_pp"/></h6>
                  </vs-tooltip>

                    <vs-input class="w-100"  v-model="dataEditWindow.number_request_pp"></vs-input>

                  <vs-tooltip text="Требуется вернуть ГП, при активной галочки ГП в расчете не учитывается" position="top" >
                    <vs-checkbox style="margin-top: 10px" v-model="dataEditWindow.return_gp"  @change="saveGosPoshlina">Возврат ГП </vs-checkbox>
                  </vs-tooltip>
                </div>
                <div class="vx-col sm:w-1/3 w-full mb-2" >
                    <vs-tooltip text="Дата запроса оригинала ПП" position="top" >
                    <h6 class="h6">Дата запроса:<VarToClipboard name="sud_pp_date_request_pp"/></h6>
                    </vs-tooltip>
                    <vs-input class="w-100"  type="date"  v-model="dataEditWindow.date_request_pp"></vs-input>
                  <vs-tooltip text="Признак того что ГП возвращена" position="top" >
                    <vs-checkbox style="margin-top: 10px" v-model="dataEditWindow.return_gp_true"  @change="saveGosPoshlina">Возврат ГП получен</vs-checkbox>
                  </vs-tooltip>

                </div>
                <div class="vx-col sm:w-1/3 w-full mb-2" >
                  <vs-tooltip text="Дата ответа на запрос оригинала ПП" position="top" >
                    <h6 class="h6">Дата ответа на запрос:<VarToClipboard name="sud_pp_date_answer_request"/></h6>
                  </vs-tooltip>
                    <vs-input class="w-100"  type="date"  v-model="dataEditWindow.date_answer_request"></vs-input>
                  <vs-tooltip text="Признак того что запрос оригинала ПП получен" position="top" >
                    <vs-checkbox style="margin-top: 10px" v-model="dataEditWindow.answer_request"  @change="saveGosPoshlina">Ответ получен </vs-checkbox>
                  </vs-tooltip>
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
                    <h6 class="h6">ОКТМО:<VarToClipboard name="sud_pp_okato"/></h6>
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

</template>

<script>
import r from '../../../route'
import axios from '../../../axios'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import Open from './Render/OpenGos.vue'
import OpenGosType from './Render/OpenGosType.vue'
import VarToClipboard from './../../VarToClipboard.vue'
export default {
    components: {
        Open,
        OpenGosType,VarToClipboard,
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
                    field: 'id',
                    filter: true,
                    width: 150,
                    cellRendererFramework: 'Open',
                    cellRendererParams: {
                        editGosPoshlina: this.editGosPoshlina.bind(this),
                    },


                },

                {
                    headerName: 'Номер',
                    field: 'number',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Дата',
                    field: 'date_pp',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Сумма',
                    field: 'sum',
                    filter: true,
                    width: 200
                },
                {
                    headerName: 'Тип',
                    field: 'type_pp',
                    filter: true,
                    width: 200,
                    cellRendererFramework: 'OpenGosType'
                },
                {
                    headerName: 'Счет плат.',
                    field: 'acc_payee',
                    filter: true,
                    width: 200
                },
                {
                    headerName: 'Плательшик',
                    field: 'org_payee',
                    filter: true,
                    width: 200
                },
                {
                    headerName: 'ИНН плат.',
                    field: 'inn_payee',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'КПП плат.',
                    field: 'kpp_payee',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Банк плат.',
                    field: 'bank_name_payee',
                    filter: true,
                    width: 200
                },
                {
                    headerName: 'Город Банк плат.',
                    field: 'bank_city_payee',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'БИК Банк плат.',
                    field: 'bank_bic_payee',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'КС Банк плат.',
                    field: 'bank_ks_payee',
                    filter: true,
                    width: 200
                },
                {
                    headerName: 'Счет пол.',
                    field: 'acc_recip',
                    filter: true,
                    width: 200
                },
                {
                    headerName: 'Получатель',
                    field: 'name_recip',
                    filter: true,
                    width: 200
                },
                {
                    headerName: 'ИНН пол.',
                    field: 'inn_recip',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'КПП пол.',
                    field: 'kpp_recip',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Банк пол.',
                    field: 'bank_recip',
                    filter: true,
                    width: 200
                },
                {
                    headerName: 'БИК Банк пол.',
                    field: 'bank_bic_recip',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'КС Банк пол.',
                    field: 'bank_ks_recip',
                    filter: true,
                    width: 200
                },
                {
                    headerName: 'Основание',
                    field: 'appointment',
                    filter: true,
                    width: 500
                },
                {
                    headerName: 'Окато',
                    field: 'okato',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'КБК',
                    field: 'kbk',
                    filter: true,
                    width: 200
                },
                {
                    headerName: 'Номер запроса',
                    field: 'number_request_pp',
                    filter: true,
                    width: 100
                },
                {
                    headerName: 'Дата запроса',
                    field: 'date_request_pp',
                    filter: true,
                    width: 100
                },

            ],

            // Cell Renderer Components
            components: {
                Open,OpenGosType
            }
        }
    },

    computed: {
        totalPages() {
            if (this.gridApi)
                return Math.ceil(this.TotalSudPps / this.paginationPageSize)
            else return 0
        },
        paginationPageSize() {
            return this.SudPpData.pag.limit
        },
        currentPage: {
            get() {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
            },
            set(val) {
                this.setQuerySudPpOffset(val-1);
                this.getDataSudPps(this.Deb.debtorCredit.id);
                this.gridApi.paginationGoToPage(val - 1);
            }
        },
        ...mapGetters([
            'SudPpArr', 'TotalSudPps', 'SudPpData','Deb','User'
        ]),
    },
    methods: {
        genPP(){
            this.$vs.loading({color: '#ff8000'})
            this.dataEditWindow.id_debcredit=this.Deb.debtorCredit.id
            axios.get(r("sudPp.index"), {
                params: {
                    method: 'getPPRec',
                    param: this.Deb.debtorCredit.id

                }
            }).then((response) => {
                this.$vs.loading.close()
                if(response.data.result){
                    this.dataEditWindow=response.data.data
                    this.dataEditWindow.id_debcredit=this.Deb.debtorCredit.id
                    this.pop=true
                }else{
                    this.pop=true
                }



            }).catch(error => {
                this.$vs.loading.close()
                this.pop=true

            });

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
        changePag(pag) {
            this.SudPpData.pag.limit = pag;
            this.getDataSudPps(this.Deb.debtorCredit.id);
            this.setQuerySudPpLimit(pag);
            this.gridApi.paginationSetPageSize(pag);
        },
        load1c(){


            axios.post(r("sudPp.update"), {
                params: {
                    method: 'saveSudPpsGosPoshlina',
                    param: this.dataEditWindow

                }
            }).then((response) => {
                if(response.data.result){
                    this.$vs.loading({color: '#ff8000'})
                    this.getDataSudPps(this.Deb.debtorCredit.id)
                    axios.get(r("sudPp.index"), {
                        responseType: 'arraybuffer',

                        params: {
                            method: 'load1c',
                            param:response.data.data


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
                    this.getDataSudPps(this.Deb.debtorCredit.id)
                    this.getDataDebtorsById(this.Deb.debtorCredit.id)
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
            'getDataSudPps','saveSudPpsGosPoshlina','getDataDebtorsById'
        ]),
    },
    mounted() {
        this.gridApi = this.gridOptions.api
        this.getDataSudPps(this.Deb.debtorCredit.id);
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
