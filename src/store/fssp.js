import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    fssps:[],
    fssp_otdels_arr:[],
    total:0,
    query: {},
    fssp_req_history: {},
    fssp_data_credit:{},
    fssp_journal_arr:[],
    total_journal:0,
    fssp_journal_one_arr:[],
    total_one_journal:0,
    fssp_journal_loading_flag:false,
    fssp_journal_loading_flag_one:false,
    fssp_postan_loading_flag_all:false,
    fssp_postan_loading_flag_one:false,
    fssp_search_by_site_loading_flag:false,
    fssp_journal_data:{
      pag:{
        date_send_journal:'',
        type_oper: 'all',
        offset:0,
        limit:100,
      }
    },
    fssp_journal_data_one:{
      pag:{
        date_send_journal_one:'',
        type_oper_one: 'all',
      }
    },
    oper_types:[],
    oper_types_error:[],
    total_postan:0,
    fssp_postan_arr:[],
    total_postan_all:0,
    fssp_postan_arr_all:[],
    fssp_otdel_name:'',
    postan:{
      pag:{
        fields:{},
        offset:0,
        limit:100,
      }
    },
    postan_one:{
      pag:{
        fields:{},
      }
    },

    fssp_journal_errors_arr:[],
    total_journal_errors:0,
    fssp_journal_errors_loading_flag:false,
    fssp_journal_errors_data:{
      pag:{
        date_send_journal:'',
        type_oper: 'all',
        offset:0,
        limit:100,
      }
    },

    fssp_journal_errors_one_arr:[],
    total_journal_errors_one:0,
    fssp_journal_errors_one_loading_flag:false,
    fssp_journal_data_errors_one:{
      pag:{
        date_send_journal_one:'',
        type_oper_one: 'all',
        offset:0,
        limit:100,
      }
    },

    fssp_ip_online_arr:[],
    total_ip_online:0,
    fssp_ip_online_loading_flag:false,
    fssp_ip_online: {
      fields:{},
      offset: 0,
      limit: 100,
      no_found_only:false,
    },

    fssp_orgs_list_gu:[],

    deb_prop_nedv_naim_types:[],
    deb_prop_nedv_type_types:[],
    deb_prop_tran_types:[],

    fssp_types_for_show_answer:[],
    fssp_journal_answer:[],
    fssp_journal_answer_one:{},
    fssp_journal_answer_total:0,
    fssp_journal_get_answer_loading_flag:false,

    activeTabFsspJournal:0,

    total_fssp_money_codes_all:0,
    fssp_money_codes_all_arr:[],
    fssp_money_codes_all_loading_flag:false,

    fssp_get_order_info_data_loading_flag:false,
  },
  getters: {
    // ...
    FsspGetOrderInfoDataLoadingFlag: state => {
      return state.fssp_get_order_info_data_loading_flag
    },
    FsspMoneyCodesAllLoadingFlag: state => {
      return state.fssp_money_codes_all_loading_flag
    },
    TotalFsspMoneyCodesAll: state => {
      return state.total_fssp_money_codes_all
    },
    FsspMoneyCodesAllArr: state => {
      return state.fssp_money_codes_all_arr
    },
    FsspTypesForShowAnswer: state => {
      return state.fssp_types_for_show_answer
    },
    FsspJournalGetAnswerLoadingFlag: state => {
      return state.fssp_journal_get_answer_loading_flag
    },
    FsspJournalAnswer: state => {
      return state.fssp_journal_answer
    },
    FsspJournalAnswerOne: state => {
      return state.fssp_journal_answer_one
    },
    FsspJournalAnswerTotal: state => {
      return state.fssp_journal_answer_total
    },
    DebPropTranTypes: state => {
      return state.deb_prop_tran_types
    },
    DebPropNedvNaimTypes: state => {
      return state.deb_prop_nedv_naim_types
    },
    DebPropNedvTypeTypes: state => {
      return state.deb_prop_nedv_type_types
    },
    FsspOrgsListGu: state => {
      return state.fssp_orgs_list_gu
    },
    FsspIpOnlineArr: state => {
      return state.fssp_ip_online_arr
    },
    TotalIpOnline: state => {
      return state.total_ip_online
    },
    FsspIpOnlineLoadingFlag: state => {
      return state.fssp_ip_online_loading_flag
    },
    FsspSearchBySiteLoadingFlag: state => {
      return state.fssp_search_by_site_loading_flag
    },
    FsspIpOnline: state => {
      return state.fssp_ip_online
    },

    FsspJournalDataErrorsOne: state => {
      return state.fssp_journal_data_errors_one
    },
    FsspJournalErrorsOneArr: state => {
      return state.fssp_journal_errors_one_arr
    },
    TotalJournalErrorsOne: state => {
      return state.total_journal_errors_one
    },
    FsspJournalErrorsOneLoadingFlag: state => {
      return state.fssp_journal_errors_one_loading_flag
    },

    FsspJournalErrorsData: state => {
      return state.fssp_journal_errors_data
    },
    FsspJournalErrorsArr: state => {
      return state.fssp_journal_errors_arr
    },
    TotalJournalErrors: state => {
      return state.total_journal_errors
    },
    FsspJournalErrorsLoadingFlag: state => {
      return state.fssp_journal_errors_loading_flag
    },
    Postan: state => {
      return state.postan
    },
    PostanOne: state => {
      return state.postan_one
    },
    FsspsArr: state => {
      return state.fssps
    },
    TotalFssps: state => {
      return state.total
    },

    QueryFssps: state => {
      return state.query
    },
    FsspOtdelArr: state => {
      return state.fssp_otdels_arr
    },
    FsspDataCredit: state => {
      return state.fssp_data_credit
    },
    FsspJournalArr: state => {
      return state.fssp_journal_arr
    },
    TotalJournalFssp: state => {
      return state.total_journal
    },
    FsspJournalOneArr: state => {
      return state.fssp_journal_one_arr
    },
    TotalJournalOneFssp: state => {
      return state.total_one_journal
    },
    FsspJournalLoadingFlag: state => {
      return state.fssp_journal_loading_flag;
    },
    FsspJournalLoadingFlagOne: state => {
      return state.fssp_journal_loading_flag_one;
    },
    FsspPostanAllLoadingFlag: state => {
      return state.fssp_postan_loading_flag_all;
    },
    FsspPostanOneLoadingFlag: state => {
      return state.fssp_postan_loading_flag_one;
    },
    FsspJournalData: state => {
      return state.fssp_journal_data;
    },
    FsspJournalDataOne: state => {
      return state.fssp_journal_data_one;
    },
    TypesOperFsspAll: state => {
      return state.oper_types;
    },
    TypesOperFsspAllError: state => {
      return state.oper_types_error;
    },
    FsspPostanArr: state => {
      return state.fssp_postan_arr
    },
    TotalPostanFssp: state => {
      return state.total_postan
    },
    FsspPostanAllArr: state => {
      return state.fssp_postan_arr_all
    },
    TotalPostanAllFssp: state => {
      return state.total_postan_all
    },
    FsspOtdelName: state => {
      return state.fssp_otdel_name
    },

  },
  mutations: {
    setTotalFsspMoneyCodesAll(state, payload) {
      state.total_fssp_money_codes_all = payload
    },
    setFsspMoneyCodesAllArr(state, payload) {
      state.fssp_money_codes_all_arr = payload
    },
    setFsspTypesForShowAnswer(state, payload) {
      state.fssp_types_for_show_answer = payload
    },
    setFsspJournalAnswer(state, payload) {
      state.fssp_journal_answer = payload
    },
    setFsspJournalAnswerTotal(state, payload) {
      state.fssp_journal_answer_total = payload
    },
    setFsspJournalAnswerOne(state, payload) {
      state.fssp_journal_answer_one = payload
    },
    setDebPropTranTypes(state, payload) {
      state.deb_prop_tran_types = payload
    },
    setDebPropNedvTypeTypes(state, payload) {
      state.deb_prop_nedv_type_types = payload
    },
    setDebPropNedvNaimTypes(state, payload) {
      state.deb_prop_nedv_naim_types = payload
    },
    setFsspOrgsListGu(state, payload) {
      state.fssp_orgs_list_gu = payload
    },
    setFsspIpOnlineArr(state, payload) {
      state.fssp_ip_online_arr = payload
    },
    setTotalIpOnline(state, payload) {
      state.total_ip_online = payload
    },
    setQueryIpOnlineOffset(state, payload) {
      state.fssp_ip_online.offset = payload*state.fssp_ip_online.limit
    },
    setQueryIpOnlineLimit (state, payload) {
      state.fssp_ip_online.limit = payload
    },

    setFsspJournalErrorsOneArr(state, payload) {
      state.fssp_journal_errors_one_arr = payload
    },
    setTotalJournalErrorsOne(state, payload) {
      state.total_journal_errors_one = payload
    },
    setQueryJournalErrorsOneOffset(state, payload) {
      state.fssp_journal_data_errors_one.pag.offset = payload*state.fssp_journal_data_errors_one.pag.limit
    },
    setQueryJournalErrorsOneLimit (state, payload) {
      state.fssp_journal_data_errors_one.pag.limit = payload
    },
    setQueryJournalErrorsOffset(state, payload) {
      state.fssp_journal_errors_data.pag.offset = payload*state.fssp_journal_errors_data.pag.limit
    },
    setQueryJournalErrorsLimit (state, payload) {
      state.fssp_journal_errors_data.pag.limit = payload
    },
    setFsspJournalErrorsArr (state, payload) {
      state.fssp_journal_errors_arr = payload
    },
    setTotalJournalErrors (state, payload) {
      state.total_journal_errors = payload
    },
    setFssps (state, payload) {
      state.fssps = payload

    },
    setQueryFssps (state, payload) {
      state.query = payload

    },
    setTotalFssps (state, payload) {
      state.total = payload

    },
    setFsspOtdelArr (state, payload) {
      state.fssp_otdels_arr = payload

    },
    setFsspDataCredit (state, payload) {
      state.fssp_data_credit = payload

    },
    setFsspJournalArr (state, payload) {
      state.fssp_journal_arr = payload

    },
    setTotalJournalFssp (state, payload) {
      state.total_journal = payload

    },
    setFsspJournalOneArr (state, payload) {
      state.fssp_journal_one_arr = payload

    },
    setTotalJournalOneFssp (state, payload) {
      state.total_one_journal = payload

    },
    setTypesOperFsspAll (state, payload) {
      state.oper_types = payload

    },
    setTypesOperFsspAllError (state, payload) {
      state.oper_types_error = payload

    },
    setFsspPostanArr (state, payload) {
      state.fssp_postan_arr = payload

    },
    setTotalPostanFssp (state, payload) {
      state.total_postan = payload

    },
    setFsspPostanAllArr (state, payload) {
      state.fssp_postan_arr_all = payload

    },
    setTotalPostanAllFssp (state, payload) {
      state.total_postan_all = payload

    },
    // setQueryPostanOffset(state, payload) {
    //   state.postan.pag.offset = payload*state.postan.pag.limit
    // },
    // setQueryPostanLimit (state, payload) {
    //   state.postan.pag.limit = payload
    // },
    setQueryJournalOffset(state, payload) {
      state.fssp_journal_data.pag.offset = payload*state.fssp_journal_data.pag.limit
    },
    setQueryJournalLimit (state, payload) {
      state.fssp_journal_data.pag.limit = payload
    },
    setFsspOtdelName (state, payload) {
      state.fssp_otdel_name = payload
    },

  },
  actions: {
    getDataFssps ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        let param
        if (typeof requestObject !== 'undefined') {
          param = requestObject
          commit('setQueryFssps', requestObject)
        } else {
          param = getters.QueryUsers
        }
        //  console.log(localStorage);

        axios.get(r('fssp.index'), {
          params: {
            method: 'getFssps',
            param
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFssps', response.data.data)
            commit('setTotalFssps', response.data.total)
          }


        })

      })
    },
    deleteFssp ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'deleteFssp',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataFssps')
          }
          resolve(response.data.result)


        })

      })
    },
    saveFssp ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'saveFssp',
            param: requestObject
          }
        }).then((response) => {
          console.log(response.data.result)

          if (response.data.result) {
          //    dispatch('getDataFssps')

              // console.log(response.data.result)
              resolve(response.data.result)

          }
        })

      })
    },
    createClaimOnFssp ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'createClaimOnFssp',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        }).catch(error => {
          resolve(error)
        })
      }).catch(error => {
        resolve(error)
      })
    },
    getFsspVedHistory ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspVedHistory',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    getFsspReqHistoryHod ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspReqHistoryHod',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },

    getFsspReqHistory ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspReqHistory',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },

    getFsspOtdelsArr ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspOtdelArr', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspOtdelsArr',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspOtdelArr', response.data.data)
          }
        })
      })
    },

    getJournalFssp ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getJournalFssp',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },

    getSendResultFssp ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getSendResultFssp',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },

    getFsspDataCredit ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspDataCredit', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspDataCredit',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspDataCredit', response.data.data)
          }
        })
      })
    },

    opredFssps ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'opredFssps',
            param: requestObject
          }
        }).then((response) => {
            resolve(response.data.result)
        })

      })
    },

    toQueueFssp({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'toQueueFssp',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })

      })
    },

    getFsspMainJournal ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_journal_loading_flag = true;
      commit('setFsspTypesForShowAnswer', [])
      commit('setFsspJournalArr', [])
      commit('setTotalJournalFssp', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspMainJournal',
            param: getters.FsspJournalData
          }
        }).then((response) => {
          state.fssp_journal_loading_flag = false;
          if (response.data.result) {
            commit('setFsspJournalArr', response.data.data)
            commit('setTotalJournalFssp', response.data.total)
            commit('setFsspTypesForShowAnswer', response.data.types)
          }
        })
      })
    },

    getFsspMainOneJournal ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_journal_loading_flag_one = true;
      commit('setFsspJournalOneArr', [])
      commit('setTotalJournalOneFssp', 0)
      commit('setFsspTypesForShowAnswer', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspMainOneJournal',
            param: {credit_id: requestObject,data_pag: getters.FsspJournalDataOne}
          }
        }).then((response) => {
          state.fssp_journal_loading_flag_one = false;
          if (response.data.result) {
            commit('setFsspJournalOneArr', response.data.data)
            commit('setTotalJournalOneFssp', response.data.total)
            commit('setFsspTypesForShowAnswer', response.data.types)
          }
        })
      })
    },

    getTypesOperFssp ({state, getters, commit, dispatch}, requestObject) {
      commit('setTypesOperFsspAll', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getTypesOperFssp',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setTypesOperFsspAll', response.data.data)
          }
        })
      })
    },

    getTypesOperFsspError ({state, getters, commit, dispatch}, requestObject) {
      commit('setTypesOperFsspAllError', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getTypesOperFsspError',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setTypesOperFsspAllError', response.data.data)
          }
        })
      })
    },

    getFsspPostans ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_postan_loading_flag_one = true;
      commit('setFsspPostanArr', [])
      commit('setTotalPostanFssp', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspPostans',
            param: {credit_id: requestObject,data_pag: getters.PostanOne}
          }
        }).then((response) => {
          state.fssp_postan_loading_flag_one = false;
          if (response.data.result) {
            commit('setFsspPostanArr', response.data.data)
            commit('setTotalPostanFssp', response.data.total)
          }
        })
      })
    },

    getFsspPostansAll ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_postan_loading_flag_all = true;
      // commit('setFsspPostanAllArr', [])
      // commit('setTotalPostanAllFssp', 0)
      // console.log('state', getters.User.pag.fssp_all_postans.fields)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspPostansAll',
            param: getters.User.pag.fssp_all_postans
          }
        }).then((response) => {
          state.fssp_postan_loading_flag_all = false;
          if (response.data.result) {
            commit('setFsspPostanAllArr', response.data.data)
            commit('setTotalPostanAllFssp', response.data.total)
            resolve(response.data.result);
          }
        })
      })
    },
    getFsspOtdelName ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspOtdelName', '')
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspOtdelName',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspOtdelName', response.data.data)
          }
        })
      })
    },
    getHistoryVals ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getHistoryVals',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            resolve(response.data)
          }
        })
      })
    },
    saveFsspAnswerDocument ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('document', requestObject.file);
        formData.append('name', requestObject.name);
        formData.append('id_credit', requestObject.id_credit);
        formData.append('perem', requestObject.perem);
        formData.append('type_doc', requestObject.type_doc);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;


        axios.post('/credit/document_fssp',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
        ).then((response) => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        });

      })
    },

    getFsspMainJournalErrors ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_journal_errors_loading_flag = true;
      commit('setFsspJournalErrorsArr', [])
      commit('setTotalJournalErrors', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspMainJournalErrors',
            param: getters.FsspJournalErrorsData
          }
        }).then((response) => {
          state.fssp_journal_errors_loading_flag = false;
          if (response.data.result) {
            commit('setFsspJournalErrorsArr', response.data.data)
            commit('setTotalJournalErrors', response.data.total)
          }
        })
      })
    },

    getFsspMainOneJournalErrors ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_journal_errors_one_loading_flag = true;
      commit('setFsspJournalErrorsOneArr', [])
      commit('setTotalJournalErrorsOne', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspMainOneJournalErrors',
            param: {credit_id: requestObject,data_pag: getters.FsspJournalDataErrorsOne}
          }
        }).then((response) => {
          state.fssp_journal_errors_one_loading_flag = false;
          if (response.data.result) {
            commit('setFsspJournalErrorsOneArr', response.data.data)
            commit('setTotalJournalErrorsOne', response.data.total)
          }
        })
      })
    },

    getFsspIpOnlineArr ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_ip_online_loading_flag = true;
      commit('setFsspIpOnlineArr', [])
      commit('setTotalIpOnline', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspIpOnlineArr',
            param: getters.FsspIpOnline
          }
        }).then((response) => {
          state.fssp_ip_online_loading_flag = false;
          if (response.data.result) {
            commit('setFsspIpOnlineArr', response.data.data)
            commit('setTotalIpOnline', response.data.total)
          }
        })
      })
    },

    getFsspOrgsListGu ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspOrgsListGu', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspOrgsListGu',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspOrgsListGu', response.data.data)
          }
        })
      })
    },

    saveDebPropertyAcc({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'saveDebPropertyAcc',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })

      })
    },

    getDebPropertyAccData ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getDebPropertyAccData',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },

    deleteDebPropertyAcc({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'deleteDebPropertyAcc',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })

      })
    },

    getDebPropNedvNaimTypes ({state, getters, commit, dispatch}, requestObject) {
      commit('setDebPropNedvNaimTypes', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getDebPropNedvNaimTypes',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setDebPropNedvNaimTypes', response.data.data)
          }
        })
      })
    },

    getDebPropNedvTypeTypes ({state, getters, commit, dispatch}, requestObject) {
      commit('setDebPropNedvTypeTypes', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getDebPropNedvTypeTypes',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setDebPropNedvTypeTypes', response.data.data)
          }
        })
      })
    },

    saveDebPropertyNedv({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'saveDebPropertyNedv',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })

      })
    },

    getDebPropertyNedvData ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getDebPropertyNedvData',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },

    deleteDebPropertyNedv({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'deleteDebPropertyNedv',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })

      })
    },

    getDebPropTranTypes ({state, getters, commit, dispatch}, requestObject) {
      commit('setDebPropTranTypes', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getDebPropTranTypes',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setDebPropTranTypes', response.data.data)
          }
        })
      })
    },

    saveDebPropertyTran({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'saveDebPropertyTran',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })

      })
    },

    getDebPropertyTranData ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getDebPropertyTranData',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },

    deleteDebPropertyTran({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'deleteDebPropertyTran',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })

      })
    },

    saveDebPropertyDohod({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'saveDebPropertyDohod',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })

      })
    },

    getDebPropertyDohodData ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getDebPropertyDohodData',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },

    deleteDebPropertyDohod({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'deleteDebPropertyDohod',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })

      })
    },

    getJournalAnswerData ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_journal_get_answer_loading_flag = true;
      commit('setFsspJournalAnswer', [])
      commit('setFsspJournalAnswerOne', {})
      commit('setFsspJournalAnswerTotal', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getJournalAnswerData',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspJournalAnswer', response.data.data)
            commit('setFsspJournalAnswerOne', response.data.data_one)
            commit('setFsspJournalAnswerTotal', response.data.total)
          }
          state.fssp_journal_get_answer_loading_flag = false;
          resolve(response.data)
        })
      })
    },

    setUnknownPostanToCredit({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'setUnknownPostanToCredit',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },

    searchIpBySiteFsspOne({state, getters, commit, dispatch}, requestObject) {
      state.fssp_search_by_site_loading_flag = true;
      return new Promise((resolve, reject) => {
        axios.post(r('fssp.update'), {
          params: {
            method: 'searchIpBySiteFsspOne',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_search_by_site_loading_flag = false;
          resolve(response.data)
        })
      })
    },
    getFsspMoneyCodesAll ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_money_codes_all_loading_flag = true;
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspMoneyCodesAll',
            param: getters.User.pag.fssp_all_money_codes
          }
        }).then((response) => {
          state.fssp_money_codes_all_loading_flag = false;
          if (response.data.result) {
            commit('setFsspMoneyCodesAllArr', response.data.data)
            commit('setTotalFsspMoneyCodesAll', response.data.total)
            resolve(response.data.result);
          }
        })
      })
    },
    getFsspOrderInfoData ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_get_order_info_data_loading_flag = true;
      return new Promise((resolve, reject) => {
        axios.get(r('fssp.index'), {
          params: {
            method: 'getFsspOrderInfoData',
            param: requestObject
          }
        }).then((response) => {
          state.fssp_get_order_info_data_loading_flag = false;
          resolve(response.data);
        })
      })
    },
  }


}

