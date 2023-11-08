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
        debtors:[],
        total:0,
        query: {
            offset:0,
            limit:10
        },
        countryCode:[],


    },
    getters: {
        // ...

        CountryCode: state => {
          return state.countryCode
        },
        DebtorsArr: state => {
            return state.debtors;
        },
        TotalDebtors: state => {
            return state.total;
        },

        QueryDebtors: state => {
            return state.query;
        },

    },
    mutations: {

        setDebtors (state, payload) {
            state.debtors = payload

        },
        setCountryCode (state, payload) {
            state.countryCode = payload

        },
        setQueryDebtors (state, payload) {
            state.query = payload

        },
        setTotalDebtors (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataDebtors({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let str=randomString(20);
                state.find=str;

                axios.get(r("debtors.index"), {
                    params: {
                        method: 'getDebtors',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        if(str==state.find){
                            commit('setDebtors', response.data.data)
                            commit('setTotalDebtors', response.data.total)
                        }

                    }




                })

            })
        },

        getCountryCode({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setCountryCode',[])
                axios.get(r("debtors.update"), {
                    params: {
                        method: 'getCountryCode',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setCountryCode',response.data.data)
                    }


                })

            })
        },

        deleteDebtor({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("debtors.update"), {
                    params: {
                        method: 'deleteDebtor',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataDebtors');
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveDebtor({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("debtors.update"), {
                    params: {
                        method: 'saveDebtor',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataDebtors');
                    }
                    resolve(response.data.result)


                })

            })
        },
    }



}



