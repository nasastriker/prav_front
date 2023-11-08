<template>
    <div>

        <div v-if="params.data.id_user === User.id">
            <span title="Убрать в архив" class="mr-2">
                <ArchiveIcon size="1.5x"  class="hover:text-primary cursor-pointer" @click="SendToArchive"></ArchiveIcon>
            </span>
            <span title="Удалить">
                <trash-2-icon size="1.5x"  class="hover:text-primary cursor-pointer" @click="confirmDeleteRecord"></trash-2-icon>
            </span>
        </div>
        <div v-else>
            <div v-if="params.data.status === 1" style="display: flex">
                <div title="Выполнить">
                    <check-icon size="1.5x" class="hover:text-primary cursor-pointer" @click="showDoneTask(1)"></check-icon>
                </div>
                <div title="Запросить корректировку срока" style="margin-left: 5px">
                    <clock-icon size="1.5x" class="hover:text-primary cursor-pointer" @click="showDoneTask(2)"></clock-icon>
                </div>
            </div>
        </div>


        <vs-popup classContent="popup-example" :title="label_isp" :active.sync="popupActiveDoneTask">
            <div style="margin-top: 10px" v-if="state_id === 1">Комментарий</div>
            <div v-else-if="state_id === 2">
                <div style="margin-top: 10px">Запрашиваемый срок</div>
                <vs-input type="date" class="w-100"  v-model="req_srok"></vs-input>
                <div style="margin-top: 10px">Причина</div>
            </div>
            <vs-textarea class="w-100"  v-model="user_comment" height="200px" > </vs-textarea>
            <vs-button color="success" class="pull-right" type="filled"  @click="doneTask" v-if="state_id === 1">Выполнить</vs-button>
            <vs-button color="success" class="pull-right" type="filled"  @click="doneTask" v-if="state_id === 2">Запросить</vs-button>
        </vs-popup>
    </div>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import { Trash2Icon,CheckIcon,ClockIcon,ArchiveIcon } from 'vue-feather-icons'
    import axios from "@/axios";
    import r from "@/route";
    export default {
        components: {
            Trash2Icon,
            CheckIcon,
            ClockIcon,
            ArchiveIcon,
        },
        data() {
            return {
                popupActiveDoneTask: false,
                user_comment: '',
                state_id: 0,
                label_isp: '',
                req_srok: '',
            }
        },
        methods: {
            ...mapActions([
                'doneTaskUser','SendDoneTaskOnesToArchive','getDataTasksUserOnes'
            ]),
            SendToArchive(){
                this.SendDoneTaskOnesToArchive({id_task:this.params.value}).then((val)=>{
                    if(val.result){
                        this.getDataTasksUserOnes()
                        this.$vs.notify({
                            color: 'success',
                            title: 'Сообщение',
                            text: 'Отправлена в архив',
                            position: 'top-center'
                        })
                    }
                    else{
                        this.$vs.notify({
                            color: 'danger',
                            title: 'Сообщение',
                            text: 'Ошибка при отправкt в архив!!!',
                            position: 'top-center'
                        })
                    }
                }).catch((e)=>{
                    this.$vs.notify({
                        color: 'danger',
                        title: 'Сообщение',
                        text: 'Ошибка при отправкt в архив!!!',
                        position: 'top-center'
                    })
                })
            },
            showDoneTask(state_id){
                this.state_id = state_id;
                if (state_id === 1){
                    this.label_isp = 'Исполнено'
                }
                if (state_id === 2){
                    this.label_isp = 'Запрос на корректировку срока'
                }
                this.popupActiveDoneTask = true;
            },
            doneTask(){
                if ((this.user_comment === '' || this.req_srok === '') && this.state_id === 2){
                    this.$vs.notify({
                        color: 'primary',
                        title: 'Сообщение',
                        text: 'Заполните поля: Запрашиваемый срок и Причина',
                        position: 'top-center'
                    })
                } else {
                    this.popupActiveDoneTask = false;
                    this.doneTaskUser({
                        id_task: this.params.data.id,
                        user_comment: this.user_comment,
                        user_req_srok: this.req_srok,
                        state_id: this.state_id
                    }).then((value) => {
                        if (value) {
                            this.params.refresh_func();
                        }
                    });
                }
            },
            confirmDeleteRecord() {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Удаление',
                    text: `Вы действительно хотите удалить ? `,
                    accept: this.deleteRecord,
                    acceptText: 'Удалить',
                    cancelText: 'Отмена'
                })
            },
            deleteRecord() {
                axios.post(r("userTask.update"), {
                  params: {
                    method: 'deleteTaskUserOnes',
                    param: this.params.data.id
                  }
                }).then((response) => {
                  if(response.data.result){
                    this.showDeleteSuccess()
                    this.params.refresh_func();
                  }
                  else{
                    this.showDeleteDanger()
                  }
                })
            },
            showDeleteSuccess() {
                this.$vs.notify({
                    color: 'success',
                    title: 'Сообщение',
                    text: 'Удален!!!',
                    position: 'top-center'
                })
            },
            showDeleteDanger() {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Сообщение',
                    text: 'Ошибка при удалении!!!',
                    position: 'top-center'
                })
            },
        },
        mounted(){
        },
        computed: {
            ...mapGetters([
                'User'
            ]),
        }
    }
</script>

<style lang="scss" scpoped>
</style>
