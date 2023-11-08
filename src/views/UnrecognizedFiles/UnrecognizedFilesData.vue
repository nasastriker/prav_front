<template>
    <div id="page-user-list">
        <div class="vx-card p-6 no-shadow">
            <div style="margin-top: 10px;display: flex;">
                <span class="text-primary cursor-pointer">
                    <arrow-left-icon style="cursor: pointer;" size="1.5x" class="custom-class" @click="backToLists"></arrow-left-icon>
                </span>
                <div v-if="UnrecognizedFilesRecordDeleteLoadingFlag" style="display: flex;"><img src="/loading.gif" style="max-width: 40px; margin-left: 20px;margin-bottom: 15px;margin-top: -5px;"><span style="margin-left: 10px;">Удаление записи</span></div>
                <div v-if="UnrecognizedFilesRecordBindingLoadingFlag" style="display: flex;"><img src="/loading.gif" style="max-width: 40px; margin-left: 20px;margin-bottom: 15px;margin-top: -5px;"><span style="margin-left: 10px;">Привязка записи к кредиту</span></div>
                <div v-if="UnrecognizedFilesRecordEndWorkLoadingFlag" style="display: flex;"><img src="/loading.gif" style="max-width: 40px; margin-left: 20px;margin-bottom: 15px;margin-top: -5px;"><span style="margin-left: 10px;">Завершение работы</span></div>
                <div v-if="UnrecognizedFilesHistoryListLoadingFlag" style="display: flex;"><img src="/loading.gif" style="max-width: 40px; margin-left: 20px;margin-bottom: 15px;margin-top: -5px;"><span style="margin-left: 10px;">Сбор истории</span></div>
                <vs-button v-if="recordData.record_status == 0" style="margin-left: auto" color="success" type="filled" @click="endWorkShowPopup">Завершить работу</vs-button>
                <vs-button v-if="recordData.record_status == 0" style="margin-left: 15px" color="danger" type="filled" @click="deleteRecord">Удалить</vs-button>
                <vs-button v-if="recordData.record_status == 0" style="margin-left: 15px" color="primary" type="filled" @click="showHistory">История</vs-button>
                <vs-button v-else style="margin-left: auto" color="primary" type="filled" @click="showHistory">История</vs-button>
            </div>
            <div class="uf-record-info">
                <div>
                    <div style="display: flex;">
                        <h4><b>ID Записи: </b>{{ recordData.id }}</h4>
                        <h4 style="margin-left: auto" v-if="recordData.record_status == 0">
                            <b v-if="recordData.hand == 0">Получено</b>
                            <b v-else>Создано вручную</b>
                        </h4>
                        <h4 style="color: green;margin-left: auto" v-if="recordData.record_status == 1"><b>Завершено ({{ recordData.updated_at_norm }})</b></h4>
                        <h4 style="color: red;margin-left: auto" v-if="recordData.record_status == 2"><b>Удалено ({{ recordData.updated_at_norm }})</b></h4>
                    </div>
                    <div style="display: flex;">
                        <h4>
                            <b>Заемщик:</b> <span class="hover:text-primary cursor-pointer" style="color:blue;text-decoration: underline;" @click="toCredit">{{ recordData.debtor_fio }}</span>
                        </h4>
                        <div v-if="recordData.debtor_fio != 'Не известно'" class="uf-record-status" title="Статус"><b>{{ recordData.credit_status }}</b></div>
                        <div v-if="recordData.record_status == 0">
                            <span v-if="recordData.id_credit == null" style="margin-left: 20px" class="hover:text-primary cursor-pointer" @click="popupRecordToCredit=!popupRecordToCredit">[ привязать ]</span>
                            <span v-else style="margin-left: 20px" class="hover:text-primary cursor-pointer" @click="popupRecordToCredit=!popupRecordToCredit">[ перепривязать ]</span>
                        </div>
                    </div>
                    <h4 style="margin-top: 10px"><b>Источник:</b> {{ recordData.from_type_norm }}</h4>
                    <h4>
                        <b v-if="recordData.hand == 0">Дата получения:</b>
                        <b v-else>Дата создания:</b>
                        {{ recordData.date_receive_norm }}
                    </h4>
                </div>
                <vs-button v-if="recordData.record_status == 0" style="margin-top: 15px" color="success" type="filled" @click="showPopupComment"> + Добавить комментарий</vs-button>
                <div style="margin-top: 15px;" v-if="recordData.comment_exist">
                    <b>Комментарии:</b><br>
                    <div style="margin-top: 5px" v-for="comment in recordData.comments">
                        <span style="color: blue"><b>{{ comment.user }} ({{ comment.time }}):</b></span> {{ comment.comment }} <span v-if="comment.can_delete && recordData.record_status == 0" class="hover:text-primary cursor-pointer" @click="deleteComment(comment.id)">[ удалить ]</span>
                    </div>
                </div>
            </div>
            <input type="file" multiple ref="fileUfInput" class="hidden" accept=".*" @change="changeFilePdf($event)">
            <div style="margin-top: 30px;display: flex;" v-if="recordData.record_status == 0">
                <vs-checkbox v-model="activeFilesOnly" @input="updateFiles">
                    Показать только активные файлы
                </vs-checkbox>
                <vs-button style="margin-left: auto" color="success" type="filled" @click="updateFiles">Обновить</vs-button>
                <vs-button style="margin-left: 10px" color="primary" type="filled" @click="mergeFiles">Собрать все PDF-файлы в один</vs-button>
                <vs-button style="margin-left: 10px" color="success" type="filled" @click="addFile"> + Добавить файлы</vs-button>
                <vs-button style="margin-left: 10px" color="danger" type="filled" @click="deleteAllFiles">Удалить все файлы</vs-button>
            </div>
            <div class="out-main-ufd">
                <ag-grid-vue style="height: 400px" ref="agGridTable" :components="components" :gridOptions="gridOptions" class="ag-theme-material w-100 my-4 ag-grid-table" :columnDefs="columnDefs" :defaultColDef="defaultColDef" :rowData="UnrecognizedFilesArr" rowSelection="multiple" :rowDataChanged="onRowDataChanged" colResizeDefault="shift" :animateRows="true" :floatingFilter="false" :pagination="true" :paginationPageSize="paginationPageSize" :suppressPaginationPanel="true" @grid-size-changed="onGridSizeChanged" :overlayNoRowsTemplate="'Нет файлов'" :enableRtl="$vs.rtl">
                </ag-grid-vue>
                <transition name="fade">
                    <div class="outer-div-ufd" v-if="UnrecognizedFilesArrLoadingFlag"><img class="load-bar" src="/loading.gif"></div>
                </transition>
            </div>
            <vs-pagination :total="totalPages" :max="7" v-model="currentPage" />
        </div>
        <vs-popup classContent="popup-example" :title="'Перенос файла '+fileData.file_name" :active.sync="popupFileToDebtor">
            <div>Присвоить тип документа</div>
            <div class="mt-2">
                <v-select class="w-50" :reduce="label => label" label="name" :options="TypesDcDocumentsDebtor" v-model="docType" @input="docTypeChange"></v-select>
            </div>
            <div v-if="docTypeMany == 0" class="unrecognized_files_move_file_banner">
                <span><b>Внимание!</b> Под данным типом документа можно сохранить только один документ, при переносе данного файла уже существующий, если он имеется, будет перезаписан,
                    а также данный файл будет перезаписан при переносе следующего</span>
            </div>
            <div style="margin-top: 20px;display: flex;margin-bottom: 300px">
                <vs-button style="margin-left: auto;" color="danger" type="filled" @click="moveOneFileToDebtor">Перенести</vs-button>
            </div>
        </vs-popup>
        <vs-popup classContent="popup-example" title="Завершение работы" :active.sync="popupEndWork">
            <div class="unrecognized_files_move_file_banner">
                <span><b>Внимание!</b> Перед нажатием Завершить: если необходимо сменить статус кредита
                    после завершения работы, то установите галку Сменить статус кредита после завершения работы и
                    выберите статус; выберите PDF-файлы для переноса (если таковые есть),
                    если файлы для переноса не нужны, то снимите выделение файлов. Затем нажмите Завершить.
                </span>
            </div>
            <div style="margin-top: 15px">
                <vs-checkbox v-model="changeStatusFlag">
                    Сменить статус кредита после завершения работы
                </vs-checkbox>
                <div style="margin-top: 15px;">Статус</div>
                <div>
                    <v-select v-if="changeStatusFlag" class="w-50" :reduce="label => label.id" label="name" :options="StatussArr" v-model="idStatus"></v-select>
                    <v-select v-else disabled class="w-50"></v-select>
                </div>
            </div>
            <div v-if="pdfFilesCount > 0">
                <div style="margin-top: 15px;margin-bottom: 15px;">Оставшихся PDF-файлов: {{ pdfFilesCount }} </div>
                <div style="margin-top: 15px;">Выберите файлы для переноса: </div>
                <div v-for="pdf_file in pdfFilesData" style="margin-top: 5px;">
                    <div v-if="pdf_file.choice_flag">
                        <vs-checkbox v-model="pdf_file.choice_flag" @input="changeChoiceFlag">
                            {{ pdf_file.file_name }}
                        </vs-checkbox>
                    </div>
                    <div v-else>
                        <vs-checkbox style="color: #c2c2c2" v-model="pdf_file.choice_flag" @input="changeChoiceFlag">
                            {{ pdf_file.file_name }}
                        </vs-checkbox>
                    </div>
                </div>
                <div style="margin-top: 15px;">Присвоить тип документа переносимым PDF-файлам</div>
                <div v-if="moveFilesFlag">
                    <div>
                        <v-select class="w-50" :reduce="label => label" label="name" :options="TypesDcDocumentsDebtor" v-model="docType" @input="docTypeChange"></v-select>
                    </div>
                    <div v-if="docTypeMany == 0" class="unrecognized_files_move_file_banner">
                        <span><b>Внимание!</b> Под данным типом документа можно сохранить только один документ, при переносе данного файла уже существующий, если он имеется, будет перезаписан,
                            а также данный файл будет перезаписан при переносе следующего</span>
                    </div>
                </div>
                <div v-else>
                    <v-select disabled class="w-50"></v-select>
                    <div style="color: red">Файлы для переноса не выбраны</div>
                </div>
            </div>
            <div v-else>
                <h5 style="margin-top: 15px;">Оставшихся PDF-файлов нет</h5>
            </div>
            <div style="margin-top: 20px;display: flex;margin-bottom: 300px">
                <vs-button style="margin-left: auto;" color="danger" type="filled" @click="endWork">Завершить</vs-button>
            </div>
        </vs-popup>
        <vs-popup classContent="popup-example" title="Комментарий" :active.sync="popupComment">
            <vs-textarea class="w-100" rows="10" style="min-height: 200px;" v-model="commentData"></vs-textarea>
            <div style="margin-top: 20px;display: flex;">
                <vs-button style="margin-left: auto;" color="success" type="filled" @click="addComment">Добавить</vs-button>
            </div>
        </vs-popup>
        <vs-popup fullscreen classContent="popup-example" title="Привязка записи к кредиту" :active.sync="popupRecordToCredit">
            <RecordToCredit @recordToCreditRun="recordToCreditRun"></RecordToCredit>
        </vs-popup>
        <vs-popup fullscreen classContent="popup-example" title="История" :active.sync="popupHistory">
            <UnrecognizedFilesHistory></UnrecognizedFilesHistory>
        </vs-popup>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { ArrowLeftIcon } from 'vue-feather-icons';
