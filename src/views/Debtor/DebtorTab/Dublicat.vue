<template>
    <vx-card no-shadow>


        <div class="vx-row" style="padding-top: 20px">
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <template v-if="typeof Deb.debtorCredit.id!='undefined'">
                    <Status :id_credit="Deb.debtorCredit.id" class="h6" ref="status"></Status>
                </template>
                <div class="vx-row" style="padding-top: 20px">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <h6 class="h6">Особые пометки:<VarToClipboard name="dc_comment"/></h6>
                        <vs-textarea class="w-100"  v-model="Deb.debtorCredit.comment" @change="changeDeb"> </vs-textarea>
                        <h6 class="h6">Взыскатель:<VarToClipboard name="r_name"/></h6>
                        <vs-input class="w-100" readonly v-model="Deb.recover.name"></vs-input>
                        <h6 class="h6">Цедент:<VarToClipboard name="r_namePerv"/></h6>
                        <vs-input class="w-100 "  readonly v-model="Deb.recover.namePerv"></vs-input>
                        <h6 class="h6" style="margin-top: 25px">Фамилия:<VarToClipboard name="d_name_family"/></h6>
                        <vs-input class="w-100 " readonly v-model="Deb.debtor.name_family"></vs-input>
                        <h6 class="h6">Предыдущая фамилия:<VarToClipboard name="d_name_family_last"/></h6>
                        <vs-input class="w-100 "  v-model="Deb.debtor.name_family_last"></vs-input>
                        <h6 class="h6">Имя:<VarToClipboard name="d_name"/></h6>
                        <vs-input class="w-100 " readonly v-model="Deb.debtor.name"></vs-input>
                        <h6 class="h6">Отчетсво:<VarToClipboard name="d_name_patronymic"/></h6>
                        <vs-input class="w-100 " readonly  v-model="Deb.debtor.name_patronymic"></vs-input>
                        <h6 class="h6">Дата рождения:<VarToClipboard name="d_birthdate"/></h6>
                        <vs-input type="date" class="w-100 " readonly v-model="Deb.debtor.birthdate"></vs-input>
                        <h6 class="h6" style="margin-top: 15px">Номер договора:<VarToClipboard name="dc_number_dog"/></h6>
                        <vs-input class="w-100"  readonly v-model="Deb.debtorCredit.number_dog"></vs-input>
                        <h6 class="h6">Дата договора:<VarToClipboard name="dc_date_dog"/></h6>
                        <vs-input type="date" class="w-100" readonly v-model="Deb.debtorCredit.date_dog"></vs-input>
                        <h6 class="h6" style="margin-top: 15px">Статус гражданина:<VarToClipboard name="d_pensioner"/></h6>

                        <div class="mt-2">

                            <vs-radio v-model="Deb.debtor.pensioner" vs-value="0" vs-name="pensioner" class="mr-4" @input="changeDeb">Работающий</vs-radio>
                            <vs-radio v-model="Deb.debtor.pensioner" vs-value="1" vs-name="pensioner" class="mr-4" @input="changeDeb">Пенсионер</vs-radio>
                        </div>
                        <vs-checkbox style="margin-bottom: 15px" v-model="Deb.debtor.pensioner_check" @input="changeDeb">Не учитывать</vs-checkbox>

                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2">

                        <h6 class="h6">Место СА:<VarToClipboard name="dc_find_sa"/></h6>
                        <vs-input  class="w-100"  v-model="Deb.debtorCredit.find_sa" @change="changeDeb"></vs-input>
                        <h6 class="h6">Судебный участок:<VarToClipboard name="d_jud_name"/></h6>
                        <vs-textarea style="font-size: 12px;"  class="w-100"  v-model="Deb.debtor.jud_name" ></vs-textarea>
                        <h6 class="h6" style="margin-top: 15px">№ СА:<VarToClipboard name="dc_number_sa"/></h6>
                        <vs-input class="w-100"  v-model="Deb.debtorCredit.number_sa"  @change="changeDeb"> </vs-input>
                        <h6 class="h6">Дата СА:<VarToClipboard name="dc_date_sa"/></h6>
                        <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_sa"  @blur="changeDeb"></vs-input>

                        <h6 class="h6">Дата Дубликат:<VarToClipboard name="dc_date_dublicat"/></h6>
                        <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_dublicat"  @blur="changeDeb"></vs-input>

                        <h6 class="h6">Сумма долга:<VarToClipboard name="dc_dolg_sum"/></h6>
                        <vs-input type="number" readonly class="w-100 "  v-model="Deb.debtorCredit.dolg_sum" @change="changeDeb"></vs-input>
                        <h6 class="h6" style="margin-top: 25px">Госпошлина:<VarToClipboard name="dc_gospohlina"/></h6>
                        <vs-input class="w-100 "  v-model="Deb.debtorCredit.gospohlina" @change="changeDeb"></vs-input>
                        <h6 class="h6">Остаток долга:<VarToClipboard name="dc_ocs_sum"/></h6>
                        <vs-input type="number" readonly class="w-100 "  v-model="Deb.debtorCredit.ocs_sum" ></vs-input>


                    </div>
                </div>




            </div>

            <div class="vx-col sm:w-1/2 w-full mb-2" style="border: 1px;">

                <fieldset class="f" style="min-height: 500px;">
                    <legend class="l">Варианты:</legend>
                    <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

                        <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                            <VarToClipboard name="dc_dub_sud"/>
                            <vs-checkbox  v-model="Deb.debtorCredit.dub_sud" @input="changeDeb"> Заявление о выдаче судебного приказа</vs-checkbox>


                        </div>


                        <div class="vx-col w-2/4  mb-2" >
                            <vs-checkbox v-model="Deb.debtorCredit.dub_isk" @input="changeDeb">
                                <VarToClipboard name="dc_dub_isk"/>
                                Исковое заявление
                            </vs-checkbox>
                        </div>



                    </div>

                    <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

                        <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                            <VarToClipboard name="dc_dub_bank"/>
                            <vs-checkbox  v-model="Deb.debtorCredit.dub_bank" @input="changeDeb" style="min-width: 20px;">Заявление в банк о предъявлении исполнительного документа</vs-checkbox>

                        </div>
                        <div class="vx-col w-2/4  mb-2" >
                            <VarToClipboard name="dc_dub_pfr"/>
                            <vs-checkbox v-model="Deb.debtorCredit.dub_pfr" @input="changeDeb">Заявление в ПФ РФ о предъявлении исполнительного документа</vs-checkbox>
                        </div>



                    </div>


                    <div class="vx-row" style="padding-top: 20px; padding-left: 20px;border-color: #62626262;">

                        <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                            <VarToClipboard name="dc_dub_fssp"/>
                            <vs-checkbox  v-model="Deb.debtorCredit.dub_fssp" @input="changeDeb"> Заявление в ФССП о предъявлении исполнительного документа</vs-checkbox>

                        </div>


                    </div>

                    <div class="vx-row" style="padding-top: 20px;    padding-right: 20px; padding-left: 20px;border-color: #62626262;">



                            <h6 class="h6">Дополнительный текст:</h6>
                            <VarToClipboard name="dc_dub_text"/>
                            <vs-textarea class="w-100 vs-textarea-scrolled"  style=" min-height: 200px;" v-model="Deb.debtorCredit.dub_text" @change="changeDeb"> </vs-textarea>

                    </div>






                </fieldset>
                <div class="vx-row" style="margin-top: 25px">
                    <vs-button color="success" class="pull-right" type="filled" style="margin-left: 10px" @click="dublicat">Дубликат</vs-button>
                    <vs-input id="fileUpload1" type="file" class="w-full mb-base" label-placeholder="file"
                              v-on:change="saveDocument($event)" style="display: none"/>
                    <vs-button color="success" class="pull-right" type="filled" style="margin-left: 10px" @click="dublicatFile">Загрузить документ</vs-button>
                </div>

            </div>

        </div>







    </vx-card>
