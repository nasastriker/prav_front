import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        data: [],
        total: 0,
        query: {},
        pp_data: {
            pag: {
                date_pps: ''
            }
        },


    },
    getters: {
        // ...
        RequestPpsArr: state => {
            return state.data;
        },
        TotalRequestPps: state => {
            return state.total;
        },

        QueryRequestPps: state => {
            return state.query;
        },


    },
    mutations: {
        setRequestPps(state, payload) {
            state.data = payload

        },
        setQueryRequestPps(state, payload) {
            state.query = payload

        },
        setTotalRequestPps(state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataRequestPayById({state, getters, commit, dispatch}, requestObject=null) {
            commit('setRequestPps', [])
            commit('setTotalRequestPps', 0)
            return new Promise((resolve, reject) => {
                axios.get(r("requestPP.index"), {
                    params: {
                        method: 'getDataRequestPayById',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setRequestPps', response.data.data)
                        commit('setTotalRequestPps', response.data.total)
                    } else {
                        commit('setRequestPps', [])
                        commit('setTotalRequestPps', 0)
                    }
                })

            })
        },
        getDataRequestPayGps({state, getters, commit, dispatch}, requestObject=null) {
            commit('setRequestPps', [])
            commit('setTotalRequestPps', 0)
            return new Promise((resolve, reject) => {
                axios.get(r("requestPP.index"), {
                    params: {
                        method: 'getRequestPayArr',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setRequestPps', response.data.data)
                        commit('setTotalRequestPps', response.data.total)
                    } else {
                        commit('setRequestPps', [])
                        commit('setTotalRequestPps', 0)
                    }
                })

            })
        },

        getDataRequestPps({state, getters, commit, dispatch}, requestObject=null) {
            commit('setRequestPps', [])
            commit('setTotalRequestPps', 0)
            return new Promise((resolve, reject) => {
                axios.get(r("requestPP.index"), {
                    params: {
                        method: 'getRequestPpArr',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setRequestPps', response.data.data)
                        commit('setTotalRequestPps', response.data.total)
                    } else {
                        commit('setRequestPps', [])
                        commit('setTotalRequestPps', 0)
                    }
                })

            })
        },

    }


}



