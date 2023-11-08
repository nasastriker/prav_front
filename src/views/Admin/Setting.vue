<template>
    <div id="page-user-list">
        <div class="vx-card p-6" style="min-height: 95vh;">
        <div class="mt-5">
        <vs-tabs v-model="$store.state.setting_all.activeTabSetting">
            <vs-tab label="Настройки" >
                <SettingsSet></SettingsSet>
            </vs-tab>
            <vs-tab label="ФНС" >
                <CheckFns></CheckFns>
            </vs-tab>
            <vs-tab label="Контроль Запрос Банки Эдо" >
                <CheckEdo></CheckEdo>
            </vs-tab>
            <vs-tab label="Возврат Банки" >
                <ReturnBank></ReturnBank>
            </vs-tab>
            <vs-tab label="Настройки Банки" >
                <BankSetting></BankSetting>
            </vs-tab>
            <vs-tab label="Настройка Дадата">
                <DadataSettings></DadataSettings>
            </vs-tab>
            <vs-tab label="Настройка Суд" >
                <SudSetting></SudSetting>
            </vs-tab>
<!--            <vs-tab label="Настройка ФССП" >-->
<!--              <vs-tabs>-->
<!--                <vs-tab label="Общие">-->
<!--                  <SettingsFssp></SettingsFssp>-->
<!--                </vs-tab>-->
<!--                <vs-tab label="Схема">-->
<!--                  <CheckFssp></CheckFssp>-->
<!--                </vs-tab>-->
<!--                <vs-tab label="Жалоба чек-лист">-->
<!--                  <FsspCheckListClaimSettings></FsspCheckListClaimSettings>-->
<!--                </vs-tab>-->
<!--                <vs-tab label="Жалоба постановлений">-->
<!--                  <FsspPostClaimSettings></FsspPostClaimSettings>-->
<!--                </vs-tab>-->
<!--              </vs-tabs>-->
<!--            </vs-tab>-->
            <vs-tab label="Настройки Captcha" >
                <CaptchaSetting></CaptchaSetting>
            </vs-tab>
            <vs-tab label="Настройки Email" >
                <EmailSetting></EmailSetting>
            </vs-tab>
          <vs-tab label="Настройки СМС" >
            <SmsSetting></SmsSetting>
          </vs-tab>
            <vs-tab label="Настройки ЛК" >
                <LkSetting></LkSetting>
            </vs-tab>
            <vs-tab label="Порты" >
                <SettingsPort></SettingsPort>
            </vs-tab>
            <vs-tab label="Супервизор" >
                <Supervisor></Supervisor>
            </vs-tab>

            <vs-tab label="Файлы" >
                <SettingsFile></SettingsFile>
            </vs-tab>
        </vs-tabs>
    </div>
    </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import SettingsPort from './SettingTabs/SettingsPort.vue'
import CheckFns from '../Strategy/CheckFns.vue'
import CheckEdo from '../Strategy/CheckEdo.vue'
import ReturnBank from '../Strategy/ReturnBank.vue'
import SettingsSet from './SettingTabs/SettingsSet.vue'
import SettingsFile from './SettingTabs/SettingsFile.vue'
import PochtaSetting from './SettingTabs/PochtaSetting.vue'
import SudSetting from './SettingTabs/SudSetting.vue'
import BankSetting from './SettingTabs/BankSetting.vue'
import EmailSetting from './SettingTabs/EmailSetting.vue'
import SmsSetting from './SettingTabs/SmsSetting.vue'
import LkSetting from './SettingTabs/LkSetting.vue'
import CaptchaSetting from './SettingTabs/CaptchaSetting.vue'
import Supervisor from './SettingTabs/Supervisor.vue'
import Func from '../Func/Func.vue'
import SettingsFssp from './SettingTabs/SettingsFssp.vue'
import DadataSettings from './SettingTabs/DadataSettings.vue'
import CheckFssp from "../Strategy/CheckFssp.vue";
import FsspCheckListClaimSettings from "./Fssp/FsspCheckListClaimSettings.vue";
import FsspPostClaimSettings from "./Fssp/FsspPostClaimSettings.vue";
export default {
  components: {
    EmailSetting,
    SettingsPort,
    SmsSetting,
    PochtaSetting,
    BankSetting,
    SudSetting,
    CheckEdo,
    LkSetting,
    CaptchaSetting,
    SettingsFile,
    CheckFns,
    ReturnBank,
    Supervisor,
    Func,
    SettingsSet,
    DadataSettings,
    SettingsFssp,
    CheckFssp,
    FsspCheckListClaimSettings,
    FsspPostClaimSettings
  },
  data () {
    return {
      readonly_status: true
    }
  },
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions([])
  },
  mounted () {

  }
}

</script>

<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
#page-user-list {
    .user-list-filters {
        .vs__actions {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-58%);
        }
    }
}
</style>
