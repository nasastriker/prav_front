<template>
    <vx-card no-shadow class="dolg_mainWrapper">
        <div class="vx-row" style="padding-top: 20px">

            <div class="vx-col sm:w-1/6 w-full mb-2">

                <fieldset class="f" style="min-height: 820px;">
                    <legend class="l">Текущий остаток долга:</legend>

                    <div class="centerx">
                        <vs-tooltip text="Остаток долга + государственная пошлина" position="top" >
                            <h6 class="h6 mb-1">Остаток долга + ГП:<VarToClipboard name="dc_ocs_sum"/></h6>
                        </vs-tooltip>
                    </div>
                    <vs-input   disabled type="number" readonly class="w-100 w130 mb-4" v-model="Deb.debtorCredit.ocs_sum"></vs-input>

                <template v-if="User.email=='amitx@list.ru'">
                  <h6 class="h6 mb-1">ocs_sum_new:<VarToClipboard name="dc_ocs_sum_new"/></h6>
                  <vs-input   disabled type="number" readonly class="w-100 w130 mb-4" v-model="Deb.debtorCredit.ocs_sum_new"></vs-input>
                  <h6 class="h6 mb-1">ocs_sum_check:<VarToClipboard name="dc_ocs_sum_check"/></h6>
                  <vs-input   disabled type="number" readonly class="w-100 w130 mb-4" v-model="Deb.debtorCredit.ocs_sum_check"></vs-input>
                </template>
                <h6 class="h6 mb-1">Остаток долга ост:<VarToClipboard name="dc_ocs_sum_ocs"/></h6>
                <vs-input disabled type="number" readonly class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.ocs_sum_ocs"></vs-input>

                <h6 class="h6 mb-1">Основной долг Остаток:<VarToClipboard name="dc_dolg_osn_ocs"/></h6>
                <vs-input disabled type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.dolg_osn_ocs" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">% по займу Остаток:<VarToClipboard name="dc_procent_dolg_ocs"/></h6>
                <vs-input disabled type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.procent_dolg_ocs" @change="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">Пени остаток:<VarToClipboard name="dc_peny_dolg"/></h6>
                <vs-input disabled type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.peny_dolg" @change="changeDebUpdate"></vs-input>


                <h6 class="h6 mb-1">Госпошлина остаток:<VarToClipboard name="dc_gospohlina_dolg"/></h6>
                <vs-input disabled type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.gospohlina_dolg" @change="changeDebUpdate"></vs-input>
               <!-- <h6 class="h6 mb-1">% длящиеся остаток:<VarToClipboard name="dc_sum_lasting_ocs"/></h6>
                <vs-input disabled type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.sum_lasting_ocs" ></vs-input> -->
                <h6 class="h6 mb-1">Индексация остаток:<VarToClipboard name="dc_sum_index_ocs"/></h6>
                <vs-input disabled type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.sum_index_ocs" ></vs-input>
                <h6 class="h6 mb-1">Судебные расходы остаток:<VarToClipboard name="dc_sum_sud_rach_ocs"/></h6>
                <vs-input disabled type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.sum_sud_rach_ocs" ></vs-input>

                <h6 class="h6 mb-1">Длящиеся % остаток:<VarToClipboard name="dc_sum_lasting_ocs"/></h6>
                <vs-input disabled type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.sum_lasting_ocs" ></vs-input>


                </fieldset>


            </div>
            <div class="vx-col sm:w-1/6 w-full mb-2" style="border: 1px;">
                <fieldset class="f" style="min-height: 820px;">
                    <legend class="l">Удовлетворено судом:</legend>
                    <h6 class="h6 mb-1">Сумма долга удовлетворено + ГП:<VarToClipboard name="dc_dolg_sum_res_and_gp"/></h6>
                    <vs-input disabled type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.dolg_sum_res_and_gp"></vs-input>
                    <h6 class="h6 mb-1">Сумма долга удовлетворено:<VarToClipboard name="dc_dolg_sum_res"/></h6>
                    <vs-input disabled type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.dolg_sum_res"></vs-input>

                    <h6 class="h6 mb-1" style="margin-top: 15px">ОД удовлетворено:<VarToClipboard name="dc_ocn_sum_res"/></h6>
                    <vs-input type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.ocn_sum_res" @change="changeDebUpdate"></vs-input>

                    <h6 class="h6 mb-1">% удовлетворено:<VarToClipboard name="dc_procent_sum_res"/></h6>
                    <vs-input type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.procent_sum_res" @change="changeDebUpdate"></vs-input>

                    <h6 class="h6 mb-1">Пени удовлетворено:<VarToClipboard name="dc_peny_sum_res"/></h6>
                    <vs-input type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.peny_sum_res" @change="changeDebUpdate"></vs-input>

                    <h6 class="h6 mb-1">Госпошлина удовлетворено:<VarToClipboard name="dc_gp_sum_res"/></h6>
                    <vs-input type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.gp_sum_res" @change="changeDebUpdate"></vs-input>
                    <h6 class="h6 mb-1">Индексация удовлетворено:<VarToClipboard name="dc_sum_index_res"/></h6>
                    <vs-input type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.sum_index_res" @change="changeDebUpdate"></vs-input>
                    <h6 class="h6 mb-1">Судебные расходы удовлетворено:<VarToClipboard name="dc_sum_res_rach_sud"/></h6>
                    <vs-input type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.sum_res_rach_sud" @change="changeDebUpdate"></vs-input>

                    <vs-checkbox v-model="Deb.debtorCredit.res_sud" @input="changeDebUpdate" style="margin-bottom: 5px; font-size: 12px;">Расчет по суду <VarToClipboard name="dc_res_sud"/></vs-checkbox>
                    <template v-if="User.email=='amitx@list.ru'">
                        <vs-button style="margin-top: 15px" color="success" class="pull-right" type="filled"  @click="upRes">Поменять</vs-button>
                    </template>

                </fieldset>

            </div>
            <div class="vx-col sm:w-1/6 w-full mb-2" style="border: 1px;">
                <fieldset class="f" style="min-height: 820px;">
                    <legend class="l">Параметры долга в суд:</legend>
                <h6 class="h6 mb-1">Сумма долга Суд + ГП:<VarToClipboard name="dc_dolg_sum_sud_and_gp"/></h6>
                <vs-input disabled type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.dolg_sum_sud_and_gp"></vs-input>

                <h6 class="h6 mb-1">Сумма долга в Суд:<VarToClipboard name="dc_dolg_sum_sud"/></h6>
                <vs-input disabled type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.dolg_sum_sud"></vs-input>



                <h6 class="h6 mb-1" style="margin-top: 15px">Основной долг в Суд:<VarToClipboard name="dc_ocn_sum_sud"/></h6>
                <vs-input type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.ocn_sum_sud" @change="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">% долг в Суд:<VarToClipboard name="dc_procent_sum_sud"/></h6>
                <vs-input type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.procent_sum_sud" @change="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">Пени долг в Суд:<VarToClipboard name="dc_peny_sum_sud"/></h6>
                <vs-input type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.peny_sum_sud" @change="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">Госпошлина в Суд:<VarToClipboard name="dc_gp_sum_sud"/></h6>
                <vs-input type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.gp_sum_sud" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">Индексация в Суд:<VarToClipboard name="dc_sum_index_sud"/></h6>
                <vs-input type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.sum_index_sud" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">Судебные расходы в Суд:<VarToClipboard name="dc_sum_sud_rach_sud"/></h6>
                <vs-input type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.sum_sud_rach_sud" @change="changeDebUpdate"></vs-input>



                <h6 class="h6 mb-1" style="margin-top: 10px">Дата расчета в Суд:<VarToClipboard name="dc_date_sud_send"/></h6>
                <vs-input type="date"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.date_sud_send" @blur="changeDebUpdate"></vs-input>
                </fieldset>

            </div>
            <div class="vx-col sm:w-1/6 w-full mb-2" style="border: 1px;">
                <fieldset class="f" style="min-height: 820px;">
                    <legend class="l">Исходные параметры долга в работу:</legend>
                <h6 class="h6 mb-1">Сумма долга исх. + ГП:<VarToClipboard name="dc_dolg_sum_and_gp"/></h6>
                <vs-input disabled type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.dolg_sum_and_gp"></vs-input>
                <h6 class="h6 mb-1">Сумма долга исх.:<VarToClipboard name="dc_dolg_sum"/></h6>
                <vs-input disabled type="number" readonly class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.dolg_sum" ></vs-input>


                <h6 class="h6 mb-1" style="margin-top: 15px">Основной долг исх.:<VarToClipboard name="dc_dolg_osn"/></h6>
                <vs-input type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.dolg_osn" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">% по займу исх.:<VarToClipboard name="dc_procent_dolg"/></h6>
                <vs-input type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.procent_dolg" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">Пени исх.:<VarToClipboard name="dc_peny"/></h6>
                <vs-input type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.peny" @change="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">Госпошлина исх.:<VarToClipboard name="dc_gospohlina_ich"/></h6>
                <vs-input type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.gospohlina_ich" @change="changeDebUpdate"></vs-input>
               <vs-checkbox v-model="Deb.debtorCredit.lasting" @input="changeDebUpdate" style="margin-bottom: 5px; font-size: 12px;">Активировать начисления <VarToClipboard name="dc_lasting"/></vs-checkbox>
                <h6 class="h6 mb-1">% длящиеся :<VarToClipboard name="dc_sum_lasting"/></h6>
                <vs-input type="number"  disabled class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.sum_lasting" ></vs-input>


                    <h6 class="h6 mb-1" style="margin-top: 25px">Госпошлина Оплаченная <span style="cursor: pointer;color: red" @click="showInfoGosp=!showInfoGosp">расчет</span>:<VarToClipboard name="dc_gospohlina"/></h6>
                <vs-checkbox v-model="Deb.debtorCredit.gospohlina_hand" @input="changeDebUpdate" style="margin-bottom: 5px; font-size: 12px;">Установлена вручную</vs-checkbox>
                <vs-input class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.gospohlina" @change="changeDebUpdate"></vs-input>
                <h6 class="h6 mb-1">Индексация исх.:<VarToClipboard name="dc_sum_index_ish"/></h6>
                <vs-input type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.sum_index_ish" @change="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">Судебные расходы исх.:<VarToClipboard name="dc_sum_sud_rach"/></h6>
                <vs-input type="number"  class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.sum_sud_rach" @change="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">% ограничение:<VarToClipboard name="dc_ogran"/></h6>
                <vs-input disabled type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.ogran" @change="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">Ограничение % остаток:</h6>
                <vs-input disabled type="number" class="w-100 w130 mb-4" v-model="ogrn" ></vs-input>
                </fieldset>









            </div>

            <div class="vx-col sm:w-1/6 w-full mb-2" style="border: 1px;">



                <h6 class="h6 mb-1" >Номер договора займа:<VarToClipboard name="dc_number_dog"/></h6>
                <vs-input class="w-100 w130 mb-4"  v-model="Deb.debtorCredit.number_dog" @change="changeDeb"></vs-input>
                <h6 class="h6 mb-1">Дата договора займа:<VarToClipboard name="dc_date_dog"/></h6>
                <vs-input type="date" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.date_dog" @blur="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1" style="margin-top: 15px">Сумма займа:<VarToClipboard name="dc_sum_zaim"/></h6>
                <vs-input type="number" class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.sum_zaim" @change="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">% ставка (годовая):<VarToClipboard name="dc_psk"/></h6>
                <vs-input type="number" class="w-100 w130 mb-4 " v-model="Deb.debtorCredit.psk" @change="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">Срок возрата:<VarToClipboard name="dc_sroc_dog"/></h6>
                <vs-input type="date" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.sroc_dog" @blur="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">Срок займ дни:<VarToClipboard name="dc_sroc_dog_day"/></h6>
                <vs-input disabled class="w-100 w130 mb-4" v-model="Deb.debtorCredit.sroc_dog_day" ></vs-input>
                <h6 class="h6 mb-1">Дата начала просроч Цедент:<VarToClipboard name="dc_date_stop_cess"/></h6>
                <vs-input class="w-100 w130 mb-4" type="date" v-model="Deb.debtorCredit.date_stop_cess" @blur="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">Просрочка дни:<VarToClipboard name="dc_procroh_day"/></h6>
                <vs-input disabled type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.procroh_day" @change="changeDebUpdate"></vs-input>
                <vs-checkbox v-model="Deb.debtorCredit.stop_proch" @input="changeDebUpdate" style="margin-bottom: 5px; font-size: 12px;">Не подавать в суд до окончания даты просрочки <VarToClipboard name="dc_stop_proch"/></vs-checkbox>
                <h6 class="h6 mb-1">Дата окон просроч:<VarToClipboard name="dc_date_stop_proch"/></h6>
                <vs-input class="w-100 w130 mb-4" type="date" v-model="Deb.debtorCredit.date_stop_proch" @blur="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">Срок исковой давности:</h6>
                <vs-input type="date" class="w-100 w130 mb-4" v-model="planDateIsk" disabled="true"></vs-input>

                <h6 class="h6 mb-1">Дата исполнения основного обязательства:<VarToClipboard name="dc_date_isp_osn"/></h6>
                <vs-input disabled class="w-100 w130 mb-4" type="date" v-model="Deb.debtorCredit.date_isp_osn" @blur="changeDebUpdate"></vs-input>


            </div>

            <div class="vx-col sm:w-1/6 w-full mb-2" style="border: 1px;">


                <vs-tooltip text="Основной долг по цессии + % по займу по цессии + Пени по цессии"  >
                    <h6 class="h6 mb-1" >Сумма долга по цессии :<VarToClipboard name="dc_sum_cession"/></h6>
                </vs-tooltip>






                <vs-input disabled type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.sum_cession" @change="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1" >Основной долг по цессии :<VarToClipboard name="dc_dolg_osn_dop"/></h6>
                <vs-input type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.dolg_osn_dop" @change="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">% по займу по цессии:<VarToClipboard name="dc_procent_dolg_dop"/></h6>
                <vs-input type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.procent_dolg_dop" @change="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">Пени по цессии:<VarToClipboard name="dc_peny_dop"/></h6>
                <vs-input type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.peny_dop" @change="changeDebUpdate"></vs-input>

              <h6 class="h6 mb-1">ГП по цессии:<VarToClipboard name="dc_gp_dop"/></h6>
              <vs-input type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.gp_dop" @change="changeDebUpdate"></vs-input>
              <h6 class="h6 mb-1">Иные платежи по цессии:<VarToClipboard name="dc_inoe_dop"/></h6>
              <vs-input type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.inoe_dop" @change="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">Сумма покупки долга:<VarToClipboard name="dc_sum_pay_dolg"/></h6>
                <vs-input type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.sum_pay_dolg" @change="changeDebUpdate"></vs-input>

                <h6 class="h6 mb-1">Дата цессии:<VarToClipboard name="dc_date_cession"/></h6>
                <vs-input type="date" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.date_cession" @blur="changeDebUpdate"></vs-input>


             <!--   <h6 class="h6 mb-1">Полные проценты:<VarToClipboard name="dc_procent_full"/></h6>
                <vs-input disabled type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.procent_full" @change="changeDebUpdate"></vs-input> -->

                <fieldset class="f" style="margin-top: 20px">
                    <legend class="l">Данные о платежах:</legend>
                    <h6 class="h6 mb-1">Платежи всего:<VarToClipboard name="dc_payment_all"/></h6>
                    <vs-input type="number" disabled="true" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.payment_all" ></vs-input>

                    <h6 class="h6 mb-1">Платежи Цедент:<VarToClipboard name="dc_payment"/></h6>
                    <vs-input type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.payment" @change="changeDebUpdate"></vs-input>

                    <h6 class="h6 mb-1">Платежи Взыскатель:<VarToClipboard name="dc_sum_payment"/></h6>
                    <vs-input type="number" disabled="true" class="w-100 w130 mb-4" v-model="Deb.debtorCredit.sum_payment" ></vs-input>



                </fieldset>

                <div v-for=" setting in DebtorCreditDopVarCalcArr">
                    <template v-if="typeof Deb.debtorCreditDop!='undefined'">
                        <div v-if="setting.type==='int'">
                            <h6 class="h6 mb-1">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                            <vs-input  type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCreditDop[setting.atr]" @change="changeDebUpdate"></vs-input>
                        </div>
                        <div v-if="setting.type==='bigint'">
                            <h6 class="h6 mb-1">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                            <vs-input  type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCreditDop[setting.atr]" @change="changeDebUpdate"></vs-input>
                        </div>
                        <div v-if="setting.type==='date'">
                            <h6 class="h6 mb-1">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                            <vs-input  type="date" class="w-100 w130 mb-4" v-model="Deb.debtorCreditDop[setting.atr]" @blur="changeDebUpdate"></vs-input>
                        </div>
                        <div v-if="setting.type==='boolean'">
                            <h6 class="h6 mb-1">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                            <vs-checkbox  v-model="Deb.debtorCreditDop[setting.atr]"  style="    color: brown;" @change="changeDebUpdate">Активно</vs-checkbox>
                        </div>
                        <div v-if="setting.type==='varchar'">
                            <h6 class="h6 mb-1">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                            <vs-input  class="w-100 w130 mb-4" v-model="Deb.debtorCreditDop[setting.atr]" @blur="changeDebUpdate"></vs-input>
                        </div>
                        <div v-if="setting.type==='text'">
                            <h6 class="h6 mb-1">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                            <vs-textarea  class="w-100 w130 mb-4" rows="5" v-model="Deb.debtorCreditDop[setting.atr]" @blur="changeDebUpdate"></vs-textarea>
                        </div>
                        <div v-if="setting.type==='decimal'">
                            <h6 class="h6 mb-1">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                            <vs-input  type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCreditDop[setting.atr]"  @blur="changeDebUpdate"></vs-input>
                        </div>

                        <div v-if="setting.type==='float'">
                            <h6 class="h6 mb-1">{{setting.name}}:<VarToClipboard :name=setting.name_column /></h6>
                            <vs-input  type="number" class="w-100 w130 mb-4" v-model="Deb.debtorCreditDop[setting.atr]"  @blur="changeDebUpdate"></vs-input>
                        </div>
                    </template>

                </div>


                <template  v-if="User.pag.showDopGraf" >
                    <h6 class="h6 mb-1">Платежная система:<VarToClipboard name="dc_payment_system"/></h6>
                    <vs-input class="w-100 w130 mb-4" v-model="Deb.debtorCredit.payment_system" @change="changeDebUpdate"></vs-input>

                    <h6 class="h6 mb-1">Идентификатор Платежа:<VarToClipboard name="dc_trans_number"/></h6>
                    <vs-input class="w-100 w130 mb-4" v-model="Deb.debtorCredit.trans_number" @change="changeDebUpdate"></vs-input>

                    <h6 class="h6 mb-1">Маска карты:<VarToClipboard name="dc_card_mask"/></h6>
                    <vs-input class="w-100 w130 mb-4" v-model="Deb.debtorCredit.card_mask" @change="changeDebUpdate"></vs-input>

                    <h6 class="h6 mb-1">Код ЭЦП:<VarToClipboard name="dc_code_isp"/></h6>
                    <vs-input class="w-100 w130 mb-4" v-model="Deb.debtorCredit.code_isp" @change="changeDebUpdate"></vs-input>
                    <h6 class="h6 mb-1">Банк эмитент:<span @click="bankEmited" style="color: red;cursor: pointer;"> Определить</span><VarToClipboard name="dc_bank_emit"/>
                    </h6>
                    <vs-input class="w-100 w130 mb-4" v-model="Deb.debtorCredit.bank_emit" @change="changeDeb"></vs-input>


                </template>

            </div>


        </div>


        <template v-if="showInfoGosp">
            <vs-popup class="holamundo" title="Госпошлина на текущий момент:" :active.sync="showInfoGosp">
                <InfoGosp :id_debcredit="Deb.debtorCredit.id" ></InfoGosp>
            </vs-popup>
        </template>



    </vx-card>
