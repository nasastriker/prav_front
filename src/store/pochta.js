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
    pochtaArr:[],
    total:0,
    query: {},
    find:'',


  },
  getters: {


    PochtasArr: state => {
      return state.pochtaArr
    },
    TotalPochta: state => {
      return state.total
    },


  },
  mutations: {


    setPochtaArr (state, payload) {
      state.pochtaArr = payload

    },

    setTotalPochtaArr (state, payload) {
      state.total = payload

    }

  },
  actions: {


    getDataPochtaArr ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const str = randomString(20)
        state.find = str
        commit('setPochtaArr', [])
        commit('setTotalPochtaArr', 0)
        axios.get(r('pochta.index'), {
          params: {
            method: 'getDataPochtas',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            if (str == state.find) {
              commit('setPochtaArr', response.data.data)
              commit('setTotalPochtaArr', response.data.total)
            }
          }
        })
      })
    },


  }


}

