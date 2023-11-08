<template>
    <vx-card no-shadow>

        <!-- Img Row -->

        <!-- Info -->
        <label style="margin-bottom: 10px">Категория</label>
        <v-select style="margin-top: 10px" :reduce="label => label.id" label="name" :options="categories"  v-model="faq.category_id"></v-select>
        <div style="margin-top: 35px">
        <vs-input   class="w-full mb-base" label-placeholder="Вопрос" v-model="faq.question"></vs-input>
        <vs-textarea height="500px" class="w-full mb-base" label-placeholder="Ответ" v-model="faq.answer"></vs-textarea>
        </div>
        <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="$router.push('/site/faq')">Закрыть</vs-button>
        <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


    </vx-card>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
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

                faq: {}
            }
        },
        mounted(){
            if (this.$route.params.id){
                if(this.$route.params.id!="new"){
                    this.getData(this.$route.params.id);

                }


            }

        },

        computed: {


        },
        methods: {
            ...mapActions([
                'setFaq',




            ]),
            getData(id){
                axios.get(r("faq.index"), {
                    params: {
                        method: 'getFaq',
                        param: id

                    }
                }).then((response) => {
                   if (response.data.result){
                       this.faq=response.data.data
                   }



                })
            },
            save(){
                if(this.$route.params.id=="new"){
                    this.faq.id='new';

                }
                if(this.catName!=''){
                    this.setFaq(this.faq).then((response) => {
                        if(response){
                            this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                            this.$router.push('/site/faq')
                        }



                    })
                }
                else{
                    this.$vs.notify({  title:'Ошибка', text: 'Не заполнено поле категория !!!', color: 'danger', position: 'top-center' })
                }

            },


        },
    }
</script>
