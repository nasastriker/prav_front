<template>
  <div class="layout--full-page" style="height: 100vh">
    <router-view></router-view>
  </div>
</template>
<script>
    import { mapActions,mapGetters } from 'vuex'
    export default {
        mounted(){
            this.getFsspOtdelsArr();
            this.getDataJudicialAreasForSug()
            this.getVidRecoverInDebtorCreditArr()
            this.getPaymentsType()
            this.getDadataSettingsArr();
        },
        computed: {
          ...mapGetters([
            'User',

          ]),

        },
        methods: {

            ...mapActions([
                'getFsspOtdelsArr','getDataJudicialAreasForSug','getVidRecoverInDebtorCreditArr','getPaymentsType','getDadataSettingsArr',
              'setDataUser','getUvedUsersAudio'
            ]),


        },
    }
</script>
<style>
</style>
