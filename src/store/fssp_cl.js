import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    fssp_cl_pays:[],
    fssp_cl_pays_loading_flag:false,
    fssp_total_pays:0,
    fssp_cl_pays_hist:[],
    fssp_cl_pays_loading_flag_hist:false,
    fssp_total_pays_hist:0,

    fssp_cl_banks:[],
    fssp_cl_banks_loading_flag:false,
    fssp_total_banks:0,
    fssp_cl_banks_hist:[],
    fssp_cl_banks_loading_flag_hist:false,
    fssp_total_banks_hist:0,

    fssp_cl_fns:[],
    fssp_cl_fns_loading_flag:false,
    fssp_total_fns:0,
    fssp_cl_fns_hist:[],
    fssp_cl_fns_loading_flag_hist:false,
    fssp_total_fns_hist:0,

    fssp_cl_zags:[],
    fssp_cl_zags_loading_flag:false,
    fssp_total_zags:0,
    fssp_cl_zags_hist:[],
    fssp_cl_zags_loading_flag_hist:false,
    fssp_total_zags_hist:0,

    fssp_cl_pfr:[],
    fssp_cl_pfr_loading_flag:false,
    fssp_total_pfr:0,
    fssp_cl_pfr_hist:[],
    fssp_cl_pfr_loading_flag_hist:false,
    fssp_total_pfr_hist:0,

    fssp_cl_mvd:[],
    fssp_cl_mvd_loading_flag:false,
    fssp_total_mvd:0,
    fssp_cl_mvd_hist:[],
    fssp_cl_mvd_loading_flag_hist:false,
    fssp_total_mvd_hist:0,

    fssp_cl_gims:[],
    fssp_cl_gims_loading_flag:false,
    fssp_total_gims:0,
    fssp_cl_gims_hist:[],
    fssp_cl_gims_loading_flag_hist:false,
    fssp_total_gims_hist:0,

    fssp_cl_nedv:[],
    fssp_cl_nedv_loading_flag:false,
    fssp_total_nedv:0,
    fssp_cl_nedv_hist:[],
    fssp_cl_nedv_loading_flag_hist:false,
    fssp_total_nedv_hist:0,

    fssp_cl_other:[],
    fssp_cl_other_loading_flag:false,
    fssp_total_other:0,
    fssp_cl_other_hist:[],
    fssp_cl_other_loading_flag_hist:false,
    fssp_total_other_hist:0,

    claim_cl_items:[],
  },
  getters: {
    ClaimClItems: state => {
      return state.claim_cl_items
    },
    FsspClOtherLoadingFlag: state => {
      return state.fssp_cl_other_loading_flag
    },
    FsspClOther: state => {
      return state.fssp_cl_other
    },
    FsspTotalOther: state => {
      return state.fssp_total_other
    },

    FsspClOtherLoadingFlagHist: state => {
      return state.fssp_cl_other_loading_flag_hist
    },
    FsspClOtherHist: state => {
      return state.fssp_cl_other_hist
    },
    FsspTotalOtherHist: state => {
      return state.fssp_total_other_hist
    },

    FsspClNedvLoadingFlag: state => {
      return state.fssp_cl_nedv_loading_flag
    },
    FsspClNedv: state => {
      return state.fssp_cl_nedv
    },
    FsspTotalNedv: state => {
      return state.fssp_total_nedv
    },

    FsspClNedvLoadingFlagHist: state => {
      return state.fssp_cl_nedv_loading_flag_hist
    },
    FsspClNedvHist: state => {
      return state.fssp_cl_nedv_hist
    },
    FsspTotalNedvHist: state => {
      return state.fssp_total_nedv_hist
    },

    FsspClGimsLoadingFlag: state => {
      return state.fssp_cl_gims_loading_flag
    },
    FsspClGims: state => {
      return state.fssp_cl_gims
    },
    FsspTotalGims: state => {
      return state.fssp_total_gims
    },

    FsspClGimsLoadingFlagHist: state => {
      return state.fssp_cl_gims_loading_flag_hist
    },
    FsspClGimsHist: state => {
      return state.fssp_cl_gims_hist
    },
    FsspTotalGimsHist: state => {
      return state.fssp_total_gims_hist
    },

    FsspClMvdLoadingFlag: state => {
      return state.fssp_cl_mvd_loading_flag
    },
    FsspClMvd: state => {
      return state.fssp_cl_mvd
    },
    FsspTotalMvd: state => {
      return state.fssp_total_mvd
    },

    FsspClMvdLoadingFlagHist: state => {
      return state.fssp_cl_mvd_loading_flag_hist
    },
    FsspClMvdHist: state => {
      return state.fssp_cl_mvd_hist
    },
    FsspTotalMvdHist: state => {
      return state.fssp_total_mvd_hist
    },

    FsspClPfrLoadingFlag: state => {
      return state.fssp_cl_pfr_loading_flag
    },
    FsspClPfr: state => {
      return state.fssp_cl_pfr
    },
    FsspTotalPfr: state => {
      return state.fssp_total_pfr
    },

    FsspClPfrLoadingFlagHist: state => {
      return state.fssp_cl_pfr_loading_flag_hist
    },
    FsspClPfrHist: state => {
      return state.fssp_cl_pfr_hist
    },
    FsspTotalPfrHist: state => {
      return state.fssp_total_pfr_hist
    },

    FsspClZagsLoadingFlag: state => {
      return state.fssp_cl_zags_loading_flag
    },
    FsspClZags: state => {
      return state.fssp_cl_zags
    },
    FsspTotalZags: state => {
      return state.fssp_total_zags
    },

    FsspClZagsLoadingFlagHist: state => {
      return state.fssp_cl_zags_loading_flag_hist
    },
    FsspClZagsHist: state => {
      return state.fssp_cl_zags_hist
    },
    FsspTotalZagsHist: state => {
      return state.fssp_total_zags_hist
    },

    FsspClFnsLoadingFlag: state => {
      return state.fssp_cl_fns_loading_flag
    },
    FsspClFns: state => {
      return state.fssp_cl_fns
    },
    FsspTotalFns: state => {
      return state.fssp_total_fns
    },

    FsspClFnsLoadingFlagHist: state => {
      return state.fssp_cl_fns_loading_flag_hist
    },
    FsspClFnsHist: state => {
      return state.fssp_cl_fns_hist
    },
    FsspTotalFnsHist: state => {
      return state.fssp_total_fns_hist
    },

    FsspClPaysLoadingFlag: state => {
      return state.fssp_cl_pays_loading_flag
    },
    FsspClPays: state => {
      return state.fssp_cl_pays
    },
    FsspTotalPays: state => {
      return state.fssp_total_pays
    },

    FsspClPaysLoadingFlagHist: state => {
      return state.fssp_cl_pays_loading_flag_hist
    },
    FsspClPaysHist: state => {
      return state.fssp_cl_pays_hist
    },
    FsspTotalPaysHist: state => {
      return state.fssp_total_pays_hist
    },

    FsspClBanksLoadingFlag: state => {
      return state.fssp_cl_banks_loading_flag
    },
    FsspClBanks: state => {
      return state.fssp_cl_banks
    },
    FsspTotalBanks: state => {
      return state.fssp_total_banks
    },

    FsspClBanksLoadingFlagHist: state => {
      return state.fssp_cl_banks_loading_flag_hist
    },
    FsspClBanksHist: state => {
      return state.fssp_cl_banks_hist
    },
    FsspTotalBanksHist: state => {
      return state.fssp_total_banks_hist
    },
  },
  mutations: {
    setClaimClItems (state, payload) {
      state.claim_cl_items = payload
    },
    setFsspClPays (state, payload) {
      state.fssp_cl_pays = payload
    },
    setFsspTotalPays (state, payload) {
      state.fssp_total_pays = payload
    },

    setFsspClPaysHist (state, payload) {
      state.fssp_cl_pays_hist = payload
    },
    setFsspTotalPaysHist (state, payload) {
      state.fssp_total_pays_hist = payload
    },

    setFsspClBanks (state, payload) {
      state.fssp_cl_banks = payload
    },
    setFsspTotalBanks (state, payload) {
      state.fssp_total_banks = payload
    },

    setFsspClBanksHist (state, payload) {
      state.fssp_cl_banks_hist = payload
    },
    setFsspTotalBanksHist (state, payload) {
      state.fssp_total_banks_hist = payload
    },

    setFsspClFns (state, payload) {
      state.fssp_cl_fns = payload
    },
    setFsspTotalFns (state, payload) {
      state.fssp_total_fns = payload
    },

    setFsspClFnsHist (state, payload) {
      state.fssp_cl_fns_hist = payload
    },
    setFsspTotalFnsHist (state, payload) {
      state.fssp_total_fns_hist = payload
    },

    setFsspClZags (state, payload) {
      state.fssp_cl_zags = payload
    },
    setFsspTotalZags (state, payload) {
      state.fssp_total_zags = payload
    },

    setFsspClZagsHist (state, payload) {
      state.fssp_cl_zags_hist = payload
    },
    setFsspTotalZagsHist (state, payload) {
      state.fssp_total_zags_hist = payload
    },

    setFsspClPfr (state, payload) {
      state.fssp_cl_pfr = payload
    },
    setFsspTotalPfr (state, payload) {
      state.fssp_total_pfr = payload
    },

    setFsspClPfrHist (state, payload) {
      state.fssp_cl_pfr_hist = payload
    },
    setFsspTotalPfrHist (state, payload) {
      state.fssp_total_pfr_hist = payload
    },

    setFsspClMvd (state, payload) {
      state.fssp_cl_mvd = payload
    },
    setFsspTotalMvd (state, payload) {
      state.fssp_total_mvd = payload
    },

    setFsspClMvdHist (state, payload) {
      state.fssp_cl_mvd_hist = payload
    },
    setFsspTotalMvdHist (state, payload) {
      state.fssp_total_mvd_hist = payload
    },

    setFsspClGims (state, payload) {
      state.fssp_cl_gims = payload
    },
    setFsspTotalGims (state, payload) {
      state.fssp_total_gims = payload
    },

    setFsspClGimsHist (state, payload) {
      state.fssp_cl_gims_hist = payload
    },
    setFsspTotalGimsHist (state, payload) {
      state.fssp_total_gims_hist = payload
    },

    setFsspClNedv (state, payload) {
      state.fssp_cl_nedv = payload
    },
    setFsspTotalNedv (state, payload) {
      state.fssp_total_nedv = payload
    },

    setFsspClNedvHist (state, payload) {
      state.fssp_cl_nedv_hist = payload
    },
    setFsspTotalNedvHist (state, payload) {
      state.fssp_total_nedv_hist = payload
    },

    setFsspClOther (state, payload) {
      state.fssp_cl_other = payload
    },
    setFsspTotalOther (state, payload) {
      state.fssp_total_other = payload
    },

    setFsspClOtherHist (state, payload) {
      state.fssp_cl_other_hist = payload
    },
    setFsspTotalOtherHist (state, payload) {
      state.fssp_total_other_hist = payload
    },
  },
  actions: {
    getClaimClItems ({state, getters, commit, dispatch}, requestObject) {
      commit('setClaimClItems', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getClaimClItems',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setClaimClItems', response.data.data)
          }
        })
      })
    },
    getFsspClPays ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_pays_loading_flag = true;
      commit('setFsspClPays', [])
      commit('setFsspTotalPays', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClPays',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_pays_loading_flag = false;
          if (response.data.result) {
            commit('setFsspClPays', response.data.data)
            commit('setFsspTotalPays', response.data.total)
          }
        })
      })
    },
    getFsspClPaysHist ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_pays_loading_flag_hist = true;
      commit('setFsspClPaysHist', [])
      commit('setFsspTotalPaysHist', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClPaysHist',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_pays_loading_flag_hist = false;
          if (response.data.result) {
            commit('setFsspClPaysHist', response.data.data)
            commit('setFsspTotalPaysHist', response.data.total)
          }
        })
      })
    },

    getFsspClBanks ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_banks_loading_flag = true;
      commit('setFsspClBanks', [])
      commit('setFsspTotalBanks', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClBanks',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_banks_loading_flag = false;
          if (response.data.result) {
            commit('setFsspClBanks', response.data.data)
            commit('setFsspTotalBanks', response.data.total)
          }
        })
      })
    },
    getFsspClBanksHist ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_banks_loading_flag_hist = true;
      commit('setFsspClBanksHist', [])
      commit('setFsspTotalBanksHist', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClBanksHist',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_banks_loading_flag_hist = false;
          if (response.data.result) {
            commit('setFsspClBanksHist', response.data.data)
            commit('setFsspTotalBanksHist', response.data.total)
          }
        })
      })
    },

    getFsspClFns ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_fns_loading_flag = true;
      commit('setFsspClFns', [])
      commit('setFsspTotalFns', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClFns',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_fns_loading_flag = false;
          if (response.data.result) {
            commit('setFsspClFns', response.data.data)
            commit('setFsspTotalFns', response.data.total)
          }
        })
      })
    },
    getFsspClFnsHist ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_fns_loading_flag_hist = true;
      commit('setFsspClFnsHist', [])
      commit('setFsspTotalFnsHist', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClFnsHist',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_fns_loading_flag_hist = false;
          if (response.data.result) {
            commit('setFsspClFnsHist', response.data.data)
            commit('setFsspTotalFnsHist', response.data.total)
          }
        })
      })
    },

    getFsspClZags ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_zags_loading_flag = true;
      commit('setFsspClZags', [])
      commit('setFsspTotalZags', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClZags',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_zags_loading_flag = false;
          if (response.data.result) {
            commit('setFsspClZags', response.data.data)
            commit('setFsspTotalZags', response.data.total)
          }
        })
      })
    },
    getFsspClZagsHist ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_zags_loading_flag_hist = true;
      commit('setFsspClZagsHist', [])
      commit('setFsspTotalZagsHist', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClZagsHist',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_zags_loading_flag_hist = false;
          if (response.data.result) {
            commit('setFsspClZagsHist', response.data.data)
            commit('setFsspTotalZagsHist', response.data.total)
          }
        })
      })
    },

    getFsspClPfr ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_pfr_loading_flag = true;
      commit('setFsspClPfr', [])
      commit('setFsspTotalPfr', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClPfr',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_pfr_loading_flag = false;
          if (response.data.result) {
            commit('setFsspClPfr', response.data.data)
            commit('setFsspTotalPfr', response.data.total)
          }
        })
      })
    },
    getFsspClPfrHist ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_pfr_loading_flag_hist = true;
      commit('setFsspClPfrHist', [])
      commit('setFsspTotalPfrHist', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClPfrHist',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_pfr_loading_flag_hist = false;
          if (response.data.result) {
            commit('setFsspClPfrHist', response.data.data)
            commit('setFsspTotalPfrHist', response.data.total)
          }
        })
      })
    },

    getFsspClMvd ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_mvd_loading_flag = true;
      commit('setFsspClMvd', [])
      commit('setFsspTotalMvd', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClMvd',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_mvd_loading_flag = false;
          if (response.data.result) {
            commit('setFsspClMvd', response.data.data)
            commit('setFsspTotalMvd', response.data.total)
          }
        })
      })
    },
    getFsspClMvdHist ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_mvd_loading_flag_hist = true;
      commit('setFsspClMvdHist', [])
      commit('setFsspTotalMvdHist', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClMvdHist',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_mvd_loading_flag_hist = false;
          if (response.data.result) {
            commit('setFsspClMvdHist', response.data.data)
            commit('setFsspTotalMvdHist', response.data.total)
          }
        })
      })
    },

    getFsspClGims ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_gims_loading_flag = true;
      commit('setFsspClGims', [])
      commit('setFsspTotalGims', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClGims',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_gims_loading_flag = false;
          if (response.data.result) {
            commit('setFsspClGims', response.data.data)
            commit('setFsspTotalGims', response.data.total)
          }
        })
      })
    },
    getFsspClGimsHist ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_gims_loading_flag_hist = true;
      commit('setFsspClGimsHist', [])
      commit('setFsspTotalGimsHist', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClGimsHist',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_gims_loading_flag_hist = false;
          if (response.data.result) {
            commit('setFsspClGimsHist', response.data.data)
            commit('setFsspTotalGimsHist', response.data.total)
          }
        })
      })
    },

    getFsspClNedv ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_nedv_loading_flag = true;
      commit('setFsspClNedv', [])
      commit('setFsspTotalNedv', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClNedv',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_nedv_loading_flag = false;
          if (response.data.result) {
            commit('setFsspClNedv', response.data.data)
            commit('setFsspTotalNedv', response.data.total)
          }
        })
      })
    },
    getFsspClNedvHist ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_nedv_loading_flag_hist = true;
      commit('setFsspClNedvHist', [])
      commit('setFsspTotalNedvHist', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClNedvHist',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_nedv_loading_flag_hist = false;
          if (response.data.result) {
            commit('setFsspClNedvHist', response.data.data)
            commit('setFsspTotalNedvHist', response.data.total)
          }
        })
      })
    },

    getFsspClOther ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_other_loading_flag = true;
      commit('setFsspClOther', [])
      commit('setFsspTotalOther', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClOther',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_other_loading_flag = false;
          if (response.data.result) {
            commit('setFsspClOther', response.data.data)
            commit('setFsspTotalOther', response.data.total)
          }
        })
      })
    },
    getFsspClOtherHist ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_cl_other_loading_flag_hist = true;
      commit('setFsspClOtherHist', [])
      commit('setFsspTotalOtherHist', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspClOtherHist',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_cl_other_loading_flag_hist = false;
          if (response.data.result) {
            commit('setFsspClOtherHist', response.data.data)
            commit('setFsspTotalOtherHist', response.data.total)
          }
        })
      })
    },
  }


}

