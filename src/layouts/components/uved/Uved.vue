<template>
    <div id="help-customizer">
        <vs-button @click.stop="changeAct" :color="ColorUved" style="margin-top: -40px;" type="filled" class="customizer-btn animate-me" icon-pack="feather" icon="icon-bell" />
        <vs-sidebar click-not-close hidden-background position-right v-model="active" class="items-no-padding">
            <div class="h-full">
                <div class="customizer-header mt-6 flex items-center justify-between px-6">
                    <div>
                        <h4>Уведомления</h4>
                    </div>
                    <feather-icon icon="XIcon" @click.stop="active = false" class="cursor-pointer"></feather-icon>
                </div>
                <vs-divider class="mb-0" />
                <div class="sidebar_notifications_wrapper scroll-area--customizer" :is="scrollbarTag">
                    <vx-card no-shadow style="min-height: 95vh;">
                        <div class="vx-row">
                            <div class="vx-col w-full">
                                <div class="actions_row">
                                    <div class="check_box_wrapper mr-5">
                                        <vs-checkbox class="allert_checkbox" v-model="notRead">Не прочитанные</vs-checkbox>
                                        <vs-checkbox class="allert_checkbox"  v-model="selectAllCheck" @input="selectAll">Выделить все</vs-checkbox>
                                    </div>
                                    <div class="actions_select">
                                        <div>
                                            <h6 class="h6Blue mb-1">Действия</h6>
                                            <v-select  class="w-50 " style="margin-bottom: 10px"  label="f_i" :options="arrAction" v-model="taskAction"></v-select>
                                        </div>
                                        <vs-button class="ml-4" @click="goAction">Применить</vs-button>
                                    </div>
                                </div>
                                <fieldset class="f">
                                    <template v-for="item in UvedUsersLocal" >
                                      <div class="notification_item " :class="{active: !item.status}" >
                                        <div class="check_box_wrapper mr-4">
                                          <vs-checkbox class="allert_checkbox" v-model="item.check"></vs-checkbox>
                                        </div>
                                        <div class="notification_item_wrapper">
                                          <div class="close_notification_item">
                                            <feather-icon icon="XIcon" class="cursor-pointer" @click="deleteUved(item)"></feather-icon>
                                          </div>
                                          <div style="display: flex;margin-bottom: 30px">
                                            <div style="display: flex">
                                              <UserAvatar class="mr-4" :user_initials="initials_user"></UserAvatar>
                                              <div>
                                                <h2><span class="new_task_title">{{ item.text}}</span></h2>
                                                <ul class="mt-4 mb-4">
                                                </ul>
                                                <div class="date">
                                                  {{moment(item.created_at).format('HH:MM DD.MM.YYYY')}}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div>
                                            <vs-button class="mr-4" v-if="item.is_task" @click="goTask(item.id_task)">Перейти к задаче</vs-button>
                                            <vs-button type="border" @click="showUved(item)">Просмотрено</vs-button>
                                          </div>
                                        </div>
                                      </div>

                                    </template>
                                   <!-- <div class="notification_item active">
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
                                                <vs-button type="border">Просмотрено</vs-button>
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
                                                <vs-button type="border">Просмотрено</vs-button>
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
                                                <vs-button type="border">Просмотрено</vs-button>
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
                                                <vs-button type="border">Просмотрено</vs-button>
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
                                                <vs-button type="border">Просмотрено</vs-button>
                                            </div>
                                        </div>
                                    </div>
                                    -->
                                </fieldset>
                            </div>
                        </div>
                    </vx-card>
                </div>
            </div>
        </vs-sidebar>
    </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { mapActions, mapGetters,mapMutations } from 'vuex'
