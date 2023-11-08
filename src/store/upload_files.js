import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        total_upload_files: 0,
        upload_files_loading_bar_flag: false,
        upload_answer_file: {
            pag: {
                upload_answer_files_status: 'all',
                date_now_for_upload_files: '',
                upload_answer_files: 100,
                loading_files_uf: false,
                count_files_upload: 0,
                count_files_in_folder_left: 0,
                t_started: false,
                t_finished: false,
                doc_type: 'all',
                offset: 0,
                find_file: ''
            }
        },
        data_upload_files: [],
        upload_file_statuses: {},
        uploaded_files_count: 0,
        upload_file_find_flag: false,
        file_retry_bar_flag: false,
        debtors_for_upload_files: [],
        total_upload_files_in_folder: 0,
        credits_for_files_upload: [],
        credits_for_finder: [],
        soc_answer_find_flag: false,
        upload_files_tasks: [],
        upload_files_tasks_flag: false,

        reg_sud_prikaz_list: [],
        reg_sud_prikaz_types: [],
        query_soc_files: {},
    },
    getters: {
        TotalFilesUpload: state => {
            return state.total_upload_files;
        },
        UploadAnswerFile: state => {
            return state.upload_answer_file;
        },
        UploadAnswerLoadingFlag: state => {
            return state.upload_files_loading_bar_flag;
        },
        UploadFilesArr: state => {
            return state.data_upload_files;
        },
        TotalUploadFilesInFolder: state => {
            return state.total_upload_files_in_folder;
        },
        UploadFilesStatusesArr: state => {
            return state.upload_file_statuses;
        },
        FileRetryFlag: state => {
            return state.file_retry_bar_flag;
        },
        CreditsForFilesUploadArr: state => {
            return state.credits_for_files_upload;
        },
        CreditsForFinder: state => {
            return state.credits_for_finder;
        },
        StatusesUploadFiles: state => {
            let arr=[];
            arr.push({id: 'all', name: 'Все'})
            arr.push({id: 1, name: 'Успех'})
            arr.push({id: 2, name: 'Ошибка'})
            arr.push({id: 3, name: 'Обрабатывается'})
            arr.push({id: 4, name: 'Нет файла'})
            arr.push({id: 5, name: 'Нет файла - Дубль?'})
            arr.push({id: 6, name: 'Проверить - Уже загружено'})
            return arr;
        },

        SocAnswerFindFlag: state => {
            return state.soc_answer_find_flag;
        },
        RegsSudPrikaz: state => {
            return state.reg_sud_prikaz_list;
        },
        QueryFilesInFolderSoc: state => {
            return state.query_soc_files;
        },

        CountUplFilesSoc: state => {
            return state.uploaded_files_soc;
        },
        TypesRegSudPrikaz: state => {
            return state.reg_sud_prikaz_types;
        },
        UploadFilesTasksArr: state => {
            return state.upload_files_tasks;
        },
    },
    mutations: {
        setTotalFilesUpload(state, payload) {
            state.total_upload_files = payload
        },
        setDateNowForUploadFiles(state, payload) {
            state.upload_answer_file.pag.date_now_for_upload_files = payload
        },
        setTotalUploadFilesInFolder(state, payload) {
            state.total_upload_files_in_folder = payload
        },
        setFilesUpload(state, payload) {
            state.data_upload_files = payload
        },
        setFilesStatusesArrUpload(state, payload) {
            state.upload_file_statuses = payload
        },
        setSearchResultsForUploadFiles(state, payload) {
            state.debtors_for_upload_files = payload
        },
        setRegsSudPrikaz(state, payload) {
            state.reg_sud_prikaz_list = payload
        },
        setCreditsForFilesUploadArr(state, payload) {
            state.credits_for_files_upload = payload
        },
        setCreditsForFinder(state, payload) {
            state.credits_for_finder = payload
        },
        setQueryUploadFilesOffset(state, payload) {
            console.log(payload*state.upload_answer_file.pag.upload_answer_files)
            state.upload_answer_file.pag.offset = payload*state.upload_answer_file.pag.upload_answer_files
        },
        setQueryUploadFilesLimit (state, payload) {
            state.upload_answer_file.pag.upload_answer_files = payload
        },

        setQueryFilesInFolderSoc(state, payload) {
            state.query_soc_files = payload
        },
        setTypesRegSudPrikaz(state, payload) {
            state.reg_sud_prikaz_types = payload
        },
        setUploadFilesTasksArr(state, payload) {
            state.upload_files_tasks = payload
        },

    },
    actions: {
        getDataFilesUpload({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.upload_files_loading_bar_flag = true;
                axios.get(r("uploadFiles.index"), {
                    params: {
                        method: 'getUploadedFiles',
                        param: getters.UploadAnswerFile
                    }
                }).then((response) => {
                    state.upload_files_loading_bar_flag = false;
                    if (response.data.result) {
                        commit('setFilesUpload', response.data.data_upload_files)
                        commit('setTotalFilesUpload', response.data.total_upload_files)
                        commit('setFilesStatusesArrUpload', response.data.upload_file_statuses)
                    }
                })
            })
        },
        startingParseUploadFilesAnswers({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("uploadFiles.index"), {
                    params: {
                        method: 'goParseUploadFiles',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                    state.uploaded_files_count = state.uploaded_files_count + 1;
                })
            })
        },
        getUploadFileData({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.upload_file_find_flag = true;
                axios.get(r("uploadFiles.index"), {
                    params: {
                        method: 'getUploadFileInfo',
                        param: requestObject
                    }
                }).then((response) => {
                    state.upload_file_find_flag = false;
                    if (response.data.result) {
                        resolve(response.data)
                    }
                })
            })
        },
        setNullCountUploadFiles({state, getters, commit, dispatch}, requestObject) {
            state.uploaded_files_count = 0;
        },
        tryParseFileAgain({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.file_retry_bar_flag = true;
                axios.get(r("uploadFiles.index"), {
                    params: {
                        method: 'tryParseUploadFileAgain',
                        param: requestObject
                    }
                }).then((response) => {
                    state.file_retry_bar_flag = false;
                    if (response.data.result) {
                        console.log(response)
                        resolve(response.data)
                    }
                })
            })
        },
        getDebtorsForUploadFileData({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.upload_file_find_flag = true;
                axios.get(r("debtors.index"), {
                    params: {
                        method: 'getDebtorsForAnswerInfo',
                        param: requestObject
                    }
                }).then((response) => {
                    state.upload_file_find_flag = false;
                    if (response.data.result) {
                        commit('setSearchResultsForUploadFiles', response.data.debtors_list)
                    }
                })
            })
        },
        getRegSudPrikazsList({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("uploadFiles.index"), {
                    params: {
                        method: 'getRegSudPrikazsList',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setRegsSudPrikaz', response.data.regs)
                    }
                })
            })
        },
        getTypesRegSudPrikaz({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("uploadFiles.index"), {
                    params: {
                        method: 'getTypesRegSudPrikaz',
                        param: ''
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setTypesRegSudPrikaz', response.data.types)
                    }
                })
            })
        },
        saveTypeRegSudPrikaz({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("uploadFiles.index"), {
                    params: {
                        method: 'saveTypeRegSudPrikaz',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        getUploadDataFilesInFolderTimes({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("uploadFiles.index"), {
                    params: {
                        method: 'getFilesListInFolder',
                        param: ''
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setTotalUploadFilesInFolder', response.data.total_upload_files_in_folder)
                    }
                })
            })
        },
        saveUploadFilesForImportServ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let formData = new FormData();
                let files = requestObject.files;
                let totalfiles = requestObject.files.length;
                let type_doc = requestObject.type_doc;
                let change_old = requestObject.change_old;
                for (let index = 0; index < totalfiles; index++) {
                    formData.append('up_files[]', requestObject.files[index]);
                }
                formData.append('type_doc', type_doc);
                formData.append('change_old', change_old);
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                axios.post('/docs_for_import/post-document',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((response) => {
                    resolve(response.data)
                })
            })
        },
        getCreditsForFileData({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("credits.index"), {
                    params: {
                        method: 'getCreditsForFileData',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setCreditsForFilesUploadArr', response.data.credit_list)
                    }
                })
            })
        },
        getCountFilesInDb({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("uploadFiles.index"), {
                    params: {
                        method: 'getCountFilesInDb',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        resolve(response.data)
                    }
                })
            })
        },
        getCreditsDataUploadFiles({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.soc_answer_find_flag = true;
                axios.get(r("uploadFiles.index"), {
                    params: {
                        method: 'getCreditsDataUploadFiles',
                        param: requestObject
                    }
                }).then((response) => {
                    state.soc_answer_find_flag = false;
                    if (response.data.result) {
                        commit('setCreditsForFinder', response.data.credit_list_for_finder)
                    }
                })
            })
        },




        setSocAnswerToDebtor({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.soc_answer_find_flag = true;
                axios.get(r("sudPrikaz.index"), {
                    params: {
                        method: 'setSocAnswerToDebtor',
                        param: requestObject
                    }
                }).then((response) => {
                    state.soc_answer_find_flag = false;
                    if (response.data.result) {
                        resolve(response.data)
                    }
                })
            })
        },
        getFioDebtorByIdForSocAnswer({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.soc_answer_find_flag = true;
                axios.get(r("debtors.index"), {
                    params: {
                        method: 'getFioDebtorByIdForFnsAnswer',
                        param: requestObject
                    }
                }).then((response) => {
                    state.soc_answer_find_flag = false;
                    if (response.data.result) {
                        resolve(response.data)
                    }
                })
            })
        },
        saveFioDebtorFromUploadFiles({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.soc_answer_find_flag = true;
                axios.get(r("debtors.index"), {
                    params: {
                        method: 'saveFioDebtorFromUploadFiles',
                        param: requestObject
                    }
                }).then((response) => {
                    state.soc_answer_find_flag = false;
                    if (response.data.result) {
                        resolve(response.data)
                    }
                })
            })
        },

        goReWorkingFiles({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.soc_answer_find_flag = true;
                axios.get(r("uploadFiles.index"), {
                    params: {
                        method: 'goReWorkingFiles',
                        param: requestObject
                    }
                }).then((response) => {
                    state.soc_answer_find_flag = false;
                    if (response.data.result) {
                        resolve(response.data)
                    }
                })
            })
        },
        getUploadFilesForImportServ({state, getters, commit, dispatch}, requestObject) {
                return new Promise((resolve, reject) => {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                    axios.get('/document/credit_upload/?id_file='+requestObject, {
                        responseType: 'arraybuffer',
                        params: {}
                    }).then((response) => {
                        resolve(response.data)
                    })

                })
        },
        goReWorkingErrors({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.soc_answer_find_flag = true;
                axios.get(r("uploadFiles.index"), {
                    params: {
                        method: 'goReWorkingErrors',
                        param: requestObject
                    }
                }).then((response) => {
                    state.soc_answer_find_flag = false;
                    if (response.data.result) {
                        resolve(response.data)
                    }
                })
            })
        },
        deleteUploadFile({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("uploadFiles.update"), {
                    params: {
                        method: 'deleteUploadFile',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        checkFuncDocType({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("uploadFiles.index"), {
                    params: {
                        method: 'checkFuncDocType',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        getUploadFilesTasks({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.upload_files_tasks_flag = true;
                axios.get(r("uploadFiles.index"), {
                    params: {
                        method: 'getUploadFilesTasks',
                        param: requestObject
                    }
                }).then((response) => {
                    state.upload_files_tasks_flag = false;
                    if (response.data.result) {
                        commit('setUploadFilesTasksArr', response.data.data)
                    }
                })
            })
        },
        saveUploadFilesForTaskServ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let formData = new FormData();
                let files = requestObject.files;
                let totalfiles = requestObject.files.length;
                for (let index = 0; index < totalfiles; index++) {
                    formData.append('up_files[]', requestObject.files[index]);
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                axios.post('/docs_for_task/post-document',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((response) => {
                    resolve(response.data)
                })
            })
        },

        deleteTaskFile({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("uploadFiles.update"), {
                    params: {
                        method: 'deleteTaskFile',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        deleteTaskFileNew({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("uploadFiles.update"), {
                    params: {
                        method: 'deleteTaskFileNew',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        getUploadFilesForTaskServ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                axios.get('/document/task_upload/?id_task='+requestObject, {
                    responseType: 'arraybuffer',
                    params: {}
                }).then((response) => {
                    resolve(response.data)
                })

            })
        },
    }
}



