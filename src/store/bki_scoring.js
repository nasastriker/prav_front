import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)

export default {
    state: {
        bkiScoringRatio: [],
        bkiScoringCategory: [],
        bkiScoringType: [],
        bkiScoringPurpose: [],
    },
    getters: {
        // ...

        BkiScoringRatio: state => {
            return state.bkiScoringRatio
        },
        BkiScoringCategory: state => {
            return state.bkiScoringCategory
        },
        BkiScoringType: state => {
            return state.bkiScoringType
        },
        BkiScoringPurpose: state => {
            return state.bkiScoringPurpose
        },

    },
    mutations: {

        setBkiScoringRatio(state, payload) {
            state.bkiScoringRatio = payload
        },
        setBkiScoringCategory(state, payload) {
            state.bkiScoringCategory = payload
        },
        setBkiScoringType(state, payload) {
            state.bkiScoringType = payload
        },
     setBkiScoringPurpose(state, payload) {
            state.bkiScoringPurpose = payload
        },


    },
    actions: {
        getBkiScoringLists({state, getters, commit, dispatch}, requestObject=null) {
            return new Promise((resolve, reject) => {
                axios.get(r("bki_scoring.index"), {
                    params: {
                        method: 'getAllLists',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setBkiScoringRatio', response.data.ratio)
                        commit('setBkiScoringCategory', response.data.category)
                        commit('setBkiScoringType', response.data.type)
                        commit('setBkiScoringPurpose', response.data.purpose)

                    }
                    resolve(response.data.result)

                })

            })
        },

    }
}
