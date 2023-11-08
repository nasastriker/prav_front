<template>
    <vx-card no-shadow style="    min-height: 95vh;">

        <vs-tabs v-model="$store.state.status.activeTabStatus">
            <vs-tab label="Общие" style="    margin-top: 20px;" >
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
            <vs-tab label="Настройки" >
                <vs-checkbox style="margin-top: 35px" v-model="status.gospohlina" >Должна быть госпошлина</vs-checkbox>
                <vs-checkbox style="margin-top: 10px" v-model="status.otz_send" >Необходимо отправить отзыв после исполнения</vs-checkbox>
                <vs-checkbox style="margin-top: 10px" v-model="status.find_ip" >Поиск исполнительного производства</vs-checkbox>
                <vs-checkbox style="margin-top: 10px" v-model="status.stop" >Переводить на СТОП работа с этого статуса</vs-checkbox>
                <vs-checkbox style="margin-top: 10px" v-model="status.clearFieldsBanks" >Очищать список банков при переходе на статус</vs-checkbox>
                <vs-checkbox style="margin-top: 10px" v-model="status.clearFieldsFssp" >Очищать ФССП при переходе на статус</vs-checkbox>
              <h6 class="h6" style="margin-top: 20px">Очередь для работы по схеме:</h6>
              <vs-input v-model="status.work_conn"></vs-input>
                <div style="margin-top: 20px">

                    <vs-button color="primary"  class="pull-right" type="filled"  @click="$router.push('/handbook/status/')">Закрыть</vs-button>
                    <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


                </div>

              <StatusCheckConditions style="margin-top: 30px"></StatusCheckConditions>
            </vs-tab>

        </vs-tabs>





    </vx-card>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import axios from '../../axios'
    import StatusCheckConditions from "./StatusCheckConditions/StatusCheckConditions.vue";
    export default {
        components: {
          StatusCheckConditions
        },
        data () {
            return {
                label:'Редактирование ФССП:',
                status:{

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

        },
        methods: {

            ...mapActions([
                'saveStatus',
            ]),
            ...mapMutations([
            ]),
            getData(id){
                axios.get(r("status.index"), {
                    params: {
                        method: 'getStatus',
                        param: id
                    }
                }).then((response) => {
                    if (response.data.result){
                        this.status=response.data.data
                    }
                })
            },
            save(){
                this.status.id=this.$route.params.id;
                this.saveStatus(this.status).then((response) => {
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
