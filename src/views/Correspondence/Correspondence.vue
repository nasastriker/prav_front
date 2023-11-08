<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap items-center ag-grid-table-actions-left">
                 <div style="margin-right: 10px;">
                    <vs-dropdown vs-trigger-click class="cursor-pointer mb-4">
                        <div class="cursor-pointer flex items-center justify-between font-medium" style="padding: 0.7rem !important;margin-top: 32px;border: 1px solid #ccc;border-radius: 4px;">
                            <span class="mr-2">
                                {{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalCorrespondence - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalCorrespondence }} of {{ TotalCorrespondence }}
                            </span>
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
                <!--
                <div class="vx-col 2" style="    min-width: 250px;">
                    <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="StatussArrAndAll"  v-model="status" @input="setStatus" ></v-select>
                </div>
                !-->
                <div style="margin-right: 10px;">
                    <div class="centerx">
                        <vs-tooltip text="Фильтр по взыскателю" position="top" >
                            <h6 class="h6Blue mb-1">Взыскатель</h6>
                        </vs-tooltip>
                    </div>
                    <v-select class="w-50 " style="min-width: 200px" :reduce="label => label.id" label="name" :options="RecoverArrList" v-model="rec_id" @input="setRecover"></v-select>
                </div>
                <div style="margin-right: 10px;">
                    <div class="centerx">
                        <vs-tooltip text="Фильтр по cтатусу" position="top" >
                            <h6 class="h6Blue mb-1">Статус</h6>
                        </vs-tooltip>
                    </div>
                    <v-select class="w-50 " style="min-width: 200px" :reduce="label => label.id" label="name" :options="StatussArrAndAll" v-model="correspondence.status" @input="setStatus"></v-select>
                </div>
                <div style="margin-right: 10px;">
                    <div class="centerx">
                        <vs-tooltip text="Начальная дата регистрации" position="top" >
                            <h6 class="h6Blue mb-1">Период регистрации c</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="date_wrapper" type="date" v-model="correspondence.begin_date" @blur="SetBeginEndDate" @keyup.enter="$event.target.blur()" />
                </div>
                
                <div style="margin-right: 20px;">
                    <div class="centerx">
                        <vs-tooltip text="Конечная дата регистрации" position="top" >
                            <h6 class="h6Blue mb-1">по</h6>
                        </vs-tooltip>
                    </div>
                    <vs-input class="date_wrapper" type="date" v-model="correspondence.end_date" @blur="SetBeginEndDate" @keyup.enter="$event.target.blur()" />
                </div>
                <!-- <div class="vx-col">
                    
                </div> -->
                <div class="dropdown-button-container" style="margin-right: 20px;margin-top: 16px;">
                    <div class="centerx">
                        <vs-tooltip text="Усоренный поиск" position="top" >
                            <vs-checkbox style="margin-top: 5px; margin-left: 10px; margin-right: 10px" v-model="correspondence.fast" @change="setFastFind"></vs-checkbox>
                        </vs-tooltip>
                    </div>
                    <vs-dropdown>
                        <vs-button class="" type="gradient" icon="more_horiz">Фильтры</vs-button>
                        <vs-dropdown-menu>
                            <vs-dropdown-item>
                                <vs-button style="width:150px" @click="additionalFilterShow=true">Доп. фильтры</vs-button>
                                <div><span v-if="additionFilterStay" style="color:red;cursor:pointer" @click="clearAdditionalFilters">Сброс доп фильтров</span></div>
                            </vs-dropdown-item>
                            <vs-dropdown-item>
                                <vs-button style="width:150px" @click="filterReset">Сбросить фильтры</vs-button>
                            </vs-dropdown-item>
                            <vs-dropdown-item>
                                <vs-button style="width:150px" @click="loadFilterSimple">Выгрузить в Excel</vs-button>
                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>
                <div style="margin-right: 10px;margin-top: 16px;">
                    <vs-button class="btn_new_task" style="margin-top:0!important" @click="AddCorrecpondence">Добавить запись</vs-button>
                </div>
                <div class="settingsBtnWrapper" style="margin-right: 10px;margin-top: 16px;">
                    <div class="centerx">
                        <vs-tooltip text="Настройки таблицы" position="top" >
                            <vs-button class="btn-drop settingsBtn includeIconOnly"  @click="tableControl=true">
                                <feather-icon icon="SettingsIcon" class="cursor-pointer" style=""></feather-icon>
                            </vs-button>
                        </vs-tooltip>
                    </div>
                </div>

                <div class="vx-col" style="display: flex; align-items: center;">
                    <div>
                        <div class="centerx">
                            <vs-tooltip text="Поиск по ФИО должника, № договора ..." position="top" >
                                <h6 class="h6Blue mb-1">Поиск</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input class="search_filter_input" style="width: 320px;" v-model="correspondence.find" @input="updateSearchQuery" placeholder="Поиск по ФИО должника, №договора ..." />
                    </div>
                    <!-- <span style="max-width: 40px;">
                        <img src="/loading.gif" v-if="CorrespondenceFindFlag" style="max-width: 40px; margin-top: 15px;">
                    </span> -->
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
                    <!-- <vs-button @click="tableControl=false" class="mr-4">Закрыть</vs-button> -->
                    <vs-button @click="tableControl=false" color="success">Применить</vs-button>
                </div>
            </vs-popup>

            <vs-popup classContent="popup-example" title="Экспорт" :active.sync="exportPopup">
                <div>
                    <LoadFilterFromXLSCorrespondence @closePopup="exportPopup=false"></LoadFilterFromXLSCorrespondence>
                </div>
            </vs-popup>
            <vs-popup classContent="popup-example" title="Дополнительные фильтры" :active.sync="additionalFilterShow">
                <div style="min-width: 700px">
                    <div class="vx-row">
                        <div class="vx-col md:w-1/3 w-full" style="width: 50%;">
                            <h6 style="color:dodgerblue;margin-top:8px;">Регион адреса регистрации:
                                <VarToClipboard name="d_data_reg[region]" />
                            </h6>
                            <v-select style="min-width: 100%;margin-top:5px;" :reduce="label => label.id" label="name" :options="RegionArr" v-model="correspondence.AdditionalFilters.region"></v-select>
                            <h6 style="color:dodgerblue;margin-top:5px;">Судебный участок:
                                <VarToClipboard name="dc_sud_send" />
                            </h6>
                            <v-select style="min-width: 100%;margin-top:5px;" @search="filterFindJudList" :reduce="label => label.number" label="name" :options="JudicialsListArr" v-model="correspondence.AdditionalFilters.idJud"></v-select>
                            <!--
                                  <h6 style="color:dodgerblue">ФНС</h6>
                                  <v-select style="min-width: 100%;"></v-select>
                            !-->
                            <h6 style="color:dodgerblue;margin-top:5px;">ФСПП отдел:
                                <VarToClipboard name="d_fssp_otdel" />
                            </h6>
                            <v-select style="min-width: 100%;margin-top:5px;" :reduce="label => label.fssp_code" label="name" :options="FsspOtdelsListArr" v-model="correspondence.AdditionalFilters.fssp" @search="filterFindFssp"></v-select>
                            <fieldset class="f" style="margin-top:5px;">
                                <legend class="l">Статус гражданина:
                                    <VarToClipboard name="d_pensioner" />
                                </legend>
                                <vs-checkbox style="margin-top:5px;" v-model="filterAll.statusGr" @change="correspondence.AdditionalFilters.pensioner=(filterAll.statusGr) ? ['0','1'] : []">Все</vs-checkbox>
                                <vs-checkbox style="margin-top:5px;margin-bottom: 5px" vs-value="0" v-model="correspondence.AdditionalFilters.pensioner" :disabled="filterAll.statusGr">Работающий</vs-checkbox>
                                <vs-checkbox style="margin-bottom: 5px" vs-value="1" v-model="correspondence.AdditionalFilters.pensioner" :disabled="filterAll.statusGr">Пенсионер</vs-checkbox>
                            </fieldset>
                        </div>
                        <div class="vx-col md:w-1/3 w-full">
                            <fieldset class="f" style="margin-top:5px;">
                                <legend class="l">Тип ИД:
                                    <VarToClipboard name="dc_type_cp" />
                                </legend>
                                <vs-checkbox style="margin-top:5px;" v-model="filterAll.typeDelo" @change="correspondence.AdditionalFilters.typeCp=(filterAll.typeDelo) ? ['0','1'] : []">Все</vs-checkbox>
                                <vs-checkbox style="margin-top:5px;" vs-value="0" v-model="correspondence.AdditionalFilters.typeCp" :disabled="filterAll.typeDelo">Судебный приказ</vs-checkbox>
                                <vs-checkbox style="margin-top:5px;margin-bottom: 5px" vs-value="1" v-model="correspondence.AdditionalFilters.typeCp" :disabled="filterAll.typeDelo">Исполнительный лист</vs-checkbox>
                            </fieldset>
                            <h6 style="color:dodgerblue;margin-top:5px;">Номер ИП:
                                <VarToClipboard name="dс_number_ip" />
                            </h6>
                            <vs-input style="margin-top:5px;margin-bottom: 5px" v-model="correspondence.AdditionalFilters.number_ip"></vs-input>
                            <fieldset class="f" style="margin-top: 10px">
                                <legend class="l">Тип должника:
                                    <VarToClipboard name="dc_type_debtor" />
                                </legend>
                                <vs-checkbox style="margin-top:5px;" v-model="filterAll.typeDebtor" @change="filterSetsTypeDebtor">Все</vs-checkbox>
                                <template v-for="type_i in TypeDebtorInDebtorCreditArr">
                                    <vs-checkbox style="margin-top:3px;margin-bottom: 3px" :vs-value="type_i.id.toString()" v-model="correspondence.AdditionalFilters.typeDebtor " :disabled="filterAll.typeDebtor">{{type_i.name}}</vs-checkbox>
                                </template>
                            </fieldset>
                        </div>
                        <div class="vx-col md:w-1/3 w-full" style="width: 50%;">
                            <h6 class="h6">Ответственный сотрудник:
                                <VarToClipboard name="dc_id_user" />dc_id_user</h6>
                            <v-select class="w-50" :reduce="label=>label.id" label="name" :options="ResponsibleUserInDebtorListArr" v-model="correspondence.AdditionalFilters.id_user"></v-select>
                            <fieldset class="f" style="margin-top: 10px">
                                <legend class="l">Вид взыскания:
                                    <VarToClipboard name="dc_name_delo" />
                                </legend>
                                <vs-checkbox style="margin-top:5px;" v-model="filterAll.nameDelo" @change="filterSetsNameDelo">Все</vs-checkbox>
                                <template v-for="type_i in VidRecoverInDebtorCreditArr">
                                    <vs-checkbox style="margin-top:3px;margin-bottom: 3px" :vs-value="type_i.id.toString()" v-model="correspondence.AdditionalFilters.name_delo " :disabled="filterAll.nameDelo">{{type_i.name}}</vs-checkbox>
                                </template>
                            </fieldset>
                        </div>
                        
                    </div>
                    <div style="text-align: right; margin-top: 10px">
                    </div>
                    <vs-button class="mr-4" @click="filterPopup=false">Закрыть</vs-button>
                    <vs-button @click="SetAdditionalFilters" color="success">Применить</vs-button>
                </div>
            </vs-popup>
            <!-- AgGrid Table -->
            <div class="out-main">
                <ag-grid-vue 
                    ref="agGridTable" 
                    :components="components" 
                    :gridOptions="gridOptions" 
                    class="ag-theme-material w-100 my-4 ag-grid-table" 
                    :columnDefs="columnDefs" 
                    :defaultColDef="defaultColDef" 
                    :rowData="CorrespondenceArr" rowSelection="multiple" 
                    :rowDataChanged="onRowDataChanged" colResizeDefault="shift" 
                    :animateRows="true" 
                    :floatingFilter="true" 
                    :pagination="true" 
                    :rowHeight="rowHeight" 
                    :paginationPageSize="paginationPageSize" 
                    :suppressPaginationPanel="true" 
                    :suppressColumnsToolPanel="true"
                    toolPanel='columns'
                    @rowDoubleClicked="onrowDoubleClicked" 
                    @grid-size-changed="onGridSizeChanged" 
                    @column-resized="onColumnResized"
                    @column-visible="onColumnVisible" 
                    :enableRtl="$vs.rtl" 
                    :enableBrowserTooltips="true"
                    :overlayNoRowsTemplate="'Нет записей'"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    >
                </ag-grid-vue>

                <transition name="fade">
                    <div class="tablePreloader outer-div" v-if="CorrespondenceFindFlag">
                        <img class="load-bar" src="/loading.gif" style="width: 70px;">
                        <span>Идёт загрузка</span>
                    </div>
                </transition>
            </div>
            <vs-pagination :total="totalPages" :max="7" v-model="currentPage" />
        </div>
    </div>
