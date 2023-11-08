import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        notifications:[],
        total:0,
        query: {}



    },
    getters: {
        // ...
        NotificationsArr: state => {
            return state.notifications;
        },
        TotalNotifications: state => {
            return state.total;
        },

        QueryNotifications: state => {
            return state.query;
        },

    },
    mutations: {
        setNotifications (state, payload) {
            state.notifications = payload

        },
        setQueryNotifications (state, payload) {
            state.query = payload

        },
        setTotalNotifications (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataNotifications({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryNotifications', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("notification.index"), {
                    params: {
                        method: 'getNotifications',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setNotifications', response.data.data)
                        commit('setTotalNotifications', response.data.total)
                    }




                })

            })
        },

    }



}



