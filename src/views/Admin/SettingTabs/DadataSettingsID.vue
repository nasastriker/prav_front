<template>
    <vx-card no-shadow style="    min-height: 80vh;">

        <label style="margin-bottom: 10px">Настройки почты:</label>

            <div >
                <h6 class="h6">DADATA_TOKEN:</h6>
                <vs-input class="w-full mb-base"  v-model="data.token"></vs-input>
                <h6 class="h6">DADATA_SECRET:</h6>
                <vs-input class="w-full mb-base"  v-model="data.secret"></vs-input>
                <h6 class="h6">Использовать на Фронт:</h6>

                <vs-checkbox style="margin-bottom: 15px"  v-model="data.front">Активно</vs-checkbox>




            </div>

           <div>
               <vs-button color="primary" class="pull-right" type="filled"  @click="onBackClick">Отменить</vs-button>
               <vs-button style="margin-top: 15px" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>

           </div>
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
        props:['id','editPop'],
        data () {
            return {

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

            onBackClick(){
                this.$emit('back_click')
            },
            getData(){
                axios.get(r("dadata.index"), {
                    params: {
                        method: 'getDadataSettingOnce',
                        param: this.id,

                    }
                }).then((response) => {
                    if (response.data.result){

                        this.data=response.data.data;
                    }

                })
            },
            save(){
                this.data.id=this.id
                axios.post(r("dadata.update"), {
                    params: {
                        method: 'saveDadataSetting',
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
                    this.onBackClick()
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


                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });


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

