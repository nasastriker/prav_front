import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        data:[],
        total:0,
        query: {},
        flag:false,



    },
    getters: {
        // ...
        FnsSettingShablon: state => {
            return state.data;
        },
        TotalFnsSettingShablon: state => {
            return state.total;
        },

        FnsSettingShablonLoadingFlag:state => {
            return state.flag;
        }

    },
    mutations: {

        setFnsSettingShablon (state, payload) {
            state.data = payload

        },

        setTotalFnsSettingShablon (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getFnsSettingShablons({state, getters, commit, dispatch}, requestObject) {
            state.flag=true
            return new Promise((resolve, reject) => {

                axios.get(r("settingFns.index"), {
                    params: {
                        method: 'getFnsSettingShablons',
                        param: requestObject
                    }
                }).then((response) => {
                    state.flag=false
                    if(response.data.result){
                        commit('setFnsSettingShablon', response.data.data)
                        commit('setTotalFnsSettingShablon', response.data.total)
                    }




                })

            })
        },
        // deleteArchFssp({state, getters, commit, dispatch}, requestObject) {
        //     return new Promise((resolve, reject) => {
        //
        //         axios.post(r("archFssp.update"), {
        //             params: {
        //                 method: 'deleteArchFssp',
        //                 param: requestObject
        //             }
        //         }).then((response) => {
        //             if(response.data.result){
        //                 dispatch('getDataArchFssps');
        //             }
        //
        //             resolve(response.data.result)
        //
        //
        //         })
        //
        //     })
        // },


    }



}



