import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);

export default {
    state: {
        end_ip_reasons:[],
        end_ip_reasons_total:0,

    },
    getters: {
        EndIpReasons: state => {
            return state.end_ip_reasons;
        },
        EndIpReasonsTotal: state => {
            return state.end_ip_reasons_total;
        },
    },
    mutations: {
        setEndIpReasons(state, payload) {
            state.end_ip_reasons = payload
        },
        setEndIpReasonsTotal(state, payload) {
            state.end_ip_reasons_total = payload
        },
    },
    actions: {
        getEndIpReasons ({state, getters, commit, dispatch}, requestObject) {
            commit('setEndIpReasons', [])
            commit('setEndIpReasonsTotal', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('endIpReasons.index'), {
                    params: {
                        method: 'getEndIpReasons',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setEndIpReasons', response.data.data)
                        commit('setEndIpReasonsTotal', response.data.total)
                    }
                })
            })
        },

        saveEndIpReason ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r('endIpReasons.update'), {
                    params: {
                        method: 'saveEndIpReason',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        deleteEndIpReason ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r('endIpReasons.update'), {
                    params: {
                        method: 'deleteEndIpReason',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        getEndIpReasonData ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('endIpReasons.index'), {
                    params: {
                        method: 'getEndIpReasonData',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
    }
}



