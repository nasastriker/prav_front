import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)

export default {
    state: {
        bkiCredoContractSpecies: [],
        bkiCredoObligationType: [],
        bkiCredoCreditPurpose: [],
        bkiCredoCreditForm : [],
        bkiCredoContractPercentPeriod: [],
        bkiCredoContractState: [],


    },
    getters: {
        // ...

        BkiCredoContractSpecies: state => {
            return state.bkiCredoContractSpecies
        },
        BkiCredoObligationType: state => {
            return state.bkiCredoObligationType
        },
        BkiCredoCreditPurpose: state => {
            return state.bkiCredoCreditPurpose
        },
        BkiCredoCreditForm: state => {
            return state.bkiCredoCreditForm
        },
        BkiCredoContractPercentPeriod: state => {
            return state.bkiCredoContractPercentPeriod
        },
        BkiCredoContractState: state => {
            return state.bkiCredoContractState
        },
    },
    mutations: {

        setBkiCredoContractSpecies(state, payload) {
            state.bkiCredoContractSpecies = payload

        },
        setBkiCredoObligationType(state, payload) {
            state.bkiCredoObligationType = payload

        },
        setBkiCredoCreditPurpose(state, payload) {
            state.bkiCredoCreditPurpose = payload

        },
        setBkiCredoCreditForms(state, payload) {
            state.bkiCredoCreditForm = payload

        },
        setBkiCredoContractPercentPeriod(state, payload) {
            state.bkiCredoContractPercentPeriod = payload

        },
        setBkiCredoContractState(state, payload) {
            state.bkiCredoContractState = payload

        },

    },
    actions: {
     getBkiCredoLists({state, getters, commit, dispatch}, requestObject) {
         return new Promise((resolve, reject) => {
             axios.get(r("bki_credo.index"), {
                 params: {
                     method: 'getAllLists',
                     param: requestObject
                 }
             }).then((response) => {
                 if(response.data.result){
                         commit('setBkiCredoContractSpecies', response.data.ContractSpecies)
                         commit('setBkiCredoObligationType', response.data.ObligationType)
                         commit('setBkiCredoCreditPurpose', response.data.CreditPurpose)
                         commit('setBkiCredoCreditForms', response.data.CreditForm)
                         commit('setBkiCredoContractPercentPeriod', response.data.ContractPercentPeriod)
                         commit('setBkiCredoContractState', response.data.ContractState)
                 }
                 resolve(response.data.result)

             })

         })
     },

    }
}
