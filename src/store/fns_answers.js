import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        fns_credits: [],
        fns_not_arr:[],
        total_records_fns: 0,
        fns_answer_file_name: '',
        record_statuses: {},
        record_statuses_all: {},
        fns_answer_loading_bar_flag: false,
        fns_answer_find_flag: false,
        fns_answer_file: {
            pag: {
                // fns_answer_files_status: {
                //     status_no: true,
                //     status_ok: true,
                //     status_done: true,
                //     status_check_file: true
                // },
                fns_answer_files_status:'all',
                fns_answer_files: 100,
                fns_answer_files_main: 100
            }
        },

        load_files:[],
        total_load_files:0,
        loading_flag_load_files:false,
        count_fns_files_left:0,
        fns_answer_problem_chunks:[],
        fns_answer_problem_chunks_total:0,
        fns_answer_problem_chunks_text:'',
        fns_statuses:[],
    },
    getters: {
        FnsStatuses: state => {
            return state.fns_statuses;
        },
        FnsAnswerProblemChunks: state => {
            return state.fns_answer_problem_chunks;
        },
        FnsAnswerProblemChunksTotal: state => {
            return state.fns_answer_problem_chunks_total;
        },
        FnsAnswerProblemChunksText: state => {
            return state.fns_answer_problem_chunks_text;
        },
        CountFnsFilesLeft: state => {
            return state.count_fns_files_left;
        },
        FnsLoadFiles: state => {
            return state.load_files;
        },
        FnsTotalLoadFiles: state => {
            return state.total_load_files;
        },
        FnsLoadingFlagLoadFiles: state => {
            return state.loading_flag_load_files;
        },
        FnsNotArr: state => {
            return state.fns_not_arr;
        },
        FnsCreditsArr: state => {
            return state.fns_credits;
        },
        FnsAnswerFile: state => {
            return state.fns_answer_file;
        },
        TotalRecordsFns: state => {
            return state.total_records_fns;
        },
        FnsAnswerFileName: state => {
            return state.fns_answer_file_name;
        },
        FnsRecordsStatusesArr: state => {
            return state.record_statuses;
        },
        FnsRecordsStatusesAllArr: state => {
            return state.record_statuses_all;
        },
        FnsAnswerLoadingFlag: state => {
            return state.fns_answer_loading_bar_flag;
        },
        FnsAnswerFindFlag: state => {
            return state.fns_answer_find_flag;
        },
    },
    mutations: {
        setFnsStatuses(state, payload) {
            state.fns_statuses = payload
        },
        setFnsAnswerProblemChunks(state, payload) {
            state.fns_answer_problem_chunks = payload
        },
        setFnsAnswerProblemChunksTotal(state, payload) {
            state.fns_answer_problem_chunks_total = payload
        },
        setFnsAnswerProblemChunksText(state, payload) {
            state.fns_answer_problem_chunks_text = payload
        },
        setFnsNotArr(state, payload) {
            state.fns_not_arr = payload
        },
        setFnsCredits (state, payload) {
            state.fns_credits = payload
        },
        setTotalRecordsFns (state, payload) {
            state.total_records_fns = payload
        },
        setFnsAnswerFileName (state, payload) {
            state.fns_answer_file_name = payload
        },
        setFnsRecordsStatusesArr (state, payload) {
            state.record_statuses = payload
        },
        setFnsRecordsStatusesAllArr (state, payload) {
            state.record_statuses_all = payload
        },
        setFnsLoadFiles (state, payload) {
            state.load_files = payload
        },
        setFnsTotalLoadFiles (state, payload) {
            state.total_load_files = payload
        },
        setCountFnsFilesLeft (state, payload) {
            state.count_fns_files_left = payload
        },
    },
    actions: {
        getFnsCredits({state, getters, commit, dispatch}, requestObject) {
            commit('setFnsCredits', [])
            commit('setTotalRecordsFns', 0)
            return new Promise((resolve, reject) => {
                state.fns_answer_loading_bar_flag = true;
                axios.get(r("fns.index"), {
                    params: {
                        method: 'getFnsCredits',
                        param: { id_file: requestObject, file_data: getters.FnsAnswerFile }
                    }
                }).then((response) => {
                    state.fns_answer_loading_bar_flag = false;
                    if(response.data.result){
                        commit('setFnsCredits', response.data.fns_credits)
                        commit('setTotalRecordsFns', response.data.total_records_fns)
                        commit('setFnsRecordsStatusesArr', response.data.record_statuses)
                        commit('setFnsRecordsStatusesAllArr', response.data.record_statuses_all)
                    }
                })
            })
        },
        getFnsAnswerFileName({state, getters, commit, dispatch}, requestObject) {
            commit('setFnsAnswerFileName', null)
            return new Promise((resolve, reject) => {
                axios.get(r("fns.index"), {
                    params: {
                        method: 'getFnsAnswerFileName',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setFnsAnswerFileName', response.data.fns_answer_file_name)
                    }
                })
            })
        },
        getFnsNotAnswerData({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.get(r("fns.index"), {
                    params: {
                        method: 'getFnsNotAnswerData',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setFnsNotArr', response.data.data)
                    }
                })
            })
        },
        getFnsAnswerData({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.fns_answer_find_flag = true;
                axios.get(r("fns.index"), {
                    params: {
                        method: 'getFnsAnswerInfo',
                        param: requestObject
                    }
                }).then((response) => {
                    state.fns_answer_find_flag = false;
                    if(response.data.result){
                        resolve(response.data)
                    }
                })
            })
        },
        startingParseFilesAnswersFns({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("fns.index"), {
                    params: {
                        method: 'goParseAnswerFns',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        setOtherStatusFns({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("fns.update"), {
                    params: {
                        method: 'setOtherStatusFns',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        setDcStatus({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("fns.index"), {
                    params: {
                        method: 'setDcStatus',
                        param: requestObject
                    }
                })
            })
        },
        addFileFnsReg({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("fns.update"), {
                    params: {
                        method: 'addFileFnsReg',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
            })
            })
        },
        getFnsFileForCheck({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                axios.get('/document/file_fns_for_check/?id_dc='+requestObject, {
                    responseType: 'arraybuffer',
                    params: {}
                }).then((response) => {
                    resolve(response.data)
                })

            })
        },
        getLoadFiles ({state, getters, commit, dispatch}, requestObject) {
            state.loading_flag_load_files = true;
            commit('setFnsLoadFiles', [])
            commit('setFnsTotalLoadFiles', 0)
            commit('setCountFnsFilesLeft', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('fns.index'), {
                    params: {
                        method: 'getLoadFiles',
                        param: requestObject
                    }
                }).then((response) => {
                    state.loading_flag_load_files = false;
                    if (response.data.result) {
                        commit('setFnsLoadFiles', response.data.data)
                        commit('setFnsTotalLoadFiles', response.data.total)
                        commit('setCountFnsFilesLeft', response.data.cnt_files)
                    }
                })
            })
        },
        resetFnsFile({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("fns.update"), {
                    params: {
                        method: 'resetFnsFile',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        setAnswerFnsToCredit({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("fns.update"), {
                    params: {
                        method: 'setFnsAnswerToBd',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        getDebtorChangeDataFnsAnswer ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('fns.index'), {
                    params: {
                        method: 'getDebtorChangeDataFnsAnswer',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        changeDebtorDataOnFnsAnswer({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("fns.update"), {
                    params: {
                        method: 'changeDebtorDataOnFnsAnswer',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        getProblemChunksFnsAnswer ({state, getters, commit, dispatch}, requestObject) {
            commit('setFnsAnswerProblemChunks', [])
            commit('setFnsAnswerProblemChunksTotal', 0)
            commit('setFnsAnswerProblemChunksText', '')
            return new Promise((resolve, reject) => {
                axios.get(r('fns.index'), {
                    params: {
                        method: 'getProblemChunksFnsAnswer',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setFnsAnswerProblemChunks', response.data.data)
                        commit('setFnsAnswerProblemChunksTotal', response.data.total)
                        commit('setFnsAnswerProblemChunksText', response.data.text)
                    }
                    resolve(response.data);
                })
            })
        },

        saveFnsAnswerFileForImportServOnDisk ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                const totalfiles = requestObject.files.length;
                for (let index = 0; index < totalfiles; index++) {
                    formData.append('up_files[]', requestObject.files[index]);
                }
                formData.append('id_file_request', requestObject.id_file_request);
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                axios.post('/fns_answer_file/upload_answer_files',
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

        getFnsStatuses ({state, getters, commit, dispatch}, requestObject) {
            commit('setFnsStatuses', [])
            return new Promise((resolve, reject) => {
                axios.get(r('fns.index'), {
                    params: {
                        method: 'getFnsStatuses',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setFnsStatuses', response.data.data)
                    }
                })
            })
        },
    }
}
