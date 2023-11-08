<template>
    <vx-card no-shadow>
        <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col sm:w-1/2 w-full">
                <template v-if="typeof Deb.debtorCredit.id!='undefined'">
                    <Status :id_credit="Deb.debtorCredit.id" class="h6"></Status>
                </template>
              <div class="vx-row" style="margin-top: -10px">
                <div class="vx-col sm:w-1/2 mb-2" style="margin-top: -4px;">

                <div class="centerx">
                  <vs-tooltip text="Возможность дописать необходимую информацию, сделать пометку к документу" position="top" >
                    <h6 class="h6">Особые пометки:<VarToClipboard name="dc_comment"/></h6>
                  </vs-tooltip>
                </div>
                <vs-textarea class="w-100"  v-model="Deb.debtorCredit.comment" @change="changeDeb"> </vs-textarea>
                <!--
                <div class="centerx mt-4">
                  <vs-tooltip text="Cправочник этапов стратегии – очередность видов взаимодействия и скриптов взаимодействия – проставляется в соответствии с применяемой стратегией: например Первичный звонок – значит идет обзвон по реестру без оператора" position="top" >
                    <h6 class="h6 mb-1">Этап стратегии<VarToClipboard name="dc_comment"/></h6>
                  </vs-tooltip>
                </div>
                <v-select  class="w-50 mb-4" label="name" style="margin-bottom: 40px" ></v-select>

                <div class="centerx">
                  <vs-tooltip text="Показывает следующий этап взаимодействия в соответствии с планом стратегии" position="top" >
                    <h6 class="h6 mb-1">Следующий этап стратегии<VarToClipboard name="dc_comment"/></h6>
                  </vs-tooltip>
                </div>
                <div class="mt-2 mb-4">
                  <vs-checkbox class="mb-1" @input="">Дата</vs-checkbox>
                  <vs-checkbox class="mb-1" @input="">Вид</vs-checkbox>
                  <vs-checkbox class="mb-1" @input="">Шаблон</vs-checkbox>
                </div>

                -->

                  <fieldset class="f">
                    <legend class="l">Данные должника:</legend>
                    <div class="centerx">
                      <vs-tooltip text="Фамилия должника (обязательный параметр) " position="top" >
                        <h6 class="h6 mb-1" @dblclick="copy">Фамилия:<VarToClipboard name="d_name_family"></VarToClipboard></h6>
                      </vs-tooltip>
                    </div>
                    <vs-input class="mb-2"  v-model="Deb.debtor.name_family" @change="changeDeb"></vs-input>

                    <div class="centerx">
                      <vs-tooltip text="Указывается в случае смены фамилии должника" position="top" >
                        <h6 class="h6 mb-1">Предыдущая фамилия:<VarToClipboard name="d_name_family_last"/></h6>
                      </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2"  v-model="Deb.debtor.name_family_last" @change="changeDeb"></vs-input>

                    <div class="centerx">
                      <vs-tooltip text="Имя должника" position="top" >
                        <h6 class="h6 mb-1" @dblclick="copy">Имя:<VarToClipboard name="d_name"/></h6>
                      </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2" v-model="Deb.debtor.name" @change="changeDeb"></vs-input>

                    <div class="centerx">
                      <vs-tooltip text="Отчество должника" position="top" >
                        <h6 class="h6 mb-1" @dblclick="copy">Отчество:<VarToClipboard name="d_name_patronymic"/></h6>
                      </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2"  v-model="Deb.debtor.name_patronymic" @change="changeDeb"></vs-input>

                    <div class="centerx">
                      <vs-tooltip text="Дата рождения должника" position="top" >
                        <h6 class="h6 mb-1" @dblclick="copy">Дата рождения:<VarToClipboard name="d_birthdate"/></h6>
                      </vs-tooltip>
                    </div>
                    <vs-input type="date" class="w-100 mb-2" v-model="Deb.debtor.birthdate" @blur="changeDeb"></vs-input>

                    <div class="centerx">
                      <vs-tooltip text="В случае смерти указывается дата" position="top" >
                        <h6 class="h6 mb-1">Дата смерти:<VarToClipboard name="dcs_inh_death_date"/></h6>
                      </vs-tooltip>
                    </div>
                    <vs-input type="date" class="w-100 mb-2" v-model="Deb.debtorCreditSud.inh_death_date"  @blur="changeDeb"></vs-input>

                    <div class="centerx">
                      <vs-tooltip text="Определяется автоматически" position="top" >
                        <h6 class="h6 mb-1">Регион проживания:</h6>
                      </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2" disabled v-model="liveRegion"></vs-input>

                    <div>
                      <h6 class="h6 mb-1">Пол:<VarToClipboard name="d_sex"/></h6>
                      <div class="mt-2">
                        <vs-radio v-model="Deb.debtor.sex" vs-value="M" class="mr-4 mb-2"  @input="changeDeb">Мужской</vs-radio>
                        <vs-radio v-model="Deb.debtor.sex" vs-value="F" class="mr-4 mb-2"  @input="changeDeb">Женский</vs-radio>
                      </div>
                    </div>

                    <div class="centerx">
                      <vs-tooltip text="Определяется автоматически" position="top" >
                        <h6 class="h6 mb-1" style="margin-top: 10px">Статус гражданина:</h6>
                      </vs-tooltip>
                    </div>
                    <div class="mt-2">
                      <vs-radio v-model="Deb.debtor.pensioner"  @change="changeDeb" vs-value="0" vs-name="pensioner" class="mr-4 mb-2">Работающий</vs-radio>
                      <vs-radio v-model="Deb.debtor.pensioner" @change="changeDeb" vs-value="1" vs-name="pensioner" class="mr-4 mb-2">Пенсионер</vs-radio>
                    </div>
                    <vs-checkbox style="margin: 0" v-model="Deb.debtor.pensioner_check" @input="changeDeb">Не учитывать</vs-checkbox>

                    <div class="centerx">
                      <vs-tooltip text="Характеристика отвветственности" position="top" >
                        <h6 class="h6 mb-1" style="margin-top: 15px">Тип должника:<VarToClipboard name="dc_type_debtor"/></h6>
                      </vs-tooltip>
                    </div>
                    <v-select  style="" :reduce="label=>label.id" label="name" :options="TypeDebtorInDebtorCreditArr"  v-model="Deb.debtorCredit.type_debtor" @input="changeDeb" ></v-select>

                    <div class="centerx">
                      <vs-tooltip text="Уникальный идентификационный номер должника" position="top" >
                        <h6 class="h6 mb-1" style="margin-top: 15px">ID_Должника:<VarToClipboard name="d_id"/></h6>
                      </vs-tooltip>
                    </div>
                    <vs-input class="w-50 "  v-model="Deb.debtor.id" disabled ></vs-input>

                  </fieldset>

                </div>
                <div class="vx-col sm:w-1/2 mb-2">
                  <fieldset class="f h-100">
                    <legend class="l">Данные договора займа:</legend>

                    <div class="centerx">
                      <vs-tooltip text="Организация, в пользу или которой выдан исполнительный документ" position="top" >
                        <h6 class="h6 mb-1">Взыскатель:</h6>
                      </vs-tooltip>
                    </div>
                    <span v-if="grantedChangeRecover" style="color:red; cursor: pointer" @click="showPopupChangeRecover">Изменить</span>
                    <vs-input class="w-100 mb-2" readonly v-model="Deb.recover.name"> </vs-input>

                    <div class="centerx">
                      <vs-tooltip text="Организация которая передает права на взыскание долга" position="top" >
                        <h6 class="h6 mb-1">Цедент:<VarToClipboard name="rec_cess_name"/></h6>
                      </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2"  v-model="Deb.recover.namePerv"></vs-input>

                    <div class="centerx">
                      <vs-tooltip text="Заключается между цедентом, цессионарием, иногда участвует еще и должник" position="top" >
                        <h6 class="h6 mb-1">№ Договор цессии:<VarToClipboard name="rec_cess_number"/></h6>
                      </vs-tooltip>
                    </div>
                    <v-select  style="" class="mb-2" :reduce="label => label.id" label="number" :options="RecoverersArrDogov"  v-model="Deb.debtorCredit.id_recover" @input="changeDeb"></v-select>

                    <div class="centerx">
                      <vs-tooltip text="Дата заключения договора цессии" position="top" >
                        <h6 class="h6 mb-1">Дата договора цессии:<VarToClipboard name="rec_cess_date"/></h6>
                      </vs-tooltip>
                    </div>
                    <vs-input type="date" class="w-100 mb-2" v-model="RecoverDateCession"></vs-input>

                    <div class="centerx">
                      <vs-tooltip text="Персональный уникальный номер договора" position="top" >
                        <h6 class="h6 mb-1" style="margin-top: 15px">Номер договора займа:<VarToClipboard name="dc_number_dog"/></h6>
                      </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2"  v-model="Deb.debtorCredit.number_dog" @change="changeDeb"></vs-input>

                    <div class="centerx">
                      <vs-tooltip text="Дата заключения договора займа" position="top" >
                        <h6 class="h6 mb-1">Дата договора займа:<VarToClipboard name="dc_date_dog"/></h6>
                      </vs-tooltip>
                    </div>
                    <vs-input type="date" class="w-100 mb-2" v-model="Deb.debtorCredit.date_dog" @blur="changeDeb"></vs-input>

                    <div class="centerx">
                      <vs-tooltip text="Указывается тип полученного займа (онлайн, оффлайн)" position="top" >
                        <h6 class="h6 mb-1">Продукт:<VarToClipboard name="dc_product"/></h6>
                      </vs-tooltip>
                    </div>
                    <vs-input class="w-100 mb-2" v-model="Deb.debtorCredit.product" @change="changeDeb"></vs-input>

                    <div class="centerx">
                      <vs-tooltip text="Уникальный идентификатор, используется для поиска" position="top" >
                        <h6 class="h6 mb-1">ID_кредита:<VarToClipboard name="dc_id"/></h6>
                      </vs-tooltip>
                    </div>
                    <vs-input class="w-50 mb-2"  v-model="Deb.debtorCredit.id" disabled ></vs-input>

                    <div class="centerx">
                      <vs-tooltip text="Используется для связки с внешними сервисами" position="top" >
                        <h6 class="h6 mb-1">ID внешний:<VarToClipboard name="dc_id_out"/></h6>
                      </vs-tooltip>
                    </div>
                    <vs-input  class="w-100 mb-2"  v-model="Deb.debtorCredit.id_out" @change="changeDeb"></vs-input>

                    <div class="centerx">
                        <h6 class="h6 mb-1">ID организаци:<VarToClipboard name="dc_id_org"/></h6>
                    </div>
                    <vs-input  class="w-100 mb-2"  v-model="Deb.debtorCredit.id_org" disabled></vs-input>

                    <div class="centerx">
                      <h6 class="h6 mb-1">ID Цесии:<VarToClipboard name="dc_id_recover"/></h6>
                    </div>
                    <vs-input  class="w-100 mb-2"  v-model="Deb.debtorCredit.id_recover" disabled></vs-input>

                    <div class="centerx">
                      <vs-tooltip text="Присвоение уникального идентификатора договора (сделки)" position="top" >
                        <h6 class="h6 mb-1">UID БКИ:<VarToClipboard name="dc_uid_bki"/></h6>
                      </vs-tooltip>
                    </div>
                    <vs-input  style="margin-bottom: 143px" class="w-100 mb-2"  v-model="Deb.debtorCredit.uid_bki" @change="changeDeb"></vs-input>


                  </fieldset>


                </div>
              </div>
            </div>

          <div class="vx-col sm:w-1/2 w-full mb-2">
            <fieldset class="f" style="margin-top: 75px; height: calc(100% - 75px);">
              <legend class="l">Данные по работе с ИД:</legend>


          <div class="vx-row" style="margin-bottom: 72px">
            <div class="vx-col sm:w-1/2 w-full mb-2" style="border: 1px;">

              <MestoId></MestoId>
              <VarToClipboard name="dc_response_return_sa"/>
              <vs-checkbox style="margin-top: 15px;margin-bottom: 15px;"  v-model="Deb.debtorCredit.response_return_sa" @input="changeDebUpdate">ИД в офисе</vs-checkbox>
              <VarToClipboard name="dc_response_sa"/>
              <vs-checkbox style="margin-bottom: 15px;" v-model="Deb.debtorCredit.response_sa" @input="changeDeb">Отправить отзыв ИД</vs-checkbox>

              <div class="centerx">
                <vs-tooltip text="Исполнительным документом может быть Судебный приказ или Исполнительный лист" position="top" >
                  <h6 class="h6 mb-1" style="margin-top: 15px">Тип ИД:<VarToClipboard name="dc_type_cp"/><VarToClipboard name="name_cp"/></h6>
                </vs-tooltip>
              </div>
              <v-select class="mb-2" :reduce="label => label.id" label="name" :options="TypeCP"  v-model="Deb.debtorCredit.type_cp" @input="changeDeb"></v-select>

              <div class="centerx">
                <vs-tooltip text="Номер исполнительного документа" position="top" >
                  <h6 class="h6 mb-1" >№ ИД: <DeleteFieldsHistory :perem="'dc_number_sa'" /><VarToClipboard name="dc_number_sa"/></h6>
                </vs-tooltip>
              </div>
              <vs-input class="w-100 mb-2"  v-model="Deb.debtorCredit.number_sa" @change="changeDeb"></vs-input>

              <div class="centerx">
                <vs-tooltip text="Дата исполнительного документа" position="top" >
                  <h6 class="h6 mb-1">Дата ИД: <DeleteFieldsHistory :perem="'dc_date_sa'" /><VarToClipboard name="dc_date_sa"/></h6>
                </vs-tooltip>
              </div>
              <vs-input type="date" class="w-100 mb-2"  v-model="Deb.debtorCredit.date_sa" @blur="changeDeb"></vs-input>

              <div class="centerx">
                <vs-tooltip text="Номер искового документа" position="top" >
                  <h6 class="h6 mb-1" style="">№ дела Иск:<VarToClipboard name="dc_number_delo_il"/></h6>
                </vs-tooltip>
              </div>
              <vs-input class="w-100 mb-2"  v-model="Deb.debtorCredit.number_delo_il" @change="changeDeb"></vs-input>

              <div class="centerx">
                <vs-tooltip text="Срок действия искового документа" position="top" >
                  <h6 class="h6 mb-1">Срок ИД:<VarToClipboard name="dcs_srok_id"/></h6>
                </vs-tooltip>
              </div>
              <vs-input type="date" class="w-100 mb-2" v-model="Deb.debtorCreditSud.srok_id"></vs-input>

              <div class="centerx">
                <vs-tooltip text="Должностное лицо, ответственное за исковый документ" position="top" >
                  <h6 class="h6">Ответственный сотрудник:<VarToClipboard name="dc_id_user"/></h6>
                </vs-tooltip>
              </div>
              <v-select class="mb-2" :reduce="label=>label.id" label="name" :options="ResponsibleUserInDebtorList"  v-model="Deb.debtorCredit.id_user" @input="changeDeb"></v-select>

              <barcode   id="printMe" v-bind:value="Deb.debtorCredit.id"></barcode>
              <div style="text-align: center">
                <vs-button @click="print" color="primary" type="border" icon="print" style="margin: 0 auto;">Печать</vs-button>
              </div>

            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2" style="border: 1px;">
              <div class="centerx">
                <vs-tooltip text="Тип взыскания с заёмщика" position="top" >
                  <h6 class="h6 mb-1">Вид взыскания:<VarToClipboard name="dc_name_delo"/></h6>
                </vs-tooltip>
              </div>
              <v-select class="mb-2" :reduce="label=>label.id" label="name" :options="VidRecoverInDebtorCreditArr"  v-model="Deb.debtorCredit.name_delo" @input="changeDeb"></v-select>

              <div class="centerx">
                <vs-tooltip text="Дата отправки заявления в суд на судебный приказ. Заполняется автоматически при формировании заказа через систему" position="top" >
                  <h6 class="h6 mb-1">Дата в суд <b style="color: green">Судебный приказ</b>:<VarToClipboard name="dc_date_sud"/></h6>
                </vs-tooltip>
              </div>
              <vs-input type="date" class="w-100 mb-2" v-model="Deb.debtorCredit.date_sud" @blur="changeDeb"></vs-input>

              <div class="centerx">
                <vs-tooltip text="Дата отправки в суд искового заявления. Заполняется автоматически при отправке через систему" position="top" >
                  <h6 class="h6 mb-1">Дата в суд <b style="color: green">Иск</b>:<VarToClipboard name="dc_date_isk"/></h6>
                </vs-tooltip>
              </div>
              <vs-input type="date" class="w-100 mb-2" v-model="Deb.debtorCredit.date_isk" @blur="changeDeb"></vs-input>

              <div class="centerx">
                <vs-tooltip text="Дата отправки в суд искового заявления. Заполняется автоматически при отправке через систему" position="top" >
                  <h6 class="h6 mb-1">Дата заявление <b style="color: green">ФНС</b>:<VarToClipboard name="dc_date_fns"/></h6>
                </vs-tooltip>
              </div>
              <vs-input type="date" class="w-100 mb-2"  v-model="Deb.debtorCredit.date_fns" @blur="changeDeb"></vs-input>

              <div class="centerx">
                <vs-tooltip text="Дата отправки приказа в банк. Заполняется автоматически при отправке через систему" position="top" >
                  <h6 class="h6 mb-1">Дата заявления в <b style="color: green">Банк</b>:<VarToClipboard name="dc_date_bank"/></h6>
                </vs-tooltip>
              </div>
              <vs-input type="date" class="w-100 mb-2"  v-model="Deb.debtorCredit.date_bank" @blur="changeDeb"></vs-input>

              <div class="centerx">
                <vs-tooltip text="Дата отправки приказа в ПФР. Заполняется автоматически при отправке через систему" position="top" >
                  <h6 class="h6 mb-1">Дата заявления в <b style="color: green">ПФР</b>:<VarToClipboard name="dc_date_pfr"/></h6>
                </vs-tooltip>
              </div>
              <vs-input type="date" class="w-100 mb-2"  v-model="Deb.debtorCredit.date_pfr" @blur="changeDeb"></vs-input>

              <div class="centerx">
                <vs-tooltip text="Дата отправки приказа в ФССП РФ. Заполняется автоматически при отправке через систему" position="top" >
                  <h6 class="h6 mb-1">Дата заявления в <b style="color: green">ФССП РФ</b>:<VarToClipboard name="dc_date_fssp"/></h6>
                </vs-tooltip>
              </div>
              <vs-input type="date" class="w-100 mb-2"  v-model="Deb.debtorCredit.date_fssp" @blur="changeDeb"></vs-input>

