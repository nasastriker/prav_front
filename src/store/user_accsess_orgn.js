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
    userAccsessOrgn:[],
    total:0,
    query: {
      offset:0,
      limit:10
    }


  },
  getters: {
    // ...

    UserAccsessOrgnArr: state => {
      return state.userAccsessOrgn
    },
    TotalUserAccsessOrgn: state => {
      return state.total
    },

    QueryUserAccsessOrgn: state => {
      return state.query
    }

  },
  mutations: {

    setUserAccsessOrgn (state, payload) {
      state.userAccsessOrgn = payload

    },
    setQueryUserAccsessOrgn (state, payload) {
      state.query = payload

    },
    setTotalUserAccsessOrgn (state, payload) {
      state.total = payload

    }

  },
  actions: {
    getDataUserAccsessOrgn ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const str = randomString(20)
        state.find = str
        commit('setUserAccsessOrgn', [])
        commit('setTotalUserAccsessOrgn', 0)
        axios.get(r('userAccsessOrgn.index'), {
          params: {
            method: 'getUserAccsessOrgn',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            if (str == state.find) {
              commit('setUserAccsessOrgn', response.data.data)
              commit('setTotalUserAccsessOrgn', response.data.total)
            }

          }


        })

      })
    },
    deleteUserAccsessOrgn ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('userAccsessOrgn.update'), {
          params: {
            method: 'deleteUserAccsessOrgn',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataUserAccsessOrgn')
          }
          resolve(response.data.result)


        })

      })
    },
    saveUserAccsessOrgn ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('userAccsessOrgn.update'), {
          params: {
            method: 'saveUserAccsessOrgn',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataUserAccsessOrgn')
          }
          resolve(response.data.result)


        })

      })
    }
  }


}

