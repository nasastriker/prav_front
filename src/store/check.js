import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        check:[],
        total:0,
        query: {}



    },
    getters: {
        // ...
        ChecksArr: state => {
            return state.check;
        },
        TotalChecks: state => {
            return state.total;
        },

        QueryChecks: state => {
            return state.query;
        },

    },
    mutations: {
        setChecks (state, payload) {
            state.check = payload

        },
        setQueryChecks (state, payload) {
            state.query = payload

        },
        setTotalChecks (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataChecks({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryChecks', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("check.index"), {
                    params: {
                        method: 'getChecks',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setChecks', response.data.data)
                        commit('setTotalChecks', response.data.total)
                    }




                })

            })
        },
        saveCheck({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let formData = new FormData();

                formData.append('document', requestObject.file[0]);
                formData.append('id', requestObject.id);
                formData.append('name_id', requestObject.name_id);
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                axios.post( '/check/post-document',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((response) => {
                    if(response.data.result){
                        dispatch('getDataChecks');

                    }
                    resolve(response.data.result)
                })

            })
        },

        deleteCheck({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("check.update"), {
                    params: {
                        method: 'deleteCheck',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataChecks');
                    }
                    resolve(response.data.result)


                })

            })
        },


    }



}



