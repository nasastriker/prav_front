<template>
    <vx-card no-shadow>

        <!-- Img Row -->

        <!-- Info -->
        <label style="margin-bottom: 20px; display:block;">{{label}} </label>
        <h6 class="mb-1">Код</h6>
        <vs-input class="w-full mb-4" v-model="fssp.fssp_area_code"></vs-input>
        <h6 class="mb-1">Регион</h6>
        <vs-input class="w-full mb-4" v-model="fssp.reg"></vs-input>
        <h6 class="mb-1">Наименование</h6>
        <vs-input class="w-full mb-4" v-model="fssp.main_fssp"></vs-input>
        <VueSuggestionsChange
            class="mb-4"
            @changeme="saveLocal"
            :model.sync="fssp.address"
            :fias.sync="fssp.data"
            :options="SuggestionOptionsAddress">

        </VueSuggestionsChange>
        <h6 class="mb-1">Индекс</h6>
        <vs-input class="w-full mb-4" v-model="fssp.post_index"></vs-input>
        <h6 class="mb-1">Должность начальника</h6>
        <vs-input class="w-full mb-4" v-model="fssp.director_dolj"></vs-input>
        <h6 class="mb-1">ФИО начальника</h6>
        <vs-input class="w-full mb-4" v-model="fssp.director_fio"></vs-input>
        <h6 class="mb-1">Телефон начальника</h6>
        <vs-input class="w-full mb-4" v-model="fssp.director_tel"></vs-input>




        <div style="margin-top: 20px">

            <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="$router.push('/handbook/fssp/')">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


        </div>


    </vx-card>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import VueSuggestionsChange from '../../components/vue-suggestions/vue-suggestionsChange.vue'

    export default {
        components: {
            VueSuggestionsChange
        },
        data () {
            return {
                label:'Редактирование ФССП:',
                fssp:{
                    fssp_area_code: '',
                    reg:'',
                    main_fssp:'',
                    address:'',
                    post_index:'',
                    data:{}
                },

            }
        },
        mounted(){
         ///   console.log(this.$route)
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                    this.label='Редактирование ФССП:'
                }
                else{
                    this.label='Новый ФССП'
                }


            }

        },

        computed: {
            ...mapGetters([
                'SuggestionOptionsAddress',
            ]),

        },
        methods: {
            ...mapActions([
                'saveFssp',
            ]),
            saveLocal(){
                if(typeof this.fssp.data.postal_code!="undefined") {
                    this.fssp.post_index = this.fssp.data.postal_code
                } else {
                    this.fssp.post_index = null
                }
            },
            getData(id){
                axios.get(r("fssp.index"), {
                    params: {
                        method: 'getFssp',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.fssp=response.data.data
                    }



                })
            },
            save(){
                this.fssp.id=this.$route.params.id;
                this.saveFssp(this.fssp).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.push('/handbook/fssp/')
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }


                })



            },


        },
    }
</script>
