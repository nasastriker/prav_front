<template>
    <vx-card no-shadow style="min-height: 95vh;">
        <div class="mt-5" v-if="showLoad">
            <vs-tabs  v-model="$store.state.recoverer.activeTabRecoverer">
                <vs-tab label="Основные">
                    <label style="margin-bottom: 10px; padding-bottom: 20px">{{label}} </label>
                    <div class="vx-row" style="padding-top: 2px;padding-bottom: 60px">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <template v-if="data.cession!==0">
                                <h6 class="h6Blue" style="margin-top: 15px">Организация цессии:<VarToClipboard name="cession"/></h6>
                                <v-select class="w-50" style="min-width: 200px;max-width:400px" :reduce="label => label.id" label="name" :options="OrganizationListFilterArr" v-model="data.cession" @input="change"></v-select>
                                <h6 class="h6Blue" style="margin-top: 15px">Номер договор:<VarToClipboard name="cess_number"/></h6>
                                <vs-input class="w-100" v-model="data.number" @change="change"></vs-input>
                                <h6 class="h6Blue" style="margin-top: 15px">Дата договора:<VarToClipboard name="cess_date"/></h6>
                                <vs-input type="date" class="w-100"  v-model="data.date" @blur="change"></vs-input>
                                <h6 class="h6Blue" style="margin-top: 15px">Процент сделки,%:<VarToClipboard name="r_transaction_percentage"/></h6>
                                <vs-input class="w-100" style="margin-top:5px;margin-bottom: 5px" type="number" v-model="data.transaction_percentage" @keypress="validateNumberDecimal" @change="change"></vs-input>
                                <h6 class="h6Blue" style="margin-top: 15px">Цедент:<VarToClipboard name="cess_name"/></h6>

                            </template>
                            <template v-else>
                                <h6 class="h6Blue" style="margin-top: 15px">Название:<VarToClipboard name="r_name"/></h6>
                            </template>


                            <vs-input class="w-full" style="max-width: 350px"  v-model="data.name" @change="change"></vs-input>

                            <template v-if="data.cession!==0">
                                <h6 class="h6Blue">Почтовый индекс:<VarToClipboard name="cess_index_pochta"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">Почтовый индекс:<VarToClipboard name="r_index_pochta"/></h6>
                            </template>
                            <vs-input class="w-100"   v-model="data.index_pochta" @change="change"></vs-input>

                            <template v-if="data.cession!==0">
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
                            <template v-if="data.cession==0">
                            <h6 class="h6Blue">Должность представителя организации: <VarToClipboard name="r_delegate_director"/></h6>
                            <vs-input class="w-full"  v-model="data.delegate_director" @change="change"></vs-input>
                            <h6 class="h6Blue">ФИО представителя организации: <VarToClipboard name="r_delegate_fio"/></h6>
                            <vs-input class="w-full"  v-model="data.delegate_fio" @change="change"></vs-input>
                            <h6 class="h6Blue">ИНН представителя организации: <VarToClipboard name="r_delegate_inn"/></h6>
                            <vs-input class="w-full"  v-model="data.delegate_inn" @change="change"></vs-input>
                            <h6 class="h6Blue">ОГРН представителя организации: <VarToClipboard name="r_delegate_ogrn"/></h6>
                            <vs-input class="w-full"  v-model="data.delegate_ogrn" @change="change"></vs-input>
                            <h6 class="h6Blue">Юридический адрес представителя организации: <VarToClipboard name="r_delegate_address"/></h6>
                            <label style="margin-bottom: 5px">Адрес</label>
                            <VueSuggestions
                                    style="margin-bottom: 20px"
                                    placeholder="Адрес"
                                    :model.sync="data.delegate_address"
                                    :fias.sync="data.delegate_address_data"
                                    :options="SuggestionOptionsAddress"
                                    @changeme="change"
                            >

                            </VueSuggestions>
                                <h6 class="h6Blue">Сбер osb_list: <VarToClipboard name="r_osb_list"/></h6>
                                <vs-input class="w-full"  v-model="data.osb_list" @change="change"></vs-input>
                                <h6 class="h6Blue">Сбер file_code: <VarToClipboard name="r_file_code"/></h6>
                                <vs-input class="w-full"  v-model="data.file_code" @change="change"></vs-input>
                                <h6 class="h6Blue">bailiff: <VarToClipboard name="r_bailiff"/></h6>
                                <vs-input class="w-full"  v-model="data.bailiff" @change="change"></vs-input>
                            </template>



                            <vs-checkbox style="margin-bottom: 15px" v-model="data.add_office" @input="change">Добавить офис на гос. услугах</vs-checkbox>
                                <h6 class="h6Blue">Реквизиты для оплаты ГП:</h6>
                                <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="GospohlinaReqsArr"  v-model="data.pay_sys" @input="change" ></v-select>
                            <h6 class="h6Blue" style="margin-top: 5px">Настройки почты России:</h6>
                            <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="PochtaSettingsList"  v-model="data.id_pochta_settings" @input="change" ></v-select>

                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <template v-if="data.cession!==0">
                                <h6 class="h6Blue">ОГРН:<VarToClipboard name="cess_ogrn"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">ОГРН:<VarToClipboard name="r_ogrn"/></h6>
                            </template>

                            <vs-input class="w-100"   v-model="data.ogrn" @change="change"></vs-input>

                            <template v-if="data.cession!==0">
                                <h6 class="h6Blue">ИНН:<VarToClipboard name="cess_inn"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">ИНН:<VarToClipboard name="r_inn"/></h6>
                            </template>

                            <vs-input class="w-100" v-model="data.inn" @change="change"></vs-input>


                            <template v-if="data.cession!==0">
                                <h6 class="h6Blue">Телефон:<VarToClipboard name="cess_phone"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">Телефон:<VarToClipboard name="r_phone"/></h6>
                            </template>

                            <vs-input class="w-100"  v-model="data.phone" @change="change"></vs-input>




                            <template v-if="data.cession!==0">
                                <h6 class="h6Blue">Сайт:<VarToClipboard name="cess_site"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">Сайт:<VarToClipboard name="r_site"/></h6>
                            </template>

                            <vs-input class="w-100" v-model="data.site" @change="change"></vs-input>


                            <template v-if="data.cession!==0">
                                <h6 class="h6Blue">Электронная почта:<VarToClipboard name="cess_email"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">Электронная почта:<VarToClipboard name="r_email"/></h6>
                            </template>

                            <vs-input class="w-100"  v-model="data.email" @change="change"></vs-input>
                            <template v-if="data.cession!==0">
                                <h6 class="h6Blue" style="margin-top: 15px">Примечание:<VarToClipboard name="cess_prim"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue" style="margin-top: 15px">Примечание:<VarToClipboard name="r_prim"/></h6>
                            </template>
                            <vs-textarea height="200px" v-model="data.prim" @change="change" />
                        </div>
                    </div>




                </vs-tab>
                <vs-tab label="Банковские реквизиты" v-if="$route.params.id!='new'">
                    <div class="vx-row" style="padding-top: 20px">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <template v-if="data.cession!==0">
                                <h6 class="h6Blue">Бик Банка:<VarToClipboard name="cess_bic"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">Бик Банка:<VarToClipboard name="r_bic"/></h6>
                            </template>

                            <vs-input class="w-100" v-model="data.bic" @change="change"></vs-input>


                            <template v-if="data.cession!==0">
                                <h6 class="h6Blue">Банк:<VarToClipboard name="cess_bank"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">Банк:<VarToClipboard name="r_bank"/></h6>
                            </template>



                            <vs-input class="w-full " style="max-width: 450px" v-model="data.bank" @change="change"></vs-input>



                            <template v-if="data.cession!==0">
                                <h6 class="h6Blue">Р/с:<VarToClipboard name="cess_account"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">Р/с:<VarToClipboard name="r_account"/></h6>
                            </template>

                            <vs-input class="w-100 "  v-model="data.account" @change="change"></vs-input>


                            <template v-if="data.cession!==0">
                                <h6 class="h6Blue">К/с:<VarToClipboard name="cess_ks"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">К/с:<VarToClipboard name="r_ks"/></h6>
                            </template>


                            <vs-input class="w-100 "  v-model="data.ks" @change="change"></vs-input>

                            <template v-if="data.cession!==0">
                                <h6 class="h6Blue">ИНН получателя платежа:<VarToClipboard name="cess_inn_payee"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">ИНН получателя платежа:<VarToClipboard name="r_inn_payee"/></h6>
                            </template>

                            <vs-input class="w-100 "  v-model="data.inn_payee" @change="change"> </vs-input>


                            <template v-if="data.cession!==0">
                                <h6 class="h6Blue">КПП получателя платежа:<VarToClipboard name="cess_kpp"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">КПП получателя платежа:<VarToClipboard name="r_kpp"/></h6>
                            </template>


                            <vs-input class="w-100" v-model="data.kpp" @change="change"></vs-input>


                            <template v-if="data.cession!==0">
                                <h6 class="h6Blue">Получатель платежа:<VarToClipboard name="cess_payee"/></h6>
                            </template>
                            <template v-else>
                                <h6 class="h6Blue">Получатель платежа:<VarToClipboard name="r_payee"/></h6>
                            </template>

                            <vs-input class="w-full " style="max-width: 450px" v-model="data.payee" @change="change"></vs-input>

                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">

                            <template v-if="data.cession!==0">
                                <h3 style="margin-top: 15px">QR-code:<VarToClipboard name="cess_document_qr"/></h3>
                            </template>
                            <template v-else>
                                <h3 style="margin-top: 15px">QR-code:<VarToClipboard name="r_document_qr"/></h3>
                            </template>

                            <p class="text-sm mt-2">Если код не загружен то будет динамический код</p>

                            <div class="flex flex-wrap items-center mb-base">
                                <div style="    margin-bottom: 25px;">
                                    <template v-if="data.document_qr">
                                      <a v-auth-href :href="downloadGr()" >  <feather-icon icon="ArrowDownCircleIcon"  svgClasses="h-20 w-20 hover:text-danger cursor-pointer" /></a>

                                    </template>


                                </div>


                                <div>
                                    <vs-button  style="margin-left: 10px" class="mr-4 sm:mb-0 mb-2"  @click="chooseFiles2()">Загрузить qr-code</vs-button>
                                    <vs-input  id="fileUpload2" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,'qr')" style="display: none"/>


                                    <p class="text-sm mt-2">Документ должен быть jpg</p>
                                </div>
                            </div>

                        </div>
                    </div>




                </vs-tab>

                <vs-tab label="Новости" v-if="$route.params.id!='new'">
                    <h6 class="h6Blue" style="margin-top: 15px">Новости:</h6>
                    <vs-textarea height="400px" v-model="data.news" @change="change" />
                </vs-tab>
                <vs-tab label="История" v-if="$route.params.id!='new'">
                    История
                    <json-viewer :value="LogsArr"></json-viewer>
                </vs-tab>
                <vs-tab label="Шаблоны" v-if="$route.params.id!='new'">
                    <RecovererShab :id="data.id"></RecovererShab>
                </vs-tab>
                <vs-tab label="Документы Взыскателя" v-if="$route.params.id!='new'">
                    <RecovererDocument :id="data.id"></RecovererDocument>
                </vs-tab>
                <vs-tab label="Задачи" v-if="$route.params.id!='new'">
                    <RecovererTask ></RecovererTask>
                </vs-tab>
                <vs-tab label="Реестры" v-if="$route.params.id!='new'">
                    <RecovererReestr :id="data.id"></RecovererReestr>
                </vs-tab>
                <vs-tab label="Прочие цеденты" v-if="$route.params.id!='new'">
                    <RecoverOtherAssignor></RecoverOtherAssignor>
                </vs-tab>
              <vs-tab label="Госуслуги" v-if="$route.params.id!='new'">
                <span style="max-width: 10px;margin-top: 15px">
                  <div class="centerx" style="margin-bottom: 5px;">
                    <h6 class="h6 sv-flex-row mb-4">Логин и пароль ГосУслуги <GuestGu :login="data.gu_login"></GuestGu></h6>
                  </div>
                <div class="vx-row">
                  <div class="vx-col">
                <h6 class="h6">Логин:</h6> <!--<VarToClipboard name="r_gu_login"/></h6>-->
                <vs-input class="w-full" style="max-width: 350px" v-model="data.gu_login" @change="change"></vs-input>
                  </div>
                  <div class="vx-col">
                <h6 class="h6">Пароль:</h6> <!--<VarToClipboard name="r_gu_pswd"/></h6>-->
