import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        orgnDocument:[],
        total:0,
        query: {}



    },
    getters: {
        QueryOrgnDocuments: state => {
            return state.query;
        },
        OrgnDocumentsArr: state => {
            return state.orgnDocument;
        },
        TotalOrgnDocuments: state => {
            return state.total;
        },



    },
    mutations: {
        setOrgnDocument (state, payload) {
            state.orgnDocument = payload

        },
        clearOrgnDocument(state, payload) {
            state.orgnDocument = []
            state.total = 0
            state.query ={}

        },
        setQueryOrgnDocument (state, payload) {
            state.query = payload

        },
        setTotalRecovererDocument (state, payload) {
            state.total = payload

        }

    },
    actions: {
        getDataOrgnDocuments({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('clearOrgnDocument', '')
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryOrgnDocument', requestObject)
                }
                else{
                    param=getters.QueryOrgnDocuments
                }
                //  console.log(localStorage);

                axios.get(r("orgnDocument.index"), {
                    params: {
                        method: 'getOrgnDocuments',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setOrgnDocument', response.data.data)
                        commit('setTotalRecovererDocument', response.data.total)
                    }




                })

            })
        },

        deleteOrgnDocument({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("orgnDocument.update"), {
                    params: {
                        method: 'deleteOrgnDocument',
                        param: requestObject
                    }
                }).then((response) => {

                    resolve(response.data.result)


                })

            })
        },

        saveOrgnDocument({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let formData = new FormData();
            //    console.log(requestObject);
                formData.append('document', requestObject.file[0]);
                formData.append('id_recover', requestObject.id_recover);
                formData.append('type', requestObject.type);
                formData.append('id_orgn', requestObject.id_orgn);
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                axios.post('/orgn/document',
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



