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
     



    },
    getters: {
        // ...
       
        UpdateDataArr: state => {
            return state.data;
        },
     
        TotalUpdateData: state => {
            return state.total;
        },

        QueryUpdateData: state => {
            return state.query;
        },

    },
    mutations: {
        setUpdateData (state, payload) {
            state.data = payload

        },
       
       
        setQueryUpdateData (state, payload) {
            state.query = payload

        },
        setTotalUpdateData (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataUpdateDataId({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setUpdateDataId', [])
                commit('setTotalUpdateDataId', 0)

                axios.get(r("updateData.index"), {
                    params: {
                        method: 'getUpdateDataId',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setUpdateDataId', response.data.data)
                        commit('setTotalUpdateDataId', response.data.total)
                    }




                })

            })
        },
        getDataUpdateData({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.get(r("updateData.index"), {
                    params: {
                        method: 'getUpdateData',
                        param: ''
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setUpdateData', response.data.data)
                        commit('setTotalUpdateData', response.data.total)
                    }




                })

            })
        },



    }



}



