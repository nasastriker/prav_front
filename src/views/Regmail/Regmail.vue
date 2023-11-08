<template>
    <div>
        <vs-tabs>
            <vs-tab label="Результат">
        <fieldset class="f" style="margin-top: 15px" >
            <legend class="l">{{Deb.debtor.name_family}} {{Deb.debtor.name}} {{Deb.debtor.name_patronymic}}:</legend>
            <div class="vx-row" style="padding-top: 20px;padding-left: 10px; padding-right: 10px">
                <div class="vx-col sm:w-1/4 w-full mb-2">
                    <template v-if="typeof Deb.debtorCredit.id!='undefined'">
                        <Status :id_credit="Deb.debtorCredit.id" class="h6" ref="status"></Status>
                    </template>
                    <h6 class="h6">Особые пометки:</h6>
                    <vs-textarea class="w-100"  v-model="Deb.debtorCredit.comment" @change="changeDeb"> </vs-textarea>
                    <h6 class="h6">Взыскатель:</h6>
                    <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                        <div class="vs-con-input"><input type="text"
                                                         readonly
                                                          v-model="Deb.recover.name"

                                                         class="vs-inputx vs-input--input normal hasValue"
                                                         style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                            <!----></div>
                        <span></span></div>


                    <h6 class="h6">Цедент:</h6>
                    <vs-input class="w-100 "  readonly v-model="Deb.recover.namePerv"></vs-input>
                    <h6 class="h6" style="margin-top: 25px">Фамилия:</h6>
                    <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                        <div class="vs-con-input"><input type="text"
                                                         @change="changeDeb" v-model="Deb.debtor.name_family"

                                                         class="vs-inputx vs-input--input normal hasValue"
                                                         style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                            <!----></div>
                        <span></span></div>

                    <h6 class="h6">Имя:</h6>

                    <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                        <div class="vs-con-input"><input type="text"
                                                         @change="changeDeb" v-model="Deb.debtor.name"

                                                         class="vs-inputx vs-input--input normal hasValue"
                                                         style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                            <!----></div>
                        <span></span></div>


                    <h6 class="h6">Отчество:</h6>

                    <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                        <div class="vs-con-input"><input type="text"
                                                         @change="changeDeb" v-model="Deb.debtor.name_patronymic"

                                                         class="vs-inputx vs-input--input normal hasValue"
                                                         style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                            <!----></div>
                        <span></span></div>


                    <h6 class="h6">Дата рождения:</h6>
                    <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                        <div class="vs-con-input"><input type="date"
                                                         @change="changeDeb" v-model="Deb.debtor.birthdate"

                                                         class="vs-inputx vs-input--input normal hasValue"
                                                         style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                            <!----></div>
                        <span></span></div>
                    <h6 class="h6" style="margin-top: 15px">Статус гражданина:</h6>

                    <div class="mt-2">

                        <vs-radio v-model="Deb.debtor.pensioner" vs-value="0" vs-name="pensioner" class="mr-4" @input="changeDeb">Работающий</vs-radio>
                        <vs-radio v-model="Deb.debtor.pensioner" vs-value="1" vs-name="pensioner" class="mr-4" @input="changeDeb">Пенсионер</vs-radio>
                    </div>
                    <h6 class="h6" style="margin-top: 15px">Номер договора:</h6>
                    <vs-input class="w-100"  readonly v-model="Deb.debtorCredit.number_dog"></vs-input>
                    <h6 class="h6">Дата договора:</h6>
                    <vs-input type="date" class="w-100" readonly v-model="Deb.debtorCredit.date_dog"></vs-input>

                </div>
                <div class="vx-col sm:w-1/4 w-full mb-2">
                    <h6 class="h6">Судебный участок:</h6>
                    <vs-textarea style="font-size: 12px;" readonly class="w-100"  v-model="Deb.debtor.jud_name" ></vs-textarea>
                    <h6 class="h6">Дата в суд Судебный приказ:<VarToClipboard name="dc_date_sud"/></h6>
                    <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_sud" @blur="changeDeb"></vs-input>
                    <h6 class="h6">План-Дата получения СП:</h6>
                    <vs-input type="date" class="w-100" v-model="planDateSud" ></vs-input>
                    <h6 class="h6">Дата в суд Иск :<VarToClipboard name="dc_date_isk"/></h6>
                    <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_isk" @blur="changeDeb"></vs-input>
                    <h6 class="h6">План-Дата получения ИЛ:</h6>
                    <vs-input type="date" class="w-100" v-model="planDateIsk" ></vs-input>
                    <h6 class="h6">Остаток долга:</h6>
                    <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                        <div class="vs-con-input"><input type="number"
                                                         v-model="ocsMinGp"
                                                         readonly="readonly"
                                                         class="vs-inputx vs-input--input normal hasValue"
                                                         style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                            <!----></div>
                        <span></span></div>

                    <h6 class="h6" >Госпошлина:</h6>
                    <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                        <div class="vs-con-input"><input type="number"
                                                         @change="changeDeb" v-model="Deb.debtorCredit.gospohlina"
                                                         readonly="readonly"
                                                         class="vs-inputx vs-input--input normal hasValue"
                                                         style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                            <!----></div>
                        <span></span></div>
                    <h6 class="h6">Остаток долга + ГП:<VarToClipboard name="dc_ocs_sum"/></h6>
                    <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                        <div class="vs-con-input"><input type="number"
                                                         @change="changeDeb" v-model="Deb.debtorCredit.ocs_sum"
                                                         readonly="readonly"
                                                         class="vs-inputx vs-input--input normal hasValue"
                                                         style="background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                            <!----></div>
                        <span></span></div>



                    <h6 class="h6" style="margin-top: 15px">№ СА:</h6>
                    <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                        <div class="vs-con-input"><input type="text"
                                                         @change="changeDebAndPrint" v-model="Deb.debtorCredit.number_sa"
                                                         class="vs-inputx vs-input--input normal hasValue"
                                                         style="background-color:rgb(29 223 0 / 13%);border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                            <!----></div>
                        <span></span></div>

                    <h6 class="h6">Дата СА:</h6>
                    <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                        <div class="vs-con-input"><input type="date"
                                                         v-model="Deb.debtorCredit.date_sa"
                                                         @blur="changeDebAndPrint"
                                                         class="vs-inputx vs-input--input normal hasValue"
                                                         style="background-color:rgb(29 223 0 / 13%);border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                            <!----></div>
                        <span></span></div>

                    <h6 class="h6" style="">№ дела Иск:</h6>
                    <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                        <div class="vs-con-input"><input type="text"
                                                         @change="changeDebAndPrint" v-model="Deb.debtorCredit.number_delo_il"
                                                         class="vs-inputx vs-input--input normal hasValue"
                                                         style="background-color:rgb(29 223 0 / 13%);border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                            <!----></div>
                        <span></span></div>



                 <!--   <h6 class="h6">№ СА судебные расходы:</h6>
                    <vs-input  class="w-100"  v-model="Deb.sudOrder.number_sa_rachod" @change="changeDeb"></vs-input>
                    <h6 class="h6">Дата судебные расходы:</h6>
                    <vs-input type="date" class="w-100"  v-model="Deb.sudOrder.date_sud_rachod" @blur="changeDeb"></vs-input>


                    <div class="vx-col w-2/4  mb-2" style="border: 1px;margin-top: 10px">
                        <vs-checkbox  v-model="Deb.debtorCredit.fail_rachod" @input="changeDeb">
                            Отказ судебные расходы
                        </vs-checkbox>


                    </div>

                    <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                        <vs-checkbox  v-model="Deb.debtorCredit.sud_rashod" @input="changeDeb">
                            Удовлетворено судебные расходы
                        </vs-checkbox>


                    </div> -->
                    <div class="vx-col w-2/4  mb-2" style="border: 1px;margin-top: 20px">
                        <barcode id="printMe" v-bind:value="Deb.debtorCredit.id">

                        </barcode>
                        <a @click="print" style="cursor: pointer">Печать</a>

                    </div>

                </div>
                <div class="vx-col sm:w-1/4 w-full mb-2">
                        <div class="vx-col sm:w-1 w-full mb-2">

                            <fieldset class="f" >
                                <legend class="l">Приказное производство:</legend>
                                <div class="vx-col w-2/4  mb-2" style="    width: 17vw;border: 1px;margin-top: 10px;">

                                    <h6  style="margin-left: 10px;">  Определение об отказе/отмене СП</h6>



                                </div>


                                <div class="vx-col w-2/4  mb-2" style="  width: 17vw;border: 1px;margin-left: 10px">
                                    <h6 class="h6">Дата определения отказе/отмене СП :</h6>
                                    <span style="color: red;cursor: pointer;font-size: 12px" @click="showData_refusal_sp=!showData_refusal_sp">История</span>
                                    <vs-input type="date" class="w-100 " v-model="Deb.data_refusal_sp"     @blur="changeDebDateRefusalSp"></vs-input>
                                    <vs-button color="primary" style="    margin-top: 15px;" class="pull-right" type="filled"  @click="sendEmailSud(95)">Запрос</vs-button>
                                    <vs-button color="primary" style="    margin-top: 15px;" v-if="User.pag.showPer" class="pull-right" type="filled"  @click="sendEmailTest(95)">Тест</vs-button>

                                </div>

                                <div class="vx-col w-2/4  mb-2" style="border: 1px;margin-top: 40px;">

                                    <h6  style="margin-left: 10px;"> Определение о возврате заявления на СП</h6>



                                </div>

                                <div class="vx-col w-2/4  mb-2" style="border: 1px;margin-left: 10px;">
                                    <h6 class="h6">Дата определения о возврате заявления на СП :</h6>
                                    <span style="color: red;cursor: pointer;font-size: 12px" @click="showdata_return_zay_sp=!showdata_return_zay_sp">История</span>
                                    <vs-input type="date" class="w-100 " v-model="Deb.data_return_zay_sp"  @blur="changeDebDateReturnZaySp"></vs-input>

                                    <vs-button color="primary" style="    margin-top: 15px;" class="pull-right" type="filled"  @click="sendEmailSud(98)">Запрос</vs-button>
                                    <vs-button color="primary" style="    margin-top: 15px;" v-if="User.pag.showPer" class="pull-right" type="filled"  @click="sendEmailTest(98)">Тест</vs-button>
                                </div>


                            </fieldset>
                            <vs-popup class="holamundo"   title="Причины возрата :" :active.sync="showPrich">
                            <span  style="text-align: center" >
                            <div class="vx-col w-2/4  mb-2" style="border: 1px;margin-top: 20px">


                                <h6 class="h6" style="margin-left: 10px;">Причины возврата:</h6>
                            </div>

                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="prav_prich" >
                                    Правовая причина
                                </vs-checkbox>


                            </div>
                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="sud_pp" >
                                    оригинал ПП госпошлина
                                </vs-checkbox>


                            </div>

                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="sud_dover" >
                                    оригинал доверенность
                                </vs-checkbox>


                            </div>
                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="utoch_podsud" >
                                    уточнить подсудность
                                </vs-checkbox>


                            </div>
                             <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="utoch_address" >
                                    уточнить адрес
                                </vs-checkbox>


                            </div>
                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-button color="primary" style="    margin-top: 15px;" class="pull-right" type="filled"  @click="savePrich">Сохранить</vs-button>

                            </div>
                        </span>
                            </vs-popup>


                        </div>
                        <div class="vx-col sm:w-1 w-full mb-2">


                        <fieldset class="f" >
                            <legend class="l">Описка:</legend>



                            <div class="vx-col w-2/4  mb-2" style="  width: 17vw;border: 1px;margin-left: 10px">
                                <h6 class="h6">Дата Описка :</h6>
                                <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_opiska"
                                          @blur="changeDeb"></vs-input>

                                <h6 class="h6">План-Дата получения ИЛ:</h6>
                                <vs-input type="date" class="w-100" v-model="planDateOpiska" ></vs-input>
                            </div>



                            <div class="vx-col w-2/4  mb-2" style="border: 1px;margin-top: 40px;">

                                <h6  style="margin-left: 10px;"> Определение об описке</h6>



                            </div>

                            <div class="vx-col w-2/4  mb-2" style="border: 1px;margin-left: 10px;">
                                <h6 class="h6">Дата Определение об описке :</h6>
                                <span style="color: red;cursor: pointer;font-size: 12px" @click="showdata_opr_opis=!showdata_opr_opis">История</span>
                                <vs-input type="date" class="w-100 " v-model="Deb.data_opr_opiska"   @blur="changeDebDateDataOpiska"></vs-input>

                                <vs-button color="primary" style="    margin-top: 15px;" class="pull-right" type="filled"  @click="sendEmailSud(99)">Запрос</vs-button>
                                <vs-button color="primary" style="    margin-top: 15px;" v-if="User.pag.showPer" class="pull-right" type="filled"  @click="sendEmailTest(99)">Тест</vs-button>
                            </div>

                            <vs-popup class="holamundo" title="Дата Определение об описке :" :active.sync="showdata_opr_opis">
              <ObjFromJsonViewButton :value="Deb.debtorCredit.data_opr_opiska" @update_arr="UpdateData_opr_opiska"></ObjFromJsonViewButton>
                      <!--          <json-viewer
                                        v-if="Deb.debtorCredit.data_opr_opiska!=null"
                                        :value="Deb.debtorCredit.data_opr_opiska"
                                        :expand-depth=5
                                        copyable

                                        sort></json-viewer>
                        !-->
                            </vs-popup>

                        </fieldset>




                    </div>
                </div>
                <div class="vx-col sm:w-1/4 w-full mb-2">
                        <div class="vx-col sm:w-1 w-full mb-2">
                        <fieldset class="f" >
                            <legend class="l">Исковое производство:</legend>
                            <div class="vx-col w-2/4  mb-2" style="    width: 17vw;border: 1px;margin-top: 10px;">

                                <h6 style="margin-left: 10px;"> Определение об отказе в иске/оставление без рассмотрения</h6>



                            </div>
                            <div class="vx-col w-2/4  mb-2" style="border: 1px;margin-left: 10px;">
                                <h6 class="h6">Дата определения об отказе в иске/оставление без рассмотрения</h6>
                                <span style="color: red;cursor: pointer;font-size: 12px" @click="showOtkz=!showOtkz">История</span>:
                                <vs-input type="date" class="w-100 " v-model="Deb.data_otkz"  @blur="changeDebDateOkz"></vs-input>
                                <vs-button color="primary" style="    margin-top: 15px;" class="pull-right" type="filled"  @click="sendEmailSud(97)">Запрос</vs-button>
                                <vs-button color="primary" style="    margin-top: 15px;" v-if="User.pag.showPer" class="pull-right" type="filled"  @click="sendEmailTest(95)">Тест</vs-button>

                            </div>



                            <div class="vx-col w-2/4  mb-2" style="border: 1px;margin-top: 40px">


                                <h6 class="h6" style="margin-left: 10px;">Решение суда:</h6>
                            </div>
                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="Deb.debtorCredit.satisfied" @input="changeDeb">
                                    удовлетворено
                                </vs-checkbox>


                            </div>

                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="Deb.debtorCredit.satisfied_part" @input="changeDeb">
                                    удовлетворено частично
                                </vs-checkbox>


                            </div>

                            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                <vs-checkbox  v-model="Deb.debtorCredit.isk_return" @input="changeDeb">
                                    отказано
                                </vs-checkbox>


                            </div>
                            <div class="vx-col w-2/4  mb-2" style="border: 1px;margin-left: 10px;">
                                <h6 class="h6">Дата решения суда:</h6>
                                <vs-input type="date" class="w-100 " v-model="Deb.debtorCredit.date_sud_sol"  @blur="changeDeb"></vs-input>


                            </div>

                        </fieldset>

                    </div>
                        <div class="vx-col sm:w-1 w-full mb-2">
                            <fieldset class="f" >
                                <legend class="l">Дубликат:</legend>


                                    <vs-checkbox style="margin-bottom: 15px;margin-top:10px" v-model="dubPol" @input="checkStatusDebtorCreditDublicat(Deb.debtorCredit.id)">Дубликат получен</vs-checkbox>

                                    <div class="vx-col w-2/4  mb-2" style="  width: 17vw;border: 1px;margin-left: 10px">
                                        <h6 class="h6">Дата Дубликат :</h6>
                                        <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_dublicat"
                                                  @blur="changeDeb"></vs-input>

                                        <h6 class="h6">План-Дата получения Дубликат:</h6>
                                        <vs-input type="date" class="w-100" v-model="planDateDublicat" ></vs-input>
                                    </div>

                                    <div class="vx-col w-2/4  mb-2" style="border: 1px;margin-top: 40px;">

                                        <h6  style="margin-left: 10px;"> Определение  о выдаче Дубликата</h6>



                                    </div>

                                    <div class="vx-col w-2/4  mb-2" style="border: 1px;margin-left: 10px;">
                                        <h6 class="h6">Дата Определение о выдаче Дубликата :</h6>
                                        <span style="color: red;cursor: pointer;font-size: 12px" @click="showdata_opr_dublicat=!showdata_opr_dublicat">История</span>
                                        <vs-input type="date" class="w-100 " v-model="Deb.data_opr_dublicat"   @blur="changeDebDateDataDublicat"></vs-input>

                                        <vs-button color="primary" style="    margin-top: 15px;" class="pull-right" type="filled"  @click="sendEmailSud(100)">Запрос</vs-button>
                                        <vs-button color="primary" style="    margin-top: 15px;" v-if="User.pag.showPer" class="pull-right" type="filled"  @click="sendEmailTest(100)">Тест</vs-button>
                                    </div>

                                    <vs-popup class="holamundo" title="Дата Определение о выдаче Дубликата :" :active.sync="showdata_opr_dublicat">

                                        <ObjFromJsonViewButton :value="Deb.debtorCredit.data_opr_dublicat" @update_arr="UpdateData_opr_dublicat"></ObjFromJsonViewButton>

                                <!--        <json-viewer
                                                v-if="Deb.debtorCredit.data_opr_dublicat!=null"
                                                :value="Deb.debtorCredit.data_opr_dublicat"
                                                :expand-depth=5
                                                copyable

                                                sort></json-viewer>
                                !-->
                                    </vs-popup>

                                <vs-popup class="holamundo" title="Статус :" :active.sync="showdata_opr_status">
                                     <span  style="text-align: center" >
                                       <div class="vx-col w-2/4  mb-2" style="border: 1px;margin-top: 20px">
                                        <h6 class="h6" style="margin-left: 10px;">Статус:</h6>
                                    </div>

                                    <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                        <vs-checkbox  v-model="dublicat_udv" >
                                            Удовлетворено
                                        </vs-checkbox>


                                    </div>
                                    <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                        <vs-checkbox  v-model="dublicat_otkz" >
                                            Отказано
                                        </vs-checkbox>
                                    </div>

                                    <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                        <vs-button color="primary" style="    margin-top: 15px;" class="pull-right" type="filled"  @click="savePrichDublicat">Сохранить</vs-button>

                                    </div>
                                    </span>
                                </vs-popup>

                            </fieldset>

                        </div>



                </div>

            </div>

                <vs-popup class="holamundo" title="Дата определения об отказе в иске/оставление без рассмотрения :" :active.sync="showOtkz">

                    <ObjFromJsonViewButton :value="Deb.debtorCredit.data_otkz" @update_arr="UpdateData_otkz"></ObjFromJsonViewButton>
                 <!--
                    <json-viewer
                            v-if="Deb.debtorCredit.data_otkz!=null"
                            :value="Deb.debtorCredit.data_otkz"
                            :expand-depth=5
                            copyable

                            sort></json-viewer>
                 !-->
                </vs-popup>
                <vs-popup class="holamundo" title="Дата определения отказе/отмене СП :" :active.sync="showData_refusal_sp">

                    <ObjFromJsonViewButton :value="Deb.debtorCredit.data_refusal_sp" @update_arr="UpdateData_refusal_sp"></ObjFromJsonViewButton>
                   <!--
                    <json-viewer
                            v-if="Deb.debtorCredit.data_refusal_sp!=null"
                            :value="Deb.debtorCredit.data_refusal_sp"
                            :expand-depth=5
                            copyable

                            sort></json-viewer>
                    !-->
                </vs-popup>
                <vs-popup class="holamundo" title="Дата определения о возврате заявления на СП :" :active.sync="showdata_return_zay_sp">
                    <!-- rrr!-->
                    <ObjFromJsonViewButton :value="Deb.debtorCredit.data_return_zay_sp" @update_arr="UpdateData_return_zay_sp"></ObjFromJsonViewButton>
                    <!--
                    <json-viewer
                            v-if="Deb.debtorCredit.data_return_zay_sp!=null"
                            :value="Deb.debtorCredit.data_return_zay_sp"
                            :expand-depth=5
                            copyable

                            sort></json-viewer>
                    !-->
                </vs-popup>
                <vs-popup classContent="popup-example" title="Email"  :active.sync="popupActive">
                    <h6>Укажите email:</h6>
                    <vs-input type="email"  class="w-100 mb-base"  v-model="email" />

                    <div style="margin-top: 10px">
                        <vs-row>
                            <vs-col vs-offset="8"  vs-type="flex" vs-justify="center" vs-align="center" >
                                <vs-button style="margin-top: 10px" color="primary"  class="w-full mb-base" type="filled"  @click="sendServer">Отправить</vs-button>
                            </vs-col>
                        </vs-row>
                    </div>

                </vs-popup>
        </fieldset>

            </vs-tab>
            <vs-tab label="Данные заёмщика">
                <Debtor :back="back"></Debtor>
            </vs-tab>
        </vs-tabs>

    </div>
