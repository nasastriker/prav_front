<template>
  <!-- :position="isSmallerScreen ? 'top' : 'left'" -->
  <!-- md:ml-4 md:mt-0 -->
  <vs-tabs class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">

    <!-- GENERAL -->
    <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'ЛИЧНЫЕ ДАННЫЕ' : ''">
      <div class="tab-general mt-4 ml-0">
        <user-settings-general />
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'ИЗМЕНЕНИЕ ПАРОЛЯ' : ''">
      <div class="tab-change-pwd mt-4 ml-0">
        <user-settings-change-password />
      </div>
    </vs-tab>
  </vs-tabs>
</template>

<script>
import UserSettingsGeneral from './UserSettingsGeneral.vue'
import UserSettingsChangePassword from './UserSettingsChangePassword.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    UserSettingsGeneral,
    UserSettingsChangePassword,

  },
  data () {
    return {


    }
  },

    methods: {
        ...mapActions([
            'getDataNotifications',
        ]),

    },
    mounted(){
        this.getDataNotifications();
    },
    computed: {

    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    },


    },

}
</script>

<style lang="scss" rel="stylesheet/scss">
#profile-tabs {
  .vs-tabs--content {
    padding: 0;
  }
}
</style>
