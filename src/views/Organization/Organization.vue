<template>
    <vx-card no-shadow>
        <div class="mt-5">
            <div class="vx-breadcrumb ml-4 md:block hidden" style="cursor: pointer;">
                <ul class="flex flex-wrap items-center" style="cursor: pointer;">
                    <li class="inline-flex items-center" style="cursor: pointer;" @click="onBackClick"><span class="text-primary cursor-default">   <arrow-left-icon  style="cursor: pointer;" size="1.5x" class="custom-class" ></arrow-left-icon></span><span
                            class="breadcrumb-separator mx-2 flex items-start"><span
                            class="feather-icon select-none relative"></span></span></li>
                </ul>
            </div>
            <vs-tabs >
                <vs-tab label="Основные">
                    <h6 class="h6Blue">Организация: <VarToClipboard name="org_name"/></h6>
                    <vs-input class="w-full"  v-model="data.name"></vs-input>
                        <h6 class="h6Blue">Короткое название: <VarToClipboard name="org_short_name"/></h6>
                    <vs-input class="w-full"  v-model="data.short_name"></vs-input>
                    <h6 class="h6Blue">Должность руководителя: <VarToClipboard name="org_chief"/></h6>
                    <vs-input class="w-full"  v-model="data.chief"></vs-input>
                    <h6 class="h6Blue">Руководитель: <VarToClipboard name="org_director"/></h6>
                    <vs-input class="w-full"  v-model="data.director"></vs-input>
                    <h6 class="h6Blue">Почтовый индекс:<VarToClipboard name="org_index_pochta"/></h6>
                    <vs-input class="w-100"   v-model="data.index_pochta" ></vs-input>
                    <label style="margin-bottom: 5px">Адрес<VarToClipboard name="org_address"/></label>
                    <VueSuggestions
                            style="margin-bottom: 20px"
                            placeholder="Адрес"
                            :model.sync="data.address"
                            :fias.sync="data.address_data"
                            :options="SuggestionOptionsAddress">
                    </VueSuggestions>
                    <label style="margin-bottom: 5px">Адрес для писем <span style="color: red;cursor:pointer" @click="showPochta=!showPochta">Почта</span><VarToClipboard name="org_address_letter"/></label>
                    <VueSuggestions
                            style="margin-bottom: 20px"
                            placeholder="Адрес"
                            :model.sync="data.address_letter"
                            :fias.sync="data.address_letter_data"
                            :options="SuggestionOptionsAddress">

                    </VueSuggestions>
                    <vs-popup class="holamundo" title="Инфо" :active.sync="showPochta">
                        <json-viewer
                                :value="data.letter_data"
                                :expand-depth=5
                                copyable
                                v-if="data.letter_data"
                                sort></json-viewer>

                    </vs-popup>
                    <h6 class="h6Blue">ОГРН: <VarToClipboard name="org_ogrn"/></h6>
                    <vs-input class="w-full" v-model="data.ogrn"></vs-input>

                    <h6 class="h6Blue">ИНН: <VarToClipboard name="org_inn"/></h6>
                    <vs-input class="w-full" v-model="data.inn"></vs-input>

                    <h6 class="h6Blue">КПП: <VarToClipboard name="org_kpp"/></h6>
                    <vs-input class="w-full"  v-model="data.kpp"></vs-input>

                    <h6 class="h6Blue">Телефон: <VarToClipboard name="org_phone"/></h6>
                    <vs-input class="w-full" v-model="data.phone"></vs-input>

                    <h6 class="h6Blue">Сайт: <VarToClipboard name="org_site"/></h6>
                    <vs-input class="w-full" v-model="data.site"></vs-input>

                    <h6 class="h6Blue">Электронная почта: <VarToClipboard name="org_email"/></h6>
                    <vs-input class="w-full"  v-model="data.email"></vs-input>
                   <!-- <h6 class="h6Blue" style="margin-top: 10px">ИФНС организации: <VarToClipboard name="org_fns"/></h6>
                    <v-select  class="w-50 " style="margin-bottom: 50px" :reduce="label => label.id" label="nameAll" :options="IfnsSelect"   v-model="data.org_fns"  ></v-select>
                    -->

                    <h6 class="h6Blue">Должность представителя организации: <VarToClipboard name="org_delegate_director"/></h6>
                    <vs-input class="w-full"  v-model="data.delegate_director"></vs-input>
                    <h6 class="h6Blue">ФИО представителя организации: <VarToClipboard name="org_delegate_fio"/></h6>
                    <vs-input class="w-full"  v-model="data.delegate_fio"></vs-input>
                    <h6 class="h6Blue">ИНН представителя организации: <VarToClipboard name="org_delegate_inn"/></h6>
                    <vs-input class="w-full"  v-model="data.delegate_inn"></vs-input>
                    <h6 class="h6Blue">ОГРН представителя организации: <VarToClipboard name="org_delegate_ogrn"/></h6>
                    <vs-input class="w-full"  v-model="data.delegate_ogrn"></vs-input>
                    <h6 class="h6Blue">Юридический адрес представителя организации: <VarToClipboard name="org_delegate_address"/></h6>
                    <label style="margin-bottom: 5px">Адрес</label>
                    <VueSuggestions
                            style="margin-bottom: 20px"
                            placeholder="Адрес"
                            :model.sync="data.delegate_address"
                            :fias.sync="data.delegate_address_data"
                            :options="SuggestionOptionsAddress">

                    </VueSuggestions>
                    <h6 class="h6Blue" style="margin-top: 5px">Настройки почты России:</h6>
                    <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="PochtaSettingsList"  v-model="data.id_pochta_settings"  ></v-select>
                    <h6 class="h6Blue">Сбер osb_list: <VarToClipboard name="org_osb_list"/></h6>
                    <vs-input class="w-full" v-model="data.osb_list"></vs-input>
                    <h6 class="h6Blue">Сбер product_area_code: <VarToClipboard name="org_sberbank_code_product_area"/></h6>
                    <vs-input class="w-full" v-model="data.sberbank_code_product_area"></vs-input>
                    <h6 class="h6Blue">Сбер file_code: <VarToClipboard name="org_file_code"/></h6>
                    <vs-input class="w-full" v-model="data.file_code"></vs-input>
                    <h6 class="h6Blue">Сбер bailiff: <VarToClipboard name="org_bailiff"/></h6>
                    <vs-input class="w-full" v-model="data.bailiff"></vs-input>
                    <div style="margin-top: 10px">
                        <vs-row>
                            <vs-col vs-offset="8"  vs-type="flex" vs-justify="center" vs-align="center" >
                                <vs-button style="margin-left: 15px; margin-right: 25px" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
                            </vs-col>
                        </vs-row>
                    </div>
                </vs-tab>
               <vs-tab label="Банковские реквизиты" v-if="$route.params.id!='new'">
                <div class="vx-row" style="padding-top: 20px">
                  <div class="vx-col sm:w-1/2 w-full mb-2">
                    <h6 class="h6Blue">Бик Банка:<VarToClipboard name="org_pay_bic"/></h6>
                    <vs-input class="w-100" v-model="data.pay_bic" @change="saveLoc"></vs-input>
                    <h6 class="h6Blue">Банк:<VarToClipboard name="org_pay_bank"/></h6>
                    <vs-input class="w-full " style="max-width: 450px" v-model="data.pay_bank" @change="saveLoc"></vs-input>
                    <h6 class="h6Blue">Р/с:<VarToClipboard name="org_pay_account"/></h6>
                    <vs-input class="w-100 "  v-model="data.pay_account" @change="saveLoc"></vs-input>
                    <h6 class="h6Blue">К/с:<VarToClipboard name="org_pay_ks"/></h6>
                    <vs-input class="w-100 "  v-model="data.pay_ks" @change="saveLoc"></vs-input>
                    <h6 class="h6Blue">ИНН получателя платежа:<VarToClipboard name="org_pay_inn_payee"/></h6>
                    <vs-input class="w-100 "  v-model="data.pay_inn_payee" @change="saveLoc"> </vs-input>
                    <h6 class="h6Blue">КПП получателя платежа:<VarToClipboard name="org_pay_kpp"/></h6>
                    <vs-input class="w-100" v-model="data.pay_kpp" @change="saveLoc"></vs-input>
                    <h6 class="h6Blue">Получатель платежа:<VarToClipboard name="org_pay_payee"/></h6>
                    <vs-input class="w-full " style="max-width: 450px" v-model="data.pay_payee" @change="saveLoc"></vs-input>
                  </div>
                </div>
                </vs-tab>
                <vs-tab label="Реквизиты ГП" v-if="$route.params.id!='new'">
                    <GospohlinaReqTable :id="id_orgn"></GospohlinaReqTable>
                </vs-tab>
                <vs-tab label="Документы Организации" v-if="$route.params.id!='new'">
                    <OrganizationDocument :id="id_orgn"></OrganizationDocument>
                </vs-tab>
                <vs-tab label="Госуслуги"  v-if="$route.params.id!='new'">
                  <h6 class="h6" style="margin-top: 10px">Организация для входа:</h6>
                  <vs-input class="w-full" v-model="data.orgn_name_gu" @change="saveLoc"></vs-input>

                  <h6  class="h6" style="margin-top: 10px">ФЛ для входа:</h6>
                  <vs-input class="w-full" v-model="data.fl_name_gu" @change="saveLoc"></vs-input>
                  <vs-checkbox  style="margin-top: 10px" v-model="data.gosuslug_fizik" @input="saveLoc">Отправлять от физ. лица</vs-checkbox>
                  <h6  class="h6" style="margin-top: 10px">Адрес:</h6>
                  <vs-input class="w-full" v-model="data.orgn_address_gu" @change="saveLoc"></vs-input>
                  <h6  class="h6" style="margin-top: 10px">Номер доверенности:</h6>
                  <vs-input class="w-full" v-model="data.dover_number" @change="saveLoc"></vs-input>
                  <h6  class="h6" style="margin-top: 10px">Дата доверенности:</h6>
                  <vs-input type="date" class="w-50" v-model="data.dover_date" @blur="saveLoc"></vs-input>
                  <vs-checkbox  style="margin-top: 10px" v-model="data.gas_not_dover" @input="saveLoc">ГАС без доверенности</vs-checkbox>
                  <vs-checkbox  v-model="data.gas_not_pay_gp" @input="saveLoc">Заявитель освобожден от уплаты государственной пошлины в соответствии со статьями 333.35, 333.36 НК РФ</vs-checkbox>
                  <h6  class="h6" style="margin-top: 10px">Фамилия:</h6>
                  <vs-input class="w-full" v-model="data.dover_last_name" @change="saveLoc"></vs-input>
                  <h6  class="h6" style="margin-top: 10px">Имя:</h6>
                  <vs-input class="w-full" v-model="data.dover_name" @change="saveLoc"></vs-input>
                  <h6  class="h6" style="margin-top: 10px">Отчество:</h6>
                  <vs-input class="w-full" v-model="data.dover_middle_name" @change="saveLoc"></vs-input>
                  <h6  class="h6" style="margin-top: 10px">Дата рождения:</h6>
                  <vs-input type="date" class="w-50" v-model="data.dover_dr" @blur="saveLoc"></vs-input>
                  <h6  class="h6" style="margin-top: 10px">СНИЛС:</h6>
                  <vs-input class="w-full" v-model="data.dover_snils" @change="saveLoc"></vs-input>
                  <div class="mt-8 mb-4">
                      <h6  class="h6">Пол:</h6>
                      <div class="mt-2 mb-4">
                          <vs-radio v-model="data.dover_sex" vs-value="M" class="mr-4" @input="saveLoc">Мужской</vs-radio>
                          <vs-radio v-model="data.dover_sex" vs-value="F" class="mr-4" @input="saveLoc">Женский</vs-radio>
                      </div>
                     <span  style="max-width: 10px;">
                        <div class="centerx" style="margin-bottom: 5px;">
                            <h6 class="h6 sv-flex-row mb-4">Логин и пароль гос услуги <GuestGu :login="data.loginGosUslugi"></GuestGu></h6>
                        </div>
                        <div class="vx-row">
                            <div class="vx-col">
                              <h6  class="h6">Логин:</h6>
                              <vs-input class="w-full mb-base"   v-model="data.loginGosUslugi"  @change="saveLoc"></vs-input>
                            </div>
                            <div class="vx-col">
                                <h6  class="h6">Пароль:</h6>
                                                    <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary ">
                        <!----><div class="vs-con-input">
                        <input  :type="type" v-model="data.passwordGosUslugi"  @change="saveLoc"  class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                        <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeType">visibility</i>
                                                      <!----></div><span></span></div>

                            </div>
                             <div class="vx-col">
                               <h6 class="h6">Токен:</h6>
                               <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary">
                                <div class="vs-con-input">
                                  <input :type="type_token" v-model="data.tokenGosUslugi" @change="saveLoc" class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                                  <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeTypeToken">visibility</i>
                                </div>
                               </div>

