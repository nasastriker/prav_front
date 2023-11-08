import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    organization:[],
    activeTabOrganization:0,
    organizationArr:[],
    total:0,
      organizationListFilterArr:[],
      organizationListFilterArrAll:[],
      organizationList:[],




  },
  getters: {
    // ...
      OrganizationListFilterArrAll:state => {
        return state.organizationListFilterArrAll
      },
      OrganizationListFilterArr:state => {
      return state.organizationListFilterArr
    },

    OrganizationList:state => {
        return state.organizationList
    },
      TotalOrganizationArr:state => {
      return state.total
    },
    OrganizationArr:state => {
      return state.organizationArr
    },
    OrganizationArrName:state => {
      const $arr = []

      for (let i = 0; i < state.organizationArr.length; i++) {
            $arr.push(state.organizationArr[i].name)
      }
      return $arr

    },
    OrganizationArrAddress:state => {
      const $arr = []

      for (let i = 0; i < state.organizationArr.length; i++) {
        $arr.push(state.organizationArr[i].address)
      }
      return $arr
    },
    Organization: state => {
      return state.organization
    }


  },
  mutations: {
    setTotalOrganizationArr (state, payload) {
      state.total = payload

    },
      setOrganizationList (state, payload) {
      state.organizationList = payload

    },

    setOrganizationArr (state, payload) {
      state.organizationArr = payload

    },
    setOrganization (state, payload) {
      state.organization = payload

    },
    setOrganizationListFilterArr (state, payload) {
      state.organizationListFilterArr = payload

    },
      setOrganizationListFilterArrAll (state, payload) {
          state.organizationListFilterArrAll = payload

      }
  },
  actions: {

    getOrganizationListFilterArr ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('organization.index'), {
          params: {
            method: 'getOrganizationListFilterArr'
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setOrganizationListFilterArr', response.data.data)
            commit('setOrganizationListFilterArrAll', response.data.dataAll)
          }
        })
      })
    },
 getOrganizationList ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('organization.index'), {
          params: {
            method: 'getOrganizationList'
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setOrganizationList', response.data.data)
          }
        })
      })
    },


    deleteOrganization ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('organization.index'), {
          params: {
            method: 'deleteOrganization',
            param: requestObject
          }
        }).then((response) => {
          resolve(response)
        })
      })
    },
    getDataOrganizationArr ({state, getters, commit, dispatch}, requestObject) {

      return new Promise((resolve, reject) => {


        axios.get(r('organization.index'), {
          params: {
            method: 'getOrganizationArr',
            param: ''
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setOrganizationArr', response.data.data)
            commit('setTotalOrganizationArr', response.data.total)
          }
        })
      })
    },

    getDataOrganization ({state, getters, commit, dispatch}, requestObject) {

      return new Promise((resolve, reject) => {

        let parametr = requestObject
        if (typeof parametr == 'undefined') {
          parametr = 1
        }
        axios.get(r('organization.index'), {
          params: {
            method: 'getOrganization',
            param: parametr
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setOrganization', response.data.data)

          }


        })

      })
    },
    getCodeForEnterGu ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('organization.index'), {
          params: {
            method: 'getCodeForEnterGu',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data);
        })
      })
    },



  }


}

