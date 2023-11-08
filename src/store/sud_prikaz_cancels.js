import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        soc_answer_find_flag_to_dc: false,
        near_credits_for_soc_answer: {
            sa_data:{},
            dog_data:{}
        },
    },
    getters: {
        SocAnswerFindFlagToDc: state => {
            return state.soc_answer_find_flag_to_dc;
        },
        NearCreditsForSocAnswerArr: state => {
            return state.near_credits_for_soc_answer;
        },
    },
    mutations: {
        setNearCreditsForSocAnswer(state, payload) {
            state.near_credits_for_soc_answer = payload
        },
    },
    actions: {
        setSocAnswerToDebtorCredit({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.soc_answer_find_flag_to_dc = true;
                axios.get(r("sudPrikaz.index"), {
                    params: {
                        method: 'setSocAnswerToDebtorCredit',
                        param: requestObject
                    }
                }).then((response) => {
                    state.soc_answer_find_flag_to_dc = false;
                    if (response.data.result) {
                        resolve(response.data)
                    }
                })
            })
        },
        getNearCreditsForAnswerSocData({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("credits.index"), {
                    params: {
                        method: 'getNearCreditsForAnswerSocData',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setNearCreditsForSocAnswer', response.data.near_credits)
                    }
                })
            })
        },

    }
}



