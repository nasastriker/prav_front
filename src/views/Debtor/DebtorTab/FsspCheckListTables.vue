<template>
  <div id="page-user-list">
    <div class="vx-card p-6" style="box-shadow: none">
      <vs-tabs alignment="fixed" color="primary">
        <vs-tab label="ПЛАТЕЖИ">
      <Pays></Pays>
          </vs-tab>
        </vs-tabs>
      <vs-tabs alignment="fixed" color="primary">
        <vs-tab label="БАНКИ">
          <Banks></Banks>
        </vs-tab>
      </vs-tabs>
      <vs-tabs alignment="fixed" color="primary">
        <vs-tab label="ФНС">
          <Fns></Fns>
        </vs-tab>
      </vs-tabs>
      <vs-tabs alignment="fixed" color="primary">
        <vs-tab label="ЗАГС">
          <Zags></Zags>
        </vs-tab>
      </vs-tabs>
      <vs-tabs alignment="fixed" color="primary">
        <vs-tab label="ПФР">
          <Pfr></Pfr>
        </vs-tab>
      </vs-tabs>
      <vs-tabs alignment="fixed" color="primary">
        <vs-tab label="МВД">
          <Mvd></Mvd>
        </vs-tab>
      </vs-tabs>
      <vs-tabs alignment="fixed" color="primary">
        <vs-tab label="ГИМС">
          <Gims></Gims>
        </vs-tab>
      </vs-tabs>
      <vs-tabs alignment="fixed" color="primary">
        <vs-tab label="РОСРЕЕСТР">
          <Nedv></Nedv>
        </vs-tab>
      </vs-tabs>
      <vs-tabs alignment="fixed" color="primary">
        <vs-tab label="ИНЫЕ ЗАПРОСЫ/ПОСТАНОВЛЕНИЯ">
          <Other></Other>
        </vs-tab>
      </vs-tabs>
  </div>
  </div>

</template>

<script>
import { VueCsvImport } from 'vue-csv-import';
import Pays from "./CheckList/Pays.vue"
import Banks from "./CheckList/Banks.vue";
import Fns from "./CheckList/Fns.vue";
import Zags from "./CheckList/Zags.vue";
import Pfr from "./CheckList/Pfr.vue";
import Mvd from "./CheckList/Mvd.vue";
import Gims from "./CheckList/Gims.vue";
import Nedv from "./CheckList/Nedv.vue";
import Other from "./CheckList/Other.vue";
import { mapActions,mapGetters } from 'vuex'
export default {
  components: {
    VueCsvImport,
    Pays,
    Banks,
    Fns,
    Zags,
    Pfr,
    Mvd,
    Gims,
    Nedv,
    Other
  },
  data () {
    return {}
  },

  computed: {
    ...mapGetters([
      'Deb'
    ]),
  },
  methods: {
    ...mapActions([
      'getFsspClPays','getFsspClBanks','getFsspClFns','getFsspClZags','getFsspClPfr','getFsspClGims','getFsspClMvd',
        'getFsspClNedv','getFsspClOther'
    ]),
  },
  mounted () {
    this.getFsspClPays(this.Deb.debtorCredit.id);
    this.getFsspClBanks(this.Deb.debtorCredit.id);
    this.getFsspClFns(this.Deb.debtorCredit.id);
    this.getFsspClZags(this.Deb.debtorCredit.id);
    this.getFsspClPfr(this.Deb.debtorCredit.id);
    this.getFsspClMvd(this.Deb.debtorCredit.id);
    this.getFsspClGims(this.Deb.debtorCredit.id);
    this.getFsspClNedv(this.Deb.debtorCredit.id);
    this.getFsspClOther(this.Deb.debtorCredit.id);
  },
}

</script>

<style lang="scss">
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.vh75{
  min-height: 75vh;
}
.load-bar{
  display: inline-block;
  max-width: 100px;
}

.outer-divd
{
  padding: 25%;
  text-align: center;
  z-index : 10;
  position : absolute;
  top : 0;
  left : 0;
  width: 100%;
  height: 100%;
  background-color: hsla(200, 80%, 90%, 0.3);
}

.out-main{
  position : relative;
}
</style>
