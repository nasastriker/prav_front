import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)

export default {
    state: {
        fssp_epgu_spec_records: [],
        total_fssp_epgu_spec_records: 0,
        fssp_epgu_spec_records_loading_flag: false,

        fssp_epgu_spec_records_data: {
            offset: 0,
            limit: 100,
            fields:{},
        },
    },
    getters: {
        FsspEpguSpecRecords: state => {
            return state.fssp_epgu_spec_records
        },
        TotalFsspEpguSpecRecords: state => {
            return state.total_fssp_epgu_spec_records
        },
        FsspEpguSpecRecordsLoadingFlag: state => {
            return state.fssp_epgu_spec_records_loading_flag
        },
        FsspEpguSpecRecordsData: state => {
            return state.fssp_epgu_spec_records_data
        },
    },
    mutations: {
        setFsspEpguSpecRecords(state, payload) {
            state.fssp_epgu_spec_records = payload
        },
        setTotalFsspEpguSpecRecords(state, payload) {
            state.total_fssp_epgu_spec_records = payload
        },
        setQueryFsspEpguSpecRecordsOffset(state, payload) {
            state.fssp_epgu_spec_records_data.offset = payload * state.fssp_epgu_spec_records_data.limit
        },
        setQueryFsspEpguSpecRecordsLimit(state, payload) {
            state.fssp_epgu_spec_records_data.limit = payload
        },
    },
    actions: {
        getFsspEpguSpecRecords({state, getters, commit, dispatch}, requestObject) {
            state.fssp_epgu_spec_records_loading_flag = true;
            commit('setFsspEpguSpecRecords', [])
            commit('setTotalFsspEpguSpecRecords', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('fsspEpguSpecTypes.index'), {
                    params: {
                        method: 'getFsspEpguSpecRecords',
                        param: getters.FsspEpguSpecRecordsData
                    }
                }).then((response) => {
                    state.fssp_epgu_spec_records_loading_flag = false;
                    if (response.data.result) {
                        commit('setFsspEpguSpecRecords', response.data.data)
                        commit('setTotalFsspEpguSpecRecords', response.data.total)
                    }
                })
            })
        },
        saveFsspEpguSpecRecord({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("fsspEpguSpecTypes.update"), {
                    params: {
                        method: 'saveFsspEpguSpecRecord',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        getFsspEpguSpecRecordData ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('fsspEpguSpecTypes.index'), {
                    params: {
                        method: 'getFsspEpguSpecRecordData',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data);
                })
            })
        },
        deleteFsspEpguSpecRecord({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("fsspEpguSpecTypes.update"), {
                    params: {
                        method: 'deleteFsspEpguSpecRecord',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
    }
}

