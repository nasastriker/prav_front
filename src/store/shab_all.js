import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        shabAll:[],
        total:0,
        query: {}



    },
    getters: {
        // ...
        ShabAllArr: state => {
            return state.shabAll;
        },
        TotalShabAlls: state => {
            return state.total;
        },

        QueryShabAlls: state => {
            return state.query;
        },

    },
    mutations: {
        setShabAlls (state, payload) {
            state.shabAll = payload

        },
        setQueryShabAlls (state, payload) {
            state.query = payload

        },
        setTotalShabAlls (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataShabAlls({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryShabAlls', requestObject)
                }
                else{
                    param=getters.QueryShabAlls
                }

                axios.get(r("shablonDocument.index"), {
                    params: {
                        method: 'getShabAlls',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setShabAlls', response.data.data)
                        commit('setTotalShabAlls', response.data.total)
                        resolve(response.data.result)
                    }




                })

            })
        },

    }



}



