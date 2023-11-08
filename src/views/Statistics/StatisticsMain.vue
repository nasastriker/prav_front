<template>
  <div id="page-user-list">
    <div class="vx-card p-6">
      <div style="display: flex">
        <div style="margin-bottom: 20px; display: flex">
          <div><img src="/g13162.png"></div>
          <div style="margin-left: 20px;font-size: 26pt">Статистика</div>
        </div>
        <div style="margin-left: auto">
          <div>
            <div v-if="StatisticStatusLoadingFlag" style="display: flex">
              <img src="/loading.gif"
                   style="max-width: 40px; margin-top: -5px;"><span>Проверка сервиса</span>
            </div>
            <div v-else>
              <span>Статус сервиса:</span>
              <span style="color: green" v-if="StatisticStatus">
            <b>ONLINE</b>
          </span>
              <span style="color: red" v-else>
            <b>OFFLINE</b>
          </span>
            </div>
          </div>
          <div v-if="StatisticLastDate != null">
            <span>Последний расчет статистики: <b>{{ StatisticLastDate }}</b></span>
          </div>
          <div v-if="StatisticIsActive">
            <span style="color: red"><b>В данный момент ведется расчет статистики!</b></span>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap" style="display: flex">
        <v-select class="w-50 mb-base" :reduce="label => label.id" label="name" :options="optArr"
                  v-model="User.pag.staticSud.id_recover" @input="changeRecover" style="min-width: 400px"></v-select>
        <vs-input type="date" v-model="User.pag.staticSud.static_date" @change="changeDate"
                  style="margin-left: 20px"></vs-input>
        <div class="flex flex-wrap ag-grid-table-actions-right" style="margin-left: auto">
          <div>
<!--            <vs-button color="danger" class="pull-right" type="filled" @click="calcStat">-->
<!--              Запуск-->
<!--              расчета-->
<!--            </vs-button>-->
            <vs-button color="success" class="pull-right" type="filled" @click="refreshStat">
              Обновить
            </vs-button>
            <vs-button color="primary" class="pull-right" type="filled" @click="showProgressPopupFunc">
              Состояние
            </vs-button>
          </div>
        </div>
      </div>

      <vs-popup fullscreen classContent="popup-example" title="Состояние" :active.sync="showProgressPopup">
        <StatisticsControl></StatisticsControl>
      </vs-popup>

      <vs-tabs>
        <vs-tab label="Общая информация">
          <StatisticsAll></StatisticsAll>
        </vs-tab>
        <vs-tab label="Динамика отправки">
          <StatisticsDynAll></StatisticsDynAll>
        </vs-tab>
        <vs-tab label="Анализ портфеля по группам">
          <StatisticsGroupAll></StatisticsGroupAll>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>

<script>
import StatisticsAll from './StatisticsAll.vue';
import StatisticsDynAll from './StatisticsDynAll.vue';
import {mapActions, mapGetters} from 'vuex';
import axios from '../../axios';
import StatisticsGroupAll from "./StatisticsGroupAll.vue";
import StatisticsControl from "./StatisticsControl.vue";
import g from "../../routeGo";

export default {
  components: {
    StatisticsGroupAll,
    StatisticsAll,
    StatisticsDynAll,
    StatisticsControl
  },

  data() {
    return {
      showProgressPopup: false,
    }
  },
  mounted() {
    this.getDataOrganizationArr();
    this.getDataReestrsAndCession();
    this.refreshStat();
  },
  asyncComputed: {},
  computed: {
    optArr() {
      let arr = [];
      arr.push({
        name: 'Все',
        id: 0,
      });
      for (let index = 0; index < this.OrganizationArr.length; ++index) {
        arr.push({
          name: 'Организация ' + this.OrganizationArr[index].name,
          id: -1 * this.OrganizationArr[index].id,
        })
      }
      for (let index = 0; index < this.RecoverersArr.length; ++index) {
        if (this.RecoverersArr[index].cession) {
          arr.push({
            name: 'Договор цессии №' + this.RecoverersArr[index].number + ' от ' + this.RecoverersArr[index].date + ' Взыскатель ' + this.RecoverersArr[index].name,
            id: this.RecoverersArr[index].id,
          });
        } else {
          arr.push({
            name: 'Взыскатель ' + this.RecoverersArr[index].name,
            id: this.RecoverersArr[index].id,
          })
        }
      }
      return arr
    },
    ...mapGetters([
      'User', 'RecoverersArr', 'OrganizationArr', 'StatisticStatus', 'StatisticStatusLoadingFlag', 'StatisticIsActive',
      'StatisticLastDate'
    ]),
  },

  methods: {
    showProgressPopupFunc() {
      this.getStatisticProgress();
      this.showProgressPopup = true;
    },
    refreshStat() {
      this.getStatisticStatus();
      this.getStatisticLastDate();
      this.getStatisticInfoStats();
      this.getStatisticInfoSud();
      this.getStatisticInfoIsk();
      this.getStatisticInfoGroupAge();
      this.getStatisticInfoGroupSum();
    },
    calcStat() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Запуск расчета',
        text: `Вы действительно хотите запустить расчет статистики?`,
        accept: this.runCalcStat,
        acceptText: 'Да',
        cancelText: 'Нет'
      })
    },
    runCalcStat() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
      axios.post(g('statistic/start_all'), {
        id_recover: this.User.pag.staticSud.id_recover
      }).then((response) => {
        if (response.data.result) {
          this.$vs.notify({
            title: 'Старт расчета',
            text: 'Расчет запущен',
            color: 'success',
            position: 'top-center'
          })
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: response.data.error,
            color: 'danger',
            position: 'top-center'
          })
        }
      }).catch(error => {
        this.$vs.notify({
          title: 'Ошибка',
          text: error.error,
          color: 'danger',
          position: 'top-center'
        })
      });
    },
    changeDate() {
      if (typeof this.User.pag.staticSud == 'undefined') {
        this.User.pag.staticSud = {};
      }
      this.setDataUser().then((response) => {
        this.refreshStat();
      })
    },
    changeRecover() {
      if (typeof this.User.pag.staticSud == 'undefined') {
        this.User.pag.staticSud = {};
      }
      if (this.User.pag.staticSud.id_recover == null) {
        this.User.pag.staticSud.id_recover = 0
      }
      this.setDataUser().then((response) => {
        this.refreshStat();
      })
    },
    changePag(pag) {
      this.gridApi.paginationSetPageSize(pag)
    },
    ...mapActions([
      'setDataUser', 'getStatisticInfoStats', 'getDataOrganizationArr', 'getDataReestrsAndCession', 'getStatisticInfoSud',
      'getStatisticInfoIsk', 'getStatisticInfoGroupAge', 'getStatisticInfoGroupSum', 'getStatisticStatus', 'getStatisticProgress',
      'getStatisticLastDate'
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
