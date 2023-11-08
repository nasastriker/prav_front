import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        OrganisationTask:[],
        OrganisationTaskAll:[],
        findOrganisationTaskAll:'',
        OrganisationTaskAllFind:[],
        totalTaskAll:0,
        total:0,
        query: {},
        editTaskOrganisation:0,
        showEditTask:false,



    },
    getters: {
        QueryOrganisationTasks: state => {
            return state.query;
        },
        OrganisationTasksArr: state => {
            return state.OrganisationTask;
        },
        OrganisationTaskArrAllFind: state => {
            if(state.findOrganisationTaskAll==''){
                return state.OrganisationTaskAll;
            }else{
                const $arr = []
                for (let i = 0; i < state.OrganisationTaskAll.length; i++) {
                    if(state.OrganisationTaskAll[i].name.indexOf(state.findOrganisationTaskAll)+1) {
                        $arr.push(state.OrganisationTaskAll[i])
                    }
                }

                return $arr
            }


            return state.OrganisationTaskAllFind;
        },
        OrganisationTaskArrAll: state => {
            return state.OrganisationTaskAll;
        },

        TotalOrganisationTasks: state => {
            return state.total;
        },

        EditTaskOrganisation: state => {
            return state.editTaskOrganisation;
        },



    },
    mutations: {
        setEditTaskOrganisation (state, payload) {
            state.editTaskOrganisation = payload

        },

        setFindOrganisationTaskAll (state, payload) {
            state.findOrganisationTaskAll = payload

        },
        setOrganisationTask (state, payload) {
            state.OrganisationTask = payload

        },
        setOrganisationTaskAll (state, payload) {
            state.OrganisationTaskAll = payload
            state.totalTaskAll = payload.length

        },
        clearOrganisationTask(state, payload) {
            state.OrganisationTask = []
            state.total = 0


        },
        setQueryOrganisationTask (state, payload) {
            state.query = payload

        },
        setTotalOrganisationTask (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataOrganisationTasks({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setOrganisationTask', [])
                commit('setOrganisationTaskAll', [])
                commit('setTotalOrganisationTask', 0)
                
                axios.get(r("organizationTask.index"), {
                    params: {
                        method: 'getOrganisationTasks',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setOrganisationTask', response.data.data)
                        commit('setOrganisationTaskAll', response.data.dataAll)
                        commit('setTotalOrganisationTask', response.data.total)
                    }




                })

            })
        },

        deleteOrganisationTask({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("organizationTask.update"), {
                    params: {
                        method: 'deleteOrganisationTask',
                        param: requestObject
                    }
                }).then((response) => {
                    dispatch('getDataOrganisationTasks');
                    resolve(response.data.result)


                })

            })
        },

        saveOrganisationTask({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("organizationTask.update"), {
                    params: {
                        method: 'saveOrganisationTask',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataOrganisationTasks');
                    }
                    resolve(response.data.result)


                })

            })
        },

    }



}



