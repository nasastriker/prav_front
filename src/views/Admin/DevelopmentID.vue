<template>
    <div class="wrapper">
        <div class="vx-row">
            <div class="vx-col sm:w-2/3 w-full">
                <vx-card no-shadow   style="min-height: 95vh;"  >
                    <!-- Info -->
                    <label style="margin-bottom: 10px">{{label}}: </label>
                    

                    <h6 class="h6Blue mb-1" style="margin-top: 10px">Название заявки </h6>
                    <vs-input class="w-full mb-base" style="margin-bottom: 10px"  v-model="developmentTask.name"></vs-input>
                  
                    <h6 class="h6Blue mb-1" style="margin-top: 10px;font-size: 12px;color: #7367F0">Описание заявки</h6>

                    <vue-editor style="margin-bottom: 10px" v-model="developmentTask.description"></vue-editor>

                    <label class="text-sm">Документ:</label>

                    <div class="flex flex-wrap items-center mb-base">
                        <div @click="downloadDocument()">
                            <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />
                        </div>
                        <div>
                            <vs-button class="mr-4 sm:mb-0 mb-2"  @click="chooseFiles1()">Загрузить документ</vs-button>
                            <vs-input id="fileUpload1" type="file"  class="w-full mb-base" label-placeholder="file"  v-on:change="saveDocument($event,developmentTask)" style="display: none"/>
                        </div>
                    </div>

                        <div v-for="(msg,index) in developmentTask.chat" :key="index" style="margin-top: 10px" >
                        <div v-if="typeof msg!=='number'">
                            <h6 class="h6Blue mb-1" style="margin-top: 10px;font-size: 12px;color: #7367F0">
                                <span style="margin-left: 20px" v-if="msg.loc" >{{msg.fio}} писал(а)  {{msg.created_at.slice(0, -8)}}
                                    <feather-icon v-if="msg.id_user==User.id" icon="ScissorsIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteMes(msg.id)" />
                                </span>
                                <span  v-else  style="color: red">{{msg.fio}} писал(а) {{msg.time}} <span  v-if="crm"> заказчику</span></span></h6>
                            <div class="ramka" v-if="msg.loc" style="margin-left:20px;"><span v-html="msg.msg"></span> </div>
                            <div class="ramkaZak" v-else><span v-html="msg.msg"></span> </div>


                        </div>
                        </div>
                    <div v-if="$route.params.id!='new'">
                    <div class="vx-row" style="margin-top: 10px">
                        <div class="vx-col md:w-4/5 w-full">
                            <vue-editor style="margin-bottom: 10px;" v-model="developmentTask.currentMessage" ></vue-editor>
                        </div>
                        <div class="vx-col md:w-1/5 w-full">

                            <vs-button style="margin-left: 10px;" @click="SendMessage">Отправить сообщение</vs-button>

                            <vs-button style="margin-top:10px; margin-left: 10px;" v-if="crm" @click="SendMessageLocal">Сообщение разработчикам</vs-button>


                        </div>

                    </div>
                    </div>


                </vx-card>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
                <vx-card no-shadow style="min-height: 95vh;">
                    <fieldset class="f h-100">
                        <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="close()">Закрыть</vs-button>
                        <vs-button class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
                        <div  class="vx-row mt-4">
                            <div class="vx-col w-full mb-2">
                                <div v-if="worktrigger" style="margin-top: 10px;font-size: 12px;color: #7367F0">Пользователь: <span style="color:black;font-size: 14px">{{developmentTask.fio_user}}</span></div>
                                <div v-if="worktrigger" style="margin-top: 10px;font-size: 12px;color: #7367F0">Email: <span style="color:black;font-size: 14px">{{developmentTask.email_user}}</span></div>
                                <div v-if="worktrigger" style="margin-top: 10px;margin-bottom: 10px;font-size: 12px;color: #7367F0">CRM: <span style="color:black;font-size: 14px">{{developmentTask.crm}}</span></div>
                            
                                <div v-if="crm">
                                    <h6 class="h6Blue mb-1" style="font-size: 12px;color: #7367F0">Приоритет</h6>
                                    <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="PriorDevelopmentList"   v-model="developmentTask.id_prior"  ></v-select>
                                </div>

                                <template v-if="worktrigger">
                                    <h6 class="h6Blue mb-1" style="font-size: 12px;color: #7367F0">Срок завершения заявки </h6>
                                    <vs-input class="w-50" style="margin-bottom: 10px" type="date" v-model="developmentTask.plan_date"></vs-input>
                                        <div class="vx-row" >
                                            <div class="vx-col w-full">
                                                <h6 class="h6Blue mb-1" style="font-size: 12px;color: #7367F0">Исполнитель</h6>
                                                <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="f_i" :options="UsersArr"   v-model="developmentTask.id_contractor"></v-select>
                                                <h6 class="h6Blue mb-1" style="font-size: 12px;color: #7367F0">Соисполнитель</h6>
                                                <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="f_i" :options="UsersArr"   v-model="developmentTask.id_soisp"></v-select>
                                            </div>
                                            <div class="vx-col w-full">
                                                <h6 class="h6 mb-1">Контроль</h6>
                                                <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="f_i" :options="UsersArr"   v-model="developmentTask.id_control"></v-select>

                                            </div>
                                        </div>
                                </template>

                                <h6 class="h6Blue mb-1" style="font-size: 12px;color: #7367F0">Тип заявки</h6>

                                <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="TypeDevelopmentList"   v-model="developmentTask.id_type"  ></v-select>
                                <template v-if="worktrigger">
                                <h6 class="h6Blue mb-1" style="margin-top: 10px;font-size: 12px;color: #7367F0">Статус заявки</h6>
                                <v-select  class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="StatusDevelopmentList"   v-model="developmentTask.id_status"  ></v-select>
                                </template>

                                <vs-checkbox v-model="developmentTask.recive_message" @change="changeMessageRecive">Уведомлять меня об изменении статуса и сообщениях</vs-checkbox>
                            </div>
                        </div>
                    </fieldset>
                </vx-card>
            </div>
        </div>
    </div>
    
