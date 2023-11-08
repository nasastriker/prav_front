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
        tasks:[],
        tasks_ones:[],
        total_ones:0,
        query: {},
        find:'',
        task_data: {
            pag: {
                task_status: 'no_done',
                task_date: '',
                taks_find: '',
                limit: 100,
                offset: 0,
                task_user_id: 0
            }
        },
        task_data_load_stats_flag: false,
        tasks_banner_data: {}
    },
    getters: {
        TaskDataLoadStatsFlag: state => {
            return state.task_data_load_stats_flag;
        },
        TaskData: state => {
            return state.task_data;
        },
        TasksUserArr: state => {
            return state.tasks;
        },
        TasksUserOnesArr: state => {
            return state.tasks_ones;
        },
        TotalTasksUserOnes: state => {
            return state.total_ones;
        },
        StatusesTasks: state => {
            let arr=[];
            arr.push({id: 'all', name: 'Все задачи'})
            arr.push({id: 'no_done', name: 'Не выполненные'})
            arr.push({id: 1, name: 'В работе'})
            arr.push({id: 3, name: 'На подтверждении'})
            arr.push({id: 2, name: 'Выполненные'})
            arr.push({id: 4, name: 'Архивные'})
            return arr
        },
        TasksBannerData: state => {
            return state.tasks_banner_data;
        },
    },
    mutations: {
        setTasksUser (state, payload) {
            state.tasks = payload
        },
        setTasksUserOnes (state, payload) {
            state.tasks_ones = payload
        },
        setShowTask (state, payload) {
            state.showTask = payload
        },
        setTotalTasksUserOnes (state, payload) {
            state.total_ones = payload
        },
        setQueryTasksOffset(state, payload) {
         //   console.log(payload*state.task_data.pag.limit)
            state.task_data.pag.offset = payload*state.task_data.pag.limit
        },
        setQueryTasksLimit (state, payload) {
            state.task_data.pag.limit = payload
        },
        setTasksBannerData (state, payload) {
            state.tasks_banner_data = payload
        },
    },
    actions: {
        SendDoneTaskOnesToArchive({state, getters, commit, dispatch}, requestObject) {
            console.log(requestObject)
            return new Promise((resolve, reject) => {
                axios.post(r("taskUser.update"), {
                    params: {
                        method: 'SendDoneTaskOnesToArchive',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })

        },

        getDataTasksUserOnes({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setTasksUserOnes', [])
                commit('setTotalTasksUserOnes', 0)
                axios.get(r("taskUser.index"), {
                    params: {
                        method: 'getTasksOnes',
                        param: {task_data: getters.TaskData, id_user: requestObject}
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setTasksUserOnes', response.data.data)
                        commit('setTotalTasksUserOnes', response.data.total)
                    }
                })
            })
        },
        getDataTasksUser({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setTasksUser', [])
                axios.get(r("taskUser.index"), {
                        params: {
                            method: 'getTasks',
                            param: requestObject
                        }
                    }).then((response) => {
                        if(response.data.result){
                            commit('setTasksUser', response.data.data)
                        }
                    })
            })
        },
        deleteTaskUserOnes({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("taskUser.update"), {
                    params: {
                        method: 'deleteTaskUserOnes',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        deleteTaskUserList({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("taskUser.update"), {
                    params: {
                        method: 'deleteTaskUserList',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        saveTaskUser({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("taskUser.update"), {
                    params: {
                        method: 'saveTaskUser',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        getDataTaskUser({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("taskUser.index"), {
                    params: {
                        method: 'getDataTaskUser',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        doneTaskUser({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("taskUser.update"), {
                    params: {
                        method: 'doneTaskUser',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        adminResponseTaskUser({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("taskUser.update"), {
                    params: {
                        method: 'adminResponseTaskUser',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        iSeeItTaskUser({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("taskUser.update"), {
                    params: {
                        method: 'iSeeItTaskUser',
                        param: requestObject
                    }
                }).then((response) => {
                    dispatch('getBannerData');
                    resolve(response.data.result)
                })
            })
        },
        iSeeItTaskUserBig({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("taskUser.update"), {
                    params: {
                        method: 'iSeeItTaskUserBig',
                        param: requestObject
                    }
                }).then((response) => {
                    dispatch('getBannerData');
                    resolve(response.data.result)
                })
            })
        },
        iSeeItTaskUserConfirm({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("taskUser.update"), {
                    params: {
                        method: 'iSeeItTaskUserConfirm',
                        param: requestObject
                    }
                }).then((response) => {
                    dispatch('getBannerData');
                    resolve(response.data.result)
                })
            })
        },
        getTaskUserStatsInfo({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.task_data_load_stats_flag = true;
                axios.get(r("taskUser.index"), {
                    params: {
                        method: 'getTaskUserStatsInfo',
                        param: requestObject
                    }
                }).then((response) => {
                    state.task_data_load_stats_flag = false;
                    resolve(response.data)
                })
            })
        },
        getBannerData({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("taskUser.index"), {
                    params: {
                        method: 'getBannerData',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setTasksBannerData', response.data.data)
                    }
                })
            })
        },
        getMimeFile({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("taskUser.index"), {
                    params: {
                        method: 'getMimeFile',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        resolve(response.data.data)
                    }
                })
            })
        },
        getTodayDate({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("taskUser.index"), {
                    params: {
                        method: 'getTodayDate',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        resolve(response.data)
                    }
                })
            })
        },

    }



}



