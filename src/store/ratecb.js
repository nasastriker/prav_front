import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        rates:[],
        total:0,
        query: {},
        pag: {
            offset:0,
            limit:10,
            find:'',
            curPage: 1
        }


    },
    getters: {
        // ...
        RatesArr: state => {
            return state.rates;
        },
        TotalRates: state => {
            return state.total;
        },

        QueryRates: state => {
            return state.query;
        },

        PagRateCB: state => {
            return state.pag;
        },

    },
    mutations: {
        setRates (state, payload) {
            state.rates = payload

        },
        setQueryRates (state, payload) {
            state.query = payload

        },
        setTotalRates (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataRates({state, getters, commit, dispatch}, requestObject) {

            console.log("OBJ", requestObject)
            return new Promise((resolve, reject) => {

                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryRates', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }

                axios.get(r("ratecb.index"), {
                    params: {
                        method: 'getRates',
                        // param: param
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setRates', response.data.data)
                        commit('setTotalRates', response.data.total)
                    }
                    console.log('HERE', response)


                    resolve(response.data.result)
                })

            })
        },
        deleteRate({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("ratecb.update"), {
                    params: {
                        method: 'deleteRate',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataRates');
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveRate({state, getters, commit, dispatch}, requestObject) {
            console.log("SAVE HERE")
            return new Promise((resolve, reject) => {
                axios.post(r("ratecb.update"), {
                    params: {
                        method: 'saveRate',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataRates');
                    }
                    resolve(response.data.result)


                })

            })
        },
    }



}



