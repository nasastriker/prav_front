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
        bank_list_loading_flag: false



    },
    getters: {
        // ...
        ArchBanksArr: state => {
            return state.data;
        },
        TotalArchBanks: state => {
            return state.total;
        },

        QueryArchBanks: state => {
            return state.query;
        },
        BankListLoadingFlag: state => {
            return state.bank_list_loading_flag;
        },

    },
    mutations: {

        setArchBanks (state, payload) {
            state.data = payload

        },
        setQueryArchBanks (state, payload) {
            state.query = payload

        },
        setTotalArchBanks (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataArchBanks({state, getters, commit, dispatch}, requestObject) {
            state.bank_list_loading_flag = true;
            commit('setArchBanks', [])
            commit('setTotalArchBanks', 0)
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryArchBanks', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("archBank.index"), {
                    params: {
                        method: 'getArchBanks',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setArchBanks', response.data.data)
                        commit('setTotalArchBanks', response.data.total)
                    } else {
                        commit('setArchBanks', [])
                        commit('setTotalArchBanks', 0)
                    }
                    state.bank_list_loading_flag = false;




                })

            })
        },
        deleteArchBank({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("archBank.update"), {
                    params: {
                        method: 'deleteArchBank',
                        param: requestObject
                    }
                }).then((response) => {

                    resolve(response.data.result)


                })

            })
        },


    }



}



