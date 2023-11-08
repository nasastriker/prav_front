import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';
import g from '../routeGo';
Vue.use(Vuex);
function randomString(i) {
    var rnd = '';
    while (rnd.length < i)
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};

export default {
    state: {
        emailMesss:[],
        total:0,
        query: {},
        param:{},
        flagFind:false,
        find:'',
        emailLoadingIconStatusFlag:false,



    },
    getters: {
        // ...
        EmailLoadingIconStatusFlag:state=>{
            return state.emailLoadingIconStatusFlag
        },
        EmailMesssArr: state => {
            return state.emailMesss;
        },
        TotalEmailMesss: state => {
            return state.total;
        },

        QueryEmailMesss: state => {
            return state.query;
        },

    },
    mutations: {
        setEmailLoadingIconStatusFlag(state, payload) {
            state.emailLoadingIconStatusFlag = payload

        },

        setEmailMesss (state, payload) {
            state.emailMesss = payload

        },
        setQueryEmailMesss (state, payload) {
            state.query = payload

        },
        setTotalEmailMesss (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataEmailMesss({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.emailLoadingIconStatusFlag=true
                commit('setEmailMesss', [])
                commit('setTotalEmailMesss', 0)
                let param
                    state.flagFind=true;
                    let str=randomString(20);
                    state.find=str;
                    if(requestObject){
                        param=requestObject
                        commit('setQueryEmailMesss', requestObject)
                    }else{
                        param=state.query;
                    }



                axios.get(r('email.index'), {
                    params: {
                        method: 'getEmailAll',
                        param: requestObject
                    }
                }).then((response) => {
                    if(str==state.find) {
                        state.emailLoadingIconStatusFlag = false;
                    }
                    if(response.data.result){
                        //  console.log(str==state.find)
                        if(str==state.find){
                            commit('setEmailMesss', response.data.data)
                            commit('setTotalEmailMesss', response.data.total)
                        }

                    }




                })

            })
        },

        deleteEmailMess({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.delete(g('email/email',requestObject)).then((response) => {
                    if(response.data.result){
                        dispatch('getDataEmailMesss');
                    }

                    resolve(response.data.result)


                })



            })
        },

    }



}



