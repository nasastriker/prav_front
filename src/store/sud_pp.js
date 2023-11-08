import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        sud_pps:[],
        total:0,
        filterPp:[],
        sud_ppFlags:0,
        query: {},
        sud_pp_data: {
            pag: {
                limit: 100,
                offset: 0
            }
        }
    },
    getters: {
        // ...
        FilterPpArr: state => {
            return state.filterPp;
        },
        SudPpArr: state => {
            return state.sud_pps;
        },
        SudPpFlagLoat: state => {
            return state.sud_ppFlags;
        },
        TotalSudPps: state => {
            return state.total;
        },

        QuerySudPps: state => {
            return state.query;
        },
        SudPpData: state => {
            return state.sud_pp_data;
        },

    },
    mutations: {
        setFilterPpArr (state, payload) {
            state.filterPp = payload
        },
        setSudPps (state, payload) {
            state.sud_pps = payload
        },
        setFlagSudPps (state, payload) {
            state.sud_ppFlags = payload
        },
        setQuerySudPps (state, payload) {
            state.query = payload
        },
        setTotalSudPps (state, payload) {
            state.total = payload
        },
        setQuerySudPpLimit (state, payload) {
            state.sud_pp_data.pag.limit = payload
        },
        setQuerySudPpOffset(state, payload) {
            state.sud_pp_data.pag.offset = payload*state.sud_pp_data.pag.limit
        },
    },
    actions: {
        getFilterPpArr({state, getters, commit, dispatch}, requestObject) {

            return new Promise((resolve, reject) => {
                axios.get(r("sudPp.index"), {
                    params: {
                        method: 'getFilterPpArr',
                        param: ''
                    }
                }).then((response) => {

                    if(response.data.result){
                        commit('setFilterPpArr', response.data.data)

                    } else {
                        commit('setFilterPpArr', [])

                    }
                })
            })
        },
        getDataSudPpAlls({state, getters, commit, dispatch}, requestObject) {
            commit('setSudPps', [])
            commit('setTotalSudPps', 0)
            commit('setFlagSudPps', 1)
            return new Promise((resolve, reject) => {
                axios.get(r("sudPp.index"), {
                    params: {
                        method: 'getDataSudPpAlls',
                        param: requestObject
                    }
                }).then((response) => {
                    commit('setFlagSudPps', 0)
                    if(response.data.result){
                        commit('setSudPps', response.data.data)
                        commit('setTotalSudPps', response.data.total)
                    } else {
                        commit('setSudPps', [])
                        commit('setTotalSudPps', 0)
                    }
                })
            })
        },
        getDataSudPps({state, getters, commit, dispatch}, requestObject) {
            commit('setSudPps', [])
            commit('setTotalSudPps', 0)
            return new Promise((resolve, reject) => {
                axios.get(r("sudPp.index"), {
                    params: {
                        method: 'getSudPps',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setSudPps', response.data.data)
                        commit('setTotalSudPps', response.data.total)
                    } else {
                        commit('setSudPps', [])
                        commit('setTotalSudPps', 0)
                    }
                })
            })
        },
        deleteSudPps({state, getters, commit, dispatch}, requestObject) {

            return new Promise((resolve, reject) => {
                axios.post(r("sudPp.index"), {
                    params: {
                        method: 'deleteSudPps',
                        param: requestObject
                    }
                }).then((response) => {

                    resolve(response.data.result)

                })
            })
        },
        cloneSudPps({state, getters, commit, dispatch}, requestObject) {

            return new Promise((resolve, reject) => {
                axios.post(r("sudPp.index"), {
                    params: {
                        method: 'cloneSudPps',
                        param: requestObject
                    }
                }).then((response) => {

                    resolve(response.data.result)

                })
            })
        },
    }
}



