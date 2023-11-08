import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {

        paymentSos:[],
        total:0,
        query: {},
        name:''

    },
    getters: {
        // ...
        PaymentSoReestrsName:state => {
            return state.name;
        },
        PaymentSosArr: state => {
            return state.paymentSos;
        },
        TotalPaymentSos: state => {
            return state.total;
        },

        QueryPaymentSos: state => {
            return state.query;
        },

    },
    mutations: {
        setPaymentSos (state, payload) {
            state.paymentSos = payload

        },
        setQueryPaymentSos (state, payload) {
            state.query = payload

        },
        setTotalPaymentSos (state, payload) {
            state.total = payload

        },
        setPaymentSoReestrsName (state, payload) {
            state.name = payload

        },
        clearPaymentSos(state) {
            state.total = 0
            state.paymentSos = []
        },

    },
    actions: {
        getDataPaymentSosByReestrs({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('clearPaymentSos')
                axios.get(r("paymentSo.index"), {
                    params: {
                        method: 'getDataPaymentSosByReestrs',
                        param: {
                            req:requestObject.req,
                            id:requestObject.id
                        }
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setPaymentSos', response.data.data)
                        commit('setTotalPaymentSos', response.data.total)
                        commit('setPaymentSoReestrsName', response.data.name)
                    }




                })

            })
        },
        getDataPaymentSos({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryPaymentSos', requestObject)
                }
                else{
                    param=getters.QueryPaymentSos
                }
                axios.get(r("paymentSo.index"), {
                    params: {
                        method: 'getPaymentSos',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setPaymentSos', response.data.data)
                        commit('setTotalPaymentSos', response.data.total)
                    }




                })

            })
        },
        delPaymentSo({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("paymentSo.update"), {
                    params: {
                        method: 'deletePaymentSo',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataPaymentSos');
                    }

                    resolve(response.data.result)


                })

            })
        },

        setPaymentSo({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("paymentSo.update"), {
                    params: {
                        method: 'setPaymentSo',
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
    }



}



