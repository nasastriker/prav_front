<template>
    <vx-card no-shadow>
        <div class="mt-5">
            <div class="vx-row" style="padding-top: 20px">
                <div class="vx-col sm:w-1/2 w-full mb-2">

                    <h3 style="margin-bottom: 10px; padding-bottom: 20px;color:#7367F0 ">{{label}} </h3>
                    <h6 class="h6Blue" style="margin-top: 15px">ИФНС:</h6>
                    <v-select  class="w-100 mb-base" :reduce="label => label.id" label="name" :options="IfnssArr"  v-model="data.id_ifns" style="margin-bottom: 40px" ></v-select>



                    <h6 class="h6Blue" style="margin-top: 15px">Дата поездки:</h6>
                    <vs-input type="date" class="w-100" v-model="data.date"></vs-input>

                    <h6 class="h6Blue" style="margin-top: 15px">Файл:</h6>


                    <vx-input-group class="mb-base">
                        <v-select  class="w-100 " :reduce="label => label" label="arch_name" :options="FnssArr"  v-model="id_file"  ></v-select>

                        <template slot="append">
                            <div class="append-text btn-addon">
                                <vs-button color="primary" @click="addFile">Добавить</vs-button>
                            </div>
                        </template>
                    </vx-input-group>
                    <template v-for="item in data.files">
                                {{data.files}}
                    </template>

                </div>
            </div>



        </div>

        <template v-if="$route.params.id=='new'">
            <div style="margin-top: 10px">
                <vx-input-group class="mb-base">

                    <template slot="append">
                        <div class="append-text">
                            <vs-button color="primary"  class="pull-right mb-base" type="filled"  @click="close">Закрыть</vs-button>

                            <vs-button style="margin-left: 15px; margin-right: 25px" color="success" class="pull-right mb-base" type="filled"  @click="save">Сохранить</vs-button>
                        </div>
                    </template>
                </vx-input-group>


            </div>
        </template>
        <template v-else>
            <div style="margin-top: 10px">
                <vs-row>
                    <vs-col vs-offset="8"  vs-type="flex" vs-justify="center" vs-align="center" >
                        <vs-button style="margin-left: 15px; margin-right: 25px" color="success" class="pull-right mb-base" type="filled"  @click="save">Сохранить</vs-button>
                        <vs-button color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>



                    </vs-col>
                </vs-row>
            </div>
        </template>








    </vx-card>
</template>

<script>
    import VueSuggestions from '../../components/vue-suggestions/vue-suggestionsChange.vue';
    import r from '../../route';
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import JsonViewer from 'vue-json-viewer'
    import vSelect from 'vue-select'
    import AsyncComputed from 'vue-async-computed'
    Vue.use(AsyncComputed)
    export default {
        components: { VueSuggestions,
            'v-select': vSelect,
            JsonViewer
        },
        data () {
            return {
                id_file:0,
                label:'Редактирование поездки:',
                data:{
                    files:[]
                },

            }
        },
        asyncComputed: {
            async RecoverName (id) {
                const x = await axios.get(r("recoverer.index"), {
                    params: {
                        method: 'getRecoverer',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        return response.data.data;

                    }

                })


            }
        },
        mounted(){
            this.getDataIfnss();
            this.getDataFnss();
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                }
                else {
                    this.label='Новая поездка: '
                }


            }



        },

        computed: {

            ...mapGetters([
                'IfnssArr','LogsArr','FnssArr'

            ]),


        },
        methods: {
            getRecover(id){
                axios.get(r("recoverer.index"), {
                    params: {
                        method: 'getRecoverer',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data;

                    }



                })
            },
            addFile(){
                this.data.files.push(this.id_file)
                this.id_file={}
            },
            close(){
                this.$router.back()
            },
            ...mapActions([
                'getDataIfnss','getDataFnss','saveFnsWork'
            ]),

            getData(id){
                axios.get(r("fnsWork.index"), {
                    params: {
                        method: 'getFnsWork',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data;

                    }



                })
            },

            save(){
                this.data.id=this.$route.params.id;

                this.saveFnsWork(this.data).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.close()
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
    .h6Blue{
        font-size: 12px;
        color: #7367F0;
    }
</style>