</template>
<script>

import { AgGridVue } from 'ag-grid-vue'
import downloadFileCorrespondence from './Render/DownloadFileCorrespondence.vue'
import CorrespondenceFilterRender from './Render/CorrespondenceFilterRender.vue'
import operationCorrespondence from './Render/operationCorrespondence.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import r from '../../route';
import axios from '../../axios'
import LoadFilterFromXLSCorrespondence from './LoadFilterFromXLSCorrespondence.vue'
// import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

export default {
    components: {
        AgGridVue,
        CorrespondenceFilterRender,
        downloadFileCorrespondence,
        operationCorrespondence,
        LoadFilterFromXLSCorrespondence,
    },
    beforeMount() {

        this.defaultColDef = { resizable: true };
        this.rowHeight = 24;
        
    },
    data() {
        return {
            exportPopup: false,
            tableControl: false,
            filterAll: {
                statusGr: false,
                typeDebtor: false,
                typeDelo: false,
                nameDelo: false
            },
            tableColumn: {
                reg_date1: true,
                reg_number: true,
                vid: true,
                group: true,
                sender: true,
                recipient: true,
                address_recipient: true,
                debname_family: true,
                debname: true,
                debname_patronymic: true,
                birthdate: true,
                number_dog: true,
                document_name: true,
                shpi: true,
                doc_date: true,
                str_id_credit: true,
                filename: true,
            },

            correspondence: {
                fields: {},
                find: '',
                fast: true,
                offset: 0,
                limit: 50,
                status: 0,
                id_recover: -2,
                num_recover: 0,
                typeRecover: 0,
                begin_date: '',
                end_date: '',
                AdditionalFilters: {
                    pensioner: [],
                    typeCp: [],
                    typeDebtor: [],
                    region: -1,
                    idJud: -1,
                    fssp: -1,
                    // dateSud : '',
                    // dateIsk : '',
                    // dateFns :'',
                    // dateResponseSa : '',
                    // dateBank : '',
                    // datePfr : '',
                    // dateFssp : '',
                    name_delo: [],
                    number_ip: '',
                    flag: 1,
                    id_user: -1,

                },

            },
            additionFilterStay: false,
            addCorrespondenceShow: false,
            additionalFilterShow: false,
            rec_id: 0,
            // AgGrid
            gridApi: null,
            gridOptions: {

                alwaysShowVerticalScroll: true,
                alwaysShowHScroll: true
            },
            defaultColDef: {

                sortable: true,
                resizable: true,
                suppressMenu: true

            },

            columnDefs: [{
                    headerName: 'Дата регистрации',
                    headerTooltip: 'Дата регистрации',
                    tooltipField: 'reg_date1',
                    field: 'reg_date1',
                    hide:false,
                    filter: true,
                    floatingFilterComponentFramework: 'CorrespondenceFilterRender',
                    floatingFilterComponentParams: {
                        type_f: 'date',
                        field: 'reg_date1',
                        emitFilter: 'clear_filter_correspondence_filter',
                        emitSet: 'set_filter_correspondence_filter',
                        updateSearchField: this.updateSearchField.bind(this)
                    },
                    width: 170,

                },
                {
                    headerName: 'Рег №',
                    headerTooltip: 'Регистрационный номер',
                    tooltipField: 'reg_number',
                    field: 'reg_number',
                    hide: false,
                    width: 100,
                },
                {
                    headerName: 'Вид документа',
                    headerTooltip: 'Вид документа',
                    tooltipField: 'vid',
                    hide:false,
                    field: 'vid',
                    filter: true,
                    floatingFilterComponentFramework: 'CorrespondenceFilterRender',
                    floatingFilterComponentParams: {
                        type_f: 'string',
                        field: 'vid',
                        placeholder: 'Введите значение',
                        emitFilter: 'clear_filter_correspondence_filter',
                        emitSet: 'set_filter_correspondence_filter',
                        updateSearchField: this.updateSearchField.bind(this)
                    },
                    width: 170,


                },
                {
                    headerName: 'Группа документа',
                    headerTooltip: 'Группа документа',
                    tooltipField: 'group',
                    field: 'group',
                    hide:false,

                    filter: true,
                    floatingFilterComponentFramework: 'CorrespondenceFilterRender',
                    floatingFilterComponentParams: {
                        type_f: 'string',
                        field: 'group_list',
                        placeholder: 'Введите значение',
                        emitFilter: 'clear_filter_correspondence_filter',
                        emitSet: 'set_filter_correspondence_filter',
                        updateSearchField: this.updateSearchField.bind(this)
                    },
                    width: 180,

                },
                {
                    headerName: 'Отправитель',
                    headerTooltip: 'Отправитель',
                    tooltipField: 'sendersender',
                    field: 'sender',
                    filter: true,
                    hide:false,

                    placeholder: 'Введите значение',
                    floatingFilterComponentFramework: 'CorrespondenceFilterRender',
                    floatingFilterComponentParams: {
                        type_f: 'string',
                        field: 'sender',
                        placeholder: 'Введите значение',
                        emitFilter: 'clear_filter_correspondence_filter',
                        emitSet: 'set_filter_correspondence_filter',
                        updateSearchField: this.updateSearchField.bind(this)
                    },
                    width: 200,

                },
                {
                    headerName: 'Получатель',
                    headerTooltip: 'Получатель',
                    tooltipField: 'recipient',
                    field: 'recipient',
                    hide: false,
                    filter: true,
                    floatingFilterComponentFramework: 'CorrespondenceFilterRender',
                    floatingFilterComponentParams: {
                        type_f: 'string',
                        field: 'recipient',
                        placeholder: 'Введите значение',
                        emitFilter: 'clear_filter_correspondence_filter',
                        emitSet: 'set_filter_correspondence_filter',
                        updateSearchField: this.updateSearchField.bind(this)
                    },
                    width: 250,

                },
                {
                    headerName: 'Адрес получателя',
                    headerTooltip: 'Адрес получателя',
                    tooltipField: 'address_recipient',
                    field: 'address_recipient',
                    hide: false,
                    filter: true,
                    floatingFilterComponentFramework: 'CorrespondenceFilterRender',
                    floatingFilterComponentParams: {
                        type_f: 'string',
                        field: 'address_recipient',
                        placeholder: 'Введите значение',
                        emitFilter: 'clear_filter_correspondence_filter',
                        emitSet: 'set_filter_correspondence_filter',
                        updateSearchField: this.updateSearchField.bind(this)
                    },
                    width: 250,

                },
                {
                    headerName: 'Фамилия',
                    field: 'debname_family',
                    headerTooltip: 'Фамилия',
                    tooltipField: 'debname_family',
                    hide: false,
                    filter: true,
                    floatingFilterComponentFramework: 'CorrespondenceFilterRender',
                    floatingFilterComponentParams: {
                        type_f: 'string',
                        field: 'debname_family',
                        placeholder: 'Введите значение',
                        emitFilter: 'clear_filter_correspondence_filter',
                        emitSet: 'set_filter_correspondence_filter',
                        updateSearchField: this.updateSearchField.bind(this)
                    },
                    width: 150,

                },
                {
                    headerName: 'Имя',
                    field: 'debname',
                    headerTooltip: 'Имя',
                    tooltipField: 'debname',
                    hide: false,
                    filter: true,
                    floatingFilterComponentFramework: 'CorrespondenceFilterRender',
                    floatingFilterComponentParams: {
                        type_f: 'string',
                        field: 'debname',
                        placeholder: 'Введите значение',
                        emitFilter: 'clear_filter_correspondence_filter',
                        emitSet: 'set_filter_correspondence_filter',
                        updateSearchField: this.updateSearchField.bind(this)
                    },
                    width: 150,

                },
                {
                    headerName: 'Отчество',
                    headerTooltip: 'Отчество',
                    tooltipField: 'debname_patronymic',
                    field: 'debname_patronymic',
                    hide: false,
                    filter: true,
                    floatingFilterComponentFramework: 'CorrespondenceFilterRender',
                    floatingFilterComponentParams: {
                        type_f: 'string',
                        field: 'debname_patronymic',
                        placeholder: 'Введите значение',
                        emitFilter: 'clear_filter_correspondence_filter',
                        emitSet: 'set_filter_correspondence_filter',
                        updateSearchField: this.updateSearchField.bind(this)
                    },
                    width: 150,

                },
                {
                    headerName: 'Дата рожд. дол.',
                    headerTooltip: 'Дата рождения должника',
                    tooltipField: 'birthdate',
                    field: 'birthdate',
                    hide: false,
                    filter: true,
                    floatingFilterComponentFramework: 'CorrespondenceFilterRender',
                    floatingFilterComponentParams: {
                        type_f: 'date',
                        field: 'birthdate',
                        emitFilter: 'clear_filter_correspondence_filter',
                        emitSet: 'set_filter_correspondence_filter',
                        updateSearchField: this.updateSearchField.bind(this)
                    },
                    width: 170,

                },
                {
                    headerName: '№ Договора',
                    headerTooltip: 'Номер Договора',
                    tooltipField: 'number_dog',
                    field: 'number_dog',
                    hide: false,
                    filter: true,
                    floatingFilterComponentFramework: 'CorrespondenceFilterRender',
                    floatingFilterComponentParams: {
                        type_f: 'string',
                        field: 'number_dog',
                        placeholder: 'Введите значение',
                        emitFilter: 'clear_filter_correspondence_filter',
                        emitSet: 'set_filter_correspondence_filter',
                        updateSearchField: this.updateSearchField.bind(this)
                    },
                    width: 170,

                },
                {
                    headerName: 'Наименование документа',
                    headerTooltip: 'Наименование документа',
                    tooltipField: 'document_name',
                    field: 'document_name',
                    hide: false,
                    filter: true,
                    floatingFilterComponentFramework: 'CorrespondenceFilterRender',
                    floatingFilterComponentParams: {
                        type_f: 'string',
                        field: 'document_name',
                        placeholder: 'Введите значение',
                        emitFilter: 'clear_filter_correspondence_filter',
                        emitSet: 'set_filter_correspondence_filter',
                        updateSearchField: this.updateSearchField.bind(this)
                    },
                    width: 280,
                },
                {
                    headerName: 'ШПИ',
                    headerTooltip: 'Штриховой почтовый идентификатор',
                    tooltipField: 'shpi',
                    field: 'shpi',
                    hide: false,
                    filter: true,
                    floatingFilterComponentFramework: 'CorrespondenceFilterRender',
                    floatingFilterComponentParams: {
                        type_f: 'string',
                        field: 'shpi',
                        placeholder: 'Введите значение',
                        emitFilter: 'clear_filter_correspondence_filter',
                        emitSet: 'set_filter_correspondence_filter',
                        updateSearchField: this.updateSearchField.bind(this)
                    },
                    width: 150,
                },
                {
                    headerName: 'Дата документа',
                    headerTooltip: 'Дата документа',
                    tooltipField: 'doc_date',
                    field: 'doc_date',
                    hide: false,
                    filter: true,
                    floatingFilterComponentFramework: 'CorrespondenceFilterRender',
                    floatingFilterComponentParams: {
                        type_f: 'date',
                        field: 'doc_date',
                        emitFilter: 'clear_filter_correspondence_filter',
                        emitSet: 'set_filter_correspondence_filter',
                        updateSearchField: this.updateSearchField.bind(this)
                    },
                    width: 170,

                },
                {
                    headerName: 'ID Кредита',
                    headerTooltip: 'ID Кредита',
                    tooltipField: 'str_id_credit',
                    field: 'str_id_credit',
                    hide: false,
                    filter: true,
                    floatingFilterComponentFramework: 'CorrespondenceFilterRender',
                    floatingFilterComponentParams: {
                        type_f: 'string',
                        field: 'str_id_credit',
                        placeholder: 'Введите значение',
                        emitFilter: 'clear_filter_correspondence_filter',
                        emitSet: 'set_filter_correspondence_filter',
                        updateSearchField: this.updateSearchField.bind(this)
                    },
                    width: 160,
                },
                {
                    headerName: 'Файл документа',
                    headerTooltip: 'Файл документа',
                    tooltipField: 'filename',
                    field: 'filename',
                    hide: false,
                    cellClass: 'download_cell',
                    filter: false,
                    width: 135,
                    cellRendererFramework: 'downloadFileCorrespondence'
                },
                {
                    headerName: 'Операции',
                    headerTooltip: 'Операции',
                    field: 'id',
                    hide: false,
                    filter: false,
                    width: 90,
                    cellClass: 'actions_cell',
                    cellRendererFramework: 'operationCorrespondence',
                    cellRendererParams: {
                        editValue: this.editValue.bind(this),
                    },
                }

            ],

            // Cell Renderer Components
            components: {
                CorrespondenceFilterRender,
                downloadFileCorrespondence,
                operationCorrespondence
                // OpenCreditStatus,
                // DebtorFilterRender

            },

        }
    },
    watch: {
        CorrespondenceFindFlag(newQuestion) {
            if (newQuestion) {
                this.gridApi.showLoadingOverlay();
            }else{
                this.gridApi.hideOverlay();
            }
        },
    },
    computed: {


        totalPages() {
            if (this.gridApi)
                return Math.ceil(this.TotalCorrespondence / this.paginationPageSize)
            else return 0
        },
        paginationPageSize() {
            return this.User.pag.correspondence.limit
        },
        ...mapGetters([
            'CorrespondenceArr', 'TotalCorrespondence', 'User', 'CorrespondenceFindFlag', 'RecoverArrList', 'StatussArrAndAll', 'User', 'CreditsFindFlag',
            'RecoverArrList', 'TypeDebtorInDebtorCreditArr',
            'RegionArr', 'JudicialsListArr', 'FsspOtdelsListArr', 'VidRecoverInDebtorCreditArr', 'ResponsibleUserInDebtorListArr',
            'RecoverList', 'RecoverersArr', 'StatussArr'

        ]),
        currentPage: {
            get() {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                return 1
            },
            set(val) {
                this.setQueryCorrespondenceOffset(val - 1)
                this.setDataUser().then(() => {
                    this.getDataCorrespondence(this.User.pag.correspondence);
                    this.gridApi.paginationGoToPage(val - 1)
                })

            }
        },

    },
    methods: {
      hideCol(index){
        this.columnDefs[index].hide=!this.columnDefs[index].hide;
        let a=this.columnDefs
        this.columnDefs=JSON.parse(JSON.stringify(a))
        localStorage.setItem("columnDefs", JSON.stringify(a))
      },

      ...mapActions([
            'getDataCorrespondence', 'setDataUser', 'getDataUser', 'getRecoverArrList', 'getDataStatuss',
            'getTypeDebtorInDebtorCreditArr',
            'getRegion', 'getJudicialsListArr', 'getFsspOtdelsListArr', 'getDataUser', 'getRecoverArrList', 'getResponsibleUserInDebtorList',
            'getVidRecoverInDebtorCreditArr', 'getDataReestrsAndCession', 'saveOutCorrespondence'
        ]),

        ExportToExcelFilter() {
            axios.get(r('correspondence.index'), {
                params: {
                    method: 'exportToExcelFilter',
                    param: this.User.pag.correspondence
                }
            })
        },
        setFastFind() {
            this.setCorrespondenceToUserPag(this.correspondence)
            this.setDataUser().then((response) => {
                this.getDataCorrespondence(this.User.pag.correspondence)
                this.setCorrespondencesFindFlag = false
            })
        },
        clearAdditionalFilters() {
            this.setCorrespondencesFindFlag = true
            this.filterAll.typeDelo = true
            this.filterAll.statusGr = true
            this.correspondence.AdditionalFilters.pensioner = (this.filterAll.statusGr) ? ['0', '1'] : []
            this.correspondence.AdditionalFilters.typeCp = (this.filterAll.typeDelo) ? ['0', '1'] : []
            this.filterAll.typeDebtor = true
            this.filterAll.nameDelo = true
            this.filterSetsNameDelo()
            this.filterSetsTypeDebtor()
            this.correspondence.AdditionalFilters.region = -1
            this.correspondence.AdditionalFilters.idJud = -1
            this.correspondence.AdditionalFilters.fssp = -1
            this.correspondence.AdditionalFilters.id_user = -1
            // this.credit.AdditionalFilters.dateSud=''
            // this.credit.AdditionalFilters.dateIsk=''
            // this.credit.AdditionalFilters.dateFns=''
            // this.credit.AdditionalFilters.dateResponseSa=''
            // this.credit.AdditionalFilters.dateBank=''
            // this.credit.AdditionalFilters.datePfr=''
            // this.credit.AdditionalFilters.dateFssp=''
            this.correspondence.AdditionalFilters.number_ip = ''
            this.setCorrespondenceToUserPag(this.correspondence)
            this.additionFilterStay = this.additionFilterStayCheck()
            this.setDataUser().then((response) => {
                this.getDataCorrespondence(this.User.pag.correspondence)
                this.setCorrespondencesFindFlag = false
            })

        },

        loadFilterSimple() {
            let date = new Date()
            axios.get(r('correspondence.index'), {
                responseType: 'arraybuffer',
                params: {
                    method: 'getXlsSimpleFile',
                    param: this.User.pag.correspondence
                }
            }).then((response) => {


                const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/xls;charset=UTF-8;' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'отчет_корреспонденция' + date.toLocaleDateString().replace('.', '_') + date.toLocaleTimeString().slice(0, -3) + '.xlsx')
                document.body.appendChild(link);
                link.click();




            })
        },

        editValue(id) {
            this.$router.push('/Correspondence-Journal/' + id)
        },
        filterSetsNameDelo() {
            if (this.filterAll.nameDelo) {
                this.correspondence.AdditionalFilters.name_delo = []
                for (let i = 0; i < this.VidRecoverInDebtorCreditArr.length; i++) {
                    this.correspondence.AdditionalFilters.name_delo.push(i.toString())
                }
            } else {
                this.correspondence.AdditionalFilters.name_delo.splice(0, this.correspondence.AdditionalFilters.name_delo.length)
            }
        },

        filterSetsTypeDebtor() {
            if (this.filterAll.typeDebtor) {
                this.correspondence.AdditionalFilters.typeDebtor = []
                for (let i = 0; i < this.TypeDebtorInDebtorCreditArr.length; i++) {
                    this.correspondence.AdditionalFilters.typeDebtor.push(i.toString())
                }
            } else {
                this.correspondence.AdditionalFilters.typeDebtor.splice(0, this.correspondence.AdditionalFilters.typeDebtor.length)
            }
        },


        filterFindJudList(value) {
            this.getJudicialsListArr(value)
        },


        SetBeginEndDate() {
            this.setCorrespondenceToUserPag(this.correspondence)
            this.setDataUser().then((response) => {
                this.getDataCorrespondence(this.User.pag.correspondence)
            })
        },

        setStatus() {
            if (this.correspondence.status == null) {
                this.correspondence.status = 0;
            }

            this.setCorrespondenceToUserPag(this.correspondence)
            this.setDataUser().then((response) => {
                this.getDataCorrespondence(this.User.pag.correspondence)
            })

        },
        setRecover() {

            if (this.rec_id == null) {
                this.rec_id = 0;
            }
            for (let i = 0; i < this.RecoverArrList.length; i++) {

                if (this.RecoverArrList[i].id == this.rec_id) {
                    this.correspondence.id_recover = this.RecoverArrList[i].num
                    this.correspondence.num_recover = this.RecoverArrList[i].id
                    this.correspondence.cession = this.RecoverArrList[i].cession
                    this.correspondence.typeRecover = this.RecoverArrList[i].typeRecover
                }

            }
            this.setCorrespondenceToUserPag(this.correspondence)
            this.setDataUser().then((response) => {
                this.getDataCorrespondence(this.User.pag.correspondence)
            })

        },
        updateSearchField(findField, findFieldName, findType, not_update = false) {
            if (!not_update) this.setCorrespondenceFindFlag = true
            this.User.pag.correspondence.find = ''
            this.correspondence.fields[findFieldName] = {
                find: findField,
                name: findFieldName,
                type: findType
            }
            if (!not_update) {
                this.setCorrespondenceToUserPag(this.correspondence)
                this.setDataUser().then((response) => {
                    this.getDataCorrespondence(this.User.pag.correspondence)
                    //this.setCreditsFindFlag=false
                })
            }
        },

        AddCorrecpondence() {
            this.$router.push('/Correspondence-Journal/new')

        },
        filterReset() {
            this.setCreditsFindFlag = true
            this.correspondence.status = 0
            this.rec_id = 0
            this.$root.$emit('clear_filter_correspondence_filter')
            this.correspondence.cession = -2,
                this.correspondence.find = ''
            this.correspondence.id_recover = -2
            this.correspondence.num_recover = 0
            this.correspondence.typeRecover = 0
            this.correspondence.begin_date = ''
            this.correspondence.end_date = ''


            for (let i = 0; i < this.RecoverArrList.length; i++) {

                if (this.RecoverArrList[i].id == this.rec_id) {
                    this.correspondence.id_recover = this.RecoverArrList[i].num
                    this.correspondence.num_recover = this.RecoverArrList[i].id
                    this.correspondence.cession = this.RecoverArrList[i].cession
                    this.correspondence.typeRecover = this.RecoverArrList[i].typeRecover
                }

            }
            this.filterAll.typeDelo = true
            this.filterAll.statusGr = true
            this.correspondence.AdditionalFilters.pensioner = (this.filterAll.statusGr) ? ['0', '1'] : []
            this.correspondence.AdditionalFilters.typeCp = (this.filterAll.typeDelo) ? ['0', '1'] : []
            this.filterAll.typeDebtor = true
            this.filterAll.nameDelo = true
            this.filterSetsNameDelo()
            this.filterSetsTypeDebtor()
            this.correspondence.AdditionalFilters.region = -1
            this.correspondence.AdditionalFilters.idJud = -1
            this.correspondence.AdditionalFilters.fssp = -1
            this.correspondence.AdditionalFilters.id_user = -1
            // this.correspondence.AdditionalFilters.dateSud=''
            // this.correspondence.AdditionalFilters.dateIsk=''
            // this.correspondence.AdditionalFilters.dateFns=''
            // this.correspondence.AdditionalFilters.dateResponseSa=''
            // this.correspondence.AdditionalFilters.dateBank=''
            // this.correspondence.AdditionalFilters.datePfr=''
            // this.correspondence.AdditionalFilters.dateFssp=''
            this.correspondence.AdditionalFilters.number_ip = ''
            this.additionFilterStay = false
            this.setCorrespondenceToUserPag(this.correspondence)
            this.setDataUser().then((response) => {
                this.getDataCorrespondence(this.User.pag.correspondence)
                this.setCorrespondencesFindFlag = false
            })
        },
        updateSearchQuery() {
            this.User.pag.correspondence.find = this.correspondence.find
            if (this.correspondence.find !== '') this.$root.$emit('clear_filter_correspondence_filter');
            this.setCorrespondenceToUserPag(this.correspondence)
            this.setDataUser().then((response) => {
                this.getDataCorrespondence(this.User.pag.correspondence)
            })
        },
        onColumnResized(params) {
            params.api.resetRowHeights();
        },
        onColumnVisible(params) {
            params.api.resetRowHeights();
        },
        onGridSizeChanged(params) {
            /*    if (params.clientWidth > 500) {
                    this.gridApi.sizeColumnsToFit();
                } else {
                    this.columnDefs.forEach(x => {
                        x.width = 300;
                    });
                    this.gridApi.setColumnDefs(this.columnDefs);
                }*/
        },

        ...mapMutations([
            'setQueryCorrespondenceLimit', 'setQueryCorrespondenceOffset', 'setCorrespondenceToUserPag', 'setCorrespondenceFindFlag'

        ]),
        changePag(pag) {

            this.User.pag.correspondence.limit = pag
            this.setDataUser().then((response) => {
                this.getDataCorrespondence(this.User.pag.correspondence)
            })
            this.setQueryCorrespondenceLimit(pag);
            this.gridApi.paginationSetPageSize(pag)

        },
        onrowDoubleClicked(event) {
            this.$router.push('/Correspondence-Journal/' + event.data.id)
        },
        setColumnFilter(column, val) {
            const filter = this.gridApi.getFilterInstance(column)
            let modelObj = null

            if (val !== 'all') {
                modelObj = { type: 'equals', filter: val }
            }

            filter.setModel(modelObj)
            this.gridApi.onFilterChanged()
        },



        loadCorrespondencePag() {
            if (typeof this.User.pag.correspondence.find !== 'undefined') this.correspondence.find = this.User.pag.correspondence.find
            if (typeof this.User.pag.correspondence.fields !== 'undefined') {
                Object.keys(this.User.pag.correspondence.fields).forEach((key) => {
                    this.correspondence.fields[key] = this.User.pag.correspondence.fields[key]
                })
            } else this.User.pag.correspondence.fields = {}
            if (typeof this.User.pag.correspondence.status !== 'undefined') this.correspondence.status = this.User.pag.correspondence.status
            if (typeof this.User.pag.correspondence.fast !== 'undefined') this.correspondence.fast = this.User.pag.correspondence.fast
            if (typeof this.User.pag.correspondence.find !== 'undefined') this.correspondence.find = this.User.pag.correspondence.find
            if (typeof this.User.pag.correspondence.cession !== 'undefined') this.correspondence.cession = this.User.pag.correspondence.cession
            if (typeof this.User.pag.correspondence.id_recover !== 'undefined') this.correspondence.id_recover = this.User.pag.correspondence.id_recover
            if (typeof this.User.pag.correspondence.num_recover !== 'undefined') this.correspondence.num_recover = this.User.pag.correspondence.num_recover
            if (typeof this.User.pag.correspondence.typeRecover !== 'undefined') this.correspondence.typeRecover = this.User.pag.correspondence.typeRecover
            if (typeof this.User.pag.correspondence.AdditionalFilters !== 'undefined') {
                if (typeof this.User.pag.correspondence.AdditionalFilters.region !== 'undefined') this.correspondence.AdditionalFilters.region = this.User.pag.correspondence.AdditionalFilters.region
                if (typeof this.User.pag.correspondence.AdditionalFilters.idJud !== 'undefined') this.correspondence.AdditionalFilters.idJud = this.User.pag.correspondence.AdditionalFilters.idJud
                if (typeof this.User.pag.correspondence.AdditionalFilters.fssp !== 'undefined') this.correspondence.AdditionalFilters.fssp = this.User.pag.correspondence.AdditionalFilters.fssp
                if (typeof this.User.pag.correspondence.AdditionalFilters.id_user !== 'undefined') this.correspondence.AdditionalFilters.id_user = this.User.pag.correspondence.AdditionalFilters.id_user

                /*  if (typeof this.User.pag.correspondence.AdditionalFilters.dateSud !== 'undefined')this.correspondence.AdditionalFilters.dateSud = this.User.pag.correspondence.AdditionalFilters.dateSud
                  if (typeof this.User.pag.correspondence.AdditionalFilters.dateIsk !== 'undefined')this.correspondence.AdditionalFilters.dateIsk = this.User.pag.correspondence.AdditionalFilters.dateIsk
                  if (typeof this.User.pag.correspondence.AdditionalFilters.dateFns !== 'undefined')this.correspondence.AdditionalFilters.dateFns = this.User.pag.correspondence.AdditionalFilters.dateFns
                  if (typeof this.User.pag.correspondence.AdditionalFilters.dateResponseSa !== 'undefined')this.correspondence.AdditionalFilters.dateResponseSa = this.User.pag.correspondence.AdditionalFilters.dateResponseSa
                  if (typeof this.User.pag.correspondence.AdditionalFilters.dateBank !== 'undefined')this.correspondence.AdditionalFilters.dateBank = this.User.pag.correspondence.AdditionalFilters.dateBank
                  if (typeof this.User.pag.correspondence.AdditionalFilters.datePfr !== 'undefined')this.correspondence.AdditionalFilters.datePfr = this.User.pag.correspondence.AdditionalFilters.datePfr
                  if (typeof this.User.pag.correspondence.AdditionalFilters.dateFssp !== 'undefined')this.correspondence.AdditionalFilters.dateFssp = this.User.pag.correspondence.AdditionalFilters.dateFssp
                 */
                if (typeof this.User.pag.correspondence.AdditionalFilters.number_ip !== 'undefined') this.correspondence.AdditionalFilters.number_ip = this.User.pag.correspondence.AdditionalFilters.number_ip
                if (typeof this.User.pag.correspondence.AdditionalFilters.pensioner !== 'undefined') {
                    this.correspondence.AdditionalFilters.pensioner.length = 0;
                    if (typeof this.User.pag.correspondence.AdditionalFilters.pensioner_json !== 'undefined')
                        this.correspondence.AdditionalFilters.pensioner = JSON.parse(this.User.pag.correspondence.AdditionalFilters.pensioner_json)
                    this.filterAll.statusGr = (this.correspondence.AdditionalFilters.pensioner.length == 2) ? true : false

                    /*
                    this.User.pag.correspondence.AdditionalFilters.pensioner.forEach((val)=>{
                        this.correspondence.AdditionalFilters.pensioner.push(val)
                    })
                    */
                }
                if (typeof this.User.pag.correspondence.AdditionalFilters.typeCp !== 'undefined') {
                    this.correspondence.AdditionalFilters.typeCp.length = 0;
                    if (typeof this.User.pag.correspondence.AdditionalFilters.typeCp_json !== 'undefined')
                        this.correspondence.AdditionalFilters.typeCp = JSON.parse(this.User.pag.correspondence.AdditionalFilters.typeCp_json)
                }
                this.filterAll.typeDelo = (this.correspondence.AdditionalFilters.typeCp.length == 2) ? true : false
                if (typeof this.User.pag.correspondence.AdditionalFilters.name_delo !== 'undefined') {
                    this.correspondence.AdditionalFilters.name_delo = [];
                    if (typeof this.User.pag.correspondence.AdditionalFilters.name_delo_json !== 'undefined')
                        this.correspondence.AdditionalFilters.name_delo = JSON.parse(this.User.pag.correspondence.AdditionalFilters.name_delo_json)
                }
                this.filterAll.nameDelo = (this.correspondence.AdditionalFilters.name_delo.length == this.VidRecoverInDebtorCreditArr.length) ? true : false
                if (typeof this.User.pag.correspondence.AdditionalFilters.typeDebtor !== 'undefined') {
                    this.correspondence.AdditionalFilters.typeDebtor.length = 0;
                    if (typeof this.User.pag.correspondence.AdditionalFilters.typeDebtor_json !== 'undefined')
                        this.correspondence.AdditionalFilters.typeDebtor = JSON.parse(this.User.pag.correspondence.AdditionalFilters.typeDebtor_json)
                }
                this.filterAll.typeDebtor = (this.correspondence.AdditionalFilters.typeDebtor.length == this.TypeDebtorInDebtorCreditArr.length) ? true : false
                this.setCorrespondenceToUserPag(this.correspondence)
            }
        },


        onRowDataChanged() {
            Vue.nextTick(() => {
                this.gridOptions.api.sizeColumnsToFit();
            });
        },

        additionFilterStayCheck() {
            if (typeof this.User.pag.correspondence.AdditionalFilters == 'undefined') {
                return false
            }
            if (!Array.isArray(this.User.pag.correspondence.AdditionalFilters.name_delo)) {
                this.User.pag.correspondence.AdditionalFilters.name_delo = []
            }
            let checkArr = ['']

            if (this.User.pag.correspondence.AdditionalFilters.pensioner.length != 2 ||
                this.User.pag.correspondence.AdditionalFilters.typeDebtor.length != this.TypeDebtorInDebtorCreditArr.length ||
                this.User.pag.correspondence.AdditionalFilters.typeCp.length != 2 ||
                this.User.pag.correspondence.AdditionalFilters.region != -1 ||
                this.User.pag.correspondence.AdditionalFilters.idJud != -1 ||
                this.User.pag.correspondence.AdditionalFilters.fssp != -1 ||
                this.User.pag.correspondence.AdditionalFilters.id_user != -1 ||
                // !(this.User.pag.correspondence.AdditionalFilters.dateSud==''||this.User.pag.correspondence.AdditionalFilters.dateSud==null)||
                // !(this.User.pag.correspondence.AdditionalFilters.dateIsk==''||this.User.pag.correspondence.AdditionalFilters.dateIsk==null)||
                // !(this.User.pag.correspondence.AdditionalFilters.dateFns==''||this.User.pag.correspondence.AdditionalFilters.dateFns==null)||
                // !(this.User.pag.correspondence.AdditionalFilters.dateResponseSa==''||this.User.pag.correspondence.AdditionalFilters.dateResponseSa==null)||
                // !(this.User.pag.correspondence.AdditionalFilters.dateBank==''||this.User.pag.correspondence.AdditionalFilters.dateBank==null)||
                // !(this.User.pag.correspondence.AdditionalFilters.datePfr==''||this.User.pag.correspondence.AdditionalFilters.datePfr==null)||
                // !(this.User.pag.correspondence.AdditionalFilters.dateFssp==''||this.User.pag.correspondence.AdditionalFilters.dateFssp==null)||
                this.User.pag.correspondence.AdditionalFilters.name_delo.length != this.VidRecoverInDebtorCreditArr.length ||
                !(this.User.pag.correspondence.AdditionalFilters.number_ip == '' || this.User.pag.correspondence.AdditionalFilters.number_ip == null))
                return true
            return false

        },
        SetAdditionalFilters() {
            this.setCorrespondenceToUserPag(this.correspondence)


            this.setDataUser().then((response) => {

                this.getDataUser().then((response) => {

                    this.loadCorrespondencePag()
                    this.getDataCorrespondence(this.User.pag.correspondence)
                    this.additionFilterStay = this.additionFilterStayCheck()
                })

                this.additionalFilterShow = false;

            })


        },


        filterFindFssp(value) {
            this.getFsspOtdelsListArr(value)
        },


    },

    mounted() {
        this.getFsspOtdelsListArr()
        this.getJudicialsListArr()
        this.getResponsibleUserInDebtorList()
        this.getRegion()
        this.getDataReestrsAndCession()
        this.getTypeDebtorInDebtorCreditArr().then(() => {
            this.filterSetsTypeDebtor()
            this.filterSetsNameDelo()
            this.additionFilterStay = this.additionFilterStayCheck()


        })
        this.getDataStatuss()
        this.getRecoverArrList()
        this.gridApi = this.gridOptions.api
        this.getDataUser().then(() => {
            this.loadCorrespondencePag()
            this.getRecoverArrList().then((response) => {

                for (let i = 0; i < this.RecoverArrList.length; i++) {

                    if (this.RecoverArrList[i].id == this.correspondence.num_recover) {

                        this.rec_id = this.RecoverArrList[i].name
                    }

                }
            })

            this.$root.$emit('set_filter_correspondence_filter', this.correspondence.fields)
            this.getDataCorrespondence(this.User.pag.correspondence)


        })

        if (localStorage.getItem('columnDefs')) {
            this.columnDefs = JSON.parse(localStorage.getItem("columnDefs"));
        }


    }
}
</script>
<style scopped>
.download_cell{
    text-align: center;
}

