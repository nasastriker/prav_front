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
    history:[],
    total:0,
    historyAll:[],
    totalAll:0,
    query: {},
    find:'',
    fileHistorySoftArr:''


  },
  getters: {
    // ...
    HistorySoftArr: state => {
      return state.history
    },
    FileHistorySoftArr: state => {
      return state.fileHistorySoftArr
    },
    TotalHistorySoft: state => {
      return state.total
    },
    HistorySoftArrAll: state => {
      return state.historyAll
    },
    TotalHistorySoftAll: state => {
      return state.totalAll
    },

    QueryHistorySoft: state => {
      return state.query
    }

  },
  mutations: {
    setHistorySoft (state, payload) {
      state.history = payload

    },
    setHistorySoftAll (state, payload) {
      state.historyAll = payload

    },
    setQueryHistorySoft (state, payload) {
      state.query = payload

    },
    setTotalHistorySoft (state, payload) {
      state.total = payload

    },
    setFilesHistorySoftArr (state, payload) {
      state.fileHistorySoftArr = payload

    },
    setTotalHistorySoftAll (state, payload) {
      state.totalAll = payload

    }


  },
  actions: {

    deleteFileListHistorySoft ({state, getters, commit, dispatch}) {
      return new Promise((resolve, reject) => {
        axios.get(r('historySoft.index'), {
          params: {
            method: 'deleteFileListHistorySofta'

          }
        }).then((response) => {
          resolve(response.data.result)
        })
      })
    },

    sendMessageHistorySoftOnce ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('historySoft.update'), {
          params: {
            method: 'sendMessageHistotySoft',
            param: requestObject

          }
        }).then((response) => {
            resolve(response.data.result)
        })
      })
    },

    getFileListHistorySoft ({state, getters, commit, dispatch}) {
      return new Promise((resolve, reject) => {
        axios.get(r('historySoft.index'), {
          params: {
            method: 'getFileListHistorySofta'

          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFilesHistorySoftArr', response.data.data)
          }
        })
      })
    },

    ExportToExcelHistorySoft ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('historySoft.update'), {
          params: {
            method: 'setExportToExcel',
            param: requestObject
          }
        }).then((response) => {
          return response
        })

      })
    },

    getDataHistorySoftFilter ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const str = randomString(20)
        state.find = str
        axios.get(r('historySoft.index'), {
          params: {
            method: 'getHistoryFilter',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            if (str == state.find) {
              commit('setHistorySoftAll', response.data.data)
              commit('setTotalHistorySoftAll', response.data.total)
            }
          }
        })

      })
    },
    getDataHistorySoftAll ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const str = randomString(20)
        state.find = str
        axios.get(r('historySoft.index'), {
          params: {
            method: 'getHistoryAll',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            if (str == state.find) {
              commit('setHistorySoftAll', response.data.data)
              commit('setTotalHistorySoftAll', response.data.total)
            }
          }
        })

      })
    },


    getDataHistorySoft ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryHistorySoft', requestObject)
        } else {
          param = getters.QueryHistorySoft
        }

        axios.get(r('historySoft.index'), {
          params: {
            method: 'getHistory',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setHistorySoft', response.data.data)
            commit('setTotalHistorySoft', response.data.total)
          }


        })

      })
    }


  }


}

