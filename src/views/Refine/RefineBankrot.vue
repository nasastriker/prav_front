<template>
    <vx-card no-shadow>
        <Back></Back>
        <vs-tabs>
            <vs-tab label="Банкротство">
                <div class="vx-row">
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <h6 class="standart" style="margin-top: 25px">Фамилия:</h6>
                    <vs-input class="w-full "  v-model="Deb.debtor.name_family"></vs-input>
                    <h6 class="standart">Имя:</h6>
                    <vs-input class="w-full " v-model="Deb.debtor.name"></vs-input>
                    <h6 class="standart">Отчетсво:</h6>
                    <vs-input class="w-full "  v-model="Deb.debtor.name_patronymic"></vs-input>
                    <h6 class="standart">Дата рождения:</h6>
                    <vs-input type="date" class="w-100 " v-model="Deb.debtor.birthdate"></vs-input>
                    <h6 class="standart">Серия паспорта:</h6>
                    <vs-input  class="w-100 " v-model="Deb.debtor.series"></vs-input>
                    <h6 class="standart">Номер паспорта:</h6>
                    <vs-input  class="w-100 " v-model="Deb.debtor.number"></vs-input>

                    <h6 class="standart">ИНН:</h6>
                    <vs-input class="w-100 " v-model="Deb.debtor.inn"></vs-input>
                    <h6 class="standart">СНИЛС:</h6>
                    <vs-input  class="w-100 " v-model="Deb.debtor.snils"></vs-input>
                    <h6 class="standart">Адрес регистрации:</h6>
                    <vs-input  class="w-full " v-model="Deb.debtor.address_reg"></vs-input>



                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2" >





                    <div class="mt-8 mb-base">
                        <label class="text-sm">Банкрот</label>
                        <div class="mt-2" style="margin-bottom: 25px">
                            <vs-button color="primary" @click="checkBankrot">Определить</vs-button>
                        </div>
                        <template v-if="Deb.debtor.bankrot_delo">
                            <label class="text-sm">Ссылка на банкротное дело:</label>
                            <vx-input-group class="w-100 mb-base">
                                <vs-input  v-model="Deb.debtor.bankrot_delo" />

                                <template slot="append">
                                    <div class="append-text btn-addon">
                                        <vs-button color="primary" type="border" @click="openBankrot">Дело</vs-button>
                                    </div>
                                </template>

                            </vx-input-group>



                        </template>

                        <div class="mt-2" style="margin-bottom: 25px">
                            <vs-button color="primary" type="border" @click="setBankrot">Банкрот</vs-button>
                            <vs-button color="primary"  @click="notBankrot">Не банкрот</vs-button>

                        </div>
                    </div>


                </div>

                </div>





            </vs-tab>

            <template v-if="credits.length>0">


                <vs-tab :label="' №'+item.number_dog" v-for="item in credits" :key="item.id"  >
                    <DebtorID :idDep="item.id"></DebtorID>
                </vs-tab>



            </template>

        </vs-tabs>

    </vx-card>
</template>

