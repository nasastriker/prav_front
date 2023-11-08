import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        data:[],
        total:0,
        query: {},
        sud_errors_loading_flag: false,
        sud_errors_data: {
            pag: {
                limit: 100,
                offset: 0
            }
        },
        files_sud_errors:[]



    },
    getters: {
        // ...
        SudErrorsArr: state => {
            return state.data;
        },
        TotalSudErrors: state => {
            return state.total;
        },

        QuerySudErrors: state => {
            return state.query;
        },
        SudErrorsLoadingFlag: state => {
            return state.sud_errors_loading_flag;
        },
        SudErrorsData: state => {
            return state.sud_errors_data;
        },
        FilesSudErrorsArr: state => {
            return state.files_sud_errors;
        },

    },
    mutations: {
        setSudErrors (state, payload) {
            state.data = payload

        },
        setQuerySudErrors (state, payload) {
            state.query = payload

        },
        setTotalSudErrors (state, payload) {
            state.total = payload

        },
        setSudErrorsOffset(state, payload) {
            state.sud_errors_data.pag.offset = payload*state.sud_errors_data.pag.limit
        },
        setSudErrorsLimit (state, payload) {
            state.sud_errors_data.pag.limit = payload
        },
        setFilesSudErrorsArr (state, payload) {
            state.files_sud_errors = payload
        },

    },
    actions: {
        getDataSudErrorsCredit({state, getters, commit, dispatch}, requestObject) {
            state.sud_errors_loading_flag = true;
            commit('setSudErrors', [])
            commit('setTotalSudErrors', 0)
            return new Promise((resolve, reject) => {
                axios.get(r("sudErrors.index"), {
                    params: {
                        method: 'getDataSudErrorsCredit',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setSudErrors', response.data.data)
                        commit('setTotalSudErrors', response.data.total)
                    } else {
                        commit('setSudErrors', [])
                        commit('setTotalSudErrors', 0)
                    }
                    state.sud_errors_loading_flag = false;
                })

            })
        },
        getDataSudErrors({state, getters, commit, dispatch}, requestObject) {
            state.sud_errors_loading_flag = true;
            commit('setSudErrors', [])
            commit('setTotalSudErrors', 0)
            return new Promise((resolve, reject) => {
                axios.get(r("sudErrors.index"), {
                    params: {
                        method: 'getSudErrors',
                        param: getters.SudErrorsData
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setSudErrors', response.data.data)
                        commit('setTotalSudErrors', response.data.total)
                    } else {
                        commit('setSudErrors', [])
                        commit('setTotalSudErrors', 0)
                    }
                    state.sud_errors_loading_flag = false;
                })

            })
        },
        genSudErrorsXls({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("sudErrors.index"), {
                    params: {
                        method: 'genSudErrorsXls',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })

            })
        },
        getFileListSudErrors({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("sudErrors.index"), {
                    params: {
                        method: 'getFileListSudErrors',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setFilesSudErrorsArr', response.data.data)
                    }
                })
            })
        },
        deleteFileListSudErrors({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("sudErrors.index"), {
                    params: {
                        method: 'deleteFileListSudErrors',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
    }



}



