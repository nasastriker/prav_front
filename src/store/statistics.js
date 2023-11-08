import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';
import g from "../routeGo";

Vue.use(Vuex);


export default {
    state: {
        statistic_info_stats: [],
        statistic_info_sud: [],
        statistic_info_isk: [],
        statistic_info_group_age: [],
        statistic_info_group_sum: [],

        statistic_progress: [],
        statistic_journal: [],

        statistic_status: false,
        statistic_is_active: false,
        statistic_last_date: null,
        statistic_status_loading_flag: false,
    },
    getters: {
        StatisticJournal: state => {
            return state.statistic_journal;
        },
        StatisticLastDate: state => {
            return state.statistic_last_date;
        },
        StatisticProgress: state => {
            return state.statistic_progress;
        },
        StatisticStatusLoadingFlag: state => {
            return state.statistic_status_loading_flag;
        },
        StatisticIsActive: state => {
            return state.statistic_is_active;
        },
        StatisticStatus: state => {
            return state.statistic_status;
        },
        StatisticInfoStats: state => {
            return state.statistic_info_stats;
        },
        StatisticInfoSud: state => {
            return state.statistic_info_sud;
        },
        StatisticInfoIsk: state => {
            return state.statistic_info_isk;
        },
        StatisticInfoGroupAge: state => {
            return state.statistic_info_group_age;
        },
        StatisticInfoGroupSum: state => {
            return state.statistic_info_group_sum;
        },
    },
    mutations: {
        setStatisticJournal(state, payload) {
            state.statistic_journal = payload
        },
        setStatisticLastDate(state, payload) {
            state.statistic_last_date = payload
        },
        setStatisticProgress(state, payload) {
            state.statistic_progress = payload
        },
        setStatisticStatus(state, payload) {
            state.statistic_status = payload
        },
        setStatisticIsActive(state, payload) {
            state.statistic_is_active = payload
        },
        setStatisticInfoStats(state, payload) {
            state.statistic_info_stats = payload
        },
        setStatisticInfoSud(state, payload) {
            state.statistic_info_sud = payload
        },
        setStatisticInfoIsk(state, payload) {
            state.statistic_info_isk = payload
        },
        setStatisticInfoGroupAge(state, payload) {
            state.statistic_info_group_age = payload
        },
        setStatisticInfoGroupSum(state, payload) {
            state.statistic_info_group_sum = payload
        },
    },
    actions: {
        // axios.get(g('statistics/get_stat_info'),{params: requestObject}).then((response) => {
        getStatisticInfoStats({state, getters, commit, dispatch}, requestObject) {
            commit('setStatisticInfoStats', [])
            return new Promise((resolve, reject) => {
                axios.get(r('statistics.index'), {
                    params: {
                        method: 'getStatisticInfoStats',
                        param: getters.User.pag.staticSud
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setStatisticInfoStats', response.data.data)
                    }
                })
            })
        },

        // axios.get(g('statistics/get_stat_dyn_sud'), {params: requestObject}).then((response) => {
        getStatisticInfoSud({state, getters, commit, dispatch}, requestObject) {
            commit('setStatisticInfoSud', [])
            return new Promise((resolve, reject) => {
                axios.get(r('statistics.index'), {
                    params: {
                        method: 'getStatisticInfoSud',
                        param: getters.User.pag.staticSud
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setStatisticInfoSud', response.data.data)
                    }
                })
            })
        },

        // axios.get(g('statistics/get_stat_dyn_isk'), {params: requestObject}).then((response) => {
        getStatisticInfoIsk({state, getters, commit, dispatch}, requestObject) {
            commit('setStatisticInfoIsk', [])
            return new Promise((resolve, reject) => {
                axios.get(r('statistics.index'), {
                    params: {
                        method: 'getStatisticInfoIsk',
                        param: getters.User.pag.staticSud
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setStatisticInfoIsk', response.data.data)
                    }
                })
            })
        },

        // axios.get(g('statistics/get_stat_group_age'), {params: requestObject}).then((response) => {
        getStatisticInfoGroupAge({state, getters, commit, dispatch}, requestObject) {
            commit('setStatisticInfoGroupAge', [])
            return new Promise((resolve, reject) => {
                axios.get(r('statistics.index'), {
                    params: {
                        method: 'getStatisticInfoGroupAge',
                        param: getters.User.pag.staticSud
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setStatisticInfoGroupAge', response.data.data)
                    }
                })
            })
        },

        // axios.get(g('statistics/get_stat_group_sum'), {params: requestObject}).then((response) => {
        getStatisticInfoGroupSum({state, getters, commit, dispatch}, requestObject) {
            commit('setStatisticInfoGroupSum', [])
            return new Promise((resolve, reject) => {
                axios.get(r('statistics.index'), {
                    params: {
                        method: 'getStatisticInfoGroupSum',
                        param: getters.User.pag.staticSud
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setStatisticInfoGroupSum', response.data.data)
                    }
                })
            })
        },

        // getStatisticStatus({state, getters, commit, dispatch}, requestObject) {
        //     state.statistic_status_loading_flag = true;
        //     commit('setStatisticStatus', false)
        //     commit('setStatisticIsActive', false)
        //     return new Promise((resolve, reject) => {
        //         axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        //         axios.get(g('statistic/ping'), {params: requestObject}).then((response) => {
        //             state.statistic_status_loading_flag = false;
        //             commit('setStatisticStatus', response.data.result)
        //             commit('setStatisticIsActive', response.data.is_active)
        //         }).catch(error => {
        //             state.statistic_status_loading_flag = false;
        //             commit('setStatisticStatus', false)
        //             commit('setStatisticIsActive', false)
        //         })
        //     })
        // },

        getStatisticStatus({state, getters, commit, dispatch}, requestObject) {
            state.statistic_status_loading_flag = true;
            commit('setStatisticStatus', false)
            commit('setStatisticIsActive', false)
            return new Promise((resolve, reject) => {
                axios.get(r('statistics.index'), {
                    params: {
                        method: 'getStatisticStatus',
                        param: requestObject
                    }
                }).then((response) => {
                    state.statistic_status_loading_flag = false;
                    if (response.data.result) {
                        commit('setStatisticStatus', response.data.status)
                        commit('setStatisticIsActive', response.data.is_active)
                    }
                })
            })
        },

        getStatisticProgress({state, getters, commit, dispatch}, requestObject) {
            commit('setStatisticProgress', [])
            return new Promise((resolve, reject) => {
                axios.get(r('statistics.index'), {
                    params: {
                        method: 'getStatisticProgress',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setStatisticProgress', response.data.data)
                    }
                })
            })
        },

        getStatisticLastDate({state, getters, commit, dispatch}, requestObject) {
            commit('setStatisticLastDate', null)
            return new Promise((resolve, reject) => {
                axios.get(r('statistics.index'), {
                    params: {
                        method: 'getStatisticLastDate',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setStatisticLastDate', response.data.data)
                    }
                })
            })
        },

        getStatisticJournal({state, getters, commit, dispatch}, requestObject) {
            commit('setStatisticJournal', [])
            return new Promise((resolve, reject) => {
                axios.get(r('statistics.index'), {
                    params: {
                        method: 'getStatisticJournal',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setStatisticJournal', response.data.data)
                    }
                })
            })
        },
    }
}