</template>

<script>
    import Vue from 'vue'
    import AsyncComputed from 'vue-async-computed'
    import JsonViewer from 'vue-json-viewer'
    import VueDadata from 'vue-dadata'
    import { mapActions,mapGetters } from 'vuex'
    import VueSuggestions from 'vue-suggestions';
    import vSelect from 'vue-select'
    import Status from '../../../components/Status.vue'
    import r from '../../../route';
    import axios from '../../../axios'
    import VarToClipboard from './../../VarToClipboard.vue'
    Vue.use(AsyncComputed)
    export default {
        components: { VueSuggestions,Status,  'v-select': vSelect,JsonViewer,VarToClipboard
        },
        data () {
            return {
                showInfoFssp:false,
                years:['2021','2020','2019','2018']
            }
        },
        mounted(){
            this.getBanksNameAndId();
        },
        asyncComputed: {

        },
        computed: {

            ...mapGetters([
                'StatussDebtorArr','Deb','BanksArr','User'

            ]),


        },
        methods: {

            saveDocument(evt){
                this.saveDebtorCreditDocument({
                    file: evt.target.files[0],
                    name: evt.target.files[0].name,
                    id: this.Deb.debtorCredit.id,
                    type:34,
                }).then((response) => {
                    if (response.result) {
                        this.$refs.status.setStatus(13);
                        this.$vs.notify({
                            title: 'Успешно',
                            text: 'Сохранено!!!',
                            color: 'success',
                            position: 'top-center'
                        })
                    } else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: response.message,
                            color: 'danger',
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
            dublicatFile(){
                document.getElementById("fileUpload1").click()
            },
            dublicat(){
                this.changeDeb()
                this.$vs.loading({ color: '#ff8000' })
                axios.get(r("document.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getDublicat',
                        param:this.Deb.debtorCredit.id,




                    }
                }).then((response) => {
                    this.$vs.loading.close()
                          this.$refs.status.setStatus(54);
                    //console.log(response.data);
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                    //  console.log(url);
                    const link = document.createElement('a');
                    link.href = url;

                    link.setAttribute('download', 'Дубликат__'+this.Deb.debtor.name_family+'_'+this.Deb.debtor.name+'_'+this.Deb.debtor.name_patronymic+'.pdf');


                    document.body.appendChild(link);
                    link.click();


                }).catch(error => {
                    this.$vs.loading.close()
                    //   this.popupActive3=false;

                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка!!!',
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },

            close(){

                this.$router.back()
            },
            ...mapActions([
                'saveDebtor','getDataStatuss','getDataDebtorsById','getBanksNameAndId','changeDeb','saveDebtorCreditDocument'
            ]),


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
    .checkbox_x.vs-checkbox{
        min-width: 20px;
    }

</style>
