import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        users:[],
        total:0,
        query: {},
        l_users:[],
        r_users:[],
        users_menu:[],
    },
    getters: {
        // ...
        UserFilterDevelopmentArr: state => {
            let arr=[];
            arr.push({id:0, f_i:'Все сотрудники'},{id:-1, f_i:'Не назначеный исполнитель'})
            for(let i=0;i<state.users.length;i++)
            {

                arr.push(state.users[i]);

            }
            return arr;

        },
        UsersArrAll: state => {
            let arr=[];
            arr.push({
                id:0,
                fio:'Все сотрудники'
            });
            for(let i=0;i<state.users.length;i++)
            {

                arr.push(state.users[i]);

            }
            return arr;

        },
        UsersArrAllMenu: state => {
            return state.users_menu;
        },
        UsersArr: state => {
            return state.users;
        },
        TotalUsers: state => {
            return state.total;
        },

        QueryUsers: state => {
            return state.query;
        },
        LUsersArr: state => {
            return state.l_users;
        },
        RUsersArr: state => {
            return state.r_users;
        },

    },
    mutations: {
        setUsers (state, payload) {
            state.users = payload

        },
        setQuery (state, payload) {
            state.query = payload

        },
        setTotal (state, payload) {
            state.total = payload

        },
        setLUsersArr (state, payload) {
            state.l_users = payload
        },
        setRUsersArr (state, payload) {
            state.r_users = payload
        },
        setUsersMenu (state, payload) {
            state.users_menu = payload
        },
    },
    actions: {
        getDataUsers({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQuery', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
              //  console.log(localStorage);

                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                axios.get(r("users.index"), {
                    params: {
                        method: 'getUsers',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setUsers', response.data.data)
                        commit('setTotal', response.data.total)
                    }




                })

            })
        },
        deleteUser({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                axios.post(r("users.update"), {
                    params: {
                        method: 'deleteUser',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataUsers');
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveUser({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("users.update"), {
                    params: {
                        method: 'saveUserById',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataUsers');
                    }
                    resolve(response.data.result)


                })

            })
        },
        getDataUsersNoAdmin({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQuery', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                axios.get(r("users.index"), {
                    params: {
                        method: 'getUsersNoAdmin',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setUsers', response.data.data)
                    }
                })
            })
        },


        getAllUsers({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("users.index"), {
                    params: {
                        method: 'getAllUsers',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setLUsersArr', response.data.l_data)
                        commit('setRUsersArr', response.data.r_data)
                    }
                })
            })
        },
        getUsersAllByName({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("users.index"), {
                    params: {
                        method: 'getUsersAllByName',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setLUsersArr', response.data.data)
                    }
                })
            })
        },
        getUsersAllMenu({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("users.index"), {
                    params: {
                        method: 'getUsersAllMenu',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setUsersMenu', response.data.data)
                    }
                })
            })
        },
        getUserAccessChangeRecover({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("users.index"), {
                    params: {
                        method: 'getUserAccessChangeRecover',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
    }



}



