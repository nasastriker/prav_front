<template>
    <vx-card no-shadow>
        <div class="mt-5">
            <vs-tabs>

                <vs-tab label="Платеж">
                    <div class="vx-row" >

                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <h6 class="h6 mb-1" >Сумма:</h6>
                            <vs-input class="w-100 mb-4"   v-model="data.sum"></vs-input>
                            <h6 class="h6 mb-1" >Договор:</h6>
                            <vs-input class="w-100 mb-4" readonly  v-model="data.number"></vs-input>
                            <h6 class="h6 mb-1" >Договор загруженный:</h6>
                            <vs-input class="w-100 mb-4" readonly v-model="data.number_load"></vs-input>
                            <h6 class="h6 mb-1" >Заёмщик:</h6>
                            <vs-input class="w-full mb-4" readonly v-model="data.name_family"></vs-input>
                            <h6 class="h6 mb-1" >Заёмщик загруженный:</h6>
                            <vs-input class="w-full mb-4" readonly  v-model="data.fio_load"></vs-input>
                            <h6 class="h6 mb-1" >Дата платежа:</h6>
                            <vs-input type="date" class="w-100 mb-4" readonly  v-model="data.date"></vs-input>
                            <h6 class="h6 mb-1" >Тип платежа:</h6>
                            <v-select  class="w-50 mb-4" :reduce="label => label.id" label="name" :options="PaymentsTypeArr"  v-model="data.type"></v-select>
                            <h6 class="h6 mb-1" >Вид платежа:</h6>
                            <v-select  class="w-50 mb-4" :reduce="label => label.id" label="name" :options="PaymentsVidArr"  v-model="data.vid"></v-select>
                            <h6 class="h6 mb-1" >БИК:  <span style="font-size: 8pt;color: red">{{ bank }}</span></h6>

                            <vs-input class="w-full mb-4"  v-model="data.bic"></vs-input>
                            <h6 class="h6 mb-1" >Счет:</h6>
                            <vs-input class="w-full mb-4" v-model="data.account"></vs-input>
                            <h6 class="h6 mb-1" >Основание платежа:</h6>
                            <vs-input class="w-full mb-4"   v-model="data.osn"></vs-input>
                            <h6 class="h6 mb-1" >Вид взыскания:</h6>
                            <vs-input class="w-full mb-4"   v-model="data.name_delo_name" disabled></vs-input>

                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <template v-if="!data.id_credit">
                                <vs-input class="w-100 mb-4"  label-placeholder="ID_кредита" v-model="id_credit"></vs-input>
                                <vs-button color="success" class="pull-right" type="filled"  @click="saveCred">Привязать</vs-button>
                            </template>
                        </div>
                    </div>
                    <div style="margin-top: 20px">
                        <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="close">Закрыть</vs-button>
                        <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


                    </div>




                </vs-tab>
                <vs-tab label="Договор" v-if="data.id_credit">
                    <DebtorID :idDep="data.id_credit"></DebtorID>


                </vs-tab>


            </vs-tabs>
        </div>





    </vx-card>
</template>

<script>
    import DebtorID from '../../Debtor/DebtorID.vue'
    import r from '../../../route';
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../../axios'
    import vSelect from 'vue-select'
    export default {
        components: {
            DebtorID,  vSelect,
        },
        data () {
            return {
                bank: '',
                id_credit:'',
                data:{
                    type:1,
                    vid:1,
                },

            }
        },
        mounted(){
                    this.getPaymentsVidArr()
                    this.getData()





        },

        computed: {
            ...mapGetters([
                'PaymentsTypeArr','PaymentsVidArr'
            ]),
                fio(){
                    return this.data.name_family+' '+this.data.name+' '+this.data.name_patronymic
                }
        },
        methods: {

            close(){
                this.$router.back()
            },
            ...mapActions([
                'saveRecoverer','saveRecovererDocument','getPaymentsVidArr'
            ]),
            getData(){
                axios.get(r("payment.index"), {
                    params: {
                        method: 'getPaymentByID',
                        param: this.$route.params.id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data;
                        this.getPayBank();
                    }



                })
            },
          getPayBank(){
            axios.get(r("payment.index"), {
              params: {
                method: 'getPayBank',
                param: this.data.bic

              }
            }).then((response) => {
              if (response.data.result){
                this.bank=response.data.bank;

              }



            })
          },
            saveCred(){
              this.data.id_credit=this.id_credit;
              this.save();
            },
            save(){
                this.$vs.loading({ color: '#ff8000' })
                axios.post(r("payment.index"), {
                    params: {
                        method: 'savePayment',
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
