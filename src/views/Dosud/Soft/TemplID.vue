<template>
    <vx-card no-shadow>


        <h3 style="margin-bottom: 25px">{{label}}: {{data.name}} </h3>

        <div>
            <div class="centerx">
                <vs-tooltip text="Название шаблона" position="top" >
                    <h6 class="h6Blue mb-1">Название шаблона:</h6>
                </vs-tooltip>
            </div>
            <vs-input class="w-100 mb-4"  v-model="data.name"></vs-input>
        </div>

        <div>
            <div class="centerx">
                <vs-tooltip text="Шаблон по умлочанию (можно оставить пустым)" position="top" >
                    <h6 class="h6Blue mb-1">Шаблон по умлочанию (можно оставить пустым):</h6>
                </vs-tooltip>
            </div>
            <v-select  class="w-100 mb-4"  :options="['Шаблон1','Шаблон2']"  v-model="data.shablon" style="margin-bottom: 40px; max-width: 200px; "></v-select>
        </div>


        <!-- <h6 style="margin-top: 15px"></h6>
            <div class="vx-row" style="padding-top: 20px">
                <div class="vx-col sm:w-1/3 w-full mb-2">
                    
                </div>
            </div> -->
        <template v-if='$route.name!="dosudSoftPochtaID"'>
          <p> Можно использовать следующие переменные:</p>
          <p> <b>$Name</b> - Имя заёмщика</p>
          <p> <b>$Family</b> - Фамилия заёмщика</p>
          <p> <b>$Patronymic</b> - Отчество заёмщика</p>
          <p> <b>$SumDolg </b> - Сумма долга</p>
          <p> <b>$RecName </b> - Название взыскателя и цедента</p>
          <p> <b>$RecSite </b> - Сайт взыскателя </p>
          <p> <b>$OrganName </b> - Название организации</p>
          <p> <b>$OrganPhone </b> - Телефон организации</p>
          <p> <b>$OrganEmail </b> - Email организации</p>
          <p> <b>$OrganOgrn </b> - Огрн организации</p>
          <p> <b>$NumberDog</b> - Номер договора </p>
          <p> <b>$DateDog</b> - Дата договора </p>
          <p> <b>$DolgOsn</b> - Основной долг </p>
          <p> <b>$ProcentDolg</b> - Проценты </p>
          <p> <b>$Peny</b> - Пени </p>
        </template>


        <br>
      <template v-if='$route.name=="dosudSoftPochtaID"'>
        <label style="margin-bottom: 10px;">Шаблон уведомления :</label>
        <v-select  class="w-50 " :reduce="label => label.id" label="shablon_name" :options="ShablonDocumentsArrLocal"  v-model="data.id_shab_uved"  ></v-select>
        <label style="margin-bottom: 10px">Вид отправления:  </label>
        <v-select  class="w-50 " :reduce="label => label.type" label="name" :options="pochta"  v-model="data.uved_pochta"  ></v-select>
        <label class="text-sm">Канал отправки :</label>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="channels"  v-model="data.uved_channel"   ></v-select>
      </template>
      <template v-else>

        <template v-if='$route.name=="dosudSoftEmailID"'>
          <vs-checkbox v-model="User.pag.showCode" class="mt-2 mb-4" style="font-size: 12px;" @change="setCode">Показать код</vs-checkbox>
          <template v-if="!User.pag.showCode">
            <VueEditor style="margin-top: 10px" v-model="data.text" ></VueEditor>
          </template>
          <template v-else>
            <textarea style="min-width: 70vh;min-height: 300px" v-model="data.text"></textarea>
          </template>


        </template>
        <template v-else>
          <vs-textarea  v-model="data.text" height="200px" />
          <template v-if='$route.name=="dosudSoftSmsID"'>
            <div class="centerx">
                <vs-tooltip text="Дополнительное поле будет ссылкой" position="top" >
                    <h6 class="h6Blue mb-1">Дополнительное поле будет ссылкой:</h6>
                </vs-tooltip>
            </div>
            <vs-textarea  v-model="data.dop_text" />
          </template>
        </template>
      </template>

        <div style="margin-top: 10px">
            <vs-row>
                <vs-col vs-offset="6"  vs-type="flex" vs-justify="center" vs-align="center" >
                    <vs-button color="primary"  style="margin-right: 15px;" class="pull-right" type="filled"  @click="send">Тест</vs-button>
                    <vs-button color="primary"   style=" margin-right: 25px"  class="pull-right" type="filled"  @click="close">Закрыть</vs-button>

                    <vs-button color="success"  class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
                </vs-col>
            </vs-row>
        </div>
        <vs-popup classContent="popup-example"  title="Сообщение:" :active.sync="popupActive">
            <h6>Укажите email:</h6>
            <vs-input  class="w-100 mb-base"  v-model="email" />

            <div style="margin-top: 10px">
                <vs-row>
                    <vs-col vs-offset="8"  vs-type="flex" vs-justify="center" vs-align="center" >
                        <vs-button style="margin-top: 10px" color="primary"  class="w-full mb-base" type="filled"  @click="sendServer('email')">Отправить</vs-button>
                    </vs-col>
                </vs-row>
            </div>

        </vs-popup>
        <vs-popup classContent="popup-example" title="Сообщение:" :active.sync="popupSms">
            <h6>Укажите телефон:</h6>
            <vs-input  class="w-100 mb-base"  v-model="phone" />

            <div style="margin-top: 10px">
                <vs-row>
                    <vs-col vs-offset="8"  vs-type="flex" vs-justify="center" vs-align="center" >
                        <vs-button style="margin-top: 10px" color="primary"  class="w-full mb-base" type="filled"  @click="sendServer('sms')">Отправить</vs-button>
                    </vs-col>
                </vs-row>
            </div>

        </vs-popup>
        <vs-popup classContent="popup-example" title="Сообщение:" :active.sync="popupVoice">
            <h6>Укажите телефон:</h6>
            <vs-input  class="w-100 mb-base"  v-model="phone" />

            <div style="margin-top: 10px">
                <vs-row>
                    <vs-col vs-offset="8"  vs-type="flex" vs-justify="center" vs-align="center" >
                        <vs-button style="margin-top: 10px" color="primary"  class="w-full mb-base" type="filled"  @click="sendServer('voice')">Отправить</vs-button>
                    </vs-col>
                </vs-row>
            </div>

        </vs-popup>
    </vx-card>
