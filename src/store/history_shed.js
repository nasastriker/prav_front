import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        history:[],
        total:0,
        query: {}



    },
    getters: {
        // ...
        HistoryShedsArr: state => {
            return state.history;
        },
        TotalHistorySheds: state => {
            return state.total;
        },

        QueryHistoryShed: state => {
            return state.query;
        },

    },
    mutations: {
        setHistoryShed (state, payload) {
            state.history = payload

        },
        setQueryHistoryShed (state, payload) {
            state.query = payload

        },
        setTotalHistoryShed (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataHistorySheds({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryHistoryShed', requestObject)
                }
                else{
                    param=getters.QueryHistoryShed
                }

                axios.get(r("historyShed.index"), {
                    params: {
                        method: 'getHistory',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setHistoryShed', response.data.data)
                        commit('setTotalHistoryShed', response.data.data.length)
                    }




                })

            })
        },


    }



}



