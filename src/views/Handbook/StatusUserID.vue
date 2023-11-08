<template>
  <div id="page-user-list">
    <div class="vx-card p-6" style="min-height: 90vh;">
      <vs-tabs >
        <vs-tab label="Статус">
          <label style="margin-bottom: 20px;margin-top: 20px">{{label}} </label>
          <h6 class="h6" style="margin-top: 20px">Название:</h6>
          <vs-input class="w-full mb-base" v-model="status.name"></vs-input>


          <h6 class="h6">Цель статуса:</h6>
          <vs-textarea v-model="status.target" placeholder="введите текст цели" class="w-full mb-base" height="200px"></vs-textarea>

          <h6 class="h6">Основания статуса:</h6>
          <vs-textarea v-model="status.description" placeholder="введите текст основания" class="w-full mb-base" height="200px" ></vs-textarea>
          <div style="margin-top: 20px">

            <vs-button color="primary"  class="pull-right" type="filled"  @click="$router.push('/handbook/status/')">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


          </div>
        </vs-tab>
        <vs-tab label="Настройки">
          <vs-checkbox style="margin-top: 5px" v-model="status.stop_calc">Останавливать расчеты</vs-checkbox>
          <vs-checkbox style="margin-top: 5px" v-model="status.check_podsud">Поиск подсудности</vs-checkbox>
          <vs-checkbox style="margin-top: 5px" v-model="status.not_check_bankrot">Отключить поиск банкротов</vs-checkbox>

          <vs-checkbox style="margin-top: 5px" v-model="status.sendVtb">Отправить запрос в ВТБ</vs-checkbox>
          <label class="text-sm mb-2" style="display: block">Поменять на статус после запроса ВТБ :</label>
          <v-select   class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="status.afterVtb"  ></v-select>

          <vs-checkbox style="margin-top: 5px" v-model="status.sendSber">Отправить запрос в Сбер</vs-checkbox>
          <label class="text-sm mb-2" style="display: block">Поменять на статус после запроса Сбер :</label>
          <v-select   class="w-50 " :reduce="label => label.id" label="name" :options="StatussArr"  v-model="status.afterSber"  ></v-select>

          <h6 class="h6" style="margin-top: 20px">Очередь для работы по схеме:</h6>
          <vs-input v-model="status.work_conn"></vs-input>

          <div style="margin-top: 20px">
            <vs-button color="primary"  class="pull-right" type="filled"  @click="$router.push('/handbook/status/')">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
          </div>
        </vs-tab>
        <vs-tab label="Схема">
          <vs-checkbox style="margin-top: 5px" v-model="status.shemActiv">Схема Активна</vs-checkbox>
          <Shema :scene="status.shem" @saveShem="saveShem"></Shema>
          <div style="margin-top: 20px">
            <vs-button color="primary"  class="pull-right" type="filled"  @click="$router.push('/handbook/status/')">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
          </div>
        </vs-tab>

      </vs-tabs>




    </div>
  </div>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import axios from '../../axios'
    import Shema from '../Strategy/Shema'
    export default {
        components: {
          Shema
        },
        data () {
            return {
                label:'',
                status:{
                  sendVtb:false,
                  sendSber:false,
                  afterVtb:0,
                  afterSber:0,
                  shem:{},
                },
            }
        },
        mounted(){
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                    this.label='Редактирование Статуса:'
                }
                else{
                    this.label='Новый статус'
                }
            }
        },

        computed: {
          ...mapGetters([
            'StatussArr'

          ]),
        },
        methods: {
            saveShem(data){
              this.status.shem=data;
            },
            ...mapActions([
                'saveUserStatus',
            ]),
            ...mapMutations([
            ]),
            getData(id){
                axios.get(r("status.index"), {
                    params: {
                        method: 'getUserStatus',
                        param: id
                    }
                }).then((response) => {
                    if (response.data.result){
                        this.status=response.data.data
                        if(this.status.shem==null){
                          this.status.shem={}
                        }

                    }
                })
            },
            save(){
                this.status.id=this.$route.params.id;
                this.saveUserStatus(this.status).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.push('/handbook/status/')
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }

                })

            },
        },
    }
</script>
<style>
    .h6 {
        font-size: 12px;
        color: cadetblue;
    }
</style>
