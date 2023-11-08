import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


// organizationVar имя Геттера маленикими буквами
// OrganizationVar имя Геттера большими буквами
// organization_var имя контроллера bbbb.index

export default {
  state: {
    organizationVarArr: [],
    total: 0,
    query:{},
    organizationVarNames:[]
  },
  getters: {
    OrganizationVarArr: state => {
      return state.organizationVarArr
    },
    OrganizationVarNames:state => {
      return state.organizationVarNames
    },
    TotalOrganizationVar: state => {
      return state.total
    },
    QueryUsersOrganizationVar: state => {
      return state.query
    }
  },
  mutations: {
    setOrganizationVarNames (state, payload) {
      state.organizationVarNames = payload

    },

    setOrganizationVarArr (state, payload) {
      state.organizationVarArr = payload

    },
    setQueryOrganizationVar (state, payload) {
      state.query = payload

    },
    setTotalOrganizationVar (state, payload) {
      state.total = payload
    }
  },
  actions: {

    getOrganizationVarNames ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        axios.get(r('organizationVar.index'), {
          params: {
            method: 'getOrganizationVarNames'
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setOrganizationVarNames', response.data.data)
          }
          resolve(response.data.result)
        })
      })
    },
    getDataOrganizationVar ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
          commit('setOrganizationVarArr', [])
          commit('setTotalOrganizationVar', 0)
        axios.get(r('organizationVar.index'), {
          params: {
            method: 'getOrganizationVarArr',
            param:requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setOrganizationVarArr', response.data.data)
            commit('setTotalOrganizationVar', response.data.total)
          }
        })
      })
    },
    saveOrganizationVar ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('organizationVar.update'), {
          params: {
            method: 'save',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            if (typeof requestObject.id_orgn!=='undefined')dispatch('getDataOrganizationVar',requestObject.id_orgn)
          }
          resolve(response.data.result)
        })
      })
    },
    getOrganizationVarOnce ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('organizationVar.index'), {
          params: {
            method: 'save',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    }
  }

}