.ag-grid-table .vs-input--placeholder.normal {
    padding: 0 0rem !important;
    font-size: 12px!important;
    line-height: 18px;
}
h6{
    color: rgba(var(--vs-primary),1)!important;
}
.vs-button:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
    padding: 0.85rem 2rem!important;
}

[dir] .settingsBtnWrapper .vs-button.settingsBtn:not(.vs-radius):not(.small):not(.large){
    /*padding: 0.55rem 2rem!important;*/
    width: 41px!important;
    height: 41px!important;
}
[dir] .search_filter_input .vs-input--placeholder.normal{
    font-size: 14px;
}
</style>
<style lang="scss">
.ag-grid-table .vs-input--placeholder.normal {
    padding: 0 0rem !important;
    font-size: 12px!important;
    line-height: 18px;
}
.con-vs-chip.ag-grid-cell-chip.cursor-pointer.download_btn.vs-chip-primary.con-color {
    box-sizing: border-box;
    max-height: 20px!important;
    min-height: auto!important;
    height: 100%;
    margin: 0 auto;
    transform: translateY(0px);
}
.ag-header-cell .vs-input--input.normal{
    box-shadow: none!important;
    border: none!important;
}
.actions_cell {
    text-align: center;
}

.AdditionalPopup {
    position: absolute;
    top: 10%;
}

.con-vs-pagination {
    margin-right: 40px !important;
}

.vs-dropdown--custom {
    padding: 45px !important;
    padding-top: 8px !important;
    min-width: 301px;
}

.cell-wrap-text {
    white-space: normal !important;
}

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

.ag-row {
    height: 23px !important;

    padding: 0px !important;
    margin: 0px !important;
}

.ag-cell {

    padding: 0px !important;
    margin: 0px !important;

}
.load-bar {
    display: inline-block;
    max-width: 100px;
}

.outer-div {
    padding: 20%;
    text-align: center;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(200, 80%, 90%, 0.3);
}

.out-main {
    position: relative;
}

[dir] .ag-grid-table .ag-header-viewport .vs-input--placeholder {
    top: 0.7rem;
    left: 0.7rem;
    border-radius: 0;
}

/*.ag-header-row{*/
/*height: 26px!important;*/
/*}*/
/*.ag-theme-material .ag-cell {*/
/*line-height:15px!important;*/
/*}*/
</style>