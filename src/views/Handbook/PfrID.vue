<template>
    <vx-card no-shadow style="    min-height: 95vh;
    ">
        <back></back>
        <label style="margin: 20px 0; display:block;"><b>{{label}}</b> </label>
        <h6 class="h6 mb-1" style="margin-top: 20px">Название:</h6>
        <vs-input class="w-full mb-4" v-model="pfr.name"></vs-input>
        <h6 class="h6 mb-1" style="margin-top: 20px">Регион:</h6>
        <vs-input class="w-full mb-4" v-model="pfr.reg"></vs-input>
        <h6 class="h6 mb-1">Region_fias_id:</h6>
        <vs-input class="w-full mb-4"  v-model="pfr.region_fias_id"></vs-input>
        <h6 class="h6 mb-1">Region_kladr_id:</h6>
        <vs-input class="w-full mb-4" v-model="pfr.region_kladr_id"></vs-input>
        <h6 class="h6 mb-1">Почтовый индекс:</h6>
        <vs-input class="w-full mb-4"  v-model="pfr.index_pochta"></vs-input>
        <h6 class="h6 mb-1">Email:</h6>
        <vs-input class="w-full mb-4"  v-model="pfr.email"></vs-input>
        <VueSuggestions
                :model.sync="pfr.address"
                :fias="dat"
                :options="SuggestionOptionsAddress">
        </VueSuggestions>
        <div style="margin-top: 20px">
            <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="$router.push('/handbook/pfr/')">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
        </div>
    </vx-card>
</template>
<script>
    import r from '../../route';
    import Back from '../../components/Back.vue';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import VueSuggestions from '../../components/vue-suggestions/vue-suggestionsChange.vue';
    export default {
        components: {
            VueSuggestions,Back
        },
        data () {
            return {
                label:'Редактирование ПФР:',
                dat:{
                },
                pfr:{
                },

            }
        },
        mounted(){
         ///   console.log(this.$route)
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                    this.label='Редактирование ПФР:'
                }else {
                    this.label='Новый ПФР'
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
                'savePfr',
            ]),
            getData(id){
                axios.get(r("pfr.index")+'?id='+id).then((response) => {
                    if (response.data.result){
                        this.pfr=response.data.data
                    }
                })
            },
            save(){
                this.pfr.id=this.$route.params.id;
                this.savePfr(this.pfr).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.push('/handbook/pfr/')
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
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
</style>