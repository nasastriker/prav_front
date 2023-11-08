import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        dopVar:[],
        dopVarCalc:[],
        dopVarRab:[],
        reestr:{},
        total:0,
        query: {}



    },
    getters: {
        // ...
        DebtorCreditDopVarArr: state => {
            return state.dopVar;
        },
        DebtorCreditDopVarCalcArr: state => {
            return state.dopVarCalc;
        },
        DebtorCreditDopVarRabArr: state => {
            return state.dopVarRab;
        },
        TotalDebtorCreditDopVar: state => {
            return state.total;
        },

        QueryDebtorCreditDopVar: state => {
            return state.query;
        },

    },
    mutations: {
        setDebtorCreditDopVar (state, payload) {
            state.dopVar = payload

        },
        setDebtorCreditDopCalcVar (state, payload) {
            state.dopVarCalc = payload

        },
        setDebtorCreditDopRabVar (state, payload) {
            state.dopVarRab = payload

        },
        setQueryDebtorCreditDopVar (state, payload) {
            state.query = payload

        },
        setTotalDebtorCreditDopVar (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataDebtorCreditDopVar({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setDebtorCreditDopVar',[])
                commit('setDebtorCreditDopCalcVar',[])
                commit('setTotalDebtorCreditDopVar', 0)

                axios.get(r("debtorCredit.index"), {
                    params: {
                        method: 'getDebtorCreditDopVar',
                        param:''
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setDebtorCreditDopVar', response.data.data)
                        commit('setDebtorCreditDopCalcVar', response.data.calc)
                        commit('setDebtorCreditDopRabVar', response.data.rab)
                        commit('setTotalDebtorCreditDopVar', response.data.total)
                    }




                })

            })
        },

    }



}



