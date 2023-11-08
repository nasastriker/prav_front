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
    dataAddressExceptionArr:[],
    total:0,
    query: {
      offset:0,
      limit:10
    }


  },
  getters: {
    // ...

    AddressExceptionArr: state => {
      return state.dataAddressExceptionArr
    },
    TotalAddressExceptionArr: state => {
      return state.total
    },

    QueryAddressExceptionArr: state => {
      return state.query
    }

  },
  mutations: {

    setAddressExceptionArr (state, payload) {
      state.dataAddressExceptionArr = payload

    },
    setQueryAddressExceptionArr (state, payload) {
      state.query = payload

    },
    setTotalAddressExceptionArr (state, payload) {
      state.total = payload

    }

  },
  actions: {
    getDataAddressExceptionArr ({state, getters, commit, dispatch}, requestObject=null) {
      return new Promise((resolve, reject) => {
        const str = randomString(20)
        state.find = str

        axios.get(r('addressException.index'), {
          params: {
            method: 'getAddressExceptionArr',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            if (str === state.find) {
              commit('setAddressExceptionArr', response.data.data)
              commit('setTotalAddressExceptionArr', response.data.total)
            }

          }


        })

      })
    },
    deleteAddressException ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('addressException.update'), {
          params: {
            method: 'deleteAddressException',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataAddressExceptionArr')
          }
          resolve(response.data.result)


        })

      })
    },
    saveAddressExceptionArr ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('addressException.update'), {
          params: {
            method: 'saveAddressExceptionArr',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataAddressExceptionArr')
          }
          resolve(response.data.result)


        })

      })
    }
  }


}

