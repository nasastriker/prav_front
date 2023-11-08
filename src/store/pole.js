import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        poles:[],
        find:'',
        total:0,
        query: {}



    },
    getters: {
        // ...
        PolesArrFiltr: state => {
            let arr = state.poles.filter(function(number) {
                return ((number.atr.toLowerCase().includes(state.find.toLowerCase()))||(number.name.toLowerCase().includes(state.find.toLowerCase())))
            })
            return arr;
        },
        PolesArr: state => {
            return state.poles;
        },
        TotalPoles: state => {
            return state.total;
        },

        QueryPoles: state => {
            return state.query;
        },

    },
    mutations: {
        setPoles (state, payload) {
            state.poles = payload

        },
        setPolesFilter (state, payload) {
            state.find = payload

        },
        setQueryPoles (state, payload) {
            state.query = payload

        },
        setTotalPoles (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataPoles({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.get(r("pole.index"), {
                    params: {
                        method: 'getPoles',
                        param: '',
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setPoles', response.data.data)
                        commit('setTotalPoles', response.data.total)
                    }




                })

            })
        },
        deletePole({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("pole.update"), {
                    params: {
                        method: 'deletePole',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataPoles');
                    }
                    resolve(response.data.result)


                })

            })
        },
        clonePole({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("pole.update"), {
                    params: {
                        method: 'clonePole',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataPoles');
                    }
                    resolve(response.data.result)


                })

            })
        },
        savePole({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("pole.update"), {
                    params: {
                        method: 'savePole',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataPoles');
                    }
                    resolve(response.data.result)


                })

            })
        },
    }



}



