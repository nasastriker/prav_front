import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        crm_sections:[],
        total:0,
        query: {},
        crm_sections_all:[],
        crm_sections_all_menu:[],
    },
    getters: {
        // ...
        CrmSectionsArr: state => {
            return state.crm_sections;
        },
        TotalCrmSections: state => {
            return state.total;
        },
        QueryCrmSections: state => {
            return state.query;
        },
        CrmSectionsAllArr: state => {
            return state.crm_sections_all;
        },
        CrmSectionsAllArrMenu: state => {
            let arr=[];
            arr.push({
                id: 0,
                name: 'Нет'
            })
            for(let i=0;i<state.crm_sections_all_menu.length;i++)
            {
                arr.push(state.crm_sections_all_menu[i])
            }
            return arr;
        },
    },
    mutations: {
        setCrmSections (state, payload) {
            state.crm_sections = payload
        },
        setQueryCrmSections (state, payload) {
            state.query = payload
        },
        setTotalCrmSections (state, payload) {
            state.total = payload
        },
        setCrmSectionsAll (state, payload) {
            state.crm_sections_all = payload
        },
        setCrmSectionsAllMenu (state, payload) {
            state.crm_sections_all_menu = payload
        },
    },
    actions: {
        getDataCrmSections({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if(typeof requestObject!="undefined"){
                    param=requestObject
                    commit('setQueryCrmSections', requestObject)
                }
                else{
                    param=getters.QueryUsers
                }
                axios.get(r("crmSections.index"), {
                    params: {
                        method: 'getCrmSections',
                        param: param
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setCrmSections', response.data.data)
                        commit('setTotalCrmSections', response.data.total)
                    }
                })
            })
        },
        saveCrmSection({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("crmSections.update"), {
                    params: {
                        method: 'saveCrmSection',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataCrmSections');
                    }
                    resolve(response.data.result)
                })
            })
        },
        saveCrmSectionAll({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("crmSections.update"), {
                    params: {
                        method: 'saveCrmSectionAll',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getCrmSectionsAlls');
                    }
                    resolve(response.data.result)
                })
            })
        },
        getCrmSectionDataInfo({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("crmSections.index"), {
                    params: {
                        method: 'getCrmSectionDataInfo',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        getCrmSectionsAlls({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("crmSections.index"), {
                    params: {
                        method: 'getCrmSectionsAlls',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setCrmSectionsAll', response.data.data_all)
                        commit('setCrmSectionsAllMenu', response.data.data_menu)
                    }
                })
            })
        },
        getCrmSectionsUser({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("crmSections.index"), {
                    params: {
                        method: 'getCrmSectionsUser',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        sectionAllToUser({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("crmSections.update"), {
                    params: {
                        method: 'sectionAllToUser',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        deleteUserCrmSection({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("crmSections.update"), {
                    params: {
                        method: 'deleteUserCrmSection',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        putAllAccessToUser({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("crmSections.update"), {
                    params: {
                        method: 'putAllAccessToUser',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        delCrmSection({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("crmSections.update"), {
                    params: {
                        method: 'delCrmSection',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        delAllAccessFromUser({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("crmSections.update"), {
                    params: {
                        method: 'delAllAccessFromUser',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        moveUpCrmSection({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("crmSections.update"), {
                    params: {
                        method: 'moveUpCrmSection',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        moveDownCrmSection({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("crmSections.update"), {
                    params: {
                        method: 'moveDownCrmSection',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
    }
}



