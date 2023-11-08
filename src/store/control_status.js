import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        controlStatus:[],
        total:0,
        query: {},
        controlStatusFlags:0,


    },
    getters: {
        // ...
        ControlStatusArr: state => {
            return state.controlStatus;
        },
        TotalControlStatus: state => {
            return state.total;
        },

        QueryControlStatus: state => {
            return state.query;
        },
        ControlStatusFlag: state => {
            return state.controlStatusFlags;
        },

    },
    mutations: {
        setControlStatus (state, payload) {
            state.controlStatus = payload

        },
        setQueryControlStatus (state, payload) {
            state.query = payload

        },
        setTotalControlStatus (state, payload) {
            state.total = payload

        },
        setFlagControlStatus (state, payload) {
            state.controlStatusFlags = payload

        }

    },
    actions: {
        getControlStatuss({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setFlagControlStatus', 1)

                axios.get(r("controlStatus.index"), {
                    params: {
                        method: 'getControlStatuss',
                        param: requestObject
                    }
                }).then((response) => {
                    commit('setFlagControlStatus', 0)
                    if(response.data.result){
                        commit('setControlStatus', response.data.data)
                        commit('setTotalControlStatus', response.data.total)
                    }




                })

            })
        },
        deleteControlStatus({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("controlStatus.update"), {
                    params: {
                        method: 'deleteControlStatus',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveControlStatus({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("controlStatus.update"), {
                    params: {
                        method: 'saveControlStatus',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataControlStatus');
                    }
                    resolve(response.data.result)


                })

            })
        },


    }



}



