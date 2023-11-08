<template>
    <div id="page-user-list">
        <div class="vx-card p-6" style="min-height: 95vh;">
            <Back></Back>
            <h3>{{label}}</h3>

            <div  style="margin-top: 30px;     max-width: 450px;">
                <label class="text-sm">Название стратегии:</label>
                <vs-input  class="w-100" style="min-width: 500px;" v-model="data.name"></vs-input>

            </div >
            <div  style="margin-top: 10px;     max-width: 450px;">
                <label class="text-sm">Общая стратегия:</label>
                <vs-checkbox style="margin-bottom: 15px" v-model="data.allReestr">стратегия для всех </vs-checkbox>


            </div >

            <strategyPeremenUsl :id_strategy="this.$route.params.id" ref="strategyPeremenUsl"></strategyPeremenUsl>
            <strategyPeremenAction :id_strategy="this.$route.params.id" ref="strategyPeremenAction"></strategyPeremenAction>

            <div style="margin-top: 15px">
                <vs-button color="primary" class="pull-right" type="filled" @click="$router.push('/strategyPeremen')">
                    Закрыть
                </vs-button>
                <vs-button color="success" class="pull-right" type="filled" @click="save">Сохранить</vs-button>
            </div>

         </div>
    </div>
</template>

<script>
    import vSelect from 'vue-select'
    import r from '../../route';
    import StrategyPeremenUsl from './StrategyPeremenUsl.vue';
    import strategyPeremenAction from './StrategyPeremenAction.vue';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import Back from '../../components/Back.vue'

    export default {
        components: {
            'v-select': vSelect,Back,StrategyPeremenUsl,strategyPeremenAction       },
        data () {
            return {

                label:'Редактирование стратегии:',

                data:{
                    name:'',
                    allReestr:0,
                },
               
            }
        },
        mounted(){
            ///   console.log(this.$route)
            this.label='Новая стратегия:'
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                }

            }


        },

        computed: {
            ...mapGetters([


            ]),

        },
        methods: {
         
            close(){
                this.$router.back()
            },
            ...mapActions([

            ]),
            save() {
                this.data.id = this.$route.params.id;
                this.data.peremenArr=this.$refs.strategyPeremenUsl.peremenArr
                this.data.actionArr=this.$refs.strategyPeremenAction.actionArr
                axios.post(r("strategyPeremen.update"), {
                    params: {
                        method: 'saveStrategyPeremen',
                        param: this.data
                    }
                }).then((response) => {

                    if (response.data.result) {
                        this.$vs.notify({title: 'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center'})
                        this.$router.push('/strategyPeremen')
                    } else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Сохранить не удалось !!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                    }

                }).catch(error => {
                    this.$vs.loading.close()
                    //   this.popupActive3=false;
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });

            },


          
            ...mapActions([
                'saveStrategyPeremen',
            ]),
            getData(id){
                axios.get(r("strategyPeremen.index"), {
                    params: {
                        method: 'getStrategyPeremen',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data
                    }



                })
            },



        },
    }
</script>
