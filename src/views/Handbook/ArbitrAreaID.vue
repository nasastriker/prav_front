<template>
    <vx-card no-shadow>

        <vs-tabs>
            <vs-tab label="Общие">
                <label style="margin-bottom: 10px">{{label}} </label>
                <div class="vx-row" style="padding-top: 20px">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                  <!--      <vs-input class="w-full mb-base" label-placeholder="Номер" v-model="arbitr.number"></vs-input> !-->
                        <h6 class="mb-1">Название</h6>
                        <vs-input class="w-full mb-4" v-model="arbitr.name"></vs-input>
                        <h6 class="mb-1">Индекс</h6>
                        <vs-input class="w-full mb-4" v-model="arbitr.index_pochta"></vs-input>
                        <h6 class="mb-1">Адрес</h6>
                        <vs-input class="w-full mb-4" v-model="arbitr.address_fact"></vs-input>
                        <h6 class="h6 mb-1">Регион:</h6>
                        <v-select class="w-full mb-4"  :reduce="label => label.id" label="name" :options="ArbitrRegionsArr" v-model="arbitr.id_region"></v-select>

                        <div style="margin-bottom: 30px">
                            <h6 class="h6 mb-1">Адрес :</h6>

                            <VueSuggestions
                                    @changeme="saveLocal"
                                    :model.sync="arbitr.address"
                                    :fias.sync="arbitr.data_address"
                                    :options="SuggestionOptionsAddress">

                            </VueSuggestions>

                        </div>
                        <template v-if="arbitr.data_address!=null">
                            <h6 class="h6 mb-1">ФИАС код улицы:</h6>

                            <vx-input-group class="w-100 mb-4">

                                <vs-input disabled v-model="arbitr.data_address.street_fias_id"  />

                                <template slot="append">
                                    <div class="append-text btn-addon">
                                        <vs-button color="warning" type="border" @click="showEditForm(arbitr.data_address.street_fias_id)">ИНФО</vs-button>
                                    </div>
                                </template>
                            </vx-input-group>

                            <h6 class="h6 mb-1">Дом.:</h6>
                            <vs-input class="w-full mb-4"  disabled  v-model="arbitr.data_address.house"></vs-input>


                        </template>


                        <h6 class="mb-1">Сайт:</h6>
                        <vx-input-group class="w-100 mb-4">
                            <vs-input v-model="arbitr.site"  />

                            <template slot="append">
                                <div class="append-text btn-addon">
                                    <vs-button color="warning" type="border"  @click="openUrl">Открыть</vs-button>
                                </div>
                            </template>
                        </vx-input-group>
                        <h6 class="mb-1">
                                Email:
                              </h6>
                        <vx-input-group class="w-100 mb-4">
                            <vs-input v-model="arbitr.email"  />

                            <template slot="append">
                                <div class="append-text btn-addon">
                                    <vs-button color="warning" type="border"  @click="send">Написать</vs-button>
                                </div>
                            </template>
                        </vx-input-group>
                     <!--
                        <span style="margin-bottom: 5px">
                                Страница подсудности:
                              </span>
                        <vx-input-group class="w-100 mb-base">
                            <vs-input v-model="arbitr.podsupnost"  />

                            <template slot="append">
                                <div class="append-text btn-addon">
                                    <vs-button color="warning" type="border"  @click="openUrlPod">Открыть</vs-button>
                                </div>
                            </template>
                        </vx-input-group>
                        !-->
                    </div>
                    <!--
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <vs-checkbox style="margin-bottom: 15px" v-model="arbitr.origPP" >Приложить оригинал ПП госпошлина</vs-checkbox>
                        <vs-checkbox style="margin-bottom: 15px" v-model="arbitr.origDover" >Приложить оригинал доверенность</vs-checkbox>
                        <vs-checkbox style="margin-bottom: 15px" v-model="arbitr.notElPis" >Не принимают электронное письмо</vs-checkbox>
                        <vs-checkbox style="margin-bottom: 15px" v-model="arbitr.notOnline" >Отказывают по онлайн займу</vs-checkbox>
                    </div>
                !-->
                </div>


            </vs-tab>

        </vs-tabs>
        <div style="margin-top: 20px">
         <!--   <vs-button color="primary"  class="pull-right" type="filled"  @click="checkArbitrAcc">Проверить Плат Акк</vs-button> !-->
            <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="$router.push('/handbook/arbitr-act/')">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


        </div>


    </vx-card>
</template>

<script>
    import r from '@/route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '@/axios'
    import VueSuggestions from '../../components/vue-suggestions/vue-suggestionsChange.vue';
    export default {
        components: {
            VueSuggestions,
        },
        data () {
            return {
                label:'Редактирование судебного участка:',
                arbitr:{

                },
                site:'',

            }
        },
        mounted(){
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                } {
                    this.label='Судебный участок'
                }
            }
        },

        computed: {
            ...mapGetters([
                'ArbitrRegionsArr','SuggestionOptionsAddress'
            ]),

        },
        methods: {
            checkArbitrAcc(){
                this.$vs.loading({ color: '#ff8000' })
                axios.get(r("arbitrlArea.index"), {
                    params: {
                        method: 'checkarbitrAcc',
                        param: this.judi.id

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.arbitr=response.data.data
                    }
                    else{
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Ошибка',
                            color: 'danger',
                            position: 'top-center'
                        })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });





            },

            showEditForm(){

            },
            openUrlPod(){
                window.open(this.arbitr.podsupnost, '_blank');
            },
            openUrl(){
                window.open(this.arbitr.site, '_blank');
            },
            send(){
                window.open('mailto:'+this.arbitr.email, '_blank');
            },
            ...mapActions([
                'saveArbitrArea',
            ]),
            getData(id){
                axios.get(r("arbitrArea.index"), {
                    params: {
                        method: 'getArbitrArea',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.arbitr=response.data.data
   //                     this.getArbitrSite(this.arbitr.number);
                    }



                })
            },
    /*
            getArbitrSite(number){
                axios.get(r("arbitrArea.index"), {
                    params: {
                        method: 'getArbitrSite',
                        param: number

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.site=response.data.data.site
                    }



                })
            },
            */
            saveLocal(){
                this.arbitr.id=this.$route.params.id;
                axios.post(r("arbitrArea.update"), {
                    params: {
                        method: 'saveArbitrArea',
                        param: this.arbitr
                    }
                }).then((response) => {
                    if(response.data.result){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }



                })




            },
            save(){
                this.arbitr.id=this.$route.params.id;
                this.saveArbitrArea(this.arbitr).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.push('/handbook/arbitr-act/')
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
    .highlighted { color: red }
    .terr-item .right {
        margin-left: 32%;
    }
    .terr-item .left {
        width: 30%;
        float: left;
    }
    .address-note {
        font-size: 13px;
        color: #444;
        padding-top: 5px;
    }
    .table{
        border-collapse: collapse; /* Убираем двойные линии между ячейками */
    }
    .tdd{
        padding: 3px; /* Поля вокруг содержимого таблицы */
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .standart{
        color: #a9a7f0
    }
</style>