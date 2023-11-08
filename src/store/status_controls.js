import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        status_controls:[],
        total_status_controls:0,

        status_control_tasks:[],
        total_status_controls_tasks:0,
        status_control_task:{
            offset:0,
            limit:50,
            id_status_control:0,
            name_otpr:'Выберите запись выше для отображения задач',
        },

        status_control_task_credits:[],
        total_status_controls_task_credits:0,
        status_control_task_credits_loading_flag:false,
        status_control_task_credit:{
            fields:{},
            offset:0,
            limit:50,
            id_task:0,
        },

        func_sc_list:[],
    },
    getters: {
        StatusControlTaskCreditsLoadingFlag: state => {
            return state.status_control_task_credits_loading_flag;
        },
        StatusControlTaskCredit: state => {
            return state.status_control_task_credit;
        },
        StatusControlTaskCredits: state => {
            return state.status_control_task_credits;
        },
        TotalStatusControlTaskCredits: state => {
            return state.total_status_controls_task_credits;
        },
        StatusControlTask: state => {
            return state.status_control_task;
        },
        StatusControlTasks: state => {
            return state.status_control_tasks;
        },
        TotalStatusControlTasks: state => {
            return state.total_status_controls_tasks;
        },
        StatusControls: state => {
            return state.status_controls;
        },
        TotalStatusControl: state => {
            return state.total_status_controls;
        },
        FuncScList: state => {
            return state.func_sc_list;
        },
    },
    mutations: {
        setQueryStatusControlsTaskCreditsLimit (state, payload) {
            state.status_control_task_credit.limit = payload
        },
        setQueryStatusControlsTaskCreditsOffset(state, payload) {
            state.status_control_task_credit.offset = payload*state.status_control_task_credit.limit
        },
        setTotalStatusControlTaskCredits (state, payload) {
            state.total_status_controls_task_credits = payload
        },
        setStatusControlTaskCredits (state, payload) {
            state.status_control_task_credits = payload
        },
        setQueryStatusControlsTaskLimit (state, payload) {
            state.status_control_task.limit = payload
        },
        setQueryStatusControlsTaskOffset(state, payload) {
            state.status_control_task.offset = payload*state.status_control_task.limit
        },
        setStatusControlTasks (state, payload) {
            state.status_control_tasks = payload
        },
        setTotalStatusControlTasks (state, payload) {
            state.total_status_controls_tasks = payload
        },
        setStatusControls (state, payload) {
            state.status_controls = payload
        },
        setTotalStatusControl (state, payload) {
            state.total_status_controls = payload
        },
        setFuncScList (state, payload) {
            state.func_sc_list = payload
        },
    },
    actions: {
        getOneStatusControlTaskCreditData ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('statusControl.index'), {
                    params: {
                        method: 'getOneStatusControlTaskCreditData',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        getStatusControlTaskCredits ({state, getters, commit, dispatch}, requestObject) {
            commit('setStatusControlTaskCredits', [])
            commit('setTotalStatusControlTaskCredits', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('statusControl.index'), {
                    params: {
                        method: 'getStatusControlTaskCredits',
                        param: getters.StatusControlTaskCredit
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setStatusControlTaskCredits', response.data.data)
                        commit('setTotalStatusControlTaskCredits', response.data.total)
                    }
                })
            })
        },
        getStatusControlTasks ({state, getters, commit, dispatch}, requestObject) {
            commit('setStatusControlTasks', [])
            commit('setTotalStatusControlTasks', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('statusControl.index'), {
                    params: {
                        method: 'getStatusControlTasks',
                        param: getters.StatusControlTask
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setStatusControlTasks', response.data.data)
                        commit('setTotalStatusControlTasks', response.data.total)
                    }
                })
            })
        },
        getStatusControls ({state, getters, commit, dispatch}, requestObject) {
            commit('setStatusControls', [])
            commit('setTotalStatusControl', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('statusControl.index'), {
                    params: {
                        method: 'getStatusControls',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setStatusControls', response.data.data)
                        commit('setTotalStatusControl', response.data.total)
                    }
                })
            })
        },
        saveStatusControl({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("statusControl.update"), {
                    params: {
                        method: 'saveStatusControl',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getStatusControls');
                    }
                    resolve(response.data.result)
                })
            })
        },
        saveActiveStatusControl({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("statusControl.update"), {
                    params: {
                        method: 'saveActiveStatusControl',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getStatusControls');
                    }
                    resolve(response.data.result)
                })
            })
        },
        deleteStatusControl({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("statusControl.update"), {
                    params: {
                        method: 'deleteStatusControl',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getStatusControls');
                    }
                    resolve(response.data.result)
                })
            })
        },
        getFuncScList ({state, getters, commit, dispatch}, requestObject) {
            commit('setFuncScList', [])
            return new Promise((resolve, reject) => {
                axios.get(r('statusControl.index'), {
                    params: {
                        method: 'getFuncScList',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setFuncScList', response.data.data)
                    }
                })
            })
        },
        getStatusControlDataInfo ({state, getters, commit, dispatch}, requestObject) {
            commit('setFuncScList', [])
            return new Promise((resolve, reject) => {
                axios.get(r('statusControl.index'), {
                    params: {
                        method: 'getStatusControlDataInfo',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
    }



}



