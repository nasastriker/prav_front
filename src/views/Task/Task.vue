<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div v-if="razr === 1">
                <h1>Данный раздел находится в разработке</h1>
            </div>
            <div v-else>
             <div style="display: flex;margin-bottom: 30px">
                 <div style="display: flex">
                     <UserAvatar :user_initials="initials_user"></UserAvatar>
                     <div style="margin-left: 10px; font-size: 16px;display: table;">
                         <h3 style="display: table-cell;vertical-align: middle;">{{ User.name_family }} {{ User.name }} {{ User.name_patronymic }}</h3>
                     </div>
                 </div>
             </div>
                <vs-tabs>
                  <vs-tab label="Разовые задачи">
                    <UserTaskOnesAllNew></UserTaskOnesAllNew>
                  </vs-tab>

                  <vs-tab label="Периодические рабочие действия">
                    <UserTaskAdmin></UserTaskAdmin>
                  </vs-tab>


            </vs-tabs>
            </div>
        </div>
    </div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import UserTask from "./UserTask.vue";
import UserTaskOnes from "./UserTaskOnes.vue";
import UserTaskOnesAll from "./UserTaskOnesAll.vue";
import UserTaskOnesAllNew from "./UserTaskOnesAllNew.vue";
import UserTaskAdmin from "./UserTaskAdmin.vue";
import Status from "../Handbook/Status.vue";
import UserAvatar from "../Avatar/UserAvatar.vue";

export default {
    components: {
        UserTask,
        UserTaskOnes,
        UserTaskOnesAll,
      UserTaskOnesAllNew,
        UserTaskAdmin,
        Status,
        UserAvatar
    },
    data() {
        return {
            razr: 0
        }
    },

    computed: {
        label_tab() {
            if (this.User.role_id === 1) {
                return 'Сотрудники'
            } else {
                return 'Задачи'
            }
        },
        user_id_n() {
            return this.User.id
        },
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
        ...mapGetters([
            'User', 'TasksBannerData'
        ]),

    },
    methods: {
        ...mapActions([
            'getDataUser', 'getBannerData'
        ]),
    },
    mounted() {
        this.getBannerData();
        this.getDataUser();
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

.err_vyn11 {
    display: table;
    background-color: red;
    margin-bottom: 10px;
    border-radius: 5px 0px 0px 5px;
    text-align: center;
    width: 10%;
    font-size: 40px;
}
.err_vyn22 {
    display: table;
    background-color: #FCEEE0;
    margin-bottom: 10px;
    border-radius: 0px 5px 5px 0px;
    padding: 10px;
    padding-left: 20px;
    width: 80%;
}
</style>
