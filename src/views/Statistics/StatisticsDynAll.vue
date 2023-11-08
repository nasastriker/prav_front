<template>
  <div id="page-user-list">
    <vs-tabs alignment="fixed" color="danger" style="margin-top: 20px">
      <vs-tab label="Судебный приказ">
        <StatisticsDyn></StatisticsDyn>
      </vs-tab>
      <vs-tab label="Исковое заявление">
        <StatisticsDynIsk></StatisticsDynIsk>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import StatisticsDyn from './StatisticsDyn.vue';
import StatisticsDynIsk from './StatisticsDynIsk.vue';

export default {
  components: {
    StatisticsDyn,
    StatisticsDynIsk,
  },
  data() {
    return {}
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

.ag-row {
  height: 23px !important;

  padding: 0px !important;
  margin: 0px !important;
}

.ag-cell {

  padding: 0px !important;
  margin: 0px !important;

}

.ag-header-row {
  height: 26px !important;
}

.ag-theme-material .ag-cell {
  line-height: 15px !important;
}
</style>
