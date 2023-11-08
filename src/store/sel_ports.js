import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    total:0,
    selPortsArr:[],
    selPortsOnes: 0,
    showEditPorts:false,
    editPorts:false
  },

  getters: {
    // ...
    SelPortsArr: state => {
      return state.selPortsArr
    },
    ShowEditSelPorts: state => {
      return state.showEditPorts
    },
    SelPortsOnes: state => {
      return state.selPortsOnes
    },
    EditPorts: state => {
      return state.editPorts
    },
    TotalSelPorts: state => {
      return state.total
    }


  },
  mutations: {

    setEditPorts (state, payload) {
      state.editPorts = payload

    },
    setselPortsArr (state, payload) {
      state.selPortsArr = payload

    },
    setselPortsOnes (state, payload) {
      state.selPortsOnes = payload
    },
    setShowEditPorts (state, payload) {
      state.showEditPorts = payload

    },
    setTotalSelPorts (state, payload) {
      state.total = payload

    }

  },
  actions: {
    DeleteSelPortsOnes ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('selports.update'), {
          params: {
            method: 'DeleteSelPortsOnes',
            param: requestObject
          }
        })
      })
    },

    getSelPortsAll ({state, getters, commit, dispatch}) {
      return new Promise((resolve, reject) => {
        axios.get(r('selports.index'), {
          params: {
            method: 'getSelPortsAll'
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setselPortsArr', response.data.data)
            commit('setTotalSelPorts', response.data.total)
          } else return false
        })
      })
    }
  }
}

