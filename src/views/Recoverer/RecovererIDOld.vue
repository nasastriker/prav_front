<template>
    <vx-card no-shadow>
        <div class="mt-5" v-if="showLoad">
            <vs-tabs>
                <vs-tab label="Основные">
                    <label style="margin-bottom: 10px; padding-bottom: 20px">{{label}} </label>
                    <template v-if="data.cession">
                        <h6 class="h6Blue" style="margin-top: 15px">Номер договор:<VarToClipboard name="cess_number"/></h6>
                        <vs-input class="w-100" v-model="data.number" @change="change"></vs-input>
                        <h6 class="h6Blue" style="margin-top: 15px">Дата договора:<VarToClipboard name="cess_date"/></h6>
                        <vs-input type="date" class="w-100"  v-model="data.date" @change="change"></vs-input>
                        <h6 class="h6Blue" style="margin-top: 15px">Цедент:<VarToClipboard name="cess_name"/></h6>
                    </template>
                    <template v-else>
                        <h6 class="h6Blue" style="margin-top: 15px">Название:<VarToClipboard name="r_name"/></h6>
                    </template>

                    <vs-input class="w-full" style="max-width: 350px"  v-model="data.name" @change="change"></vs-input>
                    <template v-if="data.cession">
                    <h6 class="h6Blue">Адрес:<VarToClipboard name="cess_address"/></h6>
                    </template>
                    <template v-else>
                        <h6 class="h6Blue">Адрес:<VarToClipboard name="r_address"/></h6>
                    </template>
                    <VueSuggestions
                            style="margin-bottom: 20px;
                            max-width: 350px;
                             "
                            @changeme="change"
                            :model.sync="data.address"
                            :fias.sync="data_reg"
                            :options="SuggestionOptionsAddress">

                    </VueSuggestions>

                    <vs-checkbox style="margin-bottom: 15px" v-model="data.add_office" @input="change">Добавить офис на гос. услугах</vs-checkbox>

                    <template v-if="data.cession">
                        <h6 class="h6Blue">ОГРН:<VarToClipboard name="cess_ogrn"/></h6>
                    </template>
                    <template v-else>
                        <h6 class="h6Blue">ОГРН:<VarToClipboard name="r_ogrn"/></h6>
                    </template>

                    <vs-input class="w-100"   v-model="data.ogrn" @change="change"></vs-input>

                    <template v-if="data.cession">
                        <h6 class="h6Blue">ИНН:<VarToClipboard name="cess_inn"/></h6>
                    </template>
                    <template v-else>
                        <h6 class="h6Blue">ИНН:<VarToClipboard name="r_inn"/></h6>
                    </template>

                    <vs-input class="w-100" v-model="data.inn" @change="change"></vs-input>


                    <template v-if="data.cession">
                        <h6 class="h6Blue">Телефон:<VarToClipboard name="cess_phone"/></h6>
                    </template>
                    <template v-else>
                        <h6 class="h6Blue">Телефон:<VarToClipboard name="r_phone"/></h6>
                    </template>

                    <vs-input class="w-100"  v-model="data.phone" @change="change"></vs-input>




                    <template v-if="data.cession">
                        <h6 class="h6Blue">Сайт:<VarToClipboard name="cess_site"/></h6>
                    </template>
                    <template v-else>
                        <h6 class="h6Blue">Сайт:<VarToClipboard name="r_site"/></h6>
                    </template>

                    <vs-input class="w-100" v-model="data.site" @change="change"></vs-input>


                    <template v-if="data.cession">
                        <h6 class="h6Blue">Электронная почта:<VarToClipboard name="cess_email"/></h6>
                    </template>
                    <template v-else>
                        <h6 class="h6Blue">Электронная почта:<VarToClipboard name="r_email"/></h6>
                    </template>

                    <vs-input class="w-100"  v-model="data.email" @change="change"></vs-input>

                    <template v-if="data.cession">
                        <h6 class="h6Blue" style="margin-top: 15px">Примечание:<VarToClipboard name="cess_prim"/></h6>
                    </template>
                    <template v-else>
                        <h6 class="h6Blue" style="margin-top: 15px">Примечание:<VarToClipboard name="r_prim"/></h6>
                    </template>

                    <vs-textarea v-model="data.prim" @change="change" />

                </vs-tab>
                <vs-tab label="Банковские реквизиты">
                    <div class="vx-row" style="padding-top: 20px">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <template v-if="data.cession">
                                <h6 class="h6Blue">Бик Банка:<VarToClipboard name="cess_bic"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">Бик Банка:<VarToClipboard name="r_bic"/></h6>
                            </template>

                            <vs-input class="w-100" v-model="data.bic" @change="change"></vs-input>


                            <template v-if="data.cession">
                                <h6 class="h6Blue">Банк:<VarToClipboard name="cess_bank"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">Банк:<VarToClipboard name="r_bank"/></h6>
                            </template>



                            <vs-input class="w-full " style="max-width: 450px" v-model="data.bank" @change="change"></vs-input>



                            <template v-if="data.cession">
                                <h6 class="h6Blue">Р/с:<VarToClipboard name="cess_account"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">Р/с:<VarToClipboard name="r_account"/></h6>
                            </template>

                            <vs-input class="w-100 "  v-model="data.account" @change="change"></vs-input>


                            <template v-if="data.cession">
                                <h6 class="h6Blue">К/с:<VarToClipboard name="cess_ks"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">К/с:<VarToClipboard name="r_ks"/></h6>
                            </template>


                            <vs-input class="w-100 "  v-model="data.ks" @change="change"></vs-input>

                            <template v-if="data.cession">
                                <h6 class="h6Blue">ИНН получателя платежа:<VarToClipboard name="cess_inn_payee"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">ИНН получателя платежа:<VarToClipboard name="r_inn_payee"/></h6>
                            </template>

                            <vs-input class="w-100 "  v-model="data.inn_payee" @change="change"> </vs-input>


                            <template v-if="data.cession">
                                <h6 class="h6Blue">КПП получателя платежа:<VarToClipboard name="cess_kpp"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">КПП получателя платежа:<VarToClipboard name="r_kpp"/></h6>
                            </template>


                            <vs-input class="w-100" v-model="data.kpp" @change="change"></vs-input>


                            <template v-if="data.cession">
                                <h6 class="h6Blue">Получатель платежа:<VarToClipboard name="cess_payee"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">Получатель платежа:<VarToClipboard name="r_payee"/></h6>
                            </template>

                            <vs-input class="w-full " style="max-width: 450px" v-model="data.payee" @change="change"></vs-input>

                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">

                            <template v-if="data.cession">
                                <h3 style="margin-top: 15px">QR-code:<VarToClipboard name="cess_document_qr"/></h3>
                            </template>
                            <template v-else>
                                <h3 style="margin-top: 15px">QR-code:<VarToClipboard name="r_document_qr"/></h3>
                            </template>

                            <p class="text-sm mt-2">Если код не загружен то будет динамический код</p>

                            <div class="flex flex-wrap items-center mb-base">
                                <div >
                                    <template v-if="data.document_qr">
                                        <vs-avatar :src="/document_recover/+data.document_qr" size="70px" class="mr-4 mb-4" />
                                    </template>



                                </div>


                                <div>
                                    <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFiles2()">Загрузить qr-code</vs-button>
                                    <vs-input id="fileUpload2" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,'qr')" style="display: none"/>


                                    <p class="text-sm mt-2">Документ должен быть jpg</p>
                                </div>
                            </div>

                        </div>
                    </div>




                </vs-tab>
                <vs-tab label="Документы">
                    <div class="vx-row" style="padding-top: 20px">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <h3 style="margin-top: 15px">Договор займа:</h3>
                            <div class="flex flex-wrap items-center mb-base">
                                <div @click="downloadDocument(data.id,'dogovor')">
                                    <template v-if="documentUrl!='/document_recover/null'">
                                        <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />
                                    </template>



                                </div>


                                <div>

                                    <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFiles()">Загрузить документ</vs-button>
                                    <vs-input id="fileUpload" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,'dogovor')" style="display: none"/>
                                    <p class="text-sm mt-2">Документ должен быть doc,docx <a style="cursor: pointer" @click="testDogovor">Тест</a></p>
                                </div>
                            </div>
                            <h3 style="margin-top: 15px">Заявление в суд:</h3>
                            <div class="flex flex-wrap items-center mb-base">
                                <div @click="downloadDocument(data.id,'sud')">
                                    <template v-if="documentUrlSud!='/document_recover/null'">
                                        <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />
                                    </template>



                                </div>


                                <div>

                                    <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFilesSud()">Загрузить документ</vs-button>
                                    <vs-input id="fileUploadSud" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,'sud')" style="display: none"/>
                                    <p class="text-sm mt-2">Документ должен быть doc,docx <a style="cursor: pointer" @click="testSud">Тест</a>
                                        <template v-if="User.email=='amitx@list.ru'">
                                            <a style="cursor: pointer" @click="genSud">Сформировать суд</a>
                                            <a style="cursor: pointer" @click="genSudAll">Сформировать суд по всем</a>
                                        </template>

                                    </p>
                                    <vs-checkbox style="margin-bottom: 15px" v-model="data.add_file_dog" @input="change">Добавить договор из файла</vs-checkbox>


                                </div>
                            </div>

                            <h3 style="margin-top: 15px">Заявление в суд Иск:</h3>
                            <div class="flex flex-wrap items-center mb-base">
                                <div @click="downloadDocument(data.id,'isk')">
                                    <template v-if="documentUrlIsk!='/document_recover/null'">
                                        <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />
                                    </template>



                                </div>


                                <div>

                                    <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFilesIsk()">Загрузить документ</vs-button>
                                    <vs-input id="fileUploadIsk" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,'isk')" style="display: none"/>
                                    <p class="text-sm mt-2">Документ должен быть doc,docx <a style="cursor: pointer" @click="testIsk">Тест</a>
                                        <template v-if="User.email=='amitx@list.ru'">
                                            <a style="cursor: pointer" @click="genIsk">Сформировать суд</a>


                                        </template>

                                    </p>


                                </div>
                            </div>
                            <h3 style="margin-top: 15px">Заявление Суд расход:</h3>
                            <div class="flex flex-wrap items-center mb-base">
                                <div @click="downloadDocument(data.id,'sudRash')">
                                    <template v-if="documentUrlSudRash!='/document_recover/null'">
                                        <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />
                                    </template>



                                </div>


                                <div>

                                    <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFilesSudRash()">Загрузить документ</vs-button>
                                    <vs-input id="fileUploadSudRash" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,'sudRash')" style="display: none"/>
                                    <p class="text-sm mt-2">Документ должен быть doc,docx <a style="cursor: pointer" @click="testSudRash">Тест</a>
                                        <template v-if="User.email=='amitx@list.ru'">
                                            <a style="cursor: pointer" @click="genSudRash">Сформировать суд</a>


                                        </template>

                                    </p>


                                </div>
                            </div>

                            <div class="mt-2">

                                <vs-radio v-model="data.pay_sys"   vs-value="0" vs-name="pay_sys"  @change="change" class="mr-4">Оплата с ООО</vs-radio>
                                <vs-radio v-model="data.pay_sys" vs-value="1" vs-name="pay_sys" @change="change" class="mr-4">Оплата с ИП</vs-radio>
                            </div>
                            <template v-if="data.cession==0">
                                <h3 style="margin-top: 15px">Доверенность:</h3>
                                <div class="flex flex-wrap items-center mb-base">
                                    <div @click="downloadDocument(data.id,'dover')">
                                        <template v-if="documentUrlDov!='/document_recover/null'">
                                            <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />
                                        </template>



                                    </div>


                                    <div>
                                        <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseDover()">Загрузить документ</vs-button>
                                        <vs-input id="fileUploadDover" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,'dover')" style="display: none"/>


                                        <p class="text-sm mt-2">Документ должен быть jpeg</p>
                                    </div>
                                </div>
                            </template>


                            <template v-if="data.cession==0">
                                <h3 style="margin-top: 15px">Уведомление о переуступке:</h3>
                                <div class="flex flex-wrap items-center mb-base">
                                    <div @click="downloadDocument(data.id,'ust')">
                                        <template v-if="documentUrlUst!='/document_recover/null'">
                                            <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />
                                        </template>
                                    </div>
                                    <div>
                                        <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFiles1()">Загрузить документ</vs-button>
                                        <vs-input id="fileUpload1" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,'ust')" style="display: none"/>


                                        <p class="text-sm mt-2">Документ должен быть doc,docx</p>
                                    </div>
                                </div>
                                <h3 style="margin-top: 15px">Соглашение о рассрочке:</h3>
                                <div class="flex flex-wrap items-center mb-base">
                                    <div @click="downloadDocument(data.id,'rasroch')">
                                        <template v-if="documentUrlRasroch!='/document_recover/null'">
                                            <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />
                                        </template>
                                    </div>
                                    <div>
                                        <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFiles3()">Загрузить документ</vs-button>
                                        <vs-input id="fileUpload3" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,'rasroch')" style="display: none"/>
                                        <p class="text-sm mt-2">Документ должен быть doc,docx</p>
                                    </div>
                                </div>
                            </template>

                        </div>
                        <template v-if="data.cession==1">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <h3 style="margin-top: 15px">Заявление банкротство:</h3>
                            <div class="flex flex-wrap items-center mb-base">
                                <div @click="downloadDocument(data.id,'bankrot')">
                                    <template v-if="documentUrlBankrot!='/document_recover/null'">
                                        <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />
                                    </template>
                                </div>
                                <div>
                                    <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFilesBankrot()">Загрузить документ</vs-button>
                                    <vs-input id="fileUploadBankrot" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,'bankrot')" style="display: none"/>
                                    <p class="text-sm mt-2">Документ должен быть doc,docx <a style="cursor: pointer" @click="testBankrot">Тест</a>
                                        <template v-if="User.email=='amitx@list.ru'">
                                            <a style="cursor: pointer" @click="genBankrot">Сформировать суд</a>
                                        </template>
                                    </p>
                                </div>
                            </div>
                        </div>
                        </template>
                        <template v-if="data.cession==0">
                        <div class="vx-col sm:w-1/2 w-full mb-2">



                            <h3 style="margin-top: 15px">Справка об исполнении:</h3>
                            <div class="flex flex-wrap items-center mb-base">
                                <div @click="downloadDocument(data.id,'spravka')">
                                    <template v-if="documentUrlSpravka!='/document_recover/null'">
                                        <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />
                                    </template>



                                </div>


                                <div>
                                    <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseSpravka()">Загрузить документ</vs-button>
                                    <vs-input id="fileUploadSpravka" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,'spravka')" style="display: none"/>


                                    <p class="text-sm mt-2">Документ должен быть doc,docx</p>
                                </div>
                            </div>


                        </div>
                        </template>

                    </div>




                </vs-tab>
                <vs-tab label="Новости">
                    <h6 class="h6Blue" style="margin-top: 15px">Новости:</h6>
                    <vs-textarea v-model="data.news" @change="change" />


                </vs-tab>
                <vs-tab label="История">

                    История
                    <json-viewer :value="LogsArr"></json-viewer>



                </vs-tab>
                <vs-tab label="Шаблоны">


                    <RecovererShab :id="data.id"></RecovererShab>


                </vs-tab>
                <vs-tab label="Документы Взыскателя">


                        <RecovererDocument :id="data.id"></RecovererDocument>


                </vs-tab>
                <vs-tab label="Задачи">


                    <RecovererTask ></RecovererTask>


                </vs-tab>
            </vs-tabs>
        </div>

        <template v-if="$route.params.id=='new'">
        <div style="margin-top: 10px">
            <vs-row>
                <vs-col vs-offset="8"  vs-type="flex" vs-justify="center" vs-align="center" >
                    <vs-button color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>

                        <vs-button style="margin-left: 15px; margin-right: 25px" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>


                </vs-col>
            </vs-row>
        </div>
        </template>
        <template v-else>
            <div style="margin-top: 10px">
                <vs-row>
                    <vs-col vs-offset="8"  vs-type="flex" vs-justify="center" vs-align="center" >
                        <vs-button color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>



                    </vs-col>
                </vs-row>
            </div>
        </template>








    </vx-card>
