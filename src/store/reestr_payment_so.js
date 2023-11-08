import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        reestrsPaymentSo:[],
        total:0,
        query: {},
        reestrsPaymentSoShow:[],
        reestrsPaymentSoName:[],

    },
    getters: {
        // ...
        ReestrsPaymentSoArrName: state => {
            let arr=[]
            for (let i = 0; i < state.reestrsPaymentSo.length; i++) {
                arr.push(
                    { name:state.reestrsPaymentSo[i].name_recover,
                        show:true,


                    }
                )


            }

            arr.__proto__.unique = function() {

                return this.filter(function(value, index, _this) {

                    return _this.indexOf(value) === index;

                });

            }
            state.reestrsPaymentSoName=arr.unique()
            return arr.unique();
        },
        ReestrsPaymentSoArr: state => {
            return state.reestrsPaymentSo;
        },
        ReestrsPaymentSoArrShow: state => {

            return state.reestrsPaymentSoShow;
        },
        TotalReestrsPaymentSo: state => {
            return state.total;
        },

        QueryReestrsPaymentSo: state => {
            return state.query;
        },

    },
    mutations: {
        hideReestr(state, payload){
                state.reestrsPaymentSoName[payload].show=!state.reestrsPaymentSoName[payload].show;
            let arr=[]
            for (let i = 0; i < state.reestrsPaymentSo.length; i++) {
                for (let a = 0; a < state.reestrsPaymentSoName.length; a++) {
                    if (state.reestrsPaymentSoName[a].name == state.reestrsPaymentSo[i].name_recover) {
                        if (state.reestrsPaymentSoName[a].show) {
                            arr.push(
                                state.reestrsPaymentSo[i]
                            )
                        }
                    }
                }


            }
          state.reestrsPaymentSoShow = arr
        },
        setReestrsPaymentSo (state, payload) {
            state.reestrsPaymentSo = payload
            state.reestrsPaymentSoShow = payload

        },
        setQueryReestrsPaymentSo (state, payload) {
            state.query = payload

        },
        setTotalReestrsPaymentSo (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataReestrsPaymentSo({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryReestrsPaymentSo', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("reestrPaymentSo.index"), {
                    params: {
                        method: 'getReestrsPaymentSo',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setReestrsPaymentSo', response.data.data)
                        commit('setTotalReestrsPaymentSo', response.data.total)
                    }




                })

            })
        },
        deleteReestrPaymentSo({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("reestrPaymentSo.update"), {
                    params: {
                        method: 'delete',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataReestrsPaymentSo');
                    }
                    resolve(response.data.result)


                })

            })
        },

    }



}



