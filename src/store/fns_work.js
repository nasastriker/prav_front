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
        FnsWorksArr: state => {
            return state.data;
        },
        TotalFnsWorks: state => {
            return state.total;
        },

        QueryFnsWorks: state => {
            return state.query;
        },

    },
    mutations: {
        setFnsWorks (state, payload) {
            state.data = payload

        },
        setQueryFnsWorks (state, payload) {
            state.query = payload

        },
        setTotalFnsWorks (state, payload) {
            state.total = payload

        }

    },
    actions: {

        saveFnsWork({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("fnsWork.update"), {
                    params: {
                        method: 'save',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataFnsWorks');
                    }

                    resolve(response.data.result)


                })

            })
        },

    }



}



