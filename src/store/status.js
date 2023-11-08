import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        statuss:[],
        userStatuss:[],
        total:0,
        query: {},
        statusSuds:[],
        userTotal:0,
        totalSud:0,
        querySud: {},
        activeTabStatus:0,
        activeTabMainStatus:0,

        check_status_conds:[],
        check_status_conds_total:0,
        check_status_conds_loading_flag:false,



    },
    getters: {

        StatussArr: state => {
            return state.statuss;
        },
        UserStatussArr: state => {
            return state.userStatuss;
        },
        StatusSudsArr: state => {
            return state.statusSuds;
        },
        StatussArrAndAll: state => {
            let arr=[];
            arr.push({
                id:0,
                name:'Все'
            });
            for(let i=0;i<state.statuss.length;i++)
            {

                    arr.push(state.statuss[i]);

            }
            return arr;

        },
        StatussDebtorArr: state => {
            let arr=[];
            for(let i=0;i<state.statuss.length;i++)
                {
                if(state.statuss[i].vid==1){
                    arr.push(state.statuss[i]);
                }
            }
            return arr;
        },
        TotalStatuss: state => {
            return state.total;
        },
        TotalUserStatuss: state => {
            return state.userTotal;
        },
        QueryStatuss: state => {
            return state.query;
        },

        CheckStatusConds: state => {
            return state.check_status_conds;
        },
        CheckStatusCondsTotal: state => {
            return state.check_status_conds_total;
        },
        CheckStatusCondsLoadingFlag: state => {
            return state.check_status_conds_loading_flag;
        },
    },
    mutations: {
        setStatuss (state, payload) {
            state.statuss = payload

        },
        setUserStatuss (state, payload) {
            state.userStatuss = payload

        },
        setStatusSuds (state, payload) {
            state.statusSuds = payload

        },
        setQueryStatuss (state, payload) {
            state.query = payload

        },
        setQueryStatusSuds (state, payload) {
            state.querySud = payload

        },
        setTotalStatuss (state, payload) {
            state.total = payload

        },
        setTotalUserStatuss (state, payload) {
            state.userTotal = payload

        },
        setTotalStatusSuds (state, payload) {
            state.totalSud = payload

        },

        setCheckStatusConds (state, payload) {
            state.check_status_conds = payload
        },
        setCheckStatusCondsTotal (state, payload) {
            state.check_status_conds_total = payload
        },
    },
    actions: {
        getDataStatusSuds({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryStatusSuds', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("status.index"), {
                    params: {
                        method: 'getStatusSuds',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setStatusSuds', response.data.data)
                        commit('setTotalStatusSuds', response.data.total)
                    }




                })

            })
        },
        getDataStatuss({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryStatuss', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("status.index"), {
                    params: {
                        method: 'getStatuss',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setStatuss', response.data.data)
                        commit('setTotalStatuss', response.data.total)
                    }




                })

            })
        },
        getDataStatusSyss({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryStatuss', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("status.index"), {
                    params: {
                        method: 'getSysStatuss',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setStatuss', response.data.data)
                        commit('setTotalStatuss', response.data.total)
                    }




                })

            })
        },
        getDataUserStatuss({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryStatuss', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("status.index"), {
                    params: {
                        method: 'getUserStatuss',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setUserStatuss', response.data.data)
                        commit('setTotalUserStatuss', response.data.total)
                    }




                })

            })
        },
        deleteStatus({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("status.update"), {
                    params: {
                        method: 'deleteStatus',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataStatuss');
                    }
                    resolve(response.data.result)


                })

            })
        },
        deleteUserStatus({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("status.update"), {
                    params: {
                        method: 'deleteUserStatus',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataUserStatuss');
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveStatus({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("status.update"), {
                    params: {
                        method: 'saveStatus',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataStatuss');
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveUserStatus({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("status.update"), {
                    params: {
                        method: 'saveUserStatus',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataUserStatuss');
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveStatusFunc ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r('status.update'), {
                    params: {
                        method: 'saveStatusFunc',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },

        getCheckStatusConds({state, getters, commit, dispatch}, requestObject) {
            commit('setCheckStatusConds', [])
            commit('setCheckStatusCondsTotal', 0)
            return new Promise((resolve, reject) => {
                axios.get(r("status.index"), {
                    params: {
                        method: 'getCheckStatusConds',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setCheckStatusConds', response.data.data)
                        commit('setCheckStatusCondsTotal', response.data.total)
                    }
                })
            })
        },

        saveCheckStatusCond ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r('status.update'), {
                    params: {
                        method: 'saveCheckStatusCond',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        getCheckStatusCondData({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("status.index"), {
                    params: {
                        method: 'getCheckStatusCondData',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        deleteCheckStatusCond ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r('status.update'), {
                    params: {
                        method: 'deleteCheckStatusCond',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
    }



}



