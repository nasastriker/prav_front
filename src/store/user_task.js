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
        statusList:[],
        total:0,
        query: {},
        find:'',
        task_data: {
            pag: {
                task_status: 0,
                task_date: '',
                task_find: '',
                limit: 100,
                offset: 0,
                task_user_id: 0
            }
        },
        task_data_load_stats_flag: false,
        tasks_banner_data: {}
    },
    getters: {
        StatusUsersTaskList:  state => {
            return state.statusList
        },
        TaskUserData: state => {
            return state.task_data;
        },
        UsersTask: state => {
            return state.tasks;
        },
        UsersTaskTotal: state => {
            return state.total;
        },
        setQueryUsersTasksOffset(state, payload) {
            //   console.log(payload*state.task_data.pag.limit)
            state.task_data.pag.offset = payload*state.task_data.pag.limit
        },
        setQueryUsersTasksLimit (state, payload) {
            state.task_data.pag.limit = payload
        },
        StatusesUserTasks: state => {
            let arr=[];
            arr.push({
                id:0,
                name:'Все задачи',
            })
            arr.push({id: -1, name: 'Невыполненные'})
            for (let i = 0; i < state.statusList.length; i++) {
                arr.push(state.statusList[i])
            }


            return arr
        },

    },
    mutations: {
        setStatusList(state, payload) {
            state.statusList = payload
        },
        setUsersTask (state, payload) {
            state.tasks = payload
        },
        setUsersTaskTotal (state, payload) {
            state.total = payload
        },
        setQueryUsersTasksOffset(state, payload) {
            //   console.log(payload*state.task_data.pag.limit)
            state.task_data.pag.offset = payload*state.task_data.pag.limit
        },
        setQueryUsersTasksLimit (state, payload) {
            state.task_data.pag.limit = payload
        },


    },
    actions: {
        getStatusUserTaskList ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.get(r('userTask.index'), {
                    params: {
                        method: 'getStatusList',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setStatusList', response.data.data)

                    }


                })

            })
        },
        saveUserTask({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("userTask.update"), {
                    params: {
                        method: 'saveTaskUser',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        getDataUserTask({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setUsersTask', [])
                commit('setUsersTaskTotal', 0)
                axios.get(r("userTask.index"), {
                    params: {
                        method: 'getTasks',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setUsersTask', response.data.data)
                        commit('setUsersTaskTotal', response.data.total)
                    }
                })
            })
        },






    }



}



