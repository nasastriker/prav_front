<template>
    <vx-card no-shadow>
        <template v-if="RecoverersArr.length>0">
            <h3>Выберите взыскателя:</h3>
            <v-select  class="w-200" style="max-width: 350px" :reduce="label => label.id" label="name"  :options="RecoverersArr"  v-model="id_rec"   ></v-select>
        </template>

        <h6 class="h6Blue">Номер договора: 8578-5566-002 </h6>
        <vs-row>
            <vs-input class="w-full" style="max-width: 350px"  v-model="number"  @keyup.enter="findNumber" ></vs-input>
        </vs-row>
        <h6 class="h6Blue">ФИО: Березина Анастасия Владимировна </h6>
        <vs-row>
            <vs-input class="w-full" style="max-width: 350px"  v-model="fio"  @keyup.enter="findFio" ></vs-input>
        </vs-row>

        <template v-if="findFlag">
            <fieldset class="f" style="margin-top: 15px" >
                <legend class="l">{{Deb.debtor.name_family}} {{Deb.debtor.name}} {{Deb.debtor.name_patronymic}}:</legend>
            <div class="vx-row" style="padding-top: 20px;padding-left: 10px; padding-right: 10px">
                <div class="vx-col sm:w-1/3 w-full mb-2">
                    <template v-if="typeof Deb.debtorCredit.id!='undefined'">
                        <Status :id_credit="Deb.debtorCredit.id" class="h6" ref="status"></Status>
                    </template>
                    <h6 class="h6">Взыскатель:</h6>
                    <vs-input class="w-100" readonly v-model="Deb.recover.name"></vs-input>
                    <h6 class="h6">Цедент:</h6>
                    <vs-input class="w-100 "  readonly v-model="Deb.recover.namePerv"></vs-input>
                    <h6 class="h6" style="margin-top: 25px">Фамилия:</h6>
                    <vs-input class="w-100 " readonly v-model="Deb.debtor.name_family"></vs-input>
                    <h6 class="h6">Имя:</h6>
                    <vs-input class="w-100 " readonly v-model="Deb.debtor.name"></vs-input>
                    <h6 class="h6">Отчетсво:</h6>
                    <vs-input class="w-100 " readonly  v-model="Deb.debtor.name_patronymic"></vs-input>
                    <h6 class="h6">Дата рождения:</h6>
                    <vs-input type="date" class="w-100 " readonly v-model="Deb.debtor.birthdate"></vs-input>
                    <h6 class="h6" style="margin-top: 15px">Номер договора:</h6>
                    <vs-input class="w-100"  readonly v-model="Deb.debtorCredit.number_dog"></vs-input>
                    <h6 class="h6">Дата договора:</h6>
                    <vs-input type="date" class="w-100"readonly v-model="Deb.debtorCredit.date_dog"></vs-input>
                    <h6 class="h6" style="margin-top: 15px">Статус гражданина:</h6>

                    <div class="mt-2">

                        <vs-radio v-model="Deb.debtor.pensioner" vs-value="0" vs-name="pensioner" class="mr-4" @input="changeDeb">Работающий</vs-radio>
                        <vs-radio v-model="Deb.debtor.pensioner" vs-value="1" vs-name="pensioner" class="mr-4" @input="changeDeb">Пенсионер</vs-radio>
                    </div>
                </div>
                <div class="vx-col sm:w-2/3 w-full mb-2">
                    <fieldset class="f" >
                        <legend class="l">Соглашение:</legend>
                        <div style="padding-left: 15px">
                            <div class="vx-row" style="padding-top: 20px; padding-left: 15px">
                                <h6 class="h6" style="margin-top: 15px">Статус:</h6>

                            </div>
                            <div class="vx-row" style="padding-left: 15px">
                                <div class="mt-2">
                                    <vs-radio v-model="Deb.soglashenie.status" vs-value="0" vs-name="soglashenie" class="mr-4" > Не Заключено</vs-radio>
                                    <vs-radio v-model="Deb.soglashenie.status" vs-value="1" vs-name="soglashenie" class="mr-4" >Заключено</vs-radio>
                                </div>
                        </div>

                        </div>

                        <div class="vx-row" style="padding-top: 20px; padding-left: 15px">

                            <div class="vx-col w-full mb-2">
                                <h6 class="h6">Дата заключения соглашения:</h6>
                                <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date" ></vs-input>

                            </div>
                            <div class="vx-col sm:w-1/2 w-full mb-2">
                                <h6 class="h6">Дата первого платежа:</h6>
                                <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date1" ></vs-input>
                                <h6 class="h6">Дата второго платежа:</h6>
                                <vs-input type="date" class="w-100" v-model="Deb.soglashenie.date2" ></vs-input>
                            </div>
                            <div class="vx-col sm:w-1/2 w-full mb-2">
                                <h6 class="h6">Сумма первого платежа:</h6>
                                <vs-input type="number" class="w-100" v-model="Deb.soglashenie.sum1" ></vs-input>
                                <h6 class="h6">Сумма второго платежа:</h6>
                                <vs-input type="number" class="w-100" v-model="Deb.soglashenie.sum2" ></vs-input>
                            </div>
                        </div>

                        <div class="vx-row" style="padding-top: 20px; padding-left: 15px">
                            <div class="vx-col sm:w-1/2 w-full mb-2">
                                <h6 class="h6">Код:</h6>
                                <vs-input  class="w-100" v-model="Deb.soglashenie.code" ></vs-input>
                            </div>

                            <div class="vx-col sm:w-1/2 w-full mb-2">
                                <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
                            </div>




                        </div>


                    </fieldset>
                </div>

            </div>
            </fieldset>


        </template>

        <template v-if="findFlagNotFound">
            <fieldset class="f" style="margin-top: 15px" >
                <legend class="l">Не найден:</legend>
                <h1 style="text-align: center; color: #a00;
                    padding-top: 20px ;
                    padding-bottom: 20px;
                    ">Договор не найден!!!</h1>
            </fieldset>


        </template>

    </vx-card>
