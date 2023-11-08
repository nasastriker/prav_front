import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);

function randomString(i) {
    var rnd = '';
    while (rnd.length < i)
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};

export default {
    state: {
        data: [],
        total: 0,
        query: {
            offset: 0,
            limit: 10
        },
        types_dc_documents: [],
        total_types: 0,
        exts_dc_documents: []


    },
    getters: {
        // ...
        DebtorCreditDocumentsArr: state => {
            return state.data;
        },
        TotalDebtorCreditDocuments: state => {
            return state.total;
        },

        QueryDebtorCreditDocuments: state => {
            return state.query;
        },
        TypesDcDocuments: state => {
            return state.types_dc_documents;
        },
        TypesDcDocumentsDebtor: state => {
            let arr=[];
            for(let a=0; a<state.types_dc_documents.length; a++){
                if(state.types_dc_documents[a].rec==0){
                    arr.push(state.types_dc_documents[a])
                }

            }
            return arr;
        },
        TypesDcDocumentsDebtorAll: state => {
            let arr=[];
            arr.push({id: 'all', name: 'Все'})
            for(let a=0; a<state.types_dc_documents.length; a++){
                if(state.types_dc_documents[a].rec==0){
                    arr.push(state.types_dc_documents[a])
                }

            }
            return arr;
        },
        TypesDcDocumentsRec: state => {
            let arr=[];
            for(let a=0; a<state.types_dc_documents.length; a++){
                if(state.types_dc_documents[a].rec==1){
                    arr.push(state.types_dc_documents[a])
                }

            }
            return arr;

        },
        OrgnDcDocumentsRec: state => {
            let arr=[];
            for(let a=0; a<state.types_dc_documents.length; a++){
                if(state.types_dc_documents[a].rec==2){
                    arr.push(state.types_dc_documents[a])
                }

            }
            return arr;

        },
        TotalTypesDocs: state => {
            return state.total_types;
        },
        ExtsDcDocuments: state => {
            return state.exts_dc_documents;
        },
    },
    mutations: {

        setDebtorCreditDocuments(state, payload) {
            state.data = payload

        },
        setQueryDebtorCreditDocuments(state, payload) {
            state.query = payload

        },
        setTotalDebtorCreditDocuments(state, payload) {
            state.total = payload

        },
        setTypesDcDocuments(state, payload) {
            state.types_dc_documents = payload
        },
        setExtsDcDocuments(state, payload) {
            state.exts_dc_documents = payload
        }

    },
    actions: {
        getDataDebtorCreditDocuments({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                if (typeof requestObject != 'undefined') {
                    state.find = requestObject;
                }
                commit('setDebtorCreditDocuments', [])
                commit('setTotalDebtorCreditDocuments', 0)

                axios.get(r("debtorCreditDocument.index"), {
                    params: {
                        method: 'getDebtorCreditDocuments',
                        param: state.find
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setDebtorCreditDocuments', response.data.data)
                        commit('setTotalDebtorCreditDocuments', response.data.total)

                    }


                })

            })
        },
        deleteDebtorCreditDocument({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("debtorCreditDocument.update"), {
                    params: {
                        method: 'deleteDebtorCreditDocument',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        dispatch('getDataDebtorCreditDocuments');
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveDebtorCreditDocumentReestr({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let formData = new FormData();
                formData.append('document', requestObject.file[0]);
                formData.append('id', requestObject.id);
                formData.append('type', requestObject.type);
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;


                axios.post('/credit/documentReestr',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((response) => {
                    if (response.data.result) {

                    }
                    resolve(response.data)
                })

            })
        },
        saveDebtorCreditDocument({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let formData = new FormData();
                formData.append('document', requestObject.file);
                formData.append('name', requestObject.name);
                formData.append('id', requestObject.id);
                formData.append('type', requestObject.type);
                formData.append('many', requestObject.many);
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;


                axios.post('/credit/document',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((response) => {
                    if (response.data.result) {
                        dispatch('getDataDebtorCreditDocuments');

                    }
                    resolve(response.data)
                }).catch(error => {

                    reject(error)
                });

            })
        },
        getTypesDcDocuments({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("debtorCreditDocument.index"), {
                    params: {
                        method: 'getTypesDcDocuments',
                        param: ''
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setTypesDcDocuments', response.data.types)
                    }
                })
            })
        },
        deleteTypeDocument({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("debtorCreditDocument.update"), {
                    params: {
                        method: 'deleteTypeDocument',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        dispatch('getTypesDcDocuments');
                    }
                    resolve(response.data.result)
                })
            })
        },
        saveTypeDocument({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("debtorCreditDocument.update"), {
                    params: {
                        method: 'saveTypeDocument',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        dispatch('getTypesDcDocuments');
                    }
                    resolve(response.data)
                })

            })
        },
        getExtsDcDocuments({state, getters, commit, dispatch}, requestObject) {
            axios.get(r("debtorCreditDocument.index"), {
                params: {
                    method: 'getExtsDcDocuments',
                    param: ''
                }
            }).then((response) => {
                if (response.data.result) {
                    commit('setExtsDcDocuments', response.data.exts)
                }
            })
        }

    }


}



