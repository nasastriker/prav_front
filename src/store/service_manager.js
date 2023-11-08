import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import g from '../routeGo';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        service_arr:[],
        total:0,
        query: {},
        services_loading_flag: false,
    },
    getters: {
        ServiceArr: state => {
            return state.service_arr;
        },
        TotalServices: state => {
            return state.total;
        },

        QueryServices: state => {
            return state.query;
        },
        ServicesLoadingFlag: state => {
            return state.services_loading_flag;
        },

    },
    mutations: {
        setServiceArr (state, payload) {
            state.service_arr = payload

        },
        setQueryServices (state, payload) {
            state.query = payload

        },
        setTotalServices (state, payload) {
            state.total = payload

        }
    },
    actions: {
        getDataServices({state, getters, commit, dispatch}, requestObject) {
            state.services_loading_flag = true;
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                axios.get(g('service_manager/get_service_list',requestObject)).then((response) => {
                    state.services_loading_flag = false;
                    if(response.data.result){
                        commit('setServiceArr', response.data.data)
                        commit('setTotalServices', response.data.total)
                    }
                })
            })
        },
        deleteService({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                axios.post(g('service_manager/delete_service'), {
                        id: requestObject
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataServices');
                    }
                    resolve(response.data.result)
                })
            })
        },
        saveService({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                // var bodyFormData = new FormData();
                // Object.keys(requestObject).forEach((key) => {
                //     bodyFormData.append(key, requestObject[key])
                // })
                // // axios.get('http://localhost:5000/service_manager/save_service', {
                // //     params: {
                // //         service: requestObject,
                // //     }
                // //         // name: "123123"
                // // })
                // axios({
                //     method: "post",
                //     url: "http://localhost:5000/service_manager/save_service",
                //     data: bodyFormData,
                //     headers: { "Content-Type": "multipart/form-data" },
                // })
                axios.post(g('service_manager/save_service'), requestObject)

                .then((response) => {
                    if(response.data.result){
                        dispatch('getDataServices');
                    }
                    resolve(response.data.result)
                })

            })
        },
        startService({state, getters, commit, dispatch}, requestObject) {
            state.services_loading_flag = true;
            return new Promise((resolve, reject) => {
                axios.get(g('service_manager/start_service',requestObject)).then((response) => {
                    state.services_loading_flag = false;
                    if(response.data.result){
                        dispatch('getDataServices');
                    }
                    resolve(response.data.result)
                })

            })
        },
    }
}



