import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        requestStatus:[],
        total:0,
        query: {}



    },
    getters: {
        // ...
        RequestStatussArr: state => {
            return state.requestStatus;
        },
        TotalRequestStatuss: state => {
            return state.total;
        },

        QueryRequestStatuss: state => {
            return state.query;
        },

    },
    mutations: {
        setRequestStatuss (state, payload) {
            state.requestStatus = payload

        },
        setQueryRequestStatuss (state, payload) {
            state.query = payload

        },
        setTotalRequestStatuss (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataRequestStatuss({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryRequestStatuss', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("requestStatus.index"), {
                    params: {
                        method: 'getRequestStatuss',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setRequestStatuss', response.data.data)
                        commit('setTotalRequestStatuss', response.data.total)
                    }




                })

            })
        },


    }



}



