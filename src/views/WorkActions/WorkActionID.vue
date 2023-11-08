<template>
    <vx-card no-shadow>
        <h6 class="mb-1">{{label}} </h6>
        <vs-input class="w-full mb-4" v-model="workAction.name"></vs-input>
        <h6 class="mb-1">Раздел СРМ</h6>
        <v-select  class="w-50 mb-4" :reduce="label => label.id" label="name" :options="CrmSectionsArr" v-model="workAction.id_crm_section"></v-select>
        <h6 class="mb-1">Таблица БД</h6>
        <v-select  class="w-50 mb-4" :options="DbTablesArr" v-model="workAction.tabel_name"></v-select>
        <h6 class="mb-1">Переменная</h6>
        <vs-input class="w-full mb-4" v-model="workAction.peremen_name"></vs-input>
        <h6 class="mb-1">Кол-во переменных</h6>
        <vs-input class="w-full mb-4" v-model="workAction.peremen_col"></vs-input>
        <div style="display:flex;" class="mb-4">
            <div style="display: flex; flex-direction: column; flex-grow: 1; margin-right: 20px">
              <h6 class="mb-1">KPI неделя</h6>
              <vs-input class="w-full" v-model="workAction.kpi_week"></vs-input>
            </div>
            <div style="display: flex; flex-direction: column; flex-grow: 1; margin-right: 20px">
              <h6 class="mb-1">KPI месяц</h6>
              <vs-input class="w-full" v-model="workAction.kpi_month"></vs-input>
            </div>
            <div style="display: flex; flex-direction: column; flex-grow: 1">
              <h6 class="mb-1">KPI всего</h6>
              <vs-input class="w-full" v-model="workAction.kpi_all"></vs-input>
            </div>
        </div>
        <div v-if="workAction.instruction_file_name" class="mb-4">
            <div style="display:flex;">
                <div>Инструкция: </div>
                <div style="margin-left: 10px;margin-right: 10px;color: red" @click="downloadDocument(workAction.instruction_file_name)" class="hover:text-primary cursor-pointer">{{ workAction.instruction_file_name }}</div>
                <vs-checkbox v-model="updInstr">Обновить инструкцию</vs-checkbox>
            </div>
        </div>
        <div v-else class="mb-4">
            <vs-checkbox v-model="addInstr">Добавить инструкцию</vs-checkbox>
        </div>
        <div class="mb-4">
            <vs-button color="primary"  class="pull-right mr-4" type="filled"  @click="$router.push('/work_actions/')">Закрыть</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
        </div>
        <input type="file" ref="fileDirInput" class="hidden" accept=".pdf" @change="changeFileDir($event)">

<!--        <vs-tabs alignment="center" color="success" v-if="$route.params.id !== 'new'">-->
<!--            <vs-tab label="НАЗНАЧИТЬ ЕЖЕНЕДЕЛЬНОЕ РАБОЧЕЕ ДЕЙСТВИЕ СОТРУДНИКАМ">-->
<!--                <UserTaskAdminIdUsers :id_wa="$route.params.id"></UserTaskAdminIdUsers>-->
<!--            </vs-tab>-->
<!--        </vs-tabs>-->
      <div v-if="$route.params.id !== 'new'">
        <span style="margin-bottom: 10px; padding-bottom: 10px; border-bottom: 2px solid rgb(40,199,111); display: flex; justify-content: center; align-items: center; ; color: rgb(40,199,111);">НАЗНАЧИТЬ ЕЖЕНЕДЕЛЬНОЕ РАБОЧЕЕ ДЕЙСТВИЕ СОТРУДНИКАМ</span>
        <UserTaskAdminIdUsers :id_wa="$route.params.id"></UserTaskAdminIdUsers>
      </div>
    </vx-card>
</template>

<script>
    import r from '../../route';
    import vSelect from 'vue-select'
    import { mapActions,mapGetters } from 'vuex'
    import axios from '../../axios'
    import UserTaskAdminIdUsers from "../Task/UserTaskAdminIdUsers.vue";
    export default {
        components: {
            'v-select': vSelect,
            UserTaskAdminIdUsers
        },
        data () {
            return {
                label:'Редактирование Рабочего действия:',
                addInstr: false,
                updInstr: false,
                workAction:{
                },
            }
        },
        mounted(){
            if (this.$route.params.id){
                if (this.$route.params.id!='new') {
                    this.getData(this.$route.params.id);
                    this.label='Редактирование Рабочего действия:'
                }
                else{
                    this.label='Новое Рабочее действие'
                }
            }
            this.getDataCrmSections();
            this.getDbTables();
        },
        computed: {
            ...mapGetters([
                'CrmSectionsArr', 'DbTablesArr'
            ]),
        },
        methods: {
            ...mapActions([
                'saveWorkAction', 'getDataCrmSections', 'saveFileForImportServDir','getDbTables'
            ]),
            downloadDocument(val){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("workActions.index"), {
                    responseType: 'arraybuffer',
                    params: {
                        method: 'getInstructionFileByPath',
                        param:this.$route.params.id
                    }
                }).then((response) => {
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/pdf;charset=UTF-8;' }));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', val);
                    document.body.appendChild(link);
                    link.click();
                    this.$vs.loading.close()
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
            getData(id){
                axios.get(r("workActions.index"), {
                    params: {
                        method: 'getWorkAction',
                        param: id
                    }
                }).then((response) => {
                    if (response.data.result){
                        this.workAction=response.data.data
                    }
                })
            },
            save(){
                this.workAction.id=this.$route.params.id;
                if (this.addInstr || this.updInstr){
                    this.$refs.fileDirInput.click()
                } else {
                    this.saveWorkAction({resp: null, wa: this.workAction}).then((response) => {
                        if (response) {
                            this.$vs.notify({
                                title: 'Успешно',
                                text: 'Сохранено!!!',
                                color: 'success',
                                position: 'top-center'
                            })
                            this.$router.push('/work_actions/')
                        } else {
                            this.$vs.notify({
                                title: 'Ошибка',
                                text: 'Сохранить не удалось !!!',
                                color: 'danger',
                                position: 'top-center'
                            })
                        }
                    })
                }
            },
            changeFileDir(evt) {
                this.saveFileForImportServDir({files: evt.target.files, dir: 'app/instructions/'}).then((response) => {
                    if (response.result) {
                        this.$refs['fileDirInput'].value = null
                        this.saveWorkAction({resp: response, wa: this.workAction}).then((response) => {
                            if (response) {
                                this.$vs.notify({
                                    title: 'Успешно',
                                    text: 'Сохранено!!!',
                                    color: 'success',
                                    position: 'top-center'
                                })
                                this.$router.push('/work_actions/')
                            } else {
                                this.$vs.notify({
                                    title: 'Ошибка',
                                    text: 'Сохранить не удалось !!!',
                                    color: 'danger',
                                    position: 'top-center'
                                })
                            }
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
        },
    }
</script>