</template>

<script>
import r from '../../route'
import { mapActions, mapGetters } from 'vuex'
import axios from '../../axios'
import vSelect from 'vue-select'
import { VueEditor, Quill } from 'vue2-editor'
import ImageResize from 'quill-image-resize-vue'

Quill.register('modules/imageResize', ImageResize)
export default {
  components: {
    vSelect, VueEditor
  },
  data () {
    return {
      crm:false,
      customToolbar: [[]],
      MsdDisable:true,
      documentWord:'/word-logo.png',
      worktrigger:false,
      label:'Редактирование задачи',

      developmentTask:{
        chat:{}
      }
    }
  },
  mounted () {
    this.getCrm()
    this.getTypeDevelopmentList()
    this.getPriorDevelopmentList()
    this.getStatusDevelopmentList()
    this.getDataUsers()
    this.getCrmSectionsAlls()
    if (this.$route.params.id != 'new') {
      axios.get(r('development.index'), {
        params: {
          method: 'ReedNewMessage',
          param: this.$route.params.id
        }
      }).then($res => {
        this.getDevelopmentMsgBanner()
      })
      this.getData(this.$route.params.id)


    } else {
      this.developmentTask.id = 'new'
      this.newUser = true
      this.label = 'Новая заявка'
    }

  },

  computed: {
    ...mapGetters(['TypeDevelopmentList', 'StatusDevelopmentList', 'CrmSectionsAllArr', 'UsersArr', 'User', 'PriorDevelopmentList'])

  },
  methods: {
    deleteMes (id) {
      axios.post(r('development.index'), {
        params:{
          method:'deleteMes',
          param:id
        }
      }).then((response) => {
        if (response.data.result) {
          this.$vs.notify({  title:'Успешно', text: 'Сообщение удалено', color: 'success', position: 'top-center' })
          this.getData(this.$route.params.id)
        } else {
          this.$vs.notify({  title:'Ошибка', text: 'Сообщение удалить не удалось', color: 'danger', position: 'top-center' })
        }
      }).catch(() => {
        this.$vs.notify({  title:'Ошибка', text: 'Сообщение удалить не удалось', color: 'danger', position: 'top-center' })
      })
    },
    getCrm () {
      axios.get(r('development.index'), {
        params:{
          method:'getCrm',
          param:''
        }
      }).then((response) => {
        if (response.data.result) {
          this.crm = true
        } else {
          this.crm = false
        }
      }).catch(() => {

      })
    },
    changeMessageRecive () {
      if (this.developmentTask.recive_message) {
        axios.post(r('development.index'), {
          params:{
            method:'addUserSubscription',
            param:{
              id_development:this.$route.params.id,
              id_user:this.User.id
            }
          }
        }).then(res => {
          if (res.data.result) this.$vs.notify({
            title: 'Успешно',
            text: 'Вы подписаны',
            color: 'success',
            position: 'top-center'
          })
          else this.this.$vs.notify({
            title: 'Ошибка',
            text: 'Ошибка !!!',
            color: 'danger',
            position: 'top-center'
          })
        }).catch(e => {
          this.$vs.notify({
            title: 'Ошибка',
            text: 'Ошибка !!!',
            color: 'danger',
            position: 'top-center'
          })
        })
      } else {
        axios.post(r('development.index'), {
          params: {
            method: 'deleteUserSubscription',
            param: {
              id_development:this.$route.params.id,
              id_user:this.User.id
            }
          }
        }).then(res => {
          if (res.data.result) this.$vs.notify({
            title: 'Успешно',
            text: 'Вы отписались',
            color: 'blue',
            position: 'top-center'
          })
          else this.this.$vs.notify({
            title: 'Ошибка',
            text: 'Ошибка !!!',
            color: 'danger',
            position: 'top-center'
          })
        }).catch(e => {
          this.$vs.notify({
            title: 'Ошибка',
            text: 'Ошибка !!!',
            color: 'danger',
            position: 'top-center'
          })
        })
      }
    },
    SendMessageLocal () {

      axios.post(r('development.index'), {
        params:{
          method:'SendMessageLocal',
          param:this.developmentTask
        }
      }).then((response) => {
        if (response.data.result) {
          this.$vs.notify({  title:'Успешно', text: 'Сообщение отправлено', color: 'success', position: 'top-center' })
          this.getData(this.$route.params.id)
        } else {
          this.$vs.notify({  title:'Ошибка', text: 'Сообщение отправить не удалось', color: 'danger', position: 'top-center' })
        }
      }).catch(() => {
        this.$vs.notify({  title:'Ошибка', text: 'Сообщение отправить не удалось', color: 'danger', position: 'top-center' })
      })

    },
    SendMessage () {

      axios.post(r('development.index'), {
        params:{
          method:'SendMessage',
          param:this.developmentTask
        }
      }).then((response) => {
        if (response.data.result) {
          this.$vs.notify({  title:'Успешно', text: 'Сообщение отправлено', color: 'success', position: 'top-center' })
          this.getData(this.$route.params.id)
        } else {
          this.$vs.notify({  title:'Ошибка', text: 'Сообщение отправить не удалось', color: 'danger', position: 'top-center' })
        }
      }).catch(() => {
        this.$vs.notify({  title:'Ошибка', text: 'Сообщение отправить не удалось', color: 'danger', position: 'top-center' })
      })

    },
    chooseFiles1 () {
      let err = ''
      if (typeof this.developmentTask.name === 'undefined' || this.developmentTask.name === '')err += 'Введите название заявки; '
      if (typeof this.developmentTask.id_type === 'undefined' || this.developmentTask.id_type === '')err += 'Выберите тип заявки; '
      if (typeof this.developmentTask.description === 'undefined' || this.developmentTask.description === '')err += 'Напишите описание заявки'
      if (err !== '') {
        this.$vs.notify({
          title: 'Ошибка',
          text: err,
          color: 'danger',
          position: 'top-center'
        })
      } else {
        document.getElementById('fileUpload1').click()
      }

    },
    downloadDocument () {
      this.$vs.loading({color: '#ff8000'})
      axios.get(r('development.index'), {
        responseType: 'arraybuffer',

        params: {
          method: 'getDevelopmentFile',
          param:this.developmentTask.id


        }
      }).then((response) => {


        const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }))
        let filename = response.headers['content-disposition'].replace('attachment; filename=', '')
        //console.log(filename);
        filename = filename.replace('_', '')
        filename = filename.split('; filename*=utf')[0]
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', this.developmentTask.filename)
        document.body.appendChild(link)
        link.click()
        this.$vs.loading.close()

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

    saveDocument (evt, data) {

      const formData = new FormData()
      formData.append('document', evt.target.files[0])
      formData.append('filename', evt.target.files[0].name)
      formData.append('id', this.$route.params.id)
      formData.append('data', JSON.stringify(data))
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
      axios.post('/development/post-document',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then((response) => {
        if (response.data.result) {
          this.developmentTask.filename = evt.target.files[0].name
          if (response.data.id != this.$route.params.id) {
            this.developmentTask.id = response.data.id
            this.$router.push(`/adm/development/${response.data.id}`)
          }
          this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
          this.close()

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
    ...mapActions([
      'getTypeDevelopmentList', 'getStatusDevelopmentList', 'getCrmSectionsAlls', 'saveDevelopmentTast', 'getDevelopmentBanner',
      'getDataUsers', 'getDevelopmentMsgBanner', 'getPriorDevelopmentList'
    ]),
    getData (id) {

      axios.get(r('development.index'), {
        params: {
          method: 'getDevelopmentOnce',
          param: id

        }
      }).then((response) => {
        if (response.data.result) {
          this.developmentTask = response.data.data
          this.worktrigger = response.data.param
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: `Задача с номером ${id} не найдена!!!`,
            color: 'danger',
            position: 'top-center'
          })
          this.close()
        }


      })
    },
    save () {
      let err = ''
      if (typeof this.developmentTask.name === 'undefined' || this.developmentTask.name === '')err += 'Введите название заявки; '
      if (typeof this.developmentTask.id_type === 'undefined' || this.developmentTask.id_type === '')err += 'Выберите тип заявки; '
      if (typeof this.developmentTask.description === 'undefined' || this.developmentTask.description === '')err += 'Напишите описание заявки'
      if (err !== '') {
        this.$vs.notify({
          title: 'Ошибка',
          text: err,
          color: 'danger',
          position: 'top-center'
        })
      } else {
        this.saveDevelopmentTast(this.developmentTask).then((response) => {
          if (response) {
            this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
            this.close()
          } else {
            this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
          }


        })
      }
    },
    close () {
      this.getDevelopmentBanner()
      this.getDevelopmentMsgBanner()
      this.$router.back()
    }
  }

}
</script>
<style>
    .ramkaZak{
        border-radius: 5px;
        box-shadow: 0 0 0 0.5px #ff4f00;
        margin: 5px auto;
        text-indent: 5px;
        overflow: hidden!important;
    }
    .ramka{
        border-radius: 5px;
        box-shadow: 0 0 0 0.5px rgb(115, 103, 240);
        margin: 5px auto;
        text-indent: 5px;
        overflow: hidden!important;
    }
</style>
