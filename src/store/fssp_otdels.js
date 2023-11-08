import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)
function randomString (i) {
  let rnd = ''
  while (rnd.length < i) rnd += Math.random().toString(36).substring(2)
  return rnd.substring(0, i)
}

export default {
  state: {
    fssp_otdels:[],
    total:0,
    query: {},
    fsspOtdelsAll:[],
    totalFsspOtdelsAll:0,
    fsspOtdelsListArr:[],
      fsspSListArr:[]
  },
  getters: {
    FsspSListArr: state => {
        return state.fsspSListArr
    },
    FsspOtdelsListArr: state => {
      return state.fsspOtdelsListArr
    },
    FsspOtdelsArr: state => {
      return state.fssp_otdels
    },
    FsspOtdelsAll: state => {
      return state.fsspOtdelsAll
    },
    TotalFsspOtdels: state => {
      return state.total
    },
    TotalFsspOtdelsAll: state => {
      return state.totalFsspOtdelsAll
    },
    QueryFsspOtdels: state => {
      return state.query
    }
  },
  mutations: {

    setFsspOtdelsListArr (state, payload) {
      state.fsspOtdelsListArr.length = 0
      state.fsspOtdelsListArr = payload
    },
    setFsspOtdels (state, payload) {
      state.fssp_otdels = payload
    },
    setFsspOtdelsAll (state, payload) {
      state.fsspOtdelsAll = payload
    },
    setFsspSListArr  (state, payload) {
        state.fsspSListArr = payload
    },
    setQueryFsspOtdels (state, payload) {
      state.query = payload
    },
    setTotalFsspOtdels (state, payload) {
      state.total = payload
    },
    setTotalFsspOtdelsAll (state, payload) {
      state.totalFsspOtdelsAll = payload
    }
  },
  actions: {
    getFsspSListArr({state, getters, commit, dispatch}, requestObject) {
        return new Promise((resolve, reject) => {
            axios.get(r('fssp.index'), {
                params: {
                    method: 'getFsspSListArr',
                    param: requestObject
                }
            }).then((response) => {
                if (response.data.result) {
                    commit('setFsspSListArr', response.data.data)
                }
                resolve(response.data)
            })
        })
    },
    getFsspOtdelsListArr ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspOtdelsListArr',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspOtdelsListArr', response.data.data)
          }
        })
      })
    },

    getDataFsspOtdels ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryFsspOtdels', requestObject)
        } else {
          param = getters.QueryUsers
        }
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspOtdels',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspOtdels', response.data.data)
            commit('setTotalFsspOtdels', response.data.total)
          }
        })
      })
    },
    deleteFsspOtdel ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'deleteFsspOtdel',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataFsspOtdels')
          }
          resolve(response.data.result)
        })
      })
    },
    saveFsspOtdel ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'saveFsspOtdel',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataFsspOtdels')
          }
          resolve(response.data.result)
        })
      })
    },
    getDataFsspOtdelsAll ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const str = randomString(20)
        state.find = str
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspOtdelsAll',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            if (str === state.find) {
              commit('setFsspOtdelsAll', response.data.data)
              commit('setTotalFsspOtdelsAll', response.data.total)
            }
          }
        })

      })
    }
  }
}

