import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    data:[],
    jobFns:[],
    total:0,
    query: {},
    fns_work_loading_flag: false,
    loadFns:false


  },
  getters: {
    JobFnssArr: state => {
      //  console.log(state.data)
      return state.jobFns
    },
    FnssArr: state => {
      //  console.log(state.data)
      return state.data
    },
    TotalFnss: state => {
      return state.total
    },
    LoadFns: state => {
      return state.loadFns
    },

    QueryFnss: state => {
      return state.query
    },
    FnsWorkLoadingFlag: state => {
      return state.fns_work_loading_flag
    }

  },
  mutations: {
    // updateDataFnsWorks(state, payload) {
    //
    //     for(let i=0;i<state.data.length;i++){
    //
    //         if(state.data[i].id==payload.id){
    //
    //             state.data[i]=payload
    //
    //             console.log(state.data[i]);
    //         }
    //     }
    //  //   state.data = payload
    //
    // },
    setFnss (state, payload) {
      state.data = payload

    },
    setJobFnss (state, payload) {
      state.jobFns = payload

    },
    setQueryFnss (state, payload) {
      state.query = payload

    },
    setLoadFns (state, payload) {
      state.loadFns = payload

    },
    setTotalFnss (state, payload) {
      state.total = payload

    }

  },
  actions: {
    updateDataFnsWorks ({state, getters, commit, dispatch}, payload) {
      return new Promise((resolve, reject) => {
        for (let i = 0; i<state.data.length; i++) {

          if (state.data[i].id == payload.id) {

            state.data[i] = payload

            console.log(state.data[i])
          }
        }
        resolve(true)

      })
    },

    getDataFnsWorks ({state, getters, commit, dispatch}, requestObject) {
      state.fns_work_loading_flag = true
      commit('setFnss', [])
      commit('setTotalFnss', 0)
      return new Promise((resolve, reject) => {
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryFnss', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('fns.index'), {
          params: {
            method: 'getFnsWorks',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFnss', response.data.data)
            commit('setTotalFnss', response.data.total)
          } else {
            commit('setFnss', [])
            commit('setTotalFnss', 0)
          }
          state.fns_work_loading_flag = false


        })

      })
    },

    getDataFnss ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setLoadFns', true)
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryFnss', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('fns.index'), {
          params: {
            method: 'getFnss',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFnss', response.data.data)
            commit('setTotalFnss', response.data.total)
            commit('setJobFnss', response.data.jobFns)
            commit('setLoadFns', false)
          }


        })

      })
    },
    deleteFns ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        axios.post(r('fns.update'), {
          params: {
            method: 'deleteFns',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataFnss')
          }

          resolve(response.data.result)


        })

      })
    }
  }


}

