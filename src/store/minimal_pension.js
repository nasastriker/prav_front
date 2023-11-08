import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        min_pensions:[],
        total_min_pensions:0,
        min_pensions_loading_flag: false,
        region_list_mp:[],
    },
    getters: {
        // ...
        MinimalPensions: state => {
            return state.min_pensions;
        },
        TotalMinimalPensions: state => {
            return state.total_min_pensions;
        },
        MinimalPensionsLoadingFlag: state => {
            return state.min_pensions_loading_flag;
        },
        RegionListMP: state => {
            return state.region_list_mp;
        },

    },
    mutations: {
        setMinimalPensions (state, payload) {
            state.min_pensions = payload
        },
        setTotalMinimalPensions (state, payload) {
            state.total_min_pensions = payload
        },
        setRegionListMP (state, payload) {
            state.region_list_mp = payload
        },
    },
    actions: {
        getMinimalPensions({state, getters, commit, dispatch}, requestObject) {
            state.min_pensions_loading_flag = true;
            commit('setMinimalPensions', [])
            commit('setTotalMinimalPensions', 0)
            return new Promise((resolve, reject) => {
                axios.get(r("minPension.index"), {
                    params: {
                        method: 'getMinimalPensions',
                        param: requestObject
                    }
                }).then((response) => {
                    state.min_pensions_loading_flag = false;
                    if(response.data.result){
                        commit('setMinimalPensions', response.data.data)
                        commit('setTotalMinimalPensions', response.data.total)
                    }
                })

            })
        },
        getRegionListMP({state, getters, commit, dispatch}, requestObject) {
            commit('setRegionListMP', [])
            return new Promise((resolve, reject) => {
                axios.get(r('minPension.index'), {
                    params: {
                        method: 'getRegionListMP',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setRegionListMP', response.data.data)
                    }
                })
            })
        },
        saveMinPensData({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("minPension.update"), {
                    params: {
                        method: 'saveMinPensData',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        getMinPensData ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('minPension.index'), {
                    params: {
                        method: 'getMinPensData',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        deleteMinPens({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("minPension.update"), {
                    params: {
                        method: 'deleteMinPens',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
      
      
      
    }



}



