import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    // settingFssp:[],

    settingTableFssp:[],
    fssp_settings:{},
    fssp_set_types_docs_orgn:[],
    fssp_set_types_docs_rec:[],

    fssp_check_list_claim_items:[],
    fssp_check_list_claim_items_count:0,
    fssp_check_list_claim_items_loading_flag:false,
    fssp_check_list_claim_items_data:{
      fields:{},
      offset: 0,
      limit: 100,
    },

    fssp_claim_post_types:[],
    fssp_claim_post_types_wo_all:[],
    fssp_post_claim_set_items:[],
    fssp_post_claim_set_funcs:[],

    // chapter:[],
    // total:0,
    //   activeTabSetting:0,
    // query: {}


  },
  getters: {
    FsspPostClaimSetFuncs: state => {
      return state.fssp_post_claim_set_funcs
    },
    FsspPostClaimSetItems: state => {
      return state.fssp_post_claim_set_items
    },
    FsspClaimPostSetTypes: state => {
      return state.fssp_claim_post_types
    },
    FsspClaimPostSetTypesWoAll: state => {
      return state.fssp_claim_post_types_wo_all
    },
    FsspCheckListClaimItems: state => {
      return state.fssp_check_list_claim_items
    },
    FsspCheckListClaimItemsCount: state => {
      return state.fssp_check_list_claim_items_count
    },
    FsspCheckListClaimItemsLoadingFlag: state => {
      return state.fssp_check_list_claim_items_loading_flag
    },
    FsspCheckListClaimItemsData: state => {
      return state.fssp_check_list_claim_items_data
    },
    FsspSetTypesDocsOrgn: state => {
      return state.fssp_set_types_docs_orgn
    },
    FsspSetTypesDocsRec: state => {
      return state.fssp_set_types_docs_rec
    },
    SettingsFsspTable: state => {
      return state.settingTableFssp
    },
    SettingsFssp: state => {
      return state.fssp_settings
    },
    // SettingAllArr: state => {
    //   return state.settingAll
    // },
    // TotalSettingAlls: state => {
    //   return state.total
    // },
    //
    // QuerySettingAlls: state => {
    //   return state.query
    // }

  },
  mutations: {
    setFsspPostClaimSetFuncs (state, payload) {
      state.fssp_post_claim_set_funcs = payload
    },
    setFsspPostClaimSetItems (state, payload) {
      state.fssp_post_claim_set_items = payload
    },
    setFsspClaimPostTypes (state, payload) {
      state.fssp_claim_post_types = payload
    },
    setFsspClaimPostTypesWoAll (state, payload) {
      state.fssp_claim_post_types_wo_all = payload
    },
    setQueryFsspCheckListClaimItemsOffset(state, payload) {
      state.fssp_check_list_claim_items_data.offset = payload*state.fssp_check_list_claim_items_data.limit
    },
    setQueryFsspCheckListClaimItemsLimit (state, payload) {
      state.fssp_check_list_claim_items_data.limit = payload
    },
    setFsspCheckListClaimItems (state, payload) {
      state.fssp_check_list_claim_items = payload
    },
    setFsspCheckListClaimItemsCount (state, payload) {
      state.fssp_check_list_claim_items_count = payload
    },
    setFsspSetTypesDocsOrgn (state, payload) {
      state.fssp_set_types_docs_orgn = payload

    },
    setFsspSetTypesDocsRec (state, payload) {
      state.fssp_set_types_docs_rec = payload

    },
    setSettingsFsspTable  (state, payload) {
      state.settingTableFssp = payload

    },
    setSettingsFssp  (state, payload) {
      state.fssp_settings = payload

    },
    // setSettingAlls (state, payload) {
    //   state.settingAll = payload
    //
    // },
    // setQuerySettingAlls (state, payload) {
    //   state.query = payload
    //
    // },
    // setTotalSettingAlls (state, payload) {
    //   state.total = payload
    //
    // }

  },
  actions: {
      getSettingsFsspTable ({state, getters, commit, dispatch}) {
      return new Promise((resolve, reject) => {

        axios.get(r('setting.index'), {
          params: {
            method: 'getSettingsFsspTable'

          }
        }).then((response) => {
          if (response.data.result) {
            commit('setSettingsFsspTable', response.data.data)
          }
        })
      })
    },

    changeSettingBooleanFssp ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('setting.update'), {
          params: {
            method: 'changeSettingBooleanFssp',
            param: requestObject
          }
        }).then((response) => {
          resolve(response)
        })
      })

    },
    saveSettingCurFssp ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('setting.update'), {
          params: {
            method: 'saveSettingCurFssp',
            param: requestObject
          }
        }).then((response) => {
          resolve(response)
        })
      })

    },

    getSettingsFssp ({state, getters, commit, dispatch}) {
      return new Promise((resolve, reject) => {

        axios.get(r('setting.index'), {
          params: {
            method: 'getSettingsFssp'

          }
        }).then((response) => {
          if (response.data.result) {
            commit('setSettingsFssp', response.data.data)
            resolve(response.data)
          }
        })
      })
    },

    getFsspSetTypesDocsDover ({state, getters, commit, dispatch}) {
      return new Promise((resolve, reject) => {
        commit('setFsspSetTypesDocsOrgn', [])
        commit('setFsspSetTypesDocsRec', [])
        axios.get(r('setting.index'), {
          params: {
            method: 'getFsspSetTypesDocsDover'

          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspSetTypesDocsOrgn', response.data.data_orgn)
            commit('setFsspSetTypesDocsRec', response.data.data_rec)
          }
        })
      })
    },

    getFsspCheckListClaimItems ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_check_list_claim_items_loading_flag = true;
      return new Promise((resolve, reject) => {
        commit('setFsspCheckListClaimItems', [])
        commit('setFsspCheckListClaimItemsCount', 0)
        axios.get(r('fsspClaimSettings.index'), {
          params: {
            method: 'getFsspCheckListClaimItems',
            param: getters.FsspCheckListClaimItemsData
          }
        }).then((response) => {
          state.fssp_check_list_claim_items_loading_flag = false;
          if (response.data.result) {
            commit('setFsspCheckListClaimItems', response.data.data)
            commit('setFsspCheckListClaimItemsCount', response.data.total)
          }
        })
      })
    },
    saveActiveFsspCheckListClaimItem({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r("fsspClaimSettings.update"), {
          params: {
            method: 'saveActiveFsspCheckListClaimItem',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    deleteFsspCheckListClaimItem({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r("fsspClaimSettings.update"), {
          params: {
            method: 'deleteFsspCheckListClaimItem',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    saveFsspCheckListClaimItem({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r("fsspClaimSettings.update"), {
          params: {
            method: 'saveFsspCheckListClaimItem',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    getFsspCheckListClaimItemData ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fsspClaimSettings.index'), {
          params: {
            method: 'getFsspCheckListClaimItemData',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data);
        })
      })
    },
    getFsspClaimPostTypes ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setFsspClaimPostTypes', [])
        axios.get(r('fsspPostClaimSettings.index'), {
          params: {
            method: 'getFsspClaimPostTypes',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspClaimPostTypes', response.data.data)
          }
        })
      })
    },
    getFsspClaimPostTypesWoAll ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setFsspClaimPostTypesWoAll', [])
        axios.get(r('fsspPostClaimSettings.index'), {
          params: {
            method: 'getFsspClaimPostTypesWoAll',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspClaimPostTypesWoAll', response.data.data)
          }
        })
      })
    },
    saveActiveFsspPostClaimItem({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r("fsspPostClaimSettings.update"), {
          params: {
            method: 'saveActiveFsspPostClaimItem',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    getFsspPostClaimSetItems ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setFsspPostClaimSetItems', [])
        axios.get(r('fsspPostClaimSettings.index'), {
          params: {
            method: 'getFsspPostClaimSetItems',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspPostClaimSetItems', response.data.data)
          }
        })
      })
    },
    saveFsspPostClaimItem({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r("fsspPostClaimSettings.update"), {
          params: {
            method: 'saveFsspPostClaimItem',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    getFsspPostClaimSetFuncs ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setFsspPostClaimSetFuncs', [])
        axios.get(r('fsspPostClaimSettings.index'), {
          params: {
            method: 'getFsspPostClaimSetFuncs',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspPostClaimSetFuncs', response.data.data)
          }
        })
      })
    },
    getFsspPostClaimItemData ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fsspPostClaimSettings.index'), {
          params: {
            method: 'getFsspPostClaimItemData',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data);
        })
      })
    },
    deleteFsspPostClaimItem({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r("fsspPostClaimSettings.update"), {
          params: {
            method: 'deleteFsspPostClaimItem',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },

  }


}

