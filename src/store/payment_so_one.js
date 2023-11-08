import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {

        paymentSoOnes:[],
        total:0,
        total_sum_so:0,
        query: {}

    },
    getters: {
        // ...

        PaymentSoOnesArr: state => {
            return state.paymentSoOnes;
        },
        TotalPaymentSoOnes: state => {
            return state.total;
        },

        QueryPaymentSoOnes: state => {
            return state.query;
        },
        TotalSumSoOnes: state => {
            return state.total_sum_so;
        },

    },
    mutations: {
        setPaymentSoOnes (state, payload) {
            state.paymentSoOnes = payload

        },
        setQueryPaymentSoOnes (state, payload) {
            state.query = payload

        },
        setTotalPaymentSoOnes (state, payload) {
            state.total = payload

        },
        setTotalSumSoOnes (state, payload) {
            state.total_sum_so = payload

        }

    },
    actions: {
        getDataPaymentSoOnes({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryPaymentSoOnes', requestObject)
                }
                else{
                    param=getters.QueryPaymentSoOnes
                }
                axios.get(r("paymentSoOne.index"), {
                    params: {
                        method: 'getPaymentSoOnes',
                        param: param
                    }
                }).then((response) => {
                    commit('setPaymentSoOnes', response.data.data)
                    commit('setTotalPaymentSoOnes', response.data.total)
                    commit('setTotalSumSoOnes', response.data.total_sum_so)
                })

            })
        },
        delPaymentSoOne({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("paymentSoOne.update"), {
                    params: {
                        method: 'deletePaymentSoOne',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataPaymentSoOnes');
                    }

                    resolve(response.data.result)


                })

            })
        },

        setPaymentSoOne({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("paymentSoOne.update"), {
                    params: {
                        method: 'setPaymentSoOne',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataPayments');
                    }

                    resolve(response.data.result)


                })

            })
        },
        getInfoPaymentSo({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("paymentSoOne.index"), {
                    params: {
                        method: 'getInfoPaymentSo',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
    }



}



