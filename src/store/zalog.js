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
    zalogCarDebtorArr:[],
    zalogRealEstateDebtorArr:[],
    totalzalogCarDebtor:0,
    query: {
      offset:0,
      limit:10
    }


  },
  getters: {
    // ...

    ZalogCarDebtorArr: state => {
      return state.zalogCarDebtorArr
    },
    // TotalZalogCarDebtor: state => {
    //   return state.totalzalogCarDebtor
    // },
    ZalogRealEstateDebtorArr: state => {
      return state.zalogRealEstateDebtorArr
    }
    // TotalZalogRealEstateDebtor: state => {
    //   return state.totalzalogCarDebtor
    // },
    // QueryZalogCarDebtorArr: state => {
    //   return state.query
    // }

  },
  mutations: {

    setZalogCarDebtorArr (state, payload) {
      state.zalogCarDebtorArr = payload

    },
    setTotalZalogCarDebtor (state, payload) {
      state.total = payload

    },
    setZalogRealEstateDebtorArr (state, payload) {
      state.zalogRealEstateDebtorArr = payload

    },
    setTotalZalogRealEstateDebtor (state, payload) {
      state.total = payload

    },
    setQueryZalogCarDebtorArr (state, payload) {
      state.query = payload

    }
  },
  actions: {
    getDataZalogDebtorArr ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const str = randomString(20)
        state.find = str
        commit('setZalogCarDebtorArr', [])
        commit('setZalogRealEstateDebtorArr', [])
        axios.get(r('zalog.index'), {
          params: {
            method: 'getZalogDebtorArr',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            if (str == state.find) {
              commit('setZalogCarDebtorArr', response.data.car)
              commit('setZalogRealEstateDebtorArr', response.data.realestate)
            }

          }


        })

      })
    },
    deleteDebtor ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('zalogCarDebtorArr.update'), {
          params: {
            method: 'deleteZalogCarDebtorArr',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataZalogCarDebtorArr')
          }
          resolve(response.data.result)


        })

      })
    },
    saveZalogCarDebtorArr ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('zalogCarDebtorArr.update'), {
          params: {
            method: 'saveZalogCarDebtorArr',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataZalogCarDebtorArr')
          }
          resolve(response.data.result)


        })

      })
    }
  }


}

