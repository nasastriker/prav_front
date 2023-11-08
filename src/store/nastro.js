import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        nastro:{
            goslp:{},
            add_status:{}
        },
        user_nav_menu_items: []
    },
    getters: {
        // ...
        Nastro: state => {
            return state.nastro;
        },
        UserNavMenuItems: state => {
            // let arr=[];
            // // console.log(state.user_nav_menu_items)
            // for(let i=0;i<state.user_nav_menu_items.length;i++)
            // {
            //     arr.push({
            //         url: state.user_nav_menu_items[i]['url'],
            //         name: state.user_nav_menu_items[i]['name'],
            //         icon: state.user_nav_menu_items[i]['icon'],
            //         i18n: state.user_nav_menu_items[i]['i18n'],
            //     });
            // }
            // console.log(arr)
            return {yes: true, array: state.user_nav_menu_items};
        },
    },
    mutations: {
        setGoslp(state, payload) {
            state.nastro.goslp = payload
        },
        setAddStatus(state, payload) {
            state.nastro.add_status = payload
        },
        clearNastro(state){
            state.nastro={
                goslp:{},
                add_status:{}
            }
        },
        setUserNavMenuItems(state, payload) {
            state.user_nav_menu_items = payload
        },
    },
    actions: {
        getGoslp({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('clearNastro')
                axios.get(r("setting.index"), {
                    params: {
                        method: 'getGoslp',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setGoslp', response.data.data)
                    }
                    resolve(response.data.result)
                })

            })
        },
        saveGoslp({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('clearNastro')
                axios.post(r("setting.index"), {
                    params: {
                        method: 'saveGoslp',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setAddStatus', response.data.result)
                    }
                    resolve(response.data.result)
                })

            })
        },
        getNavMenuItems({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("setting.index"), {
                    params: {
                        method: 'getNavMenuItems',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setUserNavMenuItems', response.data.data)
                    }
                })
            })
        },
        getStartPageUrl({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("setting.index"), {
                    params: {
                        method: 'getStartPageUrl',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
    }


}
