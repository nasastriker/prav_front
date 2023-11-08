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
    totalDevelopmentnArr:0,
    developmentArr:[],
    typeDevelopmentList:[],
    priorDevelopmentList:[],
    statusDevelopmentList:[],
    developmentBanner:{},
    developmentMsgBanner:{},
    developmentFindFlag:false
  },
  getters: {
    // ...
    PriorDevelopmentList: state => {
      return state.priorDevelopmentList
    },
    DevelopmentFindFlag: state => {
      return state.developmentFindFlag
    },
    TotalDevelopmentnArr: state => {
      return state.totalDevelopmentnArr
    },
    DevelopmentBanner: state => {
      if (typeof state.developmentBanner === 'undefined') return {show_banner:false, count:0}
      return state.developmentBanner
    },
    DevelopmentMsgBanner: state => {
      if (typeof state.developmentMsgBanner === 'undefined') return {show_banner:false, countMsg:0, countStatus:0}
      return state.developmentMsgBanner
    },
    DevelopmentArr:state => {
      return state.developmentArr
    },
    TypeDevelopmentList:  state => {
      return state.typeDevelopmentList
    },
    TypeDevelopmentArr:  state => {

      const arr = [{id:-1, name:'Все'}]
      for (let i = 0; i<state.typeDevelopmentList.length; i++)arr.push(state.typeDevelopmentList[i])

      return arr
    },
    StatusDevelopmentList:  state => {
      return state.statusDevelopmentList
    },
    StatusDevelopmentArr:  state => {

      const arr = [{id:-1, name:'Все(кроме архива)'}]
      for (let i = 0; i<state.statusDevelopmentList.length; i++)arr.push(state.statusDevelopmentList[i])

      return arr
    }
  },
  mutations: {

    setPriorDevelopmentList (state, payload) {
      state.priorDevelopmentList = payload
    },
    setDevelopmentBanner (state, payload) {
      state.developmentBanner = payload
    },
    setDevelopmentMsgBanner (state, payload) {
      state.developmentMsgBanner = payload
    },
    setTypeDevelopmentList (state, payload) {
      state.typeDevelopmentList = payload
    },

    setStatusDevelopmentList (state, payload) {
      state.statusDevelopmentList = payload
    },

    setTotalDevelopmentnArr (state, payload) {
      state.totalDevelopmentnArr = payload
    },
    setDevelopmentArr (state, payload) {
      state.developmentArr = payload
    }

  },
  actions: {
    getDevelopmentBanner ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        axios.get(r('development.index'), {
          params: {
            method: 'getDevelopmentBanner',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setDevelopmentBanner', response.data.data)
          }
        })
      })
    },
    getDevelopmentMsgBanner ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        axios.get(r('development.index'), {
          params: {
            method: 'getDevelopmentMsgBanner',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setDevelopmentMsgBanner', response.data)
          }
        })
      })
    },

    getTypeDevelopmentList ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        axios.get(r('development.index'), {
          params: {
            method: 'getTypeDevelopmentList',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setTypeDevelopmentList', response.data.data)

          }


        })

      })
    },
    getStatusDevelopmentList ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        axios.get(r('development.index'), {
          params: {
            method: 'getStatusDevelopmentList',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setStatusDevelopmentList', response.data.data)

          }


        })

      })
    },

    saveDevelopmentTast ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        axios.post(r('development.index'), {
          params: {
            method: 'saveDevelopmentTast',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data.result)


        })

      })
    },
    getDevelopmentArr ({state, getters, commit, dispatch}, requestObject) {
      state.developmentFindFlag = true
      return new Promise((resolve, reject) => {
        const str = randomString(20)
        state.find = str

        axios.get(r('development.index'), {
          params: {
            method: 'getDevelopmentArr',
            param: requestObject
          }
        }).then((response) => {
          state.developmentFindFlag = false
          if (response.data.result) {
            if (str == state.find) {
              commit('setDevelopmentArr', response.data.data)
              commit('setTotalDevelopmentnArr', response.data.total)
            }
            resolve(response.data)
          }


        })

      })
    },
    getPriorDevelopmentList ({state, getters, commit, dispatch}, requestObject) {
      commit('setPriorDevelopmentList', [])
      return new Promise((resolve, reject) => {

        axios.get(r('development.index'), {
          params: {
            method: 'getPriorDevelopmentList',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setPriorDevelopmentList', response.data.data)

          }


        })

      })
    },

  }


}

