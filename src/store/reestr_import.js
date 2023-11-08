import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        reestrsImport:[],
        total:0,
        query: {},
        reestrsImportShow:[],
        reestrsImportName:[],
        name:'',
        atrDebtorCredits:[],
        atrDebtorCreditsTotal:0,

    },
    getters: {
        // ...
        ReestrsImportArrName: state => {
            let arr=[]
            for (let i = 0; i < state.reestrsImport.length; i++) {
                arr.push(
                    { name:state.reestrsImport[i].name_recover,
                        show:true,


                    }
                )


            }

            arr.__proto__.unique = function() {

                return this.filter(function(value, index, _this) {

                    return _this.indexOf(value) === index;

                });

            }
            state.reestrsImportName=arr.unique()
            return arr.unique();
        },
        ReestrsImportArr: state => {
            return state.reestrsImport;
        },
        AtrDebtorCredits: state => {

            return state.atrDebtorCredits;
        },
        AtrDebtorCreditsTotal: state => {
            return state.atrDebtorCreditsTotal;
        },



        ReestrsImportArrShow: state => {

            return state.reestrsImportShow;
        },
        TotalReestrsImport: state => {
            return state.total;
        },
        ReestrsImportName: state => {
            return state.name;
        },
        QueryReestrsImport: state => {
            return state.query;
        },
        StatussArrReestrsImportAndAll: state => {
            let arr=[];
            arr.push({
                id:0,
                name:'Все'
            });
            arr.push({
                id:1,
                name:'Обработан'
            });
            arr.push({
                id:2,
                name:'Проблемнные'
            });

            return arr;
        },

    },
    mutations: {
        hideReestr(state, payload){
                state.reestrsImportName[payload].show=!state.reestrsImportName[payload].show;
            let arr=[]
            for (let i = 0; i < state.reestrsImport.length; i++) {
                for (let a = 0; a < state.reestrsImportName.length; a++) {
                    if (state.reestrsImportName[a].name == state.reestrsImport[i].name_recover) {
                        if (state.reestrsImportName[a].show) {
                            arr.push(
                                state.reestrsImport[i]
                            )
                        }
                    }
                }


            }
          state.reestrsImportShow = arr
        },
        clearReestrsImport(state, payload) {
            state.total = 0
            state.reestrsImport = []

        },
        setReestrsImport (state, payload) {
            state.reestrsImport = payload
            state.reestrsImportShow = payload

        },
        setAtrDebtorCredits (state, payload) {
            state.atrDebtorCredits = payload

        },
        setAtrDebtorCreditsTotal (state, payload) {
            state.atrDebtorCreditsTotal = payload

        },
        setQueryReestrsImport (state, payload) {
            state.query = payload

        },
        setTotalReestrsImport (state, payload) {
            state.total = payload

        },
        setReestrsImportName(state, payload) {
            state.name = payload

        },

    },
    actions: {
        getDataReestrsImportByReestrs({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('clearReestrsImport')
                axios.get(r("reestrImport.index"), {
                    params: {
                        method: 'getDataReestrsImportByReestrs',
                        param: {
                            req:requestObject.req,
                            id:requestObject.id
                        }
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setReestrsImport', response.data.data)
                        commit('setTotalReestrsImport', response.data.total)
                        commit('setReestrsImportName', response.data.name)
                    }




                })

            })
        },
        getDataReestrsImport({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryReestrsImport', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("reestrImport.index"), {
                    params: {
                        method: 'getReestrsImport',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setReestrsImport', response.data.data)
                        commit('setTotalReestrsImport', response.data.total)
                    }




                })

            })
        },



        getDataAtrDebtorCredits({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {


                axios.get(r("debtorCredit.index"), {
                    params: {
                        method: 'getAtrDebtorCredits',
                      //  param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){

                        commit('setAtrDebtorCredits', response.data.data)
                        commit('setAtrDebtorCreditsTotal', response.data.total)

                    }




                })

            })
        },



        deleteReestrImport({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("reestrImport.update"), {
                    params: {
                        method: 'delete',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataReestrsImport');
                    }
                    resolve(response.data.result)


                })

            })
        },
        deleteInReestrImport({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("reestrImport.update"), {
                    params: {
                        method: 'deleteInReestr',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        //dispatch('getDataReestrsImport');
                    }
                    resolve(response.data.result)


                })

            })
        },
    }



}



