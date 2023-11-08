<template>
    <div id="page-user-list">
        <div class="vx-card p-6" style="max-height: 105vh;">
            <div class="mb-4 md:mb-0 mr-1 ag-grid-table-actions-left" style="margin-top: 15px">
                <div class="vx-row">
                    <div class="vx-col flex flex-wrap">
                    <vs-dropdown vs-trigger-click class="cursor-pointer flex" style="align-items: flex-start;">
                        <div class="cursor-pointer flex items-center justify-between font-medium" style="padding: 0.75rem !important;margin-top: 18px; margin-right: 10px; border: 1px solid #ccc;border-radius: 4px;">
                            <span class="mr-2">
                                {{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalFilesUpload - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalFilesUpload }} of {{ TotalFilesUpload }}
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

                    <div style="margin-right: 10px;">
                        <div class="centerx">
                            <vs-tooltip text="Статус загрузки" position="top" >
                                <h6 class="h6Blue mb-1">Статус загрузки</h6>
                            </vs-tooltip>
                        </div>
                        <v-select style="width: 230px;" :reduce="label => label.id" label="name" :options="StatusesUploadFiles" v-model="UploadAnswerFile.pag.upload_answer_files_status" @input="changeStatus"></v-select>
                    </div>
                    <div style="margin-right: 10px;">
                        <div class="centerx">
                            <vs-tooltip text="Вид документа" position="top" >
                                <h6 class="h6Blue mb-1">Вид документа</h6>
                            </vs-tooltip>
                        </div>
                        <v-select style="width: 280px;" :reduce="label => label.id" label="name" :options="TypesDcDocumentsDebtorAll" v-model="UploadAnswerFile.pag.doc_type" @input="changeType"></v-select>
                    </div>
                    <!--<div style="display: flex">-->
                    <!--                  <vs-tooltip bottom>-->
                    <div style="margin-right: 10px;">
                        <div class="centerx">
                            <vs-tooltip text="Дата документа" position="top" >
                                <h6 class="h6Blue mb-1">Дата документа</h6>
                            </vs-tooltip>
                        </div>
                        <vs-input type="date" class="uf_datepicker" v-model="UploadAnswerFile.pag.date_now_for_upload_files" @blur="changeDate" v-on:keyup.enter="$event.target.blur()" style="z-index: 2;" title="После ввода нажмите Enter"></vs-input>
                        <div><span style="color:red;font-size: 10pt">После ввода нажмите Enter</span></div>
                    </div>
                    <!--                    <template #tooltip>-->
                    <!--                      После ввода нажмите Enter-->
                    <!--                    </template>-->
                    <!--                  </vs-tooltip>-->
                    <vs-button class="mr-2 sm:mb-0 mb-2" style="margin-right: 10px;max-height: 40px;margin-top: 18px" @click="chooseTypeDoc()">Загрузить файлы
                    </vs-button>
                    <vs-button style="margin-right:10px;margin-top: 18px;max-height: 40px" color="success" class="pull-right" type="filled" @click="refreshTableAnswerFiles">Обновить
                    </vs-button>
                    <div style="margin-top: 18px">
                        <vs-dropdown vs-custom-content vs-trigger-click>
                            <vs-button style="margin-right: 10px;cursor: pointer;height: 40px;" color="success" class="pull-right" type="filled">Перезапуск ...</vs-button>
                            <vs-dropdown-menu>
                                <div>
                                    <vs-button style="margin-right: 10px;" color="primary" class="pull-right" type="filled" @click="reWorkingFiles">... обрабатываемых
                                    </vs-button>
                                </div>
                                <div style="margin-top: 10px">
                                    <vs-button style="margin-right: 10px;" color="danger" class="pull-right" type="filled" @click="reWorkingErrors">... ошибочных
                                    </vs-button>
                                </div>
                            </vs-dropdown-menu>
                        </vs-dropdown>
                    </div>
                    <vs-button color="danger" class="mr-2 sm:mb-0 mb-2" style="max-height: 40px;margin-top: 18px" @click="lookUploads()">История загрузок
                    </vs-button>
                    <vs-button class="mr-2 sm:mb-0 mb-2" style="max-height: 40px;margin-top: 18px; margin-right: 10px;" @click="clearFilter">Сбросить фильтры</vs-button>
                    
                    <settings-icon size="1.5x" class="custom-class" @click="showSettings()" style="cursor: pointer;margin-right: 10px;color: #3f51b5;margin-top: 27px"></settings-icon>
                    <search-icon v-if="showSearchBar" size="1.5x" class="custom-class" @click="showSearch" style="cursor: pointer;margin-right: 5px;color: red;margin-top: 27px"></search-icon>
                    <search-icon v-else size="1.5x" class="custom-class" @click="showSearch" style="cursor: pointer;margin-right: 5px;color: #3f51b5;margin-top: 27px"></search-icon>
                    
                    <vs-input id="filesUploadAnswer" multiple type="file" ref="fileUploadInput" class="w-full mb-base" label-placeholder="file" v-on:change="saveDocument($event)" style="display: none" />
                    <div v-if="showSearchBar" style="margin-top: 15px;display: flex">
                        <vs-input class="mb-4 md:mb-0 mr-4" v-model="UploadAnswerFile.pag.find_file" @input="refreshTableAnswerFiles" placeholder="Поиск по имени файла..." />
                        <vs-button style="margin-left: 10px;" color="danger" type="filled" @click="clearSearchBar">Очистить</vs-button>
                    </div>
                </div>

                <!--</div>-->
                </div>
            </div>
            <!--<div class="flex flex-wrap justify-between items-center">-->
            <!---->
            <!--</div>-->
            <!--<div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">-->
            <!--&lt;!&ndash;                    <div class="pull-right" style="margin-right: 10px">&ndash;&gt;-->
            <!--&lt;!&ndash;                        <img src="/loading.gif" v-if="UploadAnswerLoadingFlag" style="max-width: 40px; margin-top: 5px;">&ndash;&gt;-->
            <!--&lt;!&ndash;                    </div>&ndash;&gt;-->
            <!--&lt;!&ndash;<vs-button style="margin-right: 5px;" color="primary" class="pull-right" type="filled"&ndash;&gt;-->
            <!--&lt;!&ndash;@click="refreshTableAnswerFiles">Поиск&ndash;&gt;-->
            <!--&lt;!&ndash;</vs-button>&ndash;&gt;-->
            <!---->
            <!--</div>-->
            <div class="out-main">
                <ag-grid-vue 
                    ref="agGridTable" 
                    :components="components" 
                    :gridOptions="gridOptions" 
                    class="ag-theme-material w-100 my-4 ag-grid-table vh75" 
                    :columnDefs="columnDefs" 
                    :defaultColDef="defaultColDef" 
                    :rowData="UploadFilesArr" 
                    rowSelection="multiple" 
                    :rowDataChanged="onRowDataChanged" 
                    colResizeDefault="shift" 
                    :animateRows="true" 
                    :floatingFilter="false" 
                    :pagination="true" 
                    :paginationPageSize="paginationPageSize" 
                    :suppressPaginationPanel="true" 
                    enableBrowserTooltips="true" 
                    @rowDoubleClicked="onrowDoubleClicked" 
                    :enableRtl="$vs.rtl"
                    :overlayNoRowsTemplate="'Нет записей'">
                </ag-grid-vue>
                <transition name="fade">
                    <div class="tablePreloader outer-div" v-if="UploadAnswerLoadingFlag">
                        <img class="load-bar" src="/loading.gif">
                        <span>Идёт загрузка</span>
                    </div>
                </transition>

                
            </div>
            <vs-popup classContent="popup-example" :title="p_debtor_fio" :active.sync="popupActiveAnswerFile">
                <InFileAnswersDialog :file_data="file_data" @clousePop="clousePop" @refreshAfterSet="onRefreshAfterSet" @refreshAfterDelete="onRefreshAfterDelete"></InFileAnswersDialog>
            </vs-popup>
            <vs-popup classContent="popup-example" title="Настройки (для администраторов)" :active.sync="popupActiveSettings">
                <InFileSettingsDialog></InFileSettingsDialog>
            </vs-popup>
            <vs-popup classContent="popup-example" title="Тип документа" :active.sync="popupActiveTypeDoc">
                <div style="height: 400px">
                    <div style="width: 100%;">
                        Выберите тип документа для загрузки
                        <v-select class="w-50 " :reduce="label => label.id" label="name" :options="TypesDcDocumentsDebtor" v-model="typeDoc"></v-select>
                    </div>
                    <vs-checkbox style="margin-bottom: 15px;margin-top:10px" v-model="change_old" >Заменять ранее загруженные</vs-checkbox>
                    <div style="text-align: right; margin-top: 10px">
                        <vs-button class="sm:mb-0 mb-2" @click="chooseFilesAnswerSoc()">Загрузить
                        </vs-button>
                    </div>
                </div>
            </vs-popup>
            <vs-popup classContent="popup-example" title="Состояния загрузок" :active.sync="popupUploadFilesTasks">
                <UploadFilesProcess></UploadFilesProcess>
            </vs-popup>
            <vs-pagination :total="totalPages" :max="7" v-model="currentPage" />
        </div>
    </div>