</template>

<script>
    import VueSuggestions from '../../components/vue-suggestions/vue-suggestionsChange.vue';
    import r from '../../route';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import axios from '../../axios'
    import RecovererDocument from './RecovererDocument.vue'
    import RecovererShab from './RecovererShab.vue'
    import RecovererTask from './RecovererTask.vue'
    import JsonViewer from 'vue-json-viewer'
    import vSelect from 'vue-select'
    import VarToClipboard from './../VarToClipboard.vue'
    export default {
        components: { VueSuggestions,
            'v-select': vSelect,
            RecovererDocument,
            RecovererTask,
            RecovererShab,
            JsonViewer,
            VarToClipboard,
        },
        data () {
            return {
                showLoad:false,
                documentUrlDov:'',
                documentUrlUst:'',
                documentUrlIsk:'',
                documentUrlSudRash:'',
                documentUrlBankrot:'',
                documentUrlSud:'',
                documentUrlRasroch:'',
                documentUrlSpravka:'',
                documentWord:'/word-logo.png',
                documentUrl:'',
                data_reg:{

                },
                label:'Редактирование адреса участка:',
                data:{

                },

            }
        },

        mounted(){
            this.setShowShabRecEdit(false)
            this.setEditShabRecEdit(0)
            this.getBanksNameAndId();
            ///   console.log(this.$route)
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                    this.label='Редактирование :'
                    this.getDataLogsRecover(this.$route.params.id);
                }
                else {
                    this.label='Новый '
                }


            }
            if(this.$route.name=='CessionID'){
                this.data.cession=1
            }
            else{
                this.data.cession=0
            }

            this.getTypesDcDocuments()

        },

        computed: {

            ...mapGetters([
               'BanksArr','LogsArr','User','SuggestionOptionsAddress'

            ]),


        },
        methods: {
            ...mapMutations([
                'setShowShabRecEdit','setEditShabRecEdit',
            ]),
            close(){
                this.$router.back()
            },
            ...mapActions([
                'getBanksNameAndId','getDataLogsRecover','getTypesDcDocuments'
            ]),



            genBankrot(){
                axios.get(r("bankrot.index"), {
                    params: {
                        method: 'generateBankrot',
                        param: this.$route.params.id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: response.data.mess , color: 'success', position: 'top-center' })

                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })

                    }



                }).catch(error => {

                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            genSudAll(){
                axios.get(r("archSud.index"), {
                    params: {
                        method: 'runJobForAllRec',
                        param: ''

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: response.data.mess , color: 'success', position: 'top-center' })

                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })

                    }



                }).catch(error => {

                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            genSud(){
                axios.get(r("archSud.index"), {
                    params: {
                        method: 'generateArchSudRecover',
                        param: this.$route.params.id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: response.data.mess , color: 'success', position: 'top-center' })

                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })

                    }



                }).catch(error => {

                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            genSudRash(){
                axios.get(r("archSud.index"), {
                    params: {
                        method: 'generateArchSudRashRecover',
                        param: this.$route.params.id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: response.data.mess , color: 'success', position: 'top-center' })

                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })

                    }



                }).catch(error => {

                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            genIsk(){
                axios.get(r("archSud.index"), {
                    params: {
                        method: 'generateArchIskRecover',
                        param: this.$route.params.id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: response.data.mess , color: 'success', position: 'top-center' })

                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: response.data.mess , color: 'danger', position: 'top-center' })

                    }



                }).catch(error => {

                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })
                })
            },
            downloadDocument(id,type){
                axios.get(r("document.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getDocument',
                        param:{
                            type:type,
                            id_recover:id,

                        },


                    }
                }).then((response) => {


                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));

                    const link = document.createElement('a');
                    link.href = url;

                    if(response.headers['content-type']=='image/jpeg'){
                        link.setAttribute('download', type+id+'.jpeg');
                    }
                    else{
                        link.setAttribute('download', type+id+'.doc');
                    }

                    document.body.appendChild(link);
                    link.click();


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
            chooseFilesSudRash:function() {
                document.getElementById("fileUploadSudRash").click()
            },
            chooseFilesBankrot:function() {
                document.getElementById("fileUploadBankrot").click()
            },
            chooseFilesIsk:function() {
                document.getElementById("fileUploadIsk").click()
            },
            chooseFilesSud:function() {
                document.getElementById("fileUploadSud").click()
            },
            chooseDover:function() {
                document.getElementById("fileUploadDover").click()
            },
            chooseSpravka:function() {
                document.getElementById("fileUploadSpravka").click()
            },
            chooseFiles: function() {
                document.getElementById("fileUpload").click()
            },
            chooseFiles2: function() {
                document.getElementById("fileUpload2").click()
            },
            chooseFiles3: function() {
                document.getElementById("fileUpload3").click()
            },
            chooseFiles1: function() {
                document.getElementById("fileUpload1").click()
            },
            saveDocument(evt,type){

                this.saveRecovererDocument({file:evt.target.files,id_recover:this.$route.params.id,type:type}).then((response) => {
                    this.getData(this.$route.params.id);
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                    }



                })
            },
            ...mapActions([
                'saveRecoverer','saveRecovererDocument',
            ]),
            testSudRash(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("recoverer.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getSudRashTest',
                        param:this.$route.params.id


                    }
                }).then((response) => {
                    this.$vs.loading.close()

                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                    //   console.log(response.headers);
                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    //  console.log(filename);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();


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
            testBankrot(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("recoverer.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getBankrotTest',
                        param:this.$route.params.id


                    }
                }).then((response) => {
                    this.$vs.loading.close()

                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                    //   console.log(response.headers);
                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    //  console.log(filename);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();


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
            testIsk(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("recoverer.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getIskTest',
                        param:this.$route.params.id


                    }
                }).then((response) => {
                    this.$vs.loading.close()

                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                    //   console.log(response.headers);
                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    //  console.log(filename);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();


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
            testSud(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("recoverer.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getSudTest',
                        param:this.$route.params.id


                    }
                }).then((response) => {
                    this.$vs.loading.close()

                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                    //   console.log(response.headers);
                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    //  console.log(filename);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();


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
            testDogovor(){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("recoverer.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getDogovorTest',
                        param:this.$route.params.id


                    }
                }).then((response) => {

                    this.$vs.loading.close()
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                    //   console.log(response.headers);
                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    //  console.log(filename);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();


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
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("recoverer.index"), {
                    params: {
                        method: 'getRecoverer',
                        param: id

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result){

                        this.data=response.data.data;
                        this.data_reg=response.data.data;
                        this.documentUrlDov='/document_recover/'+response.data.data.document_dover;
                        this.documentUrl='/document_recover/'+response.data.data.document_dogovor;
                        this.documentUrlSpravka='/document_recover/'+response.data.data.document_spravka;
                        this.documentUrlUst='/document_recover/'+response.data.data.document_ust;
                        this.documentUrlRasroch='/document_recover/'+response.data.data.document_rasroch;
                        this.documentUrlSud='/document_recover/'+response.data.data.document_sud;
                        this.documentUrlIsk='/document_recover/'+response.data.data.document_isk;
                        this.documentUrlBankrot='/document_recover/'+response.data.data.document_bankrot;
                        this.documentUrlSudRash='/document_recover/'+response.data.data.document_sud_rash;
                        this.showLoad=true
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
            change(){

              if(this.$route.params.id!='new'){
                  this.data.id=this.$route.params.id;
                  if(this.$route.name=='CessionID'){
                      this.data.cession=1
                  }
                  else{
                      this.data.cession=0
                  }

                  this.saveRecoverer(this.data).then((response) => {
                        this.getData(this.data.id)
                      this.getDataLogsRecover(this.data.id);
                  })

              }
            },
            save(){
                this.data.id=this.$route.params.id;
                if(this.$route.name=='CessionID'){
                    this.data.cession=1
                }
                else{
                    this.data.cession=0
                }
                this.saveRecoverer(this.data).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.close()
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }


                })



            },


        },
    }
</script>
<style>
    .h6Blue{
        font-size: 12px;
        color: #7367F0;
    }
</style>
