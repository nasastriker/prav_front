<template>
  <vs-tabs>
    <vs-tab label="Общие">
      <SettingsFssp></SettingsFssp>
    </vs-tab>
    <vs-tab label="Схема">
      <CheckFssp></CheckFssp>
    </vs-tab>
    <vs-tab label="Жалоба чек-лист">
      <FsspCheckListClaimSettings></FsspCheckListClaimSettings>
    </vs-tab>
<!--    <vs-tab label="Жалоба постановлений">-->
<!--      <FsspPostClaimSettings></FsspPostClaimSettings>-->
<!--    </vs-tab>-->
  </vs-tabs>
</template>

<script>

import SettingsFssp from "../SettingTabs/SettingsFssp.vue";
import CheckFssp from "../../Strategy/CheckFssp.vue";
import FsspCheckListClaimSettings from "./FsspCheckListClaimSettings.vue";
import FsspPostClaimSettings from "./FsspPostClaimSettings.vue";

export default {
  components: {
    SettingsFssp,CheckFssp,FsspCheckListClaimSettings,FsspPostClaimSettings
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss">
</style>
