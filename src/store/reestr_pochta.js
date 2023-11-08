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
        ReestrPochtasArr: state => {
            return state.data;
        },
        TotalReestrPochtas: state => {
            return state.total;
        },

        QueryReestrPochtas: state => {
            return state.query;
        },
        LetterTypes: state => {
            const $arr = []
            $arr.push({
                id:0,
                name:'Простое'
            })
            $arr.push({
                id:1,
                name:'Заказное'
            })
            return $arr
        },


    },
    mutations: {
        setReestrPochtas (state, payload) {
            state.data = payload

        },
        setQueryReestrPochtas (state, payload) {
            state.query = payload

        },
        setTotalReestrPochtas (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataReestrPochtas({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryReestrPochtas', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("reestrPochta.index"), {
                    params:param
                }).then((response) => {
                    if(response.data.result){
                        commit('setReestrPochtas', response.data.data)
                        commit('setTotalReestrPochtas', response.data.total)
                    }




                })

            })
        },

    }



}



