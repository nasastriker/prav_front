import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../axios';
import r from '../../route';

Vue.use(Vuex);


export default {
    state: {

        dogovoras:[],
        total:0,
        query: {}

    },
    getters: {
        // ...

        DogovorasArr: state => {
            return state.dogovoras;
        },
        TotalDogovoras: state => {
            return state.total;
        },

        QueryDogovoras: state => {
            return state.query;
        },

    },
    mutations: {
        setDogovoras (state, payload) {
            state.dogovoras = payload

        },
        setQueryDogovoras (state, payload) {
            state.query = payload

        },
        setTotalDogovoras (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataDogovoras({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryDocuments', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                axios.get(r("siteDogovora.index"), {
                    params: {
                        method: 'getDogovoras',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setDogovoras', response.data.data)
                        commit('setTotalDogovoras', response.data.total)
                    }




                })

            })
        },
        deleteDogovora({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("siteDogovora.update"), {
                    params: {
                        method: 'deleteDogovor',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataDogovoras');
                    }

                    resolve(response.data.result)


                })

            })
        },

        setDogovor({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("siteDogovora.update"), {
                    params: {
                        method: 'setDogovor',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataDogovoras');
                    }

                    resolve(response.data.result)


                })

            })
        },
    }



}



