<template>
    <vx-card no-shadow>


            <div class="vx-row">
                <div class="vx-col sm:w-1/2 w-full " v-if="showDop">
                    <template v-if="typeof Deb.debtorCredit.id!='undefined'">
                        <Status :id_credit="Deb.debtorCredit.id"  ref="status"></Status>
                    </template>
                    <div class="vx-row" style="padding-top: 20px">
                        <div class="vx-col sm:w-1/2 ">
                            <h6 class="h6">Особые пометки:<VarToClipboard name="dc_comment"/></h6>
                            <vs-textarea class="w-100"  v-model="Deb.debtorCredit.comment" @change="changeDeb"> </vs-textarea>
                            <h6 class="h6">Взыскатель:<VarToClipboard name="r_name"/></h6>
                            <vs-input class="w-100" readonly v-model="Deb.recover.name"></vs-input>
                            <h6 class="h6">Цедент:<VarToClipboard name="r_namePerv"/></h6>
                            <vs-input class="w-100 "  readonly v-model="Deb.recover.namePerv"></vs-input>
                            <h6 class="h6" style="margin-top: 25px">Фамилия:<VarToClipboard name="d_name_family"/></h6>
                            <vs-input class="w-100 " readonly v-model="Deb.debtor.name_family"></vs-input>
                            <h6 class="h6">Предыдущая фамилия:<VarToClipboard name="d_name_family_last"/></h6>
                            <vs-input class="w-100 "  readonly v-model="Deb.debtor.name_family_last"></vs-input>
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

                          <div class="centerx">
                            <vs-tooltip text="Дата регистрации:" position="top" >
                              <h6 class="h6Blue mb-1">Дата регистрации:</h6>
                            </vs-tooltip>
                          </div>
                          <vs-input class="w-full"  style="margin-bottom: 10px" type="date" v-model="reg.reg_date"></vs-input>

                          <div class="centerx">
                            <vs-tooltip text="Регистрационный № если пусто то " position="top" >
                              <h6 class="h6Blue mb-1">Регистрационный №:</h6>
                            </vs-tooltip>
                          </div>
                          <vs-input class="w-full"   style="margin-bottom: 10px" v-model="reg.reg_number"></vs-input>

                          <div class="centerx">
                            <vs-tooltip text="Вид документа" position="top" >
                              <h6 class="h6Blue mb-1">Вид документа</h6>
                            </vs-tooltip>
                          </div>
                          <v-select  class="w-full " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="DocumentsTypeListDebtorConstruct"   v-model="reg.id_type"></v-select>

                          <div class="centerx">
                            <vs-tooltip text="Отправитель" position="top" >
                              <h6 class="h6Blue mb-1">Отправитель<span style="color: red;cursor: pointer"  @click="copySender"> Copy</span></h6>
                            </vs-tooltip>
                          </div>
                          <vs-input class="w-full"  style="margin-bottom: 10px"  v-model="reg.sender"></vs-input>
                          <div class="centerx">
                            <vs-tooltip text="Адрес отправителя" position="top" >
                              <h6 class="h6Blue mb-1">Адрес отправителя</h6>
                            </vs-tooltip>
                          </div>
                          <vs-input class="w-full"  style="margin-bottom: 10px"  v-model="reg.sender_address"></vs-input>

                          <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFiles1()">Загрузить документ и сохранить</vs-button>
                                 <vs-input id="fileUpload1" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,reg)" style="display: none"/>

                          <!--      <h6 class="h6" style="margin-top: 15px">№ СА:<VarToClipboard name="dc_number_sa"/></h6>
                                <vs-input class="w-100"  v-model="Deb.debtorCredit.number_sa"  @change="changeDeb"> </vs-input>
                                <h6 class="h6">Дата СА:<VarToClipboard name="dc_date_sa"/></h6>
                                <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_sa"  @blur="changeDeb"></vs-input>

                                <h6 class="h6">Сумма долга:<VarToClipboard name="dc_dolg_sum"/></h6>
                                <vs-input type="number" readonly class="w-100 "  v-model="Deb.debtorCredit.dolg_sum" @change="changeDeb"></vs-input>
                                <h6 class="h6" style="margin-top: 25px">Госпошлина:<VarToClipboard name="dc_gospohlina"/></h6>
                                <vs-input class="w-100 "  v-model="Deb.debtorCredit.gospohlina" @change="changeDeb"></vs-input>
                                <h6 class="h6">Остаток долга:<VarToClipboard name="dc_ocs_sum"/></h6>
                                <vs-input type="number" readonly class="w-100 "  v-model="Deb.debtorCredit.ocs_sum" ></vs-input>
                                <fieldset class="f" >
                                    <legend class="l">Отказ от взаимодействия:</legend>
                                    <div class="vx-row" style=" padding-left: 20px;border-color: #62626262;">
                                        <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                            <vs-checkbox  v-model="Deb.debtorCredit.otkaz" @input="changeDeb"> Отказ от взаимодействия</vs-checkbox>
                                            <h6 class="h6" style="margin-top: 10px">Дата поступления:<VarToClipboard name="dc_date_otkaz"/></h6>
                                            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_otkaz"  @blur="changeDeb"></vs-input>
                                            <h6 class="h6" style="margin-top: 15px">№ ШПИ:<VarToClipboard name="dc_otkaz_shpi"/></h6>
                                            <vs-input class="w-100"  v-model="Deb.debtorCredit.otkaz_shpi"  @change="changeDeb"> </vs-input>
                                        </div>

                                    </div>
                                </fieldset>
                                <fieldset class="f" >
                                    <legend class="l">Отзыв персональных данных:</legend>
                                    <div class="vx-row" style="padding-left: 20px;border-color: #62626262;">
                                        <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                            <vs-checkbox  v-model="Deb.debtorCredit.otzyv_per" @input="changeDeb"> Отзыв персональных данных</vs-checkbox>
                                            <h6 class="h6" style="margin-top: 10px">Дата поступления:<VarToClipboard name="dc_date_otzyv_per"/></h6>
                                            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_otzyv_per"  @blur="changeDeb"></vs-input>
                                            <h6 class="h6" style="margin-top: 15px">№ ШПИ:<VarToClipboard name="dc_otzyv_per_shpi"/></h6>
                                            <vs-input class="w-100"  v-model="Deb.debtorCredit.otzyv_per_shpi"  @change="changeDeb"> </vs-input>
                                        </div>

                                    </div>
                                </fieldset>
                                <fieldset class="f" >
                                    <legend class="l">Запрос полиция:</legend>
                                    <div class="vx-row" style=" padding-left: 20px;border-color: #62626262;">
                                        <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                            <vs-checkbox  v-model="Deb.debtorCredit.zapros_pol" @input="changeDeb"> Запрос полиция</vs-checkbox>
                                            <h6 class="h6" style="margin-top: 10px">Дата поступления:<VarToClipboard name="dc_date_zapros_pol"/></h6>
                                            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_zapros_pol"  @blur="changeDeb"></vs-input>
                                            <h6 class="h6" style="margin-top: 15px">№ ШПИ:<VarToClipboard name="dc_zapros_pol_shpi"/></h6>
                                            <vs-input class="w-100"  v-model="Deb.debtorCredit.zapros_pol_shpi"  @change="changeDeb"> </vs-input>
                                        </div>

                                    </div>
                                </fieldset>
                                <fieldset class="f" >
                                    <legend class="l">Запрос УФССП:</legend>
                                    <div class="vx-row" style=" padding-left: 20px;border-color: #62626262;">
                                        <div class="vx-col w-2/4  mb-2" style="border: 1px;">
                                            <vs-checkbox  v-model="Deb.debtorCredit.zapros_ufssp" @input="changeDeb">Запрос УФССП</vs-checkbox>
                                            <h6 class="h6" style="margin-top: 10px">Дата поступления:<VarToClipboard name="dc_date_zapros_ufssp"/></h6>
                                            <vs-input type="date" class="w-100"  v-model="Deb.debtorCredit.date_zapros_ufssp"  @blur="changeDeb"></vs-input>
                                            <h6 class="h6" style="margin-top: 15px">№ ШПИ:<VarToClipboard name="dc_zapros_ufssp_shpi"/></h6>
                                            <vs-input class="w-100"  v-model="Deb.debtorCredit.zapros_ufssp_shpi"  @change="changeDeb"> </vs-input>
                                        </div>

                                    </div>
                                </fieldset>
                              -->
                        </div>
                    </div>
                </div>
                <div class="vx-col  w-full " :class = "{ 'sm:w-1/2' : showDop === true}" style="border: 1px;">
                    <feather-icon  v-if="showDop" icon="ArrowLeftCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="showDop=!showDop" />
                    <feather-icon  v-else icon="ArrowRightCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="showDop=!showDop" />
                    <DebtorDocumentNew :ref="'DebtorDocumentNew'"></DebtorDocumentNew>
                </div>
            </div>



    </vx-card>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import Status from '../../../components/Status.vue'
    import DebtorDocumentNew from './DebtorDocumentNew.vue'
    import r from '@/route';
    import axios from '@/axios'
    import moment from 'moment';
    export default {
        components: {
          Status,
          DebtorDocumentNew
        },
        data () {

            return {
                reg:{
                  reg_date:moment(new Date().toString()).format("YYYY-MM-DD"),
                  sender:'',
                  sender_address:'',
                },
                showDop:true,
                showInfoFssp:false,
            }
        },
        mounted(){
            this.getBanksNameAndId();
            this.getDocumentsTypeList();
            this.getDocumentsVidList();
        },

        computed: {

            ...mapGetters([
                'StatussDebtorArr','Deb','BanksArr','User','DocumentsVidList','DocumentsTypeListDebtorConstruct'

            ]),


        },
        methods: {
          copySender(){
            this.$refs.DebtorDocumentNew.sender=this.reg.sender
            this.$refs.DebtorDocumentNew.sender_address=this.reg.sender_address
          },
          chooseFiles1: function() {
            document.getElementById("fileUpload1").click()
          },
          saveDocument(evt){
            const formData = new FormData()
            formData.append('document', evt.target.files[0])
            formData.append('filename',evt.target.files[0].name)
            formData.append('id', this.$route.params.id)
            formData.append('correspondence',JSON.stringify(this.reg))
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
            axios.post('/correspondence/post-zapros',
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }
            ).then((response) => {
              if (response.data.result) {
                this.reg= {
                  reg_date:moment(new Date().toString()).format("YYYY-MM-DD"),
                  sender:'',
                  sender_address:'',
                }
                this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                this.$refs.DebtorDocumentNew.$refs.comp_date_controls.refreshDateControls();
              }
              else{
                this.$vs.notify({
                  title: 'Ошибка',
                  text: response.data.error,
                  color: 'danger',
                  position: 'top-center'
                })
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
            zapros_ufssp(){
                this.$vs.loading({ color: '#ff8000' })
                axios.get(r("shablonDocument.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getDoc',
                        param:{
                            id_shab:28,
                            id_credit:this.Deb.debtorCredit.id
                        }


                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    //console.log(response.data);
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                    //  console.log(url);
                    const link = document.createElement('a');
                    link.href = url;

                    link.setAttribute('download', 'ЗапросУфссп__'+this.Deb.debtor.name_family+'_'+this.Deb.debtor.name+'_'+this.Deb.debtor.name_patronymic+'.pdf');


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
            zapros_pol(){
                this.$vs.loading({ color: '#ff8000' })
                axios.get(r("shablonDocument.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getDoc',
                        param:{
                            id_shab:29,
                            id_credit:this.Deb.debtorCredit.id
                        }


                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    //console.log(response.data);
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                    //  console.log(url);
                    const link = document.createElement('a');
                    link.href = url;

                    link.setAttribute('download', 'ЗапросПол__'+this.Deb.debtor.name_family+'_'+this.Deb.debtor.name+'_'+this.Deb.debtor.name_patronymic+'.pdf');


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
            otzyv_per(){
                this.$vs.loading({ color: '#ff8000' })
                axios.get(r("shablonDocument.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getDoc',
                        param:{
                            id_shab:27,
                            id_credit:this.Deb.debtorCredit.id
                        }


                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    //console.log(response.data);
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                    //  console.log(url);
                    const link = document.createElement('a');
                    link.href = url;

                    link.setAttribute('download', 'ОтзывПер__'+this.Deb.debtor.name_family+'_'+this.Deb.debtor.name+'_'+this.Deb.debtor.name_patronymic+'.pdf');


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
            otkaz(){
                this.$vs.loading({ color: '#ff8000' })
                axios.get(r("shablonDocument.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getDoc',
                        param:{
                            id_shab:26,
                            id_credit:this.Deb.debtorCredit.id
                        }


                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    //console.log(response.data);
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                    //  console.log(url);
                    const link = document.createElement('a');
                    link.href = url;

                    link.setAttribute('download', 'ОтказВзаим__'+this.Deb.debtor.name_family+'_'+this.Deb.debtor.name+'_'+this.Deb.debtor.name_patronymic+'.pdf');


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
                'saveDebtor','getDataStatuss','getDataDebtorsById','getBanksNameAndId','changeDeb','getDocumentsVidList','getDocumentsTypeList'
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