import r from '../../../route';
import axios from '../../../axios';
import UserAvatar from "../../../views/Avatar/UserAvatar.vue";
import moment from 'moment';
export default {
    components: {
        UserAvatar,
        VuePerfectScrollbar
    },
    props: {
        footerType: { type: String, required: true },
        hideScrollToTop: { type: Boolean, required: true },
        navbarType: { type: String, required: true },
        navbarColor: { type: String, required: true, default: '#fff' },
        routerTransition: { type: String, required: true }
    },
    data() {
        return {
            selectAllCheck:false,
            notRead:false,
            arrAction:[
                'Пометить прочитанным','Удалить'
            ],
            taskAction:null,
            arr: [],
            col: 'primary',
            showV: true,
            editEd: false,
            act: true,
            active: false,
            crm: false,
            customToolbar: [
                []
            ],
            userTask: {
                chat: {}
            },

        }
    },

    computed: {
        initials_user(){
            let inits = '';

            if (this.User.name_family !== null){
                inits = inits + this.User.name_family.charAt(0);
            }
            if (this.User.name !== null){
                inits = inits + this.User.name.charAt(0);
            }
            return inits;
        },
        UvedUsersLocal(){
          if(!this.notRead){
             return  this.UvedUsers
          }else{
            const $arr = []
            for (let i = 0; i < this.UvedUsers.length; i++) {
              if (this.UvedUsers[i].status==0)$arr.push(this.UvedUsers[i])
            }
            return $arr
          }

        },
        scrollbarTag () { return this.$store.state.is_touch_device ? 'div' : 'VuePerfectScrollbar' },
        ...mapGetters(['User','UvedUsers','TotalUveds','ColorUved'])


    },
    mounted() {
        this.getDataUsers()
        this.getUvedUsers(this.User.id)
    },

    methods: {
        goAction(){
          axios.post(r("userUved.index"), {
            params: {
              method: 'doAction',
              param: {
                arr:this.UvedUsers,
                action:this.taskAction
              }
            }
          }).then((response) => {
            if (response.data.result) {
              this.getUvedUsers(this.User.id)

            }
          })
        },
        selectAll(){
          const $arr = []
          for (let i = 0; i < this.UvedUsers.length; i++) {
            this.UvedUsers[i].check=this.selectAllCheck
            $arr.push(this.UvedUsers[i])
          }

          this.setUveds($arr)

        },
        goTask(id){
          this.active = !this.active
          this.$router.push('/task/'+id)
        },
        moment: function () {
          return moment();
        },
        changeAct() {
            this.active = !this.active
            this.setUvedColorsChange('primary')
            if (this.active) {
                this.selectAllCheck=false
                this.getUvedUsers(this.User.id)
            }
        },
        deleteUved(item){
          axios.post(r("userUved.index"), {
            params: {
              method: 'deleteUserUved',
              param: item.id
            }
          }).then((response) => {
            if (response.data.result) {

              this.delUvedUsers(item)
            }
          })
        },
        showUved(item){
          axios.post(r("userUved.index"), {
            params: {
              method: 'showUserUved',
              param: item.id
            }
          }).then((response) => {
            if (response.data.result) {
              item.status=1
              this.updateUvedUsers(item)
            }
          })
        },
        ...mapMutations(['updateUvedUsers','delUvedUsers','setUvedColorsChange','setUveds']),

        ...mapActions([
            'setDataUser','getUvedUsers','getDataUsers'
        ]),
    },

}
</script>
<style lang="scss">
.ql-editor.ql-blank {
    max-height: 80vh;
}

.active {
    display: none;
}

#help-customizer {
    .vs-sidebar {
        position: fixed;
        z-index: 52000;
        max-width: 90vw;
        // @apply shadow-lg;
        box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
    }
}

.customizer-btn {
    position: fixed;
    top: 50%;
    right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    z-index: 50000;

    .vs-icon {
        animation: spin 1.5s linear infinite;
    }
}

.scroll-area--customizer {
    height: calc(100% - 5rem);

    &:not(.ps) {
        overflow-y: auto;
    }
}
</style>
<style scopped>
.notification_item {
    padding: 20px 10px 20px 0;
    display: flex;
}
.sidebar_notifications_wrapper{
    height: calc(100vh - 60px);
    overflow: auto;
    padding-bottom: 50px;
}
.actions_row {
    display: flex;
    align-items: center;
    padding-left: 16px;
}

.actions_select {
    display: flex;
    align-items: center;
}

.actions_select .v-select {
    min-width: 200px;
}

.actions_select .vs-button {
    padding: 10px 20px !important;
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

.notification_item.active {
    display: flex;
}

.notification_item.active .notification_item_wrapper {
    border: 1px solid #7367f0;
    box-shadow: 2px 2px 5px #7367f094;
    background: #7367f01f;
}

.notification_item.active button.vs-button-border {
    background: #fff !important;
}

.notification_item.activ .close_notification_item {
    color: #fff;
}

.notification_item.activ .vs-button-primary.vs-button-border:hover {
    background: rgba(var(--vs-primary), .08) !important;
}

.notification_item h2 {
    color: #7367f0;
}

.notification_item ol {
    list-style: auto;
    padding-left: 20px;
}

.close_notification_item {
    position: absolute;
    right: 20px;
    color: #ccc;
    transition: all .4s;
}

.close_notification_item:hover {
    color: #838383;
}

.notification_item ul li span {
    margin-right: 10px;
}
</style>
<style>
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