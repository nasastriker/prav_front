<template>
    <vx-card no-shadow>

        <!-- Img Row -->

        <!-- Info -->
        <label class="mb-4">{{label}} </label>
        <h6 class="mb-1 mt-4">Название</h6>
        <vs-input class="w-full mb-base" v-model="data.name"></vs-input>

        <h6 class="mb-2">Цвет статуса задачи</h6>
        <v-input-colorpicker  v-model="data.color" />


        <div style="margin-top: 20px">

            <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="$router.push('/handbook/task_status/')">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


        </div>


    </vx-card>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import InputColorPicker from 'vue-native-color-picker'
    export default {
        components: {
            "v-input-colorpicker": InputColorPicker
        },
        data () {
            return {
                label:'Редактирование:',
                data:{

                },
            }
        },
        mounted(){
         ///   console.log(this.$route)
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                } {
                    this.label='Новый статус'
                }


            }

        },

        computed: {


        },
        methods: {
            ...mapActions([
                'saveTaskUserStatus',
            ]),
            getData(id){
                axios.get(r("taskUserStatus.index"), {
                    params: {
                        method: 'getTaskUserStatus',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data
                    }



                })
            },
            save(){
                this.data.id=this.$route.params.id;
                this.saveTaskUserStatus(this.data).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.push('/handbook/task_status/')
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }


                })



            },


        },
    }
</script>
