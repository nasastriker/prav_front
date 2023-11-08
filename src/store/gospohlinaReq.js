import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        gospohlinaReqs:[],
        total:0,
        query: {}



    },
    getters: {
        // ...
        GospohlinaReqsArr: state => {
            return state.gospohlinaReqs;
        },
        TotalGospohlinaReqs: state => {
            return state.total;
        },

        QueryGospohlinaReqs: state => {
            return state.query;
        },

    },
    mutations: {
        setGospohlinaReqs (state, payload) {
            state.gospohlinaReqs = payload

        },
        setQueryGospohlinaReqs (state, payload) {

            state.query = payload

        },
        setTotalGospohlinaReqs (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataGospohlinaReqs({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.get(r("gospohlinaReq.index"), {
                    params: {
                        method: 'getGospohlinaReqs',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setGospohlinaReqs', response.data.data)
                        commit('setTotalGospohlinaReqs', response.data.total)
                    }




                })

            })
        },
        getGospohlinaReq({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryGospohlinaReqs', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("gospohlinaReq.index"), {
                    params: {
                        method: 'getGospohlinaReq',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setGospohlinaReqs', response.data.data)
                        commit('setTotalGospohlinaReqs', response.data.total)
                    }




                })

            })
        },
        deleteGospohlinaReq({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("gospohlinaReq.update"), {
                    params: {
                        method: 'deleteGospohlinaReq',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataGospohlinaReqs');
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveGospohlinaReq({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("gospohlinaReq.update"), {
                    params: {
                        method: 'saveGospohlinaReq',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataGospohlinaReqs');
                    }
                    resolve(response.data.result)


                })

            })
        },
    }



}



