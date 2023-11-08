<template>
    <vx-card no-shadow>
        <h2 style="margin-bottom: 20px;">{{name}}:</h2>

        <h6 class="mb-1">Название:</h6>
        <vs-input  class="w-100 mb-4"  v-model="dogovor.name"></vs-input>
        <h6 class="mb-1">Дата:</h6>
        <vs-input type="date" class="w-100 mb-4"  v-model="dogovor.date"></vs-input>

        <h6 class="mb-1">Url сайта партнера:</h6>
        <vs-input  class="w-100 mb-4"  v-model="dogovor.url"></vs-input>

        <h6 class="mb-1">Url картинки:</h6>
        <vs-input class="w-100 mb-4"  v-model="dogovor.image"></vs-input>


        <h6 class="mb-1" style="margin-top: 20px" >Текст:</h6>
        <vs-textarea class="w-100 mb-4"  v-model="dogovor.text" style="margin-top: 10px" />

        <vs-button style="margin-top: 20px" color="primary"  class="pull-right mr-4" type="filled"  @click="close">Закрыть</vs-button>
        <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


    </vx-card>
</template>

<script>
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../../axios'
    import vSelect from 'vue-select'
    export default {
        components: {
            vSelect
        },
        data () {
            return {
                categories: [
                    {
                        id: 1,
                        name: 'Все',
                        color: 'grey'
                    },
                    {
                        id: 2,
                        name: 'Основные',
                        color: 'primary'
                    },
                    {
                        id: 3,
                        name: 'Использование',
                        color: 'success'
                    },
                    {
                        id: 4,
                        name: 'Оплата',
                        color: 'warning'
                    },
                    {
                        id: 5,
                        name: 'Договора',
                        color: 'danger'
                    }
                ],
                name:'Редактирование договора уступки',
                dogovor: {}
            }
        },
        mounted(){
            if (this.$route.params.id){
                if(this.$route.params.id!="new"){
                    this.getData(this.$route.params.id);


                }
                else{
                    this.name='Новый договор уступки'
                }


            }

        },

        computed: {


        },
        methods: {
            ...mapActions([
                'setDogovor',




            ]),
            close(){
                this.$router.back()
            },
            getData(id){
                axios.get(r("siteDogovora.index"), {
                    params: {
                        method: 'getDogovor',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.dogovor=response.data.data
                    }



                })
            },
            save(){
                if(this.$route.params.id=="new"){
                    this.dogovor.id='new';

                }
                this.setDogovor(this.dogovor).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.push('/site/dogovora')
                    }



                })


            },


        },
    }
</script>
<style>
    .h6mar10{
        margin-top: 10px;
    }
</style>
