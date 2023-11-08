import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        help_hints: [],
        help_hint_data: [],
        help_hint_find_flag: false
    },
    getters: {
        HelpHintData: state => {
            return state.help_hint_data;
        },
        HelpHintFindFlag: state => {
            return state.help_hint_find_flag;
        },
    },
    mutations: {
        setHelpHints(state, payload) {
            state.help_hints = payload
        },
        setHelpHintData(state, payload) {
            state.help_hint_data = payload
        },
    },
    actions: {
        getHelpHints({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("helpPage.index"), {
                    params: {
                        method: 'getHelpHints',
                        param: requestObject
                    }
                }).then((response) => {
                    console.log(response)
                    if(response.data.result){
                        resolve(response.data)
                    }
                })

            })
        },
        addHelpHint({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("helpPage.index"), {
                    params: {
                        method: 'addHelpHint',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })

            })
        },

        getDataHelpHint({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("helpPage.index"), {
                    params: {
                        method: 'getDataHelpHint',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.help_hint_data)
                })

            })
        },
        deleteHint({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r("helpPage.index"), {
                    params: {
                        method: 'deleteHint',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data.result)
                })

            })
        },
        getFileResponse({state, getters, commit, dispatch}, requestObject) {
            state.help_hint_find_flag = true;
            return new Promise((resolve, reject) => {
                axios.get(r("helpPage.index"), {
                    responseType: 'arraybuffer',
                    params: {
                        method: 'getFileResponse',
                        param: requestObject
                    }
                }).then((response) => {
                    state.help_hint_find_flag = false;
                        resolve(response.data)
                })

            })
        },

        goTest({state, getters, commit, dispatch}, requestObject) {
            // return new Promise((resolve, reject) => {
            //     axios.get('http://localhost:5000/banks/all', {
            //         params: {}
            //     }).then((response) => {
            //         console.log(response)
            //         resolve(response.data.query_banks)
            //     })
            //
            // })
        },

    }

}
