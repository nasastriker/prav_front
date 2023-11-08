import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    shablon:[],
    shablonLk:[],
    shabDebtor:[],
    shab_list:[],
    total:0,
    totalLk:0,
    query: {},
    querySearchQuery:'',
    showShabRecEditstate:false,
    editShabRecEditstate:0,
    shabPrikaz:[],
    shabIsk:[],
    stad:[],
    historyRecords:[]


  },
  getters: {
    ShabPrikaz: state => {
      return state.shabPrikaz
    },
    ShabDebtor: state => {
      return state.shabDebtor
    },
    ShabIsk: state => {
      return state.shabIsk
    },
    StadGas: state => {
      return [
        {
          id:0,
          name:'Заявление'
        },
        {
          id:1,
          name:'Госпошлина'
        },
        {
          id:2,
          name:'Дополнительный документ'
        },
        {
          id:3,
          name:'Доверенность'
        }


      ]
    },
    Stad: state => {
      return state.stad
    },
    // ...
    ShablonDocumentsArr: state => {
      return state.shablon
    },
    ShablonDocumentsArrLk: state => {
      return state.shablonLk
    },
    ShablonDocumentList: state => {
      return state.shab_list
    },
    ShablonDocumentArrGroup:state => {
      return state.shablon.filter(shab => { return shab.group_shab === 1 })
    },
    TotalShablonDocumentArrGroup:state => {
      return state.shablon.filter(shab => { return shab.group_shab === 1 }).length
    },
    ShablonDocumentsArrNotRec: state => {
      const arr = []
      for (let i = 0; i < state.shablon.length; i++) {
        if (state.shablon[i].id_recover == null && state.shablon[i].group_shab === 0) {
          arr.push(state.shablon[i])
        }


      }
      return arr
    },
    EditShabRecEdit:state => {
      return state.editShabRecEditstate
    },
    ShowShabRecEdit:state => {
      return state.showShabRecEditstate
    },
    TotalShablonDocuments: state => {
      return state.total
    },
    TotalShablonDocumentsLk: state => {
      return state.totalLk
    },
    QueryShablonDocuments: state => {
      return state.query
    },
    HistoryIskDocArr: state => {
      return state.historyRecords
    }

  },
  mutations: {
    setEditShabRecEdit (state, payload) {
      state.editShabRecEditstate = payload

    },
    setShabPrikaz (state, payload) {
      state.shabPrikaz = payload

    },
    setShabIsk (state, payload) {
      state.shabIsk = payload

    },
    setShabDebtor (state, payload) {
      state.shabDebtor = payload

    },
    setShowShabRecEdit (state, payload) {
      state.showShabRecEditstate = payload

    },
    setShablonDocuments (state, payload) {
      state.shablon = payload

    },
    setShablonDocumentsLk(state, payload) {
      state.shablonLk = payload

    },
    setTotalShablonDocumentsLk (state, payload) {
      state.totalLk = payload

    },
    setStads (state, payload) {
      state.stad = payload

    },
    setQueryShablonDocuments (state, payload) {
      state.query = payload

    },
    setTotalShablonDocuments (state, payload) {
      state.total = payload

    },
    setHistoryIskDocArr (state, payload) {
      state.historyRecords = payload

    },
    setShablonDocumentList (state, payload) {
      state.shab_list = payload

    }

  },
  actions: {
    getDataShablonDocumentRecovers ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setShablonDocuments', [])
        commit('setTotalShablonDocuments', 0)

        axios.get(r('shablonDocument.index'), {
          params: {
            method: 'getDataShablonDocumentRecovers',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setShablonDocuments', response.data.data)
            commit('setTotalShablonDocuments', response.data.total)
          }


        })

      })
    },
    getDataShablonDocuments ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setShablonDocuments', [])
        commit('setTotalShablonDocuments', 0)

        axios.get(r('shablonDocument.index'), {
          params: {
            method: 'getShablonDocuments',
            param: ''
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setShablonDocuments', response.data.data)
            commit('setTotalShablonDocuments', response.data.total)
          }


        })

      })
    },
    getDataShablonDocumentsStad ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {


        axios.get(r('shablonDocument.index'), {
          params: {
            method: 'getStads',
            param: ''
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setStads', response.data.data)

          }


        })

      })
    },
    getDataShablonDocumentsIsk ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {


        axios.get(r('shablonDocument.index'), {
          params: {
            method: 'getIsk',
            param: ''
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setShabIsk', response.data.data)

          }


        })

      })
    },
    getDataShablonDocumentsIskParam ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {


        axios.get(r('shablonDocument.index'), {
          params: {
            method: 'getIskParam',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setShabIsk', response.data.data)

          }


        })

      })
    },
    getDataShablonDocumentsDebtorParam ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {


        axios.get(r('shablonDocument.index'), {
          params: {
            method: 'getDebtorParam',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setShabDebtor', response.data.data)

          }


        })

      })
    },
    getDataShablonDocumentsPrikaz ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {


        axios.get(r('shablonDocument.index'), {
          params: {
            method: 'getPrikaz',
            param: ''
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setShabPrikaz', response.data.data)

          }


        })

      })
    },
    getDataShablonDocumentsLk ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setShablonDocuments', [])
        commit('setTotalShablonDocuments', 0)
        axios.get(r('shablonDocument.index'), {
          params: {
            method: 'getDataShablonDocumentsLk',
            param: ''
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setShablonDocumentsLk', response.data.data)
            commit('setTotalShablonDocumentsLk', response.data.total)
          }


        })

      })
    },
    saveShablonDocument ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        console.log(requestObject)
        formData.append('document', requestObject.file[0])
        formData.append('id', requestObject.id)
        formData.append('data', JSON.stringify(requestObject.data))
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        axios.post('/shablon/post-document',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then((response) => {
          if (response.data.result) {
            dispatch('getDataShablonDocuments')

          }
          resolve(response.data)
        })

      })
    },
    deleteShablonDocumentRecover ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('shablonDocument.update'), {
          params: {
            method: 'deleteShablonDocument',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {

          }
          resolve(response.data.result)


        })

      })
    },
    deleteShablonDocument ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('shablonDocument.update'), {
          params: {
            method: 'deleteShablonDocument',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataShablonDocuments')
          }
          resolve(response.data.result)


        })

      })
    },
    cloneShablonDocument ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('shablonDocument.update'), {
          params: {
            method: 'cloneShablonDocument',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataShablonDocuments')
          }
          resolve(response.data.result)


        })

      })
    },
    getHistoryIskDocs ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('shablonDocument.index'), {
          params: {
            method: 'getHistoryIskDocs',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setHistoryIskDocArr', response.data.data)
          }
        })
      })
    },
    getShablonDocumentList ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setShablonDocumentList', [])
        axios.get(r('shablonDocument.index'), {
          params: {
            method: 'getShablonDocumentList',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setShablonDocumentList', response.data.data)
          }
        })
      })
    },
    getShablonName ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('shablonDocument.index'), {
          params: {
            method: 'getShablonName',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            resolve(response.data.data)
          }
        })
      })
    }


  }


}