</template>

<script>
    import r from '@/route';
    import axios from '@/axios'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import { VueEditor } from "vue2-editor";
    export default {
        components: {
          VueEditor,
        },
        data () {
            return {
                pochta:[

                ],
                channels:[
                  {
                    id:0,
                    name:'Выгрузка на печать'
                  },
                  {
                    id:1,
                    name:'Почта онлайн'
                  },
                ],
                email:'',
                phone:'',
                popupSms:false,
                popupVoice:false,
                popupActive:false,
                data:{},
                dataLoad:{},
                label:'Новый шаблон почтового сообщения1',
            }
        },
        mounted(){
            this.getSetting()
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                    if(this.$route.name=="dosudSoftEmailID"){
                        this.label='Редактирование шаблона почтового сообщения'
                    }
                    if(this.$route.name=="dosudSoftSmsID"){
                        this.label='Редактирование шаблона СМС сообщения'
                    }
                    if(this.$route.name=="dosudSoftVoiceID"){
                        this.label='Редактирование шаблона Голосового сообщения'
                    }
                    if(this.$route.name=="dosudSoftPochtaID"){
                      this.label='Редактирование шаблона почтового сообщения'
                    }

                }
                else{
                    if(this.$route.name=="dosudSoftEmailID"){
                        this.label='Новый шаблон почтового сообщения'
                    }
                    if(this.$route.name=="dosudSoftSmsID"){
                        this.label='Новый шаблон СМС сообщения'
                    }
                    if(this.$route.name=="dosudSoftVoiceID"){
                        this.label='Новый шаблон Голосового сообщения'
                    }
                  if(this.$route.name=="dosudSoftPochtaID"){
                    this.label='Новый шаблона почтового сообщения'
                  }
                }


            }
          this.getDataShablonDocuments()

        },

        computed: {
          ShablonDocumentsArrLocal(){
            if(this.data.id_recover==-1){
              let arr=[];
              let index;
              for (index = 0; index < this.ShablonDocumentsArr.length; ++index) {
                if(this.ShablonDocumentsArr[index].id_recover==this.data.id_recover){
                  arr.push(this.ShablonDocumentsArr[index]);
                }

              }

              return arr

            }else{
              return this.ShablonDocumentsArr
            }
          },
          ...mapGetters([
            'User','ShablonDocumentsArr',
          ]),


        },
        methods: {
          getSetting(){
            axios.get(r("settingStad.index"), {
              params: {
                method: 'getSetting',
                param: ''

              }
            }).then((response) => {
              if (response.data.result){

                this.pochta=response.data.pochta;
                this.channels=response.data.channels;
              }



            })
          },
            sendServer(type){
                this.data.id=this.$route.params.id;
                this.data.type=type
                this.data.email=this.email
                this.data.shablon=this.data.name
                this.data.phone=this.phone

                axios.post(r("templSoft.index"), {
                    params: {
                        method: 'sendTest',
                        param: this.data

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: 'Отправлено' , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Отправить не удалось' , color: 'danger', position: 'top-center' })
                    }
                    this.popupActive=false


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
            close(){

                this.$router.back()
            },
            sendEmail(){
                this.popupActive=true;
            },
            sendSms(){
                this.popupSms=true;
            },
            sendVoice(){
                this.popupVoice=true;
            },
            send(){

                if(this.data.type=="email"){
                    this.popupActive=false
                    this.popupVoice=false
                    this.popupSms=false
                    this.sendEmail()
                }
                if(this.data.type=="sms"){
                    this.popupSms=false
                    this.popupActive=false
                    this.popupVoice=false
                    this.sendSms()
                }
                if(this.data.type=="voice"){
                    this.popupActive=false
                    this.popupVoice=false
                    this.popupSms=false
                    this.sendVoice()
                }
            },
            setCode(){
              if(this.User.pag.showCode){
                this.data.text= this.dataLoad.text
              }
              this.setDataUser();
            },
          ...mapActions([
            'setDataUser','getDataShablonDocuments'
          ]),
            getData(id){
                axios.get(r("templSoft.index"), {
                    params: {
                        method: 'getTemplSoft',
                        param: id

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.data=response.data.data
                      this.dataLoad=JSON.parse(JSON.stringify(response.data.data))
                    }



                })
            },
            save(){
                this.data.id=this.$route.params.id;
                if(this.$route.name=="dosudSoftEmailID"){
                    this.data.type='email'
                }
                if(this.$route.name=="dosudSoftSmsID"){
                    this.data.type='sms'
                }
                if(this.$route.name=="dosudSoftVoiceID"){
                    this.data.type='voice'
                }
              if(this.$route.name=="dosudSoftPochtaID"){
                this.data.type='pochta'
              }
                axios.post(r("templSoft.index"), {
                    params: {
                        method: 'setTemplSoft',
                        param: this.data

                    }
                }).then((response) => {
                    if (response.data.result){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено' , color: 'success', position: 'top-center' })
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось' , color: 'danger', position: 'top-center' })
                    }

                    this.$router.back()

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


        },
    }
</script>
