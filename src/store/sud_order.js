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
        sudOrders:[],
        total:0,
        query: {},
        find:''


    },
    getters: {
        // ...
        SudOrdersArr: state => {
            return state.sudOrders;
        },
        TotalSudOrders: state => {
            return state.total;
        },

        QuerySudOrders: state => {
            return state.query;
        },

    },
    mutations: {
        setSudOrders (state, payload) {
            state.sudOrders = payload

        },
        setQuerySudOrders (state, payload) {
            state.query = payload

        },
        setTotalSudOrders (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataSudOrders({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let str=randomString(20);
                state.find=str;

                axios.get(r("sudOrder.index"), {
                    params: {
                        method: 'getSudOrders',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        if(str==state.find){
                            commit('setSudOrders', response.data.data)
                            commit('setTotalSudOrders', response.data.total)
                        }

                    }




                })

            })
        },
        saveDataSudOrder({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("sudOrder.index"), {
                    params: {
                        method: 'saveDataSudOrder',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                            resolve(response.data.result)
                    }
                })

            })
        },



    }



}



