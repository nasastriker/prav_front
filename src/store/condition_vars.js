import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


// conditionVars имя Геттера маленикими буквами
// ConditionVars имя Геттера большими буквами
// taskConditions имя контроллера bbbb.index

export default {
  state: {
    conditionVarsArr: [],
    conditionListArr: [],
    conditionListVarsArr: [],
    total: 0,
    query:{}
  },
  getters: {
    ConditionVarsArr: state => {
      return state.conditionVarsArr
    },

    ConditionListArr: state => {
      return state.conditionListArr
    },
    ConditionListVarsArr: state => {
      return state.conditionListVarsArr
    },
    TotalConditionVars: state => {
      return state.total
    },
    QueryUsersConditionVars: state => {
      return state.query
    }
  },
  mutations: {
    setConditionVarsArr (state, payload) {
      state.conditionVarsArr = payload

    },

    setConditionListArr (state, payload) {
      state.conditionListArr = payload

    },
    setConditionListVarsArr (state, payload) {
      state.conditionListVarsArr = payload

    },
    setQueryConditionVars (state, payload) {
      state.query = payload

    },
    setTotalConditionVars (state, payload) {
      state.total = payload
    }
  },
  actions: {
    getDataConditionVars ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('taskConditions.index'), {
          params: {
            method: 'getConditionVarsArr',
            param:  requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setConditionVarsArr', response.data.data)
            // commit('setTotalConditionVars', response.data.total)
          }
        })
      })
    },

    getDataConditionList ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('taskConditions.index'), {
          params: {
            method: 'getConditionListArr',
            param:  requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setConditionListArr', response.data.data)
            // commit('setTotalConditionVars', response.data.total)
          }
        })
      })
    },
    getDataConditionListVars ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('taskConditions.index'), {
          params: {
            method: 'getConditionListVarsArr',
            param:  requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setConditionListVarsArr', response.data.data)
            resolve(response.data)
          }
        })
      })
    },
    getDataConditionVarOnce ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('taskConditions.index'), {
          params: {
            method: 'getConditionVarOnce',
            param:  requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    }
    /*saveConditionVars ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('taskConditions.update'), {
          params: {
            method: 'save',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataConditionVars')
          }
          resolve(response.data.result)
        })
      })
    },
    getConditionVarsOnce ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('taskConditions.index'), {
          params: {
            method: 'save',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    }*/
  }

}
