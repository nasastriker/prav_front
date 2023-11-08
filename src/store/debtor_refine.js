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
        debtorRefines:[],
        total:0,
        find:'',
        query: {},
        totalRegion:0,
        region:[],
        fssp_refine_loading_flag:false,
        region_check:[],
        filesRefine:[],
        statussDebtorArrAndAll:[],


    },
    getters: {
        // ...
        DebtorRefinesArr: state => {
            return state.debtorRefines;
        },
        TotalDebtorRefines: state => {
            return state.total;
        },
        FsspRefineLoadingFlag: state => {
            return state.fssp_refine_loading_flag;
        },
        QueryDebtorRefines: state => {
            return state.query;
        },
        RegionArr:state => {
            return state.region;
        },
        RegionsCheckArr:state => {
            return state.region_check;
        },
        FilesRefineArr:state => {
            return state.filesRefine;
        },
        StatussDebtorArrAndAll: state => {

            return state.statussDebtorArrAndAll

            /*
            [

                {id:1,name:'Проверить адрес'},
                {id:17,name:'Уточнить подсудность'},
                {id:74,name:'Уточнить адрес'},
                // {id:101,name:'Уточнить подсудность Правеж'},
                // {id:3,name:'Проверить банкротство'},
                // {id:4,name:'Проверить адрес ПФ'},
                // {id:5,name:'Проверить адрес ФССП'},
                // {id:6,name:'Проверить подсудность'},
                // {id:99,name:'Автомат подсудность Гео+Yandex'},
                // {id:98,name:'Автомат подсудность Sudrf'},
                // {id:97,name:'Автомат подсудность Yandex+2'},
                // {id:96,name:'Автомат подсудность  Гео+Yandex+2'},
            ];
            */
        },

    },
    mutations: {
        setStatussDebtorArrAndAll(state, payload) {
            state.statussDebtorArrAndAll = payload

        },
        setDebtorRefines (state, payload) {
            state.debtorRefines = payload

        },
        setRegion (state, payload) {
            state.region.length=0;
            state.region.push(
                {id:-1,name:'Все'}
            )
            for(let i=0;i<payload.length;i++){
                state.region.push(payload[i])
            }


        },
        setTotalRegion (state, payload) {
            state.totalRegion = payload

        },
        setQueryDebtorRefines (state, payload) {
            state.query = payload

        },
        setTotalDebtorRefines (state, payload) {
            state.total = payload

        },
        setFilesRefineArr (state, payload) {
            state.filesRefine = payload

        },
        setRegionsCheckArr (state, payload) {
            state.region_check = payload

        }

    },
    actions: {
        getStatussDebtorArrAndAll({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("debtorRefines.index"), {
                    params: {
                        method: 'getStatussDebtorArrAndAll',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setStatussDebtorArrAndAll', response.data.data)
                    }

                    resolve(response.data.result)


                })

            })
        },

        getRegion({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {


                axios.get(r("debtorRefines.index"), {
                    params: {
                        method: 'region',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setRegion', response.data.data)
                        commit('setRegionsCheckArr', response.data.data)
                        commit('setTotalRegion', response.data.total)
                    }

                    resolve(response.data.result)


                })

            })
        },

        getDebtorRefinesFilter({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let str=randomString(20);
                state.find=str;
                commit('setDebtorRefines', [])
                commit('setTotalDebtorRefines', 0)
                axios.get(r("debtorRefines.index"), {
                    params: {
                        method: 'getDebtorRefinesFilter',
                        param: requestObject
                    }
                }).then((response) => {

                    if(response.data.result){
                        //  console.log(str==state.find)
                        if(str==state.find){
                            commit('setDebtorRefines', response.data.data)
                            commit('setTotalDebtorRefines', response.data.total)
                        }
                    }


                    resolve(response.data.result)


                })

            })
        },

        getDataDebtorRefines({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.fssp_refine_loading_flag = true;
                let str=randomString(20);
                state.find=str;
                axios.get(r("debtorRefines.index"), {
                    params: {
                        method: 'getDebtorRefines',
                        param: requestObject
                    }
                }).then((response) => {
                    if(str==state.find){
                        commit('setDebtorRefines', response.data.data)
                        commit('setTotalDebtorRefines', response.data.total)
                    }

                    resolve(response.data.result)
                    state.fssp_refine_loading_flag = false;

                })

            })
        },
        deleteDebtorRefine({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("debtorRefines.update"), {
                    params: {
                        method: 'deleteDebtorRefine',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataDebtorRefines');
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveDebtorRefine({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("debtorRefines.update"), {
                    params: {
                        method: 'saveDebtorRefine',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDataDebtorRefines');
                    }
                    resolve(response.data.result)


                })

            })
        },
        loadDebtors17ToXls({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("debtorRefines.index"), {
                    params: {
                        method: 'loadDebtors17ToXls',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        resolve(response.data.file_name)
                    }
                })
            })
        },
        getFileListRefine({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("debtorRefines.index"), {
                    params: {
                        method: 'getFileListRefine',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        commit('setFilesRefineArr', response.data.data)
                    }
                })
            })
        },
        changeCheckRegionRefine({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("debtorRefines.update"), {
                    params: {
                        method: 'changeCheckRegionRefine',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })

            })
        },
        startJobChangeJurisdictRegion({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("debtorRefines.update"), {
                    params: {
                        method: 'startJobChangeJurisdictRegion',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })

            })
        },
        deleteFileListRefine({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("debtorRefines.index"), {
                    params: {
                        method: 'deleteFileListRefine',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })
            })
        },
    }



}



