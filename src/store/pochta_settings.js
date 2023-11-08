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
    pochtaSettings:[],
    pochtaSettingsLimit:[],
    pochtaSettingsList:[],
    total:0,
    query: {
      offset:0,
      limit:10
    }


  },
  getters: {
    PochtaSettingsList: state => {
      return state.pochtaSettingsList
    },
    PochtaSettingsLimit: state => {
      return state.pochtaSettingsLimit
    },
    PochtaSettingsArr: state => {
      return state.pochtaSettings
    },
    TotalPochtaSettingsArr: state => {
      return state.total
    },

    QueryPochtaSettingsArr: state => {
      return state.query
    }

  },
  mutations: {

    setPochtaSettingsList(state, payload) {
        state.pochtaSettingsList = payload

    },
    setPochtaSettingsLimit(state, payload) {
      state.pochtaSettingsLimit = payload

    },
    setPochtaSettingsArr (state, payload) {
      state.pochtaSettings = payload

    },
    setQueryPochtaSettingsArr (state, payload) {
      state.query = payload

    },
    setTotalPochtaSettingsArr (state, payload) {
      state.total = payload

    }

  },
  actions: {
    getPochtaLimit({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('pochtaSettings.index'), {
          params: {
            method: 'getLimit',
            param: requestObject
          }
        }).then((response) => {
          if(response.data.result)commit('setPochtaSettingsLimit',response.data.data)
        })
      })
    },
    getDataPochtaSettingsList({state, getters, commit, dispatch}, requestObject) {
        return new Promise((resolve, reject) => {
            axios.get(r('pochtaSettings.index'), {
                params: {
                    method: 'getPochtaSettingsList',
                    param: requestObject
                }
            }).then((response) => {
              if(response.data.result)commit('setPochtaSettingsList',response.data.data)
            })
        })
    },
    getDataPochtaSettingsOnce ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('pochtaSettings.index'), {
          params: {
            method: 'getPochtaSettingsOnce',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    getDataPochtaSettingsArr ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const str = randomString(20)
        state.find = str

        axios.get(r('pochtaSettings.index'), {
          params: {
            method: 'getPochtaSettingsArr',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            if (str == state.find) {
              commit('setPochtaSettingsArr', response.data.data)
              commit('setTotalPochtaSettingsArr', response.data.total)
            }

          }


        })

      })
    },
    deletePochtaSettings ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('pochtaSettings.update'), {
          params: {
            method: 'deletePochtaSettings',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataPochtaSettingsArr')
          }
          resolve(response.data.result)


        })

      })
    },
    savePochtaSettings ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('pochtaSettings.update'), {
          params: {
            method: 'savePochtaSettings',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataPochtaSettingsArr')
          }
          resolve(response.data)


        })

      })
    }
  }


}

