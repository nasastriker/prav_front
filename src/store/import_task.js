import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        data:[],
        total:0,
        query: {},
        dataId:[],
        totalId:0,




    },
    getters: {
        // ...
        ImportTasksArrId: state => {
            return state.dataId;
        },
        ImportTasksArrHistory: state => {
            let arr=[]
            for (let i = 0; i < state.data.length; i++) {

                if(state.data[i].imp_data!=null){
                    state.data[i].imp_data.id=state.data[i].id
                    arr.push(state.data[i].imp_data
                    )
                }



            }
            return arr;
        },
        ImportTasksArr: state => {
            return state.data;
        },
        TotalImportTasksId: state => {
            return state.totalId;
        },
        TotalImportTasks: state => {
            return state.total;
        },

        QueryImportTasks: state => {
            return state.query;
        },

    },
    mutations: {
        setImportTasksOne (state, payload) {
            let find=false
            for (let i = 0; i < state.data.length; i++) {
                if(state.data[i].id==payload.id){
                    find=true
                    state.data[i]=payload
                }
                $arr.push(state.data[i])
            }
            if(find){
                $arr.push(payload)
            }



        },
        setImportTasks (state, payload) {
            state.data = payload

        },
        setImportTasksId (state, payload) {
            state.dataId = payload

        },

        setTotalImportTasksId (state, payload) {
            state.totalId = payload

        },

        setQueryImportTasks (state, payload) {
            state.query = payload

        },
        setTotalImportTasks (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataImportTasksId({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setImportTasksId', [])
                commit('setTotalImportTasksId', 0)

                axios.get(r("importTask.index"), {
                    params: {
                        method: 'getImportTasksId',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setImportTasksId', response.data.data)
                        commit('setTotalImportTasksId', response.data.total)
                    }




                })

            })
        },
        getDataImportTasks({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryImportTasks', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("importTask.index"), {
                    params: {
                        method: 'getImportTasks',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setImportTasks', response.data.data)
                        commit('setTotalImportTasks', response.data.total)
                    }




                })

            })
        },
        deleteImportTask({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("importTask.update"), {
                    params: {
                        method: 'deleteImportTask',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataImportTasks');
                    }

                    resolve(response.data.result)


                })

            })
        },



    }



}



