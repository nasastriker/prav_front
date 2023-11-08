<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="vx-row" style="z-index: 222; position: relative;">
                <div class="vx-col w-full flex flex-wrap" style="justify-content: flex-start;">
                    <div class="mb-4 mr-4" >
                      <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div
                            class="p-3 cursor-pointer flex items-center justify-between font-medium" style="margin-top: 19px;border: 1px solid #ccc;border-radius: 4px;">
                                <span class="mr-2">{{currentPage * paginationPageSize - (paginationPageSize - 1)}} - {{TotalCredits - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalCredits}} of {{ TotalCredits }}</span>
                          <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
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
                    
                    <div class="mr-4">
                        <div class="centerx">
                            <vs-tooltip text="Поиск, после ввода нажите Enter" position="top" >
                                <h6 class="h6Blue mb-1">Поиск</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="mb-4 md:mb-0 search_filter_input" v-model="credit.find" v-debounce:1500ms="updateSearchQuery" placeholder="Поиск..."/>
                    </div>

                    <div class="mr-4">
                        <div class="centerx">
                            <vs-tooltip text="Фильтр по стратегии" position="top" >
                                <h6 class="h6Blue mb-1">Стратегия</h6>
                            </vs-tooltip>
                        </div>
                        <v-select class="w-50 w200" label="name" @input="setStatus" ></v-select>
                    </div>

                    <div class="mr-4">
                        <div class="centerx">
                            <vs-tooltip text="Фильтр по стадии стратегии" position="top" >
                                <h6 class="h6Blue mb-1">Стадия стратегии</h6>
                            </vs-tooltip>
                        </div>
                        <v-select class="w-50 w200" label="name" @input="setStatus" ></v-select>
                    </div>

                    <div class="mr-4">
                        <div class="centerx">
                            <vs-tooltip text="Фильтр по взыскателю" position="top" >
                                <h6 class="h6Blue mb-1">Взыскатель</h6>
                            </vs-tooltip>
                        </div>
                        <v-select  class="w-50 w200" :reduce="label => label.id" label="name" :options="RecoverArrList"  v-model="rec_id" @input="setRecover" ></v-select>
                    </div>

                    <div class="mr-4" style="margin-top: 18px;">
                        <vs-button class="btn-drop" color="success" type="gradient"  @click="filterPopup=true">Фильтры Судебной работы</vs-button>
                        <div><span v-if="additionFilterStay" style="color:red;cursor:pointer;font-size: 13px;display: block;text-align: center;" @click="clearAdditionalFilters">Сброс доп фильтров</span></div>
                    </div>
                    

                    <div class="mr-4 actionBtnWrapper" style="margin-top: 18px;">
                        <vs-dropdown>
                            <vs-button class="btn-drop" type="gradient" >Совершить Действие</vs-button>
                            <vs-dropdown-menu>
                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0"  color="primary" style="width: 100%;right:0px" @click="operatorSelectModal=true">Cмена оператора взаимодействия</vs-button>
                                </vs-dropdown-item>
                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0"  color="primary" style="width: 100%;right:0px" @click="newTaskModal=true">Поставить задачу сотруднику</vs-button>
                                </vs-dropdown-item>
                                
                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0"  color="primary" style="width: 100%;right:0px" @click="strategySelectModal=true">Cмена стратегии</vs-button>
                                </vs-dropdown-item>
                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0"  color="primary" style="width: 100%;right:0px" @click="sendMailSelectModal=true">Отправить Email должнику</vs-button>
                                </vs-dropdown-item>
                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0"  color="primary" style="width: 100%;right:0px" @click="sendSmsSelectModal=true">Отправить SMS должнику</vs-button>
                                </vs-dropdown-item>
                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0"  color="primary" style="width: 100%;right:0px" @click="sendLetterSelectModal=true">Отправить письмо должнику</vs-button>
                                </vs-dropdown-item>
                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0"  color="primary" style="width: 100%;right:0px" @click="ivrSelectModal=true">Запустить автоинформатор (IVR)</vs-button>
                                </vs-dropdown-item>
                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0"  color="primary" style="width: 100%;right:0px" @click="massCallModal=true">Запустить массовый обзвон</vs-button>
                                </vs-dropdown-item>
                                <vs-dropdown-item>
                                    <vs-button class="mb-4 md:mb-0"  color="primary" style="width: 100%;right:0px" @click="operatorCallModal=true">Запустить обзвон оператором</vs-button>
                                </vs-dropdown-item>

                            </vs-dropdown-menu>
                        </vs-dropdown>
                    </div>

                    <div class="settingsBtnWrapper mr-4" style="margin-top: 18px;">
                        <div class="centerx">
                            <vs-tooltip text="История действий" position="top" >
                                <vs-button class="btn-drop"  @click="historyModal=true">
                                    История действий
                                </vs-button>
                            </vs-tooltip>
                        </div>
                    </div>

                    <div style="margin-top: 18px;" class="mr-4">
                        <div class="centerx">
                            <vs-tooltip text="Обновить таблицу" position="top" >
                                <vs-button class="includeIconOnly" @click="refreshShow">
                                    <feather-icon icon="RefreshCwIcon" svgClasses="h-5 w-5 cursor-pointer" />
                                </vs-button>
                            </vs-tooltip>
                        </div>
                    </div>

                    <div style="margin-top: 18px;" class="mr-4">
                        <div class="centerx">
                            <vs-tooltip text="Сбросить фильтры" position="top" >
                                <vs-button color="danger" class="includeIconOnly" @click="filterReset" >
                                    <feather-icon icon="XCircleIcon" svgClasses="h-5 w-5 cursor-pointer" />
                                </vs-button>
                            </vs-tooltip>
                        </div>
                    </div>

                    <div class="settingsBtnWrapper mr-4" style="margin-top: 18px;">
                        <div class="centerx">
                            <vs-tooltip text="Настройки таблицы" position="top" >
                                <vs-button class="btn-drop settingsBtn includeIconOnly"  @click="tableControl=true">
                                    <feather-icon icon="SettingsIcon" class="cursor-pointer" style=""></feather-icon>
                                </vs-button>
                            </vs-tooltip>
                        </div>
                    </div>

                    
                </div>
            </div>
            <vs-popup classContent="popup-example" title="Управление полями таблицы" :active.sync="tableControl">
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <fieldset class="f" style="margin-top:5px;">
                            <legend class="l">Отображение колонок таблицы:
                            </legend>
                          <template v-for="(item,index) in columnDefs">
                            <vs-dropdown-item @click="hideCol(index)">
                              <vs-checkbox v-model="!item.hide"  >{{ item.headerName }}</vs-checkbox> <!--eslint-disable-line -->
                            </vs-dropdown-item>
                          </template>

                        </fieldset>
                    </div>
                </div>
                <div style="text-align: right; margin-top: 10px">
                     <vs-button @click="clearField" class="mr-4">Сбросить</vs-button>
                    <vs-button @click="tableControl=false" color="success">Применить</vs-button>
                </div>
            </vs-popup>

            <vs-popup  class="credit_dop_filter"  classContent="popup-example"  title="Дополнительные фильтры" :active.sync="filterPopup">
                    <div style="min-width: 1100px" >
                       <div class="vx-row">
                       <div class="vx-col md:w-1/4 w-full" >
                           <h6 class="h6">Место нахождения ИД:<VarToClipboard name="dc_find_sa"/></h6>
                           <v-select class="w-50" :reduce="label => label.id" label="name" :options="MestoIdListAll" v-model="credit.AdditionalFilters.find_sa" ></v-select>
                           <h6 class="h6" style="margin-top:8px;">Регион адреса регистрации:<VarToClipboard name="d_data_reg[region]"/></h6>
                           <v-select style="min-width: 100%;margin-top:5px;" :reduce="label => label.id" label="name" :options="RegionArr"  v-model="credit.AdditionalFilters.region"></v-select>

                           <h6 class="h6" style="margin-top:5px;">ФСПП отдел:<VarToClipboard name="d_fssp_otdel"/></h6>
                           <v-select style="min-width: 100%;margin-top:5px;" :reduce="label => label.fssp_code" label="name" :options="FsspOtdelsListArr"  v-model="credit.AdditionalFilters.fssp" @search="filterFindFssp"></v-select>
                           <fieldset class="f" style="margin-top:5px;">
                               <legend class="l">Статус гражданина:<VarToClipboard name="d_pensioner"/></legend>
                               <vs-checkbox style="margin-top:5px;" v-model="filterAll.statusGr" @change="credit.AdditionalFilters.pensioner=(filterAll.statusGr) ? ['0','1'] : []">Все</vs-checkbox>
                               <vs-checkbox style="margin-top:5px;margin-bottom: 5px" vs-value="0" v-model="credit.AdditionalFilters.pensioner" :disabled="filterAll.statusGr">Работающий</vs-checkbox>
                               <vs-checkbox style="margin-bottom: 5px" vs-value="1" v-model="credit.AdditionalFilters.pensioner"  :disabled="filterAll.statusGr" >Пенсионер</vs-checkbox>
                           </fieldset>
                           <h6 style="color:dodgerblue;margin-top:5px;">Дата окончание ИП:<VarToClipboard name="dc_date_end_ip"/></h6>
                           <v-select  class="w-50 " style="margin-top: 10px" :reduce="label => label.id" label="name" :options="DateEndIpFilter"   v-model="credit.AdditionalFilters.dateEndIp"  ></v-select>
                       </div>
                       <div class="vx-col md:w-1/4 w-full">
                           <fieldset class="f" style="margin-top:5px;">
                               <legend class="l">Тип ИД:<VarToClipboard name="dc_type_cp"/></legend>
                               <vs-checkbox style="margin-top:5px;" v-model="filterAll.typeDelo" @change="credit.AdditionalFilters.typeCp=(filterAll.typeDelo) ? ['0','1','2','3'] : []">Все</vs-checkbox>
                               <vs-checkbox style="margin-top:5px;" vs-value="0" v-model="credit.AdditionalFilters.typeCp" :disabled="filterAll.typeDelo">Судебный приказ</vs-checkbox>
                               <vs-checkbox style="margin-top:5px;margin-bottom: 5px" vs-value="1" v-model="credit.AdditionalFilters.typeCp" :disabled="filterAll.typeDelo">Исполнительный лист</vs-checkbox>
                             <vs-checkbox style="margin-top:5px;margin-bottom: 5px" vs-value="2" v-model="credit.AdditionalFilters.typeCp" :disabled="filterAll.typeDelo">ЭИЛ</vs-checkbox>
                             <vs-checkbox style="margin-top:5px;margin-bottom: 5px" vs-value="3" v-model="credit.AdditionalFilters.typeCp" :disabled="filterAll.typeDelo">Исполнительная надпись нотариуса</vs-checkbox>
                           </fieldset>
                           <h6 class="h6" style="margin-top:5px;">Номер ИП:<VarToClipboard name="dс_number_ip"/></h6>
                           <vs-input style="margin-top:5px;margin-bottom: 5px" v-model="credit.AdditionalFilters.number_ip"></vs-input>

                           <fieldset class="f" style="margin-top: 10px">
                               <legend class="l">Тип должника:<VarToClipboard name="dc_type_debtor"/></legend>
                               <vs-checkbox style="margin-top:5px;" v-model="filterAll.typeDebtor" @change="filterSetsTypeDebtor">Все</vs-checkbox>

                               <template v-for="type_i in TypeDebtorInDebtorCreditArr">
                                   <vs-checkbox  style="margin-top:3px;margin-bottom: 3px" :vs-value="type_i.id.toString()" v-model="credit.AdditionalFilters.typeDebtor " :disabled="filterAll.typeDebtor">{{type_i.name}}</vs-checkbox>
                               </template>
                           </fieldset>

                       </div>

                       <div class="vx-col md:w-1/4 w-full" >
                           <h6 class="h6">Ответственный сотрудник:<VarToClipboard name="dc_id_user"/></h6>
                           <v-select  class="w-50" :reduce="label=>label.id" label="name" :options="ResponsibleUserInDebtorListArr"  v-model="credit.AdditionalFilters.id_user"></v-select>
                           <fieldset class="f" style="margin-top: 10px">
                               <legend class="l">Вид взыскания:<VarToClipboard name="dc_name_delo"/></legend>
                               <vs-checkbox style="margin-top:5px;" v-model="filterAll.nameDelo" @change="filterSetsNameDelo">Все</vs-checkbox>
                               <template v-for="type_i in VidRecoverInDebtorCreditArr">
                                   <vs-checkbox  style="margin-top:3px;margin-bottom: 3px" :vs-value="type_i.id.toString()" v-model="credit.AdditionalFilters.name_delo " :disabled="filterAll.nameDelo">{{type_i.name}}</vs-checkbox>
                               </template>
                           </fieldset>




                       </div>
                           <div class="vx-col md:w-1/4 w-full" >
                               <h6 class="h6" style="margin-top:5px;">Судебный участок:<VarToClipboard name="dc_sud_send"/></h6>
                               <v-select style="margin-top:5px;"  @search="filterFindJudList" :reduce="label => label.number" label="name" :options="JudicialsListArr"   v-model="credit.AdditionalFilters.idJud" class="w-100 "></v-select>
                               <div class="vx-col w-full">
                                   <h6 class="h6" style="margin-top:8px;">Дата в суд Судебный приказ:<VarToClipboard name="dc_date_sud"/></h6>
                                   <vs-input type="date" class="w-100 " v-model="credit.AdditionalFilters.dateSud"></vs-input>
                                   <h6 class="h6" style="margin-top:8px;">Дата в суд Иск:<VarToClipboard name="dc_date_isk"/></h6>
                                   <vs-input type="date" class="w-100 " v-model="credit.AdditionalFilters.dateIsk"></vs-input>
                                   <h6 class="h6" style="margin-top:8px;">Дата заявление ФНС:<VarToClipboard name="dc_date_fns"/></h6>
                                   <vs-input type="date" class="w-100 " v-model="credit.AdditionalFilters.dateFns"></vs-input>
                                   <h6 class="h6" style="margin-top:8px;">Дата отзыва СА:<VarToClipboard name="dc_date_response_sa"/></h6>
                                   <vs-input type="date" class="w-100 " v-model="credit.AdditionalFilters.dateResponseSa"></vs-input>


                               </div>
                               <div class="vx-col w-full" >
                                   <h6 class="h6" style="margin-top:8px;">Дата заявления банка:<VarToClipboard name="dc_date_bank"/></h6>
                                   <vs-input type="date" class="w-100 " v-model="credit.AdditionalFilters.dateBank"></vs-input>
                                   <h6 class="h6" style="margin-top:8px;">Дата заявления в ПФ РФ:<VarToClipboard name="dc_date_pfr"/></h6>
                                   <vs-input type="date" class="w-100 " v-model="credit.AdditionalFilters.datePfr"></vs-input>
                                   <h6 class="h6" style="margin-top:8px;">Дата заявления в ФССП РФ:<VarToClipboard name="dc_date_fssp"/></h6>
                                   <vs-input type="date" class="w-100 " v-model="credit.AdditionalFilters.dateFssp"></vs-input>


                               </div>
                           </div>


                    </div>
                    <div style="text-align: right; margin-top: 10px">

                    </div>
                    <vs-button @click="filterPopup=false" class="mr-4">Закрыть</vs-button>
                    <vs-button @click="SetAdditionalFilters" color="success">Применить</vs-button>

                </div>
            </vs-popup>
            
            <vs-popup classContent="selectModal" class="selectModalWrapper" title="Создание задачи ответственному сотруднику" :active.sync="newTaskModal">
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <h6 class="mb-1 h6">Выбрать сотрудника:</h6>
                        <v-select  class="w-50 mb-4" label="name" style="margin-bottom: 40px" ></v-select>
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col w-full">
                        <h6 class="mb-1 h6">Указать должника:</h6>
                        <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col w-1/2"></div>
                    <div class="vx-col w-1/2 text-right">
                        <vs-button class="mt-6 ml-auto successBtn"  @click="newTaskModal=false" color="success" type="filled">Сохранить</vs-button>
                    </div>
                </div>
            </vs-popup>

            <vs-popup classContent="selectModal" class="selectModalWrapper" title="Cмена оператора взаимодействия" :active.sync="operatorSelectModal">
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <h6 class="mb-1 h6">Выбрать оператора:</h6>
                        <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col w-1/2">
                        <h6 class="mb-1 h6">Выбрать дату запуска:</h6>
                        <vs-input class="w-100 datepicker mb-base" type="date"></vs-input>
                    </div>
                    <div class="vx-col w-1/2 text-right">
                        <vs-button class="mt-6 ml-auto successBtn"  @click="operatorSelectModal=false" color="success" type="filled">Сохранить</vs-button>
                    </div>
                </div>

            </vs-popup>

            <vs-popup classContent="selectModal" class="selectModalWrapper" title="Cмена стратегии" :active.sync="strategySelectModal">
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <h6 class="mb-1 h6">Выбрать стратегию взаимодействия:</h6>
                        <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col w-1/2">
                        <h6 class="mb-1 h6">Выбрать дату запуска:</h6>
                        <vs-input class="w-100 datepicker mb-base" type="date"></vs-input>
                    </div>
                    <div class="vx-col w-1/2 text-right">
                        <vs-button class="mt-6 ml-auto successBtn"  @click="strategySelectModal=false" color="success" type="filled">Сохранить</vs-button>
                    </div>
                </div>
            </vs-popup>

            <vs-popup classContent="selectModal" class="selectModalWrapper" title="Отправить Email" :active.sync="sendMailSelectModal">
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <h6 class="mb-1 h6">Выбрать скрипт Email:</h6>
                        <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col w-1/2">
                        <h6 class="mb-1 h6">Выбрать дату запуска:</h6>
                        <vs-input class="w-100 datepicker mb-base" type="date"></vs-input>
                    </div>
                    <div class="vx-col w-1/2 text-right">
                        <vs-button class="mt-6 ml-auto successBtn"  @click="sendMailSelectModal=false" color="success" type="filled">Сохранить</vs-button>
                    </div>
                </div>
            </vs-popup>

            <vs-popup classContent="selectModal" class="selectModalWrapper" title="Отправить SMS" :active.sync="sendSmsSelectModal">
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <h6 class="mb-1 h6">Выбрать скрипт SMS:</h6>
                        <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col w-1/2">
                        <h6 class="mb-1 h6">Выбрать дату запуска:</h6>
                        <vs-input class="w-100 datepicker mb-base" type="date"></vs-input>
                    </div>
                    <div class="vx-col w-1/2 text-right">
                        <vs-button class="mt-6 ml-auto successBtn"  @click="sendSmsSelectModal=false" color="success" type="filled">Сохранить</vs-button>
                    </div>
                </div>
            </vs-popup>

            <vs-popup classContent="selectModal" class="selectModalWrapper" title="Отправить SMS" :active.sync="sendLetterSelectModal">
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <h6 class="mb-1 h6">Выбрать вариант отправки письма:</h6>
                        <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col w-1/2">
                        <h6 class="mb-1 h6">Выбрать дату отправки:</h6>
                        <vs-input class="w-100 datepicker mb-base" type="date"></vs-input>
                    </div>
                    <div class="vx-col w-1/2 text-right">
                        <vs-button class="mt-6 ml-auto successBtn"  @click="sendLetterSelectModal=false" color="success" type="filled">Сохранить</vs-button>
                    </div>
                </div>
            </vs-popup>

            <vs-popup classContent="selectModal" class="selectModalWrapper" title="Запустить автоинформатор (IVR)" :active.sync="ivrSelectModal">
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <h6 class="mb-1 h6">Выбрать скрипт IVR:</h6>
                        <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col w-1/2">
                        <h6 class="mb-1 h6">Выбрать дату запуска:</h6>
                        <vs-input class="w-100 datepicker mb-base" type="date"></vs-input>
                    </div>
                    <div class="vx-col w-1/2 text-right">
                        <vs-button class="mt-6 ml-auto successBtn"  @click="ivrSelectModal=false" color="success" type="filled">Сохранить</vs-button>
                    </div>
                </div>
            </vs-popup>

            <vs-popup classContent="selectModal" class="selectModalWrapper" title="Запустить массовый обзвон" :active.sync="massCallModal">
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <h6 class="mb-1 h6">Выбрать оператора:</h6>
                        <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col w-1/2">
                        <h6 class="mb-1 h6">Выбрать дату запуска:</h6>
                        <vs-input class="w-100 datepicker mb-base" type="date"></vs-input>
                    </div>
                    <div class="vx-col w-1/2 text-right">
                        <vs-button class="mt-6 ml-auto successBtn"  @click="massCallModal=false" color="success" type="filled">Сохранить</vs-button>
                    </div>
                </div>
            </vs-popup>

            <vs-popup classContent="selectModal" class="selectModalWrapper" title="Запустить обзвон оператором" :active.sync="operatorCallModal">
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <h6 class="mb-1 h6">Выбрать оператора:</h6>
                        <v-select  class="w-50 mb-base" label="name" style="margin-bottom: 40px" ></v-select>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col w-1/2">
                        <h6 class="mb-1 h6">Выбрать дату запуска:</h6>
                        <vs-input class="w-100 datepicker mb-base" type="date"></vs-input>
                    </div>
                    <div class="vx-col w-1/2 text-right">
                        <vs-button class="mt-6 ml-auto successBtn"  @click="operatorCallModal=false" color="success" type="filled">Сохранить</vs-button>
                    </div>
                </div>
            </vs-popup>

            <vs-popup classContent="historyModal" class="historyModalWrapper" title="История действий" :active.sync="historyModal">
                <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table vh75"
                    :columnDefs="columnDefsHistory"
                    :defaultColDef="defaultColDef"
                    :rowData="CreditsArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="true"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible"
                    @selection-changed="onSelectionChanged"
                    @grid-size-changed="onGridSizeChanged"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :enableBrowserTooltips="true"
                    :enableRtl="$vs.rtl">
            </ag-grid-vue>

                <div class="flex justify-end flex-wrap">
                    <vs-button @click="historyModal=false" color="danger" class="ml-4">Закрыть</vs-button>
                </div>
            </vs-popup>

            <!-- AgGrid Table -->
            <div class="out-main">
                
                <ag-grid-vue
                        ref="agGridTable"
                        :components="components"
                        :gridOptions="gridOptions"
                        class="ag-theme-material w-100 my-4 ag-grid-table vh75"
                        :columnDefs="columnDefs"
                        :defaultColDef="defaultColDef"
                        :rowData="CreditsArr"
                        rowSelection="multiple"
                        :rowDataChanged = "onRowDataChanged"
                        colResizeDefault="shift"
                        :animateRows="true"
                        :floatingFilter="true"
                        :pagination="true"
                        :rowHeight="rowHeight"
                        marryChildren="true"
                        :paginationPageSize="paginationPageSize"
                        :suppressPaginationPanel="true"
                        @rowDoubleClicked="onrowDoubleClicked"
                        @column-resized="onColumnResized"
                        @column-visible="onColumnVisible"
                        @selection-changed="onSelectionChanged"
                        :alwaysShowHorizontalScroll="true"
                        :overlayLoadingTemplate="'Идёт загрузка'"
                        :overlayNoRowsTemplate="'Нет записей'"
                        :enableBrowserTooltips="true"
                        :enableRtl="$vs.rtl">
                </ag-grid-vue>
                <!--  -->
                <transition name="fade">
                    <div class="tablePreloader outer-div" v-if="CreditsFindFlag">
                        <img class="load-bar" src="/loading.gif" style="width: 70px;">
                        <span>Идёт загрузка</span>
                    </div>
                </transition>
            </div>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />
        </div>

    </div>

