import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../axios';
import r from '../../route';

Vue.use(Vuex);


export default {
    state: {

        faqs:[],
        total:0,
        query: {}

    },
    getters: {
        // ...

        FaqsArr: state => {
            return state.faqs;
        },
        TotalFaqs: state => {
            return state.total;
        },

        QueryFaqs: state => {
            return state.query;
        },

    },
    mutations: {
        setFaqs (state, payload) {
            state.faqs = payload

        },
        setQueryFaqs (state, payload) {
            state.query = payload

        },
        setTotalFaqs (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataFaqs({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryDocuments', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                axios.get(r("faq.index"), {
                    params: {
                        method: 'getFaqs',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setFaqs', response.data.data)
                        commit('setTotalFaqs', response.data.total)
                    }




                })

            })
        },
        deleteFaq({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("faq.update"), {
                    params: {
                        method: 'deleteFaq',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataFaqs');
                    }

                    resolve(response.data.result)


                })

            })
        },

        setFaq({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post(r("faq.update"), {
                    params: {
                        method: 'setFaq',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataFaqs');
                    }

                    resolve(response.data.result)


                })

            })
        },
    }



}



