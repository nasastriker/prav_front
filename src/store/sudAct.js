import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);
function randomString(i) {
    var rnd = '';
    while (rnd.length < i)
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};


export default {
    state: {
        sudActs:[],
        total:0,
        query: {},
        find:''



    },
    getters: {
        // ...
        SudActArr: state => {
            return state.sudActs;
        },
        TotalSudAct: state => {
            return state.total;
        },

        QuerySudAct: state => {
            return state.query;
        },

    },
    mutations: {
        setSudActs (state, payload) {
            state.sudActs = payload

        },

        setTotalSudActs (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataSudActs({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let str=randomString(20);
                state.find=str;

                axios.get(r("sudAct.index"), {
                    params: {
                        method: 'getDataSudActs',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        if(str==state.find){
                            commit('setSudActs', response.data.data)
                            commit('setTotalSudActs', response.data.total)
                        }

                    }




                })


            })
        },
        deleteSudAct({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("sudAct.update"), {
                    params: {
                        method: 'deleteSudAct',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataSudActs');
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveSudAct({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("sudAct.update"), {
                    params: {
                        method: 'saveSudAct',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataSudActs');
                    }
                    resolve(response.data.result)


                })

            })
        },
    }



}