<!--                              <vs-input class="w-full mb-base"  v-model="data.tokenGosUslugi"  @change="saveLoc"></vs-input>-->
                            </div>

                          <span style="color:red;margin-top: 25px;cursor: pointer" @click="getCode('tokenGosUslugi')">Получить код</span>
                        </div>




                     </span>
                    <span  style="max-width: 10px;">
                        <div class="centerx">
                          <vs-tooltip text="Логин и пароль ГАС, если пусто используется Логин и пароль гос услуги " position="top" >
                            <h6 class="h6 sv-flex-row mb-4" >Логин и пароль ГАС<GuestGu :login="data.gas_login"></GuestGu></h6>
                          </vs-tooltip>
                        </div>
                         <div class="vx-row">
                            <div class="vx-col">
                              <h6  class="h6">Логин:</h6>
                              <vs-input class="w-full mb-base"  v-model="data.gas_login"  @change="saveLoc"></vs-input>
                            </div>
                            <div class="vx-col">
                                <h6  class="h6">Пароль:</h6>
                                                      <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary">
                        <!----><div class="vs-con-input">
                        <input  :type="type" v-model="data.gas_password"  @change="saveLoc"  class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                        <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeType">visibility</i>
                                                        <!----></div><span></span></div>

                            </div>
                          <div class="vx-col">
                              <h6 class="h6">Токен:</h6>
                            <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary">
                                <div class="vs-con-input">
                                  <input :type="type_token" v-model="data.gas_token" @change="saveLoc" class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                                  <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeTypeToken">visibility</i>
                                </div>
                               </div>

