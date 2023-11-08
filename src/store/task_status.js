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


    },
    getters: {
        // ...

        TasksUserStatusArrAll: state => {
            let arr=[];
            arr.push({
                id:0,
                name:'Все'
            });
            for(let i=0;i<state.tasks.length;i++)
            {

                arr.push(state.tasks[i]);

            }
            return arr;

        },
        TasksUserStatusArr: state => {

            return state.tasks;

        },
        TotalTasksUserStatus: state => {
            return state.total;
        },



    },
    mutations: {
        setTasks (state, payload) {
            state.tasks = payload

        },

        setTotalTasks (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getTaskUserStatuss({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let str=randomString(20);
                state.find=str;
                    axios.get(r("taskUserStatus.index"), {
                        params: {
                            method: 'getTaskUserStatuss',
                            param: ''
                        }
                    }).then((response) => {
                        if(response.data.result){
                            if(str==state.find){
                                commit('setTasks', response.data.data)
                                commit('setTotalTasks', response.data.total)
                            }

                        }




                    })



            })
        },
        deleteTaskUserStatus({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("taskUserStatus.update"), {
                    params: {
                        method: 'deleteTaskUserStatus',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getTaskUserStatuss');
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveTaskUserStatus({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("taskUserStatus.update"), {
                    params: {
                        method: 'saveTaskUserStatus',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getTaskUserStatuss');
                    }
                    resolve(response.data.result)


                })

            })
        },


    }



}