<!--              <h6 class="h6">Дата отзыва ИД:<VarToClipboard name="dc_date_response_sa"/></h6>-->
<!--              <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_response_sa" @blur="changeDeb"></vs-input>-->

              <div class="centerx">
                <vs-tooltip text="Дата признания заёмщика банкротом. Заполняется автоматически при отправке через систему" position="top" >
                  <h6 class="h6 mb-1">Дата СА о признании <b style="color: green">банкротом</b>:<VarToClipboard name="dc_date_sa_bankrot"/></h6>
                </vs-tooltip>
              </div>
              <vs-input type="date" class="w-100 mb-2"  v-model="Deb.debtorCredit.date_sa_bankrot"  @blur="changeDeb"></vs-input>

              <div class="centerx">
                <vs-tooltip text="Дата отправки заёмщика банкротом. Заполняется автоматически при отправке через систему" position="top" >
                  <h6 class="h6 mb-1">Дата СА вкл. дело <b style="color: green">Банкротство</b>:<VarToClipboard name="dc_date_sa_reestr"/></h6>
                </vs-tooltip>
              </div>
              <vs-input type="date" class="w-100 mb-2"  v-model="Deb.debtorCredit.date_sa_reestr"  @blur="changeDeb"></vs-input>

              <div class="centerx">
                <vs-tooltip text="Дата подачи заявления на вступление в наследство" position="top" >
                  <h6 class="h6 mb-1">Дата заявления <b style="color: green">Наследство</b>:<VarToClipboard name="dcs_inh_zay_sud_napr_date"/></h6>
                </vs-tooltip>
              </div>
              <vs-input type="date" class="w-100 mb-2" v-model="Deb.debtorCreditSud.inh_zay_sud_napr_date"  @blur="changeDeb"></vs-input>

              <div v-for=" setting in DebtorCreditDopVarRabArr">
                <template v-if="typeof Deb.debtorCreditDop!='undefined'">
                    <div v-if="setting.type==='int'">
                        <h6 class="h6">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                        <vs-input  type="number" class="w-100" v-model="Deb.debtorCreditDop[setting.atr]" @change="changeDebUpdate"></vs-input>
                    </div>
                    <div v-if="setting.type==='bigint'">
                        <h6 class="h6">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                        <vs-input  type="number" class="w-100" v-model="Deb.debtorCreditDop[setting.atr]" @change="changeDebUpdate"></vs-input>
                    </div>
                    <div v-if="setting.type==='date'">
                        <h6 class="h6">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                        <vs-input  type="date" class="w-100" v-model="Deb.debtorCreditDop[setting.atr]" @blur="changeDebUpdate"></vs-input>
                    </div>
                    <div v-if="setting.type==='boolean'">
                        <h6 class="h6">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                        <vs-checkbox  v-model="Deb.debtorCreditDop[setting.atr]"  style="    color: brown;" @change="changeDebUpdate">Активно</vs-checkbox>
                    </div>
                    <div v-if="setting.type==='varchar'">
                        <h6 class="h6">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                        <vs-input  class="w-100" v-model="Deb.debtorCreditDop[setting.atr]" @blur="changeDebUpdate"></vs-input>
                    </div>
                    <div v-if="setting.type==='text'">
                        <h6 class="h6">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                        <vs-textarea  class="w-100" rows="5" v-model="Deb.debtorCreditDop[setting.atr]" @blur="changeDebUpdate"></vs-textarea>
                    </div>
                    <div v-if="setting.type==='decimal'">
                        <h6 class="h6">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                        <vs-input  type="number" class="w-100" v-model="Deb.debtorCreditDop[setting.atr]"  @blur="changeDebUpdate"></vs-input>
                    </div>

                    <div v-if="setting.type==='float'">
                        <h6 class="h6">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                        <vs-input  type="number" class="w-100" v-model="Deb.debtorCreditDop[setting.atr]"  @blur="changeDebUpdate"></vs-input>
                    </div>
                </template>

            </div>
            </div>
          </div>
            </fieldset>
          </div>

        </div>

        <vs-popup classContent="popup-example" title="Изменение взыскателя" :active.sync="popupChangeRecover">
            <div style="height: 400px">
                <div style="width: 100%;">
                    Выберите взыскателя
                    <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="RecoverersArrDogov"  v-model="rec_id"></v-select>
                </div>
                <div style="text-align: right; margin-top: 10px">
                    <vs-button class="sm:mb-0 mb-2" @click="changeRecover">Изменить
                    </vs-button>
                </div>
            </div>
        </vs-popup>



    </vx-card>
