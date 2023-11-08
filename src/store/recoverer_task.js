import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        recoverTask:[],
        recoverTaskAll:[],
        findRecoverTaskAll:'',
        recoverTaskAllFind:[],
        totalTaskAll:0,
        total:0,
        query: {},
        editTaskRecover:0,
        showEditTask:false,



    },
    getters: {
        QueryRecoverTasks: state => {
            return state.query;
        },
        RecoverTasksArr: state => {
            return state.recoverTask;
        },
        RecoverTaskArrAllFind: state => {
            if(state.findRecoverTaskAll==''){
                return state.recoverTaskAll;
            }else{
                const $arr = []
                for (let i = 0; i < state.recoverTaskAll.length; i++) {
                    if(state.recoverTaskAll[i].name.indexOf(state.findRecoverTaskAll)+1) {
                        $arr.push(state.recoverTaskAll[i])
                    }
                }

                return $arr
            }


            return state.recoverTaskAllFind;
        },
        RecoverTaskArrAll: state => {
            return state.recoverTaskAll;
        },
        TotalTaskArrAll: state => {
            return state.totalTaskAll;
        },
        TotalRecoverTasks: state => {
            return state.total;
        },
        ShowEditTask: state => {
            return state.showEditTask;
        },
        EditTaskRecover: state => {
            return state.editTaskRecover;
        },



    },
    mutations: {
        setEditTaskRecover (state, payload) {
            state.editTaskRecover = payload

        },
        setShowEditTask (state, payload) {
            state.showEditTask = payload

        },
        setFindRecoverTaskAll (state, payload) {
            state.findRecoverTaskAll = payload

        },
        setRecoverTask (state, payload) {
            state.recoverTask = payload

        },
        setRecoverTaskAll (state, payload) {
            state.recoverTaskAll = payload
            state.totalTaskAll = payload.length

        },
        clearRecoverTask(state, payload) {
            state.recoverTask = []
            state.total = 0


        },
        setQueryRecoverTask (state, payload) {
            state.query = payload

        },
        setTotalRecoverTask (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataRecoverTasks({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('clearRecoverTask', '')
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryRecoverTask', requestObject)
                }
                else{
                    param=getters.QueryRecoverTasks
                }
                //  console.log(localStorage);

                axios.get(r("recoverTask.index"), {
                    params: {
                        method: 'getRecoverTasks',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setRecoverTask', response.data.data)
                        commit('setRecoverTaskAll', response.data.dataAll)
                        commit('setTotalRecoverTask', response.data.total)
                    }




                })

            })
        },

        deleteRecoverTask({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("recoverTask.update"), {
                    params: {
                        method: 'deleteRecoverTask',
                        param: requestObject
                    }
                }).then((response) => {
                    dispatch('getDataRecoverTasks');
                    resolve(response.data.result)


                })

            })
        },

        saveRecoverTask({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("recoverTask.update"), {
                    params: {
                        method: 'saveRecoverTask',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataRecoverTasks');
                    }
                    resolve(response.data.result)


                })

            })
        },

    }



}



