import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        debtorReestrs:[],
        total:0,
        name:'',

        query: {}



    },
    getters: {
        // ...
        DebtorReestrsArr: state => {
            return state.debtorReestrs;
        },
        TotalDebtorReestrs: state => {
            return state.total;
        },

        QueryDebtorReestrs: state => {
            return state.query;
        },
        DebtorReestrsArrName:state => {
        return state.name;
},

    },
    mutations: {
        setDebtorReestrs (state, payload) {
            state.debtorReestrs = payload

        },
        setDebtorReestrsName (state, payload) {
            state.name = payload

        },
        setQueryDebtorReestrs (state, payload) {
            state.query = payload

        },
        setTotalDebtorReestrs (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataDebtorReestrs({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setDebtorReestrs', [])
                commit('setDebtorReestrsName', '')
                commit('setTotalDebtorReestrs', 0)

                axios.get(r("reestr.index"), {
                    params: {
                        method: 'getDebtorCreditByIDReestr',
                        param: requestObject.debtor_reestr,
                        id:requestObject.id
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setDebtorReestrs', response.data.data)
                        commit('setDebtorReestrsName', response.data.name)
                        commit('setTotalDebtorReestrs', response.data.total)
                    }




                })

            })
        },

    }



}



