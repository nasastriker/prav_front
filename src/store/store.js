import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import users from './users'
import shab_all from './shab_all'
import task_user from './task_user'
import judicial from './judicial'
import pochta from './pochta'
import uved_user from './uved_user'
import bki_reestr from './bki_reestr'
import debtorcredit_document from './debtorcredit_document'
import jurisdiction from './jurisdiction'
import debtor_credit_comments from './debtor_credit_comments'
import fssp_otdels_address from './fssp_otdels_address'
import email_mess from './email_mess'
import recoverer_document from './recoverer_document'
import organisation_task from './organisation_task'
import user_accsess_orgn from './user_accsess_orgn'
import orgn_document from './orgn_document'
import address_exception from './address_exception'
import bank from './bank'
import local_bd from './local_bd'
import fns_shablon from './fns_shablon'
import calculate_vars from  './calculate_vars'
import sud_gaz from './sud_gaz'
import recoveres_other from './recoveres_other'
import debtor_credit_dop_var from './debtor_credit_dop_var'
import development from './development'
import dadata_settings from './dadata_settings'
import reestr_gosposhlina from './reestr_gosposhlina'
import request_pp from './request_pp'
import bki_credo from './bki_credo'
import bki_scoring from './bki_scoring'
import report_shed from './report_shed'
import condition_vars from './condition_vars'
import zalog from './zalog'
import user_accsess_recover from './user_accsess_recover'
import correspondence from './correspondence'
import system_hystory from './system_hystory'
import pochta_settings from './pochta_settings'
import reestr_delete from './reestr_delete'
import gospohlinaReq from './gospohlinaReq'
import judicialArea from './judicialArea'
import control_status from './control_status'
import status_history from './status_history'
import arbitrArea from './arbitrArea'
import recoverer_task from './recoverer_task'
import check from './check'
import strategy from './strategy'
import reestr_pochta from './reestr_pochta'
import sudAct from './sudAct'
import otp from './otp'
import task_status from './task_status'
import ifns from './ifns'
import user_task from './user_task'
import strategy_peremen from './strategy_peremen'
import setting_all from './setting_all'
import payment_filter_task from './payment_filter_task'
import credit from './credit'
import statistics from './statistics'
import sud_order from './sud_order'
import update_data from './update_data'
import fns_work from './fns_work'
import import_task from './import_task'
import sogl from './sogl'
import reports from './reports'
import history_soft from './history_soft'
import history_shed from './history_shed'
import sel_ports from './sel_ports'
import arch_sud from './arch_sud'
import reestr_payment from './reestr_payment'
import reestr_payment_so from './reestr_payment_so'
import arch_isk from './arch_isk'
import arch_bank from './arch_bank'
import arch_fssp from './arch_fssp'
import arch_fssp_return_sa from './arch_fssp_return_sa'
import arch_bank_sa from './arch_bank_sa'
import arch_bank_other_sa from './arch_bank_other_sa'
import fssp_cl from "./fssp_cl";
import arch_bank_return_sa from './arch_bank_return_sa'
import arch_bank_other_return_sa from './arch_bank_other_return_sa'
import setting_fssp from "./setting_fssp";
import date_controls from "./date_controls";
import inheritors from "./inheritors";
import sud_work from "./sud_work";
import minimal_pension from "./minimal_pension";
import unrecognized_files from "./unrecognized_files";
import status_controls from "./status_controls";
import regsudact from "./regsudact";
import fssp_hod_sends from "./fssp_hod_sends";
import calculations from './calculations'
import arch_pfr from './arch_pfr'
import fns from './fns'
import pole from './pole'
import payment_so_one from './payment_so_one'
import arch_pp from './arch_pp'
import faq from './site/faq'
import dogovora from './site/dogovora'
import deb from './deb'
import task from './task'
import payment from './payment'
import payment_so from './payment_so'
import organisation from './organisation'
import organization_var from './organization_var'
import all_payment from './all_payment'
import notification from './notification'
import shablon_document from './shablon_document'
import pfr from './pfr'
import log from './log'
import ogrn from './ogrn'
import fssp from './fssp'
import fssp_otdels from './fssp_otdels'
import debtor_refine from './debtor_refine'
import task_jobs_status from './task_jobs_status'
import templ_soft from './templ_soft'
import debtor_dosud from './debtor_dosud'
import debtor_reestr from './debtor_reestr'
import request_user from './request_user'
import request_status from './request_status'
import reestr_import from './reestr_import'
import reestr from './reestr'
import status from './status'
import cession from './cession'
import debtor from './debtor'
import recoverer from './recoverer'
import func from './func'
import funcshedule from './func_shedule'
import nastro from './nastro'
import import_files from './import_files'
import fns_answers from './fns_answers'
import upload_files from './upload_files'
import sud_prikaz_cancels from "./sud_prikaz_cancels"
import help_page from "./help_page"
import work_actions from "./work_actions"
import crm_sections from "./crm_sections"
import end_ip_reasons from "./end_ip_reasons"
import fssp_epgu_spec_types from "./fssp_epgu_spec_types";
import fssp_post from "./fssp_post"
import sud_pp from "./sud_pp"
import sud_errors from "./sud_errors";
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import service_manager from './service_manager'
import auto_task_settings from './auto_task_settings'
import moduleAuth from './auth/moduleAuth.js'
import ratecb from './ratecb'

