import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    reestrsPayment:[],
    total:0,
    query: {},
    reestrsPaymentShow:[],
    reestrsPaymentName:[]

  },
  getters: {
    // ...
    ReestrsPaymentArrName: state => {
      const arr = []
      for (let i = 0; i < state.reestrsPayment.length; i++) {
        arr.push(
          { name:state.reestrsPayment[i].name_recover,
            show:true


          }
        )


      }

      arr.__proto__.unique = function () {

        return this.filter(function (value, index, _this) {

          return _this.indexOf(value) === index

        })

      }
      state.reestrsPaymentName = arr.unique()
      return arr.unique()
    },
    ReestrsPaymentArr: state => {
      return state.reestrsPayment
    },
    ReestrsPaymentArrShow: state => {

      return state.reestrsPaymentShow
    },
    TotalReestrsPayment: state => {
      return state.total
    },

    QueryReestrsPayment: state => {
      return state.query
    }

  },
  mutations: {
    hideReestr (state, payload) {
      state.reestrsPaymentName[payload].show = !state.reestrsPaymentName[payload].show
      const arr = []
      for (let i = 0; i < state.reestrsPayment.length; i++) {
        for (let a = 0; a < state.reestrsPaymentName.length; a++) {
          if (state.reestrsPaymentName[a].name == state.reestrsPayment[i].name_recover) {
            if (state.reestrsPaymentName[a].show) {
              arr.push(
                state.reestrsPayment[i]
              )
            }
          }
        }


      }
      state.reestrsPaymentShow = arr
    },
    setReestrsPayment (state, payload) {
      state.reestrsPayment = payload
      state.reestrsPaymentShow = payload

    },
    setQueryReestrsPayment (state, payload) {
      state.query = payload

    },
    setTotalReestrsPayment (state, payload) {
      state.total = payload

    }

  },
  actions: {
    savePaymentFile ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('document', requestObject.file[0])
        formData.append('import_type', requestObject.import_type)
        formData.append('import_his', requestObject.import_his)
        formData.append('import_obr', requestObject.import_obr)
        formData.append('import_obr3', requestObject.import_obr3)
        formData.append('id_recover', requestObject.id_recover)
        formData.append('vid_recover', requestObject.vid_recover)
        formData.append('onlyBic', requestObject.onlyBic)

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`


        axios.post('/payment/document',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then((response) => {
          if (response.data.result) {
            dispatch('getDataReestrsPayment')

          }
          resolve(response.data)
        }).catch(error => {
          resolve(error)

        })

      })
    },
    getDataReestrsPayment ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryReestrsPayment', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('reestrPayment.index'), {
          params: {
            method: 'getReestrsPayment',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setReestrsPayment', response.data.data)
            commit('setTotalReestrsPayment', response.data.total)
          }


        })

      })
    },
    deleteReestrPayment ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('reestrPayment.update'), {
          params: {
            method: 'delete',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataReestrsPayment')
          }
          resolve(response.data)


        })

      })
    }

  }


}

