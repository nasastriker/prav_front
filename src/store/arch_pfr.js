import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        data:[],
        total:0,
        query: {}



    },
    getters: {
        // ...
        ArchPfrsArr: state => {
            return state.data;
        },
        TotalArchPfrs: state => {
            return state.total;
        },

        QueryArchPfrs: state => {
            return state.query;
        },

    },
    mutations: {
        setArchPfrs (state, payload) {
            state.data = payload

        },
        setQueryArchPfrs (state, payload) {
            state.query = payload

        },
        setTotalArchPfrs (state, payload) {
            state.total = payload

        }

    },
    actions: {

        startJobPfrMonday({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("archPfr.index"), {
                    params: {
                        method: 'startJobPfrMonday',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },


        getDataArchPfrs({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryArchPfrs', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("archPfr.index"), {
                    params: {
                        method: 'getArchPfrs',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setArchPfrs', response.data.data)
                        commit('setTotalArchPfrs', response.data.total)
                    }




                })

            })
        },
        deleteArchPfr({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("archPfr.update"), {
                    params: {
                        method: 'deleteArchPfr',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataArchPfrs');
                    }

                    resolve(response.data.result)


                })

            })
        },

    }



}



