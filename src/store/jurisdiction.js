import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        jurisdictions:[],
        total:0,
        query: {
            offset:0,
            limit:10
        }



    },
    getters: {
        // ...
        JurisdictionsArr: state => {
            return state.jurisdictions;
        },
        TotalJurisdictions: state => {
            return state.total;
        },

        QueryJurisdictions: state => {
            return state.query;
        },

    },
    mutations: {
        setJurisdictions (state, payload) {
            state.jurisdictions = payload

        },
        setQueryJurisdictions (state, payload) {
            state.query = payload

        },
        // setQueryJurisdictionsLimit (state, payload) {
        //     state.query.limit = payload
        //
        // },
        // setQueryJurisdictionsOffset(state, payload) {
        //     state.query.offset = payload*state.query.limit
        //
        // },
        setTotalJurisdictions (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataJurisdictions({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    // commit('setQueryJurisdictions', requestObject)
                }
                else{
                    param=getters.User.pag.jurisdictions
                }
                //  console.log(localStorage);

                axios.get(r("jurisdiction.index"), {
                    params: {
                        method: 'getJurisdictions',
                        param: param
                    }
                }).then((response) => {
                        commit('setJurisdictions', response.data.data)
                        commit('setTotalJurisdictions', response.data.total)
                })

            })
        },
        deleteJurisdiction({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("jurisdiction.update"), {
                    params: {
                        method: 'deleteJurisdiction',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                    //    dispatch('getDataJurisdictions');
                    }
                    resolve(response.data.result)
                })

            })
        },
        saveJurisdiction({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("jurisdiction.update"), {
                    params: {
                        method: 'saveJurisdiction',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                    //    dispatch('getDataJurisdictions');
                    }
                    resolve(response.data.result)


                })

            })
        },
        getDataJurisdictionsByJudicial({state, getters, commit, dispatch}, requestObject) {
            let param
            if(typeof requestObject!="undefined"){
                param=requestObject
                commit('setQueryJurisdictions', requestObject)
            }
            else{
                param=getters.QueryJurisdictions
            }
            return new Promise((resolve, reject) => {
                axios.get(r("jurisdiction.index"), {
                    params: {
                        method: 'getJurisdictions',
                        param: param
                    }
                }).then((response) => {
                    commit('setJurisdictions', response.data.data)
                    commit('setTotalJurisdictions', response.data.total)
                })

            })
        },
        changeCheckToDel({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("jurisdiction.update"), {
                    params: {
                        method: 'changeCheckToDel',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })

            })
        },
    }



}



