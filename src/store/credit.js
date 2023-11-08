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



    },
    getters: {
        // ...
        TypeCP:state => {

            return [
                {
                    id:0,
                    name:'Судебный приказ'
                },
                {
                    id:1,
                    name:'Исполнительный лист'
                },
                {
                    id:2,
                    name:'ЭИЛ'
                },
                {
                    id:3,
                    name:'Исполнительная надпись нотариуса'
                }
            ]
        },
        DateEndIpFilter: state => {
          return [{id:0, name:'Все'},{id:1, name:'Заполнено'},{id:2, name:'Не заполнено'}]
        },
        CreditsArr: state => {
            return state.credits;
        },
        CreditsFindFlag: state => {
            return state.flagFind;
        },
        TotalCredits: state => {
            return state.total;
        },

        QueryCredits: state => {
            return state.query;
        },

    },
    mutations: {
        setCreditsFindFlag(state, payload) {
            state.flagFind = payload

        },
        setCredits (state, payload) {
            state.credits = payload

        },
        setQueryCredits (state, payload) {
            state.query = payload

        },
        setTotalCredits (state, payload) {
            state.total = payload

        },
        setCreditsUploadFiles (state, payload) {
            if (payload.length > 0) {
                for (var i = 0; i < payload.length; i++) {
                    // if (payload[i]['cession'] == 1) {
                    //     payload[i]['recover'] = 'ООО "БВ "Правёж"'
                    // }
                }
            }
            state.credits = payload
        },

    },
    actions: {
        getDataCreditsSendSa({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {


                axios.get(r("credits.index"), {
                    params: {
                        method: 'getCreditsSendSa',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setCredits', response.data.data)
                        commit('setTotalCredits', response.data.total)
                    }




                })

            })
        },
        getDataCredits({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.flagFind=true;
                let str=randomString(20);
                state.find=str;
                axios.get(r("credits.index"), {
                    params: {
                        method: 'getCredits',
                        param: requestObject
                    }
                }).then((response) => {
                    if(str==state.find) {
                        state.flagFind = false;
                    }
                    if(response.data.result){
                      //  console.log(str==state.find)
                        if(str==state.find){
                            commit('setCredits', response.data.data)
                            commit('setTotalCredits', response.data.total)
                            resolve(response.data.result)
                        }

                    }




                })

            })
        },
        getDataCreditsUploadFiles({state, getters, commit, dispatch}, requestObject) {
            commit('setCreditsUploadFiles', [])
            commit('setTotalCredits', 0)
            return new Promise((resolve, reject) => {
                state.flagFind=true;
                let str=randomString(20);
                state.find=str;
                axios.get(r("credits.index"), {
                    params: {
                        method: 'getCredits',
                        param: requestObject
                    }
                }).then((response) => {
                    if(str==state.find) {
                        state.flagFind = false;
                    }
                    if(response.data.result){
                        //  console.log(str==state.find)
                        if(str==state.find){
                            commit('setCreditsUploadFiles', response.data.data)
                            commit('setTotalCredits', response.data.total)
                        }
                    }
                })
            })
        },
        checkOrigShtampOpiska({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("credits.index"), {
                    params: {
                        method: 'checkOrigShtampOpiska',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },

    }



}



