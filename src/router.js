
import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/auth/authService'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/adm/users',
          name: 'users',
          component: () => import('./views/Admin/Users.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/adm/calculatevars',
          name: 'calculatevars',
          component: () => import('./views/Admin/CalculateVars.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/adm/service_manager',
          name: 'service_manager',
          component: () => import('./views/Admin/ServiceManager/ServiceManager.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/adm/services/:id',
          name: 'ServiceID',
          component: () => import('./views/Admin/ServiceManager/ServiceID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/adm/services_info/:id',
          name: 'ServiceInfoID',
          component: () => import('./views/Admin/ServiceManager/GoTask.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fileManager',
          name: 'fileManager',
          component: () => import('./views/FileManager/FileManager.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/adm/email',
          name: 'email',
          component: () => import('./views/Admin/Email/Email.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/pochta',
          name: 'pochta',
          component: () => import('./views/Pochta/Pochta.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/setting_stad',
          name: 'setting_stad',
          component: () => import('./views/SettingStad/SettingStad.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/stavkaCB',
          name: 'StavkaCB',
          component: () => import('./views/Handbook/RateCB.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/stavkaCB/:id',
          name: 'StavkaCBID',
          component: () => import('./views/Handbook/RateCBID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/adm/email/:id',
          name: 'EmailID',
          component: () => import('./views/Admin/Email/EmailID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/import_folder',
          name: 'import_folder',
          component: () => import('./views/ImportFromFolder/ImportFromFolder.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/import_folder/:id',
          name: 'import_folderId',
          component: () => import('./views/ImportFromFolder/ImportFromFolderTaskId.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/auto_task_sets',
          name: 'auto_task_sets',
          component: () => import('./views/Task/AutoTaskSettings/AutoTaskSettings.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/auto_task_sets_tasks/:id',
          name: 'auto_task_sets_tasks',
          component: () => import('./views/Task/AutoTaskSettings/AutoTaskSettingsTasks.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/task',
          name: 'task',
          component: () => import('./views/Task/Task.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/task/:id',
          name: 'taskId',
          component: () => import('./views/Task/TaskNewID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/controlStatus',
          name: 'controlStatus',
          component: () => import('./views/ControlStatus/ControlStatus.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/controlStatus/:id',
          name: 'controlStatusId',
          component: () => import('./views/ControlStatus/ControlStatusID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/strategyPeremen',
          name: 'strategyPeremen',
          component: () => import('./views/StrategyPeremen/StrategyPeremen.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/strategyPeremen/:id',
          name: 'strategyPeremenId',
          component: () => import('./views/StrategyPeremen/StrategyPeremenID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/adm/task_user',
          name: 'task_user',
          component: () => import('./views/Admin/Task.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/adm/task_user/:id',
          name: 'TaskUsersID',
          component: () => import('./views/Admin/TaskID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/adm/task',
          name: 'admin_task',
          component: () => import('./views/Admin/Task/TaskMain.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/adm/task/:id',
          name: 'TaskID',
          component: () => import('./views/Admin/Task/TaskID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/adm/funcshedule',
          name: 'FuncShedule',
          component: () => import('./views/Func/FuncShedule.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/adm/funcshedule/:id',
          name: 'FuncSheduleID',
          component: () => import('./views/Func/FuncSheduleID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },

        {
          path: '/adm/system',
          name: 'system',
          component: () => import('./views/Admin/System.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/adm/setting',
          name: 'setting',
          component: () => import('./views/Admin/Setting.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/adm/user_access',
          name: 'user_access',
          component: () => import('./views/Admin/UserAccess/UserAccess.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },


        {
          path: '/statistics',
          name: 'statistics',
          component: () => import('./views/Statistics/StatisticsMain.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/bankrot/sud',
          name: 'Bankrot',
          component: () => import('./views/Bankrot/Bankrot.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/bankrot/answer',
          name: 'bankrot_answer',
          component: () => import('./views/Regmail/ShabFind.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/buh/arch',
          name: 'buhArch',
          component: () => import('./views/Buh/ArchPP/PP.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/buh/sogl',
          name: 'buhSogl',
          component: () => import('./views/Soglashenie/Sogl.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/soglashenie',
          name: 'soglashenie',
          component: () => import('./views/Soglashenie/Sogl.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/control',
          name: 'control',
          component: () => import('./views/Control/Control.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: 'requestPp',
          name: 'request_pp',
          component: () => import('./views/RequestPP/RequestPP.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: 'requestPp/:id',
          name: 'request_pp_id',
          component: () => import('./views/RequestPP/RequestPPId.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: 'request_pp/sud',
          name: 'request_pp_sud',
          component: () => import('./views/SudRequest/SudRequest.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },

        {
          path: '/dosud/reestr',
          name: 'dosudReestr',
          component: () => import('./views/Dosud/Reestr.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/dosud/reestr_debtor',
          name: 'reestr_debtor',
          component: () => import('./views/Dosud/ReestrDebtor.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/dosud/strategy_settings',
          name: 'strategy_settings',
          component: () => import('./views/Dosud/StrategySettings.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/dosud/scripts_settings',
          name: 'scripts_settings',
          component: () => import('./views/Dosud/ScriptsSettings.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/dosud/reestr/:id',
          name: 'dosudReestrID',
          component: () => import('./views/Dosud/ReestrID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/dosud/request',
          name: 'dosudRequest',
          component: () => import('./views/Dosud/Request.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },

        {
          path: '/dosud/request/:id',
          name: 'RequestUserID',
          component: () => import('./views/Dosud/RequestUserID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },

        {
          path: '/dosud/soft',
          name: 'dosudSoft',
          component: () => import('./views/Dosud/Soft/Soft.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/dosud/soft/email/:id',
          name: 'dosudSoftEmailID',
          component: () => import('./views/Dosud/Soft/TemplID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/dosud/soft/pochta/:id',
          name: 'dosudSoftPochtaID',
          component: () => import('./views/Dosud/Soft/TemplID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/dosud/soft/sms/:id',
          name: 'dosudSoftSmsID',
          component: () => import('./views/Dosud/Soft/TemplID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/dosud/soft/voice/:id',
          name: 'dosudSoftVoiceID',
          component: () => import('./views/Dosud/Soft/TemplID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },

        {
          path: '/reestrPochta',
          name: 'reestrPochta',
          component: () => import('./views/Rabsud/ReestrPochta.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/rabsud/sud',
          name: 'rabsud_sud',
          component: () => import('./views/Rabsud/Sud/Sud.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/rabsud/sud/:id',
          name: 'rabsud_sud_id',
          component: () => import('./views/Rabsud/Sud/SudPochtaId.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/rabsud/sudsend',
          name: 'rabsud-sudsend',
          component: () => import('./views/Rabsud/Sud/SudSend.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/rabsud/isk',
          name: 'rabsud-isk',
          component: () => import('./views/Rabsud/Isk/Isk.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },

        {
          path: '/fns/arhiv',
          name: 'arhiv-fns',
          component: () => import('./views/Fns/Fns.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fns/arhiv/:id',
          name: 'arhiv_fns_id',
          component: () => import('./views/Fns/FnsSaId.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fns/work',
          name: 'work-fns',
          component: () => import('./views/Fns/FnsWork.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fns/work/:id',
          name: 'work-fnsID',
          component: () => import('./views/Fns/FnsWorkID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fns/answer',
          name: 'fns_answer',
          component: () => import('./views/Regmail/ShabFind.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fns/answerfiles/:id',
          name: 'fns_answerfiles',
          component: () => import('./views/Fns/FnsFileRequestWork.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fns/answer_debtor/:id',
          name: 'fns_answer_debtor',
          component: () => import('./views/Fns/FnsAnswerDebtor.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/upload_files',
          name: 'upload_files',
          component: () => import('./views/UploadFiles/UploadFiles.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp/refine',
          name: 'fssp_refine',
          component: () => import('./views/Fssp/FsspRefine.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp_refine/:id',
          name: 'fssp_refineId',
          component: () => import('./views/Fssp/FsspRefineID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp/refineOsp',
          name: 'fssp_refine_osp',
          component: () => import('./views/Fssp/FsspRefineOsp.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp_refine_osp/:id',
          name: 'fssp_refine_ospId',
          component: () => import('./views/Fssp/FsspRefineOspID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp/answer',
          name: 'fssp_answer',
          component: () => import('./views/Regmail/ShabFind.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp/fssp_return',
          name: 'fssp_return',
          component: () => import('./views/Fssp/FsspReturnSa.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },


        {
          path: '/fssp/arhiv',
          name: 'arhiv_fssp',
          component: () => import('./views/Fssp/FsspArchiv.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp/arhiv/pochta/:id',
          name: 'arhiv_fssp_pochta_id',
          component: () => import('./views/Fssp/FsspArchPochtaId.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp/arhiv/fssp/:id',
          name: 'arhiv_fssp_fssp_id',
          component: () => import('./views/Fssp/FsspArchFsspId.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp/journal',
          name: 'journal-fssp',
          component: () => import('./views/Fssp/FsspJournalAll.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/date_controls',
          name: 'date_controls',
          component: () => import('./views/DateControls/DateControls.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/status_controls',
          name: 'status_controls',
          component: () => import('./views/StatusControl/StatusControls.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/unrecognized_files',
          name: 'unrecognized_files',
          component: () => import('./views/UnrecognizedFiles/UnrecognizedFiles.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/unrecognized_files/:id',
          name: 'unrecognized_files_id',
          component: () => import('./views/UnrecognizedFiles/UnrecognizedFilesData.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/status_control_credits/:id',
          name: 'status_control_credits',
          component: () => import('./views/StatusControl/StatusControlTaskCredits.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/bank/answer',
          name: 'bank_answer',
          component: () => import('./views/Regmail/ShabFind.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/bank/sber_alfa',
          name: 'sber_alfa',
          component: () => import('./views/Bank/Bank.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/bank/sber_alfa/:id',
          name: 'sber_alfa_id',
          component: () => import('./views/Bank/BankId.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/bank/sber_alfa_return_sa',
          name: 'sber_alfa_return_sa',
          component: () => import('./views/Bank/BankSberAlfaReturnSa.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/bank/other_return_sa',
          name: 'other_return_sa',
          component: () => import('./views/Bank/BankOtherReturnSa.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/bank/other_return_people',
          name: 'other_return_sa_people',
          component: () => import('./views/Bank/BankReturn.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/bank/sber_alfa_sa',
          name: 'sber_alfa_sa',
          component: () => import('./views/Bank/BankSberAlfaSa.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/bank/sber_alfa_sa/:id',
          name: 'sber_alfa_sa_id',
          component: () => import('./views/Bank/BankSaId.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/bki_load',
          name: 'bki_load',
          component: () => import('./views/BKI/BKICredoLoad.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
          {
              path: '/bki_load/:id',
              name: 'BKILoadID',
              component: () => import('./views/BKI/BKILoadID.vue'),
              meta: {
                  rule: 'editor',
                  authRequired:true,
                  no_scroll: true
              }
          },
        {
          path: '/bank/other_sa',
          name: 'other_sa',
          component: () => import('./views/Bank/BankOtherSa.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },


        {
          path: '/pfr/pfr_arch',
          name: 'pfr_arch',
          component: () => import('./views/Pfr/Pfr.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/pfr/pfr_arch/:id',
          name: 'pfr_arch_id',
          component: () => import('./views/Pfr/PfrPochtaId.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },

        {
          path: '/reestr_delete',
          name: 'reestr_delete',
          component: () => import('./views/ReestrDelete/ReestrDelete.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/reestr_delete/:id',
          name: 'reestr_deleteID',
          component: () => import('./views/ReestrDelete/ReestrDeleteID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },

        {
          path: '/refine',
          name: 'refine',
          component: () => import('./views/Refine/RefineMain.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },

        {
          path: '/adm/pochtaSettings',
          name: 'pochtaSettings',
          component: () => import('./views/Admin/PochtaSettings/PochtaSettings.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/refine_address/:id',
          name: 'refine_addressID',
          component: () => import('./views/Refine/RefineAddressS.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/Refine/:id',
          name: 'refineID',
          component: () => import('./views/Refine/RefineID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/refine_ut/:id',
          name: 'refineIDU',
          component: () => import('./views/Refine/RefinePodsuAddress.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/regmail',
          name: 'regmail',
          component: () => import('./views/Regmail/ShabFind.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/regsudact',
          name: 'regsudact',
          component: () => import('./views/RegSudAct/RegSudAct.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/load_fssp_document',
          name: 'load_fssp_document',
          component: () => import('./views/Fssp/LoadDocument.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },

        {
          path: '/adm/users/:id',
          name: 'UsersID',
          component: () => import('./views/Admin/UsersID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/adm/calculatevars/:id',
          name: 'CalculateVarsID',
          component: () => import('./views/Admin/CalculateVarID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/adm/calculation/:id',
          name: 'CalculationsID',
          component: () => import('./views/Admin/CalculationsID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/adm/calculation/:id_reestr/:id',
          name: 'CalculateVarInListID',
          component: () => import('./views/Admin/CalculateVarInListID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/adm/calculation',
          name: 'Calculations',
          component: () => import('./views/Admin/Calculations.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        // Маршруты сайта
        {
          path: '/site/faq',
          name: 'faq',
          component: () => import('./views/Site/Faq.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/site/faq/:id',
          name: 'faqID',
          component: () => import('./views/Site/FaqNew.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },

        {
          path: '/site/dogovora',
          name: 'dogovora',
          component: () => import('./views/Site/Dogovora/Dogovora.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/site/dogovora/:id',
          name: 'dogovoraID',
          component: () => import('./views/Site/Dogovora/DogovoraID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/handbook/paymentType',
          name: 'PaymentType',
          component: () => import('./views/Handbook/PaymentsType/PaymentType.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/paymentType/:id',
          name: 'PaymentTypeID',
          component: () => import('./views/Handbook/PaymentsType/PaymentTypeID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        // маршрут ограничение процентов
        {
          path: '/handbook/ogrn',
          name: 'Ogrnprocent',
          component: () => import('./views/Handbook/OgrnProcent.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/ogrn/:id',
          name: 'OgrnprocentlID',
          component: () => import('./views/Handbook/OgrnProcentID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },

        // арбитражные суды
        {
          path: '/handbook/arbitr-act',
          name: 'ArbitrAct',
          component: () => import('./views/Handbook/ArbitrArea.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/arbitr-act/:id',
          name: 'ArbitrActID',
          component: () => import('./views/Handbook/ArbitrAreaID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },

        // районные суды
        {
          path: '/handbook/sud-act',
          name: 'SudAct',
          component: () => import('./views/Handbook/SudAct.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/sud-act/:id',
          name: 'SudActID',
          component: () => import('./views/Handbook/SudActID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },


        // маршрут ифнс
        {
          path: '/handbook/ifns',
          name: 'Ifns',
          component: () => import('./views/Handbook/Ifns/Ifns.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/ifns/:id',
          name: 'IfnsID',
          component: () => import('./views/Handbook/Ifns/IfnsID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },

        //

        // маршрут шаблоны документов

        {
          path: '/shablon',
          name: 'Shablon',
          component: () => import('./views/Handbook/Shablon/Shablon.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/group_shablon',
          name: 'GroupShablon',
          component: () => import('./views/Handbook/Shablon/GroupShablon.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/function',
          name: 'function',
          component: () => import('./views/Func/Func.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/function/:id',
          name: 'function_id',
          component: () => import('./views/Func/FuncID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/recoverer_shab',
          name: 'recoverer_shab',
          component: () => import('./views/Recoverer/RecoverShablonAll.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/recoverer_shab/:id',
          name: 'recoverer_shab_id',
          component: () => import('./views/Recoverer/RecoverShablonID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/shablon/:id',
          name: 'ShablonID',
          component: () => import('./views/Handbook/Shablon/ShablonID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/group_shablon/:id',
          name: 'group_shablonID',
          component: () => import('./views/Handbook/Shablon/GroupShablonID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        // маршрут чеки
        {
          path: '/handbook/check',
          name: 'Check',
          component: () => import('./views/Handbook/Check/Check.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/check/:id',
          name: 'CheckID',
          component: () => import('./views/Handbook/Check/CheckID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },

        //
        {
          path: '/strategy',
          name: 'strategy',
          component: () => import('./views/Strategy/Strategy.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/strategy/:id',
          name: 'strategyID',
          component: () => import('./views/Strategy/StrategyIDBlock.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/handbook/judicial',
          name: 'judicial',
          component: () => import('./views/Handbook/Judicial.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/judicial/:id',
          name: 'JudicialID',
          component: () => import('./views/Handbook/JudicialID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/handbook/bank',
          name: 'bank',
          component: () => import('./views/Handbook/BankManage.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/bank/:id',
          name: 'BankID',
          component: () => import('./views/Handbook/BankID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/gospohlina',
          name: 'gospohlina',
          component: () => import('./views/Gospohlina/Gospohlina.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/gospohlina/:id',
          name: 'gospohlinaID',
          component: () => import('./views/Gospohlina/GospohlinaId.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/handbook/task_status',
          name: 'task_status',
          component: () => import('./views/Handbook/TaskStatus.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/task_status/:id',
          name: 'TaskStatusID',
          component: () => import('./views/Handbook/TaskStatusID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/handbook/pole',
          name: 'pole',
          component: () => import('./views/Handbook/Pole.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/pole/:id',
          name: 'PoleID',
          component: () => import('./views/Handbook/PoleID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/handbook/pfr',
          name: 'pfr',
          component: () => import('./views/Handbook/Pfr.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/pfr/:id',
          name: 'PfrID',
          component: () => import('./views/Handbook/PfrID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/handbook/end_ip_reasons',
          name: 'end_ip_reasons',
          component: () => import('./views/Handbook/EndIpReasons/EndIpReasons.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/status',
          name: 'status',
          component: () => import('./views/Handbook/Status.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/status/:id',
          name: 'StatusUserID',
          component: () => import('./views/Handbook/StatusID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/handbook/status_user/:id',
          name: 'StatusID',
          component: () => import('./views/Handbook/StatusUserID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/handbook/type_document',
          name: 'type_document',
          component: () => import('./views/Handbook/TypeDocument.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/type_document/:id',
          name: 'TypeDocumentID',
          component: () => import('./views/Handbook/TypeDocumentID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/handbook/fssp',
          name: 'fssp',
          component: () => import('./views/Handbook/Fssp.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/fssp_otdels',
          name: 'FsspOtdels',
          component: () => import('./views/Handbook/FsspOtdels.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/fssp/:id',
          name: 'FsspID',
          component: () => import('./views/Handbook/FsspID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/handbook/fssp_otdels/:id',
          name: 'FsspOtdelsID',
          component: () => import('./views/Handbook/FsspOtdelsID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/handbook/jurisdiction',
          name: 'Jurisdiction',
          component: () => import('./views/Handbook/Jurisdiction.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/handbook/jurisdiction/:id',
          name: 'JurisdictionID',
          component: () => import('./views/Handbook/JurisdictionID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },

        {

          path: '/adm/development',
          name: 'development',
          component: () => import('./views/Admin/Development.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {

          path: '/adm/development/:id',
          name: 'development_id',
          component: () => import('./views/Admin/DevelopmentID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },


        {

          path: '/organization',
          name: 'organizationmain',
          component: () => import('./views/Organization/OrganizationMain.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {

          path: '/organization/:id',
          name: 'organization',
          component: () => import('./views/Organization/Organization.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/gospohlinaReq/:id',
          name: 'gospohlinaReq',
          component: () => import('./views/Organization/GospohlinaReq.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/cession',
          name: 'Cession',
          component: () => import('./views/Organization/Cession.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/cession/:id',
          name: 'CessionID',
          component: () => import('./views/Recoverer/RecovererID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',

            parent:'info'

          }
        },
        {
          path: '/cession/:id/:id_other',
          name: 'CessionIDOther',
          component: () => import('./views/Recoverer/Recoverer_otherID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/adm/pochtaSettings/:id',
          name: 'pochtaSettingsID',
          component: () => import('./views/Admin/PochtaSettings/PochtaSettingsID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },

        {
          path: '/debtor',
          name: 'debtor',
          component: () => import('./views/Debtor/Debtor.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/credit',
          name: 'credit',
          component: () => import('./views/Debtor/Credit.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/sudorder',
          name: 'sudorder',
          component: () => import('./views/SudOrder/SudOrder.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/reports',
          name: 'reports',
          component: () => import('./views/Reports/Reports.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/reports_shed',
          name: 'reports_shed',
          component: () => import('./views/Reports/ReportsShed.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },

        {
          path: '/debtor/:id',
          name: 'DebtorIDAll',
          component: () => import('./views/Debtor/DebtorIDAll.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/debtors/:id',
          name: 'DebtorID',
          component: () => import('./views/Debtor/DebtorID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/credit/:id',
          name: 'creditID',
          component: () => import('./views/Debtor/DebtorID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/reestr_debtor/:id',
          name: 'ReestrDebtorID',
          component: () => import('./views/Dosud/ReestrDebtorID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/test_debtor',
          name: 'test_debtor',
          component: () => import('./views/ReestrDebtor/ReestrDebtor.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/test_debtor/:id',
          name: 'test_debtorID',
          component: () => import('./views/ReestrDebtor/ReestrDebtorID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/payment',
          name: 'payment',
          component: () => import('./views/Buh/Payment/Payment.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/payment/:id',
          name: 'PaymentID',
          component: () => import('./views/Buh/Payment/PaymentID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/dosud/historySoftJournal',
          name: 'historySoftJournal',
          component: () => import('./views/Dosud/HistorySoftJournal.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },


        {
          path: '/payment_so',
          name: 'payment_so',
          component: () => import('./views/Buh/PaymentSudOrder/PaymentSo.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/payment_so/:id',
          name: 'PaymentSoID',
          component: () => import('./views/Buh/PaymentSudOrder/PaymentSoID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/payment_reestr',
          name: 'payment_reestr',
          component: () => import('./views/Buh/Payment/ReestrPay.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/new_debtor',
          name: 'new_debtor',
          component: () => import('./views/NewReestr/ReestrDebtor.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/new_debtor/:id',
          name: 'new_debtor',
          component: () => import('./views/NewReestr/ReestrDebtorID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/payment_reestr/:id',
          name: 'ReestrPaymentID',
          component: () => import('./views/Buh/Payment/ReestrPayID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/gosposhlina_reestr',
          name: 'gosposhlina_reestr',
          component: () => import('./views/Gospohlina/ReestrGosposhlina.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },

        {
          path: '/gosposhlina_reestr/:id',
          name: 'ReestrGosposhlinaID',
          component: () => import('./views/Gospohlina/ReestrGosposhlinaID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },

        {
          path: '/Correspondence-Journal',
          name: 'correspondence_journal',
          component: () => import('./views/Correspondence/Correspondence.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },

        {
          path: '/Correspondence-Journal/:id',
          name: 'correspondence_journalID',
          component: () => import('./views/Correspondence/CorrespondenceID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },

        {
          path: '/payment_reestr_so',
          name: 'payment_reestr_so',
          component: () => import('./views/Buh/PaymentSudOrder/ReestrPaySo.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/payment_reestr_so/:id',
          name: 'ReestrPaymentSoID',
          component: () => import('./views/Buh/PaymentSudOrder/ReestrPaySoID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/',
          // redirect: '/task'
          redirect: '/blank_page'
        },
        {
          path: '/dashboard/analytics',
          name: 'dashboard-analytics',
          component: () => import('./views/DashboardAnalytics.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/dashboard/ecommerce',
          name: 'dashboard-ecommerce',
          component: () => import('./views/DashboardECommerce.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/update_data',
          name: 'update_data',
          component: () => import('./views/UpdateData/UpdateData.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },

        {
          path: '/update_data/:id',
          name: 'UpdateDataID',
          component: () => import('./views/UpdateData/UpdateDataID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/reestr_import',
          name: 'reestr_import',
          component: () => import('./views/ImportStatus/ImpStatus.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },

        {
          path: '/reestr_import/:id',
          name: 'ReestrImportID',
          component: () => import('./views/ImportStatus/ImpStatusID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/history_status',
          name: 'history_status',
          component: () => import('./views/ImportStatus/ImpStatusHistory.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/reestr',
          name: 'reestr',
          component: () => import('./views/Reestr/Reestr.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/reestr/:id',
          name: 'ReestrID',
          component: () => import('./views/Reestr/ReestrID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/minimal_pension',
          name: 'MinimalPension',
          component: () => import('./views/Handbook/MinimalPension/MinimalPension.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp_epgu_spec_types',
          name: 'FsspEpguSpecTypesRecords',
          component: () => import('./views/Fssp/FsspEpguSpec/FsspEpguSpecRecords'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp_epgu_spec_type/:id',
          name: 'FsspEpguSpecTypesRecordsData',
          component: () => import('./views/Fssp/FsspEpguSpec/FsspEpguSpecRecordData'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp_hod_sends',
          name: 'FsspHodRecords',
          component: () => import('./views/Fssp/FsspHodSends/FsspHodRecords.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp_hod_tasks/:id',
          name: 'FsspHodTasks',
          component: () => import('./views/Fssp/FsspHodSends/FsspHodTasks.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp_hod_data/:id',
          name: 'FsspHodData',
          component: () => import('./views/Fssp/FsspHodSends/FsspHodRecordData.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp_hod_credits_plan/:id',
          name: 'FsspHodCreditsPlan',
          component: () => import('./views/Fssp/FsspHodSends/FsspHodCreditsPlan.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp_hod_credits/:id',
          name: 'FsspHodCredits',
          component: () => import('./views/Fssp/FsspHodSends/FsspHodCredits.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/fssp_hod_record_history/:id',
          name: 'FsspHodRecordHistory',
          component: () => import('./views/Fssp/FsspHodSends/FsspHodRecordHistory.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/sud_claims',
          name: 'SudClaims',
          component: () => import('./views/SudClaims/SudClaimDebtorList.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/recoverer',
          name: 'Recoverer',
          component: () => import('./views/Recoverer/Recoverer.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true,

          }
        },
        {
          path: '/recoverer_task',
          name: 'recoverer_task',
          component: () => import('./views/Recoverer/RecovererTaskAll.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/recoverer_task/:id',
          name: 'recoverer_task_id',
          component: () => import('./views/Recoverer/RecoverTaskID.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/recoverer/:id',
          name: 'RecovererID',
          component: () => import('./views/Recoverer/RecovererID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true,
            parent: 'info',
          }
        },
        {
          path: '/help_page',
          name: 'HelpPage',
          component: () => import('./views/HelpPage/HelpPage.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/help_page/:id',
          name: 'HelpPageID',
          component: () => import('./views/HelpPage/HelpPageID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/work_actions',
          name: 'WorkActions',
          component: () => import('./views/WorkActions/WorkActions.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },
        {
          path: '/work_actions/:id',
          name: 'WorkActionID',
          component: () => import('./views/WorkActions/WorkActionID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/crm_sections/:id',
          name: 'CrmSectionID',
          component: () => import('./views/WorkActions/CrmSectionID.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/sud_errors',
          name: 'SudErrors',
          component: () => import('./views/SudErrors/SudErrors.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/blank_page',
          name: 'BlankPage',
          component: () => import('./views/Admin/UserAccess/BlankPage.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },


        {
          path: '/pages/user-settings',
          name: 'page-user-settings',
          component: () => import('@/views/pages/user-settings/UserSettings.vue'),
          meta: {
            authRequired:true,
            rule: 'editor',
            no_scroll: true
          }
        },
        {
          path: '/notifications',
          name: 'notifications',
          component: () => import('./views/Notifications/Notifications.vue'),
          meta: {
            rule: 'editor',
            authRequired:true,
            no_scroll: true
          }
        },


        // =============================================================================
        // Pages Routes
        // =============================================================================
        {
          path: '/pages/profile',
          name: 'page-profile',
          component: () => import('@/views/pages/Profile.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Profile', active: true }
            ],
            pageTitle: 'Profile',
            rule: 'editor'
          }
        }


      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        // {
        //   path: '/callback',
        //   name: 'auth-callback',
        //   component: () => import('@/views/Callback.vue'),
        //   meta: {
        //     rule: 'editor'
        //   }
        // },
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/login/Login.vue'),
          meta: {
            rule: 'editor'
          }
        }

      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})


router.afterEach(() => {

  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

router.beforeEach((to, from, next) => {
  // if (router.isNavigating) {
  //     router.isNavigating = false
  // }
  // else {
  //     history.pushState(null, '')
  // }

  if (to.meta.authRequired) {
    if (!(auth.isAuthenticated())) {

      router.push({ path: '/pages/login', query: { to: to.path } })
    }
  }

  return next()
})

export default router
