import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';
Vue.use(Vuex);
export default {
    state: {
        data: {
            bd_jud:0,
            bd_pole:0,
        },
    },
    getters: {
        LocalBd: state => {
            return state.data;
        },
    },
    mutations: {
        setLocalBd (state, payload) {
            state.data = payload

        },

    },
    actions: {
        getLocalBd({state, getters, commit, dispatch}, requestObject) {
                axios.get(r("setting.index"), {
                    params: {
                        method: 'getLocalBd',
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setLocalBd', response.data.data)
                    }
                })
        },
        changeLocalBd({state, getters, commit, dispatch}, requestObject) {
            axios.post(r("setting.index"), {
                params: {
                    method: 'setLocalBd',
                    param:requestObject
                }
            }).then((response) => {
                if(response.data.result){
                    commit('setLocalBd', response.data.data)
                }
            })
        },

    }



}



