import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    ServerDate:0,
    data:[],
    total:0,
    query: {},
    activeTab:0,


  },
  getters: {
    // ...
    FuncSheduleArr: state => {
      return state.data
    },
    TotalFuncShedule : state => {
      return state.total
    },
    ServerDate : state => {
      return state.ServerDate
    },
    QueryFuncShedule: state => {
      return state.query
    }

  },
  mutations: {
    setFuncShedule (state, payload) {
      state.data = payload

    },
    setQueryFuncShedule (state, payload) {
      state.query = payload

    },
    setTotalFuncShedule (state, payload) {
      state.total = payload

    },
    setServerDate (state, payload) {
      state.ServerDate = payload

    }


  },
  actions: {
    startFuncRunFromSheduler ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('funcshedule.update'), {
          params: {
            method: 'startFuncRun',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },

    getfuncshedule ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {


        axios.get(r('funcshedule.index'), {
          params: {
            method: 'getFuncSheduleAll',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {

            commit('setFuncShedule', response.data.data)
            commit('setServerDate', response.data.ServerDate)
            commit('setTotalFuncShedule', response.data.total)


          }


        })

      })
    },
    saveFuncShedule ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('funcshedule.update'), {
          params: {
            method: 'saveFuncShedule',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data.result)
        })
      })
    },
    deleteFuncShedule ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('funcshedule.update'), {
          params: {
            method: 'DeleteFuncShedule',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data.result)
        })
      })
    },
    saveStatusSheduler ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('funcshedule.update'), {
          params: {
            method: 'saveStatusSheduler',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data.result)
        })
      })
    }

  }


}

