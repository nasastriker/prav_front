import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        data_files:[],
        total_files:0,
        total_files_in_folder:0,
        query_files: {},
        file_statuses: {},
        date_now_for_fns_answers: '',
        fns_answer_file: {
            pag: {
                fns_answer_files_status: {
                    status_ok: true,
                    status_error: true
                },
                fns_answer_files: 100
            }
        }
    },
    getters: {
        // ...
        FnssFilesArr: state => {
          //  console.log(state.data)
            return state.data_files;
        },
        TotalFilesFnss: state => {
            return state.total_files;
        },
        TotalFilesInFolderFnss: state => {
            return state.total_files_in_folder;
        },
        QueryFilesInFolderFnss: state => {
            return state.query_files;
        },
        FnssFilesStatusesArr: state => {
            return state.file_statuses;
        },
        DateNowForFnsAnswers: state => {
            return state.date_now_for_fns_answers;
        },
        FnsAnswerFile: state => {
            return state.fns_answer_file;
        },

    },
    mutations: {
        setFilesFnss (state, payload) {
            state.data_files = payload
        },
        setQueryFilesInFolderFnss (state, payload) {
            state.query_files = payload
        },
        setTotalFilesFnss (state, payload) {
            state.total_files = payload
        },
        setTotalFilesInFolderFnss (state, payload) {
            state.total_files_in_folder = payload
        },
        setFilesStatusesArrFnss (state, payload) {
            state.file_statuses = payload
        },
        setDateNowForFnsAnswers (state, payload) {
            state.date_now_for_fns_answers = payload
        }
    },
    actions: {
        getDataFilesInFolderFnss({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("fns.index"), {
                    params: {
                        method: 'getFilesInFolderFnss',
                        param: ''
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setTotalFilesInFolderFnss', response.data.total_files_in_folder)
                        commit('setDateNowForFnsAnswers', response.data.date_now_for_fns_answers)
                    }
                })
            })
        },
        getDataFilesFnss({state, getters, commit, dispatch}, requestObject){
            return new Promise((resolve, reject) => {
                axios.get(r("fns.index"), {
                    params: {
                        method: 'getFilesFnss',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setFilesFnss', response.data.data_files)
                        commit('setTotalFilesFnss', response.data.total_files)
                        commit('setFilesStatusesArrFnss', response.data.file_statuses)
                    }
                })
            })
        },
        checkUserPagForFnsAnswers({state, getters, commit, dispatch}, requestObject){
            return new Promise((resolve, reject) => {
                axios.post(r("fns.update"), {
                    params: {
                        method: 'goCheckUserPagForFnsAnswer',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setFilesFnss', response.data.data_files)
                    }
                })
            })
        }
    }
}



