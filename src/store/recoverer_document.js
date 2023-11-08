import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        recoverDocument:[],
        total:0,
        query: {}



    },
    getters: {
        QueryRecoverDocuments: state => {
            return state.query;
        },
        RecoverDocumentsArr: state => {
            return state.recoverDocument;
        },
        TotalRecoverDocuments: state => {
            return state.total;
        },



    },
    mutations: {
        setRecoverDocument (state, payload) {
            state.recoverDocument = payload

        },
        clearRecoverDocument(state, payload) {
            state.recoverDocument = []
            state.total = 0
            state.query ={}

        },
        setQueryRecoverDocument (state, payload) {
            state.query = payload

        },
        setTotalRecovererDocument (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataRecoverDocuments({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('clearRecoverDocument', '')
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryRecoverDocument', requestObject)
                }
                else{
                    param=getters.QueryRecoverDocuments
                }
                //  console.log(localStorage);

                axios.get(r("recoverDocument.index"), {
                    params: {
                        method: 'getRecoverDocuments',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setRecoverDocument', response.data.data)
                        commit('setTotalRecovererDocument', response.data.total)
                    }




                })

            })
        },

        deleteRecoverDocument({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("recoverDocument.update"), {
                    params: {
                        method: 'deleteRecoverDocument',
                        param: requestObject
                    }
                }).then((response) => {

                    resolve(response.data.result)


                })

            })
        },

        saveRecoverDocument({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let formData = new FormData();
            //    console.log(requestObject);
                formData.append('document', requestObject.file[0]);
                formData.append('id_recover', requestObject.id_recover);
                formData.append('type', requestObject.type);
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                axios.post( '/recover/document',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((response) => {

                    resolve(response.data.result)
                })

            })
        },

    }



}



