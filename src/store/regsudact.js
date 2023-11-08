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
        credits:[],
        total:0,
        query: {
            offset:0,
            limit:10
        },
        find:'',
        flagFind:false,
        categories:[],



    },
    getters: {
        // ...
        RegCategoryList: state => {
            return state.categories;
        },
        SudActCreditsArr: state => {
            return state.credits;
        },
        SudActCreditsFindFlag: state => {
            return state.flagFind;
        },
        SudActTotalCredits: state => {
            return state.total;
        },

    },
    mutations: {
        setRegCategoryList(state, payload) {
            state.categories = payload

        },
        setSudActCreditsFindFlag(state, payload) {
            state.flagFind = payload

        },
        setSudActCredits (state, payload) {
            state.credits = payload

        },
        setSudActTotalCredits (state, payload) {
            state.total = payload

        },

    },
    actions: {
        getSudActDataCredits({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.flagFind=true;
                let str=randomString(20);
                state.find=str;
                axios.get(r("sudWork.index"), {
                    params: {
                        method: 'getCreditsSudAct',
                        param: requestObject
                    }
                }).then((response) => {
                    if(str==state.find) {
                        state.flagFind = false;
                    }
                    if(response.data.result){
                      //  console.log(str==state.find)
                        if(str==state.find){
                            resolve(response)
                        }

                    }




                })

            })
        },
        getRegCategoryList ({state, getters, commit, dispatch}, requestObject) {
            commit('setRegCategoryList', [])
            return new Promise((resolve, reject) => {
                axios.get(r('sudAct.index'), {
                    params: {
                        method: 'getRegCategoryList',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setRegCategoryList', response.data.data)
                    }
                })
            })
        },

    }



}



