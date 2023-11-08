import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        work_actions:[],
        l_work_actions:[],
        r_work_actions:[],
        total:0,
        query: {},
        db_tables:[],
        work_actions_move_flag: false,
    },
    getters: {
        // ...
        WorkActionsArr: state => {
            return state.work_actions;
        },
        LWorkActionsArr: state => {
            return state.l_work_actions;
        },
        RWorkActionsArr: state => {
            return state.r_work_actions;
        },
        TotalWorkActions: state => {
            return state.total;
        },

        QueryWorkActions: state => {
            return state.query;
        },
        DbTablesArr: state => {
            return state.db_tables;
        },
        WorkActionsMoveFlag: state => {
            return state.work_actions_move_flag;
        },
    },
    mutations: {
        setWorkActions (state, payload) {
            state.work_actions = payload
        },
        setQueryWorkActions (state, payload) {
            state.query = payload
        },
        setTotalWorkActions (state, payload) {
            state.total = payload
        },
        setDbTables (state, payload) {
            let $arr = [];
            for (let i=0;i<payload.length;i++){
                $arr.push(payload[i])
            }
            state.db_tables = $arr
        },
        setLWorkActionsArr (state, payload) {
            state.l_work_actions = payload
        },
        setRWorkActionsArr (state, payload) {
            state.r_work_actions = payload
        },
    },
    actions: {
        getDataWorkActions({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryWorkActions', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                axios.get(r("workActions.index"), {
                    params: {
                        method: 'getWorkActions',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setWorkActions', response.data.data)
                        commit('setTotalWorkActions', response.data.total)
                    }
                })
            })
        },
        deleteWorkAction({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("workActions.update"), {
                    params: {
                        method: 'deleteWorkAction',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataWorkActions');
                    }
                    resolve(response.data.result)
                })
            })
        },
        saveWorkAction({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("workActions.update"), {
                    params: {
                        method: 'saveWorkAction',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataWorkActions');
                    }
                    resolve(response.data.result)
                })
            })
        },
        getDbTables({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("workActions.index"), {
                    params: {
                        method: 'getDbTables',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setDbTables', response.data.data)
                    }
                })
            })
        },
        getAllWorkActions({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("workActions.index"), {
                    params: {
                        method: 'getAllWorkActions',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setLWorkActionsArr', response.data.l_data)
                        commit('setRWorkActionsArr', response.data.r_data)
                    }
                })
            })
        },
        getWorkActionsAllByName({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("workActions.index"), {
                    params: {
                        method: 'getWorkActionsAllByName',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setLWorkActionsArr', response.data.data)
                    }
                })
            })
        },
        fromAllToUserMove({state, getters, commit, dispatch}, requestObject) {
            state.work_actions_move_flag = true;
            return new Promise((resolve, reject) => {
                axios.get(r("workActions.index"), {
                    params: {
                        method: 'fromAllToUserMove',
                        param: requestObject
                    }
                }).then((response) => {
                    state.work_actions_move_flag = false;
                    resolve(response.data.result)
                })
            })
        },
        fromUserToAllMove({state, getters, commit, dispatch}, requestObject) {
            state.work_actions_move_flag = true;
            return new Promise((resolve, reject) => {
                axios.get(r("workActions.index"), {
                    params: {
                        method: 'fromUserToAllMove',
                        param: requestObject
                    }
                }).then((response) => {
                    state.work_actions_move_flag = false;
                    resolve(response.data.result)
                })
            })
        },
    }
}



