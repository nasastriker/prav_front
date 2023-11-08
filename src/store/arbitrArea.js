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
    arbitrAreas:[],
    total:0,
    query: {},
    find:'',
    arbitrAreasForSug:[],
    arbitrRegionsArr:[]


  },
  getters: {
    // ...
    ArbitrRegionsArr:state => {
      return state.arbitrRegionsArr
    },

    ArbitrsAreaArr: state => {
      return state.arbitrAreas
    },
    TotalArbitrsArea: state => {
      return state.total
    },
    ArbitrAreasForSug: state => {
      return state.arbitrAreasForSug
    }

  },
  mutations: {
    setArbitrAreasForSug (state, payload) {
      state.arbitrAreasForSug = payload

    },
    setArbitrRegionsArr (state, payload) {
      state.arbitrRegionsArr = payload

    },

    setArbitrAreas (state, payload) {
      state.arbitrAreas = payload

    },

    setTotalArbitrAreas (state, payload) {
      state.total = payload

    }

  },
  actions: {

    getArbitrRegionsArr ({state, getters, commit, dispatch}) {
      return new Promise((resolve, reject) => {
        axios.get(r('arbitrArea.index'), {
          params: {
            method: 'getArbitrRegionsArr'
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setArbitrRegionsArr', response.data.data)
          }
        })
      })
    },

    getDataArbitrAreasForSug ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('arbitrArea.index'), {
          params: {
            method: 'getArbitrAreasForSug',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setArbitrAreasForSug', response.data.data)
          }
        })
      })
    },

    getDataArbitrAreas ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const str = randomString(20)
        state.find = str

        axios.get(r('arbitrArea.index'), {
          params: {
            method: 'getDataArbitrAreas',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            if (str == state.find) {
              commit('setArbitrAreas', response.data.data)
              commit('setTotalArbitrAreas', response.data.total)
            }
          }
        })
      })
    },

    deleteArbitrArea ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('arbitrArea.update'), {
          params: {
            method: 'deleteArbitrArea',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataArbitrAreas')
          }
          resolve(response.data.result)


        })

      })
    },
    saveArbitrArea ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('arbitrArea.update'), {
          params: {
            method: 'saveArbitrArea',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataArbitrAreas')
          }
          resolve(response.data.result)


        })

      })
    }
  }


}

