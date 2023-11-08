import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        pfrs:[],
        total:0,
        query: {},
        pfrsList:[],


    },
    getters: {
        // ...
        PfrListArr:state => {
            let arr=[{id:0,name:'Все'}]
            arr=arr.concat(state.pfrsList)
            return arr;
        },
        PfrsArr: state => {
            return state.pfrs;
        },
        TotalPfrs: state => {
            return state.total;
        },

        QueryPfrs: state => {
            return state.query;
        },

    },
    mutations: {
        setPfrList(state, payload) {
            state.pfrsList = payload
        },

        setPfrs (state, payload) {
            state.pfrs = payload

        },
        setQueryPfrs (state, payload) {
            state.query = payload

        },
        setTotalPfrs (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getPfrListArr({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("pfr.index"), {
                    params: {
                        method: 'getPfrList',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setPfrList', response.data.data)
                    }
                    else commit('setPfrList',[])
                })

            })
        },
        getDataPfrs({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryPfrs', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("pfr.index"), {
                    params: {
                        method: 'getPfrs',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setPfrs', response.data.data)
                        commit('setTotalPfrs', response.data.total)
                    }




                })

            })
        },
        deletePfr({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("pfr.update"), {
                    params: {
                        method: 'deletePfr',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataPfrs');
                    }
                    resolve(response.data.result)


                })

            })
        },
        savePfr({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("pfr.update"), {
                    params: {
                        method: 'savePfr',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataPfrs');
                    }
                    resolve(response.data.result)


                })

            })
        },
    }



}



