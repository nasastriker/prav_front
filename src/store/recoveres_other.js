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
    recoverersOther: [],
    recoveresOtherOrgn:[],
    recoverOtherDocuments:[],
    total: 0,
    query: {
      offset: 0,
      limit: 10
    }


  },
  getters: {
    // ...
    RecoverOtherDocuments:state => {
      return state.recoverOtherDocuments
    },
    RecoveresOtherOrgn: state => {
      return state.recoveresOtherOrgn
    },
    RecoverersOtherArr: state => {
      return state.recoverersOther
    },
    TotalRecoverersOther: state => {
      return state.total
    },

    QueryRecoverersOther: state => {
      return state.query
    }

  },
  mutations: {
    setRecoveresOtherOrgn (state, payload) {
      state.recoveresOtherOrgn = payload

    },
    setRecoverOtherDocuments (state, payload) {
      state.recoverOtherDocuments = payload

    },
    setRecoverersOther (state, payload) {
      state.recoverersOther = payload

    },
    setQueryRecoverersOther (state, payload) {
      state.query = payload

    },
    setTotalRecoverersOther (state, payload) {
      state.total = payload

    }

  },
  actions: {


    getRecoverOtherDocuments ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('recoverersOther.index'), {
          params: {
            method: 'getRecoverOtherDocuments',
            param: requestObject
          }
        }).then((res) => {
          if (res.data.result) {
            commit('setRecoverOtherDocuments', res.data.data)
          } else commit('setRecoverOtherDocuments', [])
        })
      })
    },

    getDataRecoverersOtherOnce ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('recoverersOther.index'), {
          params: {
            method: 'getRecoverersOtherOnce',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            resolve(response.data)

          }
        })
      })
    },
    getDataRecoverersOther ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('recoverersOther.index'), {
          params: {
            method: 'getRecoverersOther',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setRecoverersOther', response.data.data)
            commit('setTotalRecoverersOther', response.data.total)
            resolve(response.data)

          }


        })

      })
    },
      deleteRecoverOther({state, getters, commit, dispatch}, requestObject) {
          return new Promise((resolve, reject) => {
              axios.post(r('recoverersOther.update'), {
                  params: {
                      method: 'deleteRecoverOther',
                      param: requestObject
                  }
              }).then((response) => {
                  if (response.data.result) {
                  }
                  resolve(response.data.result)


              })

          })
      },

      deleteRecoverOtherDocument ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('recoverersOther.update'), {
          params: {
            method: 'deleteRecoverOtherDocument',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
          }
          resolve(response.data.result)


        })

      })
    },
    saveRecoverersOther ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('recoverersOther.update'), {
          params: {
            method: 'saveRecoverersOther',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataRecoverersOther')
          }
          resolve(response.data)


        })

      })
    }
  }


}