</template>

<script>
    import Vue from 'vue'
    import ImportExcel from '@/components/excel/ImportExcel.vue'
    import r from '../../route';
    import axios from '../../axios'
    import OpenCreditStatus from '../Debtor/Render/OpenCreditStatus.vue'
    import OpenUser from '../Debtor/Render/OpenUser.vue'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import DebtorFilterRender from './Render/DebtorFilterRender.vue'
    import Checkbox from "../forms/form-elements/checkbox/Checkbox.vue";
    import Check from "../Handbook/Check/Check.vue";
    import vueDebounce from 'vue-debounce'

    Vue.use(vueDebounce)
    export default {
        components: {
            Check,
            Checkbox,
            ImportExcel,
            OpenCreditStatus,
            OpenUser,
            DebtorFilterRender,
        },
        beforeMount() {

            this.defaultColDef = { resizable: true };
            this.rowHeight = 24;
            this.components={ OpenCreditStatus,
                DebtorFilterRender:DebtorFilterRender};
        },
        data () {
            return {
                newTaskModal: false,
                sendLetterSelectModal: false,
                operatorSelectModal: false,
                strategySelectModal: false,
                sendMailSelectModal: false,
                sendSmsSelectModal: false,
                ivrSelectModal: false,
                massCallModal: false,
                historyModal: false,
                operatorCallModal: false,
                additionFilterStay:true,
                tableControl: false,
                filterAll:{
                    statusGr:false,
                    typeDebtor:false,
                    typeDelo:false,
                    nameDelo:false
                },
                credit:{

                    fields:{},
                    find:'',
                    status:'',
                    cession:-2,
                    id_recover:-2,
                    num_recover:0,
                    typeRecover:0,
                    AdditionalFilters:{
                        dateEndIp:0,
                        pensioner:[],
                        typeCp:[],
                        typeDebtor:[],
                        region: -1,
                        idJud : -1,
                        fssp : -1,
                        dateSud : '',
                        dateIsk : '',
                        dateFns :'',
                        dateResponseSa : '',
                        dateBank : '',
                        datePfr : '',
                        dateFssp : '',
                        name_delo:[],
                        number_ip:'',
                        flag:1,
                        id_user:-1,

                    }
                },

                filterPopup:false,
                newDeb:{
                    debtorCredit:{
                        id_recover:0,
                        number_dog:null,
                        date_dog:null,
                        id_status:0
                    },
                    debtor:{
                        name_family:null,
                        birthdate:null,
                        name:null,
                        name_patronymic:null,
                    }
                },
                addDebshow:false,
                rowHeight: null,
                status:0,
                rec_id:0,
                statusFilter: { label: 'Все', value: 'all' },
                statusOptions: [
                    { label: 'Все', value: 'all' },
                    { label: 'Ошибки', value: 'Ошибки' },

                ],

                results: null,
                help: 'Necessary columns are: login, firstname and lastname',
                tableData: [],
                header: [],
                sheetName: '',
                searchQuery: '',
                id_rec: 0,

                // AgGrid
                gridApi: null,
                gridOptions: {

                    alwaysShowVerticalScroll:true
                },
                defaultColDef: {
                    flex: 1,
                    wrapText: true,
                    autoHeight: true,
                    sortable: true,
                    resizable: true,

                },
                columnDefsclear:[

                ],
                columnDefsHistory:[
                    {
                        headerName: 'Автор действия',
                        headerTooltip: 'Автор действия',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 170
                    },
                    {
                        headerName: 'Вид действия',
                        headerTooltip: 'Вид действия',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 180
                    },
                    {
                        headerName: 'Старое значение',
                        headerTooltip: 'Старое значение',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 180
                    },
                    {
                        headerName: 'Новое значение',
                        headerTooltip: 'Новое значение',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        width: 180
                    },
                    {
                        headerName: 'Дата',
                        headerTooltip: 'Дата',
                        tooltipField: 'created_at',
                        field: 'created_at',
                        filter: true,
                        width: 150
                    },
                ],
                columnDefs: [
                    {
                        headerName: 'Фамилия',
                        headerTooltip: 'Фамилия',
                        tooltipField: 'name_family',
                        field: 'name_family',
                        filter: true,
                        floatingFilterComponentFramework: 'DebtorFilterRender',
                        floatingFilterComponentParams:{
                            type_f: 'string',
                            field: 'name_family',
                            emitFilter:'clear_filter_debtor_filter',
                            emitSet:'set_filter_debtor_filter',
                            updateSearchField: this.updateSearchField.bind(this)
                        },
                        hide:false,
                        width: 180
                    },
                    {
                        headerName: 'Имя',
                        headerTooltip: 'Имя',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        floatingFilterComponentFramework: 'DebtorFilterRender',
                        floatingFilterComponentParams:{
                            type_f: 'string',
                            field: 'name',
                            emitFilter:'clear_filter_debtor_filter',
                            emitSet:'set_filter_debtor_filter',
                            updateSearchField: this.updateSearchField.bind(this)
                        },
                        hide:false,
                        width: 150
                    },

                    {
                        headerName: 'Отчество',
                        headerTooltip: 'Отчество',
                        tooltipField: 'name_patronymic',
                        field: 'name_patronymic',
                        filter: true,
                        floatingFilterComponentFramework: 'DebtorFilterRender',
                        floatingFilterComponentParams:{
                            type_f: 'string',
                            field: 'name_patronymic',
                            emitFilter:'clear_filter_debtor_filter',
                            emitSet:'set_filter_debtor_filter',
                            updateSearchField: this.updateSearchField.bind(this)
                        },
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Дата рождения',
                        headerTooltip: 'Дата рождения',
                        tooltipField: 'birthdate',
                        field: 'birthdate',
                        filter: true,
                        floatingFilterComponentFramework: 'DebtorFilterRender',
                        floatingFilterComponentParams:{
                            type_f: 'date',
                            field: 'birthdate',
                            emitFilter:'clear_filter_debtor_filter',
                            emitSet:'set_filter_debtor_filter',
                            updateSearchField: this.updateSearchField.bind(this)
                        },
                        hide:false,
                        width: 160
                    },
                    {
                        headerName: '№ Договора',
                        headerTooltip: '№ Договора',
                        tooltipField: 'number_dog',
                        field: 'number_dog',
                        filter: true,
                        floatingFilterComponentFramework: 'DebtorFilterRender',
                        floatingFilterComponentParams:{
                            type_f: 'string',
                            field: 'number_dog',
                            emitFilter:'clear_filter_debtor_filter',
                            emitSet:'set_filter_debtor_filter',
                            updateSearchField: this.updateSearchField.bind(this)
                        },
                        hide:false,
                        width: 180
                    },
                    {
                        headerName: 'Сумма долга',
                        headerTooltip: 'Сумма долга',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Сумма последнего платежа',
                        headerTooltip: 'Сумма последнего платежа',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Дата последнего платежа',
                        headerTooltip: 'Дата последнего платежа',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Обещание оплаты',
                        headerTooltip: 'Обещание оплаты',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        hide:false,
                    },
                    {
                        headerName: 'Дата Обещания',
                        headerTooltip: 'Дата Обещания',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Результат взаимодействия',
                        headerTooltip: 'Результат взаимодействия',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Дата взаимодействия',
                        headerTooltip: 'Дата взаимодействия',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    
                    {
                        headerName: 'Стратегия взаимодействия',
                        headerTooltip: 'Стратегия взаимодействия',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        hide:false,
                    },
                    {
                        headerName: 'Вид взаимодействия',
                        headerTooltip: 'Вид взаимодействия',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        hide:false,
                    },
                    {
                      headerName: 'Следующий этап стратегии',
                      headerTooltip: 'Следующий этап стратегии',
                      groupId: 'strategyGroup',
                      marryChildren: true,
                      children: [
                        { 
                            headerName: 'Дата',
                            field: 'date',
                            filter: true,
                        },
                        { 
                            headerName: 'Вид взаимодействия',
                            field: 'silver',
                            filter: true,
                        },
                        { 
                            headerName: 'Скрипт',
                            field: 'bronze',
                            filter: true,
                        },
                      ],
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'id_status',
                        field: 'id_status',
                        hide: false,
                        filter: false,
                        width: 200,
                        cellRendererFramework: 'OpenCreditStatus'
                    },
                    {
                        headerName: 'Взыскатель',
                        headerTooltip: 'Взыскатель',
                        tooltipField: 'recover',
                        field: 'recover',
                        filter: false,
                        hide:false,
                        width: 180
                    },
                    {
                        headerName: 'Цедент',
                        headerTooltip: 'Цедент',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        hide:false,
                    },
                    {
                        headerName: 'Номер цессии',
                        headerTooltip: 'Номер цессии',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        hide:false,
                    },
                    {
                        headerName: 'Оператор',
                        headerTooltip: 'Оператор',
                        tooltipField: '',
                        field: '',
                        filter: true,
                        hide:false,
                    },

                ],
                defaultColGroupDef: {
                    marryChildren: true,
                },
                components: {
                    OpenCreditStatus,
                    OpenUser,
                    DebtorFilterRender
                },

            }
        },
        watch: {
            CreditsFindFlag(newQuestion) {
              if (newQuestion) {
                this.gridApi.showLoadingOverlay();
              }else{
                this.gridApi.hideOverlay();
              }
            },

            statusFilter (obj) {
                this.setColumnFilter('status', obj.value)
            },

        },
        computed: {
            optArr(){
                let arr=[];
                let index;
                for (index = 0; index < this.CessionsArr.length; ++index) {
                  arr.push({
                    name:'Договор цессии №'+this.CessionsArr[index].number+' от '+this.CessionsArr[index].date+' Взыскатель '+this.CessionsArr[index].name,
                    id:this.CessionsArr[index].id,
                  });
                }

                return arr
            },


            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalCredits/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                return this.User.pag.credit.limit
            },
            ...mapGetters([
                'CreditsArr','TotalCredits','StatussArrAndAll','User','CreditsFindFlag','RecoverArrList','TypeDebtorInDebtorCreditArr',
                'RegionArr','JudicialsListArr','FsspOtdelsListArr','VidRecoverInDebtorCreditArr','ResponsibleUserInDebtorListArr',
                'RecoverList','RecoverersArr','StatussArr','MestoIdListAll','DateEndIpFilter','CessionsArr','UsersArr'

            ]),
            currentPage: {
                get () {
                    if (typeof this.User.pag.credit.curPage !== 'undefined') return this.User.pag.credit.curPage
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    return 1
                },
                set (val) {
                    this.User.pag.credit.curPage=val;
                    this.setQueryCreditsOffset(val-1)
                    this.getDataCredits(this.User.pag.credit);
                    this.gridApi.paginationGoToPage(val - 1)
                    this.setDataUser()

                }
            },

        },
        methods: {
            clearField(){
              this.tableControl=false
              this.columnDefs=this.columnDefsclear;
              let a=this.columnDefs
              this.columnDefs=JSON.parse(JSON.stringify(a))
              localStorage.setItem("reestr_debtor_columnDefs", JSON.stringify(a))

            },
            hideCol(index){
                this.columnDefs[index].hide=!this.columnDefs[index].hide;
                let a=this.columnDefs
                this.columnDefs=JSON.parse(JSON.stringify(a))
                localStorage.setItem("reestr_debtor_columnDefs", JSON.stringify(a))
            },
            onGridReady() {
              this.gridOptions.api.forEachNode(node=>
                  node.data.id == this.User.pag.credit.selectIdCredit ? node.setSelected (true) : node.setSelected(false));
            },
            onSelectionChanged() {
              this.User.pag.credit.selectIdCredit=this.gridApi.getSelectedRows()[0].id
              this.setDataUser()

            },
            additionFilterStayCheck(){
                if(typeof this.User.pag.credit.AdditionalFilters=='undefined'){
                    return false
                }
                if(!Array.isArray(this.User.pag.credit.AdditionalFilters.name_delo))
                {
                    this.User.pag.credit.AdditionalFilters.name_delo=[]
                }
                let checkArr=['']

                if( this.User.pag.credit.AdditionalFilters.pensioner.length!=2||
                    this.User.pag.credit.AdditionalFilters.typeDebtor.length!=this.TypeDebtorInDebtorCreditArr.length||
                    this.User.pag.credit.AdditionalFilters.typeCp.length!=2||
                    this.User.pag.credit.AdditionalFilters.region!=-1||
                    this.User.pag.credit.AdditionalFilters.idJud!=-1||
                    this.User.pag.credit.AdditionalFilters.fssp!=-1||
                    this.User.pag.credit.AdditionalFilters.id_user!=-1||
                    !(this.User.pag.credit.AdditionalFilters.dateSud==''||this.User.pag.credit.AdditionalFilters.dateSud==null)||
                    !(this.User.pag.credit.AdditionalFilters.dateIsk==''||this.User.pag.credit.AdditionalFilters.dateIsk==null)||
                    !(this.User.pag.credit.AdditionalFilters.dateFns==''||this.User.pag.credit.AdditionalFilters.dateFns==null)||
                    !(this.User.pag.credit.AdditionalFilters.dateResponseSa==''||this.User.pag.credit.AdditionalFilters.dateResponseSa==null)||
                    !(this.User.pag.credit.AdditionalFilters.dateBank==''||this.User.pag.credit.AdditionalFilters.dateBank==null)||
                    !(this.User.pag.credit.AdditionalFilters.datePfr==''||this.User.pag.credit.AdditionalFilters.datePfr==null)||
                    !(this.User.pag.credit.AdditionalFilters.dateFssp==''||this.User.pag.credit.AdditionalFilters.dateFssp==null)||
                    this.User.pag.credit.AdditionalFilters.name_delo.length!=this.VidRecoverInDebtorCreditArr.length||
                    !(this.User.pag.credit.AdditionalFilters.number_ip==''||this.User.pag.credit.AdditionalFilters.number_ip==null))
                    return true
                return false

            },
            SetAdditionalFilters(){
                this.setCreditToUserPag(this.credit)


                this.setDataUser().then((response)=>{

                    this.getDataUser().then((response)=>{
                        this.loadCreditPag()
                        this.getDataCredits(this.User.pag.credit)
                        this.additionFilterStay=this.additionFilterStayCheck()
                        })

                    this.filterPopup=false;

                })




            },
            clearAdditionalFilters(){
              this.setCreditsFindFlag=true
              this.filterAll.typeDelo=true
              this.filterAll.statusGr=true
              this.credit.AdditionalFilters.pensioner=(this.filterAll.statusGr) ? ['0','1'] : []
              this.credit.AdditionalFilters.typeCp=(this.filterAll.typeDelo) ? ['0','1'] : []
              this.filterAll.typeDebtor=true
                this.filterAll.nameDelo=true
              this.filterSetsNameDelo()
              this.filterSetsTypeDebtor()
              this.credit.AdditionalFilters.region=-1
              this.credit.AdditionalFilters.idJud=-1
              this.credit.AdditionalFilters.fssp=-1
              this.credit.AdditionalFilters.id_user=-1
              this.credit.AdditionalFilters.dateSud=''
              this.credit.AdditionalFilters.dateIsk=''
              this.credit.AdditionalFilters.dateFns=''
              this.credit.AdditionalFilters.dateResponseSa=''
              this.credit.AdditionalFilters.dateBank=''
              this.credit.AdditionalFilters.datePfr=''
              this.credit.AdditionalFilters.dateFssp=''
              this.credit.AdditionalFilters.number_ip=''
              this.credit.AdditionalFilters.dateEndIp=0
              this.setCreditToUserPag(this.credit)
                this.additionFilterStay=this.additionFilterStayCheck()
                this.setDataUser().then((response)=>{
                  this.getDataCredits(this.User.pag.credit)
                  this.setCreditsFindFlag=false
              })

            },

            filterSetsNameDelo(){
                if(this.filterAll.nameDelo) {
                    this.credit.AdditionalFilters.name_delo=[]
                    for (let i = 0; i < this.VidRecoverInDebtorCreditArr.length; i++) {
                        this.credit.AdditionalFilters.name_delo.push(i.toString())
                    }
                }
               else{
                   this.credit.AdditionalFilters.name_delo.splice(0,this.credit.AdditionalFilters.name_delo.length)
               }
            },

            filterSetsTypeDebtor(){
                if(this.filterAll.typeDebtor) {
                    this.credit.AdditionalFilters.typeDebtor=[]
                    for (let i = 0; i < this.TypeDebtorInDebtorCreditArr.length; i++) {
                     this.credit.AdditionalFilters.typeDebtor.push(i.toString())
                 }
                 }
               else{
                   this.credit.AdditionalFilters.typeDebtor.splice(0,this.credit.AdditionalFilters.typeDebtor.length)
               }
            },

            filterFindFssp(value){
                this.getFsspOtdelsListArr(value)
            },
            filterFindJudList(value){
                this.getJudicialsListArr(value)
            },

            addDebtor(){

                if(!(this.newDeb.debtorCredit.id_recover==null || this.newDeb.debtorCredit.id_recover==0)) {
                    this.addDebshow = false
                    this.$vs.loading({color: '#ff8000'})
                    axios.post(r("debtors.index"), {
                        params: {
                            method: 'addDebtor',
                            param: this.newDeb

                        }
                    }).then((response) => {

                        this.$vs.loading.close()
                        if (response.data.result) {

                            this.$vs.notify({
                                title: 'Успешно',
                                text: 'Успешно!!!',
                                color: 'success',
                                position: 'top-center'
                            })
                        }
                        else {
                            this.$vs.notify({
                                title: 'Ошибка',
                                text: 'Ошибка !!!',
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
                }
                else {
                    this.$vs.notify({
                        color: 'danger',
                        title: 'Сообщение',
                        text: 'Не выбран взыскатель добавление не возможно!!!',
                        position: 'top-center'
                    })
                }
            },
            onColumnResized(params) {
                params.api.resetRowHeights();
            },
            onColumnVisible(params) {
                params.api.resetRowHeights();
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
            showCol(){
            },
            filterReset(){
                this.setCreditsFindFlag=true
                this.status=0
                this.rec_id=0
                this.$root.$emit('clear_filter_debtor_filter')
                this.credit.cession=-2,
                this.credit.find=''
                this.credit.id_recover=-2
                this.credit.num_recover=0
                this.credit.typeRecover=0

                if(this.status==null){
                    this.status=0;
                }
                this.credit.status=this.status

                for (let i=0;i<this.RecoverArrList.length;i++){

                    if(this.RecoverArrList[i].id==this.rec_id){
                        this.credit.id_recover=this.RecoverArrList[i].num
                        this.credit.num_recover=this.RecoverArrList[i].id
                        this.credit.cession=this.RecoverArrList[i].cession
                        this.credit.typeRecover=this.RecoverArrList[i].typeRecover
                    }

                }
                this.filterAll.typeDelo=true
                this.filterAll.statusGr=true
                this.credit.AdditionalFilters.pensioner=(this.filterAll.statusGr) ? ['0','1'] : []
                this.credit.AdditionalFilters.typeCp=(this.filterAll.typeDelo) ? ['0','1'] : []
                this.filterAll.typeDebtor=true
                this.filterAll.nameDelo=true
                this.filterSetsNameDelo()
                this.filterSetsTypeDebtor()
                this.credit.AdditionalFilters.region=-1
                this.credit.AdditionalFilters.idJud=-1
                this.credit.AdditionalFilters.fssp=-1
                this.credit.AdditionalFilters.id_user=-1
                this.credit.AdditionalFilters.dateSud=''
                this.credit.AdditionalFilters.dateIsk=''
                this.credit.AdditionalFilters.dateFns=''
                this.credit.AdditionalFilters.dateResponseSa=''
                this.credit.AdditionalFilters.dateBank=''
                this.credit.AdditionalFilters.datePfr=''
                this.credit.AdditionalFilters.dateFssp=''
                this.credit.AdditionalFilters.number_ip=''
                this.credit.AdditionalFilters.dateEndIp=0
                this.additionFilterStay=false
                this.setCreditToUserPag(this.credit)
                this.setDataUser().then((response)=>{
                    this.getDataCredits(this.User.pag.credit)
                    this.setCreditsFindFlag=false
                })
            },
            setStatus(){

                if(this.status==null){
                    this.status=0;
                }
                this.credit.status=this.status
                this.setCreditToUserPag(this.credit)
                this.setDataUser().then((response)=>{
                    this.getDataCredits(this.User.pag.credit)
                })

            },
            setRecover(){

                if(this.rec_id==null){
                    this.rec_id=0;
                }
                for (let i=0;i<this.RecoverArrList.length;i++){

                    if(this.RecoverArrList[i].id==this.rec_id){
                        this.credit.id_recover=this.RecoverArrList[i].num
                        this.credit.num_recover=this.RecoverArrList[i].id
                        this.credit.cession=this.RecoverArrList[i].cession
                        this.credit.typeRecover=this.RecoverArrList[i].typeRecover
                    }

                }
                this.setCreditToUserPag(this.credit)
                this.setDataUser().then((response)=>{
                    this.getDataCredits(this.User.pag.credit)
                })

            },
            ...mapMutations([
                'setQueryCreditsLimit','setQueryCreditsOffset','setCreditToUserPag','setCreditsFindFlag'

            ]),
            changePag(pag){
                this.User.pag.credit.limit=pag
                this.setDataUser().then((response)=>{
                    this.getDataCredits(this.User.pag.credit)
                })
                this.setQueryCreditsLimit(pag);
                this.gridApi.paginationSetPageSize(pag)

            },
            onrowDoubleClicked(event){
                this.$router.push('/reestr_debtor/'+event.data.id)
            },
            setColumnFilter (column, val) {
                const filter = this.gridApi.getFilterInstance(column)
                let modelObj = null

                if (val !== 'all') {
                    modelObj = { type: 'equals', filter: val }
                }

                filter.setModel(modelObj)
                this.gridApi.onFilterChanged()
            },
            resetColFilters () {
                // Reset Grid Filter
                this.gridApi.setFilterModel(null)
                this.gridApi.onFilterChanged()

                // Reset Filter Options
                this.roleFilter = this.statusFilter = this.isVerifiedFilter = this.departmentFilter = { label: 'All', value: 'all' }

                this.$refs.filterCard.removeRefreshAnimation()
            },
            saveColumn(){
                axios.post(r("setting.index"), {
                    params: {
                        method: 'saveColumnDefs',
                        param:  this.columnDefs

                    }
                }).then((response) => {
                    if (response.data.result){

                    }
                })
            },

            // hideCol(index){

            //     this.columnDefs[index].hide=!this.columnDefs[index].hide;
            //     let a=this.columnDefs

            //     this.columnDefs=JSON.parse(JSON.stringify(a))
            //     this.saveColumn();
            // },

            onValidate(results) {
                this.results = results;
            },

            ...mapActions([
                'getDataCredits','getDataStatuss','setDataUser','getTypeDebtorInDebtorCreditArr',
                'getRegion','getJudicialsListArr','getFsspOtdelsListArr','getDataUser','getRecoverArrList','getResponsibleUserInDebtorList',
                'getVidRecoverInDebtorCreditArr','getDataReestrsAndCession','getMestoIdList','getDataCessions','getDataUsers'
            ]),
            updateSearchFast (val) {
                this.User.pag.credit.fast=val
                this.loadCreditPag()
                this.setDataUser().then((response)=>{
                    this.getDataCredits(this.User.pag.credit);
                })


            },

            updateSearchField(findField, findFieldName, findType, not_update=false){
                if(!not_update)this.setCreditsFindFlag=true
                this.User.pag.credit.find=''
                    this.credit.fields[findFieldName] = {
                        find: findField,
                        name: findFieldName,
                        type: findType
                    }
                if(!not_update) {
                    this.setCreditToUserPag(this.credit)
                    this.setDataUser().then((response) => {
                        this.getDataCredits(this.User.pag.credit)
                        //this.setCreditsFindFlag=false
                    })
                }
            },

            updateSearchQuery (val) {

                this.$root.$emit('clear_filter_debtor_filter')
                this.User.pag.credit.find=val
                this.setDataUser().then((response)=>{
                    this.getDataCredits(this.User.pag.credit)
                })

            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },
            loadCreditPag(){
                if (typeof this.User.pag.credit.find !== 'undefined')this.credit.find = this.User.pag.credit.find
                if (typeof this.User.pag.credit.fields !== 'undefined')  {
                    Object.keys(this.User.pag.credit.fields).forEach((key) => {
                        this.credit.fields[key] = this.User.pag.credit.fields[key]
                    })
                }
                if (typeof this.User.pag.credit.offset !== 'undefined')this.credit.offset = this.User.pag.credit.offset
                if (typeof this.User.pag.credit.status !== 'undefined')this.credit.status = this.User.pag.credit.status
                if (typeof this.User.pag.credit.cession !== 'undefined')this.credit.cession = this.User.pag.credit.cession
                if (typeof this.User.pag.credit.id_recover !== 'undefined')this.credit.id_recover = this.User.pag.credit.id_recover
                if (typeof this.User.pag.credit.num_recover !== 'undefined')this.credit.num_recover = this.User.pag.credit.num_recover
                if (typeof this.User.pag.credit.typeRecover !== 'undefined')this.credit.typeRecover = this.User.pag.credit.typeRecover
                if (typeof this.User.pag.credit.AdditionalFilters !== 'undefined'){
                    if (typeof this.User.pag.credit.AdditionalFilters.region !== 'undefined')this.credit.AdditionalFilters.region = this.User.pag.credit.AdditionalFilters.region
                    if (typeof this.User.pag.credit.AdditionalFilters.idJud !== 'undefined')this.credit.AdditionalFilters.idJud = this.User.pag.credit.AdditionalFilters.idJud
                    if (typeof this.User.pag.credit.AdditionalFilters.fssp !== 'undefined')this.credit.AdditionalFilters.fssp = this.User.pag.credit.AdditionalFilters.fssp
                    if (typeof this.User.pag.credit.AdditionalFilters.id_user !== 'undefined')this.credit.AdditionalFilters.id_user = this.User.pag.credit.AdditionalFilters.id_user
                    if (typeof this.User.pag.credit.AdditionalFilters.dateSud !== 'undefined')this.credit.AdditionalFilters.dateSud = this.User.pag.credit.AdditionalFilters.dateSud
                    if (typeof this.User.pag.credit.AdditionalFilters.dateIsk !== 'undefined')this.credit.AdditionalFilters.dateIsk = this.User.pag.credit.AdditionalFilters.dateIsk
                    if (typeof this.User.pag.credit.AdditionalFilters.dateFns !== 'undefined')this.credit.AdditionalFilters.dateFns = this.User.pag.credit.AdditionalFilters.dateFns
                    if (typeof this.User.pag.credit.AdditionalFilters.dateResponseSa !== 'undefined')this.credit.AdditionalFilters.dateResponseSa = this.User.pag.credit.AdditionalFilters.dateResponseSa
                    if (typeof this.User.pag.credit.AdditionalFilters.dateBank !== 'undefined')this.credit.AdditionalFilters.dateBank = this.User.pag.credit.AdditionalFilters.dateBank
                    if (typeof this.User.pag.credit.AdditionalFilters.datePfr !== 'undefined')this.credit.AdditionalFilters.datePfr = this.User.pag.credit.AdditionalFilters.datePfr
                    if (typeof this.User.pag.credit.AdditionalFilters.dateFssp !== 'undefined')this.credit.AdditionalFilters.dateFssp = this.User.pag.credit.AdditionalFilters.dateFssp
                    if (typeof this.User.pag.credit.AdditionalFilters.number_ip !== 'undefined')this.credit.AdditionalFilters.number_ip = this.User.pag.credit.AdditionalFilters.number_ip
                    if (typeof this.User.pag.credit.AdditionalFilters.dateEndIp !== 'undefined')this.credit.AdditionalFilters.dateEndIp = this.User.pag.credit.AdditionalFilters.dateEndIp
                    if (typeof this.User.pag.credit.AdditionalFilters.pensioner !== 'undefined'){
                        this.credit.AdditionalFilters.pensioner.length=0;
                        if(typeof this.User.pag.credit.AdditionalFilters.pensioner_json!=='undefined')
                        this.credit.AdditionalFilters.pensioner=JSON.parse(this.User.pag.credit.AdditionalFilters.pensioner_json)
                        this.filterAll.statusGr=(this.credit.AdditionalFilters.pensioner.length==2)?true:false

                        /*
                        this.User.pag.credit.AdditionalFilters.pensioner.forEach((val)=>{
                            this.credit.AdditionalFilters.pensioner.push(val)
                        })
                        */
                    }

                    if (typeof this.User.pag.credit.AdditionalFilters.typeCp !== 'undefined'){
                        this.credit.AdditionalFilters.typeCp.length=0;
                        if(typeof this.User.pag.credit.AdditionalFilters.typeCp_json!=='undefined')
                            this.credit.AdditionalFilters.typeCp=JSON.parse(this.User.pag.credit.AdditionalFilters.typeCp_json)
                    }
                    this.filterAll.typeDelo=(this.credit.AdditionalFilters.typeCp.length==2)?true:false
                    if (typeof this.User.pag.credit.AdditionalFilters.name_delo !== 'undefined'){
                        this.credit.AdditionalFilters.name_delo=[];
                        if(typeof this.User.pag.credit.AdditionalFilters.name_delo_json!=='undefined')
                            this.credit.AdditionalFilters.name_delo=JSON.parse(this.User.pag.credit.AdditionalFilters.name_delo_json)
                    }
                    this.filterAll.nameDelo=(this.credit.AdditionalFilters.name_delo.length==this.VidRecoverInDebtorCreditArr.length)?true:false
                    if (typeof this.User.pag.credit.AdditionalFilters.typeDebtor !== 'undefined'){
                        this.credit.AdditionalFilters.typeDebtor.length=0;
                        if(typeof this.User.pag.credit.AdditionalFilters.typeDebtor_json!=='undefined')
                            this.credit.AdditionalFilters.typeDebtor=JSON.parse(this.User.pag.credit.AdditionalFilters.typeDebtor_json)
                    }
                    this.filterAll.typeDebtor=(this.credit.AdditionalFilters.typeDebtor.length==this.TypeDebtorInDebtorCreditArr.length)?true:false
                    this.setCreditToUserPag(this.credit)
                }
            },
        },

        mounted () {
            this.getDataUsers()
            let a=this.columnDefs
            this.columnDefsclear=JSON.parse(JSON.stringify(a))
          console.log(this.columnDefsclear)

            this.getDataCessions();
            this.getFsspOtdelsListArr()
            this.getMestoIdList()
            this.getJudicialsListArr()
            this.getResponsibleUserInDebtorList()
            this.getRegion()
            this.getRecoverArrList()
            this.getTypeDebtorInDebtorCreditArr().then(()=>{
                    this.filterSetsTypeDebtor()
                    this.filterSetsNameDelo()
                this.additionFilterStay=this.additionFilterStayCheck()


            })
            this.getDataStatuss();
            this.gridApi = this.gridOptions.api
            this.getDataUser().then((response)=>{
              if (localStorage.getItem('reestr_debtor_columnDefs')) {
                this.columnDefs = JSON.parse(localStorage.getItem("reestr_debtor_columnDefs"));
              }
                this.loadCreditPag()
                    this.getRecoverArrList().then((response)=>{

                        for (let i=0;i<this.RecoverArrList.length;i++){

                            if(this.RecoverArrList[i].id==this.credit.num_recover){

                                this.rec_id=this.RecoverArrList[i].name
                            }

                        }
                    })

                for (let i=0;i<this.StatussArrAndAll.length;i++){
                    if(this.StatussArrAndAll[i].id==this.credit.status){
                        this.status=this.StatussArrAndAll[i].name
                    }

                }
                if(!Array.isArray(this.User.pag.credit.AdditionalFilters.name_delo))
                {
                    this.User.pag.credit.AdditionalFilters.name_delo=[]
                }
                this.$root.$emit('set_filter_debtor_filter',this.credit.fields)
                this.gridApi.paginationGoToPage(this.User.pag.credit.curPage - 1)
                this.getDataCredits(this.User.pag.credit).then((response)=>{
                  this.onGridReady()
                })
                if(typeof this.User.pag.credit.AdditionalFilters=='undefined'){
                    this.User.pag.credit.AdditionalFilters={
                        pensioner:[],
                        typeCp:[],
                        typeDebtor:[],
                        region: -1,
                        idJud : -1,
                        fssp : -1,
                        dateSud : '',
                        dateIsk : '',
                        dateFns :'',
                        dateResponseSa : '',
                        dateBank : '',
                        datePfr : '',
                        dateFssp : '',
                        name_delo:[],
                        ip:'',
                        id_user:null
                    }
                }
                this.additionFilterStay=this.additionFilterStayCheck()
            })
            this.additionFilterStay=this.additionFilterStayCheck()




        }
    }


</script>

<style scoped>
    .ag-cell{
        padding: 0px!important;
        margin: 0px!important;
    }
    .vs-dropdown-menu .vs-button:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
        padding: 0.75rem 1rem;
        white-space: nowrap;
    }
</style>

<style lang="scss">
    .w-100.datepicker{
        width: 100%;
    }
    .selectModalWrapper .vs-popup {
        min-width: auto;
        width: 500px;
    }

    .selectModalWrapper .successBtn{
        height: 40px;
    }
    .historyModalWrapper .vs-popup {
        min-width: auto;
        width: 900px;
    }
    .vs-popup-primary .selectModal.vs-popup--content {
        min-height: auto!important;
    }
    h6 {
        color: rgba(var(--vs-primary),1)!important;
    }

    .credit_dop_filter .vs-con-input-label,
    .credit_dop_filter .vs-popup{
        width: auto;
    }
    [dir] .vs-button:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
        padding: 0.75rem 2rem;
    }
    [dir] .vs-input--input.normal {
        padding: 0.75rem !important;
    }
    .con-vs-pagination{
        margin-right: 40px!important;
    }
    .vs-dropdown--custom {
        padding: 45px!important;
        padding-top: 8px!important;
        min-width: 301px;
    }

    .cell-wrap-text { white-space: normal !important; }
    .scroll ul.vs-component.vs-dropdown--menu {
        height: 85vh;
        overflow-y: scroll;
    }
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
    .ag-row{
        height: 23px!important;
        padding: 0px!important; margin: 0px!important;
    }
    
    /*.ag-header-row{*/
        /*height: 26px!important;*/
    /*}*/
    /*.ag-theme-material .ag-cell {*/
        /*line-height:15px!important;*/
    /*}*/

</style>
