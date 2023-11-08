import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    idPopupTransition:0,
    reportSheds:[],
    total:0,
    serverDate:'',
    query: {}


  },
  getters: {
    // ...
    idPopupTransition: state => {
      return state.idPopupTransition
    },
    ReportShedArr: state => {
      return state.reportSheds
    },
    TotalReportShed: state => {
      return state.total
    },
    ServerDateShedule: state => {
      return state.serverDate
    },
    QueryReportShed: state => {
      return state.query
    }

  },
  mutations: {


    setIdPopupTransition (state, id) {
      state.idPopupTransition = id
    },
    setReportShed (state, payload) {
      state.reportSheds = payload

    },
    setQueryReportShed (state, payload) {
      state.query = payload

    },
    setTotalReportShed (state, payload) {
      state.total = payload

    },
    setServerDate (state, payload) {
      state.serverDate = payload

    }


  },
  actions: {


    deleteReportShed ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('reportShed.update'), {
          params: {
            method: 'deleteReportShedD',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data.result)
        })
      })
    },

    SetIdPopupTransition ({state, getters, commit, dispatch}, id) {
      return new Promise((resolve, reject) => {
        commit('setIdPopupTransition', id)
      })
    },
    getReportSheds ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {


        let param

        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryReportShed', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('reportShed.index'), {
          params: {
            method: 'getReportSheds',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setReportShed', response.data.data)
            commit('setTotalReportShed', response.data.total)
            commit('setServerDate', response.data.ServerDate)

          }


        })

      })
    }


  }


}

