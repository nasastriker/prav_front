<template>
    <vx-card no-shadow style="    min-height: 80vh;">

        <label style="margin-bottom: 10px">Настройки почты:</label>

        <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <h6 class="h6">TOKEN_POCHTA:</h6>

                <vs-input class="w-full mb-base"  v-model="data.token_pochta"></vs-input>
                <h6 class="h6">KEY_POCHTA:</h6>
                <vs-input class="w-full mb-base"  v-model="data.key_pochta"></vs-input>
                <h6 class="h6">AUTH_POCHTA:</h6>
                <vs-input class="w-full mb-base"  v-model="data.auth_pochta"></vs-input>
                <h6 class="h6">OTDEL_POCHTA:</h6>
                <vs-input class="w-full mb-base"  v-model="data.otdel_pochta"></vs-input>
                <h6 class="h6">Онлайн:</h6>
                <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arr"  v-model="data.online"></v-select>




            </div>


        </div>




        <vs-button style="margin-top: 15px" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>

    </vx-card>
</template>

<script>
    import VueSuggestions from 'vue-suggestions';
    import r from '../../../route';
    import { ArrowLeftIcon } from 'vue-feather-icons'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import axios from '../../../axios'

    import vSelect from 'vue-select'
    export default {
        components: { VueSuggestions, ArrowLeftIcon, 'v-select': vSelect,
        },

        data () {
            return {
                arr:[
                    {id:0,name:'Нет'},
                    {id:1,name:'Да'},
                ],
                arrIl:[
                    {id:0,name:'Нет'},
                    {id:1,name:'Да'},
                ],
                editPorts:false,
                data:{
                },

            }
        },


        computed: {
            ...mapGetters([
            ]),

        },
        methods: {

            ...mapMutations([


            ]),
            ...mapActions([
            ]),
            getData(){
                axios.get(r("setting.index"), {
                    params: {
                        method: 'getPochtaSetting',

                    }
                }).then((response) => {
                    if (response.data.result){

                        this.data=response.data.data;
                    }

                })
            },
            save(){

                axios.post(r("setting.update"), {
                    params: {
                        method: 'savePochtaSetting',
                        param: this.data

                    }
                }).then((response) => {
                    if (response.data.result) {

                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Сохранено!!!',
                            color: 'success',
                            position: 'top-center'
                        })

                    }
                    else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Сохранить не удалось !!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                        // this.close();
                    }
                    this.getData()


                })


            },


        },
        mounted(){

            this.getData()

        },
    }
</script>
<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
    }
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }


</style>

