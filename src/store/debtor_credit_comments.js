import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


// debtorCreditComments имя Геттера маленикими буквами
// DebtorCreditComments имя Геттера большими буквами
// debtorCreditComments имя контроллера bbbb.index

export default {
  state: {
    debtorCreditCommentsArr: [],
    total: 0,
    query:{}
  },
  getters: {
    DebtorCreditCommentsArr: state => {
      return state.debtorCreditCommentsArr
    },
    TotalDebtorCreditComments: state => {
      return state.total
    },
    QueryUsersDebtorCreditComments: state => {
      return state.query
    }
  },
  mutations: {
    setDebtorCreditCommentsArr (state, payload) {
      state.debtorCreditCommentsArr = payload

    },
    setQueryDebtorCreditComments (state, payload) {
      state.query = payload

    },
    setTotalDebtorCreditComments (state, payload) {
      state.total = payload
    }
  },
  actions: {
    getDataDebtorCreditComments ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryDebtorCreditComments', requestObject)
        } else {
          param = getters.QueryUsersDebtorCreditComments
        }
        axios.get(r('debtorCreditComments.index'), {
          params: {
            method: 'getDebtorCreditCommentsArr',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setDebtorCreditCommentsArr', response.data.data)
            commit('setTotalDebtorCreditComments', response.data.total)
          }
        })
      })
    },
    saveDebtorCreditComments ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('debtorCreditComments.update'), {
          params: {
            method: 'save',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataDebtorCreditComments')
          }
          resolve(response.data.result)
        })
      })
    },
    getDebtorCreditCommentsOnce ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('debtorCreditComments.index'), {
          params: {
            method: 'save',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    }
  }

}