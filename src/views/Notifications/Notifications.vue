<template>
    <vx-card no-shadow style="min-height: 95vh;">
        <div class="vx-row">
            <div class="vx-col w-full">
                <div style="display: flex;margin-bottom: 30px">
                    <div style="display: flex">
                        <UserAvatar :user_initials="initials_user"></UserAvatar>
                        <div style="margin-left: 10px; font-size: 16px;display: table;">
                            <h3 style="display: table-cell;vertical-align: middle;">{{ User.name_family }} {{ User.name }} {{ User.name_patronymic }}</h3>
                        </div>
                    </div>
                </div>

                <div class="actions_row">
                    <div class="check_box_wrapper mr-5">
                        <vs-checkbox class="allert_checkbox">Выделить все</vs-checkbox>
                    </div>
                    <div class="actions_select">
                        <div>
                            <h6 class="h6Blue mb-1">Действия</h6>
                            <v-select :disabled="!isMy" class="w-50 " style="margin-bottom: 10px" :reduce="label => label.id" label="f_i" :options="UsersArr" v-model="userTask.id_contractor"></v-select>
                        </div>
                        <vs-button class="ml-4">Применить</vs-button>
                    </div>
                </div>
                <fieldset class="f">
                    <div class="notification_item active">
                        <div class="check_box_wrapper mr-4">
                            <vs-checkbox class="allert_checkbox"></vs-checkbox>
                        </div>
                        <div class="notification_item_wrapper">
                            <div class="close_notification_item">
                                <feather-icon icon="XIcon" class="cursor-pointer"></feather-icon>
                            </div>
                            <div style="display: flex;margin-bottom: 30px">
                                <div style="display: flex">
                                    <UserAvatar class="mr-4" :user_initials="initials_user"></UserAvatar>
                                    <div>
                                        <h2><span class="new_task_title">Новая задача: </span>Разработка раздела “Регистрация судебных актов”</h2>
                                        <ul class="mt-4 mb-4">
                                            <li><span>Постановщик:</span><a href="">Дриневский Сергей</a></li>
                                            <li><span>Исполнитель:</span><a href="">Петров Пётр Петрович</a></li>
                                            <li><span>Соисполнитель:</span><a href="">Иванов Иван Иванович</a></li>
                                            <li><span>Наблюдатель:</span><a href="">Бринзевич Наталья</a></li>
                                        </ul>

                                        <div class="date">
                                            18 апреля 12:00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <vs-button class="mr-4">Перейти к задаче</vs-button>
                                <vs-button  type="border">Просмотрено</vs-button>
                            </div>
                        </div>
                    </div>

                    <div class="notification_item">
                        <div class="check_box_wrapper mr-4">
                            <vs-checkbox class="allert_checkbox"></vs-checkbox>
                        </div>
                        <div class="notification_item_wrapper">
                            <div class="close_notification_item">
                                <feather-icon icon="XIcon" class="cursor-pointer"></feather-icon>
                            </div>
                            <div style="display: flex;margin-bottom: 30px">
                                <div style="display: flex">
                                    <UserAvatar class="mr-4" :user_initials="initials_user"></UserAvatar>
                                    <div>
                                        <h2><span class="new_task_title">Добавлен комментарий к задаче: </span>Блок «Рабочий Профиль»</h2>
                                        <p class="notification_item_quote mt-4">“Поправить графы на странице, чтобы не убегали при уменьшении размера экрана”</p>
                                        <ul class="mt-4 mb-4">
                                            <li><span>oт:</span><a href="">Петров Пётр Петрович</a></li>
                                        </ul>
                                        <div class="date">
                                            18 апреля 12:00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <vs-button class="mr-4">Перейти к задаче</vs-button>
                                <vs-button  type="border">Просмотрено</vs-button>
                            </div>
                        </div>
                    </div>

                    <div class="notification_item active">
                        <div class="check_box_wrapper mr-4">
                            <vs-checkbox class="allert_checkbox"></vs-checkbox>
                        </div>
                        <div class="notification_item_wrapper">
                            <div class="close_notification_item">
                                <feather-icon icon="XIcon" class="cursor-pointer"></feather-icon>
                            </div>
                            <div style="display: flex;margin-bottom: 30px">
                                <div style="display: flex">
                                    <UserAvatar class="mr-4" :user_initials="initials_user"></UserAvatar>
                                    <div>
                                        <h2><span class="new_task_title">Изменения в задаче: </span>Корректировка текущего функционала</h2>
                                        <div class="mt-4 mb-4">
                                            <ol>
                                                <li>Фильтр по статусам задач</li>
                                                <li>Фильтр по крайнему сроку</li>
                                            </ol> 
                                        </div>
                                        <ul class="mt-4 mb-4">
                                            <li><span>oт:</span><a href="">Петров Пётр Петрович</a></li>
                                        </ul> 

                                        <div class="date">
                                            18 апреля 12:00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <vs-button class="mr-4">Перейти к задаче</vs-button>
                                <vs-button  type="border">Просмотрено</vs-button>
                            </div>
                        </div>
                    </div>

                    <div class="notification_item">
                        <div class="check_box_wrapper mr-4">
                            <vs-checkbox class="allert_checkbox"></vs-checkbox>
                        </div>
                        <div class="notification_item_wrapper">
                            <div class="close_notification_item">
                                <feather-icon icon="XIcon" class="cursor-pointer"></feather-icon>
                            </div>
                            <div style="display: flex;margin-bottom: 30px">
                                <div style="display: flex">
                                    <UserAvatar class="mr-4" :user_initials="initials_user"></UserAvatar>
                                    <div>
                                        <h2><span class="new_task_title">Добавлен комментарий к задаче: </span>Блок «Рабочий Профиль»</h2>
                                        <p class="notification_item_quote mt-4">“Поправить графы на странице, чтобы не убегали при уменьшении размера экрана”</p>
                                        <ul class="mt-4 mb-4">
                                            <li><span>oт:</span><a href="">Петров Пётр Петрович</a></li>
                                        </ul>
                                        <div class="date">
                                            18 апреля 12:00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <vs-button class="mr-4">Перейти к задаче</vs-button>
                                <vs-button  type="border">Просмотрено</vs-button>
                            </div>
                        </div>
                    </div>

                    <div class="notification_item active">
                        <div class="check_box_wrapper mr-4">
                            <vs-checkbox class="allert_checkbox"></vs-checkbox>
                        </div>
                        <div class="notification_item_wrapper">
                            <div class="close_notification_item">
                                <feather-icon icon="XIcon" class="cursor-pointer"></feather-icon>
                            </div>
                            <div style="display: flex;margin-bottom: 30px">
                                <div style="display: flex">
                                    <UserAvatar class="mr-4" :user_initials="initials_user"></UserAvatar>
                                    <div>
                                        <h2><span class="new_task_title">Новая задача: </span>Разработка раздела “Регистрация судебных актов”</h2>
                                        <ul class="mt-4 mb-4">
                                            <li><span>Постановщик:</span><a href="">Дриневский Сергей</a></li>
                                            <li><span>Исполнитель:</span><a href="">Петров Пётр Петрович</a></li>
                                            <li><span>Соисполнитель:</span><a href="">Иванов Иван Иванович</a></li>
                                            <li><span>Наблюдатель:</span><a href="">Бринзевич Наталья</a></li>
                                        </ul>

                                        <div class="date">
                                            18 апреля 12:00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <vs-button class="mr-4">Перейти к задаче</vs-button>
                                <vs-button  type="border">Просмотрено</vs-button>
                            </div>
                        </div>
                    </div>

                 </fieldset>
                 
            </div>
        </div>
        </vs-tabs>
    </vx-card>
