<template>
    <vx-card no-shadow   style="min-height: 95vh;"  >
        <vs-tabs >


            <vs-tab label="Пользователь">

                <!-- Info -->
                <label style="margin-bottom: 30px">{{label}}: </label>
                <h6 class="mb-1 mt-4">Имя</h6>
                <vs-input class="w-full mb-4" v-model="User.name"></vs-input>

                <h6 class="mb-1">Фамилия</h6>
                <vs-input class="w-full mb-4" v-model="User.name_family"></vs-input>

                <h6 class="mb-1">Отчетсво</h6>
                <vs-input class="w-full mb-4" v-model="User.name_patronymic"></vs-input>

                <h6 class="mb-1">ID Телеграм</h6>
                <vs-input class="w-full mb-4" v-model="User.telegram_id"></vs-input>

                <div class="mt-8 mb-base">
                    <label class="text-sm">Удаление досье</label>
                    <div class="mt-2">
                        <vs-radio v-model="User.delete_dos" vs-value="0" class="mr-4">Нет</vs-radio>
                        <vs-radio v-model="User.delete_dos" vs-value="1" class="mr-4">Да</vs-radio>
                    </div>
                </div>
                <div class="vx-row">
                <div class="vx-com m-1/3">
                    <vs-checkbox class="mb-1 ml-4" v-model="User.change_recover">Изменение взыскателя</vs-checkbox>
                    <vs-checkbox class="mb-1 ml-4" v-model="User.accsess_upload">Доступ к выгрузкам</vs-checkbox>
                    <vs-checkbox class="mb-1 ml-4" v-model="User.separation_dossiers">Доступ к разделению досье</vs-checkbox>
                    <vs-checkbox class="mb-1 ml-4" v-model="User.accsess_payments">Доступ к добавлению платежей в анкете заемщика</vs-checkbox>
                    <vs-checkbox class="mb-1 ml-4" v-model="User.access_regsudact">Доступ к настройкам Регистрации судактов</vs-checkbox>
                    <vs-checkbox class="mb-1 ml-4" v-model="User.role_id">Доступ к постановке задач в "РАБОЧЕМ ПРОФИЛЕ"</vs-checkbox>
                    <vs-checkbox class="mb-1 ml-4" v-model="User.add_prodan">Доступ к редактированию Проданых</vs-checkbox>
                    <vs-checkbox class="mb-1 ml-4" v-model="User.add_dop_var">Доступ к созданию дополнительных переменных</vs-checkbox>
                    <vs-checkbox class="mb-1 ml-4" v-model="User.accsess_debtor_credit">Отображать КД закрепленные за сотрудником</vs-checkbox>
                </div>
                <div class="vx-col m-1/3">
                    <vs-checkbox class="mb-1 ml-4" v-model="userAccsessRecoverSave" @change="changeUserAccsessRecoverSave">Запретить редактирование данных пользователю</vs-checkbox>
                    <vs-checkbox class="mb-1 ml-4" v-model="dcdoc_delete_denided" @change="changeUserAccsessRecoverSave">Запретить пользователю удаление   </vs-checkbox>
                </div>
                </div>
                <div class="mt-8 mb-base">
                    <label class="text-sm">Пол</label>
                    <div class="mt-2">
                        <vs-radio v-model="User.sex" vs-value="M" class="mr-4">Мужской</vs-radio>
                        <vs-radio v-model="User.sex" vs-value="F" class="mr-4">Женский</vs-radio>
                    </div>
                </div>
                <h6 class="mb-1">Телефон</h6>
                <vs-input style="margin-top: 10px" class="w-full mb-4" v-model="User.phone"></vs-input>
                
                <h6 class="mb-1">Email</h6>
                <template v-if="!newUser">
                    <vs-input class="w-full" disabled  v-model="User.email"></vs-input>
                </template>
                <template v-else>
                    <vs-input
                            v-validate="'required|email'"
                            data-vv-validate-on="blur"
                            type="email"
                            label-placeholder="Email"
                            name="Email"
                            placeholder="Email"
                            v-model="User.email"
                            class="w-full mt-6" />
                    <span class="text-danger text-sm">{{ errors.first('Email') }}</span>


                    <vs-input
                            ref="password"
                            type="password"
                            data-vv-validate-on="blur"
                            v-validate="'required|min:6|max:10'"
                            name="password"
                            label-placeholder="Password"
                            placeholder="Password"
                            v-model="User.password"
                            class="w-full mt-6" />
                    <span class="text-danger text-sm">{{ errors.first('password') }}</span>

                    <div class="mt-8 mb-base">
                        <label class="text-sm">Отправить логин/пароль по СМС</label>
                        <div class="mt-2">
                            <vs-radio v-model="User.send" vs-value="0" class="mr-4">Нет</vs-radio>
                            <vs-radio v-model="User.send" vs-value="1" class="mr-4">Да</vs-radio>
                        </div>
                    </div>
                </template>
                <div style="margin-top: 10px">
                    <vs-row>
                        <vs-col vs-offset="8"  vs-type="flex" vs-justify="center" vs-align="center" >
                            <vs-button color="primary"  class="pull-right" type="filled"  @click="$router.push('/adm/users')">Закрыть</vs-button>
                            <vs-button v-if="!newUser" style="margin-left: 15px;" color="danger"  class="pull-right" type="filled"  @click="changePswd">Смена пароля</vs-button>
                            <vs-button style="margin-left: 15px; margin-right: 25px" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
                        </vs-col>
                    </vs-row>
                </div>
            </vs-tab>
            <vs-tab label="Доступ к организациям">
              <AccsessOrgn></AccsessOrgn>
            </vs-tab>
            <vs-tab label="Доступ к взыскателям">
                <AccsessRecovers></AccsessRecovers>
            </vs-tab>
            <vs-tab label="Оператор взаимодействия">
                <InteractionOperator></InteractionOperator>
            </vs-tab>

        </vs-tabs>
        <!-- Img Row -->


      <vs-popup classContent="popup-example" title="Смена пароля" :active.sync="popupNewPswd">
        <div style="margin-top: 10px">Новый пароль</div>
        <vs-input
            ref="password"
            type="password"
            data-vv-validate-on="blur"
            v-validate="'required|min:6|max:10'"
            name="password"
            label-placeholder="Password"
            placeholder="Password"
            v-model="User.password"
            class="w-full mt-6" />
        <span class="text-danger text-sm">{{ errors.first('password') }}</span>
        <vs-button color="success" style="margin-top: 15px" class="pull-right" type="filled"
                   @click="saveNewPswd">Сменить</vs-button>
      </vs-popup>


    </vx-card>
