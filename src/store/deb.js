import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    mesto_id_list:[],
    showStatus:true,
    debAll:[],
    debAllDebtor:[],
    debAllType:[],
    typeDebtorInDebtorCreditArr:[],
    vidRecoverInDebtorCreditArr:[],
    responsibleUserInDebtorList:[],
    deb:{
      debtor:{},
      debtorCredit:{},
      debtorCreditSud:{},
      debtorCreditDop:{},
      recover:{},
      soglashenie:{},
      statusLast:0,
      statusLastOld:0,
      sudOrder:{},
      dataAnswer:{},
      data_return_zay_sp:null,
      data_refusal_sp:null,
      data_otkz:null

    }


  },
  getters: {
    MestoIdList:state => {
      return state.mesto_id_list
    },
    MestoIdListAll:state => {
      let arr = [{id:-1, name:'Все'}, {id:-2, name:'Неизвестно'}]
      arr=arr.concat(state.mesto_id_list)
        return arr
    },
    VidRecoverInDebtorCreditArr:state => {
      return state.vidRecoverInDebtorCreditArr
    },

    TypeDebtorInDebtorCreditArr:state => {
      return state.typeDebtorInDebtorCreditArr
    },
    ResponsibleUserInDebtorList:state => {
      return state.responsibleUserInDebtorList
    },
    ResponsibleUserInDebtorListArr:state => {
      const arr = [{id:-1, name:'Все'}]
      for (let i = 0; i < state.responsibleUserInDebtorList.length; i++) arr.push(state.responsibleUserInDebtorList[i])
      return arr
    },
    DebAll: state => {
      return state.debAll
    },
    DebAllDebtor: state => {
      return state.debAllDebtor
    },
    DebAllType: state => {
      return state.debAllType
    },
    ShowStatusChange: state => {
      return state.showStatus
    },
    Deb: state => {
      // if (typeof state.deb.debtorCredit !== 'undefined') {
      //   if (state.deb.debtorCredit.dub_text == '' || state.deb.debtorCredit.dub_text == null) {
      //     state.deb.debtorCredit.dub_text = 'Согласно устного ответа представителя Почта РФ отправление утеряно при передаче курьеру.'
      //
      //   }
      //
      // }
      if (typeof state.deb.debtorCredit !== 'undefined') {

        if (state.deb.debtorCredit.data_otkz != null) {
          if (state.deb.debtorCredit.data_otkz.length > 0) {
            state.deb.data_otkz =  state.deb.debtorCredit.data_otkz[state.deb.debtorCredit.data_otkz.length - 1]
          }


        }
      }

      if (typeof state.deb.debtorCredit !== 'undefined') {

        if (state.deb.debtorCredit.data_refusal_sp != null) {
          if (state.deb.debtorCredit.data_refusal_sp.length > 0) {

            state.deb.data_refusal_sp = state.deb.debtorCredit.data_refusal_sp[state.deb.debtorCredit.data_refusal_sp.length - 1]
          }


        }
      }

      if (typeof state.deb.debtorCredit !== 'undefined') {

        if (state.deb.debtorCredit.data_opr_opiska != null) {
          if (state.deb.debtorCredit.data_opr_opiska.length > 0) {

            state.deb.data_opr_opiska = state.deb.debtorCredit.data_opr_opiska[state.deb.debtorCredit.data_opr_opiska.length - 1]
          }


        }
      }
      if (typeof state.deb.debtorCredit !== 'undefined') {

        if (state.deb.debtorCredit.data_return_zay_sp != null) {
          if (state.deb.debtorCredit.data_return_zay_sp.length > 0) {
            if (state.deb.debtorCredit.data_return_zay_sp[state.deb.debtorCredit.data_return_zay_sp.length - 1] != null) {
              if (typeof state.deb.debtorCredit.data_return_zay_sp[state.deb.debtorCredit.data_return_zay_sp.length - 1].date !== 'undefined') {
                state.deb.data_return_zay_sp =  state.deb.debtorCredit.data_return_zay_sp[state.deb.debtorCredit.data_return_zay_sp.length - 1].date
              } else {
                state.deb.data_return_zay_sp = null
              }

            }

          }


        }
      }
      if (typeof state.deb.debtorCredit !== 'undefined') {

        if (state.deb.debtorCredit.data_opr_dublicat != null) {
          if (state.deb.debtorCredit.data_opr_dublicat.length > 0) {
            if (state.deb.debtorCredit.data_opr_dublicat[state.deb.debtorCredit.data_opr_dublicat.length - 1] != null) {
              if (typeof state.deb.debtorCredit.data_opr_dublicat[state.deb.debtorCredit.data_opr_dublicat.length - 1].date !== 'undefined') {
                state.deb.data_opr_dublicat =  state.deb.debtorCredit.data_opr_dublicat[state.deb.debtorCredit.data_opr_dublicat.length - 1].date
              } else {
                state.deb.data_opr_dublicat = null
              }

            }

          }


        }
      }

      return state.deb
    }

  },
  mutations: {
    setMestoIdList (state, payload) {
      state.mesto_id_list = payload
    },
    setVidRecoverInDebtorCreditArr (state, payload) {
      state.vidRecoverInDebtorCreditArr = []
      state.vidRecoverInDebtorCreditArr = payload
    },

    setTypeDebtorInDebtorCreditArr (state, payload) {
      state.typeDebtorInDebtorCreditArr = []
      state.typeDebtorInDebtorCreditArr = payload
    },
    setResponsibleUserInDebtorList (state, payload) {
      state.responsibleUserInDebtorList = []
      state.responsibleUserInDebtorList = payload
    },

    setShowStatusChange (state, payload) {

      state.showStatus = payload

    },
    setDebAll (state, payload) {

      state.debAll = payload


    },
    setDebAllDebtor (state, payload) {

      state.debAllDebtor = payload


    },
    setDebAllType (state, payload) {

      state.debAllType = payload


    },
    setDeb (state, payload) {

      state.deb = payload
      if (typeof state.deb.debtorCredit !== 'undefined') {
        state.deb.statusLast = state.deb.debtorCredit.id_status
        state.deb.statusLastOld = state.deb.debtorCredit.id_status

      }

    },
    clearDebAll (state) {
      state.debdebAll = []
    },

    clearDeb (state) {
      state.deb = {
        debtor:{},
        statusLast:0,
        statusLastOld:0,
        debtorCredit:{},
        debtorCreditSud:{},
        debtorCreditDop:{},
        recover:{},
        soglashenie:{},
        sudOrder:{},
        dataAnswer:{}
      }
      state.debAll = []
      state.debAllDebtor = []
    }


  },
  actions: {

    getResponsibleUserInDebtorList ({state, getters, commit, dispatch}) {
      return new Promise((resolve, reject) => {
        axios.get(r('debtorAll.index'), {
          params: {
            method: 'getResponsibleUserInDebtorList'

          }
        }).then((response) => {
          commit('setResponsibleUserInDebtorList', response.data.data)
          resolve(true)
        })
      })
    },
    getTypeDebtorInDebtorCreditArr ({state, getters, commit, dispatch}) {
      return new Promise((resolve, reject) => {
        axios.get(r('debtorAll.index'), {
          params: {
            method: 'getTypeDebtorInDebtorCreditArr'

          }
        }).then((response) => {
          commit('setTypeDebtorInDebtorCreditArr', response.data)
          resolve(true)
        })
      })
    },
    getVidRecoverInDebtorCreditArr ({state, getters, commit, dispatch}) {
      return new Promise((resolve, reject) => {
        axios.get(r('debtorAll.index'), {
          params: {
            method: 'getVidRecoverInDebtorCreditArr'
          }
        }).then((response) => {
          commit('setVidRecoverInDebtorCreditArr', response.data)
        })
      })
    },

    getDebtorOnlyCred ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('clearDeb')

        axios.get(r('debtorAll.index'), {
          params: {
            method: 'getDebtorOnlyCred',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setDeb', response.data.data)
          }


        })

      })
    },
    getDebtorOnly ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('clearDeb')

        axios.get(r('debtorAll.index'), {
          params: {
            method: 'getDebtorOnly',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setDeb', response.data.data)
            commit('setDebAll', response.data.arrCredit)
            commit('setDebAllDebtor', response.data.arrDeb)
            commit('setDebAllType', response.data.arrCreditType)
          }


        })

      })
    },
    getDataDebtorsByIdAll ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('clearDebAll')

        axios.get(r('debtorAll.index'), {
          params: {
            method: 'getDebtorByIdCreditAll',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setDebAll', response.data.data)
            commit('setDebAllDebtor', response.data.dataDeb)
          }


          resolve(response.data.result)

        })

      })
    },
    getDataDebtorsByIdCalc ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('clearDeb')
        commit('clearDebAll')
        axios.get(r('debtorAll.index'), {
          params: {
            method: 'getDebtorByIdCreditCalc',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setDeb', response.data.data)
            commit('setDebAll', response.data.arrCredit)
            commit('setDebAllDebtor', response.data.arrDeb)
            commit('setDebAllType', response.data.arrCreditType)
          }


          resolve(response.data.result)

        })

      })
    },
    getDataDebtorsById ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('clearDeb')
        commit('clearDebAll')
        axios.get(r('debtorAll.index'), {
          params: {
            method: 'getDebtorByIdCredit',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setDeb', response.data.data)
            commit('setDebAll', response.data.arrCredit)
            commit('setDebAllDebtor', response.data.arrDeb)
            commit('setDebAllType', response.data.arrCreditType)
          }


          resolve(response.data.result)

        })

      })
    },
    deleteDebtor ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('debtorAll.update'), {
          params: {
            method: 'deleteDebtor',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataDebtors')
          }
          resolve(response.data.result)


        })

      })
    },
    changeDebAndDateReturnFns ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        const date = new Date()
        // console.log(state.deb.debtorCredit.date_return_fns)
        if (state.deb.debtorCredit.date_return_fns == null) {
          state.deb.debtorCredit.date_return_fns = `${date.getFullYear()  }-${  (`0${  date.getMonth() + 1}`).slice(-2)  }-${  (`0${  date.getDate()}`).slice(-2)}`

        }
        if (state.deb.debtorCredit.bank_four) {
          state.deb.debtorCredit.bank_four_check = 1
          if (state.deb.debtorCredit.bank_four_date == null) {
            state.deb.debtorCredit.bank_four_date = '2018'
          }
        }
        if (state.deb.debtorCredit.bank_one) {
          state.deb.debtorCredit.bank_one_check = 1
          if (state.deb.debtorCredit.bank_one_date == null) {
            state.deb.debtorCredit.bank_one_date = '2018'
          }
        }
        if (state.deb.debtorCredit.bank_two) {
          state.deb.debtorCredit.bank_two_check = 1
          if (state.deb.debtorCredit.bank_two_date == null) {
            state.deb.debtorCredit.bank_two_date = '2018'
          }
        }
        if (state.deb.debtorCredit.bank_three) {
          state.deb.debtorCredit.bank_three_check = 1
          if (state.deb.debtorCredit.bank_three_date == null) {
            state.deb.debtorCredit.bank_three_date = '2018'
          }
        }

        //     console.log(state.deb.debtorCredit);
        axios.post(r('debtorAll.update'), {
          params: {
            method: 'changeDeb',
            param: state.deb
          }
        }).then((response) => {
          if (response.data.result) {


          } else if (typeof state.deb.debtorCredit !== 'undefined') {
            dispatch('getDataDebtorsById', response.data.id)
          } else {
            dispatch('getDebtorOnly', response.data.id)
          }
          resolve(response.data.result)


        })

      })
    },

    changeAndCheckBankStatusDeb ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('debtorAll.update'), {
          params: {
            method: 'changeAndCheckBankStatusDeb',
            param: state.deb
          }
        }).then((response) => {
          if (response.data.result) {


          } else if (typeof state.deb.debtorCredit !== 'undefined') {
            dispatch('getDataDebtorsById', response.data.id)
          } else {
            dispatch('getDebtorOnly', response.data.id)
          }
          resolve(response.data)


        })

      })
    },
    changeAndCheckStatusDeb ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('debtorAll.update'), {
          params: {
            method: 'changeAndCheckStatusDeb',
            param: state.deb
          }
        }).then((response) => {
          if (response.data.result) {


          } else if (typeof state.deb.debtorCredit !== 'undefined') {
            dispatch('getDataDebtorsById', response.data.id)
          } else {
            dispatch('getDebtorOnly', response.data.id)
          }
          resolve(response.data)


        })

      })
    },
    deleteDebtorCredit ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('debtorAll.update'), {
          params: {
            method: 'deleteDebtorCredit',
            param: requestObject
          }
        }).then((response) => {

          resolve(response.data)


        })

      })
    },
    checkStatusDebtorCreditOpiska ({state, getters, commit, dispatch}, requestObject) {

      return new Promise((resolve, reject) => {

        state.deb.debtorCredit.sud = {...state.deb.debtorCredit.sud}
        axios.post(r('debtorAll.update'), {
          params: {
            method: 'checkStatusDebtorCreditOpiska',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataDebtorsById', requestObject)
          }

          resolve(response.data.result)

        })

      })
    },
    checkStatusDebtorCreditSa ({state, getters, commit, dispatch}, requestObject) {

      return new Promise((resolve, reject) => {

        state.deb.debtorCredit.sud = {...state.deb.debtorCredit.sud}
        axios.post(r('debtorAll.update'), {
          params: {
            method: 'checkStatusDebtorCreditSa',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataDebtorsById', requestObject)
          }

          resolve(response.data.result)

        })

      })
    },
    checkStatusDebtorCreditDublicat ({state, getters, commit, dispatch}, requestObject) {

      return new Promise((resolve, reject) => {

        state.deb.debtorCredit.sud = {...state.deb.debtorCredit.sud}
        axios.post(r('debtorAll.update'), {
          params: {
            method: 'checkStatusDebtorCreditDublicat',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataDebtorsById', requestObject)
          }

          resolve(response.data.result)


        })

      })
    },
    checkStatusDebtorCreditIsk ({state, getters, commit, dispatch}, requestObject) {

      return new Promise((resolve, reject) => {

        state.deb.debtorCredit.sud = {...state.deb.debtorCredit.sud}
        axios.post(r('debtorAll.update'), {
          params: {
            method: 'checkStatusDebtorCreditIsk',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataDebtorsById', requestObject)
          }

          resolve(response.data.result)


        })

      })
    },
    changeDeb ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        state.deb.debtorCredit.sud = {...state.deb.debtorCredit.sud}

        axios.post(r('debtorAll.update'), {
          params: {
            method: 'changeDeb',
            param: state.deb
          }
        }).then((response) => {

          if (response.data.result) {
            if (state.deb.debtorCredit.id_status != response.data.status || state.deb.statusLast != response.data.status || state.deb.statusLastOld != response.data.status) {
              commit('setShowStatusChange', false)
              state.deb.debtorCredit.id_status = response.data.status
              state.deb.statusLast = response.data.status
              state.deb.statusLastOld = response.data.status
              commit('setShowStatusChange', true)
            }

          } else if (typeof state.deb.debtorCredit !== 'undefined') {
            dispatch('getDataDebtorsById', response.data.id)
          } else {
            dispatch('getDebtorOnly', response.data.id)
          }
          resolve(response.data.result)


        })

      })
    },

    changeDebUpdate ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('debtorAll.update'), {
          params: {
            method: 'changeDeb',
            param: state.deb
          }
        }).then((response) => {
          if (response.data.result.result) {
            dispatch('getDataDebtorsById', response.data.id)

          } else if (typeof state.deb.debtorCredit !== 'undefined') {
            dispatch('getDataDebtorsById', response.data.id)
          } else {
            dispatch('getDebtorOnly', response.data.id)
          }
          resolve(response.data.result)


        })

      })
    },
    saveDebtor ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('debtorAll.update'), {
          params: {
            method: 'saveDebtor',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataDebtors')
          }
          resolve(response.data.result)


        })

      })
    },
    checkDebtorCreditDublicat ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('debtorAll.update'), {
          params: {
            method: 'checkDebtorCreditDublicat',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })

      })
    },
    getMestoIdList ({state, getters, commit, dispatch}, requestObject) {
      commit('setMestoIdList', [])
      return new Promise((resolve, reject) => {
        axios.get(r('debtorAll.index'), {
          params: {
            method: 'getMestoIdList',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setMestoIdList', response.data.data)
          }


          resolve(response.data.result)

        })

      })
    }
  }


}

