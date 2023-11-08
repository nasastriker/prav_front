<template>
    <div class="vx-card p-6">
        <h6 class="h6">{{label}}</h6>
        <h6 class="h6">Название:</h6>
        <vs-input class="w-full"  v-model="pochta.name"></vs-input>
      <h6 class="h6">TOKEN_POCHTA:<a href="https://otpravka.pochta.ru/specification#/authorization-token"  target="_blank" style="color: red">https://otpravka.pochta.ru/specification#/authorization-token</a></h6>
        <vs-input class="w-full"  v-model="pochta.token_pochta"></vs-input>
        <h6 class="h6">KEY_POCHTA:<a href="https://otpravka.pochta.ru/specification#/authorization-key"  target="_blank" style="color: red">https://otpravka.pochta.ru/specification#/authorization-key</a></h6>
        <vs-input class="w-full"  v-model="pochta.key_pochta"></vs-input>
        <h6 class="h6">AUTH_POCHTA:(используется для онлайн отправки )<a href="https://www.pochta.ru/assets/EPS_API_connecting_client_2_3_1ab461c25e.pdf?updated_at=2022-07-19T10:35:12.166Z#page=20&zoom=100,0,137"  target="_blank" style="color: red">Как получить ?</a></h6>
        <vs-input class="w-full"  v-model="pochta.auth_pochta"></vs-input>
        <h6 class="h6">КриптоПРО Имя ключа:<span style="cursor: pointer;color: red" @click="startShow">Инфо</span><span style="cursor: pointer;color: red" @click="showSendTest=!showSendTest"> Отправка Тестовых сообщений</span></h6>
        <vs-input class="w-full"  v-model="pochta.crypto_key"></vs-input>
        <h6 class="h6">КриптоПРО Пароль ключа:</h6>
        <vs-input class="w-full"  v-model="pochta.crypto_pass"></vs-input>
        <h6 class="h6">PORT:</h6>
        <vs-input class="w-full"  v-model="pochta.port"></vs-input>

        <h6 class="h6">OTDEL_POCHTA:</h6>
        <vs-input class="w-full"  v-model="pochta.otdel_pochta"></vs-input>
        <h6 class="h6">Онлайн баланс:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arr"  v-model="pochta.online"></v-select>


        <h6 class="h6">Исковое заявление:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arrPis"  v-model="pochta.isk_zay"></v-select>
        <h6 class="h6"> Исковое Текст(если пусто то id_credit + ФИО) можно искользовать переменные вида ${dc_number_dog}:</h6>
        <vs-input class="w-full"  v-model="pochta.isk_zay_text"></vs-input>
        <h6 class="h6">OTDEL_POCHTA  Исковое: (если пусто то OTDEL_POCHTA)</h6>
        <vs-input class="w-full"  v-model="pochta.otdel_isk_zay"></vs-input>

        <h6 class="h6">Административное Исковое заявление:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arrPis"  v-model="pochta.adm_isk"></v-select>
        <h6 class="h6">Административное Исковое Текст(если пусто то id_credit + ФИО) можно искользовать переменные вида ${dc_number_dog}:</h6>
        <vs-input class="w-full"  v-model="pochta.adm_isk_text"></vs-input>
        <h6 class="h6">OTDEL_POCHTA Административное Исковое: (если пусто то OTDEL_POCHTA)</h6>
        <vs-input class="w-full"  v-model="pochta.otdel_adm_isk"></vs-input>


        <h6 class="h6" style="margin-top: 20px;!important;">Уведомление Исковое:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arrPis1"  v-model="pochta.uved_isk"></v-select>
        <h6 class="h6">Уведомление Исковое Текст(если пусто то id_credit + ФИО) можно искользовать переменные вида ${dc_number_dog}:</h6>
        <vs-input class="w-full"  v-model="pochta.uved_isk_text"></vs-input>
        <h6 class="h6">OTDEL_POCHTA Уведомление Исковое: (если пусто то OTDEL_POCHTA)</h6>
        <vs-input class="w-full"  v-model="pochta.otdel_pochta_isk"></vs-input>

        <h6 class="h6" style="margin-top: 20px;" >Уведомление Правопреемство:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arrPis"  v-model="pochta.uved_pravo"></v-select>
        <h6 class="h6">Уведомление Правопреемство Текст(если пусто то id_credit + ФИО) можно искользовать переменные вида ${dc_number_dog}:</h6>
        <vs-input class="w-full"  v-model="pochta.uved_pravo_text"></vs-input>
        <h6 class="h6">OTDEL_POCHTA Уведомление Правопреемство: (если пусто то OTDEL_POCHTA)</h6>
        <vs-input class="w-full"  v-model="pochta.otdel_pochta_pravo"></vs-input>

        <h6 class="h6" style="margin-top: 20px;" >Уведомление ОСП:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arrPis"  v-model="pochta.uved_ocp"></v-select>
        <h6 class="h6">Уведомление ОСП Текст(если пусто то id_credit + ФИО) можно искользовать переменные вида ${dc_number_dog}:</h6>
        <vs-input class="w-full"  v-model="pochta.uved_ocp_text"></vs-input>
        <h6 class="h6">OTDEL_POCHTA Уведомление ОСП: (если пусто то OTDEL_POCHTA)</h6>
        <vs-input class="w-full"  v-model="pochta.otdel_pochta_ocp"></vs-input>

        <h6 class="h6" style="margin-top: 20px;" >Уведомление Цедент:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arrPis"  v-model="pochta.uved_cedent"></v-select>
        <h6 class="h6">Уведомление Цедент Текст(если пусто то id_credit + ФИО) можно искользовать переменные вида ${dc_number_dog}:</h6>
        <vs-input class="w-full"  v-model="pochta.uved_cedent_text"></vs-input>
        <h6 class="h6">OTDEL_POCHTA Уведомление Цедент: (если пусто то OTDEL_POCHTA)</h6>
        <vs-input class="w-full"  v-model="pochta.otdel_pochta_cedent"></vs-input>

        <h6 class="h6" style="margin-top: 20px;">Уведомление Ходатайство об увеличении суммы иска:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arrPis"  v-model="pochta.uved_hod_uvel_sum_isk"></v-select>
   <!--   <h6 class="h6">Уведомление  Ходатайство об увеличении суммы иска Текст(если пусто то id_credit + ФИО) можно искользовать переменные вида ${dc_number_dog}:</h6>
      <vs-input class="w-full mb-base"  v-model="pochta.uved_hod_uvel_sum_isk_text"></vs-input>
      <h6 class="h6">OTDEL_POCHTA Уведомление Ходатайство об увеличении суммы иска: (если пусто то OTDEL_POCHTA)</h6>
      <vs-input class="w-full mb-base"  v-model="pochta.otdel_pochta_hod_uvel_sum_isk"></vs-input> -->



        <h6 class="h6" style="margin-top: 20px;">Уведомление о Покупки:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arrPis"  v-model="pochta.uved_buy"></v-select>
        <h6 class="h6">Уведомление о Покупки Текст(если пусто то id_credit + ФИО) можно искользовать переменные вида ${dc_number_dog}:</h6>
        <vs-input class="w-full"  v-model="pochta.uved_buy_text"></vs-input>
        <h6 class="h6">OTDEL_POCHTA Уведомление о Покупки: (если пусто то OTDEL_POCHTA)</h6>
        <vs-input class="w-full"  v-model="pochta.otdel_pochta_buy"></vs-input>


        <h6 class="h6" style="margin-top: 20px;">Уведомление Банкроту:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arrPis"  v-model="pochta.uved_bankrot"></v-select>
        <h6 class="h6">Уведомление Банкроту Текст(если пусто то id_credit + ФИО) можно искользовать переменные вида ${dc_number_dog}:</h6>
        <vs-input class="w-full"  v-model="pochta.uved_bankrot_text"></vs-input>
        <h6 class="h6">OTDEL_POCHTA Уведомление Банкроту: (если пусто то OTDEL_POCHTA)</h6>
        <vs-input class="w-full"  v-model="pochta.otdel_pochta_bankrot"></vs-input>

        <h6 class="h6" style="margin-top: 20px;">Уведомление дубликат:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arrPis"  v-model="pochta.uved_dublicat"></v-select>
        <h6 class="h6">Уведомление дубликат Текст(если пусто то id_credit + ФИО) можно искользовать переменные вида ${dc_number_dog}:</h6>
        <vs-input class="w-full"  v-model="pochta.uved_dublicat_text"></vs-input>
        <h6 class="h6">OTDEL_POCHTA Уведомление дубликат: (если пусто то OTDEL_POCHTA)</h6>
        <vs-input class="w-full"  v-model="pochta.otdel_pochta_dublicat"></vs-input>


        <h6 class="h6" style="margin-top: 20px;">Уведомление АУ:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arrPis"  v-model="pochta.uved_ay"></v-select>
        <h6 class="h6">Уведомление АУ Текст(если пусто то id_credit + ФИО) можно искользовать переменные вида ${dc_number_dog}:</h6>
        <vs-input class="w-full"  v-model="pochta.uved_ay_text"></vs-input>
        <h6 class="h6">OTDEL_POCHTA Уведомление АУ: (если пусто то OTDEL_POCHTA)</h6>
        <vs-input class="w-full"  v-model="pochta.otdel_pochta_ay"></vs-input>

        <h6 class="h6" style="margin-top: 20px;">Уведомление Цедент Банкрот:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arrPis"  v-model="pochta.uved_cedent_bankrot"></v-select>
        <h6 class="h6">Уведомление Цедент Банкрот Текст(если пусто то id_credit + ФИО) можно искользовать переменные вида ${dc_number_dog}:</h6>
        <vs-input class="w-full"  v-model="pochta.uved_cedent_bankrot_text"></vs-input>
        <h6 class="h6">OTDEL_POCHTA Уведомление Цедент Банкрот: (если пусто то OTDEL_POCHTA)</h6>
        <vs-input class="w-full"  v-model="pochta.otdel_pochta_cedent_bankrot"></vs-input>


        <h6 class="h6" style="margin-top: 20px;">Отправка ПФР:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arrPis"  v-model="pochta.send_pfr"></v-select>
        <h6 class="h6">Отправка ПФР Текст(если пусто то id_credit + ФИО) можно искользовать переменные вида ${dc_number_dog}:</h6>
        <vs-input class="w-full"  v-model="pochta.send_pfr_text"></vs-input>
        <h6 class="h6">OTDEL_POCHTA Отправка ПФР: (если пусто то OTDEL_POCHTA)</h6>
        <vs-input class="w-full"  v-model="pochta.otdel_pochta_send_pfr"></vs-input>

        <h6 class="h6" style="margin-top: 20px;">Отправка ФССП:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arrPis"  v-model="pochta.send_fssp"></v-select>
        <h6 class="h6">Отправка ФССП Текст(если пусто то id_credit + ФИО) можно искользовать переменные вида ${dc_number_dog}:</h6>
        <vs-input class="w-full"  v-model="pochta.send_fssp_text"></vs-input>
        <h6 class="h6">OTDEL_POCHTA Отправка ФССП: (если пусто то OTDEL_POCHTA)</h6>
        <vs-input class="w-full"  v-model="pochta.otdel_pochta_send_fssp"></vs-input>


        <h6 class="h6" style="margin-top: 20px;">ФССП Управление:</h6>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="arrPis"  v-model="pochta.uved_fssp_upr"></v-select>
        <h6 class="h6">ФССП Управление Текст(если пусто то id_credit + ФИО) можно искользовать переменные вида ${dc_number_dog}:</h6>
        <vs-input class="w-full"  v-model="pochta.uved_fssp_upr_text"></vs-input>
        <h6 class="h6">OTDEL_POCHTA ФССП Управление: (если пусто то OTDEL_POCHTA)</h6>
        <vs-input class="w-full"  v-model="pochta.otdel_pochta_uved_fssp_upr"></vs-input>


      <vs-popup class="holamundo" title="Инфо" :active.sync="showAllKey">
        <json-viewer
            :value="cer"
            :expand-depth=5
            copyable

            sort></json-viewer>
      </vs-popup>
      <vs-popup class="holamundo" title="Инфо" :active.sync="showSendTest">
        <vs-tooltip text="ID кредита должен принадлежать данной организации" position="top" >
          <h6 class="h6">ID Кредита:</h6>
        </vs-tooltip>
        <vs-input class="w-full mb-base"  v-model="id_credit"></vs-input>
        <vs-input id="fileUpload1" type="file" class="w-full mb-base" label-placeholder="file"
                  v-on:change="sendTest($event)" style="display: none"/>
        <div style="text-align: center">
          <vs-button  color="success" type="filled"  @click="startSendTest">Отправить</vs-button>
        </div>

      </vs-popup>
        <div style="margin-top: 10px">
            <vs-row>
                <vs-col vs-offset="4"  vs-type="flex" vs-justify="center" vs-align="center" >
                    <!--
                         <vs-button color="primary"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>
                     !-->
                    <vs-button style="margin-left: 15px; margin-right: 25px" color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
                    <vs-button style="margin-left: 15px; margin-right: 25px"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>


                </vs-col>
            </vs-row>
        </div>

    </div>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import axios from "@/axios";
    import r from "@/route";
    export default {
        components: {
        },
        data(){
            return{
                cer: {},
                id_credit:'',
                showSendTest:false,
                showAllKey:false,
                pochta:{
                    name:'',
                    token_pochta:'',
                    key_pochta:'',
                    auth_pochta:'',
                    otdel_pochta:'',
                    online:0,
                    port:'3080',
                },
                label:'',
                arrPis1:[
                    {id:0,name:'Простое'},
                    {id:1,name:'Заказное'},
                    {id:2,name:'С объявленной ценностью'},
                ],
                arrPis:[
                    {id:0,name:'Простое'},
                    {id:1,name:'Заказное'},
                ],
                arr:[
                    {id:0,name:'Нет'},
                    {id:1,name:'Да'},
                ],
            }
        },
        methods:{
          sendTest(evt){
            const formData = new FormData()
            formData.append('document', evt.target.files[0])
            formData.append('filename', evt.target.files[0].name)
            formData.append('id_credit', this.id_credit)

            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
            axios.post('/pochta/post-document',
                formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }
            ).then((response) => {
              if (response.data.result) {

                this.$vs.notify({ title: 'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })

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

            })

          },
          startSendTest(){
            document.getElementById("fileUpload1").click()
          },
          startShow(){
            axios.get(r("setting.index"), {
              params: {
                method: 'getPochtaKey',
                param:{
                  name:this.pochta.crypto_key,
                  pass:this.pochta.crypto_pass
                }

              }
            }).then((response) => {
              if (response.data.result){

                this.cer=response.data.data;
                this.showAllKey=true
              }

            })
          },
            ...mapActions([
                'getDataPochtaSettingsOnce','savePochtaSettings'
            ]),
            close(){
                this.$router.back()
            },
            save(){
                this.pochta.id=this.$route.params.id
                this.$vs.loading({ color: '#ff8000' })
                this.savePochtaSettings(this.pochta).then(res=>{
                    if(res.result) {
                        this.$vs.loading.close()
                        this.$vs.notify({
                                                    title: 'Успешно',
                                                    text: 'Успешно!!!',
                                                    color: 'success',
                                                    position: 'top-center'
                                                })
                        this.$router.back()
                    }
                    else {
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: `Ошибка !!! ${res.error}`,
                            color: 'danger',
                            position: 'top-center'
                        })
                        this.$vs.loading.close()
                    }
                }).catch(e=>{
                    this.$vs.notify({
                                                    title: 'Ошибка',
                                                    text: `Ошибка !!! ${e.message}`,
                                                    color: 'danger',
                                                    position: 'top-center'
                                                })
                    this.$vs.loading.close()
                })
            },
        },
        mounted(){
            if(this.$route.params.id==='new'){this.label='Новые настройки'}
            else {
                this.label=`Редактирование настроек ID ${this.$route.params.id}`
                this.getDataPochtaSettingsOnce(this.$route.params.id).then(res=>{
                    if(res.result){
                        this.pochta=res.data
                    }
                    else {
                        this.$vs.notify({
                                                        title: 'Ошибка',
                                                        text: 'Ошибка !!!',
                                                        color: 'danger',
                                                        position: 'top-center'
                                                    })
                        this.$router.back()
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>