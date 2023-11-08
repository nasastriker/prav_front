import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import r from '../route'

Vue.use(Vuex)


export default {
  state: {
    user:{
      shabRecover:[],
      name: '',
      sex:'',
      name_family:'',
      email:'',
      phone:'',
      country:'',
      pag:{
        staticSud:{
          offset:0,
          limit:100,
          find:''
        },
        correspondence:{
          find:'',
          fast:true,
          offset:0,
          limit:50,
          status:0,
          id_recover:-2,
          num_recover:0,
          typeRecover:0,
          begin_date:'',
          end_date:'',
          typeCp_json:'[]',
          typeDebtor_json:'[]',
          name_delo_json:'[]',
          AdditionalFilters:{
            pensioner:[],
            typeCp:[],
            typeDebtor:[],
            region: -1,
            idJud : -1,
            fssp : -1,
            name_delo:[],
            number_ip:'',
            flag:1,
            id_user:-1

          }

        },
        sudErrors:{
          id_recover:0,
          num_recover:0,
          cession:0,
          typeRecover:0,
          date:''
        },
        fnsArhStatus:{
          offset:0,
          limit:100,
          find:''
        },
        taskSudHistory:{
          offset:0,
          limit:50,
          find:''
        },
        taskPaymentHistory:{
          offset:0,
          limit:50,
          find:''
        },
        jurisdictions:{
          offset:0,
          limit:50,
          find:''
        },
        bankSberAlfaReturnSa  :{
          offset:0,
          limit:50,
          find:''
        },
        importGosposhlina:{
          offset:0,
          limit:50,
          find:'',
          status:0
        },
        development:{
          offset:0,
          limit:100,
          find:'',
          new_msg:false
        },
        historyDebtorCreditView:{
          offset:0,
          limit:100,
          find:''
        },
        settingStadHistoryView:{
          offset:0,
          id:0,
          limit:100,
          find:''
        },
        historyDebtorView:{
          offset:0,
          limit:100,
          find:''
        },
        historyDebtorCreditSudView:{
          offset:0,
          limit:100,
          find:''
        },
        task_user:{
          offset:0,
          limit:100,
          find:''
        },
        fsspOtdels:{
          offset:0,
          limit:100,
          find:''
        },
        debtor:{
          offset:0,
          limit:10,
          find:''
        },
        reestr_delete:{
          offset:0,
          limit:10,
          filter:null,
          find:'',
          status:''
        },
          requestUser:{
              UserStatus:0,
              request:0,
              paginationPageSize:100,
          },
        controlStatus:{
          offset:0,
          limit:10,
          filter:null,
          find:'',
          status:''
        },
        sudPp:{
          offset:0,
          limit:10,
          filter:null,
          find:'',
          status:''
        },
        refine:{
          offset:0,
          limit:10,
          find:'',
          status:''
        },
        sudAct:{
          offset:0,
          limit:10,
          find:'',
          status:''
        },
        fssp_refine:{
          offset:0,
          limit:10,
          find:'',
          status:''
        },
        debtor_reestr:{
          offset:0,
          limit:10,
          find:''
        },
        judicial:{
          offset:0,
          limit:10,
          find:''
        },
        judicialAct:{
          offset:0,
          limit:10,
          find:''
        },
        historySoftJournal:{
          offset:0,
          limit:100,
          find:''
        },
        reestr_import:{
          offset:0,
          limit:10,
          find:''
        },
        sud:{
          offset:0,
          limit:10,
          find:'',
          status:''
        },
        credit:{
          offset:0,
          limit:10,
          fields:{},
          find:'',
          id_recover:-2,
          status:'',
          AdditionalFilters:{
            pensioner:[],
            pensioner_json:'[]',
            typeCp_json:'[]',
            typeDebtor_json:'[]',
            name_delo_json:'[]',
            typeCp:[],
            typeDebtor:[],
            region: -1,
            idJud : -1,
            fssp : -1,
            dateSud : '',
            dateIsk : '',
            dateFns :'',
              dateEndIp:0,
            dateResponseSa : '',
            dateBank : '',
            datePfr : '',
            dateFssp : '',
            name_delo:[],
            number_ip:'',
            id_user:-1
          }
        },
        reports:{
          offset:0,
          limit:10,
          find:'',
          status:'',
          list:[]
        },
        judicialArea:{
          offset:0,
          limit:150,
          find:''

        },

        email:{
          offset:0,
          limit:100,
          find:''
        },
        arbitrArea:{
          offset:0,
          limit:150,
          find:''

        },
        payments:{
          offset:0,
          limit:10,
          find:'',
          status:0
        },
        paymentsSo:{
          offset:0,
          limit:100,
          find:'',
          status:0
        },
        fssp_all_postans:{
          fields:"{\"doc_type\":{\"find\":\"all\",\"name\":\"doc_type\",\"type\":\"list\"}}",
          offset:0,
          limit:100,
          curPage:1,
          selectIdPost:0,
          no_found_only: 0,
        },
        fssp_all_money_codes:{
          fields:"{}",
          offset:0,
          limit:100,
          curPage:1,
          selectIdCode:0,
        },
        debtorPag:10,
        debtorReestr:10,
        refineFilter:'',
        refinePag:10
      }

    },
    userShab:[]


  },
  getters: {
    // ...
    User: state => {

      if (state.user.pag == null) {
        state.user.pag = {
          bankFsspDate:'',
          printOtprav:1,
          statHist:{
            offset:0,
            limit:100,
            date:null
          },
          reestr_delete:{
            offset:0,
            limit:10,
            filter:null,
            find:'',
            status:''
          },
          requestUser:{
              UserStatus:0,
              request:0,
              paginationPageSize:100,
          },
          controlStatus:{
            offset:0,
            limit:10,
            filter:null,
            find:'',
            status:''
          },
          sudPp:{
            offset:0,
            limit:10,
            find:'',
            filter:null,
            status:''
          },
          sudErrors:{
            id_recover:0,
            num_recover:0,
            cession:0,
            typeRecover:0,
            date:''
          },
          development:{
            offset:0,
            limit:100,
            find:'',
            new_msg:false
          },
          settingStadHistoryView:{
            offset:0,
            limit:100,
            find:''
          },
          historyDebtorCreditView:{
            offset:0,
            limit:100,
            find:''
          },
          historyDebtorView:{
            offset:0,
            limit:100,
            find:''
          },
          historyDebtorCreditSudView:{
            offset:0,
            limit:100,
            find:''
          },
          fnsArhStatus:{
            offset:0,
            limit:100,
            find:''
          },
          taskSudHistory:{
            offset:0,
            limit:50,
            find:''
          },
          taskPaymentHistory:{
            offset:0,
            limit:50,
            find:''
          },
          jurisdictions:{
            offset:0,
            limit:50,
            find:''
          },
          bankSberAlfaReturnSa  :{
            offset:0,
            limit:50,
            find:''
          },
          importGosposhlina:{
            offset:0,
            limit:50,
            find:'',
            status:0
          },
          task_user:{
            offset:0,
            limit:100,
            find:''
          },
          fsspOtdels:{
            offset:0,
            limit:100,
            find:''
          },
          staticSud:{
            offset:0,
            limit:100,
            find:''
          },
          correspondence:{
            find:'',
            offset:0,
            limit:50,
            fast:true,
            status:0,
            id_recover:-2,
            num_recover:0,
            typeRecover:0,
            begin_date:'',
            end_date:'',
            typeCp_json:'[]',
            typeDebtor_json:'[]',
            name_delo_json:'[]',
            AdditionalFilters:{
              pensioner:[],
              typeCp:[],
              typeDebtor:[],
              region: -1,
              idJud : -1,
              fssp : -1,
              name_delo:[],
              number_ip:'',
              flag:1,
              id_user:-1

            }

          },
          debtor:{
            offset:0,
            limit:10,
            find:''
          },
          fssp_refine:{
            offset:0,
            limit:100,
            find:'',
            status:''
          },
          sudAct:{
            offset:0,
            limit:10,
            find:'',
            status:''
          },
          refine:{
            offset:0,
            limit:10,
            find:''
          },
          debtor_reestr:{
            offset:0,
            limit:10,
            find:''
          },
          reestr_import:{
            offset:0,
            limit:10,
            find:''
          },
          judicial:{
            offset:0,
            limit:10,
            find:''
          },
          judicialAct:{
            offset:0,
            limit:10,
            find:''
          },
          historySoftJournal:{
            offset:0,
            limit:100,
            find:''
          },
          sud:{
            offset:0,
            limit:100,
            find:'',
            status:0
          },
          credit:{
            offset:0,
            limit:10,
            fields:{},
            find:'',
            id_recover:-2,
            status:'',
            AdditionalFilters: {
              pensioner: [],
              pensioner_json: '[]',
              typeCp_json: '[]',
              typeDebtor_json: '[]',
              name_delo_json: '[]',
              typeCp: [],
              typeDebtor: [],
              region: -1,
              idJud: -1,
              fssp: -1,
              dateSud: '',
              dateIsk: '',
              dateFns: '',
                dateEndIp:0,
              dateResponseSa: '',
              dateBank: '',
              datePfr: '',
              dateFssp: '',
              name_delo: [],
              number_ip: '',
              id_user: -1
            }

          },
          judicialArea:{
            offset:0,
            limit:150,
            find:''

          },
          arbitrArea:{
            offset:0,
            limit:150,
            find:''

          },
          pochta:{
            offset:0,
            limit:150,
            find:''

          },
          email:{
            offset:0,
            limit:100,
            find:''
          },
          sudOrder:{
            offset:0,
            limit:10,
            find:'',
            status:0
          },
          reports:{
            offset:0,
            limit:10,
            find:'',
            status:0,
            list:[]
          },
          payments:{
            offset:0,
            limit:10,
            find:'',
            status:0
          },
          paymentsSo:{
            offset:0,
            limit:100,
            find:'',
            status:0
          },
          debtorPag:10,
          debtorReestr:10,
          refineFilter:'',
          refinePag:10
        }

      }
      if (typeof state.user.pag === 'undefined') {
        state.user.pag = {
          bankFsspDate:'',
          sudErrors:{
            id_recover:0,
            num_recover:0,
            cession:0,
            typeRecover:0,
            date:''
          },
          reestr_delete:{
            offset:0,
            limit:10,
            filter:null,
            find:'',
            status:''
          },
            requestUser:{
                UserStatus:0,
                request:0,
                paginationPageSize:100,
            },
          controlStatus:{
            offset:0,
            limit:10,
            filter:null,
            find:'',
            status:''
          },
          sudPp:{
            offset:0,
            limit:10,
            find:'',
            filter:null,
            status:''
          },
          development:{
            offset:0,
            limit:100,
            find:'',
            new_msg:false
          },
          settingStadHistoryView:{
            offset:0,
            limit:100,
            find:''
          },
          historyDebtorCreditView:{
            offset:0,
            limit:100,
            find:''
          },
          historyDebtorView:{
            offset:0,
            limit:100,
            find:''
          },
          historyDebtorCreditSudView:{
            offset:0,
            limit:100,
            find:''
          },
          fnsArhStatus:{
            offset:0,
            limit:100,
            find:''
          },
          taskSudHistory:{
            offset:0,
            limit:50,
            find:''
          },
          taskPaymentHistory:{
            offset:0,
            limit:50,
            find:''
          },
          jurisdictions:{
            offset:0,
            limit:50,
            find:''
          },
          bankSberAlfaReturnSa  :{
            offset:0,
            limit:50,
            find:''
          },
          importGosposhlina:{
            offset:0,
            limit:50,
            find:'',
            status:0
          },
          task_user:{
            offset:0,
            limit:100,
            find:''
          },
          statHist:{
            offset:0,
            limit:100,
            date:null
          },
          fsspOtdels:{
            offset:0,
            limit:100,
            find:''
          },
          debtor:{
            offset:0,
            limit:10,
            find:''
          },
          staticSud:{
            offset:0,
            limit:100,
            find:''
          },
          correspondence:{
            find:'',
            offset:0,
            limit:50,
            fast:true,
            status:0,
            id_recover:-2,
            num_recover:0,
            typeRecover:0,
            begin_date:'',
            end_date:'',
            typeCp_json:'[]',
            typeDebtor_json:'[]',
            name_delo_json:'[]',
            AdditionalFilters:{
              pensioner:[],
              typeCp:[],
              typeDebtor:[],
              region: -1,
              idJud : -1,
              fssp : -1,
              name_delo:[],
              number_ip:'',
              flag:1,
              id_user:-1

            }

          },
          sudAct:{
            offset:0,
            limit:10,
            find:'',
            status:''
          },
          fssp_refine:{
            offset:0,
            limit:100,
            find:'',
            status:''
          },
          refine:{
            offset:0,
            limit:10,
            find:''
          },
          debtor_reestr:{
            offset:0,
            limit:10,
            find:''
          },
          reestr_import:{
            offset:0,
            limit:10,
            find:''
          },
          judicial:{
            offset:0,
            limit:10,
            find:'',
            status:0
          },
          judicialAct:{
            offset:0,
            limit:10,
            find:'',
            status:0
          },
          historySoftJournal:{
            offset:0,
            limit:100,
            find:''
          },
          sud:{
            offset:0,
            limit:100,
            find:'',
            status:0
          },
          credit:{
            offset:0,
            limit:10,
            find:'',
            fields:{},
            id_recover:-2,
            status:0,
            AdditionalFilters:{
              pensioner:[],
              pensioner_json:'[]',
              typeCp:[],
              typeCp_json:'[]',
              typeDebtor_json:'[]',
              name_delo_json:'[]',
              typeDebtor:[],
              region: -1,
              idJud : -1,
              fssp : -1,
              dateSud : '',
              dateIsk : '',
              dateFns :'',
                dateEndIp:0,
              dateResponseSa : '',
              dateBank : '',
              datePfr : '',
              dateFssp : '',
              name_delo:[],
              number_ip:'',
              id_user:-1
            }
          },
          sudOrder:{
            offset:0,
            limit:10,
            find:'',
            status:0
          },

          judicialArea:{
            offset:0,
            limit:150,
            find:''

          },
          arbitrArea:{
            offset:0,
            limit:150,
            find:''

          },
          pochta:{
            offset:0,
            limit:150,
            find:''

          },
          email:{
            offset:0,
            limit:100,
            find:''
          },
          reports:{
            offset:0,
            limit:10,
            find:'',
            status:0,
            list:[]
          },
          payments:{
            offset:0,
            limit:10,
            find:'',
            status:0
          },
          paymentsSo:{
            offset:0,
            limit:10,
            find:'',
            status:0
          },
          debtorPag:10,
          debtorReestr:10,
          refineFilter:'',
          refinePag:10
        }
      }
      if (typeof state.user.pag.statHist === 'undefined') {
        state.user.pag.statHist = {
          offset:0,
          limit:100,
          date:null


        }
      }
      if (typeof state.user.pag.reports === 'undefined') {
        state.user.pag.reports = {
          offset:0,
          limit:100,
          find:'',
          status:0,
          list:[]

        }
      }
      if (typeof state.user.pag.staticSud === 'undefined') {
        state.user.pag.staticSud = {
          offset:0,
          limit:100,
          find:''


        }
      }

      if (typeof state.user.pag.reestr_delete === 'undefined') {
        state.user.pag.reestr_delete = {
          offset:0,
          limit:10,
          filter:null,
          find:'',
          status:''

        }
      }
        if (typeof state.user.pag.requestUser === 'undefined') {
            state.user.pag.requestUser = {
                UserStatus:0,
                request:0,
                paginationPageSize:100,
            }
        }

      if (typeof state.user.pag.controlStatus === 'undefined') {
        state.user.pag.controlStatus = {
          offset:0,
          limit:10,
          filter:null,
          find:'',
          status:''


        }
      }
      if (typeof state.user.pag.sudPp === 'undefined') {
        state.user.pag.sudPp = {
          offset:0,
          limit:10,
          filter:null,
          find:'',
          status:''


        }
      }

      if (typeof state.user.pag.correspondence === 'undefined') {
        state.user.pag.correspondence = {
          find:'',
          offset:0,
          limit:50,
          fast:true,
          status:0,
          id_recover:-2,
          num_recover:0,
          typeRecover:0,
          begin_date:'',
          end_date:'',
          typeCp_json:'[]',
          typeDebtor_json:'[]',
          name_delo_json:'[]',
          AdditionalFilters:{
            pensioner:[],
            typeCp:[],
            typeDebtor:[],
            region: -1,
            idJud : -1,
            fssp : -1,
            name_delo:[],
            number_ip:'',
            flag:1,
            id_user:-1

          }


        }
      }


      if (typeof state.user.pag.sudAct === 'undefined') {
        state.user.pag.sudAct = {
          offset:0,
          limit:100,
          status:'',
          find:''


        }
      }
      if (typeof state.user.pag.fssp_refine === 'undefined') {
        state.user.pag.fssp_refine = {
          offset:0,
          limit:100,
          status:61,
          find:''


        }
      }
      if (typeof state.user.pag.refine === 'undefined') {
        state.user.pag.refine = {
          offset:0,
          limit:10,
          find:''


        }
      }

      if (typeof state.user.pag.debtor === 'undefined') {
        state.user.pag.debtor = {
          offset:0,
          limit:10,
          find:''


        }
      }
      if (typeof state.user.pag.task_user === 'undefined') {
        state.user.pag.task_user = {
          offset: 0,
          limit: 100,
          find: ''


        }
      }
      if (typeof state.user.pag.sudErrors === 'undefined') {
        state.user.pag.sudErrors = {
          num_recover:0,
          cession:0,
          typeRecover:0,
          date:''

        }
      }
      if (typeof state.user.pag.development === 'undefined') {
        state.user.pag.development = {
          offset:0,
          limit:100,
          find:'',
          new_msg:false

        }
      }
      if (typeof state.user.pag.settingStadHistoryView === 'undefined') {
        state.user.pag.settingStadHistoryView = {
          offset:0,
          limit:100,
          find:'',
          id:0,
        }
      }
      if (typeof state.user.pag.historyDebtorCreditView === 'undefined') {
        state.user.pag.historyDebtorCreditView = {
          offset:0,
          limit:100,
          find:''

        }
      }
      if (typeof state.user.pag.historyDebtorView === 'undefined') {
        state.user.pag.historyDebtorView = {
          offset:0,
          limit:100,
          find:''

        }
      }
      if (typeof state.user.pag.historyDebtorCreditSudView === 'undefined') {
        state.user.pag.historyDebtorCreditSudView = {
          offset:0,
          limit:100,
          find:''

        }
      }
      if (typeof state.user.pag.fnsArhStatus === 'undefined') {
        state.user.pag.fnsArhStatus = {
          offset:0,
          limit:100,
          find:''

        }
      }
      if (typeof state.user.pag.taskSudHistory === 'undefined') {
        state.user.pag.taskSudHistory = {
          offset:0,
          limit:50,
          find:''
        }
      }
      if (typeof state.user.pag.taskPaymentHistory === 'undefined') {
        state.user.pag.taskPaymentHistory = {
          offset:0,
          limit:50,
          find:''
        }
      }
      if (typeof state.user.pag.jurisdictions === 'undefined') {
        state.user.pag.jurisdictions = {
          offset:0,
          limit:50,
          find:''
        }
      }

      if (typeof state.user.pag.bankSberAlfaReturnSa === 'undefined') {
        state.user.pag.bankSberAlfaReturnSa = {
          offset:0,
          limit:50,
          find:''

        }
      }

      if (typeof state.user.pag.importGosposhlina === 'undefined') {
        state.user.pag.importGosposhlina = {
          limit:50,
          find:'',
          status:0

        }
      }

      if (typeof state.user.pag.fsspOtdels === 'undefined') {
        state.user.pag.fsspOtdels = {
          offset: 0,
          limit: 100,
          find: ''


        }
      }
      if (typeof state.user.pag.debtor_reestr === 'undefined') {
        state.user.pag.debtor_reestr = {
          offset: 0,
          limit: 10,
          find: ''


        }
      }
      if (typeof state.user.pag.reestr_import === 'undefined') {
        state.user.pag.reestr_import = {
          offset: 0,
          limit: 10,
          find: ''


        }
      }

      if (typeof state.user.pag.sudOrder === 'undefined') {
        state.user.pag.sudOrder = {
          offset: 0,
          limit: 10,
          find: '',
          status: 0


        }
      }
      if (typeof state.user.pag.sud === 'undefined') {
        state.user.pag.sud = {
          offset: 0,
          limit: 10,
          find: '',
          status: 0


        }
      }
      if (typeof state.user.pag.credit === 'undefined') {
        state.user.pag.credit = {
          offset:0,
          limit:10,
          fields:{},
          find:'',
          id_recover:-2,
          status:'',
          AdditionalFilters:{
            pensioner:[],
            pensioner_json:'[]',
            typeCp_json:'[]',
            typeDebtor_json:'[]',
            name_delo_json:'[]',
            typeCp:[],
            typeDebtor:[],
            region: -1,
            idJud : -1,
            fssp : -1,
            dateSud : '',
            dateIsk : '',
            dateFns :'',
              dateEndIp:0,
            dateResponseSa : '',
            dateBank : '',
            datePfr : '',
            dateFssp : '',
            name_delo:[],
            number_ip:'',
            id_user:-1
          }

        }
      }

      if (typeof state.user.pag.judicial === 'undefined') {
        state.user.pag.judicial = {
          offset: 0,
          limit: 10,
          find: '',
          status: 0


        }
      }
      if (typeof state.user.pag.bankArchReturn === 'undefined') {
        state.user.pag.bankArchReturn = {
          offset: 0,
          limit: 100,
          find: '',
          status: 0,
          date:null,
          bankStatus:'Все'


        }
      }
        if (typeof state.user.pag.bankArch === 'undefined') {
            state.user.pag.bankArch = {
                offset: 0,
                limit: 100,
                find: '',
                status: 0,
                date:null,
                bankStatus:'Все'


            }
        }
      if (typeof state.user.pag.judicialAct === 'undefined') {
        state.user.pag.judicialAct = {
          offset: 0,
          limit: 10,
          find: '',
          status: 0


        }
      }
      if (typeof state.user.pag.judicialAct === 'undefined') {
        state.user.pag.judicialAct = {
          offset: 0,
          limit: 10,
          find: '',
          status: 0


        }
      }
      if (typeof state.user.pag.judicialArea === 'undefined') {
        state.user.pag.judicialArea = {
          offset: 0,
          limit: 20,
          find: '',
          status: 0,
          list: []


        }
      }
      if (typeof state.user.pag.arbitrArea === 'undefined') {
        state.user.pag.arbitrArea = {
          offset: 0,
          limit: 20,
          find: '',
          status: 0,
          list: []


        }
      }
      if (typeof state.user.pag.pochta === 'undefined') {
        state.user.pag.pochta = {
          offset: 0,
          limit: 100,
          find: '',
          status: 0,
          list: []


        }
      }
      if (typeof state.user.pag.email === 'undefined') {
        state.user.pag.email = {
          offset:0,
          limit:100,
          find:''


        }
      }

      if (typeof state.user.pag.historySoftJournal === 'undefined') {
        state.user.pag.historySoftJournal = {
          offset: 0,
          limit: 10,
          find: '',
          status: 0


        }
      }
      if (typeof state.user.pag.payments === 'undefined') {
        state.user.pag.payments = {
          offset: 0,
          limit: 10,
          find: '',
          status: 0


        }
      }
      if (typeof state.user.pag.paymentsSo === 'undefined') {
        state.user.pag.paymentsSo = {
          offset: 0,
          limit: 10,
          find: '',
          status: 0


        }
      }

      return state.user
    },
    UserShab: state => {

      return state.userShab
    }
  },
  mutations: {

    setSudErrors (state, payload) {
      if (typeof state.user.pag.sudErrors === 'undefined')state.user.pag.sudErrors = {
        id_recover:0,
        num_recover:0,
        cession:0,
        typeRecover:0,
        date:''
      }
      if (typeof state.user.pag.sudErrors.id_recover === 'undefined')state.user.pag.sudErrors.id_recover = 0
      if (typeof state.user.pag.sudErrors.num_recover === 'undefined')state.user.pag.sudErrors.num_recover = 0
      if (typeof state.user.pag.sudErrors.cession === 'undefined')state.user.pag.sudErrors.cession = 0
      if (typeof state.user.pag.sudErrors.typeRecover === 'undefined')state.user.pag.sudErrors.typeRecover = 0
      if (typeof state.user.pag.sudErrors.date === 'undefined')state.user.pag.sudErrors.date = ''

      if (typeof payload['id_recover'] !== 'undefined')state.user.pag.sudErrors.id_recover = payload.id_recover
      if (typeof payload['num_recover'] !== 'undefined')state.user.pag.sudErrors.num_recover = payload.num_recover
      if (typeof payload['cession'] !== 'undefined')state.user.pag.sudErrors.cession = payload.cession
      if (typeof payload['typeRecover'] !== 'undefined')state.user.pag.sudErrors.typeRecover = payload.typeRecover
      if (typeof payload['date'] !== 'undefined')state.user.pag.sudErrors.date = payload.date
    },

    setCreditToUserPag (state, payload) {
      if (typeof state.user.pag.credit.offset === 'undefined')state.user.pag.credit.offset = 0
      if (typeof state.user.pag.credit.fields === 'undefined')state.user.pag.credit.fields = {}
      if (typeof state.user.pag.credit.id_recover === 'undefined')state.user.pag.credit.id_recover = -2
      if (typeof state.user.pag.credit.status === 'undefined')state.user.pag.credit.status = ''
      if ((typeof state.user.pag.credit.AdditionalFilters === 'undefined') && (state.user.pag.credit !== 'undefined')) {
        state.user.pag.credit.AdditionalFilters = {
          pensioner:[],
          pensioner_json:'[]',
          typeCp_json:'[]',
          typeDebtor_json:'[]',
          name_delo_json:'[]',
          typeCp:[],
          typeDebtor:[],
          region: -1,
          idJud : -1,
          fssp : -1,
          dateSud : '',
          dateEndIp:0,
          dateIsk : '',
          dateFns :'',
          dateResponseSa : '',
          dateBank : '',
          datePfr : '',
          dateFssp : '',
          name_delo:[],
          number_ip:'',
          id_user:-1
        }
      }
      if ((state.user.pag.credit.AdditionalFilters.pensioner === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.pensioner = []
      if ((state.user.pag.credit.AdditionalFilters.pensioner_json === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.pensioner_json = '[]'
      if ((state.user.pag.credit.AdditionalFilters.typeCp_json === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.typeCp_json = '[]'
      if ((state.user.pag.credit.AdditionalFilters.typeDebtor_json === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.typeDebtor_json = '[]'
      if ((state.user.pag.credit.AdditionalFilters.name_delo_json === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.name_delo_json = '[]'
      if ((state.user.pag.credit.AdditionalFilters.typeCp === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.typeCp = []
      if ((state.user.pag.credit.AdditionalFilters.typeDebtor === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.typeDebtor = []
      if ((state.user.pag.credit.AdditionalFilters.region === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.region = -1
      if ((state.user.pag.credit.AdditionalFilters.idJud === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.idJud = -1
      if ((state.user.pag.credit.AdditionalFilters.fssp === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.fssp = -1
      if ((state.user.pag.credit.AdditionalFilters.dateSud === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.dateSud = ''
      if ((state.user.pag.credit.AdditionalFilters.dateIsk === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.dateIsk = ''
      if ((state.user.pag.credit.AdditionalFilters.dateFns === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.dateFns = ''
      if ((state.user.pag.credit.AdditionalFilters.dateResponseSa === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.dateResponseSa = ''
      if ((state.user.pag.credit.AdditionalFilters.dateBank === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.dateBank = ''
      if ((state.user.pag.credit.AdditionalFilters.datePfr === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.datePfr = ''
      if ((state.user.pag.credit.AdditionalFilters.dateFssp === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.dateFssp = ''
      if ((state.user.pag.credit.AdditionalFilters.name_delo === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.name_delo = []
      if ((state.user.pag.credit.AdditionalFilters.number_ip === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.number_ip = ''
      if ((state.user.pag.credit.AdditionalFilters.dateEndIp === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.dateEndIp = 0
      if ((state.user.pag.credit.AdditionalFilters.id_user === 'undefined') && (typeof state.user.pag.credit.AdditionalFilters !== 'undefined')) state.user.pag.credit.AdditionalFilters.id_user = -1

      if (typeof payload['find'] !== 'undefined')state.user.pag.credit.find = payload.find
      if (typeof payload['fields'] !== 'undefined')  {
        if (Array.isArray(state.user.pag.credit.fields))state.user.pag.credit.fields = Object.assign({}, state.user.pag.credit.fields)
        Object.keys(payload['fields']).forEach((key) => {
          state.user.pag.credit.fields[key] = payload['fields'][key]
        })
      }
      if (typeof payload['offset'] !== 'undefined')state.user.pag.credit.offset = payload.offset
      if (typeof payload['status'] !== 'undefined')state.user.pag.credit.status = payload.status
      if (typeof payload['cession'] !== 'undefined')state.user.pag.credit.cession = payload.cession
      if (typeof payload['id_recover'] !== 'undefined')state.user.pag.credit.id_recover = payload.id_recover
      if (typeof payload['num_recover'] !== 'undefined')state.user.pag.credit.num_recover = payload.num_recover
      if (typeof payload['typeRecover'] !== 'undefined')state.user.pag.credit.typeRecover = payload.typeRecover
      if (typeof payload['AdditionalFilters'] !== 'undefined') if (typeof payload['AdditionalFilters'] === 'object') {
        if (typeof payload['AdditionalFilters']['region'] !== 'undefined')state.user.pag.credit.AdditionalFilters.region = payload.AdditionalFilters.region
        if (typeof payload['AdditionalFilters']['idJud'] !== 'undefined')state.user.pag.credit.AdditionalFilters.idJud = payload.AdditionalFilters.idJud
        if (typeof payload['AdditionalFilters']['fssp'] !== 'undefined')state.user.pag.credit.AdditionalFilters.fssp = payload.AdditionalFilters.fssp
        if (typeof payload['AdditionalFilters']['dateSud'] !== 'undefined')state.user.pag.credit.AdditionalFilters.dateSud = payload.AdditionalFilters.dateSud
        if (typeof payload['AdditionalFilters']['dateIsk'] !== 'undefined')state.user.pag.credit.AdditionalFilters.dateIsk = payload.AdditionalFilters.dateIsk
        if (typeof payload['AdditionalFilters']['dateFns'] !== 'undefined')state.user.pag.credit.AdditionalFilters.dateFns = payload.AdditionalFilters.dateFns
        if (typeof payload['AdditionalFilters']['dateResponseSa'] !== 'undefined')state.user.pag.credit.AdditionalFilters.dateResponseSa = payload.AdditionalFilters.dateResponseSa
        if (typeof payload['AdditionalFilters']['dateBank'] !== 'undefined')state.user.pag.credit.AdditionalFilters.dateBank = payload.AdditionalFilters.dateBank
        if (typeof payload['AdditionalFilters']['datePfr'] !== 'undefined')state.user.pag.credit.AdditionalFilters.datePfr = payload.AdditionalFilters.datePfr
        if (typeof payload['AdditionalFilters']['dateFssp'] !== 'undefined')state.user.pag.credit.AdditionalFilters.dateFssp = payload.AdditionalFilters.dateFssp
        if (typeof payload['AdditionalFilters']['number_ip'] !== 'undefined')state.user.pag.credit.AdditionalFilters.number_ip = payload.AdditionalFilters.number_ip
        if (typeof payload['AdditionalFilters']['dateEndIp'] !== 'undefined')state.user.pag.credit.AdditionalFilters.dateEndIp = payload.AdditionalFilters.dateEndIp
        if (typeof payload['AdditionalFilters']['id_user'] !== 'undefined')state.user.pag.credit.AdditionalFilters.id_user = payload.AdditionalFilters.id_user

        if (typeof payload['AdditionalFilters']['pensioner'] !== 'undefined') {
          state.user.pag.credit.AdditionalFilters.pensioner = []
          payload['AdditionalFilters']['pensioner'].forEach((val) => {
            state.user.pag.credit.AdditionalFilters.pensioner.push(val)
          })

          if (typeof payload['AdditionalFilters']['flag'] !== 'undefined')state.user.pag.credit.AdditionalFilters.pensioner_json = JSON.stringify(state.user.pag.credit.AdditionalFilters.pensioner)
        }
        if (typeof payload['AdditionalFilters']['typeCp'] !== 'undefined') {
          state.user.pag.credit.AdditionalFilters.typeCp.length = 0
          payload['AdditionalFilters']['typeCp'].forEach((val) => {
            state.user.pag.credit.AdditionalFilters.typeCp.push(val)
          })
          if (typeof payload['AdditionalFilters']['flag'] !== 'undefined')state.user.pag.credit.AdditionalFilters.typeCp_json = JSON.stringify(state.user.pag.credit.AdditionalFilters.typeCp)
        }
        if (typeof payload['AdditionalFilters']['name_delo'] !== 'undefined') {
          state.user.pag.credit.AdditionalFilters.name_delo.length = 0
          payload['AdditionalFilters']['name_delo'].forEach((val) => {
            state.user.pag.credit.AdditionalFilters.name_delo.push(val)
          })
          if (typeof payload['AdditionalFilters']['flag'] !== 'undefined') if (state.user.pag.credit.AdditionalFilters.name_delo.length != 0) {
            state.user.pag.credit.AdditionalFilters.name_delo_json = JSON.stringify(state.user.pag.credit.AdditionalFilters.name_delo)
          } else state.user.pag.credit.AdditionalFilters.name_delo_json = '[]'
        }
        if (typeof payload['AdditionalFilters']['typeDebtor'] !== 'undefined') {
          state.user.pag.credit.AdditionalFilters.typeDebtor.length = 0
          payload['AdditionalFilters']['typeDebtor'].forEach((val) => {
            state.user.pag.credit.AdditionalFilters.typeDebtor.push(val)
          })
          if (typeof payload['AdditionalFilters']['flag'] !== 'undefined')state.user.pag.credit.AdditionalFilters.typeDebtor_json = JSON.stringify(state.user.pag.credit.AdditionalFilters.typeDebtor)
        }
      }
    },

    setCorrespondenceToUserPag (state, payload) {
      if (typeof state.user.pag.correspondence.fields === 'undefined')state.user.pag.correspondence.fields = {}
      if (typeof state.user.pag.correspondence.id_recover === 'undefined')state.user.pag.correspondence.id_recover = -2
      if (typeof state.user.pag.correspondence.status === 'undefined')state.user.pag.correspondence.status = ''
      if (typeof state.user.pag.correspondence.fast === 'undefined')state.user.pag.correspondence.fast = true
      if ((typeof state.user.pag.correspondence.AdditionalFilters === 'undefined') && (state.user.pag.correspondence !== 'undefined')) {
        state.user.pag.correspondence.AdditionalFilters = {
          pensioner:[],
          pensioner_json:'[]',
          typeCp_json:'[]',
          typeDebtor_json:'[]',
          name_delo_json:'[]',
          typeCp:[],
          typeDebtor:[],
          region: -1,
          idJud : -1,
          fssp : -1,
          // dateSud : '',
          // dateIsk : '',
          // dateFns :'',
          // dateResponseSa : '',
          // dateBank : '',
          // datePfr : '',
          dateFssp : '',
          name_delo:[],
          number_ip:'',
          id_user:-1
        }
      }
      if ((state.user.pag.correspondence.AdditionalFilters.pensioner === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.pensioner = []
      if ((state.user.pag.correspondence.AdditionalFilters.pensioner_json === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.pensioner_json = '[]'
      if ((state.user.pag.correspondence.AdditionalFilters.typeCp_json === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.typeCp_json = '[]'
      if ((state.user.pag.correspondence.AdditionalFilters.typeDebtor_json === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.typeDebtor_json = '[]'
      if ((state.user.pag.correspondence.AdditionalFilters.name_delo_json === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.name_delo_json = '[]'
      if ((state.user.pag.correspondence.AdditionalFilters.typeCp === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.typeCp = []
      if ((state.user.pag.correspondence.AdditionalFilters.typeDebtor === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.typeDebtor = []
      if ((state.user.pag.correspondence.AdditionalFilters.region === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.region = -1
      if ((state.user.pag.correspondence.AdditionalFilters.idJud === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.idJud = -1
      if ((state.user.pag.correspondence.AdditionalFilters.fssp === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.fssp = -1
      if ((state.user.pag.correspondence.AdditionalFilters.dateSud === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.dateSud = ''
      if ((state.user.pag.correspondence.AdditionalFilters.dateIsk === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.dateIsk = ''
      if ((state.user.pag.correspondence.AdditionalFilters.dateFns === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.dateFns = ''
      if ((state.user.pag.correspondence.AdditionalFilters.dateResponseSa === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.dateResponseSa = ''
      if ((state.user.pag.correspondence.AdditionalFilters.dateBank === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.dateBank = ''
      if ((state.user.pag.correspondence.AdditionalFilters.datePfr === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.datePfr = ''
      if ((state.user.pag.correspondence.AdditionalFilters.dateFssp === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.dateFssp = ''
      if ((state.user.pag.correspondence.AdditionalFilters.name_delo === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.name_delo = []
      if ((state.user.pag.correspondence.AdditionalFilters.number_ip === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.number_ip = ''
      if ((state.user.pag.correspondence.AdditionalFilters.id_user === 'undefined') && (typeof state.user.pag.correspondence.AdditionalFilters !== 'undefined')) state.user.pag.correspondence.AdditionalFilters.id_user = -1
      if (typeof payload['find'] !== 'undefined')state.user.pag.correspondence.find = payload.find
      if (typeof payload['fields'] !== 'undefined')  {
        if (Array.isArray(state.user.pag.correspondence.fields))state.user.pag.correspondence.fields = Object.assign({}, state.user.pag.correspondence.fields)
        Object.keys(payload['fields']).forEach((key) => {
          state.user.pag.correspondence.fields[key] = payload['fields'][key]
        })
      }
      if (typeof payload['status'] !== 'undefined')state.user.pag.correspondence.status = payload.status
      if (typeof payload['fast'] !== 'undefined')state.user.pag.correspondence.fast = payload.fast
      if (typeof payload['begin_date'] !== 'undefined')state.user.pag.correspondence.begin_date = payload.begin_date
      if (typeof payload['end_date'] !== 'undefined')state.user.pag.correspondence.end_date = payload.end_date
      if (typeof payload['cession'] !== 'undefined')state.user.pag.correspondence.cession = payload.cession
      if (typeof payload['id_recover'] !== 'undefined')state.user.pag.correspondence.id_recover = payload.id_recover
      if (typeof payload['num_recover'] !== 'undefined')state.user.pag.correspondence.num_recover = payload.num_recover
      if (typeof payload['typeRecover'] !== 'undefined')state.user.pag.correspondence.typeRecover = payload.typeRecover
      if (typeof payload['AdditionalFilters'] !== 'undefined') if (typeof payload['AdditionalFilters'] === 'object') {
        if (typeof payload['AdditionalFilters']['region'] !== 'undefined')state.user.pag.correspondence.AdditionalFilters.region = payload.AdditionalFilters.region
        if (typeof payload['AdditionalFilters']['idJud'] !== 'undefined')state.user.pag.correspondence.AdditionalFilters.idJud = payload.AdditionalFilters.idJud
        if (typeof payload['AdditionalFilters']['fssp'] !== 'undefined')state.user.pag.correspondence.AdditionalFilters.fssp = payload.AdditionalFilters.fssp
        if (typeof payload['AdditionalFilters']['dateSud'] !== 'undefined')state.user.pag.correspondence.AdditionalFilters.dateSud = payload.AdditionalFilters.dateSud
        if (typeof payload['AdditionalFilters']['dateIsk'] !== 'undefined')state.user.pag.correspondence.AdditionalFilters.dateIsk = payload.AdditionalFilters.dateIsk
        if (typeof payload['AdditionalFilters']['dateFns'] !== 'undefined')state.user.pag.correspondence.AdditionalFilters.dateFns = payload.AdditionalFilters.dateFns
        if (typeof payload['AdditionalFilters']['dateResponseSa'] !== 'undefined')state.user.pag.correspondence.AdditionalFilters.dateResponseSa = payload.AdditionalFilters.dateResponseSa
        if (typeof payload['AdditionalFilters']['dateBank'] !== 'undefined')state.user.pag.correspondence.AdditionalFilters.dateBank = payload.AdditionalFilters.dateBank
        if (typeof payload['AdditionalFilters']['datePfr'] !== 'undefined')state.user.pag.correspondence.AdditionalFilters.datePfr = payload.AdditionalFilters.datePfr
        if (typeof payload['AdditionalFilters']['dateFssp'] !== 'undefined')state.user.pag.correspondence.AdditionalFilters.dateFssp = payload.AdditionalFilters.dateFssp
        if (typeof payload['AdditionalFilters']['number_ip'] !== 'undefined')state.user.pag.correspondence.AdditionalFilters.number_ip = payload.AdditionalFilters.number_ip
        if (typeof payload['AdditionalFilters']['id_user'] !== 'undefined')state.user.pag.correspondence.AdditionalFilters.id_user = payload.AdditionalFilters.id_user

        if (typeof payload['AdditionalFilters']['pensioner'] !== 'undefined') {
          state.user.pag.correspondence.AdditionalFilters.pensioner = []
          payload['AdditionalFilters']['pensioner'].forEach((val) => {
            state.user.pag.correspondence.AdditionalFilters.pensioner.push(val)
          })

          if (typeof payload['AdditionalFilters']['flag'] !== 'undefined')state.user.pag.correspondence.AdditionalFilters.pensioner_json = JSON.stringify(state.user.pag.correspondence.AdditionalFilters.pensioner)
        }
        if (typeof payload['AdditionalFilters']['typeCp'] !== 'undefined') {
          state.user.pag.correspondence.AdditionalFilters.typeCp.length = 0
          payload['AdditionalFilters']['typeCp'].forEach((val) => {
            state.user.pag.correspondence.AdditionalFilters.typeCp.push(val)
          })
          if (typeof payload['AdditionalFilters']['flag'] !== 'undefined')state.user.pag.correspondence.AdditionalFilters.typeCp_json = JSON.stringify(state.user.pag.correspondence.AdditionalFilters.typeCp)
        }
        if (typeof payload['AdditionalFilters']['name_delo'] !== 'undefined') {
          state.user.pag.correspondence.AdditionalFilters.name_delo.length = 0
          payload['AdditionalFilters']['name_delo'].forEach((val) => {
            state.user.pag.correspondence.AdditionalFilters.name_delo.push(val)
          })
          if (typeof payload['AdditionalFilters']['flag'] !== 'undefined') if (state.user.pag.correspondence.AdditionalFilters.name_delo.length != 0) {
            state.user.pag.correspondence.AdditionalFilters.name_delo_json = JSON.stringify(state.user.pag.correspondence.AdditionalFilters.name_delo)
          } else state.user.pag.correspondence.AdditionalFilters.name_delo_json = '[]'
        }
        if (typeof payload['AdditionalFilters']['typeDebtor'] !== 'undefined') {
          state.user.pag.correspondence.AdditionalFilters.typeDebtor.length = 0
          payload['AdditionalFilters']['typeDebtor'].forEach((val) => {
            state.user.pag.correspondence.AdditionalFilters.typeDebtor.push(val)
          })
          if (typeof payload['AdditionalFilters']['flag'] !== 'undefined')state.user.pag.correspondence.AdditionalFilters.typeDebtor_json = JSON.stringify(state.user.pag.correspondence.AdditionalFilters.typeDebtor)
        }
      }
    },


    setQueryReportsLimit (state, payload) {
      state.user.pag.reports.limit = payload

    },
    setQueryPaymentsLimit (state, payload) {
      state.user.pag.payments.limit = payload

    },
    setQueryPaymentsOffset (state, payload) {

      state.user.pag.payments.offset = payload * state.user.pag.payments.limit

    },
    setQueryCorrespondenceLimit (state, payload) {
      state.user.pag.correspondence.limit = payload

    },
    setQueryCorrespondenceOffset (state, payload) {

      state.user.pag.correspondence.offset = payload * state.user.pag.payments.limit

    },
    setDevelopmentLimit (state, payload) {
      state.user.pag.development.limit = payload

    },

    setDevelopmentOffset (state, payload) {

      state.user.pag.development.offset = payload * state.user.pag.development.limit

    },
    setHistoryDebtorCreditViewLimit (state, payload) {
      state.user.pag.historyDebtorCreditView.limit = payload

    },
    setHistoryDebtorViewLimit (state, payload) {
      state.user.pag.historyDebtorView.limit = payload

    },
    setHistoryDebtorCreditSudViewLimit (state, payload) {
      state.user.pag.historyDebtorCreditSudView.limit = payload

    },

    setHistoryDebtorCreditViewOffset (state, payload) {

      state.user.pag.historyDebtorCreditView.offset = payload * state.user.pag.historyDebtorCreditView.limit

    },
    setHistoryDebtorViewOffset (state, payload) {

      state.user.pag.historyDebtorView.offset = payload * state.user.pag.historyDebtorView.limit

    },
    setHistoryDebtorCreditSudViewOffset (state, payload) {

      state.user.pag.historyDebtorCreditSudView.offset = payload * state.user.pag.historyDebtorCreditSudView.limit

    },
    setFnsArhStatusLimit (state, payload) {
      state.user.pag.fnsArhStatus.limit = payload

    },

    setFnsArhStatusOffset (state, payload) {

      state.user.pag.fnsArhStatus.offset = payload * state.user.pag.fnsArhStatus.limit

    },
    setQueryFnsArhStatusLimit (state, payload) {
      state.user.pag.fnsArhStatus.limit = payload
    },
    setQueryFnsArhStatusOffset (state, payload) {
      state.user.pag.fnsArhStatus.offset = payload * state.user.pag.fnsArhStatus.limit
    },


    setTaskSudHistoryLimit (state, payload) {
      state.user.pag.taskSudHistory.limit = payload

    },

    setTaskSudHistoryOffset (state, payload) {

      state.user.pag.taskSudHistory.offset = payload * state.user.pag.taskSudHistory.limit

    },

    setQuerytaskPaymentHistoryLimit (state, payload) {
      state.user.pag.taskPaymentHistory.limit = payload
    },
    setQuerytaskPaymentHistoryOffset (state, payload) {
      state.user.pag.taskPaymentHistory.offset = payload * state.user.pag.taskPaymentHistory.limit
    },
    setJurisdictionsLimit (state, payload) {
      state.user.pag.jurisdictions.limit = payload

    },

    setJurisdictionsyOffset (state, payload) {

      state.user.pag.jurisdictions.offset = payload * state.user.pag.jurisdictions.limit

    },
    setQueryJurisdictionsyLimit (state, payload) {
      state.user.pag.jurisdictions.limit = payload
    },
    setQueryJurisdictionsOffset (state, payload) {
      state.user.pag.jurisdictions.offset = payload * state.user.pag.jurisdictions.limit
    },


    setBankSberAlfaReturnSaLimit (state, payload) {
      state.user.pag.bankSberAlfaReturnSa.limit = payload

    },

    setBbankSberAlfaReturnSaOffset (state, payload) {

      state.user.pag.bankSberAlfaReturnSa.offset = payload * state.user.pag.bankSberAlfaReturnSa.limit

    },
    setQueryBankSberAlfaReturnSaLimit (state, payload) {
      state.user.pag.bankSberAlfaReturnSa.limit = payload
    },
    setQueryBankSberAlfaReturnSasOffset (state, payload) {
      state.user.pag.bankSberAlfaReturnSa.offset = payload * state.user.pag.bankSberAlfaReturnSa.limit
    },


    setImportGosposhlinaLimit (state, payload) {
      state.user.pag.importGosposhlina.limit = payload

    },

    setImportGosposhlinaOffset (state, payload) {

      state.user.pag.importGosposhlina.offset = payload * state.user.pag.importGosposhlina.limit

    },
    setQueryImportGosposhlinaLimit (state, payload) {
      state.user.pag.importGosposhlina.limit = payload
    },
    setQueryImportGosposhlinaOffset (state, payload) {
      state.user.pag.importGosposhlina.offset = payload * state.user.pag.importGosposhlina.limit
    },


    setQueryPaymentsSoLimit (state, payload) {
      state.user.pag.paymentsSo.limit = payload

    },
    setQueryPaymentsSoOffset (state, payload) {

      state.user.pag.paymentsSo.offset = payload * state.user.pag.paymentsSo.limit

    },
    setQuerySudLimit (state, payload) {
      state.user.pag.sud.limit = payload

    },
    setQueryCreditsLimit (state, payload) {
      state.user.pag.credit.limit = payload

    },
    setQuerySudOrdersLimit (state, payload) {
      state.user.pag.sudOrder.limit = payload

    },
    setQuerySudOrdersOffset (state, payload) {

      state.user.pag.sudOrder.offset = payload * state.user.pag.sudOrder.limit

    },
    setQuerySudOffset (state, payload) {

      state.user.pag.sud.offset = payload * state.user.pag.sud.limit

    },
    setQueryEmailOffset (state, payload) {

      state.user.pag.email.offset = payload * state.user.pag.email.limit

    },
    setQueryCreditsOffset (state, payload) {

      state.user.pag.credit.offset = payload * state.user.pag.credit.limit

    },
    setQueryAllFsspPostansOffset(state, payload) {
      state.user.pag.fssp_all_postans.offset = payload*state.user.pag.fssp_all_postans.limit
    },
    setQueryAllFsspPostansLimit (state, payload) {
      state.user.pag.fssp_all_postans.limit = payload
    },
    setQueryAllFsspMoneyCodesOffset(state, payload) {
      state.user.pag.fssp_all_money_codes.offset = payload*state.user.pag.fssp_all_money_codes.limit
    },
    setQueryAllFsspMoneyCodesLimit (state, payload) {
      state.user.pag.fssp_all_money_codes.limit = payload
    },

    setQueryReportsOffset (state, payload) {

      state.user.pag.reports.offset = payload * state.user.pag.reports.limit

    },
    setQueryRefineLimit (state, payload) {
      state.user.pag.refine.limit = payload

    },
    setQueryBankArchReturnLimit (state, payload) {
      state.user.bankArchReturn.limit = payload

    },
    setQueryRefineOffset (state, payload) {

      state.user.pag.refine.offset = payload * state.user.pag.refine.limit

    },
    setQueryFsspRefineOffset (state, payload) {

      state.user.pag.fssp_refine.offset = payload * state.user.pag.fssp_refine.limit

    },

    setQueryDebtorsLimit (state, payload) {
      state.user.pag.debtor.limit = payload

    },
    setQueryDebtorsOffset (state, payload) {

      state.user.pag.debtor.offset = payload * state.user.pag.debtor.limit

    },
    setQueryJudicalLimit (state, payload) {
      state.user.pag.judicial.limit = payload

    },
    setEmailLimit (state, payload) {
      state.user.pag.email.limit = payload

    },
    setQueryJudicalAreaLimit (state, payload) {
      state.user.pag.judicialArea.limit = payload

    },
    setQueryArbitrAreaLimit (state, payload) {
      state.user.pag.arbitrArea.limit = payload

    },
    setQueryPochtaLimit (state, payload) {
      state.user.pag.pochta.limit = payload

    },
    setQueryJudicalActLimit (state, payload) {
      state.user.pag.judicialAct.limit = payload

    },
    setQueryHistorySoftJournalLimit (state, payload) {
      state.user.pag.historySoftJournal.limit = payload

    },
    setQueryFsspOtdelsLimit (state, payload) {
      state.user.pag.fsspOtdels.limit = payload

    },
    setQuerySudActLimit (state, payload) {
      state.user.pag.sudAct.limit = payload

    },
    setQueryBankArchReturnOffset (state, payload) {

      state.user.pag.bankArchReturn.offset = payload * state.user.pag.bankArchReturn.limit

    },
    setQueryBankArchOffset (state, payload) {

          state.user.pag.bankArch.offset = payload * state.user.pag.bankArch.limit

    },
    setQueryJudicalOffset (state, payload) {

      state.user.pag.judicial.offset = payload * state.user.pag.judicial.limit

    },
    setQueryJudicalAreaOffset (state, payload) {

      state.user.pag.judicialArea.offset = payload * state.user.pag.judicialArea.limit

    },
    setQueryArbitrAreaOffset (state, payload) {

      state.user.pag.arbitrArea.offset = payload * state.user.pag.arbitrArea.limit

    },
    setQueryPochtaOffset (state, payload) {

      state.user.pag.pochta.offset = payload * state.user.pag.pochta.limit

    },
    setQueryJudicalActOffset (state, payload) {

      state.user.pag.judicialAct.offset = payload * state.user.pag.judicialAct.limit

    },
    setQueryHistorySoftJournalOffset (state, payload) {

      state.user.pag.historySoftJournal.offset = payload * state.user.pag.historySoftJournal.limit

    },
    setQueryFsspOtdelsOffset (state, payload) {

      state.user.pag.fsspOtdels.offset = payload * state.user.pag.fsspOtdels.limit

    },
    setQuerySudActOffset (state, payload) {

      state.user.pag.sudAct.offset = payload * state.user.pag.sudAct.limit

    },
    setQueryDebtorsReestrLimit (state, payload) {
      state.user.pag.debtor_reestr.limit = payload

    },
    setQueryReestrImportLimit (state, payload) {
      state.user.pag.reestr_import.limit = payload

    },
    setQueryReestrImportOffset (state, payload) {

      state.user.pag.reestr_import.offset = payload * state.user.pag.reestr_import.limit

    },
    setQueryDebtorsReestrOffset (state, payload) {

      state.user.pag.debtor_reestr.offset = payload * state.user.pag.debtor_reestr.limit

    },
    setUser (state, payload) {
      state.user = payload

    },
    setUserShab (state, payload) {
      state.userShab = payload

    }
  },
  actions: {


    getDataUserShab ({commit}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        axios.get(r('users.index'), {
          params: {
            method: 'getDataUserShab',
            param: ''
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setUserShab', response.data.data)
          }


        })

      })
    },
    getDataUser ({commit}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        axios.get(r('users.index'), {
          params: {
            method: 'getUser',
            param: ''
          }
        }).then((response) => {
          if (response.data.result) {
            commit('setUser', response.data.user)
            commit('setCreditToUserPag', response.data.user.pag.credit)
          }
          resolve(response)


        })

      })
    },
    setUserShab ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        axios.post(r('users.update'), {
          params: {
            method: 'setUserShab',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataUserShab')
          }
          resolve(response.data.result)


        })

      })
    },
    delUserShab ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        axios.post(r('users.update'), {
          params: {
            method: 'delUserShab',
            param: requestObject
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataUserShab')
          }
          resolve(response.data.result)


        })

      })
    },
    setDataUserPag ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        axios.post(r('users.update'), {
          params: {
            method: 'setUserPag',
            param: getters.User
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataUser')
          }
          resolve(response.data.result)


        })

      })
    },
    setDataUser ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        axios.post(r('users.update'), {
          params: {
            method: 'setDataUser',
            param: getters.User
          }
        }).then((response) => {
          if (response.data.result) {
            dispatch('getDataUser')
          }
          resolve(response.data.result)


        })

      })
    },
    setAvatar ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('avatar', requestObject[0])
        axios.post('/users/post-avatar',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then((response) => {
          if (response.data.result) {
            dispatch('getDataUser')

          }
          resolve(response.data.result)
        })

      })
    },
    resetPassword ({state, getters, commit, dispatch}, requestObject) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`

        axios.post(r('users.update'), {
          params: {
            method: 'resetPassword',
            param:{
              password: requestObject.pass,
              password_confirmation: requestObject.passConf
            }

          }
        }).then((response) => {

          resolve(response.data.result)


        })

      })
    }

  }


}