<!--                              <vs-input class="w-full mb-base"  v-model="data.gas_token"  @change="saveLoc"></vs-input>-->
                            </div>
                           <span style="color:red;margin-top: 25px;cursor: pointer" @click="getCode('gas_token')">Получить код</span>
                        </div>
                       <div class="vx-row">
                            <div class="vx-col">
                                  <h6  class="h6">Ключ крипто Имя:<span style="cursor: pointer;color: red" @click="showKey(data.key_name_gas)">Инфо</span></h6>

                              <vs-input class="w-full mb-base"  v-model="data.key_name_gas"  @change="saveLoc"></vs-input>
                            </div>
                            <div class="vx-col">
                                <h6  class="h6">Ключ крипто Пароль:</h6>
                                                      <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary">
                                <div class="vs-con-input">
                                <input  :type="type" v-model="data.key_pass_gas"  @change="saveLoc"  class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                                <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeType">visibility</i>
                                                                <!----></div><span></span>
                                                      </div>

                            </div>

                       </div>


                     </span>
                    <span  style="max-width: 10px;">
                        <div class="centerx">
                          <vs-tooltip text="Логин и пароль ГАС ИСК, если пусто используется Логин и пароль ГАС " position="top" >
                            <h6 class="h6 sv-flex-row mb-4" >Логин и пароль ГАС ИСК<GuestGu :login="data.gas_login_isk"></GuestGu></h6>
                          </vs-tooltip>
                        </div>
                         <div class="vx-row">
                            <div class="vx-col">
                              <h6  class="h6">Логин:</h6>
                              <vs-input class="w-full mb-base"  v-model="data.gas_login_isk"  @change="saveLoc"></vs-input>
                            </div>
                            <div class="vx-col">
                                <h6  class="h6">Пароль:</h6>
                                                      <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary">
                        <!----><div class="vs-con-input">
                        <input  :type="type" v-model="data.gas_password_isk"  @change="saveLoc"  class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                        <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeType">visibility</i>
                                                        <!----></div><span></span></div>

                            </div>
                            <div class="vx-col">
                              <h6  class="h6">Токен:</h6>
                              <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary">
                                <div class="vs-con-input">
                                  <input :type="type_token" v-model="data.gas_token_isk" @change="saveLoc" class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                                  <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeTypeToken">visibility</i>
                                </div>
                               </div>

