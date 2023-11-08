import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    func:[],
    funcGenerate:[],
    total:0,
    query: {},
    funcAct:[],
    editFunc:0,
    showEditFunc:false,
    funcsArrToShedule:[],
    totalShedule:0


  },
  getters: {
    QueryFuncs: state => {
      return state.query
    },
    MounthList: state => {
      return []
    },
    PeriodList: state => {
      return [{id: 1, label: 'Однократно'},{id: 2, label: 'Ежедневно'},{id: 6, label: 'Раз в два дня'},
        {id: 3, label: 'Еженедельно'},{id: 5, label: 'Раз в две недели'},{id: 4, label: 'Ежемесячно'}]
    },
    WeekList: state => {
      return [{id: 1, label: 'Понедельник'},{id: 2, label: 'Вторник'},{id: 3, label: 'Среда'},{id: 4, label: 'Четверг'},
        {id: 5, label: 'Пятница'},{id: 6, label: 'Суббота'},{id: 7, label: 'Воскресенье'}]
    },
    FuncsArrRec: state => {
      const $arr = []
      for (let i = 0; i < state.func.length; i++) {
        if (state.func[i].rec == 1&&state.func[i].generate == 0&&state.func[i].not_show == 0) {
          $arr.push(state.func[i])
        }

      }

      return $arr

    },
      FuncsArrAct: state => {
          return state.funcAct
      },
    FuncsArr: state => {
      return state.func
    },
    FuncsGenerateArr: state => {
      return state.funcGenerate
    },
    FuncsArrToShedule: state => {
      return state.funcsArrToShedule
    },

    TotalFuncs: state => {
      return state.total
    },
    ShowEditFunc: state => {
      return state.showEditFunc
    },
    EditFunc: state => {
      return state.editFunc
    }


  },
  mutations: {
    setEditFunc (state, payload) {
      state.editFunc = payload

    },
      setFuncsArrToShedule (state, payload) {
      state.funcsArrToShedule = payload

    },
    setShowEditFunc (state, payload) {
      state.showEditFunc = payload

    },
      setFuncActive(state, payload) {
          state.funcAct = payload

      },
    setFunc (state, payload) {
      state.func = payload
      state.funcGenerate=[];
      for (let i = 0; i < payload.length; i++) {
        if (payload[i].generate == 1) {
          state.funcGenerate.push(payload[i])
        }

      }

    },

    clearFunc (state, payload) {
      state.func = []
      state.total = 0


    },
    setQueryFunc (state, payload) {
      state.query = payload

    },
    setTotalFunc (state, payload) {
      state.total = payload

    },
    setTotalFuncToShedule (state, payload) {
      state.totalShedule = payload

    }


  },
  actions: {
    getDataFuncsStatus ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('clearFunc', '')
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryFunc', requestObject)
        } else {
          param = getters.QueryFuncs
        }
        //  console.log(localStorage);

        axios.get(r('func.index'), {
          params: {
            method: 'getFuncStatuss',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFunc', response.data.data)
            commit('setFuncActive', response.data.active)
            commit('setTotalFunc', response.data.total)
          }


        })

      })
    },
    getDataFuncs ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('clearFunc', '')
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryFunc', requestObject)
        } else {
          param = getters.QueryFuncs
        }
        //  console.log(localStorage);

        axios.get(r('func.index'), {
          params: {
            method: 'getFuncs',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFunc', response.data.data)
            commit('setTotalFunc', response.data.total)
          }
          resolve(response.data.result)

        })

      })
    },
      getDataFuncFnss ({state, getters, commit, dispatch}, requestObject) {
        return new Promise((resolve, reject) => {
            commit('clearFunc', '')
            let param
            if (typeof requestObject !== 'undefined') {
                param = requestObject
                commit('setQueryFunc', requestObject)
            } else {
                param = getters.QueryFuncs
            }
            //  console.log(localStorage);

            axios.get(r('func.index'), {
                params: {
                    method: 'getDataFuncFnss',
                    param
                }
            }).then((response) => {
                if (response.data.result) {
                    commit('setFunc', response.data.data)
                    commit('setTotalFunc', response.data.total)
                }


            })

        })
    },
    getDataFuncFssp ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('clearFunc', '')
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryFunc', requestObject)
        } else {
          param = getters.QueryFuncs
        }
        axios.get(r('func.index'), {
          params: {
            method: 'getDataFuncFssp',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFunc', response.data.data)
            commit('setTotalFunc', response.data.total)
          }
        })
      })
    },


    getFuncsArrToShedule ({state, getters, commit, dispatch}) {
      return new Promise((resolve, reject) => {
        axios.get(r('func.index'), {
          params: {
            method: 'getFuncsToShedule'
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFuncsArrToShedule', response.data.data)
            commit('setTotalFuncToShedule', response.data.total)
          }
        })

      })
    },

      cloneFunc ({state, getters, commit, dispatch}, requestObject) {
          return new Promise((resolve, reject) => {
              axios.post(r('func.update'), {
                  params: {
                      method: 'cloneFunc',
                      param: requestObject
                  }
              }).then((response) => {
                  if (response.data.result) {
                      dispatch('getDataFuncs')
                  }
                  resolve(response.data.result)


              })

          })
      },
    deleteFunc ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('func.update'), {
          params: {
            method: 'deleteFunc',
            param: requestObject
          }
        }).then((response) => {
          dispatch('getDataFuncs')
          resolve(response.data.result)


        })

      })
    },

    saveFunc ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('func.update'), {
          params: {
            method: 'saveFunc',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {

          }
          resolve(response.data.result)


        })

      })
    },

    getFuncPeremens ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('func.index'), {
          params: {
            method: 'getFuncPeremens',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    getFuncPeremensDateControl ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('func.index'), {
          params: {
            method: 'getFuncPeremensDateControl',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },

  }


}

