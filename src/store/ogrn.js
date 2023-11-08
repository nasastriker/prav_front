import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        ogrns:[],
        total:0,
        query: {}



    },
    getters: {
        // ...
        OgrnsArr: state => {
            return state.ogrns;
        },
        TotalOgrns: state => {
            return state.total;
        },

        QueryOgrns: state => {
            return state.query;
        },

    },
    mutations: {
        setOgrns (state, payload) {
            state.ogrns = payload

        },
        setQueryOgrns (state, payload) {
            state.query = payload

        },
        setTotalOgrns (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataOgrns({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryOgrns', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("ogrn.index"), {
                    params: {
                        method: 'getOgrns',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setOgrns', response.data.data)
                        commit('setTotalOgrns', response.data.total)
                    }




                })

            })
        },
        deleteOgrn({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("ogrn.update"), {
                    params: {
                        method: 'deleteOgrn',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataOgrns');
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveOgrn({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("ogrn.update"), {
                    params: {
                        method: 'saveOgrn',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataOgrns');
                    }
                    resolve(response.data.result)


                })

            })
        },
    }



}



