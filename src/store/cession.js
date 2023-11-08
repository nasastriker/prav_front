import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {

    cessions:[],
    total:0,
    query: {},
      cessionFilterInCessionArr:[]


  },
  getters: {
    // ...

      CessionFilterInCessionArr:state => {
          return state.cessionFilterInCessionArr
      },
    CessionsArr: state => {
      return state.cessions
    },
    TotalCessions: state => {
      return state.total
    },

    QueryCessions: state => {
      return state.query
    }

  },
  mutations: {


    setCessions (state, payload) {
      state.cessions = payload

    },
    setQueryCessions (state, payload) {
      state.query = payload

    },
    setTotalCessions (state, payload) {
      state.total = payload

    },
      setCessionFilterInCessionArr (state, payload) {
          state.cessionFilterInCessionArr = []
          state.cessionFilterInCessionArr = payload

      },


  },
  actions: {

      getCessionFilterInCessionArr ({state, getters, commit, dispatch}, requestObject) {
          return new Promise((resolve, reject) => {

              axios.get(r('cession.index'), {
                  params: {
                      method: 'getCessionFilterInCessionArr'
                  }
              }).then((response) => {
                  if (response.data.result) {
                      commit('setCessionFilterInCessionArr', response.data.data)
                  }
              })

          })
      },
      getDataFilterInCession ({state, getters, commit, dispatch}, requestObject) {
          return new Promise((resolve, reject) => {

              axios.get(r('cession.index'), {
                  params: {
                      method: 'getCessionFilter',
                      param: requestObject
                  }
              }).then((response) => {
                  if (response.data.result) {
                      commit('setCessions', response.data.data)
                      commit('setTotalCessions', response.data.total)
                  }
              })
          })
      },


    getDataCessions ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryDocuments', requestObject)
        } else {
          param = getters.QueryUsers
        }
        axios.get(r('cession.index'), {
          params: {
            method: 'getCessions',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setCessions', response.data.data)
            commit('setTotalCessions', response.data.total)
          }


        })

      })
    },
    deleteCession ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        axios.post(r('cession.update'), {
          params: {
            method: 'deleteCession',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataCessions')
          }

          resolve(response.data.result)


        })

      })
    },
    cloneCession ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        axios.post(r('cession.update'), {
          params: {
            method: 'cloneCession',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataCessions')
          }

          resolve(response.data.result)


        })

      })
    },

    saveCession ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        axios.post(r('cession.update'), {
          params: {
            method: 'saveCession',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataCessions')
          }

          resolve(response.data.result)


        })

      })
    }
  }


}

