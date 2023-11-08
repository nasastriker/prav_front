import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);

export default {
    state: {
        auto_task_sets:[],
        auto_task_sets_total:0,
        auto_task_sets_data:{
            fields:{},
            offset: 0,
            limit: 100,
        },

        auto_task_sets_tasks:[],
        auto_task_sets_tasks_total:0,
        auto_task_sets_tasks_data:{
            fields:{},
            offset: 0,
            limit: 100,
            id_record: 0,
        },

        auto_task_sets_loading_flag:false,
        auto_task_sets_tasks_loading_flag:false,
        all_users_for_auto_task_sets:[],
        all_users_for_auto_task_sets_wo_all:[],
        all_users_for_auto_task_sets_wo_all_wo_common:[],

        auto_task_sets_task_status_list:[],
    },
    getters: {
        AutoTaskSetsTasksStatusList: state => {
            return state.auto_task_sets_task_status_list;
        },
        AutoTaskSetsTasks: state => {
            return state.auto_task_sets_tasks;
        },
        AutoTaskSetsTasksTotal: state => {
            return state.auto_task_sets_tasks_total;
        },
        AutoTaskSetsTasksData: state => {
            return state.auto_task_sets_tasks_data;
        },
        AllUsersForAutoTaskSets: state => {
            return state.all_users_for_auto_task_sets;
        },
        AllUsersForAutoTaskSetsWoAll: state => {
            return state.all_users_for_auto_task_sets_wo_all;
        },
        AllUsersForAutoTaskSetsWoAllWoCommon: state => {
            return state.all_users_for_auto_task_sets_wo_all_wo_common;
        },
        AutoTaskSets: state => {
            return state.auto_task_sets;
        },
        AutoTaskSetsTotal: state => {
            return state.auto_task_sets_total;
        },
        AutoTaskSetsData: state => {
            return state.auto_task_sets_data;
        },
        AutoTaskSetsLoadingFlag: state => {
            return state.auto_task_sets_loading_flag;
        },
        AutoTaskSetsTasksLoadingFlag: state => {
            return state.auto_task_sets_tasks_loading_flag;
        },
    },
    mutations: {
        setAutoTaskSetsTasksStatusList(state, payload) {
            state.auto_task_sets_task_status_list = payload
        },
        setAutoTaskSetsTasks(state, payload) {
            state.auto_task_sets_tasks = payload
        },
        setAutoTaskSetsTasksTotal(state, payload) {
            state.auto_task_sets_tasks_total = payload
        },
        setQueryAutoTaskSetsTasksOffset(state, payload) {
            state.auto_task_sets_tasks_data.offset = payload*state.auto_task_sets_tasks_data.limit
        },
        setQueryAutoTaskSetsTasksLimit (state, payload) {
            state.auto_task_sets_tasks_data.limit = payload
        },
        setAllUsersForAutoTaskSets(state, payload) {
            state.all_users_for_auto_task_sets = payload
        },
        setAllUsersForAutoTaskSetsWoAll(state, payload) {
            state.all_users_for_auto_task_sets_wo_all = payload
        },
        setAllUsersForAutoTaskSetsWoAllWoCommon(state, payload) {
            state.all_users_for_auto_task_sets_wo_all_wo_common = payload
        },
        setAutoTaskSets(state, payload) {
            state.auto_task_sets = payload
        },
        setAutoTaskSetsTotal(state, payload) {
            state.auto_task_sets_total = payload
        },
        setQueryAutoTaskSetsOffset(state, payload) {
            state.auto_task_sets_data.offset = payload*state.auto_task_sets_data.limit
        },
        setQueryAutoTaskSetsLimit (state, payload) {
            state.auto_task_sets_data.limit = payload
        },
    },
    actions: {
        getAutoTaskSets ({state, getters, commit, dispatch}, requestObject) {
            state.auto_task_sets_loading_flag = true;
            commit('setAutoTaskSets', [])
            commit('setAutoTaskSetsTotal', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('autoTaskSettings.index'), {
                    params: {
                        method: 'getAutoTaskSets',
                        param: getters.AutoTaskSetsData
                    }
                }).then((response) => {
                    state.auto_task_sets_loading_flag = false;
                    if (response.data.result) {
                        commit('setAutoTaskSets', response.data.data)
                        commit('setAutoTaskSetsTotal', response.data.total)
                    }
                })
            })
        },

        saveAutoTaskSet({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("autoTaskSettings.update"), {
                    params: {
                        method: 'saveAutoTaskSet',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        saveActiveAutoTaskSet({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("autoTaskSettings.update"), {
                    params: {
                        method: 'saveActiveAutoTaskSet',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        getAutoTaskSetData ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('autoTaskSettings.index'), {
                    params: {
                        method: 'getAutoTaskSetData',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data);
                })
            })
        },

        deleteAutoTaskSet({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("autoTaskSettings.update"), {
                    params: {
                        method: 'deleteAutoTaskSet',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },

        getAllUsersForAutoTaskSet ({state, getters, commit, dispatch}, requestObject) {
            commit('setAllUsersForAutoTaskSets', [])
            return new Promise((resolve, reject) => {
                axios.get(r('autoTaskSettings.index'), {
                    params: {
                        method: 'getAllUsersForAutoTaskSet',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setAllUsersForAutoTaskSets', response.data.data)
                    }
                })
            })
        },

        getAllUsersForAutoTaskSetWoAll ({state, getters, commit, dispatch}, requestObject) {
            commit('setAllUsersForAutoTaskSetsWoAll', [])
            return new Promise((resolve, reject) => {
                axios.get(r('autoTaskSettings.index'), {
                    params: {
                        method: 'getAllUsersForAutoTaskSetWoAll',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setAllUsersForAutoTaskSetsWoAll', response.data.data)
                    }
                })
            })
        },

        getAllUsersForAutoTaskSetWoAllWoCommon ({state, getters, commit, dispatch}, requestObject) {
            commit('setAllUsersForAutoTaskSetsWoAllWoCommon', [])
            return new Promise((resolve, reject) => {
                axios.get(r('autoTaskSettings.index'), {
                    params: {
                        method: 'getAllUsersForAutoTaskSetWoAllWoCommon',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setAllUsersForAutoTaskSetsWoAllWoCommon', response.data.data)
                    }
                })
            })
        },

        getAutoTaskSetsTasks ({state, getters, commit, dispatch}, requestObject) {
            state.auto_task_sets_tasks_loading_flag = true;
            commit('setAutoTaskSetsTasks', [])
            commit('setAutoTaskSetsTasksTotal', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('autoTaskSettings.index'), {
                    params: {
                        method: 'getAutoTaskSetsTasks',
                        param: getters.AutoTaskSetsTasksData
                    }
                }).then((response) => {
                    state.auto_task_sets_tasks_loading_flag = false;
                    if (response.data.result) {
                        commit('setAutoTaskSetsTasks', response.data.data)
                        commit('setAutoTaskSetsTasksTotal', response.data.total)
                    }
                })
            })
        },

        getAutoTaskSetsRecordName ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('autoTaskSettings.index'), {
                    params: {
                        method: 'getAutoTaskSetsRecordName',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data);
                })
            })
        },

        getStatusesAutoTaskSetsTasks ({state, getters, commit, dispatch}, requestObject) {
            commit('setAutoTaskSetsTasksStatusList', [])
            return new Promise((resolve, reject) => {
                axios.get(r('autoTaskSettings.index'), {
                    params: {
                        method: 'getStatusesAutoTaskSetsTasks',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setAutoTaskSetsTasksStatusList', response.data.data)
                    }
                })
            })
        },
    }
}



