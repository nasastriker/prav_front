import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);

function randomString(i) {
    var rnd = '';
    while (rnd.length < i)
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};

export default {
    state: {
        bkiReestrArr: [],
        total: 0,
        bkiReestrOnce:[],
        bkiJournalOnce:[],
        find:'',
        query: {
            offset: 0,
            limit: 10
        }


    },
    getters: {
        // ...

        BkiReestrArr: state => {
            return state.bkiReestrArr;
        },
        BkiReestrTotal: state => {
            return state.total;
        },
        BkiReestrOnce: state => {
            return state.bkiReestrOnce;
        },
        BkiJournalOnce: state => {
            return state.bkiJournalOnce;
        },

    },
    mutations: {

        setBkiReestrArr(state, payload) {
            state.bkiReestrArr = payload

        },
        setBkiReestrTotal(state, payload) {
            state.total = payload
        },
        setBkiReestrOnce(state, payload) {
            state.bkiReestrOnce = payload
        },
     setBkiJournalOnce(state, payload) {
            state.bkiJournalOnce = payload
        },

    },
    actions:{
        getBkiReestrArr({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let str=randomString(20);
                state.find=str;

                axios.get(r("bki_reestr.index"), {
                    params: {
                        method: 'getReestrArr',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        if(str==state.find){
                            commit('setBkiReestrArr', response.data.data)
                            commit('setBkiReestrTotal', response.data.total)
                        }
                    }
                })
            })
        },
        getBkiReestrOnce({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("bki_reestr.index"), {
                    params: {
                        method: 'getReestrOnce',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                            commit('setBkiReestrOnce', response.data.data)
                    }
                    resolve(response.data.data)
                })
            })
        },
        getBkiJournalOnce({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("bki_reestr.index"), {
                    params: {
                        method: 'getJournalOnceOnce',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                            commit('setBkiJournalOnce', response.data.data)
                    }
                    resolve(response.data.data)
                })
            })
        },

    }
}