</template>

<script>
    import r from '../../route';
    import Vue from 'vue';
    import { mapActions,mapGetters, } from 'vuex'
    import axios from '../../axios'
    import vSelect from 'vue-select'
    import Status from '../../components/Status.vue'
    import { AgGridVue } from 'ag-grid-vue'
    import Debtor from '../Debtor/DebtorID.vue'
    import VueBarcode from 'vue-barcode';
    import JsonViewer from 'vue-json-viewer'
    import moment from 'moment';
    import ObjFromJsonViewButton from '../RenderComponent/ObjFromJsonViewButton.vue'
    import VarToClipboard from './../VarToClipboard.vue'
    Vue.prototype.$moment = moment;
    export default {
        components: {

            'v-select': vSelect,Status,AgGridVue,Debtor, 'barcode': VueBarcode,    JsonViewer, ObjFromJsonViewButton,VarToClipboard,
        },
        data () {
            return {
                sud1:0,
                prav_prich:false,
                sud_pp:false,
                sud_dover:false,
                dubPol:false,
                utoch_address:false,
                dublicat_udv:false,
                dublicat_otkz:false,
                popupActive:false,
                utoch_podsud:false,
                isk1:0,
                sud2:0,
                email:'',
                testShab:0,
              //  data_return_zay_sp:null,
           //     data_refusal_sp:null,
                showOtkz:false,
                showPrich:false,
                showdata_opr_opis:false,
                showdata_opr_status:false,
                showdata_opr_dublicat:false,
                showData_refusal_sp:false,
                showdata_return_zay_sp:false,
                show_warning_dialog_opis:false,
              //  date_otkz:null,
                isk:0,
                back:false,
                iskPp:0,
                data:[],
                judi:{},
                total:0,
                sud:0,
                fail_rachod:0,
                sud_rashod:0,
                id_rec:0,
                searchQuery:'',
                number:'',


            }
        },
        mounted(){

        },
        computed: {
            ocsMinGp(){
                return  this.Deb.debtorCredit.ocs_sum_ocs
            },
            planDateDublicat(){
                if(typeof this.Deb.debtorCredit.date_dublicat!='undefined'){
                    if( this.Deb.debtorCredit.date_dublicat!=null){
                        let date1 = new Date(this.Deb.debtorCredit.date_dublicat);
                        let fortnightAway = new Date(date1);
                        date1.setDate(fortnightAway.getDate() + 84);
                        return  moment(date1.toString()).format("YYYY-MM-DD")
                    }
                }
                return null
            },
            planDateOpiska(){

                if(typeof this.Deb.debtorCredit.date_opiska!='undefined'){
                    if( this.Deb.debtorCredit.date_opiska!=null){
                        let date1 = new Date(this.Deb.debtorCredit.date_opiska);
                        let fortnightAway = new Date(date1);
                        date1.setDate(fortnightAway.getDate() + 84);
                        return  moment(date1.toString()).format("YYYY-MM-DD")
                    }
                }
                return null
            },
            planDateIsk(){

                if(typeof this.Deb.debtorCredit.date_isk!='undefined'){
                    if( this.Deb.debtorCredit.date_isk!=null){
                        let date1 = new Date(this.Deb.debtorCredit.date_isk);
                        let fortnightAway = new Date(date1);
                        date1.setDate(fortnightAway.getDate() + 140);
                        return  moment(date1.toString()).format("YYYY-MM-DD")
                    }
                }
                return null
            },
            planDateSud(){
                if(typeof this.Deb.debtorCredit.date_sud!='undefined'){
                    if( this.Deb.debtorCredit.date_sud!=null){
                        let date1 = new Date(this.Deb.debtorCredit.date_sud);
                        let fortnightAway = new Date(date1);
                        date1.setDate(fortnightAway.getDate() + 112);

                        return  moment(date1.toString()).format("YYYY-MM-DD")
                    }
                }
                return null
            },
            ...mapGetters([
                'RecoverersArr','Deb','User'

            ]),


        },

        methods: {

            UpdateData_opr_opiska(val){
               this.Deb.debtorCredit.data_opr_opiska=val
               this.changeDeb()
            },
            UpdateData_opr_dublicat(val){
                this.Deb.debtorCredit.data_opr_dublicat=val
                this.changeDeb()
            },
            UpdateData_otkz(val){
                this.Deb.debtorCredit.data_otkz=val
                this.changeDeb()
            },
            UpdateData_refusal_sp(val){
                this.Deb.debtorCredit.data_refusal_sp=val
                this.changeDeb()
            },
            UpdateData_return_zay_sp(val) {
                this.Deb.debtorCredit.data_return_zay_sp = val
                this.changeDeb()
            },

            sendServer(){
                this.popupActive=false;
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("shablonDocument.index"), {


                    params: {
                        method: 'sendEmail',
                        param:{
                            id_shab:this.testShab,
                            id_credit:this.Deb.debtorCredit.id,
                            email:this.email,

                        }


                    }
                }).then((response) => {


                    this.$vs.notify({  title:'Успешно', text: 'Отправленно' , color: 'success', position: 'top-center' })
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
            },
            sendEmailTest(id){
                this.testShab=id;
                this.popupActive=true;

            },
            sendEmailSud(id){
                // this.setAutoPeremen(e)
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("shablonDocument.index"), {


                    params: {
                        method: 'sendEmail',
                        param:{
                            id_shab:id,
                            id_credit:this.Deb.debtorCredit.id

                        }


                    }
                }).then((response) => {


                    this.$vs.notify({  title:'Успешно', text: 'Отправленно' , color: 'success', position: 'top-center' })
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
            },

            changeDebAndDelo(){
                if(this.Deb.statusLast==100&&this.Deb.debtorCredit.date_sa!==null&&this.Deb.debtorCredit.number_sa!==null&&this.Deb.debtorCredit.number_delo_il!==null){
                    this.print();
                }
                if(this.Deb.statusLast==53&&this.Deb.debtorCredit.date_sa!==null&&this.Deb.debtorCredit.number_sa!==null&&this.Deb.debtorCredit.number_delo_il!==null){
                    this.print();
                }
                this.changeDeb().then((response) => {
                    if(this.Deb.statusLast==100){

                        this.checkStatusDebtorCreditIsk(this.Deb.debtorCredit.id);
                    }
                    if(this.Deb.statusLast==53){
                        this.checkStatusDebtorCreditIsk(this.Deb.debtorCredit.id);
                    }

                }).catch(error => {

                });

            },
            changeDebAndPrint(){
                if(this.Deb.statusLast==100&&this.Deb.debtorCredit.date_sa!==null&&this.Deb.debtorCredit.number_sa!==null&&this.Deb.debtorCredit.number_delo_il!==null){
                    this.print();
                }
                if(this.Deb.statusLast==53&&this.Deb.debtorCredit.date_sa!==null&&this.Deb.debtorCredit.number_sa!==null&&this.Deb.debtorCredit.number_delo_il!==null){
                    this.print();
                }
                if(this.Deb.statusLast==6&&this.Deb.debtorCredit.date_sa!==null&&!this.Deb.debtorCredit.number_sa!==null){
                    this.print();
                }

                this.changeDeb().then((response) => {
                    if(this.Deb.statusLast==6){

                        this.checkStatusDebtorCreditSa(this.Deb.debtorCredit.id);

                    }



                }).catch(error => {

                });

            },
            savePrichDublicat(){
                let stat=false;
                let prich=[];

                if(this.dublicat_udv){

                    prich.push('Удовлетворено')
                }
                if(this.dublicat_otkz){
                    stat=true;
                    prich.push('Отказано')
                }


                if(this.Deb.debtorCredit.data_opr_dublicat==null){
                    this.Deb.debtorCredit.data_opr_dublicat=[];
                }
                if(this.Deb.debtorCredit.data_opr_dublicat.length>0){
                    if(this.Deb.data_opr_dublicat!=this.Deb.debtorCredit.data_opr_dublicat[this.Deb.debtorCredit.data_opr_dublicat.length-1]||typeof this.Deb.debtorCredit.data_opr_dublicat[this.Deb.debtorCredit.data_opr_dublicat.length-1].date=='undefined'){
                        this.Deb.debtorCredit.data_opr_dublicat.push({
                            date:this.Deb.data_opr_dublicat,
                            prich:prich,
                            user:this.User.name_family+' '+this.User.name+' '+this.User.name_patronymic,
                            userId:this.User.id,


                        })
                        if(!stat){
                          //  this.$refs.status.setStatus(8);
                        }
//                        this.changeDebUpdate();
//                        this.$refs.status.setStatus(3);
                    }
                }
                else{
                    this.Deb.debtorCredit.data_opr_dublicat.push({
                        date:this.Deb.data_opr_dublicat,
                        prich:prich,
                        user:this.User.name_family+' '+this.User.name+' '+this.User.name_patronymic,
                        userId:this.User.id,


                    })
                    if(!stat){
                    //    this.$refs.status.setStatus(8);
                    }
//                    this.changeDebUpdate();
//                    this.$refs.status.setStatus(3);
                }
                this.dublicat_udv=false
                this.dublicat_otkz=false

                this.changeDeb();
                this.showdata_opr_status=false

            },
            savePrich(){
                let stat=false;
                let prich=[];

                if(this.prav_prich){
                    prich.push('Правовая причина')
                }
                if(this.sud_pp){
                    this.setJudPP(this.Deb.debtor.jud_number);
                    prich.push('Оригинал ПП госпошлина')
                }
                if(this.sud_dover){
                    this.setJudDov(this.Deb.debtor.jud_number);
                    prich.push('Оригинал доверенность')
                }
                if(this.utoch_podsud){
                    prich.push('Уточнить подсудность')
                    // this.$refs.status.setStatus(17);
                    stat=true;
                }
                if(this.utoch_address){
                    prich.push('Уточнить адрес')
                    // this.$refs.status.setStatus(74);
                    stat=true;
                }

               if(this.Deb.debtorCredit.data_return_zay_sp==null){
                    this.Deb.debtorCredit.data_return_zay_sp=[];
                }
                if(this.Deb.debtorCredit.data_return_zay_sp.length>0){
                    if(this.Deb.data_return_zay_sp!=this.Deb.debtorCredit.data_return_zay_sp[this.Deb.debtorCredit.data_return_zay_sp.length-1]||typeof this.Deb.debtorCredit.data_return_zay_sp[this.Deb.debtorCredit.data_return_zay_sp.length-1].date=='undefined'){
                        this.Deb.debtorCredit.data_return_zay_sp.push({
                            date:this.Deb.data_return_zay_sp,
                            prich:prich,
                            user:this.User.name_family+' '+this.User.name+' '+this.User.name_patronymic,
                            userId:this.User.id,


                        })
                        if(!stat){
                            // this.$refs.status.setStatus(3);
                        }
//                        this.changeDebUpdate();
//                        this.$refs.status.setStatus(3);
                    }
                }
                else{
                    this.Deb.debtorCredit.data_return_zay_sp.push({
                        date:this.Deb.data_return_zay_sp,
                        prich:prich,
                        user:this.User.name_family+' '+this.User.name+' '+this.User.name_patronymic,
                        userId:this.User.id,


                    })
                    if(!stat){
                        // this.$refs.status.setStatus(3);
                    }
//                    this.changeDebUpdate();
//                    this.$refs.status.setStatus(3);
                }
                this.prav_prich=false
                this.sud_pp=false
                this.sud_dover=false
                this.utoch_podsud=false
                this.utoch_address=false
                this.changeDeb();
                this.showPrich=false

            },
            print(){

                let mywindow = window.open('print.html', 'Print', 'height=600,width=800');
                let elem = document.getElementById('printMe');
                mywindow.document.write('<html><head><title>Print QR</title>');
                mywindow.document.write('</head><body >');
                mywindow.document.write(elem.innerHTML);
                mywindow.document.write('</body></html>');

                mywindow.document.close();
                mywindow.focus()
                mywindow.print();
                mywindow.close('print.html');

            },
            setJudPPLocal(){
                this.setJudPP(this.Deb.debtor.jud_number);
                this.changeDeb();
                if(this.Deb.debtorCredit.sud_pp==1){
                    this.$refs.status.setStatus(3);
                }


            },
            setJudDovLocal(){
                this.setJudDov(this.Deb.debtor.jud_number);
                this.changeDeb();
                if(this.Deb.debtorCredit.sud_dover==1){
                    this.$refs.status.setStatus(3);
                }

            },
            changeStatusSud(){
                if(this.sud){
                    this.$refs.status.setStatus(3);
                }
                if(this.sud1){
                    this.$refs.status.setStatus(3);
                }
                if(this.sud2){
                    this.$refs.status.setStatus(3);
                }
            },
            changeStatusIskPp(){
                if(this.Deb.debtorCredit.isk_pp){
                    this.$refs.status.setStatus(4);
                    this.Deb.debtorCredit.isk_pp=1
                    this.changeDeb();
                }
                else{
                    this.Deb.debtorCredit.isk_pp=0
                    this.changeDeb();
                }
            },
            changeStatusIsk(){
                if(this.isk){
                    this.$refs.status.setStatus(4);
                }
                if(this.isk1){
                    this.$refs.status.setStatus(4);
                }
            },
            changeDebDateOkz(){
                if(this.Deb.debtorCredit.data_otkz==null){
                    this.Deb.debtorCredit.data_otkz=[];
                }
                if(this.Deb.debtorCredit.data_otkz.length>0){
                    if(this.Deb.data_otkz!=this.Deb.debtorCredit.data_otkz[this.Deb.debtorCredit.data_otkz.length-1]){
                        if(typeof this.Deb.data_otkz!='undefined') {
                            this.Deb.debtorCredit.data_otkz.push(this.Deb.data_otkz)
                            this.changeDeb();
                            this.$refs.status.setStatus(4);
                        }
                    }
                }
                else{
                    if(typeof this.Deb.data_otkz!='undefined') {
                        this.Deb.debtorCredit.data_otkz.push(this.Deb.data_otkz)
                        this.changeDeb();
                        this.$refs.status.setStatus(4);
                    }
                }


            },
            changeDebDateRefusalSp(){
                if(this.Deb.debtorCredit.data_refusal_sp==null){
                    this.Deb.debtorCredit.data_refusal_sp=[];
                }
                if(this.Deb.debtorCredit.data_refusal_sp.length>0){
                    if(this.Deb.data_refusal_sp!=this.Deb.debtorCredit.data_refusal_sp[this.Deb.debtorCredit.data_refusal_sp.length-1]){
                        if(typeof this.Deb.data_refusal_sp!='undefined'){
                            this.Deb.debtorCredit.data_refusal_sp.push(this.Deb.data_refusal_sp)
                            this.changeDeb();
                            // console.log(this.Deb.debtorCredit)
                            // if(this.Deb.statusLast!=53){
                            //     if(this.Deb.statusLast!=100) {
                            //         this.$refs.status.setStatus(4);
                            //     }
                            // }

                        }
                    }
                }
                else{
                    if(typeof this.Deb.data_refusal_sp!='undefined'){
                        this.Deb.debtorCredit.data_refusal_sp.push(this.Deb.data_refusal_sp)
                        this.changeDeb();
                        // console.log(this.Deb.debtorCredit)
                        // if(this.Deb.statusLast!=53){
                        //     if(this.Deb.statusLast!=100) {
                        //         this.$refs.status.setStatus(4);
                        //     }
                        // }
                    }

                }

            },
            changeDebDateReturnZaySp(){

                if(this.Deb.debtorCredit.data_return_zay_sp==null){
                    this.Deb.debtorCredit.data_return_zay_sp=[];
                }
                if(this.Deb.debtorCredit.data_return_zay_sp.length>0){
                    if(this.Deb.debtorCredit.data_return_zay_sp[this.Deb.debtorCredit.data_return_zay_sp.length-1]!=null){
                        if(typeof this.Deb.debtorCredit.data_return_zay_sp[this.Deb.debtorCredit.data_return_zay_sp.length-1].date!='undefined'){
                            if(this.Deb.data_return_zay_sp!=this.Deb.debtorCredit.data_return_zay_sp[this.Deb.debtorCredit.data_return_zay_sp.length-1].date){
                                this.showPrich=true
                            }
                        }
                        else{
                            this.showPrich=true
                        }


                    }
                    else{
                        this.showPrich=true
                    }

                }
                else{
                    this.showPrich=true
                }

            },
            changeDebDateDataDublicat(){

                if(this.Deb.debtorCredit.data_opr_dublicat==null){
                    this.Deb.debtorCredit.data_opr_dublicat=[];
                }
                if(this.Deb.debtorCredit.data_opr_dublicat.length>0){
                    if(this.Deb.debtorCredit.data_opr_dublicat[this.Deb.debtorCredit.data_opr_dublicat.length-1]!=null){
                        if(typeof this.Deb.debtorCredit.data_opr_dublicat[this.Deb.debtorCredit.data_opr_dublicat.length-1].date!='undefined'){
                            if(this.Deb.data_opr_dublicat!=this.Deb.debtorCredit.data_opr_dublicat[this.Deb.debtorCredit.data_opr_dublicat.length-1].date){
                                this.showdata_opr_status=true
                            }
                        }
                        else{
                            this.showdata_opr_status=true
                        }


                    }
                    else{
                        this.showdata_opr_status=true
                    }

                }
                else{
                    this.showdata_opr_status=true
                }

            },

            changeDebDateDataOpiska(){
                if(typeof this.Deb.debtorCredit.data_opr_opiska=='undefined'){
                    this.Deb.debtorCredit.data_opr_opiska=[];
                }
                if(this.Deb.debtorCredit.data_opr_opiska==null){
                    this.Deb.debtorCredit.data_opr_opiska=[];
                }
                if(this.Deb.debtorCredit.data_opr_opiska.length>0){
                    if(this.Deb.data_opr_opiska!=this.Deb.data_opr_opiska[this.Deb.debtorCredit.data_opr_opiska.length-1]){
                        if(typeof this.Deb.data_opr_opiska!='undefined'){
                            this.Deb.debtorCredit.data_opr_opiska.push(this.Deb.data_opr_opiska)
                            this.changeDeb().then((response) => {
                                if(this.Deb.debtorCredit.id_status==52){
                                    this.checkStatusDebtorCreditOpiska(this.Deb.debtorCredit.id);
                                }


                            }).catch(error => {

                            });

                        }
                    }
                }
                else{
                    if(typeof this.Deb.data_opr_opiska!='undefined'){
                        this.Deb.debtorCredit.data_opr_opiska.push(this.Deb.data_opr_opiska)
                        this.changeDeb().then((response) => {
                            if(this.Deb.debtorCredit.id_status==52){
                                this.checkStatusDebtorCreditOpiska(this.Deb.debtorCredit.id);
                            }


                        }).catch(error => {

                        });

                    }

                }

            },
            ...mapActions([
                'getDataRecoverersAndPravez','changeDeb','getDataDebtorsById','checkStatusDebtorCreditDublicat','changeDebUpdate','setJudPP','setJudDov','checkStatusDebtorCreditIsk','checkStatusDebtorCreditSa','checkStatusDebtorCreditOpiska'
            ]),


        },
    }
</script>
<style>
    .vs-popup {
        width: 400px!important;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
</style>
