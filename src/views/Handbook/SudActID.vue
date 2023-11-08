<template>
    <vx-card no-shadow>


            <vs-input class="w-full mb-base" label-placeholder="ID" v-model="data.id"></vs-input>
            <vs-input class="w-full mb-base" label-placeholder="Id_region" v-model="data.id_region"></vs-input>

            <vs-input class="w-full mb-base" label-placeholder="name_region" v-model="data.name_region"></vs-input>
            <vs-input class="w-full mb-base" label-placeholder="url" v-model="data.url"></vs-input>
            <vs-button color="success" class="pull-right" type="filled"  @click="upd">Обновить</vs-button>


                <span v-html="data.site" ></span>


        <div style="margin-top: 20px">
            <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="$router.push('/handbook/jud-act/')">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


        </div>


    </vx-card>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import VueSuggestions from '../../components/vue-suggestions/vue-suggestionsChange.vue';
    export default {
        components: {
            VueSuggestions
        },
        data () {
            return {
                label:'Редактирование судебного участка:',
                data:{

                },
                site:'',
                suggestionOptionsAddress: {
                    // @see https://confluence.hflabs.ru/pages/viewpage.action?pageId=207454318
                    token: 'b8a2583286b923f4ac8da8cc290138cccb8d77ee',
                    type: "ADDRESS",
                    scrollOnFocus: false,
                    triggerSelectOnBlur: false,
                    triggerSelectOnEnter: false,
                    addon: 'none',
                    // @see https://confluence.hflabs.ru/pages/viewpage.action?pageId=207454320
                    onSelect (suggestion) {

                    }
                },
            }
        },
        mounted(){
         ///   console.log(this.$route)
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                } {
                    this.label='Судебный участок'
                }


            }

        },

        computed: {


        },
        methods: {



            ...mapActions([
                'saveJudicial',
            ]),
            upd(){
                axios.get(r("judicialAct.index"), {
                    params: {
                        method: 'updateActSite',
                        param: this.$route.params.id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data
                    }



                })
            },
            getData(id){
                axios.get(r("judicialAct.index"), {
                    params: {
                        method: 'getJudicialAct',
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
                this.saveJudicial(this.data).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.push('/handbook/jud-act/')
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
    .highlighted { color: red }
    .terr-item .right {
        margin-left: 32%;
    }
    .terr-item .left {
        width: 30%;
        float: left;
    }
    .address-note {
        font-size: 13px;
        color: #444;
        padding-top: 5px;
    }
    .table{
        border-collapse: collapse; /* Убираем двойные линии между ячейками */
    }
    .tdd{
        padding: 3px; /* Поля вокруг содержимого таблицы */
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .standart{
        color: #a9a7f0
    }
</style>