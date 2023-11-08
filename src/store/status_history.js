import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        statuss:[],
        total:0,
        query: {},



    },
    getters: {

        StatussHistoryArr: state => {
            return state.statuss;
        },

        TotalStatussHistory: state => {
            return state.total;
        },

        QueryStatussHistory: state => {
            return state.query;
        },

    },
    mutations: {
        setStatussHistory (state, payload) {
            state.statuss = payload

        },

        setQueryStatussHistory (state, payload) {
            state.query = payload

        },

        setTotalStatussHistory (state, payload) {
            state.total = payload

        },



    },
    actions: {
        changeCheckToDelStatus ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r('status.update'), {
                    params: {
                        method: 'changeCheckToDelStatus',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })

            })
        },
        getDataStatussHistory({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {


                axios.get(r("status.index"), {
                    params: {
                        method: 'getStatussHistory',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setStatussHistory', response.data.data)
                        commit('setTotalStatussHistory', response.data.total)
                    }




                })

            })
        },

        saveStatussHistory({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("status.update"), {
                    params: {
                        method: 'saveStatus',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataStatussHistory');
                    }
                    resolve(response.data.result)


                })

            })
        },

    }



}



