import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        banks: [],
        banksList:[],
        banksListBic:[],
        total: 0,
        query: {},
        banks_all: [],
        banks_edo: [],
        bank_history_arr: [],
        banks_data_sudorder: [],
        banks_move_flag: false,
        bank_edo_data: [],
        banksListBicDebProp:[],


    },
    getters: {
        // ...
        BanksListBicDebProperty:state=>{
            return state.banksListBicDebProp;
        },
        BankListBic:state=>{
            return state.banksListBic;
        },

        BanksListArr:state=>{
        let arr=[{id:0,name:'Все'}]
        arr=arr.concat(state.banksList)
            return arr
        },
        BanksArr: state => {
            return state.banks;
        },
        BanksSendArr: state => {
            let arr=[];
            for(let a=0; a<state.banks.length; a++){
                if(state.banks[a].send==0){
                    arr.push(state.banks[a])
                }

            }
            return arr;

        },

        TotalBanks: state => {
            return state.total;
        },

        QueryBanks: state => {
            return state.query;
        },
        BanksAllArr: state => {
            return state.banks_all;
        },
        BanksEdoArr: state => {
            return state.banks_edo;
        },
        BanksMoveFlag: state => {
            return state.banks_move_flag;
        },
        BanksSudOrderArr: state => {
            return state.banks_data_sudorder;
        },
        BanksEdoData: state => {
            return state.bank_edo_data;
        },
        BanksHistoryArr: state => {
            return state.bank_history_arr;
        },

    },
    mutations: {
        setBanksListBicDebProperty(state, payload) {

            state.banksListBicDebProp = payload


        },
        setBanksListBic(state, payload) {

            state.banksListBic = payload


        },
        setBanksList(state, payload) {
            
            state.banksList = payload


        },

        setBanks(state, payload) {
            state.banks = payload

        },
        setQueryBanks(state, payload) {
            state.query = payload

        },
        setTotalBanks(state, payload) {
            state.total = payload

        },
        setBanksAll(state, payload) {
            state.banks_all = payload
        },
        setBanksEdo(state, payload) {
            state.banks_edo = payload
        },
        setBanksListSudOrder(state, payload) {
            state.banks_data_sudorder = payload
        },
        setBanksEdoData(state, payload) {
            state.bank_edo_data = payload
        },
        setBankHistoryArr(state, payload) {
            state.bank_history_arr = payload
        }

    },
    actions: {
        getBanksListArr({state, getters, commit, dispatch}, requestObject) {
          //  commit('setBanksList', [])
            return new Promise((resolve, reject) => {
                axios.get(r("bank.index"), {
                    params: {
                        method: 'getBanksList',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setBanksList', response.data.data)
                    }
                })
            })
        },

        getDataBanks({state, getters, commit, dispatch}, requestObject) {
            commit('setBanks', [])
            commit('setTotalBanks', 0)
            return new Promise((resolve, reject) => {

                axios.get(r("bank.index"), {
                    //axios.get(r("bank.index")+'/banks', {
             //   axios.get('http://prav.local:5000/banks.one', {
                    params: {
                        method: 'getBanks',
                        param: requestObject

                        // id: 5
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setBanks', response.data.data)
                        commit('setTotalBanks', response.data.total)
                    } else {
                        commit('setBanks', [])
                        commit('setTotalBanks', 0)
                    }

                    // commit('setBanks', response.data.data)
                    // commit('setTotalBanks', response.data.total)


                })

            })
        },
        getBanksNameAndId({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let param
                if (typeof requestObject != "undefined") {
                    param = requestObject
                    commit('setQueryBanks', requestObject)
                } else {
                    param = getters.QueryUsers
                }
                //  console.log(localStorage);

                axios.get(r("bank.index"), {
                    params: {
                        method: 'getBanksNameAndId',
                        param: param
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setBanks', response.data.data)
                        commit('setTotalBanks', response.data.total)
                    }


                })

            })
        },
        deleteBank({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("bank.update"), {
                    params: {
                        method: 'deleteBank',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        dispatch('getDataBanks');
                    }
                    resolve(response.data.result)


                })

            })
        },
        saveBank({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("bank.update"), {
                    params: {
                        method: 'saveBank',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        dispatch('getDataBanks');
                    }
                    resolve(response.data.result)


                })

            })
        },
        getBanksAll({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("bank.index"), {
                    params: {
                        method: 'getBanksAll',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setBanksAll', response.data.banks_all)
                        commit('setBanksEdo', response.data.banks_edo)
                    }
                })
            })
        },
        getBanksAllByName({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("bank.index"), {
                    params: {
                        method: 'getBanksAllByName',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setBanksAll', response.data.banks_all)
                    }
                })
            })
        },
        fromAllToEdoMove({state, getters, commit, dispatch}, requestObject) {
            state.banks_move_flag = true;
            return new Promise((resolve, reject) => {
                axios.get(r("bank.index"), {
                    params: {
                        method: 'fromAllToEdoMove',
                        param: requestObject
                    }
                }).then((response) => {
                    state.banks_move_flag = false;
                    resolve(response.data.result)
                })
            })
        },
        fromEdoToAllMove({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                state.banks_move_flag = true;
                axios.get(r("bank.index"), {
                    params: {
                        method: 'fromEdoToAllMove',
                        param: requestObject
                    }
                }).then((response) => {
                    state.banks_move_flag = false;
                    resolve(response.data.result)
                })
            })
        },
        getBanksListSudOrder({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("bank.index"), {
                    params: {
                        method: 'getBanksListSudOrder',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setBanksListSudOrder', response.data.banks_sudorder)
                    }
                })
            })
        },
        moveUpBankEdo({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("bank.index"), {
                    params: {
                        method: 'moveUpBankEdo',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setBanksEdo', response.data.banks_edo)
                    }
                })
            })
        },
        moveDownBankEdo({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("bank.index"), {
                    params: {
                        method: 'moveDownBankEdo',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setBanksEdo', response.data.banks_edo)
                    }
                })
            })
        },
        getBankEdoData({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("bank.index"), {
                    params: {
                        method: 'getBankEdoData',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setBanksEdoData', response.data.bank_edo_data)
                    }
                })
            })
        },
        saveBankEdoData({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("bank.index"), {
                    params: {
                        method: 'saveBankEdoData',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setBanksEdoData', response.data.bank_edo_data)
                    }
                })
            })
        },
        getBankHistoryArr({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("bank.index"), {
                    params: {
                        method: 'getBankHistoryArr',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setBankHistoryArr', response.data.bank_history)
                    }
                })
            })
        },
        setNoCollect({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("bank.index"), {
                    params: {
                        method: 'setNoCollect',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        getBanksListBic({state, getters, commit, dispatch}, requestObject) {
            commit('setBanksListBic', [])
            return new Promise((resolve, reject) => {
                axios.get(r("bank.index"), {
                    params: {
                        method: 'getBanksListBic',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setBanksListBic', response.data.data)
                    }
                })
            })
        },
        getBanksListBicDebProp({state, getters, commit, dispatch}, requestObject) {
            commit('setBanksListBicDebProperty', [])
            return new Promise((resolve, reject) => {
                axios.get(r("bank.index"), {
                    params: {
                        method: 'getBanksListBicDebProp',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setBanksListBicDebProperty', response.data.data)
                    }
                })
            })
        },

    }


}



