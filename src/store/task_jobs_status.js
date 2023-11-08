import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex);
export default {
    state: {
    },
    getters: {
        // ...
     //   TasksArr: state => {
     //       return state.tasks;
     //   },
    },
    mutations: {
      //  setTasks(state, payload) {
      //      state.tasks = payload
//
        },

    actions: {
        getTaskJobStatusFromTaskJobsStatus({state, getters, commit, dispatch}, requestObject){
            return new Promise((resolve, reject) => {
                axios.get(r("taskJobsStatus.update"), {
                    params: {
                        method: 'getTaskData',
                        param:{name:requestObject}
                    }
                }).then((response)=>{resolve(response.data)})
            })
        }
    }
 }