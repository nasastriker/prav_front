import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        data:[],
        total:0,
        query: {},
        archFsspFindFlag:false,



    },
    getters: {
        // ...
        ArchFsspsArr: state => {
            return state.data;
        },
        TotalArchFssps: state => {
            return state.total;
        },

        QueryArchFssps: state => {
            return state.query;
        },
        ArchFsspFindFlag:state => {
            return state.archFsspFindFlag;
        }

    },
    mutations: {

        setArchFssps (state, payload) {
            state.data = payload

        },
        setQueryArchFssps (state, payload) {
            state.query = payload

        },
        setTotalArchFssps (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataArchFssps({state, getters, commit, dispatch}, requestObject) {
            state.archFsspFindFlag=true
            return new Promise((resolve, reject) => {

                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryArchFssps', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("archFssp.index"), {
                    params: {
                        method: 'getArchFssps',
                        param: param
                    }
                }).then((response) => {
                    state.archFsspFindFlag=false
                    if(response.data.result){
                        commit('setArchFssps', response.data.data)
                        commit('setTotalArchFssps', response.data.total)
                    }




                })

            })
        },
        deleteArchFssp({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("archFssp.update"), {
                    params: {
                        method: 'deleteArchFssp',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataArchFssps');
                    }

                    resolve(response.data.result)


                })

            })
        },
        refreshFsspSa({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("archFssp.update"), {
                    params: {
                        method: 'refreshFsspSa',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataArchFssps');
                    }

                    resolve(response.data.result)


                })

            })
        },
        startJobFsspMonday({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("archFssp.update"), {
                    params: {
                        method: 'startJobFsspMonday',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },


    }



}



