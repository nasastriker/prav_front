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
    judicialAreas:[],
    total:0,
    query: {},
    find:'',
    judicialAreasForSug:[]


  },
  getters: {
    // ...
    JudicialsAreaArr: state => {
      return state.judicialAreas
    },
    TotalJudicialsArea: state => {
      return state.total
    },
    JudicialAreasForSug: state => {
      return state.judicialAreasForSug
    }

  },
  mutations: {
    setJudicialAreasForSug (state, payload) {
      state.judicialAreasForSug = payload

    },

    setJudicialAreas (state, payload) {
      state.judicialAreas = payload

    },

    setTotalJudicialAreas (state, payload) {
      state.total = payload

    }

  },
  actions: {
      getDataJudicialAreasForSug ({state, getters, commit, dispatch}, requestObject) {
          return new Promise((resolve, reject) => {
              axios.get(r('judicial.index'), {
                  params: {
                      method: 'getJudicialAreasForSug',
                      param: requestObject
                  }
              }).then((response) => {
                  if (response.data.result) {
                          commit('setJudicialAreasForSug', response.data.data)
                  }
              })
          })
      },

    getDataJudicialAreas ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const str = randomString(20)
        state.find = str

        axios.get(r('judicialArea.index'), {
          params: {
            method: 'getDataJudicialAreas',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            if (str == state.find) {
              commit('setJudicialAreas', response.data.data)
              commit('setTotalJudicialAreas', response.data.total)
            }
          }
        })
      })
    },

    deleteJudicialArea ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('judicialArea.update'), {
          params: {
            method: 'deleteJudicialArea',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataJudicialAreas')
          }
          resolve(response.data.result)


        })

      })
    },
    saveJudicialArea ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('judicialArea.update'), {
          params: {
            method: 'saveJudicialArea',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataJudicialAreas')
          }
          resolve(response.data.result)


        })

      })
    }
  }


}

