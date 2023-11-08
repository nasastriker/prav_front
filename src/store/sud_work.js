import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        change_id_history_list:[],
        change_id_history_loading_flag:false,
        debtor_credit_sud:{},
        judicial_hearings:[],
        judicial_hearings_loading_flag:false,
        activeTabRegSudAct:0,
        activeTabSudWork:0,
        mesto_id_items:[],
        sud_work_settings:{},

        sud_claims:[],
        total_sud_claims:0,
        sud_claims_loading_flag:false,
        sud_claim:{
            fields:{},
            offset:0,
            limit:50,
            claim_type:'fi_prikaz_claim_send_status',
        },

        sud_claim_types:[],
        check_box_list:[],
    },
    getters: {
        CheckBoxList: state => {
            return state.check_box_list;
        },
        SudClaimTypes: state => {
            return state.sud_claim_types;
        },
        SudClaim: state => {
            return state.sud_claim;
        },
        SudClaims: state => {
            return state.sud_claims;
        },
        TotalSudClaims: state => {
            return state.total_sud_claims;
        },
        SudClaimsLoadingFlag: state => {
            return state.sud_claims_loading_flag;
        },
        SudWorkSettings: state => {
            return state.sud_work_settings;
        },
        MestoIdItems: state => {
            return state.mesto_id_items;
        },
        JudicialHearingList: state => {
            return state.judicial_hearings;
        },
        JudicialHearingLoadingFlag: state => {
            return state.judicial_hearings_loading_flag;
        },
        DebtorCreditSud: state => {
            return state.debtor_credit_sud;
        },
        ChangeIdHistoryList: state => {
            return state.change_id_history_list;
        },
        ChangeIdHistoryLoadingFlag: state => {
            return state.change_id_history_loading_flag;
        },
    },
    mutations: {
        setCheckBoxList (state, payload) {
            state.check_box_list = payload
        },
        setSudClaimTypes (state, payload) {
            state.sud_claim_types = payload
        },
        setQuerySudClaimsLimit (state, payload) {
            state.sud_claim.limit = payload
        },
        setQuerySudClaimsOffset(state, payload) {
            state.sud_claim.offset = payload*state.sud_claim.limit
        },
        setSudClaims (state, payload) {
            state.sud_claims = payload
        },
        setTotalSudClaims (state, payload) {
            state.total_sud_claims = payload
        },
        setSudWorkSettings (state, payload) {
            state.sud_work_settings = payload
        },
        setMestoIdItems (state, payload) {
            state.mesto_id_items = payload
        },
        setChangeIdHistoryList (state, payload) {
            state.change_id_history_list = payload
        },
        setDebtorCreditSud (state, payload) {
            state.debtor_credit_sud = payload
        },
        setJudicialHearingList (state, payload) {
            state.judicial_hearings = payload
        },
    },
    actions: {
        getSudClaimTypes ({state, getters, commit, dispatch}, requestObject) {
            commit('setSudClaimTypes', [])
            return new Promise((resolve, reject) => {
                axios.get(r('sudWork.index'), {
                    params: {
                        method: 'getSudClaimTypes',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setSudClaimTypes', response.data.data)
                    }
                })
            })
        },
        getSudClaims ({state, getters, commit, dispatch}, requestObject) {
            state.sud_claims_loading_flag = true;
            commit('setSudClaims', [])
            commit('setTotalSudClaims', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('sudWork.index'), {
                    params: {
                        method: 'getSudClaims',
                        param: getters.SudClaim
                    }
                }).then((response) => {
                    state.sud_claims_loading_flag = false;
                    if (response.data.result) {
                        commit('setSudClaims', response.data.data)
                        commit('setTotalSudClaims', response.data.total)
                    }
                })
            })
        },
        getSudWorkSettings ({state, getters, commit, dispatch}, requestObject) {
            commit('setSudWorkSettings', [])
            return new Promise((resolve, reject) => {
                axios.get(r('setting.index'), {
                    params: {
                        method: 'getSudWorkSettings',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setSudWorkSettings', response.data.data)
                    }
                })
            })
        },
        addSrokIdPeriod({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r('sudWork.update'), {
                    params: {
                        method: 'addSrokIdPeriod',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        getMestoIdItems ({state, getters, commit, dispatch}, requestObject) {
            commit('setMestoIdItems', [])
            return new Promise((resolve, reject) => {
                axios.get(r('sudWork.index'), {
                    params: {
                        method: 'getMestoIdItems',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setMestoIdItems', response.data.data)
                    }
                    resolve(response.data)
                })
            })
        },
        getChangeIdHistoryList ({state, getters, commit, dispatch}, requestObject) {
            state.change_id_history_loading_flag = true;
            commit('setChangeIdHistoryList', [])
            return new Promise((resolve, reject) => {
                axios.get(r('sudWork.index'), {
                    params: {
                        method: 'getChangeIdHistoryList',
                        param: requestObject
                    }
                }).then((response) => {
                    state.change_id_history_loading_flag = false;
                    if (response.data.result) {
                        commit('setChangeIdHistoryList', response.data.data)
                    }
                })
            })
        },
        getHistoryPeriodData ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('sudWork.index'), {
                    params: {
                        method: 'getHistoryPeriodData',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        getDebtorCreditSud ({state, getters, commit, dispatch}, requestObject) {
            commit('setDebtorCreditSud', [])
            return new Promise((resolve, reject) => {
                axios.get(r('sudWork.index'), {
                    params: {
                        method: 'getDebtorCreditSud',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setDebtorCreditSud', response.data.data)
                    }
                    resolve(response.data.result)
                })
            })
        },
        changeDebSud({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r('sudWork.update'), {
                    params: {
                        method: 'changeDebSud',
                        param: getters.DebtorCreditSud
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        getJudicialHearings ({state, getters, commit, dispatch}, requestObject) {
            state.judicial_hearings_loading_flag = true;
            commit('setJudicialHearingList', [])
            return new Promise((resolve, reject) => {
                axios.get(r('sudWork.index'), {
                    params: {
                        method: 'getJudicialHearings',
                        param: requestObject
                    }
                }).then((response) => {
                    state.judicial_hearings_loading_flag = false;
                    if (response.data.result) {
                        commit('setJudicialHearingList', response.data.data)
                    }
                })
            })
        },
        saveJudicialHearingData({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("sudWork.update"), {
                    params: {
                        method: 'saveJudicialHearingData',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        getOneJudicialHearingData ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('sudWork.index'), {
                    params: {
                        method: 'getOneJudicialHearingData',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        deleteJudicialHearing({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("sudWork.update"), {
                    params: {
                        method: 'deleteJudicialHearing',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        deleteChangeIdHistory({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("sudWork.update"), {
                    params: {
                        method: 'deleteChangeIdHistory',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        getSettingRegSudActData ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('sudWork.index'), {
                    params: {
                        method: 'getSettingRegSudActData',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        saveSettingRegSudAct({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("sudWork.update"), {
                    params: {
                        method: 'saveSettingRegSudAct',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
        saveCheckBox({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("sudWork.update"), {
                    params: {
                        method: 'saveCheckBox',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        getCheckBoxList ({state, getters, commit, dispatch}, requestObject) {
            commit('setCheckBoxList', [])
            return new Promise((resolve, reject) => {
                axios.get(r('sudWork.index'), {
                    params: {
                        method: 'getCheckBoxList',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setCheckBoxList', response.data.data)
                    }
                })
            })
        },
        saveCheckBoxVal({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("sudWork.update"), {
                    params: {
                        method: 'saveCheckBoxVal',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        getDataOneCheckBox ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('sudWork.index'), {
                    params: {
                        method: 'getDataOneCheckBox',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        changeCheckBox({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("sudWork.update"), {
                    params: {
                        method: 'changeCheckBox',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        deleteCheckBox({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("sudWork.update"), {
                    params: {
                        method: 'deleteCheckBox',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
    }



}



