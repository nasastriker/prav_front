<template>
    <vx-card no-shadow>
        <div class="mt-5">
            <vs-tabs>

                <vs-tab label="Платеж">
                    <div class="vx-row" >

                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <h6 class="mb-1">Сумма</h6>
                            <vs-input class="w-100 mb-4" readonly v-model="data.sum"></vs-input>
                            <h6 class="mb-1">Договор</h6>
                            <vs-input class="w-100 mb-4" readonly v-model="data.number"></vs-input>
                            <h6 class="mb-1">Договор загруженный</h6>
                            <vs-input class="w-100 mb-4" readonly v-model="data.number_load"></vs-input>
                            <h6 class="mb-1">Заёмщик</h6>
                            <vs-input class="w-full mb-4" readonly v-model="data.name_family"></vs-input>
                            <h6 class="mb-1">Заёмщик загруженный</h6>
                            <vs-input class="w-full mb-4" readonly v-model="data.fio_load"></vs-input>
                            <h6 class="mb-1">Дата платежа</h6>
                            <vs-input type="date" class="w-100 mb-4" readonly v-model="data.date"></vs-input>
                            <h6 class="mb-1">БИК</h6>
                            <vs-input class="w-100 mb-4" readonly v-model="data.bic"></vs-input>
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <template v-if="!data.id_sudOrder">
                                <vs-input class="w-100 mb-base"  label-placeholder="ID_Суд Ордера" v-model="id_sudOrder"></vs-input>
                                <vs-button color="success" class="pull-right" type="filled"  @click="saveSudOrder">Привязать</vs-button>
                            </template>
                        </div>
                    </div>

                </vs-tab>
                <vs-tab label="Договор">
                    <DebtorID :idDep="data.id_credit"></DebtorID>
                </vs-tab>
            </vs-tabs>
        </div>
        <div style="margin-top: 20px">
            <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="close">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


        </div>





    </vx-card>
</template>

<script>
    import DebtorID from '../../Debtor/DebtorID.vue'
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../../axios'
    export default {
        components: {
            DebtorID,
        },
        data () {
            return {
                id_sudOrder:'',
                id_credit:'',
                data:{

                },

            }
        },
        mounted(){

                    this.getData();




        },

        computed: {

                fio(){
                    return this.data.name_family+' '+this.data.name+' '+this.data.name_patronymic
                }
        },
        methods: {

            close(){
                this.$router.back()
            },
            ...mapActions([
                'saveRecoverer','saveRecovererDocument',
            ]),
            getData(){
                axios.get(r("paymentSo.index"), {
                    params: {
                        method: 'getPaymentByID',
                        param: this.$route.params.id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data;

                    }



                })
            },
            saveSudOrder(){
              this.data.id_sudOrder=this.id_sudOrder;
              this.save();
            },
            save(){
                this.$vs.loading({ color: '#ff8000' })
                axios.post(r("paymentSoOne.index"), {
                    params: {
                        method: 'savePaymentSoOne',
                        param: this.data

                    }
                }).then((response) => {
                    this.getData();
                    this.$vs.loading.close()
                    if (response.data.result){
                        this.close()

                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }

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
    }
</script>
