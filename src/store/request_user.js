import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    requestUsers:[],
    total:0,
    query: {},
    requestUsersNameList:[],
    requestUsersStatusList:[],


  },
  getters: {
    // ...
    RequestUsersNameList:state => {
      state.requestUsersNameList.unshift({id:0,name:'Все'})
      return state.requestUsersNameList

    },
      RequestUsersStatusList:state => {
      state.requestUsersStatusList.unshift({id:0,name:'Все'})
      return state.requestUsersStatusList

    },

    RequestUsersArr: state => {
      return state.requestUsers
    },
    TotalRequestUsers: state => {
      return state.total
    },

    QueryRequestUsers: state => {
      return state.query
    }

  },
  mutations: {

    setRequestUsers (state, payload) {
      state.requestUsers = payload

    },
      setRequestUsersNameList(state, payload) {
      state.requestUsersNameList = payload

    },
      setRequestUsersStatusList(state, payload) {
      state.requestUsersStatusList = payload

    },
    setQueryRequestUsers (state, payload) {
      state.query = payload

    },
    setTotalRequestUsers (state, payload) {
      state.total = payload

    }

  },
  actions: {
      getRequestUsersNameList ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('requestUser.index'), {
          params: {
            method: 'getRequestUsersNameList',
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setRequestUsersNameList', response.data.data)
          }
        })
      })
    },
      getRequestUsersStatusList ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('requestUser.index'), {
          params: {
            method: 'getRequestUsersStatusList',
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setRequestUsersStatusList', response.data.data)
          }
        })
      })
    },

    getDataRequestUsers ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        console.log(requestObject)
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryRequestUsers', requestObject)
        } else {
          param = getters.QueryUsers
        }
        console.log(param)
        axios.get(r('requestUser.index'), {
          params: {
            method: 'getRequestUsers',
            param: param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setRequestUsers', response.data.data)
            commit('setTotalRequestUsers', response.data.total)
          }


        })

      })
    },
    deleteRequestUser ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('requestUser.update'), {
          params: {
            method: 'deleteRequestUser',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataRequestUsers')
          }
          resolve(response.data.result)


        })

      })
    }

  }


}