import OpenStatusFiles from "./Render/OpenStatusFiles.vue";
import OperFiles from "./Render/OperFiles.vue";
import OpenFileLink from "./Render/OpenFileLink.vue";
import OpenFileLinkOrig from "./Render/OpenFileLinkOrig.vue";
import OpenFileLinkZip from "./Render/OpenFileLinkZip.vue";
import OpenComment from "./Render/OpenComment.vue";
import OpenFileSize from "./Render/OpenFileSize.vue";
import RecordToCredit from "../Debtor/DebtorTab/Render/RecordToCredit.vue";
import UnrecognizedFilesHistory from "./Render/UnrecognizedFilesHistory.vue";
export default {
    components: {
        ArrowLeftIcon,
        OpenStatusFiles,
        OperFiles,
        OpenFileLink,
        OpenFileLinkOrig,
        OpenFileLinkZip,
        OpenComment,
        OpenFileSize,
        RecordToCredit,
        UnrecognizedFilesHistory
    },
    data() {
        return {
            commentData: null,
            docType: null,
            idStatus: null,
            fileData: {},
            pdfFilesData: {},
            pdfFilesCount: 0,
            docTypeMany: 1,
            popupFileToDebtor: false,
            activeFilesOnly: false,
            popupHistory: false,
            popupEndWork: false,
            popupComment: false,
            popupRecordToCredit: false,
            changeStatusFlag: false,
            moveFilesFlag: true,
            recordData: {},
            gridApi: null,
            gridOptions: {},
            defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMenu: true
            },
            columnDefs: [{
                    headerName: 'Имя файла',
                    field: 'file_name',
                    filter: true,
                    width: 180,
                    cellRendererFramework: 'OpenFileLink'
                },
                {
                    headerName: '',
                    field: 'file_size',
                    filter: true,
                    width: 40,
                    cellRendererFramework: 'OpenFileSize'
                },
                {
                    headerName: 'Комментарий',
                    field: 'comment',
                    filter: true,
                    width: 140,
                    cellRendererFramework: 'OpenComment'
                },
                {
                    headerName: 'Оригинал',
                    field: 'file_name_orig',
                    filter: true,
                    width: 120,
                    cellRendererFramework: 'OpenFileLinkOrig'
                },
                {
                    headerName: 'Из архива',
                    field: 'zip_name',
                    filter: true,
                    width: 120,
                    cellRendererFramework: 'OpenFileLinkZip'
                },
                {
                    headerName: 'Статус',
                    field: 'status',
                    filter: true,
                    width: 70,
                    cellRendererFramework: 'OpenStatusFiles'
                },
                {
                    headerName: '',
                    field: 'status',
                    filter: true,
                    width: 50,
                    cellRendererFramework: 'OperFiles',
                    cellRendererParams: {
                        questionDelete: this.questionDelete.bind(this),
                        questionToDebtor: this.questionToDebtor.bind(this)
                    }
                },
            ],
            components: {
                OpenStatusFiles,
                OperFiles,
                OpenFileLinkOrig,
                OpenFileLinkZip,
                OpenFileSize
            }
        }
    },
    mounted() {
        this.gridApi = this.gridOptions.api;
        this.getUnrecognizedFilesRecordData(this.$route.params.id).then((response) => {
            if (response.result) {
                this.recordData = response.data;
                this.getTypesDcDocuments();
                this.getDataStatuss();
                this.getUnrecognizedFilesArr({ id_record: this.$route.params.id, activeFilesOnly: this.activeFilesOnly });
            } else {
                this.$vs.notify({
                    title: 'Ошибка',
                    text: response.error,
                    color: 'danger',
                    position: 'top-center'
                })
            }
        });
    },
    computed: {
        totalPages() {
            if (this.gridApi)
                return Math.ceil(this.UnrecognizedFilesArrTotal / this.paginationPageSize)
            else return 0
        },
        paginationPageSize() {
            if (this.gridApi) return this.gridApi.paginationGetPageSize()
            else return 100
        },
        currentPage: {
            get() {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                else return 1
            },
            set(val) {
                this.gridApi.paginationGoToPage(val - 1)
            }
        },
        ...mapGetters([
            'UnrecognizedFilesArr', 'UnrecognizedFilesArrTotal', 'TypesDcDocumentsDebtor', 'UnrecognizedFilesArrLoadingFlag',
            'UnrecognizedFilesRecordDeleteLoadingFlag', 'StatussArr', 'UnrecognizedFilesRecordBindingLoadingFlag',
            'UnrecognizedFilesRecordEndWorkLoadingFlag', 'UnrecognizedFilesHistoryListLoadingFlag'
        ]),
    },
    methods: {
        showHistory() {
            this.getUnrecognizedFilesHistory(this.$route.params.id).then((response) => {
                if (response.result) {
                    this.popupHistory = true;
                }
            });
        },

        recordToCreditRun(id_credit) {
            this.popupRecordToCredit = false;
            this.setUnrecognizedFilesRecordToCredit({ id_record: this.$route.params.id, id_credit: id_credit }).then((response) => {
                if (response.result) {
                    this.getUnrecognizedFilesRecordData(this.$route.params.id).then((response_record) => {
                        if (response_record.result) {
                            this.recordData = response_record.data;
                        }
                    });
                } else {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: response.error,
                        color: 'danger',
                        position: 'top-center'
                    })
                }
            })
        },

        changeChoiceFlag() {
            let flag = false;

            for (var i = 0; i < this.pdfFilesData.length; i++) {
                if (this.pdfFilesData[i].choice_flag) {
                    flag = true;
                }
            }

            this.moveFilesFlag = flag;
        },

        endWorkShowPopup() {
            if (this.recordData.id_credit != null) {
                this.getAllPdfUnrecognizedFiles(this.$route.params.id).then((response) => {
                    if (response.result) {
                        this.pdfFilesData = response.data;
                        this.pdfFilesCount = response.count;
                        this.changeChoiceFlag();
                        this.popupEndWork = true;
                    } else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: response.error,
                            color: 'danger',
                            position: 'top-center'
                        })
                    }
                })
            } else {
                this.$vs.notify({
                    title: 'Сообщение',
                    text: 'Привяжите запись к кредиту',
                    color: 'primary',
                    position: 'top-center'
                })
            }
        },
        deleteAllFiles() {
            this.$vs.dialog({
                type: 'confirm',
                color: 'red',
                title: 'Удаление файлов',
                text: 'Вы действительно хотите удалить все файлы?',
                accept: () => {
                    this.deleteAllUnrecognizedFiles(this.$route.params.id).then((response) => {
                        if (response.result) {
                            this.$vs.notify({ title: 'Сообщение', text: 'Файлы удалены', color: 'success', position: 'top-center' })
                            this.getUnrecognizedFilesArr({ id_record: this.$route.params.id, activeFilesOnly: this.activeFilesOnly });
                        } else {
                            this.$vs.notify({
                                title: 'Ошибка',
                                text: response.error,
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
                acceptText: 'Удалить',
                cancelText: 'Отмена'
            })
        },

        deleteRecord() {
            this.$vs.dialog({
                type: 'confirm',
                color: 'red',
                title: 'Удаление записи',
                text: 'Вы действительно хотите удалить запись? Все оставшиеся необработанные файлы будут удалены',
                accept: () => {
                    this.deleteUnrecognizedFilesRecord(this.$route.params.id).then((response) => {
                        if (response.result) {
                            this.$vs.notify({ title: 'Сообщение', text: 'Запись удалена', color: 'success', position: 'top-center' })
                            this.$router.push('/unrecognized_files');
                        } else {
                            this.$vs.notify({
                                title: 'Ошибка',
                                text: response.error,
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
                acceptText: 'Удалить',
                cancelText: 'Отмена'
            })
        },
        updateFiles() {
            this.getUnrecognizedFilesArr({ id_record: this.$route.params.id, activeFilesOnly: this.activeFilesOnly });
        },
        showPopupComment() {
            this.commentData = null;
            this.popupComment = true;
        },
        deleteComment(id_comment) {
            this.deleteUnrecognizedFilesRecordComment({
                id_record: this.$route.params.id,
                id_comment: id_comment
            }).then((response) => {
                if (response.result) {
                    this.getUnrecognizedFilesRecordData(this.$route.params.id).then((response_record) => {
                        if (response_record.result) {
                            this.recordData = response_record.data;
                        }
                    });
                } else {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Не удалось удалить комментарий',
                        color: 'danger',
                        position: 'top-center'
                    })
                }
            })
        },
        addComment() {
            let flag = true;

            if (this.commentData == null || this.commentData.trim() == '') {
                flag = false;
            }

            if (flag) {
                this.addUnrecognizedFilesRecordComment({
                    id_record: this.$route.params.id,
                    comment_data: this.commentData
                }).then((response) => {
                    if (response.result) {
                        this.popupComment = false;
                        this.getUnrecognizedFilesRecordData(this.$route.params.id).then((response_record) => {
                            if (response_record.result) {
                                this.recordData = response_record.data;
                            }
                        });
                    } else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Не удалось добавить комментарий',
                            color: 'danger',
                            position: 'top-center'
                        })
                    }
                })
            } else {
                this.$vs.notify({
                    title: 'Сообщение',
                    text: 'Введите текст комментария',
                    color: 'primary',
                    position: 'top-center'
                })
            }
        },
        mergeFiles() {
            this.$vs.dialog({
                type: 'confirm',
                color: 'blue',
                title: 'Сборка всех PDF-файлов в один',
                text: 'Вы действительно хотите собрать все PDF-файлы в один? Все файлы, которые войдут в общий файл и их оригиналы будут удалены',
                accept: () => {
                    this.mergeUnrecognizedFiles(this.$route.params.id).then((response) => {
                        if (response.result) {
                            this.$vs.notify({ title: 'Сообщение', text: 'Файлы собраны в один файл ' + response.merge_file_name, color: 'success', position: 'top-center' })
                            this.getUnrecognizedFilesArr({ id_record: this.$route.params.id, activeFilesOnly: this.activeFilesOnly });
                        } else {
                            this.$vs.notify({
                                title: 'Ошибка',
                                text: response.error,
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
                acceptText: 'Собрать',
                cancelText: 'Отмена'
            })
        },
        addFile() {
            this.$refs.fileUfInput.click()
        },
        changeFilePdf(evt) {
            this.saveUnrecognizedFilesForImport({ files: evt.target.files, id_record: this.$route.params.id }).then((response) => {
                if (response.result) {
                    this.updateFiles();
                    this.$vs.notify({ title: 'Сообщение', text: 'Файлы загружены', color: 'success', position: 'top-center' })
                    this.$refs['fileUfInput'].value = null
                } else {
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: response.error,
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

        moveOneFileToDebtor() {
            let flag = true;

            if (this.docType == null) {
                flag = false;
            }

            if (this.fileData == null) {
                flag = false;
            }

            if (flag) {
                this.moveOneUnrecognizedFileToDebtor({ fileData: this.fileData, docType: this.docType }).then((response) => {
                    if (response.result) {
                        this.getUnrecognizedFilesArr({ id_record: this.$route.params.id, activeFilesOnly: this.activeFilesOnly });
                        this.popupFileToDebtor = false;
                        this.$vs.notify({ title: 'Сообщение', text: 'Файл перенесен', color: 'success', position: 'top-center' })
                    } else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: response.error,
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
            } else {
                this.$vs.notify({
                    title: 'Ошибка',
                    text: 'Заполните необходимые поля',
                    color: 'danger',
                    position: 'top-center'
                })
            }
        },
        docTypeChange() {
            if (this.docType == null) {
                this.docTypeMany = 1;
            } else {
                this.docTypeMany = this.docType.many;
            }
        },
        questionToDebtor(data) {
            if (this.recordData.id_credit != null) {
                this.fileData = data;
                this.popupFileToDebtor = true;
            } else {
                this.$vs.notify({
                    title: 'Сообщение',
                    text: 'Привяжите запись к кредиту',
                    color: 'primary',
                    position: 'top-center'
                })
            }
        },
        toCredit() {
            if (this.recordData.id_credit != null) {
                this.$router.push('/debtors/' + this.recordData.id_credit);
            } else {
                if (this.recordData.record_status == 0) {
                    this.popupRecordToCredit = true;
                }
            }
        },
        questionDelete(data) {
            this.$vs.dialog({
                type: 'confirm',
                color: 'red',
                title: 'Удаление файлов:' + (data.can_delete_file_name == 1 ? ' ' + data.file_name : '') + (data.can_delete_file_name_orig == 1 ? ' ' + data.file_name_orig : '') + (data.to_delete_zip == 1 ? ' ' + data.zip_name : ''),
                text: 'Вы действительно хотите удалить файлы:' + (data.can_delete_file_name == 1 ? ' ' + data.file_name : '') + (data.can_delete_file_name_orig == 1 ? ' ' + data.file_name_orig : '') + (data.to_delete_zip == 1 ? ' ' + data.zip_name : '') + '?',
                accept: () => {
                    this.deleteOneUnrecognizedFile(data.id).then((response) => {
                        if (response.result) {
                            this.getUnrecognizedFilesArr({ id_record: this.$route.params.id, activeFilesOnly: this.activeFilesOnly });
                            this.$vs.notify({ title: 'Сообщение', text: 'Файл удален', color: 'success', position: 'top-center' })
                        } else {
                            this.$vs.notify({ title: 'Сообщение', text: 'Ошибка при удалении', color: 'danger', position: 'top-center' })
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
                acceptText: 'Удалить',
                cancelText: 'Отмена'
            })
        },
        endWork() {
            let flag = true;

            if (this.pdfFilesCount > 0 && this.moveFilesFlag && this.docType == null) {
                flag = false;
            }

            if (this.changeStatusFlag && this.idStatus == null) {
                flag = false;
            }

            if (flag) {
                this.endWorkUnrecognizedFilesRecord({
                    id_record: this.$route.params.id,
                    type_doc: this.docType,
                    move_files_flag: this.moveFilesFlag,
                    pdf_files_data: this.pdfFilesData,
                    change_status_flag: this.changeStatusFlag,
                    id_status: this.idStatus
                }).then((response) => {
                    if (response.result) {
                        this.$vs.notify({ title: 'Сообщение', text: 'Работа завершена', color: 'success', position: 'top-center' })
                        this.$router.push('/unrecognized_files');
                    } else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: response.error,
                            color: 'danger',
                            position: 'top-center'
                        })
                    }
                })
            } else {
                this.$vs.notify({
                    title: 'Ошибка',
                    text: 'Заполните необходимые поля',
                    color: 'danger',
                    position: 'top-center'
                })
            }
        },
        backToLists() {
            this.$router.back()
        },
        updateSearchQuery(val) {
            this.gridApi.setQuickFilter(val)
        },
        onRowDataChanged() {
            Vue.nextTick(() => {
                this.gridOptions.api.sizeColumnsToFit();
            });
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
        close() {
            this.$router.back()
        },
        ...mapActions([
            'getUnrecognizedFilesArr', 'getUnrecognizedFilesRecordData', 'endWorkUnrecognizedFilesRecord',
            'deleteOneUnrecognizedFile', 'getTypesDcDocuments', 'moveOneUnrecognizedFileToDebtor',
            'saveUnrecognizedFilesForImport', 'mergeUnrecognizedFiles', 'addUnrecognizedFilesRecordComment',
            'deleteUnrecognizedFilesRecordComment', 'deleteUnrecognizedFilesRecord', 'deleteAllUnrecognizedFiles',
            'getAllPdfUnrecognizedFiles', 'getDataStatuss', 'setUnrecognizedFilesRecordToCredit',
            'getUnrecognizedFilesHistory'
        ]),
    },
}
</script>
<style lang="scss">
.uf-record-info{
    h4{
        color: #626262;
        font-size: 16px;
    }
}
.h6 {
    font-size: 12px;
    color: cadetblue;
}

.unrecognized_files_move_file_banner {
    margin-top: 10px;
    background: #f7e1e1;
    padding: 15px;
    border-radius: 10px;
    color: red;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.vh75 {
    min-height: 75vh;
}

.load-bar {
    display: inline-block;
    margin: auto;
    max-width: 100px;
}

.outer-div-ufd {
    display: flex;
    text-align: center;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(200, 80%, 90%, 0.3);
}

.out-main-ufd {
    position: relative;
}

.uf-record-info {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
}

.uf-record-status {
    background: #DCDCDC;
    padding: 6px;
    border-radius: 5px;
    font-size: 8pt;
    margin-top: -4px;
    margin-left: 10px;
}
</style>