<template>
    <div>
        <template v-if="data.length>0">
        <vs-tabs>
            <vs-tab :label="item.name+' №'+item.number_dog" v-for="item in data" :key="item.id">
                <div class="vx-row" style="padding-top: 20px">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <vs-input class="w-full mb-base" label-placeholder="Продукт" v-model="item.product"></vs-input>
                        <vs-input class="w-full mb-base" disabled label-placeholder="Номер договора" v-model="item.number_dog"></vs-input>
                        <vs-input type="date" class="w-full mb-base"  label-placeholder="Дата договора" v-model="item.date_dog"></vs-input>
                        <vs-input class="w-full mb-base" disabled label-placeholder="Сумма долга" v-model="item.summ_dolg"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Основной долг" v-model="item.osn_dolg"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Сумма займа" v-model="item.sum_zaim"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Займ всего" v-model="item.sum_zaim_all"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Договорные проценты" v-model="item.dogovor_procent"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Процентная ставка" v-model="item.procent"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Полные проценты" v-model="item.full_procent"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Просрочка" v-model="item.delay"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Госпошлина" v-model="item.gospohlina"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Ограничение закон" v-model="item.ogran"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Долг проценты" v-model="item.dolg_procent"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Пени" v-model="item.peny"></vs-input>
                        <vs-input type="date" class="w-full mb-base" label-placeholder="Cрок возврата" v-model="item.sroc_dog"></vs-input>
                        <vs-input  class="w-full mb-base"  disabled label-placeholder="Количество дней" v-model="item.sroc_dog_day"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Платежи" v-model="item.payment"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="ПСК" v-model="item.psk"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Платежная система" v-model="item.payment_system"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Номер транзакции" v-model="item.trans_number"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Маска карты" v-model="item.card_mask"></vs-input>
                        <vs-input class="w-full mb-base" label-placeholder="Код эцп" v-model="item.code_isp"></vs-input>
                </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2" style="border: 1px;">
                        <h4>Рабочий процесс:</h4>
                        <vs-input type="date" class="w-50 mb-base" label-placeholder="Дата заявления СП" v-model="item.date_sp"></vs-input>
                        <vs-input  class="w-full mb-base" label-placeholder="№ СА" v-model="item.number_sa"></vs-input>
                        <vs-input type="date" class="w-50 mb-base" label-placeholder="Дата СА" v-model="item.date_sa"></vs-input>
                        <vs-input  class="w-full mb-base" label-placeholder="Заявление фнс" v-model="item.claim_fns"></vs-input>
                        <vs-input type="date" class="w-50 mb-base" label-placeholder="Дата направления в банк" v-model="item.date_bank"></vs-input>
                        <vs-input type="date" class="w-50 mb-base" label-placeholder="Направлено в банк" v-model="item.send_bank"></vs-input>
                        <vs-input  class="w-full mb-base" label-placeholder="Заявление ПФ" v-model="item.number_pf"></vs-input>
                        <vs-input  class="w-full mb-base" label-placeholder="ФССП" v-model="item.fssp"></vs-input>

                     </div>
                </div>
                <PaymentTabel :id_dogovor="item.id"></PaymentTabel>
                <div style="margin-top: 20px">
                    <vs-button style="margin-top: 10px" color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>
                    <vs-button color="success" class="pull-right" type="filled"  @click="save(item)">Сохранить</vs-button>
                </div>
            </vs-tab>

        </vs-tabs>
        </template>

    </div>

</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../route';
    import PaymentTabel from './PaymentTabel.vue'
    import axios from '../../axios'
    export default {
        props:['id_debtor'],
        components: {
            PaymentTabel
        },
        data () {
            return {
                data:[],

            }
        },

        computed: {


        },
        methods: {
            save(item){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("debtorCredit.index"), {
                    params: {
                        method: 'saveDebtorCredit',
                        param: item

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result) {
                        this.getData(this.id_debtor)

                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Сохранено',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
                    else {
                        this.getData(this.id_debtor)
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Не удалось сохранить !!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                    }

                }).catch(error => {
                    this.getData(this.id_debtor)
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
              console.log(item);
            },
            close(){

                this.$router.back()
            },
            getData(id){
                axios.get(r("debtorCredit.index"), {
                    params: {
                        method: 'getCreditBuIdDebtor',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data;
                    }
                    else{



                        this.data=[];
                    }

                })
            }

        },
        mounted () {

            this.getData(this.id_debtor)

        }
    }


</script>

<style lang="scss">

</style>
