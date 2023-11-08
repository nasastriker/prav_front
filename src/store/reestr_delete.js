import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        reestrsDelete:[],
        total:0,
        query: {},
        reestrDeleteFlag:0,
        reestrsDeleteShow:[],
        reestrsDeleteName:[],

    },
    getters: {
        // ...
        ReestrsDeleteArrName: state => {
            let arr=[]
            for (let i = 0; i < state.reestrsDelete.length; i++) {
                arr.push(
                    { name:state.reestrsDelete[i].name_recover,
                        show:true,


                    }
                )


            }

            arr.__proto__.unique = function() {

                return this.filter(function(value, index, _this) {

                    return _this.indexOf(value) === index;

                });

            }
            state.reestrsDeleteName=arr.unique()
            return arr.unique();
        },
        ReestrsDeleteArr: state => {
            return state.reestrsDelete;
        },
        ReestrDeleteFlag: state => {
            return state.reestrDeleteFlag;
        },
        ReestrsDeleteArrShow: state => {

            return state.reestrsDeleteShow;
        },
        TotalReestrsDelete: state => {
            return state.total;
        },

        QueryReestrsDelete: state => {
            return state.query;
        },

    },
    mutations: {

        setReestrsDelete (state, payload) {
            state.reestrsDelete = payload
            state.reestrsDeleteShow = payload

        },
        setQueryReestrsDelete (state, payload) {
            state.query = payload

        },
        setFlagReestrDelete (state, payload) {
            state.reestrDeleteFlag = payload

        },
        setTotalReestrsDelete (state, payload) {
            state.total = payload

        }

    },
    actions: {
        saveReestrsDelete({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                let formData = new FormData();
                formData.append('document', requestObject.file[0]);

                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;


                axios.post('/reestrDelete/document',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((response) => {

                    resolve(response.data)
                }).catch(error => {
                    resolve(error)

                });

            })
        },
        getDataReestrsDelete({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                commit('setFlagReestrDelete', 1)
                commit('setReestrsDelete', [])
                commit('setTotalReestrsDelete', 0)
                axios.get(r("reestrDelete.index"), {
                    params: {
                        method: 'getReestrDeletes',
                        param: requestObject
                    }
                }).then((response) => {
                    commit('setFlagReestrDelete', 0)
                    if(response.data.result){
                        commit('setReestrsDelete', response.data.data)
                        commit('setTotalReestrsDelete', response.data.total)
                    }




                })



            })
        },


    }



}



