import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    fssp_hod_records:[],
    total_fssp_hod_records:0,
    fssp_hod_records_loading_flag:false,

    fssp_hod_credits_plan:[],
    total_fssp_hod_credits_plan:0,
    fssp_hod_credits_plan_loading_flag:false,
    fssp_hod_credits_plan_data:{
      offset: 0,
      limit: 100,
      id_record:null,
    },

    fssp_hod_record_data:{
      fields:{},
      offset: 0,
      limit: 100,
    },

    fssp_hod_records_fssp_statuses:[],
    fssp_hod_records_recoverers_list:[],
    fssp_hod_record_data_fssp_statuses:[],
    fssp_hod_record_data_recoverers_list:[],


    fssp_hod_tasks:[],
    total_fssp_hod_tasks:0,
    fssp_hod_tasks_loading_flag:false,

    fssp_hod_task_status_list:[],
    fssp_hod_credit_status_list:[],

    fssp_hod_task_data: {
      fields: {},
      offset: 0,
      limit: 50,
      id_record: 0,
    },

    fssp_hod_credits:[],
    total_fssp_hod_credits:0,
    fssp_hod_credits_loading_flag:false,
    fssp_hod_credits_data:{
      fields: {},
      offset: 0,
      limit: 100,
      id_task:null,
    },

    fssp_hod_record_history:[],
    total_fssp_hod_record_history:0,
    fssp_hod_record_history_loading_flag:false,
    fssp_hod_record_history_data:{
      offset: 0,
      limit: 100,
      id_record:null,
    },
  },
  getters: {
    FsspHodRecordHistory: state => {
      return state.fssp_hod_record_history
    },
    TotalFsspHodRecordHistory: state => {
      return state.total_fssp_hod_record_history
    },
    FsspHodRecordHistoryLoadingFlag: state => {
      return state.fssp_hod_record_history_loading_flag
    },
    FsspHodRecordHistoryData: state => {
      return state.fssp_hod_record_history_data
    },
    FsspHodCreditStatusList: state => {
      return state.fssp_hod_credit_status_list
    },
    FsspHodCredits: state => {
      return state.fssp_hod_credits
    },
    TotalFsspHodCredits: state => {
      return state.total_fssp_hod_credits
    },
    FsspHodCreditsLoadingFlag: state => {
      return state.fssp_hod_credits_loading_flag
    },
    FsspHodCreditsData: state => {
      return state.fssp_hod_credits_data
    },
    FsspHodCreditsPlan: state => {
      return state.fssp_hod_credits_plan
    },
    TotalFsspHodCreditsPlan: state => {
      return state.total_fssp_hod_credits_plan
    },
    FsspHodCreditsPlanLoadingFlag: state => {
      return state.fssp_hod_credits_plan_loading_flag
    },
    FsspHodCreditsPlanData: state => {
      return state.fssp_hod_credits_plan_data
    },
    FsspHodRecords: state => {
      return state.fssp_hod_records
    },
    TotalFsspHodRecords: state => {
      return state.total_fssp_hod_records
    },
    FsspHodRecordsLoadingFlag: state => {
      return state.fssp_hod_records_loading_flag
    },
    FsspHodRecordsFsspStatuses: state => {
      return state.fssp_hod_records_fssp_statuses
    },
    FsspHodRecordDataFsspStatuses: state => {
      return state.fssp_hod_record_data_fssp_statuses
    },
    FsspHodRecordData: state => {
      return state.fssp_hod_record_data
    },
    FsspHodRecordRecovererList: state => {
      return state.fssp_hod_records_recoverers_list
    },
    FsspHodTaskStatusList: state => {
      return state.fssp_hod_task_status_list
    },
    FsspHodTaskData: state => {
      return state.fssp_hod_task_data
    },
    FsspHodTasks: state => {
      return state.fssp_hod_tasks
    },
    TotalFsspHodTasks: state => {
      return state.total_fssp_hod_tasks
    },
    FsspHodTasksLoadingFlag: state => {
      return state.fssp_hod_tasks_loading_flag
    },
    FsspHodRecordDataRecovererList: state => {
      return state.fssp_hod_record_data_recoverers_list
    },
  },
  mutations: {
    setFsspHodRecordHistory (state, payload) {
      state.fssp_hod_record_history = payload
    },
    setTotalFsspHodRecordHistory (state, payload) {
      state.total_fssp_hod_record_history = payload
    },
    setQueryFsspHodHistoryOffset(state, payload) {
      state.fssp_hod_record_history_data.offset = payload*state.fssp_hod_record_history_data.limit
    },
    setQueryFsspHodHistoryLimit (state, payload) {
      state.fssp_hod_record_history_data.limit = payload
    },
    setFsspHodCreditStatusList (state, payload) {
      state.fssp_hod_credit_status_list = payload
    },
    setFsspHodCredits (state, payload) {
      state.fssp_hod_credits = payload
    },
    setTotalFsspHodCredits (state, payload) {
      state.total_fssp_hod_credits = payload
    },
    setQueryFsspHodCreditsOffset(state, payload) {
      state.fssp_hod_credits_data.offset = payload*state.fssp_hod_credits_data.limit
    },
    setQueryFsspHodCreditsLimit (state, payload) {
      state.fssp_hod_credits_data.limit = payload
    },
    setFsspHodCreditsPlan (state, payload) {
      state.fssp_hod_credits_plan = payload
    },
    setTotalFsspHodCreditsPlan (state, payload) {
      state.total_fssp_hod_credits_plan = payload
    },
    setQueryFsspHodCreditsPlanOffset(state, payload) {
      state.fssp_hod_credits_plan_data.offset = payload*state.fssp_hod_credits_plan_data.limit
    },
    setQueryFsspHodCreditsPlanLimit (state, payload) {
      state.fssp_hod_credits_plan_data.limit = payload
    },
    setFsspHodRecordDataFsspStatuses (state, payload) {
      state.fssp_hod_record_data_fssp_statuses = payload
    },
    setFsspHodRecords (state, payload) {
      state.fssp_hod_records = payload
    },
    setTotalFsspHodRecords (state, payload) {
      state.total_fssp_hod_records = payload
    },
    setFsspHodRecordsFsspStatuses (state, payload) {
      state.fssp_hod_records_fssp_statuses = payload
    },
    setQueryFsspHodRecordsOffset(state, payload) {
      state.fssp_hod_record_data.offset = payload*state.fssp_hod_record_data.limit
    },
    setQueryFsspHodRecordsLimit (state, payload) {
      state.fssp_hod_record_data.limit = payload
    },
    setFsspHodRecordRecovererList (state, payload) {
      state.fssp_hod_records_recoverers_list = payload
    },
    setFsspHodTaskStatusList (state, payload) {
      state.fssp_hod_task_status_list = payload
    },
    setQueryFsspHodTaskOffset(state, payload) {
      state.fssp_hod_task_data.offset = payload*state.fssp_hod_task_data.limit
    },
    setQueryFsspHodTaskLimit (state, payload) {
      state.fssp_hod_task_data.limit = payload
    },
    setFsspHodTasks (state, payload) {
      state.fssp_hod_tasks = payload
    },
    setTotalFsspHodTasks (state, payload) {
      state.total_fssp_hod_tasks = payload
    },
    setFsspHodRecordDataRecovererList (state, payload) {
      state.fssp_hod_record_data_recoverers_list = payload
    },
  },
  actions: {
    getFsspHodRecords ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_hod_records_loading_flag = true;
      commit('setFsspHodRecords', [])
      commit('setTotalFsspHodRecords', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'getFsspHodRecords',
            param: getters.FsspHodRecordData
          }
        }).then((response) => {
          state.fssp_hod_records_loading_flag = false;
          if (response.data.result) {
            commit('setFsspHodRecords', response.data.data)
            commit('setTotalFsspHodRecords', response.data.total)
          }
        })
      })
    },
    getFsspStatusesFsspHodRecords ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspHodRecordsFsspStatuses', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'getFsspStatusesFsspHodRecords',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspHodRecordsFsspStatuses', response.data.data)
          }
        })
      })
    },
    getFsspHodRecordsRecoverersList ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspHodRecordRecovererList', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'getFsspHodRecordsRecoverersList',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspHodRecordRecovererList', response.data.data)
          }
        })
      })
    },
    getFsspHodTasks ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_hod_tasks_loading_flag = true;
      commit('setFsspHodTasks', [])
      commit('setTotalFsspHodTasks', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'getFsspHodTasks',
            param: getters.FsspHodTaskData
          }
        }).then((response) => {
          state.fssp_hod_tasks_loading_flag = false;
          if (response.data.result) {
            commit('setFsspHodTasks', response.data.data)
            commit('setTotalFsspHodTasks', response.data.total)
          }
        })
      })
    },
    getFsspHodRecordName ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'getFsspHodRecordName',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data);
        })
      })
    },
    getStatusesFsspHodTasks ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspHodTaskStatusList', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'getStatusesFsspHodTasks',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspHodTaskStatusList', response.data.data)
          }
        })
      })
    },
    getFsspHodRecordDataRecoverersList ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspHodRecordDataRecovererList', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'getFsspHodRecordDataRecoverersList',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspHodRecordDataRecovererList', response.data.data)
          }
        })
      })
    },
    getFsspHodRecordDataFsspStatuses ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspHodRecordDataFsspStatuses', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'getFsspHodRecordDataFsspStatuses',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspHodRecordDataFsspStatuses', response.data.data)
          }
        })
      })
    },
    getFsspHodRecordDataPerem ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'getFsspHodRecordDataPerem',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data);
        })
      })
    },
    saveFsspHodRecord({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r("fsspHodSends.update"), {
          params: {
            method: 'saveFsspHodRecord',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    deleteFsspHodRecord({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r("fsspHodSends.update"), {
          params: {
            method: 'deleteFsspHodRecord',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    getFsspHodRecordData ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'getFsspHodRecordData',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data);
        })
      })
    },
    saveActiveFsspHodRecord({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r("fsspHodSends.update"), {
          params: {
            method: 'saveActiveFsspHodRecord',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    getFsspHodCreditsPlan ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_hod_credits_plan_loading_flag = true;
      commit('setFsspHodCreditsPlan', [])
      commit('setTotalFsspHodCreditsPlan', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'getFsspHodCreditsPlan',
            param: getters.FsspHodCreditsPlanData
          }
        }).then((response) => {
          state.fssp_hod_credits_plan_loading_flag = false;
          if (response.data.result) {
            commit('setFsspHodCreditsPlan', response.data.data)
            commit('setTotalFsspHodCreditsPlan', response.data.total)
          }
          resolve(response.data);
        })
      })
    },
    startOneFsspHodRecord({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r("fsspHodSends.update"), {
          params: {
            method: 'startOneFsspHodRecord',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    cancelOneFsspHodTask({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.post(r("fsspHodSends.update"), {
          params: {
            method: 'cancelOneFsspHodTask',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data)
        })
      })
    },
    getFsspHodCredits ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_hod_credits_loading_flag = true;
      commit('setFsspHodCredits', [])
      commit('setTotalFsspHodCredits', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'getFsspHodCredits',
            param: getters.FsspHodCreditsData
          }
        }).then((response) => {
          state.fssp_hod_credits_loading_flag = false;
          if (response.data.result) {
            commit('setFsspHodCredits', response.data.data)
            commit('setTotalFsspHodCredits', response.data.total)
          }
          resolve(response.data);
        })
      })
    },
    getStatusesFsspHodCredits ({state, getters, commit, dispatch}, requestObject) {
      commit('setFsspHodCreditStatusList', [])
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'getStatusesFsspHodCredits',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setFsspHodCreditStatusList', response.data.data)
          }
        })
      })
    },
    getFsspHodRecordHistory ({state, getters, commit, dispatch}, requestObject) {
      state.fssp_hod_record_history_loading_flag = true;
      commit('setFsspHodRecordHistory', [])
      commit('setTotalFsspHodRecordHistory', 0)
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'getFsspHodRecordHistory',
            param: getters.FsspHodRecordHistoryData
          }
        }).then((response) => {
          state.fssp_hod_record_history_loading_flag = false;
          if (response.data.result) {
            commit('setFsspHodRecordHistory', response.data.data)
            commit('setTotalFsspHodRecordHistory', response.data.total)
          }
        })
      })
    },
    checkFsspHodRecordIsNoWork ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'checkFsspHodRecordIsNoWork',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data);
        })
      })
    },
    genOpisTextFsspHodRecordOneCreditPlan ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.get(r('fsspHodSends.index'), {
          params: {
            method: 'genOpisTextFsspHodRecordOneCreditPlan',
            param: requestObject
          }
        }).then((response) => {
          resolve(response.data);
        })
      })
    },
  }
}

