import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    fsspOtdelsAddressArr:[],
    edit:0,
    total:0,
    showTab:false,
    query: {
      offset:0,
      limit:10
    }


  },
  getters: {
    // ...
    EditFsspAddress: state => {
      return state.edit
    },
    FsspOtdelsAddressArr: state => {
      return state.fsspOtdelsAddressArr
    },
    TotalFsspOtdelsAddressArr: state => {
      return state.total
    },

    QueryFsspOtdelsAddress: state => {
      return state.query
    },
    ShowTabFsspAddress: state => {
      return state.showTab
    }


  },
  mutations: {
    setShowTabFsspAddress (state, payload) {
      state.showTab = payload

    },
    setEditFsspAddress (state, payload) {
      state.edit = payload

    },
    setFsspOtdelsAddressArr (state, payload) {
      state.fsspOtdelsAddressArr = payload

    },
 /*
    setQueryFsspOtdelsAddress (state, payload) {
      state.query = payload

    },
    setQueryFsspOtdelsAddressLimit (state, payload) {
      state.query.limit = payload

    },
    setQueryFsspOtdelsAddressOffset (state, payload) {
      state.query.offset = payload * state.query.limit

    },
    */
    setTotalFsspOtdelsAddress (state, payload) {
      state.total = payload

    }

  },
  actions: {


    getDataFsspOtdelsAddressArr ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fsspOtdelsAddress.index'), {
          params: {
            method: 'getFsspOtdelsAddressArr',
            param: requestObject
          }
        }).then((response) => {
          //     console.log(response.data)
          commit('setFsspOtdelsAddressArr', response.data.data)
          commit('setTotalFsspOtdelsAddress', response.data.total)


        })

      })
    },
    deleteFsspOtdelsAddress ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fsspOtdelsAddress.update'), {
          params: {
            method: 'deleteFsspOtdelsAddress',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataFsspOtdelsAddress')
          }
          resolve(response.data.result)


        })

      })
    },
    saveFsspOtdelsAddress ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fsspOtdelsAddress.update'), {
          params: {
            method: 'saveFsspOtdelsAddress',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            //    dispatch('getDataFsspOtdelsAddress');
          }
          resolve(response.data.result)


        })

      })
    },
    getDataFsspOtdelsAddress ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fsspOtdelsAddress.index'), {
          params: {
            method: 'getFsspOtdelsAddress',
            param: requestObject
          }
        }).then((response) => {
         resolve(response.data)
        })

      })
    },
    changeCheckToDelFssp ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fsspOtdelsAddress.update'), {
          params: {
            method: 'changeCheckToDel',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data.result)
        })

      })
    }
  }


}

