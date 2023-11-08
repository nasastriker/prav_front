import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        paymentFilterTaskAll:[],
    },
    getters: {
        // ...
        PaymentFilterTaskAll: state => {
            return state.paymentFilterTaskAll
        },


    },
    mutations: {
        setPaymentFilterTask(state, payload) {
            state.paymentFilterTaskAll = payload


        },


    },
    actions: {


        getPaymentFilterTask({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.get(r("paymentFilterTask.index"), {
                    params: {
                        method: 'getPaymentFilterTask',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setPaymentFilterTask',response.data.data)
                    }

                })

            })
        },


    }

}

