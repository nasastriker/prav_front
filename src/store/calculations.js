
import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
    state: {
        calculations: [],
        total: 0,
        calcArr:[],
    },
    getters: {
        Calculations: state => {
            return state.calculations
        },
        CalculationList: state => {
            return state.calcArr
        },
        TotalCalculations: state => {
            return state.total
        }

    },
    mutations: {
        setCalculations(state, payload) {
            state.calculations = payload
        },
        setCalculationList(state, payload) {
            state.calcArr = payload
        },
        setTotalCalculations(state, payload) {
            state.total = payload
        }
    },
    actions: {
        getCalculations({state, getters, commit, dispatch}, requestObject = null) {
            commit('setCalculations', [])
            return new Promise((resolve, reject) => {
                axios.get(r('calculateList.index'), {
                    params: {
                        method: 'getCalculations',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setCalculations', response.data.data)
                        commit('setTotalCalculations', response.data.total)
                    } else {
                        commit('setCalculations', [])
                        commit('setTotalCalculations', 0)
                    }
                })
            })
        },

        getCalculationsOnce({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('calculateList.index'), {
                    params: {
                        method: 'getCalculationsOnce',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        getCalculationList({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('calculateList.index'), {
                    params: {
                        method: 'getCalculationList',
                        param: requestObject
                    }
                }).then((response) => {
                    commit('setCalculationList', response.data.data)
                })
            })
        },


    }
}