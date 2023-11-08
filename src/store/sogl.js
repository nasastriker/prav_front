import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        sogls:[],
        total:0,
        query: {}



    },
    getters: {
        // ...
        SoglsArr: state => {
            return state.sogls;
        },
        TotalSogls: state => {
            return state.total;
        },

        QuerySogls: state => {
            return state.query;
        },

    },
    mutations: {
        setSogls (state, payload) {
            state.sogls = payload

        },
        setQuerySogls (state, payload) {
            state.query = payload

        },
        setTotalSogls (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataSogls({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQuerySogls', requestObject)
                }
                else{
                    param=getters.QuerySogls
                }

                axios.get(r("sogl.index"), {
                    params: {
                        method: 'getSogls',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setSogls', response.data.data)
                        commit('setTotalSogls', response.data.total)
                    }




                })

            })
        },
        deleteSogl({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("sogl.index"), {
                    params: {
                        method: 'deleteSogl',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){

                    }
                })
            })
        },
    }



}



