import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        shablon:[],
        total:0,
        query: {}



    },
    getters: {
        // ...
        ShablonNamesArr: state => {
            return state.shablon;
        },
        TotalShablonNames: state => {
            return state.total;
        },

        QueryShablonNames: state => {
            return state.query;
        },

    },
    mutations: {
        setShablonNames (state, payload) {
            state.shablon = payload

        },
        setQueryShablonNames (state, payload) {
            state.query = payload

        },
        setTotalShablonNames (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataShablonNames({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryShablonNames', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("shablonName.index"), {
                    params: {
                        method: 'getShablonNames',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setShablonNames', response.data.data)
                        commit('setTotalShablonNames', response.data.total)
                    }




                })

            })
        },

    }



}