<!--                              <vs-input class="w-full mb-base"   v-model="data.gas_token_isk"  @change="saveLoc"></vs-input>-->
                            </div>
                           <span style="color:red;margin-top: 25px;cursor: pointer" @click="getCode('gas_token_isk')">Получить код</span>

                        </div>
                        <div class="vx-row">
                            <div class="vx-col">
                                <vs-tooltip text="Если пусто используется общий " position="top" >
                                  <h6  class="h6">Ключ крипто Имя:<span style="cursor: pointer;color: red" @click="showKey(data.key_name_isk)">Инфо</span></h6>
                              </vs-tooltip>
                                <vs-input class="w-full mb-base"  v-model="data.key_name_isk"  @change="saveLoc"></vs-input>
                            </div>
                            <div class="vx-col">
                                <h6  class="h6">Ключ крипто Пароль:</h6>
                                                      <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary">
                                <!----><div class="vs-con-input">
                                <input  :type="type" v-model="data.key_pass_isk"  @change="saveLoc"  class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                                <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeType">visibility</i>
                                                                <!----></div><span></span></div>

                            </div>
                        </div>




                     </span>
                     <span  style="max-width: 10px;">
                        <div class="centerx" style="margin-bottom: 5px;">
                            <h6 class="h6 sv-flex-row mb-4">Логин и пароль Арбитр<GuestGu :login="data.loginArbitr"></GuestGu></h6>
                        </div>
                         <div class="vx-row">
                            <div class="vx-col">
                              <h6  class="h6">Логин:</h6>
                               <vs-input class="w-full mb-base"   v-model="data.loginArbitr"  @change="saveLoc"></vs-input>
                            </div>
                            <div class="vx-col">
                                <h6  class="h6">Пароль:</h6>
                                   <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary">
                                <!----><div class="vs-con-input">
                                <input  :type="type" v-model="data.passwordArbitr"  @change="saveLoc"  class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                                <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeType">visibility</i>
                                             <!----></div><span></span></div>

                            </div>
                            <div class="vx-col">
                              <h6  class="h6">Токен:</h6>
                                   <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary">
                                <div class="vs-con-input">
                                  <input :type="type_token" v-model="data.tokenArbitr" @change="saveLoc" class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                                  <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeTypeToken">visibility</i>
                                </div>
                               </div>
                            </div>
                            <span style="color:red;margin-top: 25px;cursor: pointer" @click="getCode('tokenArbitr')">Получить код</span>

                        </div>
                       <div class="vx-row">
                            <div class="vx-col">
                                  <h6  class="h6">Ключ крипто Имя:<span style="cursor: pointer;color: red" @click="showKey(data.key_name_arbitr)">Инфо</span></h6>
                                  <vs-input class="w-full mb-base"  v-model="data.key_name_arbitr"  @change="saveLoc"></vs-input>
                            </div>


                            <div class="vx-col">
                                <h6  class="h6">Ключ крипто Пароль:</h6>
                                                      <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary">
                                <div class="vs-con-input">
                                <input  :type="type" v-model="data.key_pass_arbitr"  @change="saveLoc"  class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                                <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeType">visibility</i>
                                                                <!----></div><span></span></div>

                            </div>
                       </div>

                     </span>
                    <span  style="max-width: 10px;">
                        <div class="centerx" style="margin-bottom: 5px;">
                            <h6 class="h6 sv-flex-row mb-4">Логин и пароль Моs-sud<GuestGu :login="data.login_mos"></GuestGu></h6>
                        </div>
                         <div class="vx-row">
                            <div class="vx-col">
                              <h6  class="h6">Логин:</h6>
                               <vs-input class="w-full mb-base"   v-model="data.login_mos"  @change="saveLoc"></vs-input>
                            </div>
                            <div class="vx-col">
                                <h6  class="h6">Пароль:</h6>
                                   <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary">
                                <!----><div class="vs-con-input">
                                <input  :type="type" v-model="data.pass_mos"  @change="saveLoc"  class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                                <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeType">visibility</i>
                                     <!----></div><span></span></div>

                            </div>
                            <div class="vx-col">
                              <h6  class="h6">Токен:</h6>
                                <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary">
                                <div class="vs-con-input">
                                  <input :type="type_token" v-model="data.token_mos" @change="saveLoc" class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                                  <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeTypeToken">visibility</i>
                                </div>
                               </div>
                            </div>

                           <span style="color:red;margin-top: 25px;cursor: pointer" @click="getCode('token_mos')">Получить код</span>

                        </div>
                       <div class="vx-row">
                            <div class="vx-col">
                                  <h6  class="h6">Ключ крипто Имя:<span style="cursor: pointer;color: red" @click="showKey(data.crypto_key_mos)">Инфо</span></h6>
                                  <vs-input class="w-full mb-base"  v-model="data.crypto_key_mos"  @change="saveLoc"></vs-input>
                            </div>


                            <div class="vx-col">
                                <h6  class="h6">Ключ крипто Пароль:</h6>
                                                      <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary">
                                <div class="vs-con-input">
                                <input  :type="type" v-model="data.crypto_pass_mos"  @change="saveLoc"  class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                                <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeType">visibility</i>
                                  <!----></div><span></span></div>

                            </div>
                             <div class="vx-col">
                                <h6  class="h6">Токен 2:</h6>
                                 <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary">
                                <div class="vs-con-input">
                                  <input :type="type_token" v-model="data.token_two_mos" @change="saveLoc" class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                                  <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeTypeToken">visibility</i>
                                </div>
                               </div>
                              </div>
                             <span style="color:red;margin-top: 25px;cursor: pointer" @click="getCode('token_two_mos')">Получить код</span>
                       </div>
                        <div class="vx-row">
                            <div class="vx-col">
                                  <h6  class="h6">Имя Входа:</h6>
                                  <vs-input class="w-full mb-base"  v-model="data.mos_account"  @change="saveLoc"></vs-input>
                            </div>


                            <div class="vx-col">
                                <vs-checkbox style="margin: 10px 0 15px;" v-model="data.mos_not_dover" @input="saveLoc">Без доверенности</vs-checkbox>

                            </div>
                             <div class="vx-col">
                               <vs-checkbox style="margin: 10px 0 15px;" v-model="data.mos_not_pay" @input="saveLoc">Без ГП</vs-checkbox>
                              </div>
                       </div>
                       <vs-popup class="holamundo" title="Инфо" :active.sync="showCerKey">
                         <json-viewer
                             :value="cerKey"
                             :expand-depth=5
                             copyable

                             sort></json-viewer>
                      </vs-popup>
                     </span>
                  </div>

              </vs-tab>
                <vs-tab label="КриптоПро"  v-if="$route.params.id!='new'">
                      <h6 class="h6Blue">Название ключа: <VarToClipboard name="org_key_name"/></h6>
                      <vs-input class="w-full"  v-model="data.key_name" @change="saveLoc"></vs-input>
                      <h6 class="h6Blue">Пароль: <VarToClipboard name="org_key_pass"/></h6>
                  <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary is-label-placeholder">
                    <!----><div class="vs-con-input">
                    <input  :type="type" v-model="data.key_pass"  @change="saveLoc"  class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);">
                    <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeType">visibility</i>
                    <!----></div><span></span></div>
                  <json-viewer
                    :value="cer"
                    :expand-depth=5
                    copyable

                    sort>
                  </json-viewer>

                   <vs-button class="w-1/3 ml-auto" @click="goImport" color="primary" type="filled">Подписать документ</vs-button>
                  <input type="file" ref="fileInput" class="hidden" @change="handleClick">

                </vs-tab>
                <vs-tab label="Реестры" v-if="$route.params.id!='new'">
                  <OrganizationReestr :id="data.id"></OrganizationReestr>
                </vs-tab>
              <vs-tab label="Задачи" v-if="$route.params.id!='new'">
                <OrganisationTask ></OrganisationTask>
              </vs-tab>
                <vs-tab label="Дополнительные переменнные" v-if="$route.params.id!='new'">
                  <OrganizationVar></OrganizationVar>
                </vs-tab>
                <vs-tab label="Настройки шаблонов" v-if="$route.params.id!='new'">
                    <ShablonSettings></ShablonSettings>
                </vs-tab>
                <vs-tab label="Настройки Запросов Банки ЭДО" v-if="$route.params.id!='new'">
                    <RequestEDOSettings></RequestEDOSettings>
                </vs-tab>
            </vs-tabs>
        </div>
    </vx-card>
