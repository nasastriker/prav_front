import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    ifnss:[],
    total:0,
    ifnssWeek:[],
    totalWeek:0,
    query: {},
    ifns_list: [],
    ifnsSelect:[]


  },
  getters: {
    // ...
    IfnsSelect: state => {
      return state.ifnsSelect
    },
    IfnssArrWeek: state => {
      return state.ifnssWeek
    },
    TotalIfnssWeek: state => {
      return state.totalWeek
    },
    IfnssArr: state => {
      return state.ifnss
    },
    TotalIfnss: state => {
      return state.total
    },

    QueryIfnss: state => {
      return state.query
    },
    IfnsList: state => {
      return state.ifns_list
    }

  },
  mutations: {
    setIfnsSelect (state, payload) {
      state.ifnsSelect = payload

    },


    setIfnssWeek (state, payload) {
      state.ifnssWeek = payload

    },


    setTotalIfnssWeek (state, payload) {
      state.totalWeek = payload

    },
    setIfnss (state, payload) {
      state.ifnss = payload

    },
    setQueryIfnss (state, payload) {
      state.query = payload

    },
    setTotalIfnss (state, payload) {
      state.total = payload

    },
    setIfnsList (state, payload) {
      state.ifns_list = payload
    }

  },
  actions: {

    getIfnsSelect ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('ifns.index'), {
          params: {
            method: 'getIfnsSelect',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setIfnsSelect', response.data.data)
          }
        })
      })
    },

    getDataIfnssWeek ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryIfnss', requestObject)
        } else {
          param = getters.QueryUsers
        }

        axios.get(r('ifns.index'), {
          params: {
            method: 'getIfnssWeek',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setIfnssWeek', response.data.data)
            commit('setTotalIfnssWeek', response.data.total)
          }


        })

      })
    },
    getDataIfnss ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryIfnss', requestObject)
        } else {
          param = getters.QueryUsers
        }

        axios.get(r('ifns.index'), {
          params: {
            method: 'getIfnss',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setIfnss', response.data.data)
            commit('setTotalIfnss', response.data.total)
          }


        })

      })
    },
    deleteIfns ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('ifns.update'), {
          params: {
            method: 'deleteIfns',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataIfnss')
          }
          resolve(response.data.result)


        })

      })
    },
    saveIfns ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('ifns.update'), {
          params: {
            method: 'saveIfns',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataIfnss')
          }
          resolve(response.data.result)


        })

      })
    },
    getIfnsList ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('ifns.index'), {
          params: {
            method: 'getIfnsList',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setIfnsList', response.data.ifns_list)
          }
          resolve(response.data)
        })
      })
    }
  }


}

