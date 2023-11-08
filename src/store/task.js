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
        total:0,
        query: {},
        find:'',
        taskRefine:[],
        taskFssp:[],


    },
    getters: {
        // ...
        TaskFsspsArr: state => {
            return state.taskFssp;
        },
        TaskRefineArr: state => {
            return state.taskRefine;
        },
        TasksArr: state => {
            return state.tasks;
        },
        TotalTasks: state => {
            return state.total;
        },

        QueryTasks: state => {
            return state.query;
        },

    },
    mutations: {
        setTasks (state, payload) {
            state.tasks = payload

        },
        setTaskFssps (state, payload) {
            state.taskFssp = payload

        },
        setTaskRefine (state, payload) {
            state.taskRefine = payload

        },
        setQueryTasks (state, payload) {
            state.query = payload

        },
        setTotalTasks (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getTasRefine({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setTaskRefine', [])


                axios.get(r("task.index"), {
                    params: {
                        method: 'getTasRefine',
                        param: ''
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setTaskRefine', response.data.data)
                    }




                })

            })
        },
        getTasFssps({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setTaskFssps', [])


                axios.get(r("task.index"), {
                    params: {
                        method: 'getTaskFssp',
                        param: ''
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setTaskFssps', response.data.data)
                    }




                })

            })
        },
        getDataTasks({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let str=randomString(20);
                state.find=str;
                if(requestObject==''){
                    axios.get(r("task.index"), {
                        params: {
                            method: 'getTasks',
                            param: ''
                        }
                    }).then((response) => {
                        if(response.data.result){
                            if(str==state.find){
                                console.log(response.data.data)
                                commit('setTasks', response.data.data)
                                commit('setTotalTasks', response.data.total)
                            }

                        }




                    })
                }
                if(requestObject=='voice'){
                    axios.get(r("taskVoice.index")).then((response) => {
                        if(response.data.result){
                            if(str==state.find){
                                commit('setTasks', response.data.data)
                                commit('setTotalTasks', response.data.total)
                            }
                        }




                    })
                }
                if(requestObject=='bankrot'){
                    axios.get(r("taskBankrot.index")).then((response) => {
                        if(response.data.result){
                            if(str==state.find){
                                commit('setTasks', response.data.data)
                                commit('setTotalTasks', response.data.total)
                            }
                        }




                    })
                }
                if(requestObject=='fssp'){
                    axios.get(r("taskFssp.index")).then((response) => {
                        if(response.data.result){
                            if(str==state.find){
                                commit('setTasks', response.data.data)
                                commit('setTotalTasks', response.data.total)
                            }
                        }




                    })
                }


            })
        },

        deleteTask({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("task.update"), {
                    params: {
                        method: 'deleteTask',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataTasks');
                    }
                    resolve(response.data.result)


                })

            })
        },

    }



}



