<template>
  <div id="page-user-list">
    <div class="vx-card p-6 no-shadow">
      <div style="display: flex;margin-bottom: 30px">
        <h4>{{ statHod }}</h4>
        <vs-button style="margin-left: auto" color="success" type="filled" @click="saveRecord">Сохранить</vs-button>
        <vs-button style="margin-left: 10px" color="danger" type="filled" @click="cancelSaveRecord">Отмена</vs-button>
      </div>

      <h6 class="h6 mb-1">Код:</h6>
      <vs-input type="text" class="w-auto" v-model="recordData.code"></vs-input>
      <h6 class="h6 mb-1" style="margin-top: 15px">Наименование:</h6>
      <vs-input type="text" class="w-auto" v-model="recordData.name"></vs-input>
      <h6 class="h6 mb-1" style="margin-top: 15px">Номер:</h6>
      <vs-input type="text" class="w-auto" v-model="recordData.service_code"></vs-input>
      <vs-checkbox style="margin-top: 15px" v-model="recordData.use_default_template">Использовать шаблон по умолчанию</vs-checkbox>
      <vs-checkbox style="margin-top: 15px" v-model="recordData.default_template">Шаблон по умолчанию</vs-checkbox>
      <h6 class="h6 mb-1" style="margin-top: 15px">Шаблон запроса req (req.xml):</h6>
      <vs-textarea height="400px" rows="17" v-model="recordData.req_xml"></vs-textarea>
      <h6 class="h6 mb-1" style="margin-top: 15px">Шаблон запроса piev_epgu (piev_epgu.xml):</h6>
      <vs-textarea height="800px" rows="34" v-model="recordData.piev_epgu_xml"></vs-textarea>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  components: {},
  data() {
    return {
      recordData: {
        code: null,
        name: null,
        service_code: null,
        req_xml: null,
        piev_epgu_xml: null,
        use_default_template: false,
        default_template: false,
      },
      statHod: 'Новый тип спецификации ЕПГУ',
    }
  },
  methods: {
    saveRecord() {
      let flag = true;

      if (typeof this.recordData.code == 'undefined' || this.recordData.code == null || this.recordData.code.trim() === '') {
        flag = false;
      }

      if (typeof this.recordData.name == 'undefined' || this.recordData.name == null || this.recordData.name.trim() === '') {
        flag = false;
      }

      if (typeof this.recordData.service_code == 'undefined' || this.recordData.service_code == null || this.recordData.service_code.trim() === '') {
        flag = false;
      }

      if (!this.recordData.use_default_template) {
        if (typeof this.recordData.req_xml == 'undefined' || this.recordData.req_xml == null || this.recordData.req_xml.trim() === '') {
          flag = false;
        }

        if (typeof this.recordData.piev_epgu_xml == 'undefined' || this.recordData.piev_epgu_xml == null || this.recordData.piev_epgu_xml.trim() === '') {
          flag = false;
        }
      }

      if (flag) {
        this.saveFsspEpguSpecRecord(this.recordData).then((response) => {
          if (response.result) {
            this.$vs.notify({
              title: 'Сообщение',
              text: 'Запись сохранена',
              color: 'success',
              position: 'top-center'
            })
            this.$router.push('/fssp_epgu_spec_types');
          } else {
            this.$vs.notify({
              title: 'Ошибка',
              text: response.error,
              color: 'danger',
              position: 'top-center'
            })
          }
        });
      } else {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Заполните необходимые поля',
          color: 'danger',
          position: 'top-center'
        })
      }
    },
    cancelSaveRecord() {
      this.$router.push('/fssp_epgu_spec_types');
    },

    ...mapActions([
      'saveFsspEpguSpecRecord', 'getFsspEpguSpecRecordData'
    ]),
  },
  mounted() {
    if (this.$route.params.id != 'new') {
      this.getFsspEpguSpecRecordData(this.$route.params.id).then((response) => {
        if (response.result) {
          this.recordData = response.data;
          this.statHod = 'Редактирование типа спецификации ЕПГУ (ID ' + this.recordData.id + ')';
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: response.error,
            color: 'danger',
            position: 'top-center'
          })
        }
      });
    }
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
</style>
