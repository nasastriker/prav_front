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
    userAccsessRecover:[],
    total:0,
    query: {
      offset:0,
      limit:10
    }


  },
  getters: {
    // ...

    UserAccsessRecoverArr: state => {
      return state.userAccsessRecover
    },
    TotalUserAccsessRecover: state => {
      return state.total
    },

    QueryUserAccsessRecover: state => {
      return state.query
    }

  },
  mutations: {

    setUserAccsessRecover (state, payload) {
      state.userAccsessRecover = payload

    },
    setQueryUserAccsessRecover (state, payload) {
      state.query = payload

    },
    setTotalUserAccsessRecover (state, payload) {
      state.total = payload

    }

  },
  actions: {
    getDataUserAccsessRecover ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const str = randomString(20)
        state.find = str
        commit('setUserAccsessRecover', [])
        commit('setTotalUserAccsessRecover', 0)
        axios.get(r('userAccsessRecover.index'), {
          params: {
            method: 'getUserAccsessRecover',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            if (str == state.find) {
              commit('setUserAccsessRecover', response.data.data)
              commit('setTotalUserAccsessRecover', response.data.total)
            }

          }


        })

      })
    },
    deleteUserAccsessRecover ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('userAccsessRecover.update'), {
          params: {
            method: 'deleteUserAccsessRecover',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataUserAccsessRecover')
          }
          resolve(response.data.result)


        })

      })
    },
    saveUserAccsessRecover ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('userAccsessRecover.update'), {
          params: {
            method: 'saveUserAccsessRecover',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataUserAccsessRecover')
          }
          resolve(response.data.result)


        })

      })
    }
  }


}

