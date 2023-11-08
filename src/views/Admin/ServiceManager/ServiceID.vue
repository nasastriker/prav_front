<template>
  <vx-card no-shadow>
    <vs-tabs>


      <vs-tab label="Сервис">

        <!-- Info -->
        <label style="margin: 20px 0; display: block;">{{ label }}: </label>
        <h6 class="mb-1">Имя сервиса</h6>
        <vs-input class="w-full mb-4" v-model="Service.name"></vs-input>
        <h6 class="mb-1">URL</h6>
        <vs-input class="w-full mb-4" v-model="Service.url"></vs-input>
        <h6 class="mb-1">Порт</h6>
        <vs-input class="w-full mb-4" v-model="Service.port"></vs-input>


        <div style="margin-top: 10px">
          <vs-row>
            <vs-col vs-type="flex" vs-justify="left" vs-align="center">
              <vs-button color="primary" class="pull-right" type="filled" @click="$router.push('/adm/service_manager')">Закрыть
              </vs-button>
              <vs-button style="margin-left: 15px; margin-right: 25px" color="success" class="pull-right" type="filled"
                         @click="save">Сохранить
              </vs-button>
            </vs-col>
          </vs-row>
        </div>
      </vs-tab>

    </vs-tabs>
    <!-- Img Row -->


  </vx-card>
</template>

<script>
import r from '../../../route';
import {mapActions, mapGetters} from 'vuex'
import axios from '../../../axios'
import g from "../../../routeGo";

export default {
  components: {},
  data() {
    return {
      label: 'Редактирование сервиса',
      newService: false,
      Service: {},
    }
  },
  mounted() {
    if (this.$route.params.id != 'new') {
      this.getData(this.$route.params.id);
    } else {
      this.newService = true;
      this.label = 'Регистрация сервиса'
    }

  },

  computed: {
    ...mapGetters([]),

  },
  methods: {
    ...mapActions([
      'saveService',
    ]),
    getData(id) {
      axios.get(g('service_manager/get_service_data'), {
        params: {
          id: id
        }
      }).then((response) => {
        if (response.data.result) {
          this.Service = response.data.data
        }
      })
    },
    save() {
      this.saveService(this.Service).then((response) => {
        if (response) {
          this.$vs.notify({title: 'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center'})
          this.$router.push('/adm/service_manager')
        } else {
          this.$vs.notify({title: 'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center'})
        }
      })
    },
  },
}
</script>
