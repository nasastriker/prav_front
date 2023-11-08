<template>
    <div>
        <div>
            <h3 class="text-primary">{{ task_dat.status_normal }}</h3>
        </div>
        <div v-if="is_admin === 1 && task_dat.status === 3" style="background-color: #FFFFE0">
            <hr style="margin-bottom: 10px; margin-top: 10px; border: 1px solid #ADD8E6;">
            <div style="padding: 10px">
            <div v-if="task_dat.done === 1">
                <h5 class="text-success">Запрос на подтверждение - <b>Выполнено</b></h5>
                <div style="margin-top: 10px;margin-bottom: 10px">Комментарий: <span class="text-danger">{{ task_dat.user_comment }}</span></div>
            </div>
            <div v-else>
                <h5 class="text-success">Запрос на корректировку срока</h5>
                <div style="margin-top: 20px">Запрашиваемый срок: <b>{{ task_dat.user_request_date_normal }}</b></div>
                <div style="margin-top: 5px">Причина: <span class="text-danger">{{ task_dat.user_comment }}</span></div>
                <div style="margin-top: 15px">Ваш комментарий</div>
                <vs-textarea class="w-100"  v-model="admin_comment" height="200px" style="background-color: white"> </vs-textarea>
                <div style="margin-top: 10px">Ваша дата срока</div>
                <vs-input type="date" class="w-100"  v-model="admin_srok_plan" style="margin-bottom: 20px"></vs-input>
            </div>

            <vs-button color="primary" class="pull-right" type="filled"  @click="adminResponse(1)">Подтвердить</vs-button>
            <vs-button color="danger" class="pull-right" type="filled"  @click="adminResponse(2)">Отказать - Вернуть в работу</vs-button>
            </div>

            <hr style="margin-bottom: 10px; margin-top: 10px; border: 1px solid #ADD8E6;">
        </div>
        <div v-if="all === 1">
            <div style="margin-top: 10px">Сотрудник</div>
            <v-select  class="w-50 " :reduce="label => label.id" label="fio" :options="UsersArr" v-model="task_dat.id_user"></v-select>
        </div>
        <div v-if="is_admin !== 1 && task_dat.admin_comment" style="background-color: #FFFFE0">
            <hr style="margin-bottom: 10px; margin-top: 10px; border: 1px solid #ADD8E6;">
            <div style="padding: 15px">
                <div>Сообщение: <span class="text-danger">{{ task_dat.admin_comment }}</span></div>
            </div>
            <hr style="margin-bottom: 10px; margin-top: 10px; border: 1px solid #ADD8E6;">
        </div>
        <div style="margin-top: 10px">Название</div>
        <vs-input class="w-full mb-base" v-model="task_dat.name"></vs-input>
        <div style="margin-top: 10px">Делегировать</div>
        <v-select  class="w-50 " :reduce="label => label.id" label="f_i" :options="UsersArr" v-model="id_deleg"></v-select>
        <vs-button style="margin-top:10px" color="success" class="pull-right" type="filled"  @click="deleg">Делегировать</vs-button>
        <div style="margin-top: 10px">Раздел СРМ</div>
        <v-select  class="w-50 " :reduce="label => label.id" label="name" :options="CrmSectionsArr" v-model="task_dat.id_crm_section"></v-select>
        <div style="margin-top: 10px">Описание</div>


        <vue-editor  class="w-100"  v-model="task_dat.description" height="200px"></vue-editor>

        <div style="margin-top: 10px">Срок план</div>
        <vs-input type="date" class="w-100"  v-model="task_dat.srok_plan"></vs-input>
        <div style="margin-top: 10px" @click="logsShow">KPI план</div>
        <vs-input class="w-full mb-base" v-model="task_dat.kpi_plan"></vs-input>

      <div v-if="from_new">
        <h6 v-if="show_fname" style="margin-bottom: 10px">Файл: <b>{{ f_name }}</b> <span v-if="is_admin === 1 && task_dat.status !== 2" style="margin-left: 10px;color: red;cursor: pointer" @click="delFileNew">[ удалить ]</span></h6>
        <h6 v-else style="margin-bottom: 10px" class="hover:text-primary cursor-pointer" @click="addFile"> [ Добавить файл ]</h6>
      </div>
      <div v-else>
        <h6 v-if="task_dat.file_exist===1" style="margin-bottom: 10px">Файл: <b>{{ task_dat.file_name }} </b><a v-auth-href :href="url" style="margin-left: 10px;">[ Скачать ]</a> <span v-if="is_admin === 1 && task_dat.status !== 2" style="margin-left: 10px;color: red;cursor: pointer" @click="delFile">[ удалить ]</span></h6>
        <div v-else>
          <h6 v-if="is_admin === 1 && task_dat.status !== 2" style="margin-bottom: 10px" class="hover:text-primary cursor-pointer" @click="addFile">[ Добавить файл ]</h6>
        </div>
      </div>

      <div style="margin-top: 10px" v-if="is_admin === 1 && task_dat.status !== 2">
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
        </div>
        <vs-input id="filesUploadTask" type="file" ref="filesUploadTask" class="w-full mb-base"
                label-placeholder="file" v-on:change="saveFile($event)" style="display: none"/>
    </div>
