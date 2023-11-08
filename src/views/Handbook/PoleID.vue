<template>
    <vx-card no-shadow>
        <div class="flex mb-4">
            <Back></Back>
        </div>
        <!-- Img Row -->

        <!-- Info -->
        <label class="mb-4 block">{{label}} </label>

        <h6 class="mb-1">Название поля</h6>
        <vs-input class="w-full mb-4" v-model="pole.name"></vs-input>
        <h6 class="mb-1">Атрибут поля</h6>
        <vs-input class="w-full mb-base" v-model="pole.atr"></vs-input>

        <div style="margin-top: 20px">
            <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="$router.push('/handbook/pole/')">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
        </div>


    </vx-card>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    export default {
        components: {
        },
        data () {
            return {
                label:'Редактирование банка:',
                pole:{

                },
            }
        },
        mounted(){
         ///   console.log(this.$route)
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                } {
                    this.label='Новое поле'
                }


            }

        },

        computed: {


        },
        methods: {
            ...mapActions([
                'savePole',
            ]),
            getData(id){
                axios.get(r("pole.index"), {
                    params: {
                        method: 'getPole',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.pole=response.data.data
                    }



                })
            },
            save(){
                this.pole.id=this.$route.params.id;
                this.savePole(this.pole).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.push('/handbook/pole/')
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }


                })



            },


        },
    }
</script>
