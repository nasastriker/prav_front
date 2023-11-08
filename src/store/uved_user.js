
import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
    state: {
        uveds: [],
        total: 0,
        color:'primary',
    },
    getters: {
        UvedUsers: state => {
            return state.uveds
        },
        ColorUved: state => {
            return state.color
        },
        TotalUveds: state => {
            return state.total
        }

    },
    mutations: {
        delUvedUsers(state, item) {
            const index = state.uveds.findIndex(i => i.id === item.id)
            state.uveds.splice(index, 1);
        },
        updateUvedUsers(state, item) {
            const index = state.uveds.findIndex(i => i.id === item.id)
            state.uveds[index] = {...item} // Глубокое копирование объекта
        },
        setUveds(state, payload) {
            state.uveds = payload
        },
        setUvedColors(state, payload) {
            state.color = payload
        },
        setUvedColorsChange(state, payload) {
            state.color = payload
        },
        setTotalUveds(state, payload) {
            state.total = payload
        }
    },
    actions: {
        getUvedUsers({state, getters, commit, dispatch}, requestObject = null) {
            commit('setUveds', [])
            commit('setUvedColors', 'primary')
            commit('setTotalUveds',0)
            return new Promise((resolve, reject) => {
                axios.get(r('userUved.index'), {
                    params: {
                        method: 'getUserUved',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        this.arr=response.data.data
                        if(response.data.uved){
                            commit('setUvedColors', 'red')

                            // var audio = new Audio('/mess.mp3'); // path to file
                            // audio.play();

                        }else{
                            commit('setUvedColors', 'primary')
                        }
                        commit('setUveds', response.data.data)
                        commit('setTotalUveds', response.data.total)
                    } else {
                        commit('setUveds', [])
                        commit('setTotalUveds', 0)
                    }
                })
            })
        },
        getUvedUsersAudio({state, getters, commit, dispatch}, requestObject = null) {
            console.log('1');
            commit('setUveds', [])
            commit('setUvedColors', 'primary')
            commit('setTotalUveds',0)
            return new Promise((resolve, reject) => {
                axios.get(r('userUved.index'), {
                    params: {
                        method: 'getUserUved',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        this.arr=response.data.data
                        if(response.data.uved){
                            commit('setUvedColors', 'red')

                             var audio = new Audio('/mess.mp3'); // path to file
                             audio.play();

                        }else{
                            commit('setUvedColors', 'primary')
                        }
                        commit('setUveds', response.data.data)
                        commit('setTotalUveds', response.data.total)
                    } else {
                        commit('setUveds', [])
                        commit('setTotalUveds', 0)
                    }
                })
            })
        },


    }
}