import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {

        paymentAlls:[],
        paymentFindFlag:false,
        total:0,
        paySum:0,
        paySumAll:0,
        paySumProb:0,
        query: {},
        name:'',
        sumPayments:0,
        paymentStatusList:[],
    },
    getters: {
        // ...
        SumPaymentsFromArrayPayments:state => {
            return state.sumPayments
        },

        PaymentFindFlag: state => {
            return state.paymentFindFlag
        },

        PaymentReestrsName:state => {
            return state.name;
        },
        PaymentAllsArr: state => {
            return state.paymentAlls;
        },
        PaymentSum: state => {
            return state.paySum;
        },
        PaymentSumAll: state => {
            return state.paySumAll;
        },
        PaymentSumProb: state => {
            return state.paySumProb;
        },
        TotalPaymentAlls: state => {
            return state.total;
        },

        QueryPaymentAlls: state => {
            return state.query;
        },
        StatussArrPaymentAndAll: state => {
            /*let arr=[];
            arr.push({
                id:0,
                name:'Все'
            });
            arr.push({
                id:1,
                name:'Проведенные'
            });
            arr.push({
                id:2,
                name:'Проблемнные'
            });
            arr.push({
                id:3,
                name:'История Проведенные'
            });
            arr.push({
                id:4,
                name:'История Проблемнные'
            });
            return arr;*/
            state.paymentStatusList.unshift({id:0,name:'Все'})
            return state.paymentStatusList
        },

    },
    mutations: {
        setSumPaymentsFromArrayPayments(state, payload) {
            state.sumPayments = payload


        },

        setPaymentAlls (state, payload) {
            state.paymentAlls = payload

        },
        setQueryPaymentAlls (state, payload) {
            state.query = payload

        },
        setTotalPaymentAlls (state, payload) {
            state.total = payload

        },
        clearPaymentAlls(state) {
            state.total = 0
            state.paymentAlls = []
            state.paySum=0
            state.paySumProb=0
            state.paySumAll=0

        },
        setPaymentReestrsName (state, payload) {
            state.name = payload

        },
        setPaymentSum(state, payload) {
            state.paySum = payload

        },
        setPaymentSumAll(state, payload) {
            state.paySumAll = payload

        },
        setPaymentSumProb(state, payload) {
            state.paySumProb = payload

        },
        setPaymentStatusList(state,payload){
            state.paymentStatusList=payload
        }

    },
    actions: {
        getDataPaymentAllByReestrs({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('clearPaymentAlls')
                axios.get(r("payment.index"), {
                    params: {
                        method: 'getDataPaymentAllByReestrs',
                        param: {
                            req:requestObject.req,
                            id:requestObject.id
                        }
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setPaymentAlls', response.data.data)
                        commit('setTotalPaymentAlls', response.data.total)
                        commit('setPaymentSum', response.data.sum)
                        commit('setPaymentSumAll', response.data.sumAll)
                        commit('setPaymentSumProb', response.data.sumProb)
                        commit('setPaymentReestrsName', response.data.name)
                    }




                })

            })
        },
        getDataPaymentAlls({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.paymentFindFlag = true
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryPaymentAlls', requestObject)
                }
                else{
                    param=getters.QueryPaymentAlls
                }
                commit('clearPaymentAlls')
                axios.get(r("payment.index"), {
                    params: {
                        method: 'getPaymentAlls',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setPaymentAlls', response.data.data)
                        commit('setTotalPaymentAlls', response.data.total)
                        commit('setSumPaymentsFromArrayPayments', response.data.sum)

                    }
                    state.paymentFindFlag = false
                })
            })
        },

        getPaymentStatusList({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.get(r("payment.index"), {
                    params: {
                        method: 'getPaymentStatusList',
                        param: requestObject
                    }
                }).then((response) => {
                let r=response.data.data
                    commit('setPaymentStatusList',response.data.data||[])
                    resolve(response.result)
                })

            })
        },

        deletePayment({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("payment.update"), {
                    params: {
                        method: 'deletePayment',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataPaymentAlls');
                    }

                    resolve(response.data.result)


                })

            })
        },
        checkPaymentFilterFromXLS({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("payment.update"), {
                    params: {
                        method: 'checkFilterFromXLS',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        importPaymentFromXLS({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("payment.update"), {
                    params: {
                        method: 'importFilterFromXLS',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        setPaymentAll({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("payment.update"), {
                    params: {
                        method: 'setPaymentAll',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataPaymentAlls');
                    }

                    resolve(response.data.result)


                })

            })
        },
    }



}



