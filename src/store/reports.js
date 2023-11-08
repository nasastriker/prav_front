import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    DataShedule:[],
    reports:[],
    reportsTask:[],
    total:0,
    totalTask:0,
    query: {
      offset:0,
      limit:10
    }


  },
  getters: {
    // ...
    DataShedule: state => {
      return state.DataShedule
    },
    ReportsTaskArr: state => {
      return state.reportsTask
    },
    TotalReportsTask: state => {
      return state.totalTask
    },
    ReportsArr: state => {
      return state.reports
    },
    TotalReports: state => {
      return state.total
    },

    QueryReports: state => {
      return state.query
    }

  },
  mutations: {
    setReportsTask (state, payload) {
      state.reportsTask = payload

    },
    DataShedule (state, payload) {
      state.DataShedule = payload

    },
    setTotalReportsTask (state, payload) {
      state.totalTask = payload

    },
    setReports (state, payload) {
      state.reports = payload

    },
    setQueryReports (state, payload) {
      state.query = payload

    },
    setTotalReports (state, payload) {
      state.total = payload

    }

  },
  actions: {
    getDataReportsSendSa ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {


        axios.get(r('reports.index'), {
          params: {
            method: 'getReportsSendSa',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setReports', response.data.data)
            commit('setTotalReports', response.data.total)
          }


        })

      })
    },
    getReportTasks ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {


        axios.get(r('reports.index'), {
          params: {
            method: 'getReportTasks',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setReportsTask', response.data.data)
            commit('setTotalReportsTask', response.data.total)
          }


        })

      })
    },
    getDataReports ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {


        axios.post(r('reports.update'), {
          params: {
            method: 'getReports',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setReports', response.data.data)
            commit('setTotalReports', response.data.total)
          }


        })

      })
    },
    saveReportShedule ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('reports.update'), {
          params: {
            method: 'saveReportShedule',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data.result)
        })
      })
    }

  }


}

