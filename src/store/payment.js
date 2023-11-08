import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    paymentsType:[],
    totalPaymentsType:0,
    payments:[],
    taskPayment:[],
    total:0,
    total_sum:0,
    totalPaymentArr:0,
    query: {},
    paymentsVidArr:[]


  },
  getters: {
    TaskPaymentArr: state => {
      return state.taskPayment
    },
    TotalPaymentArr: state => {
      return state.totalPaymentArr
    },
    // ...
    PaymentsVidArr: state => {
      return state.paymentsVidArr
    },
    PaymentTypeListArr:state => {
      let arr = [{id:0, name:'Все'}]
      arr = arr.concat(state.paymentsType)
      return arr
    },
    TotalPaymentsType: state => {
      return state.totalPaymentsType
    },
    PaymentsTypeArr: state => {
      return state.paymentsType
    },
    PaymentsArr: state => {
      return state.payments
    },
    TotalPayments: state => {
      return state.total
    },

    QueryPayments: state => {
      return state.query
    },
    TotalSum: state => {
      return state.total_sum
    }

  },
  mutations: {
    setPaymentsVidArr (state, payload) {
      state.paymentsVidArr = payload
    },
    setPaymentsType (state, payload) {
      state.paymentsType = payload
    },
    setTotalPaymentsType (state, payload) {
      state.totalPaymentsType = payload


    },
    setPayments (state, payload) {
      state.payments = payload

    },
    setQueryPayments (state, payload) {
      state.query = payload

    },
    setTaskPayments (state, payload) {
      state.taskPayment = payload

    },
    setTotalPayments (state, payload) {
      state.total = payload

    },
    setTotalPaymentArr (state, payload) {
      state.totalPaymentArr = payload

    },
    setTotalSum (state, payload) {
      state.total_sum = payload

    }

  },
  actions: {
    getTaskPayments: function ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setTaskPayments', [])
        commit('setTotalPaymentArr', 0)
        let param = null
        if (typeof requestObject !== 'undefined') {
          param = requestObject
        }
        axios.get(r('payment.index'), {
          params: {
            method: 'getTaskPayments',
            param: param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setTaskPayments', response.data.data)
            commit('setTotalPaymentArr', response.data.total)
          }


        })

      })
    },
    getPaymentsVidArr ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('payment.index'), {
          params: {
            method: 'getPaymentsVidArr',
            param: ''
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setPaymentsVidArr', response.data.data)
          }
        })
      })
    },
    getPaymentsType ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {


        axios.get(r('payment.index'), {
          params: {
            method: 'getPaymentsType',
            param: ''
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setPaymentsType', response.data.data)
            commit('setTotalPaymentsType', response.data.total)

          }


        })

      })
    },

    getDataPayments ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryPayments', requestObject)
        } else {
          param = getters.QueryPayments
        }
        axios.get(r('payment.index'), {
          params: {
            method: 'getPayments',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setPayments', response.data.data)
            commit('setTotalPayments', response.data.total)
            commit('setTotalSum', response.data.total_sum)
          }


        })

      })
    },
    deletePaymnetType ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        axios.post(r('payment.update'), {
          params: {
            method: 'deletePaymentType',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getPaymentsType')
          }

          resolve(response.data.result)


        })

      })
    },
    delPayment ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        axios.post(r('payment.update'), {
          params: {
            method: 'deletePayment',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataPayments')
          }

          resolve(response.data.result)


        })

      })
    },

    setPayment ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        axios.post(r('payment.update'), {
          params: {
            method: 'setPayment',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataPayments')
          }

          resolve(response.data.result)


        })

      })
    },
    getInfoPayment ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('payment.index'), {
          params: {
            method: 'getInfoPayment',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    }
  }


}