</template>

<script>
    import r from '../../route';
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import axios from '../../axios'
    import vSelect from 'vue-select'
    import Vue from "vue";
    import VueAuthHref from "vue-auth-href";
    import { VueEditor, Quill } from "vue2-editor";
    import ImageResize from 'quill-image-resize-vue';
    const options = {
      token: () => `${localStorage.getItem('accessToken')}`
    }
    Vue.use(VueAuthHref, options)
    export default {
        components: {
            'v-select': vSelect,VueEditor
        },
        props:['is_admin', 'task_dat', 'id_user', 'from_new', 'show_fname', 'all','showEditorVue'],
        data () {
            return {
                id_deleg:null,
                admin_comment: '',
                admin_srok_plan: '',
                f_name: '',

            }
        },
        mounted(){
            this.getDataUsers()
        },

        computed: {
            ...mapGetters([
                'CrmSectionsArr', 'UsersArr'
            ]),
          url(){
            return '/task_upload/?id_task='+this.task_dat.id;
          }
        },
        methods: {
            ...mapActions([
                'saveTaskUser', 'adminResponseTaskUser','saveUploadFilesForTaskServ','deleteTaskFile','deleteTaskFileNew',
                'getUploadFilesForTaskServ','getMimeFile','getDataUsers'
            ]),
          logsShow(){
            console.log(this.task_dat);
          },
          delFile(){
            this.deleteTaskFile(this.task_dat.path_to_delete).then((response) => {
                  if (response){
                    this.task_dat.file_exist = 0;
                    this.task_dat.file_name = null;
                    this.task_dat.file_path = null;
                    this.task_dat.path_to_delete = null;
                    this.show_fname = false;
                    this.f_name = '';
                    this.$refs['filesUploadTask'].value = null
                    this.save2();
                  } else {
                    this.$vs.notify({
                      title: 'Ошибка',
                      text: 'Ошибка удаления',
                      color: 'danger',
                      position: 'top-center'
                    })
                  }
            })
          },
          delFileNew(){
            this.deleteTaskFileNew(this.task_dat.file_path).then((response) => {
              if (response){
                this.task_dat.file_exist = 0;
                this.task_dat.file_name = null;
                this.task_dat.file_path = null;
                this.task_dat.path_to_delete = null;
                this.show_fname = false;
                this.f_name = '';
                this.$refs['filesUploadTask'].value = null
              } else {
                this.$vs.notify({
                  title: 'Ошибка',
                  text: 'Ошибка удаления',
                  color: 'danger',
                  position: 'top-center'
                })
              }
            })
          },
          addFile(){
            document.getElementById("filesUploadTask").click()
          },
          saveFile(evt) {
            this.saveUploadFilesForTaskServ({files: evt.target.files}).then((response) => {
              if (response.result){
                this.task_dat.file_name = response.data.file_names[0].short_name;
                this.task_dat.file_path = response.data.file_names[0].path_to_file;
                this.task_dat.file_exist = 1;
                this.task_dat.copy_to_dir = true;
                this.show_fname = true;
                this.f_name = response.data.file_names[0].short_name;
              } else {
                this.$vs.notify({
                  title: 'Ошибка',
                  text: response.err_message,
                  color: 'danger',
                  position: 'top-center'
                })
              }
            }).catch(error => {
              this.$vs.notify({
                title: 'Ошибка',
                text: error.message,
                color: 'danger',
                position: 'top-center'
              })
            });
          },

            adminResponse(state_id){
                this.adminResponseTaskUser({
                    id_task: this.task_dat.id,
                    admin_comment: this.admin_comment,
                    admin_srok_plan: this.admin_srok_plan,
                    state_id: state_id,
                }).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$emit('closeAfterSave');
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }
                })
            },
            deleg(){
                this.task_dat.id_deleg=this.task_dat.id_user;
                this.task_dat.id_user=this.id_deleg;

                this.saveTaskUser(this.task_dat).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })
                        this.$emit('closeAfterSave');
                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }
                })
            },
            save(){
              if (this.task_dat.id_user > 0) {
                if (this.all !== 1) {
                  this.task_dat.id_user = this.id_user;
                }
                this.saveTaskUser(this.task_dat).then((response) => {
                  if (response) {
                    this.$vs.notify({title: 'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center'})
                    this.$emit('closeAfterSave');
                  } else {
                    this.$vs.notify({
                      title: 'Ошибка',
                      text: 'Сохранить не удалось !!!',
                      color: 'danger',
                      position: 'top-center'
                    })
                  }
                })
              } else {
                this.$vs.notify({
                  title: 'Сообщение',
                  text: 'Выберите сотрудника!',
                  color: 'primary',
                  position: 'top-center'
                })
              }
            },
          save2(){
            if (this.all !== 1){
              this.task_dat.id_user=this.id_user;
            }
            this.saveTaskUser(this.task_dat);
          },
        },
    }
</script>
