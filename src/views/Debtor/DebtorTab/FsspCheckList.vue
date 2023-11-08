<template>
  <vx-card no-shadow>


    <div class="vx-row" style="padding-top: 20px">
      <div class="vx-col sm:w-2/3 w-full mb-2">
        <template v-if="typeof Deb.debtorCredit.id!='undefined'">
          <Status :id_credit="Deb.debtorCredit.id" class="h6"></Status>
        </template>
        <div class="vx-row" style="padding-top: 20px">
          <div class="vx-col sm:w-1/3 w-full mb-2">

            <h6 class="h6">Взыскатель:<VarToClipboard name="r_name"/></h6>
            <vs-input class="w-100" readonly v-model="Deb.recover.name"></vs-input>
            <h6 class="h6">Первоначальный взыскатель:<VarToClipboard name="r_namePerv"/></h6>
            <vs-input class="w-100 "  readonly v-model="Deb.recover.namePerv"></vs-input>
            <h6 class="h6" style="margin-top: 25px">Фамилия:<VarToClipboard name="d_name_family"/></h6>
            <vs-input class="w-100 " readonly v-model="Deb.debtor.name_family"></vs-input>
            <h6 class="h6">Предыдущая фамилия:<VarToClipboard name="d_name_family_last"/></h6>
            <vs-input class="w-100 "  readonly v-model="Deb.debtor.name_family_last"></vs-input>
            <h6 class="h6">Имя:<VarToClipboard name="d_name"/></h6>
            <vs-input class="w-100 " readonly v-model="Deb.debtor.name"></vs-input>
            <h6 class="h6">Отчество:<VarToClipboard name="d_name_patronymic"/></h6>
            <vs-input class="w-100 " readonly  v-model="Deb.debtor.name_patronymic"></vs-input>
            <h6 class="h6">Дата рождения:<VarToClipboard name="d_birthdate"/></h6>
            <vs-input type="date" class="w-100 " readonly v-model="Deb.debtor.birthdate"></vs-input>

            <!--                        <h6 class="h6" style="margin-top: 15px">№ СА:<VarToClipboard name="dc_number_sa"/></h6>-->
            <!--                        <vs-input class="w-100"  v-model="Deb.debtorCredit.number_sa"  @change="changeDeb"> </vs-input>-->
            <!--                        <h6 class="h6">Дата СА:<VarToClipboard name="dc_date_sa"/></h6>-->
            <!--                        <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_sa"  @blur="changeDeb"></vs-input>-->
            <!--                        <h6 class="h6">Дата ФССП:<VarToClipboard name="dc_date_fssp"/></h6>-->
            <!--                        <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_fssp"  @blur="changeDeb"></vs-input>-->
            <!--                        <h6 class="h6" style="margin-top: 15px">ШПИ ФССП:<VarToClipboard name="dc_shpi_fssp"/></h6>-->
            <!--                        <vs-input class="w-100"  v-model="Deb.debtorCredit.shpi_fssp"  @change="changeDeb"> </vs-input>-->
            <!--                        <h6 class="h6" >Дата ШПИ ФССП:<VarToClipboard name="dc_date_shpi_fssp"/></h6>-->
            <!--                        <vs-input class="w-100"   type="date" v-model="Deb.debtorCredit.date_shpi_fssp"  @change="changeDeb"> </vs-input>-->


            <h6 class="h6" style="margin-top: 15px">№ СА:<VarToClipboard name="dc_number_sa"/></h6>
            <vs-input class="w-100"  v-model="Deb.debtorCredit.number_sa"  @change="changeDeb"> </vs-input>
            <h6 class="h6">Дата СА:<VarToClipboard name="dc_date_sa"/></h6>
            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_sa"  @blur="changeDeb"></vs-input>

            <h6 class="h6" style="margin-top: 15px">Дата заявления ФССП:<VarToClipboard name="dc_date_fssp"/></h6>
            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_fssp"  @blur="changeDeb"></vs-input>

            <h6 class="h6" style="margin-top: 15px">ШПИ отправка ФССП:<VarToClipboard name="dc_shpi_fssp"/></h6>
            <vs-input class="w-100"  v-model="Deb.debtorCredit.shpi_fssp"  @change="changeDeb"> </vs-input>

            <h6 class="h6" style="margin-top: 15px">№ИП: <span style="cursor: pointer;color: red;" @click="showInfoFssp=!showInfoFssp">инфо  </span><span style="cursor: pointer;color: red;" @click="findFssp">  Поиск</span><span style="cursor: pointer;color: red;" @click="getReqHistory"> История</span>
              <VarToClipboard name="dc_number_ip"/></h6>
            <vs-input  class="w-100"  v-model="Deb.debtorCredit.number_ip"  @change="changeDeb"></vs-input>
            <h6 class="h6">Дата возбуждения ИП:<VarToClipboard name="dc_date_rise_ip"/></h6>
            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_rise_ip"  @blur="changeDeb"></vs-input>
            <h6 class="h6">Дата окончания ИП:<VarToClipboard name="dc_date_end_ip"/></h6>
            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_end_ip"  @blur="changeDeb"></vs-input>
          </div>

          <div class="vx-col sm:w-1/3 w-full mb-2">
            <fieldset class="f">
              <legend class="l">Запрос ФССП о наличии ИП:</legend>
              <div style="margin: 10px">
                <h6 class="h6">№ Запроса:<span style="cursor: pointer;color: red;" @click="getReqHistoryHodFssp" >инфо  </span><VarToClipboard name="dc_number_hod_fssp"/></h6>
                <vs-input class="w-100"  v-model="Deb.debtorCredit.number_hod_fssp"  @change="changeDeb"> </vs-input>
                <h6 class="h6">Дата Запроса:<VarToClipboard name="dc_fssp_date"/></h6>
                <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.fssp_date"  @blur="changeDeb"></vs-input>
                <h6 class="h6">Url Запроса:<VarToClipboard name="dc_url_hod_fssp"/></h6>
                <vx-input-group class="w-100">
                  <vs-input  v-model="Deb.debtorCredit.url_hod_fssp"  @change="changeDeb" />
                  <template slot="append">
                    <div class="append-text btn-addon">
                      <vs-button color="primary" type="border" @click="openReqIpExistFssp">Открыть</vs-button>
                    </div>
                  </template>
                </vx-input-group>
                <div style="margin-top: 10px;margin-bottom: 10px;display: flex">
                  <!--                          <span style="cursor: pointer;color: red;" @click="getJournalFsspA('ReqInfoIpExistFssp')">История отправок</span>-->
                </div>
                <h6 class="h6">Дата Ответа:<VarToClipboard name="dc_date_answer_hod_fssp"/>
                  <!--                            <span style="cursor: pointer;color: red;margin-left: 10px" @click="getJournalFsspA('CheckAnswerZaprosIP')">История</span>-->
                  <span style="cursor: pointer;color: red;" @click="getResultFsspA('req_zapros_ip')">Результат</span>
                </h6>
                <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_answer_hod_fssp"  @blur="changeDeb"></vs-input>
                <vs-button style="margin-top: 10px" color="success" type="filled" @click="toQueueConfirm('ReqInfoIpExistFssp')">Отправить</vs-button>
              </div>
            </fieldset>

            <fieldset class="f" style="margin-top: 10px">
              <legend class="l">Жалоба ФССП нет ИП:</legend>
              <div style="margin: 10px">
                <h6 class="h6">№ Запроса:<VarToClipboard name="fd_number_noip_claim_fssp"/></h6>
                <vs-input class="w-100"  v-model="FsspDataCredit.number_noip_claim"  @change="changeDeb"> </vs-input>
                <h6 class="h6">Дата Запроса:<VarToClipboard name="fd_date_noip_claim_fssp"/></h6>
                <vs-input type="date" class="w-100"  v-model="FsspDataCredit.date_noip_claim"  @blur="changeDeb"></vs-input>
                <h6 class="h6">Url Запроса:<VarToClipboard name="fd_url_noip_claim_fssp"/></h6>
                <vx-input-group class="w-100">
                  <vs-input  v-model="FsspDataCredit.url_noip_claim"  @change="changeDeb" />
                  <template slot="append">
                    <div class="append-text btn-addon">
                      <vs-button color="primary" type="border" @click="openNoIpClaimFssp">Открыть</vs-button>
                    </div>
                  </template>
                </vx-input-group>
                <div style="margin-top: 10px;margin-bottom: 10px;display: flex">
                  <!--                            <span style="cursor: pointer;color: red;" @click="getJournalFsspA('NoIpClaimFssp')">История отправок</span>-->
                  <!--                            <span style="cursor: pointer;color: red;margin-left: auto;" @click="getResultFsspA('')">Результат</span>-->
                </div>
                <h6 class="h6">Дата Ответа:<VarToClipboard name="fd_date_answer_noip_claim"/></h6>
                <vs-input type="date" class="w-100"  v-model="FsspDataCredit.date_answer_noip_claim"  @blur="changeDeb"></vs-input>
                <vs-button style="margin-top: 10px" color="success" type="filled" @click="toQueueConfirm('NoIpClaimFssp')">Отправить</vs-button>
              </div>
            </fieldset>

            <fieldset class="f" style="margin-top: 10px">
              <legend class="l">Ходатайство ФССП Банки:</legend>
              <div style="margin: 10px">
                <h6 class="h6">№ Запроса:<VarToClipboard name="dc_number_send_banks_fssp"/></h6>
                <vs-input class="w-100"  v-model="Deb.debtorCredit.number_send_banks_fssp"  @change="changeDeb"> </vs-input>
                <h6 class="h6">Дата Запроса:<VarToClipboard name="dc_date_send_banks_fssp"/></h6>
                <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_send_banks_fssp"  @blur="changeDeb"></vs-input>
                <h6 class="h6">Url Запроса:<VarToClipboard name="dc_url_send_banks_fssp"/></h6>
                <vx-input-group class="w-100">
                  <vs-input  v-model="Deb.debtorCredit.url_send_banks_fssp"  @change="changeDeb" />
                  <template slot="append">
                    <div class="append-text btn-addon">
                      <vs-button color="primary" type="border" @click="openHodBanksFssp">Открыть</vs-button>
                    </div>
                  </template>
                </vx-input-group>
                <div style="margin-top: 10px;margin-bottom: 10px;display: flex">
                  <!--                            <span style="cursor: pointer;color: red;" @click="getJournalFsspA('ReqSendBanksFssp')">История отправок</span>-->
                  <!--                            <span style="cursor: pointer;color: red;margin-left: auto;" @click="getResultFsspA('req_hod')">Результат</span>-->
                </div>
                <h6 class="h6">Дата Ответа:<VarToClipboard name="dc_date_answer_send_banks_fssp"/></h6>
                <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_answer_send_banks_fssp"  @blur="changeDeb"></vs-input>
                <vs-button style="margin-top: 10px" color="success" type="filled" @click="toQueueConfirm('ReqSendBanksFssp')">Отправить</vs-button>
              </div>
            </fieldset>

            <fieldset class="f" style="margin-top: 10px">
              <legend class="l">Жалоба ФССП Банки:</legend>
              <div style="margin: 10px">
                <h6 class="h6">№ Запроса:<VarToClipboard name="dc_number_hod_fssp1111"/></h6>
                <vs-input class="w-100"  v-model="Deb.debtorCredit.number_hod_fssp1111"  @change="changeDeb"> </vs-input>
                <h6 class="h6">Дата Запроса:<VarToClipboard name="dc_fssp_date1111"/></h6>
                <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.fssp_date1111"  @blur="changeDeb"></vs-input>
                <h6 class="h6">Url Запроса:<VarToClipboard name="dc_url_hod_fssp1111"/></h6>
                <vx-input-group class="w-100">
                  <vs-input  v-model="Deb.debtorCredit.url_hod_fssp11111"  @change="changeDeb" />
                  <template slot="append">
                    <div class="append-text btn-addon">
                      <vs-button color="primary" type="border" @click="openReqIpExistFssp1111">Открыть</vs-button>
                    </div>
                  </template>
                </vx-input-group>
                <h6 class="h6">Дата Ответа:<VarToClipboard name="dc_fssp_date1111"/></h6>
                <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.fssp_date1111"  @blur="changeDeb"></vs-input>
              </div>
            </fieldset>

            <fieldset class="f" style="margin-top: 10px">
              <legend class="l">Жалоба отказ ИП:</legend>
              <div style="margin: 10px">
                <h6 class="h6">№ Запроса:<VarToClipboard name="fd_number_otkazip_claim"/></h6>
                <vs-input class="w-100"  v-model="FsspDataCredit.number_otkazip_claim"  @change="changeDeb"> </vs-input>
                <h6 class="h6">Дата Запроса:<VarToClipboard name="fd_date_otkazip_claim"/></h6>
                <vs-input type="date" class="w-100"  v-model="FsspDataCredit.date_otkazip_claim"  @blur="changeDeb"></vs-input>
                <h6 class="h6">Url Запроса:<VarToClipboard name="fd_url_otkazip_claim"/></h6>
                <vx-input-group class="w-100">
                  <vs-input  v-model="FsspDataCredit.url_otkazip_claim"  @change="changeDeb" />
                  <template slot="append">
                    <div class="append-text btn-addon">
                      <vs-button color="primary" type="border" @click="openOtkazIpClaimFssp">Открыть</vs-button>
                    </div>
                  </template>
                </vx-input-group>
                <div style="margin-top: 10px;margin-bottom: 10px;display: flex">
                  <!--                            <span style="cursor: pointer;color: red;" @click="getJournalFsspA('NoIpClaimFssp')">История отправок</span>-->
                  <!--                            <span style="cursor: pointer;color: red;margin-left: auto;" @click="getResultFsspA('')">Результат</span>-->
                </div>
                <h6 class="h6">Дата Ответа:<VarToClipboard name="fd_date_answer_otkazip_claim"/></h6>
                <vs-input type="date" class="w-100"  v-model="FsspDataCredit.date_answer_otkazip_claim"  @blur="changeDeb"></vs-input>
                <vs-button style="margin-top: 10px" color="success" type="filled" @click="toQueueConfirm('OtkazIpClaimFssp')">Отправить</vs-button>
              </div>
            </fieldset>


            <!--                        <h6 class="h6">Дата ходатайства ФССП по ведению ИП:<VarToClipboard name="dc_fssp_hod_date"/></h6>-->
            <!--                        <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.fssp_hod_date"  @blur="changeDeb"></vs-input>-->



            <!--                        <h6 class="h6">№ СА судебные расходы:<VarToClipboard name="so_number_sa_rachod"/></h6>-->
            <!--                        <vs-input  class="w-100"  v-model="Deb.sudOrder.number_sa_rachod"  @change="changeDeb"></vs-input>-->
            <!--                        <h6 class="h6">Дата судебные расходы:<VarToClipboard name="so_date_sud_rachod"/></h6>-->
            <!--                        <vs-input type="date" class="w-100"  v-model="Deb.sudOrder.date_sud_rachod"  @blur="changeDeb"></vs-input>-->
            <!--                        </vx-input-group>-->

          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <fieldset class="f">
              <legend class="l">Ходатайство ФССП о ходе ИП:</legend>
              <div style="margin: 10px">
                <h6 class="h6">№ Запроса:<VarToClipboard name="dc_number_rec_fssp"/></h6>
                <vs-input class="w-100"  v-model="Deb.debtorCredit.number_rec_fssp"  @change="changeDeb"> </vs-input>
                <h6 class="h6">Дата запроса:<span style="cursor: pointer;color: red;" @click="showInfoFsspAns=!showInfoFsspAns">Ответ  </span><span style="cursor: pointer;color: red;" @click="findFsspAns">  Запрос ответа</span>
                  <VarToClipboard name="dc_date_rec_fssp"/></h6>
                <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_rec_fssp"  @blur="changeDeb"></vs-input>
                <h6 class="h6">Url Запроса:<VarToClipboard name="dc_url_rec_fssp"/></h6>
                <vx-input-group class="w-100">
                  <vs-input  v-model="Deb.debtorCredit.url_rec_fssp"  @change="changeDeb" />
                  <template slot="append">
                    <div class="append-text btn-addon">
                      <vs-button color="primary" type="border" @click="openFssp">Открыть</vs-button>
                    </div>
                  </template>
                </vx-input-group>
                <div style="margin-top: 10px;margin-bottom: 10px;display: flex">
                  <!--                            <span style="cursor: pointer;color: red;" @click="getJournalFsspA('ReqFssp')">История отправок</span>-->
                </div>
                <h6 class="h6">Дата Ответа:<VarToClipboard name="dc_date_answer_rec_fssp"/>
                  <!--                            <span style="cursor: pointer;color: red;margin-left: 10px" @click="getJournalFsspA('CheckReqFssp')">История</span>-->
                  <span style="cursor: pointer;color: red;" @click="getResultFsspA('req_hod')">Результат</span>
                </h6>
                <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_answer_rec_fssp"  @blur="changeDeb"></vs-input>
                <vs-button style="margin-top: 10px" color="success" type="filled" @click="toQueueConfirm('ReqFssp')">Отправить</vs-button>
              </div>
            </fieldset>

            <fieldset class="f" style="margin-top: 10px">
              <legend class="l">Жалоба ФССП чек-лист ИП:</legend>
              <div style="margin: 10px">
                <h6 class="h6">№ Запроса:<VarToClipboard name="dc_number_claim_fssp"/></h6>
                <vs-input class="w-100"  v-model="Deb.debtorCredit.number_claim_fssp"  @change="changeDeb"> </vs-input>
                <h6 class="h6">Дата Запроса:<VarToClipboard name="dc_fssp_ved_date"/></h6>
                <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.fssp_ved_date"  @blur="changeDeb"></vs-input>
                <h6 class="h6">Url Запроса:<VarToClipboard name="dc_url_claim_fssp"/></h6>
                <vx-input-group class="w-100">
                  <vs-input  v-model="Deb.debtorCredit.url_claim_fssp"  @change="changeDeb" />
                  <template slot="append">
                    <div class="append-text btn-addon">
                      <vs-button color="primary" type="border" @click="openClaimFssp">Открыть</vs-button>
                    </div>
                  </template>
                </vx-input-group>
                <div style="margin-top: 10px;margin-bottom: 10px;display: flex">
                  <!--                            <span style="cursor: pointer;color: red;" @click="getJournalFsspA('ReqClaimFssp')">История отправок</span>-->
                </div>
                <h6 class="h6">Дата Ответа:<VarToClipboard name="dc_date_answer_claim_fssp"/>
                  <!--                            <span style="cursor: pointer;color: red;margin-left: 10px" @click="getJournalFsspA('CheckAnswerClaim')">История</span>-->
                  <span style="cursor: pointer;color: red;" @click="getResultFsspA('req_claim')">Результат</span>
                </h6>
                <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_answer_claim_fssp"  @blur="changeDeb"></vs-input>
                <vs-button style="margin-top: 10px" color="success" type="filled" @click="toQueueConfirm('ReqClaimFssp')">Отправить</vs-button>
              </div>
            </fieldset>

            <fieldset class="f" style="margin-top: 10px">
              <legend class="l">Ходатайство ФССП отзыв ИД:</legend>
              <div style="margin: 10px">
                <h6 class="h6">№ Заявления:<VarToClipboard name="dc_number_zay_return_fssp"/></h6>
                <vs-input class="w-100"  v-model="Deb.debtorCredit.number_zay_return_fssp"  @change="changeDeb"> </vs-input>
                <h6 class="h6">Дата Заявления:<VarToClipboard name="dc_date_zay_return_fssp"/></h6>
                <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_zay_return_fssp"  @blur="changeDeb"></vs-input>
                <h6 class="h6">Url Заявления:<VarToClipboard name="dc_url_zay_return_fssp"/></h6>
                <vx-input-group class="w-100">
                  <vs-input  v-model="Deb.debtorCredit.url_zay_return_fssp"  @change="changeDeb" />
                  <template slot="append">
                    <div class="append-text btn-addon">
                      <vs-button color="primary" type="border" @click="openReqReturnFssp">Открыть</vs-button>
                    </div>
                  </template>
                </vx-input-group>
                <div style="margin-top: 10px;margin-bottom: 10px;display: flex">
                  <!--                            <span style="cursor: pointer;color: red;" @click="getJournalFsspA('ReqReturnFssp')">История отправок</span>-->
                  <!--                            <span style="cursor: pointer;color: red;margin-left: auto;" @click="getResultFsspA('req_claim')">Результат</span>-->
                </div>
                <h6 class="h6">Дата Ответа:<VarToClipboard name="dc_date_answer_zay_return_fssp"/></h6>
                <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_answer_zay_return_fssp"  @blur="changeDeb"></vs-input>
                <vs-button style="margin-top: 10px" color="success" type="filled" @click="toQueueConfirm('ReqReturnFssp')">Отправить</vs-button>
              </div>
            </fieldset>

            <fieldset class="f" style="margin-top: 10px">
              <legend class="l">Жалоба ФССП нет ИД:</legend>
              <div style="margin: 10px">
                <h6 class="h6">№ Заявления:<VarToClipboard name="fd_number_noid_claim"/></h6>
                <vs-input class="w-100"  v-model="FsspDataCredit.number_noid_claim"  @change="changeDeb"> </vs-input>
                <h6 class="h6">Дата Заявления:<VarToClipboard name="fd_date_noid_claim"/></h6>
                <vs-input type="date" class="w-100"  v-model="FsspDataCredit.date_noid_claim"  @blur="changeDeb"></vs-input>
                <h6 class="h6">Url Заявления:<VarToClipboard name="fd_url_noid_claim"/></h6>
                <vx-input-group class="w-100">
                  <vs-input  v-model="FsspDataCredit.url_noid_claim"  @change="changeDeb" />
                  <template slot="append">
                    <div class="append-text btn-addon">
                      <vs-button color="primary" type="border" @click="openClaimReturnFssp">Открыть</vs-button>
                    </div>
                  </template>
                </vx-input-group>
                <div style="margin-top: 10px;margin-bottom: 10px;display: flex">
                  <!--                            <span style="cursor: pointer;color: red;" @click="getJournalFsspA('ClaimNoIdFssp')">История отправок</span>-->
                  <!--                            <span style="cursor: pointer;color: red;margin-left: auto;">Результат</span>-->
                </div>
                <h6 class="h6">Дата Ответа:<VarToClipboard name="fd_date_answer_noid_claim"/></h6>
                <vs-input type="date" class="w-100"  v-model="FsspDataCredit.date_answer_noid_claim"  @blur="changeDeb"></vs-input>
                <vs-button style="margin-top: 10px" color="success" type="filled" @click="toQueueConfirm('ClaimNoIdFssp')">Отправить</vs-button>
              </div>
            </fieldset>
          </div>
        </div>

      </div>

      <div class="vx-col sm:w-1/3 w-full mb-2" style="border: 1px;">
        <fieldset class="f" >
          <legend class="l">Cведения из ответов ФССП РФ:</legend>
          <template>
            <div align="center">
              <vs-button style="margin-right: 13px; width: 90%;" color="warning" type="border" @click="showSved=!showSved">
                Транспорт / Недвижимость / Счета / Доход
              </vs-button>
            </div>
          </template>
          <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">
            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
              <vs-checkbox  v-model="Deb.debtorCredit.fssp_dsip" @input="changeDeb"> Поступление ДС по ИП</vs-checkbox>


            </div>


            <div class="vx-col w-2/4  mb-2" >
              <vs-checkbox v-model="Deb.debtorCredit.fssp_postds" @input="changeDeb">

                Постановление о распределении ДС
              </vs-checkbox>
            </div>

            <div class="vx-col w-2/4  mb-2" >
              <vs-checkbox v-model="Deb.debtorCredit.fssp_postsum" @input="changeDeb">

                Взыскателем не получена вся сумма денежных средств, поступивших в ФССП в рамках исполнительного производства
              </vs-checkbox>
            </div>



          </div>

          <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
              <vs-checkbox  v-model="Deb.debtorCredit.fssp_mvd" @input="changeDeb" style="min-width: 20px;">Запрос в ГИБДД МВД России на получения сведений о зарегистрированных автомототранспортных средствах</vs-checkbox>

            </div>
            <div class="vx-col w-2/4  mb-2" >
              <vs-checkbox v-model="Deb.debtorCredit.fssp_transport" @input="changeDeb">Постановление об аресте транспортного средства (транспорт)</vs-checkbox>
            </div>



          </div>


          <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
              <vs-checkbox  v-model="Deb.debtorCredit.fssp_rosreestr" @input="changeDeb">Запрос в Росреестр (ФНС к ЕГРН)</vs-checkbox>

            </div>
            <div class="vx-col w-2/4  mb-2" >
              <vs-checkbox v-model="Deb.debtorCredit.fssp_nedvizh" @input="changeDeb">Постановление об аресте недвижимого имущества</vs-checkbox>
            </div>



          </div>


          <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
              <vs-checkbox  v-model="Deb.debtorCredit.fssp_fns" @input="changeDeb">Запрос о счетатах должника-ФЛ в ФНС</vs-checkbox>

            </div>
            <div class="vx-col w-2/4  mb-2" >
              <vs-checkbox v-model="Deb.debtorCredit.fssp_bank" @input="changeDeb">Постановление об обращении взыскания на ДС должника, находящиеся в банке или иной кредитной организации (кредит)</vs-checkbox>
            </div>



          </div>


          <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

            <div class="vx-col w-2/4  mb-2" style="border: 1px;">
              <vs-checkbox  v-model="Deb.debtorCredit.fssp_pfr" @input="changeDeb">Запрос в ПФР на получение сведения о заработной плате, иных выплатах и вознаграждениях застрахованного лица (ПФР)</vs-checkbox>

            </div>
            <div class="vx-col w-2/4  mb-2" >
              <vs-checkbox v-model="Deb.debtorCredit.fssp_zarplata" @input="changeDeb">Постановление об обращении взыскания на заработную плату и иные доходы должника</vs-checkbox>
            </div>



          </div>

          <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

            <div class="vx-col w-2/4  mb-2" style="border: 1px;min-width: 20px;">
              <vs-checkbox  v-model="Deb.debtorCredit.fssp_orgnviesd" @input="changeDeb">Постановление о временном ограничении на выезд должника из Российской Федерации</vs-checkbox>

            </div>
            <div class="vx-col w-2/4  mb-2" >
              <vs-checkbox  v-model="Deb.debtorCredit.fssp_strahnum" @input="changeDeb">Запрос страхового номера индивидуального лицевого счёта</vs-checkbox>
            </div>

            <div class="vx-col w-2/4  mb-2" style="border: 1px;min-width: 20px;">
              <vs-checkbox  v-model="Deb.debtorCredit.fssp_zags" @input="changeDeb">Запрос об актах гражданского состояния</vs-checkbox>

            </div>
            <div class="vx-col w-2/4  mb-2" >
              <vs-checkbox  v-model="Deb.debtorCredit.fssp_migr" @input="changeDeb">Запрос в орган, которой реализует политику в области миграции</vs-checkbox>
            </div>
            <div class="vx-col w-2/4  mb-2" >
              <vs-checkbox  v-model="Deb.debtorCredit.fssp_reqpf" @input="changeDeb">Запрос в пенсионный фонд</vs-checkbox>
            </div>

          </div>






        </fieldset>
        <!--                <div style="display: flex;margin-top: 15px">-->
        <!--                    <div v-if="Deb.debtorCredit.status_claim_fssp > 0">-->
        <!--                        <b>Подача жалобы:</b>-->
        <!--                        <span v-if="Deb.debtorCredit.status_claim_fssp === 1" style="color: green">-->
        <!--                            В процессе... <refresh-cw-icon size="1x" class="custom-class" @click="claimStatusRefresh" style="cursor: pointer"></refresh-cw-icon>-->
        <!--                        </span>-->
        <!--                        <span v-else-if="Deb.debtorCredit.status_claim_fssp === 2" style="color: red">-->
        <!--                            Ошибка-->
        <!--                        </span>-->
        <!--                    </div>-->
        <!--                    <vs-button color="danger" style="margin-left: auto" type="border" @click="createClaim">Подать жалобу</vs-button>-->
        <!--                </div>-->
      </div>


    </div>

    <vs-popup class="holamundo" title="Данные запроса ФССП:" :active.sync="showInfoHodFssp">
      <template v-if="history_data_hod">
        <json-viewer
            :value="history_data_hod"
            :expand-depth=5
            copyable

            sort></json-viewer>
      </template>


    </vs-popup>

    <vs-popup class="holamundo" title="Данные ФССП:" :active.sync="showInfoFssp">
      <template v-if="Deb.debtorCredit.data_fssp">
        <json-viewer
            :value="Deb.debtorCredit.data_fssp"
            :expand-depth=5
            copyable

            sort></json-viewer>
      </template>


    </vs-popup>


    <vs-popup class="holamundo" title="Данные ответа ФССП:" :active.sync="showInfoFsspAns">
      <template v-if="Deb.debtorCredit.answer_rec_fssp">
        <json-viewer
            :value="Deb.dataAnswer"
            :expand-depth=5
            copyable

            sort></json-viewer>
      </template>


    </vs-popup>

    <template v-if="showSved">
      <vs-popup class="holamundo" title="Cведения из ответов ФССП РФ:" :active.sync="showSved">
        <FsspAnswerInfo :id_debcredit="Deb.debtorCredit.id"></FsspAnswerInfo>
      </vs-popup>
    </template>

    <vs-popup title="История запросов о наличии ИП" :active.sync="showHistoryFssp">
      <FsspHistory :hist_data="history_data"></FsspHistory>
    </vs-popup>
    <vs-popup title="История запросов о Жалобы на ФССП" :active.sync="showFsspVedHistory">
      <FsspHistory :hist_data="history_data_ved"></FsspHistory>
    </vs-popup>

    <vs-popup class="holamundo" title="История отправок:" :active.sync="showFsspJournal">
      <json-viewer
          :value="journal_data"
          :expand-depth=5
          copyable

          sort></json-viewer>
    </vs-popup>

    <vs-popup class="holamundo" title="Результат:" :active.sync="showFsspResult">
      <json-viewer
          :value="result_send_data"
          :expand-depth=5
          copyable

          sort></json-viewer>
    </vs-popup>
  </vx-card>
