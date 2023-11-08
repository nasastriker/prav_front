<template>
    <vx-card no-shadow>

        <h3 style="margin-bottom: 25px">{{label}} {{data.name}}: </h3>

        <div>
            <div class="centerx">
                <vs-tooltip text="Название шаблона" position="top" >
                    <h6 class="h6Blue mb-1">Название шаблона:</h6>
                </vs-tooltip>
            </div>
            <vs-input class="w-100 "  v-model="data.name"></vs-input>
        </div>

        <h6 style="margin-top: 15px">Шаблон по умлочанию (можно оставить пустым):</h6>
            <div class="vx-row" style="padding-top: 20px">
                <div class="vx-col sm:w-1/3 w-full mb-2">
                    <vSelect  class="w-100 mb-base"  :options="['Шаблон1','Шаблон2']"  v-model="data.shablon" style="margin-bottom: 40px" ></vSelect>
                </div>
            </div>


        <p> Можно использовать следующие переменные:</p>
        <p> <b>$Name</b> - Имя заёмщика</p>
        <p> <b>$Family</b> - Фамилия заёмщика</p>
        <p> <b>$Patronymic</b> - Отчество заёмщика</p>
        <p> <b>$SumDolg </b> - Сумма долга</p>
        <p> <b>$OrganName </b> - Название организации</p>
        <p> <b>$OrganPhone </b> - Телефон организации</p>
        <p> <b>$OrganEmail </b> - Email организации</p>
        <p> <b>$OrganOgrn </b> - Огрн организации</p>

        <VueEditor style="margin-top: 10px" v-model="data.text" ></VueEditor>

        <div style="margin-top: 20px">

            <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="close">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>

        </div>


    </vx-card>
</template>

<script>
    import r from '../../../route';
    import axios from '../../../axios'
    import { VueEditor } from "vue2-editor";
    export default {
        components: {
          VueEditor,
        },
        data () {
            return {
                data:{},
                label:'Новый шаблон почтового сообщения',
            }
        },
        mounted(){
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                    this.label='Редактирование шаблона почтового сообщения'
                }
                else{
                    this.label='Новый шаблон почтового сообщения'
                }


            }


        },

        computed: {


        },
        methods: {
            close(){

                this.$router.back()
            },

            getData(id){
                axios.get(r("templSoft.index"), {
                    params: {
                        method: 'getTemplSoft',
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
                this.data.type='email'
                axios.post(r("templSoft.index"), {
                    params: {
                        method: 'setTemplSoft',
                        param: this.data

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено' , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось' , color: 'danger', position: 'top-center' })
                    }

                    this.$router.back()

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
