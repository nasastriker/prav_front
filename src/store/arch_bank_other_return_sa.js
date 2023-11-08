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
        ArchBankOtherReturnSasArr: state => {
            return state.data;
        },
        TotalArchBankOtherReturnSas: state => {
            return state.total;
        },

        QueryArchBankOtherReturnSas: state => {
            return state.query;
        },

    },
    mutations: {
        setArchBankOtherReturnSas (state, payload) {
            state.data = payload

        },
        setQueryArchBankOtherReturnSas (state, payload) {
            state.query = payload

        },
        setTotalArchBankOtherReturnSas (state, payload) {
            state.total = payload

        }

    },
    actions: {

        getDataArchBankOtherReturnSas({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setArchBankOtherReturnSas', [])
                commit('setTotalArchBankOtherReturnSas', 0)
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryArchBankOtherReturnSas', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("returnBank.index"), {
                    params: {
                        method: 'getArchBankOtherReturnSas',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setArchBankOtherReturnSas', response.data.data)
                        commit('setTotalArchBankOtherReturnSas', response.data.total)
                    }




                })

            })
        },

    }



}