</template>

<script>
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import JsonViewer from 'vue-json-viewer'
import VueDadata from 'vue-dadata'
import { mapActions,mapGetters } from 'vuex'
import VueSuggestions from 'vue-suggestions';
import vSelect from 'vue-select'
import Status from '../../../components/Status.vue'

import r from '../../../route';

import axios from '../../../axios'
import FsspAnswerInfo from "../../Fssp/FsspAnswerInfo.vue";
import FsspHistory from "../../Fssp/FsspHistory.vue";
import { RefreshCwIcon } from 'vue-feather-icons'
import VarToClipboard from './../../VarToClipboard.vue'
Vue.use(AsyncComputed)
export default {
  components: {
    FsspAnswerInfo, VueSuggestions,Status,  'v-select': vSelect,JsonViewer, RefreshCwIcon,FsspHistory,VarToClipboard
  },
  data () {
    return {
      showInfoHodFssp:false,
      history_data: {},
      history_data_hod: {},
      history_data_ved:{},
      journal_data:{},
      result_send_data:{},
      showHistoryFssp:false,
      showFsspVedHistory:false,
      showInfoFsspAns:false,
      showInfoFssp:false,
      showSved:false,
      showFsspJournal: false,
      showFsspResult: false,
      years:['2022','2021','2020','2019','2018'],
      type_oper_now: '',
    }
  },
  mounted(){
    this.getBanksNameAndId();
    this.getFsspDataCredit(this.Deb.debtorCredit.id);
  },
  asyncComputed: {

  },
  computed: {

    ...mapGetters([
      'StatussDebtorArr','Deb','BanksArr','User','FsspDataCredit'

    ]),


  },
  methods: {
    toQueueConfirm(type_oper){
      this.type_oper_now = '';
      this.type_oper_now = type_oper;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Внимание',
        text: 'Вы действительно хотите поставить данное заявление в очередь?',
        accept: this.toQueue,
        acceptText: 'Да',
        cancelText: 'Нет'
      })
    },

    toQueue(){
      this.toQueueFssp({id_credit: this.Deb.debtorCredit.id,type_oper: this.type_oper_now}).then((response) => {
        if (response.result){
          this.$vs.notify({
            title: 'Успешно',
            text: 'Поставлено в очередь',
            color: 'success',
            position: 'top-center'
          });
          this.getDataDebtorsById(this.$route.params.id);
          this.getFsspDataCredit(this.Deb.debtorCredit.id);
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: response.message,
            color: 'danger',
            position: 'top-center'
          })
        }
      })
    },
    getJournalFsspA(type_oper){
      this.getJournalFssp({credit_id: this.Deb.debtorCredit.id, type_oper: type_oper}).then((response) => {
        if (response.result){
          this.journal_data = response.data;
          this.showFsspJournal = true;
        }
      });
    },
    getResultFsspA(type_oper){
      this.getSendResultFssp({credit_id: this.Deb.debtorCredit.id, type_oper: type_oper}).then((response) => {
        if (response.result){
          this.result_send_data = response.data;
          this.showFsspResult = true;
        }
      });
    },
    getFsspVedHistoryLocal(){
      this.getFsspVedHistory(this.Deb.debtorCredit.id).then((response) => {
        if (response.result){
          this.history_data_ved = response.data;
          this.showFsspVedHistory = true;
        }
      });
    },
    getReqHistoryHodFssp(){
      this.getFsspReqHistoryHod(this.Deb.debtorCredit.id).then((response) => {
        if (response.result){
          this.history_data_hod = response.data;
          this.showInfoHodFssp = true;
        }
      });
    },
    getReqHistory(){
      this.getFsspReqHistory(this.Deb.debtorCredit.id).then((response) => {
        if (response.result){
          this.history_data = response.data;
          this.showHistoryFssp = true;
        }
      });
    },
    claimStatusRefresh(){
      this.getDataDebtorsById(this.Deb.debtorCredit.id);
    },
    findFsspAns(){
      this.$vs.loading({color: '#ff8000'})
      axios.get(r("fssp.index"), {
        params: {
          method: 'findFsspAns',
          param: this.Deb.debtorCredit.id

        }
      }).then((response) => {
        this.$vs.loading.close()
        //   this.getDataDebtorsById(this.Deb.debtorCredit.id);
        if (response.data.result) {
          this.$vs.notify({
            title: 'Успешно',
            text: 'Найдено!!!',
            color: 'success',
            position: 'top-center'
          })
        }
        else {
          this.$vs.notify({
            title: 'Успешно',
            text: 'Ответа нет !!!',
            color: 'success',
            position: 'top-center'
          })
        }

      }).catch(error => {
        this.getDataDebtorsById(this.Deb.debtorCredit.id);
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Ошибка',
          text: error.message,
          color: 'danger',
          position: 'top-center'
        })


      });
    },

    findFssp(){
      this.$vs.loading({color: '#ff8000'})
      axios.get(r("fssp.index"), {
        params: {
          method: 'findFssp',
          param: this.Deb.debtorCredit.id

        }
      }).then((response) => {
        this.$vs.loading.close()
        //   this.getDataDebtorsById(this.Deb.debtorCredit.id);
        if (response.data.result.mess.response.status) {
          this.$vs.notify({
            title: 'Успешно',
            text: 'Найдено!!!',
            color: 'success',
            position: 'top-center'
          })
        }
        else {
          this.$vs.notify({
            title: 'Успешно',
            text: 'Ошибка !!!',
            color: 'success',
            position: 'top-center'
          })
        }

      }).catch(error => {
        this.getDataDebtorsById(this.Deb.debtorCredit.id);
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Ошибка',
          text: error.message,
          color: 'danger',
          position: 'top-center'
        })


      });
    },
    infoFssp(){
      this.$vs.loading({color: '#ff8000'})
      axios.post(r("fssp.index"), {
        params: {
          method: 'infoFssp',
          param: this.Deb.debtorCredit.id

        }
      }).then((response) => {
        this.$vs.loading.close()
        this.getDataDebtorsById(this.Deb.debtorCredit.id);
        if (response.data.data.result) {
          this.$vs.notify({
            title: 'Успешно',
            text: 'Запрос отправлен!!!',
            color: 'success',
            position: 'top-center'
          })
        }
        else {
          this.$vs.notify({
            title: 'Успешно',
            text: 'Ошибка !!!',
            color: 'success',
            position: 'top-center'
          })
        }

      }).catch(error => {
        this.getDataDebtorsById(this.Deb.debtorCredit.id);
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Ошибка',
          text: error.message,
          color: 'danger',
          position: 'top-center'
        })


      });
    },
    openHodBanksFssp(){
      window.open( this.Deb.debtorCredit.url_send_banks_fssp, '_blank');
    },
    openFssp(){
      window.open( this.Deb.debtorCredit.url_rec_fssp, '_blank');
    },
    openReqIpExistFssp(){
      window.open( this.Deb.debtorCredit.url_hod_fssp, '_blank');
    },
    openClaimFssp(){
      window.open( this.Deb.debtorCredit.url_claim_fssp, '_blank');
    },
    openReqReturnFssp(){
      window.open( this.Deb.debtorCredit.url_zay_return_fssp, '_blank');
    },
    openClaimReturnFssp(){
      window.open( this.FsspDataCredit.url_noid_claim, '_blank');
    },
    openNoIpClaimFssp(){
      window.open( this.FsspDataCredit.url_noip_claim, '_blank');
    },
    openOtkazIpClaimFssp(){
      window.open( this.FsspDataCredit.url_otkazip_claim, '_blank');
    },
    close(){
      this.$router.back()
    },
    // getAnswerJson(){
    //     Deb.debtorCredit.answer_rec_fssp
    // },
    createClaim(){
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Внимание',
        text: 'Вы действительно хотите подать жалобу?',
        accept: this.claimSuccess,
        acceptText: 'Да',
        cancelText: 'Нет'
      })
    },
    openReqIpExistFssp1111(){

    },
    claimSuccess(){
      this.$vs.loading({color: '#ff8000'})
      this.createClaimOnFssp(this.Deb.debtorCredit.id).then((response) => {
        this.$vs.loading.close()
        if (response.result){
          this.$vs.notify({
            title: 'Сообщение',
            text: response.message,
            color: 'success',
            position: 'top-center'
          })
          this.getDataDebtorsById(this.Deb.debtorCredit.id);
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: response.message,
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
      });
    },
    ...mapActions([
      'saveDebtor','getDataStatuss','getDataDebtorsById','getBanksNameAndId','changeDeb','getDataDebtorsById',
      'createClaimOnFssp','getFsspReqHistory','getFsspReqHistoryHod','getFsspVedHistory','getJournalFssp',
      'getSendResultFssp','getFsspDataCredit','toQueueFssp'
    ]),


  },
}
</script>

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
