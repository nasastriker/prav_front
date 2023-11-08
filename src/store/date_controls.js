import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import r from '../route';

Vue.use(Vuex);


export default {
    state: {
        date_controls:[],
        total:0,
        date_controls_loading_flag:false,
        date_controls_types:[],
        date_control:{
            pag:{
                fields:{},
                vis_type:1,
            }
        },
        shablon_dc_list:[],
        func_dc_list:[],
        date_control_list:[],
        dc_perem_list:[],
        razdel_dc_list:[],

        date_control_sends:[],
        date_control_sends_loading_flag:false,

        control_sends:[],
        control_sends_loading_flag:false,

        date_controls_tasks:[],
        total_date_controls_tasks:0,
        date_control_tasks_loading_flag:false,
        date_controls_task:{
            pag:{
                offset:0,
                limit:50,
                id_date_control:0,
                only_not_empty:0,
                date_control_name:'',
                date_control_task_date:'',
            }
        },
        stad:[],
        date_controls_task_sends:[],
        total_date_controls_task_sends:0,
        date_control_task_sends_loading_flag:false,
        date_controls_task_send:{
            pag:{
                fields:{},
                offset:0,
                limit:50,
                id_task:0,
            }
        },

        date_controls_task_send_statuses:[],

        date_controls_task_send_plans:[],
        date_controls_task_send_plan_total:0,
        date_controls_task_send_plan: {
            offset: 0,
            limit: 50,
            id_date_control: 0,
            date_control_conds:[],
            date_control_sql:'',
            date_control_id_status:0,
            date_control_name:''
        },
        date_control_task_sends_plans_loading_flag:false,
    },
    getters: {
        // ...
        RazdelDcList: state => {
            return state.razdel_dc_list;
        },
        DateControlsTaskSendPlans: state => {
            return state.date_controls_task_send_plans;
        },
        DateControlsTaskSendPlanTotal: state => {
            return state.date_controls_task_send_plan_total;
        },
        DateControlsTaskSendPlan: state => {
            return state.date_controls_task_send_plan;
        },
        DateControlsTaskSendPlanLoadingFlag: state => {
            return state.date_control_task_sends_plans_loading_flag;
        },

        DateControlTaskSendStatuses: state => {
            return state.date_controls_task_send_statuses;
        },
        DateControlTaskSend: state => {
            return state.date_controls_task_send;
        },
        DateControlsTaskSendLoadingFlag: state => {
            return state.date_control_task_sends_loading_flag;
        },
        DateControlsTaskSends: state => {
            return state.date_controls_task_sends;
        },
        TotalDateControlsTaskSends: state => {
            return state.total_date_controls_task_sends;
        },

        DateControlTask: state => {
            return state.date_controls_task;
        },
        DateControlsTasksLoadingFlag: state => {
            return state.date_control_tasks_loading_flag;
        },
        DateControlsTasks: state => {
            return state.date_controls_tasks;
        },
        TotalDateControlsTasks: state => {
            return state.total_date_controls_tasks;
        },
        ControlSendsLoadingFlag: state => {
            return state.control_sends_loading_flag;
        },
        DateControlSendsLoadingFlag: state => {
            return state.date_control_sends_loading_flag;
        },
        DateControlSends: state => {
            return state.date_control_sends;
        },
        DCPeremList: state => {
            return state.dc_perem_list;
        },
        DateControlList: state => {
            return state.date_control_list;
        },
        FuncDcList: state => {
            return state.func_dc_list;
        },
        ShablonDcList: state => {
            return state.shablon_dc_list;
        },
        DateControl: state => {
            return state.date_control;
        },
        DateControlStad: state => {
            return state.stad;
        },
        DateControlsArr: state => {
            return state.date_controls;
        },
        TotalDateControls: state => {
            return state.total;
        },
        DateControlsLoadingFlag: state => {
            return state.date_controls_loading_flag;
        },
        DateControlTypes: state => {
            return state.date_controls_types;
        },
    },
    mutations: {
        setDateControlsStadArr (state, payload) {
            state.stad = payload
        },
        setRazdelDcList (state, payload) {
            state.razdel_dc_list = payload
        },
        setDateControlsTaskSendPlans (state, payload) {
            state.date_controls_task_send_plans = payload
        },
        setDateControlsTaskSendPlanTotal (state, payload) {
            state.date_controls_task_send_plan_total = payload
        },
        setQueryDateControlsTaskSendPlanLimit (state, payload) {
            state.date_controls_task_send_plan.limit = payload
        },
        setQueryDateControlsTaskSendPlanOffset(state, payload) {
            state.date_controls_task_send_plan.offset = payload
        },

        setDateControlTaskSendStatuses (state, payload) {
            state.date_controls_task_send_statuses = payload
        },
        setQueryDateControlsTaskSendLimit (state, payload) {
            state.date_controls_task_send.pag.limit = payload
        },
        setQueryDateControlsTaskSendOffset(state, payload) {
            state.date_controls_task_send.pag.offset = payload*state.date_controls_task_send.pag.limit
        },
        setDateControlsTaskSends (state, payload) {
            state.date_controls_task_sends = payload
        },
        setTotalDateControlsTaskSends (state, payload) {
            state.total_date_controls_task_sends = payload
        },

        setQueryDateControlsTaskLimit (state, payload) {
            state.date_controls_task.pag.limit = payload
        },
        setQueryDateControlsTaskOffset(state, payload) {
            state.date_controls_task.pag.offset = payload*state.date_controls_task.pag.limit
        },
        setDateControlsTasks (state, payload) {
            state.date_controls_tasks = payload
        },
        setTotalDateControlsTasks (state, payload) {
            state.total_date_controls_tasks = payload
        },
        setDateControlSends (state, payload) {
            state.date_control_sends = payload
        },
        setDateControlsArr (state, payload) {
            state.date_controls = payload
        },
        setTotalDateControls (state, payload) {
            state.total = payload
        },
        setDateControlTypes (state, payload) {
            state.date_controls_types = payload
        },
        setShablonDcList (state, payload) {
            state.shablon_dc_list = payload
        },
        setFuncDcList (state, payload) {
            state.func_dc_list = payload
        },
        setDateControlList (state, payload) {
            state.date_control_list = payload
        },
        setDCPeremList (state, payload) {
            state.dc_perem_list = payload
        },

    },
    actions: {
        getOneDateControlTaskSendData ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getOneDateControlTaskSendData',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        resolve(response.data)
                    }
                })
            })
        },
        getOneDateControlTaskData ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getOneDateControlTaskData',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        resolve(response.data)
                    }
                })
            })
        },
        getDateControlsTaskSendStatuses ({state, getters, commit, dispatch}, requestObject) {
            commit('setDateControlTaskSendStatuses', [])
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getDateControlsTaskSendStatuses',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setDateControlTaskSendStatuses', response.data.data)
                    }
                })
            })
        },
        getDateControlsTaskSends ({state, getters, commit, dispatch}, requestObject) {
            state.date_control_task_sends_loading_flag = true;
            commit('setDateControlsTaskSends', [])
            commit('setTotalDateControlsTaskSends', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getDateControlsTaskSends',
                        param: getters.DateControlTaskSend.pag
                    }
                }).then((response) => {
                    state.date_control_task_sends_loading_flag = false;
                    if (response.data.result) {
                        commit('setDateControlsTaskSends', response.data.data)
                        commit('setTotalDateControlsTaskSends', response.data.total)
                    }
                })
            })
        },
        getDateControlsTasks ({state, getters, commit, dispatch}, requestObject) {
            state.date_control_tasks_loading_flag = true;
            commit('setDateControlsTasks', [])
            commit('setTotalDateControlsTasks', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getDateControlsTasks',
                        param: getters.DateControlTask.pag
                    }
                }).then((response) => {
                    state.date_control_tasks_loading_flag = false;
                    if (response.data.result) {
                        commit('setDateControlsTasks', response.data.data)
                        commit('setTotalDateControlsTasks', response.data.total)
                    }
                })
            })
        },
        getDateControlTypes ({state, getters, commit, dispatch}, requestObject) {
            commit('setDateControlTypes', [])
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getDateControlTypes',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setDateControlTypes', response.data.types_all)
                        commit('setDCPeremList', response.data.types)
                    }
                })
            })
        },
        getDateControlArr ({state, getters, commit, dispatch}, requestObject) {
            state.date_controls_loading_flag = true;
            commit('setDateControlsArr', [])
            commit('setDateControlsStadArr', [])
            commit('setTotalDateControls', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getDateControlArr',
                        param: getters.DateControl
                    }
                }).then((response) => {
                    state.date_controls_loading_flag = false;
                    if (response.data.result) {
                        commit('setDateControlsArr', response.data.data)
                        commit('setDateControlsStadArr', response.data.stad)
                        commit('setTotalDateControls', response.data.total)
                    }
                })
            })
        },
        saveDateControl({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("dateControl.update"), {
                    params: {
                        method: 'saveDateControl',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDateControlArr');
                    }
                    resolve(response.data.result)
                })
            })
        },
        getShablonDcList ({state, getters, commit, dispatch}, requestObject) {
            commit('setShablonDcList', [])
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getShablonDcList',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setShablonDcList', response.data.data)
                    }
                })
            })
        },
        getFuncDcList ({state, getters, commit, dispatch}, requestObject) {
            commit('setFuncDcList', [])
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getFuncDcList',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setFuncDcList', response.data.data)
                    }
                })
            })
        },
        getDateControlDataInfo ({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getDateControlDataInfo',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        deleteDateControl({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("dateControl.update"), {
                    params: {
                        method: 'deleteDateControl',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDateControlArr');
                    }
                    resolve(response.data.result)
                })
            })
        },
        getDateControlList ({state, getters, commit, dispatch}, requestObject) {
            commit('setDateControlList', [])
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getDateControlList',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setDateControlList', response.data.data)
                    }
                })
            })
        },
        getPeremList ({state, getters, commit, dispatch}, requestObject) {
            commit('setDCPeremList', [])
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getPeremList',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setDCPeremList', response.data.data)
                    }
                })
            })
        },
        getDateControlSends ({state, getters, commit, dispatch}, requestObject) {
            state.date_control_sends_loading_flag = true;
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getDateControlSends',
                        param: requestObject
                    }
                }).then((response) => {
                    state.date_control_sends_loading_flag = false;
                    if (response.data.result) {
                        resolve(response.data.data)
                    }
                })
            })
        },
        getControlSends ({state, getters, commit, dispatch}, requestObject) {
            state.control_sends_loading_flag = true;
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getControlSends',
                        param: requestObject
                    }
                }).then((response) => {
                    state.control_sends_loading_flag = false;
                    if (response.data.result) {
                        resolve(response.data.data)
                    }
                })
            })
        },
        saveActiveDateControl({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("dateControl.update"), {
                    params: {
                        method: 'saveActiveDateControl',
                        param: requestObject
                    }
                }).then((response) => {
                    if(response.data.result){
                        dispatch('getDateControlArr');
                    }
                    resolve(response.data.result)
                })
            })
        },
        startOneDateControl({state, getters, commit, dispatch}, requestObject) {
            return new Promise((resolve, reject) => {
                axios.post(r("dateControl.update"), {
                    params: {
                        method: 'startOneDateControl',
                        param: requestObject
                    }
                }).then((response) => {
                    resolve(response.data)
                })
            })
        },
        getDateControlsTaskSendsPlan ({state, getters, commit, dispatch}, requestObject) {
            state.date_control_task_sends_plans_loading_flag = true;
            commit('setDateControlsTaskSendPlans', [])
            commit('setDateControlsTaskSendPlanTotal', 0)
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getDateControlsTaskSendsPlan',
                        param: getters.DateControlsTaskSendPlan
                    }
                }).then((response) => {
                    state.date_control_task_sends_plans_loading_flag = false;
                    if (response.data.result) {
                        commit('setDateControlsTaskSendPlans', response.data.data)
                        commit('setDateControlsTaskSendPlanTotal', response.data.total)
                    }
                    resolve(response.data)
                })
            })
        },
        getRazdelDcList ({state, getters, commit, dispatch}, requestObject) {
            commit('setRazdelDcList', [])
            return new Promise((resolve, reject) => {
                axios.get(r('dateControl.index'), {
                    params: {
                        method: 'getRazdelDcList',
                        param: requestObject
                    }
                }).then((response) => {
                    if (response.data.result) {
                        commit('setRazdelDcList', response.data.data)
                    }
                })
            })
        },
    }



}



