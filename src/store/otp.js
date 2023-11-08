import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {

        otp:[],
        total:0,
        query: {}

    },
    getters: {
        // ...

        OtpArr: state => {
            return state.otp;
        },
        TotalOtp: state => {
            return state.total;
        },

        QueryOtp: state => {
            return state.query;
        },

    },
    mutations: {
        setOtp (state, payload) {
            state.otp = payload

        },
        setQueryOtp (state, payload) {
            state.query = payload

        },
        setTotalOtp (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataOtp({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setOtp', [])
                commit('setTotalOtp', 0)
                axios.get(r("otp.index"), {
                    params: {
                        method: 'getOtp',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setOtp', response.data.data)
                        commit('setTotalOtp', response.data.total)
                    }




                })

            })
        },

    }



}



