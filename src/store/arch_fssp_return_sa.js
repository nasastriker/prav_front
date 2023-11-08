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
        ArchFsspReturnSasArr: state => {
            return state.data;
        },
        TotalArchFsspReturnSas: state => {
            return state.total;
        },

        QueryArchFsspReturnSas: state => {
            return state.query;
        },

    },
    mutations: {
        setArchFsspReturnSas (state, payload) {
            state.data = payload

        },
        setQueryArchFsspReturnSas (state, payload) {
            state.query = payload

        },
        setTotalArchFsspReturnSas (state, payload) {
            state.total = payload

        }

    },
    actions: {

        getDataArchFsspReturnSas({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryArchFsspReturnSas', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("archFsspReturnSa.index"), {
                    params: {
                        method: 'getArchFsspReturnSas',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setArchFsspReturnSas', response.data.data)
                        commit('setTotalArchFsspReturnSas', response.data.total)
                    }




                })

            })
        },
        deleteArchFsspReturnSa({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("archFsspReturnSa.update"), {
                    params: {
                        method: 'deleteArchFsspReturnSa',
                        param: requestObject
                    }
                }).then((response) => {

                    resolve(response.data.result)




                })

            })
        },
        refreshArchFsspReturnSa({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("archFsspReturnSa.update"), {
                    params: {
                        method: 'refreshArchFsspReturnSa',
                        param: requestObject
                    }
                }).then((response) => {

                    resolve(response.data.result)




                })

            })
        },

    }



}



