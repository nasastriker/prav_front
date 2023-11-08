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
    logs:[],
    total:0,
    totalSetting:0,
    query: {},
    debtorCreditHistoryArr:[],
    logsStadHistoryArr:[],
    debtorHistoryArr:[],
    debtorCreditSudHistoryArr:[],
    logsFindFlag:false,
    find:'',
    logsSettingFindFlag:false,
    totalDebtor:0,
    totalDebtorCreditSud:0


  },
  getters: {
    // ...
    LogsArr: state => {
      return state.logs
    },
    LogsStadHistoryArr: state => {
      return state.logsStadHistoryArr
    },
    LogsDebtorCreditHistoryArr: state => {
      return state.debtorCreditHistoryArr
    },
    LogsDebtorHistoryArr: state => {
      return state.debtorHistoryArr
    },
    LogsDebtorCreditSudHistoryArr: state => {
      return state.debtorCreditSudHistoryArr
    },
    TotalSettingLogs: state => {
      return state.totalSetting
    },
    TotalLogs: state => {
      return state.total
    },
    TotalDebtorLogs: state => {
      return state.totalDebtor
    },
    TotalDebtorCreditSudLogs: state => {
      return state.totalDebtorCreditSud
    },
    QueryLogs: state => {
      return state.query
    },
    LogsFindFlag: state => {
      return state.logsFindFlag
    },
    LogsSettingFindFlag: state => {
      return state.logsSettingFindFlag
    }

  },
  mutations: {
    setLogs (state, payload) {
      state.logs = payload

    },
    setDebtorCreditHistoryArr (state, payload) {
      state.debtorCreditHistoryArr = payload

    },
    setSettingStadHistoryArr (state, payload) {
      state.logsStadHistoryArr = payload

    },
    setDebtorHistoryArr (state, payload) {
      state.debtorHistoryArr = payload

    },
    setDebtorCreditSudHistoryArr (state, payload) {
      state.debtorCreditSudHistoryArr = payload

    },

    clearLogs (state, payload) {
      state.logs = []

    },
    setQueryLogs (state, payload) {
      state.query = payload

    },
    setTotalLogs (state, payload) {
      state.total = payload

    },
    setSettingStadTotalLogs (state, payload) {
      state.totalSetting = payload

    },
    setTotalDebtorLogs (state, payload) {
      state.totalDebtor = payload

    },
    setTotalDebtorCreditSudLogs (state, payload) {
      state.totalDebtorCreditSud = payload

    }
  },
  actions: {
    getSettingStadHistoryArr ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        state.logsFindFlag = true
        const str = randomString(20)
        state.find = str
        commit('setSettingStadHistoryArr', [])
        commit('setSettingStadTotalLogs', 0)
        axios.get(r('settingStad.index'), {
          params: {
            method: 'getLogsSettingStad',
            param: requestObject
          }
        }).then((response) => {
          state.logsFindFlag = false
          if (state.find === str && response.data.result) {
            commit('setSettingStadHistoryArr', response.data.data)
            commit('setSettingStadTotalLogs', response.data.total)
          }
        })
      })
    },
    getDebtorCreditHistoryArr ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        state.logsFindFlag = true
        const str = randomString(20)
        state.find = str
        commit('setDebtorCreditHistoryArr', [])
        commit('setTotalLogs', 0)
        axios.get(r('logUser.index'), {
          params: {
            method: 'getLogsDebtorCreditHistory',
            param: requestObject
          }
        }).then((response) => {
          state.logsFindFlag = false
          if (state.find === str && response.data.result) {
            commit('setDebtorCreditHistoryArr', response.data.data)
            commit('setTotalLogs', response.data.total)
          }
        })
      })
    },

    getDebtorCreditSudHistoryArr ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        state.logsFindFlag = true
        const str = randomString(20)
        state.find = str
        commit('setDebtorCreditSudHistoryArr', [])
        commit('setTotalDebtorCreditSudLogs', 0)
        axios.get(r('logUser.index'), {
          params: {
            method: 'getLogsDebtorCreditSudHistory',
            param: requestObject
          }
        }).then((response) => {
          state.logsFindFlag = false
          if (state.find === str && response.data.result) {
            commit('setDebtorCreditSudHistoryArr', response.data.data)
            commit('setTotalDebtorCreditSudLogs', response.data.total)
          }
        })
      })
    },
    getDebtorHistoryArr ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        state.logsFindFlag = true
        const str = randomString(20)
        state.find = str
        commit('setDebtorHistoryArr', [])
        commit('setTotalDebtorLogs', 0)
        axios.get(r('logUser.index'), {
          params: {
            method: 'getLogsDebtorHistory',
            param: requestObject
          }
        }).then((response) => {
          state.logsFindFlag = false
          if (state.find === str && response.data.result) {
            commit('setDebtorHistoryArr', response.data.data)
            commit('setTotalDebtorLogs', response.data.total)
          }
        })
      })
    },
    getDataLogs ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setLogs', [])
        commit('setTotalLogs', 0)
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryLogs', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('logUser.index'), {
          params: {
            method: 'getLogs',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setLogs', response.data.data)
            commit('setTotalLogs', response.data.total)
          }


        })

      })
    },
    getDataLogsRecover ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setLogs', [])
        commit('setTotalLogs', 0)
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryLogs', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('logUser.index'), {
          params: {
            method: 'getLogsRecover',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setLogs', response.data.data)
            commit('setTotalLogs', response.data.total)
          }


        })

      })
    }

  }


}

