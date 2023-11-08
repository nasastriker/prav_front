<template>
    <vx-card no-shadow>
        <Back></Back>
        <vs-tabs>

            <vs-tab label="Уточнить ФССП">
                <div class="vx-row" style="padding-top: 20px">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <template v-if="typeof Deb.debtorCredit.id!='undefined'">
                            <Status :id_credit="Deb.debtorCredit.id" class="h6"></Status>
                        </template>
                        <div class="vx-row" style="padding-top: 20px">
                            <div class="vx-col sm:w-1/2 w-full mb-2">

                                <h6 class="h6 mb-1">Взыскатель:</h6>
                                <vs-input class="w-100 mb-4" readonly v-model="Deb.recover.name"></vs-input>
                                <h6 class="h6 mb-1">Цедент:</h6>
                                <vs-input class="w-100 mb-4"  readonly v-model="Deb.recover.namePerv"></vs-input>
                                <h6 class="h6 mb-1" style="margin-top: 25px">Фамилия:</h6>
                                <vs-input class="w-100 mb-4" readonly v-model="Deb.debtor.name_family"></vs-input>
                                <h6 class="h6 mb-1">Имя:</h6>
                                <vs-input class="w-100 mb-4" readonly v-model="Deb.debtor.name"></vs-input>
                                <h6 class="h6 mb-1">Отчетсво:</h6>
                                <vs-input class="w-100 mb-4" readonly  v-model="Deb.debtor.name_patronymic"></vs-input>
                                <h6 class="h6 mb-1">Дата рождения:</h6>
                                <vs-input type="date" class="w-100 mb-4" readonly v-model="Deb.debtor.birthdate"></vs-input>
                                <h6 class="h6 mb-1" style="margin-top: 15px">Номер договора:</h6>
                                <vs-input class="w-100 mb-4"  readonly v-model="Deb.debtorCredit.number_dog"></vs-input>
                                <h6 class="h6 mb-1">Дата договора:</h6>
                                <vs-input type="date" class="w-100 mb-4" readonly v-model="Deb.debtorCredit.date_dog"></vs-input>
                                <h6 class="h6 mb-1" style="margin-top: 15px">Статус гражданина:</h6>

                                <div class="mt-2">

                                    <vs-radio v-model="Deb.debtor.pensioner" vs-value="0" vs-name="pensioner" class="mr-4" @input="changeDeb">Работающий</vs-radio>
                                    <vs-radio v-model="Deb.debtor.pensioner" vs-value="1" vs-name="pensioner" class="mr-4" @input="changeDeb">Пенсионер</vs-radio>
                                </div>
                                <vs-checkbox class="mb-4 mt-4" style="margin-left: 0px" v-model="Deb.debtor.pensioner_check" @input="changeDeb">Не учитывать</vs-checkbox>
                                <vs-button color="primary" type="border" @click="infoFssp">Информация о ходе</vs-button>

                            </div>
                            <div class="vx-col sm:w-1/2 w-full mb-2">

                                <h6 class="h6 mb-1" style="color: red" >№ИП:</h6>
                                <vs-input  class="w-100 mb-4"  v-model="Deb.debtorCredit.number_ip"  @change="changeDeb"></vs-input>
                                <h6 class="h6 mb-1">ИП окончено Дата:</h6>
                                <vs-input type="date" class="w-100 mb-4"  v-model="Deb.debtorCredit.date_end_ip"  @blur="changeDeb"></vs-input>

                                <h6 class="h6 mb-1" style="margin-top: 15px;color: red" >№ СА:</h6>
                                <vs-input class="w-100 mb-4"  v-model="Deb.debtorCredit.number_sa"  @change="changeDeb"> </vs-input>
                                <h6 class="h6 mb-1">Дата СА:</h6>
                                <vs-input type="date" class="w-100 mb-4"  v-model="Deb.debtorCredit.date_sa"  @blur="changeDeb"></vs-input>
                                <h6 class="h6 mb-1">Судебный участок:</h6>
                                <vs-textarea style="font-size: 12px;"  class="w-100 mb-4"  v-model="Deb.debtor.jud_name" ></vs-textarea>

                                <h6 class="h6 mb-1" style="margin-top: 15px;color: red">Остаток долга:</h6>
                                <vs-input type="number" readonly class="w-100 mb-4"  v-model="Deb.debtorCredit.ocs_sum" ></vs-input>
                                <h6 class="h6 mb-1">Сумма долга:</h6>
                                <vs-input type="number" readonly class="w-100 mb-4"  v-model="Deb.debtorCredit.dolg_sum"></vs-input>
                                <h6 class="h6 mb-1" style="margin-top: 25px">Госпошлина:</h6>
                                <vs-input class="w-100 mb-4"  v-model="Deb.debtorCredit.gospohlina" ></vs-input>

                            </div>
                        </div>




                    </div>

                    <div class="vx-col sm:w-1/2 w-full mb-2" style="border: 1px;">
                        <template     v-if="typeof Deb.debtorCredit.data_fssp!='undefined'">
                            <json-viewer

                                    :value="Deb.debtorCredit.data_fssp"
                                    :expand-depth=5
                                    copyable

                                    sort></json-viewer>

                        </template>
                        <div class="vx-row" >
                            <div class="vx-col sm:w-1/3 w-full mb-3" >
                            </div>
                            <div class="vx-col sm:w-1/3 w-full mb-3" >
                                <vs-button color="danger" type="border" @click="saveFssp(0)">Нет</vs-button>
                            </div>

                            <div class="vx-col sm:w-1/3 w-full mb-3">
                                <vs-button color="success" type="border" @click="saveFssp(1)">Верно</vs-button>
                            </div>
                        </div>


                    </div>

                </div>
            </vs-tab>


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
    import Debtor from '../Debtor/DebtorTab/Debtor.vue'
    import VueSuggestions from 'vue-suggestions';
    import JsonViewer from 'vue-json-viewer'
    import Back from '../../components/Back.vue'
    export default {
        components: {
            VueSuggestions,
            DebtorID,
            Debtor,
            Jud,
            Back,
            Status,
            JsonViewer,
            ArrowLeftIcon
        },
        props:['id_deb'],
        data () {
            return {
                credits:[],
            }
        },
        mounted(){
            this.getDataDebtorsById(this.$route.params.id);

        },

        computed: {
            ...mapGetters([
                'StatussDebtorArr','Deb','DebtorRefinesArr','User'

            ]),

        },
        methods: {
            findFssp(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("fssp.index"), {
                    params: {
                        method: 'findFssp',
                        param: this.Deb.debtorCredit.id

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    //   this.getDataDebtorsById(this.Deb.debtorCredit.id);
                    if (response.data.result.mess.response.status) {
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Найдено!!!',
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
                    this.getDataDebtorsById(this.Deb.debtorCredit.id);
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })


                });
            },
            infoFssp(){
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("fssp.index"), {
                    params: {
                        method: 'infoFssp',
                        param: this.Deb.debtorCredit.id

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    this.getDataDebtorsById(this.Deb.debtorCredit.id);
                    if (response.data.data.result) {
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Запрос отправлен!!!',
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
                    this.getDataDebtorsById(this.Deb.debtorCredit.id);
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })


                });
            },
            openFssp(){
                window.open( this.Deb.debtorCredit.url_rec_fssp, '_blank')
            },

            saveFssp(flag){
                axios.post(r("fssp.update"), {
                    params: {
                        method: 'saveFsspCredit',
                        param: {
                            id_credit:this.Deb.debtorCredit.id,
                            stat_fssp:flag
                        }

                    }
                }).then((response) => {
                    this.getDataDebtorsById(this.$route.params.id)
                    if (response.data.result) {
                        this.close();
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
                            text: ' Не сохранено!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    }

                }).catch(error => {
                    this.getDataDebtorsById(this.$route.params.id);
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })


                });
            },

            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getBanksNameAndId','changeDeb'
            ]),




            close(){

                this.$router.back()
            },

            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getDebtorOnly','getDataDebtorRefines'
            ]),

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
