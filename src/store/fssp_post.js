import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    fssp_cancel_info:0,
    fssp_prop:[],
    fssp_prop_loading_flag:false,
    fssp_other_ip:[],
    fssp_other_ip_loading_flag:false,
    fssp_other_ip_all:[],
    fssp_prop_accs:[],
    fssp_prop_nedvizh:[],
    fssp_prop_transp:[],
    fssp_prop_dohod:[],
    fssp_postan_claims:[],
    fssp_postan_doc_types:[],
    fssp_prop_load_error:false,
    isk_data: {
      result: false
    },
  },
  getters: {
    IskData: state => {
      return state.isk_data
    },
    FsspPostanPropertyLoadingFlag: state => {
      return state.fssp_prop_loading_flag
    },
    FsspPropertyArr: state => {
      return state.fssp_prop
    },
    FsspOtherIpArr: state => {
      return state.fssp_other_ip
    },
    FsspPropertyAccsArr: state => {
      return state.fssp_prop_accs
    },
    FsspPropertyNedvizhArr: state => {
      return state.fssp_prop_nedvizh
    },
    FsspPropertyTranspArr: state => {
      return state.fssp_prop_transp
    },
    FsspPropertyDohodArr: state => {
      return state.fssp_prop_dohod
    },
    FsspOtherIpAllArr: state => {
      return state.fssp_other_ip_all
    },
    FsspPostanClaimsArr: state => {
      return state.fssp_postan_claims
    },
    PostanDocTypes: state => {
      return state.fssp_postan_doc_types
    },
    FsspPropertyLoadError: state => {
      return state.fssp_prop_load_error
    },
    FsspPostanClaimCancelInfo: state => {
      return state.fssp_cancel_info
    },
  },
  mutations: {
    setFsspPropertyArr (state, payload) {
      state.fssp_prop = payload
    },
    setFsspOtherIpArr (state, payload) {
      state.fssp_other_ip = payload
    },
    setFsspPropertyAccsArr (state, payload) {
      state.fssp_prop_accs = payload
    },
    setFsspPropertyNedvizhArr (state, payload) {
      state.fssp_prop_nedvizh = payload
    },
    setFsspPropertyTranspArr (state, payload) {
      state.fssp_prop_transp = payload
    },
    setFsspPropertyDohodArr (state, payload) {
      state.fssp_prop_dohod = payload
    },
    setFsspOtherIpAllArr (state, payload) {
      state.fssp_other_ip_all = payload
    },
    setFsspPostanClaimsArr (state, payload) {
      state.fssp_postan_claims = payload
    },
    setPostanDocTypes (state, payload) {
      state.fssp_postan_doc_types = payload
    },
    setIskData (state, payload) {
      state.isk_data = payload
    },
    setFsspPropertyLoadError (state, payload) {
      state.fssp_prop_load_error = payload
    },
    setFsspPostanClaimCancelInfo (state, payload) {
      state.fssp_cancel_info = payload
    },
  },
  actions: {
    getFsspProperty ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_prop_loading_flag = true;
      commit('setFsspPropertyArr', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspProperty',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_prop_loading_flag = false;
          if (response.data.result) {
            commit('setFsspPropertyArr', response.data.data)
            commit('setFsspPropertyLoadError', response.data.error)
          }
        })
      })
    },
    getFsspOtherIp ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_other_ip_loading_flag = true;
      commit('setFsspOtherIpArr', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspOtherIp',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_other_ip_loading_flag = false;
          if (response.data.result) {
            commit('setFsspOtherIpArr', response.data.data)
          }
        })
      })
    },
    getFsspPropAccs ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspPropertyAccsArr', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspPropAccs',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspPropertyAccsArr', response.data.data)
          }
        })
      })
    },
    getFsspPropNedvizh ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspPropertyNedvizhArr', [])
      commit('setIskData', {result: false})
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspPropNedvizh',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspPropertyNedvizhArr', response.data.data);
            commit('setIskData', response.data.data_isk)
          }
        })
      })
    },
    getFsspPropTransp ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspPropertyTranspArr', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspPropTransp',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspPropertyTranspArr', response.data.data)
          }
        })
      })
    },
    getFsspPropDohod ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspPropertyDohodArr', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspPropDohod',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspPropertyDohodArr', response.data.data)
          }
        })
      })
    },
    getFsspOtherIpAll ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_other_ip_loading_flag = true;
      commit('setFsspOtherIpAllArr', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspOtherIpAll',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_other_ip_loading_flag = false;
          if (response.data.result) {
            commit('setFsspOtherIpAllArr', response.data.data)
          }
          resolve(response.data)
        })
      })
    },
    getPostanClaims ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspPostanClaimsArr', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getPostanClaims',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspPostanClaimsArr', response.data.data)
          }
        })
      })
    },
    getFsspPostanDocTypes ({state, getters, commit, dispatch}, requestObject) {
      commit('setPostanDocTypes', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspPostanDocTypes',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setPostanDocTypes', response.data.data)
          }
        })
      })
    },
    getPostanCancelInfo ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspPostanClaimCancelInfo', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getPostanCancelInfo',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspPostanClaimCancelInfo', response.data.data)
          }
        })
      })
    },
    cancelPostanClaim ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'cancelPostanClaim',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            resolve(response.data.result)
          }
        })
      })
    },
    saveAccProp ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'saveAccProp',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
  }


}

