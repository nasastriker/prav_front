import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    settingAll:[],
    settingTable:[],
    priorSend:[],
    supervisor:[],
    chapter:[],
      fileSetting:[],
    total:0,
      activeTabSetting:0,
    query: {}


  },
  getters: {
    // ...
    SettingsChapterList: state => {
      return state.chapter
    },
    FileSetting: state => {
        return state.fileSetting
    },
    PriorSend: state => {
      return state.priorSend
    },
    Supervisor: state => {
        return state.supervisor
    },
    SettingsAllTable: state => {
      return state.settingTable
    },
    SettingAllArr: state => {
      return state.settingAll
    },
    TotalSettingAlls: state => {
      return state.total
    },

    QuerySettingAlls: state => {
      return state.query
    }

  },
  mutations: {
    setSettingsChapterList (state, payload) {
      state.chapter = payload

    },
    setSupervisor(state, payload) {
        state.supervisor = payload

    },
    setFileSetting (state, payload) {
    state.fileSetting = payload

    },
    setPriorSend (state, payload) {
      state.priorSend = payload

    },
    setSettingsAllTable  (state, payload) {
      state.settingTable = payload

    },
    setSettingAlls (state, payload) {
      state.settingAll = payload

    },
    setQuerySettingAlls (state, payload) {
      state.query = payload

    },
    setTotalSettingAlls (state, payload) {
      state.total = payload

    }

  },
  actions: {

      getSettingsChapterList({state, getters, commit, dispatch}, requestObject=null) {
          return new Promise((resolve, reject) => {
              axios.get(r('setting.index'), {
                  params: {
                      method: 'getSettingsChapterList',
                      param: requestObject
                  }
              }).then((response) => {
                  if (response.data.result) {
                      commit('setSettingsChapterList', response.data.data)
                  }
              })
          })
      },




      getGlobalSetting ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('setting.index'), {
          params: {
            method: 'getGlobalSetting',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            resolve(response)
          }
        })
      })
    },



      getDataSupervisor({state, getters, commit, dispatch}, requestObject) {
          return new Promise((resolve, reject) => {


              axios.get(r('setting.index'), {
                  params: {
                      method: 'getDataSupervisor',
                      param: ''
                  }
              }).then((response) => {
                  if (response.data.result) {
                      commit('setSupervisor', response.data.data)
                  }


              })

          })
      },
      deleteFileSetting ({state, getters, commit, dispatch}, requestObject) {
          return new Promise((resolve, reject) => {
              axios.post(r('setting.update'), {
                  params: {
                      method: 'deleteFileSetting',
                      param: requestObject
                  }
              }).then((response) => {
                  resolve(response)
              })
          })

      },
      saveFileSetting({state, getters, commit, dispatch}, requestObject) {
          return new Promise((resolve, reject) => {
              let formData = new FormData();
              formData.append('document', requestObject.file[0]);
              formData.append('type', requestObject.type);
              axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;


              axios.post('/file/document',
                  formData,
                  {
                      headers: {
                          'Content-Type': 'multipart/form-data'
                      }
                  }
              ).then((response) => {
                  if (response.data.result) {
                      dispatch('getDataFileSetting');

                  }
                  resolve(response.data)
              })

          })
      },
      getDataFileSetting ({state, getters, commit, dispatch}, requestObject) {
          return new Promise((resolve, reject) => {


              axios.get(r('setting.index'), {
                  params: {
                      method: 'getDataFileSetting',
                      param: ''
                  }
              }).then((response) => {
                  if (response.data.result) {
                      commit('setFileSetting', response.data.data)
                  }


              })

          })
      },

    getSettingsAllTable ({state, getters, commit, dispatch}) {
      return new Promise((resolve, reject) => {

        axios.get(r('setting.index'), {
          params: {
            method: 'getSettingAllTable'

          }
        }).then((response) => {
          if (response.data.result) {
            commit('setSettingsAllTable', response.data.data)
          }
        })
      })
    },

    changeSettingBoolean ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('setting.update'), {
          params: {
            method: 'changeSettingBoolean',
            param: requestObject
          }
        }).then((response) => {
          resolve(response)
        })
      })

    },
    saveSettingCur ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('setting.update'), {
          params: {
            method: 'saveSettingCur',
            param: requestObject
          }
        }).then((response) => {
          resolve(response)
        })
      })

    },

    getDataSettingAlls ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQuerySettingAlls', requestObject)
        } else {
          param = getters.QuerySettingAlls
        }

        axios.get(r('setting.index'), {
          params: {
            method: 'getSettingAlls',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setSettingAlls', response.data.data)
            commit('setTotalSettingAlls', response.data.total)
          }


        })

      })
    }

  }


}

