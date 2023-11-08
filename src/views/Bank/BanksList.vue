<template>
    <div>
        <div style="margin-left: 20px; width: 100%;">
            <div style="text-align: right">
                <span style="cursor:pointer; color:cornflowerblue" @click="goCheck">Проверка</span>
            </div>

            <fieldset class="f">
                <legend class="l">Сбербанк:<VarToClipboard name="dc_bank_sber"/></legend>
                <div class="vx-row" style="padding-left: 20px;border-color: #62626262;">
                    <div class="vx-col w-2/5">
                        <vs-radio v-model="Deb.debtorCredit.bank_sber" vs-value="1" vs-name="bank_sber" class="mr-4"
                                  @input="changeDeb">Есть
                        </vs-radio>
                        <vs-radio v-model="Deb.debtorCredit.bank_sber" vs-value="2" vs-name="bank_sber" class="mr-4"
                                  @input="changeDeb">Нет
                        </vs-radio>
                        <vs-radio v-model="Deb.debtorCredit.bank_sber" vs-value="3" vs-name="bank_sber" class="mr-4"
                                  @input="changeDeb">Есть*
                        </vs-radio>
                    </div>
                    <div class="vx-col w-3/5">
                        <VarToClipboard name="dc_bank_sber_check"/>
                        <vs-checkbox v-model="Deb.debtorCredit.bank_sber_check"
                                     @input="changeDebLocal">Нет возможности взыскать
                        </vs-checkbox>
                        <template  v-if="User.pag.showDateSend">
                            <h6 class="h6">Дата запроса Сбер:<VarToClipboard name="dc_date_sber"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_sber" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>
                        <template  v-if="User.pag.showDateReturn">
                            <h6 class="h6">Дата ответа Сбер:<VarToClipboard name="dc_date_return_sber"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_return_sber" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>

                        </template>

                    </div>

                </div>
            </fieldset>
            <fieldset class="f">
                <legend class="l">Альфа:<VarToClipboard name="dc_bank_alfa"/></legend>
                <div class="vx-row" style=" padding-left: 20px;border-color: #62626262;">
                    <div class="vx-col w-2/5">
                        <vs-radio v-model="Deb.debtorCredit.bank_alfa" vs-value="1" vs-name="bank_alfa" class="mr-4"
                                  @input="changeDeb">Есть
                        </vs-radio>
                        <vs-radio v-model="Deb.debtorCredit.bank_alfa" vs-value="2" vs-name="bank_alfa" class="mr-4"
                                  @input="changeDeb">Нет
                        </vs-radio>
                        <vs-radio v-model="Deb.debtorCredit.bank_alfa" vs-value="3" vs-name="bank_alfa" class="mr-4"
                                  @input="changeDeb">Есть*
                        </vs-radio>
                    </div>
                    <div class="vx-col w-3/5">
                      <VarToClipboard name="dc_bank_alfa_check"/>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.debtorCredit.bank_alfa_check"
                                     @input="changeDebLocal">Нет возможности взыскать
                        </vs-checkbox>
                        <template  v-if="User.pag.showDateSend">
                            <h6 class="h6">Дата запроса Альфа:<VarToClipboard name="dc_date_alfa"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_alfa" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>
                        <template  v-if="User.pag.showDateReturn">
                            <h6 class="h6">Дата ответа Альфа:<VarToClipboard name="dc_date_return_alfa"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_return_alfa" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>

                    </div>

                </div>
            </fieldset>
            <fieldset class="f">
                <legend class="l">Совкомбанк:<VarToClipboard name="dc_bank_sovcom"/></legend>
                <div class="vx-row" style=" padding-left: 20px;border-color: #62626262;">
                    <div class="vx-col w-2/5">
                        <vs-radio v-model="Deb.debtorCredit.bank_sovcom" vs-value="1" vs-name="bank_sovcom"
                                  class="mr-4" @input="changeDeb">Есть
                        </vs-radio>
                        <vs-radio v-model="Deb.debtorCredit.bank_sovcom" vs-value="2" vs-name="bank_sovcom"
                                  class="mr-4" @input="changeDeb">Нет
                        </vs-radio>
                    </div>
                    <div class="vx-col w-3/5">
                      <VarToClipboard name="dc_bank_sovcom_check"/>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.debtorCredit.bank_sovcom_check"
                                     @input="changeDebLocal">Нет возможности взыскать
                        </vs-checkbox>
                        <template  v-if="User.pag.showDateSend">
                            <h6 class="h6">Дата запроса Совкомбанк:<VarToClipboard name="dc_date_sovcom"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_sovcom" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>
                        <template  v-if="User.pag.showDateReturn">
                            <h6 class="h6">Дата ответа Совкомбанк:<VarToClipboard name="dc_date_return_sovcom"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_return_sovcom" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>

                    </div>

                </div>
            </fieldset>
            <fieldset class="f">
                <legend class="l">ВТБ:<VarToClipboard name="dc_bank_vtb"/>
                </legend>
                <div class="vx-row" style=" padding-left: 20px;border-color: #62626262;">
                    <div class="vx-col w-2/5">
                        <vs-radio v-model="Deb.debtorCredit.bank_vtb" vs-value="1" vs-name="bank_vtb" class="mr-4"
                                  @input="changeDeb">Есть
                        </vs-radio>
                        <vs-radio v-model="Deb.debtorCredit.bank_vtb" vs-value="2" vs-name="bank_vtb" class="mr-4"
                                  @input="changeDeb">Нет
                        </vs-radio>
                        <vs-radio v-model="Deb.debtorCredit.bank_vtb" vs-value="3" vs-name="bank_vtb" class="mr-4"
                                  @input="changeDeb">Есть*
                        </vs-radio>
                    </div>
                    <div class="vx-col w-3/5">
                      <VarToClipboard name="dc_bank_vtb_check"/>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.debtorCredit.bank_vtb_check"
                                     @input="changeDebLocal">Нет возможности взыскать
                        </vs-checkbox>
                        <template  v-if="User.pag.showDateSend">
                            <h6 class="h6">Дата запроса Втб:<VarToClipboard name="dc_date_vtb"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_vtb" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>
                        <template  v-if="User.pag.showDateReturn">
                            <h6 class="h6">Дата ответа Втб:<VarToClipboard name="dc_date_return_vtb"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_return_vtb" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>

                    </div>

                </div>
            </fieldset>
            <fieldset class="f">
                <legend class="l">ПочтаБанк:<VarToClipboard name="dc_bank_pochta"/></legend>
                <div class="vx-row" style="padding-left: 20px;border-color: #62626262;">
                    <div class="vx-col w-2/5">
                        <vs-radio v-model="Deb.debtorCredit.bank_pochta" vs-value="1" vs-name="bank_pochta"
                                  class="mr-4" @input="changeDeb">Есть
                        </vs-radio>
                        <vs-radio v-model="Deb.debtorCredit.bank_pochta" vs-value="2" vs-name="bank_pochta"
                                  class="mr-4" @input="changeDeb">Нет
                        </vs-radio>
                    </div>
                    <div class="vx-col w-3/5">
                        <VarToClipboard name="dc_bank_pochta_check"/>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.debtorCredit.bank_pochta_check"
                                     @input="changeDebLocal">Нет возможности взыскать
                        </vs-checkbox>
                        <template  v-if="User.pag.showDateSend">
                            <h6 class="h6">Дата запроса ПочтаБанк:<VarToClipboard name="dc_date_pochta_bank"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_pochta_bank" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>
                        <template  v-if="User.pag.showDateReturn">
                            <h6 class="h6">Дата ответа ПочтаБанк:<VarToClipboard name="dc_date_return_pochta_bank"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_return_pochta_bank" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>

                    </div>

                </div>
            </fieldset>
            <fieldset class="f">
                <legend class="l">БФКО:<VarToClipboard name="dc_bank_bfko"/></legend>
                <div class="vx-row" style="padding-left: 20px;border-color: #62626262;">
                    <div class="vx-col w-2/5">
                        <vs-radio v-model="Deb.debtorCredit.bank_bfko" vs-value="1" vs-name="bank_bfko" class="mr-4"
                                  @input="changeDeb">Есть
                        </vs-radio>
                        <vs-radio v-model="Deb.debtorCredit.bank_bfko" vs-value="2" vs-name="bank_bfko" class="mr-4"
                                  @input="changeDeb">Нет
                        </vs-radio>
                    </div>
                    <div class="vx-col w-3/5">
                      <VarToClipboard name="dc_bank_bfko_check"/>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.debtorCredit.bank_bfko_check"
                                     @input="changeDebLocal">Нет возможности взыскать
                        </vs-checkbox>
                        <template  v-if="User.pag.showDateSend">
                            <h6 class="h6">Дата запроса БФКО:<VarToClipboard name="dc_date_bfko"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_bfko" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>
                        <template  v-if="User.pag.showDateReturn">
                            <h6 class="h6">Дата ответа БФКО:<VarToClipboard name="dc_date_return_bfko"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_return_bfko" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>

                    </div>

                </div>
            </fieldset>
            <fieldset class="f">
                <legend class="l">УралСиб:<VarToClipboard name="dc_bank_uralsib"/></legend>
                <div class="vx-row" style="padding-left: 20px;border-color: #62626262;">
                    <div class="vx-col w-2/5">
                        <vs-radio v-model="Deb.debtorCredit.bank_uralsib" vs-value="1" vs-name="bank_uralsib" class="mr-4"
                                  @input="changeDeb">Есть
                        </vs-radio>
                        <vs-radio v-model="Deb.debtorCredit.bank_uralsib" vs-value="2" vs-name="bank_uralsib" class="mr-4"
                                  @input="changeDeb">Нет
                        </vs-radio>
                        <vs-radio v-model="Deb.debtorCredit.bank_uralsib" vs-value="3" vs-name="bank_uralsib" class="mr-4"
                                  @input="changeDeb">Есть*
                        </vs-radio>
                    </div>
                    <div class="vx-col w-3/5">
                      <VarToClipboard name="dc_bank_uralsib_check"/>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.debtorCredit.bank_uralsib_check"
                                     @input="changeDebLocal">Нет возможности взыскать
                        </vs-checkbox>
                        <template  v-if="User.pag.showDateSend">
                            <h6 class="h6">Дата запроса УралСиб:<VarToClipboard name="dc_date_uralsib"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_uralsib" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>
                        <template  v-if="User.pag.showDateReturn">
                            <h6 class="h6">Дата ответа УралСиб:<VarToClipboard name="dc_date_return_uralsib"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_return_uralsib" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>

                    </div>

                </div>
            </fieldset>
            <fieldset class="f">
                <legend class="l">ЮМани:<VarToClipboard name="dc_bank_yoomoney"/></legend>
                <div class="vx-row" style="padding-left: 20px;border-color: #62626262;">
                    <div class="vx-col w-2/5">
                        <vs-radio v-model="Deb.debtorCredit.bank_yoomoney" vs-value="1" vs-name="bank_yoomoney" class="mr-4"
                                  @input="changeDeb">Есть
                        </vs-radio>
                        <vs-radio v-model="Deb.debtorCredit.bank_yoomoney" vs-value="2" vs-name="bank_yoomoney" class="mr-4"
                                  @input="changeDeb">Нет
                        </vs-radio>
                    </div>
                    <div class="vx-col w-3/5">
                      <VarToClipboard name="dc_bank_yoomoney_check"/>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.debtorCredit.bank_yoomoney_check"
                                     @input="changeDebLocal">Нет возможности взыскать
                        </vs-checkbox>
                        <template  v-if="User.pag.showDateSend">
                            <h6 class="h6">Дата запроса ЮМани:<VarToClipboard name="dc_date_yoomoney"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_yoomoney" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>
                        <template  v-if="User.pag.showDateReturn">
                            <h6 class="h6">Дата ответа ЮМани:<VarToClipboard name="dc_date_return_yoomoney"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_return_yoomoney" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>


                    </div>

                </div>
            </fieldset>
            <fieldset class="f">
                <legend class="l">Россельхозбанк:<VarToClipboard name="dc_bank_rshb"/></legend>
                <div class="vx-row" style="padding-left: 20px;border-color: #62626262;">
                    <div class="vx-col w-2/5">
                        <vs-radio v-model="Deb.debtorCredit.bank_rshb" vs-value="1" vs-name="bank_rshb" class="mr-4"
                                  @input="changeDeb">Есть
                        </vs-radio>
                        <vs-radio v-model="Deb.debtorCredit.bank_rshb" vs-value="2" vs-name="bank_rshb" class="mr-4"
                                  @input="changeDeb">Нет
                        </vs-radio>
                    </div>
                    <div class="vx-col w-3/5">
                      <VarToClipboard name="dc_bank_rshb_check"/>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.debtorCredit.bank_rshb_check"
                                     @input="changeDebLocal">Нет возможности взыскать
                        </vs-checkbox>
                        <template  v-if="User.pag.showDateSend">
                            <h6 class="h6">Дата запроса Россельхозбанк:<VarToClipboard name="dc_date_rshb"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_rshb" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>
                        <template  v-if="User.pag.showDateReturn">
                            <h6 class="h6">Дата ответа Россельхозбанк:<VarToClipboard name="dc_date_return_rshb"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_return_rshb" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>


                    </div>

                </div>
            </fieldset>
            <fieldset class="f">
                <legend class="l">QIWI Банк:<VarToClipboard name="dc_bank_qiwi"/></legend>
                <div class="vx-row" style="padding-left: 20px;border-color: #62626262;">
                    <div class="vx-col w-2/5">
                        <vs-radio v-model="Deb.debtorCredit.bank_qiwi" vs-value="1" vs-name="bank_qiwi" class="mr-4"
                                  @input="changeDeb">Есть
                        </vs-radio>
                        <vs-radio v-model="Deb.debtorCredit.bank_qiwi" vs-value="2" vs-name="bank_qiwi" class="mr-4"
                                  @input="changeDeb">Нет
                        </vs-radio>
                    </div>
                    <div class="vx-col w-3/5">
                      <VarToClipboard name="dc_bank_qiwi_check"/>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.debtorCredit.bank_qiwi_check"
                                     @input="changeDebLocal">Нет возможности взыскать
                        </vs-checkbox>
                        <template  v-if="User.pag.showDateSend">
                            <h6 class="h6">Дата запроса QIWI Банк:<VarToClipboard name="dc_date_qiwi"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_qiwi" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>
                        <template  v-if="User.pag.showDateReturn">
                            <h6 class="h6">Дата ответа QIWI Банк:<VarToClipboard name="dc_date_return_qiwi"/></h6>
                            <div class="vs-component vs-con-input-label vs-input w-100  vs-input-primary"><!---->
                                <div class="vs-con-input"><input type="date"
                                                                 v-model="Deb.debtorCredit.date_return_qiwi" @blur="changeDeb"
                                                                 class="vs-inputx vs-input--input normal hasValue"
                                                                 style="height: 5px;background-color:#fff20722;border: 1px solid rgba(0, 0, 0, 0.2);"><!----><!---->
                                    <!----></div>
                                <span></span></div>
                        </template>


                    </div>

                </div>
            </fieldset>

            <fieldset class="f">
                <legend class="l">Список банков:</legend>
                <div class="vx-row" style="padding-top: 2px; padding-left: 20px;border-color: #62626262;">

                    <div class="vx-col w-3/5" style="    font-size: 0.9rem;border: 1px;">

                        <vx-input-group class="mb-base1"
                                        prependClasses="border border-solid border-grey border-r-0">
                            <template slot="prepend">
                                <div class="prepend-text">
                                    <vs-checkbox v-model="Deb.debtorCredit.bank_one_check"
                                                 @input="changeDebLocal"></vs-checkbox>
                                </div>
                            </template>
                            <v-select class="w-full" :reduce="label => label.id" label="name" :options="BanksSendArr"
                                      v-model="Deb.debtorCredit.bank_one" @input="changeDebSetDate"></v-select>
                            <label class="bank" v-if="nameBank(Deb.debtorCredit.bank_one)">{{nameBank(Deb.debtorCredit.bank_one)}} </label>

                        </vx-input-group>
                    </div>
                    <div class="vx-col w-2/5">
                        <v-select class="w-50 mb-base1" style="padding-right: 10px;margin-bottom: 5px"
                                  :options="years" v-model="Deb.debtorCredit.bank_one_date"
                                  @input="changeDeb"></v-select>
                    </div>
                </div>
                <div class="vx-row" style="padding-top: 2px; padding-left: 20px;border-color: #62626262;">
                    <div class="vx-col w-3/5" style="    font-size: 0.9rem;border: 1px;">
                        <vx-input-group class="mb-base1"
                                        prependClasses="border border-solid border-grey border-r-0">
                            <template slot="prepend">
                                <div class="prepend-text">
                                    <vs-checkbox v-model="Deb.debtorCredit.bank_two_check"
                                                 @input="changeDebLocal"></vs-checkbox>
                                </div>
                            </template>
                            <v-select class="w-full" :reduce="label => label.id" label="name" :options="BanksSendArr"
                                      v-model="Deb.debtorCredit.bank_two" @input="changeDebSetDate"></v-select>
                            <label class="bank" v-if="nameBank(Deb.debtorCredit.bank_two)">{{nameBank(Deb.debtorCredit.bank_two)}} </label>
                        </vx-input-group>
                    </div>
                    <div class="vx-col w-2/5">
                        <v-select class="w-50 mb-base1" style="padding-right: 10px;margin-bottom: 5px"
                                  :options="years" v-model="Deb.debtorCredit.bank_two_date"
                                  @input="changeDeb"></v-select>
                    </div>
                </div>
                <div class="vx-row" style="padding-left: 20px;border-color: #62626262;">
                    <div class="vx-col w-3/5" style="    font-size: 0.9rem;border: 1px;">
                        <vx-input-group class="mb-base1"
                                        prependClasses="border border-solid border-grey border-r-0">
                            <template slot="prepend">
                                <div class="prepend-text">
                                    <vs-checkbox v-model="Deb.debtorCredit.bank_three_check"
                                                 @input="changeDebLocal"></vs-checkbox>
                                </div>
                            </template>

                            <v-select class="w-full" :reduce="label => label.id" label="name" :options="BanksSendArr"
                                      v-model="Deb.debtorCredit.bank_three" @input="changeDebSetDate"></v-select>
                            <label class="bank"  v-if="nameBank(Deb.debtorCredit.bank_three)">{{nameBank(Deb.debtorCredit.bank_three)}} </label>
                        </vx-input-group>
                    </div>
                    <div class="vx-col w-2/5">
                        <v-select class="w-50 mb-base1" style="padding-right: 10px;margin-bottom: 5px"
                                  :options="years" v-model="Deb.debtorCredit.bank_three_date"
                                  @input="changeDeb"></v-select>
                    </div>
                </div>
                <div class="vx-row" style="padding-top: 2px; padding-left: 20px;border-color: #62626262;">
                    <div class="vx-col w-3/5" style="    font-size: 0.9rem;border: 1px;">
                        <vx-input-group class="mb-base1"
                                        prependClasses="border border-solid border-grey border-r-0">
                            <template slot="prepend">
                                <div class="prepend-text">
                                    <vs-checkbox v-model="Deb.debtorCredit.bank_four_check"
                                                 @input="changeDebLocal"></vs-checkbox>
                                </div>
                            </template>
                            <v-select class="w-full" :reduce="label => label.id" label="name" :options="BanksSendArr"
                                      v-model="Deb.debtorCredit.bank_four" @input="changeDebSetDate"></v-select>
                            <label class="bank" v-if="nameBank(Deb.debtorCredit.bank_four)">{{nameBank(Deb.debtorCredit.bank_four)}} </label>
                        </vx-input-group>
                    </div>
                    <div class="vx-col w-2/5">
                        <v-select class="w-50 mb-base1" style="padding-right: 10px;margin-bottom: 5px"
                                  :options="years" v-model="Deb.debtorCredit.bank_four_date"
                                  @input="changeDeb"></v-select>
                    </div>
                </div>
                <div class="vx-row box" style="padding-top: 2px; padding-left: 20px;border-color: #62626262;">
                    <div style="border: 1px; margin-left: 10px;margin-bottom: 10px"   v-if="User.pag.showDopGraf" >
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.debtorCredit.bank_not_acc"
                                     @input="changeDebLocal">Нет расчетных счетов
                        </vs-checkbox>
                    </div>
                    <div class="push" style="border: 1px;text-align: right;">
                        <div style="display: flex;margin-right: 35px; ">
                            <span style="margin-left:auto;margin-bottom: 15px"><img src="/loading.gif" v-if="FnsAnswerFindFlag" style="max-width: 40px"></span>
                        <span style="color: orangered;cursor: pointer;margin-left:auto;margin-bottom: 10px;width: 100%"
                                 @click="getFnsAnswerInfo"><b>В ответах ФНС</b></span>
                            <hr width="1" size="30" style="border: 1px solid orangered;margin-top: -5px;margin-left: 20px;margin-right: 20px">
                            <span style="color: orangered;cursor: pointer; margin-bottom: 10px"
                                     @click="getBankHistory"><b>История</b></span>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
        <vs-popup classContent="popup-example" title="Внимание" :active.sync="showSob">

            <h2>Внимание статус не изменился!!! Проверте эти даты:</h2>

            <h6 class="h6">Дата ответа ФНС:</h6>
            <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_return_fns" @blur="changeDeb"></vs-input>
            <h6 class="h6">Дата ответа Альфа:</h6>
            <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_return_alfa"
                      @blur="changeDeb"></vs-input>
            <h6 class="h6">Дата ответа Сбер:</h6>
            <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_return_sber"
                      @blur="changeDeb"></vs-input>
            <h6 class="h6">Дата ответа Совкомбанк:</h6>
            <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_return_sovcom"
                      @blur="changeDeb"></vs-input>

            <h6 class="h6">Дата ответа БФКО:</h6>
            <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_return_bfko"
                      @blur="changeDeb"></vs-input>
            <h6 class="h6">Дата ответа Почта:</h6>
            <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_return_pochta_bank"
                      @blur="changeDeb"></vs-input>
            <h6 class="h6">Дата ответа УралСиб:</h6>
            <vs-input type="date" class="w-100" v-model="Deb.debtorCredit.date_return_uralsib"
                      @blur="changeDeb"></vs-input>


        </vs-popup>
        <vs-popup classContent="popup-example" title="Проверка отправки по ФНС" :active.sync="showCheck">
            <json-viewer
                :value="resultFns"
                :expand-depth=5
                copyable

                sort></json-viewer>

        </vs-popup>

        <vs-popup classContent="popup-example" :title="p_debtor_fio" :active.sync="popupActiveAnswerFile">
            <InFnsAnswersDialog :fnsData="fnsData" :what_from="what_from"></InFnsAnswersDialog>
        </vs-popup>
        <vs-popup class="holamundo" title="История" :active.sync="showBankHistoryFlag">
            <BankHistory></BankHistory>
        </vs-popup>
    </div>
