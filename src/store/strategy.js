import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        strategys:[],
        total:0,
        query: {},
        strategy_req_history: {}



    },
    getters: {
        // ...
        StrategysArr: state => {
            return state.strategys;
        },
        TotalStrategys: state => {
            return state.total;
        },

        QueryStrategys: state => {
            return state.query;
        },

    },
    mutations: {
        setStrategys (state, payload) {
            state.strategys = payload

        },
        setQueryStrategys (state, payload) {
            state.query = payload

        },
        setTotalStrategys (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataStrategys({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryStrategys', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("strategy.index"), {
                    params: {
                        method: 'getStrategys',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setStrategys', response.data.data)
                        commit('setTotalStrategys', response.data.total)
                    }




                })

            })
        },
        deleteStrategy({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("strategy.update"), {
                    params: {
                        method: 'deleteStrategy',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataStrategys');
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveStrategy({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("strategy.update"), {
                    params: {
                        method: 'saveStrategy',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataStrategys');
                    }
                    resolve(response.data.result)


                })

            })
        },


    }



}



