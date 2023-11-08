import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        systemHistory:[],
        total:0,
        query: {},

        delete_field_history:[],
        delete_field_history_loading_flag:false



    },
    getters: {
        // ...
        DeleteFieldHistoryArr: state => {
            return state.delete_field_history;
        },
        DeleteFieldHistoryLoadingFlag: state => {
            return state.delete_field_history_loading_flag;
        },
        SystemHistorysArr: state => {
            return state.systemHistory;
        },
        TotalSystemHistorys: state => {
            return state.total;
        },

        QuerySystemHistorys: state => {
            return state.query;
        },

    },
    mutations: {
        setDeleteFieldHistoryArr (state, payload) {
            state.delete_field_history = payload

        },
        setSystemHistorys (state, payload) {
            state.systemHistory = payload

        },
        setQuerySystemHistorys (state, payload) {
            state.query = payload

        },
        setTotalSystemHistorys (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataSystemHistorys({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQuerySystemHistorys', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("system.index"), {
                    params: {
                        method: 'getSystemHistorys',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setSystemHistorys', response.data.data)
                        commit('setTotalSystemHistorys', response.data.total)
                    }




                })

            })
        },
        getDeleteFieldHistoryArr ({state, getters, commit, dispatch}, requestObject) {
            state.delete_field_history_loading_flag = true;
            commit('setDeleteFieldHistoryArr', [])
            return new Promise((resolve, reject) => {
                axios.get(r('system.index'), {
                    params: {
                        method: 'getDeleteFieldHistoryArr',
                        param: requestObject
                    }
                }).then((response) => {
                    state.delete_field_history_loading_flag = false;
                    if (response.data.result) {
                        commit('setDeleteFieldHistoryArr', response.data.data)
                    }
                    resolve(response.data)
                })
            })
        },





    }



}



