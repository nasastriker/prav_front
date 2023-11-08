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

    query: {
      offset:0,
      limit:10
    },
    correspondence:[],
    total:0,
    correspondenceFindFlag:false,
    documentsVidList:[],
    documentsGroupList:[],
    documentsTypeList:[],
    correspondenceDebtorFind:[],
    debtorCorrespondence:[],
    totalDebtorCorrespondence:0


  },
  getters: {
    // ...
    DebtorCorrespondence:state => {
      return state.debtorCorrespondence
    },
    TotalDebtorCorrespondence:state => {
      return state.totalDebtorCorrespondence
    },
    CorrespondenceDebtorFind:state => {
      return state.correspondenceDebtorFind
    },
    DocumentsTypeListDebtorConstruct:state => {
      const arr = []

      for (let i = 0; i<state.documentsTypeList.length; i++) {
        if(state.documentsTypeList[i].send_group=='debtor_constructor'){
          arr.push(state.documentsTypeList[i])
        }

      }
      return arr
    },
    DocumentsTypeList:state => {
      const arr = []
      arr.push({id:0, name:'не указано'})

      for (let i = 0; i<state.documentsTypeList.length; i++) {
        arr.push(state.documentsTypeList[i])
      }
      return arr
    },
    DocumentsVidList:  state => {
      const arr = []
      arr.push({id:0, name:'не указано'})

      for (let i = 0; i<state.documentsVidList.length; i++) {
        arr.push(state.documentsVidList[i])
      }
      return arr
    },
    DocumentsGroupList:  state => {
      const arr = []
      arr.push({id:0, name:'не указано'})

      for (let i = 0; i<state.documentsGroupList.length; i++) {
        arr.push(state.documentsGroupList[i])
      }
      return arr
    },

    CorrespondenceFindFlag: state => {
      return state.correspondenceFindFlag
    },
    CorrespondenceArr: state => {
      return state.correspondence
    },
    TotalCorrespondence: state => {
      return state.total
    },

    QueryCorrespondence: state => {
      return state.query
    }

  },
  mutations: {
    setTotalDebtorCorrespondence (state, payload) {
      state.totalDebtorCorrespondence = payload || 0
    },
    setDebtorCorrespondence (state, payload) {
      state.debtorCorrespondence = payload
    },
    setCorrespondenceDebtorFind (state, payload) {
      state.correspondenceDebtorFind = payload
    },

    setDocumentsTypeList (state, payload) {
      state.documentsTypeList = payload
    },
    setDocumentsVidList (state, payload) {
      state.documentsVidList = payload

    },
    setDocumentsGroupList (state, payload) {
      state.documentsGroupList = payload

    },
    setCorrespondence (state, payload) {

      state.correspondence = payload

    },
    setQueryCorrespondence (state, payload) {
      state.query = payload

    },
    setTotalCorrespondence (state, payload) {
      state.total = payload

    }

  },
  actions: {
    getDebtorCorrespondence ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('correspondence.index'), {
          params: {
            method: 'getDebtorCorrespondence',
            param: requestObject
          }
        }).then((response) => {
          commit('setDebtorCorrespondence', response.data.data)
          commit('setTotalDebtorCorrespondence', response.data.total)
          //  resolve(response.data)
        })

      })
    },

    findDebtorCreditForCorrespondence ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        state.correspondenceFindFlag = true
        axios.post(r('correspondence.update'), {
          params: {
            method: 'findDebtorCredit',
            param: requestObject
          }
        }).then((response) => {
          state.correspondenceFindFlag = false
          commit('setCorrespondenceDebtorFind', response.data.data)
          resolve(response.data)
        })

      })
    },

    saveCorrespondence ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('correspondence.update'), {
          params: {
            method: 'saveCorrespondence',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })

      })
    },
    getCorrespondenceOnce ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('correspondence.index'), {
          params: {
            method: 'getCorrespondenceOnce',
            param: requestObject
          }
        }).then((response) => {

          resolve(response.data)
        })

      })
    },

    getDocumentsTypeList ({state, getters, commit, dispatch}, requestObject = null) {
      return new Promise((resolve, reject) => {
        axios.get(r('correspondence.update'), {
          params: {
            method: 'getDocumentsTypeList',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setDocumentsTypeList', response.data.data)
          }
          resolve(response.data.result)
        })

      })
    },

    getDocumentsVidList ({state, getters, commit, dispatch}, requestObject = null) {
      return new Promise((resolve, reject) => {
        axios.get(r('correspondence.index'), {
          params: {
            method: 'getDocumentsVidList',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setDocumentsVidList', response.data.data)
          }
          resolve(response.data.result)
        })

      })
    },

    getDocumentsGroupList ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('correspondence.index'), {
          params: {
            method: 'getDocumentsGroupList',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setDocumentsGroupList', response.data.data)
          }
          resolve(response.data.result)
        })

      })
    },  
      
    getDataCorrespondence ({state, getters, commit, dispatch}, requestObject = null) {
      return new Promise((resolve, reject) => {
        commit('setCorrespondence', [])
        const str = randomString(20)
        state.find = str
        state.correspondenceFindFlag = true
        axios.get(r('correspondence.index'), {
          params: {
            method: 'getCorrespondence',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            if (str == state.find) {
              commit('setCorrespondence', response.data.data)
              commit('setTotalCorrespondence', response.data.total)
            }

          }


          state.correspondenceFindFlag = false
        })

      })
    },
    deleteCorrespondence ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('correspondence.update'), {
          params: {
            method: 'deleteCorrespondence',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataCorrespondence')
          }
          resolve(response.data.result)


        })

      })
    },
    checkCorrespondenceFilterFromXLS ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('correspondence.update'), {
          params: {
            method: 'checkFilterFromXLS',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    exportCorrespondenceToXLS ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('correspondence.update'), {
          params: {
            method: 'exportFilterToXLS',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    }
  }


}

