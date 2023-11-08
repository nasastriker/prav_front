import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    data:[],
    total:0,
    query: {},
    bank_list_return_sa_loading_flag: false,
    archBankReturnSasList:[]


  },
  getters: {
    // ...
    ArchBankReturnSasList: state => {
      return [{id:0, name:'Все'}].concat(state.archBankReturnSasList)
    },
    ArchBankReturnSasArr: state => {
      return state.data
    },
    TotalArchBankReturnSas: state => {
      return state.total
    },

    QueryArchBankReturnSas: state => {
      return state.query
    },
    BankListReturnSaLoadingFlag: state => {
      return state.bank_list_return_sa_loading_flag
    }

  },
  mutations: {
    setArchBankReturnSas (state, payload) {
      state.data = payload

    },
    setQueryArchBankReturnSas (state, payload) {
      state.query = payload

    },
    setTotalArchBankReturnSas (state, payload) {
      state.total = payload

    },
    setArchBankReturnSasList (state, payload) {
      state.archBankReturnSasList = payload
    }

  },
  actions: {

    getArchBankReturnSasList ({state, getters, commit, dispatch}, requestObject) {
      commit('setArchBankReturnSasList', [])
      return new Promise((resolve, reject) => {

        axios.get(r('archBankReturnSa.index'), {
          params: {
            method: 'getArchBankReturnSasList',
            param: null
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setArchBankReturnSasList', response.data.data)
          }
        })
      })
    },

    getDataArchBankReturnSas ({state, getters, commit, dispatch}, requestObject) {
      state.bank_list_return_sa_loading_flag = true
      commit('setArchBankReturnSas', [])
      commit('setTotalArchBankReturnSas', 0)
      return new Promise((resolve, reject) => {
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryArchBankReturnSas', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('archBankReturnSa.index'), {
          params: {
            method: 'getArchBankReturnSas',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setArchBankReturnSas', response.data.data)
            commit('setTotalArchBankReturnSas', response.data.total)
          } else {
            commit('setArchBankReturnSas', [])
            commit('setTotalArchBankReturnSas', 0)
          }
          state.bank_list_return_sa_loading_flag = false


        })

      })
    }

  }


}

