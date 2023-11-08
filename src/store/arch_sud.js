import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)

function randomString(i) {
  var rnd = '';
  while (rnd.length < i)
    rnd += Math.random().toString(36).substring(2);
  return rnd.substring(0, i);
};
export default {
  state: {
    data:[],
    taskSud:[],
    flagFind:false,
    total:0,
    find:'',
    totalSudArr:0,
    query: {},
    print_filter_items: {}


  },
  getters: {
    TaskSudArr: state => {
      return state.taskSud
    },
    TotalSudArr: state => {
      return state.totalSudArr
    },
    // ...
    ArchSudsArr: state => {
      return state.data
    },
    TotalArchSuds: state => {
      return state.total
    },
    SudFindFlag: state => {
      return state.flagFind;
    },

    QueryArchSuds: state => {
      return state.query
    },
    OtpravFilterArr: state => {
      const $arr = []
      $arr.push({ id:2, name:'На отправку' })
      $arr.push({ id:1, name:'На печать' })
      return $arr
    },

    PrintFilterArr: state => {
      const $arr = []
      $arr.push({ id:'all', name:'Все' })
      $arr.push({ id:2, name:'Распечатано' })
      $arr.push({ id:1, name:'Не распечатано' })
      return $arr
    }

  },
  mutations: {
    setArchSuds (state, payload) {
      state.data = payload

    },
    setSudFindFlag(state, payload) {
      state.flagFind = payload

    },
    setTaskSuds (state, payload) {
      state.taskSud = payload

    },
    setTotalSudArr (state, payload) {
      state.totalSudArr = payload

    },
    setQueryArchSuds (state, payload) {
      state.query = payload

    },
    setTotalArchSuds (state, payload) {
      state.total = payload

    }

  },
  actions: {
      getTaskSuds: function ({state, getters, commit, dispatch}, requestObject) {
          return new Promise((resolve, reject) => {
              commit('setTaskSuds', [])
              commit('setTotalSudArr', 0)
              let param = null
              if (typeof requestObject !== 'undefined') {
                  param = requestObject
              }
              axios.get(r('archSud.index'), {
                  params: {
                      method: 'getTaskhSud',
                      param: param
                  }
              }).then((response) => {
                  if (response.data.result) {
                      commit('setTaskSuds', response.data.data)
                      commit('setTotalSudArr', response.data.total)
                  }


              })

          })
      },

    startJobSudMonday ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('archSud.index'), {
          params: {
            method: 'startJobSudMonday',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data.result)
        })
      })
    },


    getDataArchSuds ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setSudFindFlag', true)
        commit('setArchSuds', [])
        commit('setTotalArchSuds', 0)
        let str=randomString(20);
        state.find=str;

        axios.get(r('archSud.index'), {
          params: {
            method: 'getArchSuds',
            param:requestObject
          }
        }).then((response) => {
          if(str==state.find) {
            commit('setSudFindFlag', false)
          }
          if(response.data.result){
            if(str==state.find){
              commit('setArchSuds', response.data.data)
              commit('setTotalArchSuds', response.data.total)
              resolve(response.data.result)
            }

          }




        })

      })
    },
    getDataArchSudSends ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setArchSuds', [])
        commit('setTotalArchSuds', 0)
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryArchSuds', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('archSud.index'), {
          params: {
            method: 'getArchSudSends',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setArchSuds', response.data.data)
            commit('setTotalArchSuds', response.data.total)
          }


        })

      })
    }

  }


}

