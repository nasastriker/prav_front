
import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    calculateVars: [],
    calculateVarsInList:[],
    total:0,
    totalInList:0
  },
  getters: {
    CalculateVarsArr: state => {
      return state.calculateVars
    },
    CalculateVarsInList: state => {
      return state.calculateVarsInList
    },
    CalculateVarsTotal: state => {
      return state.total
    },
    CalculateVarsInListTotal: state => {
      return state.totalInList
    }
  },
  mutations: {
    setCalculateVarsArr (state, payload) {
      state.calculateVars = payload
    },
    setCalculateVarsTotal (state, payload) {
      state.total = payload
    },
    setCalculateVarsInList (state, payload) {
      state.calculateVarsInList = payload
    },
    setCalculateVarsInListTotal (state, payload) {
      state.totalInList = payload
    }
  },
  actions:{
    getCalculateVarsArr ({state, getters, commit, dispatch}, requestObject = null) {
      commit('setCalculateVarsArr', [])
      return new Promise((resolve, reject) => {
        axios.get(r('calculateVars.index'), {
          params: {
            method: 'getCalculateVars',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setCalculateVarsArr', response.data.data)
            commit('setCalculateVarsTotal', response.data.total)
          } else {
            commit('setCalculateVarsArr', [])
            commit('setCalculateVarsTotal', 0)
          }
        })
      })
    },
    getCalculateVarsInList ({state, getters, commit, dispatch}, requestObject = null) {
      commit('setCalculateVarsInList', [])
      return new Promise((resolve, reject) => {
        axios.get(r('calculateVars.index'), {
          params: {
            method: 'getCalculateVarsInList',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setCalculateVarsInList', response.data.data)
            commit('setCalculateVarsInListTotal', response.data.total)
          } else {
            commit('setCalculateVarsInList', [])
            commit('setCalculateVarsInListTotal', 0)
          }
        })
      })
    },
    getCalculateVarsInListOnce ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('calculateVars.index'), {
          params: {
            method: 'getCalculateVarsInListOnce',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    getCalculateVarsOnce ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('calculateVars.index'), {
          params: {
            method: 'getCalculateVarsOnce',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    VerifyFormula ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('calculateVars.index'), {
          params: {
            method: 'VerifyFormula',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data.result)
        })
      })
    }
  }
}