<script>
    import { ArrowLeftIcon } from 'vue-feather-icons'
    import r from '../../route';
    import { mapActions,mapGetters, } from 'vuex'
    import axios from '../../axios'
    import DebtorID from '../Debtor/DebtorID.vue'
    import Status from '../../components/Status.vue'
    import Jud from '../Debtor/Jud.vue'
    import VueSuggestions from 'vue-suggestions';
    import JsonViewer from 'vue-json-viewer'
    import Back from '../../components/Back.vue'
    export default {
        components: {
            VueSuggestions,
            DebtorID,
            Jud,
            Back,
            Status,
            JsonViewer,
            ArrowLeftIcon
        },
        props:['id_deb'],
        data () {
            return {
                labelPop:'Подсудность',
                ispl:[],
                credits:[],
                popupActive:false,
                showJud:false,
                showIndex: null,

            }
        },
        mounted(){

            this.getDebtorOnly(this.id_deb)
            if (this.$route.params.id){

                this.getData(this.$route.params.id);



            }
        },

        computed: {
            ...mapGetters([
                'StatussDebtorArr','Deb'

            ]),

        },
        methods: {
            notBankrot(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("debtors.index"), {
                    params: {
                        method: 'notBankrot',
                        param: this.Deb.debtor.id

                    }
                }).then((response) => {
                    this.$vs.loading.close()
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
                            title: 'Успешно',
                            text: 'Ошибка !!!',
                            color: 'success',
                            position: 'top-center'
                        })
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
            setBankrot(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("debtors.index"), {
                    params: {
                        method: 'setBankrot',
                        param: this.Deb.debtor.id

                    }
                }).then((response) => {
                    this.$vs.loading.close()
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
                            title: 'Успешно',
                            text: 'Ошибка !!!',
                            color: 'success',
                            position: 'top-center'
                        })
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
            getData(id){

                axios.get(r("debtors.index"), {
                    params: {
                        method: 'getDebtorAndAllCredit',
                        param: id
                    }
                }).then((response) => {
                    if(response.data.result){
                        this.credits=response.data.credit
                    }




                })
            },
            checkBankrot(){
                let flag=false;

                if (this.Deb.debtor.inn == null) {

                    this.checkInn(true);
                    flag=true;

                }
                if (this.Deb.debtor.inn == "") {
                    this.checkInn(true);
                    flag=true;
                }
                if(!flag) {
                    this.getBankrot();
                }

            },
            getBankrot(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("debtors.index"), {
                    params: {
                        method: 'getBankrot',
                        param: this.Deb.debtor

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.data.result) {
                        this.Deb.debtor.bankrot = 1;
                        this.Deb.debtor.bankrot_delo =response.data.data.id
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Банкротство определено!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    }
                    else {
                        this.Deb.debtor.bankrot = 0;
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Не банкрот !!!',
                            color: 'success',
                            position: 'top-center'
                        })
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
            checkInn(fla){
                let flag=false;
                if (this.Deb.debtor.name==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Имя  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.Deb.debtor.name_family==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Фамилия  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.Deb.debtor.name_patronymic==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Отчество  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.Deb.debtor.birthdate==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Дата рождения  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.Deb.debtor.series==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Серия паспорта  !!!', color: 'danger', position: 'top-center' })
                }
                if (this.Deb.debtor.number==''){
                    flag=true;
                    this.$vs.notify({  title:'Ошибка', text: 'Заполните поле Номер паспорта  !!!', color: 'danger', position: 'top-center' })
                }
                this.$vs.loading({ color: '#ff8000' })
                if(!flag){
                    axios.post(r("debtors.index"), {
                        params: {
                            method: 'getInn',
                            param: this.Deb.debtor

                        }
                    }).then((response) => {

                        this.$vs.loading.close()
                        if (response.data.result){
                            this.Deb.debtor.inn=response.data.data;
                            if(fla){
                                this.getBankrot();
                            }
                            this.$vs.notify({  title:'Успешно', text: 'Инн определен!!!', color: 'success', position: 'top-center' })
                        }
                        else{
                            this.$vs.notify({  title:'Ошибка', text: 'Инн определить не удалось !!!', color: 'danger', position: 'top-center' })
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

                }

            },
            openBankrot(){
                window.open( 'https://bankrot.fedresurs.ru/PrivatePersonCard.aspx?ID=' + this.Deb.debtor.bankrot_delo, '_blank');
            },
            showIndexProc(index){
                if(this.showIndex!=index){
                    this.showIndex = index
                }
                else{
                    this.showIndex = null
                }

            },
            showEditForm(e){
                axios.get(r("jurisdiction.index"), {
                    params: {
                        method: 'getJurisdictionsByStreetFias',
                        param: e

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.popupActive=true;
                        this.labelPop='Адреса в базе данных по данному коду'
                        this.ispl=response.data.data
                    }



                })
            },
            close(){

                this.$router.back()
            },

            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getDebtorOnly'
            ]),

        },
    }
</script>
<style>
    .standart{
        color: #a9a7f0
    }
</style>
