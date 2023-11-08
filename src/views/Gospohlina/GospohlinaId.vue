<template>
    <div>


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


    </div>

</template>

<script>
    import r from '../../route'
    import axios from '../../axios'
    import vSelect from 'vue-select'
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import VarToClipboard from './../VarToClipboard.vue'
    export default {
        components: {

            vSelect,VarToClipboard,
        },
        props:['id'],
        data() {
            return {
                renderEditWindow:{
                    typeGosPoshlina:[{id:0,label:'Судебный приказ'}, {id:1,label:'Иск'},{id:2,label:'Доп платеж'}],
                },


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


            }
        },

        computed: {

            ...mapGetters([
                'User'
            ])

        },
        watch: {
            id: function(newVal, oldVal) { // watch it
                this.loadPp(newVal)
            }
        },
        methods: {

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
            loadPp(id){
                axios.get(r("sudPp.update"), {
                    params: {
                        method: 'getSudPpById',
                        param: id

                    }
                }).then((response) => {
                    if(response.data.result){
                        this.pop=true;
                        this.dataEditWindow=response.data.data
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
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }


                })
            },
            ...mapMutations([
            ]),
            ...mapActions([
            ]),
        },
        mounted() {

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
