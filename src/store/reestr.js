import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        reestrs:[],
        total:0,
        query: {},
        reestrsShow:[],
        reestrsName:[],
        findFlag:false,

    },
    getters: {
        // ...
        ReestrsArrName: state => {
            let arr=[]
            for (let i = 0; i < state.reestrs.length; i++) {
                arr.push(
                    { name:state.reestrs[i].name_recover,
                        show:true,


                    }
                )


            }

            arr.__proto__.unique = function() {

                return this.filter(function(value, index, _this) {

                    return _this.indexOf(value) === index;

                });

            }
            state.reestrsName=arr.unique()
            return arr.unique();
        },
        ReestrsArr: state => {
            return state.reestrs;
        },
        ReestrFindFlag: state => {
            return state.findFlag;
        },
        ReestrsArrShow: state => {

            return state.reestrsShow;
        },
        TotalReestrs: state => {
            return state.total;
        },

        QueryReestrs: state => {
            return state.query;
        },

    },
    mutations: {
        setReestrFindFlag(state, payload) {
            state.findFlag = payload

        },
        hideReestr(state, payload){
                state.reestrsName[payload].show=!state.reestrsName[payload].show;
            let arr=[]
            for (let i = 0; i < state.reestrs.length; i++) {
                for (let a = 0; a < state.reestrsName.length; a++) {
                    if (state.reestrsName[a].name == state.reestrs[i].name_recover) {
                        if (state.reestrsName[a].show) {
                            arr.push(
                                state.reestrs[i]
                            )
                        }
                    }
                }


            }
          state.reestrsShow = arr
        },
        setReestrs (state, payload) {
            state.reestrs = payload
            state.reestrsShow = payload

        },
        setQueryReestrs (state, payload) {
            state.query = payload

        },
        setTotalReestrs (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataReestrsByIdOrg({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setReestrs', [])
                commit('setTotalReestrs', 0)


                axios.get(r("reestr.index"), {
                    params: {
                        method: 'getDataReestrsByIdOrg',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setReestrs', response.data.data)
                        commit('setTotalReestrs', response.data.total)
                    }




                })

            })
        },
        getDataReestrsById({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setReestrs', [])
                commit('setTotalReestrs', 0)


                axios.get(r("reestr.index"), {
                    params: {
                        method: 'getReestrsById',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setReestrs', response.data.data)
                        commit('setTotalReestrs', response.data.total)
                    }




                })

            })
        },
        getDataReestrs({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setReestrs', [])
                commit('setReestrFindFlag', true)
                commit('setTotalReestrs', 0)
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryReestrs', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("reestr.index"), {
                    params: {
                        method: 'getReestrs',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setReestrFindFlag', false)
                        commit('setReestrs', response.data.data)
                        commit('setTotalReestrs', response.data.total)
                    }

                    resolve(response.data.result)


                })

            })
        },
        deleteReestr({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("reestr.update"), {
                    params: {
                        method: 'deleteReestr',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataReestrs');
                    }
                    resolve(response.data.result)

                }).catch(error => {
                    resolve(false)

                });


            })
        },

    }



}



