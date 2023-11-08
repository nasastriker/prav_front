<template xmlns="http://www.w3.org/1999/html">
  <div class="vx-card p-6 no-shadow fssp_journal">
        <div class="vx-row">
          <vs-tabs v-model="$store.state.fssp.activeTabFsspJournal">
            <vs-tab label="Журнал Обращений">
              <FsspJournal></FsspJournal>
            </vs-tab>
            <vs-tab label="Наложенные на должника ограничения">
              <FsspPostanAll></FsspPostanAll>
            </vs-tab>
            <vs-tab label="ИП полученные из ГУ (Запрос о наличии ИП Онлайн)">
              <FsspIpOnlineAll></FsspIpOnlineAll>
            </vs-tab>
            <vs-tab label="Ошибки">
              <FsspJournalErrors></FsspJournalErrors>
            </vs-tab>
            <vs-tab label="Данные по депозитам ФССП">
              <FsspMoneyCodesAll></FsspMoneyCodesAll>
            </vs-tab>
          </vs-tabs>
        </div>
    </div>
</template>

<script>
    import FsspJournal from "./FsspJournal.vue";
    import FsspPostanAll from "./FsspPostanAll.vue";
    import FsspJournalErrors from "./FsspJournalErrors.vue";
    import FsspIpOnlineAll from "./FsspIpOnlineAll.vue";
    import FsspMoneyCodesAll from "./FsspMoneyCodesAll.vue";
    export default {
        components: {
            FsspJournal, FsspPostanAll,FsspJournalErrors,FsspIpOnlineAll,FsspMoneyCodesAll
        },
        data () {
            return {

            }
        },
        mounted(){

        },
    }
</script>

<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
    .checkbox_x.vs-checkbox{
        min-width: 20px;
    }
    .fssp_journal ul.ul-tabs {
        padding: 0 25px;
    }

</style>
