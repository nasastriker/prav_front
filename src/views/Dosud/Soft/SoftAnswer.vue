<template>
    <vx-card no-shadow>

        <!-- Img Row -->

        <!-- Info -->
        <h3 style="margin-bottom: 10px">Телефонное приветствие для всех: </h3>

        <vs-textarea  v-model="data.text_all" />

        <h3 style="margin-bottom: 10px">{{label}} </h3>
        <p> Можно использовать следующие переменные:</p>
        <p> <b>$Name</b> - Имя заёмщика</p>
        <p> <b>$Family</b> - Фамилия заёмщика</p>
        <p> <b>$Patronymic</b> - Отчество заёмщика</p>
        <p> <b>$SumDolg</b> - Сумма долга</p>
        <vs-textarea class="mt-4 mb-6" v-model="data.text" />

        <h3 style="margin-bottom: 10px">Телефонное приветствие для закрытых договоров </h3>
        <p> Можно использовать следующие переменные:</p>
        <p> <b>$Name</b> - Имя заёмщика</p>
        <p> <b>$Family</b> - Фамилия заёмщика</p>
        <p> <b>$Patronymic</b> - Отчество заёмщика</p>
        <p> <b>$SumDolg </b> - Сумма долга</p>
        <vs-textarea class="mt-4" v-model="data.text_close" />

        <div style="margin-top: 20px">

            <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="close">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


        </div>


    </vx-card>
</template>

<script>
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../../axios'
    export default {
        components: {
        },
        data () {
            return {
                label:'Телефонное приветствие для заёмщиков:',
                data:'',
            }
        },
        mounted(){
            this.getData();

        },

        computed: {


        },
        methods: {
            close(){

                this.$router.back()
            },

            getData(){
                axios.get(r("phone.index"), {
                    params: {
                        method: 'getPhoneText',
                        param: ''

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data
                    }



                })
            },
            save(){
                axios.post(r("phone.index"), {
                    params: {
                        method: 'savePhoneText',
                        param: this.data

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено' , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось' , color: 'danger', position: 'top-center' })
                    }



                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })



            },


        },
    }
</script>