</template>

<script>
    import VueSuggestions from '../../components/vue-suggestions/vue-suggestionsChange.vue';
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import GospohlinaReqTable from './GospohlinaReqTable.vue'
    import OrganizationDocument from './OrganizationDocument.vue'
    import { ArrowLeftIcon } from 'vue-feather-icons'
    import OrganizationVar from './OrganizationVar.vue'
    import GuestGu from '../QuestGu/GuestGu.vue'
    import OrganizationReestr from './OrganizationReestr.vue'
    import OrganisationTask from './OrganisationTask.vue'
    import ShablonSettings from './ShablonSettings.vue'
    import RequestEDOSettings from './RequestEDOSettings.vue'
    import VarToClipboard from "../VarToClipboard";
    export default {
        components: {
          VueSuggestions,
          GospohlinaReqTable,
          OrganizationReestr,
          OrganisationTask,
          OrganizationDocument,
          ArrowLeftIcon,
          GuestGu,
          OrganizationVar,
          ShablonSettings,
          RequestEDOSettings,
          VarToClipboard,
        },
        data () {
            return {
                cerKey:{},
                showCerKey:false,
                showAllKey:false,
                showArbitrkKey:false,
                showIskKey:false,
                type:'password',
                type_token:'password',
                cer: {},
                cer1: {},
                cer2: {},
                gas: {},
                arr:[
                    {id:0,name:'Нет'},
                    {id:1,name:'Да'},
                ],
                arrIl:[
                    {id:0,name:'Нет'},
                    {id:1,name:'Да'},
                ],
                id_orgn:'',
                showPochta:false,
                data_reg:{},
                data:{

                },

            }
        },
        mounted(){
            this.getDataPochtaSettingsList()

            this.id_orgn=this.$route.params.id
            if(this.$route.params.id!='new'){
                this.getData()
            }
            this.getIfnsSelect()

        },

        computed: {
            ...mapGetters([
                'User','IfnsSelect','SuggestionOptionsAddress','PochtaSettingsList'
            ]),
        },
        methods: {
          showKey(key){
            axios.get(r("setting.index"), {
              params: {
                method: 'getPochtaKey',
                param:{
                  name:key,
                }

              }
            }).then((response) => {
              if (response.data.result){

                this.cerKey=response.data.data;
                this.showCerKey=true
              }

            })
          },
          handleClick (evt) {


            this.$vs.loading({color: '#ff8000'})
            const formData = new FormData()
            formData.append('document', evt.target.files[0])
            formData.append('id_org', this.data.id)

            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`


            axios.post('/organization/crypto',

                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }
            ).then((response) => {
              this.$vs.loading.close()
              if(response){

                const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', evt.target.files[0].name+'.sig');
                document.body.appendChild(link);
                link.click();
              }
              else{

                //   this.popupActive3=false;
                this.$vs.notify({
                  title: 'Ошибка',
                  text: error.message,
                  color: 'danger',
                  position: 'top-center'
                })
              }
            }).catch(error => {
              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Ошибка',
                text: error.message,
                color: 'danger',
                position: 'top-center'
              })

            })

            this.$refs.fileInput.value = '';
          },
          goImport(){
            this.$refs.fileInput.click()
          },
            changeType(){
              if(this.type=='password'){
                this.type='text'
              }else{
                this.type='password'
              }
            },
          changeTypeToken(){
            if(this.type_token=='password'){
              this.type_token='text'
            }else{
              this.type_token='password'
            }
          },
            onBackClick(){
                this.$router.push('/organization')
            },
            close(){
                this.$router.back()
            },
            ...mapActions([
                'getIfnsSelect','getDataPochtaSettingsList'
            ]),
            getCryptoCer(){
                axios.get(r("organization.index"), {
                    params: {
                        method: 'getCryptoCer',
                        param: this.id_orgn

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.cer=response.data.cer;
                        this.cer1=response.data.cer1;
                    }
                })
            },
            getData(){
                axios.get(r("organization.index"), {
                    params: {
                        method: 'getOrganization',
                        param: this.id_orgn

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.getCryptoCer()
                        this.data=response.data.data;
                    }
                })
            },
            save(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("organization.index"), {
                    params: {
                        method: 'saveOrganization',
                        param: this.data

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.$router.back()
                        this.id_orgn=response.data.id
                        this.enabledOrgn=true
                        this.getData()
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!' , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось' , color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })


            },
            saveLoc(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("organization.index"), {
                    params: {
                        method: 'saveOrganization',
                        param: this.data

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){


                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось' , color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })


            },
          getCode(field) {
            if (this.$route.params.id != 'new') {
              this.getCodeForEnterGu({
                id_org: this.$route.params.id,
                field: field
              }).then((response) => {
                if (response.result) {
                  this.$copyText(response.code);
                  this.$vs.notify({
                    title: 'Сообщение',
                    text: 'Скопировано в буфер обмена: ' + response.code,
                    color: 'primary',
                    position: 'top-center'
                  })
                } else {
                  this.$vs.notify({
                    title: 'Ошибка',
                    text: response.error,
                    color: 'danger',
                    position: 'top-center'
                  })
                }
              });
            } else {
              this.$vs.notify({
                title: 'Ошибка',
                text: 'Сохраните запись',
                color: 'danger',
                position: 'top-center'
              })
            }
          },
          ...mapActions([
            'getCodeForEnterGu'
          ]),

        },
    }
</script>
