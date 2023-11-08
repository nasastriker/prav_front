import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        strategyPeremen:[],
        strategyPeremenUsl:[],
        strategyPeremenAction:[],
        totalStrategyPeremenUsl:0,
        totalStrategyPeremenAction:0,
        total:0,
        query: {}



    },
    getters: {
        // ...
        TotalStrategyPeremensActionArr: state => {
            return state.totalStrategyPeremenAction;
        },
        StrategyPeremensActionArr: state => {
            return state.strategyPeremenAction;
        },
        TotalStrategyPeremensUslArr: state => {
            return state.totalStrategyPeremenUsl;
        },
        StrategyPeremensUslArr: state => {
            return state.strategyPeremenUsl;
        },
        StrategyPeremensArr: state => {
            return state.strategyPeremen;
        },
        TotalStrategyPeremens: state => {
            return state.total;
        },

        QueryStrategyPeremens: state => {
            return state.query;
        },

    },
    mutations: {
        setStrategyPeremensAction(state, payload) {
            state.totalStrategyPeremenAction = payload.length
            state.strategyPeremenAction = payload

        },
        setStrategyPeremensUsl(state, payload) {
            state.totalStrategyPeremenUsl = payload.length
            state.strategyPeremenUsl = payload

        },
        setStrategyPeremens (state, payload) {
            state.strategyPeremen = payload

        },
        setQueryStrategyPeremens (state, payload) {
            state.query = payload

        },
        setTotalStrategyPeremens (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataStrategyPeremens({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryStrategyPeremens', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("strategyPeremen.index"), {
                    params: {
                        method: 'getStrategyPeremens',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setStrategyPeremens', response.data.data)
                        commit('setTotalStrategyPeremens', response.data.total)
                    }




                })

            })
        },
        getDataStrategyPeremensAction({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.get(r("strategyPeremen.index"), {
                    params: {
                        method: 'getDataStrategyPeremensAction',
                        param: ''
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setStrategyPeremensAction', response.data.data)
                    }




                })

            })
        },
        getDataStrategyPeremensUsl({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.get(r("strategyPeremen.index"), {
                    params: {
                        method: 'getStrategyPeremensUsl',
                        param: ''
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setStrategyPeremensUsl', response.data.data)
                    }




                })

            })
        },
        saveStrategyPeremen({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let formData = new FormData();

                formData.append('document', requestObject.file[0]);
                formData.append('id', requestObject.id);
                formData.append('name_id', requestObject.name_id);
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                axios.post( '/strategyPeremen/post-document',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((response) => {
                    if(response.data.result){
                        dispatch('getDataStrategyPeremens');

                    }
                    resolve(response.data.result)
                })

            })
        },

        deleteStrategyPeremen({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("strategyPeremen.update"), {
                    params: {
                        method: 'deleteStrategyPeremen',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataStrategyPeremens');
                    }
                    resolve(response.data.result)


                })

            })
        },


    }



}



