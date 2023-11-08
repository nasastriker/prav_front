<template>
    <vx-card no-shadow>

      <h3 class="mb-4">{{label}}</h3>

        <h6 class="text-sm">Название типа платежа:</h6>
        <vs-input  class="w-100" style="min-width: 500px;" v-model="data.name"></vs-input>





        <div style="margin-top: 20px">
            <vs-button color="primary" class="pull-right mr-4" type="filled" @click="close">
                Закрыть
            </vs-button>
            <vs-button color="success" class="pull-right" type="filled" @click="save">Сохранить</vs-button>


        </div>


    </vx-card>
</template>

<script>
    import vSelect from 'vue-select'
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../../axios'
    import Back from '../../../components/Back.vue'
    export default {
        components: {
            'v-select': vSelect,Back,
        },
        data () {
            return {
                documentWord:'/word-logo.png',
                documentUrl:'',
                label:'Редактирование шаблона:',
                data:{

                },

            }
        },
        mounted(){
         ///   console.log(this.$route)
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                }
                else{
                    this.label='Новый тип'
                }


            }


        },

        computed: {
            ...mapGetters([


            ]),

        },
        methods: {
            close(){
                this.$router.back()
            },
            ...mapActions([

            ]),
            save() {
                this.data.id = this.$route.params.id;
                axios.post(r("payment.update"), {
                    params: {
                        method: 'savePaymentType',
                        param: this.data
                    }
                }).then((response) => {

                    if (response.data.result) {
                        this.$vs.notify({title: 'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center'})
                        this.$router.push('/handbook/paymentType/')
                    } else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Сохранить не удалось !!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                    }

                }).catch(error => {
                    this.$vs.loading.close()
                    //   this.popupActive3=false;
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });

            },




            getData(id){
                axios.get(r("payment.index"), {
                    params: {
                        method: 'getPaymentsTypeId',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data
                    }



                })
            },



        },
    }
</script>
