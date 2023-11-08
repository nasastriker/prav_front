import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        data:[],
        total:0,
        query: {}



    },
    getters: {
        // ...
        ArchBankOtherSasArr: state => {
            return state.data;
        },
        TotalArchBankOtherSas: state => {
            return state.total;
        },

        QueryArchBankOtherSas: state => {
            return state.query;
        },

    },
    mutations: {
        setArchBankOtherSas (state, payload) {
            state.data = payload

        },
        setQueryArchBankOtherSas (state, payload) {
            state.query = payload

        },
        setTotalArchBankOtherSas (state, payload) {
            state.total = payload

        }

    },
    actions: {

        getDataArchBankOtherSas({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryArchBankOtherSas', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("archBankOtherSa.index"), {
                    params: {
                        method: 'getArchBankOtherSas',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setArchBankOtherSas', response.data.data)
                        commit('setTotalArchBankOtherSas', response.data.total)
                    }




                })

            })
        },
        deleteArchOtherSa({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("archBankOtherSa.update"), {
                    params: {
                        method: 'deleteArchOtherSa',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataArchBankOtherSas');
                    }

                    resolve(response.data.result)


                })

            })
        },
        refreshArchOtherSa({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("archBankOtherSa.update"), {
                    params: {
                        method: 'refreshArchOtherSa',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataArchBankOtherSas');
                    }

                    resolve(response.data.result)


                })

            })
        },

    }



}



