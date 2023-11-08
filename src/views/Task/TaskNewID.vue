<template>
    <div class="wrapper">
        <div class="vx-row">
            <div class="vx-col sm:w-2/3 w-full">
                <vx-card no-shadow style="min-height: 95vh;">
                    <h6 class="h6Blue mb-1" style="margin-top: 10px; font-size: 12px; color: rgb(115, 103, 240);">Название задачи </h6>
                    <vs-input :disabled="!isMy" class="w-full mb-base task_name" style="margin-bottom: 10px" v-model="userTask.name"></vs-input>
                    <vs-tabs>

                      <vs-tab label="Описание заявки">
                        <vue-editor :disabled="!isMy" style="margin-bottom: 10px" v-model="userTask.description"></vue-editor>
                        <div class="flex flex-wrap items-center mb-base">
                          <div @click="downloadDocument()">
                            <vs-avatar :src="documentWord" size="70px" class="mr-4 mb-4" />
                          </div>
                          <div>
                            <vs-button class="mr-4 sm:mb-0 mb-2" @click="chooseFiles1()">Загрузить документ</vs-button>
                            <vs-input :disabled="!isMy" id="fileUpload1" type="file" class="w-full mb-base" label-placeholder="file" v-on:change="saveDocument($event)" style="display: none" />
                          </div>
                        </div>
                      </vs-tab>
                      <vs-tab label="Кредиты">
                        <ag-grid-vue
                            ref="agGridTable"
                            :components="components"
                            :gridOptions="gridOptions"
                            class="ag-theme-material w-100 my-4 ag-grid-table"
                            :columnDefs="columnDefs"
                            :defaultColDef="defaultColDef"
                            :rowData="userTask.credits"
                            rowSelection="multiple"
                            :rowDataChanged = "onRowDataChanged"
                            colResizeDefault="shift"
                            :animateRows="true"
                            :floatingFilter="false"
                            :pagination="true"
                            :paginationPageSize="paginationPageSize"
                            :suppressPaginationPanel="true"
                            @rowDoubleClicked="onrowDoubleClicked"
                            :enableRtl="$vs.rtl"
                            @grid-size-changed="onGridSizeChanged"
                            @column-resized="onColumnResized"
                            @column-visible="onColumnVisible"
                            :enableBrowserTooltips="true"
                            :overlayLoadingTemplate="'Идёт загрузка'"
                            :overlayNoRowsTemplate="'Нет записей'">
                        </ag-grid-vue>
                      </vs-tab>
                    </vs-tabs>

                    <fieldset class="f">
                        <vs-tabs>
                            <vs-tab label="Комментарии">
                                <div class="con-tab-ejemplo">
                                    <div v-for="(msg,index) in userTask.chat" :key="index" class="mb-5" style="margin-top: 10px">
                                            <h6 class="h6Blue chatTitle" style="margin-top: 10px;font-size: 12px;color: #7367F0">
                                                <span>
                                                    <b class="quoteUserMessage">{{msg.fio}}</b> писал(а) {{formatTime(msg.created_at)}} <span style="cursor: pointer;color: red" @click="msg.subComment=!msg.subComment">Ответить</span>
                                                </span>
                                                <feather-icon v-if="msg.id_user==User.id" class="removeMsg" icon="PlusIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteMes(msg.id)" />
                                            </h6>
                                            <div class="ramka" ><span v-html="msg.msg"></span> </div>

                                      <div v-for="(msgSub,index) in msg.subCommentArr" :key="index" class="mb-5" >
                                        <div class="sub_comment"  >
                                            <h6 class="h6Blue chatTitle" style="margin-top: 10px;font-size: 12px;color: #7367F0">
                                                <span>
                                                    <b class="quoteUserMessage">{{msg.fio}}</b> писал(а) {{formatTime(msgSub.time)}}
                                                </span>
                                              <feather-icon v-if="msgSub.id_user==User.id" class="removeMsg" icon="PlusIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="deleteSubMes(msg.id,msgSub.time)" />
                                            </h6>
                                            <div class="ramka"><span v-html="msgSub.msg"></span> </div>
                                        </div>
                                      </div>

                                        <div class="sub_comment" v-if="msg.subComment" >
                                            <h6 class="h6Blue chatTitle" style="margin-top: 10px;font-size: 12px;color: #7367F0">
                                                <span>
                                                    <b class="quoteUserMessage">Ответ:</b>
                                                </span>
                                            </h6>
                                            <vue-editor style="margin-bottom: 20px;" v-model="subCommentText"></vue-editor>
                                            <div class="comment_btn_row_right mt-4">
                                              <vs-button class="sm:mb-0 mb-4" size="small" @click="sendSubComment(msg.id)">Ответить</vs-button>
                                            </div>
                                        </div>

                                    </div>
                                    <div v-if="$route.params.id!='new'">
                                        <div class="vx-row" style="margin-top: 50px">
                                            <div class="vx-col w-full">
                                                <h6 class="h6Blue mb-1">Оставить комментарий</h6>
                                                <vue-editor style="margin-bottom: 20px;" v-model="userTask.currentMessage"></vue-editor>
                                                <div>
                                                    <vs-button @click="SendMessage">Отправить сообщение</vs-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </vs-tab>
                            <vs-tab label="История изменений">
                                <div class="con-tab-ejemplo">
                                  <HistoryTaskId :id="$route.params.id"></HistoryTaskId>
                                </div>
                            </vs-tab>
                        </vs-tabs>
                    </fieldset>
                </vx-card>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
                <vx-card no-shadow style="min-height: 95vh;">
                    <fieldset class="f h-100">
                        <vs-button color="primary" class="pull-right mr-4 mb-4" type="filled" @click="close()">Закрыть</vs-button>
                        <vs-button v-if="isMy" class="pull-right" type="filled" @click="save">Сохранить</vs-button>
                        <vs-button v-if="!isMy&&(userTask.id_status==2)" class="pull-right" type="filled" @click="savePod">На подтверждении</vs-button>
                        <vs-button v-if="!isMy&&(userTask.id_status==1)" class="pull-right" type="filled" @click="saveRab">В работу</vs-button>
                        <div style="margin-top: 10px;font-size: 12px;color: #7367F0" class="mt-5 mb-4">Постановщик: <span style="color:black;font-size: 14px">{{userTask.fio_user}}</span></div>
                        <div class="vx-row time_wrapper mb-4">
                            <div class="vx-col">
                                <h6 class="h6Blue mb-1" style="font-size: 12px;color: #7367F0">Срок завершения задачи </h6>
                                <vs-input :disabled="!isMy" class="w-50" style="margin-bottom: 10px" type="date" v-model="userTask.plan_date"></vs-input>
                            </div>
                            <div class="vx-col centerx">
                                <vs-tooltip text="Запрос на продление крайнего срока постановщику задачи" position="top">
                                    <vs-button color="primary" @click="showSrok=!showSrok">+</vs-button>
                                </vs-tooltip>
                                <vs-popup classContent="popup-example" title="Продление срока" :active.sync="showSrok">
                                  <div style="align-content: center">
                                    <vs-input type="date" class="w-50 "  v-model="userTask.new_date" ></vs-input>
                                    <vs-button style="margin-top: 20px" type="filled" @click="save">Отправить запрос</vs-button>
                                  </div>

                                </vs-popup>
                            </div>
                        </div>
                        <vs-button class="mb-4" color="primary">Напоминание</vs-button>

                        <h6 class="h6Blue mb-1" style="font-size: 12px;color: #7367F0">Исполнитель</h6>
                        <v-select :disabled="!isMy" class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="f_i" :options="UsersArr" v-model="userTask.id_contractor"></v-select>
                        <h6 class="h6Blue mb-1" style="font-size: 12px;color: #7367F0">Соисполнитель</h6>
                        <v-select :disabled="!isMy" class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="f_i" :options="UsersArr" v-model="userTask.id_soisp"></v-select>
                        <h6 class="h6Blue mb-1" style="font-size: 12px;color: #7367F0">Контроль</h6>
                        <v-select :disabled="!isMy" class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="f_i" :options="UsersArr" v-model="userTask.id_control"></v-select>
                        <h6 class="h6Blue mb-1" style="margin-top: 10px;font-size: 12px;color: #7367F0">Статус заявки</h6>
                        <v-select :disabled="!isMy" class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="name" :options="StatusUsersTaskList" v-model="userTask.id_status"></v-select>
                        <h6 class="h6Blue mb-1">Приоритет задачи</h6>
                        <vs-select placeholder="Укажите приоритет задачии" multiple class="mb-4" v-model="userTask.status_task">
                            <vs-select-item class="w-50 " :key="index" :value="item.value" :text="item.text" v-for="(item,index) in status_task_options" />
                        </vs-select>
                   <!--     <vs-checkbox class="allert_checkbox" v-model="userTask.recive_message" @change="changeMessageRecive">Уведомлять меня об изменении статуса и сообщениях</vs-checkbox> -->
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
import { VueEditor, Quill } from 'vue2-editor'
import ImageResize from 'quill-image-resize-vue'
import '../../../assets/css/ag-grid.css'
import '../../../assets/css/ag-theme-alpine.css'
import moment from 'moment';
import HistoryTaskId from './HistoryTaskId';
import { AgGridVue } from 'ag-grid-vue'
Quill.register('modules/imageResize', ImageResize)
export default {
    components: {
        VueEditor,
      HistoryTaskId, AgGridVue
    },
    data() {
        return {
          personalDataId: 0,

          document:null,
            subCommentText:'',
            showSrokNew:false,
            showSrok:false,
            crm: false,
            userTaskHistory:[],
            customToolbar: [
                []
            ],
            MsdDisable: true,
            documentWord: '/word-logo.png',
            worktrigger: false,
            label: 'Редактирование задачи',

            userTask: {
                chat: {},
                status_task:[]
            },


            gridApi: null,
            gridOptions: {},
            defaultColDef: {
              sortable: true,
              resizable: true,
              suppressMenu: true
            },
            columnDefs: [
                { headerName: "ИД", field: "id", resizable: true },
                { headerName: "Номер договора", field: "number_dog", resizable: true },
                { headerName: "Имя", field: "name", resizable: true },
                { headerName: "Отчество", field: "name_patronymic", resizable: true },
                { headerName: "Фамилия", field: "name_family", resizable: true },
                // { headerName: "Изменение", field: "change", width: 350, resizable: true },
            ],
            rowData: [
                // { date: "15.04.2023 17:55:07", user: "Сергей Дриневский", description: "Статус", change: "Ждет выполнения → Выполняется" },
                // { date: "15.04.2023 17:55:07", user: "Делопроизводитель Специалист ", description: "Добавлен комментарий #9", change: "" },
                // { date: "15.04.2023 17:55:07", user: "Сергей Дриневский", description: "Статус", change: "Новая → Ждет выполнения" },
                // { date: "15.04.2023 17:55:07", user: "Brinzevich_Natalya", description: "Создана задача", change: "Новая" },
            ],
            status_task: [],
            status_task_options: [
                { text: 'Срочный приоритет', value: 1 },
                { text: 'Нормальный', value: 2 },
                { text: 'На рассмотрении', value: 3 },
                { text: 'Черновик', value: 4 },
            ],
        }
    },
    mounted() {
        this.getStatusUserTaskList()
        this.getDataUsers()
        if (this.$route.params.id != 'new') {
          this.getData(this.$route.params.id)
        } else {
            this.userTask.id = 'new'
            this.newUser = true
            this.label = 'Новая задача'
        }
    },

    computed: {
        isMy() {
            if (this.$route.params.id != 'new') {
                if (this.userTask.id_user == this.User.id) {
                    return true
                }
                return false
            } else {
                return true
            }

        },
        ...mapGetters(['TypeDevelopmentList', 'StatusUsersTaskList', 'CrmSectionsAllArr', 'UsersArr', 'User', 'PriorDevelopmentList'])

    },
    methods: {
        onrowDoubleClicked(event){
          this.$router.push('/credit/'+event.data.id)
        },
        formatTime(time){
          return moment(time).format('HH:YY DD.MM.YYYY')
        },
        sendSubComment(id) {
           axios.post(r('userTask.index'), {
             params: {
               method: 'sendSubComment',
               param: {
                  id:id,
                  text:this.subCommentText,
               }
             }
           }).then((response) => {
             if (response.data.result) {
               this.subCommentText='';
               this.$vs.notify({ title: 'Успешно', text: 'Сообщение отправлено', color: 'success', position: 'top-center' })
               this.getData(this.$route.params.id)
             } else {
               this.$vs.notify({ title: 'Ошибка', text: 'Сообщение отправить не удалось', color: 'danger', position: 'top-center' })
             }
           }).catch(() => {
             this.$vs.notify({ title: 'Ошибка', text: 'Сообщение отправить не удалось', color: 'danger', position: 'top-center' })
           })
         },
        deleteSubMes(id,time){
            axios.post(r('userTask.index'), {
              params: {
                method: 'deleteSubMes',
                param: {
                  id:id,
                  time:time
                }
              }
            }).then((response) => {
              if (response.data.result) {
                this.$vs.notify({ title: 'Успешно', text: 'Сообщение удалено', color: 'success', position: 'top-center' })
                this.getData(this.$route.params.id)
              } else {
                this.$vs.notify({ title: 'Ошибка', text: 'Сообщение удалить не удалось', color: 'danger', position: 'top-center' })
              }
            }).catch(() => {
              this.$vs.notify({ title: 'Ошибка', text: 'Сообщение удалить не удалось', color: 'danger', position: 'top-center' })
            })
        },
        deleteMes(id) {
            axios.post(r('userTask.index'), {
                params: {
                    method: 'deleteMes',
                    param: id
                }
            }).then((response) => {
                if (response.data.result) {
                    this.$vs.notify({ title: 'Успешно', text: 'Сообщение удалено', color: 'success', position: 'top-center' })
                    this.getData(this.$route.params.id)
                } else {
                    this.$vs.notify({ title: 'Ошибка', text: 'Сообщение удалить не удалось', color: 'danger', position: 'top-center' })
                }
            }).catch(() => {
                this.$vs.notify({ title: 'Ошибка', text: 'Сообщение удалить не удалось', color: 'danger', position: 'top-center' })
            })
        },

        changeMessageRecive() {
            if (this.userTask.id != 'new') {
                if (this.userTask.recive_message) {
                    axios.post(r('userTask.index'), {
                        params: {
                            method: 'addUserSubscription',
                            param: {
                                id_development: this.$route.params.id,
                                id_user: this.User.id
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
                    axios.post(r('userTask.index'), {
                        params: {
                            method: 'deleteUserSubscription',
                            param: {
                                id_development: this.$route.params.id,
                                id_user: this.User.id
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
            }

        },

        SendMessage() {

            axios.post(r('userTask.index'), {
                params: {
                    method: 'sendMessage',
                    param: this.userTask
                }
            }).then((response) => {
                if (response.data.result) {
                    this.$vs.notify({ title: 'Успешно', text: 'Сообщение отправлено', color: 'success', position: 'top-center' })
                    this.getData(this.$route.params.id)
                } else {
                    this.$vs.notify({ title: 'Ошибка', text: 'Сообщение отправить не удалось', color: 'danger', position: 'top-center' })
                }
            }).catch(() => {
                this.$vs.notify({ title: 'Ошибка', text: 'Сообщение отправить не удалось', color: 'danger', position: 'top-center' })
            })

        },
        chooseFiles1() {
            let err = ''
            if (typeof this.userTask.name === 'undefined' || this.userTask.name === '') err += 'Введите название заявки; '
            if (typeof this.userTask.description === 'undefined' || this.userTask.description === '') err += 'Напишите описание заявки'
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
        downloadDocument() {
            this.$vs.loading({ color: '#ff8000' })
            axios.get(r('userTask.index'), {
                responseType: 'arraybuffer',

                params: {
                    method: 'getUserTaskFile',
                    param: this.userTask.id


                }
            }).then((response) => {


                const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }))
                let filename = response.headers['content-disposition'].replace('attachment; filename=', '')
                //console.log(filename);
                filename = filename.replace('_', '')
                filename = filename.split('; filename*=utf')[0]
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', this.userTask.filename)
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
        saveDocument(evt) {
            if(this.$route.params.id=='new'){
              this.document=evt.target.files[0]

            }else{
              const formData = new FormData()
              formData.append('document', evt.target.files[0])
              formData.append('filename', evt.target.files[0].name)
              formData.append('id', this.$route.params.id)
              formData.append('data', JSON.stringify(this.userTask))
              axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
              axios.post('/userTask/post-document',
                  formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  }
              ).then((response) => {
                if (response.data.result) {
                  this.userTask.filename = evt.target.files[0].name
                  if (response.data.id != this.$route.params.id) {
                    this.userTask.id = response.data.id
                    this.$router.push(`/task/${response.data.id}`)
                  }
                  this.$vs.notify({ title: 'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
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
            }


        },
        ...mapActions([
            'getTypeDevelopmentList', 'getStatusUserTaskList', 'getCrmSectionsAlls', 'saveDevelopmentTast', 'getDevelopmentBanner',
            'getDataUsers', 'getDevelopmentMsgBanner', 'getPriorDevelopmentList'
        ]),
        getData(id) {
            axios.get(r('userTask.index'), {
                params: {
                    method: 'getUserTaskOnce',
                    param: id

                }
            }).then((response) => {
                if (response.data.result) {



                    this.userTask = response.data.data
                    if(this.userTask.new_date!=null&&this.userTask.id_user==this.User.id){
                      this.$vs.dialog({
                        type: 'confirm',
                        color: 'danger',
                        title: 'Подтверждение',
                        text: `Исполнитель просит изменить срок на `+ moment(this.userTask.new_date).format('DD.MM.YYYY'),
                        accept: this.changeData,
                        cancel:this.changeCancel,
                        acceptText: 'Изменить',
                        cancelText: 'Отмена'
                      })
                    }
                } else {
                    this.close()
                }
            })
        },
        changeCancel(){
          this.userTask.new_date=null
          this.save();
        },
        changeData(){
          this.userTask.plan_date=this.userTask.new_date
          this.userTask.new_date=null
          this.save();
        },
        savePod() {
            this.userTask.id_status = 3;
            this.save();
        },
        saveRab() {
            this.userTask.id_status = 2;
            this.save();
        },
        save() {
            this.showSrok=false
            let err = ''
            if (typeof this.userTask.name === 'undefined' || this.userTask.name === '') err += 'Введите название заявки; '
            if (typeof this.userTask.description === 'undefined' || this.userTask.description === '') err += 'Напишите описание заявки'
            if (err !== '') {
                this.$vs.notify({
                    title: 'Ошибка',
                    text: err,
                    color: 'danger',
                    position: 'top-center'
                })
            } else {
                if(this.document==null){
                  axios.post(r('userTask.index'), {
                    params: {
                      method: 'saveUserTask',
                      param: this.userTask
                    }
                  }).then((response) => {
                    if (response.data.result) {
                      this.$vs.notify({ title: 'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                      if(this.userTask.id=='new'){
                        this.close()
                      }

                    } else {
                      this.$vs.notify({ title: 'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }
                  })
                }else{
                  const formData = new FormData()
                  formData.append('document', this.document)
                  formData.append('filename', this.document.name)
                  formData.append('id', this.$route.params.id)
                  formData.append('data', JSON.stringify(this.userTask))
                  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                  axios.post('/userTask/post-document',
                      formData, {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }
                      }
                  ).then((response) => {
                    if (response.data.result) {
                      this.userTask.filename = this.document.name
                      if (response.data.id != this.$route.params.id) {
                        this.userTask.id = response.data.id
                        this.$router.push(`/task/${response.data.id}`)
                      }
                      this.$vs.notify({ title: 'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
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
                }

            }
        },
        close() {
            this.$router.back()
        }
    }

}
</script>
<style scoped>
.comment_btn_row_right{
    display: flex;

}
.sub_comment {
    background: #c9c5f929;
    border-radius: 10px;
    padding: 10px 20px;
    margin-left: 50px;
}
.task_name{

}
.task_name .vs-input--input.normal{
    font-size: 21px!important;
    color: #626262;
}
.quoteUserMessage {
    cursor: pointer;
}

.time_wrapper {
    align-items: center;
}

.time_wrapper button.vs-button-primary {
    top: 3px;
}

.vs-con-input-label,
.con-select {
    width: auto;
}
</style>
<style>
.task_name .vs-input--input.normal{
    font-size: 21px!important;
    color: #626262;
}
.allert_checkbox .checkbox_x {
    width: 20px;
    height: 20px;
}

.removeMsg.feather-icon {
    transform: rotate(45deg);
    color: #a1a1a1;
}

h6.h6Blue.chatTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.ag-theme-material .ag-ltr .ag-cell {
    border-right: 1px solid #bfbfbf !important;
}

.ag-theme-material .ag-row {
    border-color: #bfbfbf !important;
}

.ag-header-cell,
.ag-header-group-cell {
    border-style: none none none none !important;
    border-right: 1px solid #babfc7 !important;
    border-bottom: 1px solid #babfc7 !important;
}

.ag-theme-alpine .ag-row {
    height: 47px !important;
}

.h6Blue {
    font-size: 12px;
    color: rgb(115, 103, 240);
}

.ag-root.ag-unselectable.ag-layout-normal {
    border: none !important;
}

.ag-header-cell,
.ag-header-group-cell {
    border-right: 1px solid #babfc7 !important;
}

.f {
    border: 1px;
    border-style: double;
    border-color: #62626262;
    border-radius: 8px;
    padding: 15px;
}

.ramkaZak {
    border-radius: 5px;
    box-shadow: 0 0 0 0.5px #ff4f00;
    margin: 5px auto;
    text-indent: 5px;
    overflow: hidden !important;
}

.ramka {
    border-radius: 5px;
    box-shadow: 0 0 0 0.5px rgb(204 204 204);
    margin: 5px auto;
    text-indent: 5px;
    overflow: hidden !important;
    padding: 15px;
}
.ramka img{
    width: 100%;
}
.ql-toolbar.ql-snow+.ql-container.ql-snow {
    border-top: 0;
    height: 300px;
}
</style>