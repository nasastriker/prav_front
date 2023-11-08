import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        templSofts:[],
        total:0,
        pochtaArr:[],
        emailArr:[],
        smsArr:[],
        voiceArr:[],
        query: {}



    },
    getters: {
        // ...
        TemplSoftsArr: state => {
            return state.templSofts;
        },
        TotalTemplSofts: state => {
            return state.total;
        },

        QueryTemplSofts: state => {
            return state.query;
        },
        EmailArr: state => {
            return state.emailArr;
        },
        PochtaArr: state => {
            return state.pochtaArr;
        },
        SmsArr: state => {
            return state.smsArr;
        },
        VoiceArr: state => {
            return state.voiceArr;
        },
        TypeArr: state => {
            return [
                {
                    id:1,
                    name:'Смс',
                },
                {
                    id:0,
                    name:'Email',},
                {
                    id:2,
                    name:'Голосовое сообщение',},
                {
                    id:3,
                    name:'Почтовое сообщение',}
            ]
        },
        ActionArr: state => {
            return [
                {
                    id:0,
                    name:'Отправка',
                },
                {
                    id:1,
                    name:'Изменить статус',}
            ]
        },


    },
    mutations: {
        setTemplSofts (state, payload) {
            state.templSofts = payload

        },
        setQueryTemplSofts (state, payload) {
            state.query = payload

        },
        setTotalTemplSofts (state, payload) {
            state.total = payload

        },
        setTemplSoftsEmail (state, payload) {
            state.emailArr = payload
            state.emailArr.unshift({
                name:'Шаблон2'
            })
            state.emailArr.unshift({
                name:'Шаблон1'
            })


        },
        setTemplSoftsPochta (state, payload) {
            state.pochtaArr = payload
            state.pochtaArr.unshift({
                name:'Шаблон2'
            })
            state.pochtaArr.unshift({
                name:'Шаблон1'
            })


        },
        setTemplSoftsSms (state, payload) {
            state.smsArr = payload
            state.smsArr.unshift({
                name:'Шаблон2'
            })
            state.smsArr.unshift({
                name:'Шаблон1'
            })


        },
        setTemplSoftsVoice (state, payload) {
            state.voiceArr = payload
            state.voiceArr.unshift({
                name:'Шаблон2'
            })
            state.voiceArr.unshift({
                name:'Шаблон1'
            })


        },


    },
    actions: {

        getDataTemplSoftsEmail({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryTemplSofts', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("templSoft.index"), {
                    params: {
                        method: 'getTemplSoftsEmail',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setTemplSofts', response.data.data)
                        commit('setTotalTemplSofts', response.data.total)
                    }




                })

            })
        },
        getDataTemplSoftsSms({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryTemplSofts', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("templSoft.index"), {
                    params: {
                        method: 'getTemplSoftsSms',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setTemplSofts', response.data.data)
                        commit('setTotalTemplSofts', response.data.total)
                    }




                })

            })
        },
        getDataTemplSoftsPochta({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                console.log(requestObject)
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryTemplSofts', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("templSoft.index"), {
                    params: {
                        method: 'getTemplSoftsPochta',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setTemplSofts', response.data.data)
                        commit('setTotalTemplSofts', response.data.total)
                    }




                })

            })
        },
        getDataTemplSoftsVoice({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                console.log(requestObject)
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryTemplSofts', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("templSoft.index"), {
                    params: {
                        method: 'getTemplSoftsVoice',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setTemplSofts', response.data.data)
                        commit('setTotalTemplSofts', response.data.total)
                    }




                })

            })
        },
        getTemplSoftsEmail({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {


                axios.get(r("templSoft.index"), {
                    params: {
                        method: 'getTemplSoftsEmail',
                        param: ''
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setTemplSoftsEmail', response.data.data)

                    }




                })

            })
        },
        getTemplSoftsPochta({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {


                axios.get(r("templSoft.index"), {
                    params: {
                        method: 'getTemplSoftsPochta',
                        param: ''
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setTemplSoftsPochta', response.data.data)
                    }




                })

            })
        },
        getTemplSoftsSms({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {


                axios.get(r("templSoft.index"), {
                    params: {
                        method: 'getTemplSoftsSms',
                        param: ''
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setTemplSoftsSms', response.data.data)
                    }




                })

            })
        },
        getTemplSoftsVoice({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {


                axios.get(r("templSoft.index"), {
                    params: {
                        method: 'getTemplSoftsVoice',
                        param: ''
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setTemplSoftsVoice', response.data.data)

                    }




                })

            })
        },

        deleteTemplSoft({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("templSoft.update"), {
                    params: {
                        method: 'deleteTemplSoft',
                        param: requestObject.id
                    }
                }).then((response) => {
                    if(response.data.result){

                        if(requestObject.type='email'){
                            dispatch('getDataTemplSoftsEmail');
                        }
                        if(requestObject.type='sms'){
                            dispatch('getDataTemplSoftsSms');
                        }
                        if(requestObject.type='voice'){
                            dispatch('getDataTemplSoftsVoice');
                        }
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveTemplSoft({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("templSoft.update"), {
                    params: {
                        method: 'saveTemplSoft',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataTemplSofts');
                    }
                    resolve(response.data.result)


                })

            })
        },

    }



}