</template>

<script>
    import r from '../../../route';
    import { mapActions,mapGetters, } from 'vuex'
    import axios from '../../../axios'
    import vSelect from 'vue-select'
    import Status from '../../../components/Status.vue'
    export default {
        components: {
            'v-select': vSelect,Status
        },
        data () {
            return {
                isk:0,
                sud:0,
                fio:'',
                findFlagNotFound:false,
                fail_rachod:0,
                sud_rashod:0,
                id_rec:0,
                number:'',
                findFlag:false,
               // Deb:{}
            }
        },
        mounted(){
            this.getDataRecoverersAndPravez();
        },

        computed: {
            ...mapGetters([
                'RecoverersArr','Deb'

            ]),


        },
        methods: {
            save(){
                this.Deb.soglashenie.id_debtorcredit=this.Deb.debtorCredit.id
                axios.post(r("sogl.update"), {
                    params: {
                        method: 'save',
                        param: this.Deb.soglashenie

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$router.push('/buh/sogl/')
                    }
                    else {
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }



                })
            },
            findFio(){
                let flag=false;
                this.isk=0
                this.sud=0
                this.findFlag=false;
//                if (this.id_rec==0){
//                    flag=true;
//                    this.$vs.notify({  title:'Ошибка', text: 'Для поиска по фамилии выберите взыскателя!!!', color: 'danger', position: 'top-center' })
//                }
                if(!flag){
                    this.$vs.loading({ color: '#ff8000' })
                    axios.get(r("find.index"), {
                        params: {
                            method: 'findFio',
                            param: {
                                id_rec:this.id_rec,
                                fio:this.fio,

                            }

                        }
                    }).then((response) => {
                        if (response.data.result){
                            this.findFlag=true;
                            this.getDataDebtorsById(response.data.id)
                            this.findFlagNotFound=false;
                            this.$vs.loading.close()
                        }
                        else{
                            this.findFlagNotFound=true;
                        }this.$vs.loading.close()



                    })
                }

            },
            findNumber(){
                this.isk=0
                this.sud=0
                this.findFlag=false;
                this.$vs.loading({ color: '#ff8000' })
                axios.get(r("find.index"), {
                    params: {
                        method: 'findNumber',
                        param: {
                            id_rec:this.id_rec,
                            number:this.number,

                        }

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.findFlag=true;
                        this.getDataDebtorsById(response.data.id)
                        this.findFlagNotFound=false;
                        this.$vs.loading.close()
                    }
                    else{
                        this.findFlagNotFound=true;
                    }this.$vs.loading.close()



                })
            },
            ...mapActions([
                'getDataRecoverersAndPravez','changeDeb','getDataDebtorsById'
            ]),


        },
    }
</script>
<style>
    .f {

        border: 1px; border-style: double;border-color: #62626262; border-radius: 8px;
    }
    .l {
        color: #a00;
        padding: 0 10px;
    }
</style>
