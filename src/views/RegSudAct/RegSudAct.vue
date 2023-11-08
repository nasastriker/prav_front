<template>
    <div id="page-user-list">
        <div class="vx-card p-6" style="min-height: 95vh;">
            <div class="vx-row" style="padding-top: 5px">
                <div class="vx-col mb-2">
                    <div class="centerx">
                        <vs-tooltip text="Поиск по ФИО должника, № договора ..." position="top" >
                            <h6 class="h6Blue mb-1">ФИО должника/Номер договора: </h6>
                        </vs-tooltip>
                    </div>
                    <vs-input type="search" class="w-full" style="max-width: 300px" v-model="fio" @keyup.enter="updateSearchQuery"></vs-input>
                    <div><span style="color:red;font-size: 10pt">После ввода нажмите Enter</span></div>
                </div>
                <!--        <div class="vx-col mb-2" style="width: 300px">-->
                <!--            <h6 class="h6Blue">Категория регистрации:</h6>-->
                <!--            <v-select  class="w-full" style="max-width: 350px" :reduce="label => label.id" label="text"  :options="RegCategoryList"  v-model="id_category" @input="setCategory"></v-select>-->
                <!--        </div>-->
                <div class="mb-2" style="width: 200px; ">
                    <div class="centerx">
                        <vs-tooltip text="Фильтр по статусу" position="top" >
                            <h6 class="h6Blue mb-1">Выберите статус:</h6>
                        </vs-tooltip>
                    </div>
                    <v-select class="w-full" :reduce="label => label.id" label="name" :options="StatussArrAndAll" v-model="status" @input="setStatus"></v-select>
                </div>
                <div class="mb-2" style="width: 200px; margin-left: 10px;">
                    <div class="centerx">
                        <vs-tooltip text="Фильтр по взыскателю" position="top" >
                            <h6 class="h6Blue mb-1">Выберите взыскателя:</h6>
                        </vs-tooltip>
                    </div>
                    <v-select class="w-full" :reduce="label => label.id" label="name" :options="RecoverArrList" v-model="rec_id" @input="setRecover"></v-select>
                </div>
                <div class="mb-2" style="width: 200px; margin-left: 10px;">
                    <div class="centerx">
                        <vs-tooltip text="Фильтр по виду взыскателя" position="top" >
                            <h6 class="h6Blue mb-1">Выберите вид взыскателя:</h6>
                        </vs-tooltip>
                    </div>
                    <v-select class="w-full" :reduce="label => label.id" label="name" :options="TypeVzArr" v-model="type_vz_id" @input="setTypeVz"></v-select>
                </div>
                <div class="mb-2" style="width: 200px; margin-left: 10px;">
                    <div class="centerx">
                        <vs-tooltip text="Фильтр по типу должника" position="top" >
                            <h6 class="h6Blue mb-1">Выберите тип должника:</h6>
                        </vs-tooltip>
                    </div>
                    <v-select class="w-full" :reduce="label => label.id" label="name" :options="TypeDebtorArr" v-model="type_debtor_id" @input="setTypeDebtor"></v-select>
                </div>
                <div class="mb-2" style="margin-top: 16px; margin-left: 10px;">
                    <div class="vx-row">
                        <div class="centerx mt-3 ml-4" >
                            <vs-tooltip text="Ускоренный поиск" position="top" >
                                <vs-checkbox v-model="credit.fast" @input="updateSearchFast"></vs-checkbox>
                            </vs-tooltip>
                        </div>
                        <div class="vx-col">
                            <vs-button class="btn-drop" color="success" type="gradient" @click="filterPopup=true">Доп фильтры</vs-button>
                            <div style="position: relative;"><span v-if="additionFilterStay" style="color:red;cursor:pointer; position: absolute; font-size: 10pt;left: 6px;" @click="clearAdditionalFilters">Сброс доп фильтров</span></div>
                        </div>
                        <vs-button @click="filterReset">Сбросить фильтры</vs-button>
                    </div>
                </div>
            </div>
            <vs-popup classContent="popup-example" title="Дополнительные фильтры" :active.sync="filterPopup">
                <div style="min-width: 1100px">
                    <div class="vx-row">
                        <div class="vx-col md:w-1/4 w-full" style="width: 50%;">
                            <h6 class="mb-1">Регион адреса регистрации:
                                <VarToClipboard name="d_data_reg[region]" />
                            </h6>
                            <v-select style="min-width: 100%;" class="mb-4" :reduce="label => label.id" label="name" :options="RegionArr" v-model="credit.AdditionalFilters.region"></v-select>
                            <h6 class="mb-1">Судебный участок:
                                <VarToClipboard name="dc_sud_send" />
                            </h6>
                            <v-select style="min-width: 100%;" class="mb-4" @search="filterFindJudList" :reduce="label => label.number" label="name" :options="JudicialsListArr" v-model="credit.AdditionalFilters.idJud"></v-select>
                            <!--
                    <h6 style="color:dodgerblue">ФНС</h6>
                    <v-select style="min-width: 100%;"></v-select>
              !-->
                            <h6 class="mb-1">ФСПП отдел:
                                <VarToClipboard name="d_fssp_otdel" />
                            </h6>
                            <v-select style="min-width: 100%;" class="mb-4" :reduce="label => label.fssp_code" label="name" :options="FsspOtdelsListArr" v-model="credit.AdditionalFilters.fssp" @search="filterFindFssp"></v-select>
                            <fieldset class="f" style="margin-top:5px;">
                                <legend class="l">Статус гражданина:
                                    <VarToClipboard name="d_pensioner" />
                                </legend>
                                <vs-checkbox style="margin-top:5px;" v-model="filterAll.statusGr" @change="credit.AdditionalFilters.pensioner=(filterAll.statusGr) ? ['0','1'] : []">Все</vs-checkbox>
                                <vs-checkbox style="margin-top:5px;margin-bottom: 5px" vs-value="0" v-model="credit.AdditionalFilters.pensioner" :disabled="filterAll.statusGr">Работающий</vs-checkbox>
                                <vs-checkbox style="margin-bottom: 5px" vs-value="1" v-model="credit.AdditionalFilters.pensioner" :disabled="filterAll.statusGr">Пенсионер</vs-checkbox>
                            </fieldset>
                        </div>
                        <div class="vx-col md:w-1/4 w-full">
                            <fieldset class="f" style="margin-top:5px;">
                                <legend class="l">Тип ИД:
                                    <VarToClipboard name="dc_type_cp" />
                                </legend>
                                <vs-checkbox style="margin-top:5px;" v-model="filterAll.typeDelo" @change="credit.AdditionalFilters.typeCp=(filterAll.typeDelo) ? ['0','1'] : []">Все</vs-checkbox>
                                <vs-checkbox style="margin-top:5px;" vs-value="0" v-model="credit.AdditionalFilters.typeCp" :disabled="filterAll.typeDelo">Судебный приказ</vs-checkbox>
                                <vs-checkbox style="margin-top:5px;margin-bottom: 5px" vs-value="1" v-model="credit.AdditionalFilters.typeCp" :disabled="filterAll.typeDelo">Исполнительный лист</vs-checkbox>
                            </fieldset>
                            <h6 class="mb-1 mt-4">Номер ИП:
                                <VarToClipboard name="dс_number_ip" />
                            </h6>
                            <vs-input class="mb-4" style="width: 100%;" v-model="credit.AdditionalFilters.number_ip"></vs-input>
                            <h6 class="h6 mb-1">Ответственный сотрудник:
                                <VarToClipboard name="dc_id_user" />
                            </h6>
                            <v-select class="w-50" :reduce="label=>label.id" label="name" :options="ResponsibleUserInDebtorListArr" v-model="credit.AdditionalFilters.id_user"></v-select>

                        </div>

                        <div class="vx-col md:w-1/4 w-full" style="width: 50%;">
                            <h6 class="mb-1">Дата в суд Судебный приказ:
                                <VarToClipboard name="dc_date_sud" />
                            </h6>
                            <vs-input type="date" class="w-100 mb-4" v-model="credit.AdditionalFilters.dateSud"></vs-input>
                            <h6 class="mb-1">Дата в суд Иск:
                                <VarToClipboard name="dc_date_isk" />
                            </h6>
                            <vs-input type="date" class="w-100 mb-4" v-model="credit.AdditionalFilters.dateIsk"></vs-input>
                            <h6 class="mb-1">Дата заявление ФНС:
                                <VarToClipboard name="dc_date_fns" />
                            </h6>
                            <vs-input type="date" class="w-100 mb-4" v-model="credit.AdditionalFilters.dateFns"></vs-input>
                            <h6 class="mb-1">Дата отзыва СА:
                                <VarToClipboard name="dc_date_response_sa" />
                            </h6>
                            <vs-input type="date" class="w-100 mb-4" v-model="credit.AdditionalFilters.dateResponseSa"></vs-input>
                        </div>
                        <div class="vx-col md:w-1/4 w-full" style="width: 50%;">
                            <h6 class="mb-1">Дата заявления банка:
                                <VarToClipboard name="dc_date_bank" />
                            </h6>
                            <vs-input type="date" class="w-100 mb-4" v-model="credit.AdditionalFilters.dateBank"></vs-input>
                            <h6 class="mb-1">Дата заявления в ПФ РФ:
                                <VarToClipboard name="dc_date_pfr" />
                            </h6>
                            <vs-input type="date" class="w-100 mb-4" v-model="credit.AdditionalFilters.datePfr"></vs-input>
                            <h6 class="mb-1">Дата заявления в ФССП РФ:
                                <VarToClipboard name="dc_date_fssp" />
                            </h6>
                            <vs-input type="date" class="w-100 mb-4" v-model="credit.AdditionalFilters.dateFssp"></vs-input>
                        </div>
                    </div>
                    <div style="text-align: right; margin-top: 20px">
                    </div>
                    <vs-button @click="filterPopup=false" class="mr-4">Закрыть</vs-button>
                    <vs-button @click="SetAdditionalFilters" color="success">Применить</vs-button>
                </div>
            </vs-popup>
            <template v-if="findFlag">
                <vs-tabs>
                    <vs-tab label="Результат">
                        <fieldset class="f" style="margin-top: 15px">
                            <legend class="l">{{Deb.debtor.name_family}} {{Deb.debtor.name}} {{Deb.debtor.name_patronymic}}  {{birthdate}}: <span style="color: red;cursor: pointer;" @click="copy">copy</span>:</legend>
                            <div class="vx-row" style="padding: 10px">
                                <div class="vx-col sm:w-1/3 w-full mb-2">
                                    <!--                  <DebtorInfo v-if="id_category=='change_id' || id_category=='pravopreemstvo' || id_category=='isp_docs'"-->
                                    <!--                              :type-des="2"></DebtorInfo>-->
                                    <!--                  <DebtorInfo v-else :type-des="1"></DebtorInfo>-->
                                    <DebtorInfo :type-des="2"></DebtorInfo>
                                </div>
                                <div class="vx-col sm:w-2/3 w-full mb-2">
                                    <vs-tabs :color="'#000000'" v-model="$store.state.sud_work.activeTabRegSudAct">
                                        <vs-tab label="Описка в ИД">
                                            <Opiska></Opiska>
                                        </vs-tab>
                                        <vs-tab label="Дубликат ИД">
                                            <Dublicat></Dublicat>
                                        </vs-tab>
                                        <vs-tab label="Правопреемство">
                                            <Pravopreemstvo></Pravopreemstvo>
                                        </vs-tab>
                                        <vs-tab label="Приказное производство">
                                            <SudInfo></SudInfo>
                                        </vs-tab>
                                        <vs-tab label="Исковое производство">
                                            <ActionProceedings></ActionProceedings>
                                        </vs-tab>
                                        <vs-tab label="Апелляция">
                                            <Appealation></Appealation>
                                        </vs-tab>
                                        <vs-tab label="Кассация">
                                            <Cassation></Cassation>
                                        </vs-tab>
                                        <vs-tab label="Поворот ИД">
                                            <PovorotId></PovorotId>
                                        </vs-tab>
                                        <vs-tab label="Взыскание судебных расходов">
                                            <CollectRashod></CollectRashod>
                                        </vs-tab>
                                        <vs-tab label="Наследство">
                                            <Inheritance></Inheritance>
                                        </vs-tab>
                                        <vs-tab label="Изменения в ИД. Продление срока ИД">
                                            <ChangesIDProlongation></ChangesIDProlongation>
                                        </vs-tab>
                                    </vs-tabs>
                                    <!--                  <SudInfo v-if="id_category=='prikaz_pro'"></SudInfo>-->
                                    <!--                  <ActionProceedings v-if="id_category=='isk_pro'"></ActionProceedings>-->
                                    <!--                  <Pravopreemstvo v-if="id_category=='pravopreemstvo'"></Pravopreemstvo>-->
                                    <!--                  <PovorotId v-if="id_category=='povorot_id'"></PovorotId>-->
                                    <!--                  <CollectRashod v-if="id_category=='vzysk_sud_rash'"></CollectRashod>-->
                                    <!--                  <Inheritance v-if="id_category=='inheritance'"></Inheritance>-->
                                    <!--                  <ChangesIDProlongation v-if="id_category=='change_id'"></ChangesIDProlongation>-->
                                    <!--                  <ChangesID v-if="id_category=='isp_docs'"></ChangesID>-->
                                    <!--                  <Appeal v-if="id_category=='objal'"></Appeal>-->
                                </div>
                            </div>
                        </fieldset>
                    </vs-tab>
                    <vs-tab label="Данные заёмщика">
                        <Debtor :back="false"></Debtor>
                    </vs-tab>
                </vs-tabs>
            </template>
            <template v-if="findFlagMany">
                <div class="vx-col 1">

                    <vs-dropdown vs-trigger-click class="cursor-pointer mb-4">
                        <div class="p-3 cursor-pointer flex items-center justify-between font-medium" style="margin-top: 11px;border: 1px solid #ccc;border-radius: 4px;">
                            <span class="mr-2">
                                {{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ total - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : total }} of {{ total }}
                            </span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
                        <vs-dropdown-menu>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                                <span>20</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                                <span>50</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                                <span>100</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
                                <span>150</span>
                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>

                    
                </div>
                <!-- AgGrid Table -->
                <ag-grid-vue ref="agGridTable" :components="components"
                             :gridOptions="gridOptions"
                             class="ag-theme-material w-100 my-4 ag-grid-table"
                             :columnDefs="columnDefs"
                             :defaultColDef="defaultColDef"
                             :rowData="data" rowSelection="multiple"
                             :rowDataChanged="onRowDataChanged"
                             colResizeDefault="shift" :animateRows="true" :floatingFilter="true" :pagination="true" :rowHeight="rowHeight" :paginationPageSize="paginationPageSize" :suppressPaginationPanel="true" @rowDoubleClicked="onrowDoubleClicked" @grid-size-changed="onGridSizeChanged" @column-resized="onColumnResized" @column-visible="onColumnVisible" enableBrowserTooltips="true" :enableRtl="$vs.rtl">
                </ag-grid-vue>
                <vs-pagination :total="totalPages" :max="7" v-model="currentPage" />
            </template>
            <template v-if="findFlagNotFound">
                <fieldset class="f" style="margin-top: 15px">
                    <legend class="l">Не найден:</legend>
                    <h1 style="text-align: center; color: #a00;
                    padding-top: 20px ;
                    padding-bottom: 20px;
                    ">Договор не найден!!!</h1>
                </fieldset>
            </template>
            <template v-if="findFlagStart">
                <div>
                    <div style="margin-top: calc(70vh/2); text-align: center;">
                        <SpinnerLoader  />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import moment from "moment";
