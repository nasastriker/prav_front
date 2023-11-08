import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        inheritor_list:[],
        inheritor_loading_flag:false,
    },
    getters: {
        InheritorList: state => {
            return state.inheritor_list;
        },
        InheritorsLoadingFlag: state => {
            return state.inheritor_loading_flag;
        },
    },
    mutations: {
        setInheritorList (state, payload) {
            state.inheritor_list = payload
        },
    },
    actions: {
        saveInheritorData({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("inheritor.update"), {
                    params: {
                        method: 'saveInheritorData',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        getInheritorData ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('inheritor.index'), {
                    params: {
                        method: 'getInheritorData',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        getInheritorList ({state, getters, commit, dispatch}, requestObject) {
            state.inheritor_loading_flag = true;
            commit('setInheritorList', [])
            return new Promise((resolve, reject) => {
                axios.get(r('inheritor.index'), {
                    params: {
                        method: 'getInheritorList',
                        param: requestObject
                    }
                }).then((response) => {
                    state.inheritor_loading_flag = false;
                    if (response.data.result) {
                        commit('setInheritorList', response.data.data)
                    }
                })
            })
        },
        deleteInheritor({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("inheritor.update"), {
                    params: {
                        method: 'deleteInheritor',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
    }



}



