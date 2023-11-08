<template>
  <div>
    <div style="display: flex;margin-bottom: 20px;">
      <vs-input type="date" v-model="calc_date" @change="changeDate" style="margin-left: 20px"></vs-input>
      <vs-button color="warning" class="pull-right" type="filled" style="margin-left: auto" @click="changeDate">
        Обновить
      </vs-button>
    </div>

    <vs-tabs>
      <vs-tab label="Состояние расчета">
        <StatisticProgress></StatisticProgress>
      </vs-tab>
      <vs-tab label="Журнал">
        <StatisticJournal></StatisticJournal>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import StatisticProgress from "./StatisticProgress.vue";
import StatisticJournal from "./StatisticJournal.vue";

export default {
  components: {
    StatisticProgress,StatisticJournal
  },

  data() {
    return {
      calc_date: null,
    }
  },
  mounted() {
    this.changeDate();
  },

  methods: {
    changeDate() {
      this.getStatisticProgress(this.calc_date);
      this.getStatisticJournal(this.calc_date);
    },
    ...mapActions([
      'getStatisticProgress','getStatisticJournal'
    ]),
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
