import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        data:[],
        total:0,
        query: {},
        bank_list_sa_loading_flag: false



    },
    getters: {
        // ...
        ArchBankSasArr: state => {
            return state.data;
        },
        TotalArchBankSas: state => {
            return state.total;
        },

        QueryArchBankSas: state => {
            return state.query;
        },
        BankListSaLoadingFlag: state => {
            return state.bank_list_sa_loading_flag;
        },

    },
    mutations: {
        setArchBankSas (state, payload) {
            state.data = payload

        },
        setQueryArchBankSas (state, payload) {
            state.query = payload

        },
        setTotalArchBankSas (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataArchBankSas({state, getters, commit, dispatch}, requestObject) {
            state.bank_list_sa_loading_flag = true;
            commit('setArchBankSas', [])
            commit('setTotalArchBankSas', 0)
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryArchBankSas', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("archBankSa.index"), {
                    params: {
                        method: 'getArchBankSas',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setArchBankSas', response.data.data)
                        commit('setTotalArchBankSas', response.data.total)
                    } else {
                        commit('setArchBankSas', [])
                        commit('setTotalArchBankSas', 0)
                    }
                    state.bank_list_sa_loading_flag = false;




                })

            })
        },
        deleteArchBankSa({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("archBankSa.update"), {
                    params: {
                        method: 'deleteArchBankSa',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataArchBankSas');
                    }

                    resolve(response.data.result)


                })

            })
        },
        refreshArchSa({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("archBankSa.update"), {
                    params: {
                        method: 'refreshArchSa',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataArchBankSas');
                    }

                    resolve(response.data.result)


                })

            })
        },

    }



}