</template>

<script>
import r from '../../route'
import { mapActions, mapGetters } from 'vuex'
import axios from '../../axios'
import AccsessRecovers from './AccsessRecovers.vue'
import InteractionOperator from './InteractionOperator.vue'

import AccsessOrgn from './AccsessOrgn.vue'
export default {
  components: {
    AccsessRecovers,
    AccsessOrgn,
    InteractionOperator
  },
  data () {
    return {
      userAccsessRecoverSave:false,
      dcdoc_delete_denided:false,
      popupNewPswd:false,
      label:'Редактирования пользователя',
      newUser:false,
      User:{

      }
    }
  },
  mounted () {
    if (this.$route.params.id !== 'new') {

      this.getData(this.$route.params.id)


    } else {
      this.newUser = true
      this.label = 'Новый пользователь'
    }
    this.getUserAccsessRecoverSave()
    this.getUserAccsessRecoverSave()

  },

  computed: {
    ...mapGetters(['ShowTask'])

  },
  methods: {
    ...mapActions(['saveUser']),

    getData (id) {
      axios.get(r('users.index'), {
        params: {
          method: 'getUserById',
          param: id

        }
      }).then((response) => {
        if (response.data.result) {
          this.User = response.data.data
        }


      })
    },
    save () {


      this.saveUser(this.User).then((response) => {
        if (response) {
          this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
          this.$router.push('/adm/users')
        } else {
          this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
        }


      })


    },
    changePswd () {
      this.popupNewPswd = true
    },

    saveNewPswd () {
      this.popupNewPswd = false
      this.save()
    },
    getUserAccsessRecoverSave () {
      axios.get(r('userAccsessRecover.index'), {
        params: {
          method: 'getUserAccsessRecoverSave',
          param:this.$route.params.id
        }
      }).then(res => {
        if (res.data.result) {
          this.userAccsessRecoverSave = res.data.data.user_accsess_recover
          this.dcdoc_delete_denided = res.data.data.dcdoc_delete_denided
        }
      })
    },


    changeUserAccsessRecoverSave () {

      axios.post(r('userAccsessRecover.update'), {
        params: {
          method: 'changeUserAccsessRecoverSave',
          param: {id_user:this.$route.params.id,
            UserAccsessRecover:this.userAccsessRecoverSave,
            dcdoc_delete_denided:this.dcdoc_delete_denided
          }
        }
      }).then(res => {
        if (res.data.result) {
          this.$vs.notify({
            title: 'Успешно',
            text: 'Успешно!!!',
            color: 'success',
            position: 'top-center'
          })
        } else this.$vs.notify({
          title: 'Ошибка',
          text: 'Ошибка !!!',
          color: 'danger',
          position: 'top-center'
        })
      }).catch(e => {
        this.$vs.notify({
          title: 'Ошибка',
          text: 'Ошибка !!!',
          color: 'danger',
          position: 'top-center'
        })
      })
    }
  }

}
</script>