</template>

<script>
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import JsonViewer from 'vue-json-viewer'
import r from '../../../route';
import axios from '../../../axios'
/* Initialize the plugin */
Vue.use(AsyncComputed)
import VueDadata from 'vue-dadata'
import {mapActions, mapGetters} from 'vuex'
import VueSuggestions from 'vue-suggestions';
import vSelect from 'vue-select'

import InfoGosp from "./ChildTab/InfoGosp.vue";
import moment from 'moment';
import VarToClipboard from './../../VarToClipboard.vue'


Vue.prototype.$moment = moment;
export default {
    components: {
         VueSuggestions,InfoGosp,VarToClipboard,
    },
    data() {
        return {
            credit:{

            },


            showInfoGosp:false,
        }
    },
    mounted() {
        this.getDataDebtorCreditDopVar()
    },
    asyncComputed: {},
    computed: {
        ogrn(){
            let org=this.Deb.debtorCredit.ogran-this.Deb.debtorCredit.payment+(this.Deb.debtorCredit.sum_zaim-this.Deb.debtorCredit.dolg_osn);
            if(org>0){
                return org;
            }else{
                return 0;
            }

        },
        planDateIsk(){
            if(typeof this.Deb.debtorCredit.sroc_dog!='undefined'){
                if(this.Deb.debtorCredit.sroc_dog!=null){
                    let date1 = new Date(this.Deb.debtorCredit.sroc_dog);
                    let fortnightAway = new Date(date1);
                    date1.setDate(fortnightAway.getDate() + 1095);

                    return  moment(date1.toString()).format("YYYY-MM-DD")
                }
            }
            return null
        },
        ...mapGetters([
            'StatussDebtorArr', 'Deb', 'User','DebtorCreditDopVarCalcArr'

        ]),


    },
    methods: {
        upRes(){
            this.Deb.debtorCredit.ocn_sum_res=this.Deb.debtorCredit.ocn_sum_sud
            this.Deb.debtorCredit.procent_sum_res=this.Deb.debtorCredit.procent_sum_sud
            this.Deb.debtorCredit.peny_sum_res=this.Deb.debtorCredit.peny_sum_sud
            this.Deb.debtorCredit.gp_sum_res=this.Deb.debtorCredit.gp_sum_sud

            this.Deb.debtorCredit.ocn_sum_sud=this.Deb.debtorCredit.dolg_osn
            this.Deb.debtorCredit.procent_sum_sud=this.Deb.debtorCredit.procent_dolg
            this.Deb.debtorCredit.peny_sum_sud=this.Deb.debtorCredit.peny
            this.Deb.debtorCredit.gp_sum_sud=this.Deb.debtorCredit.gospohlina
            this.Deb.debtorCredit.res_sud=1
            this.changeDebUpdate()

        },

        bankEmited(){
            this.$vs.loading({color: '#ff8000'})
            axios.get(r("bank.index"), {
                params: {
                    method: 'bankEmit',
                    param: this.Deb.debtorCredit.id
                }
            }).then((response) => {
                this.$vs.loading.close()
                if(response.data.result){
                    this.$vs.notify({  title:'Успешно', text: 'Успешно' , color: 'success', position: 'top-center' })
                    this.getDataDebtorsById(this.Deb.debtorCredit.id)
                }
                else{
                    this.$vs.notify({  title:'Ошибка', text: 'Ошибка' , color: 'danger', position: 'top-center' })
                }




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
        close() {

            this.$router.back()
        },
        ...mapActions([
            'saveDebtor', 'getDataStatuss', 'getDataDebtorsById', 'changeDebUpdate', 'changeDeb','getDataDebtorsByIdAll','getDataDebtorCreditDopVar'
        ]),


    },
}
</script>

<style lang="scss">
    .w130{
        width: 130px!important
    }
    h6,
    .h6{
        color: rgba(var(--vs-primary),1)!important;
        font-size: 12px;
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
</style>
