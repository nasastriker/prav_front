<template>
    <vx-card no-shadow>
        <label style="margin-bottom: 10px">{{label}} </label>
        <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col sm:w-1/2 w-full mb-2">

                <h6 class="h6 mb-1">Код:<VarToClipboard name="ifns_code"/></h6>
                <vs-input class="w-100 mb-4" v-model="ifns.code"></vs-input>
                <h6 class="h6 mb-1">Название:<VarToClipboard name="ifns_name"/></h6>
                <vs-input class="w-full mb-4" v-model="ifns.name"></vs-input>
                <h6 class="h6 mb-1">ИНН:<VarToClipboard name="ifns_inn"/></h6>
                <vs-input class="w-100 mb-4" v-model="ifns.inn"></vs-input>
                <h6 class="h6 mb-1">КПП:<VarToClipboard name="ifns_kpp"/></h6>
                <vs-input class="w-100 mb-4"  v-model="ifns.kpp"></vs-input>

                <h6 class="h6 mb-1">Группа:<VarToClipboard name="ifns_grp_ifns"/></h6>
                <v-select class="w-501 mb-4" style="padding-right: 10px;margin-bottom: 5px"
                          :reduce="label => label.id" label="name" :options="Group" v-model="ifns.grp_ifns"
                ></v-select>
                <vs-checkbox style="margin-bottom: 15px; margin-left: 10px" v-model="ifns.not_send">Не отправлять</vs-checkbox>
                <div style="margin-bottom: 30px">
                    <h6 class="h6 mb-1">Адрес:<VarToClipboard name="ifns_address"/></h6>
                    <VueSuggestions
                            :model.sync="ifns.address"
                            :fias.sync="ifns.data_address"
                            :options="SuggestionOptionsAddress"
                            class="vs-inputx vs-input--input normal w-full"
                            style="border: 1px solid rgba(0, 0, 0, 0.2);padding: 0.75rem !important;">
                    </VueSuggestions>
                </div>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <h6 class="h6 mb-1">Телефон:<VarToClipboard name="ifns_phone"/></h6>
                <vs-input class="w-100 mb-4" v-model="ifns.phone"></vs-input>
                <h6 class="h6 mb-1">bankName:<VarToClipboard name="ifns_bankName"/></h6>
                <vs-input class="w-full mb-4" v-model="ifns.bankName"></vs-input>
                <h6 class="h6 mb-1">bankBic:<VarToClipboard name="ifns_bankBic"/></h6>
                <vs-input class="w-100 mb-4" v-model="ifns.bankBic"></vs-input>
                <h6 class="h6 mb-1">correspAcc:<VarToClipboard name="ifns_correspAcc"/></h6>
                <vs-input class="w-100 mb-4"  v-model="ifns.correspAcc"></vs-input>

                <h6 class="h6 mb-1">payeeAcc:<VarToClipboard name="ifns_payeeAcc"/></h6>
                <vs-input class="w-100 mb-4"  v-model="ifns.payeeAcc"></vs-input>
                <h6 class="h6 mb-1">payeeName:<VarToClipboard name="ifns_payeeName"/></h6>
                <vs-input class="w-100 mb-4"  v-model="ifns.correspAcc"></vs-input>
                <h6 class="h6 mb-1">payeeInn:<VarToClipboard name="ifns_payeeInn"/></h6>
                <vs-input class="w-100 mb-4"  v-model="ifns.payeeInn"></vs-input>
                <h6 class="h6 mb-1">payeeKpp:<VarToClipboard name="ifns_payeeKpp"/></h6>
                <vs-input class="w-100 mb-4"  v-model="ifns.payeeKpp"></vs-input>


            </div>
        </div>

        <div style="margin-top: 20px">

            <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="$router.push('/handbook/ifns/')">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


        </div>


    </vx-card>
</template>

<script>
    import VueSuggestions from 'vue-suggestions';
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../../axios'
    import vSelect from 'vue-select'
    import VarToClipboard from './../../VarToClipboard.vue'
    export default {
        components: {
            VueSuggestions, 'v-select': vSelect,VarToClipboard
        },
        data () {
            return {
                Group:[
                    {
                        id:1,
                        name:'Группа 1'
                    },
                    {
                        id:2,
                        name:'Группа 2'
                    },

                ],
                label:'Редактирование ИФНС:',
                ifns:{

                },

            }
        },
        mounted(){
         ///   console.log(this.$route)
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                    this.label='Редактирование ИФНС:'
                }
                else{
                    this.label='Новый ИФНС'
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
                'saveIfns',
            ]),
            getData(id){
                axios.get(r("ifns.index"), {
                    params: {
                        method: 'getIfns',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.ifns=response.data.data
                    }



                })
            },
            save(){
                this.ifns.id=this.$route.params.id;
                this.saveIfns(this.ifns).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.push('/handbook/ifns/')
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }


                })



            },


        },
    }
</script>
<style lang="scss">
    .h6{
        font-size: 12px;
        color: cadetblue;
    }


</style>
