import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    recoverers:[],
    recoverersDogovor:[],
    total:0,
    query: {},
    recoverersNamesID:[],
    activeTabRecoverer:0,
    recoverArrList:[],
    recoverCessionAgreements:[],
    date_cession:'',


  },
  getters: {
    // ...
    RecoverDateCession: state => {
      return state.date_cession
    },
    RecoverList: state => {
      const $arr = []
        $arr.push({
            id:0,
            num:-2,
            name:'Не выбран',
            cession:-2,
            typeRecover:0
        })
        for (let i = 0; i < state.recoverArrList.length; i++) {
        if (state.recoverArrList[i].typeRecover>1)$arr.push(state.recoverArrList[i])
      }
      return $arr
    },
    RecoverCessionAgreements: state => {
      return state.recoverCessionAgreements
    },

    RecoverArrList: state => {
      const $arr = []
      $arr.push({
        id:0,
        num:-2,
        name:'Все',
        cession:-2,
        typeRecover:0
      })
      for (let i = 0; i < state.recoverArrList.length; i++) {
        $arr.push(state.recoverArrList[i])
      }
      return $arr

    },

    RecoverersArrAndAll: state => {
      const $arr = []
      for (let i = 0; i < state.recoverers.length; i++) {
        $arr.push(state.recoverers[i])
      }
      $arr.push({
        id:-2,
        name:'Все'
      })
      return $arr
    },
    RecoverersArrAndAllDogovor: state => {
      const $arr = []
      for (let i = 0; i < state.recoverers.length; i++) {
        $arr.push(state.recoverers[i])
      }
      $arr.push({
        id:-2,
        name:'Все'
      })
      return $arr
    },
    RecoverersCession: state => {
      return state.recoverers
    },
    RecoverersNamesID: state => {
      return state.recoverersNamesID
    },
    RecoverersArrOpt: state => {
        let arr=[];
        let index;
        arr.push({
            name:'Общий',
            id:-1,
        });
        for (index = 0; index < state.recoverers.length; ++index) {
            if(state.recoverers[index].cession){
                arr.push({
                    name:'Договор цессии №'+state.recoverers[index].number+' от '+state.recoverers[index].date+' Взыскатель '+state.recoverers[index].name,
                    id:state.recoverers[index].id,
                });
            }
            else{
                arr.push({
                    name:'Взыскатель '+state.recoverers[index].name,
                    id:state.recoverers[index].id,
                })

            }
        }


        return arr

    },
    RecoverersArr: state => {
      return state.recoverers
    },
    RecoverersArrDogov: state => {
      return state.recoverersDogovor
    },
    TotalRecoverers: state => {
      return state.total
    },

    QueryRecoverers: state => {
      return state.query
    }

  },
  mutations: {
    setRecoverDateCession (state, payload) {
      state.date_cession = payload

    },
    setRecoverCessionAgreements (state, payload) {
      state.recoverCessionAgreements = payload

    },


    setRecoverArrList (state, payload) {
      state.recoverArrList = payload

    },
    setRecoverers (state, payload) {
      state.recoverers = payload

    },
    setRecoverersDogov (state, payload) {
      state.recoverersDogovor = payload

    },
    clearRecover (state, payload) {
      state.recoverers = []
      state.total = 0
      state.query = {}

    },
    clearRecoverDogov (state, payload) {
      state.recoverersDogovor = []


    },
    setQueryRecoverers (state, payload) {
      state.query = payload

    },
    setRecoverersNamesID (state, payload) {
      state.recoverersNamesID = payload


    },

    setTotalRecoverers (state, payload) {
      state.total = payload

    }

  },
  actions: {
    getRecoverCessionAgreements ({state, getters, commit, dispatch}, requestObject = null) {
      return new Promise((resolve, reject) => {
        commit('setRecoverCessionAgreements', [])

        axios.get(r('recoverer.index'), {
          params: {
            method: 'getRecoverCessionAgreements',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setRecoverCessionAgreements', response.data.data)
          }
          resolve(response.data)
        })

      })
    },


    getRecoverArrList ({state, getters, commit, dispatch}, requestObject = null) {
      return new Promise((resolve, reject) => {
        commit('setRecoverArrList', [])

        axios.get(r('recoverer.index'), {
          params: {
            method: 'getRecoverArrList',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setRecoverArrList', response.data.data)
          }
          resolve(response.data)
        })

      })
    },

    getRecoverersNamesID ({state, getters, commit, dispatch}) {
      return new Promise((resolve, reject) => {
        axios.get(r('recoverer.index'), {
          params: {
            method: 'getRecoverersNamesID'
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setRecoverersNamesID', response.data.data)
          }
        })
      })
    },

    getDataRecoverers ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setRecoverers', [])
        commit('setTotalRecoverers', 0)
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryRecoverers', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('recoverer.index'), {
          params: {
            method: 'getRecoverers',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setRecoverers', response.data.data)
            commit('setTotalRecoverers', response.data.total)
          }

          resolve(response)


        })

      })
    },
    getDataRecoverersAndPravezCess ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('clearRecover', '')
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryRecoverers', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('recoverer.index'), {
          params: {
            method: 'getDataRecoverersAndPravezCess',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setRecoverers', response.data.data)
            commit('setTotalRecoverers', response.data.total)
          }

          resolve(response)


        })

      })
    },
    getDataRecoverersAndPravez ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('clearRecover', '')
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryRecoverers', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('recoverer.index'), {
          params: {
            method: 'getDataRecoverersAndPravez',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setRecoverers', response.data.data)
            commit('setTotalRecoverers', response.data.total)
          }


        })

      })
    },
    getDataReestrsAndPravDogovor ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('clearRecover', '')
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryRecoverers', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('recoverer.index'), {
          params: {
            method: 'getDataReestrsAndPravDogovor',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setRecoverers', response.data.data)
            commit('setTotalRecoverers', response.data.total)
          }


        })

      })
    },

      getAllRecovers ({state, getters, commit, dispatch}, requestObject) {
          return new Promise((resolve, reject) => {
              commit('clearRecover', '')
              let param
              if (typeof requestObject !== 'undefined') {
                  param = requestObject
                  commit('setQueryRecoverers', requestObject)
              } else {
                  param = getters.QueryUsers
              }
              //  console.log(localStorage);

              axios.get(r('recoverer.index'), {
                  params: {
                      method: 'getAllRecovers',
                      param
                  }
              }).then((response) => {
                  if (response.data.result) {
                      commit('setRecoverers', response.data.data)
                      commit('setTotalRecoverers', response.data.total)
                  }


              })

          })
      },

      getDataReestrsAndPrav ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('clearRecover', '')
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryRecoverers', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('recoverer.index'), {
          params: {
            method: 'getDataReestrsAndPrav',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setRecoverers', response.data.data)
            commit('setTotalRecoverers', response.data.total)
          }


        })

      })
    },
    getDataReestrsAndCessionDogov ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('clearRecoverDogov', '')
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryRecoverers', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('recoverer.index'), {
          params: {
            method: 'getRecoverersAndCessions',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setRecoverersDogov', response.data.data)
          }


        })

      })
    },
    getDataReestrsAndCession ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('clearRecover', '')
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryRecoverers', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('recoverer.index'), {
          params: {
            method: 'getRecoverersAndCessions',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setRecoverers', response.data.data)
            commit('setTotalRecoverers', response.data.total)
          }
            resolve(response.data.result)

        })

      })
    },
    cloneRecoverer ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('recoverer.update'), {
          params: {
            method: 'cloneRecoverer',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataRecoverers')
          }
          resolve(response.data.result)


        })

      })
    },
    deleteRecoverer ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('recoverer.update'), {
          params: {
            method: 'deleteRecoverer',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataRecoverers')
          }
          resolve(response.data.result)


        })

      })
    },
    saveRecoverer ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('recoverer.update'), {
          params: {
            method: 'saveRecoverer',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataRecoverers')
          }
          resolve(response.data.result)


        })

      })
    },
    saveRecovererDocument ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        //    console.log(requestObject);
        formData.append('document', requestObject.file[0])
        formData.append('id_recover', requestObject.id_recover)
        formData.append('type', requestObject.type)
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        axios.post('/recover/post-document',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then((response) => {
          if (response.data.result) {
            dispatch('getDataRecoverers')

          }
          resolve(response.data.result)
        })

      })
    },

    getRecoverDateCession ({state, getters, commit, dispatch}, requestObject) {
      commit('setRecoverDateCession', null)
      return new Promise((resolve, reject) => {
        axios.get(r('recoverer.index'), {
          params: {
            method: 'getRecoverDateCession',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setRecoverDateCession', response.data.data)
          }
        })
      })
    },
    getCodeForEnterGuRecoverer ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('recoverer.index'), {
          params: {
            method: 'getCodeForEnterGuRecoverer',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data);
        })
      })
    },

  }


}

