<template>
  <div id="page-user-list">
    <vs-tabs alignment="fixed" color="success" style="margin-top: 20px">
      <vs-tab label="Возрастные группы">
        <StatisticsGroup></StatisticsGroup>
      </vs-tab>
      <vs-tab label="ОСЗ группы">
        <StatisticsGroupSum></StatisticsGroupSum>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import StatisticsGroup from './StatisticsGroup.vue';
import StatisticsGroupSum from './StatisticsGroupSum.vue';

export default {
  components: {
    StatisticsGroup,
    StatisticsGroupSum,
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
