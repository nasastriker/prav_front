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
        judicials:[],
        total:0,
        query: {},
        find:'',
        showTab:false,
        editJud:0,
        resetJuds:[],
        areaJuds:[],
        nowJud:'',
        nowJudId:0,
        jud_find_flag: false,
        judicialsListArr:[],
        jud_name:''



    },
    getters: {
        // ...
        JudicalName: state => {
            return state.jud_name
        },
        JudicialsListArr: state => {
            return state.judicialsListArr
        },
        JudicialsArr: state => {
            return state.judicials;
        },
        TotalJudicials: state => {
            return state.total;
        },
        ShowTabJud: state => {
            return state.showTab;
        },
        EditJud: state => {
            return state.editJud;
        },
        QueryJudicials: state => {
            return state.query;
        },
        NowJud: state => {
            return state.nowJud;
        },
        ResetJudArr: state => {
            return state.resetJuds;
        },
        AreaJudArr: state => {
            return state.areaJuds;
        },
        JudFindFlag: state => {
            return state.jud_find_flag;
        },
        NowJudId: state => {
            return state.nowJudId;
        },

    },
    mutations: {

        setJudicialsListArr(state, payload) {
            state.judicialsListArr.length=0
            state.judicialsListArr = payload

        },
        setJudicials (state, payload) {
            state.judicials = payload

        },
        setShowTabJud (state, payload) {
            state.showTab = payload

        },
        setEditJud(state, payload) {
            state.editJud = payload

        },
        setQueryJudicials (state, payload) {
            state.query = payload

        },
        setTotalJudicials (state, payload) {
            state.total = payload

        },
        setResetJudArr (state, payload) {
            state.resetJuds = payload
        },
        setNowJud (state, payload) {
            state.nowJud = payload
        },
        setJudAreaArr (state, payload) {
            state.areaJuds = payload
        },
        setNowJudId (state, payload) {
            state.nowJudId = payload
        },
        setJudicalName (state, payload) {
            state.jud_name = payload
        },

    },
    actions: {

        getJudicialsListArr({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("judicial.index"), {
                    params: {
                        method: 'getJudicialsListArr',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                    commit('setJudicialsListArr',(response.data.data))
                    }

                })
            })
        },

        exportToAddressArea({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("judicial.update"), {
                    params: {
                        method: 'exportToAddressArea',
                        param: requestObject
                    }
                }).then((response) => {
                  resolve(response.data)
                })
            })
        },



        getJudicialsByName({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let str=randomString(20);
                state.find=str;

                axios.get(r("judicial.index"), {
                    params: {
                        method: 'getJudicialsByName',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        if(str==state.find){
                            commit('setJudicials', response.data.data)
                            commit('setTotalJudicials', response.data.total)
                        }

                    }


                    resolve(response.data.result)

                })


            })
        },
        getDataJudicials({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let str=randomString(20);
                state.find=str;

                axios.get(r("judicial.index"), {
                    params: {
                        method: 'getJudicials',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        if(str==state.find){
                            commit('setJudicials', response.data.data)
                            commit('setTotalJudicials', response.data.total)
                        }

                    }


                    resolve(response.data.result)

                })


            })
        },
        deleteJudicial({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("judicial.update"), {
                    params: {
                        method: 'deleteJudicial',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataJudicials');
                    }
                    resolve(response.data.result)


                })

            })
        },
        setJudPP({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("judicial.update"), {
                    params: {
                        method: 'setJudPP',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)


                })

            })
        },
        getJudData({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("judicial.index"), {
                    params: {
                        method: 'getJudData',
                        param: requestObject
                    }
                }).then((response_data) => {
                    resolve(response_data.data)
                })
            })
        },
        setJudDov({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("judicial.update"), {
                    params: {
                        method: 'setJudDov',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)


                })

            })
        },
        saveJudicial({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("judicial.update"), {
                    params: {
                        method: 'saveJudicial',
                        param: requestObject
                    }
                }).then((response) => {

                    resolve(response.data.result)


                })

            })
        },
        getJudicialNumberById({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("judicial.index"), {
                    params: {
                        method: 'getJudicialNumberById',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        resolve(response.data)
                    }
                })
            })
        },
        getJudicialsListForReset({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.jud_find_flag = true;
                axios.get(r("judicial.index"), {
                    params: {
                        method: 'getJudicialsListForReset',
                        param: requestObject
                    }
                }).then((response) => {
                    state.jud_find_flag = false;
                    if(response.data.result){
                        commit('setNowJud', response.data.jud_now)
                        commit('setNowJudId', response.data.jud_now_id)
                        commit('setResetJudArr', response.data.jud_arr)
                        commit('setJudAreaArr', response.data.jud_area_arr)
                    }
                })
            })
        },

        getJudicial({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.jud_find_flag = true;
                axios.get(r("judicial.index"), {
                    params: {
                        method: 'getJudicial',
                        param: requestObject
                    }
                }).then((response) => {
                    state.jud_find_flag = false;
                    if(response.data.result){
                        resolve(response.data)
                    }
                })
            })
        },
        setJudicialRecord({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("judicial.update"), {
                    params: {
                        method: 'setJudicialRecord',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)


                })

            })
        },
        getJurisName({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("judicial.index"), {
                    params: {
                        method: 'getJurisName',
                        param: requestObject
                    }
                }).then((response) => {
                    commit('setJudicalName',response.data.data)
                })

            })
        },

        getJudicialsListForResetAll({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.jud_find_flag = true;
                axios.get(r("judicial.index"), {
                    params: {
                        method: 'getJudicialsListForResetAll',
                        param: requestObject
                    }
                }).then((response) => {
                    state.jud_find_flag = false;
                    resolve(response.data)
                })
            })
        },
        resetJudSudSend({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("judicial.update"), {
                    params: {
                        method: 'resetJudSudSend',
                        param: requestObject
                    }
                }).then((response_result) => {

                    resolve(response_result.data)


                })

            })
        },
    }



}