</template>

<script>
import {VueCsvImport} from 'vue-csv-import';
import {AgGridVue} from 'ag-grid-vue'
import JsonViewer from 'vue-json-viewer'
import vSelect from 'vue-select'
import {mapActions, mapGetters} from 'vuex'
import InFnsAnswersDialog from '../Fns/InFnsAnswersDialog.vue'
import BankHistory from "./BankHistory.vue";
import {SpinnerLoader} from 'vue-spinners-css';

import VarToClipboard from './../VarToClipboard.vue'
import r from '../../route';
import axios from '../../axios'

export default {
    components: {
        AgGridVue,
        vSelect,
        VueCsvImport,
        InFnsAnswersDialog,
        BankHistory,VarToClipboard,JsonViewer
    },
    props: {
        checkDateFns: {
            default: false
        },
        checkBank: {
            default: false
        },
    },
    data() {
        return {
            showSob: false,
            showCheck:false,
            resultFns:[],
            showBankHistoryFlag: false,
            popupActiveAnswerFile: false,
            what_from: 'fromCredit',
            p_debtor_fio: '',
            fnsData: [],
            years: ['2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008']
        }
    },
    computed: {

        ...mapGetters([
            'Deb', 'BanksSendArr', 'FnsAnswerFindFlag', 'User','BanksArr'
        ]),
    },
    methods: {
        goCheck(){
            axios.get(r('debtorAll.index'), {
                params: {
                    method: 'goCheckFns',
                    param:this.Deb.debtorCredit.id

                }
            }).then((response) => {
                this.resultFns=response.data.data
                this.showCheck=true
            })
        },
        nameBank(id){
            if(typeof this.BanksSendArr!='undefined'){
                for(let a=0; a<this.BanksSendArr.length; a++){
                    if(this.BanksSendArr[a].id==id){
                        return null
                    }

                }
            }
            if(typeof this.BanksArr!='undefined') {
                for (let a = 0; a < this.BanksArr.length; a++) {
                    if (this.BanksArr[a].id == id) {
                        return this.BanksArr[a].name;
                    }

                }
            }
            return null

        },
        getBankHistory() {
            this.getBankHistoryArr(this.Deb.debtorCredit.id);
            this.showBankHistoryFlag = true;
        },
        changeDebSetDate(){
            if (!this.checkDateFns) {
                this.changeDeb()
            }
            else{
                this.changeDebAndDateReturnFns()
            }
            if (this.$route.name === 'fns_answerfiles'){
                this.setDcStatus(this.Deb.debtorCredit.id);
            }
        },
        changeDebLocal() {
            if (!this.checkBank) {
                this.changeDeb()
            }
            if (this.checkBank) {
                let status = this.Deb.debtorCredit.id_status
                this.changeAndCheckBankStatusDeb().then((response) => {
                    if (status == response.id_status) {
                        this.showSob = true;
                    }
                    this.$emit('checkStat')


                })

            }
        },
        getFnsAnswerInfo() {
            this.p_debtor_fio = this.Deb.debtor.name_family + ' ' + this.Deb.debtor.name + ' ' + this.Deb.debtor.name_patronymic;
            this.getFnsAnswerData({fnsDataId: this.Deb.debtorCredit.id, what_from: this.what_from}).then((response) => {
                if (response.result) {
                    this.fnsData = response.fns_answer;
                    // this.p_debtor_fio = event.data.debtor_fio;
                    // this.p_name_answer_file = event.data.name_answer_file;
                    // this.p_date_file = event.data.date_file;
                    // this.p_file_data = event.data.file_data;
                    // this.p_error = event.data.error_file;
                    // this.p_error_text = event.data.error_text;
                    this.popupActiveAnswerFile = true;
                }
            }).catch(error => {
                this.$vs.loading.close()
                this.$vs.notify({
                    title: 'Ошибка',
                    text: error.message,
                    color: 'danger',
                    position: 'top-center'
                })
            });
        },
        ...mapActions([
            'changeDeb', 'getFnsAnswerData', 'changeAndCheckBankStatusDeb', 'getBanksNameAndId', 'getBankHistoryArr',
            'changeDebAndDateReturnFns', 'setDcStatus'
        ]),
    },
    mounted() {
        this.getBanksNameAndId();
    }
}

</script>

<style lang="scss">
.bank{
    font-size: 10px;
    color: red;
}
.h6 {
    font-size: 12px;
    color: cadetblue;
}

.f {
    width: 100%;
    border: 1px;
    border-style: double;
    border-color: #62626262;
    border-radius: 8px;
}

.l {
    color: #a00;
    padding: 0 10px;
}

.box {
    display: flex;
    margin-top: 15px;
}

.box1 {
    display: flex;
}

.push {
    margin-left: auto;
    width: 300px;
}

.push1 {
    margin-left: auto;
    margin-bottom: 5px;
}


</style>