</template>

<script>
    import Vue from 'vue'
    import AsyncComputed from 'vue-async-computed'
    import { mapActions,mapGetters } from 'vuex'
    import VueSuggestions from '../../../components/vue-suggestions/vue-suggestionsChange.vue';
    import Status from '../../../components/Status.vue'
    import VueBarcode from 'vue-barcode';
    import Jud from '../Jud.vue';
    import JudArea from '../JudArea.vue';
    import ResetJud from "../ResetJud.vue";
    import ObjFromJsonViewButton from '../../RenderComponent/ObjFromJsonViewButton.vue'
    import MestoId from "./Render/MestoId.vue";
    import DeleteFieldsHistory from "./Render/DeleteFieldsHistory.vue";
    Vue.use(AsyncComputed)
    import VueClipboard from 'vue-clipboard2'
    VueClipboard.config.autoSetContainer = true
    Vue.use(VueClipboard)
    import moment from 'moment';
    export default {
        components: { VueSuggestions,Status, 'barcode': VueBarcode,
          Jud,
          JudArea,
          ResetJud,
          ObjFromJsonViewButton,
          MestoId,
          DeleteFieldsHistory
        },
        props: ['grantedChangeRecover'],
        data () {
            return {
                copied: false,
                popupChangeRecover: false,
                rec_id: 0,


            }
        },
        mounted(){
            this.getDataReestrsAndCessionDogov()


            if(this.TypeDebtorInDebtorCreditArr.length==0){
                this.getTypeDebtorInDebtorCreditArr()
            }

            if(this.VidRecoverInDebtorCreditArr.length==0){
                this.getVidRecoverInDebtorCreditArr()
            }

            if(this.ResponsibleUserInDebtorList.length==0){
                this.getResponsibleUserInDebtorList()
            }
              if(this.FsspOtdelArr.length==0){
                this.getFsspOtdelsArr()
              }

        },
        asyncComputed: {

            async liveRegion() {
                //   console.log(this.debtor.data_reg.region_kladr_id)
                if(this.Deb.debtor.data_reg!=null) {
                    if (this.Deb.debtor.data_reg.region_with_type != null && this.Deb.debtor.data_reg.region_with_type != '') {
                        return this.Deb.debtor.data_reg.region_with_type;
                    } else {
                        return ''
                    }
                }

            },



        },
        computed: {

            ...mapGetters([
                'StatussDebtorArr','Deb','DebtorCreditDopVarRabArr','User','RecoverersArrDogov','TypeCP','TypeDebtorInDebtorCreditArr','VidRecoverInDebtorCreditArr',
                'ResponsibleUserInDebtorList','SuggestionOptionsAddress','FsspOtdelArr','RecoverDateCession'


            ]),


        },
        methods: {
          copy () {

            this.$copyText(this.Deb.debtor.name_family+' '+this.Deb.debtor.name+' '+this.Deb.debtor.name_patronymic+' '+moment(this.Deb.debtor.birthdate).format('DD.MM.YYYY'))
            this.copied = true
            setTimeout(() => { this.copied = false }, 750)

          },
        changeRecover() {
            if (this.rec_id !== -1) {
                if (this.rec_id !== 0) {
                    if (this.rec_id !== this.Deb.debtorCredit.id_recover) {
                        this.popupChangeRecover = false
                        this.Deb.debtorCredit.id_recover=this.rec_id;
                        this.changeDebUpdate()
                    } else {
                        this.$vs.notify({
                            title: 'Сообщение',
                            text: 'Выберите взыскателя для изменения',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
                } else {
                    this.$vs.notify({
                        title: 'Сообщение',
                        text: 'Выберите взыскателя для изменения',
                        color: 'success',
                        position: 'top-center'
                    })
                }
            } else {
                this.$vs.notify({
                    title: 'Сообщение',
                    text: 'Выберите взыскателя для изменения',
                    color: 'success',
                    position: 'top-center'
                })
            }
        },
        showPopupChangeRecover(){
            this.getDataReestrsAndPravDogovor()
            this.popupChangeRecover = true
        },
        print(){

            let mywindow = window.open('', 'Print', 'height=600,width=800');
            let elem = document.getElementById('printMe');
            mywindow.document.write('<html><head><title>Print QR</title>');
            mywindow.document.write('</head><body >');
            mywindow.document.write(elem.innerHTML);
            mywindow.document.write('</body></html>');

            mywindow.document.close();
            mywindow.focus()
            mywindow.print();
         //   mywindow.close();

        },

        ...mapActions([
            'saveDebtor','getDataStatuss','getDataDebtorsById','changeDeb','changeDebUpdate','deleteDebtorCredit','getDataReestrsAndPravDogovor',
            'getDataReestrsAndCessionDogov','getTypeDebtorInDebtorCreditArr',
            'getVidRecoverInDebtorCreditArr','getResponsibleUserInDebtorList','getFsspOtdelsArr',
            'changeDebUpdate','opredFssps'
        ]),


        },
    }
</script>

<style scoped>
.vs-con-input-label{
  width: 100%;
}
#printMe{
  text-align: center;
}
</style>
<style lang="scss">
.select-none .feather {
  margin-top: 0!important;
}
.h6{
    font-size: 12px;
    color: cadetblue;
}
.f {

  border: 1px;
  border-style: double;
  border-color: #62626262;
  border-radius: 8px;
  padding: 15px;
}

.l {
  color: #a00;
  padding: 0 10px;
}
.centerx {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: initial;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: normal;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
</style>
