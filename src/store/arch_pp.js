import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        data: [],
        total: 0,
        query: {},
        pp_data: {
            pag: {
                date_pps: ''
            }
        },
        pps_loading_flag: false


    },
    getters: {
        // ...
        ArchPpsArr: state => {
            return state.data;
        },
        TotalArchPps: state => {
            return state.total;
        },

        QueryArchPps: state => {
            return state.query;
        },
        PPdata: state => {
            return state.pp_data;
        },
        PPsLoadingFlag: state => {
            return state.pps_loading_flag;
        },

    },
    mutations: {
        setArchPps(state, payload) {
            state.data = payload

        },
        setQueryArchPps(state, payload) {
            state.query = payload

        },
        setTotalArchPps(state, payload) {
            state.total = payload

        },
        setArhPPStat(state, id) {
            for (let i = 0; i < state.data.length; i++) {
                if(state.data[i].id==id){
                    state.data[i].status=1
                }

            }

        }

    },
    actions: {
        getDataArchPps({state, getters, commit, dispatch}, requestObject) {
            state.pps_loading_flag = true;
            commit('setArchPps', [])
            commit('setTotalArchPps', 0)
            return new Promise((resolve, reject) => {
                axios.get(r("archPp.index"), {
                    params: {
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setArchPps', response.data.data)
                        commit('setTotalArchPps', response.data.total)
                    } else {
                        commit('setArchPps', [])
                        commit('setTotalArchPps', 0)
                    }
                    state.pps_loading_flag = false;
                })

            })
        },

    }


}



