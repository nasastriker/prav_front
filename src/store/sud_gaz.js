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
        sud_gaz_loading_flag: false,
        sud_gaz_data: {
            pag: {
                limit: 100,
                offset: 0
            }
        },
        files_sud_gaz:[]



    },
    getters: {
        // ...
        SudGassArr: state => {
            return state.data;
        },
        TotalSudGass: state => {
            return state.total;
        },

        QuerySudGass: state => {
            return state.query;
        },
        SudGassLoadingFlag: state => {
            return state.sud_gaz_loading_flag;
        },
        SudGassData: state => {
            return state.sud_gaz_data;
        },
        FilesSudGassArr: state => {
            return state.files_sud_gaz;
        },

    },
    mutations: {
        setSudGass (state, payload) {
            state.data = payload

        },
        setQuerySudGass (state, payload) {
            state.query = payload

        },
        setTotalSudGass (state, payload) {
            state.total = payload

        },
        setSudGassOffset(state, payload) {
            state.sud_gaz_data.pag.offset = payload*state.sud_gaz_data.pag.limit
        },
        setSudGassLimit (state, payload) {
            state.sud_gaz_data.pag.limit = payload
        },
        setFilesSudGassArr (state, payload) {
            state.files_sud_gaz = payload
        },

    },
    actions: {
        getDataSudGassCredit({state, getters, commit, dispatch}, requestObject) {
            state.sud_gaz_loading_flag = true;
            commit('setSudGass', [])
            commit('setTotalSudGass', 0)
            return new Promise((resolve, reject) => {
                axios.get(r("sudGas.index"), {
                    params: {
                        method: 'getDataSudGassCredit',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setSudGass', response.data.data)
                        commit('setTotalSudGass', response.data.total)
                    } else {
                        commit('setSudGass', [])
                        commit('setTotalSudGass', 0)
                    }
                    state.sud_gaz_loading_flag = false;
                })

            })
        },
      
      
      
    }



}



