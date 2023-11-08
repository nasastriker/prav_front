<template>
    <vx-card no-shadow>

        <template v-if="$route.name!='task'">
            <label class="text-sm">Сотрудник:</label>
            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="UsersArr"   v-model="data.id_user"  ></v-select>

        </template>

        <label class="text-sm" style="margin-top: 10px">Статус:</label>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="TasksUserStatusArr"   v-model="data.id_status"  ></v-select>
        <h6 class="h6" style="margin-top: 10px">Название:</h6>
        <vs-input class="w-full mb-base" v-model="data.name"></vs-input>
        <h6 class="h6">Описание:</h6>
        <vs-textarea class="w-100"  v-model="data.description" height="200px" > </vs-textarea>

        <h6 class="h6">Комментарий:</h6>
        <vs-textarea class="w-100"  v-model="data.comment" height="200px" > </vs-textarea>

        <h6 class="h6">Дата начала:</h6>
        <vs-input type="date" class="w-100"  v-model="data.date_begin"></vs-input>
        <h6 class="h6">Дата окончания:</h6>
        <vs-input type="date" class="w-100" v-model="data.date_end"></vs-input>


        <div style="margin-top: 10px">
            <vs-row>
                <vs-col vs-offset="8"  vs-type="flex" vs-justify="center" vs-align="center" >
                    <vs-button color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>
                    <vs-button style="margin-left: 15px; margin-right: 25px" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
                </vs-col>
            </vs-row>
        </div>


    </vx-card>
</template>

<script>
import r from '../../route'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import axios from '../../axios'
import vSelect from 'vue-select'
export default {
  components: {
    'v-select': vSelect
  },
  data () {
    return {
      label:'Редактирование банка:',
      data:{
        date_begin:new Date().toISOString(),
        id_status:7
      }
    }
  },
  mounted () {
    ///   console.log(this.$route)
    if (this.$route.params.id) {
      if (this.$route.params.id != 'new') {
        this.getData(this.$route.params.id)
      } {
        this.label = 'Новое поле'
      }


    }
    //console.log();
    this.getDataUsers()

  },

  computed: {
    ...mapGetters(['TasksUserStatusArr', 'UsersArr'])

  },
  methods: {
    close () {
      this.$router.back()
    },
    ...mapMutations([]),
    ...mapActions(['saveTaskUser',    'getDataUsers']),
    getData (id) {
      axios.get(r('taskUser.index'), {
        params: {
          method: 'getTask',
          param: id

        }
      }).then((response) => {
        if (response.data.result) {
          this.data = response.data.data
        }


      })
    },
    save () {
      this.data.id = this.$route.params.id
      this.saveTaskUser(this.data).then((response) => {
        if (response) {
          this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })

          this.$router.back()


        } else {
          this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
        }


      })


    }


  }
}
</script>
