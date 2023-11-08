    <template>
    <div>
        <div v-if="User.role_id === 1">
          <div v-if="user_state == 1">
            <div v-for="one_user in UsersArr">
              <UserOneEl :one_user="one_user" @clickToUser="clickToUser(one_user)"></UserOneEl>
            </div>
          </div>
          <div v-else-if="user_state == 2">

            <div style="display: flex;margin-top: 20px;" class="hover:text-primary cursor-pointer" @click="goBack">
              <div>
                <div style="display: table;margin-top: 5px">
                  <arrow-left-icon size="2x" class="custom-class"></arrow-left-icon>
                </div>
              </div>
              <div style="margin-left: 5px; font-size: 16px;display: table;">
                <div style="display: table-cell;vertical-align: middle;">Назад</div>
              </div>
            </div>


            <UserOneEl :one_user="user_data"></UserOneEl>
            <vs-tabs alignment="fixed" color="success" style="margin-top: 20px">
              <vs-tab label="НАЗНАЧИТЬ ЕЖЕНЕДЕЛЬНЫЕ РАБОЧИЕ ДЕЙСТВИЯ СОТРУДНИКУ">
                <UserTaskAdminId :id_user="id_user"></UserTaskAdminId>
              </vs-tab>
            </vs-tabs>
            <vs-tabs alignment="fixed" color="warning" style="margin-top: 20px">
              <vs-tab label="ЕЖЕНЕДЕЛЬНЫЕ РАБОЧИЕ ДЕЙСТВИЯ СОТРУДНИКА">
                <UserTask :id_user="id_user" :is_admin="1"></UserTask>
              </vs-tab>
            </vs-tabs>

          </div>
        </div>
        <div v-else>
          <UserTask></UserTask>
        </div>

    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import UserOneEl from "./UserOneEl.vue";
import UserTaskAdminId from "./UserTaskAdminId.vue";
import UserTaskOnes from "./UserTaskOnes.vue";
import UserTask from "./UserTask.vue";
import {VideoIcon, ArrowLeftIcon} from 'vue-feather-icons'

export default {
    components: {
        UserOneEl,
        UserTaskAdminId,
        UserTaskOnes,
        UserTask,
        VideoIcon,
        ArrowLeftIcon
    },
    data() {
        return {
            user_state: 1,
            id_user: 0,
            fio: ''
        }
    },

    computed: {
        ...mapGetters([
            'UsersArr','User'
        ]),
    },
    methods: {
        goBack(){
            this.user_state = 1;
        },
        clickToUser(data){
            this.user_data = data;
            this.id_user = data.id;
            this.user_state = 2;
        },
        ...mapActions([
            'getDataUsersNoAdmin'
        ]),
    },
    mounted() {
        this.getDataUsersNoAdmin();
    }
}

</script>

<style lang="scss">
#page-user-list {
    .user-list-filters {
        .vs__actions {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-58%);
        }
    }
}
.one-user-shapka {
    display: flex;
    background-color: #EEDDFF;
    margin-top: 5px;
    border-radius: 5px;
    color: #1f2b7b;
    margin-bottom: 20px;
}
</style>
