import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        unrecognized_files_list:[],
        unrecognized_files_total:0,
        unrecognized_files_loading_flag:false,
        unrecognized_files_data:{
            fields:{},
            offset: 0,
            limit: 100,
        },
        unrecognized_files_record_statuses:[],
        unrecognized_files_from_types:[],

        unrecognized_files_arr:[],
        unrecognized_files_arr_total:0,
        unrecognized_files_arr_loading_flag:false,
        unrecognized_files_record_delete_loading_flag:false,
        unrecognized_files_record_binding_loading_flag:false,
        unrecognized_files_record_end_work_loading_flag:false,

        debtor_unrecognized_files_list:[],
        debtor_unrecognized_files_total:0,
        debtor_unrecognized_files_list_loading_flag:false,

        unrecognized_files_history_list:[],
        unrecognized_files_history_total:0,
        unrecognized_files_history_list_loading_flag:false,
    },
    getters: {
        UnrecognizedFilesHistoryListLoadingFlag: state => {
            return state.unrecognized_files_history_list_loading_flag;
        },
        UnrecognizedFilesHistoryList: state => {
            return state.unrecognized_files_history_list;
        },
        UnrecognizedFilesHistoryTotal: state => {
            return state.unrecognized_files_history_total;
        },
        DebtorUnrecognizedFilesListLoadingFlag: state => {
            return state.debtor_unrecognized_files_list_loading_flag;
        },
        DebtorUnrecognizedFilesList: state => {
            return state.debtor_unrecognized_files_list;
        },
        DebtorUnrecognizedFilesTotal: state => {
            return state.debtor_unrecognized_files_total;
        },
        UnrecognizedFilesRecordDeleteLoadingFlag: state => {
            return state.unrecognized_files_record_delete_loading_flag;
        },
        UnrecognizedFilesRecordBindingLoadingFlag: state => {
            return state.unrecognized_files_record_binding_loading_flag;
        },
        UnrecognizedFilesRecordEndWorkLoadingFlag: state => {
            return state.unrecognized_files_record_end_work_loading_flag;
        },
        UnrecognizedFilesArr: state => {
            return state.unrecognized_files_arr;
        },
        UnrecognizedFilesArrTotal: state => {
            return state.unrecognized_files_arr_total;
        },
        UnrecognizedFilesArrLoadingFlag: state => {
            return state.unrecognized_files_arr_loading_flag;
        },
        UnrecognizedFilesFromTypes: state => {
            return state.unrecognized_files_from_types;
        },
        UnrecognizedFilesRecordStatuses: state => {
            return state.unrecognized_files_record_statuses;
        },
        UnrecognizedFilesData: state => {
            return state.unrecognized_files_data;
        },
        UnrecognizedFilesList: state => {
            return state.unrecognized_files_list;
        },
        UnrecognizedFilesTotal: state => {
            return state.unrecognized_files_total;
        },
        UnrecognizedFilesLoadingFlag: state => {
            return state.unrecognized_files_loading_flag;
        },
    },
    mutations: {
        setUnrecognizedFilesHistoryList(state, payload) {
            state.unrecognized_files_history_list = payload
        },
        setUnrecognizedFilesHistoryTotal(state, payload) {
            state.unrecognized_files_history_total = payload
        },
        setDebtorUnrecognizedFilesList(state, payload) {
            state.debtor_unrecognized_files_list = payload
        },
        setDebtorUnrecognizedFilesTotal(state, payload) {
            state.debtor_unrecognized_files_total = payload
        },
        setUnrecognizedFilesArr(state, payload) {
            state.unrecognized_files_arr = payload
        },
        setUnrecognizedFilesArrTotal(state, payload) {
            state.unrecognized_files_arr_total = payload
        },
        setUnrecognizedFilesFromTypes(state, payload) {
            state.unrecognized_files_from_types = payload
        },
        setUnrecognizedFilesRecordStatuses(state, payload) {
            state.unrecognized_files_record_statuses = payload
        },
        setUnrecognizedFilesList(state, payload) {
            state.unrecognized_files_list = payload
        },
        setUnrecognizedFilesTotal(state, payload) {
            state.unrecognized_files_total = payload
        },
        setQueryUnrecognizedFilesOffset(state, payload) {
            state.unrecognized_files_data.offset = payload*state.unrecognized_files_data.limit
        },
        setQueryUnrecognizedFilesLimit (state, payload) {
            state.unrecognized_files_data.limit = payload
        },
    },
    actions: {
        getUnrecognizedFilesList ({state, getters, commit, dispatch}, requestObject) {
            state.unrecognized_files_loading_flag = true;
            commit('setUnrecognizedFilesList', [])
            commit('setUnrecognizedFilesTotal', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('unrecognizedFiles.index'), {
                    params: {
                        method: 'getUnrecognizedFilesList',
                        param: getters.UnrecognizedFilesData
                    }
                }).then((response) => {
                    state.unrecognized_files_loading_flag = false;
                    if (response.data.result) {
                        commit('setUnrecognizedFilesList', response.data.data)
                        commit('setUnrecognizedFilesTotal', response.data.total)
                    }
                })
            })
        },

        getUnrecognizedFilesRecordStatuses ({state, getters, commit, dispatch}, requestObject) {
            commit('setUnrecognizedFilesRecordStatuses', [])
            return new Promise((resolve, reject) => {
                axios.get(r('unrecognizedFiles.index'), {
                    params: {
                        method: 'getUnrecognizedFilesRecordStatuses',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setUnrecognizedFilesRecordStatuses', response.data.data)
                    }
                })
            })
        },

        getUnrecognizedFilesFromTypes ({state, getters, commit, dispatch}, requestObject) {
            commit('setUnrecognizedFilesFromTypes', [])
            return new Promise((resolve, reject) => {
                axios.get(r('unrecognizedFiles.index'), {
                    params: {
                        method: 'getUnrecognizedFilesFromTypes',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setUnrecognizedFilesFromTypes', response.data.data)
                    }
                })
            })
        },

        getUnrecognizedFilesArr ({state, getters, commit, dispatch}, requestObject) {
            state.unrecognized_files_arr_loading_flag = true;
            commit('setUnrecognizedFilesArr', [])
            commit('setUnrecognizedFilesArrTotal', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('unrecognizedFiles.index'), {
                    params: {
                        method: 'getUnrecognizedFilesArr',
                        param: requestObject
                    }
                }).then((response) => {
                    state.unrecognized_files_arr_loading_flag = false;
                    if (response.data.result) {
                        commit('setUnrecognizedFilesArr', response.data.data)
                        commit('setUnrecognizedFilesArrTotal', response.data.total)
                    }
                })
            })
        },

        getUnrecognizedFilesRecordData ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('unrecognizedFiles.index'), {
                    params: {
                        method: 'getUnrecognizedFilesRecordData',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        endWorkUnrecognizedFilesRecord ({state, getters, commit, dispatch}, requestObject) {
            state.unrecognized_files_record_end_work_loading_flag = true;
            return new Promise((resolve, reject) => {
                axios.post(r('unrecognizedFiles.update'), {
                    params: {
                        method: 'endWorkUnrecognizedFilesRecord',
                        param: requestObject
                    }
                }).then((response) => {
                    state.unrecognized_files_record_end_work_loading_flag = false;
                    resolve(response.data)
                })
            })
        },

        deleteOneUnrecognizedFile ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r('unrecognizedFiles.update'), {
                    params: {
                        method: 'deleteOneUnrecognizedFile',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        moveOneUnrecognizedFileToDebtor ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r('unrecognizedFiles.update'), {
                    params: {
                        method: 'moveOneUnrecognizedFileToDebtor',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        saveUnrecognizedFilesForImport ({state, getters, commit, dispatch}, requestObject) {
            state.unrecognized_files_arr_loading_flag = true;
            return new Promise((resolve, reject) => {
                const formData = new FormData()
                const totalfiles = requestObject.files.length
                for (let index = 0; index < totalfiles; index++) {
                    formData.append('up_files[]', requestObject.files[index])
                }
                formData.append('id_record', requestObject.id_record);
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                axios.post('/unrecognized_files/import_files',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((response) => {
                    state.unrecognized_files_arr_loading_flag = false;
                    resolve(response.data)
                })
            })
        },

        mergeUnrecognizedFiles ({state, getters, commit, dispatch}, requestObject) {
            state.unrecognized_files_arr_loading_flag = true;
            return new Promise((resolve, reject) => {
                axios.post(r('unrecognizedFiles.update'), {
                    params: {
                        method: 'mergeUnrecognizedFiles',
                        param: requestObject
                    }
                }).then((response) => {
                    state.unrecognized_files_arr_loading_flag = false;
                    resolve(response.data)
                })
            })
        },

        addUnrecognizedFilesRecordComment ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r('unrecognizedFiles.update'), {
                    params: {
                        method: 'addUnrecognizedFilesRecordComment',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        deleteUnrecognizedFilesRecordComment ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r('unrecognizedFiles.update'), {
                    params: {
                        method: 'deleteUnrecognizedFilesRecordComment',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        deleteUnrecognizedFilesRecord ({state, getters, commit, dispatch}, requestObject) {
            state.unrecognized_files_record_delete_loading_flag = true;
            return new Promise((resolve, reject) => {
                axios.post(r('unrecognizedFiles.update'), {
                    params: {
                        method: 'deleteUnrecognizedFilesRecord',
                        param: requestObject
                    }
                }).then((response) => {
                    state.unrecognized_files_record_delete_loading_flag = false;
                    resolve(response.data)
                })
            })
        },

        deleteAllUnrecognizedFiles ({state, getters, commit, dispatch}, requestObject) {
            state.unrecognized_files_arr_loading_flag = true;
            return new Promise((resolve, reject) => {
                axios.post(r('unrecognizedFiles.update'), {
                    params: {
                        method: 'deleteAllUnrecognizedFiles',
                        param: requestObject
                    }
                }).then((response) => {
                    state.unrecognized_files_arr_loading_flag = false;
                    resolve(response.data)
                })
            })
        },

        getAllPdfUnrecognizedFiles ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('unrecognizedFiles.index'), {
                    params: {
                        method: 'getAllPdfUnrecognizedFiles',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        setUnrecognizedFilesRecordToCredit ({state, getters, commit, dispatch}, requestObject) {
            state.unrecognized_files_record_binding_loading_flag = true;
            return new Promise((resolve, reject) => {
                axios.post(r('unrecognizedFiles.update'), {
                    params: {
                        method: 'setUnrecognizedFilesRecordToCredit',
                        param: requestObject
                    }
                }).then((response) => {
                    state.unrecognized_files_record_binding_loading_flag = false;
                    resolve(response.data)
                })
            })
        },

        getDebtorUnrecognizedFiles ({state, getters, commit, dispatch}, requestObject) {
            state.debtor_unrecognized_files_list_loading_flag = true;
            commit('setDebtorUnrecognizedFilesList', [])
            commit('setDebtorUnrecognizedFilesTotal', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('unrecognizedFiles.index'), {
                    params: {
                        method: 'getDebtorUnrecognizedFiles',
                        param: requestObject
                    }
                }).then((response) => {
                    state.debtor_unrecognized_files_list_loading_flag = false;
                    if (response.data.result) {
                        commit('setDebtorUnrecognizedFilesList', response.data.data)
                        commit('setDebtorUnrecognizedFilesTotal', response.data.total)
                    }
                })
            })
        },

        createUnrecognizedFilesRecordHand ({state, getters, commit, dispatch}, requestObject) {
            state.unrecognized_files_loading_flag = true;
            return new Promise((resolve, reject) => {
                axios.post(r('unrecognizedFiles.update'), {
                    params: {
                        method: 'createUnrecognizedFilesRecordHand',
                        param: requestObject
                    }
                }).then((response) => {
                    state.unrecognized_files_loading_flag = false;
                    resolve(response.data)
                })
            })
        },

        getUnrecognizedFilesHistory ({state, getters, commit, dispatch}, requestObject) {
            state.unrecognized_files_history_list_loading_flag = true;
            commit('setUnrecognizedFilesHistoryList', [])
            commit('setUnrecognizedFilesHistoryTotal', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('unrecognizedFiles.index'), {
                    params: {
                        method: 'getUnrecognizedFilesHistory',
                        param: requestObject
                    }
                }).then((response) => {
                    state.unrecognized_files_history_list_loading_flag = false;
                    if (response.data.result) {
                        commit('setUnrecognizedFilesHistoryList', response.data.data)
                        commit('setUnrecognizedFilesHistoryTotal', response.data.total)
                    }
                    resolve(response.data);
                })
            })
        },
    }



}