import OpenCreditStatus from '../Debtor/Render/OpenCreditStatus.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import r from '../../route';
import axios from '../../axios'
import Vue from 'vue'
import DebtorFilterRender from '../Debtor/Render/DebtorFilterRender.vue'
import Checkbox from "../forms/form-elements/checkbox/Checkbox.vue";
import Check from "../Handbook/Check/Check.vue";
import { SpinnerLoader } from 'vue-spinners-css';
import Debtor from '../Debtor/DebtorID.vue'
import DebtorInfo from "./DebtorInfo.vue";
import SudInfo from "./Tabs/SudInfo.vue";
import ActionProceedings from "./Tabs/ActionProceedings.vue";
import PovorotId from "./Tabs/PovorotId.vue";
import CollectRashod from "./Tabs/CollectRashod.vue";
import Inheritance from "../Debtor/DebtorTab/Inheritance.vue";
import OpenUser from "../Debtor/Render/OpenUser.vue";
import ChangesIDProlongation from "./Tabs/ChangesIDProlongation.vue";
import Pravopreemstvo from "./Tabs/Pravopreemstvo.vue";
import Opiska from "./Tabs/Opiska.vue";
import Dublicat from "./Tabs/Dublicat.vue";
import Appealation from "./Tabs/Appealation.vue";
import Cassation from "./Tabs/Cassation.vue";
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)
import VarToClipboard from './../VarToClipboard.vue'
export default {
    components: {
        Check,
        OpenUser,
        Checkbox,
        OpenCreditStatus,
        DebtorFilterRender,
        SpinnerLoader,
        Debtor,
        DebtorInfo,
        Opiska,
        Dublicat,
        Pravopreemstvo,
        SudInfo,
        ActionProceedings,
        Appealation,
        Cassation,
        PovorotId,
        CollectRashod,
        ChangesIDProlongation,
        VarToClipboard,
        Inheritance,
    },
    beforeMount() {

        this.defaultColDef = { resizable: true };
        this.rowHeight = 24;
        this.components = {
            OpenCreditStatus,
            DebtorFilterRender: DebtorFilterRender
        };
    },
    data() {
        return {
            id_category: 'isp_docs',
            findFlag: false,
            findFlagNotFound: false,
            enterFio: false,
            findFlagStart: false,
            data: [],
            total: 0,
            findFlagMany: false,
            fio: '',
            additionFilterStay: true,
            filterAll: {
                statusGr: false,
                typeDebtor: false,
                typeDelo: false,
                nameDelo: false
            },
            /*
             credit:{
                 fields:{},
                 find:'r0',
                 status:'r1',
                 cession:'r2',
                 id_recover:'r3',
                 num_recover:'r4',
                 typeRecover:'r5',
                 AdditionalFilters:{
                     pensioner:['0','2','hg'],
                     typeCp:['f','h'],
                     typeDebtor:['q','w'],
                     region: 'r6',
                     idJud : 'r7',
                     fssp : 'r8',
                     dateSud : 'r9',
                     dateIsk : 'ra',
                     dateFns :'rb',
                     dateResponseSa : 'rc',
                     dateBank : 'rd',
                     datePfr : 're',
                     dateFssp : 'rf',
                     name_delo:['z','z'],
                     number_ip:'rg'
                 }
             },
             */

            credit: {
                fast: true,
                offset: 0,
                limit: 100,
                fields: {},
                find: '',
                status: '',
                cession: -2,
                id_recover: -2,
                num_recover: 0,
                typeRecover: 0,
                AdditionalFilters: {
                    pensioner: [],
                    typeCp: [],
                    typeDebtor: [],
                    region: -1,
                    idJud: -1,
                    fssp: -1,
                    dateSud: '',
                    dateIsk: '',
                    dateFns: '',
                    dateResponseSa: '',
                    dateBank: '',
                    datePfr: '',
                    dateFssp: '',
                    name_delo: [],
                    number_ip: '',
                    flag: 1,
                    id_user: -1,

                }
            },

            filterPopup: false,
            newDeb: {
                debtorCredit: {
                    id_recover: 0,
                    number_dog: null,
                    date_dog: null,
                    id_status: 0
                },
                debtor: {
                    name_family: null,
                    birthdate: null,
                    name: null,
                    name_patronymic: null,
                }
            },
            addDebshow: false,
            rowHeight: null,
            status: 0,
            rec_id: 0,
            type_vz_id: -1,
            TypeVzArr: [],
            type_debtor_id: -1,
            TypeDebtorArr: [],
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

                alwaysShowVerticalScroll: true
            },
            defaultColDef: {
                flex: 1,
                wrapText: true,
                autoHeight: true,
                sortable: true,
                resizable: true,

            },
            columnDefs: [{
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
                    headerName: 'Фамилия',
                    headerTooltip: 'Фамилия',
                    tooltipField: 'name_family',
                    field: 'name_family',
                    filter: true,
                    // floatingFilterComponentFramework: 'DebtorFilterRender',
                    // floatingFilterComponentParams: {
                    //     type_f: 'string',
                    //     field: 'name_family',
                    //     emitFilter: 'clear_filter_debtor_filter',
                    //     emitSet: 'set_filter_debtor_filter',
                    //     updateSearchField: this.updateSearchField.bind(this)
                    // },
                    hide: false,
                    width: 180
                },
                {
                    headerName: 'Имя',
                    headerTooltip: 'Имя',
                    tooltipField: 'name',
                    field: 'name',
                    filter: true,
                    // floatingFilterComponentFramework: 'DebtorFilterRender',
                    // floatingFilterComponentParams: {
                    //     type_f: 'string',
                    //     field: 'name',
                    //     emitFilter: 'clear_filter_debtor_filter',
                    //     emitSet: 'set_filter_debtor_filter',
                    //     updateSearchField: this.updateSearchField.bind(this)
                    // },
                    hide: false,
                    width: 150
                },

                {
                    headerName: 'Отчество',
                    headerTooltip: 'Отчество',
                    tooltipField: 'name_patronymic',
                    field: 'name_patronymic',
                    filter: true,
                    // floatingFilterComponentFramework: 'DebtorFilterRender',
                    // floatingFilterComponentParams: {
                    //     type_f: 'string',
                    //     field: 'name_patronymic',
                    //     emitFilter: 'clear_filter_debtor_filter',
                    //     emitSet: 'set_filter_debtor_filter',
                    //     updateSearchField: this.updateSearchField.bind(this)
                    // },
                    hide: false,
                    width: 150
                },
                {
                    headerName: 'Дата рождения',
                    headerTooltip: 'Дата рождения',
                    tooltipField: 'birthdate',
                    field: 'birthdate',
                    filter: true,
                    // floatingFilterComponentFramework: 'DebtorFilterRender',
                    // floatingFilterComponentParams: {
                    //     type_f: 'date',
                    //     field: 'birthdate',
                    //     emitFilter: 'clear_filter_debtor_filter',
                    //     emitSet: 'set_filter_debtor_filter',
                    //     updateSearchField: this.updateSearchField.bind(this)
                    // },
                    hide: false,
                    width: 160
                },
                {
                    headerName: '№ Договора',
                    headerTooltip: '№ Договора',
                    tooltipField: 'number_dog',
                    field: 'number_dog',
                    filter: true,
                    // floatingFilterComponentFramework: 'DebtorFilterRender',
                    // floatingFilterComponentParams: {
                    //     type_f: 'string',
                    //     field: 'number_dog',
                    //     emitFilter: 'clear_filter_debtor_filter',
                    //     emitSet: 'set_filter_debtor_filter',
                    //     updateSearchField: this.updateSearchField.bind(this)
                    // },
                    hide: false,
                    width: 180
                },
                {
                    headerName: '№ СА',
                    headerTooltip: '№ Судебного акта',
                    tooltipField: 'number_sa',
                    field: 'number_sa',
                    filter: true,
                    // floatingFilterComponentFramework: 'DebtorFilterRender',
                    // floatingFilterComponentParams: {
                    //     type_f: 'string',
                    //     field: 'number_dog',
                    //     emitFilter: 'clear_filter_debtor_filter',
                    //     emitSet: 'set_filter_debtor_filter',
                    //     updateSearchField: this.updateSearchField.bind(this)
                    // },
                    hide: false,
                    width: 180
                },

                {
                    headerName: 'Взыскатель',
                    headerTooltip: 'Взыскатель',
                    tooltipField: 'recover',
                    field: 'recover',
                    filter: false,
                    hide: false,
                    width: 180,
                },
                {
                    headerName: 'Цедент',
                    headerTooltip: 'Цедент',
                    tooltipField: 'recover1',
                    field: 'recover1',
                    filter: false,
                    hide: false,
                    width: 180,
                },
                {
                    headerName: 'Вид взыскания',
                    headerTooltip: 'Вид взыскания',
                    tooltipField: 'vid_vz_name',
                    field: 'vid_vz_name',
                    filter: false,
                    hide: false,
                    width: 180,
                },
                {
                    headerName: 'Тип должника',
                    headerTooltip: 'Тип должника',
                    tooltipField: 'type_debtor_name',
                    field: 'type_debtor_name',
                    filter: false,
                    hide: false,
                    width: 180,
                },
              {
                headerName: 'Ответственный',
                headerTooltip: 'ID Ответственного',
                tooltipField: 'id_user',
                field: 'id_user',
                filter: true,
                hide:false,
                width: 200,
                cellRendererFramework: 'OpenUser',


              },


            ],

            // Cell Renderer Components
            components: {
                OpenCreditStatus,
                DebtorFilterRender,
                OpenUser


            },

        }
    },
    watch: {

        statusFilter(obj) {
            this.setColumnFilter('status', obj.value)
        },

    },
    computed: {
      birthdate(){
        if(typeof this.Deb.debtor.birthdate!='undefined'){
          if(this.Deb.debtor.birthdate!=null){
            let date1 = new Date(this.Deb.debtor.birthdate);


            return  moment(date1.toString()).format("DD.MM.YYYY")
          }
        }
        return null
      },
        optArr() {
            let arr = [];
            let index;
            for (index = 0; index < this.RecoverersArr.length; ++index) {
                if (this.RecoverersArr[index].cession) {
                    arr.push({
                        name: 'Договор цессии №' + this.RecoverersArr[index].number + ' от ' + this.RecoverersArr[index].date + ' Взыскатель ' + this.RecoverersArr[index].name,
                        id: this.RecoverersArr[index].id,
                    });
                } else {
                    arr.push({
                        name: 'Взыскатель ' + this.RecoverersArr[index].name,
                        id: this.RecoverersArr[index].id,
                    })

                }
            }

            return arr
        },


        totalPages() {
            if (typeof this.gridApi == 'undefined') {
                this.gridApi = this.gridOptions.api
            }
            if (this.gridApi)
                return Math.ceil(this.total / this.paginationPageSize)
            else return 0
        },
        paginationPageSize() {
            return this.credit.limit
        },
        ...mapGetters([
            'StatussArrAndAll', 'User', 'SudActCreditsFindFlag', 'RecoverArrList', 'TypeDebtorInDebtorCreditArr',
            'RegionArr', 'JudicialsListArr', 'FsspOtdelsListArr', 'VidRecoverInDebtorCreditArr', 'ResponsibleUserInDebtorListArr',
            'RecoverList', 'RecoverersArr', 'StatussArr', 'Deb', 'RegCategoryList'

        ]),
        currentPage: {
            get() {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
            },
            set(val) {
                if (typeof this.gridApi == 'undefined') {
                    this.gridApi = this.gridOptions.api
                }
                // this.setQueryCreditsOffset(val-1)
                this.credit.offset = (val - 1) * this.credit.limit
                this.getSudActDataCredits(this.credit).then((response) => {
                    if (response.data.result) {
                        this.data = response.data.data;
                        this.total = response.data.total;
                    }
                });
                this.gridApi.paginationGoToPage(val - 1)
            }
        },

    },
    methods: {
      copy(){
        let data=this.Deb.debtor.name_family+' '+this.Deb.debtor.name+' '+this.Deb.debtor.name_patronymic+' '+this.birthdate
        this.$copyText(data)

      },
        fillNameDelo() {
            if (this.type_vz_id == -1) {
                this.credit.AdditionalFilters.name_delo = []
                for (let i = 0; i < this.VidRecoverInDebtorCreditArr.length; i++) {
                    this.credit.AdditionalFilters.name_delo.push(i.toString())
                }
            } else {
                this.credit.AdditionalFilters.name_delo.splice(0, this.credit.AdditionalFilters.name_delo.length)
                this.credit.AdditionalFilters.name_delo.push(this.type_vz_id.toString())
            }
        },
        setTypeVz() {
            this.gridApi = this.gridOptions.api;
            if (this.type_vz_id == null) {
                this.type_vz_id = -1;
            }
            this.fillNameDelo();

            if (this.enterFio) {
                this.findFio();
            }
        },
        fillTypeVzArr() {
            this.TypeVzArr.push({ id: -1, name: 'Все' })

            for (let i = 0; i < this.VidRecoverInDebtorCreditArr.length; i++) {
                this.TypeVzArr.push(this.VidRecoverInDebtorCreditArr[i])
            }

            this.type_vz_id = -1;
        },
        fillTypeDebtor() {
            if (this.type_debtor_id == -1) {
                this.credit.AdditionalFilters.typeDebtor = []
                for (let i = 0; i < this.TypeDebtorInDebtorCreditArr.length; i++) {
                    this.credit.AdditionalFilters.typeDebtor.push(i.toString())
                }
            } else {
                this.credit.AdditionalFilters.typeDebtor.splice(0, this.credit.AdditionalFilters.typeDebtor.length)
                this.credit.AdditionalFilters.typeDebtor.push(this.type_debtor_id.toString())
            }
        },
        setTypeDebtor() {
            this.gridApi = this.gridOptions.api;
            if (this.type_debtor_id == null) {
                this.type_debtor_id = -1;
            }
            this.fillTypeDebtor();

            if (this.enterFio) {
                this.findFio();
            }
        },
        fillTypeDebtorArr() {
            this.TypeDebtorArr.push({ id: -1, name: 'Все' })

            for (let i = 0; i < this.TypeDebtorInDebtorCreditArr.length; i++) {
                this.TypeDebtorArr.push(this.TypeDebtorInDebtorCreditArr[i])
            }

            this.type_debtor_id = -1;
        },
        setCategory() {
            if (this.id_category == null) {
                this.id_category = 'isp_docs';
            }
        },

        additionFilterStayCheck() {
            if (typeof this.credit.AdditionalFilters == 'undefined') {
                return false
            }
            // if(!Array.isArray(this.credit.AdditionalFilters.name_delo))
            // {
            //   this.credit.AdditionalFilters.name_delo=[]
            // }
            let checkArr = ['']

            if (this.credit.AdditionalFilters.pensioner.length != 2 ||
                // this.credit.AdditionalFilters.typeDebtor.length!=this.TypeDebtorInDebtorCreditArr.length||
                this.credit.AdditionalFilters.typeCp.length != 2 ||
                this.credit.AdditionalFilters.region != -1 ||
                this.credit.AdditionalFilters.idJud != -1 ||
                this.credit.AdditionalFilters.fssp != -1 ||
                this.credit.AdditionalFilters.id_user != -1 ||
                !(this.credit.AdditionalFilters.dateSud == '' || this.credit.AdditionalFilters.dateSud == null) ||
                !(this.credit.AdditionalFilters.dateIsk == '' || this.credit.AdditionalFilters.dateIsk == null) ||
                !(this.credit.AdditionalFilters.dateFns == '' || this.credit.AdditionalFilters.dateFns == null) ||
                !(this.credit.AdditionalFilters.dateResponseSa == '' || this.credit.AdditionalFilters.dateResponseSa == null) ||
                !(this.credit.AdditionalFilters.dateBank == '' || this.credit.AdditionalFilters.dateBank == null) ||
                !(this.credit.AdditionalFilters.datePfr == '' || this.credit.AdditionalFilters.datePfr == null) ||
                !(this.credit.AdditionalFilters.dateFssp == '' || this.credit.AdditionalFilters.dateFssp == null) ||
                // this.credit.AdditionalFilters.name_delo.length!=this.VidRecoverInDebtorCreditArr.length||
                !(this.credit.AdditionalFilters.number_ip == '' || this.credit.AdditionalFilters.number_ip == null))
                return true
            return false

        },
        SetAdditionalFilters() {
            this.gridApi = this.gridOptions.api;
            // this.setCreditToUserPag(this.credit)


            // this.setDataUser().then((response)=>{

            // this.getDataUser().then((response)=>{
            //   this.loadCreditPag()
            if (this.enterFio) {
                this.findFio();
            }
            this.additionFilterStay = this.additionFilterStayCheck()
            this.filterPopup = false;
            // })



            // })




        },
        clearAdditionalFilters() {
            // this.setCreditsFindFlag=true
            this.gridApi = this.gridOptions.api;
            this.filterAll.typeDelo = true
            this.filterAll.statusGr = true
            this.credit.AdditionalFilters.pensioner = (this.filterAll.statusGr) ? ['0', '1'] : []
            this.credit.AdditionalFilters.typeCp = (this.filterAll.typeDelo) ? ['0', '1'] : []
            // this.filterAll.typeDebtor=true
            // this.filterAll.nameDelo=true
            // this.filterSetsNameDelo()
            // this.filterSetsTypeDebtor()
            this.credit.AdditionalFilters.region = -1
            this.credit.AdditionalFilters.idJud = -1
            this.credit.AdditionalFilters.fssp = -1
            this.credit.AdditionalFilters.id_user = -1
            this.credit.AdditionalFilters.dateSud = ''
            this.credit.AdditionalFilters.dateIsk = ''
            this.credit.AdditionalFilters.dateFns = ''
            this.credit.AdditionalFilters.dateResponseSa = ''
            this.credit.AdditionalFilters.dateBank = ''
            this.credit.AdditionalFilters.datePfr = ''
            this.credit.AdditionalFilters.dateFssp = ''
            this.credit.AdditionalFilters.number_ip = ''
            // this.setCreditToUserPag(this.credit)
            this.additionFilterStay = this.additionFilterStayCheck()
            // this.setDataUser().then((response)=>{
            if (this.enterFio) {
                this.findFio();
            }
            // this.setCreditsFindFlag=false
            // })

        },

        filterSetsNameDelo() {
            if (this.filterAll.nameDelo) {
                this.credit.AdditionalFilters.name_delo = []
                for (let i = 0; i < this.VidRecoverInDebtorCreditArr.length; i++) {
                    this.credit.AdditionalFilters.name_delo.push(i.toString())
                }
            } else {
                this.credit.AdditionalFilters.name_delo.splice(0, this.credit.AdditionalFilters.name_delo.length)
            }
        },

        filterSetsTypeDebtor() {
            if (this.filterAll.typeDebtor) {
                this.credit.AdditionalFilters.typeDebtor = []
                for (let i = 0; i < this.TypeDebtorInDebtorCreditArr.length; i++) {
                    this.credit.AdditionalFilters.typeDebtor.push(i.toString())
                }
            } else {
                this.credit.AdditionalFilters.typeDebtor.splice(0, this.credit.AdditionalFilters.typeDebtor.length)
            }
        },

        filterFindFssp(value) {
            this.getFsspOtdelsListArr(value)
        },
        filterFindJudList(value) {
            this.getJudicialsListArr(value)
        },

        onColumnResized(params) {
            params.api.resetRowHeights();
        },
        onColumnVisible(params) {
            params.api.resetRowHeights();
        },
        onGridSizeChanged(params) {
            this.gridApi = this.gridOptions.api;
            if (params.clientWidth > 500) {
                this.gridApi.sizeColumnsToFit();
            } else {
                this.columnDefs.forEach(x => {
                    x.width = 300;
                });
                this.gridApi.setColumnDefs(this.columnDefs);
            }
        },
        showCol() {},
        filterReset() {
            // this.setCreditsFindFlag=true
            this.gridApi = this.gridOptions.api;
            this.status = 0
            this.rec_id = 0
            this.$root.$emit('clear_filter_debtor_filter')
            this.credit.cession = -2,
                this.credit.find = ''
            this.credit.id_recover = -2
            this.credit.num_recover = 0
            this.credit.typeRecover = 0

            if (this.status == null) {
                this.status = 0;
            }
            this.credit.status = this.status

            for (let i = 0; i < this.RecoverArrList.length; i++) {

                if (this.RecoverArrList[i].id == this.rec_id) {
                    this.credit.id_recover = this.RecoverArrList[i].num
                    this.credit.num_recover = this.RecoverArrList[i].id
                    this.credit.cession = this.RecoverArrList[i].cession
                    this.credit.typeRecover = this.RecoverArrList[i].typeRecover
                }

            }
            this.filterAll.typeDelo = true
            this.filterAll.statusGr = true
            this.credit.AdditionalFilters.pensioner = (this.filterAll.statusGr) ? ['0', '1'] : []
            this.credit.AdditionalFilters.typeCp = (this.filterAll.typeDelo) ? ['0', '1'] : []
            // this.filterAll.typeDebtor=true
            // this.filterAll.nameDelo=true
            // this.filterSetsNameDelo()
            // this.filterSetsTypeDebtor()
            this.type_debtor_id = -1
            this.type_vz_id = -1
            this.fillTypeDebtor()
            this.fillNameDelo()
            this.credit.AdditionalFilters.region = -1
            this.credit.AdditionalFilters.idJud = -1
            this.credit.AdditionalFilters.fssp = -1
            this.credit.AdditionalFilters.id_user = -1
            this.credit.AdditionalFilters.dateSud = ''
            this.credit.AdditionalFilters.dateIsk = ''
            this.credit.AdditionalFilters.dateFns = ''
            this.credit.AdditionalFilters.dateResponseSa = ''
            this.credit.AdditionalFilters.dateBank = ''
            this.credit.AdditionalFilters.datePfr = ''
            this.credit.AdditionalFilters.dateFssp = ''
            this.credit.AdditionalFilters.number_ip = ''
            this.additionFilterStay = false
            // this.setCreditToUserPag(this.credit)
            // this.setDataUser().then((response)=>{
            if (this.enterFio) {
                this.findFio();
            }
            // this.setCreditsFindFlag=false
            // })
        },
        setStatus() {
            this.gridApi = this.gridOptions.api;
            if (this.status == null) {
                this.status = 0;
            }
            this.credit.status = this.status
            // this.setCreditToUserPag(this.credit)
            // this.setDataUser().then((response)=>{
            if (this.enterFio) {
                this.findFio();
            }
            // })

        },
        setRecover() {
            this.gridApi = this.gridOptions.api;
            if (this.rec_id == null) {
                this.rec_id = 0;
            }
            for (let i = 0; i < this.RecoverArrList.length; i++) {

                if (this.RecoverArrList[i].id == this.rec_id) {
                    this.credit.id_recover = this.RecoverArrList[i].num
                    this.credit.num_recover = this.RecoverArrList[i].id
                    this.credit.cession = this.RecoverArrList[i].cession
                    this.credit.typeRecover = this.RecoverArrList[i].typeRecover
                }

            }
            // this.setCreditToUserPag(this.credit)
            // this.setDataUser().then((response)=>{
            if (this.enterFio) {
                this.findFio();
            }
            // })

        },
        ...mapMutations([
            'setQueryCreditsLimit', 'setQueryCreditsOffset', 'setCreditToUserPag', 'setCreditsFindFlag'

        ]),
        changePag(pag) {
            this.gridApi = this.gridOptions.api;
            this.credit.limit = pag
            // this.setDataUser().then((response)=>{
            if (this.enterFio) {
                this.findFio();
            }
            // })
            // this.setQueryCreditsLimit(pag);
            this.credit.limit = pag
            this.gridApi.paginationSetPageSize(pag)

        },
        onrowDoubleClicked(event) {
            this.findFlag = false;
            this.findFlagMany = false;
            this.findFlagNotFound = false;
            this.findFlagStart = true;
            this.getDataDebtorsById(event.data.id).then((response) => {
                // this.getDebtorCreditSud(event.data.id).then((response) => {
                //   if (response) {
                this.findFlagStart = false;
                this.findFlagNotFound = false;
                this.findFlag = true;
                this.findFlagMany = false;
                // }
                // });
            });
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
        resetColFilters() {
            // Reset Grid Filter
            this.gridApi.setFilterModel(null)
            this.gridApi.onFilterChanged()

            // Reset Filter Options
            this.roleFilter = this.statusFilter = this.isVerifiedFilter = this.departmentFilter = { label: 'All', value: 'all' }

            this.$refs.filterCard.removeRefreshAnimation()
        },
        saveColumn() {
            axios.post(r("setting.index"), {
                params: {
                    method: 'saveColumnDefs',
                    param: this.columnDefs

                }
            }).then((response) => {
                if (response.data.result) {

                }
            })
        },

        hideCol(index) {

            this.columnDefs[index].hide = !this.columnDefs[index].hide;
            let a = this.columnDefs

            this.columnDefs = JSON.parse(JSON.stringify(a))
            this.saveColumn();
        },

        onValidate(results) {
            this.results = results;
        },

        ...mapActions([
            'getSudActDataCredits', 'getDataStatuss', 'setDataUser', 'getTypeDebtorInDebtorCreditArr',
            'getRegion', 'getJudicialsListArr', 'getFsspOtdelsListArr', 'getDataUser', 'getRecoverArrList', 'getResponsibleUserInDebtorList',
            'getVidRecoverInDebtorCreditArr', 'getDataReestrsAndCession', 'getDataDebtorsById', 'getRegCategoryList', 'getDebtorCreditSud'
        ]),
        updateSearchFast(val) {
            this.credit.fast = val
            // this.loadCreditPag()
            // this.setDataUser().then((response)=>{
            if (this.enterFio) {
                this.findFio();
            }
            // })


        },

        updateSearchField(findField, findFieldName, findType, not_update = false) {
            // if(!not_update)this.setCreditsFindFlag=true
            this.gridApi = this.gridOptions.api;
            this.credit.find = ''
            this.credit.fields[findFieldName] = {
                find: findField,
                name: findFieldName,
                type: findType
            }
            if (!not_update) {
                // this.setCreditToUserPag(this.credit)
                // this.setDataUser().then((response) => {
                if (this.enterFio) {
                    this.findFio();
                }
                //this.setCreditsFindFlag=false
                // })
            }
        },

        updateSearchQuery() {
            this.$root.$emit('clear_filter_debtor_filter')
            this.enterFio = true;
            this.gridApi = this.gridOptions.api;
            this.findFio();
            // })
        },

        findFio() {
            this.credit.find = this.fio;
            // this.setDataUser().then((response)=>{
            this.findFlag = false;
            this.findFlagMany = false;
            this.findFlagNotFound = false;
            this.findFlagStart = true
            this.getSudActDataCredits(this.credit).then((response) => {
                if (response.data.result) {
                    if (response.data.total > 1) {
                        this.findFlagStart = false
                        this.data = response.data.data;
                        this.total = response.data.total;
                        this.findFlagMany = true;
                        this.gridApi = this.gridOptions.api;
                    } else {
                        if (response.data.total == 1) {
                            this.getDataDebtorsById(response.data.data[0].id).then((response_debtor) => {
                                // this.getDebtorCreditSud(response.data.data[0].id).then((response_sud) => {
                                //   if (response_sud) {
                                this.findFlagStart = false
                                this.findFlag = true;
                                this.findFlagMany = false;
                                this.findFlagNotFound = false;
                                // }
                                // });
                            });
                        } else {
                            this.findFlagStart = false
                            this.findFlagNotFound = true;
                        }
                    }
                } else {
                    this.findFlagStart = false
                    this.findFlagNotFound = true;
                }
            });
        },

        onRowDataChanged() {
            Vue.nextTick(() => {
                this.gridOptions.api.sizeColumnsToFit();
            });
        },
        // loadCreditPag(){
        //   if (typeof this.User.pag.credit.find !== 'undefined')this.credit.find = this.User.pag.credit.find
        //   if (typeof this.User.pag.credit.fields !== 'undefined')  {
        //     Object.keys(this.User.pag.credit.fields).forEach((key) => {
        //       this.credit.fields[key] = this.User.pag.credit.fields[key]
        //     })
        //   }
        //   if (typeof this.User.pag.credit.status !== 'undefined')this.credit.status = this.User.pag.credit.status
        //   if (typeof this.User.pag.credit.cession !== 'undefined')this.credit.cession = this.User.pag.credit.cession
        //   if (typeof this.User.pag.credit.id_recover !== 'undefined')this.credit.id_recover = this.User.pag.credit.id_recover
        //   if (typeof this.User.pag.credit.num_recover !== 'undefined')this.credit.num_recover = this.User.pag.credit.num_recover
        //   if (typeof this.User.pag.credit.typeRecover !== 'undefined')this.credit.typeRecover = this.User.pag.credit.typeRecover
        //   if (typeof this.User.pag.credit.AdditionalFilters !== 'undefined'){
        //     if (typeof this.User.pag.credit.AdditionalFilters.region !== 'undefined')this.credit.AdditionalFilters.region = this.User.pag.credit.AdditionalFilters.region
        //     if (typeof this.User.pag.credit.AdditionalFilters.idJud !== 'undefined')this.credit.AdditionalFilters.idJud = this.User.pag.credit.AdditionalFilters.idJud
        //     if (typeof this.User.pag.credit.AdditionalFilters.fssp !== 'undefined')this.credit.AdditionalFilters.fssp = this.User.pag.credit.AdditionalFilters.fssp
        //     if (typeof this.User.pag.credit.AdditionalFilters.id_user !== 'undefined')this.credit.AdditionalFilters.id_user = this.User.pag.credit.AdditionalFilters.id_user
        //     if (typeof this.User.pag.credit.AdditionalFilters.dateSud !== 'undefined')this.credit.AdditionalFilters.dateSud = this.User.pag.credit.AdditionalFilters.dateSud
        //     if (typeof this.User.pag.credit.AdditionalFilters.dateIsk !== 'undefined')this.credit.AdditionalFilters.dateIsk = this.User.pag.credit.AdditionalFilters.dateIsk
        //     if (typeof this.User.pag.credit.AdditionalFilters.dateFns !== 'undefined')this.credit.AdditionalFilters.dateFns = this.User.pag.credit.AdditionalFilters.dateFns
        //     if (typeof this.User.pag.credit.AdditionalFilters.dateResponseSa !== 'undefined')this.credit.AdditionalFilters.dateResponseSa = this.User.pag.credit.AdditionalFilters.dateResponseSa
        //     if (typeof this.User.pag.credit.AdditionalFilters.dateBank !== 'undefined')this.credit.AdditionalFilters.dateBank = this.User.pag.credit.AdditionalFilters.dateBank
        //     if (typeof this.User.pag.credit.AdditionalFilters.datePfr !== 'undefined')this.credit.AdditionalFilters.datePfr = this.User.pag.credit.AdditionalFilters.datePfr
        //     if (typeof this.User.pag.credit.AdditionalFilters.dateFssp !== 'undefined')this.credit.AdditionalFilters.dateFssp = this.User.pag.credit.AdditionalFilters.dateFssp
        //     if (typeof this.User.pag.credit.AdditionalFilters.number_ip !== 'undefined')this.credit.AdditionalFilters.number_ip = this.User.pag.credit.AdditionalFilters.number_ip
        //     if (typeof this.User.pag.credit.AdditionalFilters.pensioner !== 'undefined'){
        //       this.credit.AdditionalFilters.pensioner.length=0;
        //       if(typeof this.User.pag.credit.AdditionalFilters.pensioner_json!=='undefined')
        //         this.credit.AdditionalFilters.pensioner=JSON.parse(this.User.pag.credit.AdditionalFilters.pensioner_json)
        //       this.filterAll.statusGr=(this.credit.AdditionalFilters.pensioner.length==2)?true:false
        //
        //       /*
        //       this.User.pag.credit.AdditionalFilters.pensioner.forEach((val)=>{
        //           this.credit.AdditionalFilters.pensioner.push(val)
        //       })
        //       */
        //     }
        //
        //     if (typeof this.User.pag.credit.AdditionalFilters.typeCp !== 'undefined'){
        //       this.credit.AdditionalFilters.typeCp.length=0;
        //       if(typeof this.User.pag.credit.AdditionalFilters.typeCp_json!=='undefined')
        //         this.credit.AdditionalFilters.typeCp=JSON.parse(this.User.pag.credit.AdditionalFilters.typeCp_json)
        //     }
        //     this.filterAll.typeDelo=(this.credit.AdditionalFilters.typeCp.length==2)?true:false
        //     if (typeof this.User.pag.credit.AdditionalFilters.name_delo !== 'undefined'){
        //       this.credit.AdditionalFilters.name_delo=[];
        //       if(typeof this.User.pag.credit.AdditionalFilters.name_delo_json!=='undefined')
        //         this.credit.AdditionalFilters.name_delo=JSON.parse(this.User.pag.credit.AdditionalFilters.name_delo_json)
        //     }
        //     this.filterAll.nameDelo=(this.credit.AdditionalFilters.name_delo.length==this.VidRecoverInDebtorCreditArr.length)?true:false
        //     if (typeof this.User.pag.credit.AdditionalFilters.typeDebtor !== 'undefined'){
        //       this.credit.AdditionalFilters.typeDebtor.length=0;
        //       if(typeof this.User.pag.credit.AdditionalFilters.typeDebtor_json!=='undefined')
        //         this.credit.AdditionalFilters.typeDebtor=JSON.parse(this.User.pag.credit.AdditionalFilters.typeDebtor_json)
        //     }
        //     this.filterAll.typeDebtor=(this.credit.AdditionalFilters.typeDebtor.length==this.TypeDebtorInDebtorCreditArr.length)?true:false
        //     this.setCreditToUserPag(this.credit)
        //   }
        // },
    },

    mounted() {

        this.getFsspOtdelsListArr()
        this.getJudicialsListArr()
        this.getResponsibleUserInDebtorList()
        this.getRegion()
        this.getDataReestrsAndCession()
        this.getTypeDebtorInDebtorCreditArr().then(() => {
            // this.filterSetsTypeDebtor()
            // this.filterSetsNameDelo()
            this.additionFilterStay = this.additionFilterStayCheck()
            this.fillTypeDebtorArr()
            this.fillTypeVzArr()
            this.fillTypeDebtor()
            this.fillNameDelo()


        })
        this.getDataStatuss();
        this.gridApi = this.gridOptions.api
        this.getRecoverArrList();
        this.getRegCategoryList();
        // this.getDataUser().then((response)=>{
        //   this.loadCreditPag()
        //   this.getRecoverArrList().then((response)=>{
        //
        //     for (let i=0;i<this.RecoverArrList.length;i++){
        //
        //       if(this.RecoverArrList[i].id==this.credit.num_recover){
        //
        //         this.rec_id=this.RecoverArrList[i].name
        //       }
        //
        //     }
        //   })
        //
        //   for (let i=0;i<this.StatussArrAndAll.length;i++){
        //     if(this.StatussArrAndAll[i].id==this.credit.status){
        //       this.status=this.StatussArrAndAll[i].name
        //     }
        //
        //   }
        this.clearAdditionalFilters();
        // if(!Array.isArray(this.credit.AdditionalFilters.name_delo))
        // {
        //   this.credit.AdditionalFilters.name_delo=[]
        // }
        this.$root.$emit('set_filter_debtor_filter', this.credit.fields)
        // this.getSudActDataCredits(this.credit)
        // if(typeof this.credit.AdditionalFilters=='undefined'){
        //   this.credit.AdditionalFilters={
        //     pensioner:[],
        //     typeCp:[],
        //     typeDebtor:[],
        //     region: -1,
        //     idJud : -1,
        //     fssp : -1,
        //     dateSud : '',
        //     dateIsk : '',
        //     dateFns :'',
        //     dateResponseSa : '',
        //     dateBank : '',
        //     datePfr : '',
        //     dateFssp : '',
        //     name_delo:[],
        //     ip:'',
        //     id_user:null
        //   }
        // }
        this.additionFilterStay = this.additionFilterStayCheck()
        // })
        // this.additionFilterStay=this.additionFilterStayCheck()




    }
}
</script>
<style lang="scss">
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

.tabs_title {
    color: red;
    font-size: 40pt;
}

/*.ag-header-row{*/
/*height: 26px!important;*/
/*}*/
/*.ag-theme-material .ag-cell {*/
/*line-height:15px!important;*/
/*}*/
</style>