import moduleECommerce from './eCommerce/moduleECommerce.js'
Vue.use(Vuex)





export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
      ratecb,
      user,
      pochta,
      task_user,
      report_shed,
      debtor_credit_dop_var,
      correspondence,
      payment_filter_task,
      user_accsess_recover,
      strategy,
      sud_gaz,
      user_task,
      fns_shablon,
      task_jobs_status,
      user_accsess_orgn,
      request_pp,
      zalog,
      bki_reestr,
      bki_scoring,
      local_bd,
      uved_user,
      organisation_task,
      update_data,
      control_status,
      system_hystory,
      statistics,
      import_task,
      request_user,
      reestr_delete,
      status_history,
      func,
      calculations,
      bki_credo,
      condition_vars,
      debtor_credit_comments,
      recoveres_other,
      strategy_peremen,
      funcshedule,
      reestr_pochta,
      judicialArea,
      arbitrArea,
      email_mess,
      arch_sud,
      shab_all,
      calculate_vars,
      task_status,
      otp,
      orgn_document,
      recoverer_task,
      pochta_settings,
      sudAct,
      reestr_gosposhlina,
      recoverer_document,
      arch_bank_return_sa,
      arch_bank_other_return_sa,
      setting_all,
      gospohlinaReq,
      sud_order,
      address_exception,
      arch_fssp_return_sa,
      arch_isk,
      arch_bank_sa,
      arch_fssp,
      debtorcredit_document,
      ifns,
      check,
      sogl,
      pole,
      payment_so_one,
      reestr_payment,
      reestr_payment_so,
      credit,
      arch_pp,
      reports,
      organisation,
      organization_var,
      history_soft,
      dogovora,
      payment_so,
      arch_bank,
      reestr_import,
      arch_bank_other_sa,
      fns_work,
      request_status,
      history_shed,
      shablon_document,
      debtor_dosud,
      all_payment,
      fns,
      arch_pfr,
      debtor_reestr,
      reestr,
      task,
      log,
      judicial,
      deb,
      debtor,
      ogrn,
      debtor_refine,
      templ_soft,
      cession,
      payment,
      notification,
      jurisdiction,
      fssp_otdels_address,
      bank,
      faq,
      sel_ports,
      status,
      recoverer,
      pfr,
      fssp,
      fssp_otdels,
      users,
      nastro,
      import_files,
      upload_files,
      fns_answers,
      sud_prikaz_cancels,
      help_page,
      work_actions,
      crm_sections,
      sud_pp,
      sud_errors,
      service_manager,
      fssp_post,
      fssp_cl,
      development,
      dadata_settings,
      setting_fssp,
      date_controls,
      inheritors,
      sud_work,
      minimal_pension,
      regsudact,
      fssp_hod_sends,
      unrecognized_files,
      fssp_epgu_spec_types,
      status_controls,
      end_ip_reasons,
      auto_task_settings,
    auth: moduleAuth,
    eCommerce: moduleECommerce
  },
//  strict: process.env.NODE_ENV !== 'production'
    strict: false,
})