</template>
<script>
import r from '../../route'
import { mapActions, mapGetters } from 'vuex'
import axios from '../../axios'
import vSelect from 'vue-select'
import { VueEditor, Quill } from 'vue2-editor'
import ImageResize from 'quill-image-resize-vue'
import UserAvatar from "../Avatar/UserAvatar.vue";

Quill.register('modules/imageResize', ImageResize)
export default {
    components: {
        vSelect,
        VueEditor,
        UserAvatar
    },
    data() {
        return {
            crm: false,
            customToolbar: [
                []
            ],
            userTask: {
                chat: {}
            },
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
            this.label = 'Новая заявка'
        }

    },

    computed: {
        initials_user(){
            let inits = '';
       //     console.log(this.User.name_family);
            if (this.User.name_family !== null){
                inits = inits + this.User.name_family.charAt(0);
            }
            if (this.User.name !== null){
                inits = inits + this.User.name.charAt(0);
            }
            return inits;
        },
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

        }
    }

}
</script>
<style scopped>
.actions_row {
    display: flex;
    align-items: center;
    padding-left: 35px;
}
.actions_select {
    display: flex;
    align-items: center;
}
.actions_select .v-select{
    min-width: 200px;
}
.actions_select .vs-button{
    padding: 10px 20px!important;
    top: 3px;
}
.notification_item_wrapper {
    padding: 20px;
    border: 1px solid #cdcdcd;
    width: 100%;
    box-shadow: 2px 2px 5px #cdcdcd;
    border-radius: 10px;
    position: relative;
}
.notification_item {
    padding: 20px;
    display: flex;
}
.notification_item.active{
    display: flex;
}
.notification_item.active .notification_item_wrapper{
    border: 1px solid #7367f0;
    box-shadow: 2px 2px 5px #7367f094;
    background: #7367f01f;
}
.notification_item.active button.vs-button-border {
    background: #fff!important;
}
.notification_item.activ .close_notification_item {
    color: #fff;
}

.notification_item.activ .vs-button-primary.vs-button-border:hover {
    background: rgba(var(--vs-primary),.08)!important;
}

.notification_item h2{
    color: #7367f0;
}
.notification_item ol{
    list-style: auto;
    padding-left: 20px;
}
.close_notification_item{
    position: absolute;
    right: 20px;
    color: #ccc;
    transition: all .4s;
}
.close_notification_item:hover{
    color: #838383;
}
.notification_item ul li span{
    margin-right: 10px;
}
</style>
<style >
.f {
    border: 1px;
    border-style: double;
    border-color: #62626262;
    border-radius: 8px;
    padding: 15px;
}
[dir] .vs-button:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large).vs-button-border {
    padding: 0.85rem 2rem;
}
#content-area {
    height: 100%;
    max-height: 100vh;
    overflow: hidden;
}
</style>		