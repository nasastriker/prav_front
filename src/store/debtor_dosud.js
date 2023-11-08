import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        debtorDosuds:[],
        reestr:{},
        total:0,
        query: {}



    },
    getters: {
        // ...
        DebtorDosudsArr: state => {
            return state.debtorDosuds;
        },
        ReestrDosud: state => {
            return state.reestr;
        },
        TotalDebtorDosuds: state => {
            return state.total;
        },

        QueryDebtorDosuds: state => {
            return state.query;
        },

    },
    mutations: {
        setDebtorDosuds (state, payload) {
            state.debtorDosuds = payload

        },
        setReestrDosuds (state, payload) {
            state.reestr = payload

        },
        setQueryDebtorDosuds (state, payload) {
            state.query = payload

        },
        setTotalDebtorDosuds (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataDebtorDosuds({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryDebtorDosuds', requestObject)
                }
                else{
                    param=getters.QueryDebtorDosuds
                }

                axios.get(r("debtorDosuds.index"), {
                    params: {
                        method: 'getDebtorDosud',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setDebtorDosuds', response.data.data)
                        commit('setReestrDosuds', response.data.reestr)
                        commit('setTotalDebtorDosuds', response.data.total)
                    }

                    resolve(response.data.result)


                })

            })
        },

    }



}