<!--                <vs-input class="w-full" style="max-width: 350px"  v-model="data.gu_pswd" @change="change"></vs-input>-->
                <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary ">
                  <div class="vs-con-input">
                  <input :type="type" v-model="data.gu_pswd" @change="change" class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);max-width: 350px">
                  <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeType">visibility</i>
                  </div><span></span></div>
                  </div>
                  <div class="vx-col">
                <h6 class="h6">Токен:</h6>
                <div class="vs-component vs-con-input-label vs-input w-full mb-base vs-input-primary">
                  <div class="vs-con-input">
                    <input :type="type_token" v-model="data.tokenGosUslugi" @change="change" class="vs-inputx vs-input--input normal hasValue hasIcon icon-after-input" style="border: 1px solid rgba(0, 0, 0, 0.2);max-width: 350px">
                    <i class="vs-icon notranslate icon-scale icon-inputx notranslate vs-input--icon material-icons null icon-after" @click="changeTypeToken">visibility</i>
                  </div>
                </div>
                  </div>
                <span style="color:red;margin-top: 20px;cursor: pointer" @click="getCode('tokenGosUslugi')">Получить код</span>
                </div>
                  </span>

                <h6 class="h6Blue" style="margin-top: 15px">Наименование в ГУ:<VarToClipboard name="r_gu_name"/></h6>
                <vs-input class="w-full" style="max-width: 350px"  v-model="data.gu_name" @change="change"></vs-input>
              </vs-tab>
                <vs-tab label="Дополнительные переменнные" v-if="$route.params.id!='new'">
                    <RecovererVars></RecovererVars>
                </vs-tab>

            </vs-tabs>
        </div>

        <template v-if="$route.params.id=='new'">
        <div style="margin-top: 50px">
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
    import RecovererReestr from './RecovererReestr.vue'
    import RecoverOtherAssignor from './RecoverOtherAssignor.vue'
    import VarToClipboard from './../VarToClipboard.vue'
    import RecovererVars from './RecovererVars.vue';
    import GuestGu from "../QuestGu/GuestGu.vue";
    import Vue from 'vue'
    import VueAuthHref from 'vue-auth-href'
    const options = {
      token: () => `${localStorage.getItem('accessToken')}`
    }

    Vue.use(VueAuthHref, options)
    export default {
        components: { VueSuggestions,
            RecovererDocument,
            RecovererTask,
            RecovererReestr,
            RecovererShab,
            RecoverOtherAssignor,
            VarToClipboard,
            RecovererVars,
            GuestGu

        },
        data () {
            return {
              type:'password',
              type_token:'password',
                arr:[
                    {id:0,name:'Нет'},
                    {id:1,name:'Да'},
                ],
                showLoad:false,
                documentWord:'/word-logo.png',
                data_reg:{

                },
                label:'Редактирование адреса участка:',
                data:{
                    cession:null,
                },

            }
        },

        mounted(){

            this.setShowShabRecEdit(false)
            this.setEditShabRecEdit(0)
            this.getBanksNameAndId();
            this.getDataPochtaSettingsList()
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                    this.label='Редактирование :'
                    this.getDataLogsRecover(this.$route.params.id);
                }
                else {
                    this.label='Новый ';
                    this.showLoad=true;
                    this.data.cession=''
                }


            }

            if(this.$route.name=='CessionID'){
               // this.data.cession='new'
            }
            else{
                this.data.cession=0
            }
            this.getTypesDcDocuments()

        },

        computed: {

            ...mapGetters([
               'BanksArr','LogsArr','User','GospohlinaReqsArr','OrganizationListFilterArr', 'SuggestionOptionsAddress','PochtaSettingsList'

            ]),


        },
        methods: {
          getCode(field) {
            if (this.$route.params.id != 'new') {
              this.getCodeForEnterGuRecoverer({
                id_rec: this.$route.params.id,
                field: field
              }).then((response) => {
                if (response.result) {
                  this.$copyText(response.code);
                  this.$vs.notify({
                    title: 'Сообщение',
                    text: 'Скопировано в буфер обмена: ' + response.code,
                    color: 'primary',
                    position: 'top-center'
                  })
                } else {
                  this.$vs.notify({
                    title: 'Ошибка',
                    text: response.error,
                    color: 'danger',
                    position: 'top-center'
                  })
                }
              });
            } else {
              this.$vs.notify({
                title: 'Ошибка',
                text: 'Сохраните запись',
                color: 'danger',
                position: 'top-center'
              })
            }
          },
          changeType(){
            if(this.type=='password'){
              this.type='text'
            }else{
              this.type='password'
            }
          },
          changeTypeToken(){
            if(this.type_token=='password'){
              this.type_token='text'
            }else{
              this.type_token='password'
            }
          },

            ...mapMutations([
                'setShowShabRecEdit','setEditShabRecEdit'
            ]),
            close(){
                this.$router.back()
            },
            ...mapActions([
                'getBanksNameAndId','getDataLogsRecover','getTypesDcDocuments','getDataGospohlinaReqs',
              'getDataPochtaSettingsList','getCodeForEnterGuRecoverer'
            ]),
            validateNumberDecimal: event => {
                const charCode = String.fromCharCode(event.keyCode);
                if (!/[0-9,.]/.test(charCode)) {
                    event.preventDefault();
                }
            },
            downloadGr(){
              let abc = "abcdefghijklmnopqrstuvwxyz";
              let rs = "";
              while (rs.length < 10) {
                rs += abc[Math.floor(Math.random() * abc.length)];
              }
              return '/document/recover/?filename='+this.data.document_qr+'&name='+rs+'&id_recover='+this.$route.params.id;
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


            chooseDover:function() {
                document.getElementById("fileUploadDover").click()
            },

            chooseFiles: function() {
                document.getElementById("fileUpload").click()
            },
            chooseFiles2: function() {
                document.getElementById("fileUpload2").click()
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
                        this.getDataGospohlinaReqs(this.data.cession)
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


                  this.saveRecoverer(this.data).then((response) => {

                        this.getData(this.data.id)
                      this.getDataLogsRecover(this.data.id);
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

              }
            },
            save(){
                this.data.id=this.$route.params.id;
                if(this.$route.name=='CessionID'){
                    //this.data.cession=1
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


        },
    }
</script>
<style>
    .h6Blue{
        font-size: 12px;
        color: #7367F0;
    }
</style>