</template>
<script>
import { VueCsvImport } from 'vue-csv-import';
import { AgGridVue } from 'ag-grid-vue'
import vSelect from 'vue-select'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import UploadFileStatus from './Render/UploadFileStatus.vue'
import UploadFileOper from "./Render/UploadFileOper.vue";
import UploadFio from "./Render/UploadFio.vue";
import InFileAnswersDialog from './InFileAnswersDialog.vue'
import InFileSettingsDialog from './InFileSettingsDialog.vue'
import UploadFilesProcess from "./UploadFilesProcess.vue";
import { SettingsIcon, UserXIcon, BookOpenIcon, SearchIcon, XIcon } from 'vue-feather-icons'

export default {
    components: {
        AgGridVue,
        vSelect,
        UploadFileStatus,
        VueCsvImport,
        UploadFio,
        InFileAnswersDialog,
        InFileSettingsDialog,
        SettingsIcon,
        UserXIcon,
        BookOpenIcon,
        UploadFileOper,
        SearchIcon,
        XIcon,
        UploadFilesProcess
    },
    data() {
        return {
            showSearchBar: false,
            typeDoc: null,
            change_old: false,
            popupActiveTypeDoc: false,
            popupActiveSettings: false,
            popupUploadFilesTasks: false,
            whileFolder: false,
            id_upload_state: null,
            from_vue: 'fromSudPrikazCancels',
            infoShowFlagP: false,
            popupActiveStateUploading: false,
            file_id: 0,
            file_data: [],
            what_from: 'fromAnswers',
            total_files_upl: 0,
            p_error: 0,
            p_error_text: '',
            p_file_data: [],
            p_date_file: '',
            p_name_answer_file: '',
            p_debtor_fio: '',
            t_started: false,
            t_finished: false,
            now_status: '',

            searchQuery: '',
            csv: [],
            // AgGrid
            gridApi: null,
            gridOptions: {},
            popupActiveAnswerFile: false,
            defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
            },
            columnDefs: [{
                    headerName: '',
                    field: 'id',
                    filter: true,
                    width: 30,
                    cellRendererFramework: 'UploadFileOper',
                    cellRendererParams: {
                        refresh_func: this.refreshTableAnswerFiles.bind(this)
                    }
                },
                {
                    headerName: 'Дата',
                    headerTooltip: 'Дата',
                    tooltipField: 'date_file',
                    field: 'date_file',
                    filter: true,
                    width: 100,
                },
                {
                    headerName: 'Заемщик',
                    headerTooltip: 'Заемщик',
                    tooltipField: 'debtor_fio',
                    field: 'debtor_fio',
                    filter: true,
                    width: 280,
                    cellRendererFramework: 'UploadFio'
                },
                {
                    headerName: 'Имя файла',
                    headerTooltip: 'Имя файла',
                    tooltipField: 'name_answer_file',
                    field: 'name_answer_file',
                    filter: true,
                    width: 380,
                },
                {
                    headerName: 'Статус',
                    headerTooltip: 'Статус',
                    tooltipField: 'status',
                    field: 'status',
                    filter: true,
                    width: 120,
                    cellRendererFramework: 'UploadFileStatus'
                },
                {
                    headerName: 'ФИО из файла',
                    headerTooltip: 'ФИО из файла',
                    tooltipField: 'full_fio',
                    field: 'full_fio',
                    filter: true,
                    width: 280,
                },
                {
                    headerName: 'Тип файла',
                    headerTooltip: 'Тип файла',
                    tooltipField: 'doc_type_name',
                    field: 'doc_type_name',
                    filter: true,
                    width: 280,
                },
                {
                    headerName: 'ID Кредит',
                    headerTooltip: 'ID Кредит',
                    tooltipField: 'credits',
                    field: 'credits',
                    filter: true,
                    width: 100,
                },
                {
                    headerName: 'ID внешний',
                    headerTooltip: 'ID внешний',
                    tooltipField: 'id_outs',
                    field: 'id_outs',
                    filter: true,
                    width: 100,
                },
            ],
            components: {
                UploadFileStatus,
                UploadFileOper,
                UploadFio
            }
        }
    },

    computed: {
        // channel(){
        //     return this.$echo.join("updateUploadFile-channel");
        // },
        totalPages() {
            if (this.gridApi)
                return Math.ceil(this.TotalFilesUpload / this.paginationPageSize)
            else return 0
        },
        statusSocAnswer() {
            return this.UploadAnswerFile.pag.upload_answer_files_status
        },
        paginationPageSize() {
            return this.UploadAnswerFile.pag.upload_answer_files
        },
        ...mapGetters([
            'TotalFilesUpload', 'UploadAnswerLoadingFlag', 'UploadFilesArr', 'UploadAnswerFile', 'TypesDcDocumentsDebtor',
            'TypesDcDocumentsDebtorAll', 'StatusesUploadFiles'

        ]),
        currentPage: {
            get() {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
            },
            set(val) {
                this.setQueryUploadFilesOffset(val - 1);
                this.getDataFilesUpload();
                this.gridApi.paginationGoToPage(val - 1);
            }
        },

    },
    methods: {
        clearFilter() {
            this.UploadAnswerFile.pag.upload_answer_files_status = 'all'
            this.UploadAnswerFile.pag.doc_type = 'all'
            this.UploadAnswerFile.pag.date_now_for_upload_files = null
            this.getDataFilesUpload()
        },

        changeType() {
            if (this.UploadAnswerFile.pag.doc_type == null) {
                this.UploadAnswerFile.pag.doc_type = 'all';
            }
            this.refreshTableAnswerFiles();
        },
        changeStatus() {
            if (this.UploadAnswerFile.pag.upload_answer_files_status == null) {
                this.UploadAnswerFile.pag.upload_answer_files_status = 'all';
            }
            this.refreshTableAnswerFiles();
        },
        lookUploads() {
            this.getUploadFilesTasks();
            this.popupUploadFilesTasks = true;
        },
        onRefreshAfterDelete() {
            this.getDataFilesUpload();
            this.popupActiveAnswerFile = false;
        },
        clousePop(event) {
            this.popupActiveAnswerFile = false;
            setTimeout(function() { this.$router.push(event) }.bind(this), 1000)



        },

        clearSearchBar() {
            this.UploadAnswerFile.pag.find_file = '';
            this.refreshTableAnswerFiles();
        },
        showSearch() {
            this.showSearchBar = !this.showSearchBar;
            if (!this.showSearchBar) {
                this.clearSearchBar();
            }
        },
        reWorkingErrors() {
            this.goReWorkingErrors().then((response) => {
                if (response.result) {
                    this.$vs.notify({
                        title: 'Сообщение',
                        text: 'Перезапуск запущен',
                        color: 'success',
                        position: 'top-center'
                    })
                } else {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка при запуске',
                        color: 'danger',
                        position: 'top-center'
                    })
                }
            }).catch(error => {
                this.$vs.notify({
                    title: 'Ошибка',
                    text: error.message,
                    color: 'danger',
                    position: 'top-center'
                })
            });
        },
        reWorkingFiles() {
            this.goReWorkingFiles().then((response) => {
                if (response.result) {
                    this.$vs.notify({
                        title: 'Сообщение',
                        text: 'Перезапуск запущен',
                        color: 'success',
                        position: 'top-center'
                    })
                } else {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка при запуске',
                        color: 'danger',
                        position: 'top-center'
                    })
                }
            }).catch(error => {
                this.$vs.notify({
                    title: 'Ошибка',
                    text: error.message,
                    color: 'danger',
                    position: 'top-center'
                })
            });
        },
        reload(e) {
            this.getDataFilesUpload();
        },
        showSettings() {
            this.getRegSudPrikazsList('');
            this.popupActiveSettings = true;
        },
        changeDate() {
            this.getDataFilesUpload();
        },
        changePag(pag) {
            this.UploadAnswerFile.pag.upload_answer_files = pag;
            this.getDataFilesUpload();
            this.setQueryUploadFilesLimit(pag);
            this.gridApi.paginationSetPageSize(pag);
        },
        refreshTableAnswerFiles() {
            this.getDataFilesUpload();
        },
        chooseFilesAnswerSoc: function() {
            if (this.typeDoc != null) {
                document.getElementById("filesUploadAnswer").click()
            } else {
                this.$vs.notify({
                    title: 'Сообщение',
                    text: 'Выберите тип документа',
                    color: 'primary',
                    position: 'top-center'
                })
            }
        },
        chooseTypeDoc() {
            this.getTypesDcDocuments();
            this.popupActiveTypeDoc = true;
        },
        saveDocument(evt) {
            this.checkFuncDocType(this.typeDoc).then((response) => {
                if (response.result) {
                    this.popupActiveTypeDoc = false;
                    this.$vs.notify({
                        title: 'Сообщение',
                        text: 'Загрузка начата',
                        color: 'success',
                        position: 'top-center'
                    })
                    this.saveUploadFilesForImportServ({
                        files: evt.target.files,
                        type_doc: this.typeDoc,
                        change_old: this.change_old
                    })
                } else {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: response.err_message,
                        color: 'danger',
                        position: 'top-center'
                    })
                }
            }).catch(error => {
                this.$vs.notify({
                    title: 'Ошибка',
                    text: error.message,
                    color: 'danger',
                    position: 'top-center'
                })
            });
        },
        onRefreshAfterSet(par_vals) {
            this.p_debtor_fio = par_vals.fio_debtor;
            this.getUploadFileData({ file_id: par_vals.file_id }).then((response) => {
                if (response.result) {
                    this.getDataFilesUpload();
                    this.popupActiveAnswerFile = false;
                    // this.getCreditsForFileData(par_vals.file_id);
                    // this.file_data = response.file_data;
                    // this.popupActiveAnswerFile = true;
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
        onrowDoubleClicked(event) {


            this.p_debtor_fio = event.data.debtor_fio;
            this.file_id = event.data.id;
            this.getUploadFileData({ file_id: this.file_id }).then((response) => {
                if (response.result) {
                    this.file_data = response.file_data;
                    this.popupActiveAnswerFile = true;
                    if (this.file_data.status === 2) {
                        // this.getDebtorsForAnswerSocData(this.file_data.p_file_data.error_fio);
                        this.getNearCreditsForAnswerSocData(this.file_id);
                    }
                    this.getCreditsForFileData(this.file_id);
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
        ...mapMutations([
            'setQueryUploadFilesLimit', 'setQueryUploadFilesOffset'
        ]),
        ...mapActions([
            'getDataFilesUpload', 'getRegSudPrikazsList', 'getUploadDataFilesInFolderTimes',
            'saveUploadFilesForImportServ', 'getTypesDcDocuments', 'getUploadFileData', 'goReWorkingErrors',
            'getNearCreditsForAnswerSocData', 'getCreditsForFileData', 'getCountFilesInDb', 'goReWorkingFiles',
            'checkFuncDocType', 'getUploadFilesTasks'
        ]),
        updateSearchQuery(val) {
            this.gridApi.setQuickFilter(val)
        },
        onRowDataChanged() {
            Vue.nextTick(() => {
                this.gridOptions.api.sizeColumnsToFit();
            });
        },
    },
    mounted() {
        // this.channel.listen(".UpdateUploadFile", (e) => this.reload(e));
        this.gridApi = this.gridOptions.api
        this.getDataFilesUpload();
        this.getTypesDcDocuments();
    }
}
</script>
<style lang="scss">
.uf_datepicker .vs-input--input.normal{
    padding: 0.58rem 0.7rem !important;
}
.vs-popup {
    display: inline-table;
}

/*.vs-popup {*/
/*min-width: 600px;*/
/*}*/
.err_mess {
    color: red;
}

.doc_type {
    cursor: pointer;
    color: black;
}

.doc_type:hover {
    color: green;
}

.succs_mess {
    color: green;
}

.vh75 {
    max-height: 75vh;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
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
</style>