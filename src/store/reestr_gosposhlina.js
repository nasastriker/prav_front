import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    reestrsGosposhlina:[],
    sudPpReestrGosposhlina:[],
    total:0,
    totalonce:0
  },
  getters: {
    ReestrsGosposhlinaArr: state => {
      return state.reestrsGosposhlina
    },
    SudPpReestrGosposhlina: state => {
      return state.sudPpReestrGosposhlina
    },
    TotalReestrsGosposhlina: state => {
      return state.total
    },
    TotalReestrsGosposhlinaOnce: state => {
      return state.totalonce
    }
  },
  mutations: {
    setSudPpReestrGosposhlina (state, payload) {
      state.sudPpReestrGosposhlina = payload
    },
    setReestrsGosposhlinaArr (state, payload) {
      state.reestrsGosposhlina = payload
    },

    setTotalReestrsGosposhlina (state, payload) {
      state.total = payload
    },
    setTotalReestrsGosposhlinaOnce (state, payload) {
      state.totalonce = payload
    }
  },
  actions: {
    getDataReestrsGosposhlinaOnce ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {

        axios.get(r('SudPpReestr.index'), {
          params: {
            method: 'getReestrsGosposhlinaOnce',
            param:requestObject
          }
        }).then((response) => {
          commit('setTotalReestrsGosposhlinaOnce', response.data.total)
          commit('setSudPpReestrGosposhlina', response.data.data)
          resolve(response.data)
        })
      })
    },
    getDataReestrsGosposhlina ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        commit('setReestrsGosposhlinaArr', [])
        commit('setTotalReestrsGosposhlina', 0)
        // let param
        // if (typeof requestObject !== 'undefined') {
        //   param = requestObject
        //   commit('setQueryReestrs', requestObject)
        // } else {
        //   param = getters.QueryUsers
        // }
        // //  console.log(localStorage);

        axios.get(r('SudPpReestr.index'), {
          params: {
            method: 'getReestrsGosposhlina',
            param:requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setReestrsGosposhlinaArr', response.data.data)
            commit('setTotalReestrsGosposhlina', response.data.total)
          }


        })

      })
    },
    saveImportGosposhlinaFile ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('document', requestObject.file[0])
        formData.append('import_type', requestObject.import_type)
        // formData.append('import_his', requestObject.import_his);
        // formData.append('import_obr', requestObject.import_obr);
        formData.append('id_recover', requestObject.id_recover)
        formData.append('vid_recover', requestObject.vid_recover)
        // formData.append('onlyBic', requestObject.onlyBic);

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`


        axios.post('/importGosposhlineReestr/document',
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
    }
  }
}