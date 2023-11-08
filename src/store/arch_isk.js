import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        data:[],
        total:0,
        query: {}



    },
    getters: {
        // ...
        ArchIsksArr: state => {
            return state.data;
        },
        TotalArchIsks: state => {
            return state.total;
        },

        QueryArchIsks: state => {
            return state.query;
        },

    },
    mutations: {
        setArchIsks (state, payload) {
            state.data = payload

        },
        setQueryArchIsks (state, payload) {
            state.query = payload

        },
        setTotalArchIsks (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataArchIsks({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryArchIsks', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("archIsk.index"), {
                    params: {
                        method: 'getArchIsks',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setArchIsks', response.data.data)
                        commit('setTotalArchIsks', response.data.total)
                    }




                })

            })
        },

    }



}



