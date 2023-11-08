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
        dadataSettingsArr:[],
        totalDadataSettings:0,

        suggestionOptionsAddress: {
            // @see https://confluence.hflabs.ru/pages/viewpage.action?pageId=207454318
            token: 'b8a2583286b923f4ac8da8cc290138cccb8d77ee',
            type: "ADDRESS",
            scrollOnFocus: false,
            triggerSelectOnBlur: false,
            triggerSelectOnEnter: false,
            addon: 'none',
            // @see https://confluence.hflabs.ru/pages/viewpage.action?pageId=207454320
            onSelect (suggestion) {

            }
        },

    },
    getters: {
        // ...
        SuggestionOptionsAddress:state=>{
            return state.suggestionOptionsAddress
        },
        DadataSettingsArr:state=>{
            return state.dadataSettingsArr
        },
        TotalDadataSettings:state=>{
            return state.totalDadataSettings
        },

    },
    mutations: {
        setDadataSettingsArr(state, payload) {
            for (let i = 0; i < payload.length; i++) {
                if (payload[i].front)state.suggestionOptionsAddress.token=payload[i].token
            }
            state.dadataSettingsArr = payload
        },
        setTotalDadataSettings(state, payload) {
            state.totalDadataSettings = payload
        },

    },
    actions: {
        getDadataSettingsArr({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setDadataSettingsArr', [])
                commit('setTotalDadataSettings', 0)

                axios.get(r('dadata.index'), {
                    params: {
                        method: 'getDadataSettingsArr',
                        param: requestObject
                    }
                }).then((response) => {

                    if(response.data.result){
                        commit('setDadataSettingsArr', response.data.data)
                        commit('setTotalDadataSettings', response.data.total)
                    }
                })

            }) .catch(error => {
                commit('setDadataSettingsArr', [])
                commit('setTotalDadataSettings', 0)
            })
        },

       

    }



}



