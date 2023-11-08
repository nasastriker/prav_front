import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    count_files_not_copied: 0,
    count_files_copied: 0,
    files_not_copied: []
  },
  getters: {
    CountFilesNotCopied: state => {
      return state.count_files_not_copied
    },
    CountFilesCopied: state => {
      return state.count_files_copied
    }
  },
  mutations: {
  },
  actions: {
    importFilesFormDirectoryByExcel ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('document', requestObject.file[0])
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        axios.post('/import_folder/document',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then((response) => {
          resolve(response.data)
        }).catch(error => {
          resolve(error)
        })
      })
    },
    saveFileForImportServ ({state, getters, commit, dispatch}, requestObject) {

      return new Promise((resolve, reject) => {
        const formData = new FormData()
        console.log(requestObject)
        const files = requestObject.files
        const totalfiles = requestObject.files.length
        for (let index = 0; index < totalfiles; index++) {
          formData.append('up_files[]', requestObject.files[index])
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        axios.post('/file_for_import/post-document',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then((response) => {
          if (response.data.result === false) {
            state.count_files_not_copied = state.count_files_not_copied + 1
          } else {
            state.count_files_copied = state.count_files_copied + 1
          }
          resolve(response.data)
        })
      })
    },
    setNullCountFilesNCopied ({state, getters, commit, dispatch}, requestObject) {
      state.count_files_not_copied = 0
      state.count_files_copied = 0
    },
    saveFileForImportServDir ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        console.log(requestObject)
        const files = requestObject.files
        const totalfiles = requestObject.files.length
        const dir = requestObject.dir
        for (let index = 0; index < totalfiles; index++) {
          formData.append('up_files[]', requestObject.files[index])
        }
        formData.append('dir', dir)
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        axios.post('/file_for_import_dir/post-document',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then((response) => {
          resolve(response.data)
        })
      })
    }
  }

}

